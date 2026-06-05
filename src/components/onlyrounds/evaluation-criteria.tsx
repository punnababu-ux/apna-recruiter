"use client"

/**
 * EvaluationCriteriaSection — the candidate-evaluation criteria editor shown
 * at the bottom of the Interview Rounds step.
 *
 * The recruiter generates criteria from the JD + job details + tasks, then
 * edits / adds / removes them. Criteria are split into three buckets:
 *   • Must-have    — required
 *   • Good-to-have — bonus
 *   • Red flags    — dealbreakers (not shortlisted if unmet)
 *
 * Total across all three buckets is capped at MAX_CRITERIA (15).
 */

import {
  CircleCheck,
  Flag,
  Plus,
  Sparkles,
  Star,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  MAX_CRITERIA,
  type CriteriaCategory,
  type Criterion,
} from "./interview-rounds-step"

// Module-level counter for stable criterion ids.
let criterionIdCounter = 0
const nextCriterionId = () => {
  criterionIdCounter += 1
  return `crit-${criterionIdCounter}`
}

type CategoryMeta = {
  key: CriteriaCategory
  label: string
  description: string
  icon: LucideIcon
  tone: string
}

const CATEGORIES: CategoryMeta[] = [
  {
    key: "must-have",
    label: "Must-have",
    description: "Required — candidates must meet all of these.",
    icon: CircleCheck,
    tone: "text-success",
  },
  {
    key: "good-to-have",
    label: "Good-to-have",
    description: "Bonus — these strengthen a candidate.",
    icon: Star,
    tone: "text-warning",
  },
  {
    key: "red-flag",
    label: "Red flags",
    description:
      "Dealbreakers — candidates who don’t meet these aren’t shortlisted.",
    icon: Flag,
    tone: "text-destructive",
  },
]

export type CriteriaContext = {
  title: string
  jd: string
  detailsSummary: string
  tasksSummary: string
}

export function EvaluationCriteriaSection({
  criteria,
  onChange,
  context,
}: {
  criteria: Criterion[]
  onChange: (next: Criterion[]) => void
  context: CriteriaContext
}) {
  const [generating, setGenerating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const total = criteria.length
  const atLimit = total >= MAX_CRITERIA
  const hasCriteria = total > 0

  const generate = async () => {
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch("/api/onlyrounds/generate-criteria", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(context),
      })
      const data = (await res.json()) as {
        mustHave?: string[]
        goodToHave?: string[]
        redFlag?: string[]
        error?: string
      }
      if (data.error) {
        setError(data.error)
        return
      }
      const next: Criterion[] = []
      const push = (category: CriteriaCategory, arr?: string[]) => {
        for (const raw of arr ?? []) {
          if (next.length >= MAX_CRITERIA) break
          const text = String(raw).trim()
          if (text) next.push({ id: nextCriterionId(), category, text })
        }
      }
      push("must-have", data.mustHave)
      push("good-to-have", data.goodToHave)
      push("red-flag", data.redFlag)
      if (next.length === 0) {
        setError("No criteria returned. Try again.")
        return
      }
      onChange(next)
    } catch {
      setError("Couldn’t reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const addCriterion = (category: CriteriaCategory) => {
    if (atLimit) return
    onChange([...criteria, { id: nextCriterionId(), category, text: "" }])
  }

  const updateText = (id: string, text: string) => {
    onChange(criteria.map((c) => (c.id === id ? { ...c, text } : c)))
  }

  const removeCriterion = (id: string) => {
    onChange(criteria.filter((c) => c.id !== id))
  }

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-card">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            Evaluation criteria
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            How the AI judges candidates — generated from the job description
            and the tasks above, then yours to edit.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generate}
          loading={generating}
          loadingText="Generating…"
          className="shrink-0"
        >
          <Sparkles className="size-3.5" />
          {hasCriteria ? "Regenerate" : "Generate with AI"}
        </Button>
      </header>

      {!hasCriteria && !generating ? (
        <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No criteria yet. Generate a starting set from the job, then refine.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((meta) => (
              <CategoryGroup
                key={meta.key}
                meta={meta}
                items={criteria.filter((c) => c.category === meta.key)}
                atLimit={atLimit}
                onAdd={() => addCriterion(meta.key)}
                onUpdate={updateText}
                onRemove={removeCriterion}
              />
            ))}
          </div>

          <div className="flex items-center justify-end border-t border-border pt-3">
            <span
              className={cn(
                "text-xs text-muted-foreground",
                atLimit && "font-medium text-warning-foreground",
              )}
            >
              {total} / {MAX_CRITERIA} criteria
            </span>
          </div>
        </>
      )}

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </section>
  )
}

function CategoryGroup({
  meta,
  items,
  atLimit,
  onAdd,
  onUpdate,
  onRemove,
}: {
  meta: CategoryMeta
  items: Criterion[]
  atLimit: boolean
  onAdd: () => void
  onUpdate: (id: string, text: string) => void
  onRemove: (id: string) => void
}) {
  const Icon = meta.icon
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4 shrink-0", meta.tone)} />
        <span className="text-sm font-medium">{meta.label}</span>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </div>
      <p className="-mt-1 text-xs text-muted-foreground">{meta.description}</p>

      {items.length > 0 ? (
        <div className="flex flex-col gap-2">
          {items.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <Input
                value={c.text}
                onChange={(e) => onUpdate(c.id, e.target.value)}
                placeholder={`Describe a ${meta.label.toLowerCase()} criterion`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Remove criterion"
                onClick={() => onRemove(c.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        disabled={atLimit}
        className="self-start"
        title={atLimit ? `Limit of ${MAX_CRITERIA} criteria reached` : undefined}
      >
        <Plus className="size-3.5" />
        Add {meta.label.toLowerCase()}
      </Button>
    </div>
  )
}

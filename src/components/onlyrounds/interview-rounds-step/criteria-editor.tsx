"use client"

import { Check, Pencil, Plus, Sparkles, Trash2, type IconComponent } from "@apna/design-system"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CRITERIA_CATEGORIES, MAX_CRITERIA } from "@/lib/onlyrounds/constants"
import type { CriteriaCategory, Criterion, InterviewTask } from "@/types/onlyrounds"
import { useIdGenerator } from "@/components/onlyrounds/interview-rounds-step/use-id-generator"
import { InterviewerCard } from "@/components/onlyrounds/interview-rounds-step/interviewer"

// ---- inline evaluation criteria editor ----------------------------------

function InlineCategoryGroup({
  label,
  description,
  Icon,
  tone,
  surface,
  items,
  atLimit,
  onAdd,
  onUpdate,
  onRemove,
}: {
  label: string
  description: string
  Icon: IconComponent
  tone: string
  /** Tinted border + background that colour-codes the category. */
  surface: string
  items: Criterion[]
  atLimit: boolean
  onAdd: () => void
  onUpdate: (id: string, text: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border p-3", surface)}>
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4 shrink-0", tone)} />
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-muted-foreground">({items.length})</span>
      </div>
      <p className="-mt-1 text-xs text-muted-foreground">{description}</p>

      {items.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {items.map((c) => (
            <CriterionRow
              key={c.id}
              criterion={c}
              // Criteria synced from the CEFR add-on carry a "cefr-" id —
              // they're locked (not editable or removable).
              locked={c.id.includes("cefr-")}
              placeholder={`Describe a ${label.toLowerCase()} criterion`}
              onChange={(text) => onUpdate(c.id, text)}
              onRemove={() => onRemove(c.id)}
            />
          ))}
        </div>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={onAdd}
        disabled={atLimit}
        className="h-7 self-start bg-card text-xs"
        title={atLimit ? `Limit of ${MAX_CRITERIA} criteria reached` : undefined}
      >
        <Plus className="mr-1 size-3" />
        Add {label.toLowerCase()}
      </Button>
    </div>
  )
}

/**
 * A single criterion row.
 * - Locked (CEFR add-on): read-only, shows an "Add-on" tag inside the field,
 *   no edit/remove.
 * - Otherwise: read-only by default — click the pencil to edit, the check to
 *   confirm. New (empty) criteria open in edit mode.
 */
function CriterionRow({
  criterion,
  locked,
  placeholder,
  onChange,
  onRemove,
}: {
  criterion: Criterion
  locked: boolean
  placeholder: string
  onChange: (text: string) => void
  onRemove: () => void
}) {
  const [editing, setEditing] = React.useState(
    () => !locked && criterion.text.trim() === "",
  )

  if (locked) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex h-8 flex-1 items-center rounded-md border border-input bg-card px-3">
          <span className="flex-1 truncate text-xs">{criterion.text}</span>
        </div>
        <Badge variant="secondary" className="shrink-0 text-muted-foreground">
          Add-on
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      {editing ? (
        <Input
          autoFocus
          value={criterion.text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              setEditing(false)
            }
          }}
          className="h-8 flex-1 bg-card text-xs"
        />
      ) : (
        <div className="flex h-8 flex-1 items-center rounded-md border border-input bg-card px-3">
          <span className="flex-1 truncate text-xs">
            {criterion.text || (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={editing ? "Done editing" : "Edit criterion"}
        // Stop the input blurring before this click registers while editing.
        onMouseDown={editing ? (e) => e.preventDefault() : undefined}
        onClick={() => setEditing((v) => !v)}
      >
        {editing ? (
          <Check className="size-3" />
        ) : (
          <Pencil className="size-3" />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Remove criterion"
        onClick={onRemove}
      >
        <Trash2 className="size-3" />
      </Button>
    </div>
  )
}

export function TaskCriteriaSection({
  index,
  task,
  generating,
  onUpdateCriteria,
  onUpdateTask,
}: {
  index: number
  task: InterviewTask
  generating: boolean
  onUpdateCriteria: (criteria: Criterion[]) => void
  onUpdateTask: (patch: Partial<InterviewTask>) => void
}) {
  const criteria = task.criteria || []
  const total = criteria.length
  const atLimit = total >= MAX_CRITERIA
  const hasCriteria = total > 0
  const nextCritId = useIdGenerator(`crit-${task.id}`)

  const addCriterion = (category: CriteriaCategory) => {
    if (atLimit) return
    const newId = nextCritId()
    onUpdateCriteria([...criteria, { id: newId, category, text: "" }])
  }

  const updateText = (id: string, text: string) => {
    onUpdateCriteria(criteria.map((c) => (c.id === id ? { ...c, text } : c)))
  }

  const removeCriterion = (id: string) => {
    onUpdateCriteria(criteria.filter((c) => c.id !== id))
  }

  if (generating) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold animate-pulse">Evaluation criteria</span>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <Skeleton variant="ai" className="h-9 w-full" />
          <Skeleton variant="ai" className="h-9 w-full" />
          <Skeleton variant="ai" className="h-9 w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* AI interviewer (agent + language) — this is bot/language config,
          not criteria, so it sits ABOVE the evaluation-criteria heading. */}
      {hasCriteria ? (
        <InterviewerCard
          index={index}
          agentId={task.agentId ?? "isha"}
          language={task.language ?? "english"}
          onAgentChange={(agentId) => onUpdateTask({ agentId })}
          onLanguageChange={(language) => onUpdateTask({ language })}
        />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-semibold">Evaluation criteria</span>
        </div>
      </div>

      {!hasCriteria ? (
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            No evaluation criteria yet. Generate them specifically for this round.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {CRITERIA_CATEGORIES.map((meta) => (
            <InlineCategoryGroup
              key={meta.key}
              label={meta.label}
              description={meta.description}
              Icon={meta.icon}
              tone={meta.tone}
              surface={meta.surface}
              items={criteria.filter((c) => c.category === meta.key)}
              atLimit={atLimit}
              onAdd={() => addCriterion(meta.key)}
              onUpdate={updateText}
              onRemove={removeCriterion}
            />
          ))}
          <div className="flex justify-end border-t border-border pt-2 text-xs text-muted-foreground">
            {total} / {MAX_CRITERIA} criteria
          </div>
        </div>
      )}
    </div>
  )
}

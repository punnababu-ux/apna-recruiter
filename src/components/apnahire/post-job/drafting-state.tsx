"use client"

/**
 * DraftingState — what "Draft my job" is doing, as one rolling line in a thin
 * strip tucked under the prompt (which wears the loading ring meanwhile). One
 * thing at a time — "Understanding the role…", then "Found: Telecaller ·
 * Real Estate" — each line rolling up and out as the next rolls in, rather
 * than a list to read. Fields the AI couldn't find say "you'll add this
 * next", so the gaps on the next screens aren't a surprise.
 *
 * Pacing: the first line holds until the AI responds (that part is real),
 * then the rest roll at a fixed beat so each is readable.
 */

import * as React from "react"
import { Check, Sparkles } from "@apna/design-system"
import {
  EDUCATION_LABELS,
  EMPTY_JOB_DRAFT,
  ENGLISH_LABELS,
  JOB_TYPE_LABELS,
  experienceLabel,
  locationLabel,
  mergeDraft,
  salaryLabel,
} from "@/lib/apnahire/job-draft"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

type Patch = Partial<JobPostDraft>

interface Stage {
  label: string
  /** What the AI found, as chips; null entries become "add this next". */
  values: (d: JobPostDraft, raw: Patch) => { label: string; missing?: boolean }[]
}

const found = (label: string | null | undefined, missingLabel: string) =>
  label ? { label } : { label: missingLabel, missing: true }

const STAGES: Stage[] = [
  {
    label: "Understanding the role",
    values: (d) => [
      found(d.title, "Job title"),
      ...(d.category ? [{ label: d.category }] : []),
      found(d.industry, "Industry"),
      { label: JOB_TYPE_LABELS[d.jobType || "full_time"] },
    ],
  },
  {
    label: "Setting location & pay",
    values: (d) => [
      found(locationLabel(d), "Location"),
      found(salaryLabel(d) && `${salaryLabel(d)} / month`, "Salary"),
    ],
  },
  {
    label: "Working out who can apply",
    values: (d) => [
      found(d.education && EDUCATION_LABELS[d.education], "Education"),
      found(d.english && ENGLISH_LABELS[d.english], "English level"),
      found(experienceLabel(d), "Experience"),
      ...d.languages.map((l) => ({ label: l })),
    ],
  },
  {
    label: "Writing the job description",
    values: (d) => [found(d.description.trim() ? "Description written" : null, "Description")],
  },
]

const FIRST_LINE_MIN_MS = 700
const LINE_BEAT_MS = 750
const HANDOFF_MS = 700

/** "Doing X…", then what it found, per stage; then "Ready". */
function linesFor(result: Patch): string[] {
  const d = mergeDraft(EMPTY_JOB_DRAFT, result)
  return [
    ...STAGES.flatMap((stage) => {
      const values = stage.values(d, result)
      const got = values.filter((v) => !v.missing).map((v) => v.label)
      const gaps = values.filter((v) => v.missing).map((v) => v.label)
      return [
        `${stage.label}…`,
        ...(got.length ? [`Found: ${got.join(" · ")}`] : []),
        ...(gaps.length ? [`Add next: ${gaps.join(", ")}`] : []),
      ]
    }),
    "Ready, let’s check it",
  ]
}

export function DraftingState({
  result,
  onComplete,
}: {
  /** The AI's answer, or null while it's still working. */
  result: Patch | null
  onComplete: () => void
}) {
  const [at, setAt] = React.useState(0)
  const [minElapsed, setMinElapsed] = React.useState(false)
  const lines = React.useMemo(() => (result ? linesFor(result) : [`${STAGES[0].label}…`]), [result])

  React.useEffect(() => {
    const t = window.setTimeout(() => setMinElapsed(true), FIRST_LINE_MIN_MS)
    return () => window.clearTimeout(t)
  }, [])

  // Once the AI has answered, roll one line per beat, then hand over.
  React.useEffect(() => {
    if (!result || !minElapsed) return
    const last = at >= lines.length - 1
    const t = window.setTimeout(last ? onComplete : () => setAt((n) => n + 1), last ? HANDOFF_MS : LINE_BEAT_MS)
    return () => window.clearTimeout(t)
  }, [result, minElapsed, at, lines.length, onComplete])

  const ready = result && at >= lines.length - 1
  return (
    <div
      aria-live="polite"
      className="mx-3 -mt-4 flex h-12 items-center justify-center overflow-hidden rounded-b-card-nested bg-muted px-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <p
        key={at}
        className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-300"
      >
        {ready ? (
          <Check className="size-4 shrink-0 text-primary" aria-hidden />
        ) : (
          <Sparkles className="size-4 shrink-0 animate-pulse text-primary" aria-hidden />
        )}
        <span className={cn("truncate", ready && "font-medium text-foreground")}>{lines[at]}</span>
      </p>
    </div>
  )
}

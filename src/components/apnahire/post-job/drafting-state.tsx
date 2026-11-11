"use client"

/**
 * DraftingState — what "Draft my job" is doing, as one rolling line in a thin
 * strip tucked under the prompt. While the AI works, the lines roll through
 * what it is doing ("Understanding the role…", "Setting location & pay…"),
 * holding on the last; once it answers, "Ready, let's check it" shows for a
 * beat and the flow opens. No reveal after the answer (audit 2026-11-11: it
 * added ~7 s to a ~25 s wait); the questions show what was found.
 */

import * as React from "react"
import { Check, Sparkles } from "@apna/design-system"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

type Patch = Partial<JobPostDraft>

const WAIT_LINES = [
  "Understanding the role…",
  "Setting location & pay…",
  "Working out who can apply…",
  "Writing the job description…",
]
const READY = "Ready, let’s check it"

/** A line per beat while waiting: ~25 s spread over four lines. */
const WAIT_BEAT_MS = 4000
const HANDOFF_MS = 700

export function DraftingState({
  result,
  onComplete,
}: {
  /** The AI's answer, or null while it's still working. */
  result: Patch | null
  onComplete: () => void
}) {
  const [at, setAt] = React.useState(0)

  // While waiting: roll the lines, holding on the last.
  React.useEffect(() => {
    if (result || at >= WAIT_LINES.length - 1) return
    const t = window.setTimeout(() => setAt((n) => n + 1), WAIT_BEAT_MS)
    return () => window.clearTimeout(t)
  }, [result, at])

  // Answered: a beat on "Ready", then hand over.
  React.useEffect(() => {
    if (!result) return
    const t = window.setTimeout(onComplete, HANDOFF_MS)
    return () => window.clearTimeout(t)
  }, [result, onComplete])

  const ready = !!result
  const line = ready ? READY : WAIT_LINES[at]
  return (
    <div
      aria-live="polite"
      className="mx-3 -mt-4 flex h-12 items-center justify-center overflow-hidden rounded-b-card-nested bg-muted px-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <p
        key={ready ? "ready" : at}
        className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-300"
      >
        {ready ? (
          <Check className="size-4 shrink-0 text-primary" aria-hidden />
        ) : (
          <Sparkles className="size-4 shrink-0 animate-pulse text-info" aria-hidden />
        )}
        <span className={cn("truncate", ready && "font-medium text-foreground")}>{line}</span>
      </p>
    </div>
  )
}

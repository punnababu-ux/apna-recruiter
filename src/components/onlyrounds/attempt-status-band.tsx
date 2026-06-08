"use client"

/**
 * AttemptStatusBand — status row used inside CandidateCard for in-progress
 * states (Interview pending / Incomplete call / No response / etc).
 *
 * Composition:
 *   coloured label · reason text
 *   linear progress bar
 *   "{n} of {N} call attempts completed" · optional "Attempt Logs: View ▼" toggle
 *   (when expanded) — chronological list of attempt log entries
 *   optional helper line below (info icon + helper text)
 *
 * Behaviour:
 *   - Pending → AI hasn't exhausted attempts yet. tone="info"
 *   - Incomplete → all attempts used, still not complete. tone="warning"
 *   - Failed → no answer / not interested. tone="destructive" or "muted"
 *
 * The tone drives label + progress colour; the rest of the chrome stays neutral.
 */

import { ChevronDown, ChevronUp, Info } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export type AttemptTone = "info" | "warning" | "destructive" | "muted"

/** A single line in the chronological attempt log. */
export type AttemptLogEntry = {
  /** Display text, e.g. "First Attempt: Call Started" or "Second Attempt: Call Ended (15s)". */
  label: string
  /** Human-readable timestamp, e.g. "Apr 08, 2026 at 07:21 PM". */
  at: string
}

const TONE: Record<AttemptTone, { text: string; progress: string }> = {
  info: { text: "text-info", progress: "bg-info" },
  warning: { text: "text-warning", progress: "bg-warning" },
  destructive: { text: "text-destructive", progress: "bg-destructive" },
  muted: { text: "text-muted-foreground", progress: "bg-muted-foreground/40" },
}

export function AttemptStatusBand({
  tone = "info",
  label,
  reason,
  attempted,
  total,
  helper,
  attempts,
}: {
  tone?: AttemptTone
  /** e.g. "Interview Pending" / "Interview Incomplete" */
  label: string
  /** Short reason after the label, e.g. "Call not connected, Rescheduled for completion" */
  reason?: string
  attempted?: number
  total?: number
  /** Short paragraph below the progress row, with a leading info icon. */
  helper?: string
  /** When provided & non-empty, a "View / Hide all" toggle expands the chronological log. */
  attempts?: AttemptLogEntry[]
}) {
  const t = TONE[tone]
  const pct =
    typeof attempted === "number" && typeof total === "number" && total > 0
      ? Math.min(100, Math.round((attempted / total) * 100))
      : null
  const hasLogs = attempts && attempts.length > 0
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
      {/* Label + reason */}
      <p className="text-xs">
        <span className={cn("font-semibold", t.text)}>{label}:</span>{" "}
        {reason ? <span className="text-foreground">{reason}</span> : null}
      </p>

      {/* Progress bar */}
      {pct !== null ? (
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={attempted}
          aria-valuemin={0}
          aria-valuemax={total}
        >
          <div
            className={cn("h-full transition-[width]", t.progress)}
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}

      {/* Counter (left) + logs toggle (right), below the bar */}
      {pct !== null ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{attempted}</span>{" "}
            of <span className="font-semibold text-foreground">{total}</span>{" "}
            call attempts completed
          </span>
          {hasLogs ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded((v) => !v)
              }}
              aria-expanded={expanded}
              className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-primary hover:underline"
            >
              Attempt Logs: {expanded ? "Hide all" : "View"}
              {expanded ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Expanded log list */}
      {hasLogs && expanded ? (
        <ul className="mt-0.5 flex flex-col gap-1 text-xs text-muted-foreground">
          {attempts!.map((a, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3">
              <span>– {a.label}</span>
              <span className="shrink-0 tabular-nums">{a.at}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Helper line */}
      {helper ? (
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3 shrink-0" />
          <span>{helper}</span>
        </p>
      ) : null}
    </div>
  )
}

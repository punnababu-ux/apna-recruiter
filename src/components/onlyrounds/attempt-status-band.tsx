/**
 * AttemptStatusBand — status row used inside CandidateCard for in-progress
 * states (Interview pending / Incomplete call / Rejected reason / etc).
 *
 * Composition:
 *   coloured label · short reason text · linear progress · attempts counter
 *   optional helper line below (info icon + helper text)
 *   optional "Attempt Logs: View" link on the right of the counter row
 *
 * Behaviour:
 *   - Pending → AI hasn't exhausted attempts yet. tone="info"
 *   - Incomplete → all attempts used, still not complete. tone="warning"
 *   - Failed → no answer / not interested. tone="destructive" or "muted"
 *
 * The tone drives label + progress colour; the rest of the chrome stays neutral.
 */

import { Info } from "lucide-react"

import { cn } from "@/lib/utils"

export type AttemptTone = "info" | "warning" | "destructive" | "muted"

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
  onViewAttempts,
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
  /** When set, an "Attempt Logs: View" link appears next to the counter. */
  onViewAttempts?: (e: React.MouseEvent) => void
}) {
  const t = TONE[tone]
  const pct =
    typeof attempted === "number" && typeof total === "number" && total > 0
      ? Math.min(100, Math.round((attempted / total) * 100))
      : null

  return (
    <div className="flex flex-col gap-2 border-t border-border px-4 py-3">
      {/* Label + reason */}
      <p className="text-xs">
        <span className={cn("font-semibold", t.text)}>{label}:</span>{" "}
        {reason ? <span className="text-foreground">{reason}</span> : null}
      </p>

      {/* Progress + counter row */}
      {pct !== null ? (
        <div className="flex items-center gap-3">
          <div
            className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
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
          <span className="shrink-0 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{attempted}</span>{" "}
            of <span className="font-semibold text-foreground">{total}</span>{" "}
            call attempts completed
          </span>
          {onViewAttempts ? (
            <button
              type="button"
              onClick={onViewAttempts}
              className="shrink-0 text-xs font-medium text-primary hover:underline"
            >
              Attempt Logs: View
            </button>
          ) : null}
        </div>
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

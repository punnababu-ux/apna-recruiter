/**
 * ScorePill — candidate readiness score shown alongside a verdict label.
 *
 * Visual: numeric score inside a circular badge, verdict label beside it
 * (e.g. "Not fit", "Fit", "Review"). The verdict tone drives the colour —
 * the score circle and label share the same role token.
 *
 * Verdict mapping:
 *   not-fit  → destructive  · score<6
 *   review   → warning      · 6 ≤ score < 8
 *   fit      → success      · score ≥ 8
 *
 * Score is a display value — scoring logic lives upstream.
 */

import { cn } from "@/lib/utils"

type Verdict = "fit" | "review" | "not-fit"

const TONE: Record<Verdict, { bg: string; text: string; label: string }> = {
  fit:       { bg: "bg-success/15",     text: "text-success",     label: "Fit" },
  review:    { bg: "bg-warning/15",     text: "text-warning",     label: "Review" },
  "not-fit": { bg: "bg-destructive/15", text: "text-destructive", label: "Not fit" },
}

export function ScorePill({
  score,
  verdict,
  label,
  className,
}: {
  score: number
  verdict: Verdict
  label?: string
  className?: string
}) {
  const tone = TONE[verdict]
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
          tone.bg,
          tone.text,
        )}
      >
        {score}
      </span>
      <span className={cn("text-xs font-medium", tone.text)}>
        {label ?? tone.label}
      </span>
    </div>
  )
}

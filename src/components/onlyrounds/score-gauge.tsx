/**
 * ScoreGauge — circular 0-100 score with a verdict label below or beside.
 *
 * Verdict drives the tone; the score is rendered inside a tinted ring.
 * Use on candidate cards and the candidate drawer header. For a smaller
 * 1-10 score, see ScorePill instead.
 */

import { badgeVariants } from "@apna/design-system"
import { cn } from "@/lib/utils"

export type Verdict = "fit" | "review" | "not-fit"

const VERDICT_CONFIG: Record<
  Verdict,
  { variant: "success" | "warning" | "destructive"; label: string; text: string }
> = {
  fit: {
    variant: "success",
    label: "Fit",
    text: "text-success",
  },
  review: {
    variant: "warning",
    label: "Review",
    text: "text-warning",
  },
  "not-fit": {
    variant: "destructive",
    label: "Not fit",
    text: "text-destructive",
  },
}

export function ScoreGauge({
  score,
  verdict,
  label,
  size = "md",
  layout = "row",
  className,
}: {
  /** 0–100 */
  score: number
  verdict: Verdict
  /** Override the verdict label. Defaults to "Fit" / "Review" / "Not fit". */
  label?: string
  size?: "sm" | "md" | "lg"
  /** "row" → number left, label right; "col" → number above, label below */
  layout?: "row" | "col"
  className?: string
}) {
  const config = VERDICT_CONFIG[verdict]
  const sizeCls =
    size === "lg"
      ? "size-12 text-base"
      : size === "sm"
        ? "size-8 text-xs"
        : "size-10 text-sm"
  const labelCls =
    size === "lg" ? "text-sm" : size === "sm" ? "text-xs" : "text-xs"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        layout === "col" && "flex-col gap-0.5",
        className,
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full border font-semibold tabular-nums",
          sizeCls,
          badgeVariants({ variant: config.variant }),
        )}
      >
        {score}
      </span>
      <span className={cn("font-medium", labelCls, config.text)}>
        {label ?? config.label}
      </span>
    </div>
  )
}

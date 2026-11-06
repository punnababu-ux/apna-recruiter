/**
 * MatchBars — how well a candidate fits a job, as three rising bars (the
 * signal-strength metaphor): high 3, medium 2, low 1. One mark for the
 * match everywhere a candidate is listed: a job's leads (ECC) and chats.
 * The bars are decoration; the level is spoken through `MATCH_LABEL`.
 *
 *   <MatchBars level="high" />                     bars only (sr-only label)
 *   <MatchBars level="medium" label />              bars + "Medium match" ("Medium" on phones)
 *
 * No percentage: the level is what the recruiter acts on (user call, 2026-11-06).
 */

import { MATCH_LABEL, type MatchLevel } from "@/content/chats"
import { cn } from "@/lib/utils"

const FILLED: Record<MatchLevel, number> = { high: 3, medium: 2, low: 1 }
const TONE: Record<MatchLevel, string> = { high: "bg-success", medium: "bg-warning", low: "bg-destructive" }
/** Unfilled bars take the surrounding text colour, faint: the chip's dark
 *  amber / red on its tint, the label's grey on a card. Plain grey
 *  (bg-border) vanished on the tinted chips (user call, 2026-11-06). */
const HEIGHT = ["h-1.5", "h-2.5", "h-3.5"]
/** size="sm": the card's match chip (user call, 2026-11-06). */
const HEIGHT_SM = ["h-1", "h-2", "h-3"]

/** Score → level: 75+ high, 50–74 medium, under 50 low. */
export function matchLevel(score: number): MatchLevel {
  return score >= 75 ? "high" : score >= 50 ? "medium" : "low"
}

export function MatchBars({
  level,
  label,
  size,
  className,
}: {
  level: MatchLevel
  label?: boolean
  size?: "sm"
  className?: string
}) {
  const heights = size === "sm" ? HEIGHT_SM : HEIGHT
  return (
    <span className={cn("inline-flex shrink-0 items-center whitespace-nowrap", size === "sm" ? "gap-1" : "gap-1.5", className)}>
      <span aria-hidden className="inline-flex items-end gap-0.5">
        {heights.map((h, i) => (
          <span key={h} className={cn("w-1 rounded-full", h, i < FILLED[level] ? TONE[level] : "bg-current/25")} />
        ))}
      </span>
      {/* Phones: "High", so names keep their room; "High match" from sm. */}
      {label && (
        <span aria-hidden>
          {MATCH_LABEL[level].replace(" match", "")}
          <span className="max-sm:hidden"> match</span>
        </span>
      )}
      <span className="sr-only">{MATCH_LABEL[level]}</span>
    </span>
  )
}

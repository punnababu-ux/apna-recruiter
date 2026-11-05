/**
 * MatchBars — how well a candidate fits a job, as three rising bars (the
 * signal-strength metaphor): high 3, medium 2, low 1. One mark for the
 * match everywhere a candidate is listed: a job's leads (ECC) and chats.
 * The bars are decoration; the level is spoken through `MATCH_LABEL`.
 *
 *   <MatchBars level="high" />                     bars only (sr-only label)
 *   <MatchBars level="medium" score={64} />        bars + "64% match" ("64%" on phones)
 */

import { MATCH_LABEL, type MatchLevel } from "@/content/chats"
import { cn } from "@/lib/utils"

const FILLED: Record<MatchLevel, number> = { high: 3, medium: 2, low: 1 }
const TONE: Record<MatchLevel, string> = { high: "bg-success", medium: "bg-warning", low: "bg-destructive" }
const HEIGHT = ["h-1.5", "h-2.5", "h-3.5"]

/** Score → level: 75+ high, 50–74 medium, under 50 low. */
export function matchLevel(score: number): MatchLevel {
  return score >= 75 ? "high" : score >= 50 ? "medium" : "low"
}

export function MatchBars({ level, score, className }: { level: MatchLevel; score?: number; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap", className)}>
      <span aria-hidden className="inline-flex items-end gap-0.5">
        {HEIGHT.map((h, i) => (
          <span key={h} className={cn("w-1 rounded-full", h, i < FILLED[level] ? TONE[level] : "bg-border")} />
        ))}
      </span>
      {/* Phones: "88%", so names keep their room; "88% match" from sm. */}
      {score !== undefined && (
        <span aria-hidden>
          {score}%<span className="max-sm:hidden"> match</span>
        </span>
      )}
      <span className="sr-only">{MATCH_LABEL[level]}</span>
    </span>
  )
}

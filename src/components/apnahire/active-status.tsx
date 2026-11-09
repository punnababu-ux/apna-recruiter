/**
 * ActiveStatus — when a candidate was last on apna, with one rule for the
 * green dot (user call, 2026-11-06):
 *
 *   within 24 hours ("now", "N minutes / hours ago", "today")
 *                     → green dot, foreground text: likely to pick up
 *   older ("yesterday", "N days ago", "a week ago")
 *                     → no dot, muted text
 *
 *   <ActiveStatus ago="2 hours ago" />   ● Active 2 hours ago
 *   <ActiveStatus ago="yesterday" />     Active yesterday
 *
 * A job is live for 15 days, so everyone who applied was active lately. There
 * the useful recency is when they applied: label="Applied" (2026-11-09).
 * Database candidates keep Active: it says who is likely to respond.
 */

import { Clock } from "@apna/design-system"
import { cn } from "@/lib/utils"

/** Active in the last 24 hours. */
export const isRecentlyActive = (ago: string) => /\b(now|today|online|minutes?|mins?|hours?|hrs?)\b/i.test(ago)

/** For label="Applied". */
export const appliedAgo = (days: number) => (days <= 1 ? "today" : `${days} days ago`)

export function ActiveStatus({ ago, label = "Active", clock, className }: { ago: string; label?: "Active" | "Applied"; clock?: boolean; className?: string }) {
  const recent = isRecentlyActive(ago)
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 text-xs whitespace-nowrap",
        recent ? "font-medium text-foreground" : "text-muted-foreground",
        className
      )}
    >
      {clock ? (
        <Clock aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
      ) : (
        recent && <span aria-hidden className="size-2 shrink-0 rounded-full bg-success" />
      )}
      {label} {ago}
    </span>
  )
}

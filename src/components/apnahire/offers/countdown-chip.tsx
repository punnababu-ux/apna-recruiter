"use client"

/**
 * CountdownChip — a live "23:45:19" timer pill for time-boxed offers
 * (exit nudge, applied coupon). Ticks once a second while mounted.
 *
 * `useCountdown(deadline)` gives the remaining milliseconds for callers
 * that need to react to zero (e.g. expiring a coupon).
 */

import * as React from "react"
import { ClockFading } from "@apna/design-system"
import { cn } from "@/lib/utils"

export function useCountdown(deadline: number | null) {
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    if (deadline === null) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [deadline])

  return deadline === null ? 0 : Math.max(0, deadline - now)
}

function hms(ms: number) {
  const total = Math.floor(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":")
}

export function CountdownChip({ deadline, className }: { deadline: number; className?: string }) {
  const remaining = useCountdown(deadline)
  return (
    <span
      role="timer"
      aria-label={`Offer ends in ${hms(remaining)}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-sm font-semibold tabular-nums text-foreground",
        className
      )}
    >
      <ClockFading className="size-4" aria-hidden />
      {hms(remaining)}
    </span>
  )
}

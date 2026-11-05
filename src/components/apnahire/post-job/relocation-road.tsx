"use client"

/**
 * RelocationRoad — PREVIEW (?road=1, 2026-11-05). When relocation is
 * switched on, the phone's progress line above the bottom bar becomes a
 * road for a moment: dashes and three trees rise beside it, and the clay
 * truck drives in from the right to where the recruiter has got to. The
 * trees fade after ~2.5s; the truck stays parked while this screen is open.
 * Drawn inside the wizard footer (it is sticky, so it anchors us), phones
 * only. Reduced motion: the truck is simply parked.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

const TREES = [12, 34, 58] // % across the road

export function RelocationRoad() {
  const [host, setHost] = React.useState<HTMLElement | null>(null)
  const [stopPx, setStopPx] = React.useState(0)
  const [scenery, setScenery] = React.useState(true)
  React.useEffect(() => {
    const footer = document.querySelector<HTMLElement>('[data-slot="wizard-footer"]')
    setHost(footer)
    // Park where the filled progress ends (the fills are scaled spans).
    const left = footer?.getBoundingClientRect().left ?? 0
    const ends = [...(footer?.querySelectorAll<HTMLElement>('[data-slot="segmented-progress"] span > span') ?? [])]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0)
      .map((r) => r.right - left)
    setStopPx(Math.max(24, ...ends))
    const t = window.setTimeout(() => setScenery(false), 2600)
    return () => window.clearTimeout(t)
  }, [])
  if (!host) return null
  return createPortal(
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-10 overflow-hidden sm:hidden">
      <div className={cn("absolute inset-0 transition-opacity duration-700", scenery ? "opacity-100" : "opacity-0")}>
        <span className="absolute inset-x-0 bottom-1 border-t-2 border-dashed border-foreground/20 animate-in fade-in duration-500" />
        {TREES.map((x, i) => (
          <span
            key={x}
            className="absolute bottom-0 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            style={{ left: `${x}%`, animationDelay: `${i * 120}ms` }}
          >
            <span className="size-4 rounded-full bg-primary/70" />
            <span className="h-2 w-1 rounded-full bg-foreground/30" />
          </span>
        ))}
      </div>
      {/* The truck: rides the line, parks at the progress point. */}
      <span className="absolute inset-y-0 flex items-end animate-road-drive" style={{ left: stopPx }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- served as-is, like ValueArt */}
        <img src="/images/company/values/relocation-truck.png" alt="" className="-mb-1 size-9 -translate-x-1/2 object-contain" />
      </span>
    </div>,
    host,
  )
}

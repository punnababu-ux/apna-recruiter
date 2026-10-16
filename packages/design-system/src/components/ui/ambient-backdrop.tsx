"use client"

/**
 * AmbientBackdrop — brings a gradient canvas to life without changing it:
 * soft blobs in the canvas's own hues drift on long loops, a light wanders
 * across them on a quicker loop of its own, and a fine grain sits over the
 * top. Built for the homepage hero over `bg-gradient-checkout-hero`; hues
 * come from the `--ambient-*` tokens (light + dark), motion from
 * `--duration-ambient` / `--duration-ambient-wander`.
 *
 * API
 *   <div className="relative isolate">
 *     <AmbientBackdrop className="inset-0" />
 *     <Section className="relative">…</Section>
 *   </div>
 *
 *   className  positions the layer (it is `absolute`; pass the inset)
 *   glow       the wandering light, on by default
 *   grain      film grain, on by default
 *
 * Behaviour: purely decorative (`aria-hidden`, no pointer events), moves by
 * itself — no pointer tracking, so phones get the same motion as desktop.
 * Pauses while scrolled off-screen. Reduced motion holds everything still.
 * The styles live in index.css ("Ambient backdrop").
 */

import * as React from "react"

import { cn } from "@/lib/utils"

const BLOBS = [1, 2, 3, 4, 5, 6, 7] as const

function AmbientBackdrop({
  className,
  glow = true,
  grain = true,
}: {
  className?: string
  glow?: boolean
  grain?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  // Off-screen, the loops pause — nothing animates that nobody can see.
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const visibility = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-paused", !entry.isIntersecting)
    })
    visibility.observe(el)
    return () => visibility.disconnect()
  }, [])

  return (
    <div ref={ref} data-slot="ambient-backdrop" aria-hidden className={cn("ambient-backdrop", className)}>
      {BLOBS.map((n) => (
        <span key={n} data-blob={n} className="ambient-blob" />
      ))}
      {glow && <span className="ambient-glow" />}
      {grain && <span className="ambient-grain" />}
    </div>
  )
}

export { AmbientBackdrop }

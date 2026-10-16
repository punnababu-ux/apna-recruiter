"use client"

/**
 * AmbientBackdrop — brings a gradient canvas to life without changing it:
 * soft blobs in the canvas's own hues drift on long loops, a light trails
 * the mouse, and a fine grain sits over the top. Built for the homepage
 * hero over `bg-gradient-checkout-hero`; hues come from the `--ambient-*`
 * tokens (light + dark), motion from `--duration-ambient`.
 *
 * API
 *   <div className="relative isolate">
 *     <AmbientBackdrop className="inset-0" />
 *     <Section className="relative">…</Section>
 *   </div>
 *
 *   className    positions the layer (it is `absolute`; pass the inset)
 *   interactive  cursor glow, on by default. Fine pointers only — touch
 *                never sees it. Tracks pointer moves over the parent.
 *   grain        film grain, on by default
 *
 * Behaviour: purely decorative (`aria-hidden`, no pointer events). Pauses
 * while scrolled off-screen. Reduced motion keeps the blobs still and drops
 * the glow — the styles live in index.css ("Ambient backdrop").
 */

import * as React from "react"

import { cn } from "@/lib/utils"

const BLOBS = [1, 2, 3, 4] as const

function AmbientBackdrop({
  className,
  interactive = true,
  grain = true,
}: {
  className?: string
  interactive?: boolean
  grain?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const visibility = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-paused", !entry.isIntersecting)
    })
    visibility.observe(el)

    const host = el.parentElement
    if (!interactive || !host) return () => visibility.disconnect()

    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect()
        el.style.setProperty("--ambient-x", `${e.clientX - box.left}px`)
        el.style.setProperty("--ambient-y", `${e.clientY - box.top}px`)
        el.setAttribute("data-pointer", "")
      })
    }
    const onLeave = () => el.removeAttribute("data-pointer")

    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    return () => {
      visibility.disconnect()
      cancelAnimationFrame(frame)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [interactive])

  return (
    <div ref={ref} data-slot="ambient-backdrop" aria-hidden className={cn("ambient-backdrop", className)}>
      {BLOBS.map((n) => (
        <span key={n} data-blob={n} className="ambient-blob" />
      ))}
      {interactive && <span className="ambient-glow" />}
      {grain && <span className="ambient-grain" />}
    </div>
  )
}

export { AmbientBackdrop }

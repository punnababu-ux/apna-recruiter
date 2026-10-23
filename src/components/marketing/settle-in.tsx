"use client"

/**
 * SettleIn — wraps a band so its cards rise and settle into place the
 * first time you scroll to it (the `settle-in` rule in the design system's
 * index.css). Renders a plain div carrying `data-settle`: "pending" once
 * mounted below the fold, "in" as it enters (or is scrolled past). Once
 * in, it stays in.
 */

import * as React from "react"

export function SettleIn({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<"pending" | "in" | undefined>(undefined)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already on screen at load (a reload mid-page): show it as it is.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    setState("pending")
    // A scroll check, not an IntersectionObserver: a jump past the band
    // (anchor link, find-in-page, a fast fling) never "intersects", and the
    // cards would stay hidden. Lands as the band's top passes 85% of the
    // screen, or the moment the band is anywhere above it.
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        setState("in")
        window.removeEventListener("scroll", check)
      }
    }
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])
  return (
    <div ref={ref} data-settle={state} className={className}>
      {children}
    </div>
  )
}

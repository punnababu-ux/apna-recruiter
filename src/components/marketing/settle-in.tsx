"use client"

/**
 * SettleIn — wraps a band so its cards rise and settle into place the
 * first time you scroll to it (the `settle-in` rule in the design system's
 * index.css). Renders a plain div carrying `data-settle`: "pending" once
 * mounted below the fold, "in" as it enters. Once in, it stays in.
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
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in")
          io.disconnect()
        }
      },
      // Starts as the band's top passes 15% up the screen, so the cards
      // land while you arrive, not after you've stopped.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} data-settle={state} className={className}>
      {children}
    </div>
  )
}

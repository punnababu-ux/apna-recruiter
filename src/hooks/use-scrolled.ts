"use client"

/**
 * useScrolled — true once the page has scrolled past a threshold.
 *
 * Extracted from the self-checkout page, where the transparent-to-solid header
 * behaviour was inlined. Every marketing page wants it, and the threshold and
 * timing are a system decision rather than a per-page one.
 *
 * 5px rather than 0: some browsers report a stray pixel of scroll on load, and
 * a 0 threshold makes the header flicker solid before the user has moved.
 */

import * as React from "react"

export function useScrolled(threshold = 5) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}

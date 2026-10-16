"use client"

/**
 * useFlushHeader — for a page whose first block continues the top bar (the
 * Jobs search band on phones): while the page is scrolled to the top, the
 * bar drops its bottom line so bar and band read as one header; once the
 * band scrolls under the bar, the line comes back to separate the pinned
 * bar from the content passing beneath it.
 *
 * Sets `data-header-flush` on <html>; the top bar reads it
 * (`max-md:[[data-header-flush]_&]:border-transparent`). Cleared on unmount.
 */

import * as React from "react"

const ATTR = "data-header-flush"

export function useFlushHeader() {
  React.useEffect(() => {
    const root = document.documentElement
    const update = () => {
      if (window.scrollY <= 2) root.setAttribute(ATTR, "")
      else root.removeAttribute(ATTR)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      root.removeAttribute(ATTR)
    }
  }, [])
}

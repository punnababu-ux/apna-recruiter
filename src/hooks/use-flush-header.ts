"use client"

/**
 * useFlushHeader — for a page whose header continues below the top bar on
 * phones (Jobs: the search band at the top, the sticky chip bar once
 * scrolled). Two attributes on <html>, cleared on unmount:
 *
 *   data-header-joined   while the page is mounted: the top bar drops its
 *                        bottom line (whatever sits under it carries one)
 *   data-header-scrolled once the page has scrolled: the sticky row turns
 *                        into a white bar with its own line (self-checkout's
 *                        sticky chips)
 */

import * as React from "react"

export function useFlushHeader() {
  React.useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-header-joined", "")
    const update = () => {
      if (window.scrollY > 2) root.setAttribute("data-header-scrolled", "")
      else root.removeAttribute("data-header-scrolled")
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      root.removeAttribute("data-header-joined")
      root.removeAttribute("data-header-scrolled")
    }
  }, [])
}

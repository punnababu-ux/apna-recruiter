"use client"

/**
 * useFlushHeader — for a page whose header continues below the top bar on
 * phones (Jobs: the search band at the top, the sticky chip bar once
 * scrolled): sets `data-header-joined` on <html> while mounted, so the top
 * bar drops its bottom line — whatever sits under it carries one.
 */

import * as React from "react"

export function useFlushHeader() {
  React.useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-header-joined", "")
    return () => root.removeAttribute("data-header-joined")
  }, [])
}

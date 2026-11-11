"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=plum` (the "mother plum", live
 * 2026-10-28 to 2026-10-29) on a marketing URL shows that saved mother
 * gradient (semantic.css, :root[data-mother]) without changing the live
 * page, which is the gold brand gradient (2026-11-11).
 */

import * as React from "react"

export function MotherPreview() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // ?mother=plum (the saved gradient).
    for (const key of ["mother"] as const) {
      const value = params.get(key)
      if (value) document.documentElement.dataset[key] = value
      else delete document.documentElement.dataset[key]
    }
  }, [])
  return null
}

"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=plum` (the "mother plum", live
 * 2026-10-28 to 2026-10-29) or `?mother=brand` (the gold brand gradient)
 * on a marketing URL shows that saved mother gradient (semantic.css,
 * :root[data-mother]) without changing the live page, which is the legacy
 * mesh.
 */

import * as React from "react"

export function MotherPreview() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // ?mother=plum | brand (the saved gradients).
    for (const key of ["mother"] as const) {
      const value = params.get(key)
      if (value) document.documentElement.dataset[key] = value
      else delete document.documentElement.dataset[key]
    }
  }, [])
  return null
}

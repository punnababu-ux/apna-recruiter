"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=brand` (the gold brand gradient, live until
 * 2026-10-28) or `?mother=mesh` on a marketing URL shows that saved
 * mother gradient (live until 2026-10-20) (semantic.css, :root[data-mother]) without
 * changing the live page.
 */

import * as React from "react"

export function MotherPreview() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // ?mother=mesh (the saved gradient).
    for (const key of ["mother"] as const) {
      const value = params.get(key)
      if (value) document.documentElement.dataset[key] = value
      else delete document.documentElement.dataset[key]
    }
  }, [])
  return null
}

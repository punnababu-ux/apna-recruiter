"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=mesh` on a marketing URL shows the saved mesh
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

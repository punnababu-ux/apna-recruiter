"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=brand` on a marketing URL shows the saved brand-colour
 * mother gradient (semantic.css, :root[data-mother]) without
 * changing the live page.
 */

import * as React from "react"

export function MotherPreview() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // ?mother=brand (the saved gradient).
    for (const key of ["mother"] as const) {
      const value = params.get(key)
      if (value) document.documentElement.dataset[key] = value
      else delete document.documentElement.dataset[key]
    }
  }, [])
  return null
}

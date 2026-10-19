"use client"

/**
 * MotherPreview — PREVIEW ONLY. `?mother=classic` on a marketing URL shows the previous
 * mother gradient (semantic.css, :root[data-mother]) without
 * changing the live page.
 */

import * as React from "react"

export function MotherPreview() {
  React.useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("mother")
    if (value) document.documentElement.dataset.mother = value
    else delete document.documentElement.dataset.mother
  }, [])
  return null
}

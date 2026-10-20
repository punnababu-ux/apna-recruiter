"use client"

/**
 * AwardModel — a real 3D award on its plinth (Google <model-viewer>, GLB).
 * Turns slowly by itself and follows a drag (mouse or touch), lit by a
 * neutral studio environment so gold and glass read; the hall's spotlight
 * sits above it as before. Loaded on the client only.
 */

import { createElement, useEffect, useState } from "react"

export function AwardModel({ src, alt }: { src: string; alt: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true))
  }, [])
  if (!ready) return null
  return createElement("model-viewer", {
    src,
    alt,
    "camera-controls": true,
    "auto-rotate": true,
    "auto-rotate-delay": "0",
    "rotation-per-second": "24deg",
    "interaction-prompt": "none",
    "disable-zoom": true,
    "disable-pan": true,
    // Framed low and close so it stands on the pedestal, not floats.
    "camera-orbit": "0deg 78deg 95%",
    "camera-target": "auto auto auto",
    "field-of-view": "28deg",
    // Studio light: key from above-front like the hall's spotlight, a
    // touch warm, soft contact shadow on the pedestal.
    "environment-image": "neutral",
    "tone-mapping": "aces",
    exposure: "1.25",
    "shadow-intensity": "1.2",
    "shadow-softness": "0.6",
    loading: "eager",
    class: "size-full",
  })
}

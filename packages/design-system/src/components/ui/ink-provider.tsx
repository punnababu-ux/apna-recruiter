"use client"

/**
 * InkProvider — tells every `ink` surface where it was pressed.
 *
 * The `ink` utility (styles/index.css) spreads a ripple from
 * `--ink-x / --ink-y` while an element is pressed. This component installs
 * ONE capture-phase listener on the document that writes those two custom
 * properties onto the nearest `.ink` ancestor of the pointer. No per-component
 * hooks, refs or re-renders — mount it once near the root and every
 * primitive that uses `ink` picks it up.
 *
 * Without it, ink still works and simply grows from the centre, which is
 * also what keyboard presses (Space / Enter) use.
 *
 * It also registers a passive `touchstart` listener: iOS Safari only applies
 * `:active` (which drives both `ink` and `press`) when the page listens for
 * touches.
 *
 * Usage (root layout):
 *   <InkProvider />
 *
 * Renders nothing.
 */

import * as React from "react"

const INK_SELECTOR = ".ink"

function InkProvider() {
  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const surface = target.closest<HTMLElement>(INK_SELECTOR)
      if (!surface) return
      const rect = surface.getBoundingClientRect()
      surface.style.setProperty("--ink-x", `${event.clientX - rect.left}px`)
      surface.style.setProperty("--ink-y", `${event.clientY - rect.top}px`)
    }

    // A keyboard press has no pointer position: centre it, or the ink would
    // spread from wherever the last click happened to land.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return
      const target = event.target
      if (!(target instanceof HTMLElement) || !target.matches(INK_SELECTOR)) return
      target.style.setProperty("--ink-x", "50%")
      target.style.setProperty("--ink-y", "50%")
    }

    const onTouchStart = () => {}

    document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true })
    document.addEventListener("keydown", onKeyDown, { capture: true })
    document.addEventListener("touchstart", onTouchStart, { passive: true })
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true })
      document.removeEventListener("keydown", onKeyDown, { capture: true })
      document.removeEventListener("touchstart", onTouchStart)
    }
  }, [])

  return null
}

export { InkProvider }

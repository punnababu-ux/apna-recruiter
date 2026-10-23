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
 * Haptics: a touch press on a live surface (`ink`, `press`, `press-subtle`)
 * gives a short tick (`haptic()`, 10ms) where the browser supports the
 * Vibration API: Chrome and most Android browsers. No permission or app is
 * needed. iOS Safari has no vibration API, so iPhones get the visual press
 * only. Mouse and pen presses never vibrate; neither do disabled controls.
 * Android only vibrates after the page has had a first tap (the browser's
 * user-activation rule), so the very first press of a visit is silent.
 *
 * Usage (root layout):
 *   <InkProvider />
 *
 * Renders nothing.
 */

import * as React from "react"

const INK_SELECTOR = ".ink"
const PRESS_SELECTOR = ".ink, .press, .press-subtle"

/** A short haptic tick, where supported (Android browsers). Safe to call
 *  anywhere: a no-op without the Vibration API or user activation. */
function haptic(ms = 10) {
  try {
    navigator.vibrate?.(ms)
  } catch {
    // Blocked (no user activation yet, or a policy): stay silent.
  }
}

function InkProvider() {
  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (event.pointerType === "touch") {
        const pressed = target.closest<HTMLElement>(PRESS_SELECTOR)
        if (pressed && !pressed.matches(":disabled, [aria-disabled=\"true\"], [data-disabled]")) haptic()
      }
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

export { InkProvider, haptic }

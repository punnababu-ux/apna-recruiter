"use client"

/**
 * The hero's "Login / Sign up" hands its green over to the header.
 *
 * The homepage card's CTA is the page's one green action. Once it has
 * scrolled up behind the top bar, the header's "Login / Sign up" turns green
 * in its place, and back to dark when the hero CTA returns, so exactly one
 * green login is on screen at a time (AGENTS.md, one primary per screen).
 *
 *   useTrackHeroCta(ref)   on the hero CTA: reports whether it's hidden
 *   useHeroCtaHidden()     in the header: true while it's hidden
 *
 * Hidden means scrolled up past the top bar's bottom edge, not merely
 * off-screen below (a phone where the card starts under the fold keeps the
 * header dark). Pages without a hero CTA never set it, so their header
 * stays dark.
 */

import * as React from "react"

let hidden = false
const listeners = new Set<() => void>()

function set(next: boolean) {
  if (next === hidden) return
  hidden = next
  listeners.forEach((l) => l())
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function useHeroCtaHidden(): boolean {
  return React.useSyncExternalStore(subscribe, () => hidden, () => false)
}

export function useTrackHeroCta(ref: React.RefObject<HTMLElement | null>, enabled = true) {
  React.useEffect(() => {
    if (!enabled) return
    let frame = 0
    const measure = () => {
      frame = 0
      const cta = ref.current
      if (!cta) return
      const bar = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0
      set(cta.getBoundingClientRect().bottom <= bar)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) cancelAnimationFrame(frame)
      set(false)
    }
  }, [ref, enabled])
}

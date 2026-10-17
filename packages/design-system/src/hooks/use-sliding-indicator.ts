"use client"

/**
 * useSlidingIndicator — one selection pill that glides between options.
 *
 * For hand-built segmented controls (SegmentedTabSwitcher, ChipTabs) that
 * can't use Base UI's Tabs.Indicator. Instead of every option painting its
 * own active background (which reads as a cross-fade when the selection
 * changes), the control renders ONE indicator element and this hook moves
 * it onto whichever child carries `data-indicator-active`.
 *
 * It writes the active option's box into four custom properties on the
 * indicator (`--indicator-left/top/width/height`, offsets relative to the
 * container). Position it with
 *   `absolute -z-1 left-(--indicator-left) top-(--indicator-top)
 *    w-(--indicator-width) h-(--indicator-height)`
 * and give it the `sliding-indicator` utility. The container needs
 * `relative isolate`, so the indicator sits above the container's
 * background and below the options' content.
 *
 * The first placement is instant, with no slide in from 0,0: the indicator
 * moves `data-state` from unset → "placed" → "ready", and the utility only
 * transitions once it is "ready". A ResizeObserver re-measures when the
 * layout changes, e.g. on a breakpoint flip or when a `hidden md:flex`
 * track first becomes visible.
 *
 * Usage:
 *   const { containerRef, indicatorRef } = useSlidingIndicator(value)
 *   <div ref={containerRef} className="relative isolate flex …">
 *     <span ref={indicatorRef} aria-hidden className="sliding-indicator … bg-card" />
 *     {items.map(i => <button data-indicator-active={i.value === value || undefined} …/>)}
 *   </div>
 */

import * as React from "react"

export function useSlidingIndicator<
  C extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLSpanElement,
>(activeKey: unknown) {
  const containerRef = React.useRef<C>(null)
  const indicatorRef = React.useRef<I>(null)

  React.useLayoutEffect(() => {
    const container = containerRef.current
    const indicator = indicatorRef.current
    if (!container || !indicator) return

    let frame = 0
    const measure = () => {
      const active = container.querySelector<HTMLElement>("[data-indicator-active]")
      // Hidden track (display: none) or nothing selected: nothing to place.
      if (!active || active.offsetWidth === 0) {
        delete indicator.dataset.state
        return
      }
      indicator.style.setProperty("--indicator-left", `${active.offsetLeft}px`)
      indicator.style.setProperty("--indicator-top", `${active.offsetTop}px`)
      indicator.style.setProperty("--indicator-width", `${active.offsetWidth}px`)
      indicator.style.setProperty("--indicator-height", `${active.offsetHeight}px`)
      if (!indicator.dataset.state) indicator.dataset.state = "placed"
      // Turn the transition on only after the instant first placement has
      // painted. Re-armed on every measure while still "placed": a re-render
      // inside those two frames runs the cleanup (cancelling the frame), and
      // arming only on the very first placement left the pill stuck at
      // "placed" — it jumped between options instead of sliding.
      if (indicator.dataset.state === "placed") {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (indicator.dataset.state === "placed") indicator.dataset.state = "ready"
          })
        })
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    for (const child of Array.from(container.children)) observer.observe(child)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [activeKey])

  return { containerRef, indicatorRef }
}

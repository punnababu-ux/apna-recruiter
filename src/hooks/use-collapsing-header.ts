"use client"

/**
 * useCollapsingHeader — phones: scrolling down a list slides the app's top
 * bar (and the page's search) away so the list gets the screen; scrolling
 * up brings them back. Pages opt in; the top bar and any sticky row react to
 * `data-header-hidden` on <html>:
 *
 *   top bar      max-md:[[data-header-hidden]_&]:-translate-y-full
 *   sticky row   sticky top-16, max-md:[[data-header-hidden]_&]:-translate-y-16
 *                (rides up into the bar's place)
 *
 * The attribute is cleared when the page unmounts, so other pages keep a
 * fixed bar.
 */

import * as React from "react"

const ATTR = "data-header-hidden"

export function useCollapsingHeader() {
  React.useEffect(() => {
    const root = document.documentElement
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 64) root.removeAttribute(ATTR)
      else if (y > last + 4) root.setAttribute(ATTR, "")
      else if (y < last - 4) root.removeAttribute(ATTR)
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      root.removeAttribute(ATTR)
    }
  }, [])
}

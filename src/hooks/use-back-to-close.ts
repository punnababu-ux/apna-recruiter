"use client"

/**
 * useBackToClose — the browser's back button / Android back gesture closes
 * an open overlay instead of leaving the page (the platform convention for
 * sheets and dialogs; installable web apps get it the same way).
 *
 * While `open`, one history entry is added; Back pops it and calls
 * `requestClose`, which goes through the overlay's own close path (e.g. the
 * order summary's exit offer). If the host keeps the overlay open (the
 * offer is showing), the entry is re-added so the next Back works too.
 * Closing the overlay any other way removes the entry.
 *
 * Only for overlays. Never use history entries to stop someone leaving a
 * page — that's back-button hijacking, and browsers skip such entries.
 */

import * as React from "react"

export function useBackToClose(open: boolean, requestClose: () => void) {
  const pushed = React.useRef(false)
  const openRef = React.useRef(open)
  const closeRef = React.useRef(requestClose)

  React.useEffect(() => {
    openRef.current = open
    closeRef.current = requestClose
  })

  React.useEffect(() => {
    if (!open) {
      // Closed some other way: take our entry back off the stack.
      if (pushed.current) {
        pushed.current = false
        window.history.back()
      }
      return
    }

    if (!pushed.current) {
      window.history.pushState({ backToClose: true }, "")
      pushed.current = true
    }

    const onPopState = () => {
      if (!pushed.current) return
      pushed.current = false
      closeRef.current()
      // Still open (the host showed an offer instead): re-arm Back.
      setTimeout(() => {
        if (openRef.current && !pushed.current) {
          window.history.pushState({ backToClose: true }, "")
          pushed.current = true
        }
      }, 0)
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [open])
}

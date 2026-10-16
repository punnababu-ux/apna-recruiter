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
 * Overlays stack: a pop-up opened on top of the order summary is closed by
 * the first Back, the summary by the next. One shared popstate listener
 * hands each Back to the top-most overlay only.
 *
 * Only for overlays. Never use history entries to stop someone leaving a
 * page — that's back-button hijacking, and browsers skip such entries.
 */

import * as React from "react"

type Entry = { onBack: () => void }

/** Overlays holding a history entry, oldest first. */
const stack: Entry[] = []
/** Pops we caused ourselves (an overlay closed some other way). */
let selfPops = 0
let listening = false

function onPopState() {
  if (selfPops > 0) {
    selfPops--
    return
  }
  stack.pop()?.onBack()
}

function push(entry: Entry) {
  if (!listening) {
    window.addEventListener("popstate", onPopState)
    listening = true
  }
  window.history.pushState({ backToClose: true }, "")
  stack.push(entry)
}

function remove(entry: Entry) {
  const i = stack.indexOf(entry)
  if (i >= 0) stack.splice(i, 1)
  return i >= 0
}

export function useBackToClose(open: boolean, requestClose: () => void) {
  const openRef = React.useRef(open)
  const closeRef = React.useRef(requestClose)
  const entryRef = React.useRef<Entry | null>(null)
  const unmounting = React.useRef(false)

  // Declared before the effect below so its cleanup runs first on unmount.
  React.useEffect(() => {
    unmounting.current = false
    return () => {
      unmounting.current = true
    }
  }, [])

  React.useEffect(() => {
    openRef.current = open
    closeRef.current = requestClose
  })

  React.useEffect(() => {
    if (!open) return

    const entry: Entry = {
      onBack: () => {
        closeRef.current()
        // Still open (the host showed an offer instead): re-arm Back.
        setTimeout(() => {
          if (openRef.current && entryRef.current === entry && !stack.includes(entry)) push(entry)
        }, 0)
      },
    }
    entryRef.current = entry
    push(entry)

    return () => {
      entryRef.current = null
      // Closed some other way (X, a CTA, Escape): take our entry back off
      // the history stack. Not when Back already popped it, and not on
      // unmount: that's a navigation, and going back would undo it.
      if (remove(entry) && !unmounting.current) {
        selfPops++
        window.history.back()
      }
    }
  }, [open])
}

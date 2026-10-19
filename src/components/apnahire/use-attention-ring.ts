"use client"

import * as React from "react"

/**
 * useAttentionRing — whether an order-summary add-on should run the
 * `attention-ring` as the panel opens.
 * Starts when `active` turns true (the panel opens). Runs once per add-on
 * per browser session, so reopening the panel is quiet.
 */
export function useAttentionRing(key: string, active = true) {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    if (!active) return
    const storageKey = `attention-ring:${key}`
    try {
      if (sessionStorage.getItem(storageKey)) return
      sessionStorage.setItem(storageKey, "1")
    } catch {
      // Storage blocked: still run, just not remembered.
    }
    setOn(true)
  }, [key, active])

  return on
}

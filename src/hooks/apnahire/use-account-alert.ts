"use client"

/**
 * useAccountAlert — the account-level alert ("Verify Identity: Complete tax
 * verification to post jobs."), shared by its two homes: the desktop
 * sidebar and, on phones, the More card (plus a dot on the More tab while
 * it's active). Dismissing it in either place clears both. In-memory for
 * the session; the real condition will come from the account's status.
 */

import * as React from "react"

export const ACCOUNT_ALERT = {
  id: "verify-identity",
  title: "Verify Identity: Complete tax verification to post jobs.",
  ctaText: "Verify",
  variant: "warning" as const,
  appearance: "secondary" as const,
}

let dismissed = false
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAccountAlert() {
  const isDismissed = React.useSyncExternalStore(subscribe, () => dismissed, () => false)
  return {
    alert: isDismissed ? null : ACCOUNT_ALERT,
    dismiss: React.useCallback(() => {
      dismissed = true
      listeners.forEach((l) => l())
    }, []),
  }
}

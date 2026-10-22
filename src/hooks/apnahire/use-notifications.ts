"use client"

/**
 * useNotifications — one shared, in-memory notification list for the
 * session: the bell's unread badge (bottom bar, desktop top bar), the phone
 * page and the desktop panel all read and update the same state, so marking
 * one read clears the badge everywhere. Mock data until there's an API.
 */

import * as React from "react"
import { MOCK_NOTIFICATIONS, type RecruiterNotification } from "@/content/notifications"
import { announcesNewPrices } from "@/content/pricing-phase"
import { usePricingPhase } from "@/hooks/use-pricing-phase"

let state: RecruiterNotification[] = MOCK_NOTIFICATIONS
const listeners = new Set<() => void>()

function set(next: RecruiterNotification[]) {
  state = next
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useNotifications() {
  const all = React.useSyncExternalStore(subscribe, () => state, () => MOCK_NOTIFICATIONS)
  // The price-change notice: December pricing phase only (preview settings).
  const announced = announcesNewPrices(usePricingPhase())
  const notifications = React.useMemo(
    () => (announced ? all : all.filter((n) => n.kind !== "price")),
    [all, announced],
  )
  return {
    notifications,
    unreadCount: notifications.filter((n) => n.unread).length,
    markRead: React.useCallback((id: string) => {
      set(state.map((n) => (n.id === id ? { ...n, unread: false } : n)))
    }, []),
    markAllRead: React.useCallback(() => {
      set(state.map((n) => ({ ...n, unread: false })))
    }, []),
  }
}

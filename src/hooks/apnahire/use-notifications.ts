"use client"

/**
 * useNotifications — one shared, in-memory notification list for the
 * session: the bell's unread badge (bottom bar, desktop top bar), the phone
 * page and the desktop panel all read and update the same state, so marking
 * one read clears the badge everywhere. Mock data until there's an API.
 */

import * as React from "react"
import { MOCK_NOTIFICATIONS, type RecruiterNotification } from "@/content/notifications"

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
  const notifications = React.useSyncExternalStore(subscribe, () => state, () => MOCK_NOTIFICATIONS)
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

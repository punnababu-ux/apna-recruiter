"use client"

/**
 * useChats — one shared, in-memory list of Apna Chat threads for the
 * session: the Chats tab's urgent badge (bottom bar, sidebar), the inbox and
 * the thread screen all read and update the same state, so answering an
 * urgent thread clears it from the badge everywhere. Mock data until there's
 * an API.
 */

import * as React from "react"
import { MOCK_THREADS, type ChatThread } from "@/content/chats"

let state: ChatThread[] = MOCK_THREADS
const listeners = new Set<() => void>()

function set(next: ChatThread[]) {
  state = next
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useChats() {
  const threads = React.useSyncExternalStore(subscribe, () => state, () => MOCK_THREADS)
  return {
    threads,
    urgentCount: threads.filter((t) => t.status === "urgent").length,
    markRead: React.useCallback((id: string) => {
      set(state.map((t) => (t.id === id && t.unread ? { ...t, unread: false } : t)))
    }, []),
    /** The recruiter replies: the thread is no longer urgent, and the AI
     *  stops (PRD: the recruiter takes over). */
    reply: React.useCallback((id: string, text: string) => {
      set(
        state.map((t) =>
          t.id === id
            ? {
                ...t,
                status: t.status === "urgent" || t.status === "ai-screening" ? "active" : t.status,
                lastAt: "Now",
                messages: [...t.messages, { id: `m${t.messages.length + 1}`, from: "recruiter", text, time: "Now" }],
              }
            : t
        )
      )
    }, []),
  }
}

"use client"

/**
 * useChats — one shared, in-memory list of Apna Chat threads for the
 * session: the Chats tab's urgent badge (bottom bar, sidebar), the inbox and
 * the thread screen all read and update the same state, so answering an
 * urgent thread clears it from the badge everywhere. Mock data until there's
 * an API.
 *
 * A reply goes through the same states as WhatsApp's: it is added as
 * "sending", then mock timers move it to "sent" (~0.6 s), "delivered"
 * (~1.5 s) and "read" (~4 s). The timers are module-level, not per render,
 * and each removes itself when it fires.
 *
 * closeThread / reopenThread: the recruiter's "Not interested" closes the
 * thread as "Not a fit" and the AI stops (PRD); it remembers the status it
 * had, so Undo and "Reopen chat" restore it (else "active"). Data rule (PRD):
 * a candidate message that arrives on a closed thread reopens it as urgent.
 * The mock has no live incoming messages, so nothing implements this yet: the
 * incoming path must do `status: "urgent", closedReason: undefined`.
 */

import * as React from "react"
import { MOCK_THREADS, type ChatFile, type ChatThread, type ClosedReason, type MessageStatus } from "@/content/chats"

let state: ChatThread[] = MOCK_THREADS
const listeners = new Set<() => void>()

function set(next: ChatThread[]) {
  state = next
  listeners.forEach((l) => l())
}

/** Mock delivery steps for a reply, in ms after sending. */
const STATUS_STEPS: [MessageStatus, number][] = [
  ["sent", 600],
  ["delivered", 1500],
  ["read", 4000],
]
const timers = new Set<ReturnType<typeof setTimeout>>()
let nextMessage = 1

/** The current clock time, as the thread shows it: "10:42 am". */
export function clockTime(date = new Date()) {
  const h = date.getHours()
  const m = String(date.getMinutes()).padStart(2, "0")
  return `${h % 12 || 12}:${m} ${h < 12 ? "am" : "pm"}`
}

function setMessageStatus(threadId: string, messageId: string, status: MessageStatus) {
  set(
    state.map((t) =>
      t.id === threadId ? { ...t, messages: t.messages.map((m) => (m.id === messageId ? { ...m, status } : m)) } : t
    )
  )
}

function scheduleStatus(threadId: string, messageId: string) {
  for (const [status, delay] of STATUS_STEPS) {
    const timer = setTimeout(() => {
      timers.delete(timer)
      setMessageStatus(threadId, messageId, status)
    }, delay)
    timers.add(timer)
  }
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
    /** A private note on the candidate. Newest first. */
    addNote: React.useCallback((id: string, text: string) => {
      const clean = text.trim()
      if (!clean) return
      set(
        state.map((t) =>
          t.id === id ? { ...t, notes: [{ id: `n${Date.now()}`, text: clean, at: `Today, ${clockTime()}` }, ...t.notes] } : t
        )
      )
    }, []),
    /** Mock: spends a database credit and opens the resume. */
    unlockResume: React.useCallback((id: string) => {
      set(state.map((t) => (t.id === id ? { ...t, resumeUnlocked: true } : t)))
    }, []),
    /** Closes the thread with a reason and stops the AI. Remembers the status for reopenThread. */
    closeThread: React.useCallback((id: string, reason: ClosedReason) => {
      set(
        state.map((t) =>
          t.id === id && t.status !== "closed"
            ? { ...t, status: "closed", closedReason: reason, statusBeforeClose: t.status }
            : t
        )
      )
    }, []),
    /** Reopens a closed thread: back to the status it had before closing, else "active". */
    reopenThread: React.useCallback((id: string) => {
      set(
        state.map((t) =>
          t.id === id && t.status === "closed"
            ? { ...t, status: t.statusBeforeClose ?? "active", closedReason: undefined, statusBeforeClose: undefined }
            : t
        )
      )
    }, []),
    /** The recruiter replies: the thread is no longer urgent, and the AI
     *  stops (PRD: the recruiter takes over). One message carries the text
     *  (the caption) and all `files`. Prototype: nothing is uploaded; the files
     *  stay as metadata and object URLs. */
    reply: React.useCallback((id: string, text: string, files?: ChatFile[]) => {
      const messageId = `r${nextMessage++}`
      set(
        state.map((t) =>
          t.id === id
            ? {
                ...t,
                status: t.status === "urgent" || t.status === "ai-screening" ? "active" : t.status,
                messages: [
                  ...t.messages,
                  {
                    id: messageId,
                    from: "recruiter",
                    text,
                    day: "Today",
                    time: clockTime(),
                    status: "sending",
                    ...(files?.length ? { files } : {}),
                  },
                ],
              }
            : t
        )
      )
      scheduleStatus(id, messageId)
    }, []),
  }
}

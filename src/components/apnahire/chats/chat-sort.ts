/**
 * Chat list ordering — the inbox's Sort menu.
 *
 *   urgent-first  Urgent threads, then unread, then recency (default)
 *   newest        Recency only
 *   unread-first  Unread, then recency
 *   name          Candidate name, A to Z
 *
 * Recency has ONE source: the newest message's own day and time (the same
 * fields the row shows). `messageAge` turns them into minutes before "now"
 * (smaller is newer). Now is Wednesday 4 Nov, 11:30 am, the prototype's
 * clock. Days back: "Today" 0, "Yesterday" 1, a weekday name its days back
 * (today's own name is a week back), a date ("28 Oct") its days back from
 * 4 Nov. Age is days * 24 h plus (now's minutes after midnight minus the
 * message's). A time after 11:30 today (a reply sent by the real clock) is
 * negative, so it ranks newest. Text it can't read ranks last. Replace with
 * real timestamps when the API gives them.
 */

import type { ChatThread } from "@/content/chats"

export type ChatSort = "urgent-first" | "newest" | "unread-first" | "name"

export const SORT_OPTIONS: { value: ChatSort; label: string }[] = [
  { value: "urgent-first", label: "Urgent first" },
  { value: "newest", label: "Newest" },
  { value: "unread-first", label: "Unread first" },
  { value: "name", label: "Name (A–Z)" },
]

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
/** The prototype's "today": Wednesday. */
const TODAY = 3
const DAY = 24 * 60
/** The prototype's "now", in minutes after midnight: 11:30 am. */
const NOW = 11 * 60 + 30

/** Days back for a divider day ("Today", "Yesterday", "Mon", "28 Oct"); NaN when unreadable. */
function daysBack(day: string): number {
  const s = day.trim().toLowerCase()
  if (s === "today") return 0
  if (s === "yesterday") return 1
  const date = /^(\d{1,2})\s+([a-z]{3})$/.exec(s)
  if (date) {
    const month = MONTHS.indexOf(date[2])
    if (month < 0) return Number.NaN
    const days = Math.round((Date.UTC(2026, 10, 4) - Date.UTC(2026, month, Number(date[1]))) / (DAY * 60000))
    return days > 0 ? days : days + 365
  }
  const weekday = WEEKDAYS.indexOf(s.slice(0, 3))
  return weekday >= 0 ? (TODAY - weekday + 7) % 7 || 7 : Number.NaN
}

/** Minutes after midnight for "10:42 am"; NaN when unreadable. */
function minutesOfDay(time: string): number {
  const m = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(time.trim())
  if (!m) return Number.NaN
  return (Number(m[1]) % 12) * 60 + Number(m[2]) + (m[3].toLowerCase() === "pm" ? 12 * 60 : 0)
}

/** Minutes before "now" (Wed 11:30 am) for a message's day and time; smaller is newer. */
export function messageAge(day: string, time: string): number {
  const age = daysBack(day) * DAY + NOW - minutesOfDay(time)
  return Number.isNaN(age) ? Number.POSITIVE_INFINITY : age
}

/** A thread's recency: the age of its newest message. A thread with no messages ranks last. */
export function recencyRank(t: ChatThread): number {
  const last = t.messages[t.messages.length - 1]
  return last ? messageAge(last.day, last.time) : Number.POSITIVE_INFINITY
}

/** A sorted copy; ties keep the list's own order. */
export function sortThreads(threads: ChatThread[], sort: ChatSort): ChatThread[] {
  const flag = (b: boolean) => (b ? 1 : 0)
  const byRecency = (a: ChatThread, b: ChatThread) => recencyRank(a) - recencyRank(b)
  const compare: Record<ChatSort, (a: ChatThread, b: ChatThread) => number> = {
    "urgent-first": (a, b) =>
      flag(b.status === "urgent") - flag(a.status === "urgent") || flag(b.unread) - flag(a.unread) || byRecency(a, b),
    newest: byRecency,
    "unread-first": (a, b) => flag(b.unread) - flag(a.unread) || byRecency(a, b),
    name: (a, b) => a.candidate.name.localeCompare(b.candidate.name),
  }
  return threads
    .map((t, i) => ({ t, i }))
    .sort((x, y) => compare[sort](x.t, y.t) || x.i - y.i)
    .map(({ t }) => t)
}

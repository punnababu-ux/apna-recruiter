/**
 * Chat list ordering — the inbox's Sort menu.
 *
 *   urgent-first  Urgent threads, then unread, then recency (default)
 *   newest        Recency only
 *   unread-first  Unread, then recency
 *   name          Candidate name, A to Z
 *
 * Recency: the mock's `lastAt` is display text ("Now", "2m", "18m", "1h",
 * "Yesterday", "Mon", "Sun"), so `recencyRank` turns it into minutes ago
 * (smaller is newer). Now is 0, "Nm" is N, "Nh" is 60 N, "Yesterday" is one
 * day, and a weekday name is its days back from today (the prototype's
 * today is Wednesday, so "Mon" is 2 days and "Sun" is 3; today's own name
 * means a week ago). Text it can't read ranks last. Replace with real
 * timestamps when the API gives them.
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
/** The prototype's "today": Wednesday. */
const TODAY = 3
const DAY = 24 * 60

/** Minutes ago for a `lastAt` string; smaller is newer. */
export function recencyRank(lastAt: string): number {
  const s = lastAt.trim().toLowerCase()
  if (s === "now") return 0
  if (s === "yesterday") return DAY
  const unit = /^(\d+)\s*(m|h|d)$/.exec(s)
  if (unit) return Number(unit[1]) * { m: 1, h: 60, d: DAY }[unit[2] as "m" | "h" | "d"]
  const day = WEEKDAYS.indexOf(s.slice(0, 3))
  if (day >= 0) return ((TODAY - day + 7) % 7 || 7) * DAY
  return Number.POSITIVE_INFINITY
}

/** A sorted copy; ties keep the list's own order. */
export function sortThreads(threads: ChatThread[], sort: ChatSort): ChatThread[] {
  const flag = (b: boolean) => (b ? 1 : 0)
  const byRecency = (a: ChatThread, b: ChatThread) => recencyRank(a.lastAt) - recencyRank(b.lastAt)
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

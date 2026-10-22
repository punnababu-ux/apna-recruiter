/**
 * Recruiter notifications — mock data for the notification centre (phone
 * page /apnahire/notifications, desktop side panel). Copy from the product
 * reference screenshot (2026-10-16). Replace with the API when it exists.
 */

import { PRICE_CHANGE } from "@/content/price-change"

export type NotificationKind = "application" | "ai" | "summary" | "action" | "expired" | "credits" | "price"

export interface RecruiterNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  /** Relative, as shown: "2h ago". */
  time: string
  group: "today" | "yesterday" | "week"
  unread: boolean
  /** New applications carry quick actions. */
  candidate?: { name: string; phone: string }
  /** One link, for a notice that leads somewhere ("See plans"). */
  action?: { label: string; href: string }
}

export const NOTIFICATION_GROUPS: { id: RecruiterNotification["group"]; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "week", label: "Earlier this week" },
]

/** The Jan 1, 2027 price change: one notice, on top. Shown only in the
 *  December pricing phase (useNotifications). */
const PRICE_CHANGE_NOTIFICATION: RecruiterNotification = {
  id: "price-change-2027",
  kind: "price",
  title: PRICE_CHANGE.notification.title,
  body: PRICE_CHANGE.notification.body,
  time: "1h ago",
  group: "today",
  unread: true,
  action: { label: PRICE_CHANGE.notification.action, href: PRICE_CHANGE.plansHref },
}

export const MOCK_NOTIFICATIONS: RecruiterNotification[] = [
  PRICE_CHANGE_NOTIFICATION,
  {
    id: "n1",
    kind: "application",
    title: "New application",
    body: "Mohd Sahjad, M, 33 yrs applied for Field Sales Executive.",
    time: "2h ago",
    group: "today",
    unread: true,
    candidate: { name: "Mohd Sahjad", phone: "+919800000000" },
  },
  {
    id: "n2",
    kind: "ai",
    title: "AI agent fit",
    body: "10 candidates are verified and marked as ready for interview for your Reception Sales job.",
    time: "5h ago",
    group: "today",
    unread: false,
  },
  {
    id: "n3",
    kind: "summary",
    title: "Daily job summary",
    body: "You have 1 active job. You received 7 new applications yesterday.",
    time: "5h ago",
    group: "today",
    unread: false,
  },
  {
    id: "n4",
    kind: "action",
    title: "Action required",
    body: "We tried calling you to verify the job you posted. It will be approved once you complete company and HR verification.",
    time: "8h ago",
    group: "today",
    unread: false,
  },
  {
    id: "n5",
    kind: "expired",
    title: "Job expired",
    body: "Social Media Marketing Executive has expired. 4,500+ more candidates are interested.",
    time: "1d ago",
    group: "yesterday",
    unread: false,
  },
  {
    id: "n6",
    kind: "credits",
    title: "Use your credits",
    body: "Your database credits expire soon. Unlock candidates before they do.",
    time: "3d ago",
    group: "week",
    unread: false,
  },
]

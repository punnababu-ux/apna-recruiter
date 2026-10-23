"use client"

/**
 * useJobSlots — a subscription's active job slots and the jobs using them.
 *
 * `null`: no subscription (job posting ends on the plan step, buying a
 * plan). Otherwise posting ends with "Post job": a free slot posts at once;
 * with every slot in use, the "All job slots are in use" pop-up offers to
 * expire a live job or add a slot (SlotsFullDialog).
 *
 * The rest of the subscription rides along: its term, the day this cycle
 * started (renewal = start + the term's days), what was paid for it, the
 * database credits left, the hiring city it is locked to, and a downgrade
 * waiting for the cycle's end. How a plan changes (user call, 2026-10-23):
 *
 *   Upgrade    (a longer term or more slots, nothing less) is instant. The
 *              unused part of this cycle's payment comes off the new plan's
 *              price (prorationOf) and the new plan starts today.
 *   Downgrade  (a shorter term or fewer slots) waits: it is scheduled for
 *              the cycle's end, and the current plan runs until then.
 *
 * Prototype: kept in localStorage and switched from the floating settings
 * panel (SLOT_PRESETS). In production this is the account's subscription.
 */

import * as React from "react"
import { setActiveSubscription } from "@/hooks/use-active-subscription"
import { SUBSCRIPTION_TERMS, type SubscriptionPlan, type SubscriptionPlanId } from "@/content/subscriptions"

export type SlotJob = {
  id: string
  title: string
  location: string
  postedAt: string
  applied: number
}

/** A downgrade booked for the cycle's end: the plan it turns into. */
export type ScheduledChange = {
  term: SubscriptionPlanId
  slots: number
  price: number
  dbCredits: number
  /** Why (the downgrade flow's answers). */
  reasons?: string[]
}

export type Subscription = {
  plan: string
  total: number
  jobs: SlotJob[]
  /** Optional from here on: state saved before they existed reads as a
   *  monthly plan started today (subscriptionOf). */
  term?: SubscriptionPlanId
  /** The day this cycle started, "2026-10-11". */
  startedOn?: string
  /** ₹ paid for this cycle, what an upgrade credits back. */
  paid?: number
  db?: { left: number; total: number }
  /** The one city the plan hires in. */
  city?: string
  scheduled?: ScheduledChange
  /** How renewals are paid; UPI autopay when not set. */
  payMethod?: "upi-autopay" | "card"
  /** Cancelled: the plan runs to its renewal date, then ends. */
  cancelled?: boolean
  /** Why it was cancelled (the cancel flow's answers). */
  cancelReasons?: string[]
  /** Payments for the plan, newest first (invoices). */
  payments?: PlanPayment[]
}

export type PlanPayment = { id: string; on: string; plan: string; amount: number }

export type JobSlots = Subscription | null

const STORAGE_KEY = "apnahire:job-slots"
const EVENT = "apnahire:job-slots"

const LIVE_JOBS: SlotJob[] = [
  { id: "delivery-andheri", title: "Delivery Executive", location: "Andheri East, Mumbai", postedAt: "8 Oct 2026", applied: 6 },
  { id: "back-office-powai", title: "Back Office Executive", location: "Powai, Mumbai", postedAt: "2 Oct 2026", applied: 12 },
]

/** Where a plan bought without a city on file hires (the prototype's). */
export const DEFAULT_HIRING_CITY = "Mumbai"

/** The presets' plan: today's 2-slot monthly plan, 12 days into its cycle. */
const MONTHLY_2: Omit<Subscription, "jobs"> = {
  plan: SUBSCRIPTION_TERMS.monthly.name,
  term: "monthly",
  total: 2,
  startedOn: isoDay(-12),
  paid: 4499,
  db: { left: 320, total: 500 },
  city: DEFAULT_HIRING_CITY,
}

export const SLOT_PRESETS = {
  none: { label: "No subscription", slots: null as JobSlots },
  free: { label: "Subscription · 1 of 2 slots free", slots: { ...MONTHLY_2, jobs: LIVE_JOBS.slice(0, 1) } as JobSlots },
  full: { label: "Subscription · all 2 slots in use", slots: { ...MONTHLY_2, jobs: LIVE_JOBS } as JobSlots },
} as const
export type SlotPreset = keyof typeof SLOT_PRESETS

const SAMPLE_JOBS: SlotJob[] = [
  ...LIVE_JOBS,
  { id: "telecaller-thane", title: "Telecaller", location: "Thane West, Mumbai", postedAt: "28 Sep 2026", applied: 19 },
  { id: "store-manager-bandra", title: "Store Manager", location: "Bandra West, Mumbai", postedAt: "25 Sep 2026", applied: 4 },
  { id: "accountant-dadar", title: "Accountant", location: "Dadar, Mumbai", postedAt: "21 Sep 2026", applied: 9 },
]

/** A preset as a plan the plans pages sell in the current pricing phase
 *  (usePlans().plan), so Manage plan, "Plan details" and the plan cards
 *  agree on its slots, price and database credits. 12 days into its cycle,
 *  about two thirds of its database credits left. */
export function sampleSubscription(preset: SlotPreset, plan: SubscriptionPlan): JobSlots {
  if (preset === "none") return null
  return {
    plan: plan.name,
    term: plan.id,
    total: plan.slots,
    startedOn: isoDay(-12),
    paid: plan.price,
    db: { left: Math.round((plan.dbCredits * 0.64) / 10) * 10, total: plan.dbCredits },
    city: DEFAULT_HIRING_CITY,
    jobs: SAMPLE_JOBS.slice(0, preset === "full" ? plan.slots : 1),
  }
}

/** Which preset a subscription reads as: one live job, or every slot used. */
export function samplePresetOf(slots: JobSlots): SlotPreset | null {
  if (!slots) return "none"
  if (slots.total > 1 && slots.jobs.length === 1) return "free"
  if (slots.jobs.length === slots.total) return "full"
  return null
}

let cachedRaw: string | null | undefined
let cached: JobSlots = null

function read(): JobSlots {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    raw = null
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cached = raw ? (JSON.parse(raw) as JobSlots) : null
    } catch {
      cached = null
    }
  }
  return cached
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export function setJobSlots(slots: JobSlots) {
  try {
    if (slots) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked — lasts until reload.
  }
  // A subscription is what the sidebar's "Manage plans" reads.
  setActiveSubscription(!!slots)
  window.dispatchEvent(new Event(EVENT))
}

export function useJobSlots(): JobSlots {
  return React.useSyncExternalStore(subscribe, read, () => null)
}

/** Which preset the current state matches, for the settings panel. */
export function slotPresetOf(slots: JobSlots): SlotPreset | null {
  if (!slots) return "none"
  if (slots.total === 2 && slots.jobs.length === 1) return "free"
  if (slots.total === 2 && slots.jobs.length === 2) return "full"
  return null
}

export const freeSlots = (slots: JobSlots) => (slots ? Math.max(0, slots.total - slots.jobs.length) : 0)

/** "3rd", for "Upgrade 3rd slot". */
export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
}

export const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

/* ─────────────────────────────── Plan cycle ──────────────────────────── */

// A declaration, not a const: SLOT_PRESETS calls isoDay at load, above here.
function pad2(n: number) {
  return String(n).padStart(2, "0")
}

/** A local day as "2026-10-23", `offset` days from today. */
export function isoDay(offset = 0, from?: string) {
  const d = from ? new Date(`${from}T00:00:00`) : new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

/** "21 Nov 2026". */
export const dayLabel = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const daysBetween = (from: string, to: string) =>
  Math.round((new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86_400_000)

/** The subscription with every field filled, and its cycle worked out. */
export function subscriptionOf(slots: Subscription) {
  const term = slots.term ?? "monthly"
  const termDays = SUBSCRIPTION_TERMS[term].slotDays
  const startedOn = slots.startedOn ?? isoDay()
  const renewsOn = isoDay(termDays, startedOn)
  return {
    ...slots,
    term,
    termDays,
    startedOn,
    renewsOn,
    daysLeft: Math.min(termDays, Math.max(0, daysBetween(isoDay(), renewsOn))),
    city: slots.city ?? DEFAULT_HIRING_CITY,
    payMethod: slots.payMethod ?? "upi-autopay",
    cancelled: slots.cancelled ?? false,
    // State saved before payments were kept: this cycle's payment, as
    // charged (with 18% GST, like the order summary).
    payments: slots.payments ?? [
      { id: `pay-${startedOn}`, on: startedOn, plan: slots.plan, amount: Math.round((slots.paid ?? 0) * 1.18) },
    ],
  }
}

/** Undoes a cancellation before the renewal date: the plan renews again. */
export function reactivateSubscription(sub: Subscription) {
  setJobSlots({ ...sub, cancelled: false, cancelReasons: undefined })
}
export type SubscriptionDetails = ReturnType<typeof subscriptionOf>

const TERM_ORDER: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]

/** Moving to `plan`: the same plan, an upgrade (instant), or a downgrade
 *  (at the cycle's end). Anything less — a shorter term or fewer slots,
 *  even with more of the other — is a downgrade. */
export function changeKindOf(sub: SubscriptionDetails, plan: Pick<SubscriptionPlan, "id" | "slots">) {
  const term = TERM_ORDER.indexOf(plan.id) - TERM_ORDER.indexOf(sub.term)
  const slots = plan.slots - sub.total
  if (term === 0 && slots === 0) return "same" as const
  return term >= 0 && slots >= 0 ? ("upgrade" as const) : ("downgrade" as const)
}

/** An upgrade's price: the unused part of this cycle's payment (paid × days
 *  left ÷ the term's days) comes off the new plan. `listPrice` stands in
 *  when nothing was recorded as paid. */
export function prorationOf(sub: SubscriptionDetails, newPrice: number, listPrice: number) {
  const paid = sub.paid ?? listPrice
  const credit = Math.min(newPrice, Math.round((paid * sub.daysLeft) / sub.termDays))
  return { credit, payToday: newPrice - credit }
}

const planFields = (plan: SubscriptionPlan) => ({
  plan: plan.name,
  term: plan.id,
  total: plan.slots,
  startedOn: isoDay(),
  paid: plan.price,
  db: { left: plan.dbCredits, total: plan.dbCredits },
})

/** A plan bought from the plans pages: its slots, empty, from today. */
export function startSubscription(plan: SubscriptionPlan, jobs: SlotJob[] = []) {
  setJobSlots({ ...planFields(plan), jobs, city: DEFAULT_HIRING_CITY })
}

/** An upgrade, paid: the new plan from today, with its own database
 *  credits. Live jobs keep their slots; a booked downgrade is dropped. */
export function upgradeSubscription(sub: Subscription, plan: SubscriptionPlan, amountPaid: number) {
  const payments = subscriptionOf(sub).payments
  setJobSlots({
    ...sub,
    ...planFields(plan),
    scheduled: undefined,
    cancelled: false,
    payments: [{ id: `pay-${Date.now().toString(36)}`, on: isoDay(), plan: plan.name, amount: amountPaid }, ...payments],
  })
}

/** Books a downgrade for the cycle's end. */
export function scheduleDowngrade(sub: Subscription, plan: SubscriptionPlan, reasons?: string[]) {
  setJobSlots({
    ...sub,
    scheduled: { term: plan.id, slots: plan.slots, price: plan.price, dbCredits: plan.dbCredits, reasons },
  })
}

export function cancelScheduledChange(sub: Subscription) {
  setJobSlots({ ...sub, scheduled: undefined })
}

/** Prototype: the cycle ends now. It renews, as the booked downgrade if
 *  there is one (a cancelled plan ends instead: `endSubscription`); live jobs past its slots expire (the newest first). */
export function renewSubscription(sub: Subscription) {
  const next = sub.scheduled
  const term = next?.term ?? sub.term ?? "monthly"
  const total = next?.slots ?? sub.total
  const db = next?.dbCredits ?? sub.db?.total ?? 0
  setJobSlots({
    ...sub,
    plan: SUBSCRIPTION_TERMS[term].name,
    term,
    total,
    jobs: sub.jobs.slice(0, total),
    startedOn: isoDay(),
    paid: next?.price ?? sub.paid,
    db: { left: db, total: db },
    scheduled: undefined,
  })
}

/** Cancelled: the plan runs to its renewal date, then ends (nothing more
 *  is charged; a booked downgrade is dropped). The reasons go with it. */
export function cancelAtRenewal(sub: Subscription, reasons: string[]) {
  setJobSlots({ ...sub, cancelled: true, scheduled: undefined, cancelReasons: reasons })
}

/** One change at a time (user call, 2026-10-23): a booked change blocks
 *  every other until it is undone or happens. A downgrade waits for the
 *  renewal date ("Keep current plan" drops it); a cancellation runs the plan
 *  to its end ("Reactivate plan" undoes it). An upgrade is instant, so it
 *  never books anything. */
export type ChangeLock = "downgrade" | "cancel"
export function changeLockOf(sub: SubscriptionDetails): ChangeLock | null {
  if (sub.scheduled) return "downgrade"
  if (sub.cancelled) return "cancel"
  return null
}

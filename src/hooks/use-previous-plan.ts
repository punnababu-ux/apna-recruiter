"use client"

/**
 * usePreviousPlan — the subscription that just ended, for the "Plan ended"
 * banner and the renew card (rules: docs/PRICING.md → "When a plan ends").
 *
 * A plan ends when a cancelled plan reaches its end date, or a renewal
 * payment fails (`endSubscription`). The account is then back on job
 * credits with nothing held back; its live jobs expire with the plan and the
 * hiring city is not kept. This remembers only what is needed to offer it
 * again: the plan, its slots, when and why it ended.
 *
 *   recentlyEnded(prev)  within BANNER_DAYS: the "expired" banner (jobs
 *                        dashboard, Manage plan, plans page) and Manage
 *                        plan's ended page show
 *
 * Prototype: kept in localStorage. In production, the account's last
 * subscription from the billing API.
 */

import * as React from "react"
import type { SubscriptionPlanId } from "@/content/subscriptions"
import { isoDay, setJobSlots, subscriptionOf, type Subscription } from "@/hooks/use-job-slots"

export type PlanEndReason = "cancelled" | "payment-failed"

export type PreviousPlan = {
  plan: string
  term: SubscriptionPlanId
  slots: number
  /** "2026-11-10" */
  endedOn: string
  reason: PlanEndReason
  /** ₹ last paid per cycle and the plan's database credits: the "expired"
   *  banner offers it back at the same price. Missing on older saved state. */
  paid?: number
  dbCredits?: number
}

/** How long the compact "Plan ended" banner shows (user call: a week). */
export const BANNER_DAYS = 7

const STORAGE_KEY = "apnahire:previous-plan"
const EVENT = "apnahire:previous-plan"

let cachedRaw: string | null | undefined
let cached: PreviousPlan | null = null

function read(): PreviousPlan | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    raw = null
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cached = raw ? (JSON.parse(raw) as PreviousPlan) : null
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

export function usePreviousPlan(): PreviousPlan | null {
  return React.useSyncExternalStore(subscribe, read, () => null)
}

export function setPreviousPlan(prev: PreviousPlan | null) {
  try {
    if (prev) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prev))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked — lasts until reload.
  }
  window.dispatchEvent(new Event(EVENT))
}

const daysSince = (iso: string) =>
  Math.round((new Date(`${isoDay()}T00:00:00`).getTime() - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000)

export const recentlyEnded = (prev: PreviousPlan | null) => !!prev && daysSince(prev.endedOn) < BANNER_DAYS

/** The plan ends now: back to job credits (live jobs expire with it, the
 *  city is not kept), and it is remembered to be offered again. */
export function endSubscription(sub: Subscription, reason: PlanEndReason, endedOn = isoDay()) {
  const details = subscriptionOf(sub)
  setPreviousPlan({
    plan: details.plan,
    term: details.term,
    slots: details.total,
    endedOn,
    reason,
    paid: details.paid,
    dbCredits: details.db?.total,
  })
  setJobSlots(null)
}

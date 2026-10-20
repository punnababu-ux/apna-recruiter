"use client"

/**
 * usePlansIngress — how loudly the app shell shows "Plans" (user call,
 * 2026-10-20). One rule for the phone bottom bar and the desktop sidebar:
 *
 *   "promote"  credits running out (1 job credit or fewer), no subscription:
 *              the gold Plans tile inside the phone bar; on desktop the top
 *              bar's credits button flips into "Top up credits" (the
 *              sidebar's Plans row stays plain: one loud invitation).
 *   "item"     just bought credits (more than 1 left): a plain item, like
 *              Database.
 *   "quiet"    has a subscription: they've bought the plan, so it sits where
 *              Support does (the More card / the sidebar footer), as
 *              "Manage plans".
 *
 * The job-credit balance is a prototype store (localStorage), raised by a
 * credit purchase in either checkout. In production it is the account's
 * balance.
 */

import * as React from "react"
import { useActiveSubscription } from "@/hooks/use-active-subscription"

const STORAGE_KEY = "apnahire:job-credits"
const EVENT = "apnahire:job-credits"

/** At or below this many job credits, plans are promoted again. */
export const LOW_CREDITS = 1

function read(): number {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY) ?? 0) || 0
  } catch {
    return 0
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export function setJobCredits(credits: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Math.max(0, credits)))
  } catch {
    // Storage blocked — the balance just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

/** A credit purchase: adds the credits named in the order line's label
 *  ("13 Job credits"). Other purchases leave the balance alone. */
export function addPurchasedJobCredits(label: string) {
  const m = label.match(/(\d+)\s+job credits?/i)
  if (m) setJobCredits(read() + Number(m[1]))
}

export function useJobCredits(): number {
  return React.useSyncExternalStore(subscribe, read, () => 0)
}

export type PlansIngress = "promote" | "item" | "quiet"

export function usePlansIngress(): PlansIngress {
  const subscribed = useActiveSubscription()
  const credits = useJobCredits()
  if (subscribed) return "quiet"
  return credits > LOW_CREDITS ? "item" : "promote"
}

"use client"

/**
 * useJobSlots — a subscription's active job slots and the jobs using them.
 *
 * `null`: no subscription (job posting ends on the plan step, buying a
 * plan). Otherwise posting ends with "Post job": a free slot posts at once;
 * with every slot in use, the "All job slots are in use" pop-up offers to
 * expire a live job or add a slot (SlotsFullDialog).
 *
 * Prototype: kept in localStorage and switched from the floating settings
 * panel (SLOT_PRESETS). In production this is the account's subscription.
 */

import * as React from "react"
import { setActiveSubscription } from "@/hooks/use-active-subscription"

export type SlotJob = {
  id: string
  title: string
  location: string
  postedAt: string
  applied: number
}

export type JobSlots = {
  plan: string
  total: number
  jobs: SlotJob[]
} | null

const STORAGE_KEY = "apnahire:job-slots"
const EVENT = "apnahire:job-slots"

const LIVE_JOBS: SlotJob[] = [
  { id: "delivery-andheri", title: "Delivery Executive", location: "Andheri East, Mumbai", postedAt: "8 Oct 2026", applied: 6 },
  { id: "back-office-pune", title: "Back Office Executive", location: "Hinjewadi, Pune", postedAt: "2 Oct 2026", applied: 12 },
]

export const SLOT_PRESETS = {
  none: { label: "No subscription", slots: null as JobSlots },
  free: { label: "Subscription · 1 of 2 slots free", slots: { plan: "Monthly plan", total: 2, jobs: LIVE_JOBS.slice(0, 1) } as JobSlots },
  full: { label: "Subscription · all 2 slots in use", slots: { plan: "Monthly plan", total: 2, jobs: LIVE_JOBS } as JobSlots },
} as const
export type SlotPreset = keyof typeof SLOT_PRESETS

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

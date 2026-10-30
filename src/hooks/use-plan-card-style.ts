"use client"

/**
 * usePlanCardStyle — the prototype switch for the phone plan cards (both
 * checkouts: MobilePlanRow, MobileUnlimitedCard). Two settings:
 *
 *   layout     "line"   every card lists its features in one line, a ✕ on
 *                       what's missing, then its database credits; nothing
 *                       opens or closes (default, user call 2026-10-30).
 *              "expand" feature icons while closed; the selected card
 *                       opens into a feature list (the Oct 29 build).
 *   selection  "check"  no radio: green edge and a tick in the corner
 *                       (default, user call 2026-10-30)
 *              "tint"   no radio: green edge and a light green fill
 *              "right"  the radio after the price
 *              "left"   the radio leads, left of the plan name
 *
 * Set from the hidden preview settings (PlanCardStyleControls); remembered
 * in this browser. A prototype control: remove with PrototypeSettings
 * before production, keeping the chosen style.
 */

import * as React from "react"

export type PlanCardLayout = "line" | "expand"
export type PlanCardSelection = "right" | "left" | "tint" | "check"

export const PLAN_CARD_LAYOUTS: { value: PlanCardLayout; label: string }[] = [
  { value: "line", label: "Feature line" },
  { value: "expand", label: "Expand on select" },
]
export const PLAN_CARD_SELECTIONS: { value: PlanCardSelection; label: string }[] = [
  { value: "check", label: "Corner tick" },
  { value: "tint", label: "Green tint" },
  { value: "right", label: "Radio after the price" },
  { value: "left", label: "Radio first" },
]

const EVENT = "apnahire:plan-card-style"

function store<T extends string>(key: string, values: { value: T }[], fallback: T) {
  const read = (): T => {
    try {
      const v = window.localStorage.getItem(key)
      return values.find((o) => o.value === v)?.value ?? fallback
    } catch {
      return fallback
    }
  }
  const subscribe = (notify: () => void) => {
    window.addEventListener(EVENT, notify)
    window.addEventListener("storage", notify)
    return () => {
      window.removeEventListener(EVENT, notify)
      window.removeEventListener("storage", notify)
    }
  }
  const set = (next: T) => {
    try {
      window.localStorage.setItem(key, next)
    } catch {
      // Storage blocked: the switch just won't persist.
    }
    window.dispatchEvent(new Event(EVENT))
  }
  const use = () => React.useSyncExternalStore(subscribe, read, () => fallback)
  return { use, set }
}

const layout = store<PlanCardLayout>("apnahire:plan-card-layout", PLAN_CARD_LAYOUTS, "line")
const selection = store<PlanCardSelection>("apnahire:plan-card-selection", PLAN_CARD_SELECTIONS, "check")

export const usePlanCardLayout = layout.use
export const setPlanCardLayout = layout.set
export const usePlanCardSelection = selection.use
export const setPlanCardSelection = selection.set

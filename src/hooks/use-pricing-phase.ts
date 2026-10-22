"use client"

/**
 * usePricingPhase — the prototype switch between the pricing phases
 * (content/pricing-phase.ts): today's plans, the new plans, December with
 * the Jan 1 notices, and from Jan 1. Every plan card, upsell, the order
 * summary's prices, the dashboard banner and the notification follow it.
 *
 * Set from the hidden preview settings (PricingPhaseControls, both
 * checkouts); remembered in this browser, so it holds on the dashboard
 * too. A prototype control: remove with PrototypeSettings before
 * production.
 */

import * as React from "react"
import { DEFAULT_PRICING_PHASE, PRICING_PHASES, type PricingPhase } from "@/content/pricing-phase"

const KEY = "apnahire:pricing-phase"
const EVENT = "apnahire:pricing-phase"

function read(): PricingPhase {
  try {
    const stored = window.localStorage.getItem(KEY)
    return PRICING_PHASES.find((p) => p.value === stored)?.value ?? DEFAULT_PRICING_PHASE
  } catch {
    return DEFAULT_PRICING_PHASE
  }
}

function subscribe(notify: () => void) {
  window.addEventListener(EVENT, notify)
  window.addEventListener("storage", notify)
  return () => {
    window.removeEventListener(EVENT, notify)
    window.removeEventListener("storage", notify)
  }
}

export function usePricingPhase(): PricingPhase {
  return React.useSyncExternalStore(subscribe, read, () => DEFAULT_PRICING_PHASE)
}

export function setPricingPhase(phase: PricingPhase) {
  try {
    window.localStorage.setItem(KEY, phase)
  } catch {
    // Storage blocked: the switch just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

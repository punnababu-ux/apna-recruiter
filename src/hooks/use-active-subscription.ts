"use client"

/**
 * useActiveSubscription — whether the account has an active apna Unlimited
 * subscription. Drives the sidebar's plan CTA: "View plans" without one,
 * "Manage plans" with one.
 *
 * In the prototype it's set when a subscription payment succeeds (self-
 * checkout or the job-posting plan step) and kept in localStorage, so every
 * open tab and page agrees. In production this comes from the account.
 */

import * as React from "react"

const STORAGE_KEY = "apnahire:active-subscription"
const EVENT = "apnahire:active-subscription"

function read(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
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

export function setActiveSubscription(active: boolean) {
  try {
    if (active) window.localStorage.setItem(STORAGE_KEY, "1")
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked — the flag just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

export function useActiveSubscription(): boolean {
  // Server render (and the first client render) assume no subscription.
  return React.useSyncExternalStore(subscribe, read, () => false)
}

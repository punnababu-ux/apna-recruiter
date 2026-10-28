"use client"

/**
 * useExtraOff — the exit loop's "10% extra off" offer.
 *
 * Lifecycle (Figma 2525:23488):
 *   available  → the exit nudge may show when the recruiter tries to leave
 *   claimed    → a 24-hour window: plan prices show the discount and
 *                checkout auto-applies the FIRST10 coupon
 *   expired    → the coupon drops off and checkout says so
 *   dismissed  → "No, thanks" for this visit; the nudge won't show again
 *
 * The claimed deadline is kept in localStorage so it survives moving
 * between the plan page and checkout, and a reload. Every access is
 * guarded because storage can be unavailable (private mode, blocked site
 * data). In that case the offer simply lives for the visit.
 */

import * as React from "react"
import { EXTRA_OFF } from "@/content/offers"

const STORAGE_KEY = "apna:extra-off-deadline"
// Prototype: a returning recruiter (already had the offer) sees the stay /
// reasons pop-ups on exit instead (exit-stay-dialogs.tsx).
const RETURNING_KEY = "apna:returning-recruiter"

function readDeadline(): number | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const value = raw ? Number(raw) : NaN
    return Number.isFinite(value) && value > Date.now() ? value : null
  } catch {
    return null
  }
}

function writeDeadline(value: number | null) {
  try {
    if (value === null) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    // Storage blocked — the offer lives for this visit only.
  }
}

export function useExtraOff() {
  const [deadline, setDeadline] = React.useState<number | null>(null)
  const [dismissed, setDismissed] = React.useState(false)
  // Once claimed, never offered again this visit — even after it expires.
  const [used, setUsed] = React.useState(false)

  const [returning, setReturningState] = React.useState(false)
  const setReturning = React.useCallback((value: boolean) => {
    setReturningState(value)
    try {
      if (value) window.localStorage.setItem(RETURNING_KEY, "1")
      else window.localStorage.removeItem(RETURNING_KEY)
    } catch {
      // Storage blocked — holds for this visit only.
    }
  }, [])

  React.useEffect(() => {
    try {
      setReturningState(window.localStorage.getItem(RETURNING_KEY) === "1")
    } catch {}
    const stored = readDeadline()
    setDeadline(stored)
    if (stored !== null) setUsed(true)
  }, [])

  const claim = React.useCallback((at?: number) => {
    const next = at ?? Date.now() + EXTRA_OFF.validHours * 60 * 60 * 1000
    writeDeadline(next)
    setDeadline(next)
    setUsed(true)
  }, [])

  const expire = React.useCallback(() => {
    writeDeadline(null)
    setDeadline(null)
  }, [])

  /** Demo only: run the claimed window down to a few seconds so the
   *  "Coupon expired" path can be reviewed without waiting 24 hours. */
  const expireSoon = React.useCallback(() => {
    setDeadline((current) => {
      if (current === null) return current
      const next = Date.now() + 5000
      writeDeadline(next)
      return next
    })
  }, [])

  /** Demo only: forget the claim and the "No, thanks". */
  const reset = React.useCallback(() => {
    writeDeadline(null)
    setDeadline(null)
    setDismissed(false)
    setUsed(false)
  }, [])

  return {
    claimed: deadline !== null,
    deadline,
    /** The exit nudge may show: nothing claimed and not turned down. */
    nudgeAvailable: deadline === null && !dismissed && !used && !returning,
    /** Already had the offer: exit asks them to stay instead. */
    returning,
    setReturning,
    claim,
    expire,
    dismiss: React.useCallback(() => setDismissed(true), []),
    expireSoon,
    reset,
  }
}

export type ExtraOffOffer = ReturnType<typeof useExtraOff>

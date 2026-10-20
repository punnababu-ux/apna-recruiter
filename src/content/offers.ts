/**
 * Offers — the upsells for express checkout (`/apnahire/jobs/new/plans`),
 * and the exit loop for both express checkout and self-checkout (`/pricing`).
 * Self-checkout has no upsells (product decision).
 *
 * Structure, copy and triggers come from Figma `92gU18d45olE04ATyhhVHD`:
 *   2472:19068  Job upselling          (bundle offer, zero / some credits)
 *   2490:43116  Subscription upselling (monthly → annual "Special upgrade offer")
 *   2525:23488  Exit coupon            (exit nudge, coupon applied / expired)
 *
 * Prices marked DEMO are placeholders until product confirms them. The board
 * prices do not line up with the app's current plan prices (₹1,399 Premium
 * against ₹1,699 struck through here, ₹1,499 there), so they are derived
 * from the app's own prices rather than copied.
 */

import type { JobPlanTierId } from "@/content/job-plans"

/** The exit nudge's offer: 10% extra off, valid online for 24 hours. It
 *  stacks on top of bundle and upgrade discounts (product decision). */
export const EXTRA_OFF = {
  code: "FIRST10",
  pct: 10,
  validHours: 24,
  eyebrow: "Limited time offer",
  headline: "Order now to get 10% extra off",
  validity: "Valid online for 24 hrs only",
  applied: "10% extra off applied",
  /** Phone tiles (~130px of text): the full line wraps to two in Inter. */
  appliedShort: "10% extra off",
} as const

export const withExtraOff = (price: number) => Math.round(price * (1 - EXTRA_OFF.pct / 100))

/** A credit bundle's display figures with the claimed offer: the price drops
 *  by 10%, the struck MRP stays, and the % OFF and per-credit price are
 *  recalculated from the new price. Per-credit keeps the design's precision
 *  (whole rupees for job credits, one decimal for database credits). Only for
 *  display: checkout gets the base bundle and applies the coupon itself. */
export function withExtraOffBundle<
  B extends { credits: number; price: number; mrp: number; discountPct: number; pricePerCredit: number },
>(bundle: B, extraOff: boolean): B {
  if (!extraOff) return bundle
  const price = withExtraOff(bundle.price)
  const perCredit = price / bundle.credits
  return {
    ...bundle,
    price,
    discountPct: Math.round((1 - price / bundle.mrp) * 100),
    pricePerCredit: Number.isInteger(bundle.pricePerCredit)
      ? Math.round(perCredit)
      : Math.round(perCredit * 10) / 10,
  }
}

/** "Pay less when you buy 3" — offered on every job tier when the
 *  recruiter has no credits. DEMO prices: about 21% off three single posts,
 *  which is the board's Premium ratio (₹1,399 → ₹1,099 /job). */
export const JOB_BUNDLE_OFFERS: Record<JobPlanTierId, { jobs: number; pricePerJob: number; validDays: number }> = {
  classic: { jobs: 3, pricePerJob: 549, validDays: 90 },
  premium: { jobs: 3, pricePerJob: 1099, validDays: 90 },
  "super-premium": { jobs: 3, pricePerJob: 2199, validDays: 90 },
}

/** The 12-month Unlimited plan: sold on self-checkout's Subscription tab and
 *  the plan express checkout's monthly purchase is upsold to. ₹9,999 a year
 *  against an MRP of ₹15,999 (product, 2026-10-15); 8 of 12 months free
 *  against the ₹2,499 monthly price. Unlimited job postings, 1 active job
 *  slot for 365 days, 1,000 database credits worth ₹10,000. */
export const ANNUAL_PLAN = {
  price: 9999,
  mrp: 15999,
  months: 12,
  monthsFree: 8,
  slotDays: 365,
  dbCredits: 1000,
  dbCreditsWorth: 10000,
} as const

/** Adding a job slot when every slot is in use (Figma 3308:148419): the
 *  next slot at a per-slot price, sold as the plan with one more slot.
 *  Prorated against the current plan; numbers are the design's. */
export const SLOT_UPGRADE = {
  perSlot: 1800,
  perSlotMrp: 2499,
  /** The plan with the extra slot. */
  price: 5400,
  mrp: 5999,
  validDays: 30,
  dbCredits: 400,
}

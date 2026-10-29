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
  applied: "Extra 10% off applied",
  /** Phone tiles (~130px of text): the full line wraps to two in Inter. */
  appliedShort: "Extra 10% off",
} as const

export const withExtraOff = (price: number) => Math.round(price * (1 - EXTRA_OFF.pct / 100))

/** A credit bundle's display figures with the claimed offer: the price drops
 *  by 10%, the struck MRP stays, and the per-credit price is recalculated
 *  from the new price. The % OFF stays the bundle's own discount: the 10%
 *  shows as its own line beside it, as the cart's coupon row does (user
 *  call, 2026-10-29), never folded into the badge. Per-credit keeps the design's precision
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
  // Never offered: the P+AI card only shows to credit holders, who get no bundle offer.
  "premium-ai": { jobs: 3, pricePerJob: 1099, validDays: 90 },
}

// The annual upgrade's plan and the slots-full extra slot follow the
// pricing phase: usePlans().annualPlan / .slotUpgrade (content/plan-catalog.ts).

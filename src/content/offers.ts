/**
 * Offers — the upsell and exit-loop content for express checkout
 * (`/apnahire/jobs/new/plans`) and self-checkout (`/pricing`).
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

/** "Pay less when you buy 3" — offered on every job tier when the
 *  recruiter has no credits. DEMO prices: about 21% off three single posts,
 *  which is the board's Premium ratio (₹1,399 → ₹1,099 /job). */
export const JOB_BUNDLE_OFFERS: Record<JobPlanTierId, { jobs: number; pricePerJob: number; validDays: number }> = {
  classic: { jobs: 3, pricePerJob: 549, validDays: 90 },
  premium: { jobs: 3, pricePerJob: 1099, validDays: 90 },
  "super-premium": { jobs: 3, pricePerJob: 2199, validDays: 90 },
}

/** The 12-month Unlimited plan the monthly / quarterly purchase is upsold
 *  to. DEMO price from the board: ₹9,999 a year, i.e. 8 of 12 months free
 *  against the ₹2,499 monthly price. */
export const ANNUAL_PLAN = {
  price: 9999,
  months: 12,
  monthsFree: 8,
  dbCreditsPerMonth: 200,
} as const

/**
 * Pricing phases — the four moments of the 2026–27 plan change, switchable
 * in the prototype (user call, 2026-10-22):
 *
 *   today     The plans live before the proposed sheet: 3 / 6 / 13 job
 *             credits, 170 / 380 / 900 database credits, 1 / 2 / 3 job
 *             slots, the 22-credit upsell pack.
 *   new       The proposed online plans sheet: 3 / 6 / 22 job credits,
 *             200 / 450 / 1,600 database credits, 1 / 2 / 3 job slots, the
 *             47-credit upsell pack. No notices.
 *   december  The new plans, plus the Jan 1 notices (content/price-change.ts):
 *             the banner on the dashboard and both checkouts, the
 *             notification, and "₹X from Jan 1" on every card and upsell.
 *   jan       From Jan 1, 2027: the Jan prices are the prices. No banner, no
 *             notification, no indicator.
 *
 * The figures for each phase are in content/plan-catalog.ts; the switch is
 * usePricingPhase (preview settings, both checkouts). A prototype control:
 * production has one catalog and the date.
 */

export type PricingPhase = "today" | "new" | "december" | "jan"

export const PRICING_PHASES: { value: PricingPhase; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "new", label: "New plans" },
  { value: "december", label: "December, new prices announced" },
  { value: "jan", label: "From Jan 1, new prices" },
]

/** The phase a fresh browser opens on: the announcement, the one with the
 *  most to review. */
export const DEFAULT_PRICING_PHASE: PricingPhase = "december"

/** Only December announces the Jan prices: banner, notification, the line
 *  on every card and upsell tile. */
export const announcesNewPrices = (phase: PricingPhase) => phase === "december"

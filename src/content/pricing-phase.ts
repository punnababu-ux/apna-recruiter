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
 * The figures for each phase are in content/plan-catalog.ts. The phase is
 * `apnahire:pricing-phase` in local storage (usePricingPhase), default
 * today. There is no on-screen switch. Production has one catalog and the date.
 */

export type PricingPhase = "today" | "new" | "december" | "jan"

export const PRICING_PHASES: { value: PricingPhase; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "new", label: "New plans" },
  { value: "december", label: "December, new prices announced" },
  { value: "jan", label: "From Jan 1, new prices" },
]

/** The phase a fresh browser opens on: today's prices, no banner (Punna,
 *  2026-11-11; it was the December announcement). */
export const DEFAULT_PRICING_PHASE: PricingPhase = "today"

/** Only December announces the Jan prices: banner, notification, the line
 *  on every card and upsell tile. */
export const announcesNewPrices = (phase: PricingPhase) => phase === "december"

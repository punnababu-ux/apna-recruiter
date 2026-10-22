/**
 * The Jan 1, 2027 price change — one date and one set of words for every
 * surface that announces it (user call, 2026-10-22).
 *
 * What rises: single job posts, job credit packs and Apna unlimited. What
 * doesn't: database packs, the AI calling add-on and Enterprise. Each plan
 * carries its own `janPrice` next to today's price (job-plans.ts,
 * credit-bundles.ts, subscriptions.ts); the figures are the "Price on
 * Jan 1, 2027" row of the proposed online plans sheet.
 *
 * Logged in only: the dashboard banner, one notification, a line under the
 * plans page title and a "₹X from Jan 1" line on every job and plan card,
 * in self-checkout and express checkout. Never the order summary, never a
 * logged-out page. The new prices themselves are pushed live by hand, not
 * from here. Subscriptions already on autopay keep renewing at their old
 * price (user call, 2026-10-22). Demo: the notices show only in the
 * December pricing phase (content/pricing-phase.ts, preview settings).
 */

/** Midnight IST, the moment the new prices apply. */
export const PRICE_CHANGE_ON = new Date("2027-01-01T00:00:00+05:30")

/** Days-left only shows in the last three weeks; before that the date is
 *  enough, and a count of 70 days reads as noise. */
const DAYS_LEFT_FROM = 21

/** Whole days until the change, counting today (Dec 31 → 1). */
export const daysUntilPriceChange = (now: Date = new Date()) =>
  Math.max(0, Math.ceil((PRICE_CHANGE_ON.getTime() - now.getTime()) / 86_400_000))

export const PRICE_CHANGE = {
  /** On the cards: "₹749 from Jan 1". */
  from: "from Jan 1",
  /** One line for the dashboard banner and the plans page title (Jobs and
   *  Unlimited tabs). "New prices", never "prices go up" (user call,
   *  2026-10-22). */
  message: "New prices from Jan 1, 2027 on job credits and Apna unlimited. Buy before then at today's price.",
  bannerAction: "View plans",
  daysLeft: (days: number) => `${days} day${days === 1 ? "" : "s"} left`,
  showDaysLeft: (days: number) => days <= DAYS_LEFT_FROM,
  /** The one notification in the bell. */
  notification: {
    title: "New prices from Jan 1, 2027",
    // Nothing about credits already bought: recruiters know they keep
    // their value (user call, 2026-10-22).
    body: "Job credits and Apna unlimited move to new prices on Jan 1. Buy before then at today's price.",
    action: "See plans",
  },
  /** Where "View plans" / "See plans" go. */
  plansHref: "/apnahire/credits",
} as const

/**
 * Apna unlimited subscriptions — every plan by job slots × term.
 *
 * Two charts: the new plans, from "Apna Marketplace – Proposed online plans
 * (Employer)" (product sheet, 2026-10-22), and today's plans before it.
 * Which one sells is the pricing phase (content/plan-catalog.ts). A slot is
 * one live job at a time; the plan hires without counting credits (free
 * reposts after each 15-day expiry). `mrp` is the strikethrough price.
 *
 * Database credits are not in the sheet; see SUBSCRIPTION_CHART. Worth ₹10
 * each.
 */

import { inr, num } from "@/lib/format"

/** What a database credit is worth (₹), for "worth ₹2,000". */
export const DB_CREDIT_WORTH = 10

export type SubscriptionPlanId = "monthly" | "quarterly" | "annual"

/** Live jobs at a time: 1 / 2 / 3 in every pricing phase (no 5-slot plan,
 *  user call 2026-10-27). */
export type JobSlotCount = 1 | 2 | 3

/**
 * How a subscription term is said — the one vocabulary for every surface
 * (user call, 2026-10-22). Change a word here and it changes everywhere.
 *
 *   Card header             Monthly        Quarterly        Annual
 *   Plan name (tiles,       Monthly plan   Quarterly plan   Annual plan
 *     order summary, CTAs)
 *   Price unit              /month         /quarter         /year
 *   Phone unit (unitShort)  /mo            /qtr             /yr
 *   Length / validity       30 days        90 days          365 days
 *
 * A term's length is always said in days ("for 365 days"); months are only
 * for the per-month note ("That's just ₹833 /month") and benefits ("8 MONTHS
 * FREE"). Never "yearly", "1 year", "12-months plan", "3 months" or "a month"
 * for a term.
 */
export const SUBSCRIPTION_TERMS: Record<
  SubscriptionPlanId,
  { title: string; name: string; unit: string; unitShort: string; months: number; slotDays: number }
> = {
  monthly: { title: "Monthly", name: "Monthly plan", unit: "/month", unitShort: "/mo", months: 1, slotDays: 30 },
  quarterly: { title: "Quarterly", name: "Quarterly plan", unit: "/quarter", unitShort: "/qtr", months: 3, slotDays: 90 },
  annual: { title: "Annual", name: "Annual plan", unit: "/year", unitShort: "/yr", months: 12, slotDays: 365 },
}

/** A term's price. `mrp` is the struck list price; `janPrice` the price
 *  from Jan 1, 2027 (content/price-change.ts), announced in December. */
export interface SubscriptionPrice {
  price: number
  mrp?: number
  janPrice?: number
}

/** One slot count's plans: price and database credits for each term. */
export interface SubscriptionRow {
  slots: JobSlotCount
  prices: Record<SubscriptionPlanId, SubscriptionPrice>
  dbCredits: Record<SubscriptionPlanId, number>
  /** Database credits calculated, not confirmed. */
  dbCreditsEstimated?: boolean
}

/** Every plan by slots × term; the first row is the 1-slot plan. */
export type SubscriptionChart = SubscriptionRow[]

/**
 * The new plans (proposed online plans sheet, 2026-10-22), on the legacy
 * 1 / 2 / 3 slots (user call, 2026-10-27: no 5-slot plan). Struck price =
 * slots × months × ₹2,499; the 1-slot monthly plan has none.
 *
 * The 2-slot row isn't on the sheet: today's prices and database credits,
 * with Jan prices +10% like the other rows. Replace once product confirms.
 */
export const SUBSCRIPTION_CHART: SubscriptionChart = [
  {
    slots: 1,
    prices: {
      monthly: { price: 2499, janPrice: 2749 },
      quarterly: { price: 5999, mrp: 7497, janPrice: 6599 },
      annual: { price: 9999, mrp: 29988, janPrice: 10999 },
    },
    dbCredits: { monthly: 200, quarterly: 600, annual: 1000 },
  },
  {
    slots: 2,
    prices: {
      monthly: { price: 4499, mrp: 4998, janPrice: 4949 },
      quarterly: { price: 9999, mrp: 14994, janPrice: 10999 },
      annual: { price: 22999, mrp: 59976, janPrice: 25299 },
    },
    dbCredits: { monthly: 500, quarterly: 900, annual: 2500 },
  },
  {
    slots: 3,
    prices: {
      monthly: { price: 5999, mrp: 7497, janPrice: 6599 },
      quarterly: { price: 13499, mrp: 22491, janPrice: 14849 },
      annual: { price: 28999, mrp: 89964, janPrice: 31899 },
    },
    dbCredits: { monthly: 800, quarterly: 1200, annual: 4000 },
  },
]

/** Today's plans, before the sheet (product board chart, 2026-10-20): 1 / 2
 *  / 3 slots, list prices with no struck price, except the running offer on
 *  the 1-slot annual plan (₹9,999, ₹15,999 struck). */
export const TODAY_SUBSCRIPTION_CHART: SubscriptionChart = [
  {
    slots: 1,
    prices: {
      monthly: { price: 2499 },
      quarterly: { price: 5999 },
      annual: { price: 9999, mrp: 15999 },
    },
    dbCredits: { monthly: 200, quarterly: 600, annual: 1000 },
  },
  {
    slots: 2,
    prices: {
      monthly: { price: 4499 },
      quarterly: { price: 9999 },
      annual: { price: 22999 },
    },
    dbCredits: { monthly: 500, quarterly: 900, annual: 2500 },
  },
  {
    slots: 3,
    prices: {
      monthly: { price: 5999 },
      quarterly: { price: 13499 },
      annual: { price: 29999 },
    },
    dbCredits: { monthly: 800, quarterly: 1200, annual: 4000 },
  },
]

export interface SubscriptionPlan {
  id: SubscriptionPlanId
  title: string
  name: string
  unit: string
  /** Phones: "/mo", "/qtr", "/yr". */
  unitShort: string
  slots: JobSlotCount
  price: number
  mrp?: number
  /** Price from Jan 1, 2027, while it is announced. */
  janPrice?: number
  months: number
  slotDays: number
  dbCredits: number
  /** ₹, the database credits at DB_CREDIT_WORTH each. */
  dbCreditsWorth: number
  /** True while `dbCredits` is a calculated stand-in. */
  dbCreditsEstimated: boolean
}

/** A plan off a chart. A slot count the chart doesn't sell falls back to
 *  its first row (1 slot). Read plans through usePlans().plan, which follows
 *  the pricing phase. */
export function chartPlan(chart: SubscriptionChart, id: SubscriptionPlanId, slots?: JobSlotCount): SubscriptionPlan {
  const row = chart.find((r) => r.slots === slots) ?? chart[0]
  return {
    id,
    slots: row.slots,
    ...SUBSCRIPTION_TERMS[id],
    dbCredits: row.dbCredits[id],
    dbCreditsWorth: row.dbCredits[id] * DB_CREDIT_WORTH,
    dbCreditsEstimated: row.dbCreditsEstimated ?? false,
    ...row.prices[id],
  }
}

/** "200 database credits worth ₹2,000" — one wording on every plan card. */
export const dbCreditsLabel = (plan: Pick<SubscriptionPlan, "dbCredits" | "dbCreditsWorth">) =>
  `${num(plan.dbCredits)} database credits worth ${inr(plan.dbCreditsWorth)}`

/** "1 active job slot", "3 active job slots" (sentence case). */
export const slotLabel = (slots: number) => `${slots} active job slot${slots === 1 ? "" : "s"}`

/** "1 active job slot for 30 days" — a plan's slot line, always in days. */
export const slotTermLabel = (plan: { slots: number; slotDays: number }) =>
  `${slotLabel(plan.slots)} for ${plan.slotDays} days`

/** "Buy annual plan". */
export const planCtaLabel = (plan: Pick<SubscriptionPlan, "name">) => `Buy ${plan.name.toLowerCase()}`

/** The order summary's line title: "Unlimited annual plan". */
export const planOrderLabel = (plan: Pick<SubscriptionPlan, "name">) => `Unlimited ${plan.name.toLowerCase()}`

/** The order summary's points for a plan, the same in both checkouts:
 *  slots and term, database credits, city. */
export const planOrderPoints = (plan: SubscriptionPlan) => [
  slotTermLabel(plan),
  dbCreditsLabel(plan),
  "Valid in a single city",
]

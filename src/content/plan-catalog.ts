/**
 * Plan catalog — every plan and price the prototype sells, for one pricing
 * phase (content/pricing-phase.ts). Components read it through usePlans(),
 * so switching the phase in the preview settings reprices every card,
 * upsell, the slots-full pop-up and what reaches the order summary.
 *
 *   today     TODAY_* sets: job-plans.ts, credit-bundles.ts, subscriptions.ts.
 *   new       The plans sheet's sets, Jan prices attached (shown only in
 *   december  December, by the notices' gate, never by this catalog).
 *   jan       The new sets with each Jan price charged (janCatalog below).
 *
 * ⚠️ The struck prices from Jan 1 are DERIVED, pending product: job tiers
 * keep credits × ₹899, bundles and the 47-credit pack are struck at the Jan
 * single-credit price (₹749 a credit), plans at slots × months × the Jan
 * 1-slot monthly price (₹2,749), the way the sheet strikes them today.
 */

import { JOB_PLAN_TIERS, TODAY_JOB_PLAN_TIERS, type JobPlanTier, type JobPlanTierId } from "@/content/job-plans"
import {
  DB_BUNDLES,
  JOB_BUNDLES,
  SINGLE_CREDIT,
  TODAY_DB_BUNDLES,
  TODAY_JOB_BUNDLES,
  TODAY_SINGLE_CREDIT,
  TODAY_UPSELL_PACK,
  UPSELL_PACK,
  type Bundle,
  type DbBundle,
  type UpsellPack,
} from "@/content/credit-bundles"
import {
  SUBSCRIPTION_CHART,
  TODAY_SUBSCRIPTION_CHART,
  chartPlan,
  type JobSlotCount,
  type SubscriptionChart,
  type SubscriptionPlan,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import type { PricingPhase } from "@/content/pricing-phase"

/** The 1-slot annual plan, which the monthly plan is upsold to: months free
 *  against twelve monthly payments. */
export type AnnualPlan = SubscriptionPlan & { monthsFree: number }

/** Adding a job slot when every slot is in use (Figma 3308:148419): the next
 *  slot count up's monthly plan, sold at its per-slot price against the
 *  1-slot plan's, with that plan's database credits. Proration to come. */
export interface SlotUpgrade {
  perSlot: number
  perSlotMrp: number
  /** The plan with the extra slots. */
  plan: SubscriptionPlan
  price: number
  mrp: number
  validDays: number
  dbCredits: number
}

export interface PlanCatalog {
  /** Express checkout's job tiers. */
  tiers: Record<JobPlanTierId, JobPlanTier>
  singleCredit: Bundle
  /** Self-checkout's Jobs tab, smallest first; the last is the biggest. */
  bundles: Bundle[]
  /** Offered from the biggest bundle. */
  upsellPack: UpsellPack
  dbBundles: DbBundle[]
  /** The slot counts the Subscription tab sells. */
  slotCounts: JobSlotCount[]
  /** A plan by term and slots (1 slot when left out, or not sold). The same
   *  object every call, so it is safe in effect and memo deps. */
  plan: (id: SubscriptionPlanId, slots?: JobSlotCount) => SubscriptionPlan
  annualPlan: AnnualPlan
  slotUpgrade: SlotUpgrade
}

const TERMS: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]
const pctOff = (price: number, mrp: number) => Math.round((1 - price / mrp) * 100)

function buildCatalog(
  data: Omit<PlanCatalog, "slotCounts" | "plan" | "annualPlan" | "slotUpgrade"> & { chart: SubscriptionChart },
): PlanCatalog {
  const { chart, ...sets } = data
  const plans = new Map(
    chart.flatMap((row) => TERMS.map((id) => [`${row.slots}:${id}`, chartPlan(chart, id, row.slots)] as const)),
  )
  const first = chart[0].slots
  const plan = (id: SubscriptionPlanId, slots?: JobSlotCount) =>
    plans.get(`${slots ?? first}:${id}`) ?? plans.get(`${first}:${id}`) ?? chartPlan(chart, id)

  const monthly = plan("monthly")
  const annual = plan("annual")
  const next = plan("monthly", chart[1].slots)

  return {
    ...sets,
    slotCounts: chart.map((row) => row.slots),
    plan,
    annualPlan: { ...annual, monthsFree: 12 - Math.round(annual.price / monthly.price) },
    slotUpgrade: {
      perSlot: Math.round(next.price / next.slots),
      perSlotMrp: monthly.price,
      plan: next,
      price: next.price,
      mrp: next.mrp ?? next.slots * monthly.price,
      validDays: next.slotDays,
      dbCredits: next.dbCredits,
    },
  }
}

/* ───────────────────────────────────── Jan 1 ──────────────────────────── */

/** A Jan price charged: it becomes the price, and nothing announces it. */
function janBundle<B extends Bundle>(bundle: B, perCredit: number): B {
  const price = bundle.janPrice ?? bundle.price
  const mrp = bundle.credits * perCredit
  return {
    ...bundle,
    price,
    mrp,
    discountPct: pctOff(price, mrp),
    pricePerCredit: Math.round(price / bundle.credits),
    janPrice: undefined,
  }
}

function janChart(chart: SubscriptionChart): SubscriptionChart {
  const perMonth = chart[0].prices.monthly.janPrice ?? chart[0].prices.monthly.price
  return chart.map((row) => ({
    ...row,
    prices: Object.fromEntries(
      TERMS.map((id) => {
        const { price, janPrice } = row.prices[id]
        const strike = row.slots * (id === "monthly" ? 1 : id === "quarterly" ? 3 : 12) * perMonth
        const newPrice = janPrice ?? price
        return [id, { price: newPrice, mrp: strike > newPrice ? strike : undefined }]
      }),
    ) as SubscriptionChart[number]["prices"],
  }))
}

function janCatalog(): PlanCatalog {
  const single = SINGLE_CREDIT.janPrice ?? SINGLE_CREDIT.price
  const tiers = Object.fromEntries(
    Object.values(JOB_PLAN_TIERS).map((tier) => [tier.id, { ...tier, price: tier.janPrice ?? tier.price, janPrice: undefined }]),
  ) as Record<JobPlanTierId, JobPlanTier>
  return buildCatalog({
    tiers,
    singleCredit: { ...SINGLE_CREDIT, price: single, discountPct: pctOff(single, SINGLE_CREDIT.mrp), pricePerCredit: single, janPrice: undefined },
    bundles: JOB_BUNDLES.map((b) => janBundle(b, single)),
    upsellPack: { ...UPSELL_PACK, price: UPSELL_PACK.janPrice ?? UPSELL_PACK.price, mrp: UPSELL_PACK.credits * single, janPrice: undefined },
    dbBundles: DB_BUNDLES,
    chart: janChart(SUBSCRIPTION_CHART),
  })
}

/* ───────────────────────────────────── phases ─────────────────────────── */

/** One object for both, so moving between them keeps a selection. */
const NEW_CATALOG = buildCatalog({
  tiers: JOB_PLAN_TIERS,
  singleCredit: SINGLE_CREDIT,
  bundles: JOB_BUNDLES,
  upsellPack: UPSELL_PACK,
  dbBundles: DB_BUNDLES,
  chart: SUBSCRIPTION_CHART,
})

const CATALOGS: Record<PricingPhase, PlanCatalog> = {
  today: buildCatalog({
    tiers: TODAY_JOB_PLAN_TIERS,
    singleCredit: TODAY_SINGLE_CREDIT,
    bundles: TODAY_JOB_BUNDLES,
    upsellPack: TODAY_UPSELL_PACK,
    dbBundles: TODAY_DB_BUNDLES,
    chart: TODAY_SUBSCRIPTION_CHART,
  }),
  new: NEW_CATALOG,
  december: NEW_CATALOG,
  jan: janCatalog(),
}

/** The catalog for a phase: the same object every call. */
export const planCatalog = (phase: PricingPhase) => CATALOGS[phase]

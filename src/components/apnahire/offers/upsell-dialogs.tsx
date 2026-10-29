"use client"

/**
 * The three upsells, each OfferDialog + OfferChoice with the board's copy:
 *
 *   JobBundleOfferDialog    no credits, any job tier: "Pay less when you buy 3"
 *                           (Figma 2472:20847)
 *   CreditPackOfferDialog   short on credits, or buying a credit pack:
 *                           "Pay less when you buy 6 job credits" (2494:43730)
 *   AnnualUpgradeDialog     monthly / quarterly Unlimited → the annual plan,
 *                           "Special upgrade offer" (2565:20984)
 *
 * When the 10% exit offer has been claimed, every price drops by it and each
 * tile shows "Extra 10% off applied". That's the board's "with 10% off"
 * variants; the discounts stack.
 *
 * In December (the pricing phase), signed in, each tile with a Jan price shows it
 * ("₹749 from Jan 1", `janPrice`): the bigger pack is how to lock today's
 * price. Tiles without a Jan price (the "Buy 3" offer, the 47-credit pack)
 * show none.
 */

import * as React from "react"
import { BadgePercent } from "@apna/design-system"
import { JOB_BUNDLE_OFFERS, withExtraOff } from "@/content/offers"
import type { AnnualPlan } from "@/content/plan-catalog"
import { usePlans } from "@/hooks/apnahire/use-plans"
import type { JobPlanTier } from "@/content/job-plans"
import { OfferChoice } from "@/components/apnahire/offers/offer-choice"
import { OfferDialog } from "@/components/apnahire/offers/offer-dialog"
import { inr } from "@/lib/format"
import { dbCreditsLabel, slotTermLabel, type SubscriptionPlan } from "@/content/subscriptions"

// Notes glue a value to its unit with a no-break space (\u00A0): on a
// narrow tile "₹989 /job" may move to the next line, but never splits.
const pctOff = (price: number, mrp?: number) =>
  mrp && mrp > price ? `${Math.round((1 - price / mrp) * 100)}% OFF` : undefined

interface UpsellCallbacks {
  open: boolean
  onClose: () => void
  onStay: () => void
  onTake: () => void
  /** The 10% exit offer is claimed: show it in every price. */
  extraOff?: boolean
}

/** Keeps the last non-null value, so a pop-up whose caller clears its data
 *  on a choice still has content while it slides out. */
function useHeld<T>(value: T | null): T | null {
  const held = React.useRef(value)
  React.useEffect(() => {
    if (value !== null) held.current = value
  })
  // eslint-disable-next-line react-hooks/refs -- only read once the live value is gone
  return value ?? held.current
}

/* ── Job bundle: 1 job vs 3 jobs ─────────────────────────────────────── */

export function bundleQuote(tier: JobPlanTier, extraOff = false) {
  const offer = JOB_BUNDLE_OFFERS[tier.id]
  const off = (n: number) => (extraOff ? withExtraOff(n) : n)
  return {
    jobs: offer.jobs,
    validDays: offer.validDays,
    perJob: off(offer.pricePerJob),
    price: off(offer.jobs * offer.pricePerJob),
    mrp: offer.jobs * (tier.mrp ?? tier.price),
  }
}

export function JobBundleOfferDialog({ tier: liveTier, ...props }: UpsellCallbacks & { tier: JobPlanTier | null }) {
  const tier = useHeld(liveTier)
  if (!tier) return null
  const single = props.extraOff ? withExtraOff(tier.price) : tier.price
  const bundle = bundleQuote(tier, props.extraOff)

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      illustration="three-jobs"
      eyebrow={`Pay less when you buy ${bundle.jobs}`}
      priceDrop={{ from: inr(single), to: inr(bundle.perJob), unit: "/job" }}
    >
      <OfferChoice
        stay={{
          title: `1 ${tier.title.toLowerCase()}`,
          price: single,
          mrp: tier.mrp,
          badge: pctOff(single, tier.mrp),
          extraOff: props.extraOff,
          janPrice: tier.janPrice,
          ctaLabel: "Continue with 1 job",
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: `${bundle.jobs} ${tier.title.toLowerCase()}s`,
          price: bundle.price,
          mrp: bundle.mrp,
          badge: pctOff(bundle.price, bundle.mrp),
          validDays: bundle.validDays,
          extraOff: props.extraOff,
          ctaLabel: `Get ${bundle.jobs} jobs for ${inr(bundle.price)}`,
          ctaShortLabel: `Get ${bundle.jobs} jobs`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

/* ── Credit pack: what's needed vs a bigger pack ─────────────────────── */

export interface CreditQuote {
  credits: number
  price: number
  mrp?: number
  validDays?: number
  /** The price from Jan 1, 2027, when it has one. */
  janPrice?: number
}

export function CreditPackOfferDialog({
  need: liveNeed,
  pack: livePack,
  needNote,
  ...props
}: UpsellCallbacks & {
  need: CreditQuote | null
  pack: CreditQuote | null
  /** Under the stay tile: "Needed to post premium job", "Valid for 30 days". */
  needNote?: string
}) {
  const need = useHeld(liveNeed)
  const pack = useHeld(livePack)
  if (!need || !pack) return null
  const off = (n: number) => (props.extraOff ? withExtraOff(n) : n)
  const needPrice = off(need.price)
  const packPrice = off(pack.price)
  const perNeed = Math.round(needPrice / need.credits)
  const perPack = Math.round(packPrice / pack.credits)
  const credits = (n: number) => `${n} job credit${n === 1 ? "" : "s"}`

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      illustration="credit-pack"
      eyebrow={`Pay less when you buy ${credits(pack.credits)}`}
      priceDrop={{ from: inr(perNeed), to: inr(perPack), unit: "/credit" }}
    >
      <OfferChoice
        stay={{
          title: credits(need.credits),
          price: needPrice,
          mrp: need.mrp,
          note: needNote,
          // Self-checkout passes the stay pack's validity (both tiles show it,
          // with the clock); express checkout's stay is the credits this one
          // job needs, so it has none — only the bundle on offer does.
          validDays: need.validDays,
          extraOff: props.extraOff,
          janPrice: need.janPrice,
          ctaLabel: `Continue with ${need.credits} credit${need.credits === 1 ? "" : "s"}`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: credits(pack.credits),
          price: packPrice,
          mrp: pack.mrp,
          badge: pctOff(packPrice, pack.mrp),
          validDays: pack.validDays,
          extraOff: props.extraOff,
          janPrice: pack.janPrice,
          ctaLabel: `Get ${pack.credits} credits for ${inr(packPrice)}`,
          ctaShortLabel: `Get ${pack.credits} credits`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

/* ── Subscription: monthly / quarterly → annual ──────────────────────── */

/** A plan as the upsell tiles quote it: usePlans().plan(id). Names,
 *  units and lengths come from SUBSCRIPTION_TERMS, the one vocabulary. */
export type SubscriptionQuote = Pick<
  SubscriptionPlan,
  "name" | "unit" | "price" | "mrp" | "months" | "slots" | "slotDays" | "dbCredits" | "dbCreditsWorth"
> & { janPrice?: number }

function annualQuote(plan: AnnualPlan, extraOff = false) {
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  return { price, perMonth: Math.round(price / plan.months) }
}

export function AnnualUpgradeDialog({ from: liveFrom, ...props }: UpsellCallbacks & { from: SubscriptionQuote | null }) {
  // The pricing phase's annual plan (content/plan-catalog.ts).
  const { annualPlan } = usePlans()
  const from = useHeld(liveFrom)
  if (!from) return null
  const off = (n: number) => (props.extraOff ? withExtraOff(n) : n)
  const fromPrice = off(from.price)
  const annual = annualQuote(annualPlan, props.extraOff)
  const annualName = annualPlan.name.toLowerCase()

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      tone="premium"
      // Wider: "Continue with quarterly plan" needs the room on desktop
      // (same header type as the other upsells).
      wide
      illustration="annual"
      tag={
        <>
          <BadgePercent className="size-4" aria-hidden />
          Special upgrade offer
        </>
      }
      eyebrow={`Pay less, upgrade to ${annualName}`}
      priceDrop={{ from: inr(Math.round(fromPrice / from.months)), to: inr(annual.perMonth), unit: "/month" }}
    >
      <OfferChoice
        stay={{
          title: from.name,
          price: fromPrice,
          mrp: from.mrp ?? (props.extraOff ? from.price : undefined),
          unit: from.unit,
          term: slotTermLabel(from),
          planFacts: { dbLine: dbCreditsLabel(from) },
          extraOff: props.extraOff,
          janPrice: from.janPrice,
          // Desktop names the plan; phones shorten to "Continue".
          ctaLabel: `Continue with ${from.name.toLowerCase()}`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: annualPlan.name,
          price: annual.price,
          mrp: annualPlan.mrp ?? (props.extraOff ? annualPlan.price : undefined),
          unit: annualPlan.unit,
          term: slotTermLabel(annualPlan),
          planFacts: { dbLine: dbCreditsLabel(annualPlan) },
          badge: `${annualPlan.monthsFree} MONTHS FREE`,
          // No "Valid in a single city" here: they've seen it on the plan
          // already, and the order summary repeats it.
          extraOff: props.extraOff,
          janPrice: annualPlan.janPrice,
          ctaLabel: `Get ${annualName} for ${inr(annual.price)}`,
          ctaShortLabel: `Get ${annualName}`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

/* ── Credits → subscription (self-checkout) ──────────────────────────── */

export interface CreditBundleQuote {
  credits: number
  price: number
  mrp?: number
  validDays?: number
  janPrice?: number
}

/** Buying a small credit bundle: offer the subscription that hires
 *  without counting credits — 3 credits → monthly, 6 → quarterly (user
 *  call, 2026-10-19). Per-job prices don't compare (a plan is unlimited
 *  reposts on one active slot), so the header names the plan, not a
 *  price drop. */
export function CreditsToPlanDialog({
  bundle: liveBundle,
  plan: livePlan,
  ...props
}: UpsellCallbacks & { bundle: CreditBundleQuote | null; plan: SubscriptionQuote | null }) {
  const bundle = useHeld(liveBundle)
  const plan = useHeld(livePlan)
  if (!bundle || !plan) return null
  const off = (n: number) => (props.extraOff ? withExtraOff(n) : n)
  const bundlePrice = off(bundle.price)
  const planPrice = off(plan.price)
  const name = plan.name.toLowerCase()

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      tone="premium"
      illustration="unlimited"
      tag={
        <>
          <BadgePercent className="size-4" aria-hidden />
          Special upgrade offer
        </>
      }
      eyebrow="Hiring for more roles? Stop counting credits"
      // "Unlimited" in the gold the header uses for its highlights (prices).
      headline={
        <>
          <span className="text-highlight">Unlimited</span> job posts for {plan.slotDays} days
        </>
      }
    >
      <OfferChoice
        stay={{
          title: `${bundle.credits} job credits`,
          price: bundlePrice,
          mrp: bundle.mrp,
          // Under the amount, level with the plan's slot line.
          term: bundle.validDays != null ? `Valid for ${bundle.validDays}\u00A0days` : undefined,
          extraOff: props.extraOff,
          janPrice: bundle.janPrice,
          ctaLabel: `Continue with ${bundle.credits} credits`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: plan.name,
          price: planPrice,
          mrp: props.extraOff ? plan.price : undefined,
          unit: plan.unit,
          badge: "UNLIMITED POSTS",
          // Compares row for row with the credits tile: under each amount,
          // its time limit ("Valid for N days" / "1 active job slot for N
          // days"); then what the plan grants (database credits) and the
          // city limit, bottom right.
          term: slotTermLabel(plan),
          planFacts: { dbLine: dbCreditsLabel(plan), singleCity: true },
          extraOff: props.extraOff,
          janPrice: plan.janPrice,
          ctaLabel: `Get ${name} for ${inr(planPrice)}`,
          ctaShortLabel: `Get ${name}`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

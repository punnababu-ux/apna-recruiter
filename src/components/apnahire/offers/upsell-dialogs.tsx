"use client"

/**
 * The three upsells, each OfferDialog + OfferChoice with the board's copy:
 *
 *   JobBundleOfferDialog    no credits, any job tier: "Pay less when you buy 3"
 *                           (Figma 2472:20847)
 *   CreditPackOfferDialog   short on credits, or buying a credit pack:
 *                           "Pay less when you buy 6 job credits" (2494:43730)
 *   AnnualUpgradeDialog     monthly / quarterly Unlimited → 12 months,
 *                           "Special upgrade offer" (2565:20984)
 *
 * When the 10% exit offer has been claimed, every price drops by it and each
 * tile shows "10% extra off applied". That's the board's "with 10% off"
 * variants; the discounts stack.
 */

import * as React from "react"
import { BadgePercent } from "@apna/design-system"
import { ANNUAL_PLAN, JOB_BUNDLE_OFFERS, withExtraOff } from "@/content/offers"
import type { JobPlanTier } from "@/content/job-plans"
import { OfferChoice } from "@/components/apnahire/offers/offer-choice"
import { OfferDialog } from "@/components/apnahire/offers/offer-dialog"
import { inr } from "@/lib/format"

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

export function JobBundleOfferDialog({ tier, ...props }: UpsellCallbacks & { tier: JobPlanTier | null }) {
  if (!tier) return null
  const single = props.extraOff ? withExtraOff(tier.price) : tier.price
  const bundle = bundleQuote(tier, props.extraOff)

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      illustration="wallet"
      eyebrow={`Pay less when you buy ${bundle.jobs}`}
      priceDrop={{ from: inr(single), to: inr(bundle.perJob), unit: "/job" }}
    >
      <OfferChoice
        stay={{
          title: `1 ${tier.title}`,
          price: single,
          mrp: tier.mrp,
          badge: pctOff(single, tier.mrp),
          extraOff: props.extraOff,
          ctaLabel: "Continue with 1 job",
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: `${bundle.jobs} ${tier.title}s`,
          price: bundle.price,
          mrp: bundle.mrp,
          badge: pctOff(bundle.price, bundle.mrp),
          note: `That's just ${inr(bundle.perJob)}\u00A0/job`,
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
}

export function CreditPackOfferDialog({
  need,
  pack,
  needNote,
  ...props
}: UpsellCallbacks & {
  need: CreditQuote | null
  pack: CreditQuote | null
  /** Under the stay tile: "Needed to post premium job", "Valid for 30 days". */
  needNote?: string
}) {
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
      illustration="wallet"
      eyebrow={`Pay less when you buy ${credits(pack.credits)}`}
      priceDrop={{ from: inr(perNeed), to: inr(perPack), unit: "/credit" }}
    >
      <OfferChoice
        stay={{
          title: credits(need.credits),
          price: needPrice,
          mrp: need.mrp,
          note: needNote,
          extraOff: props.extraOff,
          ctaLabel: `Continue with ${need.credits} credit${need.credits === 1 ? "" : "s"}`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: credits(pack.credits),
          price: packPrice,
          mrp: pack.mrp,
          badge: pctOff(packPrice, pack.mrp),
          note: `That's just ${inr(perPack)}\u00A0/job\u00A0credit`,
          validDays: pack.validDays,
          extraOff: props.extraOff,
          ctaLabel: `Get ${pack.credits} credits for ${inr(packPrice)}`,
          ctaShortLabel: `Get ${pack.credits} credits`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

/* ── Subscription: monthly / quarterly → annual ──────────────────────── */

export interface SubscriptionQuote {
  label: string
  price: number
  /** Billing period in months (1 monthly, 3 quarterly). */
  months: number
}

export function annualQuote(extraOff = false) {
  const price = extraOff ? withExtraOff(ANNUAL_PLAN.price) : ANNUAL_PLAN.price
  return { price, perMonth: Math.round(price / ANNUAL_PLAN.months) }
}

export function AnnualUpgradeDialog({ from, ...props }: UpsellCallbacks & { from: SubscriptionQuote | null }) {
  if (!from) return null
  const off = (n: number) => (props.extraOff ? withExtraOff(n) : n)
  const fromPrice = off(from.price)
  const annual = annualQuote(props.extraOff)
  const unit = from.months === 1 ? "/month" : "/quarter"

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      tone="premium"
      // A size up: "Continue with quarterly plan" needs the width on desktop.
      size="lg"
      illustration="wallet"
      tag={
        <>
          <BadgePercent className="size-4" aria-hidden />
          Special upgrade offer
        </>
      }
      eyebrow={`Pay less when you upgrade to ${ANNUAL_PLAN.months}-months plan`}
      priceDrop={{ from: inr(Math.round(fromPrice / from.months)), to: inr(annual.perMonth), unit: "/month" }}
    >
      <OfferChoice
        stay={{
          title: from.label,
          price: fromPrice,
          mrp: props.extraOff ? from.price : undefined,
          unit,
          extraOff: props.extraOff,
          // Desktop names the plan; phones shorten to "Continue".
          ctaLabel: `Continue with ${from.label.toLowerCase()}`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: "Annual plan",
          price: annual.price,
          mrp: props.extraOff ? ANNUAL_PLAN.price : undefined,
          unit: "/year",
          badge: `${ANNUAL_PLAN.monthsFree} MONTHS FREE`,
          planFacts: { dbCredits: ANNUAL_PLAN.dbCredits, dbWorth: ANNUAL_PLAN.dbCreditsWorth, singleCity: true },
          note: `That's just ${inr(annual.perMonth)}\u00A0/month`,
          extraOff: props.extraOff,
          ctaLabel: `Get yearly plan for ${inr(annual.price)}`,
          ctaShortLabel: "Get yearly plan",
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
}

export interface PlanQuote {
  /** "Monthly plan", "Quarterly plan". */
  label: string
  price: number
  /** Billing period in months (1 monthly, 3 quarterly). */
  months: number
  dbCredits: number
  /** What those credits are worth (₹). */
  dbWorth: number
}

/** Buying a small credit bundle: offer the subscription that hires
 *  without counting credits — 3 credits → monthly, 6 → quarterly (user
 *  call, 2026-10-19). Per-job prices don't compare (a plan is unlimited
 *  reposts on one active slot), so the header names the plan, not a
 *  price drop. */
export function CreditsToPlanDialog({
  bundle,
  plan,
  ...props
}: UpsellCallbacks & { bundle: CreditBundleQuote | null; plan: PlanQuote | null }) {
  if (!bundle || !plan) return null
  const off = (n: number) => (props.extraOff ? withExtraOff(n) : n)
  const bundlePrice = off(bundle.price)
  const planPrice = off(plan.price)
  const monthly = plan.months === 1
  const name = plan.label.toLowerCase()

  return (
    <OfferDialog
      open={props.open}
      onOpenChange={(next) => !next && props.onClose()}
      tone="premium"
      illustration="briefcase"
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
          <span className="text-highlight">Unlimited</span> job posts for {plan.months * 30} days
        </>
      }
    >
      <OfferChoice
        stay={{
          title: `${bundle.credits} Job credits`,
          price: bundlePrice,
          mrp: bundle.mrp,
          // Under the amount, level with the plan's slot line.
          note: bundle.validDays != null ? `Valid for ${bundle.validDays}\u00A0days` : undefined,
          extraOff: props.extraOff,
          ctaLabel: `Continue with ${bundle.credits} credits`,
          ctaShortLabel: "Continue",
          onSelect: props.onStay,
        }}
        upgrade={{
          title: plan.label,
          price: planPrice,
          mrp: props.extraOff ? plan.price : undefined,
          unit: monthly ? "/month" : "/quarter",
          badge: "UNLIMITED POSTS",
          // Compares row for row with the credits tile: under each amount,
          // its time limit ("Valid for N days" / "1 active job slot for N
          // days"); the city limit closes the plan's details, bottom right.
          note: `1 active job slot for ${plan.months * 30}\u00A0days`,
          planFacts: { dbCredits: plan.dbCredits, dbWorth: plan.dbWorth, singleCity: true },
          extraOff: props.extraOff,
          ctaLabel: `Get ${name} for ${inr(planPrice)}`,
          ctaShortLabel: `Get ${name}`,
          onSelect: props.onTake,
        }}
      />
    </OfferDialog>
  )
}

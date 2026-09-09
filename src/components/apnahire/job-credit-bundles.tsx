"use client"

/**
 * JobCreditBundles — Jobs tab pricing cards.
 *
 * Three credit-bundle cards (3 / 6 / 13), each with its own "Buy now" CTA
 * that opens the checkout drawer directly with that bundle — matches the
 * self-checkout design's buy-per-card flow rather than a select-then-checkout
 * pattern.
 */

import * as React from "react"
import { CalendarDays, ArrowRight } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────── types ───────────────────────── */

export type BundleId = "3" | "6" | "13"

interface Bundle {
  id: BundleId
  credits: number
  subcopy: string
  validDays: number
  price: number
  mrp: number
  discountPct: number
  pricePerCredit: number
  recommended?: boolean
}

/* ─────────────────────────────────────── data ────────────────────────── */
/* Figures match the finalized self-checkout Figma design exactly. */

const BUNDLES: Bundle[] = [
  {
    id: "3",
    credits: 3,
    subcopy: "Ideal for small teams",
    validDays: 30,
    price: 1949,
    mrp: 2499,
    discountPct: 22,
    pricePerCredit: 650,
  },
  {
    id: "6",
    credits: 6,
    subcopy: "Perfect for growing businesses",
    validDays: 90,
    price: 3649,
    mrp: 4194,
    discountPct: 13,
    pricePerCredit: 608,
    recommended: true,
  },
  {
    id: "13",
    credits: 13,
    subcopy: "Best fit for larger hiring needs",
    validDays: 180,
    price: 7099,
    mrp: 8999,
    discountPct: 21,
    pricePerCredit: 546,
  },
]

/** Single job-credit purchase — reached via "I need a single job credit". */
export const SINGLE_CREDIT: Bundle = {
  id: "3", // reuses the BundleId type; not rendered as a card
  credits: 1,
  subcopy: "Buy exactly what you need",
  validDays: 30,
  price: 699,
  mrp: 999,
  discountPct: 30,
  pricePerCredit: 699,
}

/* ─────────────────────────────────────── component ──────────────────── */

interface JobCreditBundlesProps {
  onBuyNow: (bundle: Bundle) => void
  onBuySingleCredit: () => void
  className?: string
}

export function JobCreditBundles({
  onBuyNow,
  onBuySingleCredit,
  className,
}: JobCreditBundlesProps) {
  return (
    // Card-group frame — source's `.v4-jobs-cards-wrapper`, an alpha-black
    // panel wrapping the header + cards. This IS the component's root (not
    // wrapped in an outer column with the footer legend) so it can
    // participate directly in the parent row's `items-stretch` and match
    // the Unlimited side-card's height — the footer legend renders as its
    // own full-width row in credits/page.tsx instead.
    <div
      data-slot="job-credit-bundles"
      className={cn("flex flex-col gap-4 rounded-2xl bg-checkout-track p-4", className)}
    >
        {/* Section header — fixed min-height so it lines up with the
            Unlimited side-card's header, keeping both inner-card rows
            starting at the same top edge regardless of copy length. */}
        <div className="flex min-h-12 items-start justify-between gap-3 px-1">
          <div>
            <h2 className="text-lg font-semibold text-checkout-hero-fg">Job credits</h2>
            <p className="mt-0.5 text-sm text-checkout-hero-fg-muted">
              Pick a bundle. Choose the job type later, when you post.
            </p>
          </div>
          <button
            type="button"
            onClick={onBuySingleCredit}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-info hover:opacity-80"
          >
            I need a single job credit
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        {/* Credit bundle cards — whole card is clickable (matches source:
            card click and the "Buy now" button trigger the same action).
            PricingCard is the shared design-system layout primitive;
            colour (checkout-scoped green/blue) stays here, at the caller. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {BUNDLES.map((bundle) => (
            <PricingCard
              key={bundle.id}
              onClick={() => onBuyNow(bundle)}
              ribbon={
                bundle.recommended && (
                  <Badge className="rounded-none rounded-bl-xl border-transparent bg-info px-4 py-0.5 text-2xs font-semibold text-info-foreground">
                    Recommended
                  </Badge>
                )
              }
              title={`${bundle.credits} Job credits`}
              subtitle={bundle.subcopy}
              meta={
                <>
                  <CalendarDays className="size-4 shrink-0" aria-hidden />
                  Valid for {bundle.validDays} days
                </>
              }
              price={`₹${bundle.price.toLocaleString("en-IN")}`}
              mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
              badge={
                <Badge className="border-transparent bg-checkout-discount-bg text-2xs text-checkout-discount-fg">
                  {bundle.discountPct}% OFF
                </Badge>
              }
              priceSuffix={`₹${bundle.pricePerCredit} /credit`}
              cta={
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full font-semibold",
                    bundle.recommended &&
                      "border-transparent bg-checkout-primary text-checkout-primary-foreground hover:bg-checkout-primary-hover hover:text-checkout-primary-foreground"
                  )}
                >
                  Buy now
                </Button>
              }
            />
          ))}
        </div>
    </div>
  )
}

/* Export helpers so page.tsx can look up bundle data */
export { BUNDLES }

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
import { ClockFading, ArrowRight, Sparkles } from "@apna/design-system"
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
/* Figures match the finalized self-checkout Figma design exactly. Every
 * derived figure (pricePerCredit) is stored as the Figma literal rather
 * than computed: the design rounds 1949/3 = 649.67 to 650 but truncates
 * elsewhere, so arithmetic would drift from the drawing. */

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
    // Card-group frame — an alpha-black panel wrapping the header + cards.
    // This IS the component's root (the job-type legend is NOT part of it):
    // the legend renders directly under this frame, in the left column of
    // self-checkout.tsx, so the frame itself can stretch to match the
    // Unlimited side-card next to it.
    <div
      data-slot="job-credit-bundles"
      className={cn("flex flex-col gap-5 rounded-2xl bg-checkout-track p-4", className)}
    >
      {/* Section header — fixed min-height so it lines up with the
          Unlimited side-card's header, keeping both inner-card rows
          starting at the same top edge regardless of copy length.
          `leading-6` on the title is deliberate: text-h4's snug 1.3 line
          renders 26px, which makes this header 50px against the Unlimited
          header's 48px and knocks the two card columns 2px out of line.
          Below sm the link drops under the title so the subtitle keeps a
          readable measure. */}
      <div className="flex min-h-12 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold leading-6 text-checkout-hero-fg">
            Job credits
          </h2>
          <p className="text-sm text-checkout-hero-fg-muted">
            Pick a bundle. Choose the job type later, when you post.
          </p>
        </div>
        {/* `text-checkout-info` is the checkout surface's fixed blue-500
            (apna-sky-500) — the same ink the design gives this link and the
            Recommended ribbon. `--info` is apna-sky-600 and remaps in dark,
            so it is wrong on a surface drawn light in both themes. */}
        <button
          type="button"
          onClick={onBuySingleCredit}
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-checkout-info hover:opacity-80"
        >
          I need a single job credit
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>

      {/* Credit bundle cards — whole card is clickable (card click and the
          "Buy now" button trigger the same action). PricingCard is the
          shared design-system layout primitive; the accent (ribbon,
          discount pill, filled CTA) is passed in as pre-styled primitives.
          `flex-1` is load-bearing: it lets the grid absorb the frame's
          spare height so all four dividers, price rows and CTAs line up
          with the Unlimited card's. The 3-up breakpoint is `lg`, not `sm`
          — below that the 20px price row plus the discount pill overflows
          a ~170px card. */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {BUNDLES.map((bundle) => (
          <PricingCard
            key={bundle.id}
            className="border-transparent"
            onClick={() => onBuyNow(bundle)}
            ribbon={
              bundle.recommended && (
                <Badge variant="ribbon" size="ribbon">
                  Recommended
                  <Sparkles aria-hidden />
                </Badge>
              )
            }
            title={`${bundle.credits} Job credits`}
            subtitle={bundle.subcopy}
            meta={[
              <>
                <ClockFading aria-hidden />
                Valid for {bundle.validDays} days
              </>,
            ]}
            price={`₹${bundle.price.toLocaleString("en-IN")}`}
            mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
            badge={<Badge variant="discount">{bundle.discountPct}% OFF</Badge>}
            priceSuffix={`₹${bundle.pricePerCredit} /credit`}
            cta={
              <Button
                type="button"
                variant={bundle.recommended ? "checkout" : "outline"}
                className="h-10 w-full font-semibold"
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

"use client"

/**
 * UnlimitedSideCard — the right-column "apna Unlimited" card shown next to
 * the Jobs-tab job-credit card group (the side-by-side comparison —
 * distinct from the small full-width promo banner).
 *
 * Dark outer card (fixed across themes, like the hero/unlimited-banner
 * gradients) wrapping a fixed-white `PricingCard` — the same primitive the
 * bundle cards use, so the two columns' titles, dividers, price rows and
 * CTAs line up. The whole card is clickable.
 *
 * Note that the column, not this component, owns the width and the
 * "Note: This plan is valid in a single city." caption below the card —
 * both live in self-checkout.tsx's right column.
 */

import * as React from "react"
import { ClockFading, UserSearch, LogoApnaUnlimited } from "@apna/design-system"
import { Button, PricingCard } from "@apna/design-system"
import { cn } from "@/lib/utils"

interface UnlimitedSideCardProps {
  price?: number
  /** The design's literal, NOT price/jobSlotMonths — 5999/3 = 1999.67, and
   *  the drawing truncates it to 1,999 rather than rounding to 2,000. */
  monthlyPrice?: number
  jobSlotMonths?: number
  dbCredits?: number
  dbCreditsWorth?: number
  onBuyNow?: () => void
  className?: string
}

export function UnlimitedSideCard({
  price = 5999,
  monthlyPrice = 1999,
  jobSlotMonths = 3,
  dbCredits = 600,
  dbCreditsWorth = 6000,
  onBuyNow,
  className,
}: UnlimitedSideCardProps) {
  return (
    // No border: the design draws no stroke here, and the hover affordance
    // is the inner card's own lift. `overflow-hidden` keeps the inner
    // card's radius clipped against the gradient.
    <div
      data-slot="unlimited-side-card"
      onClick={onBuyNow}
      className={cn(
        "flex w-full cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl bg-gradient-checkout-unlimited p-4",
        className
      )}
    >
      {/* Dark header — the official wordmark, gold Accent Gradient variant.
          Fixed min-height matches JobCreditBundles' header so both
          inner-card rows start at the same top edge; the 24px logo row with
          6px of lead sets the 16px-tall art at the drawing's optical
          position. */}
      <div className="flex min-h-12 flex-col gap-1">
        <div className="flex h-6 items-start pt-1.5">
          <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
        </div>
        <p className="text-sm text-surface-inverted-fg/80">
          Unlimited hiring for {jobSlotMonths} months
        </p>
      </div>

      {/* Fixed-white inner card. `surface="inset"` keeps it (and its text)
          light in BOTH themes — the theme-aware card roles would render
          near-invisible text on this always-dark surface.
          Deliberately NO `onClick` here: the outer card already owns the
          whole-card click, and a second handler would fire twice as the
          Buy now click bubbles through. */}
      <PricingCard
        surface="inset"
        className="flex-1 border-transparent"
        title="Unlimited job posts"
        subtitle="Free job reposts and swapping"
        meta={[
          <>
            <ClockFading aria-hidden />1 Active job slot for {jobSlotMonths} months
          </>,
          <>
            <UserSearch aria-hidden />
            {dbCredits} database credits worth ₹{dbCreditsWorth.toLocaleString("en-IN")}
          </>,
        ]}
        price={`₹${price.toLocaleString("en-IN")}`}
        priceSuffix={
          <span className="text-checkout-primary">
            That&apos;s just ₹{monthlyPrice.toLocaleString("en-IN")} /month
          </span>
        }
        cta={
          <Button type="button" variant="checkout-inset" className="h-10 w-full font-semibold">
            Buy now
          </Button>
        }
      />
    </div>
  )
}

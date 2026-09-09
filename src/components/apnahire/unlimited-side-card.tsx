"use client"

/**
 * UnlimitedSideCard — the right-column "apna Unlimited" card shown next to
 * the Jobs-tab job-credit card group (source: `.v4-side-unlimited-card`,
 * the side-by-side comparison — distinct from the small full-width promo
 * banner, which the source never actually renders in its default flow).
 *
 * Dark outer card (fixed across themes, like the hero/unlimited-banner
 * gradients) wrapping a fixed-white inner card with price, features, and a
 * pill "Buy now" CTA. The whole card is clickable, matching source behavior.
 */

import * as React from "react"
import { CalendarClock, Database, LogoApnaUnlimited } from "@apna/design-system"
import { Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

interface UnlimitedSideCardProps {
  price?: number
  jobSlotMonths?: number
  dbCredits?: number
  dbCreditsWorth?: number
  onBuyNow?: () => void
  className?: string
}

export function UnlimitedSideCard({
  price = 5999,
  jobSlotMonths = 3,
  dbCredits = 600,
  dbCreditsWorth = 6000,
  onBuyNow,
  className,
}: UnlimitedSideCardProps) {
  return (
    <div
      data-slot="unlimited-side-card"
      onClick={onBuyNow}
      className={cn(
        "flex w-full shrink-0 cursor-pointer flex-col gap-4 rounded-2xl border border-checkout-unlimited-line bg-gradient-checkout-unlimited p-4 transition-colors hover:border-checkout-unlimited-line-hover lg:w-82",
        className
      )}
    >
      {/* Dark header — the official wordmark, gold Accent Gradient variant
          (matches the source design's own gold-gradient logo asset on
          this dark card). Fixed min-height matches JobCreditBundles'
          header so both inner-card rows start at the same top edge. */}
      <div className="flex min-h-12 flex-col items-start justify-center gap-1">
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
        <p className="text-xs text-surface-inverted-fg/70">
          Unlimited hiring for {jobSlotMonths} months
        </p>
      </div>

      {/* Fixed-white inner card — stretches to fill the outer card's
          (stretched-to-match-sibling) height, pinning the CTA to the
          bottom, matching source's `justify-content:space-between`. */}
      <div className="flex flex-1 flex-col justify-between gap-3.5 rounded-xl border border-checkout-inset-border bg-checkout-inset p-4 pt-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold text-checkout-hero-fg">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-checkout-hero-fg-muted">Quarterly plan</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="flex items-center gap-2 text-sm text-checkout-hero-fg-muted">
              <CalendarClock className="size-4 shrink-0" aria-hidden />
              1 Active job slot for {jobSlotMonths} months
            </span>
            <span className="flex items-center gap-2 text-sm text-checkout-hero-fg-muted">
              <Database className="size-4 shrink-0" aria-hidden />
              {dbCredits} database credits worth ₹{dbCreditsWorth.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="border-t border-checkout-inset-border pt-2.5 text-xs text-checkout-hero-fg-muted">
            Note: This plan is valid in a single city.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-checkout-inset-border bg-checkout-inset font-semibold text-checkout-hero-fg hover:bg-checkout-track"
        >
          Buy now
        </Button>
      </div>
    </div>
  )
}

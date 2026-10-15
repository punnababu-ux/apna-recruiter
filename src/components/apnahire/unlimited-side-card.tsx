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
import { ArrowRight, Briefcase, ClockFading, UserSearch, LogoApnaUnlimited } from "@apna/design-system"
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
        "flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-checkout-unlimited p-4",
        className
      )}
    >
      {/* ── Mobile layout (< md) matching user reference image ── */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex h-5 items-start">
          <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
        </div>

        <div className="rounded-xl bg-card p-4 text-card-foreground shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <span className="text-base font-bold text-foreground">Unlimited job posts</span>
            {/* The price column never shrinks and "₹1,999 /month" never
                splits; the title wraps first. */}
            <div className="flex shrink-0 flex-col items-end text-right">
              <span className="text-base font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
              <span className="text-xs font-semibold whitespace-nowrap text-checkout-primary">
                ₹{monthlyPrice.toLocaleString("en-IN")} /month
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ClockFading className="size-3.5 shrink-0" aria-hidden />
              <span>1 job slot for {jobSlotMonths} months</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="size-3.5 shrink-0" aria-hidden />
              <span>Free job reposts and swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <UserSearch className="size-3.5 shrink-0" aria-hidden />
              <span>{dbCredits} database credits worth ₹{dbCreditsWorth.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
            <span className="text-xs italic text-muted-foreground">
              Note: This plan is valid in a single city.
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full px-3 text-xs font-semibold"
              onClick={onBuyNow}
            >
              Buy now
              <ArrowRight className="size-3" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Desktop view (md and up) ── `md:flex-1` lets the inner card's
          `flex-1` stretch to the row height, so its price and CTA line up
          with the job credit cards beside it. Split at md like the page. */}
      <div className="hidden md:flex md:flex-1 md:flex-col md:gap-5">
        <div className="flex min-h-12 flex-col gap-1">
          <div className="flex h-6 items-start pt-1.5">
            <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
          </div>
          <p className="text-sm text-surface-inverted-fg/80">
            Unlimited hiring for {jobSlotMonths} months
          </p>
        </div>

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
              That&apos;s just ₹{monthlyPrice.toLocaleString("en-IN")}{"\u00A0"}/month
            </span>
          }
          cta={
            <Button type="button" variant="checkout-inset" className="h-10 w-full font-semibold">
              Buy now
            </Button>
          }
        />
      </div>
    </div>
  )
}

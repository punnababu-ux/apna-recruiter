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
 *
 * Phones (< md) get `MobileUnlimitedCard` instead, the card express
 * checkout uses, so both checkouts show one structure.
 */

import * as React from "react"
import { BriefcaseBusiness, ClockFading, Database, LogoApnaUnlimited, UserSearch, WhatsApp } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
import { withExtraOff } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow } from "@/components/apnahire/mobile-plan-row"
import { cn } from "@/lib/utils"
import { MobileUnlimitedCard } from "@/components/apnahire/mobile-plan-row"
import { inr } from "@/lib/format"

interface UnlimitedSideCardProps {
  price?: number
  /** The design's literal, NOT price/jobSlotMonths — 5999/3 = 1999.67, and
   *  the drawing truncates it to 1,999 rather than rounding to 2,000. */
  monthlyPrice?: number
  jobSlotMonths?: number
  dbCredits?: number
  dbCreditsWorth?: number
  /** The claimed 10% exit offer: the price drops by it, the old price is
   *  struck through with its % OFF, and the per-month figure follows. */
  extraOff?: boolean
  onBuyNow?: () => void
  className?: string
}

export function UnlimitedSideCard({
  price = 5999,
  monthlyPrice = 1999,
  jobSlotMonths = 3,
  dbCredits = 600,
  dbCreditsWorth = 6000,
  extraOff = false,
  onBuyNow,
  className,
}: UnlimitedSideCardProps) {
  const basePrice = price
  price = extraOff ? withExtraOff(basePrice) : basePrice
  // Truncated, as the design does for ₹5,999 / 3 = ₹1,999.
  if (extraOff) monthlyPrice = Math.floor(price / jobSlotMonths)
  const pct = extraOff ? Math.round((1 - price / basePrice) * 100) : null
  // Works for any plan length: the Jobs tab sells the monthly plan (1), the
  // card was first drawn for the quarterly one (3).
  const monthly = jobSlotMonths === 1
  const slotDays = jobSlotMonths * 30
  const strike = extraOff ? inr(basePrice) : undefined
  return (
    <>
      {/* ── Mobile (< md): the shared phone card, the same one express
          checkout uses, so the two checkouts read alike. ── */}
      <MobileUnlimitedCard
        onSelect={onBuyNow}
        className={cn("md:hidden", className)}
        // Same card, same structure as express checkout's Monthly plan: name
        // and price with its unit on top, the reposts promise as subtitle,
        // three plan lines, then the note and CTA.
        title={monthly ? "Monthly plan" : "Quarterly plan"}
        subtitle="Unlimited job reposts"
        mrp={strike}
        price={inr(price)}
        unit={monthly ? "/month" : "/quarter"}
        belowPrice={<MobileDiscountRow pct={pct} note={extraOff ? "Incl. 10% extra" : undefined} />}
        features={[
          [<BriefcaseBusiness key="i" aria-hidden />, <><strong>1 active job slot</strong> for {slotDays} days</>],
          [<Database key="i" aria-hidden />, `${dbCredits} database credits worth ${inr(dbCreditsWorth)}`],
          [<WhatsApp key="i" aria-hidden />, "WhatsApp outreach to matched candidates"],
        ]}
        note="Valid in a single city"
        cta={
          // Dark companion CTA on phones (user call, 2026-10-19): the
          // sticky green Buy bar stays the screen's one primary.
          <Button
            type="button"
            variant="emphasis"
            size="sm"
            className="h-8 shrink-0 rounded-full px-3.5 text-xs font-semibold"
            onClick={onBuyNow}
          >
            Get Unlimited
          </Button>
        }
      />

      {/* No border: the design draws no stroke here. The whole frame is the
          click target but stays put; hovering anywhere in it lifts the card
          inside (`data-card-lift-group`, card-hover-lift rule). No
          `overflow-hidden`: it would clip that card's lifted shadow. */}
      <div
        data-slot="unlimited-side-card"
        data-card-lift-group
        onClick={onBuyNow}
        className={cn(
          "hidden w-full cursor-pointer flex-col rounded-card bg-gradient-checkout-unlimited p-4 md:flex",
          className
        )}
      >
        {/* ── Desktop view (md and up) ── `md:flex-1` lets the inner card's
            `flex-1` stretch to the row height, so its price and CTA line up
            with the job credit cards beside it. Split at md like the page. */}
        <div className="hidden md:flex md:flex-1 md:flex-col md:gap-5">
          <div className="flex min-h-12 flex-col gap-1">
            <div className="flex h-6 items-start pt-1.5">
              <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
            </div>
            <p className="text-sm text-surface-inverted-fg/80">
              Unlimited hiring for {monthly ? "a month" : `${jobSlotMonths} months`}
            </p>
          </div>

          <PricingCard
            // The frame around it takes the click.
            interactive
            surface="inset"
            className="flex-1 border-transparent"
            title="Unlimited job posts"
            subtitle="Free job reposts and swapping"
            meta={[
              <>
                <ClockFading aria-hidden />1 Active job slot for {monthly ? `${slotDays} days` : `${jobSlotMonths} months`}
              </>,
              <>
                <UserSearch aria-hidden />
                {dbCredits} database credits worth {inr(dbCreditsWorth)}
              </>,
            ]}
            price={
              monthly ? (
                <>
                  {inr(price)}
                  <span className="text-sm font-regular">/month</span>
                </>
              ) : (
                inr(price)
              )
            }
            mrp={strike}
            badge={pct ? <Badge variant="discount">{pct}% OFF</Badge> : undefined}
            priceSuffix={
              <span className="flex flex-col gap-1">
                {extraOff && <ExtraOffLine />}
                {/* Monthly already shows /month on the price, but the line is
                    kept (empty) so it stays level with the job cards'
                    "₹650 /credit" beside it, offer applied or not. */}
                {monthly ? (
                  <span aria-hidden>{"\u00A0"}</span>
                ) : (
                  // Green only on its own; once the offer line is above it,
                  // it steps back to gray so only one line is green.
                  <span className={extraOff ? undefined : "text-checkout-primary"}>
                    That&apos;s just {inr(monthlyPrice)}{"\u00A0"}/month
                  </span>
                )}
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
    </>
  )
}

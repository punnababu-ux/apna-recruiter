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
import { BriefcaseBusiness, ClockFading, InfinityIcon, Database, LogoApnaUnlimited, UserSearch, WhatsApp } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
import { withExtraOff } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow } from "@/components/apnahire/mobile-plan-row"
import { cn } from "@/lib/utils"
import { useCardHover } from "@/components/apnahire/use-card-hover"
import { MobileMetaLine, MobileSlotLine, MobileUnlimitedCard, MobileUnlimitedLine } from "@/components/apnahire/mobile-plan-row"
import { useCheckoutVersion, versionAtLeast } from "@/hooks/use-checkout-version"
import { UpcomingPriceLine } from "@/components/apnahire/upcoming-price-line"
import { inr } from "@/lib/format"
import { dbCreditsLabel, slotLabel, type SubscriptionPlan } from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"

interface UnlimitedSideCardProps {
  /** The plan it sells (usePlans().plan(id)): price, name, unit, slot days
   *  and database credits all come from it. Defaults to the pricing phase's
   *  monthly plan, which the Jobs tab sells (user call, 2026-10-19). */
  plan?: SubscriptionPlan
  /** The claimed 10% exit offer: the price drops by it, the old price is
   *  struck through with its % OFF, and the per-month figure follows. */
  extraOff?: boolean
  onBuyNow?: () => void
  /** Phones: a radio in the Jobs list instead of its own CTA; the sticky
   *  bar buys it. Tapping selects it (onSelect). */
  mobileSelect?: { selected: boolean; onSelect: () => void }
  className?: string
}

export function UnlimitedSideCard({
  plan: planProp,
  extraOff = false,
  onBuyNow,
  mobileSelect,
  className,
}: UnlimitedSideCardProps) {
  const catalog = usePlans()
  const plan = planProp ?? catalog.plan("monthly")
  const basePrice = plan.price
  const price = extraOff ? withExtraOff(basePrice) : basePrice
  // Truncated, as the design does for ₹5,999 / 3 = ₹1,999.
  const monthlyPrice = Math.floor(price / plan.months)
  // The plan's own discount only (none today): the 10% is its own line.
  const pct = plan.mrp && plan.mrp > basePrice ? Math.round((1 - basePrice / plan.mrp) * 100) : null
  // Works for any plan length: the Jobs tab sells the monthly plan, the
  // card was first drawn for the quarterly one.
  const monthly = plan.months === 1
  const strike = extraOff ? inr(basePrice) : undefined
  // Desktop: outline CTA at rest, green while the frame is hovered.
  const hover = useCardHover()
  // V13, phones: express V11's card (title, price alone, "1 job live at a
  // time"), without "Job reposts and swapping"; this page sells no
  // visibility, so no "Dynamic visibility" either (user calls, 2026-10-30).
  const v13 = versionAtLeast(useCheckoutVersion(), "v13")
  return (
    <>
      {/* ── Mobile (< md): the shared phone card, the same one express
          checkout uses, so the two checkouts read alike. ── */}
      <MobileUnlimitedCard
        onSelect={mobileSelect?.onSelect ?? onBuyNow}
        selected={mobileSelect?.selected}
        className={cn("md:hidden", className)}
        // Same card, same structure as express checkout's card: name
        // and price with its unit on top, then "1 active job slot for 30 days" (no
        // separate validity line), the plan lines, then the note and CTA.
        title={v13 ? "Unlimited jobs for 1 month" : "Unlimited monthly plan"}
        mrp={v13 ? undefined : strike}
        price={inr(price)}
        unit={v13 ? undefined : plan.unitShort}
        belowPrice={v13 ? undefined : <MobileDiscountRow pct={pct} />}
        upcoming={<UpcomingPriceLine price={plan.janPrice} />}
        meta={
          v13 ? (
            <MobileMetaLine icon={<BriefcaseBusiness className="text-checkout-primary" aria-hidden />}>
              1 job live at a time
            </MobileMetaLine>
          ) : (
            <MobileSlotLine slots={plan.slots} days={plan.slotDays} muted />
          )
        }
        features={[
          // The slot shows above, as meta.
          [<WhatsApp key="i" className="text-success" aria-hidden />, "WhatsApp alerts to matched candidates"],
          [<InfinityIcon key="i" className="text-warning" aria-hidden />, "Free job reposts and swapping"],
          [<Database key="i" className="text-muted-foreground" aria-hidden />, dbCreditsLabel(plan)],
        ]}
        line={<MobileUnlimitedLine db={dbCreditsLabel(plan)} reposts={!v13} />}
        note="Valid in a single city"
        cta={
          mobileSelect ? undefined :
          // Dark companion CTA on phones (user call, 2026-10-19): the
          // sticky green Buy bar stays the screen's one primary.
          <Button
            type="button"
            variant="emphasis"
            size="sm"
            className="shrink-0 px-3.5"
            onClick={onBuyNow}
          >
            Buy now
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
        {...hover.props}
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
              Unlimited hiring for {plan.slotDays}{"\u00A0"}days
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
                <ClockFading aria-hidden />
                {slotLabel(plan.slots)} for {plan.slotDays}{"\u00A0"}days
              </>,
              <>
                <UserSearch aria-hidden />
                {dbCreditsLabel(plan)}
              </>,
            ]}
            price={inr(price)}
            unit={monthly ? plan.unit : undefined}
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
                <UpcomingPriceLine price={plan.janPrice} />
              </span>
            }
            cta={
              <Button type="button" variant={hover.active ? "checkout" : "outline"} className="h-10 w-full font-semibold">
                Buy now
              </Button>
            }
          />
        </div>
      </div>
    </>
  )
}

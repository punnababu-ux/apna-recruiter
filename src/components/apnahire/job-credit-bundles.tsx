"use client"

/**
 * JobCreditBundles — Jobs tab pricing cards.
 *
 * Three credit-bundle cards (the pricing phase's set, from usePlans), each
 * with its own "Buy now" CTA that opens the checkout drawer directly with that bundle — matches the
 * self-checkout design's buy-per-card flow rather than a select-then-checkout
 * pattern.
 */

import * as React from "react"
import { ClockFading, ArrowRight, Package, Sparkles } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { CardHover, RECOMMENDED_EDGE } from "@/components/apnahire/use-card-hover"
import { withExtraOffBundle } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow, MobileMetaLine, MobilePlanRow } from "@/components/apnahire/mobile-plan-row"
import { UpcomingPriceLine } from "@/components/apnahire/upcoming-price-line"
import { inr } from "@/lib/format"
import { usePlans } from "@/hooks/apnahire/use-plans"
import type { Bundle, BundleId } from "@/content/credit-bundles"

export type { Bundle, BundleId } from "@/content/credit-bundles"

/* ─────────────────────────────────────── component ──────────────────── */

export interface JobCreditBundlesProps {
  /** The claimed 10% exit offer: show it in every price. */
  extraOff?: boolean
  onBuyNow: (bundle: Bundle) => void
  onBuySingleCredit: () => void
  selectedBundleId?: BundleId | null
  onSelectBundle?: (bundle: Bundle) => void
  className?: string
  /** Phones (V13): the packs sit in one panel, as express V11's job types:
   *  a header, the cards 12px apart, then `footer` inside the panel. */
  grouped?: boolean
  footer?: React.ReactNode
}

export function JobCreditBundles({
  extraOff = false,
  onBuyNow,
  onBuySingleCredit,
  selectedBundleId,
  onSelectBundle,
  className,
  grouped,
  footer,
}: JobCreditBundlesProps) {
  const { bundles } = usePlans()
  const [internalSelectedId, setInternalSelectedId] = React.useState<BundleId>(
    () => bundles.find((b) => b.recommended)?.id ?? bundles[0].id,
  )
  // null: something outside the list is selected (the Unlimited card).
  const currentSelectedId = selectedBundleId === undefined ? internalSelectedId : selectedBundleId

  const handleSelect = (bundle: Bundle) => {
    setInternalSelectedId(bundle.id)
    onSelectBundle?.(bundle)
  }

  return (
    <div
      data-slot="job-credit-bundles"
      className={cn("flex flex-col gap-3 sm:gap-5 sm:rounded-card sm:surface-glass-dark sm:p-4", className)}
    >
      {/* ── Mobile-first selectable radio cards (< md) ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* text-h4: the size of the other tabs' headings ("Enterprise plans").
            "Buy 1 job credit" sits under the cards on phones, opposite
            "What 1 job credit will get you?" (self-checkout, 2026-10-30). */}
        {grouped ? null : <h2 className="text-h4 text-checkout-hero-fg">Job credit packages</h2>}

        {/* V13: the panel of express V11 (PlanFrame's look): 12px at the
            sides, bottom and between cards, 16px above the header, a frame
            corner concentric with the nested cards (user call, 2026-10-30). */}
        <div className={cn(grouped && "flex flex-col gap-3 rounded-frame surface-glass-dark px-3 pt-4 pb-3")}>
          {grouped && (
            <div className="flex items-center justify-between gap-2 px-1.5">
              <h2 className="flex items-center gap-2 text-h6 leading-6 whitespace-nowrap text-foreground [&_svg]:size-5 [&_svg]:shrink-0">
                <Package aria-hidden />
                Job credit packages
              </h2>
            </div>
          )}
        <div className={cn("flex flex-col", grouped ? "gap-3" : "gap-4")}>
          {bundles.map((bundle) => {
            const isSelected = currentSelectedId === bundle.id
            // Display figures; selection and checkout keep the base bundle.
            const view = withExtraOffBundle(bundle, extraOff)
            return (
              <MobilePlanRow
                key={bundle.id}
                nested={grouped}
                title={`${bundle.credits} job credits`}
                selected={isSelected}
                onSelect={() => handleSelect(bundle)}
                recommended={bundle.recommended}
                meta={
                  <>
                    <MobileMetaLine icon={<ClockFading aria-hidden />}>
                      Valid for {bundle.validDays} days
                    </MobileMetaLine>
                    {/* The unit cost under the validity, left (user call,
                        2026-10-30). Green: the one green line on the card,
                        now the 10% is said in the header (ExtraOffBar). */}
                    <span className="text-xs whitespace-nowrap italic text-checkout-primary">
                      ₹{view.pricePerCredit}{"\u00A0"}/credit
                    </span>
                  </>
                }
                mrp={inr(bundle.mrp)}
                price={inr(view.price)}
                belowPrice={
                  <MobileDiscountRow pct={view.discountPct} />
                }
                upcoming={<UpcomingPriceLine price={bundle.janPrice} />}
              />
            )
          })}
        </div>
          {grouped && footer}
        </div>
      </div>

      {/* ── Desktop view (md and up) ── `md:flex-1` is load-bearing: the
          wrapper must fill the frame so the grid's `flex-1` can stretch the
          cards to the Unlimited card's height, which keeps prices and CTAs
          on one line across both. */}
      <div className="hidden md:flex md:flex-1 md:flex-col md:gap-5">
        <div className="flex min-h-12 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-h4 leading-6 text-checkout-hero-fg">
              Job credit packages
            </h2>
            <p className="text-sm text-checkout-hero-fg-muted">
              Pick a bundle. Choose the job type later, when you post.
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            // Sky 500 (--checkout-info), the Recommended ribbon's blue, so the
            // two read as one colour on the panel (user call, 2026-10-19).
            className="shrink-0 text-checkout-info"
            onClick={onBuySingleCredit}
            trailingIcon={<ArrowRight aria-hidden />}
          >
            I need a single job credit
          </Button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {bundles.map((bundle) => {
          const view = withExtraOffBundle(bundle, extraOff)
          return (
          // Outline CTA at rest, green while hovered; the recommended card
          // stands out by its blue edge (useCardHover, as in express).
          <CardHover key={bundle.id}>
            {(active) => (
          <PricingCard
            className={cn("flex-1", bundle.recommended ? RECOMMENDED_EDGE : "border-transparent")}
            onClick={() => onBuyNow(bundle)}
            ribbon={
              bundle.recommended && (
                <Badge variant="ribbon" size="ribbon">
                  Recommended
                  <Sparkles aria-hidden />
                </Badge>
              )
            }
            title={`${bundle.credits} job credits`}
            subtitle={bundle.subcopy}
            meta={[
              <>
                <ClockFading aria-hidden />
                Valid for {bundle.validDays} days
              </>,
            ]}
            price={inr(view.price)}
            mrp={inr(bundle.mrp)}
            badge={<Badge variant="discount">{view.discountPct}% OFF</Badge>}
            priceSuffix={
              // The claimed offer's line comes first, the per-credit price under it.
              <span className="flex flex-col gap-1">
                {extraOff && <ExtraOffLine />}
                {/* Green only on its own; under the offer line it steps back to
                    gray, as on the Unlimited card, so only one line is green. */}
                <span className={extraOff ? undefined : "text-checkout-primary"}>₹{view.pricePerCredit}{"\u00A0"}/credit</span>
                <UpcomingPriceLine price={bundle.janPrice} />
              </span>
            }
            cta={
              <Button
                type="button"
                variant={active ? "checkout" : "outline"}
                className="h-10 w-full font-semibold"
              >
                Buy now
              </Button>
            }
          />
            )}
          </CardHover>
          )
        })}
        </div>
      </div>
    </div>
  )
}

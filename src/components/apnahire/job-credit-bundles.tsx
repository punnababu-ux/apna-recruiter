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
import { ClockFading, ArrowRight, Briefcase, Sparkles } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { withExtraOffBundle } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow, MobileMetaLine, MobilePlanRow } from "@/components/apnahire/mobile-plan-row"

/* ─────────────────────────────────────── types ───────────────────────── */

export type BundleId = "3" | "6" | "13"

export interface Bundle {
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

export interface JobCreditBundlesProps {
  /** The claimed 10% exit offer: show it in every price. */
  extraOff?: boolean
  onBuyNow: (bundle: Bundle) => void
  onBuySingleCredit: () => void
  selectedBundleId?: BundleId
  onSelectBundle?: (bundle: Bundle) => void
  className?: string
}

export function JobCreditBundles({
  extraOff = false,
  onBuyNow,
  onBuySingleCredit,
  selectedBundleId,
  onSelectBundle,
  className,
}: JobCreditBundlesProps) {
  const [internalSelectedId, setInternalSelectedId] = React.useState<BundleId>("6")
  const currentSelectedId = selectedBundleId ?? internalSelectedId

  const handleSelect = (bundle: Bundle) => {
    setInternalSelectedId(bundle.id)
    onSelectBundle?.(bundle)
  }

  return (
    <div
      data-slot="job-credit-bundles"
      className={cn("flex flex-col gap-3 sm:gap-5 sm:rounded-2xl sm:bg-checkout-track sm:p-4", className)}
    >
      {/* ── Mobile-first selectable radio cards (< md) ── */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-checkout-hero-fg" aria-hidden />
            <h2 className="font-heading text-base font-semibold text-checkout-hero-fg">
              Job credits
            </h2>
          </div>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="shrink-0"
            onClick={onBuySingleCredit}
            trailingIcon={<ArrowRight aria-hidden />}
          >
            Buy 1 job credit
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {BUNDLES.map((bundle) => {
            const isSelected = currentSelectedId === bundle.id
            // Display figures; selection and checkout keep the base bundle.
            const view = withExtraOffBundle(bundle, extraOff)
            return (
              <MobilePlanRow
                key={bundle.id}
                title={`${bundle.credits} Job credits`}
                selected={isSelected}
                onSelect={() => handleSelect(bundle)}
                recommended={bundle.recommended}
                meta={
                  <>
                    <MobileMetaLine icon={<ClockFading aria-hidden />}>
                      Valid for {bundle.validDays} days
                    </MobileMetaLine>
                    {/* pt-1: 12px under the validity line, not the column's
                        8px, so the unit cost reads as its own line. */}
                    <span className="pt-1 text-xs whitespace-nowrap italic text-muted-foreground">
                      ₹{view.pricePerCredit}{"\u00A0"}/credit
                    </span>
                  </>
                }
                mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
                price={`₹${view.price.toLocaleString("en-IN")}`}
                belowPrice={
                  <MobileDiscountRow pct={view.discountPct} note={extraOff ? "Incl. 10% extra" : undefined} />
                }
              />
            )
          })}
        </div>
      </div>

      {/* ── Desktop view (md and up) ── `md:flex-1` is load-bearing: the
          wrapper must fill the frame so the grid's `flex-1` can stretch the
          cards to the Unlimited card's height, which keeps prices and CTAs
          on one line across both. */}
      <div className="hidden md:flex md:flex-1 md:flex-col md:gap-5">
        <div className="flex min-h-12 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="font-heading text-xl font-semibold leading-6 text-checkout-hero-fg">
              Job credits
            </h2>
            <p className="text-sm text-checkout-hero-fg-muted">
              Pick a bundle. Choose the job type later, when you post.
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            className="shrink-0"
            onClick={onBuySingleCredit}
            trailingIcon={<ArrowRight aria-hidden />}
          >
            I need a single job credit
          </Button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {BUNDLES.map((bundle) => {
          const view = withExtraOffBundle(bundle, extraOff)
          return (
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
            price={`₹${view.price.toLocaleString("en-IN")}`}
            mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
            badge={<Badge variant="discount">{view.discountPct}% OFF</Badge>}
            priceSuffix={
              // The claimed offer's line sits under the per-credit price.
              <span className="flex flex-col gap-1">
                <span>₹{view.pricePerCredit}{"\u00A0"}/credit</span>
                {extraOff && <ExtraOffLine />}
              </span>
            }
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
          )
        })}
        </div>
      </div>
    </div>
  )
}

/* Export helpers so page.tsx can look up bundle data */
export { BUNDLES }

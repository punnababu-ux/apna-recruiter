"use client"

/**
 * DatabaseCreditBundles — Database tab pricing cards.
 *
 * Section heading + three database-credit bundle cards, each with its own
 * "Buy now" CTA (Figma 899:1253).
 *
 * Not a clone of JobCreditBundles. Two things differ from the Jobs tab
 * (1971:8641):
 *   - No grey track. 899:1253 has no fill, padding or radius — the heading
 *     and cards sit straight on the page gradient, 20px apart.
 *   - The card draws its own 1px gray/200 border; the Jobs card draws none.
 *
 * The card hierarchy itself matches Jobs — price-led (`emphasis="price"`,
 * PricingCard's default) rather than Figma 899:1265's title-led 20/16 split
 * — a deliberate consistency call (2026-09-28) so the two credit-bundle
 * grids read as the same component, not two different type scales.
 *
 * The legend line ("1 credit = …") and the GST footnote live at the
 * self-checkout.tsx callsite, grouped with this block at 12px.
 */

import * as React from "react"
import {
  Badge,
  Button,
  ClockFading,
  PricingCard,
  Sparkles,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { withExtraOffBundle } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow, MobileMetaLine, MobilePlanRow } from "@/components/apnahire/mobile-plan-row"

import { UserSearch } from "@apna/design-system"
import { inr } from "@/lib/format"

export type DbBundleId = "170" | "380" | "900"

export interface DbBundle {
  id: DbBundleId
  credits: number
  subcopy: string
  validDays: number
  price: number
  mrp: number
  discountPct: number
  pricePerCredit: number
  recommended?: boolean
}

/* Figures match the Figma Database tab exactly. The discount percentages are
 * floored and the per-credit prices rounded in Figma — they are literal text
 * nodes there, so never derive them. */
const DB_BUNDLES: DbBundle[] = [
  {
    id: "170",
    credits: 170,
    subcopy: "Ideal for small teams",
    validDays: 30,
    price: 1949,
    mrp: 3170,
    discountPct: 38,
    pricePerCredit: 11.5,
  },
  {
    id: "380",
    credits: 380,
    subcopy: "Perfect for growing businesses",
    validDays: 90,
    price: 3649,
    mrp: 6840,
    discountPct: 46,
    pricePerCredit: 9.6,
    recommended: true,
  },
  {
    id: "900",
    credits: 900,
    subcopy: "Best fit for larger hiring needs",
    validDays: 180,
    price: 7099,
    mrp: 15750,
    discountPct: 54,
    pricePerCredit: 7.9,
  },
]

export interface DatabaseCreditBundlesProps {
  /** The claimed 10% exit offer: show it in every price. */
  extraOff?: boolean
  onBuyNow: (bundle: DbBundle) => void
  selectedBundleId?: DbBundleId
  onSelectBundle?: (bundle: DbBundle) => void
  className?: string
}

export function DatabaseCreditBundles({
  extraOff = false,
  onBuyNow,
  selectedBundleId,
  onSelectBundle,
  className,
}: DatabaseCreditBundlesProps) {
  const [internalSelectedId, setInternalSelectedId] = React.useState<DbBundleId>("380")
  const currentSelectedId = selectedBundleId ?? internalSelectedId

  const handleSelect = (bundle: DbBundle) => {
    setInternalSelectedId(bundle.id)
    onSelectBundle?.(bundle)
  }

  return (
    <div
      data-slot="database-credit-bundles"
      className={cn("flex flex-col gap-3 sm:gap-5", className)}
    >
      {/* ── Mobile-first selectable radio cards (< md) ── */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <UserSearch className="size-4 text-checkout-hero-fg" aria-hidden />
          <h2 className="text-h6 text-checkout-hero-fg">
            Database credits
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {DB_BUNDLES.map((bundle) => {
            const isSelected = currentSelectedId === bundle.id
            // Display figures; selection and checkout keep the base bundle.
            const view = withExtraOffBundle(bundle, extraOff)
            return (
              <MobilePlanRow
                key={bundle.id}
                title={`${bundle.credits} Database credits`}
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
                mrp={inr(bundle.mrp)}
                price={inr(view.price)}
                belowPrice={
                  <MobileDiscountRow pct={view.discountPct} note={extraOff ? "Incl. 10% extra" : undefined} />
                }
              />
            )
          })}
        </div>
      </div>

      {/* ── Desktop view (md and up) ── */}
      <div className="hidden md:flex md:flex-col md:gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold leading-tight text-checkout-hero-fg">
            Database credits
          </h2>
          <p className="text-sm text-checkout-hero-fg-secondary">
            22+ filters across roles, city, experience, salary and shifts, and then unlock
            the profiles you want to talk to.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {DB_BUNDLES.map((bundle) => {
          const view = withExtraOffBundle(bundle, extraOff)
          return (
            <PricingCard
              key={bundle.id}
              // On the page background here (no plan track), so the page card corner.
              className="rounded-card"
              onClick={() => onBuyNow(bundle)}
              ribbon={
                bundle.recommended && (
                  <Badge variant="ribbon" size="ribbon">
                    Recommended
                    <Sparkles aria-hidden />
                  </Badge>
                )
              }
              title={`${bundle.credits} Database credits`}
              subtitle={bundle.subcopy}
              meta={
                <>
                  <ClockFading aria-hidden />
                  Valid for {bundle.validDays} days
                </>
              }
              price={inr(view.price)}
              mrp={inr(bundle.mrp)}
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
                  className="h-10 w-full"
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

export { DB_BUNDLES }

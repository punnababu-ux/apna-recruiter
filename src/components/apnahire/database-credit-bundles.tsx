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
import { CardHover, RECOMMENDED_EDGE } from "@/components/apnahire/use-card-hover"
import { withExtraOffBundle } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { MobileDiscountRow, MobileMetaLine, MobilePlanRow } from "@/components/apnahire/mobile-plan-row"

import { inr, num } from "@/lib/format"
import { usePlans } from "@/hooks/apnahire/use-plans"
import type { DbBundle, DbBundleId } from "@/content/credit-bundles"

export type { DbBundle, DbBundleId } from "@/content/credit-bundles"

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
  const { dbBundles } = usePlans()
  const [internalSelectedId, setInternalSelectedId] = React.useState<DbBundleId>(
    () => dbBundles.find((b) => b.recommended)?.id ?? dbBundles[0].id,
  )
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
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-center gap-2">
          {/* text-h4: the size of the other tabs' headings ("Enterprise plans"). */}
          <h2 className="text-h4 text-checkout-hero-fg">
            Database credit packages
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {dbBundles.map((bundle) => {
            const isSelected = currentSelectedId === bundle.id
            // Display figures; selection and checkout keep the base bundle.
            const view = withExtraOffBundle(bundle, extraOff)
            return (
              <MobilePlanRow
                key={bundle.id}
                title={`${num(bundle.credits)} database credits`}
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
              />
            )
          })}
        </div>
      </div>

      {/* ── Desktop view (md and up) ── */}
      <div className="hidden md:flex md:flex-col md:gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold leading-tight text-checkout-hero-fg">
            Database credit packages
          </h2>
          <p className="text-sm text-checkout-hero-fg-secondary">
            22+ filters across roles, city, experience, salary and shifts, and then unlock
            the profiles you want to talk to.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {dbBundles.map((bundle) => {
          const view = withExtraOffBundle(bundle, extraOff)
          return (
            // Outline CTA at rest, green while hovered; the recommended card
            // stands out by its blue edge (useCardHover, as in express).
            <CardHover key={bundle.id}>
              {(active) => (
            <PricingCard
              // On the page background here (no plan track), so the page card
              // corner. Borderless but for the recommended card's edge.
              className={cn("flex-1 rounded-card", bundle.recommended ? RECOMMENDED_EDGE : "border-transparent")}
              onClick={() => onBuyNow(bundle)}
              ribbon={
                bundle.recommended && (
                  <Badge variant="ribbon" size="ribbon">
                    Recommended
                    <Sparkles aria-hidden />
                  </Badge>
                )
              }
              title={`${num(bundle.credits)} database credits`}
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
              // The claimed offer's line comes first, the per-credit price under it.
              <span className="flex flex-col gap-1">
                {extraOff && <ExtraOffLine />}
                {/* Green only on its own; under the offer line it steps back to
                    gray, as on the Unlimited card, so only one line is green. */}
                <span className={extraOff ? undefined : "text-checkout-primary"}>₹{view.pricePerCredit}{"\u00A0"}/credit</span>
              </span>
            }
              cta={
                <Button
                  type="button"
                  variant={active ? "checkout" : "outline"}
                  className="h-10 w-full"
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

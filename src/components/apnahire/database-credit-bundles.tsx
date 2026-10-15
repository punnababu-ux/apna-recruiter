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

import { UserSearch } from "@apna/design-system"

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
  onBuyNow: (bundle: DbBundle) => void
  selectedBundleId?: DbBundleId
  onSelectBundle?: (bundle: DbBundle) => void
  className?: string
}

export function DatabaseCreditBundles({
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
          <h2 className="font-heading text-base font-semibold text-checkout-hero-fg">
            Database credits
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {DB_BUNDLES.map((bundle) => {
            const isSelected = currentSelectedId === bundle.id
            return (
              <div key={bundle.id} className="relative pt-1.5">
                {bundle.recommended && (
                  <div className="absolute -top-1 left-3 z-10">
                    <span className="rounded-full bg-checkout-info px-2.5 py-0.5 text-xs font-semibold text-checkout-info-foreground shadow-xs">
                      Recommended
                    </span>
                  </div>
                )}
                <div
                  onClick={() => handleSelect(bundle)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  className={cn(
                    "ink press-subtle relative flex cursor-pointer items-center justify-between rounded-xl bg-card p-3.5 shadow-xs transition-interactive",
                    isSelected
                      ? "border-2 border-checkout-primary ring-1 ring-checkout-primary/20"
                      : "border border-border hover:border-border/80"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {bundle.credits} Database credits
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ClockFading className="size-3.5 shrink-0" aria-hidden />
                      Valid for {bundle.validDays} days
                    </span>
                    <div className="pt-0.5">
                      <Badge variant="discount" size="sm">
                        {bundle.discountPct}% OFF
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{bundle.mrp.toLocaleString("en-IN")}
                        </span>
                        <span className="text-base font-bold text-foreground">
                          ₹{bundle.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-xs italic text-muted-foreground">
                        ₹{bundle.pricePerCredit} /credit
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isSelected
                          ? "border-checkout-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {isSelected && <div className="size-2.5 rounded-full bg-checkout-primary" />}
                    </div>
                  </div>
                </div>
              </div>
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
          {DB_BUNDLES.map((bundle) => (
            <PricingCard
              key={bundle.id}
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
              price={`₹${bundle.price.toLocaleString("en-IN")}`}
              mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
              badge={<Badge variant="discount">{bundle.discountPct}% OFF</Badge>}
              priceSuffix={`₹${bundle.pricePerCredit} /credit`}
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
          ))}
        </div>
      </div>
    </div>
  )
}

export { DB_BUNDLES }

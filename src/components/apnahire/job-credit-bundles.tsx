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
  onBuyNow: (bundle: Bundle) => void
  onBuySingleCredit: () => void
  selectedBundleId?: BundleId
  onSelectBundle?: (bundle: Bundle) => void
  className?: string
}

export function JobCreditBundles({
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
          <button
            type="button"
            onClick={onBuySingleCredit}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-checkout-info hover:opacity-80"
          >
            Buy 1 job credit
            <ArrowRight className="size-3.5" aria-hidden />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {BUNDLES.map((bundle) => {
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
                      {bundle.credits} Job credits
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ClockFading className="size-3.5 shrink-0" aria-hidden />
                      Valid for {bundle.validDays} days
                    </span>
                    <div>
                      <Badge variant="discount" size="sm">
                        {bundle.discountPct}% OFF
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end text-right">
                      <div className="flex items-center gap-1.5 justify-end">
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
          <button
            type="button"
            onClick={onBuySingleCredit}
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-checkout-info hover:opacity-80"
          >
            I need a single job credit
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {BUNDLES.map((bundle) => (
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
            price={`₹${bundle.price.toLocaleString("en-IN")}`}
            mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
            badge={<Badge variant="discount">{bundle.discountPct}% OFF</Badge>}
            priceSuffix={`₹${bundle.pricePerCredit} /credit`}
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
        ))}
        </div>
      </div>
    </div>
  )
}

/* Export helpers so page.tsx can look up bundle data */
export { BUNDLES }

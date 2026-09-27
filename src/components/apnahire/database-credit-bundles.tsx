"use client"

/**
 * DatabaseCreditBundles — Database tab pricing cards.
 *
 * Section heading + three database-credit bundle cards, each with its own
 * "Buy now" CTA (Figma 899:1253).
 *
 * Not a clone of JobCreditBundles. Three things differ from the Jobs tab
 * (1971:8641):
 *   - No grey track. 899:1253 has no fill, padding or radius — the heading
 *     and cards sit straight on the page gradient, 20px apart.
 *   - Title-led hierarchy. The credit count is 20px over a 16px price
 *     (`emphasis="title"`); Jobs is the other way round.
 *   - The card draws its own 1px gray/200 border; the Jobs card draws none.
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

export type DbBundleId = "170" | "380" | "900"

interface DbBundle {
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

interface DatabaseCreditBundlesProps {
  onBuyNow: (bundle: DbBundle) => void
  className?: string
}

export function DatabaseCreditBundles({
  onBuyNow,
  className,
}: DatabaseCreditBundlesProps) {
  return (
    <div
      data-slot="database-credit-bundles"
      className={cn("flex flex-col gap-5", className)}
    >
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
            emphasis="title"
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
  )
}

export { DB_BUNDLES }

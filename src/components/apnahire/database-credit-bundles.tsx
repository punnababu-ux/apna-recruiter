"use client"

/**
 * DatabaseCreditBundles — Database tab pricing cards.
 *
 * Same shape as JobCreditBundles (three credit-bundle cards, each with its
 * own "Buy now" CTA) — Figma's Database tab reuses the identical card
 * pattern with database-credit figures instead of job-credit ones.
 */

import * as React from "react"
import { CalendarDays } from "@apna/design-system"
import { Badge, Button, PricingCard } from "@apna/design-system"
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

/* Figures match the Figma Database tab exactly. */
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
      className={cn("flex flex-col gap-4 rounded-2xl bg-checkout-track p-4", className)}
    >
      <div className="px-1">
        <h2 className="text-lg font-semibold text-checkout-hero-fg">Database credits</h2>
        <p className="mt-0.5 text-sm text-checkout-hero-fg-muted">
          22+ filters across roles, city, experience, salary and shifts, and then unlock
          the profiles you want to talk to.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DB_BUNDLES.map((bundle) => (
          <PricingCard
            key={bundle.id}
            onClick={() => onBuyNow(bundle)}
            ribbon={
              bundle.recommended && (
                <Badge className="rounded-none rounded-bl-xl border-transparent bg-info px-4 py-0.5 text-2xs font-semibold text-info-foreground">
                  Recommended
                </Badge>
              )
            }
            title={`${bundle.credits} Database credits`}
            subtitle={bundle.subcopy}
            meta={
              <>
                <CalendarDays className="size-4 shrink-0" aria-hidden />
                Valid for {bundle.validDays} days
              </>
            }
            price={`₹${bundle.price.toLocaleString("en-IN")}`}
            mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
            badge={
              <Badge className="border-transparent bg-checkout-discount-bg text-2xs text-checkout-discount-fg">
                {bundle.discountPct}% OFF
              </Badge>
            }
            priceSuffix={`₹${bundle.pricePerCredit} /credit`}
            cta={
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full font-semibold",
                  bundle.recommended &&
                    "border-transparent bg-checkout-primary text-checkout-primary-foreground hover:bg-checkout-primary-hover hover:text-checkout-primary-foreground"
                )}
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

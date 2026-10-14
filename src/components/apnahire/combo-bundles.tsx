"use client"

/**
 * ComboBundles — Bundles combining Job credits and Database credits
 * as defined in the self-checkout mobile information architecture.
 */

import * as React from "react"
import { Badge, Button, ClockFading, Layers, PricingCard, Sparkles } from "@apna/design-system"
import { cn } from "@/lib/utils"

export type ComboBundleId = "combo-1" | "combo-2" | "combo-3"

export interface ComboBundle {
  id: ComboBundleId
  jobCredits: number
  dbCredits: number
  title: string
  validDays: number
  price: number
  mrp: number
  discountPct: number
  recommended?: boolean
}

export const COMBO_BUNDLES: ComboBundle[] = [
  {
    id: "combo-1",
    jobCredits: 2,
    dbCredits: 50,
    title: "2 Job credits + 50 Database credits",
    validDays: 30,
    price: 1949,
    mrp: 3170,
    discountPct: 38,
  },
  {
    id: "combo-2",
    jobCredits: 3,
    dbCredits: 200,
    title: "3 Job credits + 200 Database credits",
    validDays: 90,
    price: 3649,
    mrp: 6840,
    discountPct: 46,
    recommended: true,
  },
  {
    id: "combo-3",
    jobCredits: 6,
    dbCredits: 500,
    title: "6 Job credits + 500 Database credits",
    validDays: 180,
    price: 7099,
    mrp: 15750,
    discountPct: 54,
  },
]

export interface ComboBundlesProps {
  onBuyNow: (bundle: ComboBundle) => void
  selectedBundleId?: ComboBundleId
  onSelectBundle?: (bundle: ComboBundle) => void
  className?: string
}

export function ComboBundles({
  onBuyNow,
  selectedBundleId,
  onSelectBundle,
  className,
}: ComboBundlesProps) {
  const [internalSelectedId, setInternalSelectedId] = React.useState<ComboBundleId>("combo-2")
  const currentSelectedId = selectedBundleId ?? internalSelectedId

  const handleSelect = (bundle: ComboBundle) => {
    setInternalSelectedId(bundle.id)
    onSelectBundle?.(bundle)
  }

  return (
    <div
      data-slot="combo-bundles"
      className={cn("flex flex-col gap-3 sm:gap-5", className)}
    >
      {/* ── Mobile-first selectable radio cards (< sm) ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-checkout-hero-fg" aria-hidden />
          <h2 className="font-heading text-base font-semibold text-checkout-hero-fg">
            Bundles
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {COMBO_BUNDLES.map((bundle) => {
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
                    "flex cursor-pointer items-center justify-between rounded-xl bg-card p-3.5 shadow-xs transition-all",
                    isSelected
                      ? "border-2 border-checkout-primary ring-1 ring-checkout-primary/20"
                      : "border border-border hover:border-border/80"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {bundle.title}
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
                        Save ₹{(bundle.mrp - bundle.price).toLocaleString("en-IN")}
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

      {/* ── Desktop view (sm and up) ── */}
      <div className="hidden sm:flex sm:flex-col sm:gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold leading-tight text-checkout-hero-fg">
            Bundles
          </h2>
          <p className="text-sm text-checkout-hero-fg-secondary">
            Save more by combining Job posting and Database candidate unlocks.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {COMBO_BUNDLES.map((bundle) => (
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
              title={bundle.title}
              meta={
                <>
                  <ClockFading aria-hidden />
                  Valid for {bundle.validDays} days
                </>
              }
              price={`₹${bundle.price.toLocaleString("en-IN")}`}
              mrp={`₹${bundle.mrp.toLocaleString("en-IN")}`}
              badge={<Badge variant="discount">{bundle.discountPct}% OFF</Badge>}
              priceSuffix={`Save ₹${(bundle.mrp - bundle.price).toLocaleString("en-IN")}`}
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

"use client"

/**
 * JobCreditBundles — Left panel of the Jobs pricing tab.
 *
 * Three credit-bundle cards (3 / 6 / 13) + database add-on strip.
 * Selected card gets a green border + "Selected" CTA; default (6) shows the
 * "Recommended for you" floating pill.
 */

import * as React from "react"
import { CalendarDays, Check, ChevronDown } from "lucide-react"
import { Badge, Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────── types ───────────────────────── */

export type BundleId = "3" | "6" | "13"
export type AddonId = "none" | "50" | "100" | "200"

interface Bundle {
  id: BundleId
  credits: number
  validDays: number
  price: number
  mrp: number
  discountPct: number
  pricePerCredit: number
  recommended?: boolean
}

interface AddonOption {
  id: AddonId
  label: string
  price: number
}

/* ─────────────────────────────────────── data ────────────────────────── */

const BUNDLES: Bundle[] = [
  {
    id: "3",
    credits: 3,
    validDays: 30,
    price: 1900,
    mrp: 2097,
    discountPct: 9,
    pricePerCredit: 633,
  },
  {
    id: "6",
    credits: 6,
    validDays: 90,
    price: 3649,
    mrp: 5700,
    discountPct: 36,
    pricePerCredit: 608,
    recommended: true,
  },
  {
    id: "13",
    credits: 13,
    validDays: 180,
    price: 7100,
    mrp: 9087,
    discountPct: 22,
    pricePerCredit: 546,
  },
]

const ADDONS: AddonOption[] = [
  { id: "none", label: "No add-on", price: 0 },
  { id: "50", label: "50 credits @ ₹500", price: 500 },
  { id: "100", label: "100 credits @ ₹1000", price: 1000 },
  { id: "200", label: "200 credits @ ₹2000", price: 2000 },
]

/* ─────────────────────────────────────── component ──────────────────── */

interface JobCreditBundlesProps {
  selectedBundle: BundleId
  selectedAddon: AddonId
  onSelectBundle: (id: BundleId) => void
  onSelectAddon: (id: AddonId) => void
  className?: string
}

export function JobCreditBundles({
  selectedBundle,
  selectedAddon,
  onSelectBundle,
  onSelectAddon,
  className,
}: JobCreditBundlesProps) {
  const [moreOpen, setMoreOpen] = React.useState(false)

  return (
    <div data-slot="job-credit-bundles" className={cn("flex flex-col gap-4", className)}>
      {/* Section header */}
      <div className="flex items-start justify-between px-1">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Job credits</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Choose a bundle. Select the job type later; jobs stay active for 15
            days.
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 text-xs font-medium text-info underline underline-offset-2 hover:opacity-80"
        >
          Buy a single job credit
        </button>
      </div>

      {/* Credit bundle cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {BUNDLES.map((bundle) => {
          const isSelected = selectedBundle === bundle.id
          return (
            <div key={bundle.id} className="relative pt-4">
              {/* Recommended pill */}
              {bundle.recommended && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full bg-info px-3 py-0.5 text-2xs font-semibold text-info-foreground whitespace-nowrap">
                    ✦ Recommended for you
                  </span>
                </div>
              )}

              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-xl border bg-card p-4 pt-6 transition-all duration-150",
                  isSelected
                    ? "border-2 border-success shadow-sm"
                    : "border-border hover:border-border/80 hover:shadow-xs"
                )}
              >
                {/* Top: title + validity */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-lg font-semibold text-foreground">
                    {bundle.credits} Job credits
                  </p>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 shrink-0" aria-hidden />
                    Valid for{" "}
                    <strong className="font-semibold text-foreground">
                      {bundle.validDays} days
                    </strong>
                  </span>
                </div>

                <hr className="border-border" />

                {/* Price block */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        ₹{bundle.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{bundle.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-2xs">
                      {bundle.discountPct}% OFF
                    </Badge>
                  </div>
                  <p className="text-xs italic text-success">
                    ₹{bundle.pricePerCredit} /credit
                  </p>
                </div>

                {/* CTA */}
                <Button
                  type="button"
                  variant={isSelected ? "success" : "outline"}
                  onClick={() => onSelectBundle(bundle.id)}
                  className="mt-auto w-full font-semibold"
                  leadingIcon={isSelected ? <Check className="size-3.5" aria-hidden /> : undefined}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer: job-type legend + More plans */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
        <span>
          * 1 job credit = 1 classic job • 2 credits = 1 premium job • 4 credits
          = 1 super premium job{" "}
          <button
            type="button"
            className="font-semibold text-foreground underline underline-offset-2"
          >
            See details
          </button>
        </span>
        <button
          type="button"
          onClick={() => setMoreOpen((o) => !o)}
          className="flex items-center gap-1 font-semibold text-info"
        >
          More plans
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              moreOpen && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      </div>

      {/* Database add-on strip */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">
            {selectedAddon !== "none"
              ? `Added ${selectedAddon} database credits for ₹${
                  ADDONS.find((a) => a.id === selectedAddon)!.price
                }`
              : "Add database credits"}
          </p>
          <p className="text-xs text-muted-foreground">
            1 credit unlocks a candidate profile. Contact them before they
            apply.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ADDONS.map((addon) => {
            const isActive = selectedAddon === addon.id
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => onSelectAddon(addon.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "border-2 border-success bg-success/10 font-semibold text-success"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {isActive && <Check className="size-3.5" aria-hidden />}
                {addon.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* Export helpers so page.tsx can look up prices */
export { BUNDLES, ADDONS }

"use client"

/**
 * OfferChoice — the two option tiles under every upsell header
 * (Figma "Choices panel", 2472:21320).
 *
 *   stay     what the recruiter picked: quiet tile, outline CTA
 *            ("Continue with 1 job", "Continue with monthly plan")
 *   upgrade  the offer: brand-tinted tile with a corner ribbon
 *            ("27% OFF", "8 MONTHS FREE") and the primary CTA
 *
 * The upgrade tile is wider from sm, as on the board. On phones both tiles
 * get equal width, as in the Mweb frames. CTAs are pinned to the tile
 * bottoms so the two line up, and labels may wrap on narrow sheets.
 */

import * as React from "react"
import { BadgePercent, Button, ClockFading } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"
import { cn } from "@/lib/utils"

export interface OfferOption {
  title: string
  price: number
  /** Struck-through reference price. */
  mrp?: number
  /** "/month", "/year" … shown after the price. */
  unit?: string
  /** One italic line: "That's just ₹1,099 /job", "Billed monthly". */
  note?: React.ReactNode
  validDays?: number
  /** Corner ribbon, e.g. "27% OFF". */
  badge?: string
  /** Show the "10% extra off applied" line. */
  extraOff?: boolean
  ctaLabel: string
  onSelect: () => void
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

function OptionTile({ option, kind }: { option: OfferOption; kind: "stay" | "upgrade" }) {
  const upgrade = kind === "upgrade"
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-xl border p-3.5 sm:p-4",
        upgrade ? "border-checkout-primary bg-accent sm:col-span-3" : "border-border bg-card sm:col-span-2"
      )}
    >
      {option.badge && (
        <span
          className={cn(
            "absolute top-0 right-0 rounded-bl-xl px-2.5 py-0.5 text-xs font-bold",
            upgrade
              ? "bg-checkout-primary text-checkout-primary-foreground"
              : "bg-muted text-success"
          )}
        >
          {option.badge}
        </span>
      )}

      <div className="flex flex-col gap-2">
        {/* Clear the corner ribbon only when there is one — otherwise the
            reserved space wraps short titles ("1 Super premium job"). */}
        <p className={cn("text-sm font-semibold text-foreground", option.badge && "pr-12")}>{option.title}</p>
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-xl font-semibold text-foreground sm:text-2xl">{inr(option.price)}</span>
          {option.unit && <span className="text-sm text-muted-foreground">{option.unit}</span>}
          {option.mrp != null && option.mrp > option.price && (
            <span className="text-sm text-muted-foreground line-through">{inr(option.mrp)}</span>
          )}
        </p>
        {option.note && (
          <p className={cn("text-xs italic", upgrade ? "text-checkout-primary" : "text-muted-foreground")}>
            {option.note}
          </p>
        )}
      </div>

      {(option.validDays != null || option.extraOff) && (
        <div className="flex flex-col gap-1.5 text-xs">
          {option.validDays != null && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ClockFading className="size-4 shrink-0" aria-hidden />
              Valid for {option.validDays} days
            </span>
          )}
          {option.extraOff && (
            <span className="flex items-center gap-1.5 text-success">
              <BadgePercent className="size-4 shrink-0" aria-hidden />
              {EXTRA_OFF.applied}
            </span>
          )}
        </div>
      )}

      <Button
        type="button"
        variant={upgrade ? "checkout" : "outline"}
        className="mt-auto h-auto min-h-10 w-full py-2 whitespace-normal"
        onClick={option.onSelect}
      >
        {option.ctaLabel}
      </Button>
    </div>
  )
}

export function OfferChoice({ stay, upgrade }: { stay: OfferOption; upgrade: OfferOption }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <OptionTile option={stay} kind="stay" />
      <OptionTile option={upgrade} kind="upgrade" />
    </div>
  )
}

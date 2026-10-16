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
 * Side by side at every size (the upgrade tile wider from sm, 4:5), CTAs
 * pinned to the tile bottoms so they line up. On phones a tile
 * is ~160px wide, so CTAs switch to `ctaShortLabel` ("Continue",
 * "Get 3 jobs") to stay on one line. The price is already right above.
 */

import * as React from "react"
import { Badge, BadgePercent, Button, ClockFading } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"
import { cn } from "@/lib/utils"
import { inr } from "@/lib/format"

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
  /** Phone label (< sm), where the tile is too narrow for `ctaLabel`. */
  ctaShortLabel?: string
  onSelect: () => void
}


function OptionTile({
  option,
  kind,
  reserveRibbon,
}: {
  option: OfferOption
  kind: "stay" | "upgrade"
  /** Either tile in the pair has a corner ribbon: keep the band on both. */
  reserveRibbon: boolean
}) {
  const upgrade = kind === "upgrade"
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-xl border p-3.5 sm:p-4",
        // The corner ribbon gets its own band, so the title starts below it
        // rather than squeezing in beside it. The band is reserved on BOTH
        // tiles when either has a ribbon, so titles and prices line up
        // across the pair (the monthly plan has none; annual does).
        reserveRibbon && "pt-8 sm:pt-9",
        upgrade ? "border-checkout-primary bg-accent sm:col-span-5" : "border-border bg-card sm:col-span-4"
      )}
    >
      {option.badge && (
        <Badge variant={upgrade ? "default" : "discount"} size="ribbon" className="absolute top-0 right-0">
          {option.badge}
        </Badge>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-foreground">{option.title}</p>
        {/* One line from sm (price, unit, struck price) so the two tiles
            compare like for like; phone sheets may wrap. */}
        <p className="flex flex-wrap items-baseline gap-x-1.5 sm:flex-nowrap sm:whitespace-nowrap">
          <span className="text-xl font-semibold text-foreground sm:text-2xl">{inr(option.price)}</span>
          {/* Unit and struck price never split. On phones they ALWAYS take
              the second line under the price, in every tile — left to text
              width, "/year" fitted beside its price and "/month" didn't, so
              the two tiles looked different. One line from sm. */}
          {(option.unit || (option.mrp != null && option.mrp > option.price)) && (
            <span className="inline-flex w-full items-baseline gap-1.5 whitespace-nowrap sm:w-auto">
              {option.unit && <span className="text-sm text-muted-foreground">{option.unit}</span>}
              {option.mrp != null && option.mrp > option.price && (
                <span className="text-sm text-muted-foreground line-through">{inr(option.mrp)}</span>
              )}
            </span>
          )}
        </p>
        {option.note && (
          <p className={cn("text-xs italic", upgrade ? "text-checkout-primary" : "text-muted-foreground")}>
            {option.note}
          </p>
        )}
      </div>

      {/* Details + CTA are one bottom-pinned group, so the CTAs line up
          across both tiles and so does the last detail line ("10% extra
          off applied"), whether or not a tile also has a validity line. */}
      <div className="mt-auto flex flex-col gap-4">
        {(option.validDays != null || option.extraOff) && (
          <div className="flex flex-col gap-2.5 text-xs">
            {option.validDays != null && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ClockFading className="size-4 shrink-0" aria-hidden />
                Valid for {option.validDays}{"\u00A0"}days
              </span>
            )}
            {option.extraOff && (
              <span className="flex items-center gap-1.5 text-success">
                <BadgePercent className="size-4 shrink-0 animate-wiggle" aria-hidden />
                <span className="animate-text-shimmer whitespace-nowrap sm:hidden">{EXTRA_OFF.appliedShort}</span>
                <span className="animate-text-shimmer hidden sm:inline">{EXTRA_OFF.applied}</span>
              </span>
            )}
          </div>
        )}

        <Button
          type="button"
          variant={upgrade ? "checkout" : "outline"}
          className="h-auto min-h-10 w-full py-2 whitespace-normal"
          onClick={option.onSelect}
        >
          {option.ctaShortLabel ? (
            <>
              <span className="sm:hidden">{option.ctaShortLabel}</span>
              <span className="hidden sm:inline">{option.ctaLabel}</span>
            </>
          ) : (
            option.ctaLabel
          )}
        </Button>
      </div>
    </div>
  )
}

export function OfferChoice({ stay, upgrade }: { stay: OfferOption; upgrade: OfferOption }) {
  const reserveRibbon = Boolean(stay.badge || upgrade.badge)
  return (
    // 4:5 from sm: the offer tile stays wider, but the stay tile is wide
    // enough to keep "₹2,249 /month ₹2,499" on one line, so the two price
    // rows read side by side.
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-9">
      <OptionTile option={stay} kind="stay" reserveRibbon={reserveRibbon} />
      <OptionTile option={upgrade} kind="upgrade" reserveRibbon={reserveRibbon} />
    </div>
  )
}

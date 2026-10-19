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
 * pinned to the tile bottoms so they line up. A CTA never wraps: from sm
 * it reads in full ("Continue with 13 credits", "Get 22 credits for
 * ₹9,999"); on phones, where a tile is ~160px wide, it shortens to
 * `ctaShortLabel` ("Continue", "Get 22 credits") — the price is right above.
 */

import * as React from "react"
import { Badge, BadgePercent, Button, ClockFading, Database } from "@apna/design-system"
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
  /** A time limit right under the price, plain with the clock icon
   *  ("Valid for 30 days", "1 active job slot for 30 days"). */
  term?: string
  /** A subscription's terms, above the CTA: the database credits it brings
   *  (with their value) and its one city. */
  planFacts?: { dbCredits: number; dbWorth: number; singleCity?: boolean; slotDays?: number }
  /** Corner ribbon, e.g. "27% OFF". */
  badge?: string
  /** Show the "10% extra off applied" line. */
  extraOff?: boolean
  /** The label from sm (desktop): in full, one line. */
  ctaLabel: string
  /** Phone label (< sm), where the tile is too narrow for `ctaLabel`. */
  ctaShortLabel?: string
  onSelect: () => void
}


/* One-to-one comparison, the rule: both tiles share one row grid (CSS
 * subgrid), so each kind of line — the price group (with its note), the
 * validity, the database credits, the city, the CTA — sits on the SAME line in
 * both tiles and the eye reads straight across, whatever either tile holds.
 * A row only exists when one of the tiles uses it; a tile without it keeps
 * the row empty so its partner's line stays level. */
type RowKey = "title" | "price" | "term" | "facts" | "city" | "cta"
const ROW_ORDER: RowKey[] = ["title", "price", "term", "facts", "city", "cta"]
const ROW_SPAN: Record<number, string> = {
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  7: "row-span-7",
}

const isPct = (badge?: string) => !!badge && /%\s*OFF$/i.test(badge)
const pctOf = (o: OfferOption) =>
  o.mrp != null && o.mrp > o.price ? `${Math.round((1 - o.price / o.mrp) * 100)}% OFF` : isPct(o.badge) ? o.badge : undefined
const termOf = (o: OfferOption) => o.term ?? (o.validDays != null ? `Valid for ${o.validDays}\u00A0days` : undefined)

function rowUsed(o: OfferOption, key: RowKey) {
  switch (key) {
    case "term":
      return !!termOf(o)
    case "facts":
      return !!o.planFacts
    case "city":
      return !!o.planFacts?.singleCity
    default:
      return true
  }
}

function OptionTile({
  option,
  kind,
  rows,
  reserveRibbon,
}: {
  option: OfferOption
  kind: "stay" | "upgrade"
  rows: RowKey[]
  /** Either tile in the pair has a corner ribbon: keep the band on both. */
  reserveRibbon: boolean
}) {
  const upgrade = kind === "upgrade"
  const pct = pctOf(option)
  const strike = option.mrp != null && option.mrp > option.price ? option.mrp : undefined
  const ribbon = option.badge && !isPct(option.badge) ? option.badge : undefined
  const term = termOf(option)

  const cell: Record<RowKey, React.ReactNode> = {
    title: <p className="text-sm font-semibold text-foreground">{option.title}</p>,
    // The price group: amount + unit, struck price, % tag, the 10% extra
    // off, then the price note ("That's just ₹750 /month"), together — closed
    // by a rule that splits what it costs from what you get. The rows are
    // shared, so the rule sits level in both tiles.
    price: (
      <div className="flex h-full flex-col gap-1.5 border-b border-border pb-2.5">
        {/* Phones: the struck price + % tag take the second line in every
            tile. From sm: one line, always. */}
        <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:flex-nowrap">
          {/* The price and its unit never split ("₹2,499 /month"). */}
          <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
            <span className="text-xl font-semibold text-foreground sm:text-2xl">{inr(option.price)}</span>
            {option.unit && <span className="text-sm text-muted-foreground">{option.unit}</span>}
          </span>
          {(strike || pct) && (
            <span className="inline-flex w-full items-center gap-1.5 whitespace-nowrap sm:w-auto">
              {strike && <span className="text-sm text-muted-foreground line-through">{inr(strike)}</span>}
              {pct && (
                <Badge variant="discount" size="sm">
                  {pct}
                </Badge>
              )}
            </span>
          )}
        </p>
        {option.extraOff && (
          <span className="flex items-center gap-1.5 text-xs text-success">
            <BadgePercent className="size-4 shrink-0 animate-wiggle" aria-hidden />
            <span className="animate-text-shimmer whitespace-nowrap sm:hidden">{EXTRA_OFF.appliedShort}</span>
            <span className="animate-text-shimmer hidden sm:inline">{EXTRA_OFF.applied}</span>
          </span>
        )}
        {option.note && (
          <p className={cn("text-xs italic", upgrade ? "text-checkout-primary" : "text-muted-foreground")}>
            {option.note}
          </p>
        )}
      </div>
    ),
    term: term ? (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ClockFading className="size-4 shrink-0" aria-hidden />
        <span>{term}</span>
      </span>
    ) : null,
    facts: option.planFacts ? (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Database className="size-4 shrink-0" aria-hidden />
        <span>
          {option.planFacts.dbCredits.toLocaleString("en-IN")} database credits worth{"\u00A0"}₹
          {option.planFacts.dbWorth.toLocaleString("en-IN")}
        </span>
      </span>
    ) : null,
    // A caveat, not a feature: no icon, italic.
    city: option.planFacts?.singleCity ? (
      <span className="text-xs text-muted-foreground italic">Valid in a single city</span>
    ) : null,
    cta: (
      <Button
        type="button"
        variant={upgrade ? "checkout" : "outline"}
        className="mt-2 h-10 w-full self-end whitespace-nowrap"
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
    ),
  }

  return (
    <div
      className={cn(
        "relative grid min-w-0 grid-rows-subgrid gap-y-2.5 overflow-hidden rounded-xl border p-3.5 sm:p-4",
        ROW_SPAN[rows.length],
        // The ribbon's band is reserved on BOTH tiles when either has one,
        // so the rows start level.
        reserveRibbon && "pt-8 sm:pt-9",
        upgrade ? "border-checkout-primary bg-accent" : "border-border bg-card"
      )}
    >
      {ribbon && (
        <Badge
          variant={upgrade ? "default" : "discount"}
          size="ribbon"
          className={cn("absolute top-0 right-0", upgrade && "bg-cta-primary text-checkout-primary-foreground")}
        >
          {ribbon}
        </Badge>
      )}
      {rows.map((key) => (
        // Every row renders in every tile — empty when this tile has nothing
        // for it — so the subgrid keeps both tiles' lines level.
        <div key={key} className={cn("min-w-0", key === "cta" && "flex items-end")}>
          {cell[key]}
        </div>
      ))}
    </div>
  )
}

export function OfferChoice({ stay, upgrade }: { stay: OfferOption; upgrade: OfferOption }) {
  const isRibbon = (o: OfferOption) => !!o.badge && !isPct(o.badge)
  const reserveRibbon = isRibbon(stay) || isRibbon(upgrade)
  const rows = ROW_ORDER.filter((key) => rowUsed(stay, key) || rowUsed(upgrade, key))
  return (
    // Equal widths: at 4:5 the stay tile was the narrower and its price line
    // ("₹2,249 /month ₹2,499 10% OFF") wrapped while the other's fit. Both
    // tiles span the same rows of this grid (subgrid), so their lines
    // compare one to one.
    <div className="grid grid-cols-2 gap-x-3">
      <OptionTile option={stay} kind="stay" rows={rows} reserveRibbon={reserveRibbon} />
      <OptionTile option={upgrade} kind="upgrade" rows={rows} reserveRibbon={reserveRibbon} />
    </div>
  )
}

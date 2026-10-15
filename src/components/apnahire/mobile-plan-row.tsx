"use client"

/**
 * Mobile plan rows: the one phone structure both checkouts use, so
 * express checkout (`job-plan-cards.tsx`) and self-checkout
 * (`job-credit-bundles.tsx`, `database-credit-bundles.tsx`,
 * `unlimited-side-card.tsx`) can't drift apart.
 *
 *   MobilePlanRow       a radio card. Header: plan name + radio. Body: what
 *                       you get on the left, what you pay on the right (struck
 *                       price + 20px price, then the discount row). `details`
 *                       show only while selected ("explain on selection"),
 *                       so the unselected rows stay scannable.
 *                       `layout="inline"` (subscription rows: a name, one
 *                       subtitle, a price with its unit) lines the two sides
 *                       up instead, like MobileUnlimitedCard but with the
 *                       radio: name · struck price + price · radio on line 1,
 *                       subtitle · `priceNote` + discount on line 2 (to the
 *                       card's edge, under the radio). Gaps are
 *                       8px, not 12, and names short ("Quarterly"), so line
 *                       1 fits 360px phones. Below ~288px inside the card
 *                       (320px phones) it falls back to the stacked layout
 *                       rather than wrapping the name.
 *   MobileDiscountRow   "Incl. 10% extra" + the % OFF badge, under the price.
 *   MobileUnlimitedCard the apna Unlimited card: dark frame, logo, then a white
 *                       card with the same name | price header, a feature
 *                       list and a note + CTA footer.
 *
 * Text growth (AGENTS.md): the price column never shrinks and its groups
 * never split; the left column wraps first.
 */

import * as React from "react"
import { Badge, LogoApnaUnlimited } from "@apna/design-system"
import { cn } from "@/lib/utils"

/* ── Radio row ──────────────────────────────────────────────────────── */

export interface MobilePlanRowProps {
  title: React.ReactNode
  selected: boolean
  onSelect: () => void
  recommended?: boolean
  /** Left column: "Active for 15 days", visibility, "Valid for 30 days".
   *  Optional: a subscription row is just its name and price. */
  meta?: React.ReactNode
  price: React.ReactNode
  /** Struck-through reference price, before the price. */
  mrp?: React.ReactNode
  /** "/month", "/quarter", after the price (as on MobileUnlimitedCard). */
  unit?: React.ReactNode
  /** Under the price: usually `MobileDiscountRow`. */
  belowPrice?: React.ReactNode
  /** Shown only while selected, under a rule. */
  details?: React.ReactNode
  /** `"inline"`: name and price share line 1, `meta` and the discount line
   *  2 (see the header). For plans with a one-line subtitle. */
  layout?: "stacked" | "inline"
  /** Beside the discount ("Incl. 10% extra"): line 2 in the inline layout,
   *  under the discount in the stacked one. */
  priceNote?: React.ReactNode
  className?: string
}

export function MobilePlanRow({
  title,
  selected,
  onSelect,
  recommended,
  meta,
  price,
  mrp,
  unit,
  belowPrice,
  details,
  layout = "stacked",
  priceNote,
  className,
}: MobilePlanRowProps) {
  const radio = (
    <div
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        selected ? "border-checkout-primary" : "border-muted-foreground/30"
      )}
    >
      {selected && <div className="size-2.5 rounded-full bg-checkout-primary" />}
    </div>
  )
  const priceBlock = (
    <div className="flex shrink-0 flex-col items-end gap-1 text-right">
      <div className="flex items-baseline justify-end gap-1.5 whitespace-nowrap">
        {mrp && <span className="text-xs text-muted-foreground line-through">{mrp}</span>}
        {/* The price leads the row (20px, over the 16px plan name);
            tabular figures keep the column steady. */}
        <span className="text-xl font-bold tabular-nums text-foreground">{price}</span>
        {/* Neutral: the price carries the line. */}
        {unit && <span className="text-xs font-regular text-foreground">{unit}</span>}
      </div>
      {belowPrice}
      {priceNote}
    </div>
  )
  return (
    <div className="relative pt-1.5">
      {recommended && (
        <div className="absolute -top-1 left-3 z-10">
          <span className="rounded-full bg-checkout-info px-2.5 py-0.5 text-xs font-semibold text-checkout-info-foreground shadow-xs">
            Recommended
          </span>
        </div>
      )}
      <div
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect()
          }
        }}
        role="radio"
        aria-checked={selected}
        tabIndex={0}
        className={cn(
          "ink press-subtle @container relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-xl bg-card p-4 shadow-xs transition-interactive",
          selected
            ? "border-2 border-checkout-primary ring-1 ring-checkout-primary/20"
            : "border border-border hover:border-border/80",
          className
        )}
      >
        {layout === "inline" && (
          // Container query, not a viewport breakpoint: the inline lines
          // need ~288px inside the card (360px phones and up).
          <div className="hidden flex-col gap-0.5 @2xs:flex">
            {/* Line 1: name · struck price + price · radio. The radio stays
                on the name's line, as in the stacked rows. */}
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 text-base font-semibold text-foreground">{title}</span>
              <span className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
                {mrp && <span className="text-xs text-muted-foreground line-through">{mrp}</span>}
                {/* leading-tight: the 20px price's own 28px line set the gap
                    under the name line, not the 2px between the lines. */}
                <span className="text-xl leading-tight font-bold tabular-nums text-foreground">{price}</span>
                {unit && <span className="text-xs font-regular text-foreground">{unit}</span>}
              </span>
              {radio}
            </div>
            {/* Line 2 runs to the card's edge (its right side lines up
                with the radio, not the price): reserving the radio's 28px
                left 264px at 360px for ~285px of "Unlimited job reposts ·
                Incl. 10% extra · 10% OFF". */}
            {(meta || priceNote || belowPrice) && (
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">{meta}</div>
                {(priceNote || belowPrice) && (
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                    {priceNote}
                    {belowPrice}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <div className={cn("flex flex-col gap-3", layout === "inline" && "@2xs:hidden")}>
          {/* Header: the plan name paired with its radio (the standard
              radio-card reading). */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-base font-semibold text-foreground">{title}</span>
            {radio}
          </div>

          {/* Body: what you get | what you pay. */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-2">{meta}</div>
            {priceBlock}
          </div>
        </div>

        {selected && details}
      </div>
    </div>
  )
}

/** The selected row's details: an icon list under a rule. Pass as
 *  `details`; it only renders while the row is selected. */
export function MobilePlanDetails({ items }: { items: Array<[React.ReactNode, React.ReactNode]> }) {
  return (
    <ul className="flex flex-col gap-2 border-t border-border pt-3 text-xs text-foreground animate-in fade-in-0">
      {items.map(([icon, text], i) => (
        <li key={i} className="flex items-start gap-2 [&_svg]:size-4 [&_svg]:shrink-0">
          {icon}
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

/** "Incl. 10% extra" (when the exit offer is claimed) + the % OFF badge.
 *  With the note, it announces the offer like ExtraOffLine: the words
 *  shimmer and the badge rocks. */
export function MobileDiscountRow({
  pct,
  note,
  announce = Boolean(note),
}: {
  pct?: number | null
  note?: React.ReactNode
  /** Rock the badge (offer is on). Defaults to on when there's a
   *  note; pass it when the note is drawn elsewhere (Subscription rows). */
  announce?: boolean
}) {
  if (!pct && !note) return null
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      {note && <span className="animate-text-shimmer text-xs font-medium text-success">{note}</span>}
      {pct ? (
        <Badge variant="discount" size="sm" className={announce ? "animate-wiggle" : undefined}>
          {pct}% OFF
        </Badge>
      ) : null}
    </div>
  )
}

/** A left-column line: small icon + text. */
export function MobileMetaLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0">
      {icon}
      {children}
    </span>
  )
}

/* ── apna Unlimited card ───────────────────────────────────────────── */

export interface MobileUnlimitedCardProps {
  /** "Monthly plan", "3-month plan": the logo above already names the product. */
  title: React.ReactNode
  subtitle?: React.ReactNode
  price: React.ReactNode
  /** Struck-through reference price. */
  mrp?: React.ReactNode
  /** "/month", beside the price. */
  unit?: React.ReactNode
  belowPrice?: React.ReactNode
  /** Feature lines: `[icon, text]` pairs. */
  features: Array<[React.ReactNode, React.ReactNode]>
  note?: React.ReactNode
  cta: React.ReactNode
  /** On the white card, e.g. the offer shimmer. */
  cardClassName?: string
  className?: string
}

export function MobileUnlimitedCard({
  title,
  subtitle,
  price,
  mrp,
  unit,
  belowPrice,
  features,
  note,
  cta,
  cardClassName,
  className,
}: MobileUnlimitedCardProps) {
  return (
    // Slim frame at the sides and bottom (2.5) so the white card gets the
    // width; the top keeps room above and below the logo. The logo sits
    // 16px in from the frame's edge.
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-gradient-checkout-unlimited px-2.5 pt-5 pb-2.5 text-surface-inverted-fg",
        className
      )}
    >
      <div className="flex h-5 items-start px-1.5">
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
      </div>

      <div
        className={cn(
          "relative flex flex-col gap-3 overflow-hidden rounded-xl bg-card p-4 text-card-foreground shadow-xs",
          cardClassName
        )}
      >
        {/* Name and price share the top line; subtitle and the discount
            row sit under them. */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-base font-semibold text-foreground">{title}</span>
            {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 text-right">
            <span className="flex items-baseline gap-1.5 whitespace-nowrap">
              {mrp && <span className="text-xs text-muted-foreground line-through">{mrp}</span>}
              <span className="text-xl font-bold tabular-nums text-foreground">{price}</span>
              {/* Neutral: the price carries the line. */}
              {unit && <span className="text-xs font-regular text-foreground">{unit}</span>}
            </span>
            {belowPrice}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          {features.map(([icon, text], i) => (
            <div key={i} className="flex items-center gap-2 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          {note && <span className="text-xs italic text-muted-foreground">{note}</span>}
          {cta}
        </div>
      </div>
    </div>
  )
}

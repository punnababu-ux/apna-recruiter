"use client"

/**
 * Mobile plan rows: the one phone structure both checkouts use, so
 * express checkout (`job-plan-cards.tsx`) and self-checkout
 * (`job-credit-bundles.tsx`, `database-credit-bundles.tsx`,
 * `unlimited-side-card.tsx`) can't drift apart.
 *
 *   MobilePlanRow       a radio card. The radio leads, left of the plan
 *                       name (in the feature icons' column); then what you
 *                       get. Right, level with the name: what you pay
 *                       (struck price + 20px price, then the discount row). `details`
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
 *                       `upcoming` ("₹749 from Jan 1", UpcomingPriceLine) is
 *                       the price column's last line; inline, a third line
 *                       under the radio side.
 *   MobileDiscountRow   "Extra 10% off" + the % OFF badge, under the price.
 *   MobileUnlimitedCard the apna Unlimited card: dark frame, logo, then a white
 *                       card with the same name | price header, a feature
 *                       list and a note + CTA footer. With `selected` it is
 *                       a radio in the plan list instead: a radio after the
 *                       price, no CTA (the sticky bar buys it), and the
 *                       features and note show only while selected, like
 *                       MobilePlanRow's `details`.
 *
 * Text growth (AGENTS.md): the price column never shrinks and its groups
 * never split; the left column wraps first.
 */

import * as React from "react"
import { Badge, BadgePercent, LogoApnaUnlimited, RadioMark } from "@apna/design-system"
import { cn } from "@/lib/utils"

/** Brings a card fully into view when it becomes selected (it may have just
 *  opened its details below the fold, under the sticky CTA bar). Not on
 *  first render: only a change of selection scrolls. The card's scroll
 *  margins (`REVEAL_MARGINS`) keep it clear of the header and the bar. */
function useRevealOnSelect(selected?: boolean) {
  const ref = React.useRef<HTMLDivElement>(null)
  const was = React.useRef(selected)
  React.useEffect(() => {
    if (selected && !was.current) {
      // A frame later, so the opened details are laid out first.
      requestAnimationFrame(() =>
        ref.current?.scrollIntoView({
          block: "nearest",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      )
    }
    was.current = selected
  }, [selected])
  return ref
}

/** Clear of the page header (top) and the sticky CTA bar (bottom). */
const REVEAL_MARGINS = "scroll-mt-20 scroll-mb-28"

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
  /** Shown only while NOT selected: a compact summary of `details`. */
  collapsed?: React.ReactNode
  /** `"inline"`: name and price share line 1, `meta` and the discount line
   *  2 (see the header). For plans with a one-line subtitle. */
  layout?: "stacked" | "inline"
  /** Beside the discount ("Extra 10% off"): line 2 in the inline layout,
   *  under the discount in the stacked one. */
  priceNote?: React.ReactNode
  /** The price's last line: `UpcomingPriceLine` (it renders nothing when
   *  off, and the slot adds no space of its own). */
  upcoming?: React.ReactNode
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
  collapsed,
  layout = "stacked",
  priceNote,
  upcoming,
  className,
}: MobilePlanRowProps) {
  const revealRef = useRevealOnSelect(selected)
  const radio = (
    <RadioMark checked={selected} className="data-checked:border-cta-primary [&>span]:bg-cta-primary" />
  )
  const priceBlock = (
    <div className="flex shrink-0 flex-col items-end gap-1 text-right">
      <div className="flex items-baseline justify-end gap-1.5 whitespace-nowrap">
        {mrp && <span className="text-plan-strike text-muted-foreground">{mrp}</span>}
        {/* The price leads the row (text-plan-price-compact, over text-plan-name);
            tabular figures keep the column steady. */}
        <span className="text-plan-price-compact tabular-nums text-foreground">{price}</span>
        {/* Muted like the struck price: only the price is dark. */}
        {unit && <span className="text-plan-unit text-muted-foreground">{unit}</span>}
      </div>
      {belowPrice}
      {priceNote}
      <Upcoming>{upcoming}</Upcoming>
    </div>
  )
  return (
    <div ref={revealRef} className={cn("relative pt-1.5", REVEAL_MARGINS)}>
      {recommended && (
        <div className="absolute -top-2 left-3 z-docked">
          <Badge variant="ribbon">Recommended</Badge>
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
          "ink press-subtle @container relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-card bg-plan-card p-4 shadow-card transition-interactive",
          selected
            // The selection green is the CTA green (green-700 on dark).
            ? "border-2 border-cta-primary ring-1 ring-cta-primary/20"
            : "border-2 border-transparent",
          className
        )}
      >
        {layout === "inline" && (
          // Container query, not a viewport breakpoint: the inline lines
          // need ~288px inside the card (360px phones and up).
          <div className="hidden flex-col gap-0.5 @2xs:flex">
            {/* Line 1: radio · name · struck price + price. The radio leads,
                as in the stacked rows. */}
            <div className="flex items-center gap-2">
              {radio}
              <span className="min-w-0 flex-1 text-plan-name text-foreground">{title}</span>
              <span className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
                {mrp && <span className="text-plan-strike text-muted-foreground">{mrp}</span>}
                {/* leading-tight: the 20px price's own 28px line set the gap
                    under the name line, not the 2px between the lines. */}
                <span className="text-plan-price-compact tabular-nums text-foreground">{price}</span>
                {unit && <span className="text-plan-unit text-muted-foreground">{unit}</span>}
              </span>
            </div>
            {/* Line 2 runs to the card's edge (its right side lines up
                with the radio, not the price): reserving the radio's 28px
                left 264px at 360px for ~285px of "Unlimited job reposts ·
                Extra 10% off · 10% OFF". */}
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
            {/* Line 3, right-aligned under the discount. */}
            <Upcoming className="[&>*]:self-end">{upcoming}</Upcoming>
          </div>
        )}
        {/* Radio | name and meta | price: the radio leads the card, in the
            column of the feature icons below (the rule on every plan card,
            AGENTS.md). The price floats right, so the name and meta flow
            beside it; a meta line too long to fit beside it drops below it
            whole, never splitting mid-phrase ("Valid for 30 days"). */}
        <div className={cn("flex items-start gap-2", layout === "inline" && "@2xs:hidden")}>
          <span className="flex h-5 shrink-0 items-center">{radio}</span>
          <div className="min-w-0 flex-1 flow-root">
            <div className="float-right ml-3">{priceBlock}</div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {/* A meta line's icon hangs in the radio's column, its words under
                the name (16px radio + 8px gap = the 24px the icons take). */}
            {meta && <div className="mt-2 flex flex-col items-start gap-2 [&>*]:whitespace-nowrap [&>*:has(>svg:first-child)]:-ml-6">{meta}</div>}
          </div>
        </div>

        {/* Tick rows show details on every row: chips to compare, no expand. */}
        {selected && details}
        {!selected && collapsed}
      </div>
    </div>
  )
}

/** Wraps the `upcoming` line without a box of its own (`contents`), so an
 *  empty line leaves no gap; it only lends the muted colour. */
function Upcoming({ className, children }: { className?: string; children: React.ReactNode }) {
  if (!children) return null
  return <span className={cn("contents text-muted-foreground", className)}>{children}</span>
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

/** "Extra 10% off" (when the exit offer is claimed) + the % OFF badge.
 *  With the note, it announces the offer like ExtraOffLine: the words
 *  shimmer and the discount icon rocks. The discount badge stays steady. */
export function MobileDiscountRow({
  pct,
  note,
}: {
  pct?: number | null
  note?: React.ReactNode
  /** @deprecated Badge stays static; kept for caller compatibility */
  announce?: boolean
}) {
  if (!pct && !note) return null
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      {note && (
        <span className="flex items-center gap-1 text-xs font-medium text-success">
          <BadgePercent className="size-3.5 shrink-0 animate-wiggle" aria-hidden />
          <span className="animate-text-shimmer">{note}</span>
        </span>
      )}
      {pct ? (
        <Badge variant="discount" size="sm">
          {pct}% OFF
        </Badge>
      ) : null}
    </div>
  )
}

/** A left-column line: small icon + text. */
export function MobileMetaLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
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
  /** Under `belowPrice`: `UpcomingPriceLine`. */
  upcoming?: React.ReactNode
  /** Feature lines: `[icon, text]` pairs. */
  features: Array<[React.ReactNode, React.ReactNode]>
  note?: React.ReactNode
  /** Omitted in radio mode (`selected` set). */
  cta?: React.ReactNode
  /** Radio mode: one choice in the phone plan list. */
  selected?: boolean
  /** Radio mode: lines under the subtitle, always shown (as MobilePlanRow's
   *  `meta`), e.g. the job slot with its validity. */
  meta?: React.ReactNode
  /** Makes the whole card tappable (the same action as the CTA). A tap on
   *  the CTA itself is left to it, so the action never fires twice; the CTA
   *  stays the keyboard / screen-reader route. */
  onSelect?: () => void
  /** On the white card, e.g. the offer shimmer. */
  cardClassName?: string
  /** Radio mode, while NOT selected: a compact summary of `features`.
   *  Without it the card stays expanded whether selected or not
   *  (self-checkout). */
  collapsed?: React.ReactNode
  className?: string
}

export function MobileUnlimitedCard({
  title,
  subtitle,
  price,
  mrp,
  unit,
  belowPrice,
  upcoming,
  features,
  note,
  cta,
  selected,
  meta,
  onSelect,
  cardClassName,
  collapsed,
  className,
}: MobileUnlimitedCardProps) {
  const radioMode = selected !== undefined
  const revealRef = useRevealOnSelect(selected)
  const expanded = !radioMode || selected || !collapsed
  const priceBlock = (
    <div className="flex shrink-0 flex-col items-end gap-1 text-right">
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        {mrp && <span className="text-plan-strike text-muted-foreground">{mrp}</span>}
        <span className="text-plan-price-compact tabular-nums text-foreground">{price}</span>
        {/* Muted like the struck price: only the price is dark. */}
        {unit && <span className="text-plan-unit text-muted-foreground">{unit}</span>}
      </span>
      {belowPrice}
      <Upcoming>{upcoming}</Upcoming>
    </div>
  )
  return (
    // Slim frame at the sides and bottom (1.5) so the white card gets the
    // width; the top keeps room above and below the logo. The logo sits
    // 16px in from the frame's edge.
    <div
      ref={revealRef}
      onClick={
        onSelect
          ? (e) => {
              if (!(e.target as HTMLElement).closest("button")) onSelect()
            }
          : undefined
      }
      {...(radioMode && {
        role: "radio",
        "aria-checked": selected,
        tabIndex: onSelect ? 0 : -1,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (onSelect && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onSelect()
          }
        },
      })}
      className={cn(
        "flex flex-col gap-3 rounded-card bg-gradient-checkout-unlimited px-1.5 pt-5 pb-1.5 text-surface-inverted-fg",
        REVEAL_MARGINS,
        onSelect && "cursor-pointer",
        className
      )}
    >
      <div className="flex h-5 items-start justify-between px-2.5">
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
      </div>

      <div
        className={cn(
          "relative flex flex-col gap-3 overflow-hidden rounded-card-nested bg-plan-card p-4 text-card-foreground shadow-card",
          // The tap answers on the white card, not the dark frame.
          onSelect && "ink press-subtle transition-interactive",
          // Selected as in MobilePlanRow: the CTA green edge.
          radioMode && (selected ? "border-2 border-cta-primary ring-1 ring-cta-primary/20" : "border-2 border-transparent"),
          cardClassName
        )}
      >
        {radioMode ? (
          // The price floats right, so the name and the
          // lines under it flow beside it, with no space held under a
          // one-line name; a line too long to fit drops below the price.
          <div className="flex items-start gap-2">
            {/* The radio leads, as in MobilePlanRow. */}
            <span className="flex h-5 shrink-0 items-center">
              <RadioMark checked={selected} className="data-checked:border-cta-primary [&>span]:bg-cta-primary" />
            </span>
            <div className="min-w-0 flex-1 flow-root">
            <div className="float-right ml-3">{priceBlock}</div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {subtitle && <span className="mt-2 block text-xs text-muted-foreground [&>*:has(>svg:first-child)]:-ml-6">{subtitle}</span>}
            {/* Wraps beside the price instead of dropping below it: with the
                10% offer the price side is tall, and a line that dropped
                whole left a big gap under the name. */}
            {meta && <div className="mt-2 has-[>*>svg:first-child]:-ml-6">{meta}</div>}
            </div>
          </div>
        ) : (
          // Name and price share the top line; subtitle and the discount
          // row sit under them.
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-plan-name text-foreground">{title}</span>
              {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
            </div>
            {priceBlock}
          </div>
        )}

        {expanded && (
        <div className="flex flex-col gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          {features.map(([icon, text], i) => (
            <div key={i} className="flex items-center gap-2 [&_svg]:size-3.5 [&_svg]:shrink-0">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
        )}

        {!expanded && collapsed}

        {expanded && (note || cta) && (
          <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
            {note && <span className="text-xs italic text-muted-foreground">{note}</span>}
            {cta}
          </div>
        )}
      </div>
    </div>
  )
}

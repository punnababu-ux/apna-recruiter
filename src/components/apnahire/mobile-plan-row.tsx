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
import { Badge, BadgePercent, BriefcaseBusiness, Check, InfinityIcon, LogoApnaUnlimited, RadioMark, Sparkles, UserSearch, WhatsApp, X } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { slotLabel } from "@/content/subscriptions"
import { useCheckoutVersion, versionAtLeast } from "@/hooks/use-checkout-version"
import { usePlanCardLayout, usePlanCardSelection } from "@/hooks/use-plan-card-style"

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
  /** Sits inside another surface (V11's job panel): the nested card corner,
   *  the same as the Unlimited frame's inner card. */
  nested?: boolean
  /** Information only (the "How job credits work" sheet): no tap, no
   *  press or ink, not a radio. */
  readOnly?: boolean
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
  /** The always-on feature line (MobileFeatureLine). With the "line"
   *  layout it replaces `details` and `collapsed`. */
  line?: React.ReactNode
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
  selected: selectedProp,
  onSelect,
  recommended,
  nested,
  readOnly,
  meta,
  price,
  mrp,
  unit,
  belowPrice,
  details,
  collapsed,
  line,
  layout = "stacked",
  priceNote,
  upcoming,
  className,
}: MobilePlanRowProps) {
  // V6: no selected state; a tap buys (the page's onSelect opens the order
  // summary), so nothing stays picked.
  const tapToBuy = versionAtLeast(useCheckoutVersion(), "v6")
  const selected = selectedProp && !tapToBuy
  const revealRef = useRevealOnSelect(selected)
  const sel = usePlanCardSelection()
  // "line" layout: the line or nothing (a plan with no features has no
  // line, and no rule), never the expand-on-select details.
  const showLine = usePlanCardLayout() === "line"
  const radio = (
    <RadioMark checked={selected} className="data-checked:border-cta-primary [&>span]:bg-cta-primary" />
  )
  const priceBlock = (
    // 8px between the price and the % OFF badge under it (user call,
    // 2026-10-30; was 4px).
    <div className="flex shrink-0 flex-col items-end gap-2 text-right">
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
    // No space of its own above: both corner tabs sit inside the card, so
    // every card is the list's 16px from the next (user call, 2026-10-30).
    <div ref={revealRef} className={cn("relative", REVEAL_MARGINS)}>
      {/* Recommended: a corner tab in the card's top-left, the tick's twin
          (user call, 2026-10-30). Drawn by the wrapper, over the card's
          border, with its outer corner rounded like the card's. */}
      {recommended && (
        <Badge
          variant="ribbon"
          size="ribbon"
          className={cn(
            "absolute top-0 left-0 z-docked h-5 rounded-none px-5",
            nested ? "rounded-tl-card-nested rounded-br-card-nested" : "rounded-tl-card rounded-br-card"
          )}
        >
          Recommended
          {/* The desktop ribbon's sparkle, so both read as one label. */}
          <Sparkles aria-hidden />
        </Badge>
      )}
      {selected && sel === "check" && <CornerTick />}
      <div
        {...(readOnly
          ? {}
          : {
              onClick: onSelect,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onSelect()
                }
              },
              role: "radio",
              "aria-checked": selected,
              tabIndex: 0,
            })}
        className={cn(
          "@container relative flex flex-col gap-3 overflow-hidden bg-plan-card px-4 pt-5.5 pb-4 shadow-card",
          !readOnly && "ink press-subtle cursor-pointer transition-interactive",
          nested ? "rounded-card-nested" : "rounded-card",
          // V6 has no tick tab: only a Recommended card needs the room.
          tapToBuy && !recommended && "pt-4",
          selected
            // The selection green is the CTA green (green-700 on dark).
            ? "border-2 border-cta-primary ring-1 ring-cta-primary/20"
            : // V6 (no selection): the Recommended card keeps the desktop
              // cards' blue edge, the colour of its corner tab. Not in V11's
              // panel (nested): the tab alone marks it (user call, 2026-10-30).
              tapToBuy && recommended && !nested
              ? "border-2 border-ribbon-fill"
              : "border-2 border-transparent",
          selected && sel === "tint" && "bg-accent",
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
              {/* The radio only where the selection setting draws one: the
                  default corner tick needs none (user call, 2026-10-30). */}
              {sel === "left" && radio}
              <span className="min-w-0 flex-1 text-plan-name text-foreground">{title}</span>
              <span className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
                {mrp && <span className="text-plan-strike text-muted-foreground">{mrp}</span>}
                {/* leading-tight: the 20px price's own 28px line set the gap
                    under the name line, not the 2px between the lines. */}
                <span className="text-plan-price-compact tabular-nums text-foreground">{price}</span>
                {unit && <span className="text-plan-unit text-muted-foreground">{unit}</span>}
              </span>
              {sel === "right" && radio}
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
        {/* Name and meta | price, with the radio where the selection
            setting puts it (after the price by default, user call
            2026-10-30). The price floats right, so the name and meta flow
            beside it; a meta line too long to fit beside it drops below it
            whole, never splitting mid-phrase ("Valid for 30 days"). */}
        <div className={cn("flex items-start gap-2", layout === "inline" && "@2xs:hidden")}>
          {sel === "left" && <span className="flex h-5 shrink-0 items-center">{radio}</span>}
          <div className="min-w-0 flex-1 flow-root">
            <div className={cn("float-right ml-3", sel === "right" && "flex items-start gap-2")}>
              {priceBlock}
              {sel === "right" && <span className="flex h-7 items-center">{radio}</span>}
            </div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {/* A meta line's icon hangs in the radio's column, its words under
                the name (16px radio + 8px gap = the 24px the icons take). */}
            {meta && <div className={cn("mt-2 flex flex-col items-start gap-2 [&>*]:whitespace-nowrap", sel === "left" && "[&>*:has(>svg:first-child)]:-ml-6")}>{meta}</div>}
          </div>
        </div>

        {showLine ? line : (
          <>
            {selected && details}
            {!selected && collapsed}
          </>
        )}
      </div>
    </div>
  )
}

/** "check" selection: a small green corner tab with a white tick in the
 *  selected card's top-right corner, so it reads as part of the card. Drawn
 *  by the card's wrapper, over the card's 2px border, with its outer corner
 *  rounded like the card's: clipped inside the card, its curved edge
 *  blended with the white fill and showed a white fringe (user call,
 *  2026-10-30). The wrapper's top is the card's top.
 *  Every card has 22px of top padding (the tabs are 20px; the name sits just under them), so the tab sits above the price
 *  row and takes no room beside it. */
function CornerTick() {
  // V5: a green circle on the card's corner, sticking out past its edge,
  // instead of the tab (user call, 2026-10-30). The card's wrapper draws
  // it (no clipping there); the white ring parts it from the page.
  if (versionAtLeast(useCheckoutVersion(), "v5")) {
    return (
      <span
        aria-hidden
        className="absolute -top-1.5 -right-1.5 z-docked flex size-5 items-center justify-center rounded-full bg-cta-primary text-primary-foreground ring-2 ring-plan-card animate-in fade-in-0 zoom-in-95"
      >
        <Check className="size-3" strokeWidth={4} />
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className="absolute top-0 right-0 z-docked flex h-5 w-8 items-center justify-center rounded-tr-card rounded-bl-card bg-cta-primary text-primary-foreground animate-in fade-in-0"
    >
      {/* Optical centring: the tab's top and right edges merge into the
          card's green border, so the eye reads its middle a little low and
          left of the box's; the check follows by 1px each way. */}
      <Check className="size-3 translate-y-px -translate-x-px" strokeWidth={3.5} />
    </span>
  )
}

/** The "line" layout's feature line: under a rule, every feature in one
 *  wrapping line split by trailing dots (a red ✕ and muted text when missing), then
 *  one line per `extra` (database credits). Always shown, selected or not,
 *  so the cards compare at a glance. Each item never breaks inside. */
export function MobileFeatureLine({
  items,
  extra,
}: {
  items: { icon: React.ReactNode; label: React.ReactNode; missing?: boolean }[]
  extra?: React.ReactNode[]
}) {
  const line = (content: React.ReactNode, i: number) => (
    <div key={i} className="flex items-center gap-1.5 [&_svg]:size-4 [&_svg]:shrink-0">
      {content}
    </div>
  )
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-3 text-xs text-foreground">
      <ul className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0",
              item.missing && "text-muted-foreground"
            )}
          >
            {item.missing ? <X className="text-destructive" aria-hidden /> : item.icon}
            {item.label}
            {item.missing && <span className="sr-only">(not included)</span>}
            {/* The dot trails its item, so a wrapped line never opens on one. */}
            {i < items.length - 1 && <span aria-hidden className="text-muted-foreground">·</span>}
          </li>
        ))}
      </ul>
      {extra?.map(line)}
    </div>
  )
}

/** The apna Unlimited card's feature line, the same in both checkouts:
 *  WhatsApp and reposts in one line, the database credits under it. */
export function MobileUnlimitedLine({
  db,
  reposts = true,
  lead,
}: {
  db: React.ReactNode
  reposts?: boolean
  /** V11: an item that flows after the alerts ("Dynamic visibility"). */
  lead?: { icon: React.ReactNode; label: string }
}) {
  // V10: "Alerts to candidates" (the WhatsApp icon says WhatsApp, as on the
  // job cards) and "Job reposts and swapping" (the infinity icon says unlimited; user
  // call, 2026-10-30).
  const version = useCheckoutVersion()
  // V9 (self-checkout) takes V10's card copy too (user call, 2026-10-30).
  const v10 = versionAtLeast(version, "v10") || versionAtLeast(version, "v9")
  return (
    <MobileFeatureLine
      items={[
        // WhatsApp first, as on the job cards (user call, 2026-10-30).
        { icon: <WhatsApp className="text-success" aria-hidden />, label: v10 ? "Alerts to candidates" : "WhatsApp alerts to candidates" },
        ...(lead ? [lead] : []),
        ...(reposts
          ? [{ icon: <InfinityIcon className="text-warning" aria-hidden />, label: v10 ? "Job reposts and swapping" : "Free job reposts and swapping" }]
          : []),
      ]}
      extra={[
        // Search a profile: what the database credits buy.
        <>
          <UserSearch className="text-muted-foreground" aria-hidden />
          {db}
        </>,
      ]}
    />
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
  // V6: dark text, like express V6's visibility line ("Valid for 30 days",
  // "1 active job slot for 30 days"; user call, 2026-10-30).
  const dark = versionAtLeast(useCheckoutVersion(), "v6")
  return (
    // 16px icons, centred on the text: the feature line's size (user call,
    // 2026-10-30; at 14px the visibility ticks read too small).
    <span className={cn("flex items-center gap-2 text-xs [&_svg]:size-4 [&_svg]:shrink-0", dark ? "text-foreground" : "text-muted-foreground")}>
      {icon}
      {children}
    </span>
  )
}

/** A subscription's slot line, the same on every phone Unlimited card and
 *  subscription row: "1 active job slot for 30 days", plain (not bold, user
 *  call 2026-10-30). */
export function MobileSlotLine({ slots, days, muted }: { slots: number; days: number; muted?: boolean }) {
  return (
    // `muted`: a gray icon like the "Valid for N days" clock. Self-checkout
    // only (user call, 2026-10-30, every version); express keeps the green.
    <MobileMetaLine icon={<BriefcaseBusiness className={muted ? undefined : "text-checkout-primary"} aria-hidden />}>
      <span>
        {slotLabel(slots)} for {days}{"\u00A0"}days
      </span>
    </MobileMetaLine>
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
  /** The "line" layout's feature line (MobileFeatureLine); without it the
   *  line is built from `features`. */
  line?: React.ReactNode
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
  line,
  className,
}: MobileUnlimitedCardProps) {
  const radioMode = selected !== undefined
  const revealRef = useRevealOnSelect(selected)
  const sel = usePlanCardSelection()
  const layout = usePlanCardLayout()
  // V6: no button on any card; the card's own tap buys it.
  const cardCta = versionAtLeast(useCheckoutVersion(), "v6") ? undefined : cta
  const asLine = layout === "line"
  const expanded = !radioMode || selected || !collapsed || asLine
  // V3: no dark frame. A white card with a 2px plum edge, and the wordmark
  // as a corner tab like "Recommended" (user call, 2026-10-30).
  const v3 = versionAtLeast(useCheckoutVersion(), "v3")
  const v11 = versionAtLeast(useCheckoutVersion(), "v11")
  const priceBlock = (
    // 8px between the price and the % OFF badge under it (user call,
    // 2026-10-30; was 4px).
    <div className="flex shrink-0 flex-col items-end gap-2 text-right">
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
        v3
          ? "relative"
          : // Compact header strip (user call, 2026-10-30): 12px above the logo, 8px under it.
            cn(
              "flex flex-col bg-gradient-checkout-unlimited text-surface-inverted-fg",
              // V11: twice the frame's edge, a corner concentric with the
              // inner card, and the job panel's header room: 16px above,
              // a 24px logo row, 12px under (user call, 2026-10-30).
              v11 ? "gap-3 rounded-frame px-3 pt-4 pb-3" : "gap-2 rounded-card px-1.5 pt-3 pb-1.5"
            ),
        REVEAL_MARGINS,
        onSelect && "cursor-pointer",
        className
      )}
    >
      {v3 ? (
        // Drawn over the card's edge, its outer corner rounded like the
        // card's, as the Recommended tab.
        <span className="absolute top-0 left-0 z-docked flex h-6 items-center rounded-tl-card rounded-br-card bg-checkout-unlimited-edge px-5">
          {/* 1px down: the "p" descends, so the box centres the word high. */}
          <LogoApnaUnlimited variant="gradient" className="h-3.5 w-auto translate-y-px" />
        </span>
      ) : null}
      {/* V3: the tick drawn here, over the card's edge, as on the plan rows. */}
      {v3 && radioMode && selected && sel === "check" && <CornerTick />}
      {v3 ? null : (
        <div className={cn("flex items-center justify-between px-2.5", v11 ? "h-6" : "h-3.5")}>
          <LogoApnaUnlimited variant="gradient" className="h-3.5 w-auto" />
        </div>
      )}

      <div
        className={cn(
          "relative flex flex-col gap-3 overflow-hidden bg-plan-card text-card-foreground",
          v3
            ? "rounded-card border-2 border-checkout-unlimited-edge px-4 pt-8 pb-4"
            : "rounded-card-nested p-4 shadow-card",
          // The tap answers on the white card, not the dark frame.
          onSelect && "ink press-subtle transition-interactive",
          // Selected as in MobilePlanRow: the CTA green edge. V3 keeps its
          // plum edge until chosen.
          radioMode && !v3 && (selected ? "border-2 border-cta-primary ring-1 ring-cta-primary/20" : "border-2 border-transparent"),
          radioMode && v3 && selected && "border-cta-primary ring-1 ring-cta-primary/20",
          radioMode && selected && sel === "tint" && "bg-accent",
          cardClassName
        )}
      >
        {radioMode ? (
          // The price floats right, so the name and the
          // lines under it flow beside it, with no space held under a
          // one-line name; a line too long to fit drops below the price.
          <div className="flex items-start gap-2">
            {/* Where the radio sits follows the selection setting, as in MobilePlanRow. */}
            {sel === "left" && (
              <span className="flex h-5 shrink-0 items-center">
                <RadioMark checked={selected} className="data-checked:border-cta-primary [&>span]:bg-cta-primary" />
              </span>
            )}
            <div className="min-w-0 flex-1 flow-root">
            <div className={cn("float-right ml-3", sel === "right" && "flex items-start gap-2")}>
              {priceBlock}
              {sel === "right" && (
                <span className="flex h-7 items-center">
                  <RadioMark checked={selected} className="data-checked:border-cta-primary [&>span]:bg-cta-primary" />
                </span>
              )}
            </div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {subtitle && <span className={cn("mt-2 block text-xs text-muted-foreground", sel === "left" && "[&>*:has(>svg:first-child)]:-ml-6")}>{subtitle}</span>}
            {/* Wraps beside the price instead of dropping below it: with the
                10% offer the price side is tall, and a line that dropped
                whole left a big gap under the name. */}
            {meta && <div className={cn("mt-2", sel === "left" && "has-[>*>svg:first-child]:-ml-6")}>{meta}</div>}
            </div>
          </div>
        ) : (
          // Name and price share the top line; subtitle and the discount
          // row sit under them.
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-plan-name text-foreground">{title}</span>
              {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              {/* "1 active job slot for 30 days": the plan's slot line. */}
              {meta && <div className="mt-0.5">{meta}</div>}
            </div>
            {priceBlock}
          </div>
        )}

        {radioMode && !v3 && selected && sel === "check" && <CornerTick />}

        {asLine && (line ?? <MobileFeatureLine items={features.map(([icon, text]) => ({ icon, label: text }))} />)}

        {expanded && !asLine && (
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

        {expanded && (note || cardCta) && (
          <div className={cn("flex items-center justify-between gap-3", !asLine && "border-t border-border/60 pt-3")}>
            {note && <span className="text-xs italic text-muted-foreground">{note}</span>}
            {cardCta}
          </div>
        )}
      </div>
    </div>
  )
}

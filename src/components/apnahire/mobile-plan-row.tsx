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
 *                       `upcoming` ("₹749 from Jan 1", UpcomingPriceLine) is
 *                       the price column's last line.
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
import { Badge, BadgePercent, BriefcaseBusiness, Check, InfinityIcon, LogoApnaUnlimited, Sparkles, UserSearch, WhatsApp, X } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { slotLabel } from "@/content/subscriptions"

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
  /** Ignored: rows have no selected state (a tap buys). Kept so existing
   *  callers compile. */
  selected?: boolean
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
  /** Under the discount ("Extra 10% off"). */
  priceNote?: React.ReactNode
  /** Before the struck price, on the price line (the `?price=inline`
   *  preview's "−22%"). */
  priceLead?: React.ReactNode
  /** Price and struck price at the title size (text-plan-name) (the `?price=inline` preview). */
  smallPrice?: boolean
  /** Set the price in the plan name's style: credits in place of a price
   *  ("1 job credit") on express phone cards (user call, 2026-11-03). */
  priceAsName?: boolean
  /** A button pinned to the card's bottom-right (the `?price=cta` preview). */
  cta?: React.ReactNode
  /** The price's last line: `UpcomingPriceLine` (it renders nothing when
   *  off, and the slot adds no space of its own). */
  upcoming?: React.ReactNode
  className?: string
}

export function MobilePlanRow({
  title,
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
  priceNote,
  priceLead,
  smallPrice,
  priceAsName,
  cta,
  upcoming,
  className,
}: MobilePlanRowProps) {
  // No selected state: a tap buys (the page's onSelect opens the order
  // summary), so nothing stays picked.
  const selected = false
  const revealRef = useRevealOnSelect(selected)
  // The feature line or nothing (a plan with no features has no line, and
  // no rule); the expand-on-select details are gone.
  const showLine = true
  const priceBlock = (
    // 8px between the price and the % OFF badge under it (user call,
    // 2026-10-30; was 4px).
    <div className="flex shrink-0 flex-col items-end gap-2 text-right">
      <div className={cn("flex justify-end gap-1.5 whitespace-nowrap", "items-center")}>
        {priceLead}
        {mrp && <span className={cn("text-plan-strike text-muted-foreground", smallPrice && "text-sm leading-5 line-through")}>{mrp}</span>}
        {/* The price leads the row (text-plan-price-compact, over text-plan-name);
            tabular figures keep the column steady. */}
        <span className={cn("text-foreground", priceAsName ? "text-plan-name" : smallPrice ? "text-lg leading-5 font-semibold" : "tabular-nums text-plan-price-compact")}>{price}</span>
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
      {selected && <CornerTick />}
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
          "@container relative flex flex-col gap-3 overflow-hidden bg-plan-card px-4 pt-8 pb-6 shadow-card",
          !readOnly && "ink press-subtle cursor-pointer transition-interactive",
          nested ? "rounded-card-nested" : "rounded-card",
          // No tick tab: only a Recommended card needs the room.
          !recommended && "pt-6",
          // With Buy now: 12px above (24px under the tab), 16px below, to fit
          // more above the fold on small phones (user call, 2026-11-03).
          cta && (recommended ? "pt-6 pb-4" : "pt-3 pb-4"),
          // Edges are an inset ring, not a border: they take no room, so every
          // card keeps the same 16px inset (user call, 2026-11-03).
          selected
            // The selection green is the CTA green (green-700 on dark).
            ? "ring-2 ring-inset ring-cta-primary"
            : // The Recommended card keeps the desktop cards' blue edge, the
              // colour of its corner tab. Not in the job panel (nested): the
              // tab alone marks it (user call, 2026-10-30).
              recommended && !nested && "ring-2 ring-inset ring-ribbon-fill",
          className
        )}
      >
        {/* Name and meta | price. The price floats right, so the name and meta flow
            beside it; a meta line too long to fit beside it drops below it
            whole, never splitting mid-phrase ("Valid for 30 days"). */}
        {cta ? (
          // The price at the top right, the button at the bottom right, as
          // the Unlimited card's "Buy" beside its last line.
          // With a feature line, the button closes it: benefits stacked one
          // per line under the rule, the button at the bottom right. Without
          // one (Classic), it closes the meta the same way (user call, 2026-11-03).
          <>
            {/* Name and meta 4px apart: the price's taller line already adds room (user call, 2026-11-03). */}
            <div className="flex flex-col gap-1">
              {/* Name and meta share the left column, so a taller price
                  column (the Jan 1 price line) never pushes the meta down. */}
              <div className="flex items-start justify-between gap-3">
                {/* 8px: the gap the price's taller row used to make, kept now
                    the meta no longer sits under that row. */}
                <div className="flex min-w-0 flex-col gap-2">
                  <span className="text-plan-name text-foreground">{title}</span>
                  {showLine && line && meta && <div className="flex flex-col items-start gap-2 [&>*]:whitespace-nowrap">{meta}</div>}
                </div>
                <div className="shrink-0">{priceBlock}</div>
              </div>
              {showLine && line ? null : (
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col items-start gap-2 [&>*]:whitespace-nowrap">{meta}</div>
                  <div className="shrink-0 self-end">{cta}</div>
                </div>
              )}
            </div>
            {showLine && line && (
              // Benefits start 12px under the rule on every card. The 32px
              // button takes only a text line's height (-my-1.5), centred on
              // the last line, so Classic's single line isn't pushed down.
              <div className="flex items-start justify-between gap-3 border-t border-border pt-3">
                <div className="min-w-0 [&>div]:border-0 [&>div]:pt-0 [&_li>span[aria-hidden]]:hidden [&_ul]:flex-col [&_ul]:items-start">
                  {line}
                </div>
                <div className="-my-1.5 shrink-0 self-end">{cta}</div>
              </div>
            )}
          </>
        ) : (
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 flow-root">
            <div className="float-right ml-3">{priceBlock}</div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {meta && <div className="mt-2 flex flex-col items-start gap-2 [&>*]:whitespace-nowrap">{meta}</div>}
          </div>
        </div>
        )}

        {cta && showLine ? null : showLine ? line : (
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
  // "Alerts to candidates" (the WhatsApp icon says WhatsApp, as on the job
  // cards) and "Job reposts and swapping" (the infinity icon says unlimited;
  // user call, 2026-10-30).
  return (
    <MobileFeatureLine
      items={[
        // WhatsApp first, as on the job cards (user call, 2026-10-30).
        { icon: <WhatsApp className="text-success" aria-hidden />, label: "Smart alerts to candidates" },
        ...(lead ? [lead] : []),
        ...(reposts
          ? [{ icon: <InfinityIcon className="text-warning" aria-hidden />, label: "Job reposts and swapping" }]
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
  // Dark text, like the visibility line (user call, 2026-10-30).
  return (
    // 16px icons, centred on the text: the feature line's size (user call,
    // 2026-10-30; at 14px the visibility ticks read too small).
    <span className={"flex items-center gap-2 text-xs text-foreground [&_svg]:size-4 [&_svg]:shrink-0"}>
      {icon}
      {children}
    </span>
  )
}

/** A subscription's slot line, the same on every phone Unlimited card and
 *  subscription row: "1 job live at a time for 30 days", plain (not bold, user
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
  /** As MobilePlanRow: before the struck price, and a size-down price. */
  priceLead?: React.ReactNode
  smallPrice?: boolean
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
  priceLead,
  smallPrice,
  upcoming,
  features,
  note,
  cta,
  selected,
  meta,
  onSelect,
  cardClassName,
  line,
  className,
}: MobileUnlimitedCardProps) {
  const radioMode = selected !== undefined
  const revealRef = useRevealOnSelect(selected)
  const cardCta = cta
  const priceBlock = (
    // 8px between the price and the % OFF badge under it (user call,
    // 2026-10-30; was 4px).
    <div className="flex shrink-0 flex-col items-end gap-2 text-right">
      <span className={cn("flex gap-1.5 whitespace-nowrap", "items-center")}>
        {priceLead}
        {mrp && <span className={cn("text-plan-strike text-muted-foreground", smallPrice && "text-sm leading-5 line-through")}>{mrp}</span>}
        <span className={cn("text-foreground", smallPrice ? "text-lg leading-5 font-semibold" : "tabular-nums text-plan-price-compact")}>{price}</span>
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
        // Twice the frame's edge, a corner concentric with the inner card,
        // and the job panel's header room: 16px above, a 24px logo row,
        // 12px under (user call, 2026-10-30).
        "flex flex-col gap-3 rounded-frame bg-gradient-checkout-unlimited px-3 pt-4 pb-3 text-surface-inverted-fg",
        REVEAL_MARGINS,
        onSelect && "cursor-pointer",
        className
      )}
    >
      <div className="flex h-6 items-center justify-between px-2.5">
          <LogoApnaUnlimited variant="gradient" className="h-3.5 w-auto" />
      </div>

      <div
        className={cn(
          "relative flex flex-col gap-3 overflow-hidden bg-plan-card text-card-foreground",
          "rounded-card-nested p-4 shadow-card",
          // The tap answers on the white card, not the dark frame.
          onSelect && "ink press-subtle transition-interactive",
          // Selected as in MobilePlanRow: the CTA green edge.
          radioMode && selected && "ring-2 ring-inset ring-cta-primary",
          cardClassName
        )}
      >
        {radioMode ? (
          // The price floats right, so the name and the
          // lines under it flow beside it, with no space held under a
          // one-line name; a line too long to fit drops below the price.
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1 flow-root">
            <div className="float-right ml-3">{priceBlock}</div>
            <span className="flow-root text-plan-name text-foreground">{title}</span>
            {subtitle && <span className="mt-2 block text-xs text-muted-foreground">{subtitle}</span>}
            {/* Wraps beside the price instead of dropping below it: with the
                10% offer the price side is tall, and a line that dropped
                whole left a big gap under the name. */}
            {meta && <div className="mt-2">{meta}</div>}
            </div>
          </div>
        ) : (
          // Name and price share the top line; subtitle and the discount
          // row sit under them.
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-plan-name text-foreground">{title}</span>
              {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              {/* "1 job live at a time for 30 days": the plan's slot line. */}
              {meta && <div className="mt-0.5">{meta}</div>}
            </div>
            {priceBlock}
          </div>
        )}

        {radioMode && selected && <CornerTick />}

        {(line ?? <MobileFeatureLine items={features.map(([icon, text]) => ({ icon, label: text }))} />)}

        {(note || cardCta) && (
          <div className="flex items-center justify-between gap-3">
            {note && <span className="text-xs italic text-muted-foreground">{note}</span>}
            {/* A text line's height, as MobilePlanRow's CTA, so the bottom
                padding matches the plan cards'. */}
            {cardCta && <div className="-my-1.5 shrink-0">{cardCta}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

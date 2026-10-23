"use client"

/**
 * PricingCard — a single plan/bundle card: optional corner ribbon, title +
 * subtitle + one or more meta lines, a divider, a price row (current +
 * optional strikethrough MRP + optional badge), an optional price-suffix
 * line (e.g. "₹608 /credit"), and a CTA slot.
 *
 * Extracted from the apnahire self-checkout page's job-credit bundle cards
 * — a "pure layout" shape (see AGENTS.md's composition rule): it owns
 * structure and spacing only. Accent colour is entirely the caller's — pass
 * a pre-styled `ribbon`/`badge`/`cta` (e.g. a `<Badge>` or `<Button>`)
 * rather than a `recommended` boolean, so a page that needs a specific
 * brand tone isn't forced through this primitive's own palette.
 *
 * Two knobs beyond that:
 *
 *   `emphasis` — which line carries the card's weight. `"price"` (the
 *   default, used by both Jobs and Database on self-checkout) is 16px title
 *   over a 24px price — the same price size as the Subscription and
 *   Enterprise cards elsewhere on the page, so every plan price reads at one
 *   size regardless of which component draws it. `"title"` inverts that
 *   (20px title over a 16px price) and also moves the meta lines inside the
 *   title group instead of standing apart from it — currently unused on
 *   self-checkout, kept for a future card that genuinely needs to lead with
 *   the title.
 *
 *   `surface` — `"inset"` is for a card nested inside a surface that is
 *   deliberately dark in BOTH themes (the Unlimited side card): fixed
 *   white/dark-text in light mode, matching the source design exactly, but
 *   in dark mode the `checkout-inset-*` family aliases the ordinary
 *   `--card`/`--card-foreground`/etc. roles — the same tokens the sibling
 *   PricingCards next to it already render with — so this card reads as an
 *   ordinary dark card rather than a stray light box (or, the very first
 *   version of this, invisible dark-on-dark text). See the `.dark` block
 *   in semantic.css for the reasoning trail.
 *
 * The card fills its grid cell (`h-full`) and pins the divider, price and
 * CTA to the bottom (`mt-auto` on the rule), so a row of cards with unequal
 * copy still lines those three up.
 *
 * RULE — structural parity across a comparison row. `h-full` + `mt-auto`
 * only equalise what comes AFTER the divider (the rule, price, CTA); they
 * do nothing for the rows ABOVE it. If one card in a row gets a `subtitle`
 * (or an extra `meta` row, or anything else) that its siblings don't have,
 * every row below that point shifts down in THAT card only — titles no
 * longer line up, feature rows no longer line up, and the card reads as
 * broken even though each card is individually correct. A "recommended"
 * card should get its emphasis from `ribbon` + `className` (both already
 * layout-neutral — `ribbon` is `absolute`-positioned, `className` only
 * reaches border/ring), never from giving that one card content the others
 * don't have. If every card's content is structurally identical — same
 * number of lines, same slots filled — the row stays aligned automatically;
 * no per-card measuring or compensating margin required. When composing a
 * grid of these (see `TieredJobPlans`/`SubscriptionJobPlans` in
 * `src/components/apnahire/job-plan-cards.tsx` for a worked example), also
 * give each card `className="flex-1"` so it actually stretches to fill its
 * grid cell's row height — `h-full` alone only fills a flex/grid PARENT
 * that already stretched to the row height, which won't happen if that
 * parent is itself a plain `flex-col` wrapper (e.g. one adding a caption
 * below the card) without `flex-1` on the card inside it. And once a card
 * is `flex-1` inside that wrapper, any SIBLING of the card inside the same
 * wrapper (a caption, a social-proof chip below it) must exist on every
 * card's wrapper too, even empty — otherwise the one card with a real
 * sibling element has less room left for its own `flex-1` card (the
 * sibling eats part of the stretched wrapper height), making that one card
 * shorter than the others instead of matching them.
 *
 * `layout="price-first"` — reorders the card to (title + price row) →
 * divider → meta (feature list) → `footer` → CTA, for plan comparisons where
 * the price should lead and a long feature list follows. The CTA still
 * closes the card, as on every plan card (user call, 2026-10-24).
 * Title and price share one tight group, as on the Subscription tab's plan
 * cards. Titles get no reserved height, so pick grid breakpoints at which
 * every title in the row fits one line, or that card's price drops below
 * its siblings'. `footer` is a quiet left-aligned line pinned to the
 * card's bottom edge behind a dashed rule (the meta list absorbs any spare
 * height above it) — for something that isn't a permanent part of the plan,
 * like a limited-time add-on.
 *
 * API
 *   <PricingCard
 *     ribbon={<Badge variant="ribbon" size="ribbon">Recommended</Badge>}
 *     title="6 Job credits"
 *     subtitle="Perfect for growing businesses"
 *     meta={<><ClockFading /> Valid for 90 days</>}   // or an array of rows
 *     price="₹3,649"
 *     unit="/month"                                    // optional, muted
 *     mrp="₹4,194"                                     // optional, line-through
 *     badge={<Badge variant="discount">13% OFF</Badge>}
 *     priceSuffix="₹608 /credit"
 *     cta={<Button>Buy now</Button>}
 *     emphasis="price"                                 // default
 *     surface="card"                                   // default
 *     onClick={() => ...}                              // optional whole-card click
 *   />
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PricingCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  ribbon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** One meta line, or several. Each gets its own row with a 20px leading
   *  glyph slot; pass the icon as part of the row's content. */
  meta?: React.ReactNode | React.ReactNode[]
  price: React.ReactNode
  /** "/month", "/quarter" right after the price. Muted like the struck
   *  price: on every plan card only the price itself is dark. */
  unit?: React.ReactNode
  mrp?: React.ReactNode
  badge?: React.ReactNode
  priceSuffix?: React.ReactNode
  cta: React.ReactNode
  /** Which line is the larger of title/price. Defaults to `"price"`. */
  emphasis?: "price" | "title"
  /** `"inset"` = fixed light card for nesting inside an always-dark surface. */
  surface?: "card" | "inset"
  /** `"price-first"` = title → price → divider → meta → footer → CTA. */
  layout?: "stacked" | "price-first"
  /** Bottom-pinned line under the meta list (price-first only). */
  footer?: React.ReactNode
  /** The hover lift. Defaults to on when the card has `onClick` (a click
   *  target as a whole), off otherwise. Pass `true` only when a frame around
   *  the card takes the click (see the card-hover-lift rule). */
  interactive?: boolean
}

export function PricingCard({
  ribbon,
  title,
  subtitle,
  meta,
  price,
  unit,
  mrp,
  badge,
  priceSuffix,
  cta,
  emphasis = "price",
  surface = "card",
  layout = "stacked",
  footer,
  interactive,
  className,
  ...props
}: PricingCardProps) {
  const titleLed = emphasis === "title"
  const inset = surface === "inset"

  const fg = inset ? "text-checkout-inset-fg" : "text-foreground"
  const fgMuted = inset ? "text-checkout-inset-fg-muted" : "text-muted-foreground"
  const rule = inset ? "border-checkout-inset-border" : "border-border"

  const metaRows =
    meta == null ? [] : Array.isArray(meta) ? meta.filter(Boolean) : [meta]

  const metaBlock = metaRows.length > 0 && (
    <div className={cn("flex flex-col gap-3 text-sm", fgMuted)}>
      {metaRows.map((row, i) => (
        <span
          key={i}
          className="flex items-start gap-2 [&_svg]:size-5 [&_svg]:shrink-0"
        >
          {row}
        </span>
      ))}
    </div>
  )

  const priceBlock = (
    <div className={cn("flex flex-col", titleLed ? "gap-1" : "gap-2")}>
      {/* 6px gaps, not 8: keeps price, struck price and badge on one line
          in more cards. When a price outgrows the card ("₹9,999 ₹15,378
          35% OFF" in a 248px Jobs card), CompareAlign stacks the badge
          under the price in EVERY card of the row, never just this one. */}
      {/* Packed left: the % tag sits right after the struck price, never
          flung to the card's far edge. */}
      <div data-compare="price" className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {/* Baseline, not centre: the small struck price then sits on the
            same line as the price's own suffix ("/month"), not floating at
            the big figure's mid-height. */}
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              // The plan type scale (styles/index.css): every plan price,
              // whichever component draws the card, is text-plan-price.
              titleLed ? "text-base font-semibold" : "text-plan-price",
              fg
            )}
          >
            {price}
          </span>
          {unit && <span className={cn("text-plan-unit", fgMuted)}>{unit}</span>}
          {mrp && (
            <span className={cn("text-plan-strike", fgMuted)}>{mrp}</span>
          )}
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      {priceSuffix && (
        <p data-compare="price-suffix" className={cn("text-xs italic leading-6", fgMuted)}>{priceSuffix}</p>
      )}
    </div>
  )

  const rootClassName = cn(
    // `card-hover-lift` is the shared card interaction (see styles/index.css).
    // `card-nested`: it usually sits in a plan track; on the page background
    // pass `rounded-card` (the ribbon's corner follows via `inherit`).
    // No `overflow-hidden`: it would clip the lift's hit strip; the ribbon
    // clips its own corner instead.
    "relative flex h-full flex-col gap-4 rounded-card-nested border p-4 pt-8",
    (interactive ?? !!props.onClick) && "card-hover-lift",
    inset ? "border-checkout-inset-border bg-checkout-inset" : "border-border bg-plan-card",
    // A clickable card answers a press like every other surface.
    props.onClick && "cursor-pointer ink press-subtle",
    className
  )

  if (layout === "price-first") {
    return (
      <div
        data-slot="pricing-card"
        data-compare-card
        data-layout="price-first"
        data-surface={surface}
        className={rootClassName}
        {...props}
      >
        {ribbon && <div className="absolute -right-px -top-px flex overflow-hidden rounded-tr-[inherit] rounded-bl-xl">{ribbon}</div>}

        <div className="flex flex-col gap-2">
          <p className={cn("text-plan-name", fg)}>{title}</p>
          {subtitle && <p className={cn("text-xs", fgMuted)}>{subtitle}</p>}
          {priceBlock}
        </div>

        <hr className={rule} />

        <div className="flex flex-1 flex-col">{metaBlock}</div>

        {/* Dashed rule: the footer is set apart from the meta list rather than
            read as one more feature (e.g. a limited-time add-on). */}
        {footer && (
          <div className={cn("flex border-t border-dashed pt-3 text-xs", rule, fgMuted)}>{footer}</div>
        )}

        {/* Last, as on every plan card: you read what you get, then act. The
            meta list's flex-1 pins it to the bottom, level across a row. */}
        <div data-compare="cta">{cta}</div>
      </div>
    )
  }

  return (
    <div
      data-slot="pricing-card"
        data-compare-card
      data-emphasis={emphasis}
      data-surface={surface}
      className={rootClassName}
      {...props}
    >
      {ribbon && (
        // `flex` (block-level) is load-bearing: without it this div sizes
        // as an inline formatting context around `ribbon`, which reserves
        // baseline/line-height space above the badge — a visible gap
        // between the card's top edge and the ribbon itself.
        // `-top-px -right-px`: an absolute child starts inside the card's 1px
        // border; pulling it out puts the ribbon on the outer corner, so no
        // strip of card fill shows around it.
        <div className="absolute -right-px -top-px flex overflow-hidden rounded-tr-[inherit] rounded-bl-xl">{ribbon}</div>
      )}

      <div className="flex flex-1 flex-col gap-5">
        <div className={cn("flex flex-col", titleLed ? "gap-3" : "gap-2")}>
          <p
            className={cn(
              titleLed ? "text-xl leading-tight font-semibold" : "text-plan-name",
              fg
            )}
          >
            {title}
          </p>
          {subtitle && <p className={cn("text-xs", fgMuted)}>{subtitle}</p>}
          {titleLed && metaBlock}
        </div>

        {!titleLed && metaBlock}

        {/* `mt-auto`: a card taller than its content grows ABOVE the rule, so
            the rule, price and CTA stay aligned across a row of cards. */}
        <hr className={cn("mt-auto", rule)} />

        {priceBlock}
      </div>

      <div data-compare="cta">{cta}</div>
    </div>
  )
}

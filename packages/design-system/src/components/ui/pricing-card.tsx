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
 *   `emphasis` — which line carries the card's weight. The self-checkout
 *   design uses both: Jobs leads with the price (16px title over a 20px
 *   price), Database leads with the credit count (20px title over a 16px
 *   price). They also differ in rhythm, so the meta lines sit inside the
 *   title group under `emphasis="title"` and stand apart from it under
 *   `emphasis="price"`.
 *
 *   `surface` — `"inset"` swaps the theme-aware card roles for the fixed
 *   `checkout-inset-*` family, for a card nested inside a surface that is
 *   deliberately dark in BOTH themes (the Unlimited side card). Using the
 *   ordinary roles there produces near-invisible text in dark mode.
 *
 * The card fills its grid cell (`h-full`) and pins the divider, price and
 * CTA to the bottom (`mt-auto` on the rule), so a row of cards with unequal
 * copy still lines those three up.
 *
 * API
 *   <PricingCard
 *     ribbon={<Badge variant="ribbon" size="ribbon">Recommended</Badge>}
 *     title="6 Job credits"
 *     subtitle="Perfect for growing businesses"
 *     meta={<><ClockFading /> Valid for 90 days</>}   // or an array of rows
 *     price="₹3,649"
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
  mrp?: React.ReactNode
  badge?: React.ReactNode
  priceSuffix?: React.ReactNode
  cta: React.ReactNode
  /** Which line is the larger of title/price. Defaults to `"price"`. */
  emphasis?: "price" | "title"
  /** `"inset"` = fixed light card for nesting inside an always-dark surface. */
  surface?: "card" | "inset"
}

export function PricingCard({
  ribbon,
  title,
  subtitle,
  meta,
  price,
  mrp,
  badge,
  priceSuffix,
  cta,
  emphasis = "price",
  surface = "card",
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

  return (
    <div
      data-slot="pricing-card"
      data-emphasis={emphasis}
      data-surface={surface}
      className={cn(
        // `card-hover-lift` is the shared card interaction (see styles/index.css).
        "card-hover-lift relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border p-4 pt-8",
        inset ? "border-checkout-inset-border bg-checkout-inset" : "border-border bg-card",
        props.onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {ribbon && (
        // `flex` (block-level) is load-bearing: without it this div sizes
        // as an inline formatting context around `ribbon`, which reserves
        // baseline/line-height space above the badge — a visible gap
        // between the card's top edge and the ribbon itself.
        <div className="absolute right-0 top-0 flex rounded-bl-xl">{ribbon}</div>
      )}

      <div className="flex flex-1 flex-col gap-5">
        <div className={cn("flex flex-col", titleLed ? "gap-3" : "gap-2")}>
          <p
            className={cn(
              "font-semibold",
              titleLed ? "text-xl leading-tight" : "text-base leading-5",
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

        <div className={cn("flex flex-col", titleLed ? "gap-1" : "gap-2")}>
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-semibold",
                  titleLed ? "text-base" : "text-xl leading-6",
                  fg
                )}
              >
                {price}
              </span>
              {mrp && (
                <span className={cn("text-sm leading-6 line-through", fgMuted)}>
                  {mrp}
                </span>
              )}
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {priceSuffix && (
            <p className={cn("text-xs italic leading-6", fgMuted)}>{priceSuffix}</p>
          )}
        </div>
      </div>

      <div>{cta}</div>
    </div>
  )
}

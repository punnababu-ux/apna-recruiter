"use client"

/**
 * PricingCard — a single plan/bundle card: optional corner ribbon, title +
 * subtitle + meta line, a divider, a price row (current + optional
 * strikethrough MRP + optional badge), an optional price-suffix line (e.g.
 * "₹608 /credit"), and a CTA slot.
 *
 * Extracted from the apnahire self-checkout page's job-credit bundle cards
 * — a "pure layout" shape (see AGENTS.md's composition rule): it owns
 * structure and spacing only. Colour is entirely the caller's — pass a
 * pre-styled `ribbon`/`badge`/`cta` (e.g. a `<Badge>` or `<Button>`) rather
 * than a `recommended` boolean, so a page that needs a specific brand tone
 * (like apnahire's checkout-scoped green) isn't forced through this
 * primitive's own palette.
 *
 * API
 *   <PricingCard
 *     ribbon={<Badge>Recommended</Badge>}       // optional, absolute top-right
 *     title="6 Job credits"
 *     subtitle="Perfect for growing businesses"
 *     meta={<>...</>}                            // e.g. icon + "Valid for 90 days"
 *     price="₹3,649"
 *     mrp="₹4,194"                                // optional, rendered with line-through
 *     badge={<Badge>13% OFF</Badge>}             // optional, next to price
 *     priceSuffix="₹608 /credit"                 // optional
 *     cta={<Button>Buy now</Button>}
 *     onClick={() => ...}                         // optional whole-card click
 *   />
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PricingCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  ribbon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  meta?: React.ReactNode
  price: React.ReactNode
  mrp?: React.ReactNode
  badge?: React.ReactNode
  priceSuffix?: React.ReactNode
  cta: React.ReactNode
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
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      data-slot="pricing-card"
      className={cn(
        "relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-border bg-card p-4 pb-4 pt-8 transition-shadow hover:shadow-md",
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

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-foreground">{title}</p>
        {subtitle && <p className="text-2xs text-muted-foreground">{subtitle}</p>}
        {meta && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {meta}
          </span>
        )}
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground">{price}</span>
            {mrp && (
              <span className="text-sm text-muted-foreground line-through">{mrp}</span>
            )}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        {priceSuffix && (
          <p className="text-xs italic text-muted-foreground">{priceSuffix}</p>
        )}
      </div>

      <div className="mt-auto">{cta}</div>
    </div>
  )
}

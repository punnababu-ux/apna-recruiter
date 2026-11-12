/**
 * OfferBar — the one banner for rebuy, upgrade and credit nudges (redesign
 * 2026-11-12, docs/SESSION-2026-11-12-BANNERS.md). A clay object, a badge
 * that says why it shows, a headline with one gold number, then the price,
 * an optional deadline and the CTA, together on the right.
 *
 * API
 *   <OfferBar
 *     surface="subscription"            subscription · credits · urgent · festive
 *     tone="upgrade"                    the badge dot: upgrade · warning (gold), renew · urgent (salmon)
 *     art={<img … />}                   clay object, 64px / 96px from md
 *     badge="Plan ends in 5 days"       why the bar shows (the trigger)
 *     headline={<>Hire all year for just <OfferBarAccent>₹833/month</OfferBarAccent></>}
 *     sub="1 live job for 365 days · 2,400 database credits"
 *     price={{ amount: "₹9,999", strike: "₹11,110" }}   the % is worked out
 *     deadline="Limited time offer"     between price and CTA; a timer in the last 24h
 *     cta={<Button variant="emphasis">Upgrade to annual</Button>}
 *   />
 *
 * Rules
 * - The surface follows the pop-up the CTA opens: subscription plum (with a
 *   gold corner glow), credits green, out of credits red, festive marigold.
 * - The badge carries the trigger; time ("Limited time offer", "Ends in
 *   05:41:55") goes in `deadline`, never in the badge.
 * - The saving is text beside the struck price (Badge "discount"), no chip. The
 *   group reads outward from the price: price, strike, % on phones (left);
 *   %, strike, price from md (right-aligned).
 * - Phones: the art hides; badge (the reason it shows), headline, price,
 *   deadline, then a full-width CTA. The sub line hides when there is a price.
 * - The surface is marked dark, so an `emphasis` CTA renders white.
 */

import * as React from "react"
import { ClockFading } from "@/icons/icons"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { PriceGroup } from "./price-group"

// Soft mesh gradients (colour pools over a deep base), not linear sweeps.
const SURFACE = {
  subscription: "bg-mesh-offer-subscription",
  credits: "bg-mesh-offer-credits",
  urgent: "bg-mesh-offer-urgent",
  festive: "bg-mesh-offer-festive",
  // A light campaign skin (Holi): dark text, and the emphasis CTA stays dark.
  light: "bg-card",
} as const

const DOT = {
  upgrade: "bg-highlight",
  warning: "bg-highlight",
  renew: "bg-lapsed-on-dark",
  urgent: "bg-lapsed-on-dark",
} as const

const rupees = (v: string) => Number(v.replace(/[^\d]/g, ""))

export interface OfferBarProps extends Omit<React.ComponentProps<"div">, "title"> {
  surface?: keyof typeof SURFACE
  tone?: keyof typeof DOT
  art?: React.ReactNode
  badge?: React.ReactNode
  headline: React.ReactNode
  sub?: React.ReactNode
  /** Strings such as "₹9,999": the % saving is worked out from them. */
  price?: { amount: string; strike?: string }
  /** The offer's time limit, shown between price and CTA with a clock. */
  deadline?: React.ReactNode
  cta: React.ReactNode
}

function OfferBar({ surface = "subscription", tone = "upgrade", art, badge, headline, sub, price, deadline, cta, className, ...props }: OfferBarProps) {
  // On red the salmon dot would vanish: gold instead.
  const dot = surface === "urgent" ? "bg-highlight" : DOT[tone]
  const light = surface === "light"
  // Text roles for the surface: dark text on light, light text on dark.
  const fg = light ? "text-foreground" : "text-surface-inverted-fg"
  const muted = light ? "text-muted-foreground" : "text-surface-inverted-fg/75"
  const off = price?.strike ? Math.round((1 - rupees(price.amount) / rupees(price.strike)) * 100) : null
  return (
    <div
      data-slot="offer-bar"
      data-surface={light ? "light" : "dark"}
      className={cn(
        "@container relative isolate flex flex-col gap-2 overflow-hidden rounded-card p-4 md:flex-row md:items-center md:gap-6 md:p-6",
        fg,
        SURFACE[surface],
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
        {art && <div className="hidden size-24 shrink-0 drop-shadow-lg md:block [&>*]:size-full [&>*]:object-contain">{art}</div>}
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          {badge && (
            <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase", light ? "bg-foreground/10" : "bg-surface-inverted-fg/15")}>
              <span className={cn("size-2 rounded-full", dot)} />
              {badge}
            </span>
          )}
          <p className="text-lg leading-snug font-bold md:text-2xl">{headline}</p>
          {sub && <p className={cn("text-sm", muted, price && "hidden md:block")}>{sub}</p>}
        </div>
      </div>

      {/* Phones: headline and price read as one block (8px), the CTA keeps 16px. */}
      <div className="flex flex-col items-stretch gap-4 md:shrink-0 md:items-end md:gap-2">
        {(price || deadline) && (
          // Phones: the deadline joins the price line where the card is wide enough
          // (@offer-row), else it sits under it. Decided by width, never by the string.
          <div className="flex flex-col gap-1 max-md:@offer-row:flex-row max-md:@offer-row:items-center max-md:@offer-row:justify-between">
            {price && (
              // Reads outward from the price: left on phones, right from md.
              <PriceGroup
                align="responsive"
                className="gap-x-2 md:justify-start"
                price={<span className="text-2xl font-bold md:text-3xl">{price.amount}</span>}
                strike={price.strike && <span className={cn("text-sm line-through", light ? "text-muted-foreground" : "text-surface-inverted-fg/60")}>{price.strike}</span>}
                discount={off !== null && off > 0 && <Badge variant="discount" className={cn("text-sm", !light && "text-discount-on-dark")}>−{off}%</Badge>}
              />
            )}
            {deadline && (
              <p className={cn("flex items-center gap-1.5 text-sm md:justify-end", muted)}>
                <ClockFading className="size-4 shrink-0" aria-hidden />
                {deadline}
              </p>
            )}
          </div>
        )}
        {/* Phones: one full-width action under the price. */}
        <div className="w-full md:w-auto [&>*]:w-full md:[&>*]:w-auto">{cta}</div>
      </div>
    </div>
  )
}

/** The one gold number in the headline ("₹833/month"), kept on one line. */
function OfferBarAccent({ children }: { children: React.ReactNode }) {
  // Gold on dark; on a light skin gold fails contrast, so it keeps the text colour.
  return <span className="whitespace-nowrap text-highlight in-data-[surface=light]:text-foreground">{children}</span>
}

export { OfferBar, OfferBarAccent }

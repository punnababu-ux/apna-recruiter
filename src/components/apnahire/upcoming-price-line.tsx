"use client"

/**
 * UpcomingPriceLine — "₹749 from Jan 1", the last line under a price on
 * every job and plan card until the Jan 1, 2027 price change
 * (content/price-change.ts).
 *
 * Opt-in: it only renders inside `UpcomingPricesProvider enabled`, which the
 * logged-in surfaces mount (self-checkout signed in, express checkout). The
 * logged-out pricing page renders the same cards without it, so it shows
 * nothing there. Only in the December pricing phase (usePricingPhase):
 * today's plans, the new plans and from Jan 1 show none.
 *
 * It sits in the cards' existing price-suffix line, so every card in a row
 * gains the same line and prices, notes and CTAs stay level. Gray, never
 * green: the one green line under a price stays the per-unit note or the
 * claimed offer. The figure is the plain Jan price, without the 10% offer.
 * The blue PriceChangeBanner above the page title explains it, same gate.
 */

import * as React from "react"
import { TrendingUp } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { inr } from "@/lib/format"
import { PRICE_CHANGE } from "@/content/price-change"
import { announcesNewPrices } from "@/content/pricing-phase"
import { usePricingPhase } from "@/hooks/use-pricing-phase"

const UpcomingPricesContext = React.createContext(false)

export function UpcomingPricesProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  return <UpcomingPricesContext.Provider value={enabled}>{children}</UpcomingPricesContext.Provider>
}

/** True on a logged-in surface while the new prices are announced. */
export function useUpcomingPrices() {
  const phase = usePricingPhase()
  return React.useContext(UpcomingPricesContext) && announcesNewPrices(phase)
}

/** `price` is the plan's Jan price; a plan without one shows nothing. */
export function UpcomingPriceLine({ price, className }: { price?: number; className?: string }) {
  if (!useUpcomingPrices() || price === undefined) return null
  return (
    <span
      data-slot="upcoming-price-line"
      // No colour of its own: it takes the card's muted text (white cards,
      // inset cards and phone rows each set theirs).
      className={cn("flex items-center gap-1 text-xs not-italic", className)}
    >
      {/* A rising arrow in the warning gold, so the eye finds the change
          (user call, 2026-10-22). The figure stays gray. */}
      <TrendingUp className="size-3.5 shrink-0 text-warning" aria-hidden />
      <span className="whitespace-nowrap">
        <span className="font-medium">{inr(price)}</span> {PRICE_CHANGE.from}
      </span>
    </span>
  )
}

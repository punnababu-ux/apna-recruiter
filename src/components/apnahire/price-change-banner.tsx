"use client"

/**
 * PriceChangeBanner — the notice of the Jan 1, 2027 price change
 * (content/price-change.ts), one banner on every logged-in surface that
 * announces it.
 *
 * The system's information banner in its primary look (AlertBanner `info`,
 * `appearance="primary"`: solid blue, white text; user call, 2026-10-22).
 * It informs, it doesn't sell, so it carries no product colour and no
 * second green CTA. Always the top of the page, and never closable (user
 * call, 2026-10-23). Only in the December pricing phase (usePricingPhase).
 *
 *   <PriceChangeBanner />                  jobs dashboard, above the title:
 *                                          the line and "View plans".
 *   <PriceChangeBanner placement="plans" /> both checkouts, above the title:
 *                                          the line only. It explains the
 *                                          cards' "from Jan 1" lines, so no
 *                                          link to where you are.
 *                                          Signed in only (UpcomingPricesProvider).
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertBanner, TrendingUp } from "@apna/design-system"
import { PRICE_CHANGE, daysUntilPriceChange } from "@/content/price-change"
import { announcesNewPrices } from "@/content/pricing-phase"
import { usePricingPhase } from "@/hooks/use-pricing-phase"
import { useUpcomingPrices } from "@/components/apnahire/upcoming-price-line"

export function PriceChangeBanner({
  placement = "dashboard",
  className,
}: {
  placement?: "dashboard" | "plans"
  className?: string
}) {
  const router = useRouter()
  const announced = announcesNewPrices(usePricingPhase())
  const onPlans = useUpcomingPrices()
  const show = placement === "plans" ? onPlans : announced
  if (!show) return null

  const days = daysUntilPriceChange()
  return (
    <AlertBanner
      variant="info"
      appearance="primary"
      icon={<TrendingUp />}
      title={
        <>
          {PRICE_CHANGE.message}
          {PRICE_CHANGE.showDaysLeft(days) && (
            <span className="whitespace-nowrap font-medium"> {PRICE_CHANGE.daysLeft(days)}.</span>
          )}
        </>
      }
      {...(placement === "dashboard" && {
        action: { label: PRICE_CHANGE.bannerAction, onClick: () => router.push(PRICE_CHANGE.plansHref) },
      })}
      className={className}
    />
  )
}

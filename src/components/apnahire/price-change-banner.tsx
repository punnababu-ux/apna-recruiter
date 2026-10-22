"use client"

/**
 * PriceChangeBanner — the notice of the Jan 1, 2027 price change
 * (content/price-change.ts), one banner on every logged-in surface that
 * announces it.
 *
 * The system's information banner in its primary look (AlertBanner `info`,
 * `appearance="primary"`: solid blue, white text; user call, 2026-10-22).
 * It informs, it doesn't sell, so it carries no product colour and no
 * second green CTA. Always the top of the page. Only in the December
 * pricing phase (usePricingPhase).
 *
 *   <PriceChangeBanner />                  jobs dashboard, above the title:
 *                                          "View plans", dismissible; a
 *                                          dismissed banner comes back once in
 *                                          the last week, then stays closed.
 *   <PriceChangeBanner placement="plans" /> both checkouts, above the title:
 *                                          the line only. It explains the
 *                                          cards' "from Jan 1" lines, so no
 *                                          close and no link to where you are.
 *                                          Signed in only (UpcomingPricesProvider).
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertBanner, TrendingUp } from "@apna/design-system"
import { PRICE_CHANGE, daysUntilPriceChange } from "@/content/price-change"
import { announcesNewPrices } from "@/content/pricing-phase"
import { usePricingPhase } from "@/hooks/use-pricing-phase"
import { useUpcomingPrices } from "@/components/apnahire/upcoming-price-line"

const DISMISSED_KEY = "apnahire:price-change-banner-dismissed"
const DISMISSED_EVENT = "apnahire:price-change-banner"
/** Days before the change when a dismissed banner returns, once. */
const RETURN_WITHIN_DAYS = 7

/** Closed in this visit, for when storage is blocked. */
let closedThisVisit = false

function readDismissed(): boolean {
  if (closedThisVisit) return true
  try {
    const at = Number(window.localStorage.getItem(DISMISSED_KEY))
    if (!at) return false
    // Dismissed before the last week: it returns for it. Inside it: closed.
    return daysUntilPriceChange(new Date(at)) <= RETURN_WITHIN_DAYS || daysUntilPriceChange() > RETURN_WITHIN_DAYS
  } catch {
    return false
  }
}

function useDismissed() {
  return React.useSyncExternalStore(
    (notify) => {
      window.addEventListener(DISMISSED_EVENT, notify)
      window.addEventListener("storage", notify)
      return () => {
        window.removeEventListener(DISMISSED_EVENT, notify)
        window.removeEventListener("storage", notify)
      }
    },
    readDismissed,
    // Server render: hidden, so a dismissed banner never flashes in.
    () => true
  )
}

function dismiss() {
  closedThisVisit = true
  try {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()))
  } catch {
    // Storage blocked: it closes for this visit only.
  }
  window.dispatchEvent(new Event(DISMISSED_EVENT))
}

export function PriceChangeBanner({
  placement = "dashboard",
  className,
}: {
  placement?: "dashboard" | "plans"
  className?: string
}) {
  const router = useRouter()
  const dismissed = useDismissed()
  const announced = announcesNewPrices(usePricingPhase())
  const onPlans = useUpcomingPrices()
  const show = placement === "plans" ? onPlans : !dismissed && announced
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
        onClose: dismiss,
      })}
      className={className}
    />
  )
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Wallet, ChevronRight } from "@apna/design-system"
import { Badge, Button, BackButton } from "@apna/design-system"

import { PricingHero, type PricingTab } from "@/components/apnahire/pricing-hero"
import {
  JobCreditBundles,
  SINGLE_CREDIT,
} from "@/components/apnahire/job-credit-bundles"
import { UnlimitedSideCard } from "@/components/apnahire/unlimited-side-card"
import { CheckoutDrawer, type CartLine } from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PaymentSuccess } from "@/components/apnahire/payment-success"

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

export default function CreditsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<PricingTab>("jobs")

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [checkoutItem, setCheckoutItem] = React.useState<CartLine | null>(null)

  const [paymentOpen, setPaymentOpen] = React.useState(false)
  const [paymentAmount, setPaymentAmount] = React.useState(0)

  const [order, setOrder] = React.useState<{ lines: CartLine[]; total: number; id: string } | null>(
    null
  )

  const handleBuyBundle = (bundle: {
    credits: number
    validDays: number
    price: number
    mrp: number
    discountPct: number
  }) => {
    setCheckoutItem({
      id: `job-${bundle.credits}`,
      label: `${bundle.credits} Job credit${bundle.credits > 1 ? "s" : ""}`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Job plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
    setDrawerOpen(true)
  }

  const handleBuySingleCredit = () => handleBuyBundle(SINGLE_CREDIT)

  const handleBuyUnlimitedQuarterly = () => {
    setCheckoutItem({
      id: "unlimited_quarterly_1",
      label: "Quarterly plan",
      sublabel: "1 active job slot + 600 Database credits + Valid for 90 days",
      price: 5999,
    })
    setDrawerOpen(true)
  }

  const handleProceedToPay = (total: number) => {
    setPaymentAmount(total)
    setDrawerOpen(false)
    setPaymentOpen(true)
  }

  const handlePaymentSuccess = () => {
    setPaymentOpen(false)
    setOrder({
      lines: checkoutItem ? [checkoutItem] : [],
      total: paymentAmount,
      id: randomOrderId(),
    })
  }

  const handlePaymentFailure = () => {
    // Mocked failure — return to the drawer so the user can retry.
    setPaymentOpen(false)
    setDrawerOpen(true)
  }

  if (order) {
    return (
      <PaymentSuccess
        lines={order.lines}
        total={order.total}
        orderId={order.id}
        onSearchCandidates={() => router.push("/apnahire/database/search-candidates")}
        onPostJob={() => router.push("/apnahire/jobs/new")}
      />
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {/* ── Inline top bar (this page has no sidebar/shell — see AGENTS.md
           (wizard)-style standalone route) ── */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6">
        <BackButton
          onClick={() => router.push("/apnahire/dashboard")}
          aria-label="Back to dashboard"
        />
        <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium">
          <Wallet className="size-3.5" aria-hidden />
          Available credits
        </Button>
      </header>

      {/* ── Hero + pricing body share one ambient-gradient canvas ── */}
      <div className="flex-1 bg-gradient-checkout-hero">
        <PricingHero activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="px-4 pb-10 sm:px-8 lg:px-12">
          {activeTab === "jobs" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              {/* Side-by-side comparison — job-credit cards in their own
                  frame on the left, the Unlimited plan card on the right */}
              <div className="flex flex-col items-stretch gap-4 lg:flex-row">
                <JobCreditBundles
                  className="flex-1"
                  onBuyNow={handleBuyBundle}
                  onBuySingleCredit={handleBuySingleCredit}
                />
                <UnlimitedSideCard onBuyNow={handleBuyUnlimitedQuarterly} />
              </div>

              {/* Job-type legend — full-width row below both columns */}
              <div className="px-1 text-xs text-checkout-hero-fg-muted">
                1 credit = 1 classic job · 2 credits = 1 premium job · 4 credits = 1 super
                premium job.{" "}
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 font-semibold text-checkout-hero-fg underline underline-offset-2"
                >
                  Need more info?
                  <ChevronRight className="size-3.5" aria-hidden />
                </button>
              </div>

              <p className="mt-2 text-xs text-checkout-hero-fg-muted">
                * 18% GST will be added at checkout
              </p>
            </div>
          ) : (
            /* Placeholder for other tabs — built in a follow-up pass */
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24 text-center">
              <Badge variant="secondary" className="text-sm">Coming soon</Badge>
              <h2 className="text-h3 font-heading font-semibold text-checkout-hero-fg capitalize">
                {activeTab}
              </h2>
              <p className="text-body text-checkout-hero-fg-muted">
                This section is being built. Switch to the{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("jobs")}
                  className="font-medium text-info underline underline-offset-2"
                >
                  Jobs tab
                </button>{" "}
                to see our credit bundles.
              </p>
            </div>
          )}
        </div>
      </div>

      <CheckoutDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        item={checkoutItem}
        onProceedToPay={handleProceedToPay}
      />

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        itemLabel={checkoutItem?.label ?? "Purchase"}
        amount={paymentAmount}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    </div>
  )
}

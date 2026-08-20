"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Wallet } from "lucide-react"
import { Badge, Button } from "@apna/design-system"

import { PricingHero, type PricingTab } from "@/components/apnahire/pricing-hero"
import {
  JobCreditBundles,
  BUNDLES,
  ADDONS,
  type BundleId,
  type AddonId,
} from "@/components/apnahire/job-credit-bundles"
import { OrderSummary, type OrderLine } from "@/components/apnahire/order-summary"
import { UnlimitedBanner } from "@/components/apnahire/unlimited-banner"

export default function CreditsPage() {
  const [activeTab, setActiveTab] = React.useState<PricingTab>("jobs")
  const [selectedBundle, setSelectedBundle] = React.useState<BundleId>("6")
  const [selectedAddon, setSelectedAddon] = React.useState<AddonId>("50")

  /* Build order summary lines from current selection */
  const bundle = BUNDLES.find((b) => b.id === selectedBundle)!
  const addon = ADDONS.find((a) => a.id === selectedAddon)!

  const orderLines: OrderLine[] = [
    {
      label: `${bundle.credits} Job credits`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
    },
    ...(addon.id !== "none"
      ? [
          {
            label: `${addon.id} Database credits`,
            sublabel: "Valid for 180 days",
            price: addon.price,
          },
        ]
      : []),
  ]

  const handleClear = () => {
    setSelectedBundle("6")
    setSelectedAddon("none")
  }

  return (
    <div className="flex flex-col">
      {/* ── Inline top bar (page-level, not the sidebar TopBar) ── */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/apnahire/jobs"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            aria-label="Back to jobs"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium">
          <Wallet className="size-3.5" aria-hidden />
          Available credits
        </Button>
      </header>

      {/* ── Hero ── */}
      <PricingHero activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Pricing body ── */}
      <div className="bg-muted px-4 py-6 sm:px-8 lg:px-12">
        {activeTab === "jobs" ? (
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
            {/* Left column — wider */}
            <div className="min-w-0 flex-1">
              <JobCreditBundles
                selectedBundle={selectedBundle}
                selectedAddon={selectedAddon}
                onSelectBundle={setSelectedBundle}
                onSelectAddon={setSelectedAddon}
              />

              {/* Unlimited promo */}
              <UnlimitedBanner
                className="mt-4"
                onBuyNow={() => setActiveTab("unlimited")}
              />

              <p className="mt-4 text-xs text-muted-foreground">
                *Prices shown excluding GST.
              </p>
            </div>

            {/* Right column — order summary */}
            <aside className="w-full lg:w-72 xl:w-80">
              <OrderSummary
                lines={orderLines}
                onClear={handleClear}
                onCheckout={(total) => {
                  /* TODO: navigate to checkout */
                  console.log("Checkout total:", total)
                }}
              />
            </aside>
          </div>
        ) : (
          /* Placeholder for other tabs */
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24 text-center">
            <Badge variant="secondary" className="text-sm">Coming soon</Badge>
            <h2 className="text-h3 font-heading font-semibold text-foreground capitalize">
              {activeTab}
            </h2>
            <p className="text-body text-muted-foreground">
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
  )
}

"use client"

/**
 * SelfCheckout — the pricing / self-checkout surface, in both auth states.
 *
 * The same page serves two audiences and Figma draws it twice:
 *
 *  · `logged-in`  → /apnahire/credits — reached from the dashboard. This is
 *    still a standalone route with no shell (no sidebar, no site header —
 *    see AGENTS.md's "standalone route" pattern), so it draws its own inline
 *    product header: a back button, the credits-balance pill, and the
 *    compact tab switcher inside that single bar.
 *  · `logged-out` → /pricing, under the `(marketing)` route group. That
 *    group's layout already supplies `SiteHeader` and `SiteFooter`, so this
 *    component draws neither for that state — it only publishes its compact
 *    tab switcher into the shared header via `useHeaderSlot` (the header
 *    lives above this component in the tree, so the data has to go up, not
 *    down; see `header-slot.tsx`). Figma: 881:11579.
 *
 * Everything else — hero, the four tab bodies, the FAQ / testimonial / trust
 * bands, and the whole checkout → payment → success flow — is identical in
 * both, which is why it lives here once instead of in each route. The auth
 * state only picks the chrome.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { Wallet } from "@apna/design-system"
import { ApnaLogo, Button, BackButton } from "@apna/design-system"
import { cn } from "@/lib/utils"

import {
  PricingHero,
  PRICING_TABS,
  PRICING_TAB_SHORT_LABELS,
  type PricingTab,
} from "@/components/apnahire/pricing-hero"
import { JobCreditBundles, SINGLE_CREDIT } from "@/components/apnahire/job-credit-bundles"
import { DatabaseCreditBundles } from "@/components/apnahire/database-credit-bundles"
import { ContactSalesCard } from "@/components/apnahire/contact-sales-card"
import { SubscriptionPlans } from "@/components/apnahire/subscription-plans"
import { EnterprisePricingTable } from "@/components/apnahire/enterprise-pricing-table"
import { FaqSection } from "@/components/apnahire/faq-section"
import { TrustBar } from "@/components/apnahire/trust-bar"
import { TestimonialGrid } from "@/components/apnahire/testimonial-grid"
import { UnlimitedSideCard } from "@/components/apnahire/unlimited-side-card"
import { CheckoutDrawer, type CartLine } from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { useHeaderSlot } from "@/components/marketing/header-slot"
import { AuthStateSwitcher } from "@/components/apnahire/auth-state-switcher"

export type CheckoutAuthState = "logged-in" | "logged-out"

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

export function SelfCheckout({ authState }: { authState: CheckoutAuthState }) {
  const router = useRouter()
  const isLoggedOut = authState === "logged-out"
  const [activeTab, setActiveTab] = React.useState<PricingTab>("jobs")

  // Sticky header — starts transparent over the gradient hero, turns solid
  // once the page scrolls; the compact tab switcher fades in once the
  // hero's own (full-size) tab switcher scrolls out from under it. Timing
  // and thresholds match the source self-checkout site's header exactly
  // (scrollY > 5, 250ms cubic-bezier(0.16,1,0.3,1)).
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showCompactTabs, setShowCompactTabs] = React.useState(false)
  const heroTabsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 5)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const el = heroTabsRef.current
    if (!el) return
    // Negative top rootMargin ~= sticky header height, so the compact
    // switcher appears exactly when the real one would otherwise be
    // hidden behind it, not only once fully past the viewport edge.
    const observer = new IntersectionObserver(
      ([entry]) => setShowCompactTabs(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Logged-out only: publish the compact tab switcher into the shared
  // SiteHeader (provided by the (marketing) layout above this component).
  // Memoized on activeTab so the published node's identity is stable across
  // unrelated re-renders — useHeaderSlot re-publishes whenever it changes.
  const compactTabSwitcher = React.useMemo(
    () => (
      <div className="flex items-center gap-2 rounded-full border border-border bg-checkout-track p-1">
        {PRICING_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors [&_svg]:size-5",
              activeTab === tab.value
                ? "bg-card text-checkout-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {PRICING_TAB_SHORT_LABELS[tab.value]}
          </button>
        ))}
      </div>
    ),
    [activeTab]
  )
  useHeaderSlot(isLoggedOut ? compactTabSwitcher : null, showCompactTabs)

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

  const handleBuyDatabaseBundle = (bundle: {
    credits: number
    validDays: number
    price: number
    mrp: number
    discountPct: number
  }) => {
    setCheckoutItem({
      id: `db-${bundle.credits}`,
      label: `${bundle.credits} Database credits`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Database plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
    setDrawerOpen(true)
  }

  const handleBuyUnlimitedQuarterly = () => {
    setCheckoutItem({
      id: "unlimited_quarterly_1",
      label: "Quarterly plan",
      sublabel: "1 active job slot + 600 Database credits + Valid for 90 days",
      price: 5999,
    })
    setDrawerOpen(true)
  }

  const handleBuyUnlimitedMonthly = () => {
    setCheckoutItem({
      id: "unlimited_monthly_1",
      label: "Monthly plan",
      sublabel: "1 active job slot + 200 Database credits + Valid for 30 days",
      price: 2499,
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
    <div
      className={cn(
        "flex flex-col",
        // Logged-out renders inside (marketing)/layout.tsx, which already
        // supplies min-h-dvh and this gradient on its own wrapper — doing it
        // again here would just nest two copies of the same canvas.
        !isLoggedOut && "min-h-dvh bg-gradient-checkout-hero"
      )}
    >
      {!isLoggedOut && (
        /* ── Sticky product top bar (this page has no sidebar/shell — see
             AGENTS.md (wizard)-style standalone route) — starts transparent
             over the gradient (which now spans the whole page, not just the
             section below), turns solid on scroll, and grows a compact tab
             switcher once the hero's own switcher scrolls out of view.
             Logged-out has no bar of its own here at all: SiteHeader (from
             the (marketing) layout) is the header, and compactTabSwitcher
             above is published into it rather than rendered here. ── */
        <header
          className={cn(
            "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-standard",
            isScrolled
              ? "border-border bg-card shadow-sm"
              : "border-checkout-track bg-transparent shadow-none"
          )}
        >
          {/* Same gutter + column as the hero and the tab bodies, so the back
              arrow and the credits pill line up with the H1 and the cards
              rather than hugging the viewport edge. */}
          <div className="px-4 sm:px-8 lg:px-12">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
              {/* -ml-2 pulls the 24px glyph flush with the column edge; the
                  remaining gap-1 plus the button's own 8px inset is the 12px
                  Figma measures from glyph edge to logo edge. */}
              <div className="flex flex-1 items-center gap-1">
                <BackButton
                  variant="ghost"
                  onClick={() => router.push("/apnahire/dashboard")}
                  aria-label="Back to dashboard"
                  className="-ml-2 text-checkout-hero-fg"
                />
                <ApnaLogo />
              </div>

              {/* Revealed from lg, not md: with the logo and the full-size
                  credits pill in the row, four chips no longer fit between
                  them at tablet widths. */}
              <div
                className={cn(
                  "hidden items-center gap-1 rounded-full border border-border bg-muted p-1 transition-[opacity,translate] duration-300 ease-standard lg:flex",
                  showCompactTabs
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                )}
              >
                {PRICING_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors [&_svg]:size-5",
                      activeTab === tab.value
                        ? "bg-card text-checkout-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.icon}
                    {PRICING_TAB_SHORT_LABELS[tab.value]}
                  </button>
                ))}
              </div>

              <div className="flex flex-1 justify-end">
                {/* `outline` ships bg-background plus dark: overrides; this
                    surface stays light in both themes and Figma shows no
                    fill, hence the transparent overrides. */}
                <Button
                  variant="outline"
                  className="gap-1 bg-transparent text-checkout-hero-fg-secondary dark:border-border dark:bg-transparent"
                >
                  <Wallet className="size-5" aria-hidden />
                  Available credits
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ── Hero + pricing body share the page-level ambient-gradient canvas ── */}
      <div className="flex-1">
        <PricingHero activeTab={activeTab} onTabChange={setActiveTab} tabsRef={heroTabsRef} />

        <div className="px-4 pb-12 sm:px-8 lg:px-12">
          {activeTab === "jobs" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              <div className="flex flex-col gap-5">
                {/* Side by side only from xl: the 20px price row needs ~219px
                    of card, which three columns plus a 328px side card can't
                    give below that. */}
                <div className="flex flex-col gap-4 xl:flex-row">
                  {/* Each column owns its own caption, so the caption sits
                      under its card rather than spanning both columns. */}
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <JobCreditBundles
                      className="flex-1"
                      onBuyNow={handleBuyBundle}
                      onBuySingleCredit={handleBuySingleCredit}
                    />
                    <p className="text-xs text-checkout-hero-fg">
                      1 job credit = 1 classic job ・ 2 credits = 1 premium job ・ 4
                      credits = 1 super premium job.{" "}
                      <button
                        type="button"
                        className="font-semibold underline underline-offset-2"
                      >
                        Need more info?
                      </button>
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-3 xl:w-82">
                    <UnlimitedSideCard
                      className="flex-1"
                      onBuyNow={handleBuyUnlimitedQuarterly}
                    />
                    <p className="text-xs text-checkout-hero-fg-muted">
                      Note: This plan is valid in a single city.
                    </p>
                  </div>
                </div>

                {/* Both auth states — the updated Jobs frame draws this card
                    on the logged-in page too. */}
                <ContactSalesCard />
              </div>

              <p className="text-xs text-checkout-hero-fg-muted">
                * 18% GST will be added at checkout
              </p>
            </div>
          ) : activeTab === "database" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <div className="flex flex-col gap-3">
                <DatabaseCreditBundles onBuyNow={handleBuyDatabaseBundle} />
                <p className="text-xs text-checkout-hero-fg">
                  1 credit = 1 candidate profile unlock ・ 2 credits = 1 candidate
                  profile export to excel
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <ContactSalesCard />
                <p className="text-xs text-checkout-hero-fg-muted">
                  * 18% GST will be added at checkout
                </p>
              </div>
            </div>
          ) : activeTab === "unlimited" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <SubscriptionPlans
                onBuyMonthly={handleBuyUnlimitedMonthly}
                onBuyQuarterly={handleBuyUnlimitedQuarterly}
              />
              <ContactSalesCard />
            </div>
          ) : (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <EnterprisePricingTable />
            </div>
          )}
        </div>
      </div>

      {/* ── Shared marketing chrome — identical across every tab in Figma
           (Jobs included), so it renders once here rather than being
           duplicated inside each tab's branch above. The bands alternate:
           FAQ and trust bar sit on white, the testimonial band is left
           transparent so the page gradient shows through. ── */}
      <div className="border-t border-border bg-card px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <FaqSection />
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <TestimonialGrid />
        </div>
      </div>

      <div className="bg-card px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <TrustBar />
        </div>
      </div>

      {/* No footer band here for logged-out: (marketing)/layout.tsx already
          renders SiteFooter below this component. The logged-in page ends
          at the trust bar because the product shell owns navigation from
          there — same reasoning, different chrome. */}

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

      {/* Prototype-only affordance for comparing the two Figma states side
          by side without hand-typing URLs — never meant to ship. */}
      {process.env.NODE_ENV !== "production" && <AuthStateSwitcher current={authState} />}
    </div>
  )
}

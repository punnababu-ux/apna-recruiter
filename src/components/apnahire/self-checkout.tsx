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
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { GstNote } from "@/components/apnahire/gst-note"

import {
  PricingHero,
  PRICING_TABS,
  PRICING_TAB_SHORT_LABELS,
  type PricingTab,
} from "@/components/apnahire/pricing-hero"
import { Button } from "@apna/design-system"
import {
  JobCreditBundles,
  SINGLE_CREDIT,
  BUNDLES,
  type Bundle,
} from "@/components/apnahire/job-credit-bundles"
import {
  DatabaseCreditBundles,
  DB_BUNDLES,
  type DbBundle,
} from "@/components/apnahire/database-credit-bundles"
import { ContactSalesCard } from "@/components/apnahire/contact-sales-card"
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlans,
  type SubscriptionPlanId,
} from "@/components/apnahire/subscription-plans"
import {
  DEFAULT_ENTERPRISE_TIER,
  EnterprisePricingTable,
} from "@/components/apnahire/enterprise-pricing-table"
import { FaqSection } from "@/components/apnahire/faq-section"
import { TrustBar } from "@/components/apnahire/trust-bar"
import { TestimonialGrid } from "@/components/apnahire/testimonial-grid"
import { UnlimitedSideCard } from "@/components/apnahire/unlimited-side-card"
import { CheckoutTopBar } from "@/components/apnahire/checkout-top-bar"
import {
  CheckoutDrawer,
  type CartLine,
  type SubscriptionPaymentMethod,
} from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { useHeaderSlot } from "@/components/marketing/header-slot"
import { AuthStateSwitcher } from "@/components/apnahire/auth-state-switcher"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { useExtraOff } from "@/components/apnahire/offers/use-extra-off"
import { ANNUAL_PLAN, EXTRA_OFF, withExtraOff } from "@/content/offers"

export type CheckoutAuthState = "logged-in" | "logged-out"

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

type SelectedPackage =
  | { kind: "job"; bundle: Bundle }
  | { kind: "db"; bundle: DbBundle }

export function SelfCheckout({ authState }: { authState: CheckoutAuthState }) {
  const router = useRouter()
  const isLoggedOut = authState === "logged-out"
  const [activeTab, setActiveTab] = React.useState<PricingTab>("jobs")
  const [selectedPackage, setSelectedPackage] = React.useState<SelectedPackage>({
    kind: "job",
    bundle: BUNDLES[1],
  })

  // The mobile sticky CTA buys whatever is selected on the current tab, so
  // switching between Jobs and Database pre-selects that tab's recommended
  // bundle — the button never offers job credits on the Database tab.
  const changeTab = React.useCallback((tab: PricingTab) => {
    setActiveTab(tab)
    setSelectedPackage((current) => {
      if (tab === "database" && current.kind !== "db") return { kind: "db", bundle: DB_BUNDLES[1] }
      if (tab === "jobs" && current.kind === "db") return { kind: "job", bundle: BUNDLES[1] }
      return current
    })
  }, [])
  // Phones: every tab is a radio list with one sticky CTA for its selection.
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<SubscriptionPlanId>("quarterly")
  const [enterpriseTier, setEnterpriseTier] = React.useState(DEFAULT_ENTERPRISE_TIER)

  // Sticky header — starts transparent over the gradient hero, turns solid
  // once the page scrolls; the compact tab switcher fades in once the
  // hero's own (full-size) tab switcher scrolls out from under it. Timing
  // and thresholds match the source self-checkout site's header exactly
  // (scrollY > 5, 250ms cubic-bezier(0.16,1,0.3,1)).
  const [showCompactTabs, setShowCompactTabs] = React.useState(false)
  const heroTabsRef = React.useRef<HTMLDivElement>(null)

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
            onClick={() => changeTab(tab.value)}
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
    [activeTab, changeTab]
  )
  useHeaderSlot(isLoggedOut ? compactTabSwitcher : null, showCompactTabs)

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [checkoutItem, setCheckoutItem] = React.useState<CartLine | null>(null)

  const [paymentOpen, setPaymentOpen] = React.useState(false)
  const [paymentAmount, setPaymentAmount] = React.useState(0)
  // Non-null only for subscriptions: the mandate method already chosen in the
  // drawer, which the payment step shows read-only instead of re-asking.
  const [mandateMethod, setMandateMethod] =
    React.useState<SubscriptionPaymentMethod | null>(null)

  const [order, setOrder] = React.useState<{ lines: CartLine[]; total: number; id: string } | null>(
    null
  )

  // Exit loop (Figma 2525:23488). Self-checkout has no upsells (product
  // decision): every Buy goes straight to the order summary.
  const offer = useExtraOff()
  const [exitPrompt, setExitPrompt] = React.useState<{ proceed: () => void } | null>(null)

  // Leaving (the top bar's back button, closing the order summary) goes
  // through the exit nudge first, until the offer is claimed or turned down.
  const attemptExit = (proceed: () => void) => {
    if (offer.nudgeAvailable) setExitPrompt({ proceed })
    else proceed()
  }

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

  const shownPrice = (n: number) =>
    `₹${(offer.claimed ? withExtraOff(n) : n).toLocaleString("en-IN")}`
  const stickyCtaLabel =
    activeTab === "enterprise"
      ? "Contact sales"
      : activeTab === "unlimited"
        ? `Buy ${subscriptionPlan} plan • ${shownPrice(SUBSCRIPTION_PLANS[subscriptionPlan].price)}`
        : selectedPackage.kind === "job"
          ? `Buy ${selectedPackage.bundle.credits} job credits • ${shownPrice(selectedPackage.bundle.price)}`
          : `Buy ${selectedPackage.bundle.credits} database credits • ${shownPrice(selectedPackage.bundle.price)}`

  const handleStickyCtaClick = () => {
    if (activeTab === "unlimited") {
      if (subscriptionPlan === "monthly") handleBuyUnlimitedMonthly()
      else if (subscriptionPlan === "annual") handleBuyUnlimitedAnnual()
      else handleBuyUnlimitedQuarterly()
    } else if (activeTab === "enterprise") {
      // Figma defines no destination for "Contact sales" (the desktop
      // cards' buttons are inert too).
    } else if (selectedPackage.kind === "job") {
      handleBuyBundle(selectedPackage.bundle)
    } else {
      handleBuyDatabaseBundle(selectedPackage.bundle)
    }
  }

  // `renewAfterDays` is what switches the drawer into its subscription
  // variant, and what the renewal date is computed from. The parenthesised
  // sublabel is verbatim from the drawer's own frames (1236:22188).
  const handleBuyUnlimitedQuarterly = () => {
    setCheckoutItem({
      id: "unlimited_quarterly_1",
      label: "Quarterly plan",
      sublabel: "(1 active job slot + 600 Database credits + Valid for 90 days)",
      price: 5999,
      renewAfterDays: 90,
    })
    setDrawerOpen(true)
  }

  const handleBuyUnlimitedAnnual = () => {
    setCheckoutItem({
      id: "unlimited_annual_1",
      label: "Annual plan",
      sublabel: `(1 active job slot + ${ANNUAL_PLAN.dbCredits.toLocaleString("en-IN")} Database credits + Valid for ${ANNUAL_PLAN.slotDays} days)`,
      price: ANNUAL_PLAN.price,
      mrp: ANNUAL_PLAN.mrp,
      renewAfterDays: ANNUAL_PLAN.slotDays,
    })
    setDrawerOpen(true)
  }

  const handleBuyUnlimitedMonthly = () => {
    setCheckoutItem({
      id: "unlimited_monthly_1",
      label: "Monthly plan",
      sublabel: "(1 active job slot + 200 Database credits + Valid for 30 days)",
      price: 2499,
      renewAfterDays: 30,
    })
    setDrawerOpen(true)
  }

  const handleProceedToPay = (
    total: number,
    _lines: CartLine[],
    method?: SubscriptionPaymentMethod
  ) => {
    setPaymentAmount(total)
    // Subscriptions carry their mandate method from the drawer, so the payment
    // step must not ask again — it is handed straight to the gateway.
    setMandateMethod(method ?? null)
    setDrawerOpen(false)
    setPaymentOpen(true)
  }

  const handlePaymentSuccess = () => {
    setPaymentOpen(false)
    // The 10% offer is single-use.
    offer.expire()
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
        <CheckoutTopBar
          onBack={() => attemptExit(() => router.push("/apnahire/dashboard"))}
          backLabel="Back to dashboard"
          showCenter={showCompactTabs}
          // Revealed from lg, not md: with the logo and the full-size
          // credits pill in the row, four chips no longer fit between
          // them at tablet widths.
          center={
            <div className="hidden items-center gap-1 rounded-full border border-border bg-muted p-1 lg:flex">
              {PRICING_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => changeTab(tab.value)}
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
          }
        />
      )}

      {/* ── Hero + pricing body share the page-level ambient-gradient canvas ── */}
      <div className="flex-1">
        <PricingHero activeTab={activeTab} onTabChange={changeTab} tabsRef={heroTabsRef} />

        <div className={"px-4 pb-28 sm:px-8 md:pb-12 lg:px-12"}>
          {activeTab === "jobs" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              <div className="flex flex-col gap-5">
                {/* Desktop: side by side from xl. The mobile/desktop split is at
                    md everywhere on this page (hero switcher, bundle lists,
                    sticky CTA) so 640–767px gets one consistent layout. */}
                <div className="hidden md:flex md:flex-col md:gap-4 xl:flex-row">
                  {/* Each column owns its own caption, so the caption sits
                      under its card rather than spanning both columns. */}
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <JobCreditBundles
                      extraOff={offer.claimed}
                      className="flex-1"
                      onBuyNow={handleBuyBundle}
                      onBuySingleCredit={handleBuySingleCredit}
                      selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : undefined}
                      onSelectBundle={(bundle) => setSelectedPackage({ kind: "job", bundle })}
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
                      extraOff={offer.claimed}
                      className="flex-1"
                      onBuyNow={handleBuyUnlimitedQuarterly}
                    />
                    <p className="hidden text-xs text-checkout-hero-fg-muted md:block">
                      Note: This plan is valid in a single city.
                    </p>
                  </div>
                </div>

                {/* Mobile: tap-to-select job bundles + the sticky CTA. Database
                    credits live on their own tab, as on desktop. */}
                <div className="flex flex-col gap-4 md:hidden">
                  {/* 1. Job credits section */}
                  <div className="flex flex-col gap-3">
                    <JobCreditBundles
                      extraOff={offer.claimed}
                      onBuyNow={handleBuyBundle}
                      onBuySingleCredit={handleBuySingleCredit}
                      selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : undefined}
                      onSelectBundle={(bundle) => setSelectedPackage({ kind: "job", bundle })}
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

                  {/* 2. apna Unlimited Inset Card */}
                  <UnlimitedSideCard extraOff={offer.claimed} onBuyNow={handleBuyUnlimitedQuarterly} />
                </div>

                {/* Both auth states — the updated Jobs frame draws this card
                    on the logged-in page too. */}
                <ContactSalesCard />
              </div>

              <GstNote />
            </div>
          ) : activeTab === "database" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <div className="flex flex-col gap-3">
                <DatabaseCreditBundles
                  extraOff={offer.claimed}
                  onBuyNow={handleBuyDatabaseBundle}
                  selectedBundleId={selectedPackage.kind === "db" ? selectedPackage.bundle.id : undefined}
                  onSelectBundle={(bundle) => setSelectedPackage({ kind: "db", bundle })}
                />
                <p className="text-xs text-checkout-hero-fg">
                  1 credit = 1 candidate profile unlock ・ 2 credits = 1 candidate
                  profile export to excel
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <ContactSalesCard />
                <GstNote />
              </div>
            </div>
          ) : activeTab === "unlimited" ? (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <SubscriptionPlans
                extraOff={offer.claimed}
                selectedPlan={subscriptionPlan}
                onSelectPlan={setSubscriptionPlan}
                onBuyMonthly={handleBuyUnlimitedMonthly}
                onBuyQuarterly={handleBuyUnlimitedQuarterly}
                onBuyAnnual={handleBuyUnlimitedAnnual}
              />
              {/* Phones: GST under the Contact sales card, as on the Database
                  tab. Desktop keeps it beside the single-city note above. */}
              <div className="flex flex-col gap-3">
                <ContactSalesCard />
                <GstNote className="md:hidden" />
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <EnterprisePricingTable selectedTier={enterpriseTier} onSelectTier={setEnterpriseTier} />
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

      {/* Mobile sticky bottom CTA dock: buys the current tab's selection
          (Enterprise: Contact sales). Prices carry the claimed offer, as the
          rows above do. */}
      <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-card/95 p-3.5 pb-safe-3.5 backdrop-blur-md md:hidden">
        <Button
          type="button"
          variant="checkout"
          size="lg"
          className="h-12 w-full rounded-full text-base font-semibold shadow-md"
          onClick={handleStickyCtaClick}
        >
          {stickyCtaLabel}
        </Button>
      </div>

      <CheckoutDrawer
        open={drawerOpen}
        onOpenChange={(next) => (next ? setDrawerOpen(true) : attemptExit(() => setDrawerOpen(false)))}
        item={checkoutItem}
        onProceedToPay={handleProceedToPay}
        extraOffer={offer.deadline ? { code: EXTRA_OFF.code, deadline: offer.deadline } : undefined}
        onExtraOfferExpired={offer.expire}
      />

      <ExitOfferDialog
        open={exitPrompt !== null}
        onDismiss={() => setExitPrompt(null)}
        onDecline={() => {
          const proceed = exitPrompt?.proceed
          offer.dismiss()
          setExitPrompt(null)
          proceed?.()
        }}
        onClaim={(deadline) => {
          offer.claim(deadline)
          setExitPrompt(null)
          toast.success("10% extra off applied", { description: "Valid for 24 hours on any plan." })
        }}
      />

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        itemLabel={checkoutItem?.label ?? "Purchase"}
        amount={paymentAmount}
        mandateMethod={mandateMethod}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />

      {/* Prototype-only settings: auth state and the exit offer's demo
          controls. Shown in every build, deployed ones included, like
          express checkout's switcher, so the states can be reviewed on the
          live site. Remove once real auth and offer rules are wired up. */}
      <AuthStateSwitcher
        current={authState}
        offer={{ claimed: offer.claimed, onExpireSoon: offer.expireSoon, onReset: offer.reset }}
      />
    </div>
  )
}

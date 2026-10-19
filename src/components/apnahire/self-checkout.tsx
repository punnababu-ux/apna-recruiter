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
import { cn } from "@/lib/utils"
import { GstNote } from "@/components/apnahire/gst-note"

import {
  PricingHero,
  PRICING_TABS,
  PRICING_TAB_SHORT_LABELS,
  type PricingTab,
} from "@/components/apnahire/pricing-hero"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { PRICING_INTRO } from "@/content/pricing"
import { Button, SegmentedTabSwitcher, StickyCtaBar, Tabs, TabsList, TabsTrigger } from "@apna/design-system"
import {
  JobCreditBundles,
  SINGLE_CREDIT,
  BUNDLES,
  type Bundle,
  UPSELL_PACK_22,
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
import { FaqBand, TrustedByBand, WhyHireBand } from "@/components/marketing/proof-bands"
import { PRICING_STATS } from "@/content/home"
import { UnlimitedSideCard } from "@/components/apnahire/unlimited-side-card"
import {
  AnnualUpgradeDialog,
  CreditPackOfferDialog,
  CreditsToPlanDialog,
} from "@/components/apnahire/offers/upsell-dialogs"
import { CheckoutTopBar } from "@/components/apnahire/checkout-top-bar"
import { HOME } from "@/lib/apnahire/nav"
import { useSession } from "@/hooks/use-session"
import {
  CheckoutDrawer,
  type CartLine,
  type SubscriptionPaymentMethod,
} from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { setActiveSubscription } from "@/hooks/use-active-subscription"
import { useHeaderSlot } from "@/components/marketing/header-slot"
import { CheckoutPreviewSettings } from "@/components/apnahire/checkout-preview-settings"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { useExtraOff } from "@/components/apnahire/offers/use-extra-off"
import { ANNUAL_PLAN, EXTRA_OFF, withExtraOff } from "@/content/offers"
import { useIsMobile } from "@/hooks/use-mobile"
import { inr, num } from "@/lib/format"

/** The Jobs tab's apna Unlimited card sells the monthly plan (user call,
 *  2026-10-19), not the quarterly one. */
const MONTHLY_SIDE_CARD = {
  price: SUBSCRIPTION_PLANS.monthly.price,
  monthlyPrice: SUBSCRIPTION_PLANS.monthly.price,
  jobSlotMonths: SUBSCRIPTION_PLANS.monthly.months,
  dbCredits: SUBSCRIPTION_PLANS.monthly.dbCredits,
  dbCreditsWorth: SUBSCRIPTION_PLANS.monthly.dbWorth,
}

/** The bundle the 22-credit pack is offered against. */
const BUNDLE_13 = BUNDLES.find((b) => b.credits === 13)

export type CheckoutAuthState = "logged-in" | "logged-out"

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

type SelectedPackage =
  | { kind: "job"; bundle: Bundle }
  | { kind: "db"; bundle: DbBundle }

/** A signed-out "Proceed to pay": what was being bought, kept across the
 *  login steps so the logged-in Plans page can reopen the same order. */
const PENDING_CHECKOUT_KEY = "apnahire:pending-checkout"
type PendingCheckout = {
  tab: PricingTab
  item: CartLine
  selectedPackage: SelectedPackage
  subscriptionPlan: SubscriptionPlanId
}

const ACTIVE_TAB_STORAGE_KEY = "apnahire:active-pricing-tab"

function parsePricingTab(raw: string | null | undefined): PricingTab | null {
  if (!raw) return null
  const normalized = raw.trim().toLowerCase()
  if (normalized === "jobs") return "jobs"
  if (normalized === "database") return "database"
  if (normalized === "unlimited" || normalized === "subscription") return "unlimited"
  if (normalized === "enterprise") return "enterprise"
  return null
}

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
  const changeTab = React.useCallback((tab: PricingTab, updateUrl = true) => {
    setActiveTab(tab)
    setSelectedPackage((current) => {
      if (tab === "database" && current.kind !== "db") return { kind: "db", bundle: DB_BUNDLES[1] }
      if (tab === "jobs" && current.kind === "db") return { kind: "job", bundle: BUNDLES[1] }
      return current
    })

    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, tab)
      } catch {
        // Storage blocked / quota exceeded
      }
      if (updateUrl) {
        try {
          const url = new URL(window.location.href)
          if (tab === "jobs") {
            url.searchParams.delete("tab")
          } else {
            url.searchParams.set("tab", tab)
          }
          window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)
        } catch {
          // Ignore invalid URL
        }
      }
    }
  }, [])

  // Restore tab on mount (from ?tab= URL param or sessionStorage).
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const urlTab = parsePricingTab(params.get("tab"))
    if (urlTab) {
      changeTab(urlTab, false)
      return
    }
    try {
      const stored = parsePricingTab(window.sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY))
      if (stored) {
        changeTab(stored, true)
      }
    } catch {
      // Storage blocked
    }
  }, [changeTab])

  // Sync tab on browser Back/Forward navigation.
  React.useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search)
      const tab = parsePricingTab(params.get("tab")) ?? "jobs"
      changeTab(tab, false)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [changeTab])
  // Phones: every tab is a radio list with one sticky CTA for its selection.
  // Annual: the recommended plan, selected first on phones.
  const [subscriptionPlan, setSubscriptionPlan] = React.useState<SubscriptionPlanId>("annual")
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
    // Logged out it sits under the marketing pill header (72px); logged in,
    // under the product top bar (64px).
    const observer = new IntersectionObserver(
      ([entry]) => setShowCompactTabs(!entry.isIntersecting),
      { rootMargin: isLoggedOut ? "-72px 0px 0px 0px" : "-64px 0px 0px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isLoggedOut])

  // Logged-out only: publish the compact tab switcher into the shared
  // SiteHeader (provided by the (marketing) layout above this component).
  // Memoized on activeTab so the published node's identity is stable across
  // unrelated re-renders — useHeaderSlot re-publishes whenever it changes.
  const compactTabSwitcher = React.useMemo(
    () => (
      <DockedPlanTabs value={activeTab} onValueChange={changeTab} />
    ),
    [activeTab, changeTab]
  )
  useHeaderSlot(isLoggedOut ? compactTabSwitcher : null, showCompactTabs)

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [checkoutItem, setCheckoutItem] = React.useState<CartLine | null>(null)
  const session = useSession()

  // Back from login with an order in hand: reopen it.
  React.useEffect(() => {
    if (isLoggedOut) return
    let pending: PendingCheckout | null = null
    try {
      const raw = window.sessionStorage.getItem(PENDING_CHECKOUT_KEY)
      window.sessionStorage.removeItem(PENDING_CHECKOUT_KEY)
      pending = raw ? (JSON.parse(raw) as PendingCheckout) : null
    } catch {
      pending = null
    }
    if (!pending) return
    setActiveTab(pending.tab)
    setSelectedPackage(pending.selectedPackage)
    setSubscriptionPlan(pending.subscriptionPlan)
    setCheckoutItem(pending.item)
    setDrawerOpen(true)
  }, [isLoggedOut])

  const [paymentOpen, setPaymentOpen] = React.useState(false)
  const [paymentAmount, setPaymentAmount] = React.useState(0)
  // Non-null only for subscriptions: the mandate method already chosen in the
  // drawer, which the payment step shows read-only instead of re-asking.
  const [mandateMethod, setMandateMethod] =
    React.useState<SubscriptionPaymentMethod | null>(null)

  const [order, setOrder] = React.useState<{ lines: CartLine[]; total: number; id: string } | null>(
    null
  )

  // Exit loop (Figma 2525:23488).
  const offer = useExtraOff()
  // Upsells (user call, 2026-10-19), the express checkout's pop-ups: the
  // 13-credit bundle offers 22 credits for ₹9,999; the monthly subscription
  // offers the annual plan. Every other Buy goes straight to the summary.
  // 3 credits → the monthly plan (phones), as CreditsToPlanDialog.
  const [upsell, setUpsell] = React.useState<"pack" | "annual" | "plan" | null>(null)
  const isMobile = useIsMobile()
  // Upsells only for a signed-in recruiter on the Plans page (user call,
  // 2026-10-19); signed out (/pricing), every Buy goes straight on.
  const upsellsOn = !isLoggedOut
  const [planUpsell, setPlanUpsell] = React.useState<{ bundle: Bundle; plan: "monthly" | "quarterly" } | null>(null)
  const [exitPrompt, setExitPrompt] = React.useState<{ proceed: () => void } | null>(null)

  // Leaving (the top bar's back button, closing the order summary) goes
  // through the exit nudge first, until the offer is claimed or turned down.
  const attemptExit = (proceed: () => void) => {
    if (offer.nudgeAvailable) setExitPrompt({ proceed })
    else proceed()
  }

  // Nothing is bought signed out. On the logged-out page (/pricing) a Buy
  // goes straight to login, carrying the order: back on the logged-in Plans
  // page the order summary reopens with it (the effect above). Signed in,
  // a Buy opens the order summary.
  const goToLoginWith = (item: CartLine) => {
    const pending: PendingCheckout = { tab: activeTab, item, selectedPackage, subscriptionPlan }
    try {
      window.sessionStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(pending))
    } catch {
      // Storage blocked: they land on Plans and pick again.
    }
    router.push(`/login?${new URLSearchParams({ next: "/apnahire/credits" })}`)
  }
  const openOrder = (item: CartLine) => {
    if (isLoggedOut && !session) {
      goToLoginWith(item)
      return
    }
    setCheckoutItem(item)
    setDrawerOpen(true)
  }

  const handleBuyBundle = (bundle: {
    credits: number
    validDays: number
    price: number
    mrp: number
    discountPct: number
  }) => {
    openOrder({
      id: `job-${bundle.credits}`,
      label: `${bundle.credits} Job credit${bundle.credits > 1 ? "s" : ""}`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Job plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
  }

  const handleBuySingleCredit = () => handleBuyBundle(SINGLE_CREDIT)

  // A job bundle's Buy: the biggest bundle (13) offers the 22-credit pack.
  const BIGGEST_BUNDLE = 13
  // Phones only (user call, 2026-10-19): there the Unlimited card sits
  // below the bundles, out of the first view; on desktop it's right beside
  // them, so the 3/6-credit buys go straight to the summary.
  // 3 credits → monthly only; the 6-credit upsell was dropped (user call,
  // 2026-10-19).
  const PLAN_FOR_BUNDLE: Record<number, "monthly" | "quarterly"> = { 3: "monthly" }
  const handleSelectBundle = (bundle: Parameters<typeof handleBuyBundle>[0]) => {
    const plan = isMobile ? PLAN_FOR_BUNDLE[bundle.credits] : undefined
    const full = BUNDLES.find((b) => b.credits === bundle.credits)
    if (!upsellsOn) handleBuyBundle(bundle)
    else if (bundle.credits === BIGGEST_BUNDLE) setUpsell("pack")
    else if (plan && full) {
      setPlanUpsell({ bundle: full, plan })
      setUpsell("plan")
    } else handleBuyBundle(bundle)
  }
  // The monthly plan: the annual upgrade first, when upsells are on.
  const buyMonthly = () => (upsellsOn ? setUpsell("annual") : handleBuyUnlimitedMonthly())
  const buyPack22 = () =>
    openOrder({
      id: `job-${UPSELL_PACK_22.credits}`,
      label: `${UPSELL_PACK_22.credits} Job credits`,
      price: UPSELL_PACK_22.price,
      mrp: UPSELL_PACK_22.mrp,
      discountLabel: `Job plan discount (${Math.round((1 - UPSELL_PACK_22.price / UPSELL_PACK_22.mrp) * 100)}% OFF)`,
      discountAmount: UPSELL_PACK_22.mrp - UPSELL_PACK_22.price,
    })

  const handleBuyDatabaseBundle = (bundle: {
    credits: number
    validDays: number
    price: number
    mrp: number
    discountPct: number
  }) => {
    openOrder({
      id: `db-${bundle.credits}`,
      label: `${bundle.credits} Database credits`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Database plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
  }

  const shownPrice = (n: number) =>
    inr((offer.claimed ? withExtraOff(n) : n))
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
      if (subscriptionPlan === "monthly") buyMonthly()
      else if (subscriptionPlan === "annual") handleBuyUnlimitedAnnual()
      else handleBuyUnlimitedQuarterly()
    } else if (activeTab === "enterprise") {
      // Figma defines no destination for "Contact sales" (the desktop
      // cards' buttons are inert too).
    } else if (selectedPackage.kind === "job") {
      handleSelectBundle(selectedPackage.bundle)
    } else {
      handleBuyDatabaseBundle(selectedPackage.bundle)
    }
  }

  // `renewAfterDays` is what switches the drawer into its subscription
  // variant, and what the renewal date is computed from. The parenthesised
  // sublabel is verbatim from the drawer's own frames (1236:22188).
  const handleBuyUnlimitedQuarterly = () => {
    openOrder({
      id: "unlimited_quarterly_1",
      label: "Unlimited quarterly plan",
      points: ["1 Active job slot for 3 months", "600 database credits worth ₹6,000", "Valid in a single city"],
      price: 5999,
      renewAfterDays: 90,
    })
  }

  const handleBuyUnlimitedAnnual = () => {
    openOrder({
      id: "unlimited_annual_1",
      label: "Unlimited annual plan",
      points: [
        `1 Active job slot for ${ANNUAL_PLAN.months} months`,
        `${num(ANNUAL_PLAN.dbCredits)} database credits worth ${inr(ANNUAL_PLAN.dbCreditsWorth)}`,
        "Valid in a single city",
      ],
      price: ANNUAL_PLAN.price,
      mrp: ANNUAL_PLAN.mrp,
      renewAfterDays: ANNUAL_PLAN.slotDays,
    })
  }

  const handleBuyUnlimitedMonthly = () => {
    openOrder({
      id: "unlimited_monthly_1",
      label: "Unlimited monthly plan",
      points: ["1 Active job slot for 1 month", "200 database credits worth ₹2,000", "Valid in a single city"],
      price: 2499,
      renewAfterDays: 30,
    })
  }

  const handleProceedToPay = (
    total: number,
    _lines: CartLine[],
    method?: SubscriptionPaymentMethod
  ) => {
    // Nothing is bought signed out: keep the order, log in, come back to the
    // logged-in Plans page with this order summary open again.
    // Belt and braces — a signed-out Buy already went to login (openOrder).
    // Navigate with the summary still open: closing it first would pop its
    // Back entry (useBackToClose) and undo this navigation.
    if (isLoggedOut && !session && checkoutItem) {
      goToLoginWith(checkoutItem)
      return
    }
    setPaymentAmount(total)
    // Subscriptions carry their mandate method from the drawer, so the payment
    // step must not ask again — it is handed straight to the gateway.
    setMandateMethod(method ?? null)
    setDrawerOpen(false)
    setPaymentOpen(true)
  }

  const handlePaymentSuccess = () => {
    setPaymentOpen(false)
    // A subscription bought here makes the sidebar's plan CTA "Manage plans".
    if (checkoutItem?.renewAfterDays) setActiveSubscription(true)
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
          title="Plans"
          // Home, like every other page's Back (lib/apnahire/nav).
          onBack={() => attemptExit(() => router.push(HOME))}
          backLabel="Back to jobs"
          showCenter={showCompactTabs}
          // Revealed from lg, not md: with the title and the full-size
          // credits pill in the row, four tabs no longer fit between
          // them at tablet widths.
          center={
            <CompactPlanTabs className="hidden lg:flex" value={activeTab} onValueChange={changeTab} />
          }
        />
      )}
      {!isLoggedOut && (
        /* Below lg the bar has no room for the tabs, so they dock as a strip
           under it once the hero's row scrolls away. A zero-height sticky
           anchor (no space in the layout) carrying the strip, so nothing
           shifts when it appears. */
        <div className="sticky top-16 z-sticky h-0 lg:hidden">
          <div
            inert={!showCompactTabs}
            className={cn(
              "absolute inset-x-0 top-0 flex h-16 items-center no-scrollbar overflow-x-auto border-b border-border bg-card/95 px-4 shadow-card backdrop-blur-xl transition-interactive duration-enter ease-out-ui",
              showCompactTabs ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            )}
          >
            <DockedPlanTabs value={activeTab} onValueChange={changeTab} />
          </div>
        </div>
      )}

      {/* ── Hero + pricing body share the page-level ambient-gradient canvas,
           with the homepage hero's living background (HeroBackdrop) moving
           over it, logged in and out alike. ── */}
      <div className="relative isolate flex-1">
        <HeroBackdrop />
        <PricingHero
          activeTab={activeTab}
          onTabChange={changeTab}
          tabsRef={heroTabsRef}
          intro={isLoggedOut ? PRICING_INTRO : undefined}
        />

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
                      onBuyNow={handleSelectBundle}
                      onBuySingleCredit={handleBuySingleCredit}
                      selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : undefined}
                      onSelectBundle={(bundle) => setSelectedPackage({ kind: "job", bundle })}
                    />
                    <p className="text-xs text-checkout-hero-fg">
                      1 job credit = 1 classic job ・ 2 credits = 1 premium job ・ 4
                      credits = 1 super premium job.{" "}
                      <Button type="button" variant="link-inline" size="sm" className="font-semibold">
                        Need more info?
                      </Button>
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-3 xl:w-82">
                    <UnlimitedSideCard
                      extraOff={offer.claimed}
                      className="flex-1"
                      {...MONTHLY_SIDE_CARD}
                      onBuyNow={buyMonthly}
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
                      onBuyNow={handleSelectBundle}
                      onBuySingleCredit={handleBuySingleCredit}
                      selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : undefined}
                      onSelectBundle={(bundle) => setSelectedPackage({ kind: "job", bundle })}
                    />
                    <p className="text-xs text-checkout-hero-fg">
                      1 job credit = 1 classic job ・ 2 credits = 1 premium job ・ 4
                      credits = 1 super premium job.{" "}
                      <Button type="button" variant="link-inline" size="sm" className="font-semibold">
                        Need more info?
                      </Button>
                    </p>
                  </div>

                  {/* 2. apna Unlimited Inset Card */}
                  <UnlimitedSideCard {...MONTHLY_SIDE_CARD} extraOff={offer.claimed} onBuyNow={buyMonthly} />
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
                onBuyMonthly={buyMonthly}
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
           duplicated inside each tab's branch above. The homepage's
           bands, in pricing's order: the FAQ first (white), why hire from
           apna — numbers and quotes (gradient), trusted by (white, last). ── */}
      <FaqBand />
      <WhyHireBand stats={PRICING_STATS} />
      <TrustedByBand />

      {/* No footer band here for logged-out: (marketing)/layout.tsx already
          renders SiteFooter below this component. The logged-in page ends
          at the trust bar because the product shell owns navigation from
          there — same reasoning, different chrome. */}

      {/* Mobile sticky bottom CTA dock: buys the current tab's selection
          (Enterprise: Contact sales). Prices carry the claimed offer, as the
          rows above do. */}
      <StickyCtaBar>
        <Button type="button" variant="checkout" size="xl" onClick={handleStickyCtaClick}>
          {stickyCtaLabel}
        </Button>
      </StickyCtaBar>

      <CheckoutDrawer
        open={drawerOpen}
        onOpenChange={(next) => (next ? setDrawerOpen(true) : attemptExit(() => setDrawerOpen(false)))}
        item={checkoutItem}
        onProceedToPay={handleProceedToPay}
        extraOffer={offer.deadline ? { code: EXTRA_OFF.code, deadline: offer.deadline } : undefined}
        onExtraOfferExpired={offer.expire}
      />

      <CreditPackOfferDialog
        open={upsell === "pack"}
        need={BUNDLE_13 ? { credits: BUNDLE_13.credits, price: BUNDLE_13.price, mrp: BUNDLE_13.mrp } : null}
        pack={UPSELL_PACK_22}
        needNote={BUNDLE_13 ? `Valid for ${BUNDLE_13.validDays} days` : undefined}
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => {
          setUpsell(null)
          if (BUNDLE_13) handleBuyBundle(BUNDLE_13)
        }}
        onTake={() => {
          setUpsell(null)
          buyPack22()
        }}
      />

      <CreditsToPlanDialog
        open={upsell === "plan"}
        bundle={planUpsell?.bundle ?? null}
        plan={
          planUpsell
            ? {
                label: `${SUBSCRIPTION_PLANS[planUpsell.plan].title} plan`,
                price: SUBSCRIPTION_PLANS[planUpsell.plan].price,
                months: SUBSCRIPTION_PLANS[planUpsell.plan].months,
                dbCredits: SUBSCRIPTION_PLANS[planUpsell.plan].dbCredits,
                dbWorth: SUBSCRIPTION_PLANS[planUpsell.plan].dbWorth,
              }
            : null
        }
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => {
          setUpsell(null)
          if (planUpsell) handleBuyBundle(planUpsell.bundle)
        }}
        onTake={() => {
          setUpsell(null)
          if (planUpsell?.plan === "monthly") handleBuyUnlimitedMonthly()
          else handleBuyUnlimitedQuarterly()
        }}
      />

      <AnnualUpgradeDialog
        open={upsell === "annual"}
        from={{
          label: "Monthly plan",
          price: SUBSCRIPTION_PLANS.monthly.price,
          months: 1,
          dbCredits: SUBSCRIPTION_PLANS.monthly.dbCredits,
          dbWorth: SUBSCRIPTION_PLANS.monthly.dbWorth,
        }}
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => {
          setUpsell(null)
          handleBuyUnlimitedMonthly()
        }}
        onTake={() => {
          setUpsell(null)
          handleBuyUnlimitedAnnual()
        }}
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
          // No toast: the order summary shows the applied coupon and its
          // countdown, and a bottom toast covered the pay button on phones.
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

      {/* Prototype-only settings: the exit offer's demo controls (no auth
          switch — each state has its own route). Shown in every build,
          deployed ones included, like express checkout's switcher. Remove
          once real offer rules are wired up. */}
      <CheckoutPreviewSettings
        offer={{ claimed: offer.claimed, onExpireSoon: offer.expireSoon, onReset: offer.reset }}
      />
    </div>
  )
}

/** The plan tabs once the hero's switcher scrolls away: in the logged-in
 *  top bar and the logged-out site header. One control, the system Tabs in
 *  its checkout look, so both bars match the hero and slide like it. */
/**
 * The plan tabs once docked under the bar on scroll. Phones keep the hero's
 * own chip row (the same SegmentedTabSwitcher, so the chips don't turn into
 * a different control as they stick — user call, 2026-10-17); from md, the
 * compact pill tabs.
 */
function DockedPlanTabs({
  value,
  onValueChange,
}: {
  value: PricingTab
  onValueChange: (tab: PricingTab) => void
}) {
  return (
    <>
      <div className="w-full min-w-0 md:hidden">
        <SegmentedTabSwitcher
          items={PRICING_TABS.map((tab) => ({ ...tab, shortLabel: PRICING_TAB_SHORT_LABELS[tab.value] }))}
          value={value}
          onValueChange={onValueChange}
          appearance="checkout"
          mobileBleedClassName="-mx-4"
          mobileGutterClassName="px-4"
        />
      </div>
      <CompactPlanTabs className="mx-auto hidden shrink-0 md:flex" value={value} onValueChange={onValueChange} />
    </>
  )
}

function CompactPlanTabs({
  value,
  onValueChange,
  className,
}: {
  value: PricingTab
  onValueChange: (tab: PricingTab) => void
  className?: string
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as PricingTab)} className={className}>
      <TabsList variant="checkout">
        {PRICING_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            data-product={tab.accent}
            className={cn("px-3.5", tab.accent && "text-product-accent!")}
          >
            {tab.compactLogo ? (
              <>
                <span aria-hidden className="flex translate-y-px items-center">
                  {tab.compactLogo}
                </span>
                <span className="sr-only">{PRICING_TAB_SHORT_LABELS[tab.value]}</span>
              </>
            ) : (
              <>
                {React.isValidElement<{ className?: string }>(tab.icon)
                  ? React.cloneElement(tab.icon, { className: "size-5 shrink-0" })
                  : tab.icon}
                {PRICING_TAB_SHORT_LABELS[tab.value]}
              </>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

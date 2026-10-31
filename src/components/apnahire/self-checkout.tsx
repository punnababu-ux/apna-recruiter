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
  pricingTabs,
  useUnlimitedWordmark,
  PRICING_TAB_SHORT_LABELS,
  type PricingTab,
} from "@/components/apnahire/pricing-hero"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { PRICING_INTRO } from "@/content/pricing"
import { Button, SegmentedTabSwitcher, StickyCtaBar, Tabs, TabsList, TabsTrigger } from "@apna/design-system"
import { JobCreditBundles, type Bundle } from "@/components/apnahire/job-credit-bundles"
import { DatabaseCreditBundles, type DbBundle } from "@/components/apnahire/database-credit-bundles"
import { ContactSalesCard } from "@/components/apnahire/contact-sales-card"
import { JobTypesDialog } from "@/components/apnahire/job-plan-cards"
import { ContactPopup } from "@/components/marketing/contact-section"
import { SubscriptionPlans, type SubscriptionPlanId } from "@/components/apnahire/subscription-plans"
import { planOrderLabel, planOrderPoints, type JobSlotCount, type SubscriptionPlan } from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"
import {
  DEFAULT_ENTERPRISE_TIER,
  EnterprisePricingTable,
} from "@/components/apnahire/enterprise-pricing-table"
import { FaqBand, TrustedByBand, WhyHireBand } from "@/components/marketing/proof-bands"
import { PRICING_STATS } from "@/content/home"
import { UnlimitedSideCard } from "@/components/apnahire/unlimited-side-card"
import { UpcomingPricesProvider } from "@/components/apnahire/upcoming-price-line"
import { PriceChangeBanner } from "@/components/apnahire/price-change-banner"
import {
  AnnualUpgradeDialog,
  CreditPackOfferDialog,
  CreditsToPlanDialog,
} from "@/components/apnahire/offers/upsell-dialogs"
import { CheckoutTopBar } from "@/components/apnahire/checkout-top-bar"
import { ExtraOffBanner, ExtraOffBar } from "@/components/apnahire/offers/extra-off-line"
import { lineTabs, useCheckoutVersion, versionAtLeast } from "@/hooks/use-checkout-version"
import { HOME } from "@/lib/apnahire/nav"
import { useSession } from "@/hooks/use-session"
import {
  CheckoutDrawer,
  type CartLine,
  type SubscriptionPaymentMethod,
} from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { startSubscription, upgradeSubscription } from "@/hooks/use-job-slots"
import { usePlanChange, useChoosePlan } from "@/components/apnahire/plan-change"
import { PlanEndedBanner } from "@/components/apnahire/plan-ended"
import { addPurchasedJobCredits } from "@/hooks/use-plans-ingress"
import { useHeaderSlot } from "@/components/marketing/header-slot"
import { CheckoutPreviewSettings } from "@/components/apnahire/checkout-preview-settings"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { LeaveReasonsDialog } from "@/components/apnahire/offers/exit-stay-dialogs"
import { useExtraOff } from "@/components/apnahire/offers/use-extra-off"
import { EXTRA_OFF, withExtraOff } from "@/content/offers"
import { useIsMobile } from "@/hooks/use-mobile"
import { inr } from "@/lib/format"

export type CheckoutAuthState = "logged-in" | "logged-out"

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

type SelectedPackage =
  | { kind: "job"; bundle: Bundle }
  | { kind: "db"; bundle: DbBundle }
  // Phones' Jobs list: the apna Unlimited card (monthly plan).
  | { kind: "unlimited" }

/** A signed-out "Proceed to pay": what was being bought, kept across the
 *  login steps so the logged-in Plans page can reopen the same order. */
const PENDING_CHECKOUT_KEY = "apnahire:pending-checkout"
type PendingCheckout = {
  tab: PricingTab
  item: CartLine
  selectedPackage: SelectedPackage
  subscriptionPlan: SubscriptionPlanId
  subscriptionSlots?: JobSlotCount
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
  // The pricing phase's plans (preview settings). The biggest bundle is the
  // one the upsell pack is offered against.
  const plans = usePlans()
  // The subscription plan in the order, so paying for it starts it.
  const boughtPlan = React.useRef<SubscriptionPlan | null>(null)
  const recommendedJob = plans.bundles.find((b) => b.recommended) ?? plans.bundles[0]
  const recommendedDb = plans.dbBundles.find((b) => b.recommended) ?? plans.dbBundles[0]
  const biggestBundle = plans.bundles[plans.bundles.length - 1]
  const [selectedPackage, setSelectedPackage] = React.useState<SelectedPackage>({
    kind: "job",
    bundle: recommendedJob,
  })

  // The mobile sticky CTA buys whatever is selected on the current tab, so
  // switching between Jobs and Database pre-selects that tab's recommended
  // bundle — the button never offers job credits on the Database tab.
  const changeTab = React.useCallback((tab: PricingTab, updateUrl = true) => {
    setActiveTab(tab)
    setSelectedPackage((current) => {
      if (tab === "database" && current.kind !== "db") return { kind: "db", bundle: recommendedDb }
      if (tab === "jobs" && current.kind === "db") return { kind: "job", bundle: recommendedJob }
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
  }, [recommendedDb, recommendedJob])

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
  // The Subscription tab's slot picker: every plan's price is for this many
  // live jobs.
  const [subscriptionSlots, setSubscriptionSlots] = React.useState<JobSlotCount>(1)
  // A subscriber: the Unlimited cards mark their plan and say Upgrade /
  // Downgrade, as on Manage plan (plan-change.tsx). The picker opens on
  // their slot count, so their own card is in view.
  const change = usePlanChange(subscriptionSlots)
  const [seenSub, setSeenSub] = React.useState<number | null>(null)
  const subTotal = change?.sub.total ?? null
  if (subTotal !== seenSub) {
    setSeenSub(subTotal)
    if (subTotal && plans.slotCounts.includes(subTotal as JobSlotCount)) setSubscriptionSlots(subTotal as JobSlotCount)
  }
  // The plan an upgrade is buying: the order summary takes the unused days
  // off it, and payment upgrades the subscription instead of starting one.
  const [upgrade, setUpgrade] = React.useState<SubscriptionPlan | null>(null)
  // Another pricing phase sells other bundles and slot counts: start again
  // from its recommended bundle, and 1 slot if this count isn't sold.
  const [seenPlans, setSeenPlans] = React.useState(plans)
  if (seenPlans !== plans) {
    setSeenPlans(plans)
    setSelectedPackage((current) =>
      current.kind === "db" ? { kind: "db", bundle: recommendedDb } : { kind: "job", bundle: recommendedJob },
    )
    if (!plans.slotCounts.includes(subscriptionSlots)) setSubscriptionSlots(plans.slotCounts[0])
  }
  const [enterpriseTier, setEnterpriseTier] = React.useState(DEFAULT_ENTERPRISE_TIER)
  // Every Contact sales on the page: logged out, the contact form; logged
  // in, straight to the "our team will reach out" confirmation.
  const [contactOpen, setContactOpen] = React.useState(false)
  const contactSales = () => setContactOpen(true)
  const [jobTypesOpen, setJobTypesOpen] = React.useState(false)

  // Sticky header — starts transparent over the gradient hero, turns solid
  // once the page scrolls; the compact tab switcher fades in once the
  // hero's own (full-size) tab switcher scrolls out from under it. Timing
  // and thresholds match the source self-checkout site's header exactly
  // (scrollY > 5, 250ms cubic-bezier(0.16,1,0.3,1)).
  const checkoutVersion = useCheckoutVersion()
  const offerBanner = versionAtLeast(checkoutVersion, "v2") || versionAtLeast(checkoutVersion, "v14")
  // V13: phone job packs grouped in a panel, as express V11 (user call, 2026-10-30).
  const groupedPacks = versionAtLeast(checkoutVersion, "v13")
  // V6 (phones): a tap on a card buys it (order summary; Enterprise: contact
  // sales); no sticky bar, no selected card.
  const tapToBuy = versionAtLeast(checkoutVersion, "v6")
  const [showCompactTabs, setShowCompactTabs] = React.useState(false)
  const heroTabsRef = React.useRef<HTMLDivElement>(null)
  // The docked tab strip (below lg) hides while the page scrolls down and
  // comes back on the first scroll up (user call, 2026-10-30). 8px of
  // travel before it flips, so a jittery thumb doesn't flicker it.
  const [scrollingDown, setScrollingDown] = React.useState(false)
  React.useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 8) return
      setScrollingDown(y > last)
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const showDockedTabs = !scrollingDown

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
    setSubscriptionSlots(pending.subscriptionSlots ?? 1)
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
  // biggest bundle offers the upsell pack (22 → 47 credits; today 13 → 22); the 1-slot
  // monthly subscription offers the annual plan. Every other Buy goes straight to the summary.
  // 3 credits → the monthly plan (phones), as CreditsToPlanDialog.
  const [upsell, setUpsell] = React.useState<"pack" | "annual" | "plan" | null>(null)
  const isMobile = useIsMobile()
  // Upsells only for a signed-in recruiter on the Plans page (user call,
  // 2026-10-19); signed out (/pricing), every Buy goes straight on.
  const upsellsOn = !isLoggedOut
  const [planUpsell, setPlanUpsell] = React.useState<{ bundle: Bundle; plan: "monthly" | "quarterly" } | null>(null)
  const [exitPrompt, setExitPrompt] = React.useState<{ proceed: () => void } | null>(null)
  // A returning recruiter leaving the plans page is asked why instead.
  const [reasonsPrompt, setReasonsPrompt] = React.useState<{ proceed: () => void } | null>(null)

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
    const pending: PendingCheckout = { tab: activeTab, item, selectedPackage, subscriptionPlan, subscriptionSlots }
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
      label: `${bundle.credits} job credit${bundle.credits > 1 ? "s" : ""}`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Job plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
  }

  const handleBuySingleCredit = () => handleBuyBundle(plans.singleCredit)

  // A job bundle's Buy: the biggest bundle offers the upsell pack.
  // Phones only (user call, 2026-10-19): there the Unlimited card sits
  // below the bundles, out of the first view; on desktop it's right beside
  // them, so the 3/6-credit buys go straight to the summary.
  // 3 credits → monthly only; the 6-credit upsell was dropped (user call,
  // 2026-10-19).
  const PLAN_FOR_BUNDLE: Record<number, "monthly" | "quarterly"> = { 3: "monthly" }
  const handleSelectBundle = (bundle: Parameters<typeof handleBuyBundle>[0]) => {
    const plan = isMobile ? PLAN_FOR_BUNDLE[bundle.credits] : undefined
    const full = plans.bundles.find((b) => b.credits === bundle.credits)
    if (!upsellsOn) handleBuyBundle(bundle)
    else if (bundle.credits === biggestBundle.credits) setUpsell("pack")
    else if (plan && full) {
      setPlanUpsell({ bundle: full, plan })
      setUpsell("plan")
    } else handleBuyBundle(bundle)
  }
  // The monthly plan: the annual upgrade first, when upsells are on. Only
  // for 1 slot: the upgrade pop-up compares the 1-slot plans.
  const buyMonthly = (slots: JobSlotCount = 1) =>
    upsellsOn && slots === 1 ? setUpsell("annual") : buyPlan("monthly", slots)
  const buyUpsellPack = () => {
    const pack = plans.upsellPack
    openOrder({
      id: `job-${pack.credits}`,
      label: `${pack.credits} job credits`,
      sublabel: `Valid for ${pack.validDays} days`,
      price: pack.price,
      mrp: pack.mrp,
      discountLabel: `Job plan discount (${Math.round((1 - pack.price / pack.mrp) * 100)}% OFF)`,
      discountAmount: pack.mrp - pack.price,
    })
  }

  const handleBuyDatabaseBundle = (bundle: {
    credits: number
    validDays: number
    price: number
    mrp: number
    discountPct: number
  }) => {
    openOrder({
      id: `db-${bundle.credits}`,
      label: `${bundle.credits.toLocaleString("en-IN")} database credits`,
      sublabel: `Valid for ${bundle.validDays} days`,
      price: bundle.price,
      mrp: bundle.mrp,
      discountLabel: `Database plan discount (${bundle.discountPct}% OFF)`,
      discountAmount: bundle.mrp - bundle.price,
    })
  }

  const shownPrice = (n: number) =>
    inr((offer.claimed ? withExtraOff(n) : n))
  const stickyKind = change?.kindOf(subscriptionPlan)
  const stickyCtaLabel =
    activeTab === "enterprise"
      ? "Contact sales"
      : activeTab === "unlimited" && change
        ? stickyKind === "same"
          ? "Your current plan"
          : stickyKind === "upgrade"
            ? `Upgrade • ${shownPrice(plans.plan(subscriptionPlan, subscriptionSlots).price)}`
            : change.ctaLabels[subscriptionPlan]
        : activeTab === "unlimited"
        ? `Buy ${plans.plan(subscriptionPlan).name.toLowerCase()} • ${shownPrice(plans.plan(subscriptionPlan, subscriptionSlots).price)}`
        : selectedPackage.kind === "unlimited"
          ? `Get apna unlimited • ${shownPrice(plans.plan("monthly").price)}`
        : selectedPackage.kind === "job"
          ? `Buy ${selectedPackage.bundle.credits} job credits • ${shownPrice(selectedPackage.bundle.price)}`
          : `Buy ${selectedPackage.bundle.credits.toLocaleString("en-IN")} database credits • ${shownPrice(selectedPackage.bundle.price)}`

  const handleStickyCtaClick = () => {
    if (activeTab === "unlimited") {
      onUnlimitedCard(subscriptionPlan)
    } else if (activeTab === "enterprise") {
      contactSales()
    } else if (selectedPackage.kind === "unlimited") {
      buyMonthly()
    } else if (selectedPackage.kind === "job") {
      handleSelectBundle(selectedPackage.bundle)
    } else {
      handleBuyDatabaseBundle(selectedPackage.bundle)
    }
  }

  // `renewAfterDays` is what switches the drawer into its subscription
  // variant, and what the renewal date is computed from. The points carry
  // the plan's database credits, as on its card.
  const buyPlan = (id: SubscriptionPlanId, slots: JobSlotCount = 1) => {
    const plan = plans.plan(id, slots)
    boughtPlan.current = plan
    openOrder({
      id: `unlimited_${id}_${slots}`,
      label: planOrderLabel(plan),
      points: planOrderPoints(plan),
      price: plan.price,
      mrp: plan.mrp,
      renewAfterDays: plan.slotDays,
    })
  }
  const { choose: choosePlanChange, confirm: downgradeConfirm } = useChoosePlan(change, subscriptionSlots, (plan) => {
    setUpgrade(plan)
    buyPlan(plan.id, plan.slots as JobSlotCount)
  })
  // A card's CTA: a subscriber changes plan; anyone else buys.
  const onUnlimitedCard = (id: SubscriptionPlanId) =>
    change ? choosePlanChange(id) : id === "monthly" ? buyMonthly(subscriptionSlots) : buyPlan(id, subscriptionSlots)
  const handleBuyUnlimitedQuarterly = () => buyPlan("quarterly")
  const handleBuyUnlimitedAnnual = () => buyPlan("annual")
  const handleBuyUnlimitedMonthly = () => buyPlan("monthly")

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
    if (upgrade && change) upgradeSubscription(change.slots, upgrade, paymentAmount)
    else if (checkoutItem?.renewAfterDays && boughtPlan.current) startSubscription(boughtPlan.current)
    // Credits bought: the shell stops promoting plans (usePlansIngress).
    else if (checkoutItem) addPurchasedJobCredits(checkoutItem.label)
    setUpgrade(null)
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
    // Signed in only: the Jan 1, 2027 prices on the cards and the line under
    // the title (content/price-change.ts). /pricing shows today's prices.
    <UpcomingPricesProvider enabled={!isLoggedOut}>
      <div
        data-checkout-version={checkoutVersion}
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
            title="Select plans"
            // Home, like every other page's Back (lib/apnahire/nav).
            onBack={() =>
              offer.returning
                ? setReasonsPrompt({ proceed: () => router.push(HOME) })
                : attemptExit(() => router.push(HOME))
            }
            backLabel="Back to jobs"
            showCenter={showCompactTabs}
            // V2 and V14 say the 10% in a banner in the page instead
            // (ExtraOffBanner; V14, as express V11: user call, 2026-10-31).
            below={offerBanner ? undefined : <ExtraOffBar deadline={offer.deadline} className="md:hidden" />}
            // Revealed from lg, not md: with the title and the full-size
            // credits pill in the row, four tabs no longer fit between
            // them at tablet widths.
            center={
              <CompactPlanTabs className="hidden lg:flex" value={activeTab} onValueChange={changeTab} />
            }
          />
        )}
        {!isLoggedOut && (
          /* Below lg the tabs live in a white strip under the bar from the
             start (user call, 2026-10-30), not in the hero: in the flow, so
             it takes its own space at the top, and sticky under the bar. It
             slides up behind the bar while the page scrolls down and comes
             back on the first scroll up. */
          <div
            className={cn(
              "sticky z-docked lg:hidden",
              // Under the 10% offer strip too, when it shows (phones; not
              // where the banner replaces it).
              offer.claimed && !offerBanner ? "top-16 max-md:top-26" : "top-16"
            )}
          >
            <div
              inert={!showDockedTabs}
              className={cn(
                // shadow-card: it floats over the page as it scrolls (a pinned
                // header, AGENTS.md "Card shadows").
                "flex h-16 items-center no-scrollbar overflow-x-auto border-b border-border bg-card shadow-card transition-interactive duration-enter ease-out-ui",
                // Underline tabs carry their own 16px sides, inside the scroll,
                // so they start 16px in but can scroll off the edge; the pill
                // strip keeps its padding on the strip.
                !lineTabs(checkoutVersion) && "px-4",
                // V2/V9's underline tabs sit on the strip's bottom edge, so the
                // underline meets the divider; the strip is the tabs' 48px,
                // with no empty band above them.
                lineTabs(checkoutVersion) && "h-12 items-end",
                showDockedTabs ? "translate-y-0" : "pointer-events-none -translate-y-full"
              )}
            >
              <DockedPlanTabs value={activeTab} onValueChange={changeTab} />
            </div>
          </div>
        )}

        {/* ── Hero + pricing body share the page-level ambient-gradient canvas.
             Logged out (the public pricing page), the homepage hero's living
             background (HeroBackdrop) moves over it; logged in, the mesh is
             still, as in express checkout (user call, 2026-10-29). ── */}
        <div className="relative isolate flex-1">
          {isLoggedOut && <HeroBackdrop />}
          <PricingHero
            activeTab={activeTab}
            onTabChange={changeTab}
            tabsRef={heroTabsRef}
            // Logged in, phones and tablets get the tabs in the strip under
            // the top bar instead.
            tabsClassName={isLoggedOut ? undefined : "max-lg:hidden"}
            // Phones and tablets: 16px from the tab strip to whatever comes
            // first, banner or heading, on every tab (user call, 2026-10-30).
            // The hero adds no padding of its own; the banner brings 16px
            // above it, and the body's 16px sits under it.
            className={isLoggedOut ? undefined : "max-lg:py-0"}
            bannerClassName="max-lg:pt-4"
            intro={isLoggedOut ? PRICING_INTRO : undefined}
            // Every tab, so the page doesn't jump as the tabs change.
            // A plan that ended this week: the same "expired" banner as the
            // jobs dashboard, Renew now opening the Unlimited tab.
            banner={
              <>
                <PriceChangeBanner placement="plans" />
                <PlanEndedBanner onRenew={() => changeTab("unlimited")} />
              </>
            }
          />

          {/* Phones: 32px under the last line ("*GST applicable"); the room
              for the fixed buy bar is kept at the page's end instead (the
              trusted-by band), not here above the FAQ (user call, 2026-10-30). */}
          <div className={cn("px-4 pb-8 sm:px-8 md:pb-12 lg:px-12", !isLoggedOut && "max-lg:pt-4 max-md:flex max-md:flex-col max-md:gap-4")}>
            {/* V2 and V14, phones: the claimed 10% above the tab's heading ("Job credit packages"). */}
            {offerBanner && <ExtraOffBanner deadline={offer.deadline} className="md:hidden" />}
            {activeTab === "jobs" ? (
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 max-md:gap-4">
                <div className="flex flex-col gap-5 max-md:gap-4">
                  {/* Desktop: side by side from xl. The mobile/desktop split is at
                      md everywhere on this page (hero switcher, bundle lists,
                      sticky CTA) so 640–767px gets one consistent layout. */}
                  <div className="hidden md:flex md:flex-col md:gap-4 xl:flex-row">
                    {/* Each column owns its own caption, so the caption sits
                        under its card rather than spanning both columns. */}
                    {/* Both columns' captions reserve the same 20px line (min-h-5):
                        the cards stretch above them, so a caption 2px taller in
                        one column (the inline link) drops the other card's
                        price, note and CTA by 2px. */}
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <JobCreditBundles
                        extraOff={offer.claimed}
                        className="flex-1"
                        onBuyNow={handleSelectBundle}
                        onBuySingleCredit={handleBuySingleCredit}
                        selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : undefined}
                        onSelectBundle={(bundle) => setSelectedPackage({ kind: "job", bundle })}
                      />
                      <p className="min-h-5 text-xs text-checkout-hero-fg">
                        {/* One way in to what a credit buys (user call, 2026-10-30). */}
                        <Button type="button" variant="link-inline" size="sm" className="font-semibold" onClick={() => setJobTypesOpen(true)}>
                          {/* V14: the phone label (user call, 2026-10-31). */}
                          {versionAtLeast(checkoutVersion, "v14") ? "How job credits work" : "What 1 job credit will get you?"}
                        </Button>
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 xl:w-82">
                      <UnlimitedSideCard
                        extraOff={offer.claimed}
                        className="flex-1"
                        onBuyNow={() => buyMonthly()}
                      />
                      <p className="hidden min-h-5 text-xs text-checkout-hero-fg-muted md:block">
                        Note: This plan is valid in a single city.
                      </p>
                    </div>
                  </div>

                  {/* Mobile: tap-to-select job bundles + the sticky CTA. Database
                      credits live on their own tab, as on desktop. */}
                  <div className={cn("flex flex-col md:hidden", groupedPacks ? "gap-3" : "gap-4")}>
                    {/* 1. Job credits section */}
                    <div className="flex flex-col gap-4">
                      <JobCreditBundles
                        extraOff={offer.claimed}
                        onBuyNow={handleSelectBundle}
                        onBuySingleCredit={handleBuySingleCredit}
                        selectedBundleId={selectedPackage.kind === "job" ? selectedPackage.bundle.id : null}
                        onSelectBundle={(bundle) => (tapToBuy ? handleSelectBundle(bundle) : setSelectedPackage({ kind: "job", bundle }))}
                        // V13: the packs in one panel, the credit links inside it.
                        grouped={groupedPacks}
                        footer={
                          // Side by side when the panel has room (≥288px inside,
                          // most phones); the link over the button below that
                          // (320px phones). Decided by the panel, not the copy.
                          <div className="@container px-1">
                          <div className="flex flex-col items-start gap-3 @2xs:flex-row @2xs:items-center @2xs:justify-between">
                            <Button type="button" variant="link-inline" size="sm" className="text-xs font-semibold text-foreground" onClick={() => setJobTypesOpen(true)}>
                              {/* V13: plainer, and what the dialog explains (user call, 2026-10-30). */}
                              How job credits work
                            </Button>
                            <Button type="button" variant="outline" size="sm" className="shrink-0 px-3.5" onClick={handleBuySingleCredit}>
                              Buy a single job credit
                            </Button>
                          </div>
                          </div>
                        }
                      />
                      {/* What a credit buys, and the single credit, side by side
                          (user call, 2026-10-30). The single credit is a small
                          outline pill: findable, not competing with the green
                          sticky CTA. The small card CTA, as the Unlimited
                          card's "Buy now" (standard sm, 14px sides). */}
                      {!groupedPacks && (
                        <div className="flex items-center justify-between gap-3">
                          <Button type="button" variant="link-inline" size="sm" className="text-xs font-semibold text-checkout-hero-fg" onClick={() => setJobTypesOpen(true)}>
                            What 1 job credit will get you?
                          </Button>
                          <Button type="button" variant="outline" size="sm" className="shrink-0 px-3.5" onClick={handleBuySingleCredit}>
                            Buy 1 job credit
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* 2. apna Unlimited: not one of the choices above (user
                        call, 2026-10-30). Its Buy now, or a tap anywhere on
                        it, goes straight to its checkout, as in express. */}
                    <UnlimitedSideCard
                      extraOff={offer.claimed}
                      onBuyNow={() => buyMonthly()}
                      // V3: a choice like the packs above; the sticky CTA buys it.
                      mobileSelect={
                        versionAtLeast(checkoutVersion, "v3")
                          ? { selected: selectedPackage.kind === "unlimited", onSelect: () => setSelectedPackage({ kind: "unlimited" }) }
                          : undefined
                      }
                    />
                  </div>

                  {/* Both auth states — the updated Jobs frame draws this card
                      on the logged-in page too. */}
                  <ContactSalesCard onContactSales={contactSales} />
                </div>

                <GstNote />
              </div>
            ) : activeTab === "database" ? (
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
                <div className="flex flex-col gap-3 max-md:gap-4">
                  <DatabaseCreditBundles
                    extraOff={offer.claimed}
                    onBuyNow={handleBuyDatabaseBundle}
                    selectedBundleId={selectedPackage.kind === "db" ? selectedPackage.bundle.id : undefined}
                    onSelectBundle={(bundle) => (tapToBuy ? handleBuyDatabaseBundle(bundle) : setSelectedPackage({ kind: "db", bundle }))}
                  />
                  <p className="text-xs text-checkout-hero-fg">
                    1 credit = 1 candidate profile unlock
                  </p>
                </div>

                <div className="flex flex-col gap-3 max-md:gap-4">
                  <ContactSalesCard onContactSales={contactSales} />
                  <GstNote />
                </div>
              </div>
            ) : activeTab === "unlimited" ? (
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
                <SubscriptionPlans
                  extraOff={offer.claimed}
                  selectedPlan={subscriptionPlan}
                  onSelectPlan={(id) => (tapToBuy ? onUnlimitedCard(id) : setSubscriptionPlan(id))}
                  slots={subscriptionSlots}
                  onSlotsChange={setSubscriptionSlots}
                  current={change?.current}
                  ctaLabels={change?.ctaLabels}
                  ctaDisabled={change?.ctaDisabled}
                  ctaHints={change?.ctaHints}
                  recommendedPlan={change ? change.recommendedPlan : undefined}
                  onBuyMonthly={() => onUnlimitedCard("monthly")}
                  onBuyQuarterly={() => onUnlimitedCard("quarterly")}
                  onBuyAnnual={() => onUnlimitedCard("annual")}
                />
                {/* Phones: GST under the Contact sales card, as on the Database
                    tab. Desktop keeps it beside the single-city note above. */}
                <div className="flex flex-col gap-4">
                  <ContactSalesCard onContactSales={contactSales} />
                  <GstNote className="md:hidden" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
                <EnterprisePricingTable onContactSales={contactSales} selectedTier={enterpriseTier} onSelectTier={(tier) => (tapToBuy ? contactSales() : setEnterpriseTier(tier))} />
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
        {/* Phones: room at the very end so the fixed buy bar never covers the logos. */}
        <TrustedByBand className={isLoggedOut || tapToBuy ? undefined : "max-md:pb-32"} />

        {/* No footer band here for logged-out: (marketing)/layout.tsx already
            renders SiteFooter below this component. The logged-in page ends
            at the trust bar because the product shell owns navigation from
            there — same reasoning, different chrome. */}

        {/* Mobile sticky bottom CTA dock: buys the current tab's selection
            (Enterprise: Contact sales). Prices carry the claimed offer, as the
            rows above do. */}
        {!tapToBuy && (
        <StickyCtaBar>
          <Button
            type="button"
            // A subscriber on Unlimited: green only to buy an upgrade.
            variant={activeTab === "unlimited" && change && stickyKind !== "upgrade" ? "outline" : "checkout"}
            size="xl"
            disabled={activeTab === "unlimited" && !!change && (stickyKind === "same" || change.ctaDisabled[subscriptionPlan])}
            onClick={handleStickyCtaClick}
          >
            {stickyCtaLabel}
          </Button>
        </StickyCtaBar>
        )}

        <CheckoutDrawer
          open={drawerOpen}
          onOpenChange={(next) =>
            next
              ? setDrawerOpen(true)
              : attemptExit(() => {
                  setDrawerOpen(false)
                  setUpgrade(null)
                })
          }
          item={checkoutItem}
          proration={upgrade && change ? { label: change.prorationLabel, amount: change.credit(upgrade) } : undefined}
          onProceedToPay={handleProceedToPay}
          extraOffer={offer.deadline ? { code: EXTRA_OFF.code, deadline: offer.deadline } : undefined}
          onExtraOfferExpired={offer.expire}
        />

        <CreditPackOfferDialog
          open={upsell === "pack"}
          need={{
            credits: biggestBundle.credits,
            price: biggestBundle.price,
            mrp: biggestBundle.mrp,
            validDays: biggestBundle.validDays,
            janPrice: biggestBundle.janPrice,
          }}
          pack={plans.upsellPack}
          extraOff={offer.claimed}
          onClose={() => setUpsell(null)}
          onStay={() => {
            setUpsell(null)
            handleBuyBundle(biggestBundle)
          }}
          onTake={() => {
            setUpsell(null)
            buyUpsellPack()
          }}
        />

        <CreditsToPlanDialog
          open={upsell === "plan"}
          bundle={planUpsell?.bundle ?? null}
          plan={planUpsell ? plans.plan(planUpsell.plan) : null}
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
          from={plans.plan("monthly")}
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

        <JobTypesDialog open={jobTypesOpen} onOpenChange={setJobTypesOpen} extraOff={offer.claimed} />
        <ContactPopup open={contactOpen} onOpenChange={setContactOpen} signedIn={!isLoggedOut} />

        <LeaveReasonsDialog
          open={reasonsPrompt !== null}
          onStay={() => setReasonsPrompt(null)}
          onLeave={() => {
            reasonsPrompt?.proceed()
            setReasonsPrompt(null)
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

        {downgradeConfirm}

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
          offer={{ claimed: offer.claimed, returning: offer.returning, onReturningChange: offer.setReturning, onExpireSoon: offer.expireSoon, onReset: offer.reset }}
        />
      </div>
    </UpcomingPricesProvider>
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
  const [wordmark] = useUnlimitedWordmark()
  // V2: standard underline tabs instead of the pill chips (self-checkout only).
  if (lineTabs(useCheckoutVersion())) {
    // w-max: the row keeps its full width and scrolls, never squeezed and
    // clipped (Database was cut off at 320–360px); px-4 scrolls with it.
    return <CompactPlanTabs variant="line" value={value} onValueChange={onValueChange} className="w-max px-4" />
  }
  return (
    <>
      <div className="w-full min-w-0 md:hidden">
        <SegmentedTabSwitcher
          items={pricingTabs(wordmark).map((tab) => ({ ...tab, shortLabel: PRICING_TAB_SHORT_LABELS[tab.value] }))}
          value={value}
          onValueChange={onValueChange}
          appearance="checkout"
          // Unselected tabs quieter than the checkout preset's gray-700, so
          // the selected one leads (user call, 2026-10-30). Icons and the
          // wordmark follow the text colour.
          inactiveClassName="text-muted-foreground"
          // The selected chip's label bold, every version (user call, 2026-10-30).
          mobileActiveClassName="text-checkout-primary font-bold"
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
  variant = "checkout",
}: {
  value: PricingTab
  onValueChange: (tab: PricingTab) => void
  className?: string
  /** "line": the standard underline tabs (V2's phone strip). */
  variant?: "checkout" | "line"
}) {
  const [wordmark] = useUnlimitedWordmark()
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(v as PricingTab)} className={className}>
      {/* V2's underline tabs: green selection, 32px apart (user call, 2026-10-30). */}
      <TabsList
        variant={variant}
        tone={variant === "line" ? "checkout" : undefined}
        // The Unlimited tab's underline takes its wordmark's gold, not green.
        data-product={variant === "line" && value === "unlimited" ? "unlimited" : undefined}
        className={variant === "line" ? "gap-8" : undefined}
      >
        {pricingTabs(wordmark).map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            data-product={tab.accent}
            // The selected tab's label bold, as the chips (user call, 2026-10-30).
            className={cn("px-3.5 data-active:font-bold", tab.accent && "text-product-accent!")}
          >
            {tab.compactLogo ? (
              <>
                <span aria-hidden className="flex translate-y-px items-center">
                  {typeof tab.compactLogo === "function" ? tab.compactLogo(tab.value === value) : tab.compactLogo}
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

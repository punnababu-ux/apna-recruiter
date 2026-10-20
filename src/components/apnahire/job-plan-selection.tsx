"use client"

/**
 * JobPlanSelection — "choose a job plan" page, the step shown once a
 * recruiter has already decided to post a job (Figma `92gU18d45olE04ATyhhVHD`,
 * boards `2472:19068` and `2490:43116`). Scoped to job-relevant plans only —
 * this is distinct from the general self-checkout at `/pricing` /
 * `/apnahire/credits` (`self-checkout.tsx`), which also sells DB credits and
 * bundles.
 *
 * This is step 3 ("Select plan") of the AI-first Create new job flow
 * (`post-job/post-job-flow.tsx`), so it shares that flow's
 * `JobPostingChrome` — title row, Save & exit, 4-step stepper — on the same
 * plain `bg-muted` page. Earlier steps are clickable and return to
 * `/apnahire/jobs/new`, which resumes the saved draft. Width is max-w-6xl:
 * four plan cards need it, or the longest title wraps.
 *
 * Checkout reuses `CheckoutDrawer` directly (the same slide-in-from-the-right
 * sheet `self-checkout.tsx` already uses), rather than a bespoke full-page
 * checkout — one order-summary structure for both surfaces, not two to keep
 * in sync. The drawer's database upsell is replaced here by the AI calling
 * add-on (`aiAddon`). Every plan pick opens the summary — even one fully
 * covered by credits — so the add-on is always offered; when the cart costs
 * nothing, the drawer's CTA reads "Post job" and posting skips payment. Same
 * `handleProceedToPay` → `PaymentModal` → `PaymentSuccess` wiring as
 * `self-checkout.tsx`.
 *
 * `planLayout` and `creditBalance` have no real data source yet (segment
 * rules / account balance, respectively) — both are previewed via
 * `JobPlanPreviewSwitcher`, a floating control like `CheckoutPreviewSettings` —
 * but unlike that one it also shows in deployed builds, so the page's
 * states can be reviewed on Vercel.
 *
 * Bundle-offer and subscription-upgrade upsell popups (Figma's "Job bundle
 * offer" / "Special upgrade offer" frames) are Phase 2 — the CTAs below go
 * straight to checkout for now, matching the "no existing discount" base
 * case the Figma journey map calls Case I.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"
import { JobPostingChrome } from "@/components/apnahire/post-job/job-posting-chrome"
import { JOB_DRAFT_STORAGE_KEY } from "@/components/apnahire/post-job/post-job-flow"
import {
  CheckoutDrawer,
  type CartLine,
  type SubscriptionPaymentMethod,
} from "@/components/apnahire/checkout-drawer"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { TrustedByStrip } from "@/components/marketing/proof-bands"
import { GstNote } from "@/components/apnahire/gst-note"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { setActiveSubscription } from "@/hooks/use-active-subscription"
import { addPurchasedJobCredits } from "@/hooks/use-plans-ingress"
import { JobPlanPreviewSwitcher } from "@/components/apnahire/job-plan-preview-switcher"
import { BUNDLES } from "@/components/apnahire/job-credit-bundles"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { useExtraOff } from "@/components/apnahire/offers/use-extra-off"
import {
  AnnualUpgradeDialog,
  CreditPackOfferDialog,
  JobBundleOfferDialog,
  bundleQuote,
} from "@/components/apnahire/offers/upsell-dialogs"
import { ANNUAL_PLAN, EXTRA_OFF, SLOT_UPGRADE } from "@/content/offers"
import { setJobSlots, todayLabel, useJobSlots } from "@/hooks/use-job-slots"
import {
  TieredJobPlans,
  SubscriptionJobPlans,
  creditPlan,
  hasAnyCredits,
  type CreditPlan,
} from "@/components/apnahire/job-plan-cards"
import {
  AI_CALLING_ADDON,
  MONTHLY_SUBSCRIPTION_PLAN,
  NO_CREDITS,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
} from "@/content/job-plans"
import { inr, num } from "@/lib/format"

export type JobPlanLayout = "tiered" | "subscription"

/** Which upsell is showing (Figma 2472:19068 / 2490:43116). */
type Upsell =
  | { kind: "bundle"; tier: JobPlanTier }
  | { kind: "credits"; tier: JobPlanTier; plan: Extract<CreditPlan, { state: "partial" }> }
  | { kind: "annual" }
  | null

/** The pack the "short on credits" upsell offers (the board's 6 credits). */
/** Why the subscription is off for a work-from-home job: the CTA's short
 *  label, and the line a tap on the card shows. */
const SUBSCRIPTION_WFH_BLOCK = {
  label: "Not for work-from-home jobs",
  message: "apna Unlimited is for on-site jobs. Post this work-from-home job with a one-time plan.",
}

const CREDIT_UPSELL_PACK = BUNDLES.find((b) => b.credits === 6) ?? BUNDLES[0]

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

/** The job being posted, from the AI flow's saved draft. Read once on the
 *  client; cleared when the job goes live so "Create new job" starts fresh. */
function readDraftTitle(): string {
  try {
    const raw = window.localStorage.getItem(JOB_DRAFT_STORAGE_KEY)
    return (raw && (JSON.parse(raw) as { draft?: { title?: string } }).draft?.title) || "Your job"
  } catch {
    return "Your job"
  }
}

/** Whether the job being posted is work from home (the draft's location
 *  type), which rules out the subscription. */
function readDraftIsWfh(): boolean {
  try {
    const raw = window.localStorage.getItem(JOB_DRAFT_STORAGE_KEY)
    return !!raw && (JSON.parse(raw) as { draft?: { locationType?: string } }).draft?.locationType === "home"
  } catch {
    return false
  }
}

function clearDraft() {
  try {
    window.localStorage.removeItem(JOB_DRAFT_STORAGE_KEY)
  } catch {
    // Storage blocked — nothing to clear.
  }
}

export function JobPlanSelection() {
  const router = useRouter()
  const [layout, setLayout] = React.useState<JobPlanLayout>("tiered")
  const [creditBalance, setCreditBalance] = React.useState<CreditBalance>(NO_CREDITS)

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [checkoutItem, setCheckoutItem] = React.useState<CartLine | null>(null)

  const [paymentOpen, setPaymentOpen] = React.useState(false)
  const [paymentAmount, setPaymentAmount] = React.useState(0)
  const [mandateMethod, setMandateMethod] = React.useState<SubscriptionPaymentMethod | null>(null)
  const [order, setOrder] = React.useState<{ lines: CartLine[]; total: number; id: string } | null>(null)
  const [cartLines, setCartLines] = React.useState<CartLine[]>([])
  const [postedTitle, setPostedTitle] = React.useState("Your job")

  // Upsells + exit loop.
  const offer = useExtraOff()
  const [upsell, setUpsell] = React.useState<Upsell>(null)
  const [exitPrompt, setExitPrompt] = React.useState<{ proceed: () => void } | null>(null)
  const [shimmerKey, setShimmerKey] = React.useState(0)

  const openCheckout = (item: CartLine) => {
    setUpsell(null)
    setCheckoutItem(item)
    setDrawerOpen(true)
  }

  // "Upgrade now" from the slots-full pop-up (?upgrade=slot): the order
  // summary for the plan with one more slot. Paying adds the slot and posts.
  const slots = useJobSlots()
  const [slotUpgrade, setSlotUpgrade] = React.useState(false)
  React.useEffect(() => {
    if (!slots || new URLSearchParams(window.location.search).get("upgrade") !== "slot") return
    const total = slots.total + 1
    setSlotUpgrade(true)
    setCheckoutItem({
      id: `slot_upgrade_${total}`,
      label: `${slots.plan} · ${total} job slots`,
      // Database credits are worth ₹10 each across the plans (200 → ₹2,000).
      points: [
        `${total} Active job slots for ${SLOT_UPGRADE.validDays} days`,
        `${SLOT_UPGRADE.dbCredits} database credits worth ${inr(SLOT_UPGRADE.dbCredits * 10)}`,
        "Valid in a single city",
      ],
      price: SLOT_UPGRADE.price,
      mrp: SLOT_UPGRADE.mrp,
      renewAfterDays: SLOT_UPGRADE.validDays,
    })
    setDrawerOpen(true)
    // Once, on arrival — not again when the slots change after paying.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The exit discount is only for someone about to pay (user call,
  // 2026-10-19). Leaving the page (back, Save & exit) with even one credit
  // never shows it — they can post without paying. Closing the order summary
  // shows it only when that order needs a payment (a partial-credit top-up,
  // a paid plan), never when credits cover it.
  const holdsCredits = hasAnyCredits(creditBalance)
  // A work-from-home job can't be posted on the subscription (user call,
  // 2026-10-19): the job's work type comes from the posting draft; the
  // review switcher can override it.
  const [wfh, setWfh] = React.useState(false)
  React.useEffect(() => {
    if (readDraftIsWfh()) setWfh(true)
  }, [])
  // The order as it stands when the summary closes: a paid job line, or the
  // AI calling agent added with no AI calling credit to cover it (a covered
  // classic job + a paid AI agent is a paying order).
  const [aiAdded, setAiAdded] = React.useState(false)
  const orderNeedsPayment =
    (checkoutItem?.price ?? 0) > 0 || (aiAdded && creditBalance["ai-calling"] < 1)
  const attemptExit = (proceed: () => void, paymentRequired = !holdsCredits) => {
    if (offer.nudgeAvailable && paymentRequired) setExitPrompt({ proceed })
    else proceed()
  }

  const singleJobLine = (tier: JobPlanTier): CartLine => ({
    id: tier.id,
    label: tier.title,
    sublabel: `${tier.jobActiveDays} days · ${tier.dbCredits} database credits`,
    price: tier.price,
    mrp: tier.mrp,
  })

  const bundleLine = (tier: JobPlanTier): CartLine => {
    const q = bundleQuote(tier)
    return {
      id: `${tier.id}-bundle`,
      label: `${tier.title} × ${q.jobs}`,
      sublabel: `Post this job now · ${q.jobs - 1} more within ${q.validDays} days`,
      price: q.price,
      mrp: q.mrp,
    }
  }


  const handleSelectTier = (tier: JobPlanTier) => {
    const plan = creditPlan(tier, creditBalance)
    // Covered: the job line costs nothing, but the summary still opens so the
    // AI calling add-on is offered. With no paid add-on it posts from there.
    if (plan.state === "covered") {
      const count = tier.credit.count
      setCheckoutItem({
        id: `${tier.id}-covered`,
        label: tier.title,
        sublabel: `${creditLabel(tier.credit)} from your balance`,
        price: 0,
        priceLabel: `${count} credit${count === 1 ? "" : "s"}`,
      })
      setDrawerOpen(true)
      return
    }
    // Partial: offer a bigger credit pack before topping up the shortfall.
    if (plan.state === "partial") {
      setUpsell({ kind: "credits", tier, plan })
      return
    }
    // No credits: offer 3 of this job before checkout.
    setUpsell({ kind: "bundle", tier })
  }

  // Partial, either way the whole balance is used. The ids avoid the
  // "job-" prefix so the drawer shows no database upsell.
  const topupLine = (tier: JobPlanTier, plan: Extract<CreditPlan, { state: "partial" }>): CartLine => ({
    id: "credit-topup",
    label: creditLabel({ kind: tier.credit.kind, count: plan.shortfall }),
    sublabel: `For ${tier.title} · ${plan.held} from your balance + ${plan.shortfall} to buy`,
    price: plan.price,
    mrp: plan.mrp,
  })

  const creditPackLine = (tier: JobPlanTier, plan: Extract<CreditPlan, { state: "partial" }>): CartLine => {
    const left = plan.held + CREDIT_UPSELL_PACK.credits - tier.credit.count
    return {
      id: "credit-pack",
      label: `${CREDIT_UPSELL_PACK.credits} Job credits`,
      sublabel: `${plan.shortfall} for ${tier.title} · ${left} left for later, valid ${CREDIT_UPSELL_PACK.validDays} days`,
      price: CREDIT_UPSELL_PACK.price,
      mrp: CREDIT_UPSELL_PACK.mrp,
    }
  }

  // Monthly Unlimited: offer the annual plan first.
  const handleSelectSubscription = () => setUpsell({ kind: "annual" })

  const monthlyLine = (): CartLine => {
    const plan = MONTHLY_SUBSCRIPTION_PLAN
    return {
      id: "unlimited_monthly",
      label: "Unlimited monthly plan",
      points: [
        `1 Active job slot for ${plan.jobSlotMonths} month${plan.jobSlotMonths === 1 ? "" : "s"}`,
        `${plan.dbCreditsPerMonth} database credits worth ${inr(plan.dbCreditsWorth)}`,
        "Valid in a single city",
      ],
      price: plan.price,
      renewAfterDays: plan.jobSlotMonths * 30,
    }
  }

  const annualLine = (): CartLine => ({
    id: "unlimited_annual",
    label: "Unlimited annual plan",
    points: [
      `1 Active job slot for ${ANNUAL_PLAN.months} months`,
      `${num(ANNUAL_PLAN.dbCredits)} database credits worth ${inr(ANNUAL_PLAN.dbCreditsWorth)}`,
      "Valid in a single city",
    ],
    price: ANNUAL_PLAN.price,
    renewAfterDays: 365,
  })

  const handleProceedToPay = (total: number, lines: CartLine[], method?: SubscriptionPaymentMethod) => {
    // Everything paid with credits (job and/or AI): post now, no payment.
    if (total === 0) {
      const used = lines.map((l) => l.priceLabel && `${l.priceLabel} (${l.label})`).filter(Boolean)
      toast.success(`${readDraftTitle()} is live`, {
        description: used.length ? `Used ${used.join(" + ")} from your balance.` : undefined,
      })
      setDrawerOpen(false)
      clearDraft()
      router.push("/apnahire/jobs")
      return
    }
    setCartLines(lines)
    setPaymentAmount(total)
    setMandateMethod(method ?? null)
    setDrawerOpen(false)
    setPaymentOpen(true)
  }

  // Payment success publishes the job — no separate "post" step, so a paid
  // job can never be left sitting at Select Plan.
  const handlePaymentSuccess = () => {
    setPaymentOpen(false)
    // A subscription bought here makes the sidebar's plan CTA "Manage plans".
    if (checkoutItem?.renewAfterDays) setActiveSubscription(true)
    // Credits bought: the shell stops promoting plans (usePlansIngress).
    else if (checkoutItem) addPurchasedJobCredits(checkoutItem.label)
    const title = readDraftTitle()
    setPostedTitle(title)
    // A slot upgrade: the new slot is taken by the job just posted.
    if (slotUpgrade && slots) {
      setJobSlots({
        ...slots,
        total: slots.total + 1,
        jobs: [...slots.jobs, { id: `job-${Date.now().toString(36)}`, title, location: "", postedAt: todayLabel(), applied: 0 }],
      })
    }
    clearDraft()
    // The 10% offer is single-use.
    offer.expire()
    setOrder({ lines: cartLines.length ? cartLines : checkoutItem ? [checkoutItem] : [], total: paymentAmount, id: randomOrderId() })
  }

  const handlePaymentFailure = () => {
    setPaymentOpen(false)
    setDrawerOpen(true)
  }

  if (order) {
    return (
      <PaymentSuccess
        lines={order.lines}
        total={order.total}
        orderId={order.id}
        postedJob={{ title: postedTitle, onViewJobs: () => router.push("/apnahire/jobs") }}
        onSearchCandidates={() => router.push("/apnahire/database/search-candidates")}
      />
    )
  }

  return (
    // Same ambient-mesh canvas as self-checkout, so buying a plan mid-posting
    // looks like the same checkout. Text on it uses the checkout-hero tokens,
    // which flip with the canvas (light mesh / dark plum).
    <div className="flex min-h-svh flex-col bg-gradient-checkout-hero">
      <JobPostingChrome
        current="plan"
        onStepClick={(step) => step !== "plan" && router.push("/apnahire/jobs/new")}
        // Zero-credit users haven't met the credit model yet.
        actions={
          hasAnyCredits(creditBalance) ? (
            <AvailableCreditsButton balance={{ job: creditBalance.job, aiCalling: creditBalance["ai-calling"] }} />
          ) : undefined
        }
        onExitAttempt={attemptExit}
      />

      <div className="flex-1 px-4 py-4 pb-28 sm:px-6 sm:py-6 sm:pb-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
          <h1 className="text-h6 text-checkout-hero-fg whitespace-nowrap sm:text-2xl">
            Choose a job basis your hiring needs
          </h1>
          {/* With even one credit, no subscription: credits and a subscription
              don't mix (user call, 2026-10-19), so it's the one-time tiers. */}
          {layout === "tiered" || holdsCredits ? (
            <TieredJobPlans
              creditBalance={creditBalance}
              onSelectTier={handleSelectTier}
              extraOff={offer.claimed}
              shimmerKey={shimmerKey}
            />
          ) : (
            <SubscriptionJobPlans
              creditBalance={creditBalance}
              onSelectTier={handleSelectTier}
              onSelectSubscription={handleSelectSubscription}
              subscriptionBlocked={wfh ? SUBSCRIPTION_WFH_BLOCK : undefined}
              extraOff={offer.claimed}
              shimmerKey={shimmerKey}
            />
          )}
          <GstNote />
          <TrustedByStrip />
        </div>
      </div>

      <CheckoutDrawer
        open={drawerOpen}
        onOpenChange={(next) =>
          next ? setDrawerOpen(true) : attemptExit(() => setDrawerOpen(false), orderNeedsPayment)
        }
        item={checkoutItem}
        onProceedToPay={handleProceedToPay}
        aiAddon={{ price: AI_CALLING_ADDON.price, creditsAvailable: creditBalance["ai-calling"] }}
        extraOffer={offer.deadline ? { code: EXTRA_OFF.code, deadline: offer.deadline } : undefined}
        onExtraOfferExpired={offer.expire}
        onAiAddedChange={setAiAdded}
      />

      <JobBundleOfferDialog
        open={upsell?.kind === "bundle"}
        tier={upsell?.kind === "bundle" ? upsell.tier : null}
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => upsell?.kind === "bundle" && openCheckout(singleJobLine(upsell.tier))}
        onTake={() => upsell?.kind === "bundle" && openCheckout(bundleLine(upsell.tier))}
      />

      <CreditPackOfferDialog
        open={upsell?.kind === "credits"}
        need={
          upsell?.kind === "credits"
            ? { credits: upsell.plan.shortfall, price: upsell.plan.price, mrp: upsell.plan.mrp }
            : null
        }
        needNote={upsell?.kind === "credits" ? `Needed to post ${upsell.tier.title.toLowerCase()}` : undefined}
        pack={CREDIT_UPSELL_PACK}
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => upsell?.kind === "credits" && openCheckout(topupLine(upsell.tier, upsell.plan))}
        onTake={() => upsell?.kind === "credits" && openCheckout(creditPackLine(upsell.tier, upsell.plan))}
      />

      <AnnualUpgradeDialog
        open={upsell?.kind === "annual"}
        from={{
          label: "Monthly plan",
          price: MONTHLY_SUBSCRIPTION_PLAN.price,
          months: 1,
          dbCredits: MONTHLY_SUBSCRIPTION_PLAN.dbCreditsPerMonth,
          dbWorth: MONTHLY_SUBSCRIPTION_PLAN.dbCreditsWorth,
        }}
        extraOff={offer.claimed}
        onClose={() => setUpsell(null)}
        onStay={() => openCheckout(monthlyLine())}
        onTake={() => openCheckout(annualLine())}
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
          // countdown, the cards shimmer, and a bottom toast covered the
          // pay button on phones.
          setShimmerKey((k) => k + 1)
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

      {/* Shown in every build, deployed ones included: this page has no real
          layout or balance data yet, so the switcher is the only way to review
          its states. Remove once segment rules and balances are wired up. */}
      <JobPlanPreviewSwitcher
        layout={layout}
        onLayoutChange={setLayout}
        creditBalance={creditBalance}
        onCreditBalanceChange={setCreditBalance}
        offer={{ claimed: offer.claimed, onExpireSoon: offer.expireSoon, onReset: offer.reset }}
        wfh={{ value: wfh, onChange: setWfh }}
      />
    </div>
  )
}

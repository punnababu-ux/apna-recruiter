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
import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"
import { JobPostingChrome } from "@/components/apnahire/post-job/job-posting-chrome"
import { JOB_DRAFT_STORAGE_KEY } from "@/components/apnahire/post-job/post-job-flow"
import {
  CheckoutDrawer,
  type CartLine,
  type SubscriptionPaymentMethod,
} from "@/components/apnahire/checkout-drawer"
import { CityLockDialog } from "@/components/apnahire/city-lock-dialog"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { TrustedByStrip } from "@/components/marketing/proof-bands"
import { UpcomingPricesProvider } from "@/components/apnahire/upcoming-price-line"
import { PriceChangeBanner } from "@/components/apnahire/price-change-banner"
import { clearPostIntent, wantsAiCalling } from "@/lib/apnahire/post-intent"
import { GstNote } from "@/components/apnahire/gst-note"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { addPurchasedJobCredits } from "@/hooks/use-plans-ingress"
import { JobPlanPreviewSwitcher } from "@/components/apnahire/job-plan-preview-switcher"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { StayDialog } from "@/components/apnahire/offers/exit-stay-dialogs"
import { useExtraOff } from "@/components/apnahire/offers/use-extra-off"
import {
  AnnualUpgradeDialog,
  CreditPackOfferDialog,
  JobBundleOfferDialog,
  bundleQuote,
} from "@/components/apnahire/offers/upsell-dialogs"
import { EXTRA_OFF } from "@/content/offers"
import {
  dbCreditsLabel,
  planOrderLabel,
  planOrderPoints,
  slotTermLabel,
  type SubscriptionPlan,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import { setJobSlots, startSubscription, todayLabel, useJobSlots } from "@/hooks/use-job-slots"
import {
  TieredJobPlans,
  SubscriptionJobPlans,
  creditPlan,
  hasAnyCredits,
  type CreditPlan,
} from "@/components/apnahire/job-plan-cards"
import { ClockFading } from "@apna/design-system"
import { DbCreditsOfferNote } from "@/components/apnahire/db-credits-offer-note"
import {
  AI_CALLING_ADDON,
  NO_CREDITS,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
} from "@/content/job-plans"

export type JobPlanLayout = "tiered" | "subscription"

/** Which upsell is showing (Figma 2472:19068 / 2490:43116). */
type Upsell =
  | { kind: "bundle"; tier: JobPlanTier }
  | { kind: "credits"; tier: JobPlanTier; plan: Extract<CreditPlan, { state: "partial" }> }
  | { kind: "annual" }
  | null

/** Why the subscription is off for a work-from-home job: the CTA's short
 *  label, and the line a tap on the card shows. */
const SUBSCRIPTION_WFH_BLOCK = {
  label: "Not for work-from-home jobs",
  message: "apna Unlimited is for on-site jobs. Post this work-from-home job with a one-time plan.",
}

function randomOrderId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

/** The job being posted, from the posting flow's saved draft: its title,
 *  its city (a subscription bought here locks to it) and whether it is work
 *  from home (which rules out the subscription). Empty when there is none.
 *  Cleared when the job goes live, so "Create new job" starts fresh. */
function readDraft(): { title?: string; city?: string; locationType?: string } {
  try {
    const raw = window.localStorage.getItem(JOB_DRAFT_STORAGE_KEY)
    return (raw && JSON.parse(raw)?.draft) || {}
  } catch {
    return {}
  }
}
const draftTitle = () => readDraft().title || "Your job"

function clearDraft() {
  clearPostIntent()
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
  const [order, setOrder] = React.useState<{ lines: CartLine[]; total: number; id: string; note?: string } | null>(null)
  const [cartLines, setCartLines] = React.useState<CartLine[]>([])
  const [postedTitle, setPostedTitle] = React.useState("Your job")

  // Upsells + exit loop.
  const offer = useExtraOff()
  const [upsell, setUpsell] = React.useState<Upsell>(null)
  const [exitPrompt, setExitPrompt] = React.useState<{ proceed: () => void } | null>(null)
  // A returning recruiter is asked to stay instead (StayDialog).
  const [stayPrompt, setStayPrompt] = React.useState<{ proceed: () => void; where: "plan" | "summary" } | null>(null)
  const summaryStayAsked = React.useRef(false)
  const [shimmerKey, setShimmerKey] = React.useState(0)

  // Every price here follows the pricing phase (preview settings).
  const plans = usePlans()
  /** The pack the "short on credits" upsell offers (the board's 6 credits). */
  const creditUpsellPack = plans.bundles.find((b) => b.credits === 6) ?? plans.bundles[0]

  // Took the upsell pop-up's offer: one upsell is enough, so the order
  // summary skips the AI calling add-on.
  const [tookUpsell, setTookUpsell] = React.useState(false)
  const openCheckout = (item: CartLine, took = false) => {
    setUpsell(null)
    setTookUpsell(took)
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
    setTookUpsell(false)
    setCheckoutItem({
      id: `slot_upgrade_${total}`,
      label: `${slots.plan} · ${total} job slots`,
      // The plan with the extra slot, and that plan's database credits.
      points: [
        slotTermLabel({ slots: total, slotDays: plans.slotUpgrade.validDays }),
        dbCreditsLabel(plans.slotUpgrade.plan),
        "Valid in a single city",
      ],
      price: plans.slotUpgrade.price,
      mrp: plans.slotUpgrade.mrp,
      renewAfterDays: plans.slotUpgrade.validDays,
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
    if (readDraft().locationType === "home") setWfh(true)
  }, [])
  // The order as it stands when the summary closes: a paid job line, or the
  // AI calling agent added with no AI calling credit to cover it (a covered
  // classic job + a paid AI agent is a paying order).
  const [aiAdded, setAiAdded] = React.useState(false)
  // Came from "Post a job with AI calling": the summary opens with it added.
  const [aiIntent, setAiIntent] = React.useState(false)
  React.useEffect(() => {
    if (wantsAiCalling()) setAiIntent(true)
  }, [])
  const orderNeedsPayment =
    (checkoutItem?.price ?? 0) > 0 || (aiAdded && creditBalance["ai-calling"] < 1)
  const attemptExit = (proceed: () => void, paymentRequired = !holdsCredits, where: "plan" | "summary" = "plan") => {
    if (offer.nudgeAvailable && paymentRequired) setExitPrompt({ proceed })
    // Asked once at the order summary: leaving the plan page doesn't ask again.
    else if (offer.returning && paymentRequired && !(where === "plan" && summaryStayAsked.current)) {
      if (where === "summary") summaryStayAsked.current = true
      setStayPrompt({ proceed, where })
    } else proceed()
  }

  const singleJobLine = (tier: JobPlanTier): CartLine => ({
    id: tier.id,
    label: `${tier.title} × 1`,
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
    const plan = creditPlan(tier, creditBalance, plans.singleCredit)
    // Covered: the job line costs nothing, but the summary still opens so the
    // AI calling add-on is offered. With no paid add-on it posts from there.
    if (plan.state === "covered") {
      const count = tier.credit.count
      setTookUpsell(false)
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
    const left = plan.held + creditUpsellPack.credits - tier.credit.count
    return {
      id: "credit-pack",
      label: `${creditUpsellPack.credits} job credits`,
      sublabel: `${plan.shortfall} for ${tier.title} · ${left} left for later, valid ${creditUpsellPack.validDays} days`,
      price: creditUpsellPack.price,
      mrp: creditUpsellPack.mrp,
    }
  }

  // Monthly Unlimited: offer the annual plan first.
  const handleSelectSubscription = () => setUpsell({ kind: "annual" })

  // The same label and points as self-checkout's plan lines (one
  // vocabulary, `content/subscriptions.ts`), database credits included.
  const planLine = (plan: SubscriptionPlan): CartLine => ({
    id: `unlimited_${plan.id}`,
    label: planOrderLabel(plan),
    points: planOrderPoints(plan),
    price: plan.price,
    mrp: plan.mrp,
    renewAfterDays: plan.slotDays,
  })
  const monthlyLine = () => planLine(plans.plan("monthly"))
  const annualLine = () => planLine(plans.annualPlan)

  // A new subscription locks to the job's city: confirmed before paying.
  const [cityLock, setCityLock] = React.useState<{ city: string; pay: () => void; open: boolean } | null>(null)
  const handleProceedToPay = (total: number, lines: CartLine[], method?: SubscriptionPaymentMethod) => {
    const city = readDraft().city ?? ""
    if (!slotUpgrade && city && checkoutItem?.id.startsWith("unlimited_")) {
      setCityLock({ city, pay: () => pay(total, lines, method), open: true })
      return
    }
    pay(total, lines, method)
  }
  const pay = (total: number, lines: CartLine[], method?: SubscriptionPaymentMethod) => {
    // Everything paid with credits (job and/or AI): post now, no payment.
    if (total === 0) {
      // The job-live screen, as after a payment, minus the payment details.
      const used = lines.map((l) => l.priceLabel && `${l.priceLabel} (${l.label})`).filter(Boolean)
      setPostedTitle(draftTitle())
      setDrawerOpen(false)
      clearDraft()
      setOrder({ lines, total: 0, id: "", note: used.length ? `Used ${used.join(" + ")}` : undefined })
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
    // Credits bought: the shell stops promoting plans (usePlansIngress).
    if (checkoutItem && !checkoutItem.renewAfterDays) addPurchasedJobCredits(checkoutItem.label)
    const title = draftTitle()
    setPostedTitle(title)
    const posted = { id: `job-${Date.now().toString(36)}`, title, location: "", postedAt: todayLabel(), applied: 0 }
    // A slot upgrade: the new slot is taken by the job just posted.
    if (slotUpgrade && slots) {
      setJobSlots({ ...slots, total: slots.total + 1, jobs: [...slots.jobs, posted] })
    } else if (checkoutItem?.id.startsWith("unlimited_")) {
      // A subscription bought here starts with this job in its first slot
      // (and makes the shell's plan CTA "Manage plans"). Its line id is
      // `unlimited_<term>`.
      const term = checkoutItem.id.split("_")[1] as SubscriptionPlanId
      startSubscription(term === "annual" ? plans.annualPlan : plans.plan(term), [posted], readDraft().city || undefined)
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
        note={order.note}
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
        onStepClick={(step) => step !== "plan" && router.push(`/apnahire/jobs/new?resume=1&stage=${step}`)}
        // Phones show the step in the bottom bar, as on the questions.
        stepperClassName="max-sm:hidden"
        // Zero-credit users haven't met the credit model yet.
        actions={
          hasAnyCredits(creditBalance) ? (
            <AvailableCreditsButton balance={{ job: creditBalance.job, aiCalling: creditBalance["ai-calling"] }} />
          ) : undefined
        }
        onExitAttempt={(proceed) => attemptExit(proceed)}
      />

      {/* Phones: room under the last section for the fixed CTA bar and the
          home indicator it sits above (pb-safe-*), so "Trusted by" clears it. */}
      <div className="flex-1 px-4 py-4 pb-safe-32 sm:px-6 sm:py-6 sm:pb-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
          {/* Posting a job means signed in, so the Jan 1 price change shows:
              the banner on top, each card's Jan price (content/price-change.ts). */}
          <UpcomingPricesProvider enabled>
            <PriceChangeBanner placement="plans" />
            <div className="flex flex-col gap-1">
              <h1 className="text-h6 text-checkout-hero-fg whitespace-nowrap sm:text-2xl">
                Choose a job basis your hiring needs
              </h1>
              {/* The phone rows drop their shared line; it's said once here. */}
              {(
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground sm:hidden [&_svg]:size-3.5">
                  <ClockFading aria-hidden /> All jobs are active for 15 days
                </span>
              )}
            </div>
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
          </UpcomingPricesProvider>
          {/* Paused (user call, 2026-10-29): how to tell recruiters about the
              AI calling add-on on this page is still open (docs/TODO.md →
              "Plan cards"). The banner is kept as aiAddonBanner. */}
          {/* The DB credits offer is said once here, not on every card. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <GstNote />
            <span aria-hidden className="h-3 w-px bg-checkout-hero-fg-muted" />
            <DbCreditsOfferNote />
          </div>
          <TrustedByStrip />
        </div>
      </div>

      <CheckoutDrawer
        open={drawerOpen}
        onOpenChange={(next) =>
          next ? setDrawerOpen(true) : attemptExit(() => setDrawerOpen(false), orderNeedsPayment, "summary")
        }
        item={checkoutItem}
        onProceedToPay={handleProceedToPay}
        aiAddon={tookUpsell ? undefined : { price: AI_CALLING_ADDON.price, creditsAvailable: creditBalance["ai-calling"] }}
        extraOffer={offer.deadline ? { code: EXTRA_OFF.code, deadline: offer.deadline } : undefined}
        onExtraOfferExpired={offer.expire}
        onAiAddedChange={setAiAdded}
        aiAddedByDefault={aiIntent}
      />

      {/* The upsells quote Jan prices too (signed in, as the plans above);
          the order summary never does. */}
      <UpcomingPricesProvider enabled>
        <JobBundleOfferDialog
          open={upsell?.kind === "bundle"}
          tier={upsell?.kind === "bundle" ? upsell.tier : null}
          extraOff={offer.claimed}
          onClose={() => setUpsell(null)}
          onStay={() => upsell?.kind === "bundle" && openCheckout(singleJobLine(upsell.tier))}
          onTake={() => upsell?.kind === "bundle" && openCheckout(bundleLine(upsell.tier), true)}
        />

        <CreditPackOfferDialog
          open={upsell?.kind === "credits"}
          need={
            upsell?.kind === "credits"
              ? {
                  credits: upsell.plan.shortfall,
                  price: upsell.plan.price,
                  mrp: upsell.plan.mrp,
                  janPrice: plans.singleCredit.janPrice && upsell.plan.shortfall * plans.singleCredit.janPrice,
                }
              : null
          }
          needNote={upsell?.kind === "credits" ? `Needed to post ${upsell.tier.title.toLowerCase()}` : undefined}
          pack={creditUpsellPack}
          extraOff={offer.claimed}
          onClose={() => setUpsell(null)}
          onStay={() => upsell?.kind === "credits" && openCheckout(topupLine(upsell.tier, upsell.plan))}
          onTake={() => upsell?.kind === "credits" && openCheckout(creditPackLine(upsell.tier, upsell.plan), true)}
        />

        <AnnualUpgradeDialog
          open={upsell?.kind === "annual"}
          from={plans.plan("monthly")}
          extraOff={offer.claimed}
          onClose={() => setUpsell(null)}
          onStay={() => openCheckout(monthlyLine())}
          onTake={() => openCheckout(annualLine(), true)}
        />
      </UpcomingPricesProvider>

      <StayDialog
        open={stayPrompt !== null}
        where={stayPrompt?.where ?? "plan"}
        jobTitle={draftTitle()}
        onStay={() => setStayPrompt(null)}
        onLeave={() => {
          stayPrompt?.proceed()
          setStayPrompt(null)
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

      <CityLockDialog
        open={!!cityLock?.open}
        // Closed, it keeps the city so the title holds while it animates out.
        onOpenChange={(open) => cityLock && setCityLock({ ...cityLock, open })}
        city={cityLock?.city}
        onConfirm={() => {
          if (!cityLock) return
          cityLock.pay()
          setCityLock({ ...cityLock, open: false })
        }}
      />

      {/* Shown in every build, deployed ones included: this page has no real
          layout or balance data yet, so the switcher is the only way to review
          its states. Remove once segment rules and balances are wired up. */}
      <JobPlanPreviewSwitcher
        layout={layout}
        onLayoutChange={setLayout}
        creditBalance={creditBalance}
        onCreditBalanceChange={setCreditBalance}
        offer={{ claimed: offer.claimed, returning: offer.returning, onReturningChange: offer.setReturning, onExpireSoon: offer.expireSoon, onReset: offer.reset }}
        wfh={{ value: wfh, onChange: setWfh }}
      />
    </div>
  )
}

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
 * `JobPostingChrome` — title row, Save & exit, 3-step stepper — on the same
 * plain `bg-muted` page. Earlier steps are clickable and return to
 * `/apnahire/jobs/new`, which resumes the saved draft. Width is max-w-6xl:
 * four plan cards need it, or the longest title wraps.
 *
 * Checkout reuses `CheckoutDrawer` directly (the same slide-in-from-the-right
 * sheet `self-checkout.tsx` already uses), rather than a bespoke full-page
 * checkout — one order-summary structure for both surfaces, not two to keep
 * in sync. `CheckoutDrawer`'s job-credit upsell section only shows for an
 * item id starting with `"job-"`; every id here (`classic`, `premium`,
 * `premium-ai`, `super-premium`, `unlimited_monthly`) deliberately avoids
 * that prefix, so it never appears on this flow. Same
 * `handleProceedToPay` → `PaymentModal` → `PaymentSuccess` wiring as
 * `self-checkout.tsx`.
 *
 * `planLayout` and `creditBalance` have no real data source yet (segment
 * rules / account balance, respectively) — both are previewed via
 * `JobPlanPreviewSwitcher`, a floating control like `AuthStateSwitcher` —
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
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { JobPlanPreviewSwitcher } from "@/components/apnahire/job-plan-preview-switcher"
import {
  TieredJobPlans,
  SubscriptionJobPlans,
  creditPlan,
  hasAnyCredits,
} from "@/components/apnahire/job-plan-cards"
import {
  MONTHLY_SUBSCRIPTION_PLAN,
  NO_CREDITS,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
} from "@/content/job-plans"

export type JobPlanLayout = "tiered" | "subscription"

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
  const [postedTitle, setPostedTitle] = React.useState("Your job")


  const handleSelectTier = (tier: JobPlanTier) => {
    const plan = creditPlan(tier, creditBalance)
    // Covered: posting just spends credits — nothing to pay, no order summary.
    if (plan.state === "covered") {
      toast.success(`${readDraftTitle()} is live`, {
        description: `${creditLabel(tier.credit)} used from your balance.`,
      })
      clearDraft()
      router.push("/apnahire/jobs")
      return
    }
    // Partial: the whole balance is used and only the shortfall is bought.
    // The id avoids the "job-" prefix so the drawer shows no bundle upsell.
    if (plan.state === "partial") {
      setCheckoutItem({
        id: "credit-topup",
        label: creditLabel({ kind: tier.credit.kind, count: plan.shortfall }),
        sublabel: `For ${tier.title} · ${plan.held} from your balance + ${plan.shortfall} to buy`,
        price: plan.price,
        mrp: plan.mrp,
      })
      setDrawerOpen(true)
      return
    }

    setCheckoutItem({
      id: tier.id,
      label: tier.title,
      sublabel: `${tier.jobActiveDays} days · ${tier.dbCredits} database credits`,
      price: tier.price,
      mrp: tier.mrp,
    })
    setDrawerOpen(true)
  }

  const handleSelectSubscription = () => {
    const plan = MONTHLY_SUBSCRIPTION_PLAN
    setCheckoutItem({
      id: "unlimited_monthly",
      label: "Monthly plan",
      sublabel: `1 active job slot + ${plan.dbCreditsPerMonth} Database credits + Valid for ${plan.jobSlotMonths * 30} days`,
      price: plan.price,
      renewAfterDays: plan.jobSlotMonths * 30,
    })
    setDrawerOpen(true)
  }

  const handleProceedToPay = (total: number, _lines: CartLine[], method?: SubscriptionPaymentMethod) => {
    setPaymentAmount(total)
    setMandateMethod(method ?? null)
    setDrawerOpen(false)
    setPaymentOpen(true)
  }

  // Payment success publishes the job — no separate "post" step, so a paid
  // job can never be left sitting at Select Plan.
  const handlePaymentSuccess = () => {
    setPaymentOpen(false)
    setPostedTitle(readDraftTitle())
    clearDraft()
    setOrder({ lines: checkoutItem ? [checkoutItem] : [], total: paymentAmount, id: randomOrderId() })
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
    <div className="flex min-h-svh flex-col bg-muted">
      <JobPostingChrome
        current="plan"
        onStepClick={(step) => step !== "plan" && router.push("/apnahire/jobs/new")}
        // Zero-credit users haven't met the credit model yet.
        actions={hasAnyCredits(creditBalance) ? <AvailableCreditsButton /> : undefined}
      />

      <div className="flex-1 px-6 py-6 pb-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
          <h1 className="text-xl font-semibold text-foreground">Choose a job basis your hiring needs</h1>
          {layout === "tiered" ? (
            <TieredJobPlans creditBalance={creditBalance} onSelectTier={handleSelectTier} />
          ) : (
            <SubscriptionJobPlans
              creditBalance={creditBalance}
              onSelectTier={handleSelectTier}
              onSelectSubscription={handleSelectSubscription}
            />
          )}
          <p className="text-xs text-muted-foreground">* 18% GST will be added at checkout</p>
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
      />
    </div>
  )
}

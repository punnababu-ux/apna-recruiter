"use client"

/**
 * ManagePlan — /apnahire/plan, a subscriber's plan and how to change it
 * (user call, 2026-10-23; redesigned 2026-10-23 after Stripe, GitHub,
 * Slack, Atlassian). Reached from the top bar's "Plan details" → "Manage
 * plan", and the sidebar's / More card's "Manage plans".
 *
 *   Current plan  the plan, its price, the cycle (days left, as a meter),
 *                 then usage as meters: job slots in use, database credits
 *                 left (they end at renewal), the locked hiring city. A
 *                 booked downgrade sits under it as a row with "Keep
 *                 current plan" (GitHub's pending change).
 *   Billing       the next payment with GST (amount, date, UPI autopay or
 *                 card), then the plan's payments (invoices).
 *   Cancel plan   in the plan card's "⋯" menu: CancelPlanFlow (reason →
 *                 what is lost → cancelled). The plan runs to its renewal
 *                 date, then ends; "Renew plan" undoes it until then.
 *   Change plan   the plans step's own Unlimited cards (SubscriptionPlans,
 *                 on the checkout gradient) with this plan marked "Current
 *                 plan" at its slot count. Each card says what it does:
 *                   upgrade    "Upgrade": instant. The order summary
 *                              (CheckoutDrawer, the platform's one side
 *                              panel) shows the unused days' credit as a
 *                              bill row → payment
 *                   downgrade  "Downgrade on <date>": a confirm, nothing
 *                              to pay; booked for the renewal date
 *                 A booked change (downgrade or cancellation) turns every
 *                 CTA off, with a tooltip saying how to undo it.
 *
 * Anything less than today's plan (a shorter term or fewer slots) is a
 * downgrade (changeKindOf, lib/apnahire/bill.ts). State: hooks/use-job-slots.ts.
 */

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Badge,
  Briefcase,
  Button,
  CalendarClock,
  Card,
  CreditCard,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Lock,
  Info,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  MoreVertical,
  XCircle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Layers,
  ReceiptText,
  MapPin,
  Meter,
  MetricCard,
  Separator,
  Smartphone,
  UserSearch,
} from "@apna/design-system"
import { CheckoutDrawer, type SubscriptionPaymentMethod } from "@/components/apnahire/checkout-drawer"
import { GstNote } from "@/components/apnahire/gst-note"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { SubscriptionPlans } from "@/components/apnahire/subscription-plans"
import { NextPlanNotice, usePlanChange, useChoosePlan } from "@/components/apnahire/plan-change"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { CancelPlanFlow } from "@/components/apnahire/cancel-plan-flow"
import { PlanEndedState } from "@/components/apnahire/plan-ended"
import { recentlyEnded, usePreviousPlan } from "@/hooks/use-previous-plan"
import { SetCityAction } from "@/components/apnahire/city-lock-dialog"
import { PlanPopup, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { JobSlotsControls, PricingPhaseControls, PrototypeSettings } from "@/components/apnahire/prototype-settings"
import {
  SUBSCRIPTION_TERMS,
  planOrderLabel,
  planOrderPoints,
  type JobSlotCount,
  type SubscriptionPlan,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"
import {
  cancelScheduledChange,
  changeLockOf,
  dayLabel,
  reactivateSubscription,
  subscriptionOf,
  upgradeSubscription,
  useJobSlots,
  type Subscription,
  type SubscriptionDetails,
} from "@/hooks/use-job-slots"
import { inr, num } from "@/lib/format"
import { withGst } from "@/lib/apnahire/bill"
import { cn } from "@/lib/utils"

/** From sm the three usage tiles share the usage grid's rows (subgrid), so
 *  label, value and note sit level across them. */
const USAGE_TILE = "sm:row-span-4 sm:grid sm:grid-rows-subgrid sm:gap-y-2"

const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`

export function ManagePlan() {
  const slots = useJobSlots()
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      {/* Phones: the top bar carries the title. */}
      <PageHeader variant="transparent" className="px-0 pt-0 max-md:hidden" title="Manage plan" />
      {slots ? <PlanManager slots={slots} /> : <NoPlan />}
      {/* Prototype: opened from any "*GST applicable" note. */}
      <PrototypeSettings label="Preview plan state">
        <JobSlotsControls />
        <PricingPhaseControls />
      </PrototypeSettings>
    </div>
  )
}

function NoPlan() {
  // A plan that ended this week: what happened and the way back first.
  const prev = usePreviousPlan()
  if (recentlyEnded(prev)) return <PlanEndedState />
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No active plan</EmptyTitle>
        <EmptyDescription>Apna unlimited plans post jobs without counting credits.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<Link href="/apnahire/credits" />}>
          View plans
        </Button>
      </EmptyContent>
    </Empty>
  )
}

/** A card's header icon, on a quiet tile. */
function CardIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-card-nested bg-muted text-foreground"
    >
      <Icon className="size-5" />
    </span>
  )
}

/** A plan no longer sold: a blue info badge whose tooltip (the plan cards'
 *  dark one) says it still renews at its price. Hover, focus or tap opens
 *  it, so it works on phones too. */
function LegacyBadge({ sub }: { sub: SubscriptionDetails }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        closeOnClick={false}
        render={<button type="button" className="rounded-full" onClick={() => setOpen(true)} />}
      >
        <Badge variant="info">
          <Info aria-hidden />
          No longer sold
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        {`Your ${sub.total}-slot plan is no longer sold. It keeps renewing at ${inr(sub.paid ?? 0)}${SUBSCRIPTION_TERMS[sub.term].unit} until you change or cancel it.`}
      </TooltipContent>
    </Tooltip>
  )
}

/** "1 / 2": the reading, then the whole, quieter. */
function OfTotal({ value, total }: { value: number; total: number }) {
  return (
    <span className="whitespace-nowrap">
      {num(value)}
      <span className="text-sm font-medium text-muted-foreground"> / {num(total)}</span>
    </span>
  )
}

/** A label | value line in a list of figures (billing, the cost preview). */
function Row({
  label,
  children,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", className)}>
      <span className="min-w-0 text-sm text-muted-foreground">{label}</span>
      <span className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-foreground">{children}</span>
    </div>
  )
}

function PlanManager({ slots }: { slots: Subscription }) {
  const plans = usePlans()
  const sub = subscriptionOf(slots)
  const listPrice = plans.plan(sub.term, sub.total as JobSlotCount).price

  // The cards' slot picker starts on today's count (or the next one sold).
  const [count, setCount] = React.useState<JobSlotCount>(
    () => plans.slotCounts.find((n) => n >= sub.total) ?? plans.slotCounts[plans.slotCounts.length - 1],
  )
  // Phones: the picked row; the button under the rows acts on it.
  const [picked, setPicked] = React.useState<SubscriptionPlanId>(sub.term)
  const [cancelling, setCancelling] = React.useState(false)
  // Upgrade: order summary (the drawer, prorated) → payment.
  const [step, setStep] = React.useState<"summary" | "pay" | null>(null)
  const [target, setTarget] = React.useState<SubscriptionPlan | null>(null)
  const [payment, setPayment] = React.useState<{
    total: number
    method: SubscriptionPaymentMethod | null
  }>({
    total: 0,
    method: null,
  })

  // What each card does from here (shared with the Plans page): upgrade
  // now, prorated, or downgrade at renewal.
  const change = usePlanChange(count)!
  const credit = target ? change.credit(target) : 0
  const { choose, confirm } = useChoosePlan(change, count, (plan) => {
    setTarget(plan)
    setStep("summary")
  })
  const pickedKind = change.kindOf(picked)

  const upgraded = () => {
    if (!target) return
    setStep(null)
    upgradeSubscription(slots, target, payment.total)
    toast.success("Payment received", {
      description: `Your ${target.name.toLowerCase()} starts today.`,
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="flex flex-col lg:col-span-2">
          <CurrentPlan sub={sub} slots={slots} onCancel={() => setCancelling(true)} />
        </div>
        <Billing sub={sub} listPrice={listPrice} />
      </div>

      {/* Change plan: the plans step's own cards, on its gradient, with this
          plan marked. Upgrades go to the order summary (prorated);
          downgrades are booked for the renewal date. */}
      <section
        aria-label="Change plan"
        className="flex flex-col gap-4 rounded-card bg-gradient-checkout-hero p-4 sm:p-6"
      >
        <SubscriptionPlans
          current={change.current}
          ctaLabels={change.ctaLabels}
          ctaDisabled={change.ctaDisabled}
          ctaHints={change.ctaHints}
          recommendedPlan={change.recommendedPlan}
          slots={count}
          onSlotsChange={setCount}
          selectedPlan={picked}
          onSelectPlan={setPicked}
          onBuyMonthly={() => choose("monthly")}
          onBuyQuarterly={() => choose("quarterly")}
          onBuyAnnual={() => choose("annual")}
        />
        {/* Phones: the rows pick; this acts on the picked one. */}
        <div className="flex flex-col gap-2 md:hidden">
          <Button
            size="lg"
            variant={pickedKind === "upgrade" ? "default" : "outline"}
            className="w-full"
            disabled={pickedKind === "same" || change.ctaDisabled[picked]}
            onClick={() => choose(picked)}
          >
            {pickedKind === "same" ? "Your current plan" : change.ctaLabels[picked]}
          </Button>
          {change.ctaHints[picked] && pickedKind !== "same" && (
            <p className="text-xs text-checkout-hero-fg-muted">{change.ctaHints[picked]}</p>
          )}
          <GstNote className="text-checkout-hero-fg-muted" />
        </div>
      </section>

      {confirm}

      <CancelPlanFlow open={cancelling} onOpenChange={setCancelling} slots={slots} sub={sub} />

      <CheckoutDrawer
        open={step === "summary"}
        onOpenChange={(open) => setStep(open ? "summary" : null)}
        item={
          target
            ? {
                id: `unlimited_${target.id}_${target.slots}`,
                label: planOrderLabel(target),
                points: planOrderPoints(target),
                price: target.price,
                mrp: target.mrp,
                renewAfterDays: target.slotDays,
              }
            : null
        }
        proration={{ label: change.prorationLabel, amount: credit }}
        onProceedToPay={(total, _lines, method) => {
          setPayment({ total, method: method ?? null })
          setStep("pay")
        }}
      />
      <PaymentModal
        open={step === "pay"}
        onOpenChange={(open) => setStep(open ? "pay" : null)}
        itemLabel={target ? planOrderLabel(target) : ""}
        amount={payment.total}
        mandateMethod={payment.method}
        onSuccess={upgraded}
        onFailure={() => setStep("summary")}
      />
    </>
  )
}

/* ─────────────────────────────── Current plan ──────────────────────────── */

function CurrentPlan({
  sub,
  slots,
  onCancel,
}: {
  sub: SubscriptionDetails
  slots: Subscription
  onCancel: () => void
}) {
  const db = sub.db ?? { left: 0, total: 0 }
  const full = sub.jobs.length >= sub.total
  const lock = changeLockOf(sub)
  const legacy = !usePlans().slotCounts.includes(sub.total as JobSlotCount)
  const [reactivating, setReactivating] = React.useState(false)
  const badges = (
    <>
      {legacy && <LegacyBadge sub={sub} />}
      {!sub.cancelled ? <Badge variant="success">Active</Badge> : <Badge variant="warning">Ending</Badge>}
    </>
  )

  return (
    <Card padding="none" className="flex-1 gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="flex min-w-0 items-start gap-3">
            <CardIcon icon={Layers} />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-overline text-muted-foreground">Current plan</span>
              <h2 className="text-plan-name text-foreground">{planOrderLabel({ name: sub.plan })}</h2>
              {/* Phones: the badges go under the title; "⋯" keeps the corner. */}
              <span className="flex flex-wrap gap-1 pt-1 sm:hidden">{badges}</span>
            </div>
          </div>
          {/* Its state, not its price (the price is Billing's), and the rare
              actions tucked behind "⋯": cancelling lives there, never a button. */}
          <div className="flex shrink-0 items-center gap-1">
            <span className="hidden items-center gap-1 sm:flex">{badges}</span>
            {/* Already cancelled: nothing to cancel; "Renew plan" is below. */}
            {!sub.cancelled && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="More plan actions"
                      className="text-muted-foreground"
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem variant="destructive" onClick={onCancel}>
                    <XCircle />
                    Cancel plan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <Separator />

        {/* The cycle: where it ends, how much is left. */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <CalendarClock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              {!sub.cancelled ? "Renews on" : "Ends on"}{" "}
              <span className="whitespace-nowrap font-medium">{dayLabel(sub.renewsOn)}</span>
            </span>
            <span className="whitespace-nowrap text-muted-foreground">
              {days(sub.daysLeft)} left of {sub.termDays}
            </span>
          </div>
          <Meter label="Days left in this cycle" size="lg" value={sub.daysLeft} max={sub.termDays} />
        </div>
      </div>

      {/* token-lint-ignore: grid row template (label, spare, figure, note) for the tiles' subgrid; not a spacing value */}
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-[auto_1fr_auto_auto]">
        <MetricCard
          variant="usage"
          className={USAGE_TILE}
          icon={<Briefcase aria-hidden />}
          label="Job slots in use"
          value={<OfTotal value={sub.jobs.length} total={sub.total} />}
          trend={
            full
              ? "All slots in use. Close a job to post another."
              : `${sub.total - sub.jobs.length} free to post a job`
          }
        />
        <MetricCard
          variant="usage"
          className={USAGE_TILE}
          icon={<UserSearch aria-hidden />}
          label="Database credits left"
          value={<OfTotal value={db.left} total={db.total} />}
          trend={`Unused credits end on ${dayLabel(sub.renewsOn)}`}
        />
        <MetricCard
          variant="usage"
          className={USAGE_TILE}
          icon={<MapPin aria-hidden />}
          label={
            <>
              Hiring city
              <Lock className="size-3.5" aria-label="Locked" />
            </>
          }
          value={sub.city ?? <SetCityAction sub={slots} />}
          trend={sub.city ? "Jobs post here. Database works anywhere" : "Locks to your first job's city"}
        />
      </div>

      <PlanPopup open={reactivating} onOpenChange={setReactivating}>
        <PopupHeader
          alone
          art="expired"
          title="Renew your plan?"
          description={
            <>
              Are you sure? Your plan renews on <span className="whitespace-nowrap">{dayLabel(sub.renewsOn)}</span> and
              carries on as it is.
            </>
          }
        />
        <PopupFooter>
          <Button variant="outline" size="lg" className="flex-1" onClick={() => setReactivating(false)}>
            Not now
          </Button>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => {
              reactivateSubscription(slots)
              setReactivating(false)
            }}
          >
            Renew plan
          </Button>
        </PopupFooter>
      </PlanPopup>
      {/* A booked change (downgrade or cancellation) holds the rest back:
          what happens next, and the way back. */}
      {lock && (
        <NextPlanNotice
          sub={sub}
          lock={lock}
          action={
            lock === "downgrade"
              ? { label: "Keep current plan", onClick: () => cancelScheduledChange(slots) }
              : { label: "Renew plan", onClick: () => setReactivating(true) }
          }
        />
      )}
    </Card>
  )
}

/* ───────────────────────────────── Billing ─────────────────────────────── */

function Billing({ sub, listPrice }: { sub: SubscriptionDetails; listPrice: number }) {
  const next = sub.scheduled
  // What autopay takes: the plan price with GST, as the order summary.
  const nextPrice = withGst(next?.price ?? sub.paid ?? listPrice)
  const MethodIcon = sub.payMethod === "card" ? CreditCard : Smartphone
  const method = sub.payMethod === "card" ? "Card" : "UPI autopay"

  return (
    <Card padding="none" className="h-full gap-4 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <CardIcon icon={ReceiptText} />
        <h2 className="text-h5 text-foreground">Billing</h2>
      </div>

      <div className="flex flex-col gap-3">
        <Row label={!sub.cancelled ? "Next payment (incl. GST)" : "Next payment"}>
          {!sub.cancelled ? (
            <>
              {inr(nextPrice)} on {dayLabel(sub.renewsOn)}
            </>
          ) : (
            "None, the plan ends"
          )}
        </Row>
        <Row label="Pays with">
          <span className="flex items-center gap-1.5">
            <MethodIcon className="size-4 text-muted-foreground" aria-hidden />
            {method}
          </span>
        </Row>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-semibold text-foreground">Payments</h3>
          <Button
            variant="link"
            size="sm"
            className="h-auto px-0"
            nativeButton={false}
            render={<Link href="/apnahire/usage" />}
          >
            All invoices
          </Button>
        </div>
        <ul className="flex flex-col gap-3">
          {sub.payments.slice(0, 3).map((p) => (
            <li key={p.id}>
              <Row label={<span className="text-foreground">{planOrderLabel({ name: p.plan })}</span>}>
                {inr(p.amount)}
              </Row>
              <span className="text-xs text-muted-foreground">Paid on {dayLabel(p.on)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

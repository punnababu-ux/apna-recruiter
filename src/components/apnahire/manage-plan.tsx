"use client"

/**
 * ManagePlan — /apnahire/plan, a subscriber's plan and how to change it
 * (user call, 2026-10-23). Reached from the top bar's "Plan details" →
 * "Manage plan", and the sidebar's / More card's "Manage plans".
 *
 *   Your plan    the plan, its price, when it renews; slots in use, database
 *                credits left, the locked hiring city; a booked downgrade
 *                with "Keep current plan" to call it off
 *   Change plan  term (Monthly › Quarterly › Annual) and job slots as two
 *                choice rows, the picked plan, then what happens:
 *                  upgrade    instant. The unused days of this cycle come
 *                             off the price (prorationOf), the new plan
 *                             starts today: "Upgrade" (the screen's one
 *                             green CTA) → the order summary (CheckoutDrawer,
 *                             with the credit as a bill row) → payment
 *                  downgrade  booked for the renewal date; the plan runs
 *                             until then: "Downgrade on <date>", outline
 *
 * Anything less than today's plan (a shorter term or fewer slots) is a
 * downgrade (changeKindOf). Rules and state: hooks/use-job-slots.ts.
 */

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  CalendarClock,
  Card,
  ChipTabs,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Lock,
} from "@apna/design-system"
import { CheckoutDrawer, type SubscriptionPaymentMethod } from "@/components/apnahire/checkout-drawer"
import { GstNote } from "@/components/apnahire/gst-note"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { PageHeader } from "@/components/onlyrounds/page-header"
import {
  SUBSCRIPTION_TERMS,
  dbCreditsLabel,
  planOrderLabel,
  planOrderPoints,
  slotLabel,
  slotTermLabel,
  type JobSlotCount,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"
import {
  cancelScheduledChange,
  changeKindOf,
  dayLabel,
  isoDay,
  prorationOf,
  scheduleDowngrade,
  subscriptionOf,
  upgradeSubscription,
  useJobSlots,
  type Subscription,
} from "@/hooks/use-job-slots"
import { inr, num } from "@/lib/format"

const TERMS: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]

export function ManagePlan() {
  const slots = useJobSlots()
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      {/* Phones: the top bar carries the title. */}
      <PageHeader variant="transparent" className="px-0 pt-0 max-md:hidden" title="Manage plan" />
      {slots ? <PlanManager slots={slots} /> : <NoPlan />}
    </div>
  )
}

function NoPlan() {
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

/** A figure on the plan card: label over value. */
function Stat({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-card-nested bg-muted p-4">
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-semibold tabular-nums text-foreground">{children}</span>
    </div>
  )
}

function OfTotal({ used, total }: { used: number; total: number }) {
  return (
    <>
      {num(used)}
      <span className="text-base font-medium text-muted-foreground"> / {num(total)}</span>
    </>
  )
}

function PlanManager({ slots }: { slots: Subscription }) {
  const plans = usePlans()
  const sub = subscriptionOf(slots)
  const listPrice = plans.plan(sub.term, sub.total as JobSlotCount).price

  // Start on today's plan; a slot count no longer sold starts on the next
  // one up.
  const [term, setTerm] = React.useState<SubscriptionPlanId>(sub.term)
  const [count, setCount] = React.useState<JobSlotCount>(
    () => plans.slotCounts.find((n) => n >= sub.total) ?? plans.slotCounts[plans.slotCounts.length - 1],
  )
  // Upgrade: order summary (the drawer, prorated) → payment.
  const [step, setStep] = React.useState<"summary" | "pay" | null>(null)
  const [payment, setPayment] = React.useState<{ total: number; method: SubscriptionPaymentMethod | null }>({
    total: 0,
    method: null,
  })

  const target = plans.plan(term, count)
  const kind = changeKindOf(sub, target)
  const { credit } = prorationOf(sub, target.price, listPrice)
  const booked = sub.scheduled?.term === target.id && sub.scheduled.slots === target.slots
  const toExpire = Math.max(0, sub.jobs.length - target.slots)
  const unit = SUBSCRIPTION_TERMS[sub.term].unit

  // No toast: the booked downgrade shows on the plan card at once.
  const downgrade = () => scheduleDowngrade(slots, target)

  const upgraded = () => {
    setStep(null)
    upgradeSubscription(slots, target)
    toast.success("Payment received", {
      description: `Your ${target.name.toLowerCase()} starts today.`,
    })
  }

  return (
    <>
      {/* Your plan */}
      <Card padding="none" className="gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="flex flex-wrap items-center gap-2">
              <h2 className="text-plan-name text-foreground">{planOrderLabel({ name: sub.plan })}</h2>
              <Badge variant="success">Active</Badge>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarClock className="size-4 shrink-0" aria-hidden />
              Renews on {dayLabel(sub.renewsOn)}
              <span aria-hidden>·</span>
              <span className="whitespace-nowrap">
                {sub.daysLeft} {sub.daysLeft === 1 ? "day" : "days"} left
              </span>
            </span>
          </div>
          <p className="flex shrink-0 items-baseline gap-1 whitespace-nowrap">
            <span className="text-plan-price-compact text-foreground">{inr(sub.paid ?? listPrice)}</span>
            <span className="text-plan-unit text-muted-foreground">{unit}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="Job slots in use">
            <OfTotal used={sub.jobs.length} total={sub.total} />
          </Stat>
          <Stat label="Database credits left">
            <OfTotal used={sub.db?.left ?? 0} total={sub.db?.total ?? 0} />
          </Stat>
          <Stat
            label={
              <>
                Hiring city
                <Lock className="size-3.5" aria-label="Locked" />
              </>
            }
          >
            {sub.city}
          </Stat>
        </div>
        {sub.scheduled && (
          <Alert variant="info">
            <CalendarClock aria-hidden />
            <AlertTitle>Downgrade on {dayLabel(sub.renewsOn)}</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-2">
              <span>
                It renews as the {planOrderLabel(SUBSCRIPTION_TERMS[sub.scheduled.term])} with{" "}
                {slotLabel(sub.scheduled.slots)}. Until then your plan runs as it is.
              </span>
              <Button variant="link" size="sm" className="h-auto px-0" onClick={() => cancelScheduledChange(slots)}>
                Keep current plan
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Change plan */}
      <Card padding="none" className="gap-6 p-4 sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-h5 text-foreground">Change plan</h2>
          <p className="text-sm text-muted-foreground">
            Upgrades start today. Downgrades start when your plan renews.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Plan length</span>
            <ChipTabs
              aria-label="Plan length"
              variant="choice"
              size="lg"
              value={term}
              onValueChange={setTerm}
              items={TERMS.map((id) => ({ value: id, label: SUBSCRIPTION_TERMS[id].title }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Active job slots</span>
            <ChipTabs
              aria-label="Active job slots"
              variant="choice"
              size="lg"
              value={String(count)}
              onValueChange={(v) => setCount(Number(v) as JobSlotCount)}
              items={plans.slotCounts.map((n) => ({ value: String(n), label: `${n} ${n === 1 ? "slot" : "slots"}` }))}
            />
          </div>
        </div>

        {/* The picked plan and what moving to it means. */}
        <div className="flex flex-col gap-4 rounded-card-nested bg-muted p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-base font-semibold text-foreground">{planOrderLabel(target)}</span>
            <span className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-lg font-semibold text-foreground">{inr(target.price)}</span>
              <span className="text-plan-unit text-muted-foreground">{target.unit}</span>
              {target.mrp && <span className="text-plan-strike text-muted-foreground line-through">{inr(target.mrp)}</span>}
            </span>
          </div>
          <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
            <li>{slotTermLabel(target)}</li>
            <li>{dbCreditsLabel(target)}</li>
          </ul>

          {/* The full bill is the order summary's; here, the credit only. */}
          {kind === "upgrade" && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-success">{inr(credit)} off</span> for the {sub.daysLeft} unused days
              of your plan. Starts today and renews on{" "}
              <span className="whitespace-nowrap">{dayLabel(isoDay(target.slotDays))}</span>. Your live jobs stay
              live.
            </p>
          )}
          {kind === "downgrade" && (
            <p className="text-sm text-muted-foreground">
              Starts on <span className="whitespace-nowrap">{dayLabel(sub.renewsOn)}</span>, when your plan renews.
              Until then you keep {slotLabel(sub.total)}.
              {toExpire > 0 &&
                ` You have ${sub.jobs.length} live jobs: close ${toExpire === 1 ? "one" : toExpire} before then, or the newest ${
                  toExpire === 1 ? "one expires" : `${toExpire} expire`
                }.`}
            </p>
          )}
        </div>

        {/* One action, by what the change is: green for an upgrade (it's
            the screen's one purchase), outline for a downgrade. */}
        <div className="flex flex-col gap-2">
          {kind === "same" ? (
            <Button size="lg" variant="outline" className="w-full" disabled>
              Your current plan
            </Button>
          ) : kind === "upgrade" ? (
            <Button size="lg" className="w-full" onClick={() => setStep("summary")}>
              Upgrade
            </Button>
          ) : (
            <Button size="lg" variant="outline" className="w-full" disabled={booked} onClick={downgrade}>
              {booked ? "Downgrade booked" : `Downgrade on ${dayLabel(sub.renewsOn)}`}
            </Button>
          )}
          {kind === "upgrade" && <GstNote className="text-center text-muted-foreground" />}
        </div>
      </Card>

      <CheckoutDrawer
        open={step === "summary"}
        onOpenChange={(open) => setStep(open ? "summary" : null)}
        item={
          kind === "upgrade"
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
        proration={{ label: `Unused ${sub.daysLeft} of ${sub.termDays} days on your plan`, amount: credit }}
        onProceedToPay={(total, _lines, method) => {
          setPayment({ total, method: method ?? null })
          setStep("pay")
        }}
      />
      <PaymentModal
        open={step === "pay"}
        onOpenChange={(open) => setStep(open ? "pay" : null)}
        itemLabel={planOrderLabel(target)}
        amount={payment.total}
        mandateMethod={payment.method}
        onSuccess={upgraded}
        onFailure={() => setStep("summary")}
      />
    </>
  )
}

"use client"

/**
 * After a plan ends (rules: docs/PRICING.md → "When a plan ends"). The
 * account is back on job credits with nothing held back; these only make
 * coming back easy. None shows while a plan is active.
 *
 *   PlanEndedBanner    compact, for a week (BANNER_DAYS): the jobs dashboard
 *                      and Manage plan. "Your Unlimited monthly plan ended on
 *                      10 Nov 2026" (+ why, for a failed payment) · Renew.
 *   PreviousPlanCard   self-checkout, above the page title, for a month
 *                      (RENEW_CARD_DAYS): the plan, its slots, today's price
 *                      (the old price ended with the plan) and "Renew" — the
 *                      dark companion, beside the page's green CTAs. A plan
 *                      no longer sold offers "View plans" instead.
 *   PlanEndedState     Manage plan's body for that week, in place of "No
 *                      active plan": what ended, what happened, Renew.
 *
 * Renewing buys the plan like a first purchase: the hiring city is asked
 * again at the next job post.
 */

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertBanner,
  Button,
  CalendarClock,
  Card,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  History,
} from "@apna/design-system"
import { SUBSCRIPTION_TERMS, planOrderLabel, slotLabel, type JobSlotCount } from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { dayLabel, useJobSlots } from "@/hooks/use-job-slots"
import { recentlyEnded, showRenewCard, usePreviousPlan, type PreviousPlan } from "@/hooks/use-previous-plan"
import { inr } from "@/lib/format"

const RENEW_HREF = "/apnahire/credits?tab=unlimited"

const planName = (prev: PreviousPlan) => planOrderLabel(SUBSCRIPTION_TERMS[prev.term])
const why = (prev: PreviousPlan) =>
  prev.reason === "payment-failed" ? "The renewal payment didn't go through." : "You cancelled it."

/** The previous plan as sold today, or null when it no longer is. */
function useRenewable(prev: PreviousPlan | null) {
  const plans = usePlans()
  if (!prev || !plans.slotCounts.includes(prev.slots as JobSlotCount)) return null
  return plans.plan(prev.term, prev.slots as JobSlotCount)
}

export function PlanEndedBanner({ className }: { className?: string }) {
  const router = useRouter()
  const active = useJobSlots()
  const prev = usePreviousPlan()
  if (active || !prev || !recentlyEnded(prev)) return null
  return (
    <AlertBanner
      variant="warning"
      className={className}
      icon={<CalendarClock aria-hidden />}
      title={
        <>
          Your {planName(prev).toLowerCase()} ended on <span className="whitespace-nowrap">{dayLabel(prev.endedOn)}</span>.{" "}
          {why(prev)}
        </>
      }
      action={{ label: "Renew", onClick: () => router.push(RENEW_HREF) }}
    />
  )
}

export function PreviousPlanCard({ onRenew, onViewPlans }: { onRenew: (plan: NonNullable<ReturnType<typeof useRenewable>>) => void; onViewPlans: () => void }) {
  const active = useJobSlots()
  const prev = usePreviousPlan()
  const plan = useRenewable(prev)
  if (active || !prev || !showRenewCard(prev)) return null
  return (
    <Card padding="none" className="flex-row flex-wrap items-center justify-between gap-x-6 gap-y-3 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-card-nested bg-muted text-foreground">
          <History className="size-5" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-overline text-muted-foreground">Your previous plan</span>
          <span className="text-base font-semibold text-foreground">
            {planName(prev)} · {slotLabel(prev.slots)}
          </span>
          <span className="text-xs text-muted-foreground">
            Ended on {dayLabel(prev.endedOn)}
          </span>
        </div>
      </div>
      {plan ? (
        <div className="flex items-center gap-4">
          <span className="flex items-baseline gap-1 whitespace-nowrap">
            <span className="text-lg font-semibold text-foreground">{inr(plan.price)}</span>
            <span className="text-plan-unit text-muted-foreground">{plan.unit}</span>
          </span>
          <Button variant="emphasis" onClick={() => onRenew(plan)}>
            Renew
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={onViewPlans}>
          View plans
        </Button>
      )}
    </Card>
  )
}

export function PlanEndedState() {
  const prev = usePreviousPlan()
  if (!prev || !recentlyEnded(prev)) return null
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Your plan ended</EmptyTitle>
        <EmptyDescription>
          Your {planName(prev).toLowerCase()} with {slotLabel(prev.slots)} ended on {dayLabel(prev.endedOn)}. {why(prev)}{" "}
          Its live jobs have expired. You can post with job credits, or renew to hire without counting credits.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row flex-wrap justify-center gap-3">
        <Button nativeButton={false} render={<Link href={RENEW_HREF} />}>
          Renew
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/apnahire/credits" />}>
          View plans
        </Button>
      </EmptyContent>
    </Empty>
  )
}

"use client"

/**
 * After a plan ends (rules: docs/PRICING.md → "When a plan ends"). The
 * account is back on job credits with nothing held back; these only make
 * coming back easy. None shows while a plan is active.
 *
 *   PlanEndedBanner    for a week (BANNER_DAYS), above the page title on the
 *                      jobs dashboard, Manage plan and the plans page: a red
 *                      RenewalBanner, "Your Apna unlimited plan expired on
 *                      6 May 2026. Resubscribe at the same price." with the
 *                      plan's slot and database credits, the price last paid
 *                      and Renew now. The plan card is gone by then.
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
  Badge,
  ChevronRight,
  RefreshCw,
  RenewalBanner,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@apna/design-system"
import { SUBSCRIPTION_TERMS, planOrderLabel, slotLabel, slotTermLabel, type JobSlotCount } from "@/content/subscriptions"
import { openPrototypeSettings } from "@/components/apnahire/prototype-settings"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { inr, num } from "@/lib/format"
import { dayLabel, useJobSlots } from "@/hooks/use-job-slots"
import { recentlyEnded, usePreviousPlan, type PreviousPlan } from "@/hooks/use-previous-plan"

const RENEW_HREF = "/apnahire/credits?tab=unlimited"

const planName = (prev: PreviousPlan) => planOrderLabel(SUBSCRIPTION_TERMS[prev.term])
const why = (prev: PreviousPlan) =>
  prev.reason === "payment-failed" ? "The renewal payment didn't go through." : "You cancelled it."

export function PlanEndedBanner({ className, onRenew }: { className?: string; onRenew?: () => void }) {
  const router = useRouter()
  const active = useJobSlots()
  const prev = usePreviousPlan()
  const plans = usePlans()
  if (active || !prev || !recentlyEnded(prev)) return null
  // Older saved state has no price or credits: today's plan stands in.
  const today = plans.slotCounts.includes(prev.slots as JobSlotCount) ? plans.plan(prev.term, prev.slots as JobSlotCount) : null
  const paid = prev.paid ?? today?.price
  const db = prev.dbCredits ?? today?.dbCredits
  // Struck price and % OFF only when today's list price is above it.
  const mrp = paid && today?.mrp && today.mrp > paid ? today.mrp : null
  const off = paid && mrp ? Math.round((1 - paid / mrp) * 100) : null
  return (
    <RenewalBanner
      variant="destructive"
      className={className}
      icon={<RefreshCw />}
      title={`Your Apna unlimited plan expired on ${dayLabel(prev.endedOn)}.`}
      // Prototype: a silent click opens the preview settings (this state has
      // no plan card to reach them from). Remove before production.
      subtitle={<span onClick={openPrototypeSettings}>Resubscribe at the same price.</span>}
      items={[
        { label: slotTermLabel({ slots: prev.slots, slotDays: SUBSCRIPTION_TERMS[prev.term].slotDays }) },
        ...(db ? [{ label: `${num(db)} database credits` }] : []),
      ]}
      price={paid ? inr(paid) : undefined}
      mrp={mrp ? inr(mrp) : undefined}
      badge={
        off ? (
          <Badge variant="outline" className="border-transparent bg-foreground/15 text-foreground">
            {off}% OFF
          </Badge>
        ) : undefined
      }
      cta={
        // The plans page opens its Unlimited tab in place.
        <Button variant="secondary" trailingIcon={<ChevronRight />} onClick={onRenew ?? (() => router.push(RENEW_HREF))}>
          Renew now
        </Button>
      }
    />
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

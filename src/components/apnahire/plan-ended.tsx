"use client"

/**
 * After a plan ends (rules: docs/reference/PRICING.md → "When a plan ends"). The
 * account is back on job credits with nothing held back; these only make
 * coming back easy. None shows while a plan is active.
 *
 *   PlanEndedBanner    for a week (BANNER_DAYS), above the page title on the
 *                      jobs dashboard, Manage plan and the plans page: a red
 *                      rebuy OfferBar: "Your plan ended on …", "Your old price
 *                      is still yours. Renew before it goes", the plan's slot and database credits, the
 *                      price last paid and Renew plan. The plan card is gone
 *                      by then.
 *   PlanEndedState     Manage plan's body for that week, in place of "No
 *                      active plan": what ended, what happened, Renew.
 *
 * Renewing buys the plan like a first purchase: the hiring city is asked
 * again at the next job post.
 */

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Button,
  OfferBar,
  OfferBarAccent,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@apna/design-system"
import { SUBSCRIPTION_TERMS, planOrderLabel, slotLabel, slotTermLabel, type JobSlotCount } from "@/content/subscriptions"
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
  // Struck price only when today's list price is above what they paid.
  const mrp = paid && today?.mrp && today.mrp > paid ? today.mrp : null
  return (
    <OfferBar
      tone="renew"
      className={className}
      art={<Image src="/images/company/values/banner-rebuy.png" alt="" width={96} height={96} unoptimized />}
      badge={`Your plan ended on ${dayLabel(prev.endedOn)}`}
      headline={
        <>
          Your <OfferBarAccent>old price</OfferBarAccent> is still yours. Renew before it goes
        </>
      }
      sub={[slotTermLabel({ slots: prev.slots, slotDays: SUBSCRIPTION_TERMS[prev.term].slotDays }), ...(db ? [`${num(db)} database credits`] : [])].join(" · ")}
      price={paid ? { amount: inr(paid), strike: mrp ? inr(mrp) : undefined } : undefined}
      cta={
        // The plans page opens its Unlimited tab in place.
        <Button variant="emphasis" onClick={onRenew ?? (() => router.push(RENEW_HREF))}>
          Renew plan
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
          Your {planName(prev).toLowerCase()} ({slotLabel(prev.slots)}) ended on {dayLabel(prev.endedOn)}. {why(prev)}{" "}
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

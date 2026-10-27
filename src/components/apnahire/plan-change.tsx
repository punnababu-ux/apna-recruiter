"use client"

/**
 * Plan change — what the Unlimited plan cards do for someone who already
 * subscribes, shared by Manage plan and the Plans page's Unlimited tab so
 * the two never disagree (user call, 2026-10-23; flows from the team's
 * reference screens).
 *
 *   usePlanChange(slots)  for the slot count picked above the cards:
 *     current          the subscriber's plan, marked "Current plan", at
 *                      what they pay (never an offer)
 *     kindOf(id)       "same" · "upgrade" · "downgrade" (changeKindOf)
 *     ctaLabels        "Upgrade" · "Downgrade on <renewal date>" ·
 *                      "Downgrade booked"
 *     lock             changeLockOf: a booked downgrade or a renewal under
 *                      way blocks every other change. Each CTA is then off,
 *                      with ctaHints saying why (and when it frees up).
 *     recommendedPlan  annual only while it is an upgrade
 *     credit(plan)     the unused days of this cycle, off an upgrade
 *   useChoosePlan      a card's CTA → the right flow:
 *     upgrade    UpgradeConfirm (immediate, prorated, what grows, the next
 *                bill) → `onUpgrade` (the order summary → payment)
 *     downgrade  DowngradeFlow: why → what shrinks and the next bill →
 *                "Downgrade scheduled" (booked for the renewal date)
 *   NextPlanNotice     the banner for a booked downgrade (warning) or a
 *                      renewal under way (info), on the plan card and in
 *                      the blocked cancel pop-up.
 *
 * Null for someone without a subscription: the cards sell as usual.
 */

import * as React from "react"
import {
  Alert,
  AlertBanner,
  AlertDescription,
  AlertTriangle,
  Button,
  CalendarClock,
} from "@apna/design-system"
import {
  SUBSCRIPTION_TERMS,
  planOrderLabel,
  slotLabel,
  type JobSlotCount,
  type SubscriptionPlan,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import { usePlans } from "@/hooks/apnahire/use-plans"
import {
  changeKindOf,
  changeLockOf,
  dayLabel,
  isoDay,
  prorationOf,
  scheduleDowngrade,
  subscriptionOf,
  useJobSlots,
  type ChangeLock,
  type Subscription,
  type SubscriptionDetails,
} from "@/hooks/use-job-slots"
import { inr, num } from "@/lib/format"
import {
  ChangeList,
  PlanPopup,
  PopupBody,
  PopupFooter,
  PopupHeader,
  PopupResult,
  ReasonStep,
  useReasons,
} from "@/components/apnahire/plan-popup"

const TERMS: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]

const DOWNGRADE_REASONS = [
  "My hiring needs have reduced right now",
  "The current plan is too expensive for my budget",
  "I'm not getting enough relevant candidates",
  "I don't need to keep many jobs active at a time",
  "Other reasons",
] as const

const strong = (node: React.ReactNode) => <span className="whitespace-nowrap font-semibold text-foreground">{node}</span>
const priceUnit = (price: number, unit: string) => strong(`${inr(price)}${unit}`)

export function usePlanChange(count: JobSlotCount) {
  const slots = useJobSlots()
  const plans = usePlans()
  if (!slots) return null

  const sub = subscriptionOf(slots)
  const listPrice = plans.plan(sub.term, sub.total as JobSlotCount).price
  const lock = changeLockOf(sub)
  // A plan no longer on the price list (none today; kept for when one is retired):
  // it keeps renewing at its price; changing away from it is for good.
  const legacy = !plans.slotCounts.includes(sub.total as JobSlotCount)
  const kindOf = (id: SubscriptionPlanId) => changeKindOf(sub, plans.plan(id, count))
  const isBooked = (id: SubscriptionPlanId) => sub.scheduled?.term === id && sub.scheduled.slots === count
  const each = <T,>(f: (id: SubscriptionPlanId) => T) =>
    Object.fromEntries(TERMS.map((id) => [id, f(id)])) as Record<SubscriptionPlanId, T>
  const date = dayLabel(sub.renewsOn)

  return {
    slots,
    sub,
    listPrice,
    lock,
    legacy,
    kindOf,
    isBooked,
    // Marked at what they pay, never today's sale price.
    current: { plan: sub.term, slots: sub.total, price: sub.paid ?? listPrice },
    ctaLabels: each((id) =>
      kindOf(id) === "upgrade" ? "Upgrade" : isBooked(id) ? "Downgrade booked" : `Downgrade on ${date}`,
    ),
    // A pending change blocks the rest: one change at a time.
    ctaDisabled: each((id) => !!lock || isBooked(id)),
    ctaHints: each((id): React.ReactNode =>
      lock === "downgrade"
        ? isBooked(id)
          ? `Downgrade scheduled. Your current plan stays active until ${date}; the new plan starts then.`
          : `A downgrade is scheduled for ${date}. Keep your current plan first to choose another.`
        : lock === "cancel"
          ? `Your plan is cancelled and ends on ${date}. Reactivate it first to change plans.`
          : null,
    ),
    // The ribbon and green CTA sell: never on a downgrade or a locked plan.
    recommendedPlan: !lock && kindOf("annual") === "upgrade" ? ("annual" as const) : null,
    credit: (plan: SubscriptionPlan) => prorationOf(sub, plan.price, listPrice).credit,
    /** The order summary's credit row for an upgrade. */
    prorationLabel: `Unused ${sub.daysLeft} of ${sub.termDays} days on your plan`,
  }
}
export type PlanChange = NonNullable<ReturnType<typeof usePlanChange>>

/** "Unlimited monthly plan (1 active job slot)". */
const planWithSlots = (term: SubscriptionPlanId, slots: number) =>
  `${planOrderLabel(SUBSCRIPTION_TERMS[term])} (${slotLabel(slots)})`

/** What happens next, when a booked change blocks the rest: a downgrade
 *  or a cancellation (both warning). With `action` (the plan card's
 *  "Keep current plan") it is the system's action banner (AlertBanner);
 *  without, a plain Alert (inside a pop-up). */
export function NextPlanNotice({
  sub,
  lock,
  action,
}: {
  sub: SubscriptionDetails
  lock: ChangeLock
  action?: { label: React.ReactNode; onClick: () => void }
}) {
  const date = <span className="whitespace-nowrap">{dayLabel(sub.renewsOn)}</span>
  // Both are booked changes that hold the rest back: one warning banner.
  const variant = "warning"
  const Icon = lock === "cancel" ? CalendarClock : AlertTriangle
  const text =
    lock === "downgrade" && sub.scheduled ? (
      <>
        Your downgrade to the {planWithSlots(sub.scheduled.term, sub.scheduled.slots)} is scheduled on {date}.
      </>
    ) : (
      <>Your plan is cancelled and ends on {date}. It won&apos;t renew.</>
    )
  return action ? (
    <AlertBanner variant={variant} icon={<Icon aria-hidden />} title={text} action={action} />
  ) : (
    <Alert variant={variant}>
      <Icon aria-hidden />
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

/** In the change pop-ups: leaving a plan no longer sold is for good. */
function NoWayBack({ sub }: { sub: SubscriptionDetails }) {
  const plans = usePlans()
  if (plans.slotCounts.includes(sub.total as JobSlotCount)) return null
  return (
    <Alert variant="warning">
      <AlertTriangle aria-hidden />
      <AlertDescription>
        {`Your ${sub.total}-slot plan is no longer sold. Once you change, you can’t switch back to it.`}
      </AlertDescription>
    </Alert>
  )
}

/** The lines that move between two plans: slots and database credits, and
 *  the plan length when it changes. */
function changeLines(sub: SubscriptionDetails, plan: SubscriptionPlan, direction: "up" | "down") {
  const lines: { text: React.ReactNode; lost?: boolean }[] = []
  if (plan.slots !== sub.total)
    lines.push({
      text: `Jobs active at a time ${plan.slots > sub.total ? "increase" : "decrease"} from ${sub.total} to ${plan.slots}`,
      lost: plan.slots < sub.total,
    })
  const db = sub.db?.total ?? 0
  if (plan.dbCredits !== db)
    lines.push({
      text: `Database credits ${plan.dbCredits > db ? "increase" : "decrease"} from ${num(db)} to ${num(plan.dbCredits)}`,
      lost: plan.dbCredits < db,
    })
  if (plan.id !== sub.term)
    lines.push({
      text: `Plan length changes from ${SUBSCRIPTION_TERMS[sub.term].title.toLowerCase()} to ${plan.title.toLowerCase()}`,
      lost: direction === "down",
    })
  if (direction === "down") lines.push({ text: "All other features stay the same" })
  return lines
}

/** Upgrade: immediate and prorated; confirm before the order summary. */
export function UpgradeConfirm({
  sub,
  plan,
  onConfirm,
  onClose,
}: {
  sub: SubscriptionDetails
  /** The plan to upgrade to; null keeps it closed. */
  plan: SubscriptionPlan | null
  onConfirm: (plan: SubscriptionPlan) => void
  onClose: () => void
}) {
  return (
    <PlanPopup open={!!plan} onOpenChange={(open) => !open && onClose()}>
      {plan && (
        <>
          <PopupHeader art="improve" title="Upgrade plan?" />
          <PopupBody>
            <div className="flex flex-col gap-4 rounded-card-nested bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Your plan is upgraded {strong("immediately")}. The unused days of your current plan come off the price.
              </p>
              <ChangeList
                title="What changes after the upgrade"
                items={changeLines(sub, plan, "up")}
                className="bg-transparent p-0"
              />
            </div>
            <ChangeList
              title={`Next billing cycle (${dayLabel(isoDay(plan.slotDays))})`}
              items={[{ text: <>Your plan renews at {priceUnit(plan.price, plan.unit)}</> }]}
            />
            <NoWayBack sub={sub} />
          </PopupBody>
          <PopupFooter>
            <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button size="lg" className="flex-1" onClick={() => onConfirm(plan)}>
              Upgrade now
            </Button>
          </PopupFooter>
        </>
      )}
    </PlanPopup>
  )
}

type DowngradeStep = "reason" | "confirm" | "done"

/** Downgrade: why → what shrinks and the next bill → scheduled. */
export function DowngradeFlow({
  slots,
  sub,
  plan,
  onClose,
}: {
  slots: Subscription
  sub: SubscriptionDetails
  /** The plan to downgrade to; null keeps it closed. */
  plan: SubscriptionPlan | null
  onClose: () => void
}) {
  const [step, setStep] = React.useState<DowngradeStep>("reason")
  const reasons = useReasons(DOWNGRADE_REASONS)
  // Each opening starts again; the plan is held so the last step can still
  // name it after the booking clears the picker's state.
  const [shown, setShown] = React.useState<SubscriptionPlan | null>(plan)
  if (plan && plan !== shown) {
    setShown(plan)
    setStep("reason")
    reasons.reset()
  }
  const target = plan ?? shown
  const date = dayLabel(sub.renewsOn)
  const expiring = target ? sub.jobs.length - target.slots : 0

  return (
    <PlanPopup open={!!plan} onOpenChange={(open) => !open && onClose()}>
      {target &&
        (step === "reason" ? (
          <>
            <PopupHeader
              art="contact"
              title="Why are you downgrading?"
              description="We'd appreciate your feedback to improve the product."
            />
            <ReasonStep id="downgrade-reason" state={reasons} />
            <PopupFooter>
              <Button variant="outline" size="lg" className="flex-1" disabled={!reasons.ready} onClick={() => setStep("confirm")}>
                Continue
              </Button>
              <Button size="lg" className="flex-1" onClick={onClose}>
                Keep current plan
              </Button>
            </PopupFooter>
          </>
        ) : step === "confirm" ? (
          <>
            <PopupHeader
              art="job-types"
              title="Continue downgrading?"
              description={<>Your current plan stays active until {strong(date)}. Then it changes as below.</>}
            />
            <PopupBody>
              <ChangeList title="What changes if you downgrade" items={changeLines(sub, target, "down")} />
              <ChangeList
                title={`Next billing cycle (${date})`}
                items={[{ text: <>Your plan renews at {priceUnit(target.price, target.unit)}</> }]}
              />
              <NoWayBack sub={sub} />
              {expiring > 0 && (
                <Alert variant="warning">
                  <AlertDescription>
                    You have {sub.jobs.length} live jobs. Close {expiring === 1 ? "one" : expiring} before {date}, or the
                    newest {expiring === 1 ? "one expires" : `${expiring} expire`}.
                  </AlertDescription>
                </Alert>
              )}
            </PopupBody>
            <PopupFooter>
              <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
                Keep current plan
              </Button>
              <Button
                variant="destructive-solid"
                size="lg"
                className="flex-1"
                onClick={() => {
                  scheduleDowngrade(slots, target, reasons.answers)
                  setStep("done")
                }}
              >
                Confirm downgrade
              </Button>
            </PopupFooter>
          </>
        ) : (
          <PopupResult
            art="success"
            title="Downgrade scheduled"
            action={
              <Button size="lg" className="w-full" onClick={onClose}>
                Okay, got it
              </Button>
            }
          >
            Your current plan stays fully active until {strong(date)}. From your next billing cycle it switches to the{" "}
            {planOrderLabel(target)} at {priceUnit(target.price, target.unit)}.
          </PopupResult>
        ))}
    </PlanPopup>
  )
}

/** The card's action for a subscriber: an upgrade is confirmed, then goes
 *  to `onUpgrade` (the order summary); a downgrade runs DowngradeFlow. A
 *  locked plan (lock) does nothing: its CTAs are off. */
export function useChoosePlan(change: PlanChange | null, count: JobSlotCount, onUpgrade: (plan: SubscriptionPlan) => void) {
  const plans = usePlans()
  const [upgradeTo, setUpgradeTo] = React.useState<SubscriptionPlan | null>(null)
  const [downgradeTo, setDowngradeTo] = React.useState<SubscriptionPlan | null>(null)
  const choose = (id: SubscriptionPlanId) => {
    if (!change || change.lock) return
    const plan = plans.plan(id, count)
    const kind = change.kindOf(id)
    if (kind === "upgrade") setUpgradeTo(plan)
    else if (kind === "downgrade" && !change.isBooked(id)) setDowngradeTo(plan)
  }
  const confirm = change ? (
    <>
      <UpgradeConfirm
        sub={change.sub}
        plan={upgradeTo}
        onClose={() => setUpgradeTo(null)}
        onConfirm={(plan) => {
          setUpgradeTo(null)
          onUpgrade(plan)
        }}
      />
      <DowngradeFlow slots={change.slots} sub={change.sub} plan={downgradeTo} onClose={() => setDowngradeTo(null)} />
    </>
  ) : null
  return { choose, confirm }
}

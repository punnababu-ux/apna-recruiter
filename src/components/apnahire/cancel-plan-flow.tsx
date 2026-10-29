"use client"

/**
 * CancelPlanFlow — cancelling an Unlimited plan, from Manage plan's "⋯" menu
 * (user call, 2026-10-23, from the team's reference screens). One pop-up
 * (PlanPopup), three steps:
 *
 *   reason   "Why are you cancelling?": checkboxes and, for "Other
 *            reasons", a note. Green "Keep current plan"; "Continue" stays
 *            off until a reason is picked.
 *   confirm  "Cancel plan?": the plan stays active until its renewal date,
 *            then these benefits go. Red "Cancel plan" or "Keep current
 *            plan".
 *   done     "Plan cancelled": access continues until the renewal date.
 *
 * Blocked (changeLockOf) — the pop-up only explains, no steps:
 *   downgrade  a downgrade is booked: it says so; cancel after that date
 *              (or keep the current plan first, from the plan card)
 *   renewal    the renewal is under way: cancel after it has renewed
 *
 * Cancelling never ends the plan early (`cancelAtRenewal`): it runs to
 * its renewal date and nothing more is paid; "Renew plan" undoes it
 * until then. The reasons are kept with
 * the subscription (prototype; in production they go to the API).
 */

import * as React from "react"
import { Alert, AlertDescription, Button, Info } from "@apna/design-system"
import { planOrderLabel, slotLabel } from "@/content/subscriptions"
import {
  cancelAtRenewal,
  changeLockOf,
  dayLabel,
  type Subscription,
  type SubscriptionDetails,
} from "@/hooks/use-job-slots"
import { num } from "@/lib/format"
import {
  ChangeList,
  PlanPopup,
  PopupBody,
  PopupDescription,
  PopupFooter,
  PopupHeader,
  PopupResult,
  ReasonStep,
  useReasons,
} from "@/components/apnahire/plan-popup"
import { NextPlanNotice } from "@/components/apnahire/plan-change"

const REASONS = [
  "I have hired all the staff I needed",
  "I am not getting enough relevant candidates",
  "The plan is too expensive for my budget",
  "I only hire occasionally, not every month",
  "I am switching to another platform",
  "Other reasons",
] as const

type Step = "reason" | "confirm" | "done"

export function CancelPlanFlow({
  open,
  onOpenChange,
  slots,
  sub,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  slots: Subscription
  sub: SubscriptionDetails
}) {
  const [step, setStep] = React.useState<Step>("reason")
  const reasons = useReasons(REASONS)
  // Each opening starts again, nothing ticked; the lock is read as it opens
  // (cancelling itself doesn't lock it mid-flow).
  const [wasOpen, setWasOpen] = React.useState(open)
  const [lock, setLock] = React.useState(changeLockOf(sub))
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setStep("reason")
      reasons.reset()
      setLock(changeLockOf(sub))
    }
  }

  const close = () => onOpenChange(false)
  const plan = planOrderLabel({ name: sub.plan }).toLowerCase()
  const until = <span className="whitespace-nowrap font-semibold text-foreground">{dayLabel(sub.renewsOn)}</span>
  const benefits = [
    `Post jobs with ${slotLabel(sub.total)} in ${sub.city}`,
    "Unlimited free reposts and job swapping",
    `Database access, ${num(sub.db?.left ?? 0)} credits left`,
    "WhatsApp alerts to matched candidates",
  ]

  return (
    <PlanPopup open={open} onOpenChange={onOpenChange}>
      {lock ? (
        <>
          <PopupHeader art="expired" title="Cancel plan?" />
          <PopupBody>
            <NextPlanNotice sub={sub} lock={lock} />
            <PopupDescription>
              You can cancel your plan after {until}
              {lock === "downgrade" && ", or keep your current plan first from the plan card"}.
            </PopupDescription>
          </PopupBody>
          <PopupFooter>
            <Button size="lg" variant="outline" className="flex-1" onClick={close}>
              Okay, got it
            </Button>
          </PopupFooter>
        </>
      ) : step === "reason" ? (
        <>
          <PopupHeader art="contact"
            title="Why are you cancelling?" description="We'd appreciate your feedback to improve the product." />
          <ReasonStep id="cancel-reason" state={reasons} />
          <PopupFooter>
            <Button variant="outline" size="lg" className="flex-1" disabled={!reasons.ready} onClick={() => setStep("confirm")}>
              Continue
            </Button>
            <Button size="lg" className="flex-1" onClick={close}>
              Keep current plan
            </Button>
          </PopupFooter>
        </>
      ) : step === "confirm" ? (
        <>
          <PopupHeader
            art="expired"
            title="Cancel plan?"
            description={
              <>
                Your {plan} stays active until {until}. After that it ends.
              </>
            }
          />
          <PopupBody>
            <ChangeList title="What you lose then" items={benefits.map((text) => ({ text, lost: true }))} />
            <p className="text-sm text-muted-foreground">Nothing more is charged. You can renew any time before then.</p>
          </PopupBody>
          <PopupFooter>
            <Button variant="outline" size="lg" className="flex-1" onClick={close}>
              Keep current plan
            </Button>
            <Button
              variant="destructive-solid"
              size="lg"
              className="flex-1"
              onClick={() => {
                cancelAtRenewal(slots, reasons.answers)
                setStep("done")
              }}
            >
              Cancel plan
            </Button>
          </PopupFooter>
        </>
      ) : (
        <PopupResult
          art="expired"
          title="Plan cancelled"
          note={
            <Alert variant="info" className="text-left">
              <Info aria-hidden />
              <AlertDescription>
                You keep your {plan}&apos;s benefits until{" "}
                <span className="whitespace-nowrap">{dayLabel(sub.renewsOn)}</span>.
              </AlertDescription>
            </Alert>
          }
          action={
            <Button size="lg" className="w-full" onClick={close}>
              Close
            </Button>
          }
        >
          We&apos;re sorry to see you go. You can renew any time to keep hiring without interruption.
        </PopupResult>
      )}
    </PlanPopup>
  )
}

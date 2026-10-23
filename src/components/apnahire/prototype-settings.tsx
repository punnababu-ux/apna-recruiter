"use client"

/**
 * PrototypeSettings — the floating gear (bottom-left) that opens the
 * prototype's review controls: states with no real data source yet (auth
 * state, plan layout, credit balance) and the exit offer's demo buttons.
 * One shell for every page that has such controls, so they look and behave
 * the same; remove a page's controls once real data drives that state.
 *
 *   <PrototypeSettings label="Preview settings">
 *     <PrototypeSection title="Auth state">
 *       <PrototypeOption active href="/apnahire/credits">Logged in</PrototypeOption>
 *     </PrototypeSection>
 *     <ExitOfferControls offer={offer} />
 *   </PrototypeSettings>
 *
 * Hidden (user call, 2026-10-20): no gear on screen, so reviewers and
 * users see the page as it ships. The pop-up still opens, from a silent
 * click on "*GST applicable" (GstNote, both checkouts) or the post-job
 * phone frame's "Candidate view" caption, at the same bottom-left spot.
 * Not for production: before a production release, remove these hidden
 * ingresses (grep `openPrototypeSettings`) along with this component.
 *
 * Composition only: Popover and Button from the design system.
 */

import * as React from "react"
import Link from "next/link"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@apna/design-system"
import {
  RENEWAL_LOCK_DAYS,
  renewSubscription,
  sampleSubscription,
  samplePresetOf,
  setDaysLeft,
  setJobSlots,
  useJobSlots,
  type SlotPreset,
} from "@/hooks/use-job-slots"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { PRICING_PHASES } from "@/content/pricing-phase"
import { setPricingPhase, usePricingPhase } from "@/hooks/use-pricing-phase"

const OPEN_EVENT = "apna:prototype-settings"

/** Opens the page's prototype settings, if it has any. */
export const openPrototypeSettings = () => window.dispatchEvent(new Event(OPEN_EVENT))

export function PrototypeSettings({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, show)
    return () => window.removeEventListener(OPEN_EVENT, show)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-overlay print:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        {/* An invisible anchor where the gear was, so the pop-up opens in
            the same place. */}
        <PopoverTrigger nativeButton={false} render={<span aria-hidden className="block size-0" />} />
        <PopoverContent side="top" align="start" aria-label={label} className="flex w-64 flex-col gap-2 divide-y divide-border p-3">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function PrototypeSection({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 pb-2 last:pb-0">
      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

/** One choice or action: a button, or a link when it changes the route. */
export function PrototypeOption({
  active = false,
  href,
  onClick,
  disabled,
  children,
}: {
  active?: boolean
  href?: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      className="justify-start text-sm font-medium"
      aria-current={active ? "true" : undefined}
      disabled={disabled}
      onClick={onClick}
      nativeButton={!href}
      render={href ? <Link href={href} /> : undefined}
    >
      {children}
    </Button>
  )
}

/** The 10% exit offer's demo controls, shared by every checkout page. */
export function ExitOfferControls({
  offer,
}: {
  offer: { claimed: boolean; onExpireSoon: () => void; onReset: () => void }
}) {
  return (
    <PrototypeSection title={`10% exit offer · ${offer.claimed ? "claimed" : "not claimed"}`}>
      <PrototypeOption disabled={!offer.claimed} onClick={offer.onExpireSoon}>
        Expire in 5 seconds
      </PrototypeOption>
      <PrototypeOption onClick={offer.onReset}>Reset offer and exit nudge</PrototypeOption>
    </PrototypeSection>
  )
}

/** The pricing phase (content/pricing-phase.ts): today's plans, the new
 *  plans, December with the Jan 1 notices, or from Jan 1. Reprices every
 *  card and upsell; holds across pages, the jobs dashboard included. */
export function PricingPhaseControls() {
  const phase = usePricingPhase()
  return (
    <PrototypeSection title="Plans and prices">
      {PRICING_PHASES.map((p) => (
        <PrototypeOption key={p.value} active={phase === p.value} onClick={() => setPricingPhase(p.value)}>
          {p.label}
        </PrototypeOption>
      ))}
    </PrototypeSection>
  )
}

/** Subscription: none (job credits) / a free slot / all in use. The
 *  plan is the monthly one the plans pages sell at the second slot count
 *  (2 today, 3 on the new plans), at its own price and database credits. */
export function JobSlotsControls() {
  const slots = useJobSlots()
  const plans = usePlans()
  const plan = plans.plan("monthly", plans.slotCounts[1])
  const current = samplePresetOf(slots)
  const options: [SlotPreset, string][] = [
    ["none", "No subscription (job credits)"],
    ["free", `Subscription · 1 of ${plan.slots} slots in use`],
    ["full", `Subscription · all ${plan.slots} slots in use`],
  ]
  return (
    <PrototypeSection title="Subscription">
      {options.map(([key, label]) => (
        <PrototypeOption key={key} active={current === key} onClick={() => setJobSlots(sampleSubscription(key, plan))}>
          {label}
        </PrototypeOption>
      ))}
      {/* The renewal under way (pre-debit notice): changes and cancelling
          wait until it has renewed. */}
      {slots && (
        <PrototypeOption onClick={() => setDaysLeft(slots, RENEWAL_LOCK_DAYS)}>
          Renewal in {RENEWAL_LOCK_DAYS} days · changes locked
        </PrototypeOption>
      )}
      {/* The cycle ends now: renews, as the booked downgrade if any. */}
      {slots && (
        <PrototypeOption onClick={() => renewSubscription(slots)}>
          {slots.scheduled ? "Renew now · downgrade starts" : "Renew now"}
        </PrototypeOption>
      )}
    </PrototypeSection>
  )
}

"use client"

/**
 * ExitOfferDialog — the exit nudge (Figma 2525:34390 / 2525:26013, Mweb
 * 2554:9059). Shown when the recruiter tries to leave express checkout
 * (back, Save & exit, or closing the order summary) or closes the
 * self-checkout order summary.
 *
 *   "No, thanks"   → onDecline: they continue leaving
 *   "Claim offer"  → onClaim(deadline): 10% extra off for 24 hours
 *   X / Escape     → onDismiss: stay where they are, nothing applied
 *
 * The countdown starts when the nudge opens. Claiming keeps that same
 * deadline, so the timer at checkout picks up where this one left off.
 */

import * as React from "react"
import { Button } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"
import { CountdownChip } from "@/components/apnahire/offers/countdown-chip"
import { OfferDialog } from "@/components/apnahire/offers/offer-dialog"

export function ExitOfferDialog({
  open,
  onClaim,
  onDecline,
  onDismiss,
}: {
  open: boolean
  onClaim: (deadline: number) => void
  onDecline: () => void
  onDismiss: () => void
}) {
  const [deadline, setDeadline] = React.useState(0)
  React.useEffect(() => {
    if (open) setDeadline(Date.now() + EXTRA_OFF.validHours * 60 * 60 * 1000)
  }, [open])

  return (
    <OfferDialog
      open={open}
      onOpenChange={(next) => !next && onDismiss()}
      illustration="party"
      eyebrow={EXTRA_OFF.eyebrow}
      headline={EXTRA_OFF.headline}
      size="sm"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-foreground sm:text-base">{EXTRA_OFF.validity}</p>
          {deadline > 0 && <CountdownChip deadline={deadline} />}
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" className="px-6" onClick={onDecline}>
            No, thanks
          </Button>
          <Button type="button" variant="checkout" size="lg" className="flex-1" onClick={() => onClaim(deadline)}>
            Claim offer
          </Button>
        </div>
      </div>
    </OfferDialog>
  )
}

"use client"

/**
 * SlotsFullDialog — "All job slots are in use" (Figma 3308:148250 desktop,
 * 3308:148652 phone). Shown when a subscriber posts a job with every slot
 * taken. Two ways on:
 *
 *   Header  add a slot: "Upgrade 3rd slot at ₹2,499 → ₹2,000 /slot", the
 *           plan with that slot (price, what's in it, prorated note) and
 *           "Upgrade now" → the order summary
 *   Body    or free one: "Expire a job to make the new job live", the live
 *           jobs as radio cards, "Expire & post"
 *
 * Built like the subscription upsell so the two read as one family:
 * OfferDialog's premium tone (the same gold-on-plum header), the "Special
 * upgrade offer" tag, the per-slot price as the same struck-old → gold-new
 * price drop. CTAs follow the one-primary rule: "Expire & post" is the
 * screen's green primary; "Upgrade now" is the `emphasis` companion, which
 * renders white on the dark header (the companion inverts on dark
 * surfaces — see Button). Dialog from md, bottom sheet on phones; the job
 * choices are
 * RadioCards (radio at the start from sm, at the end on phones).
 */

import * as React from "react"
import { ArrowRight, Badge, BadgePercent, Button, Check, RadioCard, RadioCardGroup } from "@apna/design-system"
import { OfferDialog } from "@/components/apnahire/offers/offer-dialog"
import { dbCreditsLabel, slotTermLabel } from "@/content/subscriptions"
import { ordinal, type JobSlots } from "@/hooks/use-job-slots"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { inr } from "@/lib/format"

const pad2 = (n: number) => String(n).padStart(2, "0")

export function SlotsFullDialog({
  open,
  onOpenChange,
  slots,
  onExpireAndPost,
  onUpgrade,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  slots: NonNullable<JobSlots>
  onExpireAndPost: (jobId: string) => void
  onUpgrade: () => void
}) {
  const [picked, setPicked] = React.useState(slots.jobs[0]?.id)
  const { slotUpgrade } = usePlans()
  const nextSlot = slots.total + 1
  const pct = Math.round((1 - slotUpgrade.price / slotUpgrade.mrp) * 100)
  // Phones (the bottom sheet): the small CTA leaves the price, struck price
  // and % OFF room for one line.
  const isMobile = useIsMobile()

  return (
    <OfferDialog
      open={open}
      onOpenChange={onOpenChange}
      tone="premium"
      illustration="slots-full"
      size="lg"
      tag={
        <>
          <BadgePercent className="size-4" aria-hidden />
          Special upgrade offer
        </>
      }
      eyebrow={`All job slots are in use. Upgrade to a ${ordinal(nextSlot)} slot`}
      priceDrop={{ from: inr(slotUpgrade.perSlotMrp), to: inr(slotUpgrade.perSlot), unit: "/slot" }}
      headerFooter={
        // The CTA sits opposite the price, so the plan's lines below get the
        // full width and each stays on one line. Price, struck price and
        // % OFF are one group that never wraps; on the narrowest phones
        // (320px) the CTA moves under it rather than squeezing it.
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-xl font-semibold">{inr(slotUpgrade.price)}</span>
              <span className="text-xs text-surface-inverted-fg/70 line-through">{inr(slotUpgrade.mrp)}</span>
              <Badge variant="on-dark" size="sm">
                {pct}% OFF
              </Badge>
            </p>
            <Button variant="emphasis" size={isMobile ? "sm" : "lg"} className="shrink-0" trailingIcon={<ArrowRight />} onClick={onUpgrade}>
              Upgrade now
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-1.5 text-xs text-surface-inverted-fg/85 sm:flex-row sm:flex-wrap sm:gap-x-4">
              <li className="flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-highlight" aria-hidden />
                {slotTermLabel({ slots: nextSlot, slotDays: slotUpgrade.validDays })}
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-highlight" aria-hidden />
                {dbCreditsLabel(slotUpgrade.plan)}
              </li>
            </ul>
            <p className="text-xs text-surface-inverted-fg/60 italic">*Prorated discount applicable</p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <p className="text-base text-muted-foreground">Expire a job to make the new job live.</p>
        <RadioCardGroup aria-label="Job to expire">
          {slots.jobs.map((job) => (
            <RadioCard key={job.id} selected={picked === job.id} onSelect={() => setPicked(job.id)} radioPosition="responsive">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-foreground">{job.title}</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="text-sm whitespace-nowrap text-muted-foreground">Posted on : {job.postedAt}</p>
                </div>
                {/* Phones: "Applied candidates … 12" on its own row; from sm the
                    count sits over its label at the right. */}
                <div className="flex items-baseline justify-between gap-2 sm:shrink-0 sm:flex-col sm:items-end sm:gap-1">
                  <span className="order-2 text-base font-semibold text-foreground tabular-nums sm:order-1">{pad2(job.applied)}</span>
                  <span className="order-1 text-sm whitespace-nowrap text-muted-foreground sm:order-2">Applied candidates</span>
                </div>
              </div>
            </RadioCard>
          ))}
        </RadioCardGroup>
        {/* Sticks to the foot of the sheet / dialog when the content scrolls
            (short phones, more jobs), so the action never leaves the screen.
            Full-bleed over the body's padding, so cards scroll under it. */}
        <div className="sticky bottom-0 -mx-4 -mb-4 border-t border-border bg-card px-4 py-3 sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6">
          <Button variant="checkout" size="lg" className="w-full" disabled={!picked} onClick={() => picked && onExpireAndPost(picked)}>
            Expire &amp; post
          </Button>
        </div>
      </div>
    </OfferDialog>
  )
}

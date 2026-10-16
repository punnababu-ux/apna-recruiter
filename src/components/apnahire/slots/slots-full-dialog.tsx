"use client"

/**
 * SlotsFullDialog — "All job slots are in use" (Figma 3308:148250 desktop,
 * 3308:148652 phone). Shown when a subscriber posts a job with every slot
 * taken. Two ways on:
 *
 *   Header  add a slot: "Upgrade 3rd slot at ₹2,499 → ₹1,800 /slot", the
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
import { ArrowRight, Badge, BadgePercent, Button, Check, RadioCard, RadioCardGroup, Separator } from "@apna/design-system"
import { OfferDialog } from "@/components/apnahire/offers/offer-dialog"
import { SLOT_UPGRADE } from "@/content/offers"
import { ordinal, type JobSlots } from "@/hooks/use-job-slots"
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
  const nextSlot = slots.total + 1
  const pct = Math.round((1 - SLOT_UPGRADE.price / SLOT_UPGRADE.mrp) * 100)

  return (
    <OfferDialog
      open={open}
      onOpenChange={onOpenChange}
      tone="premium"
      illustration="briefcase"
      size="lg"
      tag={
        <>
          <BadgePercent className="size-4" aria-hidden />
          Special upgrade offer
        </>
      }
      eyebrow={`All job slots are in use. Upgrade to a ${ordinal(nextSlot)} slot`}
      priceDrop={{ from: inr(SLOT_UPGRADE.perSlotMrp), to: inr(SLOT_UPGRADE.perSlot), unit: "/slot" }}
      headerFooter={
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span className="text-xl font-semibold">{inr(SLOT_UPGRADE.price)}</span>
                <span className="text-xs text-surface-inverted-fg/70 line-through">{inr(SLOT_UPGRADE.mrp)}</span>
                <Badge variant="on-dark" size="sm">
                  {pct}% OFF
                </Badge>
              </p>
              <ul className="flex flex-col gap-1.5 text-xs text-surface-inverted-fg/85 sm:flex-row sm:flex-wrap sm:gap-x-4">
                <li className="flex items-center gap-1.5">
                  <Check className="size-4 shrink-0 text-highlight" aria-hidden />
                  {nextSlot} Active job slots for {SLOT_UPGRADE.validDays} days
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-4 shrink-0 text-highlight" aria-hidden />
                  {SLOT_UPGRADE.dbCredits} database credits
                </li>
              </ul>
            </div>
            <p className="text-xs text-surface-inverted-fg/60 italic">*Prorated discount applicable</p>
          </div>
          <Button variant="emphasis" size="lg" className="shrink-0" trailingIcon={<ArrowRight />} onClick={onUpgrade}>
            Upgrade now
          </Button>
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
                  {/* A div, not a p: the Separator renders a div. */}
                  <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">{job.location}</span>
                    <Separator orientation="vertical" className="h-3.5" />
                    <span className="whitespace-nowrap">Posted on : {job.postedAt}</span>
                  </div>
                </div>
                {/* Phones: "Applied candidates … 12" on its own row; from sm the
                    count sits over its label at the right. */}
                <div className="flex items-baseline justify-between gap-2 max-sm:mt-2 sm:shrink-0 sm:flex-col sm:items-end sm:gap-1">
                  <span className="order-2 text-base font-semibold text-foreground tabular-nums sm:order-1">{pad2(job.applied)}</span>
                  <span className="order-1 text-sm whitespace-nowrap text-muted-foreground sm:order-2">Applied candidates</span>
                </div>
              </div>
            </RadioCard>
          ))}
        </RadioCardGroup>
        <Button variant="checkout" size="lg" className="mt-1 w-full" disabled={!picked} onClick={() => picked && onExpireAndPost(picked)}>
          Expire &amp; post
        </Button>
      </div>
    </OfferDialog>
  )
}

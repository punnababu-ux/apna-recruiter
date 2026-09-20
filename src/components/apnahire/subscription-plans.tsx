"use client"

/**
 * SubscriptionPlans — Subscription (Unlimited) tab body.
 *
 * Monthly vs Quarterly comparison cards with feature checklists, plus a
 * 1/2/3-job-slot toggle above them (UI-only — Figma shows no price
 * recalculation per slot count, so this stays a local, cosmetic toggle).
 */

import * as React from "react"
import {
  Briefcase,
  Check,
  Database,
  LogoApnaUnlimited,
  MessageCircle,
} from "@apna/design-system"
import { Badge, Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

type JobSlotCount = "1" | "2" | "3"

const JOB_SLOT_OPTIONS: { value: JobSlotCount; label: string }[] = [
  { value: "1", label: "1 Active job slot" },
  { value: "2", label: "2 Jobs" },
  { value: "3", label: "3 Jobs" },
]

/** Sub-points under the job-slot line — the same three in both plans. */
const UNLIMITED_POINTS = [
  "job swapping",
  "free reposts on job expiry",
  "candidate responses",
]

interface PlanCardProps {
  title: string
  price: string
  priceSuffix: string
  note?: React.ReactNode
  ctaLabel: string
  recommended?: boolean
  /** Days the plan's single active job slot stays open. */
  slotDays: number
  dbLine: React.ReactNode
  onBuy?: () => void
}

function PlanCard({
  title,
  price,
  priceSuffix,
  note,
  ctaLabel,
  recommended,
  slotDays,
  dbLine,
  onBuy,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "card-hover-lift relative flex flex-1 flex-col items-start gap-4 overflow-hidden rounded-xl border border-border bg-card px-4 pb-4 pt-8"
      )}
    >
      {recommended && (
        <div className="absolute right-0 top-0 flex rounded-bl-xl">
          <Badge className="rounded-none rounded-bl-xl border-transparent bg-info px-4 py-0.5 text-2xs font-semibold text-info-foreground">
            Recommended
          </Badge>
        </div>
      )}

      <div className="flex w-full flex-col gap-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground">
          {price} <span className="text-xs font-normal text-muted-foreground">{priceSuffix}</span>
        </p>
        {/* The note line is reserved in every card whether or not it has
            one, so the CTA — and the divider and feature list under it —
            sit on the same baseline across the row. Only Quarterly carries
            a note, and without this Monthly's button rides ~20px higher. */}
        <p
          className={cn("text-xs italic text-muted-foreground", !note && "invisible")}
          aria-hidden={!note}
        >
          {note ?? " "}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full font-semibold",
          recommended &&
            "border-transparent bg-checkout-primary text-checkout-primary-foreground hover:bg-checkout-primary-hover hover:text-checkout-primary-foreground"
        )}
        onClick={onBuy}
      >
        {ctaLabel}
      </Button>

      <hr className="w-full border-border" />

      {/* Offerings list. Each row is [icon][gap][one text run] — the bold
          lead-in ("1", "Unlimited", "worth ₹2,000") has to live *inside*
          that run, not beside it as a second flex child, or the row's gap
          opens up mid-sentence. Figma: 780:1246. */}
      <div className="flex w-full flex-col gap-3">
        {/* The job slot and the three Unlimited points are one block: the
            points are a sub-list of the slot, indented 28px so their
            checkmarks sit under the slot line's text, and set a size down. */}
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-3 text-sm text-muted-foreground">
            <Briefcase className="size-5 shrink-0" aria-hidden />
            <span>
              <span className="font-semibold text-foreground">1</span> Active job slot for{" "}
              {slotDays} days
            </span>
          </span>
          {UNLIMITED_POINTS.map((point) => (
            <span
              key={point}
              className="flex items-center gap-2 pl-7 text-xs text-muted-foreground"
            >
              <Check className="size-5 shrink-0 text-checkout-primary" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">Unlimited</span> {point}
              </span>
            </span>
          ))}
        </div>

        <span className="flex items-start gap-3 text-sm text-muted-foreground">
          <Database className="size-5 shrink-0" aria-hidden />
          <span>{dbLine}</span>
        </span>
        <span className="flex items-center gap-3 text-sm text-muted-foreground">
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          <span>WhatsApp outreach to matched candidates for more applications</span>
        </span>
      </div>
    </div>
  )
}

interface SubscriptionPlansProps {
  onBuyMonthly?: () => void
  onBuyQuarterly?: () => void
  className?: string
}

export function SubscriptionPlans({
  onBuyMonthly,
  onBuyQuarterly,
  className,
}: SubscriptionPlansProps) {
  const [jobSlots, setJobSlots] = React.useState<JobSlotCount>("1")

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          {/* "apna ∞ Unlimited" + "plans" read as one 20px headline, so the
              wordmark and the word share a baseline rather than a box centre.
              The wordmark's own baseline sits at 72% of its height (the `p`
              descender fills the rest), which lands ~3px above the text
              baseline once both are centred — hence the nudge. Figma does the
              same thing by giving the logo a 32px-tall frame and dropping the
              20px mark 5px inside it (node 780:1190). */}
          <div className="flex items-center gap-2">
            <LogoApnaUnlimited className={/* token-lint-ignore: optical baseline nudge for the wordmark, derived above; not a spacing step */ "h-5 w-auto translate-y-[3px]"} />
            <span className="text-xl font-semibold text-foreground">plans</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Unlimited job posting flexibility, predictable hiring cost.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted p-0.5">
          {JOB_SLOT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setJobSlots(opt.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                jobSlots === opt.value
                  ? "bg-gray-800 text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-4 lg:flex-row">
        <PlanCard
          title="Monthly"
          price="₹2,499"
          priceSuffix="/month"
          ctaLabel="Buy monthly plan"
          slotDays={30}
          dbLine={
            <>
              Unlock 200 profiles on candidate database every month{" "}
              <span className="font-semibold italic text-foreground">worth ₹2,000</span>
            </>
          }
          onBuy={onBuyMonthly}
        />
        <PlanCard
          title="Quarterly"
          price="₹5,999"
          priceSuffix="/quarter"
          note={
            <>
              That&apos;s just <span className="font-semibold">₹1,999</span> /month
            </>
          }
          ctaLabel="Buy quarterly plan"
          recommended
          slotDays={90}
          dbLine={
            <>
              Unlock 600 profiles on candidate database every month{" "}
              <span className="font-semibold italic text-foreground">worth ₹6,000</span>
            </>
          }
          onBuy={onBuyQuarterly}
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-1 text-xs text-checkout-hero-fg-muted">
        <p>* 18% GST will be added at checkout</p>
        <p>Note: This plan is valid in a single city.</p>
      </div>
    </div>
  )
}

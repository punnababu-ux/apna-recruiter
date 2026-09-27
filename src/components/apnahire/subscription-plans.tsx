"use client"

/**
 * SubscriptionPlans — Subscription (apna Unlimited) tab body.
 *
 * Monthly vs Quarterly comparison cards with feature checklists, plus a
 * 1/2/3-job-slot toggle above them (UI-only — Figma shows no content or
 * price recalculation for the 2- and 3-slot states, so this stays a
 * local, cosmetic toggle).
 *
 * Figma: 1971:8968. Card layout is 1971:9020 (Monthly) / 1971:9074
 * (Quarterly): header → divider → offerings, with the CTA pinned as the
 * card's last child rather than sitting above the divider.
 */

import * as React from "react"
import {
  Badge,
  BriefcaseBusiness,
  Button,
  Check,
  ChipTabs,
  LogoApnaUnlimited,
  MessageCircle,
  Sparkles,
  UserSearch,
  type ChipTabItem,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

type JobSlotCount = "1" | "2" | "3"

/* Figma's chip reads "1 Active job slow" (1971:9005) — a typo. The same
   frame spells it correctly on the card's slot line (1971:9041), so we
   render "slot" here and have flagged the frame to design. */
const JOB_SLOT_OPTIONS: ChipTabItem<JobSlotCount>[] = [
  { value: "1", label: "1 Active job slot" },
  { value: "2", label: "2 Jobs" },
  { value: "3", label: "3 Jobs" },
]

/* Sub-points under the job-slot line — the same three in both plans.
   Figma's Quarterly card spells the first one "job swappving"
   (1971:9101); Monthly (1971:9048) and the older 863:7639 both read
   "job swapping", so we use the correct spelling in both cards. */
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
        "card-hover-lift relative flex flex-1 flex-col justify-between gap-5 overflow-hidden rounded-xl border border-border bg-card px-4 pb-5 pt-8"
      )}
    >
      {recommended && (
        <div className="absolute right-0 top-0 flex">
          <Badge variant="ribbon" size="ribbon">
            Recommended
            <Sparkles aria-hidden />
          </Badge>
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">
            {price}{" "}
            <span className="text-xs font-regular text-muted-foreground">{priceSuffix}</span>
          </p>
          {/* The note line is reserved in every card whether or not it has
              one, so the dividers, feature lists and CTAs sit on the same
              baseline across the row. Only Quarterly carries a note, and
              without this Monthly's divider rides ~20px higher. */}
          <p
            className={cn("text-xs italic text-checkout-primary", !note && "invisible")}
            aria-hidden={!note}
          >
            {note ?? " "}
          </p>
        </div>

        <hr className="w-full border-border" />

        {/* Offerings list. Each row is [icon][gap][one text run] — the
            semibold lead-in ("1", "Unlimited", "worth ₹2,000") has to live
            *inside* that run, not beside it as a second flex child, or the
            row's gap opens up mid-sentence. Emphasis here is weight-only:
            every run is the same colour, so the lead-ins carry no colour of
            their own. Figma: 1971:9031. */}
        <div className="flex w-full flex-col gap-3 text-muted-foreground">
          {/* The job slot and the three Unlimited points are one block: the
              points are a sub-list of the slot, indented 28px so their
              checkmarks sit under the slot line's text, and set a size down. */}
          <div className="flex flex-col gap-2">
            <span className="flex items-start gap-3 text-sm">
              <BriefcaseBusiness className="size-5 shrink-0" aria-hidden />
              <span>
                <span className="font-semibold">1</span> Active job slot for {slotDays} days
              </span>
            </span>
            {UNLIMITED_POINTS.map((point) => (
              <span key={point} className="flex min-h-5 items-center gap-2 pl-7 text-xs">
                <Check className="size-5 shrink-0 text-checkout-primary" aria-hidden />
                <span>
                  <span className="font-semibold">Unlimited</span> {point}
                </span>
              </span>
            ))}
          </div>

          <span className="flex items-start gap-3 text-sm">
            <UserSearch className="size-5 shrink-0" aria-hidden />
            <span>{dbLine}</span>
          </span>
          <span className="flex items-start gap-3 text-sm">
            <MessageCircle className="size-5 shrink-0" aria-hidden />
            <span>WhatsApp outreach to matched candidates for more applications</span>
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant={recommended ? "checkout" : "outline"}
        className="h-10 w-full font-semibold"
        onClick={onBuy}
      >
        {ctaLabel}
      </Button>
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
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-1">
          {/* "apna ∞ Unlimited" + "plans" read as one 20px headline, so the
              wordmark and the word share a baseline rather than a box centre.
              The wordmark's own baseline sits at 72% of its height (the `p`
              descender fills the rest), which lands ~3px above the text
              baseline once both are centred — hence the nudge. Figma does the
              same thing by giving the logo a 32px-tall frame and dropping the
              20px mark 5px inside it (node 1971:8978). */}
          <div className="flex items-center gap-2">
            {/* "theme" fill (currentColor) + text-foreground: this header
                sits on the page body, which flips light/dark with the app
                theme — unlike the always-dark Unlimited card, where the
                gold "gradient" variant is correct. A fixed dark fill here
                went near-invisible once the surrounding page went dark. */}
            <LogoApnaUnlimited
              variant="theme"
              className={/* token-lint-ignore: optical baseline nudge for the wordmark, derived above; not a spacing step */ "h-5 w-auto translate-y-[3px] text-foreground"}
            />
            <span className="text-xl font-semibold text-foreground">plans</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Unlimited job posting flexibility, predictable hiring cost.
          </p>
        </div>

        {/* Cosmetic switcher: Figma draws no 2-/3-slot content or prices
            (1971:9002), so selection changes nothing below. */}
        <ChipTabs
          variant="solid"
          aria-label="Active job slots"
          items={JOB_SLOT_OPTIONS}
          value={jobSlots}
          onValueChange={setJobSlots}
          className="w-full flex-nowrap gap-2 rounded-full bg-checkout-track p-0.5 sm:w-auto sm:shrink-0"
          itemClassName="flex-1 justify-center sm:flex-none"
        />
      </div>

      <div className="flex flex-col gap-4">
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
                <span className="font-semibold italic">worth ₹2,000</span>
              </>
            }
            onBuy={onBuyMonthly}
          />
          <PlanCard
            title="Quarterly"
            price="₹5,999"
            priceSuffix="/quarter"
            note="That's just ₹1,999 /month"
            ctaLabel="Buy quarterly plan"
            recommended
            slotDays={90}
            /* Figma (1971:9120) reads "600 profiles … every month", but 600
               is the whole-quarter allowance: Monthly grants 200/month and
               the Unlimited checkout line item (1236:22188) lists 600
               Database credits for the 90-day plan. "every month" is
               dropped here as a deliberate correction. */
            dbLine={
              <>
                Unlock 600 profiles on candidate database{" "}
                <span className="font-semibold italic">worth ₹6,000</span>
              </>
            }
            onBuy={onBuyQuarterly}
          />
        </div>

        <div className="flex flex-col items-start gap-1 text-xs text-checkout-hero-fg-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>* 18% GST will be added at checkout</p>
          <p>Note: This plan is valid in a single city.</p>
        </div>
      </div>
    </div>
  )
}

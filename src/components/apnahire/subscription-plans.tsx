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
  BadgePercent,
  BriefcaseBusiness,
  Button,
  Check,
  ChipTabs,
  Database,
  LogoApnaUnlimited,
  Sparkles,
  UserSearch,
  WhatsApp,
  type ChipTabItem,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { GstNote } from "@/components/apnahire/gst-note"
import { ANNUAL_PLAN, withExtraOff } from "@/content/offers"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import {
  MobileDiscountRow,
  MobilePlanDetails,
  MobilePlanRow,
} from "@/components/apnahire/mobile-plan-row"
import { inr, num } from "@/lib/format"

export type SubscriptionPlanId = "monthly" | "quarterly" | "annual"

/** The Unlimited plans: one source for the cards, the phone rows and the
 *  self-checkout sticky CTA. `mrp` is a list price shown struck through. */
export const SUBSCRIPTION_PLANS: Record<
  SubscriptionPlanId,
  {
    title: string
    price: number
    mrp?: number
    months: number
    slotDays: number
    dbCredits: number
    dbWorth: number
  }
> = {
  monthly: { title: "Monthly", price: 2499, months: 1, slotDays: 30, dbCredits: 200, dbWorth: 2000 },
  quarterly: { title: "Quarterly", price: 5999, months: 3, slotDays: 90, dbCredits: 600, dbWorth: 6000 },
  annual: {
    title: "Annual",
    price: ANNUAL_PLAN.price,
    mrp: ANNUAL_PLAN.mrp,
    months: ANNUAL_PLAN.months,
    slotDays: ANNUAL_PLAN.slotDays,
    dbCredits: ANNUAL_PLAN.dbCredits,
    dbWorth: ANNUAL_PLAN.dbCreditsWorth,
  },
}

const UNITS: Record<number, string> = { 1: "/month", 3: "/quarter", 12: "/year" }

/** Price, struck price and % OFF for a plan: the list price (`mrp`) when it
 *  has one, else the undiscounted price once the 10% offer is claimed. */
function planPricing(plan: { price: number; mrp?: number }, extraOff?: boolean) {
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  const pct = strike && strike > price ? Math.round((1 - price / strike) * 100) : null
  return { price, strike, pct }
}


type JobSlotCount = "1" | "2" | "3"

/* The selected chip spells out what it is ("2 Active job slots"); the
   others stay short ("1 Job", "3 Jobs"). Figma's chip reads "1 Active job
   slow" (1971:9005), a typo; the card's slot line spells it "slot". */
const SLOT_COUNTS: JobSlotCount[] = ["1", "2", "3"]
const jobSlotOptions = (selected: JobSlotCount): ChipTabItem<JobSlotCount>[] =>
  SLOT_COUNTS.map((n) => ({
    value: n,
    label:
      n === selected
        ? `${n} Active job slot${n === "1" ? "" : "s"}`
        : `${n} Job${n === "1" ? "" : "s"}`,
  }))

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
  price: number
  /** List price, struck through with its % OFF (Annual: ₹15,999). */
  mrp?: number
  priceSuffix: string
  /** Billing period in months: the per-month note is price / months. */
  months: number
  /** The claimed 10% exit offer: the price drops by it, the old price is
   *  struck through with its % OFF, and the card says so. */
  extraOff?: boolean
  ctaLabel: string
  recommended?: boolean
  /** Days the plan's single active job slot stays open. */
  slotDays: number
  dbLine: React.ReactNode
  onBuy?: () => void
}

function PlanCard({
  title,
  price: basePrice,
  mrp,
  priceSuffix,
  months,
  extraOff,
  ctaLabel,
  recommended,
  slotDays,
  dbLine,
  onBuy,
}: PlanCardProps) {
  const { price, strike, pct } = planPricing({ price: basePrice, mrp }, extraOff)
  // Truncated, like the design's ₹5,999 / 3 = ₹1,999.
  const note = months > 1 ? `That's just ${inr(Math.floor(price / months))}\u00A0/month` : undefined
  return (
    // The whole card buys (the CTA's click bubbles here), like the Jobs-tab
    // PricingCards — the card-hover-lift rule. No `overflow-hidden`: it would
    // clip the lift's hit strip; the ribbon clips its own corner.
    <div
      onClick={onBuy}
      className="card-hover-lift ink press-subtle relative flex flex-1 cursor-pointer flex-col justify-between gap-5 rounded-xl border border-border bg-card px-4 pb-5 pt-8"
    >
      {recommended && (
        <div className="absolute right-0 top-0 flex overflow-hidden rounded-tr-xl rounded-bl-xl">
          <Badge variant="ribbon" size="ribbon">
            Recommended
            <Sparkles aria-hidden />
          </Badge>
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-foreground">{title}</p>
          {/* Price, unit and struck price never split; the % OFF badge sits
              at the row's end. */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <p className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-2xl font-semibold text-foreground">{inr(price)}</span>
              <span className="text-xs font-regular text-muted-foreground">{priceSuffix}</span>
              {strike && <span className="text-xs text-muted-foreground line-through">{inr(strike)}</span>}
            </p>
            {pct ? <Badge variant="discount">{pct}% OFF</Badge> : null}
          </div>
          {/* The note line is reserved in every card whether or not it has
              one, so the dividers, feature lists and CTAs sit on the same
              baseline across the row. Only Quarterly carries a note, and
              without this Monthly's divider rides ~20px higher. The claimed
              offer's line goes under it, in both cards. */}
          <p
            className={cn("text-xs italic text-checkout-primary", !note && "invisible")}
            aria-hidden={!note}
          >
            {note ?? " "}
          </p>
          {extraOff && <ExtraOffLine />}
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
            <WhatsApp className="size-5 shrink-0" aria-hidden />
            <span>WhatsApp outreach to matched candidates for more applications</span>
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant={recommended ? "checkout" : "outline"}
        className="h-10 w-full font-semibold"
      >
        {ctaLabel}
      </Button>
    </div>
  )
}

interface SubscriptionPlansProps {
  /** The claimed 10% exit offer: show it in both plans' prices. */
  extraOff?: boolean
  onBuyAnnual?: () => void
  /** Phones: the selected radio row (the page's sticky CTA buys it). */
  selectedPlan?: SubscriptionPlanId
  onSelectPlan?: (plan: SubscriptionPlanId) => void
  onBuyMonthly?: () => void
  onBuyQuarterly?: () => void
  className?: string
}

export function SubscriptionPlans({
  extraOff,
  onBuyAnnual,
  // Annual is the recommended plan (product, 2026-10-16).
  selectedPlan = "annual",
  onSelectPlan,
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
          items={jobSlotOptions(jobSlots)}
          value={jobSlots}
          onValueChange={setJobSlots}
          className="w-full flex-nowrap gap-1 rounded-full bg-checkout-track p-0.5 sm:w-auto sm:shrink-0 sm:gap-2"
          // Content-sized, not equal thirds: the active label is the long
          // one, so equal widths wrapped it onto a second line on phones.
          // flex-auto shares the spare width without squeezing it.
          // Phones also tighten the chips (px-3, gap-1) so all three fit a
          // 320px screen.
          itemClassName="flex-auto justify-center whitespace-nowrap px-3 sm:flex-none sm:px-4"
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* Phones (< md): the Jobs / Database radio rows. Collapsed, a row
            is its name, the reposts line and the price; the selected one
            (Annual, the recommended plan, by default) reveals the plan details. The
            page's sticky CTA buys the selection. */}
        <div className="flex flex-col gap-3 md:hidden">
          {(["monthly", "quarterly", "annual"] as const).map((id) => {
            const plan = SUBSCRIPTION_PLANS[id]
            const { price, strike, pct } = planPricing(plan, extraOff)
            return (
              <MobilePlanRow
                key={id}
                title={plan.title}
                selected={selectedPlan === id}
                onSelect={() => onSelectPlan?.(id)}
                recommended={id === "annual"}
                // The Jobs tab's Unlimited card structure, with the radio:
                // name and price on one line, the reposts promise and the
                // discount on the next (see MobilePlanRow's "inline").
                layout="inline"
                meta={<span className="text-xs text-muted-foreground">Unlimited job reposts</span>}
                mrp={strike ? inr(strike) : undefined}
                price={inr(price)}
                unit={UNITS[plan.months]}
                belowPrice={pct ? <MobileDiscountRow pct={pct} /> : undefined}
                priceNote={
                  extraOff ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-success">
                      <BadgePercent className="size-3.5 shrink-0 animate-wiggle" aria-hidden />
                      <span className="animate-text-shimmer">Incl. 10% extra</span>
                    </span>
                  ) : undefined
                }
                details={
                  // The Jobs tab's Unlimited card points: three short lines.
                  <MobilePlanDetails
                    items={[
                      [
                        <BriefcaseBusiness key="i" aria-hidden />,
                        <><strong>1 active job slot</strong> for {plan.slotDays} days</>,
                      ],
                      [
                        <Database key="i" aria-hidden />,
                        `${num(plan.dbCredits)} database credits worth ${inr(plan.dbWorth)}`,
                      ],
                      [<WhatsApp key="i" aria-hidden />, "WhatsApp outreach to matched candidates"],
                    ]}
                  />
                }
              />
            )
          })}
        </div>

        <div className="hidden flex-col items-stretch gap-4 md:flex lg:flex-row">
          <PlanCard
            title="Monthly"
            price={2499}
            priceSuffix="/month"
            months={1}
            extraOff={extraOff}
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
            price={5999}
            priceSuffix="/quarter"
            months={3}
            extraOff={extraOff}
            ctaLabel="Buy quarterly plan"
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
          <PlanCard
            title="Annual"
            price={ANNUAL_PLAN.price}
            mrp={ANNUAL_PLAN.mrp}
            priceSuffix="/year"
            months={ANNUAL_PLAN.months}
            extraOff={extraOff}
            ctaLabel="Buy annual plan"
            recommended
            slotDays={ANNUAL_PLAN.slotDays}
            dbLine={
              <>
                Unlock {num(ANNUAL_PLAN.dbCredits)} profiles on candidate database{" "}
                <span className="font-semibold italic">worth {inr(ANNUAL_PLAN.dbCreditsWorth)}</span>
              </>
            }
            onBuy={onBuyAnnual}
          />
        </div>

        <div className="flex flex-col items-start gap-1 text-xs text-checkout-hero-fg-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Phones: the page puts it under the Contact sales card, as on the
              Database tab. */}
          <GstNote className="hidden md:block" />
          <p>Note: This plan is valid in a single city.</p>
        </div>
      </div>
    </div>
  )
}

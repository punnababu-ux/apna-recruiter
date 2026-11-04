"use client"

/**
 * SubscriptionPlans — Subscription (apna Unlimited) tab body.
 *
 * Monthly, Quarterly and Annual comparison cards with feature checklists,
 * plus a job-slot picker above them (1 / 2 / 3: usePlans().slotCounts). The picker drives every price
 * (usePlans().plan); the caller owns it so the sticky CTA and checkout buy
 * the same plan.
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
  Database,
  LogoApnaUnlimited,
  Sparkles,
  UserSearch,
  WhatsApp,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type ChipTabItem,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { RECOMMENDED_EDGE, useCardHover } from "@/components/apnahire/use-card-hover"
import { GstNote } from "@/components/apnahire/gst-note"
import { withExtraOff } from "@/content/offers"
import {
  dbCreditsLabel,
  slotLabel,
  type JobSlotCount,
  type SubscriptionPlanId,
} from "@/content/subscriptions"
import { UpcomingPriceLine } from "@/components/apnahire/upcoming-price-line"
import {
  MobilePlanDetails,
  MobilePlanRow,
  MobileSlotLine,
  MobileUnlimitedLine,
} from "@/components/apnahire/mobile-plan-row"
import { inr } from "@/lib/format"
import { usePlans } from "@/hooks/apnahire/use-plans"

export type { JobSlotCount, SubscriptionPlanId }

const PLAN_IDS: SubscriptionPlanId[] = ["monthly", "quarterly", "annual"]

/** Price, struck price and % OFF for a plan: the list price (`mrp`) when it
 *  has one, else the undiscounted price once the 10% offer is claimed. The
 *  % OFF is the plan's own (`mrp`), never recalculated with the 10%. */
function planPricing(plan: { price: number; mrp?: number }, extraOff?: boolean) {
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  // The final saving against the struck price, the 10% included (the
  // banner says the 10%; no card line does).
  const pct = strike && strike > price ? Math.round((1 - price / strike) * 100) : null
  return { price, strike, pct }
}


/* The selected chip spells out what it is ("3 active job slots"); the
   others stay short ("1 Job", "5 Jobs"). Figma's chip reads "1 Active job
   slow" (1971:9005), a typo; we spell it "slot", in sentence case. */
const jobSlotOptions = (counts: JobSlotCount[], selected: JobSlotCount): ChipTabItem<string>[] =>
  counts.map((n) => ({
    value: String(n),
    label: n === selected ? slotLabel(n) : `${n} Job${n === 1 ? "" : "s"}`,
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
  /** List price, struck through with its % OFF (1-slot annual: ₹29,988). */
  mrp?: number
  priceSuffix: string
  /** Price from Jan 1, 2027: "₹6,599 from Jan 1" under the note. */
  janPrice?: number
  /** Billing period in months: the per-month note is price / months. */
  months: number
  /** The claimed 10% exit offer: the price drops by it, the old price is
   *  struck through with its % OFF, and the card says so. */
  extraOff?: boolean
  ctaLabel: string
  recommended?: boolean
  /** Live jobs at a time, and the days each slot stays open. */
  slots: JobSlotCount
  slotDays: number
  /** "200 database credits worth ₹2,000" (`dbCreditsLabel`). */
  dbLine: string
  /** The CTA can't act (a downgrade already booked). */
  ctaDisabled?: boolean
  /** Why it can't, shown on hover. */
  ctaHint?: React.ReactNode
  onBuy?: () => void
  /** The subscriber's own plan (Manage plan): marked, not buyable. */
  current?: boolean
}

function PlanCard({
  title,
  price: basePrice,
  mrp,
  priceSuffix,
  janPrice,
  months,
  extraOff,
  ctaLabel,
  recommended,
  slots,
  slotDays,
  dbLine,
  onBuy,
  current,
  ctaDisabled,
  ctaHint,
}: PlanCardProps) {
  const { price, strike, pct } = planPricing({ price: basePrice, mrp }, extraOff)
  // Truncated, like the design's ₹5,999 / 3 = ₹1,999.
  const note = months > 1 ? `That's just ${inr(Math.floor(price / months))}\u00A0/month` : undefined
  // Outline CTA at rest, green while hovered; the recommended card stands
  // out by its blue edge (useCardHover, as in express).
  const hover = useCardHover()
  const live = !current && !ctaDisabled
  return (
    // The whole card buys (the CTA's click bubbles here), like the Jobs-tab
    // PricingCards — the card-hover-lift rule. No `overflow-hidden`: it would
    // clip the lift's hit strip; the ribbon clips its own corner.
    <div
      onClick={current || ctaDisabled ? undefined : onBuy}
      data-compare-card
      {...hover.props}
      className={cn(
        "relative flex flex-1 flex-col justify-between gap-5 rounded-card border bg-plan-card px-4 pb-5 pt-8",
        recommended && !current ? RECOMMENDED_EDGE : "border-transparent",
        !current && !ctaDisabled && "card-hover-lift ink press-subtle cursor-pointer",
      )}
    >
      {current && (
        <div className="absolute right-4 top-3">
          <Badge variant="outline">Current plan</Badge>
        </div>
      )}
      {recommended && !current && (
        <div className="absolute -right-px -top-px flex overflow-hidden rounded-tr-[inherit] rounded-bl-xl">
          <Badge variant="ribbon" size="ribbon">
            Recommended
            <Sparkles aria-hidden />
          </Badge>
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-plan-name text-foreground">{title}</p>
          {/* Price, unit and struck price never split; the % OFF badge sits
              right after them, never flung to the row's far end. */}
          <div data-compare="price" className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-plan-price text-foreground">{inr(price)}</span>
              <span className="text-plan-unit text-muted-foreground">{priceSuffix}</span>
              {strike && <span className="text-sm text-muted-foreground line-through">{inr(strike)}</span>}
            </p>
            {pct ? <Badge variant="discount">−{pct}%</Badge> : null}
          </div>
          {/* The note line is reserved in every card whether or not it has
              one, so the dividers, feature lists and CTAs sit on the same
              baseline across the row. Without this, Monthly's divider
              rides ~16px higher. The claimed offer's line goes above it,
              in all cards. */}
          <p
            data-compare="price-suffix"
            className={cn(
              "min-h-4 text-xs italic leading-4",
              // Per-unit price: blue, as on every plan card (user call, 2026-11-02).
              "text-info",
              !note && "invisible",
            )}
            aria-hidden={!note}
          >
            {note ?? "\u00A0"}
          </p>
          <UpcomingPriceLine price={janPrice} className="text-muted-foreground" />
        </div>

        <hr className="w-full border-border" />

        {/* Offerings list. Each row is [icon][gap][one text run] — the
            semibold lead-in ("1", "Unlimited") has to live
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
                <span className="font-semibold">{slots}</span> active job slot{slots === 1 ? "" : "s"} for {slotDays}{"\u00A0"}days
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

          {/* The same icon and wording as the Jobs tab's Unlimited card. */}
          <span className="flex items-start gap-3 text-sm">
            <UserSearch className="size-5 shrink-0" aria-hidden />
            <span>{dbLine}</span>
          </span>

          <span className="flex items-start gap-3 text-sm">
            <WhatsApp className="size-5 shrink-0" aria-hidden />
            <span>Smart alerts to candidates</span>
          </span>
        </div>
      </div>

      {/* A blocked CTA says why on hover (a disabled button gets no
          pointer events, so the tooltip hangs on a wrapper). */}
      {ctaHint && !current ? (
        <Tooltip>
          <TooltipTrigger render={<span data-compare="cta" className="block w-full" />}>
            <Button type="button" variant="outline" className="pointer-events-none h-10 w-full font-semibold" disabled>
              {ctaLabel}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-64">{ctaHint}</TooltipContent>
        </Tooltip>
      ) : (
        <Button
          data-compare="cta"
          type="button"
          variant={live && hover.active ? "checkout" : "outline"}
          className="h-10 w-full font-semibold"
          disabled={current || ctaDisabled}
        >
          {current ? "Your current plan" : ctaLabel}
        </Button>
      )}
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
  /** Active job slots the prices are for. Controlled by the caller, so its
   *  sticky CTA and checkout buy the same plan; uncontrolled starts at 1. */
  slots?: JobSlotCount
  onSlotsChange?: (slots: JobSlotCount) => void
  /** Manage plan: the subscriber's plan, marked on its card (at its slot
   *  count), and each card's CTA label in place of "Buy …". The current
   *  card shows what the subscriber pays (`price`): never a sale, struck
   *  price, % OFF or the 10% offer (rule: AGENTS.md, "Prices, offers").
   */
  current?: { plan: SubscriptionPlanId; slots: number; price?: number }
  ctaLabels?: Partial<Record<SubscriptionPlanId, string>>
  /** CTAs that can't act (a downgrade already booked). */
  ctaDisabled?: Partial<Record<SubscriptionPlanId, boolean>>
  /** Why a CTA is off (a pending downgrade or renewal), on hover. */
  ctaHints?: Partial<Record<SubscriptionPlanId, React.ReactNode>>
  /** The plan with the ribbon and the green CTA; null for none (Manage
   *  plan, when the annual card would be a downgrade). */
  recommendedPlan?: SubscriptionPlanId | null
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
  slots: slotsProp,
  onSlotsChange,
  current,
  ctaLabels,
  ctaDisabled,
  ctaHints,
  recommendedPlan = "annual",
  className,
}: SubscriptionPlansProps) {
  const { plan: planFor, slotCounts } = usePlans()
  const [ownSlots, setOwnSlots] = React.useState<JobSlotCount>(1)
  // A count the pricing phase doesn't sell falls back to 1 slot.
  const wanted = slotsProp ?? ownSlots
  const jobSlots = slotCounts.includes(wanted) ? wanted : slotCounts[0]
  const setJobSlots = (value: string) => {
    const n = Number(value) as JobSlotCount
    setOwnSlots(n)
    onSlotsChange?.(n)
  }
  const onBuy: Record<SubscriptionPlanId, (() => void) | undefined> = {
    monthly: onBuyMonthly,
    quarterly: onBuyQuarterly,
    annual: onBuyAnnual,
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
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
              className={/* token-lint-ignore: optical baseline nudge for the wordmark, derived above; not a spacing step */ "h-3.5 w-auto translate-y-[2px] text-foreground sm:h-5 sm:translate-y-[3px]"}
            />
            {/* Phones: the section-title size (14), the wordmark scaled to it (user call, 2026-11-04). */}
            <span className="text-section-title text-foreground sm:text-xl sm:font-semibold">plans</span>
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Unlimited job posting flexibility, predictable hiring cost.
          </p>
        </div>

        {/* Every price below is for the picked number of live jobs. */}
        <ChipTabs
          variant="solid"
          aria-label="Active job slots"
          items={jobSlotOptions(slotCounts, jobSlots)}
          value={String(jobSlots)}
          onValueChange={setJobSlots}
          className="w-full flex-nowrap gap-1 rounded-full surface-glass-dark p-0.5 sm:w-auto sm:shrink-0 sm:gap-2"
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
        <div className="flex flex-col gap-4 md:hidden">
          {PLAN_IDS.map((id) => {
            const plan = planFor(id, jobSlots)
            const isCurrent = current?.plan === id && current.slots === jobSlots
            const { price, strike, pct } = isCurrent
              ? { price: current.price ?? plan.price, strike: undefined, pct: null }
              : planPricing(plan, extraOff)
            return (
              <MobilePlanRow
                key={id}
                title={plan.title}
                selected={selectedPlan === id}
                onSelect={() => onSelectPlan?.(id)}
                recommended={id === recommendedPlan}
                // The Jobs tab's Unlimited card structure (user call,
                // 2026-10-30): name and price, the slot line under the name,
                // then the same feature line (MobileUnlimitedLine).
                meta={
                  <>
                    <MobileSlotLine slots={plan.slots} days={plan.slotDays} muted />
                    {isCurrent && <span className="text-xs text-muted-foreground">Your current plan</span>}
                  </>
                }
                mrp={strike ? inr(strike) : undefined}
                price={inr(price)}
                unit={plan.unitShort}
                priceLead={pct ? <span className="text-xs leading-5 font-semibold text-checkout-primary">−{pct}%</span> : undefined}
                smallPrice={!!pct}
                // Buy now on every plan but their own (user call, 2026-11-03).
                cta={
                  isCurrent ? undefined : (
                    <Button
                      type="button"
                      variant="checkout"
                      size="sm"
                      className="px-3.5"
                      disabled={ctaDisabled?.[id]}
                      onClick={(e) => {
                        // Buys, never just selects; the card's own tap stays a select.
                        e.stopPropagation()
                        const buy = { monthly: onBuyMonthly, quarterly: onBuyQuarterly, annual: onBuyAnnual }[id]
                        if (buy) buy()
                        else onSelectPlan?.(id)
                      }}
                    >
                      {ctaLabels?.[id] ?? "Buy now"}
                    </Button>
                  )
                }
                // No "Extra 10% off" here: on phones the header's ExtraOffBar says it once.
                upcoming={isCurrent ? undefined : <UpcomingPriceLine price={plan.janPrice} />}
                // No reposts line, as on the Jobs tab (user call, 2026-11-02).
                line={<MobileUnlimitedLine db={dbCreditsLabel(plan)} reposts={false} />}
                details={
                  // The Jobs tab's Unlimited card points: three short lines.
                  <MobilePlanDetails
                    items={[
                      [
                        <BriefcaseBusiness key="i" aria-hidden />,
                        <><strong>{slotLabel(plan.slots)}</strong> for {plan.slotDays}{"\u00A0"}days</>,
                      ],
                      [<Database key="i" aria-hidden />, dbCreditsLabel(plan)],
                      [<WhatsApp key="i" aria-hidden />, "Smart alerts to candidates"],
                    ]}
                  />
                }
              />
            )
          })}
        </div>

        <div className="hidden flex-col items-stretch gap-4 md:flex lg:flex-row">
          {PLAN_IDS.map((id) => {
            const plan = planFor(id, jobSlots)
            // The current plan: what they pay, no offer of any kind.
            const isCurrent = current?.plan === id && current.slots === jobSlots
            return (
              <PlanCard
                key={id}
                title={plan.title}
                price={isCurrent ? (current.price ?? plan.price) : plan.price}
                mrp={isCurrent ? undefined : plan.mrp}
                priceSuffix={plan.unit}
                janPrice={isCurrent ? undefined : plan.janPrice}
                months={plan.months}
                extraOff={extraOff && !isCurrent}
                ctaLabel={ctaLabels?.[id] ?? "Buy now"}
                current={isCurrent}
                recommended={id === recommendedPlan}
                ctaDisabled={ctaDisabled?.[id]}
                ctaHint={ctaHints?.[id]}
                slots={plan.slots}
                slotDays={plan.slotDays}
                dbLine={dbCreditsLabel(plan)}
                onBuy={onBuy[id]}
              />
            )
          })}
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

"use client"

/**
 * Job plan card grids — the two layouts a recruiter sees when choosing which
 * kind of job to post (Figma `92gU18d45olE04ATyhhVHD`, boards `2472:19068`
 * (tiered) and `2490:43116` (subscription)). See `src/content/job-plans.ts`
 * for the tier data and its sourcing note.
 *
 * Every card is a `PricingCard layout="price-first"`: title + price → CTA →
 * divider → features, with the free database credits as a quiet line at the
 * bottom. Feature lists follow the Subscription tab's plan cards: sub-points
 * indented under their parent line, ✕ for anything not included. The
 * subscription layout mirrors self-checkout's Jobs tab: one-time tiers in a
 * `bg-checkout-track` frame, the monthly plan in an Unlimited-style dark
 * gradient side card, headers at the same min-height so both columns' cards
 * start (and their CTAs land) on one line.
 *
 * The AI Calling Agent tier's animated "AI Calling Agent in Action" demo
 * widget seen on the Figma board is deliberately NOT built here — deferred
 * per the user's scope decision.
 */

import * as React from "react"
import {
  Badge,
  BriefcaseBusiness,
  Button,
  Check,
  ClockFading,
  Database,
  Flame,
  SignalLevel,
  LogoApnaUnlimited,
  MapPin,
  PricingCard,
  StickyCtaBar,
  Sparkles,
  TrendingUp,
  WhatsApp,
  X,
  type IconComponent,
} from "@apna/design-system"
import { SINGLE_CREDIT } from "@/components/apnahire/job-credit-bundles"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import {
  MobileDiscountRow,
  MobileMetaLine,
  MobilePlanRow,
  MobileUnlimitedCard,
} from "@/components/apnahire/mobile-plan-row"
import { cn } from "@/lib/utils"
import { withExtraOff } from "@/content/offers"
import {
  JOB_PLAN_TIERS,
  MONTHLY_SUBSCRIPTION_PLAN,
  RECOMMENDED_TIER,
  SUBSCRIPTION_PLAN_ORDER,
  TIERED_PLAN_ORDER,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
  type JobPlanTierId,
} from "@/content/job-plans"
import { inr } from "@/lib/format"


/** The claimed exit offer, as the plan lists see it: prices already carry
 *  the 10% (the lists render a discounted copy of each tier), each card
 *  says so, and a one-time shimmer marks the moment it landed. */
const PlanOfferContext = React.createContext({ extraOff: false, shimmerKey: 0 })

function offerTier(tier: JobPlanTier, extraOff: boolean): JobPlanTier {
  if (!extraOff) return tier
  return { ...tier, price: withExtraOff(tier.price), mrp: tier.mrp ?? tier.price }
}

/** Visibility at a glance on the mobile plan rows: the tier's label next to
 *  a three-bar signal meter (1 / 2 / 3 bars lit). */
function VisibilityLine({ tier }: { tier: JobPlanTier }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
      <SignalLevel level={tier.visibilityLevel} className="size-3.5 shrink-0 text-checkout-primary" />
      {tier.visibilityLabel}
    </span>
  )
}

/** Each available feature gets its own glyph and colour; an unavailable one
 *  gets a ✕, so "not included" reads the same everywhere on the card. */
function featureIcon(label: string, enabled: boolean): React.ReactNode {
  if (!enabled) return <X className="shrink-0" aria-hidden />
  const lower = label.toLowerCase()
  const [Icon, colorClass]: [IconComponent, string] = lower.includes("whatsapp")
    ? [WhatsApp, "text-success"]
    : lower.includes("urgently")
      ? [Flame, "text-warning"]
      : [TrendingUp, "text-info"]
  return <Icon className={cn("shrink-0", colorClass)} aria-hidden />
}

/** Quiet and bottom-left, behind PricingCard's dashed footer rule. Same
 *  line as the mobile rows: the credits first, then a muted "· Limited
 *  offer", so it reads as a temporary extra, not a feature of the plan, and
 *  never out-shouts the price. */
const dbCreditsLine = (credits: number) => (
  <span className="flex items-center gap-2 text-foreground">
    <Database className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    <span>
      {credits} free database credits
      <span className="text-muted-foreground"> · Limited offer</span>
    </span>
  </span>
)

/** Parent line + indented sub-points — the Subscription tab's 28px (`pl-7`)
 *  indent and one-size-down text, so sub-point icons sit under the parent
 *  line's text. */
function FeatureGroup({ lead, children }: { lead: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex flex-1 flex-col gap-2">
      <span className="flex items-start gap-2">{lead}</span>
      {children}
    </span>
  )
}

function SubPoint({
  icon,
  muted,
  children,
}: {
  icon: React.ReactNode
  muted?: boolean
  children: React.ReactNode
}) {
  return (
    <span className={cn("flex items-start gap-2 pl-7 text-xs leading-5", muted && "text-muted-foreground/60")}>
      {icon}
      <span>{children}</span>
    </span>
  )
}

/** How a recruiter who holds ANY credits would pay for a plan. Shared by
 *  the card (status line + CTA) and the page's click handler, so the card
 *  never promises something the click doesn't do. "partial" is priced at
 *  self-checkout's single-credit rate; "none" buys the plan itself. */
export type CreditPlan =
  | { state: "covered" }
  | { state: "partial"; held: number; shortfall: number; price: number; mrp: number }
  | { state: "none" }

export function creditPlan(tier: JobPlanTier, balance: CreditBalance): CreditPlan {
  const held = balance[tier.credit.kind]
  if (held === 0) return { state: "none" }
  const shortfall = tier.credit.count - held
  if (shortfall <= 0) return { state: "covered" }
  return {
    state: "partial",
    held,
    shortfall,
    price: shortfall * SINGLE_CREDIT.price,
    mrp: shortfall * SINGLE_CREDIT.mrp,
  }
}

/** Plan cards switch to credit pricing on JOB credits only. AI calling
 *  credits belong to the add-on in the order summary, so holding just an AI
 *  credit must not turn every plan into "0 credits". */
export const hasAnyCredits = (balance: CreditBalance) => balance.job > 0

interface JobPlanGridCardProps {
  tier: JobPlanTier
  /** Ribbon + primary CTA. Exactly one card per layout. */
  recommended: boolean
  creditBalance: CreditBalance
  onSelect: (tier: JobPlanTier) => void
}

function JobPlanGridCard({ tier, recommended, creditBalance, onSelect }: JobPlanGridCardProps) {
  // Credit mode is all-or-nothing across the row: once the recruiter holds
  // any credits, every card speaks credits (no mixing ₹ and credits), and a
  // status line + CTA say exactly what "posting" will cost.
  const creditMode = hasAnyCredits(creditBalance)
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const plan = creditPlan(tier, creditBalance)
  const discountPct = tier.mrp ? Math.round((1 - tier.price / tier.mrp) * 100) : null

  const creditStatus =
    plan.state === "covered"
      ? "Covered by your balance"
      : plan.state === "partial"
        ? `You have ${plan.held} · buy ${plan.shortfall} for ${inr(plan.price)}`
        : `Buy for ${inr(tier.price)}`

  const ctaLabel = !creditMode
    ? "Buy now"
    : plan.state === "covered"
      ? "Post now"
      : plan.state === "partial"
        ? `Buy ${plan.shortfall} credit${plan.shortfall === 1 ? "" : "s"} & post`
        : "Buy & post"

  return (
    <div className="flex flex-col">
      <PricingCard
        key={shimmerKey}
        layout="price-first"
        className={cn("flex-1 border-transparent", shimmerKey > 0 && "animate-shimmer-once")}
        // The whole card selects (the CTA's click bubbles here), as on
        // self-checkout — the card-hover-lift rule.
        onClick={() => onSelect(tier)}
        ribbon={
          recommended ? (
            <Badge variant="ribbon" size="ribbon">
              Recommended
              <Sparkles aria-hidden />
            </Badge>
          ) : undefined
        }
        title={tier.title}
        price={creditMode ? creditLabel(tier.credit) : inr(tier.price)}
        mrp={!creditMode && tier.mrp ? inr(tier.mrp) : undefined}
        badge={!creditMode && discountPct ? <Badge variant="discount">{discountPct}% OFF</Badge> : undefined}
        // On every card in credit mode, none outside it — structural parity.
        priceSuffix={
          creditMode ? (
            <span className="not-italic">{creditStatus}</span>
          ) : extraOff ? (
            <ExtraOffLine />
          ) : undefined
        }
        cta={
          <Button
            type="button"
            variant={recommended ? "checkout" : "outline"}
            className="h-10 w-full font-semibold"
          >
            {ctaLabel}
          </Button>
        }
        meta={[
          <>
            <ClockFading aria-hidden /> Job active for {tier.jobActiveDays} days
          </>,
          <FeatureGroup
            key="visibility"
            lead={
              <>
                {/* The phone rows' meter, not a check: it shows how much
                    visibility, which a tick can't. */}
                <SignalLevel level={tier.visibilityLevel} className="text-checkout-primary" /> {tier.visibilityLabel}
              </>
            }
          >
            {tier.features.map((f) => (
              <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
                {f.label}
              </SubPoint>
            ))}
          </FeatureGroup>,
        ]}
        footer={dbCreditsLine(tier.dbCredits)}
      />
    </div>
  )
}

export interface JobPlanSelectProps {
  creditBalance: CreditBalance
  /** Always called with the catalogue tier (undiscounted) — checkout takes
   *  the extra 10% off as the FIRST10 coupon. */
  onSelectTier: (tier: JobPlanTier) => void
  onSelectSubscription: () => void
  /** The claimed exit offer: show it in every price. */
  extraOff?: boolean
  /** Bump to play the one-time shimmer across the cards. */
  shimmerKey?: number
}

/** Self-checkout's card-group frame (`JobCreditBundles`): translucent
 *  track panel, cards on white inside — used only where one-time tiers sit
 *  beside the subscription card. The 24px header row (`leading-6`) matches
 *  the Unlimited card's 24px logo row, so both columns' cards start level. */
function PlanFrame({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-5 rounded-card bg-checkout-track p-4", className)}>
      {/* A group label, not a heading to compete with the page title: 16px,
          on the same 24px line as the apna Unlimited logo row beside it. */}
      <h2 className="text-h6 leading-6 text-foreground">{title}</h2>
      {children}
    </div>
  )
}

interface MobileJobPlanRadioGroupProps {
  tiers: JobPlanTier[]
  creditBalance: CreditBalance
  onSelectTier: (tier: JobPlanTier) => void
  recommendedId: JobPlanTierId
}

function MobileJobPlanRadioGroup({
  tiers,
  creditBalance,
  onSelectTier,
  recommendedId,
}: MobileJobPlanRadioGroupProps) {
  const [selectedKey, setSelectedKey] = React.useState<JobPlanTierId>(recommendedId)
  const creditMode = hasAnyCredits(creditBalance)
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)

  const selectedTier = tiers.find((t) => t.id === selectedKey) ?? tiers[0]
  const plan = creditPlan(selectedTier, creditBalance)

  let ctaText = ""
  if (plan.state === "covered") {
    ctaText = `Post now (${creditLabel(selectedTier.credit)} used)`
  } else if (plan.state === "partial") {
    ctaText = `Buy ${plan.shortfall} credit${plan.shortfall === 1 ? "" : "s"} & post • ${inr(plan.price)}`
  } else {
    ctaText = `Buy & post • ${inr(selectedTier.price)}`
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:hidden">
        {tiers.map((tier) => {
          const isSelected = selectedKey === tier.id
          const isRecommended = tier.id === recommendedId
          const discountPct =
            tier.mrp && tier.mrp > tier.price
              ? Math.round((1 - tier.price / tier.mrp) * 100)
              : null
          const tierPlan = creditPlan(tier, creditBalance)
          const creditStatus =
            tierPlan.state === "covered"
              ? "Covered by balance"
              : tierPlan.state === "partial"
                ? `Buy ${tierPlan.shortfall} for ${inr(tierPlan.price)}`
                : inr(tier.price)

          return (
            <MobilePlanRow
              key={`${tier.id}-${shimmerKey}`}
              title={tier.title}
              selected={isSelected}
              onSelect={() => setSelectedKey(tier.id)}
              recommended={isRecommended}
              className={cn(shimmerKey > 0 && "animate-shimmer-once")}
              meta={
                <>
                  <MobileMetaLine icon={<ClockFading aria-hidden />}>
                    Active for {tier.jobActiveDays} days
                  </MobileMetaLine>
                  <VisibilityLine tier={tier} />
                  {creditMode && (
                    <span className="text-xs font-semibold text-checkout-info">
                      Consumes {creditLabel(tier.credit)}
                    </span>
                  )}
                </>
              }
              mrp={!creditMode && tier.mrp && tier.mrp > tier.price ? inr(tier.mrp) : undefined}
              price={creditMode ? creditLabel(tier.credit) : inr(tier.price)}
              belowPrice={
                creditMode ? (
                  <span className="text-xs italic text-muted-foreground">{creditStatus}</span>
                ) : (
                  // One discount signal under the price. The badge already
                  // counts the claimed 10%; the note says why it went up.
                  <MobileDiscountRow pct={discountPct} note={extraOff ? "Incl. 10% extra" : undefined} />
                )
              }
              details={
                // Explain on selection. With no feature points (Classic),
                // the credits line is the only content: its divider is the
                // dashed "offer" rule, instead of a solid one.
                <ul
                  className={cn(
                    "flex flex-col gap-2 border-t border-border pt-3 text-xs text-foreground animate-in fade-in-0",
                    !tier.features.some((f) => f.enabled) && "border-dashed"
                  )}
                >
                  {tier.features
                    .filter((f) => f.enabled)
                    .map((f) => (
                      <li key={f.label} className="flex items-center gap-2 [&_svg]:size-4">
                        {featureIcon(f.label, true)}
                        {f.label}
                      </li>
                    ))}
                  {/* Last: the free credits are a limited-time offer, not
                      the plan. The dashed rule sets them apart only when
                      feature points sit above. */}
                  <li
                    className={cn(
                      "flex items-center gap-2 text-foreground",
                      tier.features.some((f) => f.enabled) && "border-t border-dashed border-border pt-2"
                    )}
                  >
                    <Database className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span>
                      {tier.dbCredits} free database credits
                      <span className="text-muted-foreground"> · Limited offer</span>
                    </span>
                  </li>
                </ul>
              }
            />
          )
        })}
      </div>

      {/* Mobile Sticky Bottom CTA Dock for selected single job tier */}
      {/* sm:hidden: this page switches to the card grid at sm, not md. */}
      <StickyCtaBar className="sm:hidden">
        <Button type="button" variant="checkout" size="xl" onClick={() => onSelectTier(selectedTier)}>
          {ctaText}
        </Button>
      </StickyCtaBar>
    </>
  )
}

/** Distinct mobile card for Apna Unlimited subscription offering in Express Checkout */
function MobileSubscriptionCard({ onSelect }: { onSelect: () => void }) {
  const plan = MONTHLY_SUBSCRIPTION_PLAN
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  // Struck price + % OFF follow the same rules as the job rows: a plan list
  // price (plan.mrp, if a discount is ever run) or, with the claimed 10%,
  // the undiscounted price.
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  const discountPct = strike && strike > price ? Math.round((1 - price / strike) * 100) : null
  return (
    <MobileUnlimitedCard
      key={shimmerKey}
      className="sm:hidden"
      cardClassName={cn(shimmerKey > 0 && "animate-shimmer-once")}
      title="Monthly plan"
      subtitle="Unlimited job reposts"
      mrp={strike ? inr(strike) : undefined}
      price={inr(price)}
      unit="/month"
      belowPrice={<MobileDiscountRow pct={discountPct} note={extraOff ? "Incl. 10% extra" : undefined} />}
      features={[
        [<BriefcaseBusiness key="i" aria-hidden />, <><strong>1 active job slot</strong> for 30 days</>],
        [<Database key="i" aria-hidden />, `${plan.dbCreditsPerMonth} database credits every month`],
        [<WhatsApp key="i" aria-hidden />, "WhatsApp outreach to matched candidates"],
      ]}
      note={plan.note}
      cta={
        <Button
          type="button"
          variant="checkout-inset"
          size="sm"
          className="h-8 shrink-0 rounded-full px-3.5 text-xs font-semibold"
          onClick={onSelect}
        >
          Get Unlimited
        </Button>
      }
    />
  )
}

/** 3-card layout: Classic / Premium (recommended) / Super Premium. */
export function TieredJobPlans({
  creditBalance,
  onSelectTier: selectCatalogueTier,
  extraOff = false,
  shimmerKey = 0,
}: Omit<JobPlanSelectProps, "onSelectSubscription">) {
  const tiers = TIERED_PLAN_ORDER.map((id) => offerTier(JOB_PLAN_TIERS[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(JOB_PLAN_TIERS[tier.id])
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <MobileJobPlanRadioGroup
        tiers={tiers}
        creditBalance={creditBalance}
        onSelectTier={onSelectTier}
        recommendedId={RECOMMENDED_TIER.tiered}
      />
      <div className="hidden sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <JobPlanGridCard
            key={tier.id}
            tier={tier}
            recommended={tier.id === RECOMMENDED_TIER.tiered}
            creditBalance={creditBalance}
            onSelect={onSelectTier}
          />
        ))}
      </div>
    </PlanOfferContext.Provider>
  )
}

/** Self-checkout Jobs-tab structure: framed one-time tiers + Unlimited monthly side card. */
export function SubscriptionJobPlans({
  creditBalance,
  onSelectTier: selectCatalogueTier,
  onSelectSubscription,
  extraOff = false,
  shimmerKey = 0,
}: JobPlanSelectProps) {
  const tiers = SUBSCRIPTION_PLAN_ORDER.map((id) => offerTier(JOB_PLAN_TIERS[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(JOB_PLAN_TIERS[tier.id])
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <div className="flex flex-col gap-4 sm:hidden">
        <MobileJobPlanRadioGroup
          tiers={tiers}
          creditBalance={creditBalance}
          onSelectTier={onSelectTier}
          recommendedId={RECOMMENDED_TIER.subscription}
        />
        <MobileSubscriptionCard onSelect={onSelectSubscription} />
      </div>

      <div className="hidden sm:flex sm:flex-col sm:gap-4 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col">
          <PlanFrame className="flex-1" title="Single job posting">
            <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
              {tiers.map((tier) => (
                <JobPlanGridCard
                  key={tier.id}
                  tier={tier}
                  recommended={tier.id === RECOMMENDED_TIER.subscription}
                  creditBalance={creditBalance}
                  onSelect={onSelectTier}
                />
              ))}
            </div>
          </PlanFrame>
        </div>

        <div className="flex w-full flex-col xl:w-82">
          <MonthlySubscriptionCard
            className="flex-1"
            reservePriceSuffix={hasAnyCredits(creditBalance)}
            onSelect={onSelectSubscription}
          />
        </div>
      </div>
    </PlanOfferContext.Provider>
  )
}

function MonthlySubscriptionCard({
  onSelect,
  reservePriceSuffix,
  className,
}: {
  onSelect: () => void
  /** True when the tier cards beside it show a credit status line under
   *  their price — this card reserves an empty line of the same height so
   *  its CTA stays level with theirs. */
  reservePriceSuffix: boolean
  className?: string
}) {
  const plan = MONTHLY_SUBSCRIPTION_PLAN
  // The claimed 10% applies to Unlimited too: same discounted price, struck
  // list price and "10% extra off applied" line as the tier cards, in the
  // same priceSuffix slot so the lines sit level across the row.
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  // Same rule as the mobile card and the tier cards: whenever a struck price
  // shows, so does its % OFF badge.
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  const discountPct = strike && strike > price ? Math.round((1 - price / strike) * 100) : null
  return (
    // The frame is the click target but stays put; hovering anywhere in it
    // lifts the card inside (card-hover-lift rule) — same as self-checkout's
    // UnlimitedSideCard.
    <div
      data-card-lift-group
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer flex-col gap-5 rounded-card bg-gradient-checkout-unlimited p-4",
        className
      )}
    >
      {/* Logo row as in UnlimitedSideCard; 24px tall to match PlanFrame's
          heading so both columns' cards start level. */}
      <div className="flex h-6 items-start pt-1.5">
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
      </div>

      <PricingCard
        key={shimmerKey}
        layout="price-first"
        surface="inset"
        className={cn("flex-1 border-transparent", shimmerKey > 0 && "animate-shimmer-once")}
        title="Monthly plan"
        price={
          <>
            {inr(price)}
            <span className="text-sm font-regular">/month</span>
          </>
        }
        mrp={strike ? inr(strike) : undefined}
        badge={discountPct ? <Badge variant="discount">{discountPct}% OFF</Badge> : undefined}
        priceSuffix={
          extraOff ? (
            <ExtraOffLine />
          ) : reservePriceSuffix ? (
            <span aria-hidden>&nbsp;</span>
          ) : undefined
        }
        cta={
          <Button type="button" variant="checkout-inset" className="h-10 w-full font-semibold">
            Get apna unlimited
          </Button>
        }
        meta={[
          <FeatureGroup
            key="slot"
            lead={
              <>
                <BriefcaseBusiness aria-hidden /> 1 Active job slot for {plan.jobSlotMonths * 30} days
              </>
            }
          >
            {plan.features.map((f) => (
              <SubPoint key={f} icon={<Check className="shrink-0 text-success" aria-hidden />}>
                {f}
              </SubPoint>
            ))}
          </FeatureGroup>,
          // A permanent part of the plan, unlike the one-time tiers'
          // limited-time credits — so a regular feature row, not the footer.
          <>
            <Database aria-hidden /> {plan.dbCreditsPerMonth} database credits worth{" "}
            {inr(plan.dbCreditsWorth)} every month
          </>,
          <>
            <WhatsApp aria-hidden /> WhatsApp outreach to matched candidates
          </>,
        ]}
        footer={
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {plan.note}
          </span>
        }
      />
    </div>
  )
}

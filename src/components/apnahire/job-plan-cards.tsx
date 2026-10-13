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
  LogoApnaUnlimited,
  MapPin,
  PhoneCall,
  PricingCard,
  Sparkles,
  TrendingUp,
  WhatsApp,
  X,
  type IconComponent,
} from "@apna/design-system"
import { SINGLE_CREDIT } from "@/components/apnahire/job-credit-bundles"
import { cn } from "@/lib/utils"
import {
  JOB_PLAN_TIERS,
  MONTHLY_SUBSCRIPTION_PLAN,
  RECOMMENDED_TIER,
  SUBSCRIPTION_PLAN_ORDER,
  TIERED_PLAN_ORDER,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
} from "@/content/job-plans"

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

/** Each available feature gets its own glyph and colour; an unavailable one
 *  gets the same ✕ as the AI calling agent row, so "not included" reads the
 *  same everywhere on the card. */
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

/** Quiet and bottom-left, behind PricingCard's dashed footer rule, and
 *  labelled "Limited time": the free credits are a temporary offer, so they
 *  must not read as a permanent feature of the plan — but must not out-shout
 *  the price either. */
const dbCreditsLine = (credits: number) => (
  <span className="flex items-center gap-1.5">
    <Database className="size-4" aria-hidden />
    <span>
      <span className="font-semibold">Limited time offer:</span> {credits} free database credits
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

export const hasAnyCredits = (balance: CreditBalance) => balance.job > 0 || balance["ai-calling"] > 0

interface JobPlanGridCardProps {
  tier: JobPlanTier
  /** Ribbon + primary CTA. Exactly one card per layout. */
  recommended: boolean
  creditBalance: CreditBalance
  onSelect: (tier: JobPlanTier) => void
  /** Reserve the social-proof slot under the card — true when ANY card in
   *  the row has one (structural parity; see PricingCard's rule). */
  reserveSocialProof: boolean
}

function JobPlanGridCard({ tier, recommended, creditBalance, onSelect, reserveSocialProof }: JobPlanGridCardProps) {
  // Credit mode is all-or-nothing across the row: once the recruiter holds
  // any credits, every card speaks credits (no mixing ₹ and credits), and a
  // status line + CTA say exactly what "posting" will cost.
  const creditMode = hasAnyCredits(creditBalance)
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
    <div className="flex flex-col gap-2">
      <PricingCard
        layout="price-first"
        className="flex-1 border-transparent"
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
        priceSuffix={creditMode ? <span className="not-italic">{creditStatus}</span> : undefined}
        cta={
          <Button
            type="button"
            variant={recommended ? "checkout" : "outline"}
            className="h-10 w-full font-semibold"
            onClick={() => onSelect(tier)}
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
                <Check className="text-success" aria-hidden /> {tier.visibilityLabel}
              </>
            }
          >
            {tier.features.map((f) => (
              <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
                {f.label}
              </SubPoint>
            ))}
          </FeatureGroup>,
          <span key="ai" className={cn("flex items-start gap-2", !tier.aiCallingAgent && "text-muted-foreground/60")}>
            {tier.aiCallingAgent ? <PhoneCall className="text-checkout-info" aria-hidden /> : <X aria-hidden />}
            AI calling agent
          </span>,
        ]}
        footer={dbCreditsLine(tier.dbCredits)}
      />
      {reserveSocialProof && (
        // Rendered on every card in the row, filled only on the one with
        // social proof — otherwise that card's flex-1 shrinks to make room.
        <div className="flex h-5 items-center justify-center">
          {tier.socialProof && <Badge variant="success">{tier.socialProof}</Badge>}
        </div>
      )}
    </div>
  )
}

export interface JobPlanSelectProps {
  creditBalance: CreditBalance
  onSelectTier: (tier: JobPlanTier) => void
  onSelectSubscription: () => void
}

/** Self-checkout's card-group frame (`JobCreditBundles`): translucent
 *  track panel, cards on white inside — used only where one-time tiers sit
 *  beside the subscription card. The 24px header row (`leading-6`) matches
 *  the Unlimited card's 24px logo row, so both columns' cards start level. */
function PlanFrame({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-5 rounded-2xl bg-checkout-track p-4", className)}>
      <h2 className="font-heading text-xl font-semibold leading-6 text-foreground">{title}</h2>
      {children}
    </div>
  )
}

/** 4-card layout: Classic / Premium / Premium + AI Calling Agent (recommended) / Super Premium. */
export function TieredJobPlans({ creditBalance, onSelectTier }: Omit<JobPlanSelectProps, "onSelectSubscription">) {
  const tiers = TIERED_PLAN_ORDER.map((id) => JOB_PLAN_TIERS[id])
  const reserveSocialProof = tiers.some((t) => t.socialProof)
  return (
    // No PlanFrame here: the frame exists to set one-time tiers against the
    // subscription card; with nothing to compare against, it's just chrome.
    // 4-up only from xl: below that "Premium job + AI Calling Agent" wraps,
    // which would drop that card's price and CTA below its siblings'.
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tiers.map((tier) => (
        <JobPlanGridCard
          key={tier.id}
          tier={tier}
          recommended={tier.id === RECOMMENDED_TIER.tiered}
          creditBalance={creditBalance}
          onSelect={onSelectTier}
          reserveSocialProof={reserveSocialProof}
        />
      ))}
    </div>
  )
}

/** Self-checkout Jobs-tab structure: framed one-time tiers + Unlimited monthly side card. */
export function SubscriptionJobPlans({ creditBalance, onSelectTier, onSelectSubscription }: JobPlanSelectProps) {
  const tiers = SUBSCRIPTION_PLAN_ORDER.map((id) => JOB_PLAN_TIERS[id])
  const reserveSocialProof = tiers.some((t) => t.socialProof)
  return (
    // Side by side only from xl, same breakpoint as self-checkout's Jobs tab.
    // No captions under either column (unlike self-checkout): a caption on
    // one side only eats into that side's stretched height and its cards
    // come out shorter. The city note lives in the card's footer instead.
    <div className="flex flex-col gap-4 xl:flex-row">
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
                reserveSocialProof={reserveSocialProof}
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
  return (
    <div className={cn("flex flex-col gap-5 overflow-hidden rounded-2xl bg-gradient-checkout-unlimited p-4", className)}>
      {/* Logo row as in UnlimitedSideCard; 24px tall to match PlanFrame's
          heading so both columns' cards start level. */}
      <div className="flex h-6 items-start pt-1.5">
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
      </div>

      <PricingCard
        layout="price-first"
        surface="inset"
        className="flex-1 border-transparent"
        title="Monthly plan"
        price={
          <>
            {inr(plan.price)}
            <span className="text-sm font-regular">/month</span>
          </>
        }
        priceSuffix={reservePriceSuffix ? <span aria-hidden>&nbsp;</span> : undefined}
        cta={
          <Button type="button" variant="checkout-inset" className="h-10 w-full font-semibold" onClick={onSelect}>
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
            <WhatsApp className="text-success" aria-hidden /> WhatsApp outreach to matched candidates
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

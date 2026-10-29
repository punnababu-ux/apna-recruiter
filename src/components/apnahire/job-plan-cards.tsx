"use client"

/**
 * Job plan card grids — the two layouts a recruiter sees when choosing which
 * kind of job to post (Figma `92gU18d45olE04ATyhhVHD`, boards `2472:19068`
 * (tiered) and `2490:43116` (subscription)). See `src/content/job-plans.ts`
 * for the tier data and its sourcing note.
 *
 * Every card is a `PricingCard layout="price-first"`: title + price →
 * divider → features → the free database credits as a quiet line → CTA,
 * last, as on every self-checkout plan card. Feature lists follow the Subscription tab's plan cards: sub-points
 * indented under their parent line, ✕ for anything not included. The
 * subscription layout mirrors self-checkout's Jobs tab: one-time tiers in a
 * `bg-checkout-track` frame, the monthly plan in an Unlimited-style dark
 * gradient side card, headers at the same min-height so both columns' cards
 * start on one line and their CTAs land on one line at the bottom.
 *
 * The AI Calling Agent tier's animated "AI Calling Agent in Action" demo
 * widget seen on the Figma board is deliberately NOT built here — deferred
 * per the user's scope decision.
 */

import { AiDemoCall, AiSparkle } from "@/components/apnahire/ai-demo-call"
import * as React from "react"
import {
  Info,
  Badge,
  BriefcaseBusiness,
  InfinityIcon,
  Check,
  Button,
  ClockFading,
  Database,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Flame,
  VisibilityTicks,
  LogoApnaUnlimited,
  MapPin,
  PricingCard,
  StickyCtaBar,
  Sparkles,
  TrendingUp,
  UserSearch,
  WhatsApp,
  X,
  type IconComponent,
  AlertBanner,
} from "@apna/design-system"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { ExtraOffLine } from "@/components/apnahire/offers/extra-off-line"
import { UpcomingPriceLine, useUpcomingPrices } from "@/components/apnahire/upcoming-price-line"
import {
  MobileDiscountRow,
  MobileMetaLine,
  MobilePlanRow,
  MobileUnlimitedCard,
} from "@/components/apnahire/mobile-plan-row"
import { ValueArt } from "@/components/marketing/value-art"
// Paused with the feature tooltips (see FeatureName).
// import { TapTooltip } from "@/components/apnahire/tap-tooltip"
import { cn } from "@/lib/utils"
import { RECOMMENDED_EDGE, useCardHover } from "@/components/apnahire/use-card-hover"
import { EXTRA_OFF, withExtraOff } from "@/content/offers"
import {
  AI_CALLING_ADDON,
  MONTHLY_PLAN_PERKS,
  RECOMMENDED_TIER,
  SUBSCRIPTION_PLAN_ORDER,
  TIERED_PLAN_ORDER,
  creditLabel,
  type CreditBalance,
  type JobPlanTier,
  type JobPlanTierId,
} from "@/content/job-plans"
import { inr } from "@/lib/format"
import { dbCreditsLabel, slotLabel, slotTermLabel } from "@/content/subscriptions"


/** The claimed exit offer, as the plan lists see it: prices already carry
 *  the 10% (the lists render a discounted copy of each tier), each card
 *  says so, and a one-time shimmer marks the moment it landed. */
const PlanOfferContext = React.createContext({ extraOff: false, shimmerKey: 0 })

function offerTier(tier: JobPlanTier, extraOff: boolean): JobPlanTier & { ownPct: number | null } {
  // The % OFF badge is the tier's own discount, never recalculated with the
  // 10%: the offer shows as its own line, as the cart's coupon row does.
  const ownPct = tier.mrp && tier.mrp > tier.price ? Math.round((1 - tier.price / tier.mrp) * 100) : null
  if (!extraOff) return { ...tier, ownPct }
  return { ...tier, price: withExtraOff(tier.price), mrp: tier.mrp ?? tier.price, ownPct }
}

/** A tier's own % OFF, whether or not it went through offerTier. */
const ownPct = (tier: JobPlanTier & { ownPct?: number | null }) =>
  tier.ownPct !== undefined
    ? tier.ownPct
    : tier.mrp && tier.mrp > tier.price
      ? Math.round((1 - tier.price / tier.mrp) * 100)
      : null

/** Visibility at a glance on the mobile plan rows: the tier's label next to
 *  its ticks (one, two, two in a circle). */
function VisibilityLine({ tier }: { tier: JobPlanTier }) {
  return (
    <MobileMetaLine icon={<VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" />}>
      {tier.visibilityLabel}
    </MobileMetaLine>
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
 *  line as the mobile rows. That it's a limited-time offer is said once,
 *  under the cards (DbCreditsOfferNote), not on every card. */
/** "30 database credits worth ₹300", on every card. Job tiers value a credit
 *  at ₹10, the rate the Unlimited plan quotes (200 worth ₹2,000). */
// "worth ₹300" glued (no-break space), so it moves to a new line whole.
const dbWorth = (credits: number) => `${credits} database credits worth\u00A0${inr(credits * 10)}`

const dbCreditsLine = (credits: number) => (
  <span className="flex items-center gap-2 text-foreground">
    <Database className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    <span>
      {dbWorth(credits)}
    </span>
  </span>
)

/** A card's title: the P+AI card says "Premium job +" and an "AI" tag;
 *  its full name stays in the data for the order summary. */
const tierTitle = (tier: JobPlanTier) =>
  tier.id === "premium-ai" ? (
    // The name never breaks; the tag moves under it as a whole when the row is narrow.
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="whitespace-nowrap">Premium job +</span>
      {/* Vivid sky → green (--gradient-ai-tag), so the tag reads at a glance. */}
      <Badge variant="outline" className="border-transparent bg-gradient-ai-tag font-semibold text-primary-foreground">
        AI
      </Badge>
    </span>
  ) : (
    tier.title
  )

/** Four points, one at a time in one line: each rolls up
 *  into place every few seconds. Screen readers get all three at once. */
function RollingPoint() {
  // "Calls all applicants" leads; the add-on's three points follow.
  const points = ["Calls all applicants", ...AI_CALLING_ADDON.points]
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % points.length), 2500)
    return () => window.clearInterval(id)
  }, [points.length])
  return (
    <span className="flex items-center gap-1 overflow-hidden text-xs text-muted-foreground">
      <Check className="size-3.5 shrink-0 text-checkout-primary" aria-hidden />
      <span key={i} aria-hidden className="animate-in fade-in-0 slide-in-from-bottom-2 duration-enter">
        {points[i]}
      </span>
      <span className="sr-only">{points.join(", ")}</span>
    </span>
  )
}

/** The Premium + AI card's AI block: the order-summary add-on's wash,
 *  check row and demo pill (AiCallingAddonCard), so AI calling looks the
 *  same wherever it is sold. */
function AiAgentBlock() {
  return (
    <span className="flex w-full flex-col gap-3 rounded-card-nested bg-gradient-product-ai-calling p-3">
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <AiSparkle className="size-5 shrink-0" />
        AI calling agent
      </span>
      <RollingPoint />
      {/* Its own buttons: the card's select must not fire from them. */}
      <span className="flex" onClick={(e) => e.stopPropagation()}>
        <AiDemoCall className="w-full" />
      </span>
    </span>
  )
}

/** Under the cards, once (JobPlanSelection): the order summary offers AI
 *  calling, a paid extra for any job. The design system's AlertBanner in its
 *  primary (solid gradient) look, so it reads as information, not as part
 *  of a plan. */
export const aiAddonBanner = (
  <AlertBanner
    appearance="primary"
    variant="info"
    icon={<AiSparkle className="size-4 shrink-0" />}
    title="AI calling add-on available in the next step"
  />
)

const planFooter = (credits: number) => (
  <span className="flex flex-col gap-2">
    {dbCreditsLine(credits)}
  </span>
)

/** What each job feature does, opened from its dotted-underlined name.
 *  Text for now; a visual (the "Urgently hiring" tag as candidates see it)
 *  may join it later. Written in ASD-STE100 (see "Explainer copy" in
 *  AGENTS.md). shortcut: wording drafted in design, product to confirm. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept while the tooltips are paused (FeatureName)
const FEATURE_INFO: Record<string, string> = {
  "WhatsApp notifications to candidates":
    "We send your job on WhatsApp to candidates who match it.",
  "2x Priority WhatsApp notifications to candidates":
    "We send your job on WhatsApp to two times more candidates, first.",
  "Featured with 'Urgently hiring' tag":
    "Your job shows an 'Urgently hiring' tag in search results.",
  "Top placements in job listings":
    "We show your job above other jobs in search results.",
}

/** A feature's name; a tap or click opens what it means in the design
 *  system's dark tooltip. No marker on the text (user call, 2026-10-29). */
function FeatureName({ label }: { label: string }) {
  // Paused (user call, 2026-10-29): the tooltips got in the way of picking a
  // card. To bring them back, restore the two lines below.
  // const info = FEATURE_INFO[label]
  // if (info) return <TapTooltip content={info}>{label}</TapTooltip>
  return <>{label}</>
}

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

export { creditPlan, hasAnyCredits, type CreditPlan } from "@/lib/apnahire/credit-plan"
import { creditPlan, hasAnyCredits } from "@/lib/apnahire/credit-plan"

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
  const upcoming = useUpcomingPrices()
  const { singleCredit } = usePlans()
  const plan = creditPlan(tier, creditBalance, singleCredit)
  const discountPct = ownPct(tier)

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

  // Every card's CTA is the quiet outline until the card is hovered (or
  // focused): then it turns the green primary, so only one green shows at a
  // time (user call, 2026-10-29). Recommended keeps standing out by its blue
  // edge instead of a resting green button.
  const { active, props: hoverProps } = useCardHover()
  return (
    <div
      className="flex flex-col"
      {...hoverProps}
    >
      <PricingCard
        key={shimmerKey}
        layout="price-first"
        className={cn(
          "flex-1",
          // The recommended plan's edge: the Recommended ribbon's blue, 2px
          // (border + outline), so the card size never shifts. An outline,
          // not a ring: the hover lift replaces box-shadow, which would drop
          // a ring and make the edge and the ribbon jump.
          recommended ? RECOMMENDED_EDGE : "border-transparent",
          shimmerKey > 0 && "animate-shimmer-once"
        )}
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
        title={tierTitle(tier)}
        price={creditMode ? creditLabel(tier.credit) : inr(tier.price)}
        mrp={!creditMode && tier.mrp ? inr(tier.mrp) : undefined}
        badge={!creditMode && discountPct ? <Badge variant="discount">{discountPct}% OFF</Badge> : undefined}
        // On every card in credit mode, none outside it — structural parity.
        // Outside it: the claimed offer's line, then the Jan 1 price (credit
        // mode speaks credits, so it has no ₹ line to add).
        priceSuffix={
          creditMode ? (
            <span className="not-italic">{creditStatus}</span>
          ) : extraOff || upcoming ? (
            <span className="flex flex-col gap-1">
              {extraOff && <ExtraOffLine />}
              <UpcomingPriceLine price={tier.janPrice} />
            </span>
          ) : undefined
        }
        cta={
          <Button
            type="button"
            variant={active ? "checkout" : "outline"}
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
                <VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" /> {tier.visibilityLabel}
              </>
            }
          >
            {tier.features.map((f) => (
              <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
                <FeatureName label={f.label} />
              </SubPoint>
            ))}
          </FeatureGroup>,
          ...(tier.id === "premium-ai" ? [<AiAgentBlock key="ai" />] : []),
        ]}
        footer={planFooter(tier.dbCredits)}
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
  /** Why the subscription can't be bought for this job (a work-from-home
   *  job): the card stays visible but dimmed, its CTA disabled with the
   *  reason, and a tap explains it. */
  subscriptionBlocked?: { label: string; message: string }
}

/** Self-checkout's card-group frame (`JobCreditBundles`): translucent
 *  track panel, cards on white inside — used only where one-time tiers sit
 *  beside the subscription card. The 24px header row (`leading-6`) matches
 *  the Unlimited card's 24px logo row, so both columns' cards start level. */
function PlanFrame({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-5 rounded-card surface-glass-dark p-4", className)}>
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
  /** apna Unlimited as the list's last radio: the sticky CTA buys it. */
  subscription?: { onSelect: () => void; blocked?: { label: string; message: string } }
}

function MobileJobPlanRadioGroup({
  tiers,
  creditBalance,
  onSelectTier,
  recommendedId,
  subscription,
}: MobileJobPlanRadioGroupProps) {
  const [selectedKey, setSelectedKey] = React.useState<JobPlanTierId | "unlimited">(recommendedId)
  const creditMode = hasAnyCredits(creditBalance)
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)

  const { singleCredit, plan: subscriptionPlan } = usePlans()
  const selectedTier = tiers.find((t) => t.id === selectedKey) ?? tiers[0]
  const plan = creditPlan(selectedTier, creditBalance, singleCredit)
  const unlimitedSelected = selectedKey === "unlimited" && !!subscription

  let ctaText = ""
  if (unlimitedSelected) {
    const monthly = subscriptionPlan("monthly").price
    ctaText = `Get apna unlimited • ${inr(extraOff ? withExtraOff(monthly) : monthly)}`
  } else if (plan.state === "covered") {
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
          const discountPct = ownPct(tier)
          const tierPlan = creditPlan(tier, creditBalance, singleCredit)
          const creditStatus =
            tierPlan.state === "covered"
              ? "Covered by balance"
              : tierPlan.state === "partial"
                ? `Buy ${tierPlan.shortfall} for ${inr(tierPlan.price)}`
                : inr(tier.price)

          return (
            <MobilePlanRow
              key={`${tier.id}-${shimmerKey}`}
              title={tierTitle(tier)}
              selected={isSelected}
              onSelect={() => setSelectedKey(tier.id)}
              recommended={isRecommended}
              className={cn(shimmerKey > 0 && "animate-shimmer-once")}
              meta={
                <>
                  {/* "Active for 15 days" is said once, under the page title. */}
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
                  <MobileDiscountRow pct={discountPct} note={extraOff ? EXTRA_OFF.appliedShort : undefined} />
                )
              }
              upcoming={creditMode ? undefined : <UpcomingPriceLine price={tier.janPrice} />}
              // Closed: a separator, then the three feature icons (in colour
              // when included, grey when not) and the DB credits beside them.
              collapsed={
                  <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-xs">
                    <span className="flex items-center gap-3">
                      {tier.features.map((f) => (
                        <span
                          key={f.label}
                          className={cn("flex [&_svg]:size-4", !f.enabled && "[&_svg]:text-muted-foreground/40")}
                        >
                          {featureIcon(f.label, true)}
                          <span className="sr-only">
                            {f.label}: {f.enabled ? "included" : "not included"}
                          </span>
                        </span>
                      ))}
                      {tier.id === "premium-ai" && (
                        <span className="flex">
                          <AiSparkle className="size-4" />
                          <span className="sr-only">AI calling agent: included</span>
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Database className="size-3.5 shrink-0" aria-hidden />
                      {dbWorth(tier.dbCredits)}
                    </span>
                  </div>
              }
              details={
                // Explain on selection: every feature as a line, what's
                // missing greyed with a cross, then the free DB credits.
                <ul className="flex flex-col gap-2 border-t border-border pt-3 text-xs animate-in fade-in-0">
                  {tier.features.map((f) => (
                    <li
                      key={f.label}
                      className={cn(
                        "flex items-center gap-2 [&_svg]:size-4",
                        f.enabled ? "text-foreground" : "text-muted-foreground/70"
                      )}
                    >
                      {featureIcon(f.label, f.enabled)}
                      <FeatureName label={f.label} />
                    </li>
                  ))}
                  {tier.id === "premium-ai" && (
                    <li className="flex flex-col">
                      <AiAgentBlock />
                    </li>
                  )}
                  <li className="flex items-center gap-2 border-t border-dashed border-border pt-2 text-foreground">
                    <Database className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span>{dbWorth(tier.dbCredits)}</span>
                  </li>
                </ul>
              }
            />
          )
        })}
        {subscription && (
          <BlockedSubscription blocked={subscription.blocked}>
            <MobileSubscriptionCard
              selected={unlimitedSelected}
              onSelect={() => setSelectedKey("unlimited")}
              blocked={!!subscription.blocked}
            />
          </BlockedSubscription>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Dock for selected single job tier */}
      {/* sm:hidden: this page switches to the card grid at sm, not md. */}
      <StickyCtaBar className="sm:hidden">
        {/* No step menu on the plan step: the full-width CTA is the bar. */}
        <Button
          type="button"
          variant="checkout"
          size="xl"
          className="w-full min-w-0 rounded-full shadow-popover"
          onClick={() => (unlimitedSelected ? subscription?.onSelect() : onSelectTier(selectedTier))}
        >
          <span className="truncate">{ctaText}</span>
        </Button>
      </StickyCtaBar>
    </>
  )
}

/** apna Unlimited as the phone plan list's last radio. Its features show
 *  only while selected; the sticky CTA buys it. */
function MobileSubscriptionCard({
  selected,
  onSelect,
  blocked,
}: {
  selected: boolean
  onSelect: () => void
  blocked?: boolean
}) {
  const plan = { ...usePlans().plan("monthly"), ...MONTHLY_PLAN_PERKS }
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  // Struck price + % OFF follow the same rules as the job rows: a plan list
  // price (plan.mrp, if a discount is ever run) or, with the claimed 10%,
  // the undiscounted price.
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  // The plan's own discount only (plan.mrp); the 10% is its own line.
  const discountPct = plan.mrp && plan.mrp > plan.price ? Math.round((1 - plan.price / plan.mrp) * 100) : null
  return (
    <MobileUnlimitedCard
      selected={selected}
      onSelect={blocked ? undefined : onSelect}
      key={shimmerKey}
      className="sm:hidden"
      cardClassName={cn(shimmerKey > 0 && "animate-shimmer-once")}
      title={plan.name}
      mrp={strike ? inr(strike) : undefined}
      price={inr(price)}
      unit={plan.unitShort}
      belowPrice={<MobileDiscountRow pct={discountPct} note={extraOff ? EXTRA_OFF.appliedShort : undefined} />}
      upcoming={<UpcomingPriceLine price={plan.janPrice} />}
      meta={
        // Validity folds into the slot line.
        <MobileMetaLine icon={<BriefcaseBusiness className="text-checkout-primary" aria-hidden />}>
            {slotTermLabel(plan)}
          </MobileMetaLine>
      }
      // Closed, as the job rows: a rule, the feature icons, the DB credits.
      collapsed={
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-xs [&_svg]:size-4">
          <span className="flex items-center gap-3">
            <WhatsApp className="text-success" aria-label="WhatsApp alerts" />
            <InfinityIcon className="text-warning" aria-label="Free job reposts and swapping" />
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground [&_svg]:size-3.5">
            <Database className="shrink-0" aria-hidden />
            {dbCreditsLabel(plan)}
          </span>
        </div>
      }
      features={[
        // The slot sits above as meta; these show when selected.
        [<WhatsApp key="i" className="text-success" aria-hidden />, "WhatsApp alerts to matched candidates"],
        [<InfinityIcon key="i" className="text-warning" aria-hidden />, "Free job reposts and swapping"],
        [<Database key="i" className="text-muted-foreground" aria-hidden />, dbCreditsLabel(plan)],
      ]}
      note={plan.note}
    />
  )
}

/** The subscription card when it can't be bought for this job: dimmed and
 *  inert, and a tap anywhere on it shows why, over the card at full
 *  strength, fading after a few seconds. On the card rather than a toast:
 *  the reason belongs next to what it explains (AGENTS.md: no toast for what
 *  the screen can show). Without `blocked` it renders the card untouched. */
function BlockedSubscription({
  blocked,
  className,
  children,
}: {
  blocked?: { label: string; message: string }
  className?: string
  children: React.ReactNode
}) {
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => {
    if (!shown) return
    const t = window.setTimeout(() => setShown(false), 4000)
    return () => window.clearTimeout(t)
  }, [shown])
  if (!blocked) return <div className={className}>{children}</div>
  return (
    <div className={cn("relative", className)} onClick={() => setShown(true)}>
      <div aria-disabled className="flex flex-1 flex-col opacity-55 grayscale-25">
        {children}
      </div>
      {shown && (
        <div role="status" className="absolute inset-x-3 bottom-3 animate-in fade-in-0 slide-in-from-bottom-2">
          {/* The system's information banner, solid (blue, white text), so
              it can't be missed over the dimmed card. */}
          <AlertBanner
            variant="info"
            appearance="primary"
            borderless
            icon={<Info />}
            title={blocked.message}
            className="shadow-elevated"
          />
        </div>
      )}
    </div>
  )
}

/** 3-card layout: Classic / Premium (recommended) / Super Premium. */
export function TieredJobPlans({
  creditBalance,
  onSelectTier: selectCatalogueTier,
  extraOff = false,
  shimmerKey = 0,
}: Omit<JobPlanSelectProps, "onSelectSubscription">) {
  const catalogue = usePlans().tiers
  // The legacy Premium + AI card joins only while its credits last, right after Premium.
  const order: JobPlanTierId[] =
    creditBalance["ai-calling"] > 0 ? ["classic", "premium", "premium-ai", "super-premium"] : TIERED_PLAN_ORDER
  const tiers = order.map((id) => offerTier(catalogue[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(catalogue[tier.id])
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <MobileJobPlanRadioGroup
        tiers={tiers}
        creditBalance={creditBalance}
        onSelectTier={onSelectTier}
        recommendedId={RECOMMENDED_TIER.tiered}
      />
      <div className={cn("hidden sm:grid sm:gap-4 sm:grid-cols-2", tiers.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
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
  subscriptionBlocked,
}: JobPlanSelectProps) {
  const catalogue = usePlans().tiers
  const tiers = SUBSCRIPTION_PLAN_ORDER.map((id) => offerTier(catalogue[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(catalogue[tier.id])
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <div className="flex flex-col gap-4 sm:hidden">
        <MobileJobPlanRadioGroup
          tiers={tiers}
          creditBalance={creditBalance}
          onSelectTier={onSelectTier}
          recommendedId={RECOMMENDED_TIER.subscription}
          subscription={{ onSelect: onSelectSubscription, blocked: subscriptionBlocked }}
        />
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

        <BlockedSubscription blocked={subscriptionBlocked} className="flex w-full flex-col xl:w-82">
          <MonthlySubscriptionCard
            className="flex-1"
            reservePriceSuffix={hasAnyCredits(creditBalance)}
            onSelect={onSelectSubscription}
            blockedLabel={subscriptionBlocked?.label}
          />
        </BlockedSubscription>
      </div>
    </PlanOfferContext.Provider>
  )
}

function MonthlySubscriptionCard({
  onSelect,
  reservePriceSuffix,
  blockedLabel,
  className,
}: {
  onSelect: () => void
  /** Set when the plan can't be bought for this job: the CTA says why. */
  blockedLabel?: string
  /** True when the tier cards beside it show a credit status line under
   *  their price — this card reserves an empty line of the same height so
   *  its CTA stays level with theirs. */
  reservePriceSuffix: boolean
  className?: string
}) {
  const plan = { ...usePlans().plan("monthly"), ...MONTHLY_PLAN_PERKS }
  // The claimed 10% applies to Unlimited too: same discounted price, struck
  // list price and "Extra 10% off applied" line as the tier cards, in the
  // same priceSuffix slot so the lines sit level across the row.
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const upcoming = useUpcomingPrices()
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  // Same rule as the mobile card and the tier cards: whenever a struck price
  // shows, so does its % OFF badge.
  const strike = plan.mrp ?? (extraOff ? plan.price : undefined)
  // The plan's own discount only (plan.mrp); the 10% is its own line.
  const discountPct = plan.mrp && plan.mrp > plan.price ? Math.round((1 - plan.price / plan.mrp) * 100) : null
  // As the job cards: the CTA turns the green primary only while this card
  // is hovered or focused, so one green shows at a time.
  const { active, props: hoverProps } = useCardHover()
  return (
    // The frame is the click target but stays put; hovering anywhere in it
    // lifts the card inside (card-hover-lift rule) — same as self-checkout's
    // UnlimitedSideCard.
    <div
      data-card-lift-group={blockedLabel ? undefined : true}
      onClick={blockedLabel ? undefined : onSelect}
      {...hoverProps}
      className={cn(
        "flex flex-col gap-5 rounded-card bg-gradient-checkout-unlimited p-4",
        !blockedLabel && "cursor-pointer",
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
        // The frame around it takes the click.
        interactive={!blockedLabel}
        layout="price-first"
        surface="inset"
        className={cn("flex-1 border-transparent", shimmerKey > 0 && "animate-shimmer-once")}
        title={plan.name}
        price={inr(price)}
        unit={plan.unit}
        mrp={strike ? inr(strike) : undefined}
        badge={discountPct ? <Badge variant="discount">{discountPct}% OFF</Badge> : undefined}
        // Its Jan 1 price stays a ₹ line even in credit mode, where it takes
        // the reserved line level with the tier cards' one credit status
        // line, unless the claimed offer's line already fills it.
        priceSuffix={
          extraOff || upcoming ? (
            <span className="flex flex-col gap-1">
              {extraOff && <ExtraOffLine />}
              {!(extraOff && reservePriceSuffix) && <UpcomingPriceLine price={plan.janPrice} />}
            </span>
          ) : reservePriceSuffix ? (
            <span aria-hidden>&nbsp;</span>
          ) : undefined
        }
        cta={
          <Button
            type="button"
            variant={active && !blockedLabel ? "checkout" : "checkout-inset"}
            className="h-10 w-full font-semibold"
            disabled={!!blockedLabel}
          >
            {blockedLabel ?? "Get apna unlimited"}
          </Button>
        }
        meta={[
          <FeatureGroup
            key="slot"
            lead={
              <>
                <BriefcaseBusiness aria-hidden /> {slotLabel(plan.slots)} for {plan.slotDays}{"\u00A0"}days
              </>
            }
          >
            {plan.features.map((f) => (
              <SubPoint key={f} icon={<Check className="shrink-0 text-success" aria-hidden />}>
                {f}
              </SubPoint>
            ))}
          </FeatureGroup>,
          // Desktop: WhatsApp second, after the slot (user call, 2026-10-29);
          // the phone card keeps it first.
          <React.Fragment key="wa">
            <WhatsApp aria-hidden /> WhatsApp alerts to matched candidates
          </React.Fragment>,
          // What the plan grants, as on self-checkout's Unlimited card and
          // the Subscription tab: not the tier cards' "free" credits offer
          // footer line, which is a temporary extra.
          <>
            <UserSearch aria-hidden /> {dbCreditsLabel(plan)}
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

/* ─────────────────────── job types explainer ─────────────────────── */

/** One tier, read-only: the plan card structure (price-first, same
 *  feature rows and database line as the posting page's cards), with the
 *  credits it takes beside the title and the per-credit price under the
 *  price. No CTA: credits are spent at posting time. */
function JobTypeInfoCard({ tier }: { tier: JobPlanTier }) {
  const { extraOff } = React.useContext(PlanOfferContext)
  const shown = offerTier(tier, extraOff)
  const discountPct = shown.ownPct
  const perCredit = Math.floor(shown.price / tier.credit.count)

  return (
    <PricingCard
      layout="price-first"
      // Muted fill: a white plan card would vanish on the white dialog.
      className="flex-1 border-transparent bg-muted"
      title={
        <span className="flex items-center justify-between gap-3">
          {tier.title}
          <Badge variant="outline" className="shrink-0 bg-card">
            {tier.credit.count} job credit{tier.credit.count === 1 ? "" : "s"}
          </Badge>
        </span>
      }
      price={inr(shown.price)}
      mrp={shown.mrp ? inr(shown.mrp) : undefined}
      badge={discountPct ? <Badge variant="discount">{discountPct}% OFF</Badge> : undefined}
      priceSuffix={<span className="whitespace-nowrap">{inr(perCredit)} /credit</span>}
      cta={null}
      meta={[
        <>
          <ClockFading aria-hidden /> Job active for {tier.jobActiveDays} days
        </>,
        <FeatureGroup
          key="visibility"
          lead={
            <>
              <VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" /> {tier.visibilityLabel}
            </>
          }
        >
          {tier.features.map((f) => (
            <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
              <FeatureName label={f.label} />
            </SubPoint>
          ))}
        </FeatureGroup>,
      ]}
      footer={planFooter(tier.dbCredits)}
    />
  )
}

/** "Need more info?" on the Jobs tab: what each job type gets, what it
 *  costs and how many credits it takes. Prices come from usePlans().tiers. */
export function JobTypesDialog({
  open,
  onOpenChange,
  extraOff = false,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  extraOff?: boolean
}) {
  const { tiers } = usePlans()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 rounded-3xl p-5 sm:max-w-5xl sm:p-8">
        {/* Clay beside the title: the pop-up header pattern (as the contact
            pop-up). */}
        <div className="flex items-center gap-4 text-left">
          <ValueArt name="job-types" size="xs" />
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-h4 text-foreground">What each job type gets you</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Credits are spent when you post. You can decide the job type later, at posting time.
            </DialogDescription>
          </div>
        </div>
        <PlanOfferContext.Provider value={{ extraOff, shimmerKey: 0 }}>
          <div className="grid gap-4 md:grid-cols-3">
            {TIERED_PLAN_ORDER.map((id) => (
              <JobTypeInfoCard key={id} tier={tiers[id]} />
            ))}
          </div>
        </PlanOfferContext.Provider>
      </DialogContent>
    </Dialog>
  )
}

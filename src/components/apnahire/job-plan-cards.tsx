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
  Activity,
  Info,
  Badge,
  BriefcaseBusiness,
  InfinityIcon,
  Check,
  Button,
  ClockFading,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Flame,
  VisibilityTicks,
  LogoApnaUnlimited,
  PricingCard,
  Sparkles,
  TrendingUp,
  UserSearch,
  WhatsApp,
  X,
  type IconComponent,
  AlertBanner,
} from "@apna/design-system"
import { usePlans } from "@/hooks/apnahire/use-plans"
import { UpcomingPriceLine, useUpcomingPrices } from "@/components/apnahire/upcoming-price-line"
import {
  MobileMetaLine,
  MobileFeatureLine,
  MobilePlanRow,
  MobileUnlimitedCard,
  MobileUnlimitedLine,
} from "@/components/apnahire/mobile-plan-row"
import { ValueArt } from "@/components/marketing/value-art"
import { PlanPopup, PopupBody, PopupHeader } from "@/components/apnahire/plan-popup"
import { useIsMobile } from "@/hooks/use-mobile"
// The V4 key's explainers; the feature-name tooltips stay paused (FeatureName).
import { cn } from "@/lib/utils"
import { RECOMMENDED_EDGE, useCardHover } from "@/components/apnahire/use-card-hover"
import { withExtraOff } from "@/content/offers"
import {
  AI_CALLING_ADDON,
  MONTHLY_PLAN_PERKS,
  RECOMMENDED_TIER,
  SUBSCRIPTION_PLAN_ORDER,
  TIERED_PLAN_ORDER,
  type CreditBalance,
  type JobPlanTier,
  type JobPlanTierId,
} from "@/content/job-plans"
import { inr } from "@/lib/format"
import { dbCreditsLabel } from "@/content/subscriptions"


/** The claimed exit offer, as the plan lists see it: prices already carry
 *  the 10% (the lists render a discounted copy of each tier), each card
 *  says so, and a one-time shimmer marks the moment it landed. */
const PlanOfferContext = React.createContext({
  extraOff: false,
  shimmerKey: 0,
})

/** Express cards: the price shown is the price (no list price, no %). The
 *  claimed 10% strikes that price and says 10% (user call, 2026-11-02): the
 *  anchor is what the recruiter saw, never a list price they never saw. */
function expressOfferTier(tier: JobPlanTier, extraOff: boolean): JobPlanTier & { ownPct: number | null } {
  if (!extraOff) return { ...tier, mrp: undefined, ownPct: null }
  return { ...tier, price: withExtraOff(tier.price), mrp: tier.price, ownPct: null }
}

/** The % OFF badge under the claimed offer: the tier's own discount, or,
 *  with none of its own, what the struck price says (the 10%). A struck price
 *  always shows its badge. */
const offerBadgePct = (t: { price: number; mrp?: number; ownPct?: number | null }) =>
  t.ownPct ?? (t.mrp && t.mrp > t.price ? Math.round((1 - t.price / t.mrp) * 100) : null)

/** Visibility at a glance on the mobile plan rows: the tier's label next to
 *  its ticks (one, two, two in a circle). */
/** V10: the visibility line says how much more visibility (user call, 2026-10-30). */
const TIER_BOOST_FOR: Partial<Record<JobPlanTierId, string>> = {
  classic: "1x visibility, for regular roles",
  premium: "2x visibility, for faster hiring",
  "premium-ai": "2x visibility, with AI calling",
  // Non-breaking hyphens (U+2011): "hard‑to‑fill" never splits when the line wraps.
  "super-premium": "4x visibility, for hard‑to‑fill roles",
}

function VisibilityLine({ tier }: { tier: JobPlanTier }) {
  return (
    <MobileMetaLine icon={<VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" />}>
      {TIER_BOOST_FOR[tier.id] ?? tier.visibilityLabel}
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

/** Short names for the phone feature line, keyed by the full label. */
/** V11's Unlimited city note, in full on phones and desktop. */
const CITY_NOTE = "This plan is valid in a single city"
const v11Label = (label: string) => DESKTOP_LABEL[label] ?? label

/** V11 desktop: a plan's name with who it's for in a small line under
 *  it, between the name and the price (user call, 2026-10-31). */
function ForWho({ line, children }: { line?: string; children: React.ReactNode }) {
  return (
    <span className="flex flex-col gap-1">
      {children}
      {line && <span className="text-sm font-regular text-muted-foreground">{line}</span>}
    </span>
  )
}

/** V11 desktop: who each job type is for, under its name (user call,
 *  2026-10-31); the visibility line keeps just "1x / 2x / 4x visibility". */
const TIER_FOR_SHORT: Partial<Record<JobPlanTierId, string>> = {
  classic: "For regular roles",
  premium: "For faster hiring",
  "premium-ai": "With AI calling",
  "super-premium": "For hard-to-fill roles",
}

/** V11 desktop: the full wording, with "alerts" for WhatsApp (user call,
 *  2026-10-30). */
const DESKTOP_LABEL: Record<string, string> = {
  "WhatsApp notifications to candidates": "Alerts to candidates",
  "2x Priority WhatsApp notifications to candidates": "2x alerts to candidates",
  "Featured with 'Urgently hiring' tag": "Urgently hiring tag",
  "Top placements in job listings": "Top placement in job listing",
}

const LINE_LABEL: Record<string, string> = {
  "WhatsApp notifications to candidates": "Alerts to candidates",
  "2x Priority WhatsApp notifications to candidates": "2x alerts to candidates",
  "Featured with 'Urgently hiring' tag": "Urgently hiring tag",
  "Top placements in job listings": "Top placement",
}

/** The phone card's always-on feature line ("line" layout): what the
 *  plan includes. No database credits on the job cards: only the Unlimited
 *  card shows them (user call, 2026-10-30). */
// Alerts by job type, Classic included, phone and desktop (user call, 2026-11-03).
const TIERED_ALERTS: Record<string, string> = { classic: "1x alerts to candidates", premium: "2x alerts to candidates", "premium-ai": "2x alerts to candidates", "super-premium": "4x alerts to candidates" }

/** The tier's features for the desktop lists: the WhatsApp row becomes its
 *  tiered alerts line, included on every job type. */
const tierFeatures = (tier: JobPlanTier) =>
  tier.features.map((f) =>
    /whatsapp/i.test(f.label) && TIERED_ALERTS[tier.id]
      ? { ...f, enabled: true, text: TIERED_ALERTS[tier.id] }
      : { ...f, text: v11Label(f.label) },
  )

const tierLine = (tier: JobPlanTier) => {
  // Only what the plan includes: no red ✕ for what it lacks (user call,
  // 2026-10-30). A plan with nothing extra (Classic) has no line, and no
  // rule above it.
  const items = [
    ...tier.features
      .filter((f) => f.enabled)
      .map((f) => ({
        icon: featureIcon(f.label, true),
        // Where the placement is (user call, 2026-10-30); the WhatsApp icon
        // already says WhatsApp, so the label drops it.
        label: /top placement/i.test(f.label)
          ? "Top placement on job listing"
          : (LINE_LABEL[f.label] ?? f.label).replace("WhatsApp alerts", "alerts").replace(/^alerts/, "Alerts"),
      })),
    ...(tier.id === "premium-ai" ? [{ icon: <AiSparkle className="size-4" />, label: <RollingLabel /> }] : []),
  ]
  const alerts = TIERED_ALERTS[tier.id]
  if (alerts) {
    const i = tier.features.filter((f) => f.enabled).findIndex((f) => /whatsapp/i.test(f.label))
    const item = { icon: featureIcon("whatsapp", true), label: alerts }
    if (i >= 0) items[i] = item
    else items.unshift(item)
  }
  if (!items.length) return null
  // Premium + AI plays its agent's demo call on phones too, as on desktop
  // (user call, 2026-11-03).
  if (tier.id === "premium-ai")
    return (
      // The card's rule sits above this block; drop the line's own.
      <div className="flex flex-col gap-3 [&>div:first-child]:border-0 [&>div:first-child]:pt-0">
        <MobileFeatureLine items={items} />
        {/* Its own buttons: the card's tap must not fire from them. */}
        <span className="flex" onClick={(e) => e.stopPropagation()}>
          <AiDemoCall className="w-full" />
        </span>
      </div>
    )
  return <MobileFeatureLine items={items} />
}

/** Credits in a card's price slot: one text style at the price size, "1 job
 *  credit" ("1 credit" on Premium + AI: the card already names the plan)
 *  (user call, 2026-11-03). */
const creditLabelShort = (credit: JobPlanTier["credit"]) =>
  `${credit.count} ${credit.kind === "ai-calling" ? "" : "job "}credit${credit.count === 1 ? "" : "s"}`

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

/** Phones: the Premium + AI line's "AI calling agent" rolls through the
 *  add-on's points, the desktop block's ticker in one line (user call,
 *  2026-11-03). Screen readers get them all at once. */
function RollingLabel() {
  const points = ["AI calling agent", ...AI_CALLING_ADDON.points]
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % points.length), 2500)
    return () => window.clearInterval(id)
  }, [points.length])
  return (
    <span className="overflow-hidden">
      <span key={i} aria-hidden className="inline-block animate-in fade-in-0 slide-in-from-bottom-2 duration-enter">
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
  tier: JobPlanTier & { ownPct?: number | null }
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
  // The phone card's design (user call, 2026-10-30): nested in the panel,
  // no blue edge (the tab marks it), price only, "1x / 2x / 4x visibility"
  // with the ticks, only what the plan includes, no database credits.
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
          "rounded-card-nested",
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
        // V11 desktop: who it's for, under the name (ForWho).
        title={<ForWho line={TIER_FOR_SHORT[tier.id]}>{tierTitle(tier)}</ForWho>}
        price={creditMode ? creditLabelShort(tier.credit) : inr(tier.price)}
        // V11 drops the struck price and % OFF, except under the claimed 10%
        // offer (user calls, 2026-10-31 / 2026-11-02).
        mrp={!creditMode && extraOff && tier.mrp ? inr(tier.mrp) : undefined}
        badge={!creditMode && extraOff && offerBadgePct(tier) ? <Badge variant="discount">−{offerBadgePct(tier)}%</Badge> : undefined}
                // On every card in credit mode, none outside it — structural parity.
        // Outside it: the claimed offer's line, then the Jan 1 price (credit
        // mode speaks credits, so it has no ₹ line to add).
        priceSuffix={
          creditMode ? (
            <span className="not-italic">{creditStatus}</span>
          ) : upcoming ? (
            <UpcomingPriceLine price={tier.janPrice} />
          ) : undefined
        }
        cta={
          <Button
            type="button"
            variant={active ? "checkout" : "outline"}
            size="card" className="w-full"
          >
            {ctaLabel}
          </Button>
        }
        meta={[
          // Desktop has the room: the visibility line leads, every feature
          // indented under it, what the plan lacks with a ✕ and muted, full
          // wording (user call, 2026-10-30). How long it stays live comes
          // first, level with Unlimited's "1 job live at a time" (2026-11-02).
          <React.Fragment key="active">
            <ClockFading className="text-checkout-primary" aria-hidden /> Active for {tier.jobActiveDays}{"\u00A0"}days
          </React.Fragment>,
          <FeatureGroup
            key="visibility"
            lead={
              <>
                <VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" />{" "}
                {(TIER_BOOST_FOR[tier.id] ?? tier.visibilityLabel).split(",")[0]}
              </>
            }
          >
            {tierFeatures(tier).map((f) => (
              <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
                {f.text}
              </SubPoint>
            ))}
          </FeatureGroup>,
          ...(tier.id === "premium-ai" ? [<AiAgentBlock key="ai" />] : []),
        ]}
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
function PlanFrame({ title, className, frameless, children }: { title: string; className?: string; frameless?: boolean; children: React.ReactNode }) {
  // The phone panel: 12px sides, bottom and gaps, 16px top, concentric
  // corner, briefcase + title. `frameless`: the title and cards only.
  return (
    <div className={cn("flex flex-col gap-3", !frameless && "rounded-frame surface-glass-dark px-3 pt-4 pb-3", className)}>
      {/* "Active for 15 days" is on each card now, in the strip. */}
      <div className="flex items-center gap-2 px-1.5">
        <h2 className="flex items-center gap-2 text-h6 leading-6 whitespace-nowrap text-foreground [&_svg]:size-5 [&_svg]:shrink-0">
          <BriefcaseBusiness aria-hidden />
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

/** PREVIEW: `?frame=off` drops the job-types frame where no subscription
 *  is shown. Remove (keeping the chosen look) once decided. */
function useFramelessPreview() {
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    setOn(new URLSearchParams(window.location.search).get("frame") === "off")
  }, [])
  return on
}

interface MobileJobPlanRadioGroupProps {
  tiers: (JobPlanTier & { ownPct?: number | null })[]
  creditBalance: CreditBalance
  onSelectTier: (tier: JobPlanTier) => void
  recommendedId: JobPlanTierId
  /** apna Unlimited after the list, with its own Buy now (not a choice). */
  subscription?: {
    onSelect: () => void
    blocked?: { label: string; message: string }
  }
}

function MobileJobPlanRadioGroup({
  tiers,
  creditBalance,
  onSelectTier,
  recommendedId,
  subscription,
}: MobileJobPlanRadioGroupProps) {
  // PREVIEW (?frame=off, user call 2026-11-03): no frame when there is no
  // subscription beside the jobs to tell them apart from.
  const frameless = useFramelessPreview() && !subscription
  const creditMode = hasAnyCredits(creditBalance)
  const { shimmerKey } = React.useContext(PlanOfferContext)
  // V11 phones show the price alone. Only once the 10% exit offer is
  // claimed do the struck price and the plan's % appear, drawn by the price
  // inline, and every card has its own Buy now (user call, 2026-11-03).
  const { extraOff } = React.useContext(PlanOfferContext)
  const showPct = !creditMode && extraOff

  const { singleCredit } = usePlans()

  return (
    // 12px between the two frames, the same as their edges and the gaps
    // between cards (user call, 2026-10-30).
    <div className="flex flex-col gap-3 sm:hidden">
        {/* The three job types sit together in one panel, like the desktop
            frame (PlanFrame), so they read as one choice apart from the
            subscription: 12px at the sides, bottom and between cards, 16px
            above the title, a corner concentric with the nested cards. */}
        <div className={cn("flex flex-col gap-3", !frameless && "rounded-frame surface-glass-dark px-3 pt-4 pb-3")}>
          {(
            // The name left, how long it runs right, small, with the clock
            // the old line above the cards had (user call, 2026-10-30).
            <div className="flex items-center justify-between gap-2 px-1.5">
              <h2 className="flex items-center gap-2 text-h6 leading-6 whitespace-nowrap text-foreground [&_svg]:size-5 [&_svg]:shrink-0">
                <BriefcaseBusiness aria-hidden />
                Single job posting
              </h2>
              <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium whitespace-nowrap text-muted-foreground [&_svg]:size-4">
                <ClockFading aria-hidden />
                Active for 15 days
              </span>
            </div>
          )}
          <div className="flex flex-col gap-3">
          {tiers.map((tier) => {
            const isRecommended = tier.id === recommendedId
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
                nested
                title={tierTitle(tier)}
                onSelect={() => onSelectTier(tier)}
                recommended={isRecommended}
                className={cn(shimmerKey > 0 && "animate-shimmer-once")}
                meta={
                  <>
                    {/* "Active for 15 days" is said once, in the panel title. */}
                    <VisibilityLine tier={tier} />
                    {/* The price already says the credits; the status says
                        whether the balance covers them, once (user call, 2026-11-03). */}
                    {creditMode && (
                      <span className="text-xs font-semibold text-checkout-info">{creditStatus}</span>
                    )}
                  </>
                }
                // Live: no struck price or % OFF (user call, 2026-10-30); the
                // claimed offer adds them back.
                price={creditMode ? creditLabelShort(tier.credit) : inr(tier.price)}
                priceAsName={creditMode}
                mrp={showPct && tier.mrp && tier.mrp > tier.price ? inr(tier.mrp) : undefined}
                priceLead={showPct && offerBadgePct(tier) ? <span className="text-xs leading-5 font-semibold text-checkout-primary">−{offerBadgePct(tier)}%</span> : undefined}
                smallPrice={showPct}
                // Same CTA as self-checkout's previews; its click bubbles to the card.
                cta={
                  // Every card has its CTA, credits or not: "Post now" when the
                  // balance pays, as on desktop (user call, 2026-11-03).
                  <Button type="button" variant="checkout" size="sm" className="px-3.5">
                    {creditMode ? "Post now" : "Buy now"}
                  </Button>
                }
                upcoming={creditMode ? undefined : <UpcomingPriceLine price={tier.janPrice} />}
                line={tierLine(tier)}
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
                      <UserSearch className="size-3.5 shrink-0" aria-hidden />
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
                          f.enabled ? "text-foreground" : "text-muted-foreground/70",
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
                      <UserSearch className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                      <span>{dbWorth(tier.dbCredits)}</span>
                    </li>
                  </ul>
                }
              />
            )
          })}
          </div>
        </div>
        {subscription && (
          <BlockedSubscription blocked={subscription.blocked}>
            <MobileSubscriptionCard
              onSelect={subscription.onSelect}
              blocked={!!subscription.blocked}
            />
          </BlockedSubscription>
        )}
    </div>
  )
}

/** apna Unlimited after the phone plan list, not one of its choices (user
 *  call, 2026-10-30): its own "Buy now", and a tap anywhere on the card
 *  goes straight to its checkout. Same in self-checkout. */
function MobileSubscriptionCard({
  onSelect,
  selected,
  blocked,
}: {
  onSelect: () => void
  /** V3: a choice in the list (no Buy now; the sticky CTA buys it). */
  selected?: boolean
  blocked?: boolean
}) {
  const plan = { ...usePlans().plan("monthly"), ...MONTHLY_PLAN_PERKS }
  // Sumit's copy for the card (2026-10-30): "Unlimited jobs for 1 month",
  // no "/mo", "1 job live at a time", no reposts line.
  const { extraOff, shimmerKey } = React.useContext(PlanOfferContext)
  const price = extraOff ? withExtraOff(plan.price) : plan.price
  // The price they saw, struck by the claimed 10%.
  const strike = extraOff ? plan.price : undefined
  const strikePct = strike ? offerBadgePct({ price, mrp: strike }) : null
  return (
    <MobileUnlimitedCard
      selected={selected}
      onSelect={blocked ? undefined : onSelect}
      key={shimmerKey}
      className="sm:hidden"
      cardClassName={cn(shimmerKey > 0 && "animate-shimmer-once")}
      // One name in both checkouts (user call, 2026-10-30).
      title="Unlimited jobs for 1 month"
      price={inr(price)}
      // Under the claimed offer: struck price and its % OFF, drawn the way
      // the job cards' draw theirs.
      mrp={strike ? inr(strike) : undefined}
      priceLead={strike ? <span className="text-xs leading-5 font-semibold text-checkout-primary">−{strikePct}%</span> : undefined}
      smallPrice={!!strike}
      cta={
        !blocked ? (
          <Button type="button" variant="checkout" size="sm" className="shrink-0 px-3.5" onClick={onSelect}>
            Buy now
          </Button>
        ) : undefined
      }
      upcoming={<UpcomingPriceLine price={plan.janPrice} />}
      line={
        <MobileUnlimitedLine
          db={dbCreditsLabel(plan)}
          reposts={false}
          // "Dynamic visibility" (a pulse, not a level) leads the feature
          // line, green as on desktop (user call, 2026-11-02); the slot sits
          // under the title.
          lead={{ icon: <Activity className="text-checkout-primary" aria-hidden />, label: "Dynamic visibility" }}
        />
      }
      // Validity folds into the slot line.
      meta={
        <MobileMetaLine icon={<BriefcaseBusiness className="text-checkout-primary" aria-hidden />}>
          1 job live at a time
        </MobileMetaLine>
      }
      features={[
        // The slot sits above as meta ("Expand on select" layout).
        [<WhatsApp key="i" className="text-success" aria-hidden />, "Smart alerts to candidates"],
        [<InfinityIcon key="i" className="text-warning" aria-hidden />, "Free job reposts and swapping"],
        [<UserSearch key="i" className="text-muted-foreground" aria-hidden />, dbCreditsLabel(plan)],
      ]}
      // Said in full (user call, 2026-10-31).
      note={CITY_NOTE}
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
  const frameless = useFramelessPreview()
  // The legacy Premium + AI card joins only while its credits last, right after Premium.
  const order: JobPlanTierId[] =
    creditBalance["ai-calling"] > 0 ? ["classic", "premium", "premium-ai", "super-premium"] : TIERED_PLAN_ORDER
  const tiers = order.map((id) => expressOfferTier(catalogue[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(catalogue[tier.id])
  // The job types in one panel on desktop too, as on phones.
  const grid = (
    <div
      className={cn(
        "hidden sm:grid sm:grid-cols-2 sm:gap-3",
        tiers.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      )}
    >
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
  )
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <MobileJobPlanRadioGroup
        tiers={tiers}
        creditBalance={creditBalance}
        onSelectTier={onSelectTier}
        recommendedId={RECOMMENDED_TIER.tiered}
      />
      <PlanFrame className="hidden sm:flex" title="Single job posting" frameless={frameless}>
        {grid}
      </PlanFrame>
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
  const tiers = SUBSCRIPTION_PLAN_ORDER.map((id) => expressOfferTier(catalogue[id], extraOff))
  const onSelectTier = (tier: JobPlanTier) => selectCatalogueTier(catalogue[tier.id])
  return (
    <PlanOfferContext.Provider value={{ extraOff, shimmerKey }}>
      <div className="flex flex-col gap-4 sm:hidden">
        <MobileJobPlanRadioGroup
          tiers={tiers}
          creditBalance={creditBalance}
          onSelectTier={onSelectTier}
          recommendedId={RECOMMENDED_TIER.subscription}
          subscription={{
            onSelect: onSelectSubscription,
            blocked: subscriptionBlocked,
          }}
        />
      </div>

      <div className={"hidden sm:flex sm:flex-col sm:gap-3 xl:flex-row"}>
        <div className="flex min-w-0 flex-1 flex-col">
          <PlanFrame className="flex-1" title="Single job posting">
            <div className={"grid flex-1 grid-cols-1 gap-3 lg:grid-cols-3"}>
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
  // The price they saw, struck by the claimed 10% (expressOfferTier).
  const strike = extraOff ? plan.price : undefined
  // The plan's own discount only (plan.mrp); the 10% is its own line.
  // As the job cards: the CTA turns the green primary only while this card
  // is hovered or focused, so one green shows at a time.
  const { active, props: hoverProps } = useCardHover()
  // The phone card's design: "Unlimited jobs for 1 month", price alone,
  // "1 job live at a time", alerts, dynamic visibility, database credits;
  // the frame shaped like the job panel.
  return (
    // The frame is the click target but stays put; hovering anywhere in it
    // lifts the card inside (card-hover-lift rule) — same as self-checkout's
    // UnlimitedSideCard.
    <div
      data-card-lift-group={blockedLabel ? undefined : true}
      onClick={blockedLabel ? undefined : onSelect}
      {...hoverProps}
      className={cn(
        "flex flex-col gap-3 rounded-frame bg-gradient-checkout-unlimited px-3 pt-4 pb-3",
        !blockedLabel && "cursor-pointer",
        className
      )}
    >
      {/* Logo row as in UnlimitedSideCard; 24px tall to match PlanFrame's
          heading so both columns' cards start level. */}
      <div className={"flex h-6 items-center px-1.5"}>
        <LogoApnaUnlimited variant="gradient" className="h-4 w-auto" />
      </div>

      <PricingCard
        key={shimmerKey}
        // The frame around it takes the click.
        interactive={!blockedLabel}
        layout="price-first"
        surface="inset"
        className={cn("flex-1 rounded-card-nested border-transparent", shimmerKey > 0 && "animate-shimmer-once")}
        title={<ForWho line="For continuous hiring">Unlimited jobs for 1 month</ForWho>}
        price={inr(price)}
        mrp={strike && extraOff ? inr(strike) : undefined}
        badge={strike && extraOff && offerBadgePct({ price, mrp: strike }) ? <Badge variant="discount">−{offerBadgePct({ price, mrp: strike })}%</Badge> : undefined}
        // Its Jan 1 price stays a ₹ line even in credit mode, where it takes
        // the reserved line level with the tier cards' one credit status
        // line, unless the claimed offer's line already fills it.
        priceSuffix={
          upcoming ? (
            <UpcomingPriceLine price={plan.janPrice} />
          ) : reservePriceSuffix ? (
            <span aria-hidden>&nbsp;</span>
          ) : undefined
        }
        cta={
          <Button
            type="button"
            variant={active && !blockedLabel ? "checkout" : "checkout-inset"}
            size="card" className="w-full"
            disabled={!!blockedLabel}
          >
            {blockedLabel ?? "Buy now"}
          </Button>
        }
        meta={[
          // As the job cards: visibility leads (green, level with their
          // 1x/2x/4x row) with alerts under it; then the live slot with
          // reposts and database credits (user call, 2026-10-31). The slot
          // leads, level with the job cards' "Active for 15 days" (2026-11-02).
          <React.Fragment key="slot">
            <BriefcaseBusiness className="text-checkout-primary" aria-hidden /> 1 job live at a time
          </React.Fragment>,
          <FeatureGroup
            key="vis"
            lead={
              <>
                <Activity className="text-checkout-primary" aria-hidden /> Dynamic visibility
              </>
            }
          >
            <SubPoint icon={<WhatsApp className="text-success" aria-hidden />}>Smart alerts to candidates</SubPoint>
          </FeatureGroup>,
          <React.Fragment key="reposts">
            <InfinityIcon className="text-warning" aria-hidden /> Unlimited job reposts &amp; swapping
          </React.Fragment>,
          <React.Fragment key="db">
            <UserSearch className="text-info" aria-hidden /> {dbCreditsLabel(plan)}
          </React.Fragment>,
        ]}
        footer={
          // Italic, no icon, as on phones (user call, 2026-11-02).
          <span className="italic">{CITY_NOTE}</span>
        }
      />
    </div>
  )
}

/* ─────────────────────── job types explainer ─────────────────────── */

/** One tier, read-only: the plan card structure (price-first, same
 *  feature rows and database line as the posting page's cards), with the
 *  credits it takes in place of the price. No CTA: credits are spent at posting time. */
function JobTypeInfoCard({ tier }: { tier: JobPlanTier }) {
  // Like the phone sheet: the credits a job takes stand where the price
  // would, never a rupee price. A job's price on the credit packs page makes
  // "buy credits" compete with "buy one job" (user call, 2026-11-03).

  return (
    <PricingCard
      layout="price-first"
      // Muted fill: a white plan card would vanish on the white dialog.
      className="flex-1 border-transparent bg-muted"
      title={tier.title}
      price={creditLabelShort(tier.credit)}
      cta={null}
      meta={[
        <>
          <ClockFading aria-hidden /> Job active for {tier.jobActiveDays} days
        </>,
        <FeatureGroup
          key="visibility"
          lead={
            <>
              <VisibilityTicks level={tier.visibilityLevel} className="text-checkout-primary" />{" "}
              {(TIER_BOOST_FOR[tier.id] ?? tier.visibilityLabel).split(",")[0]}
            </>
          }
        >
          {tierFeatures(tier).map((f) => (
            <SubPoint key={f.label} icon={featureIcon(f.label, f.enabled)} muted={!f.enabled}>
              <FeatureName label={f.text} />
            </SubPoint>
          ))}
        </FeatureGroup>,
      ]}
    />
  )
}

/** "What 1 job credit will get you?" on the Jobs tab: what each job type gets, what it
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
  const isMobile = useIsMobile()
  // Phones: a bottom sheet with express V11's job cards, showing the
  // credits each job type takes instead of a price (user call, 2026-10-30).
  if (isMobile) {
    return (
      <PlanPopup open={open} onOpenChange={onOpenChange}>
        <PopupHeader
          art="job-types"
          artSize="2xs"
          // The desktop dialog's words (user call, 2026-10-30).
          title="What each job type gets you"
          description="Credits are spent when you post. You can decide the job type later, at posting time."
        />
        <PopupBody className="gap-3 overflow-y-auto">
          {TIERED_PLAN_ORDER.map((id) => {
            const tier = tiers[id]
            return (
              <MobilePlanRow
                key={id}
                readOnly
                nested
                title={tierTitle(tier)}
                selected={false}
                onSelect={() => {}}
                className="bg-muted shadow-none"
                meta={<VisibilityLine tier={tier} />}
                price={creditLabelShort(tier.credit)}
                line={tierLine(tier)}
              />
            )
          })}
        </PopupBody>
      </PlanPopup>
    )
  }
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

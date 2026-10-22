/**
 * Job plan tiers for the job-posting "choose a plan" page (Figma file
 * `92gU18d45olE04ATyhhVHD`, boards `2472:19068` (tiered) and `2490:43116`
 * (subscription)). Both boards share the same four underlying tiers —
 * Classic/Premium/Super Premium price identically on both — the boards only
 * differ in whether the 4th slot is "Premium + AI Calling Agent" (tiered) or
 * a monthly subscription card (subscription).
 *
 * SOURCING NOTE: prices and struck-through `mrp`s follow the proposed online
 * plans sheet (2026-10-22): each tier's mrp is its job credits × the ₹899
 * Classic list price. Database-credit counts were read off the board. Per-tier feature rows (WhatsApp
 * notifications, "Urgently hiring" tag, top placements) are simplified to one
 * consistent set of toggles across both board layouts; the two boards draw
 * very slightly different muted/disabled states per tier that weren't worth
 * preserving pixel-for-pixel for a Phase 1 build.
 */

export type JobPlanTierId = "classic" | "premium" | "super-premium"

export interface JobPlanFeatureRow {
  label: string
  enabled: boolean
}

export interface JobPlanTier {
  id: JobPlanTierId
  title: string
  /** One-time price in rupees. */
  price: number
  /** Struck-through list price — see sourcing note above. */
  mrp?: number
  /** Price from Jan 1, 2027, while it is announced (content/price-change.ts). */
  janPrice?: number
  jobActiveDays: number
  visibilityLabel: string
  /** 1 basic · 2 higher · 3 maximum — drives the compact signal meter on the
   *  mobile plan rows, where the full feature list doesn't fit. */
  visibilityLevel: 1 | 2 | 3
  features: JobPlanFeatureRow[]
  dbCredits: number
  /** Credits this plan consumes when posted from an existing balance. */
  credit: JobPlanCredit
}

/** Recruiters hold two separate balances: job credits (Classic 1, Premium 2,
 *  Super premium 4), which plans draw on, and AI calling credits, which only
 *  the AI calling add-on draws on (1 per job). */
export type JobCreditKind = "job" | "ai-calling"
export type CreditBalance = Record<JobCreditKind, number>
export interface JobPlanCredit {
  kind: JobCreditKind
  count: number
}

export const NO_CREDITS: CreditBalance = { job: 0, "ai-calling": 0 }

export const creditLabel = ({ kind, count }: JobPlanCredit) =>
  `${count} ${kind === "job" ? "Job" : "AI calling"} credit${count === 1 ? "" : "s"}`

export const JOB_PLAN_TIERS: Record<JobPlanTierId, JobPlanTier> = {
  classic: {
    id: "classic",
    title: "Classic job",
    price: 699,
    mrp: 899,
    janPrice: 749,
    jobActiveDays: 15,
    visibilityLabel: "Basic visibility",
    visibilityLevel: 1,
    features: [
      { label: "WhatsApp notifications to candidates", enabled: false },
      { label: "Featured with 'Urgently hiring' tag", enabled: false },
      { label: "Top placements in job listings", enabled: false },
    ],
    dbCredits: 10,
    credit: { kind: "job", count: 1 },
  },
  premium: {
    id: "premium",
    title: "Premium job",
    price: 1399,
    mrp: 1798,
    janPrice: 1499,
    jobActiveDays: 15,
    visibilityLabel: "Higher visibility",
    visibilityLevel: 2,
    features: [
      { label: "WhatsApp notifications to candidates", enabled: true },
      { label: "Featured with 'Urgently hiring' tag", enabled: true },
      { label: "Top placements in job listings", enabled: false },
    ],
    dbCredits: 30,
    credit: { kind: "job", count: 2 },
  },
  "super-premium": {
    id: "super-premium",
    title: "Super premium job",
    price: 2799,
    mrp: 3596,
    janPrice: 2999,
    jobActiveDays: 15,
    visibilityLabel: "Maximum visibility",
    visibilityLevel: 3,
    features: [
      { label: "2x Priority WhatsApp notifications to candidates", enabled: true },
      { label: "Featured with 'Urgently hiring' tag", enabled: true },
      { label: "Top placements in job listings", enabled: true },
    ],
    dbCredits: 60,
    credit: { kind: "job", count: 4 },
  },
}

/** Today's tiers, before the plans sheet: Premium struck at ₹1,699,
 *  Super premium with no struck price. The pricing phase picks the set
 *  (content/plan-catalog.ts): read tiers through usePlans(). */
export const TODAY_JOB_PLAN_TIERS: Record<JobPlanTierId, JobPlanTier> = {
  classic: { ...JOB_PLAN_TIERS.classic, janPrice: undefined },
  premium: { ...JOB_PLAN_TIERS.premium, mrp: 1699, janPrice: undefined },
  "super-premium": { ...JOB_PLAN_TIERS["super-premium"], mrp: undefined, janPrice: undefined },
}

/** Tiered layout: three tiers (Classic, Premium, Super Premium), Premium recommended.
 *  AI calling is not a tier — it's an add-on in the order summary
 *  (`AI_CALLING_ADDON`). */
export const TIERED_PLAN_ORDER: JobPlanTierId[] = ["classic", "premium", "super-premium"]

/** Subscription layout: three tiers + a monthly subscription card. */
export const SUBSCRIPTION_PLAN_ORDER: JobPlanTierId[] = ["classic", "premium", "super-premium"]

/** Every layout recommends exactly one tier — it gets the ribbon AND the
 *  primary CTA, in both the zero-credit and has-credits states. */
export const RECOMMENDED_TIER = {
  tiered: "premium",
  subscription: "premium",
} as const satisfies Record<string, JobPlanTierId>

/** The 4th card on the subscription layout is the 1-slot monthly apna
 *  Unlimited plan (usePlans().plan("monthly"): price, name, unit, slot days,
 *  database credits), not a one-time job tier. These are its card's lines. */
export const MONTHLY_PLAN_PERKS = {
  features: [
    "Unlimited job reposts",
    "Unlimited free reposts on job expiry",
    "Unlimited candidate responses",
  ],
  note: "Valid in a single city",
}

/** AI calling, sold as an add-on in the express-checkout order summary
 *  rather than as its own plan. One AI calling credit covers one job; with
 *  none in the balance it's bought at `price` for this job. */
export const AI_CALLING_ADDON = {
  price: 1699,
  headline: "Save your time – use AI calling to interview candidates",
  /** What the agent does, in one line, under the headline. */
  cardLine: "AI calls every applicant, checks their interest and availability, and hands you the ones ready to interview.",
  /** The proof row: a number where we have one. (Languages aren't a tile:
   *  the demo call's Hindi / English chips already say it.) */
  proof: [
    { value: "30%", label: "higher call pickup" },
    { value: "Ready", label: "to interview" },
  ],
  demo: {
    title: "Demo call",
    /** Recordings per language. No `src` yet: the player runs the
     *  timeline silently until product supplies the demo calls. */
    calls: [
      { value: "hi", label: "Hindi", durationSec: 72, src: undefined as string | undefined },
      { value: "en", label: "English", durationSec: 72, src: undefined as string | undefined },
    ],
  },
} as const

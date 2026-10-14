/**
 * Job plan tiers for the job-posting "choose a plan" page (Figma file
 * `92gU18d45olE04ATyhhVHD`, boards `2472:19068` (tiered) and `2490:43116`
 * (subscription)). Both boards share the same four underlying tiers —
 * Classic/Premium/Super Premium price identically on both — the boards only
 * differ in whether the 4th slot is "Premium + AI Calling Agent" (tiered) or
 * a monthly subscription card (subscription).
 *
 * SOURCING NOTE: prices and database-credit counts were read directly off
 * the board text and are exact. `mrp` (struck-through list price) was
 * reconstructed from the discount-badge percentage shown next to each price
 * (the badge text itself was legible; the struck-through mrp number was not,
 * at the resolution available) — re-confirm against the Figma file's actual
 * text layers before this ships. Per-tier feature rows (WhatsApp
 * notifications, "Urgently hiring" tag, top placements) are simplified to one
 * consistent set of toggles across both board layouts; the two boards draw
 * very slightly different muted/disabled states per tier that weren't worth
 * preserving pixel-for-pixel for a Phase 1 build.
 */

export type JobPlanTierId = "classic" | "premium" | "premium-ai" | "super-premium"

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
  jobActiveDays: number
  visibilityLabel: string
  features: JobPlanFeatureRow[]
  aiCallingAgent: boolean
  dbCredits: number
  /** Credits this plan consumes when posted from an existing balance. */
  credit: JobPlanCredit
  /** Social-proof line under the card, e.g. "105K+ recruiters…" */
  socialProof?: string
}

/** Recruiters hold two separate balances: job credits (Classic 1, Premium 2,
 *  Super premium 4) and AI calling credits (Premium + AI, 1). A plan only
 *  ever draws on its own kind. */
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
    jobActiveDays: 15,
    visibilityLabel: "Basic visibility",
    features: [
      { label: "WhatsApp notifications to candidates", enabled: false },
      { label: "Featured with 'Urgently hiring' tag", enabled: false },
      { label: "Top placements in job listings", enabled: false },
    ],
    aiCallingAgent: false,
    dbCredits: 10,
    credit: { kind: "job", count: 1 },
  },
  premium: {
    id: "premium",
    title: "Premium job",
    price: 1399,
    mrp: 1699,
    jobActiveDays: 15,
    visibilityLabel: "Higher visibility",
    features: [
      { label: "WhatsApp notifications to candidates", enabled: true },
      { label: "Featured with 'Urgently hiring' tag", enabled: true },
      { label: "Top placements in job listings", enabled: false },
    ],
    aiCallingAgent: false,
    dbCredits: 30,
    credit: { kind: "job", count: 2 },
    socialProof: "105K+ recruiters posted in last 1 month",
  },
  "premium-ai": {
    id: "premium-ai",
    title: "Premium job + AI Calling Agent",
    price: 2999,
    mrp: 4499,
    jobActiveDays: 15,
    visibilityLabel: "Higher visibility",
    features: [
      { label: "WhatsApp notifications to candidates", enabled: true },
      { label: "Featured with 'Urgently hiring' tag", enabled: true },
      { label: "Top placements in job listings", enabled: false },
    ],
    aiCallingAgent: true,
    dbCredits: 30,
    credit: { kind: "ai-calling", count: 1 },
    // Figma's "Recommended for busy professionals" subtitle was dropped —
    // a line only this card has throws off every row below it relative to
    // its siblings. See PricingCard's structural-parity rule.
    socialProof: "105K+ recruiters posted in last 1 month",
  },
  "super-premium": {
    id: "super-premium",
    title: "Super premium job",
    price: 2799,
    jobActiveDays: 15,
    visibilityLabel: "Maximum visibility",
    features: [
      { label: "2x Priority WhatsApp notifications to candidates", enabled: true },
      { label: "Featured with 'Urgently hiring' tag", enabled: true },
      { label: "Top placements in job listings", enabled: false },
    ],
    aiCallingAgent: false,
    dbCredits: 60,
    credit: { kind: "job", count: 4 },
  },
}

/** Tiered layout: three tiers (Classic, Premium, Super Premium), Premium recommended.
 *  Note: "Premium + AI Calling Agent" was dropped per mobile-first scope decision;
 *  AI Calling will be offered as an add-on later. */
export const TIERED_PLAN_ORDER: JobPlanTierId[] = ["classic", "premium", "super-premium"]

/** Subscription layout: three tiers + a monthly subscription card. */
export const SUBSCRIPTION_PLAN_ORDER: JobPlanTierId[] = ["classic", "premium", "super-premium"]

/** Every layout recommends exactly one tier — it gets the ribbon AND the
 *  primary CTA, in both the zero-credit and has-credits states. */
export const RECOMMENDED_TIER = {
  tiered: "premium",
  subscription: "premium",
} as const satisfies Record<string, JobPlanTierId>

/** The 4th card on the subscription layout — a distinct monthly apna Unlimited subscription, not a one-time job tier. */
export const MONTHLY_SUBSCRIPTION_PLAN = {
  price: 2499,
  jobSlotMonths: 1,
  dbCreditsPerMonth: 200,
  dbCreditsWorth: 2000,
  features: [
    "Unlimited job reposts",
    "Unlimited free reposts on job expiry",
    "Unlimited candidate responses",
  ],
  note: "Valid in a single city",
}

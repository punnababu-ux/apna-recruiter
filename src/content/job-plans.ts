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
    mrp: 1699,
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

/** The 4th card on the subscription layout — a distinct monthly apna Unlimited subscription, not a one-time job tier. */
export const MONTHLY_SUBSCRIPTION_PLAN: {
  price: number
  /** Optional list price. Set it to run a discount on the monthly plan:
   *  cards then show it struck through with a % OFF badge (and the claimed
   *  10% stacks on top). Unset = no plan discount. */
  mrp?: number
  jobSlotMonths: number
  dbCreditsPerMonth: number
  dbCreditsWorth: number
  features: string[]
  note: string
} = {
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

/** AI calling, sold as an add-on in the express-checkout order summary
 *  rather than as its own plan. One AI calling credit covers one job; with
 *  none in the balance it's bought at `price` for this job. */
export const AI_CALLING_ADDON = {
  price: 1699,
  headline: "Save your time – use AI calling to interview candidates",
  benefits: ["30% higher call pickup", "Ready to interview candidates", "Hindi & English calling"],
  /** The "How it works" pop-up (Figma 3025:52757). */
  explainer: {
    title: "How AI calling works",
    description:
      "AI calls every applicant, checks their interest and availability, and hands you the ones ready to interview. Listen to a demo call.",
    stats: [
      { value: "30%", title: "Higher call pickup", body: "Candidates answer an AI call more often" },
      { title: "Ready to interview", body: "Candidates are screened and shortlisted for you" },
    ],
    demo: {
      title: "AI Calling Agent in Action",
      /** Recordings per language. No `src` yet: the player runs the
       *  timeline silently until product supplies the demo calls. */
      calls: [
        { value: "hi", label: "Hindi", durationSec: 72, src: undefined as string | undefined },
        { value: "en", label: "English", durationSec: 72, src: undefined as string | undefined },
      ],
    },
  },
} as const

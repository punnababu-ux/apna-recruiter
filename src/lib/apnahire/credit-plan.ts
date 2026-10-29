import type { Bundle } from "@/content/credit-bundles"
import type { CreditBalance, JobPlanTier } from "@/content/job-plans"

/** How a recruiter who holds ANY credits would pay for a plan. Shared by
 *  the card (status line + CTA) and the page's click handler, so the card
 *  never promises something the click doesn't do. "partial" is priced at
 *  self-checkout's single-credit rate; "none" buys the plan itself. */
export type CreditPlan =
  | { state: "covered" }
  | { state: "partial"; held: number; shortfall: number; price: number; mrp: number }
  | { state: "none" }

export function creditPlan(
  tier: JobPlanTier,
  balance: CreditBalance,
  singleCredit: Pick<Bundle, "price" | "mrp">,
): CreditPlan {
  const held = balance[tier.credit.kind]
  if (held === 0) return { state: "none" }
  const shortfall = tier.credit.count - held
  if (shortfall <= 0) return { state: "covered" }
  return {
    state: "partial",
    held,
    shortfall,
    price: shortfall * singleCredit.price,
    mrp: shortfall * singleCredit.mrp,
  }
}

/** Any credit, job or Premium + AI, puts the cards in credit mode (and
 *  hides the subscription): a recruiter with only P+AI credits sees the
 *  other tiers as "Buy for ₹…" beside the P+AI card's "Covered". */
export const hasAnyCredits = (balance: CreditBalance) => balance.job > 0 || balance["ai-calling"] > 0

"use client"

/**
 * JobPlanPreviewSwitcher — floating preview control for the two conditions
 * `job-plan-selection.tsx` has no real data source for yet: which plan
 * layout to show (tiered vs. subscription — normally decided by user
 * segment/conditions TBD) and the recruiter's credit balance (normally the
 * account's real balance). Same prototype-control pattern as
 * `AuthStateSwitcher` (both are PrototypeSettings), just driving in-place state instead of navigating
 * between routes, since both of these are view-local rather than separate
 * pages.
 */

import { ExitOfferControls, PrototypeOption, PrototypeSection, PrototypeSettings } from "@/components/apnahire/prototype-settings"
import type { JobPlanLayout } from "@/components/apnahire/job-plan-selection"
import type { CreditBalance } from "@/content/job-plans"

const LAYOUTS: { value: JobPlanLayout; label: string }[] = [
  { value: "tiered", label: "Tiered (3 plans)" },
  { value: "subscription", label: "Subscription (3 plans + monthly)" },
]

// 1 job credit covers Classic only (Premium/Super premium need a top-up);
// 4 covers every job-credit plan. AI calling credits are a separate balance.
const CREDIT_BALANCES: { label: string; balance: CreditBalance }[] = [
  { label: "No credits", balance: { job: 0, "ai-calling": 0 } },
  { label: "1 job credit (top-up for most)", balance: { job: 1, "ai-calling": 0 } },
  { label: "4 job credits (enough for any)", balance: { job: 4, "ai-calling": 0 } },
  { label: "1 job + 1 AI calling credit", balance: { job: 1, "ai-calling": 1 } },
  { label: "1 AI calling credit", balance: { job: 0, "ai-calling": 1 } },
  { label: "4 job + 1 AI calling credit", balance: { job: 4, "ai-calling": 1 } },
]

const sameBalance = (a: CreditBalance, b: CreditBalance) =>
  a.job === b.job && a["ai-calling"] === b["ai-calling"]

export interface JobPlanPreviewSwitcherProps {
  layout: JobPlanLayout
  onLayoutChange: (layout: JobPlanLayout) => void
  creditBalance: CreditBalance
  onCreditBalanceChange: (balance: CreditBalance) => void
  /** 10% exit-offer demo controls. Omit to hide the section. */
  offer?: { claimed: boolean; onExpireSoon: () => void; onReset: () => void }
}

export function JobPlanPreviewSwitcher({
  layout,
  onLayoutChange,
  creditBalance,
  onCreditBalanceChange,
  offer,
}: JobPlanPreviewSwitcherProps) {
  return (
    <PrototypeSettings label="Preview job-plan state">
      <PrototypeSection title="Plan layout">
        {LAYOUTS.map((opt) => (
          <PrototypeOption key={opt.value} active={opt.value === layout} onClick={() => onLayoutChange(opt.value)}>
            {opt.label}
          </PrototypeOption>
        ))}
      </PrototypeSection>
      <PrototypeSection title="Credit balance">
        {CREDIT_BALANCES.map((opt) => (
          <PrototypeOption
            key={opt.label}
            active={sameBalance(opt.balance, creditBalance)}
            onClick={() => onCreditBalanceChange(opt.balance)}
          >
            {opt.label}
          </PrototypeOption>
        ))}
      </PrototypeSection>
      {offer && <ExitOfferControls offer={offer} />}
    </PrototypeSettings>
  )
}

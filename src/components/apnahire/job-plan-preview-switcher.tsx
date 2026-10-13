"use client"

/**
 * JobPlanPreviewSwitcher — floating preview control for the two conditions
 * `job-plan-selection.tsx` has no real data source for yet: which plan
 * layout to show (tiered vs. subscription — normally decided by user
 * segment/conditions TBD) and the recruiter's credit balance (normally the
 * account's real balance). Same prototype-control pattern as
 * `AuthStateSwitcher`, just driving in-place state instead of navigating
 * between routes, since both of these are view-local rather than separate
 * pages.
 */

import * as React from "react"
import { Settings } from "@apna/design-system"
import { cn } from "@/lib/utils"
import type { JobPlanLayout } from "@/components/apnahire/job-plan-selection"
import type { CreditBalance } from "@/content/job-plans"

const LAYOUTS: { value: JobPlanLayout; label: string }[] = [
  { value: "tiered", label: "Tiered (4 plans)" },
  { value: "subscription", label: "Subscription (3 plans + monthly)" },
]

// 1 job credit covers Classic only (Premium/Super premium need a top-up);
// 4 covers every job-credit plan. AI calling credits are a separate balance.
const CREDIT_BALANCES: { label: string; balance: CreditBalance }[] = [
  { label: "No credits", balance: { job: 0, "ai-calling": 0 } },
  { label: "1 job credit (top-up for most)", balance: { job: 1, "ai-calling": 0 } },
  { label: "4 job credits (enough for any)", balance: { job: 4, "ai-calling": 0 } },
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
}

export function JobPlanPreviewSwitcher({
  layout,
  onLayoutChange,
  creditBalance,
  onCreditBalanceChange,
}: JobPlanPreviewSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 print:hidden">
      {open && (
        <div
          role="group"
          aria-label="Preview job-plan state"
          className="flex w-64 flex-col gap-3 rounded-xl border border-border bg-popover p-3 shadow-lg"
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-muted-foreground">Plan layout</p>
            {LAYOUTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onLayoutChange(opt.value)}
                aria-current={opt.value === layout ? "true" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-left text-sm font-medium transition-colors",
                  opt.value === layout
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1 border-t border-border pt-2">
            <p className="text-xs font-semibold text-muted-foreground">Credit balance</p>
            {CREDIT_BALANCES.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => onCreditBalanceChange(opt.balance)}
                aria-current={sameBalance(opt.balance, creditBalance) ? "true" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-left text-sm font-medium transition-colors",
                  sameBalance(opt.balance, creditBalance)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Preview job-plan state"
        className="flex size-10 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground shadow-lg transition-colors hover:text-foreground"
      >
        <Settings className="size-5" aria-hidden />
      </button>
    </div>
  )
}

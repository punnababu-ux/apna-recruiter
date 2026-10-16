"use client"

/**
 * AvailableCreditsButton — the "Available credits" action in every top bar
 * (product shell, checkout, job posting). One component so it can't drift
 * between flows: the same small outline button as the wizard's "Save &
 * exit", with its own fill, so it reads as a button on the self-checkout
 * gradient instead of a border-less label floating on it.
 *
 * It opens the balance: a popover under the button on desktop, a bottom
 * sheet on phones. One row per credit type (icon · count, then the label
 * with an info tip saying what the credit is spent on). The tip opens on
 * hover or tap, so it works on touch too.
 *
 * `balance` defaults every count to 0: most surfaces have no balance data
 * yet. Express checkout passes its job and AI calling balance.
 *
 * `plansCta` adds "View plans" (→ /pricing) under the balance. Only the
 * product shell's top bar turns it on: on self-checkout and express
 * checkout's plan step the recruiter is already looking at plans, so the
 * panel there is the balance alone.
 */

import * as React from "react"
import Link from "next/link"
import {
  Bot,
  Briefcase,
  Button,
  Coin,
  IndianRupee,
  Info,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  UserSearch,
  Wallet,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"

export interface CreditsBalance {
  job: number
  database: number
  aiCalling: number
}

const ROWS: {
  key: keyof CreditsBalance
  icon: React.ComponentType<{ className?: string }>
  label: string
  info: string
}[] = [
  {
    key: "job",
    icon: Briefcase,
    label: "Job credits",
    info: "Spent to post jobs: 1 for a classic job, 2 for premium, 4 for super premium.",
  },
  {
    key: "database",
    icon: UserSearch,
    label: "Database credits",
    info: "Spent to unlock candidate profiles: 1 per profile, 2 to export one to Excel.",
  },
  {
    key: "aiCalling",
    icon: Bot,
    label: "AI job calling credits",
    info: "1 credit lets the AI calling agent screen applicants for one job.",
  },
]

/** What a credit is spent on: hover on desktop, tap on phones. */
function InfoTip({ label, children }: { label: string; children: string }) {
  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={100}
        aria-label={`About ${label}`}
        className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground outline-none transition-interactive hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Info className="size-4" aria-hidden />
      </PopoverTrigger>
      <PopoverContent side="top" className="w-60 text-xs text-muted-foreground">
        {children}
      </PopoverContent>
    </Popover>
  )
}

function CreditRows({ balance }: { balance: CreditsBalance }) {
  return (
    <ul className="flex flex-col">
      {ROWS.map(({ key, icon: Icon, label, info }) => (
        <li key={key} className="flex flex-col gap-1 border-t border-border py-4 last:pb-0">
          <span className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-foreground" aria-hidden />
            <span className="text-xl font-semibold tabular-nums text-foreground">
              {balance[key].toLocaleString("en-IN")}
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-foreground">
            {label}
            <InfoTip label={label}>{info}</InfoTip>
          </span>
        </li>
      ))}
    </ul>
  )
}

export function AvailableCreditsButton({
  balance,
  plansCta = false,
}: {
  balance?: Partial<CreditsBalance>
  /** "View plans" under the balance; off on the checkout pages. */
  plansCta?: boolean
}) {
  const isMobile = useIsMobile()
  const full: CreditsBalance = { job: 0, database: 0, aiCalling: 0, ...balance }

  // 16px (the panel's gap) above it, clear of the last row.
  const cta = plansCta ? (
    // The plans look (premium + Coin), as in the sidebar and the bottom bar.
    <Button variant="premium" size="lg" className="w-full" nativeButton={false} render={<Link href="/pricing" />}>
      <Coin icon={IndianRupee} />
      View plans
    </Button>
  ) : null

  const trigger = (
    <Button type="button" variant="outline" size="sm">
      <Wallet className="size-4" aria-hidden />
      <span className="hidden sm:inline">Available credits</span>
      <span className="sm:hidden">Credits</span>
    </Button>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger render={trigger} />
        {/* The system CloseBubble sits outside the sheet; no overflow-hidden. */}
        <SheetContent side="bottom" className="gap-4 rounded-t-2xl border-t-0 p-5 pb-safe-5">
          <SheetTitle className="text-lg font-semibold">Available credits</SheetTitle>
          <CreditRows balance={full} />
          {cta}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent align="end" sideOffset={8} className="w-72 gap-4 rounded-2xl p-5">
        <PopoverTitle className="text-lg font-semibold text-foreground">Available credits</PopoverTitle>
        <CreditRows balance={full} />
        {cta}
      </PopoverContent>
    </Popover>
  )
}

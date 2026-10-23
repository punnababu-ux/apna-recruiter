"use client"

/**
 * AvailableCreditsButton — the "Available credits" action in every top bar
 * (product shell, checkout, job posting): an icon-only circle on phones,
 * the labelled button from sm. One component so it can't drift
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
 * `plansCta` adds "View plans" (→ /apnahire/credits, the logged-in plans page) under the balance. Only the
 * product shell's top bar turns it on: on self-checkout and express
 * checkout's plan step the recruiter is already looking at plans, so the
 * panel there is the balance alone.
 *
 * Running low (user call, 2026-10-20; desktop, product top bar only — the
 * same `plansCta` surfaces): when usePlansIngress says "promote" (1 job
 * credit or fewer, no subscription), the button turns into "View plans".
 * The first time in a session it gets there in steps: "Available credits"
 * as usual, one lap of the attention ring, then it flips over (flip-in) into
 * the gold plans button, which goes straight to the plans page. Later in the
 * session it's simply "View plans". Hovering it shows what's left. The
 * plans pages themselves (self-checkout, the plan step) never flip.
 *
 * With a subscription (useJobSlots; user call, 2026-10-23) it is "Plan
 * details" instead, everywhere: the plan and when it renews, then job slots
 * in use of the total, database credits left of the total and the hiring
 * city the plan is locked to, plus a downgrade booked for the cycle's end.
 * Its CTA is "Manage plan" (→ /apnahire/plan: upgrades, downgrades), quiet
 * outline — a subscriber is never sold to from the top bar.
 */

import * as React from "react"
import Link from "next/link"
import {
  Badge,
  Bot,
  Briefcase,
  Button,
  CalendarClock,
  Coin,
  IndianRupee,
  Info,
  Layers,
  MapPin,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Sheet,
  SheetContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  SheetTitle,
  SheetTrigger,
  UserSearch,
  Wallet,
} from "@apna/design-system"
import { planOrderLabel, slotLabel, SUBSCRIPTION_TERMS } from "@/content/subscriptions"
import { dayLabel, subscriptionOf, useJobSlots, type Subscription } from "@/hooks/use-job-slots"
import { useIsMobile } from "@/hooks/use-mobile"
import { useJobCredits, usePlansIngress } from "@/hooks/use-plans-ingress"
import { num } from "@/lib/format"

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

type Row = {
  key: string
  icon: React.ComponentType<{ className?: string }>
  value: React.ReactNode
  label: string
  info: string
}

function Rows({ rows }: { rows: Row[] }) {
  return (
    <ul className="flex flex-col">
      {rows.map(({ key, icon: Icon, value, label, info }) => (
        <li key={key} className="flex flex-col gap-1 border-t border-border py-4 last:pb-0">
          <span className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-foreground" aria-hidden />
            <span className="text-xl font-semibold tabular-nums text-foreground">{value}</span>
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

function CreditRows({ balance }: { balance: CreditsBalance }) {
  return <Rows rows={ROWS.map((row) => ({ ...row, value: num(balance[row.key]) }))} />
}

/** "1 / 2": what's used, then the total, quieter. */
function OfTotal({ used, total }: { used: number; total: number }) {
  return (
    <>
      {num(used)}
      <span className="text-base font-medium text-muted-foreground"> / {num(total)}</span>
    </>
  )
}

/** The subscription: plan and renewal, then slots, database credits, city. */
function PlanRows({ slots }: { slots: Subscription }) {
  const sub = subscriptionOf(slots)
  const next = sub.scheduled
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-foreground">{planOrderLabel({ name: sub.plan })}</span>
          <Badge variant="success">Active</Badge>
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarClock className="size-4 shrink-0" aria-hidden />
          Renews on {dayLabel(sub.renewsOn)}
        </span>
      </div>
      <Rows
        rows={[
          {
            key: "slots",
            icon: Briefcase,
            value: <OfTotal used={sub.jobs.length} total={sub.total} />,
            label: "Job slots in use",
            info: "A slot holds one live job at a time. Expire a job to free its slot for the next.",
          },
          {
            key: "database",
            icon: UserSearch,
            value: <OfTotal used={sub.db?.left ?? 0} total={sub.db?.total ?? 0} />,
            label: "Database credits left",
            info: "Spent to unlock candidate profiles: 1 per profile, 2 to export one to Excel.",
          },
          {
            key: "city",
            icon: MapPin,
            value: sub.city,
            label: "Hiring city",
            info: `Your plan hires in one city: its jobs and database searches stay in ${sub.city}.`,
          },
        ]}
      />
      {next && (
        <p className="text-sm text-muted-foreground">
          Changes to the {planOrderLabel(SUBSCRIPTION_TERMS[next.term])} with {slotLabel(next.slots)} on{" "}
          <span className="whitespace-nowrap">{dayLabel(sub.renewsOn)}</span>.
        </p>
      )}
    </div>
  )
}

/** How long "Available credits" holds while the ring runs its lap, before
 *  it flips (the ring: 400ms delay + 3.6s). */
const FLIP_AFTER_MS = 3900

const PLAYED_KEY = "top-up-credits:played"

/** Replays the ring-and-flip on the next top bar (the preview settings'
 *  "Low credits" uses it, so the moment can be seen again). */
export function replayTopUpCredits() {
  try {
    sessionStorage.removeItem(PLAYED_KEY)
  } catch {
    // Storage blocked: it plays anyway.
  }
}

/** The running-low button: rings, then flips into "View plans". */
function TopUpCreditsButton() {
  const credits = useJobCredits()
  // "ring" → the usual button with the attention ring; "flip" → flipping
  // into Top up; "done" → Top up, still. Starts at "ring" so the first
  // paint is never the end state; a later page in the session (already
  // played) goes straight to "done".
  const [phase, setPhase] = React.useState<"ring" | "flip" | "done">("ring")

  React.useEffect(() => {
    let played = false
    try {
      played = sessionStorage.getItem(PLAYED_KEY) === "1"
    } catch {
      // Storage blocked: play it.
    }
    if (played) {
      setPhase("done")
      return
    }
    // Marked as played only when it flips, not when it starts: an effect
    // that runs twice (React's dev check) or a page left mid-ring would
    // otherwise skip the moment the recruiter never saw.
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(PLAYED_KEY, "1")
      } catch {
        // Not remembered: it plays again next page.
      }
      setPhase("flip")
    }, FLIP_AFTER_MS)
    return () => window.clearTimeout(t)
  }, [])

  if (phase === "ring") {
    return (
      <span className="relative inline-flex rounded-full">
        <Button type="button" variant="outline" size="sm" aria-label="Available credits">
          <Wallet className="size-4" aria-hidden />
          Available credits
        </Button>
        <span aria-hidden className="attention-ring" />
      </span>
    )
  }

  const firstTime = phase === "flip"
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="premium"
            size="sm"
            nativeButton={false}
            className={firstTime ? "animate-flip-in" : undefined}
            render={<Link href="/apnahire/credits" />}
          />
        }
      >
        <Coin icon={IndianRupee} size="sm" />
        View plans
      </TooltipTrigger>
      <TooltipContent>
        {credits === 1 ? "1 job credit left" : `${num(credits)} job credits left`}
      </TooltipContent>
    </Tooltip>
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
  const plans = usePlansIngress()
  const slots = useJobSlots()
  const full: CreditsBalance = { job: 0, database: 0, aiCalling: 0, ...balance }
  const title = slots ? "Plan details" : "Available credits"
  const body = slots ? <PlanRows slots={slots} /> : <CreditRows balance={full} />

  // 16px (the panel's gap) above it, clear of the last row.
  const cta = !plansCta ? null : slots ? (
    <Button variant="outline" size="lg" className="w-full" nativeButton={false} render={<Link href="/apnahire/plan" />}>
      Manage plan
    </Button>
  ) : (
    // The plans look (premium + Coin), as in the sidebar and the bottom bar.
    <Button variant="premium" size="lg" className="w-full" nativeButton={false} render={<Link href="/apnahire/credits" />}>
      <Coin icon={IndianRupee} />
      View plans
    </Button>
  )

  const Icon = slots ? Layers : Wallet
  const trigger = (
    // Phones: an icon-only 32px circle (the desktop bell's size and shape);
    // the label from sm. The accessible name stays the label.
    <Button type="button" variant="outline" size="sm" aria-label={title} className="max-sm:size-8 max-sm:px-0">
      <Icon className="size-4" aria-hidden />
      <span className="hidden sm:inline">{title}</span>
    </Button>
  )

  // Running low, on desktop, in the app's top bar: "View plans".
  if (plansCta && !isMobile && plans === "promote") return <TopUpCreditsButton />

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger render={trigger} />
        {/* The system CloseBubble sits outside the sheet; no overflow-hidden. */}
        <SheetContent side="bottom" className="gap-4 rounded-t-2xl border-t-0 p-5 pb-safe-5">
          <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
          {body}
          {cta}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent align="end" sideOffset={8} className="w-72 gap-4 rounded-2xl p-5">
        <PopoverTitle className="text-lg font-semibold text-foreground">{title}</PopoverTitle>
        {body}
        {cta}
      </PopoverContent>
    </Popover>
  )
}

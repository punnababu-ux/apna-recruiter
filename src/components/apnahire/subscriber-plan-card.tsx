"use client"

/**
 * SubscriberPlanCard — the subscriber's plan on the jobs dashboard (Figma
 * Self-checkout › Subscription-upgrade): an OfferBar on top, then
 * "apna Unlimited", the plan's end date and four numbers.
 *
 * OFFER_BAR_TEMPLATES holds every case the Figma draws, as ready OfferBar
 * props: tenure upgrades, extra slots, a database top-up, auto-pay off and
 * the rebuys. Which one shows is not decided here (no rules yet); the
 * prototype picks one with useOfferBarPreview.
 *
 * Prices and percentages are the Figma's placeholders.
 */

import * as React from "react"
import Image from "next/image"
import {
  ArrowRight,
  Briefcase,
  Button,
  CalendarClock,
  Card,
  CircleAlert,
  CircleCheck,
  Clock,
  FileText,
  LogoApnaUnlimited,
  OfferBar,
  OfferBarDrop,
  UserSearch,
  type OfferBarProps,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"
import { openPrototypeSettings, PrototypeOption, PrototypeSection } from "@/components/apnahire/prototype-settings"
import { cn } from "@/lib/utils"

const art = (name: string) => (
  // Clay PNGs are served as-is (a re-encode smears their cut edge).
  <Image src={`/images/company/values/${name}.png`} alt="" width={48} height={48} unoptimized />
)
const countdown = (
  <>
    <Clock className="size-3.5" aria-hidden />
    Offer ends in 24:56:44
  </>
)
// Phones: the small button, so price, struck price, % OFF and the CTA share
// one row (as in SlotsFullDialog); at 320px the CTA drops under the price.
const cta = (label: string, small: boolean) => (
  <Button variant="emphasis" size={small ? "sm" : "default"} trailingIcon={<ArrowRight />}>
    {label}
  </Button>
)

const STATS: { icon: typeof Briefcase; label: string; short?: string; value: string }[] = [
  { icon: Briefcase, label: "Jobs posted", value: "8" },
  // Phones: too long for a half-width tile beside its icon, so the short form.
  { icon: FileText, label: "Applications received", short: "Applications", value: "640" },
  { icon: CircleCheck, label: "Shortlisted", value: "120" },
  { icon: UserSearch, label: "Database unlocks", value: "520" },
]

type Template = { label: string; bar: Omit<OfferBarProps, "cta"> & { cta: string } }

export const OFFER_BAR_TEMPLATES = {
  "monthly-to-quarterly": {
    label: "Monthly → Quarterly",
    bar: {
      art: art("annual"),
      hook: "Your plan ends in 5 days",
      headline: <>Pay <OfferBarDrop from="₹2,499" to="₹1,500" unit="/month" /> on the quarterly plan</>,
      points: ["1 active job slot for 90 days", "600 database credits"],
      price: { amount: "₹4,499", strike: "₹4,999", off: "10% OFF" },
      deadline: countdown,
      cta: "Upgrade now",
    },
  },
  "quarterly-to-annual": {
    label: "Quarterly → Annual",
    bar: {
      art: art("unlimited"),
      hook: "Special upgrade offer",
      headline: <>Pay <OfferBarDrop from="₹2,499" to="₹833" unit="/month" /> on the annual plan</>,
      points: ["1 active job slot for 365 days", "2,400 database credits"],
      price: { amount: "₹9,999", strike: "₹11,110", off: "10% OFF" },
      deadline: "Limited time offer",
      cta: "Upgrade now",
    },
  },
  "quarterly-to-annual-last-week": {
    label: "Quarterly → Annual, last week",
    bar: {
      art: art("annual"),
      hook: "Your plan ends in 5 days",
      headline: <>Pay <OfferBarDrop from="₹2,499" to="₹787" unit="/month" /> on the annual plan</>,
      points: ["1 active job slot for 365 days", "2,400 database credits"],
      price: { amount: "₹9,443", strike: "₹11,110", off: "15% OFF" },
      deadline: countdown,
      cta: "Upgrade now",
    },
  },
  "slots-2": {
    label: "Slots full · 2nd slot",
    bar: {
      art: art("slots-full"),
      hook: "All job slots full. Save 11% on a 2nd job slot",
      headline: <OfferBarDrop from="₹2,499" to="₹1,999" unit="/job slot" />,
      points: ["2 active job slots for 30 days", "400 database credits"],
      price: { amount: "₹3,999", strike: "₹4,499", off: "11% OFF" },
      deadline: countdown,
      cta: "Upgrade now",
    },
  },
  "slots-3": {
    label: "Slots full · 3rd slot",
    bar: {
      art: art("slots-full"),
      hook: "Both job slots full. Save 11% on a 3rd job slot",
      headline: <OfferBarDrop from="₹2,499" to="₹1,999" unit="/job slot" />,
      points: ["3 active job slots for 30 days", "600 database credits"],
      price: { amount: "₹5,999", strike: "₹6,749", off: "11% OFF" },
      deadline: countdown,
      cta: "Upgrade now",
    },
  },
  "database-top-up": {
    label: "Database top-up",
    bar: {
      art: art("database-search"),
      hook: "80 database profile unlocks left",
      headline: <>Pay <OfferBarDrop from="₹10" to="₹6" unit="/unlock" /> on a 1,000-unlock pack</>,
      points: ["1,000 database profile unlocks", "Valid for 180 days"],
      price: { amount: "₹5,999", strike: "₹9,999", off: "40% OFF" },
      deadline: countdown,
      cta: "Buy now",
    },
  },
  "auto-pay-off": {
    label: "Auto-pay off",
    bar: {
      tone: "fix",
      art: art("access"),
      hook: "Auto-pay is off",
      headline: "Your plan ends in 9 days",
      cta: "Turn on auto-pay",
    },
  },
  "rebuy-monthly": {
    label: "Rebuy · Monthly",
    bar: {
      tone: "lapsed",
      art: art("expired"),
      hook: "Your plan ended 39 days ago",
      headline: "Renew at the price you paid last time",
      points: ["1 active job slot for 30 days", "200 database credits"],
      price: { amount: "₹2,249", strike: "₹2,499", off: "10% OFF" },
      deadline: (
        <>
          <Clock className="size-3.5" aria-hidden />
          Offer ends in 6 days
        </>
      ),
      cta: "Renew now",
    },
  },
  "rebuy-quarterly": {
    label: "Rebuy · Quarterly",
    bar: {
      tone: "lapsed",
      art: art("expired"),
      hook: "Your plan ended 39 days ago",
      headline: "Renew your quarterly plan at the same price",
      points: ["1 active job slot for 90 days", "600 database credits"],
      price: { amount: "₹4,499", strike: "₹4,999", off: "10% OFF" },
      deadline: (
        <>
          <Clock className="size-3.5" aria-hidden />
          Offer ends in 6 days
        </>
      ),
      cta: "Renew now",
    },
  },
  "rebuy-annual": {
    label: "Rebuy · Annual",
    bar: {
      tone: "lapsed",
      art: art("expired"),
      hook: "Your plan ended",
      headline: "Renew your annual plan at the same price",
      points: ["1 active job slot for 365 days", "2,400 database credits"],
      price: { amount: "₹9,999" },
      cta: "Renew now",
    },
  },
} satisfies Record<string, Template>

export type OfferBarTemplate = keyof typeof OFFER_BAR_TEMPLATES

export function SubscriberPlanCard({
  template,
  validTill = "18 Oct 2026",
  className,
}: {
  /** The bar on top; none, and the card starts at its plan row. */
  template?: OfferBarTemplate | null
  validTill?: string
  className?: string
}) {
  const t = template ? OFFER_BAR_TEMPLATES[template] : null
  const isMobile = useIsMobile()
  // A rebuy bar: the plan has already ended.
  const ended = t?.bar && "tone" in t.bar && t.bar.tone === "lapsed"
  return (
    <Card padding="none" className={cn("gap-0 overflow-visible", className)}>
      {t && <OfferBar {...t.bar} cta={cta(t.bar.cta, isMobile)} className="rounded-b-none" />}
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <LogoApnaUnlimited variant="theme" className="h-4 w-auto text-foreground md:h-5" />
          {/* Prototype: a silent click opens the preview settings (every
              offer bar). Remove before production with the other ingresses. */}
          <span
            className="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground"
            onClick={openPrototypeSettings}
          >
            {ended ? (
              <CircleAlert className="size-4 text-destructive" aria-hidden />
            ) : (
              <CalendarClock className="size-4" aria-hidden />
            )}
            {ended ? (
              <span className="font-medium text-destructive">Expired on {validTill}</span>
            ) : (
              <>
                Valid till <span className="font-medium text-foreground">{validTill}</span>
              </>
            )}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map(({ icon: Icon, label, short, value }) => (
            // Compact (Figma): number over its label, the icon top right.
            <div key={label} className="flex items-start justify-between gap-2 rounded-card-nested bg-muted px-4 py-3">
              <div className="flex min-w-0 flex-col-reverse">
                <dt className="text-sm whitespace-nowrap text-muted-foreground">
                  {short ? (
                    <>
                      <span className="sm:hidden">{short}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </>
                  ) : (
                    label
                  )}
                </dt>
                <dd className="text-xl font-semibold tabular-nums text-foreground">{value}</dd>
              </div>
              <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </div>
          ))}
        </dl>
      </div>
    </Card>
  )
}

/* ─────────────────────────── Prototype preview ─────────────────────────── */

const STORAGE_KEY = "apnahire:offer-bar-preview"
const EVENT = "apnahire:offer-bar-preview"

function read(): OfferBarTemplate | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v && v in OFFER_BAR_TEMPLATES ? (v as OfferBarTemplate) : null
  } catch {
    return null
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

function setPreview(v: OfferBarTemplate | null) {
  try {
    if (v) window.localStorage.setItem(STORAGE_KEY, v)
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked: lasts until reload.
  }
  window.dispatchEvent(new Event(EVENT))
}

/** Which template the prototype shows on the plan card (none by default). */
export function useOfferBarPreview() {
  return React.useSyncExternalStore(subscribe, read, () => null)
}

export function OfferBarPreviewControls() {
  const current = useOfferBarPreview()
  return (
    <PrototypeSection title="Plan card offer bar">
      <PrototypeOption active={!current} onClick={() => setPreview(null)}>
        No bar
      </PrototypeOption>
      {(Object.keys(OFFER_BAR_TEMPLATES) as OfferBarTemplate[]).map((key) => (
        <PrototypeOption key={key} active={current === key} onClick={() => setPreview(key)}>
          {OFFER_BAR_TEMPLATES[key].label}
        </PrototypeOption>
      ))}
    </PrototypeSection>
  )
}

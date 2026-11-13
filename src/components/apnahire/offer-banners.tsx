"use client"

/**
 * Every rebuy / upgrade / credit banner as data for the design system's
 * OfferBar (redesign 2026-11-12, docs/SESSION-2026-11-12-BANNERS.md).
 * `OfferBannerFor` renders one case; the jobs page picks it with ?bar=<case>
 * (docs/reference/REVIEW-STATES.md), the preview page /apnahire/banners shows all.
 *
 * Clay art is a placeholder until the banners' own clay is made.
 */

import * as React from "react"
import Image from "next/image"
import { Button, OfferBar, OfferBarAccent } from "@apna/design-system"
import { useCountdown } from "@/components/apnahire/offers/countdown-chip"

type OfferBanner = {
  /** The label in the review-state lists. */
  label: string
  /** Gradient follows the pop-up the CTA opens. Default subscription. */
  family?: "subscription" | "credits" | "festive"
  tone?: "upgrade" | "renew" | "urgent" | "warning"
  art: string
  /** The offer's real deadline, ms from now. */
  endsInMs?: number
  /** A real end, between price and CTA: a date, then a timer in its last 24h. */
  limited?: boolean
  chip: string
  lead: string
  /** The one gold phrase. Text may follow it (`tail`). */
  accent?: string
  /** After the gold phrase, when it sits mid-sentence. */
  tail?: string
  sub: string
  price?: { amount: string; strike?: string }
  cta: string
}

export const OFFER_BANNERS = {
  "monthly-to-quarterly": { label: "Monthly → Quarterly", art: "/images/company/values/banner-upgrade.png", chip: "Plan ends in 5 days", lead: "Keep your job live at", accent: "₹1,500/month",
    sub: "1 job live at a time for 90 days · 600 database credits", price: { amount: "₹4,499", strike: "₹4,999" }, cta: "Upgrade to quarterly" },
  "quarterly-to-annual": { label: "Quarterly → Annual", endsInMs: 6 * 86400_000, art: "/images/company/values/banner-upgrade.png", limited: true, chip: "Upgrade offer", lead: "Go annual for", accent: "₹833/month",
    sub: "1 job live at a time for 365 days · 2,400 database credits", price: { amount: "₹9,999", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "quarterly-to-annual-ending": { label: "Quarterly → Annual, offer ends today", endsInMs: 5 * 3600_000 + 42 * 60_000, art: "/images/company/values/banner-upgrade.png", limited: true, chip: "Upgrade offer", lead: "Last day to go annual for", accent: "₹833/month",
    sub: "1 job live at a time for 365 days · 2,400 database credits", price: { amount: "₹9,999", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "quarterly-to-annual-last-week": { label: "Quarterly → Annual, last week", endsInMs: 5 * 86400_000, limited: true, art: "/images/company/values/banner-upgrade.png", chip: "Plan ends in 5 days", lead: "Go annual for", accent: "₹787/month",
    sub: "1 job live at a time for 365 days · 2,400 database credits", price: { amount: "₹9,443", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "slots-2": { label: "Slots full · 2nd job", art: "/images/company/values/banner-slots.png", chip: "1 of 1 job live", lead: "Add another live job at", accent: "₹1,999/job",
    sub: "2 jobs live at a time for 30 days · 400 database credits", price: { amount: "₹3,999", strike: "₹4,499" }, cta: "Add a job" },
  "slots-3": { label: "Slots full · 3rd job", art: "/images/company/values/banner-slots.png", chip: "2 of 2 jobs live", lead: "Add a third live job at", accent: "₹1,999/job",
    sub: "3 jobs live at a time for 30 days · 600 database credits", price: { amount: "₹5,999", strike: "₹6,749" }, cta: "Add a job" },
  "database-top-up": { label: "Database top-up", art: "/images/company/values/banner-database.png", family: "credits", chip: "80 database credits left", lead: "Get 1,000 more at", accent: "₹6 each",
    sub: "Valid for 180 days", price: { amount: "₹5,999", strike: "₹9,999" }, cta: "Buy database credits" },
  // Out of database credits: red like 0 job credits.
  "database-0": { label: "Database · 0 left", art: "/images/company/values/banner-database-empty.png", family: "credits", tone: "urgent", chip: "0 database credits left", lead: "Get 1,000 database credits at", accent: "₹6 each",
    sub: "Valid for 180 days", price: { amount: "₹5,999", strike: "₹9,999" }, cta: "Buy database credits" },
  "auto-pay-off": { label: "Auto-pay off", art: "/images/company/values/banner-autopay.png", chip: "Auto-pay is off", lead: "Turn on auto-pay and keep hiring",
    sub: "Your plan renews at the price you pay now", cta: "Turn on auto-pay" },
  "rebuy-monthly": { label: "Rebuy · Monthly", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Your", accent: "old price", tail: "is still yours. Renew before it goes",
    sub: "1 job live at a time for 30 days · 200 database credits", price: { amount: "₹2,249", strike: "₹2,499" }, cta: "Renew plan" },
  "rebuy-quarterly": { label: "Rebuy · Quarterly", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Your", accent: "old price", tail: "is still yours. Renew before it goes",
    sub: "1 job live at a time for 90 days · 600 database credits", price: { amount: "₹4,499", strike: "₹4,999" }, cta: "Renew plan" },
  "rebuy-annual": { label: "Rebuy · Annual", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Your", accent: "old price", tail: "is still yours. Renew before it goes",
    sub: "1 job live at a time for 365 days · 2,400 database credits", price: { amount: "₹9,999" }, cta: "Renew plan" },

  // Not on the plan card: job credits (non-subscribers) and the festive campaign.
  "credits-0": { label: "Job credits · 0 left", art: "/images/company/values/banner-credits-empty.png", family: "credits", tone: "urgent", chip: "0 job credits left",
    lead: "Get 6 job credits at", accent: "₹608 each", sub: "Valid for 90 days",
    price: { amount: "₹3,649", strike: "₹4,306" }, cta: "Buy 6 credits" },
  "credits-1": { label: "Job credits · 1 left", art: "/images/company/values/banner-credits-low.png", family: "credits", tone: "warning", chip: "1 job credit left",
    lead: "Keep hiring. Get 6 job credits at", accent: "₹608 each", sub: "Valid for 90 days",
    price: { amount: "₹3,649", strike: "₹4,306" }, cta: "Buy 6 credits" },
  "festive-unlimited": { label: "Festive · Unlimited", limited: true, endsInMs: 2 * 86400_000, art: "/images/company/values/banner-festive.png", family: "festive", tone: "upgrade", chip: "Hiring Utsav",
    lead: "Hire for 365 days at", accent: "₹833/month", sub: "1 job live at a time for 365 days · 2,000 database credits",
    price: { amount: "₹9,999", strike: "₹15,873" }, cta: "Get Unlimited" },
  "festive-credits": { label: "Festive · job credits", limited: true, endsInMs: 11 * 3600_000 + 18 * 60_000, art: "/images/company/values/banner-festive.png", family: "festive", tone: "upgrade", chip: "Hiring Utsav",
    lead: "22 job credits cost", accent: "₹455 each", sub: "Valid for 365 days",
    price: { amount: "₹9,999", strike: "₹15,383" }, cta: "Buy job credits" },
} satisfies Record<string, OfferBanner>

export type OfferBannerCase = keyof typeof OFFER_BANNERS
export const isOfferBannerCase = (v: string | null): v is OfferBannerCase => !!v && v in OFFER_BANNERS

/** What the logged-in plans page shows until a real picker exists.
 *  Enterprise has no offer. `?bar=` overrides this. */
export const PLANS_PAGE_BAR: Partial<Record<"jobs" | "database" | "unlimited", OfferBannerCase>> = {
  jobs: "credits-0",
  database: "database-0",
  unlimited: "quarterly-to-annual",
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** A date ("Ends 19 Nov"), then a live "Ends in HH:MM:SS" in the last 24 hours. */
function LimitedOffer({ ms }: { ms: number }) {
  const [deadline] = React.useState(() => Date.now() + ms)
  const t = Math.floor(useCountdown(deadline) / 1000)
  if (ms > 86400_000) {
    const d = new Date(deadline)
    return <span>Ends {d.getDate()} {MONTHS[d.getMonth()]}</span>
  }
  const hms = [t / 3600, (t % 3600) / 60, t % 60].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":")
  return (
    <span role="timer" className="font-semibold tabular-nums">
      Ends in {hms}
    </span>
  )
}

export function OfferBannerFor({ bar, className }: { bar: OfferBannerCase; className?: string }) {
  const h: OfferBanner = OFFER_BANNERS[bar]
  const surface = h.family === "festive" ? "festive" : h.family === "credits" ? (h.tone === "urgent" ? "urgent" : "credits") : "subscription"
  return (
    <OfferBar
      surface={surface}
      tone={h.tone}
      // Clay PNGs are served as-is (a re-encode smears their cut edge).
      art={<Image src={h.art} alt="" width={96} height={96} unoptimized />}
      badge={h.chip}
      headline={
        <>
          {h.lead}
          {h.accent && <> <OfferBarAccent>{h.accent}</OfferBarAccent></>}
          {h.tail && <> {h.tail}</>}
        </>
      }
      sub={h.sub}
      price={h.price}
      deadline={h.limited && h.endsInMs ? <LimitedOffer ms={h.endsInMs} /> : undefined}
      cta={<Button variant="emphasis">{h.cta}</Button>}
      className={className}
    />
  )
}

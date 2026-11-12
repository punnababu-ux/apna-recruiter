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
  /** "Limited time offer" between price and CTA; the timer in its last 24h. */
  limited?: boolean
  chip: string
  lead: string
  accent?: string
  sub: string
  price?: { amount: string; strike?: string }
  cta: string
}

export const OFFER_BANNERS = {
  "monthly-to-quarterly": { label: "Monthly → Quarterly", art: "/images/company/values/banner-upgrade.png", chip: "Plan ends in 5 days", lead: "Hire for 3 months at", accent: "₹1,500/month",
    sub: "1 live job for 90 days · 600 database credits", price: { amount: "₹4,499", strike: "₹4,999" }, cta: "Upgrade to quarterly" },
  "quarterly-to-annual": { label: "Quarterly → Annual", endsInMs: 6 * 86400_000, art: "/images/company/values/banner-upgrade.png", limited: true, chip: "Upgrade offer", lead: "Hire all year for just", accent: "₹833/month",
    sub: "1 live job for 365 days · 2,400 database credits", price: { amount: "₹9,999", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "quarterly-to-annual-ending": { label: "Quarterly → Annual, offer ends today", endsInMs: 5 * 3600_000 + 42 * 60_000, art: "/images/company/values/banner-upgrade.png", limited: true, chip: "Upgrade offer", lead: "Hire all year for just", accent: "₹833/month",
    sub: "1 live job for 365 days · 2,400 database credits", price: { amount: "₹9,999", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "quarterly-to-annual-last-week": { label: "Quarterly → Annual, last week", endsInMs: 5 * 86400_000, limited: true, art: "/images/company/values/banner-upgrade.png", chip: "Plan ends in 5 days", lead: "Hire all year for just", accent: "₹787/month",
    sub: "1 live job for 365 days · 2,400 database credits", price: { amount: "₹9,443", strike: "₹11,110" }, cta: "Upgrade to annual" },
  "slots-2": { label: "Slots full · 2nd job", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-slots.png", chip: "1 of 1 jobs live", lead: "Post 2 jobs at once for", accent: "₹1,999/job",
    sub: "2 live jobs for 30 days · 400 database credits", price: { amount: "₹3,999", strike: "₹4,499" }, cta: "Add a job" },
  "slots-3": { label: "Slots full · 3rd job", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-slots.png", chip: "2 of 2 jobs live", lead: "Post 3 jobs at once for", accent: "₹1,999/job",
    sub: "3 live jobs for 30 days · 600 database credits", price: { amount: "₹5,999", strike: "₹6,749" }, cta: "Add a job" },
  "database-top-up": { label: "Database top-up", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-database.png", family: "credits", chip: "80 database credits left", lead: "1,000 database credits at just", accent: "₹6 each",
    sub: "Valid for 180 days", price: { amount: "₹5,999", strike: "₹9,999" }, cta: "Buy database credits" },
  // Out of database credits: red like 0 job credits.
  "database-0": { label: "Database · 0 left", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-database-empty.png", family: "credits", tone: "urgent", chip: "0 database credits left", lead: "1,000 database credits at just", accent: "₹6 each",
    sub: "Valid for 180 days", price: { amount: "₹5,999", strike: "₹9,999" }, cta: "Buy database credits" },
  "auto-pay-off": { label: "Auto-pay off", art: "/images/company/values/banner-autopay.png", chip: "Auto-pay is off", lead: "Keep hiring without a break",
    sub: "Your plan ends in 9 days", cta: "Turn on auto-pay" },
  "rebuy-monthly": { label: "Rebuy · Monthly", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Renew at your", accent: "old price",
    sub: "1 live job for 30 days · 200 database credits", price: { amount: "₹2,249", strike: "₹2,499" }, cta: "Renew plan" },
  "rebuy-quarterly": { label: "Rebuy · Quarterly", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Renew at your", accent: "old price",
    sub: "1 live job for 90 days · 600 database credits", price: { amount: "₹4,499", strike: "₹4,999" }, cta: "Renew plan" },
  "rebuy-annual": { label: "Rebuy · Annual", art: "/images/company/values/banner-rebuy.png", tone: "renew", chip: "Your plan ended", lead: "Renew at your", accent: "old price",
    sub: "1 live job for 365 days · 2,400 database credits", price: { amount: "₹9,999" }, cta: "Renew plan" },

  // Not on the plan card: job credits (non-subscribers) and the festive campaign.
  "credits-0": { label: "Job credits · 0 left", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-credits-empty.png", family: "credits", tone: "urgent", chip: "0 job credits left",
    lead: "Get 6 job credits at", accent: "₹608 each", sub: "Valid for 90 days",
    price: { amount: "₹3,649", strike: "₹4,306" }, cta: "Buy 6 credits" },
  "credits-1": { label: "Job credits · 1 left", endsInMs: 3 * 86400_000, art: "/images/company/values/banner-credits-low.png", family: "credits", tone: "warning", chip: "1 job credit left",
    lead: "Get 6 job credits at", accent: "₹608 each", sub: "Valid for 90 days",
    price: { amount: "₹3,649", strike: "₹4,306" }, cta: "Buy 6 credits" },
  "festive-unlimited": { label: "Festive · Unlimited", limited: true, endsInMs: 2 * 86400_000, art: "/images/company/values/banner-festive.png", family: "festive", tone: "upgrade", chip: "Hiring Utsav",
    lead: "Hire all year for just", accent: "₹833/month", sub: "1 live job for 365 days · 2,000 database credits",
    price: { amount: "₹9,999", strike: "₹15,873" }, cta: "Get Unlimited" },
  "festive-credits": { label: "Festive · job credits", limited: true, endsInMs: 11 * 3600_000 + 18 * 60_000, art: "/images/company/values/banner-festive.png", family: "festive", tone: "upgrade", chip: "Hiring Utsav",
    lead: "22 job credits at just", accent: "₹455 each", sub: "Valid for 365 days",
    price: { amount: "₹9,999", strike: "₹15,383" }, cta: "Buy job credits" },
} satisfies Record<string, OfferBanner>

export type OfferBannerCase = keyof typeof OFFER_BANNERS
export const isOfferBannerCase = (v: string | null): v is OfferBannerCase => !!v && v in OFFER_BANNERS

/** "Limited time offer", then a live "Ends in HH:MM:SS" in the last 24 hours. */
function LimitedOffer({ ms }: { ms: number }) {
  const [deadline] = React.useState(() => Date.now() + ms)
  const t = Math.floor(useCountdown(deadline) / 1000)
  if (ms > 86400_000) return <span>Limited time offer</span>
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
          {h.lead} {h.accent && <OfferBarAccent>{h.accent}</OfferBarAccent>}
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

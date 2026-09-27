"use client"

/**
 * EnterprisePricingTable — Enterprise tab body: four tier cards in one row
 * (Starter · Growth · Scale · Expansion), each with its own outline
 * "Contact sales" CTA.
 *
 * Figma: 92gU18d45olE04ATyhhVHD → 1971:9404 (Enterprise, 1440 desktop).
 *
 * This replaced a 5-column feature comparison table. The comparison grid is
 * gone, and so is the fifth "Unlimited" tier — 1971:9416 draws exactly four
 * cards and no ₹12,50,000 node exists anywhere under the frame. Validity left
 * the feature matrix and became a meta line in each card header; "Key Account
 * Manager / Yes" became "Dedicated account manager".
 *
 * Pure composition, in the AGENTS.md sense: `Card` + `CardTitle` +
 * `Separator` + `Button` over a single data array, with layout classes only.
 * No new primitive, variant or semantic token. The name is a misnomer now —
 * it renders a card grid, not a table — but the file and the export keep their
 * names so `self-checkout.tsx` does not have to move in the same change.
 *
 * Figma draws the 1440 layout only; the breakpoints below are a code-side
 * decision matching the house convention in the Jobs and Database tabs.
 */

import * as React from "react"
import { Check, ClockFading } from "@apna/design-system"
import { Button, Card, CardTitle, Separator } from "@apna/design-system"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────── types ───────────────────────── */

interface TierFeature {
  /** Leading number or duration, rendered semibold. Absent on prose-only rows. */
  bold?: string
  label: string
}

interface Tier {
  name: string
  /** Literal string — preserves the Indian digit grouping from Figma. */
  price: string
  validity: string
  features: TierFeature[]
}

/* ─────────────────────────────────────── data ────────────────────────── */
/* Copy verbatim from Figma 1971:9417 / 9454 / 9491 / 9528. The figures are
 * unchanged from the previous comparison table's first four columns; only the
 * labels were re-cased and "Whatsapp Reachout" became "WhatsApp reachouts". */

const VALIDITY = "Valid for 360 days"

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "₹1,00,000",
    validity: VALIDITY,
    features: [
      { bold: "75", label: "Job credits" },
      { bold: "2,000", label: "Database unlocks" },
      { bold: "1,500", label: "WhatsApp reachouts" },
      { bold: "7 days", label: "Employer branding" },
      { bold: "3", label: "Recruiter logins" },
      { label: "Dedicated account manager" },
    ],
  },
  {
    name: "Growth",
    price: "₹1,75,000",
    validity: VALIDITY,
    features: [
      { bold: "150", label: "Job credits" },
      { bold: "3,000", label: "Database unlocks" },
      { bold: "2,000", label: "WhatsApp reachouts" },
      { bold: "30 days", label: "Employer branding" },
      { bold: "5", label: "Recruiter logins" },
      { label: "Dedicated account manager" },
    ],
  },
  {
    name: "Scale",
    price: "₹5,00,000",
    validity: VALIDITY,
    features: [
      { bold: "450", label: "Job credits" },
      { bold: "5,000", label: "Database unlocks" },
      { bold: "5,000", label: "WhatsApp reachouts" },
      { bold: "60 days", label: "Employer branding" },
      { bold: "7", label: "Recruiter logins" },
      { label: "Dedicated account manager" },
    ],
  },
  {
    name: "Expansion",
    price: "₹8,75,000",
    validity: VALIDITY,
    features: [
      { bold: "800", label: "Job credits" },
      { bold: "10,000", label: "Database unlocks" },
      { bold: "10,000", label: "WhatsApp reachouts" },
      { bold: "120 days", label: "Employer branding" },
      { bold: "9", label: "Recruiter logins" },
      { label: "Dedicated account manager" },
    ],
  },
]

/* ─────────────────────────────────── component ───────────────────────── */

interface EnterprisePricingTableProps {
  /**
   * Fired by every card's CTA with that card's tier name. Figma defines no
   * destination for "Contact sales", so `self-checkout.tsx` does not pass this
   * yet and the buttons are inert by design — see the spec's Gaps.
   */
  onContactSales?: (tierName: string) => void
  className?: string
}

export function EnterprisePricingTable({
  onContactSales,
  className,
}: EnterprisePricingTableProps) {
  return (
    <div
      data-slot="enterprise-pricing-table"
      className={cn("flex flex-col gap-5", className)}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-h4 text-checkout-hero-fg">Hire anywhere in India</h2>
        <p className="text-sm text-checkout-hero-fg-secondary">
          For high-volume organisations that never stop hiring.
        </p>
      </div>

      {/* Figma is one 1136px row of four. Below `lg` the cards pair up, and
          below `sm` they stack — matching the Jobs / Database bundle grids. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <Card
            key={tier.name}
            padding="sm"
            className="gap-5 rounded-xl border-transparent"
          >
            <div className="flex flex-col gap-2">
              <CardTitle>{tier.name}</CardTitle>
              <p className="text-h3 text-foreground">{tier.price}</p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <ClockFading className="size-5 shrink-0" aria-hidden />
                {tier.validity}
              </p>
            </div>

            <Separator />

            <ul className="flex flex-col gap-2">
              {tier.features.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Check className="size-4 shrink-0 text-checkout-primary" aria-hidden />
                  <span>
                    {feature.bold ? (
                      <>
                        <span className="font-semibold text-foreground">
                          {feature.bold}
                        </span>{" "}
                      </>
                    ) : null}
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* `mt-auto` keeps the CTAs on one line when a card's feature rows
                wrap and the grid stretches its siblings to match. */}
            <div className="mt-auto">
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full px-6"
                onClick={() => onContactSales?.(tier.name)}
              >
                Contact sales
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-checkout-hero-fg-muted">*GST applicable</p>
    </div>
  )
}

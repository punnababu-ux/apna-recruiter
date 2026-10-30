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
 * Pure composition, in the AGENTS.md sense: `Card` +
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
import { Button, Card, Separator } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { useCheckoutVersion, versionAtLeast } from "@/hooks/use-checkout-version"
import { GstNote } from "@/components/apnahire/gst-note"
import { CardHover } from "@/components/apnahire/use-card-hover"
import {
  MobileMetaLine,
  MobilePlanDetails,
  MobilePlanRow,
} from "@/components/apnahire/mobile-plan-row"

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

/* ── V3 phones: every plan in one table ─────────────────────────────── */

const EVERY_PLAN = "Every plan: valid for 360 days, with a dedicated account manager."

/** "₹1,00,000" → "₹1L", "₹8,75,000" → "₹8.75L": four prices fit one row. */
const lakh = (price: string) => `₹${Number(price.replace(/\D/g, "")) / 100000}L`

/** V3, phones (user call, 2026-10-30): the four cards repeated the same
 *  five feature names, the same validity and the same account manager.
 *  One table instead: a column per plan, each feature named once; what
 *  every plan shares is said once, as the section's subtitle (EVERY_PLAN). Tap a column to choose that plan
 *  (the page's sticky "Contact sales" uses it). */
function EnterpriseCompareTable({
  selectedTier,
  onSelectTier,
}: {
  selectedTier: string
  onSelectTier?: (tier: string) => void
}) {
  // Every plan's features come in the same order; the last row (account
  // manager) is shared, so it moves to the footnote.
  const rows = TIERS[0].features.filter((f) => f.bold).map((f) => f.label)
  // A unit said once in the row's name, not in every cell ("7 days" → "7").
  const unitOf = (label: string) => (/ days$/.test(TIERS[0].features.find((f) => f.label === label)?.bold ?? "") ? "days" : null)
  const value = (bold?: string) => bold?.replace(/ days$/, "")
  const cell = (name: string) =>
    cn("px-0.5 py-2.5 text-center transition-interactive", name === selectedTier && "bg-accent")
  return (
    <div className="flex flex-col gap-3">
      {/* The plan cards' surface: same shadow and 2px (transparent) edge. */}
      <div className="overflow-hidden rounded-card border-2 border-transparent bg-plan-card shadow-card">
        <table className="w-full table-fixed text-xs tabular-nums">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-24 px-3 py-2.5 text-left font-medium text-muted-foreground">
                Plan
              </th>
              {TIERS.map((tier) => {
                const on = tier.name === selectedTier
                return (
                  <th key={tier.name} scope="col" className={cell(tier.name)}>
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`${tier.name}, ${tier.price}`}
                      onClick={() => onSelectTier?.(tier.name)}
                      className="flex w-full cursor-pointer flex-col items-center gap-1"
                    >
                      {/* The chosen plan's tick, where the radio would be. */}
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full",
                          on ? "bg-cta-primary text-primary-foreground" : "border border-border"
                        )}
                      >
                        {on && <Check className="size-3" strokeWidth={3} />}
                      </span>
                      <span className={cn("font-semibold", on ? "text-checkout-primary" : "text-foreground")}>
                        {tier.name}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{lakh(tier.price)}</span>
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((label, r) => (
              <tr key={label} className={cn(r < rows.length - 1 && "border-b border-border")}>
                <th scope="row" className="px-3 py-2.5 text-left font-normal text-muted-foreground">
                  {label}
                  {unitOf(label) && <span className="block">({unitOf(label)})</span>}
                </th>
                {TIERS.map((tier) => (
                  <td key={tier.name} className={cn(cell(tier.name), "cursor-pointer text-foreground")} onClick={() => onSelectTier?.(tier.name)}>
                    {value(tier.features.find((f) => f.label === label)?.bold)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─────────────────────────────────── component ───────────────────────── */

interface EnterprisePricingTableProps {
  /**
   * Fired by every card's CTA with that card's tier name — self-checkout
   * opens the contact pop-up (form when logged out, confirmation when in).
   */
  onContactSales?: (tierName: string) => void
  /** Phones: the selected radio row (Starter by default). The page's sticky
   *  "Contact sales" CTA is the only CTA there. */
  selectedTier?: string
  onSelectTier?: (tierName: string) => void
  className?: string
}

/** The tier the phone list selects first. */
export const DEFAULT_ENTERPRISE_TIER = "Starter"

export function EnterprisePricingTable({
  onContactSales,
  selectedTier = DEFAULT_ENTERPRISE_TIER,
  onSelectTier,
  className,
}: EnterprisePricingTableProps) {
  const v3 = versionAtLeast(useCheckoutVersion(), "v3")
  return (
    <div
      data-slot="enterprise-pricing-table"
      className={cn("flex flex-col gap-5 max-md:gap-4", className)}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-h4 text-checkout-hero-fg">Enterprise plans</h2>
        <p className="text-sm text-checkout-hero-fg-secondary">
          {/* V3: what every plan shares, said once at the top (user call,
              2026-10-30), instead of the audience line. */}
          {v3 ? EVERY_PLAN : "For high-volume organisations that never stop hiring."}
        </p>
      </div>

      {/* Phones (< md): the Jobs / Database radio rows. Collapsed, a tier
          is its name, price and validity; the selected one reveals what it
          includes. The page's sticky CTA ("Contact sales") replaces the
          four per-card buttons. */}
      {v3 ? (
        <div className="md:hidden">
          <EnterpriseCompareTable selectedTier={selectedTier} onSelectTier={onSelectTier} />
        </div>
      ) : (
      <div className="flex flex-col gap-4 md:hidden">
        {TIERS.map((tier) => (
          <MobilePlanRow
            key={tier.name}
            title={tier.name}
            selected={selectedTier === tier.name}
            onSelect={() => onSelectTier?.(tier.name)}
            meta={<MobileMetaLine icon={<ClockFading aria-hidden />}>{tier.validity}</MobileMetaLine>}
            price={tier.price}
            details={
              <MobilePlanDetails
                items={tier.features.map((feature) => [
                  <Check key="i" className="text-checkout-primary" aria-hidden />,
                  <>
                    {feature.bold && <strong>{feature.bold} </strong>}
                    {feature.label}
                  </>,
                ])}
              />
            }
          />
        ))}
      </div>
      )}

      {/* Figma is one 1136px row of four. From md the cards pair up, and
          from lg they sit in one row. */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          // No recommended plan here, but the CTA rule holds: outline at
          // rest, green while its card is hovered (useCardHover).
          <CardHover key={tier.name}>
            {(active) => (
          <Card
            padding="sm"
            // The whole card is the click target (its button just bubbles
            // to it), so it lifts like every plan card (Card's onClick).
            onClick={() => onContactSales?.(tier.name)}
            className="flex-1 gap-5 border-transparent bg-plan-card"
          >
            <div className="flex flex-col gap-2">
              {/* The plan type scale, like every plan card: not CardTitle /
                  text-h3, which set Enterprise apart from the others. */}
              <p className="text-plan-name text-foreground">{tier.name}</p>
              <p className="text-plan-price text-foreground">{tier.price}</p>
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
                variant={active ? "checkout" : "outline"}
                className="h-10 w-full px-6"
              >
                Contact sales
              </Button>
            </div>
          </Card>
            )}
          </CardHover>
        ))}
      </div>

      <GstNote />
    </div>
  )
}

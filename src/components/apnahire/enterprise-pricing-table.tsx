"use client"

/**
 * EnterprisePricingTable — Enterprise tab body: a 5-tier feature comparison
 * table (Starter → Unlimited) with a full-width "Contact sales" CTA below.
 *
 * Figma: 92gU18d45olE04ATyhhVHD → 780:1628 (Pricing-Comparison-Card).
 *
 * The grid is the whole design here, so the measurements are deliberate:
 * a 208px feature column and five equal 155.2px tier columns separated by
 * 24px gutters, with a hairline running down the middle of every gutter.
 * Reproduced by giving the first column a 236px box (16px card padding +
 * 208 + half the gutter) and 12px side padding on the tier cells, so each
 * cell's left border lands exactly on the gutter's centre line. The rules
 * bleed past the card's padding to its edges, which is why the table is
 * pulled out with negative margins rather than sitting inside the padding.
 */

import * as React from "react"
import { Check } from "@apna/design-system"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@apna/design-system"
import { cn } from "@/lib/utils"

interface Tier {
  name: string
  price: string
}

const TIERS: Tier[] = [
  { name: "Starter", price: "₹1,00,000" },
  { name: "Growth", price: "₹1,75,000" },
  { name: "Scale", price: "₹5,00,000" },
  { name: "Expansion", price: "₹8,75,000" },
  { name: "Unlimited", price: "₹12,50,000" },
]

interface FeatureRow {
  label: string
  values: string[]
}

const FEATURES: FeatureRow[] = [
  { label: "Job Credits", values: ["75", "150", "450", "800", "1250"] },
  { label: "Database Unlocks", values: ["2,000", "3,000", "5,000", "10,000", "10,000"] },
  { label: "Whatsapp Reachout", values: ["1,500", "2,000", "5,000", "10,000", "10,000"] },
  { label: "Validity", values: ["360 Days", "360 Days", "360 Days", "360 Days", "360 Days"] },
  { label: "Employer Branding", values: ["7 Days", "30 Days", "60 Days", "120 Days", "120 Days"] },
  { label: "Recruiter logins", values: ["3", "5", "7", "9", "12"] },
  { label: "Key Account Manager", values: ["Yes", "Yes", "Yes", "Yes", "Yes"] },
]

interface EnterprisePricingTableProps {
  onContactSales?: () => void
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
      <div>
        <h2 className="text-xl font-semibold text-checkout-hero-fg">Hire anywhere in India</h2>
        <p className="mt-1 text-sm text-checkout-hero-fg-muted">
          For high-volume organisations that never stop hiring.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        {/* Pulled to the card's edges so every rule is full-bleed; the cells
            re-add the 16px inset themselves. The bottom border here is the
            rule under the last feature row. */}
        <div className="-mx-4 -mt-4 border-b border-border">
          <Table className="min-w-[900px] table-fixed"> {/* token-lint-ignore: scroll threshold for the 6-column table, not a spacing step */}
            <TableHeader className="bg-transparent">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto w-[236px] pt-4 pr-3 pb-5 pl-4 align-bottom text-xl font-semibold text-foreground"> {/* token-lint-ignore: Figma column geometry (16px inset + 208 col + half gutter); see file header */}
                  Features
                </TableHead>
                {TIERS.map((tier) => (
                  <TableHead
                    key={tier.name}
                    className="h-auto border-l border-border px-3 pt-4 pb-5 text-center align-bottom"
                  >
                    <span className="block text-base leading-5 font-semibold text-foreground">
                      {tier.name}
                    </span>
                    <span className="mt-1 block text-xl leading-6 font-semibold text-foreground">
                      {tier.price}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {FEATURES.map((row) => (
                <TableRow key={row.label} className="hover:bg-transparent">
                  <TableCell className="py-4 pr-3 pl-4">
                    <span className="flex items-center gap-3 text-sm font-semibold text-foreground">
                      <Check className="size-4 shrink-0 text-checkout-primary" aria-hidden />
                      {row.label}
                    </span>
                  </TableCell>
                  {row.values.map((value, i) => (
                    <TableCell
                      key={i}
                      className="border-l border-border px-3 py-4 text-center text-sm text-foreground"
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="pt-4">
          <Button
            type="button"
            className="h-auto w-full rounded-full bg-checkout-primary px-6 py-4 text-base font-semibold text-checkout-primary-foreground hover:bg-checkout-primary-hover"
            onClick={onContactSales}
          >
            Contact sales
          </Button>
        </div>
      </div>

      <p className="text-xs text-checkout-hero-fg-muted">* 18% GST will be added at checkout</p>
    </div>
  )
}

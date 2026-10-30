"use client"

/**
 * ContactSalesCard — the "Need a custom solution?" strip at the bottom of a
 * pricing tab.
 *
 * Every tab that draws it draws it identically (Jobs 1971:8766, Database
 * 899:1344, Subscription, Enterprise), so the measurements live here: 20px
 * padding, a 12px gap between the title and its line of copy, and a 40px
 * outline CTA. The whole card is the click target (the button bubbles to
 * it), so it lifts like the plan cards above it.
 */

import * as React from "react"
import { Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

interface ContactSalesCardProps {
  onContactSales?: () => void
  className?: string
}

export function ContactSalesCard({ onContactSales, className }: ContactSalesCardProps) {
  return (
    <div
      data-slot="contact-sales-card"
      onClick={onContactSales}
      className={cn(
        "card-hover-lift ink press-subtle cursor-pointer flex flex-col items-start justify-between gap-4 rounded-card border border-plan-card-line bg-plan-card p-5 sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-3">
        {/* Phones: the plan cards' name size ("Unlimited monthly plan"),
            user call 2026-10-30; desktop keeps the larger title. */}
        <h3 className="text-plan-name text-foreground md:text-xl md:font-semibold">Need a custom solution?</h3>
        <p className="text-sm text-muted-foreground">
          Tell us more about your hiring needs and our team will get in touch with you.
        </p>
      </div>
      {/* Phones: the small card CTA, as the Unlimited card's "Buy now"
          (standard sm, 14px sides). Desktop keeps the 40px button. */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0 px-3.5 md:h-10 md:min-h-10 md:px-6 md:text-sm"
      >
        Contact sales
      </Button>
    </div>
  )
}

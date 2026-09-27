"use client"

/**
 * ContactSalesCard — the "Need a custom solution?" strip at the bottom of a
 * pricing tab.
 *
 * Every tab that draws it draws it identically (Jobs 1971:8766, Database
 * 899:1344, Subscription, Enterprise), so the measurements live here: 20px
 * padding, a 12px gap between the title and its line of copy, and a 40px
 * outline CTA. No hover lift — the card is a container for the button, not
 * itself a target.
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
      className={cn(
        "flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-xl font-semibold text-foreground">Need a custom solution?</h3>
        <p className="text-sm text-muted-foreground">
          Tell us more about your hiring needs and our team will get in touch with you.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="h-10 shrink-0 px-6 font-semibold"
        onClick={onContactSales}
      >
        Contact sales
      </Button>
    </div>
  )
}

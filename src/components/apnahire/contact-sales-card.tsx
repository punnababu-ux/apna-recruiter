"use client"

/**
 * ContactSalesCard — "Need a custom solution?" strip shown at the bottom of
 * the Database, Subscription and Enterprise tabs (not Jobs — matches Figma,
 * which only places this card on those three tabs).
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
        "card-hover-lift flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center",
        className
      )}
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground">Need a custom solution?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us more about your hiring needs and our team will get in touch with you.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="shrink-0 font-semibold"
        onClick={onContactSales}
      >
        Contact sales
      </Button>
    </div>
  )
}

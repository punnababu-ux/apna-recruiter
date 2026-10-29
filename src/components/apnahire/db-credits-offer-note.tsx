"use client"

/**
 * DbCreditsOfferNote — "Limited time offer: Database credits", said once
 * beside the GST note instead of "· Limited time offer" on every job card.
 * "Database credits" is underlined dotted; a tap or click opens a popover
 * explaining the offer (a popover, not a tooltip, so it works on phones).
 */

import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@apna/design-system"
import { cn } from "@/lib/utils"

export function DbCreditsOfferNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-checkout-hero-fg-muted", className)}>
      Limited time offer:{" "}
      <Popover>
        <PopoverTrigger className="cursor-pointer underline decoration-dotted underline-offset-2">
          Database credits
        </PopoverTrigger>
        <PopoverContent side="top" className="w-64">
          <PopoverDescription>
            Free database credits come with every job for a limited time. Use them to find and contact
            candidates from apna&apos;s database.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </p>
  )
}

"use client"

/**
 * DbCreditsOfferNote — "Limited time offer: Database credits", said once
 * beside the GST note instead of "· Limited time offer" on every job card.
 * "Database credits" is underlined dotted; a tap or click opens the design
 * system's dark tooltip explaining the offer (TapTooltip).
 */

import { TapTooltip } from "@/components/apnahire/tap-tooltip"
import { cn } from "@/lib/utils"

export function DbCreditsOfferNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-checkout-hero-fg-muted", className)}>
      Limited time offer:{" "}
      <TapTooltip
        content="Each job gets free database credits for a limited time."
        className="underline decoration-dotted underline-offset-2"
      >
        Database credits
      </TapTooltip>
    </p>
  )
}

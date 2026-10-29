"use client"

/**
 * AiCallingAddonCard — the AI calling upsell in the express-checkout order
 * summary. It takes the slot that the database-credit upsell holds in
 * self-checkout.
 *
 * Layout (user call, 2026-10-27, replacing the proof tiles and full player):
 *
 *   AI wash   sparkle + headline · a check row (pickup · ready to
 *             interview · Hindi & English)
 *   Footer    compact demo pill (play / stop · Hindi / English) at the
 *             left · price + Add at the right
 *
 * The price block reads ₹1,699 / "for this job"; the CTA reads "Add". It is
 * never shown to a recruiter who holds an AI job (P+AI) credit.
 *
 * Composition only: Button from the design system, token gradients
 * (`bg-gradient-product-ai-calling`, the AI Calling Agent's own sky). No
 * palette of its own.
 */

import { Button, Check } from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"
import { AiDemoCall, AiSparkle } from "@/components/apnahire/ai-demo-call"
import { inr } from "@/lib/format"

export interface AiAddonOffer {
  /** Rupee price for this job. */
  price: number
}

export function AiCallingAddonCard({
  offer,
  onAdd,
}: {
  offer: AiAddonOffer
  onAdd: () => void
}) {
  return (
    <section data-slot="ai-calling-addon" data-product="ai-calling" className="bg-card p-4 shadow-card">
      {/* The ring sits on a wrapper: the card clips its corners, which would clip the glow. */}
      <div className="relative rounded-card-nested">
        <div className="overflow-hidden rounded-card-nested border border-border">
          <div className="flex flex-col gap-2 bg-gradient-product-ai-calling px-3 py-4">
            <div className="flex items-start gap-2">
              <AiSparkle className="size-5 shrink-0" />
              <p className="text-sm font-semibold text-foreground">{AI_CALLING_ADDON.headline}</p>
            </div>
            {/* Phones: one point per line, so a point that won't fit never
                leaves a half-empty first line. From sm they flow in a row. */}
            <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4">
              {AI_CALLING_ADDON.points.map((p) => (
                <li key={p} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Check className="size-3.5 shrink-0 text-checkout-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* One row at every width: demo left, price and CTA right. On a
              phone the price moves into the button ("Add · ₹1,699"), so the
              row fits from 320px. */}
          <div className="flex items-center justify-between gap-2 bg-card px-3 py-4 sm:gap-3">
            <AiDemoCall />
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-sm font-semibold whitespace-nowrap text-foreground">
                  {inr(offer.price)}
                </span>
                <span className="text-xs text-muted-foreground">
                  for this job
                </span>
              </div>
              {/* Dark gray, not green: "Proceed to pay" below is this screen's one
                  primary CTA (Button's one-primary rule). */}
              <Button type="button" variant="emphasis" className="px-3 sm:min-w-20 sm:px-4" onClick={onAdd}>
                <span className="whitespace-nowrap sm:hidden">Add · {inr(offer.price)}</span>
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Every time the order summary opens (user call, 2026-10-27): the
            drawer re-keys the card on each open, so the ring replays. */}
        <span aria-hidden className="attention-ring" />
      </div>
    </section>
  )
}

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
 * The price block has two states, depending on the recruiter's AI calling
 * balance:
 *   no credit   ₹1,699 / "for this job"         (paid add-on)
 *   ≥1 credit   "1 AI calling credit" / "Available" (spends the credit)
 * Either way the CTA reads "Add". The parent decides what
 * the resulting cart line costs.
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
  /** Rupee price when no AI calling credit is available. */
  price: number
  /** AI calling credits in the recruiter's balance. One covers this job. */
  creditsAvailable: number
}

export function AiCallingAddonCard({
  offer,
  onAdd,
}: {
  offer: AiAddonOffer
  onAdd: () => void
}) {
  const useCredit = offer.creditsAvailable > 0

  return (
    <section data-slot="ai-calling-addon" data-product="ai-calling" className="bg-card p-4 shadow-card">
      {/* The ring sits on a wrapper: the card clips its corners, which would clip the glow. */}
      <div className="relative rounded-card-nested">
        <div className="overflow-hidden rounded-card-nested border border-border">
          <div className="flex flex-col gap-2 bg-gradient-product-ai-calling p-4">
            <div className="flex items-start gap-2">
              <AiSparkle className="size-5 shrink-0" />
              <p className="text-sm font-semibold text-foreground">{AI_CALLING_ADDON.headline}</p>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {AI_CALLING_ADDON.points.map((p) => (
                <li key={p} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Check className="size-3.5 shrink-0 text-checkout-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Demo at the left; price and CTA grouped at the right. On a
              phone the demo takes its own line above them. */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-4">
            <AiDemoCall />
            <div className="ml-auto flex shrink-0 items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold whitespace-nowrap text-foreground">
                  {useCredit ? "1 AI calling credit" : inr(offer.price)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {useCredit ? "Available" : "for this job"}
                </span>
              </div>
              {/* Dark gray, not green: "Proceed to pay" below is this screen's one
                  primary CTA (Button's one-primary rule). */}
              <Button type="button" variant="emphasis" className="min-w-20" onClick={onAdd}>
                Add
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

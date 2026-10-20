"use client"

/**
 * AiCallingAddonCard — the AI calling upsell in the express-checkout order
 * summary. It takes the slot that the database-credit upsell holds in
 * self-checkout.
 *
 * Everything a recruiter needs to decide is on the card, with nothing to
 * open (user call, 2026-10-20 — it replaced a "How it works" pop-up):
 *
 *   AI wash   headline, the sparkle in its top-right corner · one line on
 *             what the agent does · two proof tiles (30% higher call
 *             pickup · ready to interview) · the demo call strip
 *             ("Demo call" · Hindi / English · player)
 *   Footer    price block at the far left · Add CTA at the far right
 *
 * The price block has two states, depending on the recruiter's AI calling
 * balance:
 *   no credit   ₹1,699 / "for this job"         (paid add-on)
 *   ≥1 credit   "1 AI calling credit" / "Available" (spends the credit)
 * Either way the CTA reads "Add AI calling agent". The parent decides what
 * the resulting cart line costs.
 *
 * Composition only: Button from the design system, token gradients
 * (`bg-gradient-product-ai-calling`, the AI Calling Agent's own sky, as on
 * its product page; the demo strip's `bg-gradient-ai-demo-strong`). No
 * palette of its own.
 */

import { Button } from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"
import { AiDemoCall, AiSparkle } from "@/components/apnahire/ai-demo-call"
import { inr } from "@/lib/format"
import { useAttentionRing } from "@/components/apnahire/use-attention-ring"

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
  const ring = useAttentionRing("ai-calling")

  return (
    <section data-slot="ai-calling-addon" data-product="ai-calling" className="bg-card p-4 shadow-card">
      {/* The ring sits on a wrapper: the card clips its corners, which would clip the glow. */}
      <div className="relative rounded-card-nested">
        <div className="overflow-hidden rounded-card-nested border border-border">
          <div className="flex flex-col gap-4 bg-gradient-product-ai-calling p-4">
            <div className="flex flex-col gap-1.5">
              {/* Text starts at the card's edge; the sparkle sits in the
                  top-right corner, so the lines read cleanly from the left. */}
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{AI_CALLING_ADDON.headline}</p>
                <AiSparkle className="size-5 shrink-0" />
              </div>
              <p className="text-xs text-pretty text-muted-foreground">{AI_CALLING_ADDON.cardLine}</p>
            </div>
            {/* Proof at a glance: equal cells, the value over its label. */}
            <ul className="grid grid-cols-2 gap-2">
              {AI_CALLING_ADDON.proof.map((p) => (
                <li key={p.label} className="flex flex-col gap-0.5 rounded-xl bg-surface-glass p-2.5">
                  <span className="text-base leading-5 font-bold text-checkout-primary">{p.value}</span>
                  <span className="text-2xs leading-4 text-muted-foreground">{p.label}</span>
                </li>
              ))}
            </ul>
            <AiDemoCall />
          </div>

          {/* Price at the far left, the CTA opposite: one row on every
              screen, so nothing wraps under anything else. */}
          <div className="flex items-center justify-between gap-3 bg-card p-4">
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-semibold whitespace-nowrap text-foreground">
                {useCredit ? "1 AI calling credit" : inr(offer.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                {useCredit ? "Available" : "for this job"}
              </span>
            </div>
            {/* Dark gray, not green: "Proceed to pay" below is this screen's one
                primary CTA (Button's one-primary rule). */}
            <Button type="button" variant="emphasis" size="sm" className="shrink-0" onClick={onAdd}>
              Add AI calling agent
            </Button>
          </div>
        </div>
        {ring && <span aria-hidden className="attention-ring" />}
      </div>
    </section>
  )
}

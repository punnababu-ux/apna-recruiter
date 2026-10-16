"use client"

/**
 * AiCallingAddonCard — the AI calling upsell in the express-checkout order
 * summary. It takes the slot that the database-credit upsell holds in
 * self-checkout.
 *
 * Structure:
 *   AI wash   sparkle + headline (wraps to 2–3 lines as needed) · "How it
 *             works" (explainer dialog) opposite it, then three benefit ticks
 *   Footer    price block at the far left · Add CTA at the far right
 *
 * The price block has two states, depending on the recruiter's AI calling
 * balance:
 *   no credit   ₹1,600 / "for this job"         (paid add-on)
 *   ≥1 credit   "1 AI calling credit" / "Available" (spends the credit)
 * Either way the CTA reads "Add AI calling agent". The parent decides what
 * the resulting cart line costs.
 *
 * "How it works" opens AiCallingExplainer, whose CTA adds the same add-on.
 *
 * Composition only: Button from the design system, a token gradient
 * (`bg-gradient-ai-subtle`). No palette of its own.
 */

import * as React from "react"
import { Button, Check, Play } from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"
import { AiCallingExplainer, AiSparkle } from "@/components/apnahire/ai-calling-explainer"

export interface AiAddonOffer {
  /** Rupee price when no AI calling credit is available. */
  price: number
  /** AI calling credits in the recruiter's balance. One covers this job. */
  creditsAvailable: number
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

export function AiCallingAddonCard({
  offer,
  onAdd,
}: {
  offer: AiAddonOffer
  onAdd: () => void
}) {
  const [explainerOpen, setExplainerOpen] = React.useState(false)
  const useCredit = offer.creditsAvailable > 0

  return (
    <section data-slot="ai-calling-addon" className="bg-card p-4 shadow-card">
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="flex flex-col gap-3 bg-gradient-ai-subtle p-4">
          {/* The headline gives: it wraps to two or three lines while
              "How it works" keeps its width opposite, on every screen. */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2">
              <AiSparkle className="mt-0.5 size-5 shrink-0" />
              <p className="text-sm font-semibold text-foreground">{AI_CALLING_ADDON.headline}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              leadingIcon={<Play className="fill-current" />}
              onClick={() => setExplainerOpen(true)}
            >
              How it works
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {AI_CALLING_ADDON.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
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

      <AiCallingExplainer
        open={explainerOpen}
        onOpenChange={setExplainerOpen}
        ctaLabel={`Add AI calling · ${useCredit ? "1 credit" : inr(offer.price)}`}
        onCta={onAdd}
      />
    </section>
  )
}

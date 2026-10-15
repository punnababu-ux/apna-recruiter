"use client"

/**
 * AiCallingAddonCard — the AI calling upsell in the express-checkout order
 * summary. It takes the slot that the database-credit upsell holds in
 * self-checkout.
 *
 * Structure (from the design reference):
 *   AI wash   sparkle + headline, then three benefit ticks
 *   Footer    "How it works" (explainer dialog) · price block · Add CTA
 *
 * The price block has two states, depending on the recruiter's AI calling
 * balance:
 *   no credit   ₹1,600 / "for this job"         (paid add-on)
 *   ≥1 credit   "1 AI calling credit" / "Available" (spends the credit)
 * Either way the CTA reads "Add AI calling agent". The parent decides what
 * the resulting cart line costs.
 *
 * Composition only: Button + Dialog from the design system, a token gradient
 * (`bg-gradient-ai-subtle`). No palette of its own.
 */

import * as React from "react"
import {
  Button,
  Check,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Play,
  Sparkles,
} from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"

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
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-checkout-info" aria-hidden />
            <p className="text-sm font-semibold text-foreground">{AI_CALLING_ADDON.headline}</p>
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

        {/* Wraps on a narrow drawer: "How it works" stays left, and the
            price + CTA pair drops to its own right-aligned row. */}
        <div className="flex flex-wrap items-center gap-3 bg-card p-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leadingIcon={<Play className="fill-current" />}
            onClick={() => setExplainerOpen(true)}
          >
            How it works
          </Button>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex flex-col items-end text-right">
              <span className="text-sm font-semibold text-foreground">
                {useCredit ? "1 AI calling credit" : inr(offer.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                {useCredit ? "Available" : "for this job"}
              </span>
            </div>
            {/* Dark gray, not green: "Proceed to pay" below is this screen's one
                primary CTA (Button's one-primary rule). */}
            <Button type="button" variant="emphasis" size="sm" onClick={onAdd}>
              Add AI calling agent
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={explainerOpen} onOpenChange={setExplainerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How AI calling works</DialogTitle>
            <DialogDescription>
              An AI agent screens applicants for this job, so you only talk to the right ones.
            </DialogDescription>
          </DialogHeader>
          <ol className="flex flex-col gap-3">
            {AI_CALLING_ADDON.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </section>
  )
}

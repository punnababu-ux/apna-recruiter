"use client"

/**
 * TestimonialGrid — 3 quote cards shown between the FAQ and trust sections.
 *
 * Sits directly on the page's ambient gradient (Figma gives this band no
 * background of its own, unlike the white FAQ/trust bands around it), so
 * the cards are plain white with no border.
 *
 * Figma repeated one placeholder quote three times; these are the real
 * ones from the homepage. No lift on hover: the cards aren't clickable.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { HOME_PROOF } from "@/content/home"

// The homepage's real customer quotes (content/home.ts HOME_PROOF), so
// pricing and home tell the same story.
const TESTIMONIALS = HOME_PROOF.testimonials.items

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)

export function TestimonialGrid({ className }: { className?: string }) {
  return (
    <div
      data-slot="testimonial-grid"
      className={cn("grid grid-cols-1 gap-6 py-12 lg:grid-cols-3", className)}
    >
      {TESTIMONIALS.map((t) => (
        <div key={t.name} className="flex flex-col gap-6 rounded-card bg-card p-8">
          <p className="text-quote text-foreground">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-auto flex items-center gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-checkout-avatar text-sm font-bold text-white">
              {initials(t.name)}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-foreground">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

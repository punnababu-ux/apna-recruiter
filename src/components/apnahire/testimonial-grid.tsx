"use client"

/**
 * TestimonialGrid — 3 quote cards shown between the FAQ and trust sections.
 *
 * Sits directly on the page's ambient gradient (Figma gives this band no
 * background of its own, unlike the white FAQ/trust bands around it), so
 * the cards are plain white with no border.
 *
 * Figma repeats the same placeholder quote/person across all 3, varying
 * only the client logo — kept as-is rather than inventing copy.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

const QUOTE =
  "We replaced four hiring tools with one hiring pass. Time-to-shortlist dropped from 8 days to under 36 hours, and our recruiter spend halved."

const TESTIMONIALS = [
  { company: "Paytm", logo: "/logos/paytm.svg", width: 116, name: "Priya R.", role: "Head of Talent · Logistics Co." },
  { company: "Tech Mahindra", logo: "/logos/tech-mahindra.svg", width: 131, name: "Priya R.", role: "Head of Talent · Logistics Co." },
  { company: "HDFC Bank", logo: "/logos/hdfc-bank.svg", width: 208, name: "Priya R.", role: "Head of Talent · Logistics Co." },
]

export function TestimonialGrid({ className }: { className?: string }) {
  return (
    <div
      data-slot="testimonial-grid"
      className={cn("grid grid-cols-1 gap-6 py-12 lg:grid-cols-3", className)}
    >
      {TESTIMONIALS.map((t) => (
        <div key={t.company} className="card-hover-lift flex flex-col gap-6 rounded-xl bg-card p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.logo}
            alt={t.company}
            height={36}
            width={t.width}
            className="h-9 w-auto self-start object-contain"
          />
          <p className="font-serif text-2xl leading-8 text-foreground">{QUOTE}</p>
          <div className="flex items-center gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-checkout-avatar text-sm font-bold text-white">
              PR
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

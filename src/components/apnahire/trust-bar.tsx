"use client"

/**
 * TrustBar — "Trusted by 1000+ enterprises and 7 lakh+ MSMEs" (the live site's line): a full-colour client
 * logo strip + 4 stat tiles, shown at the bottom of every pricing tab.
 *
 * Logos are the design's own exported assets (public/logos/*), rendered at
 * their designed 36px height with widths left to each asset's own aspect
 * ratio. Composes `LogoWall` and `StatGrid` — this file was
 * where both were hand-rolled before they were promoted to the design system;
 * it keeps only the content (which clients, which numbers).
 */

import * as React from "react"
import { LogoWall } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { StatGrid } from "@/components/marketing/page-blocks"
import { TestimonialGrid } from "@/components/apnahire/testimonial-grid"

interface ClientLogo {
  name: string
  src: string
  /** Designed width at 36px height, from Figma. */
  width: number
}

const CLIENTS: ClientLogo[] = [
  { name: "Paytm", src: "/logos/paytm.svg", width: 116 },
  { name: "Jio", src: "/logos/jio.svg", width: 36 },
  { name: "Axis Bank", src: "/logos/axis-bank.svg", width: 152 },
  { name: "Aditya Birla Capital", src: "/logos/aditya-birla-capital.png", width: 136 },
  { name: "Tech Mahindra", src: "/logos/tech-mahindra.svg", width: 131 },
  { name: "Bajaj Allianz", src: "/logos/bajaj-allianz.png", width: 92 },
  { name: "Flipkart", src: "/logos/flipkart.svg", width: 137 },
  { name: "BigBasket", src: "/logos/bigbasket.png", width: 120 },
  { name: "HDFC Bank", src: "/logos/hdfc-bank.svg", width: 208 },
  { name: "Swiggy", src: "/logos/swiggy.svg", width: 121 },
  { name: "Uber", src: "/logos/uber.svg", width: 104 },
  { name: "Urban Company", src: "/logos/urban-company.png", width: 128 },
  { name: "Zomato", src: "/logos/zomato.svg", width: 168 },
]

const CLIENT_LOGO_ITEMS = CLIENTS.map((client) => ({
  name: client.name,
  logo: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={client.src} alt={client.name} height={36} width={client.width} />
  ),
}))

// Same numbers and format as the homepage (6 Cr+, 7 L+, 7,200+).
const STATS = [
  { value: "6 Cr+", label: "Candidates use apna" },
  { value: "2 L+", label: "New candidates every month" },
  { value: "7 L+", label: "Employers already at apna" },
  { value: "7,200+", label: "Towns & cities covered" },
]

export function TrustBar({ className }: { className?: string }) {
  return (
    <div data-slot="trust-bar" className={cn("flex flex-col gap-15 py-12", className)}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-h3 font-heading font-semibold text-foreground [[data-voice=editorial]_&]:font-editorial">
            Trusted by 1000+ enterprises and 7 lakh+ MSMEs for hiring
          </h2>
        </div>

        <LogoWall items={CLIENT_LOGO_ITEMS} />
      </div>

      {/* The proof, in one band: the numbers (StatGrid, as on home and
          About), then the customers' own words. */}
      <div className="flex flex-col gap-6">
        <StatGrid stats={STATS} />
        <TestimonialGrid />
      </div>
    </div>
  )
}

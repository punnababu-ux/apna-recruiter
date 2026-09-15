"use client"

/**
 * TrustBar — "Trusted by companies from all sizes": a full-colour client
 * logo strip + 4 stat tiles, shown at the bottom of every pricing tab.
 *
 * Logos are the design's own exported assets (public/logos/*), rendered at
 * their designed 36px height with widths left to each asset's own aspect
 * ratio. The strip is wider than the content column in Figma too, so it
 * scrolls horizontally rather than wrapping or being squeezed.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

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

const STATS = [
  { value: "6 crore+", label: "Candidates use apna" },
  { value: "5 lakhs+", label: "New candidates every month" },
  { value: "7 lakhs+", label: "Employers already at apna" },
  { value: "1000+", label: "Available cities & Metros" },
]

export function TrustBar({ className }: { className?: string }) {
  return (
    <div data-slot="trust-bar" className={cn("flex flex-col gap-15 py-12", className)}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-h3 font-heading font-semibold text-foreground">
            Trusted by companies from all sizes
          </h2>
          <p className="text-sm text-muted-foreground">
            Businesses across industries and around the India have built better customer
            relationships with apna.
          </p>
        </div>

        {/* Wider than the column by design — scrolls instead of squeezing. */}
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max items-center gap-14">
            {CLIENTS.map((client) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={client.name}
                src={client.src}
                alt={client.name}
                height={36}
                width={client.width}
                className="h-9 w-auto shrink-0 object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="card-hover-lift flex flex-col gap-2 rounded-xl bg-muted px-6 py-9 hover:bg-card"
          >
            <p className="text-h3 font-heading font-semibold text-foreground">{stat.value}</p>
            <p className="text-base text-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

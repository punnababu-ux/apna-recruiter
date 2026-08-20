"use client"

/**
 * UnlimitedBanner — Dark near-black promotional card for apna Unlimited.
 *
 * Matches the Figma dark card with gradient-glow background.
 * Uses bg-foreground (near-black) as the surface, text-background for all text.
 */

import * as React from "react"
import { ArrowRight, Briefcase, Database } from "lucide-react"
import { Badge, Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

interface UnlimitedBannerProps {
  price?: number
  planLabel?: string
  onBuyNow?: () => void
  className?: string
}

export function UnlimitedBanner({
  price = 5999,
  planLabel = "3 months plan",
  onBuyNow,
  className,
}: UnlimitedBannerProps) {
  return (
    <div
      data-slot="unlimited-banner"
      className={cn(
        "relative flex flex-col items-start gap-4 overflow-hidden rounded-xl bg-foreground p-6 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {/* Decorative glow — bottom-left teal */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-success/20 blur-3xl"
      />
      {/* Decorative glow — top-right gold */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-48 rounded-full bg-highlight/15 blur-3xl"
      />

      {/* Left: Wordmark + badge + features */}
      <div className="relative flex flex-col gap-3">
        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-highlight">
            apna
          </span>
          <span className="font-heading text-xl font-bold text-background">
            ∞ Unlimited
          </span>
          <Badge variant="secondary" className="ml-1 text-2xs">
            Subscription
          </Badge>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5 text-sm text-background/80">
            <Briefcase className="size-4 shrink-0 text-background/60" aria-hidden />
            Unlimited job roles &amp; reposts
          </span>
          <span className="flex items-center gap-1.5 text-sm text-background/80">
            <Database className="size-4 shrink-0 text-background/60" aria-hidden />
            200 database unlocks/month
          </span>
        </div>
      </div>

      {/* Right: Price + CTA */}
      <div className="relative flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
        <div className="text-right">
          <p className="text-2xl font-bold text-background">
            ₹{price.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-background/60">{planLabel}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="shrink-0 gap-1.5 font-semibold"
          onClick={onBuyNow}
        >
          Buy now
          <ArrowRight className="size-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

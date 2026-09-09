"use client"

/**
 * PricingHero — hero for the pricing / credits page.
 *
 * Hero: title + 4-tab responsive switcher (no subtitle — matches source),
 * rendered directly on the shared `bg-gradient-checkout-hero` ambient-mesh
 * backdrop (the parent page paints the gradient so it extends behind the
 * plan cards below, matching the finalized self-checkout designs — the
 * gradient isn't hero-only).
 *
 * The tab switcher itself is `SegmentedTabSwitcher` (design system) —
 * colours here are overridden to the fixed `checkout-hero-fg`/
 * `checkout-primary` roles (not the theme-flipping `foreground`/
 * `text-primary` defaults) since this surface stays light even when the
 * app is in dark mode — see semantic.css.
 */

import * as React from "react"
import {
  Briefcase,
  Building2,
  Database,
  InfinityIcon,
  SegmentedTabSwitcher,
  type SegmentedTabItem,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export type PricingTab = "jobs" | "database" | "unlimited" | "enterprise"

const TABS: SegmentedTabItem<PricingTab>[] = [
  {
    value: "jobs",
    label: "Jobs",
    description: "Post any job type with credits",
    icon: <Briefcase className="size-4 shrink-0" aria-hidden />,
  },
  {
    value: "database",
    label: "Database",
    description: "Unlock profiles from 5 Cr+ candidates",
    icon: <Database className="size-4 shrink-0" aria-hidden />,
  },
  {
    value: "unlimited",
    label: "Unlimited",
    description: "Unlimited job roles & reposts",
    icon: <InfinityIcon className="size-4 shrink-0" aria-hidden />,
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Pan-India hiring solutions",
    icon: <Building2 className="size-4 shrink-0" aria-hidden />,
  },
]

interface PricingHeroProps {
  activeTab: PricingTab
  onTabChange: (tab: PricingTab) => void
  className?: string
}

export function PricingHero({
  activeTab,
  onTabChange,
  className,
}: PricingHeroProps) {
  return (
    <section
      data-slot="pricing-hero"
      className={cn(
        "relative flex flex-col items-center gap-8 px-4 pb-8 pt-10 sm:px-10 sm:pt-14",
        className
      )}
    >
      {/* Heading — source has no subtitle under the H1 */}
      <h1 className="text-h1 font-heading font-bold text-checkout-hero-fg text-center">
        Everything you need to hire
      </h1>

      <SegmentedTabSwitcher
        className="max-w-6xl"
        items={TABS}
        value={activeTab}
        onValueChange={onTabChange}
        trackClassName="bg-checkout-track"
        activeClassName="text-checkout-hero-fg"
        mobileActiveClassName="text-checkout-primary"
        inactiveClassName="text-checkout-hero-fg-muted"
        mutedClassName="text-checkout-hero-fg-muted"
      />
    </section>
  )
}

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
  InfinityIcon,
  Search,
  SegmentedTabSwitcher,
  type SegmentedTabItem,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export type PricingTab = "jobs" | "database" | "unlimited" | "enterprise"

/** Icons carry no size class — every consumer (the hero switcher, the two
 *  compact scrolled bars) sets its own glyph size, and Figma uses a
 *  different one in each. */
export const PRICING_TABS: SegmentedTabItem<PricingTab>[] = [
  {
    value: "jobs",
    label: "Jobs",
    description: "Post any job type with credits",
    icon: <Briefcase className="shrink-0" aria-hidden />,
  },
  {
    value: "database",
    label: "Database",
    description: "Search & hire from 6 Cr+ candidates",
    icon: <Search className="shrink-0" aria-hidden />,
  },
  {
    value: "unlimited",
    label: "Subscription",
    description: "Unlimited hiring for 3 months",
    icon: <InfinityIcon className="shrink-0" aria-hidden />,
  },
  {
    value: "enterprise",
    label: "Enterprise plans",
    description: "Custom plans for bulk hiring",
    icon: <Building2 className="shrink-0" aria-hidden />,
  },
]

/**
 * Labels used by the two *compact* (scrolled, icon + word) tab bars — the
 * logged-in header's inline switcher and the logged-out sticky sub-nav.
 * Figma shortens two of them there so all four fit on one row.
 */
export const PRICING_TAB_SHORT_LABELS: Record<PricingTab, string> = {
  jobs: "Jobs",
  database: "Database",
  unlimited: "Unlimited",
  enterprise: "Enterprise",
}

interface PricingHeroProps {
  activeTab: PricingTab
  onTabChange: (tab: PricingTab) => void
  className?: string
  /** Attached to the tab switcher's wrapper so the page can observe when it
   *  scrolls out of view and fade in the header's compact switcher. */
  tabsRef?: React.Ref<HTMLDivElement>
}

export function PricingHero({
  activeTab,
  onTabChange,
  className,
  tabsRef,
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

      {/* Plain block wrapper (not `display: contents`) — needed so
          `tabsRef`'s bounding box is measurable by the page's
          IntersectionObserver; `contents` would collapse it to zero size. */}
      <div ref={tabsRef} className="w-full max-w-6xl">
        <SegmentedTabSwitcher
          className="max-w-6xl"
          items={PRICING_TABS}
          value={activeTab}
          onValueChange={onTabChange}
          trackClassName="bg-checkout-track"
          activeClassName="text-checkout-primary"
          mobileActiveClassName="text-checkout-primary"
          inactiveClassName="text-checkout-hero-fg-muted"
          mutedClassName="text-checkout-hero-fg-muted"
        />
      </div>
    </section>
  )
}

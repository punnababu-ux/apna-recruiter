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
  SegmentedTabSwitcher,
  UserSearch,
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
    description: "Post a job to attract candidates",
    icon: <Briefcase className="shrink-0" aria-hidden />,
  },
  {
    value: "database",
    label: "Database",
    description: "Search & hire from 6 Cr+ candidates",
    // Figma draws Material `data_loss_prevention` — a head and shoulders
    // inside a magnifier lens. `UserSearch` is the nearest lucide glyph;
    // plain `Search` loses the "candidate" half of the meaning.
    icon: <UserSearch className="shrink-0" aria-hidden />,
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
        // Same gutter as the page header and the tab bodies below, so the
        // left-aligned H1, the tab track, the back arrow and the body cards
        // all land on one column. Top padding is Figma's 112px less the
        // 64px header, which is in-flow here rather than overlaid.
        "relative flex flex-col items-center px-4 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12",
        className
      )}
    >
      <div className="flex w-full max-w-6xl flex-col gap-8">
        {/* Heading — source has no subtitle under the H1. `text-h1` already
            carries font-heading and bold. */}
        <h1 className="text-h1 text-checkout-hero-fg">Everything you need to hire</h1>

        {/* Plain block wrapper (not `display: contents`) — needed so
            `tabsRef`'s bounding box is measurable by the page's
            IntersectionObserver; `contents` would collapse it to zero size. */}
        <div ref={tabsRef} className="w-full">
          <SegmentedTabSwitcher
            items={PRICING_TABS}
            value={activeTab}
            onValueChange={onTabChange}
            trackClassName="bg-checkout-track"
            activeClassName="text-checkout-primary"
            mobileActiveClassName="text-checkout-primary"
            inactiveClassName="text-checkout-hero-fg-secondary"
            mutedClassName="text-checkout-hero-fg-secondary"
            // Figma's active pill has a 1px INSIDE stroke and no shadow. An
            // inset ring reproduces that without growing the pill — a real
            // border would add 2px to every chip and so to the whole track.
            activeItemClassName="bg-card inset-ring-1 inset-ring-border shadow-none"
            // The carousel's full-bleed trick has to cancel THIS section's
            // gutter, not the primitive's default one.
            mobileBleedClassName="-mx-4 sm:-mx-8"
            mobileGutterClassName="px-4 sm:px-8"
          />
        </div>
      </div>
    </section>
  )
}

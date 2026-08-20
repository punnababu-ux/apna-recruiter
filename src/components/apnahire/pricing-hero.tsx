"use client"

/**
 * PricingHero — Full-bleed dark-navy hero for the pricing / credits page.
 *
 * Hero: title + subtitle + 4-tab pill selector.
 * Active tab: white frosted card.  Inactive tabs: ghost (transparent + white text).
 *
 * Uses bg-surface-inverted (--color-apna-navy-900) as background.
 */

import * as React from "react"
import {
  Briefcase,
  Building2,
  Database,
  Infinity as InfinityIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type PricingTab = "jobs" | "database" | "unlimited" | "enterprise"

interface Tab {
  id: PricingTab
  label: string
  sub: string
  Icon: React.ElementType
}

const TABS: Tab[] = [
  {
    id: "jobs",
    label: "Jobs",
    sub: "Post any job type with credits",
    Icon: Briefcase,
  },
  {
    id: "database",
    label: "Database",
    sub: "Unlock profiles from 5 Cr+ candidates",
    Icon: Database,
  },
  {
    id: "unlimited",
    label: "Unlimited",
    sub: "Unlimited job roles & reposts",
    Icon: InfinityIcon,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    sub: "Pan-India hiring solutions",
    Icon: Building2,
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
        "relative flex flex-col items-center gap-8 overflow-hidden bg-surface-inverted px-4 pb-8 pt-10 sm:px-10 sm:pt-14",
        className
      )}
    >
      {/* Decorative radial glow — top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-surface-inverted-fg/5 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,white,transparent)]"
      />

      {/* Heading */}
      <div className="relative flex flex-col items-center gap-3 text-center">
        <h1 className="text-h1 font-heading font-bold text-surface-inverted-fg">
          Everything you need to hire
        </h1>
        <p className="max-w-2xl text-body text-surface-inverted-fg/75">
          Four ways to buy on apna — post jobs, unlock candidate profiles,
          subscribe for all-year hiring, or talk to us for pan-India hiring.
        </p>
      </div>

      {/* Tab pill selector */}
      <div className="relative flex items-center gap-2 rounded-full bg-surface-inverted-fg/10 p-2">
        {TABS.map(({ id, label, sub, Icon }) => {
          const isActive = id === activeTab
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              aria-pressed={isActive}
              className={cn(
                "flex flex-col items-start gap-1 rounded-full px-5 py-3 text-left transition-all duration-200",
                isActive
                  ? "bg-card shadow-sm"
                  : "hover:bg-surface-inverted-fg/10"
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold",
                  isActive ? "text-info" : "text-surface-inverted-fg/80"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </span>
              <span
                className={cn(
                  "text-xs leading-tight",
                  isActive
                    ? "text-foreground/70"
                    : "text-surface-inverted-fg/55"
                )}
              >
                {sub}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

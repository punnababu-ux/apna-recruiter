"use client"

/**
 * MarketingHeader — the public (logged-out) chrome for the self-checkout
 * page, i.e. what the same surface looks like as apna's public pricing
 * page. Figma: 92gU18d45olE04ATyhhVHD → 881:11747 (rest) / 881:12272 +
 * 881:12312 (scrolled).
 *
 * Two stacked bars:
 *
 *  1. The marketing nav (h-16) — apna logo, section links with `Pricing`
 *     marked current, and the Contact us / Login+sign up CTAs. Transparent
 *     over the hero gradient at rest, solid white once the page scrolls,
 *     exactly like the logged-in header so the two states feel like one
 *     page in two auth modes.
 *
 *  2. A full-width sticky sub-nav (h-16, `top-16`) carrying the compact tab
 *     switcher. Logged-in puts those chips *inside* its single bar; logged
 *     out the bar is already full of marketing links, so Figma gives the
 *     chips their own band that slides down from under the nav once the
 *     hero's full-size switcher scrolls away.
 */

import * as React from "react"
import {
  ApnaLogo,
  ArrowUpRight,
  Button,
  ChevronDown,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import {
  PRICING_TABS,
  PRICING_TAB_SHORT_LABELS,
  type PricingTab,
} from "@/components/apnahire/pricing-hero"

interface NavLink {
  label: string
  /** Renders a ▾ affordance — the menu itself is out of scope for this page. */
  hasMenu?: boolean
  /** Renders an ↗ affordance for links that leave the recruiter site. */
  external?: boolean
  /** The section this page belongs to — underlined + green. */
  current?: boolean
}

const NAV_LINKS: NavLink[] = [
  { label: "Product", hasMenu: true },
  { label: "Enterprise" },
  { label: "Blogs" },
  { label: "Pricing", current: true },
  { label: "Looking for a job?", external: true },
]

interface MarketingHeaderProps {
  activeTab: PricingTab
  onTabChange: (tab: PricingTab) => void
  /** Page has scrolled past the top — turns the nav solid. */
  isScrolled: boolean
  /** Hero's own tab switcher is out of view — reveals the sub-nav. */
  showCompactTabs: boolean
  onLogin?: () => void
  onContactUs?: () => void
}

export function MarketingHeader({
  activeTab,
  onTabChange,
  isScrolled,
  showCompactTabs,
  onLogin,
  onContactUs,
}: MarketingHeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      {/* ── Bar 1: marketing nav ── */}
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-12 border-b px-4 transition-[background-color,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 lg:px-12",
          isScrolled
            ? "border-border bg-card shadow-sm"
            : "border-transparent bg-transparent shadow-none"
        )}
      >
        <div className="flex items-center gap-4 lg:gap-9">
          <a href="/apnahire/pricing" aria-label="apna home" className="shrink-0">
            <ApnaLogo className="size-10" />
          </a>

          {/* Links collapse below lg — the CTAs are what matter on small
              screens, and Figma has no logged-out mobile nav for this page. */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                aria-current={link.current ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 self-stretch px-3 py-1.5 text-sm font-semibold transition-colors",
                  link.current
                    ? "border-b-2 border-checkout-primary text-checkout-primary"
                    : "rounded-full text-checkout-hero-fg hover:bg-checkout-track"
                )}
              >
                {link.label}
                {link.hasMenu && <ChevronDown className="size-5" aria-hidden />}
                {link.external && <ArrowUpRight className="size-5" aria-hidden />}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full font-semibold"
            onClick={onContactUs}
          >
            Contact us
          </Button>
          <Button
            type="button"
            size="sm"
            className="rounded-full bg-checkout-primary font-semibold text-checkout-primary-foreground hover:bg-checkout-primary-hover"
            onClick={onLogin}
          >
            Login/sign up
          </Button>
        </div>
      </div>

      {/* ── Bar 2: sticky sub-nav with the compact tab switcher ──
           Kept mounted (not conditionally rendered) so the slide-down can
           animate; `-translate-y-full` tucks it behind bar 1, which paints
           over it once solid. */}
      <div
        aria-hidden={!showCompactTabs}
        className={cn(
          "absolute inset-x-0 top-full -z-10 hidden h-16 items-center justify-center bg-card px-4 shadow-sm transition-[opacity,translate] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:flex",
          showCompactTabs
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-checkout-track p-1">
          {PRICING_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              tabIndex={showCompactTabs ? undefined : -1}
              onClick={() => onTabChange(tab.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors [&_svg]:size-5",
                activeTab === tab.value
                  ? "bg-card text-checkout-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon}
              {PRICING_TAB_SHORT_LABELS[tab.value]}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

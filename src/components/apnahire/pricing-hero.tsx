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
 * The tab switcher itself is `SegmentedTabSwitcher` (design system) in its
 * `checkout` appearance: fixed checkout roles rather than the
 * theme-flipping defaults, since this surface stays light even when the
 * app is in dark mode — see semantic.css.
 */

import * as React from "react"
import {
  Briefcase,
  Building2,
  InfinityIcon,
  SectionHeading,
  SegmentedTabSwitcher,
  Tag,
  UserSearch,
  type SegmentedTabItem,
  LogoApnaUnlimited,
} from "@apna/design-system"
import { HeroChip, withAccent } from "@/components/marketing/page-blocks"
import { cn } from "@/lib/utils"

export type PricingTab = "jobs" | "database" | "unlimited" | "enterprise"

/** Icons carry no size class — every consumer (the hero switcher, the two
 *  compact scrolled bars) sets its own glyph size, and Figma uses a
 *  different one in each. */
/** The apna Unlimited wordmark for the pricing tabs. Selected: the gold
 *  gradient — the deep one on light tracks, the brighter one in dark mode.
 *  Not selected: neutral, the same colour as the other unselected tabs
 *  (currentColor). */
function UnlimitedWordmark({ className, active }: { className?: string; active: boolean }) {
  if (!active) return <LogoApnaUnlimited variant="theme" className={className} />
  return (
    <>
      <LogoApnaUnlimited variant="gradient-deep" className={cn(className, "dark:hidden!")} />
      <LogoApnaUnlimited variant="gradient" className={cn(className, "hidden! dark:block!")} />
    </>
  )
}

/* ── apna Unlimited wordmark in the tabs: a preview switch ────────────
 * On (default): the gold wordmark in every pricing tab bar. Off: the ∞ icon
 * + "Unlimited" in the standard tab colours, like the other tabs. Set from the page's settings gear; kept in
 * localStorage, and every tab bar on the page follows a change at once. */
const WORDMARK_KEY = "apnahire:pricing-tab-wordmark"
const WORDMARK_EVENT = "apnahire:pricing-tab-wordmark"

function readWordmark() {
  try {
    return window.localStorage.getItem(WORDMARK_KEY) !== "off"
  } catch {
    return true
  }
}

export function useUnlimitedWordmark(): [boolean, (on: boolean) => void] {
  const on = React.useSyncExternalStore(
    (notify) => {
      window.addEventListener(WORDMARK_EVENT, notify)
      window.addEventListener("storage", notify)
      return () => {
        window.removeEventListener(WORDMARK_EVENT, notify)
        window.removeEventListener("storage", notify)
      }
    },
    readWordmark,
    () => true
  )
  const set = React.useCallback((next: boolean) => {
    try {
      window.localStorage.setItem(WORDMARK_KEY, next ? "on" : "off")
    } catch {
      // Storage blocked: the switch just won't persist.
    }
    window.dispatchEvent(new Event(WORDMARK_EVENT))
  }, [])
  return [on, set]
}

/** The tabs, with or without the wordmark (the switch above). */
export function pricingTabs(wordmark: boolean): SegmentedTabItem<PricingTab>[] {
  // Off: a plain tab like the others — icon + "apna Unlimited" in the
  // standard tab colours (no gold accent).
  return PRICING_TABS.map((tab) =>
    wordmark ? tab : { ...tab, logo: undefined, compactLogo: undefined }
  )
}

export const PRICING_TABS: SegmentedTabItem<PricingTab>[] = [
  {
    value: "jobs",
    label: "Jobs",
    description: "Post a job to attract candidates",
    icon: <Briefcase className="shrink-0" aria-hidden />,
  },
  {
    value: "unlimited",
    // "Unlimited" next to the ∞ icon (user call, 2026-10-19); the wordmark
    // setting shows the logo instead, and this stays its accessible name.
    label: "Unlimited",
    description: "Free job reposts and swapping",
    icon: <InfinityIcon className="shrink-0" aria-hidden />,
    // The wordmark in the big desktop tab; chips and the sticky bar keep the
    // gold icon + label.
    // "!": the switcher sizes every svg in a tab to a square.
    logo: (active: boolean) => <UnlimitedWordmark active={active} className="h-4.5! w-auto!" />,
    // Phone chips and the sticky bar: 14px, the chips' text size.
    compactLogo: (active: boolean) => <UnlimitedWordmark active={active} className="h-3.5! w-auto!" />,
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
    value: "enterprise",
    label: "Enterprise plans",
    description: "Custom plans for bulk hiring",
    icon: <Building2 className="shrink-0" aria-hidden />,
  },
]

/**
 * Labels used by the two *compact* (scrolled, icon + word) tab bars — the
 * logged-in header's inline switcher and the logged-out sticky sub-nav.
 * The same words as the full tab row (user call, 2026-10-19: one name per
 * tab, everywhere — "Subscription", "Enterprise plans").
 */
export const PRICING_TAB_SHORT_LABELS: Record<PricingTab, string> = {
  jobs: "Jobs",
  database: "Database",
  unlimited: "Unlimited",
  enterprise: "Enterprise plans",
}

interface PricingHeroProps {
  activeTab: PricingTab
  onTabChange: (tab: PricingTab) => void
  className?: string
  /** Attached to the tab switcher's wrapper so the page can observe when it
   *  scrolls out of view and fade in the header's compact switcher. */
  tabsRef?: React.Ref<HTMLDivElement>
  /** Logged-out only (/pricing): the marketing pages' hero heading — chip,
   *  serif headline, hook line — in place of the plain app title. */
  intro?: { eyebrow: string; title: string; titleAccent?: string; description: string }
  /** Logged in only: a banner above the app title (the Jan 1, 2027 price
   *  change, `PriceChangeBanner placement="plans"`). Ignored with `intro`. */
  banner?: React.ReactNode
  /** On the tabs' wrapper, e.g. to hide them where the page docks its own. */
  tabsClassName?: string
  /** On the banner's wrapper (which hides itself when no banner shows). */
  bannerClassName?: string
}

export function PricingHero({
  activeTab,
  onTabChange,
  className,
  tabsRef,
  intro,
  banner,
  tabsClassName,
  bannerClassName,
}: PricingHeroProps) {
  const [wordmark] = useUnlimitedWordmark()
  return (
    <section
      data-slot="pricing-hero"
      className={cn(
        // Same gutter as the page header and the tab bodies below, so the
        // left-aligned H1, the tab track, the back arrow and the body cards
        // all land on one column. Tighter than Figma's 112px-less-header
        // (user call, 2026-10-16): 24 / 32px above the heading, 24px to the
        // tabs, 20px under them.
        "relative flex flex-col items-center px-4 pb-5 pt-6 sm:px-8 sm:pt-8 lg:px-12",
        // The marketing hero gets a marketing page's breathing room.
        intro && "pt-10 sm:pt-16",
        className
      )}
    >
      <div className={cn("@container flex w-full max-w-6xl flex-col gap-6", intro && "gap-8 sm:gap-10")}>
        {/* Heading — source has no subtitle under the H1. `text-h1` sets
            size and line height; `font-semibold` tunes it to B600 (was B700).
            Phones keep it to one line: 24px when the column has 320px (360px
            phones and up), 20px below that; the 36px preset from sm. Scoped
            to max-sm so the container steps never reach desktop. */}
        {intro ? (
          <SectionHeading
            level={1}
            eyebrow={<HeroChip icon={<Tag aria-hidden />}>{intro.eyebrow}</HeroChip>}
            title={withAccent(intro.title, intro.titleAccent)}
            description={intro.description}
          />
        ) : (
          // No heading (user call, 2026-10-30): the top bar says "Select
          // plans"; the banner, then the tabs. `empty:hidden`: with no banner
          // showing, the wrapper and its spacing go too.
          <div className={cn("empty:hidden", bannerClassName)}>{banner}</div>
        )}

        {/* Plain block wrapper (not `display: contents`) — needed so
            `tabsRef`'s bounding box is measurable by the page's
            IntersectionObserver; `contents` would collapse it to zero size. */}
        <div ref={tabsRef} className={cn("w-full", tabsClassName)}>
          {/* One switcher for every viewport: a two-line pill row from md,
              a scrolling chip row below it with the short labels. All four
              tabs on both — Jobs and Database are separate products. */}
          <div>
            <SegmentedTabSwitcher
              items={pricingTabs(wordmark).map((tab) => ({ ...tab, shortLabel: PRICING_TAB_SHORT_LABELS[tab.value] }))}
              value={activeTab}
              onValueChange={onTabChange}
              appearance="checkout"
              mobileBleedClassName="-mx-4 sm:-mx-8"
              mobileGutterClassName="px-4 sm:px-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

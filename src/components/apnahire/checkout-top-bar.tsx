"use client"

/**
 * CheckoutTopBar — sticky top bar for the standalone checkout pages
 * (self-checkout's logged-in `/apnahire/credits`, and the job-posting plan
 * page). Solid white from the start; it gains its shadow once the page
 * scrolls (`useScrolled`). An optional `center`
 * slot fades in when `showCenter` flips — the page decides when (usually
 * once its hero's own heading/tabs scroll out from under this bar).
 *
 * Back · page title, like every other app page's header (no logo: the
 * recruiter is inside the app, so the bar names the page, "Plans").
 *
 *   <CheckoutTopBar title="Plans" onBack={…} backLabel="Back to jobs"
 *     center={<CompactTabs />} showCenter={heroOutOfView} />
 */

import * as React from "react"
import { BackButton } from "@apna/design-system"
import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"
import { useScrolled } from "@/hooks/use-scrolled"
import { cn } from "@/lib/utils"

interface CheckoutTopBarProps {
  title: string
  onBack: () => void
  backLabel: string
  center?: React.ReactNode
  showCenter?: boolean
  /** A strip under the bar, pinned with it (ExtraOffBar). */
  below?: React.ReactNode
}

export function CheckoutTopBar({
  title,
  onBack,
  backLabel,
  center,
  showCenter = false,
  below,
}: CheckoutTopBarProps) {
  const isScrolled = useScrolled()

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky border-b transition-interactive duration-enter",
        // White from the start (user call, 2026-10-30); the shadow only
        // once the page scrolls under it.
        "border-border bg-card",
        isScrolled ? "shadow-card" : "shadow-none"
      )}
    >
      {/* Same gutter + column as the hero and page body, so the back arrow
          lines up with the H1 and the cards. */}
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          {/* Same back-button placement as the job-posting wizard header —
              see BackButton's one-back-affordance rule. */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <BackButton onClick={onBack} aria-label={backLabel} />
            {/* The app top bar's page-title style. */}
            <span className="truncate text-h5 text-foreground">{title}</span>
          </div>

          {center && (
            <div
              className={cn(
                "transition-interactive duration-enter",
                showCenter ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              {center}
            </div>
          )}

          <div className="flex flex-1 justify-end">
            <AvailableCreditsButton />
          </div>
        </div>
      </div>
      {below}
    </header>
  )
}

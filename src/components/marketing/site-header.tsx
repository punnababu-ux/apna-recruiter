"use client"

/**
 * SiteHeader — the public header for every marketing page.
 *
 * Generalised from `apnahire/marketing-header.tsx`, which was a pricing-page
 * component wearing a marketing costume: it imported `PRICING_TABS`, demanded
 * `activeTab`/`onTabChange`/`showCompactTabs`, marked "Pricing" current with a
 * hardcoded boolean, and pointed every href at "#". Three things change here:
 *
 *  · Links come from `src/content/nav.ts`, and `current` is derived from the
 *    pathname. Adding a page no longer means editing the header.
 *  · The pricing tab switcher is no longer baked in. Any page can pass a
 *    `subNav` node, which slides down from under the bar on scroll — the
 *    pricing page passes its tab switcher into that slot.
 *  · `variant="minimal"` (logo + one CTA) for campaign pages. The Interview
 *    Prep Lounge prototype uses exactly that, so it's needed on day one
 *    rather than retrofitted.
 *
 * Transparent over the page canvas at rest, solid once scrolled — same timing
 * as the checkout header so the two surfaces feel like one site.
 */

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ApnaLogo, ArrowUpRight, Button, ChevronDown } from "@apna/design-system"
import { cn } from "@/lib/utils"
import {
  HEADER_ACTIONS,
  LOOKING_FOR_A_JOB,
  MAIN_NAV,
  type NavGroup,
} from "@/content/nav"
import { useScrolled } from "@/hooks/use-scrolled"

interface SiteHeaderProps {
  /** Full nav, or logo + primary CTA only (campaign and landing pages). */
  variant?: "default" | "minimal"
  /**
   * Secondary bar revealed on scroll, below the header. Rendered but hidden
   * until `showSubNav`, so it can animate rather than pop in.
   */
  subNav?: React.ReactNode
  showSubNav?: boolean
}

/** A top-level item is "current" when its href is the page or its ancestor. */
function useIsCurrent() {
  const pathname = usePathname()
  return React.useCallback(
    (group: NavGroup) => {
      if (group.href) {
        return group.href === "/"
          ? pathname === "/"
          : pathname === group.href || pathname.startsWith(`${group.href}/`)
      }
      return (group.items ?? []).some((item) => pathname.startsWith(item.href))
    },
    [pathname]
  )
}

export function SiteHeader({
  variant = "default",
  subNav,
  showSubNav = false,
}: SiteHeaderProps) {
  const isScrolled = useScrolled()
  const isCurrent = useIsCurrent()
  const [openPanel, setOpenPanel] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Close everything on navigation — otherwise a panel stays open behind the
  // new page.
  const pathname = usePathname()
  React.useEffect(() => {
    setOpenPanel(null)
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40" onMouseLeave={() => setOpenPanel(null)}>
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-8 border-b px-4 transition-[background-color,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 lg:px-12",
          isScrolled || openPanel || mobileOpen
            ? "border-border bg-card shadow-sm"
            : "border-transparent bg-transparent shadow-none"
        )}
      >
        <div className="flex items-center gap-4 lg:gap-9">
          <Link href="/" aria-label="apna for employers, home" className="shrink-0">
            <ApnaLogo className="size-10" />
          </Link>

          {variant === "default" && (
            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {MAIN_NAV.map((group) => {
                const current = isCurrent(group)
                const shared = cn(
                  "inline-flex items-center gap-1.5 self-stretch px-3 py-1.5 text-sm font-semibold transition-colors",
                  current
                    ? "border-b-2 border-primary text-primary"
                    : "rounded-full text-foreground hover:bg-muted"
                )

                if (!group.items) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href!}
                      aria-current={current ? "page" : undefined}
                      className={shared}
                    >
                      {group.label}
                    </Link>
                  )
                }

                const open = openPanel === group.label
                return (
                  <button
                    key={group.label}
                    type="button"
                    aria-expanded={open}
                    aria-current={current ? "page" : undefined}
                    onMouseEnter={() => setOpenPanel(group.label)}
                    onClick={() => setOpenPanel(open ? null : group.label)}
                    className={shared}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn("size-5 transition-transform", open && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                )
              })}

              <a
                href={LOOKING_FOR_A_JOB.href}
                className="inline-flex items-center gap-1.5 self-stretch rounded-full px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {LOOKING_FOR_A_JOB.label}
                <ArrowUpRight className="size-5" aria-hidden />
              </a>
            </nav>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {variant === "default" && (
            <Button
              variant="outline"
              size="sm"
              className="hidden rounded-full font-semibold sm:inline-flex"
              render={<Link href={HEADER_ACTIONS.secondary.href} />}
            >
              {HEADER_ACTIONS.secondary.label}
            </Button>
          )}
          <Button
            size="sm"
            className="rounded-full font-semibold"
            render={<Link href={HEADER_ACTIONS.primary.href} />}
          >
            {HEADER_ACTIONS.primary.label}
          </Button>
        </div>
      </div>

      {/* ── Mega-menu panel ── */}
      {MAIN_NAV.filter((g) => g.items).map((group) => (
        <div
          key={group.label}
          hidden={openPanel !== group.label}
          onMouseEnter={() => setOpenPanel(group.label)}
          className="absolute inset-x-0 top-full hidden border-b border-border bg-card shadow-sm lg:block"
        >
          <div className="mx-auto grid w-full max-w-band gap-2 px-4 py-6 sm:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
            {group.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col gap-1 rounded-lg p-4 transition-colors hover:bg-muted"
              >
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
                {item.description && (
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* ── Sub-nav slot ── kept mounted so it can slide rather than pop. */}
      {subNav && (
        <div
          aria-hidden={!showSubNav}
          className={cn(
            "absolute inset-x-0 top-full -z-10 hidden h-16 items-center justify-center bg-card px-4 shadow-sm transition-[opacity,translate] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:flex",
            showSubNav
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          )}
        >
          {subNav}
        </div>
      )}
    </header>
  )
}

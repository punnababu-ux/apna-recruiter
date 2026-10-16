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
 *  · The pricing tab switcher is no longer baked in. Any page under
 *    `(marketing)` can publish a secondary bar via `useHeaderSlot` (see
 *    `header-slot.tsx`) — the pricing page publishes its tab switcher, and
 *    it slides down from under the bar on scroll.
 *  · Menus follow the apnatime.lovable.app prototype (2026-10-16): each
 *    group opens a card of labelled columns (icon + heading, links under
 *    it) under the nav; on phones the same groups are an accordion in the
 *    menu sheet. A site search (SiteSearch) sits before the actions.
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ApnaLogo,
  ArrowUpRight,
  Briefcase,
  Building2,
  Button,
  ChevronDown,
  FileText,
  GraduationCap,
  Headset,
  Award,
  Menu,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Users,
  type IconComponent,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import {
  HEADER_ACTIONS,
  LOOKING_FOR_A_JOB,
  MAIN_NAV,
  type NavGroup,
  type NavIcon,
  type NavLink,
  type NavSection,
} from "@/content/nav"
import { useScrolled } from "@/hooks/use-scrolled"
import { useHeaderSlotValue } from "@/components/marketing/header-slot"
import { SiteSearch } from "@/components/marketing/site-search"

interface SiteHeaderProps {
  /** Full nav, or logo + primary CTA only (campaign and landing pages). */
  variant?: "default" | "minimal"
}

const SECTION_ICONS: Record<NavIcon, IconComponent> = {
  building: Building2,
  people: Users,
  recruiters: Briefcase,
  universities: GraduationCap,
  newsroom: FileText,
  recognition: Award,
  support: Headset,
}

const groupLinks = (group: NavGroup) => (group.sections ?? []).flatMap((s) => s.items)

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
      return groupLinks(group).some((link) => !link.external && pathname.startsWith(link.href))
    },
    [pathname]
  )
}

/** One menu link: internal via next/link, outbound in a new tab with ↗. */
function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate?: () => void }) {
  const className =
    "ink relative -mx-2 flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-interactive hover:bg-muted hover:text-foreground"
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer noopener" onClick={onNavigate} className={className}>
        {link.label}
        <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
      </a>
    )
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </Link>
  )
}

/** A labelled column: icon + heading, then its links. */
function MenuSection({ section, onNavigate }: { section: NavSection; onNavigate?: () => void }) {
  const Icon = SECTION_ICONS[section.icon]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {section.heading}
      </div>
      <ul className="flex flex-col">
        {section.items.map((link) => (
          <li key={link.label}>
            <MenuLink link={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const isScrolled = useScrolled()
  const isCurrent = useIsCurrent()
  const slot = useHeaderSlotValue()
  const [openPanel, setOpenPanel] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // The menu sheet focuses its body, not the search field: focusing the
  // field would raise the phone keyboard over the menu the moment it opens.
  const mobileBodyRef = React.useRef<HTMLDivElement>(null)

  // Close everything on navigation — otherwise a panel stays open behind the
  // new page.
  const pathname = usePathname()
  React.useEffect(() => {
    setOpenPanel(null)
    setMobileOpen(false)
  }, [pathname])

  const navItemClass = (current: boolean) =>
    cn(
      "ink relative inline-flex items-center gap-1 self-stretch px-2.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-interactive",
      current ? "border-b-2 border-primary text-primary" : "rounded-full text-foreground hover:bg-muted"
    )

  return (
    <header
      className="sticky top-0 z-sticky"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpenPanel(null)
      }}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-6 border-b px-4 transition-interactive duration-enter sm:px-8 lg:px-12",
          isScrolled || openPanel || mobileOpen
            ? "border-border bg-card shadow-card"
            : "border-transparent bg-transparent shadow-none"
        )}
      >
        <div className="flex shrink-0 items-center gap-4 lg:gap-6">
          <Link href="/" aria-label="apna for employers, home" className="shrink-0">
            <ApnaLogo className="size-10" />
          </Link>

          {variant === "default" && (
            // Leaving the nav (its menu cards are inside it) closes the menu,
            // so moving on to search or the buttons never leaves one open.
            <nav
              aria-label="Main"
              className="relative hidden items-center gap-0.5 xl:flex"
              onMouseLeave={() => setOpenPanel(null)}
            >
              {MAIN_NAV.map((group) => {
                const current = isCurrent(group)

                if (!group.sections) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href!}
                      aria-current={current ? "page" : undefined}
                      onMouseEnter={() => setOpenPanel(null)}
                      className={navItemClass(current)}
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
                    aria-controls={`menu-${group.label}`}
                    aria-current={current ? "page" : undefined}
                    onMouseEnter={() => setOpenPanel(group.label)}
                    onClick={() => setOpenPanel(open ? null : group.label)}
                    className={navItemClass(current)}
                  >
                    {group.label}
                    <ChevronDown className={cn("size-4 transition-select", open && "rotate-180")} aria-hidden />
                  </button>
                )
              })}

              <a
                href={LOOKING_FOR_A_JOB.href}
                onMouseEnter={() => setOpenPanel(null)}
                className={navItemClass(false)}
              >
                {LOOKING_FOR_A_JOB.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>

              {/* ── Menu card ── under the nav, left-aligned to it (a card
                   anchored to its own trigger runs off the right edge for
                   the later, wider menus). The top padding bridges the gap
                   so the pointer can travel from trigger to card. */}
              {MAIN_NAV.filter((g) => g.sections).map((group) => (
                <div
                  key={group.label}
                  id={`menu-${group.label}`}
                  hidden={openPanel !== group.label}
                  className="absolute top-full left-0 pt-4"
                >
                  <div className="flex divide-x divide-border rounded-xl bg-popover p-6 shadow-popover ring-1 ring-foreground/10">
                    {group.sections!.map((section) => (
                      <div key={section.heading} className="min-w-48 px-6 first:pl-0 last:pr-0">
                        <MenuSection section={section} onNavigate={() => setOpenPanel(null)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Search takes what the nav leaves (it shrinks before anything
            wraps); the buttons never shrink. */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          {variant === "default" && <SiteSearch className="hidden w-full max-w-56 min-w-24 xl:block" />}
          {variant === "default" && (
            <Button
              variant="outline"
              size="sm"
              className="hidden shrink-0 rounded-full font-semibold sm:inline-flex"
              render={<Link href={HEADER_ACTIONS.secondary.href} />}
            >
              {HEADER_ACTIONS.secondary.label}
            </Button>
          )}
          <Button
            size="sm"
            className="shrink-0 rounded-full font-semibold"
            render={<Link href={HEADER_ACTIONS.primary.href} />}
          >
            {HEADER_ACTIONS.primary.label}
          </Button>
          {variant === "default" && (
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          )}
        </div>
      </div>

      {/* ── Mobile menu ── below xl the inline nav is hidden; the same groups
           are an accordion in a sheet (no hover on touch), search on top. */}
      {variant === "default" && (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="right" className="w-full max-w-sm gap-0 p-0" initialFocus={mobileBodyRef}>
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div
              ref={mobileBodyRef}
              tabIndex={-1}
              className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4 outline-hidden"
            >
              <SiteSearch onNavigate={() => setMobileOpen(false)} />
              <nav aria-label="Main">
                <Accordion>
                  {MAIN_NAV.map((group) =>
                    group.sections ? (
                      <AccordionItem key={group.label} value={group.label}>
                        <AccordionTrigger className="py-3 text-base font-semibold hover:no-underline">
                          {group.label}
                        </AccordionTrigger>
                        {/* AccordionContent underlines links (it's styled for
                            prose answers); a menu's links are rows, not prose. */}
                        <AccordionContent className="[&_a]:no-underline">
                          <div className="flex flex-col gap-5 pt-1 pb-3">
                            {group.sections.map((section) => (
                              <MenuSection
                                key={section.heading}
                                section={section}
                                onNavigate={() => setMobileOpen(false)}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={group.label}
                        href={group.href!}
                        aria-current={isCurrent(group) ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className="ink relative flex border-b border-border py-3 text-base font-semibold text-foreground transition-interactive aria-[current=page]:text-primary"
                      >
                        {group.label}
                      </Link>
                    )
                  )}
                </Accordion>
                <a
                  href={LOOKING_FOR_A_JOB.href}
                  className="ink relative flex items-center gap-1.5 py-3 text-base font-semibold text-foreground transition-interactive"
                >
                  {LOOKING_FOR_A_JOB.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </nav>
            </div>
            <div className="flex flex-col gap-2 border-t border-border p-4 pb-safe-4 sm:hidden">
              <Button
                variant="outline"
                className="w-full rounded-full font-semibold"
                render={<Link href={HEADER_ACTIONS.secondary.href} />}
              >
                {HEADER_ACTIONS.secondary.label}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* ── Sub-nav slot ── published by the page via useHeaderSlot; kept
           mounted once published so it can slide rather than pop. */}
      {slot && (
        <div
          inert={!slot.showSubNav}
          className={cn(
            "absolute inset-x-0 top-full -z-10 hidden h-16 items-center justify-center bg-card px-4 shadow-card transition-interactive duration-enter ease-out-ui md:flex",
            slot.showSubNav
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          )}
        >
          {slot.subNav}
        </div>
      )}
    </header>
  )
}

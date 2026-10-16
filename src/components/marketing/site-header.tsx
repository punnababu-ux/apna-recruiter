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
 * A floating glass pill (2026-10-16): frosted white, 8px from the top and
 * the page's content width, a touch more solid once the page scrolls under
 * it. Search is an icon that opens the field over the end of the nav; the
 * right side is just Login (support gets its own floating button,
 * not a "Contact us" here).
 */

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  LogoApnaWordmark,
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
  Search,
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
  // Desktop search lives behind an icon (the pill can't spare a field's
  // width next to every menu). Open, it lays the field over the end of the
  // nav; Escape or a click elsewhere puts it away.
  const [searchOpen, setSearchOpen] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!searchOpen) return
    const away = (e: PointerEvent) => {
      const target = e.target as Element
      // The results list is portalled — a pick there isn't "elsewhere".
      if (searchRef.current?.contains(target) || target.closest("[data-slot=autocomplete-content]")) return
      setSearchOpen(false)
    }
    // Escape closes the field even when the results list swallowed the key
    // on its way to the header.
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false)
    document.addEventListener("pointerdown", away)
    document.addEventListener("keydown", esc, true)
    return () => {
      document.removeEventListener("pointerdown", away)
      document.removeEventListener("keydown", esc, true)
    }
  }, [searchOpen])
  // One overlay at a time: a menu card and the search field never stack.
  React.useEffect(() => {
    if (openPanel) setSearchOpen(false)
  }, [openPanel])
  React.useEffect(() => {
    if (searchOpen) setOpenPanel(null)
  }, [searchOpen])

  // Close everything on navigation — otherwise a panel stays open behind the
  // new page.
  const pathname = usePathname()
  React.useEffect(() => {
    setOpenPanel(null)
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const navItemClass = (current: boolean) =>
    cn(
      "ink relative inline-flex items-center gap-1 self-stretch px-2.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-interactive",
      "rounded-full",
      current ? "bg-primary/10 text-primary" : "text-foreground hover:bg-foreground/5"
    )

  return (
    // A floating glass pill (8px from the top, the page's content width),
    // not an edge-to-edge bar. 8px + the 56px pill keeps the header 64px,
    // which sticky offsets on the pricing page are measured against.
    <header
      className="sticky top-0 z-sticky px-3 pt-2 sm:px-6"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpenPanel(null)
          setSearchOpen(false)
        }
      }}
    >
      <div
        className={cn(
          // An even inset round the last button: 56px pill − 1px border − the
          // 36px button leaves 10px above and below, so 1px + pr-2.25 (9px)
          // gives 10px on the right too.
          "relative mx-auto flex h-14 w-full max-w-band items-center justify-between gap-4 rounded-full border pr-2.25 pl-2 backdrop-blur-xl transition-interactive duration-enter",
          // Frosted at rest; a touch more solid once the page scrolls under it.
          isScrolled || openPanel || mobileOpen || searchOpen
            ? "border-border bg-card/85 shadow-popover"
            : "border-card/60 bg-card/60 shadow-card"
        )}
      >
        <div className="flex shrink-0 items-center gap-3 lg:gap-4">
          {/* The "apna" wordmark the collapsed product sidebar uses; plum on
              the light pill, white on the dark one. Optically centred: the
              "p" descender fills the bottom of the box, so the letters sit
              ~2.6px high — nudged down 3px to line up with the nav text. */}
          <Link href="/" aria-label="apna for employers, home" className="shrink-0 rounded-full px-3 py-2">
            <LogoApnaWordmark className="h-5 w-auto translate-y-0.75 dark:hidden" />
            <LogoApnaWordmark variant="white" className="hidden h-5 w-auto translate-y-0.75 dark:block" />
          </Link>

          {variant === "default" && (
            // Leaving the nav (its menu cards are inside it) closes the menu,
            // so moving on to search or the buttons never leaves one open.
            <nav
              aria-label="Main"
              className="relative hidden items-center gap-0.5 self-stretch py-2 xl:flex"
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

              {/* ── Menu card ── hangs below the pill, left-aligned to the
                   nav (a card anchored to its own trigger runs off the right
                   edge for the later, wider menus). The top padding bridges
                   the gap so the pointer can travel from trigger to card. */}
              {MAIN_NAV.filter((g) => g.sections).map((group) => (
                <div
                  key={group.label}
                  id={`menu-${group.label}`}
                  hidden={openPanel !== group.label}
                  className="absolute top-full left-0 pt-4"
                >
                  <div className="flex divide-x divide-border rounded-2xl bg-popover p-6 shadow-popover ring-1 ring-foreground/10">
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

        <div className="flex shrink-0 items-center gap-2">
          {variant === "default" && (
            <div ref={searchRef} className="relative hidden xl:block">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Search the site"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((v) => !v)}
              >
                <Search className="size-5" aria-hidden />
              </Button>
              {searchOpen && (
                // Laid over the end of the nav, right-aligned to the icon.
                <div className="absolute top-1/2 right-0 w-72 -translate-y-1/2 animate-in fade-in-0 duration-enter">
                  <SiteSearch autoFocus onNavigate={() => setSearchOpen(false)} />
                </div>
              )}
            </div>
          )}
          {/* No "Contact us" here: support gets its own floating button
              (user call, 2026-10-16). */}
          {/* One green CTA per screen: on the homepage the hero's sign-up
              form is the primary, and on phones it sits right under this bar
              — so here, there, this login steps down to the outline button. */}
          {pathname === "/" && (
            <Button
              variant="outline"
              className="shrink-0 rounded-full font-semibold sm:hidden"
              render={<Link href={HEADER_ACTIONS.primary.href} />}
            >
              {HEADER_ACTIONS.primary.label}
            </Button>
          )}
          <Button
            className={cn("shrink-0 rounded-full font-semibold", pathname === "/" && "max-sm:hidden")}
            render={<Link href={HEADER_ACTIONS.primary.href} />}
          >
            {HEADER_ACTIONS.primary.label}
          </Button>
          {variant === "default" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full xl:hidden"
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

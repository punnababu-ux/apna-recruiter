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
 * A floating glass pill at rest (2026-10-16): frosted white, 16px from the
 * top and the page's content width. Once the page scrolls, it stretches into
 * a full-width bar docked to the top (content stays at the page width), and
 * a page's sub-nav (the pricing tabs) docks flush under it as a strip. Search is an icon that turns the whole pill into one large field,
 * Spotlight-style, over a dimmed page; the
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
  FileText,
  GraduationCap,
  Headset,
  Award,
  Menu,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuTrigger,
  Search,
  XIcon,
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
import { useHeroCtaHidden } from "@/hooks/use-hero-cta-hidden"
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

/** One menu link: internal via next/link, outbound in a new tab with ↗.
 *  `inMenu`: inside the desktop NavigationMenu card, where it's a
 *  NavigationMenuLink (part of the menu's keyboard order, closes the card). */
function MenuLink({ link, onNavigate, inMenu }: { link: NavLink; onNavigate?: () => void; inMenu?: boolean }) {
  const className =
    "ink relative -mx-2 flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-interactive hover:bg-muted hover:text-foreground"
  const content = (
    <>
      {link.label}
      {link.external && <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />}
    </>
  )
  const element = link.external ? (
    <a href={link.href} target="_blank" rel="noreferrer noopener" onClick={onNavigate} />
  ) : (
    <Link href={link.href} onClick={onNavigate} />
  )
  if (inMenu) {
    return (
      <NavigationMenuLink render={element} className={className}>
        {content}
      </NavigationMenuLink>
    )
  }
  return React.cloneElement(element, { className }, content)
}

/** A labelled column: icon + heading, then its links. */
function MenuSection({
  section,
  onNavigate,
  inMenu,
}: {
  section: NavSection
  onNavigate?: () => void
  inMenu?: boolean
}) {
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
            <MenuLink link={link} onNavigate={onNavigate} inMenu={inMenu} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const isScrolled = useScrolled()
  const heroCtaHidden = useHeroCtaHidden()
  const isCurrent = useIsCurrent()
  const slot = useHeaderSlotValue()
  const [openPanel, setOpenPanel] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // The menu sheet focuses its body, not the search field: focusing the
  // field would raise the phone keyboard over the menu the moment it opens.
  const mobileBodyRef = React.useRef<HTMLDivElement>(null)
  // Desktop search lives behind an icon (the pill can't spare a field's
  // width next to every menu). Open, the whole pill becomes the field
  // (Spotlight-style); Escape, the ×, or a click on the dimmed page closes it.
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
      // Current section: green text only. A filled pill here stacked over
      // the page's own selected tab (the pricing tabs) — two "you are here"
      // pills one above the other.
      current ? "text-primary hover:bg-foreground/5" : "text-foreground hover:bg-foreground/5"
    )

  // At rest a floating glass pill; once the page scrolls, the pill
  // stretches into a full-width bar docked to the top (the page's own
  // sub-nav — the pricing tabs — then docks flush under it, as a strip).
  // 72px either way (16px + the 56px pill, or the 72px bar), so nothing
  // under it jumps; the hero backdrop (-top-18) and the pricing page's scroll
  // trigger (self-checkout.tsx rootMargin) are measured against it.
  const docked = isScrolled

  return (
    <header
      className={cn("sticky top-0 z-sticky transition-shape", docked ? "px-0 pt-0" : "px-3 pt-4 sm:px-6")}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpenPanel(null)
          setSearchOpen(false)
        }
      }}
    >
      <div
        className={cn(
          // The inset round the last button: 56px pill − 1px border − the
          // 36px button leaves 10px above and below. On the right, 10px
          // measured equal but read tighter beside a filled pill's round
          // end, so from xl — where the filled Login is the last thing in
          // the bar — the right gets 12px (1px + pr-2.75), an optical
          // correction. Below xl the last item is the ghost menu icon.
          "relative mx-auto w-full border backdrop-blur-xl transition-shape",
          docked
            ? cn(
                // The docked bar: edge to edge, square, page gutters.
                "h-18 max-w-full rounded-none border-x-0 border-t-0 border-border bg-surface-glass px-4 sm:px-8 lg:px-12",
                // With a sub-nav docked under it, the bar and the strip are
                // one block: one shadow, under the strip (the bar's own fell
                // across the strip as a crease); the hairline divides them.
                slot?.showSubNav ? "shadow-none" : "shadow-card"
              )
            : cn(
                "h-14 max-w-band rounded-full pr-2.25 pl-2 xl:pr-2.75",
                // Frosted glass at rest (the cards' surface); solid while a
                // menu or search is open.
                openPanel || mobileOpen || searchOpen
                  ? "border-border bg-card shadow-popover"
                  : // On dark the card-tinted edge vanishes into the page, and the
                  // pill reads as a docked bar: give it the hairline instead.
                  "border-card/60 bg-surface-glass shadow-card dark:border-border"
              )
        )}
      >
        {/* The content keeps the page's width in both states, so the items
            don't fly out to the screen edges when the bar docks. */}
        <div className="mx-auto flex h-full w-full max-w-band items-center justify-between gap-4">
        {searchOpen ? (
          // Spotlight: the whole pill becomes one large search field — logo,
          // menus and Login step aside until it closes.
          <div ref={searchRef} className="flex w-full items-center gap-1 animate-in fade-in-0 duration-enter">
            <SiteSearch variant="spotlight" autoFocus className="flex-1" onNavigate={() => setSearchOpen(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <XIcon className="size-5" aria-hidden />
            </Button>
          </div>
        ) : (
          <>
          <div className="flex shrink-0 items-center gap-3 lg:gap-4">
            {/* The "apna" wordmark the collapsed product sidebar uses; plum on
                the light pill, white on the dark one. Optically centred: the
                "p" descender fills the bottom of the box, so the letters sit
                ~2.6px high — nudged down 3px to line up with the nav text. */}
            <Link href="/" aria-label="apna for employers, home" className="shrink-0 rounded-full px-3 py-2">
              <LogoApnaWordmark variant="deep" className="h-5 w-auto translate-y-0.75 dark:hidden" />
              <LogoApnaWordmark variant="white" className="hidden h-5 w-auto translate-y-0.75 dark:block" />
            </Link>

            {variant === "default" && (
              // Base UI NavigationMenu owns the behaviour: hover-intent open,
              // a grace period on leave, click opens and pins (a click on a
              // menu hover already opened keeps it open), outside click /
              // Escape close, arrow keys between triggers. Triggers never
              // navigate — each section's landing page is its card's first
              // link ("Overview").
              <NavigationMenu
                aria-label="Main"
                value={openPanel}
                onValueChange={(value) => setOpenPanel((value as string | null) ?? null)}
                className="hidden self-stretch xl:flex"
              >
                <NavigationMenuList className="h-full py-2">
                  {MAIN_NAV.map((group) => {
                    const current = isCurrent(group)
                    if (!group.sections) {
                      return (
                        <NavigationMenuItem key={group.label}>
                          <NavigationMenuLink
                            render={<Link href={group.href!} />}
                            aria-current={current ? "page" : undefined}
                            className={cn(navItemClass(current), "h-full")}
                          >
                            {group.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    }
                    return (
                      <NavigationMenuItem key={group.label} value={group.label}>
                        <NavigationMenuTrigger
                          aria-current={current ? "page" : undefined}
                          className={cn(navItemClass(current), "h-full data-[popup-open]:bg-foreground/5")}
                        >
                          {group.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex divide-x divide-border p-6">
                            {group.sections.map((section) => (
                              <div key={section.heading} className="min-w-48 px-6 first:pl-0 last:pr-0">
                                <MenuSection section={section} inMenu />
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  })}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      render={<a href={LOOKING_FOR_A_JOB.href} />}
                      className={cn(navItemClass(false), "h-full")}
                    >
                      {LOOKING_FOR_A_JOB.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
                {/* The card hangs 12px under the pill (the offset is from the
                    trigger, which ends 12px above the pill's edge), aligned
                    to its trigger and kept on screen. */}
                <NavigationMenuPopup sideOffset={24} />
              </NavigationMenu>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {variant === "default" && (
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-full xl:inline-flex"
                aria-label="Search the site"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-5" aria-hidden />
              </Button>
            )}
            {/* No "Contact us" here: support gets its own floating button
                (user call, 2026-10-16). */}
            {/* Login is the dark emphasis button: each page has its own one
                green action (the hero's sign-up, the recommended plan's Buy
                now), and a returning user's way in needn't compete with it.
                The one exception (user call, 2026-10-23): on the homepage,
                once the hero's "Login / Sign up" has scrolled up behind this
                bar, this button takes over its green, and hands it back when
                the hero's returns. One green login on screen at a time. */}
            <Button
              variant={heroCtaHidden ? "default" : "emphasis"}
              className="shrink-0 rounded-full font-semibold"
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
          </>
        )}
        </div>
      </div>

      {/* Spotlight dims the page behind it; a click there closes it. */}
      {searchOpen && (
        <div aria-hidden className="fixed inset-0 -z-10 bg-foreground/20 animate-in fade-in-0 duration-enter" />
      )}

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

      {/* ── Sub-nav slot ── published by the page via useHeaderSlot (the
           pricing page's compact plan tabs): a strip docked flush under the
           bar — it only shows once the page has scrolled, by which time the
           pill has become the full-width bar. Kept mounted once published so
           it can slide rather than pop. */}
      {slot && (
        <div
          inert={!slot.showSubNav}
          className={cn(
            // Every width: on phones too, the plan tabs must stay reachable
            // once the page's own tab row has scrolled away. Scrolls sideways
            // if its content can't fit (the content centres itself with mx-auto,
            // so nothing is cut off on the left).
            "absolute inset-x-0 top-full -z-10 flex h-16 items-center no-scrollbar overflow-x-auto border-b border-border bg-surface-glass px-4 shadow-card backdrop-blur-xl transition-interactive duration-enter ease-out-ui",
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

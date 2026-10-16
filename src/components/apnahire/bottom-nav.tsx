"use client"

/**
 * ApnaHireBottomNav — Mobile bottom navigation for the Apna Hire product shell.
 *
 *   Jobs · Database · ( Plans ) · Notifications · More
 *
 * Plans is the raised centre tile (BottomNav `featured`): the one promoted
 * destination, so recruiters always see where to buy (with a subscription
 * it manages the plan instead, as in the sidebar). Notifications carries
 * the unread count and opens the notification centre page.
 *
 * A section with sub-pages (Database, Invite centre) opens its first page;
 * the page's chips (SectionChips) move between the rest.
 *
 * More (three dots: it opens a grid of tiles) opens BottomNavMenu: a card of
 * icon tiles just above the bar, which stays visible with More turned into
 * an ✕. Flat destinations only:
 * Invite centre, Reports, Campus AI, Credits & usage, Support, Settings.
 *
 * Pages opened from More are full screens on phones (src/lib/apnahire/
 * nav.ts): the bar isn't shown there; the top bar carries Back.
 *
 * Hidden at md+ (768px) where the sidebar takes over.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Bell,
  BottomNav,
  BottomNavMenu,
  Briefcase,
  CreditCard,
  Database,
  HelpCircle,
  IndianRupee,
  Mail,
  MoreHorizontal,
  Settings,
  Trophy,
  X,
  type BottomNavItem,
  type BottomNavMenuItem,
} from "@apna/design-system"
import { useActiveSubscription } from "@/hooks/use-active-subscription"
import { useNotifications } from "@/hooks/apnahire/use-notifications"
import { isFullScreenPage } from "@/lib/apnahire/nav"

/** The bar's room at the end of the page: its 64px plus the home-indicator
 *  inset; nothing on full-screen pages, where there is no bar. */
export function BottomNavSpacer() {
  const pathname = usePathname()
  if (isFullScreenPage(pathname)) return null
  return <div aria-hidden className="pb-safe-16 md:hidden" />
}

export function ApnaHireBottomNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const subscribed = useActiveSubscription()
  const { unreadCount } = useNotifications()

  /** True if the current route starts with the given prefix. */
  const isActive = (prefix: string) => pathname.startsWith(prefix)
  /** A bar tab reads as current only while the More card is closed: when it
   *  is open, More is the one selected tab. */
  const tabActive = (prefix: string) => !menuOpen && isActive(prefix)

  // Close the card when the route changes (e.g. browser back).
  React.useEffect(() => setMenuOpen(false), [pathname])

  const menuItems: BottomNavMenuItem[] = [
    { href: "/apnahire/invite-centre/database-wa-invites", label: "Invite centre", icon: Mail },
    { href: "/apnahire/reports", label: "Reports", icon: BarChart2 },
    { href: "/apnahire/campus-ai", label: "Campus AI", icon: Trophy, dot: true },
    { href: "/apnahire/usage", label: "Credits & usage", icon: CreditCard },
    { href: "/apnahire/support", label: "Support", icon: HelpCircle },
    { href: "/apnahire/settings", label: "Settings", icon: Settings },
  ].map((item) => ({
    ...item,
    // Invite centre is a section: any of its pages counts.
    active: isActive(item.href.startsWith("/apnahire/invite-centre") ? "/apnahire/invite-centre" : item.href),
  }))

  const items: BottomNavItem[] = [
    {
      href: "/apnahire/jobs",
      label: "Jobs",
      icon: Briefcase,
      active: tabActive("/apnahire/jobs"),
    },
    {
      href: "/apnahire/database/search-candidates",
      label: "Database",
      icon: Database,
      active: tabActive("/apnahire/database"),
    },
    {
      href: subscribed ? "/apnahire/credits" : "/pricing",
      label: "Plans",
      icon: IndianRupee,
      featured: true,
    },
    {
      href: "/apnahire/notifications",
      label: "Notifications",
      icon: Bell,
      active: tabActive("/apnahire/notifications"),
      badge: unreadCount ? (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-2xs leading-none font-semibold text-destructive-foreground">
          {unreadCount}
          <span className="sr-only"> unread</span>
        </span>
      ) : undefined,
    },
    {
      // Toggles the card; reads as the current tab while it's open, or when
      // one of its pages is the current page.
      label: "More",
      icon: menuOpen ? X : MoreHorizontal,
      active: menuOpen || (!menuOpen && menuItems.some((item) => item.active)),
      onClick: () => setMenuOpen((open) => !open),
    },
  ]

  if (isFullScreenPage(pathname)) return null

  return (
    <>
      <BottomNavMenu open={menuOpen} onOpenChange={setMenuOpen} items={menuItems} label="More" clearFeatured />
      <BottomNav items={items} />
    </>
  )
}

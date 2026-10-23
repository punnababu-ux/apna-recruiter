"use client"

/**
 * ApnaHireBottomNav — Mobile bottom navigation for the Apna Hire product shell.
 *
 *   Jobs · Database · ( Plans ) · Notifications · More
 *
 * Plans follows usePlansIngress (user call, 2026-10-20): the highlighted centre
 * tile (BottomNav `featured`, inside the bar) only while credits are running out; a plain
 * tab like Database right after a credit purchase; and with a subscription
 * it leaves the bar for the More card, as "Manage plans" beside Support. Notifications carries
 * the unread count and opens the notification centre page.
 *
 * A section with sub-pages (Database, Invite centre) opens its first page;
 * the page's chips (SectionChips) move between the rest.
 *
 * More (three dots: it opens a grid of tiles) opens BottomNavMenu: a card of
 * icon tiles just above the bar, which stays visible with More turned into
 * an ✕. Flat destinations only:
 * Invite centre, Reports, Campus AI, Credits & usage, Support, Settings.
 * The account alert the desktop shows in its sidebar ("Verify Identity…")
 * sits above the tiles, and a red dot on More says it's there.
 *
 * Pages opened from More, and drill-downs (one job), are full screens on
 * phones (src/lib/apnahire/nav.ts): the bar isn't shown there.
 *
 * Hidden at md+ (768px) where the sidebar takes over.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Badge,
  AlertBanner,
  AlertCircle,
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
import { useNotifications } from "@/hooks/apnahire/use-notifications"
import { useAccountAlert } from "@/hooks/apnahire/use-account-alert"
import { hidesBottomNav } from "@/lib/apnahire/nav"
import { usePlansIngress } from "@/hooks/use-plans-ingress"

/** The bar's room at the end of the page: its 64px plus the home-indicator
 *  inset; nothing on full-screen pages, where there is no bar. */
export function BottomNavSpacer() {
  const pathname = usePathname()
  if (hidesBottomNav(pathname)) return null
  return <div aria-hidden className="pb-safe-16 md:hidden" />
}

export function ApnaHireBottomNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { unreadCount } = useNotifications()
  const account = useAccountAlert()
  const plans = usePlansIngress()

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
    ...(plans === "quiet" ? [{ href: "/apnahire/plan", label: "Manage plans", icon: IndianRupee }] : []),
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
    ...(plans === "quiet"
      ? []
      : [
          {
            href: "/apnahire/credits",
            label: "Plans",
            icon: IndianRupee,
            featured: plans === "promote",
            active: plans === "item" && tabActive("/apnahire/credits"),
          },
        ]),
    {
      href: "/apnahire/notifications",
      label: "Notifications",
      icon: Bell,
      active: tabActive("/apnahire/notifications"),
      badge: unreadCount ? (
        <Badge variant="count" size="count">
          {unreadCount}
          <span className="sr-only"> unread</span>
        </Badge>
      ) : undefined,
    },
    {
      // Toggles the card; reads as the current tab while it's open, or when
      // one of its pages is the current page.
      label: "More",
      icon: menuOpen ? X : MoreHorizontal,
      // The account alert lives in the card: a dot says so until it's
      // resolved or dismissed.
      badge:
        account.alert && !menuOpen ? (
          <Badge variant="count" size="dot" className="ring-2 ring-card">
            <span className="sr-only">Account alert</span>
          </Badge>
        ) : undefined,
      active: menuOpen || (!menuOpen && menuItems.some((item) => item.active)),
      onClick: () => setMenuOpen((open) => !open),
    },
  ]

  if (hidesBottomNav(pathname)) return null

  return (
    <>
      <BottomNavMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        items={menuItems}
        label="More"
        header={
          account.alert ? (
            // The sidebar's alert, same component and look.
            <AlertBanner
              variant={account.alert.variant}
              appearance={account.alert.appearance}
              icon={<AlertCircle className="size-4 shrink-0" />}
              title={account.alert.title}
              action={{ label: account.alert.ctaText, onClick: () => {} }}
              onClose={account.dismiss}
            />
          ) : undefined
        }
      />
      <BottomNav items={items} />
    </>
  )
}

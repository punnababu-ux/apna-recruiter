"use client"

/**
 * ApnaHireBottomNav — Mobile bottom navigation for the Apna Hire product shell.
 *
 * Shows 5 primary destinations at thumb reach.
 * A "More" tab opens a bottom Sheet for secondary items (Campus AI, Credits, Support).
 *
 * Hidden at md+ (768px) where the sidebar takes over.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { BarChart2, Briefcase, CreditCard, Database, HelpCircle, Mail, MoreHorizontal, Trophy } from "@apna/design-system"
import Link from "next/link"

import {
  Badge,
  BottomNav,
  type BottomNavItem,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

/** Secondary items shown in the "More" bottom sheet. */
const MORE_ITEMS = [
  {
    href: "/apnahire/campus-ai",
    label: "Campus AI",
    icon: Trophy,
    badge: true,
  },
  {
    href: "/apnahire/credits",
    label: "Credits & Usage",
    icon: CreditCard,
  },
  {
    href: "/apnahire/support",
    label: "Support",
    icon: HelpCircle,
  },
] as const

export function ApnaHireBottomNav() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = React.useState(false)

  /** True if the current route starts with the given prefix. */
  const isActive = (prefix: string) => pathname.startsWith(prefix)

  const items: BottomNavItem[] = [
    {
      href: "/apnahire/jobs",
      label: "Jobs",
      icon: Briefcase,
      active: isActive("/apnahire/jobs"),
    },
    {
      href: "/apnahire/database/search-candidates",
      label: "Database",
      icon: Database,
      active: isActive("/apnahire/database"),
    },
    {
      href: "/apnahire/invite-centre/database-wa-invites",
      label: "Invite",
      icon: Mail,
      active: isActive("/apnahire/invite-centre"),
    },
    {
      href: "/apnahire/reports",
      label: "Reports",
      icon: BarChart2,
      active: isActive("/apnahire/reports"),
    },
    {
      label: "More",
      icon: MoreHorizontal,
      onClick: () => setMoreOpen(true),
    },
  ]

  return (
    <>
      <BottomNav items={items} />

      {/* Secondary-items sheet */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-xl pb-8">
          <SheetHeader className="px-1">
            <SheetTitle className="text-left text-sm font-semibold text-foreground">
              More
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-3 flex flex-col gap-1">
            {MORE_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5 shrink-0",
                      active ? "text-primary" : "text-muted-foreground"
                    )}
                    aria-hidden
                  />
                  {item.label}
                  {"badge" in item && item.badge && (
                    <Badge
                      variant="info"
                      className="ml-auto px-1.5 py-0 text-2xs"
                    >
                      New
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

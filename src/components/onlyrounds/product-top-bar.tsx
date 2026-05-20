"use client"

/**
 * ProductTopBar — sticky header chrome for the OnlyRounds product shell.
 *
 * Layout (left → right):
 *   SidebarTrigger · ProductBreadcrumb · [actions] · Notifications bell · Avatar
 *
 * The breadcrumb is URL-derived (ProductBreadcrumb reads pathname +
 * `?tab=`), so top-bar composition stays the same across every product
 * surface. Callers can inject extra `actions` rendered before the bell
 * for page-specific chrome (e.g. a global search field).
 */

import { Bell } from "lucide-react"
import { usePathname } from "next/navigation"

import { ProductBreadcrumb } from "@/components/onlyrounds/product-breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function ProductTopBar({
  actions,
  user = { initial: "M" },
  hasNotifications = true,
  className,
}: {
  actions?: React.ReactNode
  user?: { initial: string }
  hasNotifications?: boolean
  className?: string
}) {
  const pathname = usePathname()
  if (pathname === "/onlyrounds/jobs/new") return null

  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-1 border-b border-border bg-card px-3",
        className
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <ProductBreadcrumb />
      <div className="ml-auto flex items-center gap-2">
        {actions}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="size-4" />
          {hasNotifications ? (
            <span
              aria-hidden
              className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive"
            />
          ) : null}
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
            {user.initial}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

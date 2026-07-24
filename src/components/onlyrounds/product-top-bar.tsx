"use client"

/**
 * ProductTopBar — sticky header chrome for the OnlyRounds product shell.
 *
 * Layout (left → right):
 *   SidebarTrigger · ProductBreadcrumb · [actions] · Avatar with Logout Popover
 *
 * The breadcrumb is URL-derived (ProductBreadcrumb reads pathname +
 * `?tab=`), so top-bar composition stays the same across every product
 * surface. Callers can inject extra `actions` rendered before the bell
 * for page-specific chrome (e.g. a global search field).
 */

import { usePathname } from "next/navigation"
import { toast } from "sonner"

import { ProductBreadcrumb } from "@/components/onlyrounds/product-breadcrumb"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function ProductTopBar({
  actions,
  user = { initial: "M" },
  className,
}: {
  actions?: React.ReactNode
  user?: { initial: string }
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
        
        {/* Profile Avatar Triggering Logout Popover */}
        <Popover>
          <PopoverTrigger
            render={
              <button className="rounded-full ring-offset-background transition-shadow hover:ring-2 hover:ring-ring/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                    {user.initial}
                  </AvatarFallback>
                </Avatar>
              </button>
            }
          />
          <PopoverContent align="end" className="w-60 p-4">
            <div className="flex flex-col gap-0.5 mb-4 text-left">
              <span className="font-semibold text-foreground text-sm">Mitushi Agarwal</span>
              <span className="text-2xs text-muted-foreground">mitushi@apna.co</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8 text-destructive border-border hover:bg-destructive/10 hover:text-destructive active:bg-destructive/20"
              onClick={() => toast.success("Logged out successfully")}
            >
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

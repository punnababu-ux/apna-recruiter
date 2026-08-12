"use client"

/**
 * ApnaHireTopBar — sticky header chrome for the Apna Hire product shell.
 *
 * Layout (left → right):
 *   SidebarTrigger · ApnaHireBreadcrumb · [actions slot] · Avatar with profile popover
 *
 * Callers can inject extra `actions` before the avatar for page-specific
 * chrome (e.g. a search field or a notification bell).
 */

import { toast } from "sonner"

import { ApnaHireBreadcrumb } from "@/components/apnahire/breadcrumb"
import {
  Avatar,
  AvatarFallback,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SidebarTrigger,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export function ApnaHireTopBar({
  actions,
  user = { name: "Recruiter", email: "recruiter@apna.co", initial: "R" },
  className,
}: {
  actions?: React.ReactNode
  user?: { name: string; email: string; initial: string }
  className?: string
}) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-1 border-b border-border bg-card px-3",
        className
      )}
    >
      <SidebarTrigger className="-ml-1 hidden md:flex" />

      {/* Divider — only visible alongside the sidebar trigger */}
      <div className="mx-1 h-4 w-px bg-border hidden md:block" />

      <ApnaHireBreadcrumb />

      <div className="ml-auto flex items-center gap-2">
        {actions}

        {/* Profile Avatar → logout popover */}
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
              <span className="font-semibold text-foreground text-sm">{user.name}</span>
              <span className="text-2xs text-muted-foreground">{user.email}</span>
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

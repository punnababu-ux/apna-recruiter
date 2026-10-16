"use client"

/**
 * ApnaHireTopBar — sticky header chrome for the Apna Hire product shell.
 *
 * Phones show no breadcrumb (native apps don't, and it repeated the page
 * title and crowded Credits / the avatar as pages got deeper). The left of
 * the bar is, like an app bar: the apna Hire brand on Jobs (the home tab),
 * the section's name everywhere else ("Database", "Notifications"), and
 * Back + the page's name on a full-screen page (one opened from More: no
 * bottom bar). A drill-down (a page below a section, e.g. one job) hides
 * this bar on phones: the page's own header carries Back, title and ⋮.
 * Back returns in-app, or to Jobs when there's nowhere to return to
 * (src/lib/apnahire/nav.ts). From md: the breadcrumb.
 *
 * Layout (left → right):
 *   SidebarTrigger · ApnaHireBreadcrumb · [actions slot] · Notifications (md+;
 *   phones have the bottom bar's tab) · Available credits · Avatar with
 *   profile popover
 *
 * Callers can inject extra `actions` before the balance for page-specific
 * chrome (e.g. a search field or a notification bell). The balance is the
 * same AvailableCreditsButton as the checkout and job-posting top bars, so
 * it reads the same everywhere.
 */

import Link from "next/link"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"
import { NotificationsButton } from "@/components/apnahire/notifications/notifications-button"
import { ApnaHireBreadcrumb, sectionTitle } from "@/components/apnahire/breadcrumb"
import { isDrillDown, isFullScreenPage, useAppBack } from "@/lib/apnahire/nav"
import {
  Avatar,
  AvatarFallback,
  BackButton,
  Button,
  LogoApnaHire,
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
  const pathname = usePathname()
  const back = useAppBack()
  const fullScreen = isFullScreenPage(pathname)
  return (
    <div
      className={cn(
        // 16px sides on phones (the page's gutter); 12px beside the
        // sidebar trigger from md.
        "sticky top-0 z-10 flex h-16 items-center gap-1 border-b border-border bg-card px-4 md:px-3",
        // Drill-downs draw their own header on phones. Hidden, not
        // unmounted: useAppBack keeps tracking in-app navigation.
        isDrillDown(pathname) && "max-md:hidden",
        className
      )}
    >
      <SidebarTrigger className="-ml-1 hidden md:flex" />

      {/* Divider — only visible alongside the sidebar trigger */}
      <div className="mx-1 h-4 w-px bg-border hidden md:block" />

      {/* Phones: Back on a drill-down (BackButton's rule: first in the
          row), the brand on Jobs, the section's name elsewhere. */}
      <div className="flex min-w-0 items-center md:hidden">
        {fullScreen ? (
          // BackButton's rule: first in the row, gap-3 before the title.
          <span className="flex min-w-0 items-center gap-3">
            <BackButton onClick={back} />
            <span className="truncate font-heading text-lg font-semibold text-foreground">{sectionTitle(pathname)}</span>
          </span>
        ) : pathname.split("/").filter(Boolean)[1] !== "jobs" ? (
          <span className="truncate font-heading text-lg font-semibold text-foreground">{sectionTitle(pathname)}</span>
        ) : (
          <Link href="/apnahire/dashboard" aria-label="apna Hire home" className="flex items-center">
            {/* 24px: the wordmark's native size, as in the expanded sidebar. */}
            <LogoApnaHire className="h-6" />
          </Link>
        )}
      </div>

      <div className="hidden md:flex">
        <ApnaHireBreadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {actions}

        {/* The product shell is the one place the balance offers "View
            plans"; the checkout pages are already showing plans. */}
        <div className="hidden md:block">
          <NotificationsButton />
        </div>

        <AvailableCreditsButton plansCta />

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

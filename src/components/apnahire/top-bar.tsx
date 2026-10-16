"use client"

/**
 * ApnaHireTopBar — sticky header chrome for the Apna Hire product shell.
 *
 * Phones show no breadcrumb (native apps don't, and it repeated the page
 * title and crowded Credits / the avatar as pages got deeper). The left of
 * the bar is, like an app bar: the apna Hire brand on Jobs (the home tab),
 * the section's name everywhere else ("Database", "Notifications"), and
 * Back + the page's name on a full-screen page (one opened from More: no
 * bottom bar), where Back goes home to Jobs. A drill-down (a page below a section, e.g. one job) hides
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

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"
import { NotificationsButton } from "@/components/apnahire/notifications/notifications-button"
import { ApnaHireBreadcrumb, sectionTitle } from "@/components/apnahire/breadcrumb"
import { HOME, isDrillDown, isFullScreenPage, useAppBack } from "@/lib/apnahire/nav"
import { signOut, useSession } from "@/hooks/use-session"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Avatar,
  AvatarFallback,
  BackButton,
  Button,
  ChevronRight,
  LogoApnaHire,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SidebarTrigger,
  UserRound,
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
  // Called for its in-app history tracking (drill-downs read it).
  useAppBack()
  const router = useRouter()
  const [profileOpen, setProfileOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const session = useSession()
  const signedInAs = session?.kind === "phone" ? `+91 ${session.phone}` : session?.email
  const fullScreen = isFullScreenPage(pathname)
  return (
    <div
      className={cn(
        // 16px sides on phones (the page's gutter); 12px beside the
        // sidebar trigger from md.
        "sticky top-0 z-sticky flex h-16 items-center gap-1 border-b border-border bg-card px-4 md:px-3",
        // Phones: no line when the page's own header continues under the
        // bar (useFlushHeader) — that part carries the line.
        "max-md:[[data-header-joined]_&]:border-transparent",
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
            {/* A More page's Back goes home to Jobs, not through its
                section's chips or wherever More was opened from. */}
            <BackButton onClick={() => router.push(HOME)} />
            <span className="truncate text-h5 text-foreground">{sectionTitle(pathname)}</span>
          </span>
        ) : pathname.split("/").filter(Boolean)[1] !== "jobs" ? (
          <span className="truncate text-h5 text-foreground">{sectionTitle(pathname)}</span>
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

        {/* Profile: a popover from md, a bottom sheet on phones (the
            Available credits button's pattern); same content in both. */}
        {(() => {
          const avatar = (
            <button
              aria-label="Your account"
              className="rounded-full ring-offset-background transition-interactive hover:ring-2 hover:ring-ring/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0"
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                  {user.initial}
                </AvatarFallback>
              </Avatar>
            </button>
          )
          const who = (
            <div className="flex flex-col gap-0.5 text-left">
              <span className={cn("font-semibold text-foreground", isMobile ? "text-lg" : "text-sm")}>{user.name}</span>
              {/* Who is signed in: the number or the enterprise email. */}
              <span className={cn("text-muted-foreground", isMobile ? "text-sm" : "text-xs")}>{signedInAs ?? user.email}</span>
            </div>
          )
          const actions = (
            <>
              {/* Goes to a page, so it reads as a row with a chevron, not a button. */}
              <Button
                variant="ghost"
                size={isMobile ? "lg" : "sm"}
                className="-mx-2 w-auto justify-start gap-2"
                nativeButton={false}
                render={<Link href="/apnahire/profile" />}
                onClick={() => setProfileOpen(false)}
              >
                <UserRound aria-hidden />
                Profile
                <ChevronRight className="ml-auto text-muted-foreground" aria-hidden />
              </Button>
              <Button
                variant="destructive"
                size={isMobile ? "lg" : "sm"}
                className="w-full"
                onClick={() => {
                  signOut()
                  router.push("/")
                }}
              >
                Log out
              </Button>
            </>
          )
          if (isMobile) {
            return (
              <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
                <SheetTrigger render={avatar} />
                {/* The system CloseBubble sits outside the sheet; no overflow-hidden. */}
                <SheetContent side="bottom" className="gap-4 rounded-t-2xl border-t-0 p-5 pb-safe-5">
                  <SheetTitle className="sr-only">Your account</SheetTitle>
                  {who}
                  <Separator />
                  {actions}
                </SheetContent>
              </Sheet>
            )
          }
          return (
            <Popover open={profileOpen} onOpenChange={setProfileOpen}>
              <PopoverTrigger render={avatar} />
              <PopoverContent align="end" className="w-60 p-4">
                <div className="flex flex-col gap-4">
                  {who}
                  <Separator />
                  {actions}
                </div>
              </PopoverContent>
            </Popover>
          )
        })()}
      </div>
    </div>
  )
}

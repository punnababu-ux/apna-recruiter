"use client"

/**
 * Phone navigation rules for the apna Hire product shell.
 *
 *   Tabs (Jobs, Database, Notifications) are roots: the bottom bar, no Back.
 *   Pages opened from the bar's More card are full screens: no bottom bar,
 *   Back + the page's name in the top bar (as secondary screens in native
 *   apps slide over the tab bar).
 *
 * Back goes to the previous screen when the recruiter navigated here inside
 * the app; landing straight on a page (a link, a notification) has nothing
 * to go back to, so Back opens the Jobs home instead of leaving the app.
 */

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

/** The More card's destinations: full screen on phones. */
export const FULL_SCREEN_PREFIXES = [
  "/apnahire/invite-centre",
  "/apnahire/reports",
  "/apnahire/campus-ai",
  "/apnahire/usage",
  "/apnahire/support",
  "/apnahire/settings",
]

export const isFullScreenPage = (pathname: string) =>
  FULL_SCREEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))

/** Set once the route changes inside this session: there is a screen to go
 *  back to. Module-level, so it survives the shell's re-renders. */
let navigatedInApp = false

/** Call once in a component that stays mounted across product pages (the
 *  top bar). Returns Back's handler. */
export function useAppBack(home = "/apnahire/jobs") {
  const pathname = usePathname()
  const router = useRouter()
  const first = React.useRef(pathname)

  React.useEffect(() => {
    if (pathname !== first.current) navigatedInApp = true
  }, [pathname])

  return React.useCallback(() => {
    if (navigatedInApp) router.back()
    else router.push(home)
  }, [router, home])
}

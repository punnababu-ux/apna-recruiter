"use client"

/**
 * Phone navigation rules for the apna Hire product shell.
 *
 *   Tabs (Jobs, Database, Notifications) are roots: the bottom bar, no Back.
 *   Pages opened from the bar's More card are full screens: no bottom bar,
 *   Back + the page's name in the top bar (as secondary screens in native
 *   apps slide over the tab bar).
 *   Drill-downs (a page below a section, e.g. one job) are full screens too,
 *   with their own header (Back · title · ⋮): no bottom bar, no top bar.
 *
 * Back on a More page always goes home to Jobs (the section's chips don't
 * stack up as history; they replace each other). Back on a drill-down goes
 * to the previous screen when the recruiter navigated there inside the
 * app; landing straight on a page (a link, a notification) has nothing to
 * go back to, so Back opens the Jobs home instead of leaving the app.
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

/** Sections whose pages sit one level deeper (/database/search-candidates):
 *  those are section pages, not drill-downs. */
const TWO_LEVEL_SECTIONS = ["database", "invite-centre"]

/** A page below a section (/apnahire/jobs/123): its own header on phones. */
export function isDrillDown(pathname: string) {
  const [, section, ...rest] = pathname.split("/").filter(Boolean)
  return rest.length > (TWO_LEVEL_SECTIONS.includes(section ?? "") ? 1 : 0)
}

/** Phones: no bottom bar on More pages and drill-downs. */
export const hidesBottomNav = (pathname: string) => isFullScreenPage(pathname) || isDrillDown(pathname)

/** Set once the route changes inside this session: there is a screen to go
 *  back to. Module-level, so it survives the shell's re-renders. */
let navigatedInApp = false

/** Call once in a component that stays mounted across product pages (the
 *  top bar). Returns Back's handler. */
export const HOME = "/apnahire/jobs"

export function useAppBack(home = HOME) {
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

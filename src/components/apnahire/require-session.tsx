"use client"

/**
 * RequireSession — the app is for signed-in recruiters. A signed-out visit
 * to any /apnahire page goes to /login, which returns here afterwards
 * (`?next=`). Design-reference pages (`/apnahire/sidebar-specs`) stay open.
 *
 * Until the stored session has been read (first paint), nothing renders, so
 * a signed-out visitor never sees the app flash before the redirect.
 */

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { isLoggingOut, useSession } from "@/hooks/use-session"

const OPEN_PREFIXES = ["/apnahire/sidebar-specs"]

export function RequireSession({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const pathname = usePathname()
  const search = useSearchParams()
  const router = useRouter()
  const open = OPEN_PREFIXES.some((p) => pathname.startsWith(p))

  React.useEffect(() => {
    if (open || session !== null || isLoggingOut()) return
    const here = search.size ? `${pathname}?${search.toString()}` : pathname
    router.replace(`/login?${new URLSearchParams({ next: here })}`)
  }, [open, session, pathname, search, router])

  if (open) return <>{children}</>
  if (!session) return null
  return <>{children}</>
}

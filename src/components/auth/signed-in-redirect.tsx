"use client"

/**
 * SignedInRedirect — on the login pages, someone already signed in (e.g.
 * pressing Back after logging in) goes straight on to `?next=` or Jobs
 * instead of seeing the login form again.
 */

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { safeNext, useSession } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

export function SignedInRedirect() {
  const session = useSession()
  const params = useSearchParams()
  const router = useRouter()
  React.useEffect(() => {
    if (session) router.replace(safeNext(params.get("next"), HOME))
  }, [session, params, router])
  return null
}

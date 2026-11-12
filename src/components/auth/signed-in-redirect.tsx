"use client"

/**
 * SignedInRedirect — on the login pages, someone already signed in (e.g.
 * pressing Back after logging in) goes straight on to `?next=` or Jobs
 * instead of seeing the login form again. Only on /login*: /onboarding
 * signs the recruiter in itself and sends them on to their first job.
 */

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { safeNext, useSession } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

export function SignedInRedirect() {
  const session = useSession()
  const params = useSearchParams()
  const router = useRouter()
  const onLogin = usePathname().startsWith("/login")
  React.useEffect(() => {
    if (session && onLogin) router.replace(safeNext(params.get("next"), HOME))
  }, [session, onLogin, params, router])
  return null
}

/**
 * (auth) — the login steps: /login, /login/otp, /login/enterprise, and
 * /onboarding for a new recruiter.
 *
 * Framed by AuthShell: from md a brand panel with the form on the page
 * beside it, on phones a brand bar and the form under it. Already signed
 * in? Straight on to `?next=` (SignedInRedirect).
 */

import { Suspense } from "react"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignedInRedirect } from "@/components/auth/signed-in-redirect"
import type { Metadata } from "next"
import { RECRUITER_INSTALL } from "@/lib/recruiter-install"

// Installed from the login, it's the recruiter app: same home-screen icon.
export const metadata: Metadata = { ...RECRUITER_INSTALL }

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <SignedInRedirect />
      </Suspense>
      {children}
    </AuthShell>
  )
}

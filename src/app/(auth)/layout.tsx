/**
 * (auth) — the login steps: /login, /login/otp, /login/enterprise.
 *
 * Framed like the live employer.apna.co sign-in (AuthShell): brand half and
 * form half from md, a brand bar and a flat form on phones. Already signed
 * in? Straight on to `?next=` (SignedInRedirect).
 */

import { Suspense } from "react"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignedInRedirect } from "@/components/auth/signed-in-redirect"

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

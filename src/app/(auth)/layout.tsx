/**
 * (auth) — the login steps: /login, /login/otp, /login/enterprise.
 *
 * A quiet shell: the apna mark (home) and one centred card on the same
 * ambient canvas as the homepage and plans, so logging in feels like the
 * same site. No nav and no "Post a job" CTA — the only way on is to log in.
 * Already signed in? Straight on to `?next=` (SignedInRedirect).
 */

import Link from "next/link"
import { Suspense } from "react"
import { ApnaLogo } from "@apna/design-system"
import { SignedInRedirect } from "@/components/auth/signed-in-redirect"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-checkout-hero">
      <Suspense fallback={null}>
        <SignedInRedirect />
      </Suspense>
      <header className="px-4 py-4 sm:px-8">
        <Link href="/" aria-label="apna for employers, home" className="inline-flex">
          <ApnaLogo className="size-10" />
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:pt-0">
        {children}
      </main>
    </div>
  )
}

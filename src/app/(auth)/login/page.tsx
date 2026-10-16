"use client"

/**
 * /login — mobile number first ("Send OTP"), with "Click here for
 * Enterprise login", as on the live /signin. `?next=` is where to return
 * once signed in; `?phone=` prefills the number when coming back to
 * change it.
 */

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AuthCard, LegalLine } from "@/components/auth/auth-shell"
import { PhoneLoginForm } from "@/components/marketing/hero-lead-card"

function LoginInner() {
  const params = useSearchParams()
  return (
    <>
      <AuthCard>
        <PhoneLoginForm next={params.get("next") ?? undefined} defaultPhone={params.get("phone") ?? ""} />
      </AuthCard>
      <LegalLine />
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  )
}

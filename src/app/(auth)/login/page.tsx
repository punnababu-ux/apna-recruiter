"use client"

/**
 * /login — mobile number first (the homepage's login card), with
 * "Enterprise login" for email + password. `?next=` is where to return once
 * signed in; `?phone=` prefills the number when coming back to change it.
 */

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"

function LoginInner() {
  const params = useSearchParams()
  return (
    <HeroLeadCard
      title="Log in to apna"
      subtitle="Enter your mobile number to continue"
      next={params.get("next") ?? undefined}
      defaultPhone={params.get("phone") ?? ""}
      className="max-sm:p-6"
    />
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  )
}

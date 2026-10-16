"use client"

/**
 * /login/otp — the code sent to the mobile number from /login.
 *
 * Six digits; the last one verifies on its own (no extra tap). A number with
 * no account signs up here — there's no separate sign-up for SMB recruiters.
 * Resend unlocks after 30 seconds. "Change" goes back with the number kept.
 *
 * Prototype: any 6 digits sign in; 000000 shows the wrong-code state.
 */

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BackButton, Button, Card, FieldError, OtpInput } from "@apna/design-system"
import { safeNext, signIn } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

const LENGTH = 6
const RESEND_AFTER = 30

const formatPhone = (p: string) => (p.length === 10 ? `+91 ${p.slice(0, 5)} ${p.slice(5)}` : `+91 ${p}`)

function OtpInner() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params.get("phone") ?? ""
  const next = params.get("next")
  const backToNumber = `/login?${new URLSearchParams({ phone, ...(next ? { next } : {}) })}`

  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [verifying, setVerifying] = React.useState(false)
  const [wait, setWait] = React.useState(RESEND_AFTER)

  React.useEffect(() => {
    if (wait <= 0) return
    const id = window.setTimeout(() => setWait((w) => w - 1), 1000)
    return () => window.clearTimeout(id)
  }, [wait])

  // No number to send a code to: start over.
  React.useEffect(() => {
    if (phone.length !== 10) router.replace("/login")
  }, [phone, router])

  const verify = (value: string) => {
    if (value.length !== LENGTH || verifying) return
    setVerifying(true)
    // A beat, as a real check would take.
    window.setTimeout(() => {
      if (value === "000000") {
        setError("That code isn't right. Check the SMS and try again.")
        setCode("")
        setVerifying(false)
        return
      }
      signIn({ kind: "phone", phone })
      router.replace(safeNext(next, HOME))
    }, 600)
  }

  return (
    <Card padding="lg" className="flex w-full max-w-md flex-col gap-6 max-sm:p-6">
      <div className="flex flex-col gap-3">
        <BackButton onClick={() => router.push(backToNumber)} aria-label="Change mobile number" />
        <h1 className="text-h3 font-bold text-foreground">Enter the code</h1>
        <p className="text-base text-muted-foreground">
          We sent a {LENGTH}-digit code to{" "}
          <span className="font-medium whitespace-nowrap text-foreground">{formatPhone(phone)}</span>.{" "}
          <Button variant="link-inline" className="text-foreground" onClick={() => router.push(backToNumber)}>
            Change
          </Button>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <OtpInput
          length={LENGTH}
          value={code}
          onChange={(v) => {
            setCode(v)
            if (error) setError(null)
          }}
          onComplete={verify}
          invalid={!!error}
          disabled={verifying}
          autoFocus
          aria-label="Code from SMS"
        />
        {error && <FieldError>{error}</FieldError>}
      </div>

      <div className="flex flex-col gap-4">
        <Button size="xl" className="w-full" disabled={code.length !== LENGTH} loading={verifying} onClick={() => verify(code)}>
          Verify and continue
        </Button>
        <p className="text-sm text-muted-foreground">
          Didn&apos;t get it?{" "}
          {wait > 0 ? (
            <span className="whitespace-nowrap tabular-nums">Resend in 0:{String(wait).padStart(2, "0")}</span>
          ) : (
            <Button
              variant="link"
              onClick={() => {
                setWait(RESEND_AFTER)
                setCode("")
                setError(null)
              }}
            >
              Resend code
            </Button>
          )}
        </p>
      </div>

      <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        Prototype: any {LENGTH} digits log you in. 000000 shows a wrong code.
      </p>
    </Card>
  )
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpInner />
    </Suspense>
  )
}

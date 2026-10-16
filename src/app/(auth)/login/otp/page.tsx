"use client"

/**
 * /login/otp — "Verify OTP", as on the live employer.apna.co sign-in:
 * Back, the title, "A one time password sent on your mobile number" with
 * the number, four boxes, "Didn't receive OTP? Resend in 00:29 Sec", Login.
 *
 * The fourth digit logs in on its own; Login is there for anyone who'd
 * rather tap. A number with no account signs up here — there's no separate
 * sign-up for SMB recruiters. Back returns to the number with it kept.
 *
 * Prototype: any 4 digits log in; 0000 shows the wrong-OTP state.
 */

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BackButton, Button, FieldError, OtpInput } from "@apna/design-system"
import { AuthCard } from "@/components/auth/auth-shell"
import { withNext } from "@/components/marketing/hero-lead-card"
import { safeNext, signIn } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

const LENGTH = 4
const RESEND_AFTER = 30

const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

function OtpInner() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params.get("phone") ?? ""
  const next = params.get("next")
  const backToNumber = withNext("/login", next, { phone })

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
      if (value === "0000") {
        setError("Incorrect OTP. Check the SMS and try again.")
        setCode("")
        setVerifying(false)
        return
      }
      signIn({ kind: "phone", phone })
      router.replace(safeNext(next, HOME))
    }, 600)
  }

  return (
    <AuthCard>
      <div className="flex flex-col gap-3">
        <BackButton onClick={() => router.push(backToNumber)} aria-label="Back to mobile number" />
        <h2 className="text-h3 font-bold text-foreground">Verify OTP</h2>
        <p className="text-sm text-muted-foreground">
          A one time password sent on your mobile number
          <span className="block font-semibold text-foreground">+91-{phone}</span>
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
          aria-label="OTP from SMS"
        />
        {error && <FieldError>{error}</FieldError>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive OTP?{" "}
          {wait > 0 ? (
            <span className="whitespace-nowrap">
              Resend in <span className="font-medium text-foreground tabular-nums">{mmss(wait)} Sec</span>
            </span>
          ) : (
            <Button
              variant="link"
              onClick={() => {
                setWait(RESEND_AFTER)
                setCode("")
                setError(null)
              }}
            >
              Resend OTP
            </Button>
          )}
        </p>
        <Button size="lg" className="w-full" disabled={code.length !== LENGTH} loading={verifying} onClick={() => verify(code)}>
          Login
        </Button>
      </div>

      <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        Prototype: any {LENGTH} digits log you in. 0000 shows a wrong OTP.
      </p>
    </AuthCard>
  )
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpInner />
    </Suspense>
  )
}

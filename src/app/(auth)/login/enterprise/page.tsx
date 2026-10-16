"use client"

/**
 * /login/enterprise — enterprise sign-in, as on the live
 * employer.apna.co/enterprise/signin: the enterprise email first
 * ("Continue"), then the password. No sign-up — "Want to register your
 * Enterprise email? Contact us" — and "Continue with mobile" goes back to
 * the mobile login.
 *
 * Prototype: personal addresses (gmail, yahoo, outlook, hotmail…) aren't
 * enterprise accounts and get the not-registered error; any other address
 * moves on, and any password logs in except "wrong".
 */

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  BackButton,
  Button,
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
  Info,
  Input,
  Phone,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@apna/design-system"
import { AuthCard, LegalLine } from "@/components/auth/auth-shell"
import { withNext } from "@/components/marketing/hero-lead-card"
import { ENTERPRISE_LOGIN } from "@/content/auth"
import { HEADER_ACTIONS } from "@/content/nav"
import { safeNext, signIn } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PERSONAL = /@(gmail|googlemail|yahoo|ymail|outlook|hotmail|live|icloud|rediffmail)\./i

function EnterpriseInner() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get("next")
  const mobileLogin = withNext("/login", next)

  const [step, setStep] = React.useState<"email" | "password">("email")
  const [email, setEmail] = React.useState("")
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL.test(value)) return setEmailError("Enter your enterprise email address.")
    if (PERSONAL.test(value))
      return setEmailError("This email isn't registered for Enterprise login. Use your company email, or contact us to register it.")
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      setStep("password")
    }, 400)
  }

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return setPasswordError("Enter your password.")
    setBusy(true)
    window.setTimeout(() => {
      if (password === "wrong") {
        setPasswordError("That password isn't right. Try again, or ask your company admin to reset it.")
        setBusy(false)
        return
      }
      signIn({ kind: "enterprise", email: email.trim() })
      router.replace(safeNext(next, HOME))
    }, 600)
  }

  if (step === "password") {
    return (
      <AuthCard>
        <div className="flex flex-col gap-3">
          <BackButton onClick={() => setStep("email")} aria-label="Change email" />
          <h2 className="text-h3 font-bold text-foreground">Enter your password</h2>
          <p className="text-base text-muted-foreground">
            Signing in as <span className="font-medium break-all text-foreground">{email.trim()}</span>.{" "}
            <Button variant="link-inline" className="text-foreground" onClick={() => setStep("email")}>
              Change
            </Button>
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={submitPassword} noValidate>
          <Field>
            <div className="flex items-baseline justify-between gap-3">
              <FieldLabel htmlFor="ent-password">Password</FieldLabel>
              <Button
                type="button"
                variant="link"
                size="sm"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Input
              id="ent-password"
              inputSize="lg"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              autoFocus
              value={password}
              aria-invalid={!!passwordError || undefined}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError(null)
              }}
            />
            {passwordError && <FieldError>{passwordError}</FieldError>}
          </Field>
          <Button type="submit" size="lg" className="w-full" loading={busy}>
            Log in
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">Forgot your password? Your company&apos;s apna admin can reset it.</p>
        <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          Prototype: any password logs you in. &ldquo;wrong&rdquo; shows the error.
        </p>
      </AuthCard>
    )
  }

  return (
    <>
      <AuthCard>
        <h2 className="text-h4 text-foreground">{ENTERPRISE_LOGIN.title}</h2>

        <form className="flex flex-col gap-6" onSubmit={submitEmail} noValidate>
          <Field>
            <div className="flex items-center gap-1">
              <FieldLabel htmlFor="ent-email">{ENTERPRISE_LOGIN.label}</FieldLabel>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button type="button" variant="ghost" size="icon-xs" className="text-muted-foreground" aria-label={ENTERPRISE_LOGIN.hint}>
                      <Info />
                    </Button>
                  }
                />
                <TooltipContent>{ENTERPRISE_LOGIN.hint}</TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="ent-email"
              inputSize="lg"
              type="email"
              autoComplete="username"
              placeholder={ENTERPRISE_LOGIN.placeholder}
              value={email}
              aria-invalid={!!emailError || undefined}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError(null)
              }}
            />
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>
          <Button type="submit" size="lg" className="w-full" loading={busy}>
            {ENTERPRISE_LOGIN.cta}
          </Button>
        </form>

        <p className="text-sm text-foreground">
          {ENTERPRISE_LOGIN.register}{" "}
          <Button variant="link-inline" className="text-primary" render={<Link href={HEADER_ACTIONS.secondary.href} />} nativeButton={false}>
            {ENTERPRISE_LOGIN.registerLink}
          </Button>
        </p>

        <FieldSeparator>OR</FieldSeparator>

        <Button variant="outline" size="lg" className="w-full" leadingIcon={<Phone aria-hidden />} onClick={() => router.push(mobileLogin)}>
          {ENTERPRISE_LOGIN.mobile}
        </Button>

        <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          Prototype: personal emails (Gmail, Yahoo…) show the not-registered error; any company email continues.
        </p>
      </AuthCard>
      <LegalLine />
    </>
  )
}

export default function EnterpriseLoginPage() {
  return (
    <Suspense fallback={null}>
      <EnterpriseInner />
    </Suspense>
  )
}

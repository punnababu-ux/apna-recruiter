"use client"

/**
 * /login/enterprise — email + password for enterprise accounts.
 *
 * No sign-up: enterprise accounts are created by the company's apna admin,
 * so the page says so instead of offering one. Forgotten passwords also go
 * through the admin.
 *
 * Prototype: any work email with any password logs in; the password
 * "wrong" shows the incorrect-credentials state.
 */

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BackButton, Button, Card, Field, FieldError, FieldLabel, Input, Separator } from "@apna/design-system"
import { safeNext, signIn } from "@/hooks/use-session"
import { HOME } from "@/lib/apnahire/nav"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function EnterpriseInner() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get("next")
  const mobileLogin = next ? `/login?${new URLSearchParams({ next })}` : "/login"

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [touched, setTouched] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  const emailInvalid = touched && !EMAIL.test(email.trim())

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!EMAIL.test(email.trim()) || !password) return
    setSubmitting(true)
    window.setTimeout(() => {
      if (password === "wrong") {
        setError("Email or password is incorrect.")
        setSubmitting(false)
        return
      }
      signIn({ kind: "enterprise", email: email.trim() })
      router.replace(safeNext(next, HOME))
    }, 600)
  }

  return (
    <Card padding="lg" className="flex w-full max-w-md flex-col gap-6 max-sm:p-6">
      <div className="flex flex-col gap-3">
        <BackButton onClick={() => router.push(mobileLogin)} aria-label="Back to mobile login" />
        <h1 className="text-h3 font-bold text-foreground">Enterprise login</h1>
        <p className="text-base text-muted-foreground">
          Use the work email and password your company admin set up for you.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={submit} noValidate>
        <Field>
          <FieldLabel htmlFor="ent-email">Work email</FieldLabel>
          <Input
            id="ent-email"
            type="email"
            autoComplete="username"
            placeholder="name@company.com"
            value={email}
            aria-invalid={emailInvalid || undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            onBlur={() => setTouched(true)}
          />
          {emailInvalid && <FieldError>Enter your work email, like name@company.com.</FieldError>}
        </Field>

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
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            aria-invalid={(touched && !password) || !!error || undefined}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
          />
          {touched && !password && <FieldError>Enter your password.</FieldError>}
          {error && <FieldError>{error}</FieldError>}
        </Field>

        <Button type="submit" size="xl" className="mt-2 w-full" loading={submitting}>
          Log in
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Forgot your password, or don&apos;t have an account yet? Your company&apos;s apna admin can reset or create
        it for you.
      </p>

      <Separator />

      <Button variant="link-inline" className="self-start text-foreground" onClick={() => router.push(mobileLogin)}>
        Log in with mobile number instead
      </Button>

      <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        Prototype: any work email and password log you in. The password &ldquo;wrong&rdquo; shows the error.
      </p>
    </Card>
  )
}

export default function EnterpriseLoginPage() {
  return (
    <Suspense fallback={null}>
      <EnterpriseInner />
    </Suspense>
  )
}

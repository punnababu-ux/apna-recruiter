"use client"

/**
 * PhoneLoginForm / HeroLeadCard — "Let's get started", login by mobile
 * number, as on the live employer.apna.co (homepage card and /signin).
 *
 *   PhoneLoginForm   the form: title, mobile number (+91), the CTA, an "OR"
 *                    rule and "Click here for Enterprise login". The login
 *                    page (/login) puts it in AuthShell with "Send OTP".
 *   HeroLeadCard     the homepage's card: the same form ("Continue") with the
 *                    legal line inside the card.
 *
 * The CTA goes to the OTP step (/login/otp) and the enterprise link to
 * /login/enterprise, both carrying `next`, the page to return to once
 * signed in; `onContinue` / `onEnterpriseLogin` override. The number is
 * validated (10 digits) so the CTA's disabled state is real.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { Building2, Button, Card, Field, FieldLabel, FieldSeparator, inputVariants } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { PHONE_LOGIN } from "@/content/auth"
import { LegalLine } from "@/components/auth/auth-shell"

export interface PhoneLoginFormProps {
  /** "Continue" on the homepage, "Send OTP" on the login page. */
  ctaLabel?: string
  /** Where to go once signed in (passed through the login steps). */
  next?: string
  /** Prefill, e.g. when coming back from the OTP step to change the number. */
  defaultPhone?: string
  onContinue?: (phone: string) => void
  onEnterpriseLogin?: () => void
}

export const withNext = (path: string, next?: string | null, extra?: Record<string, string>) => {
  const q = new URLSearchParams({ ...extra, ...(next ? { next } : {}) }).toString()
  return q ? `${path}?${q}` : path
}

export function PhoneLoginForm({
  ctaLabel = PHONE_LOGIN.cta,
  next,
  defaultPhone = "",
  onContinue,
  onEnterpriseLogin,
}: PhoneLoginFormProps) {
  const router = useRouter()
  const [phone, setPhone] = React.useState(defaultPhone)
  const continueTo = onContinue ?? ((p: string) => router.push(withNext("/login/otp", next, { phone: p })))
  const enterprise = onEnterpriseLogin ?? (() => router.push(withNext("/login/enterprise", next)))
  const isValid = phone.length === 10

  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 font-bold text-foreground">{PHONE_LOGIN.title}</h2>
        <p className="text-base text-muted-foreground">{PHONE_LOGIN.subtitle}</p>
      </div>

      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) continueTo(phone)
        }}
      >
        <Field>
          <FieldLabel htmlFor="login-phone">{PHONE_LOGIN.label}</FieldLabel>
          {/* A fixed +91 prefix inside the field: Input's own look
              (inputVariants) on the wrapper, a bare input inside; the
              wrapper shows focus for it. */}
          <div
            className={cn(
              inputVariants({ inputSize: "lg" }),
              "flex items-center gap-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
            )}
          >
            <span className="shrink-0 text-foreground">+91</span>
            <input
              id="login-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={PHONE_LOGIN.placeholder}
              className="w-full min-w-0 border-0 bg-transparent p-0 text-base outline-none placeholder:text-muted-foreground md:text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </div>
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={!isValid}>
          {ctaLabel}
        </Button>
      </form>

      <FieldSeparator>{PHONE_LOGIN.or}</FieldSeparator>

      <Button
        type="button"
        variant="link-inline"
        className="self-start text-foreground"
        onClick={enterprise}
        leadingIcon={<Building2 aria-hidden />}
      >
        {PHONE_LOGIN.enterprise}
      </Button>
    </>
  )
}

export function HeroLeadCard({ className, ...props }: PhoneLoginFormProps & { className?: string }) {
  return (
    <Card padding="lg" className={cn("flex w-full max-w-md flex-col gap-6", className)}>
      <PhoneLoginForm ctaLabel="Continue" {...props} />
      <LegalLine className="text-xs" />
    </Card>
  )
}

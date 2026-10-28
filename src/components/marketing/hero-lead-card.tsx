"use client"

/**
 * PhoneLoginForm / HeroLeadCard — "Let's get started", login by mobile
 * number, as on the live employer.apna.co (homepage card and /signin).
 *
 *   PhoneLoginForm   the form: title, mobile number (+91), the CTA, an "OR"
 *                    rule and "Enterprise login". The login
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
import { Building2, Button, Card, Field, FieldError, FieldLabel, FieldSeparator, inputVariants } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { PHONE_LOGIN } from "@/content/auth"
import { HEADER_ACTIONS } from "@/content/nav"
import { useTrackHeroCta } from "@/hooks/use-hero-cta-hidden"
import { LegalLine } from "@/components/auth/auth-shell"

export interface PhoneLoginFormProps {
  /** "Login / Sign up" on the homepage, "Send OTP" on the login page. */
  ctaLabel?: string
  /** The homepage hero: while this CTA is scrolled away, the header's
   *  "Login / Sign up" takes over the green (useHeroCtaHidden). */
  handsOffToHeader?: boolean
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
  handsOffToHeader = false,
}: PhoneLoginFormProps) {
  const ctaRef = React.useRef<HTMLButtonElement>(null)
  useTrackHeroCta(ctaRef, handsOffToHeader)
  const router = useRouter()
  const [phone, setPhone] = React.useState(defaultPhone)
  const continueTo = onContinue ?? ((p: string) => router.push(withNext("/login/otp", next, { phone: p })))
  const enterprise = onEnterpriseLogin ?? (() => router.push(withNext("/login/enterprise", next)))
  const isValid = phone.length === 10
  // The CTA is never disabled: a disabled button can't say why. Pressing it
  // without 10 digits says so under the field and returns the cursor there;
  // typing clears it. Nothing shows before the first press.
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <h2 className="text-h3 font-bold text-foreground">{PHONE_LOGIN.title}</h2>

      <form
        className="flex flex-col gap-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) continueTo(phone)
          else {
            setError(PHONE_LOGIN.invalid)
            inputRef.current?.focus()
          }
        }}
      >
        <Field>
          <FieldLabel htmlFor="login-phone">{PHONE_LOGIN.label}</FieldLabel>
          {/* A fixed +91 prefix inside the field: Input's own look
              (inputVariants) on the wrapper, a bare input inside; the
              wrapper shows focus for it. */}
          <div
            aria-invalid={!!error || undefined}
            className={cn(
              inputVariants({ inputSize: "lg" }),
              "flex items-center gap-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
              // The error outranks the focus ring: the field stays red while
              // the cursor is back in it.
              error && "focus-within:border-destructive focus-within:ring-destructive/20"
            )}
          >
            <span className="shrink-0 text-foreground">+91</span>
            <input
              ref={inputRef}
              id="login-phone"
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "login-phone-error" : undefined}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={PHONE_LOGIN.placeholder}
              className="w-full min-w-0 border-0 bg-transparent p-0 text-base outline-none placeholder:text-muted-foreground md:text-sm"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                setError(null)
              }}
            />
          </div>
          {error && <FieldError id="login-phone-error">{error}</FieldError>}
        </Field>

        <Button ref={ctaRef} type="submit" size="lg" className="w-full">
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
    <Card padding="lg" className={cn("surface-frosted flex w-full max-w-md flex-col gap-6", className)}>
      {/* The header's label, so the header button reads as this one moving
          up when it scrolls away. */}
      <PhoneLoginForm ctaLabel={HEADER_ACTIONS.primary.label} handsOffToHeader {...props} />
      {/* Desktop: one line (it ran 3px over and dropped "Privacy policy"). */}
      <LegalLine className="text-xs md:tracking-tight md:whitespace-nowrap" />
    </Card>
  )
}

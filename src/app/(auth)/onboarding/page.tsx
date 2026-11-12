"use client"

/**
 * /onboarding — a new recruiter's one screen between the OTP and their
 * first job, after Figma "Onboarding fixes" (Onboarding file, 4127:1760 /
 * 4149:620): name, company, consultancy yes/no, company size, official
 * email, terms. "Post a job" signs them in and opens job posting.
 *
 * Above the form, the first-job offer says the price before any work is
 * done (`?offer=off` hides it; not in Figma, the idea under test).
 *
 * Prototype: reached from the OTP with 1111 (`?phone=` carries the number).
 */

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tag } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Checkbox,
  ChipTabs,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@apna/design-system"
import { AuthCard, LegalLinks } from "@/components/auth/auth-shell"
import { AFTER_ONBOARDING, ONBOARDING, isWorkEmail, type Consultancy } from "@/content/onboarding"
import { signIn } from "@/hooks/use-session"

type Errors = Partial<Record<"name" | "company" | "consultancy" | "employees" | "email" | "terms", string>>

function OnboardingInner() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params.get("phone") ?? ""
  const showOffer = params.get("offer") !== "off"

  const [name, setName] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [consultancy, setConsultancy] = React.useState<Consultancy | "">("")
  const [employees, setEmployees] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [terms, setTerms] = React.useState(false)
  // Nothing shows before the first press of the CTA; then each field clears
  // its own error as it is answered.
  const [errors, setErrors] = React.useState<Errors>({})
  const clear = (key: keyof Errors) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {
      name: name.trim() ? undefined : ONBOARDING.name.error,
      company: company.trim() ? undefined : ONBOARDING.company.error,
      consultancy: consultancy ? undefined : ONBOARDING.consultancy.error,
      employees: employees ? undefined : ONBOARDING.employees.error,
      email: isWorkEmail(email.trim().toLowerCase()) ? undefined : ONBOARDING.email.error,
      terms: terms ? undefined : ONBOARDING.terms.error,
    }
    setErrors(next)
    const first = (Object.keys(next) as (keyof Errors)[]).find((k) => next[k])
    if (first) {
      document.getElementById(`onboarding-${first}`)?.focus()
      return
    }
    signIn({ kind: "phone", phone })
    router.replace(AFTER_ONBOARDING)
  }

  return (
    <AuthCard>
      <h2 className="text-h3 font-bold text-foreground">{ONBOARDING.title}</h2>

      {showOffer && (
        <Alert variant="success">
          <Tag aria-hidden />
          <AlertTitle>{ONBOARDING.offer.title}</AlertTitle>
          <AlertDescription>{ONBOARDING.offer.body}</AlertDescription>
        </Alert>
      )}

      <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
        <Field>
          <FieldLabel htmlFor="onboarding-name">{ONBOARDING.name.label}</FieldLabel>
          <Input
            id="onboarding-name"
            inputSize="lg"
            autoComplete="name"
            placeholder={ONBOARDING.name.placeholder}
            aria-invalid={!!errors.name || undefined}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clear("name")
            }}
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="onboarding-company">{ONBOARDING.company.label}</FieldLabel>
          <Input
            id="onboarding-company"
            inputSize="lg"
            autoComplete="organization"
            placeholder={ONBOARDING.company.placeholder}
            aria-invalid={!!errors.company || undefined}
            value={company}
            onChange={(e) => {
              setCompany(e.target.value)
              clear("company")
            }}
          />
          {errors.company && <FieldError>{errors.company}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>{ONBOARDING.consultancy.label}</FieldLabel>
          <ChipTabs
            variant="choice"
            size="lg"
            aria-label={ONBOARDING.consultancy.label}
            aria-invalid={!!errors.consultancy}
            items={[...ONBOARDING.consultancy.options]}
            value={consultancy as Consultancy}
            onValueChange={(v) => {
              setConsultancy(v)
              clear("consultancy")
            }}
          />
          {errors.consultancy && <FieldError>{errors.consultancy}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>{ONBOARDING.employees.label}</FieldLabel>
          <ChipTabs
            variant="choice"
            size="lg"
            aria-label={ONBOARDING.employees.label}
            aria-invalid={!!errors.employees}
            items={[...ONBOARDING.employees.options]}
            value={employees}
            onValueChange={(v) => {
              setEmployees(v)
              clear("employees")
            }}
          />
          {errors.employees && <FieldError>{errors.employees}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="onboarding-email">{ONBOARDING.email.label}</FieldLabel>
          <Input
            id="onboarding-email"
            inputSize="lg"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={ONBOARDING.email.placeholder}
            aria-invalid={!!errors.email || undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clear("email")
            }}
          />
          {errors.email ? (
            <FieldError>{errors.email}</FieldError>
          ) : (
            <FieldDescription>{ONBOARDING.email.hint}</FieldDescription>
          )}
        </Field>

        <Field>
          <div className="flex items-start gap-3">
            {/* One text-sm line tall, so the box centres on the label's first line. */}
            <span className="flex h-5 shrink-0 items-center">
            <Checkbox
              id="onboarding-terms"
              aria-invalid={!!errors.terms || undefined}
              checked={terms}
              onCheckedChange={(v) => {
                setTerms(Boolean(v))
                clear("terms")
              }}
            />
            </span>
            <label htmlFor="onboarding-terms" className="text-sm text-muted-foreground">
              {ONBOARDING.terms.before} <LegalLinks />
            </label>
          </div>
          {errors.terms && <FieldError>{errors.terms}</FieldError>}
        </Field>

        <Button type="submit" size="lg" className="w-full">
          {ONBOARDING.cta}
        </Button>
      </form>
    </AuthCard>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingInner />
    </Suspense>
  )
}

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
 * The three typed answers carry their label inside the field
 * (FloatingInput); the chip questions keep theirs above.
 *
 * "Post a job" with answers missing: every missing answer turns red with
 * its own error, and the cursor goes to the first of them.
 *
 * PREVIEW, `?check=`: three quieter ways to say it (docs/DECISIONS.md,
 * 2026-11-13). Live is unchanged until one is picked.
 *   soft    every missing answer is marked, in words only: its error line
 *           under it, while the field, the chips and the checkbox keep
 *           their normal look. A line goes as its answer is given.
 *   note    no red and no error lines. One quiet line above the button
 *           names what is still missing, and stays until nothing is.
 *   first   only the first missing answer turns red. As each is answered
 *           the next one takes over, with no second press.
 *
 * Prototype: reached from the OTP with 1111 (`?phone=` carries the number).
 */

import * as React from "react"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  FloatingInput,
  Tag,
} from "@apna/design-system"
import { AuthCard, LegalLinks } from "@/components/auth/auth-shell"
import {
  AFTER_ONBOARDING,
  ONBOARDING,
  ONBOARDING_ANSWERS,
  isWorkEmail,
  missingNote,
  type Consultancy,
  type OnboardingAnswer,
} from "@/content/onboarding"
import { signIn } from "@/hooks/use-session"
import { cn } from "@/lib/utils"

type Errors = Partial<Record<OnboardingAnswer, string>>

/** On every question: room above and below it when the page scrolls to it. */
const QUESTION = "scroll-my-4"
const NOTE_ID = "onboarding-note"

/**
 * Sends the recruiter to an unanswered question: the cursor goes into it and
 * the whole question (label, answer, error) comes into view. A typed answer
 * and the terms carry the id themselves. A chip question has no field of its
 * own, so the id is on the question and the cursor goes to its chosen chip,
 * or its first.
 */
function goToQuestion(key: OnboardingAnswer) {
  const el = document.getElementById(`onboarding-${key}`)
  const control = el?.matches("[data-slot=field]")
    ? (el.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]') ?? el.querySelector<HTMLElement>('[role="tab"]'))
    : el
  control?.focus({ preventScroll: true })
  control?.closest("[data-slot=field]")?.scrollIntoView({ block: "nearest" })
}

/** One typed answer: its label inside the field, its error or hint under it. */
function TextAnswer({
  id,
  label,
  example,
  error,
  wordsOnly = false,
  hint,
  onChange,
  ...input
}: {
  id: string
  label: string
  /** Shown only while the field is focused and empty. */
  example?: string
  error?: string
  /** The error is said under the field and the field keeps its normal look. */
  wordsOnly?: boolean
  hint?: string
  value: string
  onChange: (value: string) => void
} & Pick<React.ComponentProps<"input">, "type" | "inputMode" | "autoComplete">) {
  const note = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <Field className={QUESTION}>
      <FloatingInput
        id={id}
        label={label}
        placeholder={example}
        aria-invalid={(!!error && !wordsOnly) || undefined}
        aria-describedby={note}
        onChange={(e) => onChange(e.target.value)}
        {...input}
      />
      {error ? <FieldError id={note}>{error}</FieldError> : hint ? <FieldDescription id={note}>{hint}</FieldDescription> : null}
    </Field>
  )
}

function OnboardingInner() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params.get("phone") ?? ""
  const showOffer = params.get("offer") !== "off"
  const checkParam = params.get("check")
  const check = checkParam === "soft" || checkParam === "note" || checkParam === "first" ? checkParam : "live"

  const [name, setName] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [consultancy, setConsultancy] = React.useState<Consultancy | "">("")
  const [employees, setEmployees] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [terms, setTerms] = React.useState(false)

  // What is still missing as the answers stand now, in the form's order.
  const missing: Errors = {
    name: name.trim() ? undefined : ONBOARDING.name.error,
    company: company.trim() ? undefined : ONBOARDING.company.error,
    consultancy: consultancy ? undefined : ONBOARDING.consultancy.error,
    employees: employees ? undefined : ONBOARDING.employees.error,
    email: isWorkEmail(email.trim().toLowerCase()) ? undefined : ONBOARDING.email.error,
    terms: terms ? undefined : ONBOARDING.terms.error,
  }
  const stillMissing = ONBOARDING_ANSWERS.filter((key) => missing[key])
  const firstMissing = stillMissing[0]

  // Live: nothing shows before the first press of the CTA; then each field
  // clears its own error as it is answered.
  const [errors, setErrors] = React.useState<Errors>({})
  const clear = (key: OnboardingAnswer) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  // The previews: from the first press with answers missing, they follow
  // what is missing as it changes.
  const [pressed, setPressed] = React.useState(false)
  const shown: Errors =
    check === "live"
      ? errors
      : !pressed
        ? {}
        : check === "soft"
          ? missing
          : check === "first" && firstMissing
            ? { [firstMissing]: missing[firstMissing] }
            : {}
  // `soft`: each gap is said in words under its question. The field, the
  // chips and the checkbox are not painted red.
  const wordsOnly = check === "soft"
  const note = check === "note" && pressed ? missingNote(stillMissing) : ""

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstMissing) {
      setErrors(missing)
      setPressed(true)
      goToQuestion(firstMissing)
      return
    }
    signIn({ kind: "phone", phone })
    router.replace(AFTER_ONBOARDING)
  }

  const cta = (
    <Button type="submit" size="lg" className="w-full" aria-describedby={note ? NOTE_ID : undefined}>
      {ONBOARDING.cta}
    </Button>
  )

  return (
    <AuthCard>
      <h2 className="text-h3 font-bold text-foreground">{ONBOARDING.title}</h2>

      {showOffer && (
        // An offer, not an alert: nothing went wrong and nothing just changed.
        <Alert variant="success" role="note">
          <Tag aria-hidden />
          <AlertTitle>{ONBOARDING.offer.title}</AlertTitle>
          <AlertDescription>{ONBOARDING.offer.body}</AlertDescription>
        </Alert>
      )}

      <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
        <TextAnswer
          id="onboarding-name"
          label={ONBOARDING.name.label}
          autoComplete="name"
          error={shown.name}
          wordsOnly={wordsOnly}
          value={name}
          onChange={(v) => {
            setName(v)
            clear("name")
          }}
        />

        <TextAnswer
          id="onboarding-company"
          label={ONBOARDING.company.label}
          example={ONBOARDING.company.example}
          autoComplete="organization"
          error={shown.company}
          wordsOnly={wordsOnly}
          value={company}
          onChange={(v) => {
            setCompany(v)
            clear("company")
          }}
        />

        <Field id="onboarding-consultancy" className={QUESTION}>
          <FieldLabel>{ONBOARDING.consultancy.label}</FieldLabel>
          <ChipTabs
            variant="choice"
            size="lg"
            aria-label={ONBOARDING.consultancy.label}
            aria-invalid={!!shown.consultancy && !wordsOnly}
            items={[...ONBOARDING.consultancy.options]}
            value={consultancy as Consultancy}
            onValueChange={(v) => {
              setConsultancy(v)
              clear("consultancy")
            }}
          />
          {shown.consultancy && <FieldError>{shown.consultancy}</FieldError>}
        </Field>

        <Field id="onboarding-employees" className={QUESTION}>
          <FieldLabel>{ONBOARDING.employees.label}</FieldLabel>
          <ChipTabs
            variant="choice"
            size="lg"
            aria-label={ONBOARDING.employees.label}
            aria-invalid={!!shown.employees && !wordsOnly}
            items={[...ONBOARDING.employees.options]}
            value={employees}
            onValueChange={(v) => {
              setEmployees(v)
              clear("employees")
            }}
          />
          {shown.employees && <FieldError>{shown.employees}</FieldError>}
        </Field>

        <TextAnswer
          id="onboarding-email"
          label={ONBOARDING.email.label}
          type="email"
          inputMode="email"
          autoComplete="email"
          error={shown.email}
          wordsOnly={wordsOnly}
          hint={ONBOARDING.email.hint}
          value={email}
          onChange={(v) => {
            setEmail(v)
            clear("email")
          }}
        />

        <Field className={QUESTION}>
          <div className="flex items-start gap-3">
            {/* One text-sm line tall, so the box centres on the label's first line. */}
            <span className="flex h-5 shrink-0 items-center">
            <Checkbox
              id="onboarding-terms"
              aria-invalid={(!!shown.terms && !wordsOnly) || undefined}
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
          {shown.terms && <FieldError>{shown.terms}</FieldError>}
        </Field>

        {check === "note" ? (
          <div className={cn("flex flex-col", note && "gap-4")}>
            {/* In the page from the start in this look, so a screen reader
                hears the line when it appears. */}
            <p id={NOTE_ID} role="status" className="text-sm text-muted-foreground">
              {note}
            </p>
            {cta}
          </div>
        ) : (
          cta
        )}
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

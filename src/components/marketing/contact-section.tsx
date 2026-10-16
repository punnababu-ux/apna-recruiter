"use client"

/**
 * ContactSection — the homepage's closing "Contact us" band (`#contact-us`,
 * where every "Contact us" link lands now that the header doesn't carry
 * one). The live employer.apna.co/contact-us form, as a section: the pitch
 * and three steps on the left, the form in a card on the right (one column
 * on phones, form under the pitch).
 *
 * Fields and options are verbatim from the live page (content/contact.ts).
 * Validation runs on submit (required fields, a work email, a 10-digit
 * mobile number) and then shows the thank-you state.
 *
 * PROTOTYPE: there's no backend here — submitting sends nothing anywhere;
 * it only swaps the form for the confirmation. Wire `onSubmit` to the real
 * lead endpoint when one exists.
 */

import * as React from "react"
import {
  Button,
  Card,
  CheckCircle2,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Section,
  SectionHeading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  inputVariants,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { CONTACT, CONTACT_ANCHOR } from "@/content/contact"
import { LEGAL_LINKS } from "@/content/footer"

type Values = { name: string; email: string; phone: string; role: string; company: string; size: string }
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { name: "", email: "", phone: "", role: "", company: "", size: "" }
const TERMS_HREF = LEGAL_LINKS.find((l) => l.label === "Terms of service")!.href
const PRIVACY_HREF = LEGAL_LINKS.find((l) => l.label === "Privacy Policy")!.href

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = "Enter your full name"
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid work email"
  if (v.phone.length !== 10) e.phone = "Enter a 10-digit mobile number"
  if (!v.role) e.role = "Select your role"
  if (!v.company.trim()) e.company = "Enter your company name"
  if (!v.size) e.size = "Select your company size"
  return e
}

export function ContactSection() {
  const [values, setValues] = React.useState<Values>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [sent, setSent] = React.useState(false)

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    // Clear a field's error as soon as it's edited.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) setSent(true)
  }

  return (
    <Section id={CONTACT_ANCHOR} size="md" className="scroll-mt-20">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            level={2}
            eyebrow={<span className="text-overline text-primary">{CONTACT.eyebrow}</span>}
            title={CONTACT.title}
          />
          <ul className="flex flex-col gap-4">
            {CONTACT.steps.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <p className="text-base text-muted-foreground">{step}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* rounded-3xl: the page's large cards share one corner. */}
        <Card padding="lg" className="rounded-3xl">
          {sent ? (
            <div role="status" className="flex flex-col items-start gap-3 py-6">
              <CheckCircle2 className="size-10 text-primary" aria-hidden />
              <h3 className="text-h5 text-foreground">{CONTACT.success.title}</h3>
              <p className="text-base text-muted-foreground">{CONTACT.success.body}</p>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="flex flex-col gap-6">
              <h3 className="text-h5 text-foreground">{CONTACT.formTitle}</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <TextField id="contact-name" label={CONTACT.fields.name} autoComplete="name"
                  value={values.name} onChange={set("name")} error={errors.name} />
                <TextField id="contact-email" label={CONTACT.fields.email} type="email" autoComplete="email"
                  value={values.email} onChange={set("email")} error={errors.email} />

                <Field data-invalid={errors.phone ? true : undefined}>
                  <FieldLabel htmlFor="contact-phone">{CONTACT.fields.phone}*</FieldLabel>
                  {/* A fixed +91 inside the field, as on the sign-up card. */}
                  <div
                    className={cn(
                      inputVariants(),
                      "flex items-center gap-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                      errors.phone && "border-destructive"
                    )}
                  >
                    <span className="shrink-0 text-foreground">+91</span>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      aria-invalid={errors.phone ? true : undefined}
                      className="w-full min-w-0 border-0 bg-transparent p-0 text-base outline-none placeholder:text-muted-foreground md:text-sm"
                      value={values.phone}
                      onChange={(e) => set("phone")(e.target.value.replace(/\D/g, "").slice(-10))}
                    />
                  </div>
                  {errors.phone && <FieldError>{errors.phone}</FieldError>}
                </Field>

                <ChoiceField id="contact-role" label={CONTACT.fields.role} options={CONTACT.roles}
                  value={values.role} onChange={set("role")} error={errors.role} />
                <TextField id="contact-company" label={CONTACT.fields.company} autoComplete="organization"
                  value={values.company} onChange={set("company")} error={errors.company} />
                <ChoiceField id="contact-size" label={CONTACT.fields.size} options={CONTACT.sizes}
                  value={values.size} onChange={set("size")} error={errors.size} />
              </div>

              <div className="flex flex-col gap-4">
                <Button type="submit" size="lg" className="w-full sm:w-fit sm:min-w-40">
                  {CONTACT.submit}
                </Button>
                <p className="text-xs text-muted-foreground">
                  By clicking “Submit” I agree to the{" "}
                  <a href={TERMS_HREF} target="_blank" rel="noreferrer noopener" className="text-info underline">
                    Terms of Use
                  </a>{" "}
                  and the{" "}
                  <a href={PRIVACY_HREF} target="_blank" rel="noreferrer noopener" className="text-info underline">
                    Privacy Statement
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </Card>
      </div>
    </Section>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}*</FieldLabel>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

function ChoiceField({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}*</FieldLabel>
      <Select value={value || null} onValueChange={(v) => onChange((v as string | null) ?? "")}>
        <SelectTrigger id={id} aria-invalid={error ? true : undefined} className="w-full">
          <SelectValue placeholder={CONTACT.select} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

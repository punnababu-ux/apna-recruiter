"use client"

/**
 * ContactSection — the homepage's closing "Contact us" band (`#contact-us`,
 * where every "Contact us" link lands now that the header doesn't carry
 * one): a card with the eyebrow, the title and one Contact us button, which
 * opens the contact form in a pop-up (user call, 2026-10-16 — the form
 * inline made the band heavy).
 *
 * Fields and options are verbatim from employer.apna.co/contact-us
 * (content/contact.ts). Validation runs on submit (required fields, a work
 * email, a 10-digit mobile number), then the pop-up shows the thank-you
 * state; reopening starts a fresh form.
 *
 * PROTOTYPE: there's no backend here — submitting sends nothing anywhere;
 * it only swaps the form for the confirmation. Wire `submit` to the real
 * lead endpoint when one exists.
 */

import * as React from "react"
import {
  Button,
  Card,
  CheckCircle2,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  const [open, setOpen] = React.useState(false)
  // A new key per opening, so a reopened pop-up starts with a fresh form
  // (not the last one's values or its thank-you state).
  const [round, setRound] = React.useState(0)

  return (
    <Section id={CONTACT_ANCHOR} size="md" className="scroll-mt-20">
      {/* rounded-3xl: the page's large cards share one corner. */}
      <Card padding="lg" className="rounded-3xl sm:p-10">
        <SectionHeading
          level={2}
          eyebrow={<span className="text-overline text-primary">{CONTACT.eyebrow}</span>}
          title={CONTACT.title}
          actions={
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setRound((r) => r + 1)
                setOpen(true)
              }}
            >
              {CONTACT.eyebrow}
            </Button>
          }
        />
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-6 rounded-3xl p-6 sm:max-w-xl sm:p-8">
          <ContactForm key={round} />
        </DialogContent>
      </Dialog>
    </Section>
  )
}

function ContactForm() {
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

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-3 py-4">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <DialogTitle className="text-h5 text-foreground">{CONTACT.success.title}</DialogTitle>
        <DialogDescription className="text-base text-muted-foreground">{CONTACT.success.body}</DialogDescription>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-6">
      <DialogHeader className="gap-1">
        <DialogTitle className="text-h5 text-foreground">{CONTACT.formTitle}</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">{CONTACT.steps[1]}</DialogDescription>
      </DialogHeader>
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

"use client"

/**
 * ContactSection — the homepage's closing "Contact us" band (`#contact-us`,
 * where every "Contact us" link lands now that the header doesn't carry
 * one): a card with the title centred and one Contact us button under it, which
 * opens the contact form in a pop-up (a bottom sheet on phones) (user call, 2026-10-16 — the form
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
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  inputVariants,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"
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

/** One band for every marketing page, rendered by the marketing layout just
 *  above the footer — the same "Join over 7 Lakhs+ employers" card and
 *  contact form everywhere. A page that wants its own line on it (Culture)
 *  renders it itself with `title`; that marks it as the page's closing band
 *  (data-closing-band), so the layout skips the shared one there. */
export function ContactSection({
  title,
  description,
  cta,
}: { title?: string; description?: string; cta?: string } = {}) {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  // A new key per opening, so a reopened pop-up starts with a fresh form
  // (not the last one's values or its thank-you state).
  const [round, setRound] = React.useState(0)

  return (
    // No bottom padding: the card sits right above the footer, whose own
    // 80px top padding is the gap (with the band's padding too it was 176px).
    // On the canvas, with the footer: the footer's own top padding is the
    // gap below, so the band has none.
    <Section
      id={CONTACT_ANCHOR}
      data-closing-band={title ? true : undefined}
      size="md"
      className="scroll-mt-20 pb-0 md:pb-0"
    >
      {/* Card's own corner (rounded-card), like every card. Title centred,
          the button under it — the dark emphasis button, like the product
          cards' "Learn more" (green stays with the hero's sign-up). */}
      {/* Frosted, like the header pill: the gradient shows through. */}
      <Card
        padding="lg"
        className="surface-feature flex flex-col items-center gap-8 text-center sm:p-12"
      >
        {/* The page's closing line: the h1 type preset (it stays an h2 —
            the hero owns the h1). One line on desktop; on phones the h3 size
            (at 36px it broke into five lines on a 375px screen). */}
        <div className="flex flex-col gap-3">
          <h2 className="text-editorial-h2 text-balance text-foreground sm:text-editorial-h1">{title ?? CONTACT.title}</h2>
          {description && <p className="text-lg text-pretty text-muted-foreground">{description}</p>}
        </div>
        <Button
          variant="emphasis"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => {
            setRound((r) => r + 1)
            setOpen(true)
          }}
        >
          {cta ?? CONTACT.cta}
        </Button>
      </Card>

      {/* Phones: a bottom sheet (the system's pop-up on a phone); from md, a
          centred dialog. Same form in both. */}
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          {/* The sheet is capped below the viewport and can't clip (its close
              bubble sits outside it), so the form scrolls in its own wrapper,
              rounded to the sheet's top corners. */}
          <SheetContent side="bottom" className="gap-0 rounded-t-3xl border-t-0 p-0 pb-safe">
            <div className="min-h-0 overflow-y-auto overscroll-contain rounded-t-3xl p-5">
              <ContactForm key={round} Title={SheetTitle} Description={SheetDescription} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="gap-6 rounded-3xl p-6 sm:max-w-xl sm:p-8">
            <ContactForm key={round} Title={DialogTitle} Description={DialogDescription} />
          </DialogContent>
        </Dialog>
      )}
    </Section>
  )
}

/** The pop-up's title/description parts — Dialog's or Sheet's, whichever
 *  is hosting the form (each wires its own accessible name). */
type PartProps = { className?: string; children?: React.ReactNode }

function ContactForm({
  Title,
  Description,
}: {
  Title: React.ComponentType<PartProps>
  Description: React.ComponentType<PartProps>
}) {
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
        <Title className="text-h5 text-foreground">{CONTACT.success.title}</Title>
        <Description className="text-base text-muted-foreground">{CONTACT.success.body}</Description>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <Title className="text-h5 text-foreground">{CONTACT.formTitle}</Title>
        <Description className="text-sm text-muted-foreground">{CONTACT.steps[1]}</Description>
      </div>
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
          <Button variant="link-inline" nativeButton={false} render={<a href={TERMS_HREF} target="_blank" rel="noreferrer noopener" />}>Terms of Use</Button>{" "}
          and the{" "}
          <Button variant="link-inline" nativeButton={false} render={<a href={PRIVACY_HREF} target="_blank" rel="noreferrer noopener" />}>Privacy Statement</Button>
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

"use client"

/**
 * HeroLeadCard — the "Let's get started" lead-capture card that sits beside
 * the homepage hero's headline. Matches the live employer.apna.co
 * lead-capture card (screenshot supplied by the user), rebuilt on `Card` —
 * white, `tone="default"`, no dark-surface complications.
 *
 * No real backend exists yet, so `onContinue` and `onEnterpriseLogin` are
 * optional and default to no-ops — the same pattern `ContactSalesCard` and
 * other prototype CTAs in this codebase already use. The phone field is
 * genuinely validated (10 digits, numeric-only) so the disabled state on
 * `Continue` is real, not decorative.
 */

import * as React from "react"
import {
  Building2,
  Button,
  Card,
  Field,
  FieldLabel,
  Separator,
  inputVariants,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { LEGAL_LINKS } from "@/content/footer"

const TERMS_HREF = LEGAL_LINKS.find((l) => l.label === "Terms of service")!.href
const PRIVACY_HREF = LEGAL_LINKS.find((l) => l.label === "Privacy Policy")!.href

export interface HeroLeadCardProps {
  className?: string
  onContinue?: (phone: string) => void
  onEnterpriseLogin?: () => void
}

export function HeroLeadCard({ className, onContinue, onEnterpriseLogin }: HeroLeadCardProps) {
  const [phone, setPhone] = React.useState("")
  const isValid = phone.length === 10

  return (
    <Card padding="lg" className={cn("flex w-full max-w-md flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 font-heading font-bold text-foreground">
          Let&apos;s get started
        </h2>
        <p className="text-base text-muted-foreground">Hire top talent faster with apna</p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) onContinue?.(phone)
        }}
      >
        <Field>
          <FieldLabel htmlFor="hero-lead-phone">Mobile number</FieldLabel>
          {/* No InputGroup primitive exists yet for a fixed prefix inside a
              field — this is the one place that needs it so far, so it's
              hand-built rather than promoted to the design system ("backfill
              primitives as needed"). Reuses the DS's own `inputVariants` on
              the wrapper so it's pixel-identical to a plain Input, with a
              bare native <input> inside carrying none of that styling
              itself — avoids Base UI's Input/Field.Control wiring, which
              isn't built for a compound control like this. */}
          <div className={cn(inputVariants({ inputSize: "default" }), "flex items-center gap-2")}>
            <span className="flex shrink-0 items-center gap-1.5 border-r border-border pr-2 text-foreground">
              <span aria-hidden>🇮🇳</span>
              +91
            </span>
            <input
              id="hero-lead-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter 10 digit mobile number"
              className="w-full min-w-0 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </div>
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={!isValid}>
          Continue
        </Button>
      </form>

      <Separator />

      <button
        type="button"
        onClick={onEnterpriseLogin}
        className="inline-flex items-center gap-2 text-sm font-bold text-foreground underline underline-offset-2"
      >
        <Building2 className="size-4" aria-hidden />
        Enterprise login
      </button>

      <p className="text-xs text-muted-foreground">
        By clicking continue, you agree to the apna{" "}
        <a href={TERMS_HREF} target="_blank" rel="noreferrer noopener" className="text-primary underline">
          Terms of service
        </a>{" "}
        &amp;{" "}
        <a href={PRIVACY_HREF} target="_blank" rel="noreferrer noopener" className="text-primary underline">
          Privacy policy
        </a>
      </p>
    </Card>
  )
}

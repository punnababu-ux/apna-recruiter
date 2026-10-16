/**
 * AuthShell — the login pages' frame, after the live employer.apna.co
 * sign-in (/signin, /enterprise/signin).
 *
 *   From md   two halves: on the left the apnaHire wordmark, the headline,
 *             one line and three stats; on the right a grey panel with
 *             "Looking for a job?" top-right and the form in a card.
 *   Phones    an apnaHire bar with "Looking for a job?", then the form flat
 *             on white (no card).
 * Steps that ask for consent (number, enterprise email) put LegalLine under
 * their card; Verify OTP doesn't, as on the live site.
 *
 * Pages pass their form wrapped in AuthCard, which is a card from md and
 * flat on phones.
 */

import Link from "next/link"
import { AmbientBackdrop, ArrowUpRight, Card, LogoApnaHire, Separator } from "@apna/design-system"
import { AUTH_PANEL, LEGAL_LINE, LOOKING_FOR_A_JOB_LINK } from "@/content/auth"
import { LEGAL_LINKS } from "@/content/footer"
import { cn } from "@/lib/utils"

const TERMS_HREF = LEGAL_LINKS.find((l) => l.label === "Terms of service")!.href
const PRIVACY_HREF = LEGAL_LINKS.find((l) => l.label === "Privacy Policy")!.href

function LookingForJob() {
  return (
    <a
      href={LOOKING_FOR_A_JOB_LINK.href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-interactive hover:text-foreground"
    >
      {LOOKING_FOR_A_JOB_LINK.label}
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  )
}

export function LegalLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {LEGAL_LINE}{" "}
      <a href={TERMS_HREF} target="_blank" rel="noreferrer noopener" className="text-info underline">
        Terms of service
      </a>{" "}
      &amp;{" "}
      <a href={PRIVACY_HREF} target="_blank" rel="noreferrer noopener" className="text-info underline">
        Privacy policy
      </a>
    </p>
  )
}

/** The form's surface: a card from md, flat on the phone's white page.
 *  rounded-3xl (19.5px), like the homepage's sign-up card and every other
 *  large card on the site. */
export function AuthCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Card
      className={cn(
        "flex w-full flex-col gap-6 rounded-3xl shadow-elevated max-md:border-transparent max-md:bg-transparent max-md:p-0 max-md:shadow-none",
        className
      )}
    >
      {children}
    </Card>
  )
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-card md:flex-row">
      {/* Phones: the brand bar. */}
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 shadow-card md:hidden">
        <Link href="/" aria-label="apna Hire, home">
          <LogoApnaHire className="h-6 w-auto" />
        </Link>
        <LookingForJob />
      </header>

      {/* From md: the brand half — on the homepage hero's background (the
          same gradient and AmbientBackdrop), so signing in still feels like
          the site it came from rather than a blank white page. */}
      <aside className="bg-gradient-checkout-hero relative isolate hidden flex-1 flex-col overflow-hidden px-10 py-8 md:flex lg:px-20">
        <AmbientBackdrop className="inset-0" />
        <Link href="/" aria-label="apna Hire, home" className="relative self-start">
          <LogoApnaHire className="h-6 w-auto" />
        </Link>
        <div className="relative my-auto flex max-w-md flex-col gap-6 py-10">
          <h1 className="text-h1 text-foreground">{AUTH_PANEL.headline}</h1>
          <p className="text-base text-foreground">{AUTH_PANEL.description}</p>
          {/* foreground at low alpha: the default border colour vanished on
              the hero gradient. */}
          <Separator className="bg-foreground/15" />
          <dl className="grid grid-cols-3 gap-6">
            {AUTH_PANEL.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
                {/* Dark, like the homepage hero's stats (not green). */}
                <dd className="order-1 font-heading text-h3 font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* The form half: grey panel from md. */}
      <main className="flex flex-1 flex-col md:bg-muted">
        <div className="hidden justify-end px-8 py-5 md:flex">
          <LookingForJob />
        </div>
        <div className="flex flex-1 flex-col items-center px-4 pt-8 pb-12 md:justify-center md:px-8 md:pt-0">
          <div className="flex w-full max-w-md flex-col gap-4">{children}</div>
        </div>
      </main>
    </div>
  )
}

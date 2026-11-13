/**
 * AuthShell — the login pages' frame: /login, /login/otp, /login/enterprise
 * and /onboarding share it.
 *
 *   From md   one white page. The brand is a rounded panel (`rounded-card`)
 *             inset 16px from the window: the apna Recruiter wordmark and
 *             "Looking for a job?" on its top line, then the headline, one
 *             line and three stats. The form sits on the page beside it,
 *             with no card and no grey half. The panel stays in view while
 *             a long form (onboarding) scrolls.
 *   Phones    a brand bar with "Looking for a job?", then the form flat on
 *             white.
 *
 * Until 2026-11-13 the desktop frame was a brand half, a grey half and the
 * form in a white card on the grey: three surfaces to hold one form
 * (docs/DECISIONS.md, "Login and onboarding on desktop").
 *
 * Steps that ask for consent (number, enterprise email) put LegalLine under
 * their form; Verify OTP doesn't, as on the live site.
 *
 * Pages pass their form wrapped in AuthCard.
 */

import Link from "next/link"
import { AmbientBackdrop, ArrowUpRight, Button, LogoApnaRecruiter, Separator } from "@apna/design-system"
import { AUTH_PANEL, LEGAL_LINE, LOOKING_FOR_A_JOB_LINK } from "@/content/auth"
import { LEGAL_LINKS } from "@/content/footer"
import { Stat } from "@/components/marketing/page-blocks"
import { cn } from "@/lib/utils"

const TERMS_HREF = LEGAL_LINKS.find((l) => l.label === "Terms of service")!.href
const PRIVACY_HREF = LEGAL_LINKS.find((l) => l.label === "Privacy policy")!.href

/** "Looking for a job?", for a candidate who landed on the recruiter login.
 *  `onMesh`: on the brand panel's gradient the gray measured 3.9:1, so it
 *  takes the foreground there, like the site header's links. */
function LookingForJob({ onMesh = false }: { onMesh?: boolean }) {
  return (
    <a
      href={LOOKING_FOR_A_JOB_LINK.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-interactive",
        onMesh ? "text-foreground underline-offset-4 hover:underline" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {LOOKING_FOR_A_JOB_LINK.label}
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  )
}

export function LegalLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {LEGAL_LINE} <LegalLinks />
    </p>
  )
}

/** "Terms of service & Privacy policy", for a line or a consent checkbox. */
export function LegalLinks() {
  return (
    <>
      <Button variant="link-inline" nativeButton={false} render={<a href={TERMS_HREF} target="_blank" rel="noreferrer noopener" />}>Terms of service</Button>{" "}
      &amp;{" "}
      <Button variant="link-inline" nativeButton={false} render={<a href={PRIVACY_HREF} target="_blank" rel="noreferrer noopener" />}>Privacy policy</Button>
    </>
  )
}

/** One login step's block: its title, form and links, 24px apart, flat on
 *  the page at every width. The name is from when it was a card from md; it
 *  has no surface of its own since 2026-11-13. */
export function AuthCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex w-full flex-col gap-6", className)}>{children}</div>
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-card md:flex-row">
      {/* Phones: the brand bar. */}
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 shadow-card md:hidden">
        {/* The logo gives way at 320px, where it and the link ran 12px past
            the screen. */}
        <Link href="/" aria-label="apna Hire, home" className="min-w-0">
          <LogoApnaRecruiter className="h-6 w-auto max-w-full" />
        </Link>
        <LookingForJob />
      </header>

      {/* From md: the brand panel, inset 16px and the height of the window,
          so it stays in view while a long form scrolls. */}
      <div className="hidden flex-1 md:sticky md:top-0 md:flex md:h-dvh md:p-4">
        {/* On the homepage hero's background (the same gradient and
            AmbientBackdrop), so signing in still feels like the site it came
            from. It is the phone's brand bar grown tall, so it carries the
            logo and the link, and the form side holds only the form. */}
        <aside className="bg-gradient-checkout-hero relative isolate flex flex-1 flex-col overflow-hidden rounded-card px-6 py-8 lg:px-16">
          <AmbientBackdrop className="inset-0" />
          <div className="relative flex items-center justify-between gap-4">
            <Link href="/" aria-label="apna Hire, home">
              <LogoApnaRecruiter className="h-6 w-auto" />
            </Link>
            <LookingForJob onMesh />
          </div>
          <div className="relative my-auto flex max-w-md flex-col gap-6 py-10">
            <h1 className="text-h1 text-foreground">{AUTH_PANEL.headline}</h1>
            <p className="text-base text-foreground">{AUTH_PANEL.description}</p>
            {/* foreground at low alpha: the default border colour vanished on
                the hero gradient. */}
            <Separator className="bg-foreground/15" />
            {/* The homepage hero's stats — same numbers, same look. Three
                fixed columns: this column is narrower than the hero's, and a
                wrapping row dropped the third stat onto a line of its own. */}
            <dl className="grid grid-cols-3 gap-6">
              {AUTH_PANEL.stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} size="sm" />
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* The form side: the page itself. A short form centres in the full
          height; a long one scrolls. */}
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center px-4 pt-8 pb-12 md:justify-center md:px-8 md:py-8">
          <div className="flex w-full max-w-md flex-col gap-4">{children}</div>
        </div>
      </main>
    </div>
  )
}

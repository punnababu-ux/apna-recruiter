/**
 * Login copy — verbatim from the live employer.apna.co sign-in pages
 * (/signin and /enterprise/signin, checked 2026-10-16), the reference for
 * login and onboarding.
 */

import { HOME_HERO } from "@/content/home"

export const AUTH_PANEL = {
  headline: "Hire top talent in 48 hours with apna.",
  description: "Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.",
  /** The homepage hero's stats, not the live sign-in page's own (6 Crore+ /
   *  7 Lakhs+ / 900+ cities): one site, one set of numbers (user call,
   *  2026-10-16) — the city count disagreed (900+ vs 7,200+). */
  stats: HOME_HERO.stats,
}

export const LOOKING_FOR_A_JOB_LINK = { label: "Looking for a job?", href: "https://apna.co" }

export const PHONE_LOGIN = {
  title: "Let’s get started",
  label: "Mobile number",
  placeholder: "Enter your mobile number",
  /** "Login / Sign up" on the homepage card (the header's label, so the
   *  header button reads as this one moving up), "Send OTP" on the
   *  sign-in page. */
  cta: "Send OTP",
  /** Shown under the field when the CTA is pressed without 10 digits. */
  invalid: "Enter your 10-digit mobile number",
  or: "OR",
  enterprise: "Click here for Enterprise login",
}

export const ENTERPRISE_LOGIN = {
  title: "Sign in with your Enterprise email",
  label: "Enterprise Email",
  hint: "This email is for enterprise users only",
  placeholder: "Enter Enterprise email address",
  cta: "Continue",
  register: "Want to register your Enterprise email?",
  registerLink: "Contact us",
  mobile: "Continue with mobile",
}

// Under three different CTAs (Login / Sign up, Send OTP, Log in), so it
// names none of them.
export const LEGAL_LINE = "By continuing, you agree to the apna"

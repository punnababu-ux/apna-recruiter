/**
 * Login copy — verbatim from the live employer.apna.co sign-in pages
 * (/signin and /enterprise/signin, checked 2026-10-16), the reference for
 * login and onboarding.
 */

import type { Stat } from "@/content/home"

export const AUTH_PANEL = {
  headline: "Hire top talent in 48 hours with apna.",
  description: "Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.",
  stats: [
    { value: "6 Crore+", label: "Qualified candidates" },
    { value: "7 Lakhs+", label: "Employers use apna" },
    { value: "900+", label: "Available cities" },
  ] satisfies Stat[],
}

export const LOOKING_FOR_A_JOB_LINK = { label: "Looking for a job?", href: "https://apna.co" }

export const PHONE_LOGIN = {
  title: "Let’s get started",
  label: "Mobile number",
  placeholder: "Enter your mobile number",
  /** "Continue" on the homepage card, "Send OTP" on the sign-in page. */
  cta: "Send OTP",
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

export const LEGAL_LINE = "By clicking continue, you agree to the apna"

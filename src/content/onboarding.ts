/**
 * Onboarding copy: the one screen a new recruiter fills between the OTP and
 * their first job. Fields and the employee ranges are the live ones
 * (Confluence "Employer Onboarding Flow: Mandatory Email and Employee Count
 * Verification", 2026-08-12); the offer line is Punna's idea, still to be
 * tested (docs/DECISIONS.md, 2026-11-12).
 */

import { JOB_PLAN_TIERS } from "@/content/job-plans"
import { inr } from "@/lib/format"

export const ONBOARDING = {
  title: "Create your recruiter account",
  /** Says the price before the form, with a reason to go on today. */
  offer: {
    title: "10% off your first job",
    body: `Post it today. Jobs start at ${inr(JOB_PLAN_TIERS.classic.price)}.`,
  },
  name: { label: "Your full name", placeholder: "Enter your full name", error: "Enter your full name." },
  company: { label: "Company name", placeholder: "e.g. Swiggy", error: "Enter your company name." },
  consultancy: {
    label: "Are you a consultancy (hiring or staffing agency)?",
    error: "Select yes or no.",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  employees: {
    label: "Number of employees in your company",
    error: "Select the number of employees in your company.",
    options: ["0–50", "51–100", "101–300", "301–500", "501–1,000", "1,000+", "Not sure"].map((r) => ({ value: r, label: r })),
  },
  /** Required: the live spec makes the email mandatory (Figma's phone frame still says optional). */
  email: {
    label: "Official email ID",
    placeholder: "Enter your work email address",
    hint: "We’ll send a verification link and code to this email.",
    error: "Enter a valid work email address.",
  },
  terms: { before: "I agree to the apna", error: "Agree to the terms to continue." },
  cta: "Post a job",
} as const

export type Consultancy = (typeof ONBOARDING.consultancy.options)[number]["value"]

/** The spec's basic format rule. */
export const isWorkEmail = (v: string) => v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/** Where a new recruiter goes next: straight into their first job. */
export const AFTER_ONBOARDING = "/apnahire/jobs/new?flow=essential"

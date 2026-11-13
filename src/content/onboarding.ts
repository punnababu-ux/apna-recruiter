/**
 * Onboarding copy: the one screen a new recruiter fills between the OTP and
 * their first job. Fields and the employee ranges are the live ones
 * (Confluence "Employer Onboarding Flow: Mandatory Email and Employee Count
 * Verification", 2026-08-12); the offer line is Punna's idea, still to be
 * tested (docs/DECISIONS.md, 2026-11-12).
 *
 * Each question carries three texts: `label` (inside the field, or above the
 * chips), `error` (under it, when it is missed) and `missing` (how the note
 * above the button names it; see `missingNote`).
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
  name: { label: "Your full name", error: "Enter your full name.", missing: "your name" },
  /** `example` shows only while the field is focused and empty. */
  company: { label: "Company name", example: "e.g. Swiggy", error: "Enter your company name.", missing: "your company name" },
  consultancy: {
    label: "Are you a consultancy (hiring or staffing agency)?",
    error: "Select yes or no.",
    missing: "whether you are a consultancy",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  employees: {
    label: "Number of employees in your company",
    error: "Select the number of employees in your company.",
    missing: "the number of employees",
    options: ["0–50", "51–100", "101–300", "301–500", "501–1,000", "1,000+", "Not sure"].map((r) => ({ value: r, label: r })),
  },
  /** Required: the live spec makes the email mandatory (Figma's phone frame still says optional). */
  email: {
    label: "Official email ID",
    hint: "We’ll send a verification link and code to this email.",
    error: "Enter a valid work email address.",
    /** "valid", so the same words fit an empty field and a mistyped address. */
    missing: "a valid official email ID",
  },
  terms: { before: "I agree to the apna", error: "Agree to the terms to continue." },
  cta: "Post a job",
} as const

export type Consultancy = (typeof ONBOARDING.consultancy.options)[number]["value"]

/** The five questions and the terms, in the form's order. */
export const ONBOARDING_ANSWERS = ["name", "company", "consultancy", "employees", "email", "terms"] as const
export type OnboardingAnswer = (typeof ONBOARDING_ANSWERS)[number]
type OnboardingQuestion = Exclude<OnboardingAnswer, "terms">

const QUESTION_COUNT = ONBOARDING_ANSWERS.length - 1
/** "a, b and c": Indian English, no comma before "and". */
const LIST = new Intl.ListFormat("en-IN", { type: "conjunction" })

/**
 * PREVIEW, `/onboarding?check=note` (docs/DECISIONS.md, 2026-11-13): the one
 * quiet line above "Post a job" once it has been pressed with answers
 * missing. `missing` is what is still unanswered, in the form's order.
 *
 * It stays one short sentence however much is left (two lines on a phone at
 * most): one or two missing questions are named, three or more are counted.
 * The terms are the form's last step and sit right above the line, so the
 * line asks for them only once every question is answered.
 */
export function missingNote(missing: readonly OnboardingAnswer[]) {
  const questions = missing.filter((key): key is OnboardingQuestion => key !== "terms")
  if (!questions.length) return missing.length ? "Agree to the terms to post this job." : ""
  if (questions.length > 2) {
    const howMany = questions.length === QUESTION_COUNT ? `all ${QUESTION_COUNT}` : `the remaining ${questions.length}`
    return `Answer ${howMany} questions to post this job.`
  }
  return `Add ${LIST.format(questions.map((key) => ONBOARDING[key].missing))} to post this job.`
}

/** The spec's basic format rule. */
export const isWorkEmail = (v: string) => v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/** Where a new recruiter goes next: straight into their first job. */
export const AFTER_ONBOARDING = "/apnahire/jobs/new?flow=essential"

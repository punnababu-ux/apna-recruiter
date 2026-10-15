import type {
  Education,
  EnglishLevel,
  ExperienceType,
  JobPostDraft,
  JobType,
  JoiningFeeReason,
  JoiningFeeWhen,
  LocationType,
  PayType,
  RequiredField,
  ScreeningQuestion,
} from "@/types/apnahire-job"
import { CATEGORY_RULES } from "@/lib/apnahire/prompt-parse"

/** Defaults are the answers most recruiters give on the live form, so the
 *  AI only has to ask about things it genuinely can't infer. Nothing that
 *  narrows who can apply is defaulted on. */
export const EMPTY_JOB_DRAFT: JobPostDraft = {
  hiringFor: "own",
  clientCompany: "",
  title: "",
  category: "",
  industry: "",
  // The live form pre-selects Full time; most jobs are.
  jobType: "full_time",
  nightShift: false,
  locationType: "",
  city: "",
  area: "",
  relocation: false,
  payType: "",
  salaryMin: null,
  salaryMax: null,
  incentive: null,
  perks: [],
  joiningFee: false,
  joiningFeeAnswered: false,
  joiningFeeDetails: { amount: null, reason: "", when: "" },
  education: "",
  english: "",
  experienceType: "",
  minExperienceYears: null,
  strictness: { education: "must", english: "must", experience: "must" },
  languages: [],
  skills: [],
  degrees: [],
  assets: [],
  gender: "any",
  ageMin: null,
  ageMax: null,
  walkIn: false,
  walkInDetails: { address: "", startDate: "", endDate: "", startTime: "10:00", endTime: "16:00", instructions: "" },
  contact: "self",
  otherRecruiter: { name: "", phone: "", email: "" },
  whoCanContact: "all",
  screeningQuestions: [],
  description: "",
}

/** Fills fields a draft saved by an older version of the flow doesn't have. */
export function normalizeDraft(d: Partial<JobPostDraft> | undefined): JobPostDraft {
  const base = { ...EMPTY_JOB_DRAFT, ...(d ?? {}) }
  return {
    ...base,
    strictness: { ...EMPTY_JOB_DRAFT.strictness, ...(d?.strictness ?? {}) },
    walkInDetails: { ...EMPTY_JOB_DRAFT.walkInDetails, ...(d?.walkInDetails ?? {}) },
    otherRecruiter: { ...EMPTY_JOB_DRAFT.otherRecruiter, ...(d?.otherRecruiter ?? {}) },
    joiningFeeDetails: { ...EMPTY_JOB_DRAFT.joiningFeeDetails, ...(d?.joiningFeeDetails ?? {}) },
  }
}

/** Account data — in production these come from the recruiter's profile. */
export const COMPANY_NAME = "PixelVeda Studios"

/** The company candidates see on the post. */
export const companyName = (d: JobPostDraft) =>
  d.hiringFor === "client" && d.clientCompany.trim() ? d.clientCompany.trim() : COMPANY_NAME
export const ACCOUNT_PHONE = "+91 97040 94435"

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  full_time: "Full time",
  part_time: "Part time",
  both: "Full & part time",
}
export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  office: "Work from office",
  home: "Work from home",
  field: "Field job",
}
export const PAY_TYPE_LABELS: Record<PayType, string> = {
  fixed: "Fixed only",
  fixed_incentive: "Fixed + incentive",
  incentive: "Incentive only",
}
export const EDUCATION_LABELS: Record<Education, string> = {
  "10th": "10th or below",
  "12th": "12th pass",
  diploma: "Diploma",
  iti: "ITI",
  graduate: "Graduate",
  post_graduate: "Post graduate",
}
export const ENGLISH_LABELS: Record<EnglishLevel, string> = {
  none: "No English",
  basic: "Basic English",
  good: "Good English",
}
export const EXPERIENCE_LABELS: Record<ExperienceType, string> = {
  any: "Any",
  experienced: "Experienced only",
  fresher: "Freshers only",
}
export const EXPERIENCE_YEARS = [0.5, 1, 2, 3, 5, 10] as const

export const JOINING_FEE_REASON_LABELS: Record<JoiningFeeReason, string> = {
  asset: "Asset / inventory charge",
  deposit: "Security deposit (refundable)",
  training: "Registration / training fee",
  commission: "Commission",
  irda: "IRDA exam",
  other: "Other reason",
}
export const JOINING_FEE_WHEN_LABELS: Record<JoiningFeeWhen, string> = {
  before_interview: "Before the interview",
  after_confirmation: "After job confirmation",
  from_salary: "Deducted from salary",
}

/** Cities apna serves. A job anywhere else is blocked at review — an employer
 *  once paid ₹1,500 before learning "Apna is not in Deoria yet". */
export const CITIES = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Gurugram",
  "Noida",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

/** apna's job role taxonomy (subset). Locked after publishing. */
export const CATEGORIES = [
  "Telesales",
  "Customer Support",
  "Field Sales",
  "Delivery",
  "Back Office",
  "Accounts",
  "Driver",
  "Teaching",
  "Cook / Chef",
  "Security",
  "Housekeeping",
  "Retail Sales",
  "Other",
]

/** Industry is the #1 reason for "wrong candidates" complaints, so it's
 *  asked for explicitly rather than left optional. */
export const INDUSTRIES = [
  "BPO / Call Centre",
  "Banking & Finance",
  "Insurance",
  "Real Estate",
  "E-commerce & Logistics",
  "Food & Hospitality",
  "Retail",
  "Healthcare",
  "Education",
  "Manufacturing",
  "IT & Software",
  "Telecom",
  "Marketing & Advertising",
  "Other",
]

export const PERKS = [
  "Flexible working hours",
  "Weekly payout",
  "Overtime pay",
  "Joining bonus",
  "Annual bonus",
  "PF",
  "ESI (ESIC)",
  "Travel allowance",
  "Petrol allowance",
  "Mobile allowance",
  "Internet allowance",
  "Laptop",
  "Health insurance",
  "Food/Meals",
  "Accommodation",
  "5 working days",
  "One-way cab",
  "Two-way cab",
]

export const LANGUAGES = [
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Malayalam",
  "Punjabi",
  "Oriya",
  "Assamese",
]

export const ASSETS = ["Bike / two-wheeler", "Driving licence", "Smartphone", "Laptop", "NISM certificate", "DRA certificate"]

export const DEGREES = ["B.Com", "B.Sc", "B.A", "BBA", "BCA", "B.Tech / B.E", "MBA", "M.Com"]

/** Suggested screening questions per category — yes/no, answered by the
 *  candidate when applying. Recruiters asked for these before payment. */
const QUESTION_BANK: Record<string, string[]> = {
  Telesales: [
    "Have you made outbound sales calls before?",
    "Are you comfortable with daily calling targets?",
    "Can you join within 15 days?",
  ],
  Delivery: [
    "Do you have your own two-wheeler?",
    "Do you have a valid driving licence?",
    "Are you comfortable working weekends?",
  ],
  "Customer Support": [
    "Have you handled customer calls or chats before?",
    "Are you comfortable with rotational shifts?",
    "Can you join within 15 days?",
  ],
  "Field Sales": [
    "Do you have your own two-wheeler?",
    "Have you worked on monthly sales targets?",
    "Are you comfortable with daily field visits?",
  ],
}
const DEFAULT_QUESTIONS = ["Can you join within 15 days?", "Are you comfortable commuting to the job location?"]

export const suggestedQuestions = (category: string) => QUESTION_BANK[category] ?? DEFAULT_QUESTIONS

export const newQuestion = (question: string, mustHave = false): ScreeningQuestion => ({
  id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
  question,
  mustHave,
})

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

export function salaryLabel(d: JobPostDraft): string | null {
  const fixed =
    d.salaryMin != null && d.salaryMax != null
      ? d.salaryMin === d.salaryMax
        ? inr(d.salaryMin)
        : `${inr(d.salaryMin)} – ${inr(d.salaryMax)}`
      : null
  const incentive = d.incentive != null ? `${inr(d.incentive)} incentive` : null
  if (d.payType === "incentive") return incentive
  if (d.payType === "fixed_incentive") return fixed && incentive ? `${fixed} + ${incentive}` : fixed
  return fixed
}

export function experienceLabel(d: JobPostDraft): string | null {
  if (!d.experienceType) return null
  if (d.experienceType !== "experienced") return EXPERIENCE_LABELS[d.experienceType]
  if (d.minExperienceYears == null) return EXPERIENCE_LABELS.experienced
  return d.minExperienceYears < 1 ? "6+ months" : `${d.minExperienceYears}+ years`
}

export function locationLabel(d: JobPostDraft): string | null {
  if (d.locationType === "home") return d.city ? `Work from home · ${d.city}` : null
  const place = [d.area, d.city].filter(Boolean).join(", ")
  return place || null
}

const PHONE_RE = /^\+?\d[\d\s-]{8,}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Required fields still empty, in the order the review screen asks them.
 *  Walk-in, other-recruiter and joining-fee details only count once the
 *  choice that triggers them is made — same as the live form. */
export function missingRequired(d: JobPostDraft): RequiredField[] {
  const missing: RequiredField[] = []
  if (!d.title.trim()) missing.push("title")
  if (!d.industry) missing.push("industry")
  if (!d.jobType) missing.push("jobType")
  if (!d.locationType || !d.city || (d.locationType !== "home" && !d.area.trim())) missing.push("location")
  const needsFixed = d.payType === "fixed" || d.payType === "fixed_incentive"
  const needsIncentive = d.payType === "incentive" || d.payType === "fixed_incentive"
  if (
    !d.payType ||
    (needsFixed && (d.salaryMin == null || d.salaryMax == null)) ||
    (needsIncentive && d.incentive == null)
  )
    missing.push("pay")
  if (d.joiningFee) {
    const f = d.joiningFeeDetails
    if (f.amount == null || !f.reason || !f.when) missing.push("joiningFee")
  }
  if (!d.education) missing.push("education")
  if (!d.english) missing.push("english")
  if (!d.experienceType || (d.experienceType === "experienced" && d.minExperienceYears == null))
    missing.push("experience")
  if (d.walkIn) {
    const w = d.walkInDetails
    if (!w.address.trim() || !w.startDate || !w.endDate || !w.startTime || !w.endTime) missing.push("walkIn")
  }
  if (d.contact === "other") {
    const r = d.otherRecruiter
    if (!r.name.trim() || !PHONE_RE.test(r.phone.trim()) || !EMAIL_RE.test(r.email.trim())) missing.push("otherRecruiter")
  }
  if (!d.description.trim()) missing.push("description")
  return missing
}

// ── Job checks: rule-based, no data model needed ───────────────────────────

export interface JobCheck {
  id: string
  /** "block" stops the recruiter continuing; "warn" is advice. */
  severity: "block" | "warn"
  title: string
  detail: string
  /** Opt-in fix. Never applied automatically, and never loosens the
   *  recruiter's requirements — only corrects how the job is described. */
  fix?: { label: string; patch: Partial<JobPostDraft> }
}

const GENERIC_TITLES = new Set([
  "sales executive",
  "executive",
  "staff",
  "helper",
  "worker",
  "associate",
  "manager",
  "operator",
  "assistant",
])

/** The category a title's words point to, if any. */
export const categoryForTitle = (title: string) => CATEGORY_RULES.find(([re]) => re.test(title))?.[1]

/** Each check traces to a recurring Employer Success issue: unserved
 *  cities, title/category mismatch, several roles in one title, and generic
 *  titles reaching the wrong candidates. */
export function runJobChecks(d: JobPostDraft): JobCheck[] {
  const checks: JobCheck[] = []
  const title = d.title.trim()

  if (d.city && !CITIES.includes(d.city)) {
    checks.push({
      id: "unserved-city",
      severity: "block",
      title: `apna isn't hiring in ${d.city} yet`,
      detail: "Candidates won't see this job. Pick a city we serve before you pay.",
    })
  }

  const titleCategory = title ? categoryForTitle(title) : undefined
  if (titleCategory && d.category && titleCategory !== d.category) {
    checks.push({
      id: "category-mismatch",
      severity: "warn",
      title: `"${title}" sounds like ${titleCategory}, but the category is ${d.category}`,
      detail: "Category decides who your job is shown to, and can't be changed after posting.",
      fix: { label: `Change category to ${titleCategory}`, patch: { category: titleCategory } },
    })
  }

  if (title && /\s(and|or)\s|[/,&+]/i.test(title)) {
    checks.push({
      id: "multi-role",
      severity: "warn",
      title: "This title has more than one role",
      detail: "Jobs with several roles in one title get mismatched candidates. Post one role per job.",
    })
  }

  if (title && GENERIC_TITLES.has(title.toLowerCase())) {
    const specific = d.industry && d.industry !== "Other" ? `${d.industry.split(/\s[/&]\s/)[0]} ${title}` : null
    checks.push({
      id: "generic-title",
      severity: "warn",
      title: "Make the title more specific",
      detail: "Specific titles like \"Real Estate Sales Executive\" reach far more relevant candidates than generic ones.",
      fix: specific ? { label: `Use "${specific}"`, patch: { title: specific } } : undefined,
    })
  }

  return checks
}

/** Applies an AI result over the draft. Only keys the AI actually returned
 *  are applied, so a partial answer never wipes a field the recruiter set. */
export function mergeDraft(draft: JobPostDraft, patch: Partial<JobPostDraft>): JobPostDraft {
  const next = { ...draft }
  for (const [k, v] of Object.entries(patch) as [keyof JobPostDraft, unknown][]) {
    if (v === undefined || v === null || v === "") continue
    ;(next as Record<keyof JobPostDraft, unknown>)[k] = v
  }
  return normalizeDraft(next)
}

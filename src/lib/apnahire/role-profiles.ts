/**
 * PREVIEW ONLY (?flow=essential): what "Who can apply" asks for each job role.
 * A delivery job does not need education; it needs a two-wheeler. A role's
 * `asks` are the questions shown; every other one takes the open answer and
 * stays reachable through "Add a requirement".
 *
 * shortcut: the profiles are a design estimate, replace them with what
 * recruiters pick per role on the live form before this ships.
 */

import { categoryForTitle, COMPANY_INDUSTRY } from "@/lib/apnahire/job-draft"
import { CATEGORY_RULES, parsePrompt, promptSignals } from "@/lib/apnahire/prompt-parse"
import type { JobPostDraft } from "@/types/apnahire-job"

/** Wizard screen ids, in the order they show. */
export type RoleAsk = "education" | "english" | "experience" | "preferences"
export const ALL_ASKS: RoleAsk[] = ["preferences", "education", "english", "experience"]

type Suggest = Partial<Pick<JobPostDraft, "education" | "english" | "experienceType" | "assets">>
interface RoleProfile {
  asks: RoleAsk[]
  suggest: Suggest
}

/** The answer that shuts nobody out. */
const OPEN: Required<Suggest> = { education: "10th", english: "none", experienceType: "any", assets: [] }

const desk = (suggest: Suggest): RoleProfile => ({ asks: ["education", "english", "experience"], suggest })
const field = (assets: string[]): RoleProfile => ({ asks: ["preferences", "experience"], suggest: { assets } })
const SITE: RoleProfile = { asks: ["experience"], suggest: {} }

const PROFILES: Record<string, RoleProfile> = {
  Telesales: desk({ education: "12th", english: "basic" }),
  "Customer Support": desk({ education: "12th", english: "basic" }),
  "Back Office": desk({ education: "12th", english: "basic" }),
  Accounts: desk({ education: "graduate", english: "basic" }),
  Teaching: desk({ education: "graduate", english: "good" }),
  Delivery: field(["Bike / two-wheeler", "Driving licence"]),
  Driver: field(["Driving licence"]),
  "Field Sales": field(["Bike / two-wheeler", "Smartphone"]),
  "Retail Sales": { asks: ["experience", "english"], suggest: { english: "basic" } },
  "Cook / Chef": SITE,
  Security: SITE,
  Housekeeping: SITE,
}

export const roleAsks = (category: string): RoleAsk[] => (PROFILES[category] ?? desk({})).asks

/** The profiles as text for the AI draft's system prompt: which "who can
 *  apply" fields each role fills, so the draft never answers a question the
 *  role skips (the app would then show it as a real answer). */
export function roleRulesForAi(): string {
  const field: Record<RoleAsk, string> = {
    education: "education",
    english: "english",
    experience: "experienceType, minExperienceYears, maxExperienceYears",
    preferences: "assets",
  }
  const lines = Object.entries(PROFILES).map(
    ([role, p]) => `- ${role}: fill only ${p.asks.map((a) => field[a]).join(", ")}`,
  )
  return (
    "Each job role needs only some candidate requirements. Set `category`, then for the " +
    "requirement fields (education, english, experienceType, minExperienceYears, maxExperienceYears, assets) " +
    "fill ONLY the ones listed for that role, even if the text mentions others; leave the rest absent. " +
    "For a role not listed, fill education, english and experience. The description's 'Requirements:' lines " +
    "follow the same rule: never mention a requirement the role does not ask for.\n" +
    lines.join("\n")
  )
}

/** Fills what the essential flow does not ask. The job role comes from the
 *  title, the industry from the company, and "Who can apply" starts at the
 *  role's usual answers. When the role changes, its suggestions replace the
 *  last role's. */
export function withEssentials(d: JobPostDraft): JobPostDraft {
  const category = categoryForTitle(d.title) ?? (d.category || "Other")
  const replace = !!d.category && category !== d.category
  const s = { ...OPEN, ...(PROFILES[category]?.suggest ?? {}) }
  return {
    ...d,
    category,
    industry: d.industry || COMPANY_INDUSTRY,
    // Most jobs pay a fixed salary; the pay screen opens on it, with the others one tap away.
    payType: d.payType || "fixed",
    education: (!replace && d.education) || s.education,
    english: (!replace && d.english) || s.english,
    experienceType: (!replace && d.experienceType) || s.experienceType,
    assets: !replace && d.assets.length ? d.assets : s.assets,
    // The role's usual skills, as an AI draft adds them, so both ways in match.
    skills: !replace && d.skills.length ? d.skills : (CATEGORY_RULES.find(([, c]) => c === category)?.[2] ?? []),
  }
}

/** One chip on the Describe screen: a thing a good description covers. */
export interface PromptChip {
  key: string
  label: string
  /** "Now say …" while the recruiter speaks. */
  say: string
  on: boolean
}

type Parsed = ReturnType<typeof parsePrompt>
const ASK_CHIPS: Record<RoleAsk, { label: string; say: string; on: (p: Parsed) => boolean }> = {
  preferences: { label: "Must have", say: "what they must have, like a bike", on: (p) => !!p.assets?.length },
  education: { label: "Education", say: "the education", on: (p) => !!p.education },
  english: { label: "English", say: "the English level", on: (p) => !!p.english },
  experience: { label: "Experience", say: "the experience", on: (p) => !!p.experienceType },
}

/** The Describe chips for the essential flow: role, area and salary always;
 *  then what this role asks, once the description names the role. So a
 *  delivery job never shows an "Education" chip. */
export function rolePromptChips(prompt: string): PromptChip[] {
  const p = parsePrompt(prompt)
  const s = promptSignals(prompt)
  const base: PromptChip[] = [
    { key: "role", label: "Role", say: "the role", on: s.role },
    { key: "area", label: "Area", say: "the area", on: s.area },
    { key: "salary", label: "Salary", say: "the salary", on: s.salary },
  ]
  if (!p.category) return base
  return [...base, ...roleAsks(p.category).map((ask) => ({ key: ask, ...ASK_CHIPS[ask], on: ASK_CHIPS[ask].on(p) }))]
}

/** Demo: one tap fills the description, to show how the questions change by role.
 *  Areas are ones the keyword parser knows, so the demo works without the AI key. */
export const DEMO_ROLES: { label: string; prompt: string }[] = [
  {
    label: "Delivery executive",
    prompt: "Delivery executive in Koramangala, Bengaluru, 18 to 22 thousand, must have a bike and driving licence",
  },
  {
    label: "Telecaller",
    prompt: "Telecaller in Andheri, Mumbai, 15 to 20 thousand, 12th pass, basic English, freshers welcome",
  },
  { label: "Housekeeping", prompt: "Housekeeping staff in Powai, Mumbai, 12 to 15 thousand, 1 year experience" },
  {
    label: "Accountant",
    prompt: "Accountant in Connaught Place, Delhi, 25 to 35 thousand, graduate, Tally, 2 years experience",
  },
  {
    label: "Field sales",
    prompt: "Field sales executive in Gachibowli, Hyderabad, 18 to 25 thousand, bike and smartphone, 1 year experience",
  },
]

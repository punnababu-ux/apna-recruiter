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
  }
}

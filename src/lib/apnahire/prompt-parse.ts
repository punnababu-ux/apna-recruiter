/**
 * Keyword parsing of a recruiter's one-line job description. Used in two
 * places so they agree with each other:
 *   - the describe screen's live "detection" chips (client, on every keystroke)
 *   - the draft-job route's dummy mode (server, when no AI key is set)
 * The real AI route does far better than this; this is the floor.
 */

import type { JobPostDraft } from "@/types/apnahire-job"

export const CITY_MAP: Record<string, string> = {
  bengaluru: "Bengaluru",
  bangalore: "Bengaluru",
  mumbai: "Mumbai",
  delhi: "Delhi",
  gurgaon: "Gurugram",
  gurugram: "Gurugram",
  noida: "Noida",
  hyderabad: "Hyderabad",
  pune: "Pune",
  chennai: "Chennai",
  kolkata: "Kolkata",
  ahmedabad: "Ahmedabad",
  jaipur: "Jaipur",
  lucknow: "Lucknow",
  // Not served — kept so a job there is caught by the "unserved city" check
  // instead of silently becoming a city-less draft.
  deoria: "Deoria",
  gorakhpur: "Gorakhpur",
}

export const AREA_CITY: Record<string, string> = {
  koramangala: "Bengaluru",
  "hsr layout": "Bengaluru",
  indiranagar: "Bengaluru",
  whitefield: "Bengaluru",
  "electronic city": "Bengaluru",
  andheri: "Mumbai",
  bandra: "Mumbai",
  powai: "Mumbai",
  "connaught place": "Delhi",
  "hitech city": "Hyderabad",
  gachibowli: "Hyderabad",
  hinjewadi: "Pune",
}

/** [title pattern, category, starter skills] */
export const CATEGORY_RULES: [RegExp, string, string[]][] = [
  [/tele ?call|telesales|tele ?sales|bpo|call cent/i, "Telesales", ["Outbound calling", "Lead follow-up", "Product pitching", "CRM basics"]],
  [/delivery|rider|biker/i, "Delivery", ["Two-wheeler driving", "Route knowledge", "Cash handling"]],
  [/support|customer care|helpdesk/i, "Customer Support", ["Query resolution", "Patient listening", "Ticketing tools"]],
  [/teacher|tutor|faculty/i, "Teaching", ["Lesson planning", "Classroom management"]],
  [/sales|business development|\bbde\b|relationship/i, "Field Sales", ["Lead generation", "Negotiation", "Target achievement"]],
  [/data entry|back office|computer operator/i, "Back Office", ["Typing speed", "MS Excel", "Accuracy"]],
  [/driver/i, "Driver", ["Driving licence", "Route knowledge"]],
  [/account|tally/i, "Accounts", ["Tally", "GST basics", "Bookkeeping"]],
  [/cook|chef/i, "Cook / Chef", ["Food preparation", "Kitchen hygiene"]],
  [/security|guard/i, "Security", ["Patrolling", "Visitor management"]],
  [/housekeep|cleaner/i, "Housekeeping", ["Cleaning", "Room upkeep"]],
]

/** [text pattern, industry] — only explicit signals; the AI asks otherwise. */
export const INDUSTRY_RULES: [RegExp, string][] = [
  [/real estate|property|builder/i, "Real Estate"],
  [/bank|loan|nbfc|credit card|finance/i, "Banking & Finance"],
  [/insurance|policy/i, "Insurance"],
  [/bpo|call cent/i, "BPO / Call Centre"],
  [/e-?commerce|logistics|courier|delivery/i, "E-commerce & Logistics"],
  [/restaurant|food|cafe|hotel/i, "Food & Hospitality"],
  [/retail|store|showroom|mall/i, "Retail"],
  [/hospital|clinic|pharma|health/i, "Healthcare"],
  [/school|college|edtech|coaching|education/i, "Education"],
  [/factory|manufactur|plant/i, "Manufacturing"],
  [/software|it company|saas/i, "IT & Software"],
  [/telecom|broadband|sim card/i, "Telecom"],
]

const LANGS = [
  "hindi",
  "kannada",
  "tamil",
  "telugu",
  "marathi",
  "bengali",
  "gujarati",
  "malayalam",
  "punjabi",
  "oriya",
  "assamese",
]

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())

/** "15-20k", "15000 - 20000", "₹15k to 20k", "₹18k" → monthly INR. */
export function parseSalary(text: string): { min?: number; max?: number } {
  const n = (v: string, k: string) => Math.round(parseFloat(v.replace(/,/g, "")) * (k ? 1000 : 1))
  const range = text.match(/₹?\s*(\d[\d,]*(?:\.\d+)?)\s*(k)?\s*(?:-|–|to)\s*₹?\s*(\d[\d,]*(?:\.\d+)?)\s*(k)?/i)
  if (range) {
    const kMax = range[4] ?? ""
    const kMin = range[2] ?? kMax
    const min = n(range[1], kMin)
    const max = n(range[3], kMax)
    if (max >= 1000) return { min, max }
  }
  const single =
    text.match(/₹?\s*(\d[\d,]*)\s*(k)?\s*(?:salary|per month|\/month|pm)/i) ?? text.match(/₹\s*(\d[\d,]*)\s*(k)?/i)
  if (single) {
    const v = n(single[1], single[2] ?? "")
    if (v >= 1000) return { min: v, max: v }
  }
  return {}
}

export function parseTitle(text: string): string | undefined {
  const cleaned = text
    .replace(/^(hi|hello)[,!\s]*/i, "")
    .replace(/^(i\s+)?(want|need|am looking|looking|would like)\s+(to\s+)?(hire|for)?\s*/i, "")
    .replace(/^hire\s+/i, "")
    .replace(/^(a|an|\d+)\s+/i, "")
  const head = cleaned.split(/[,.\n]|\s+in\s+|\s+at\s+|\s+for\s+|\s+with\s+/i)[0]?.trim()
  if (!head || head.length > 40) return undefined
  return titleCase(head.replace(/s$/i, "").toLowerCase())
}

/** Everything the keyword parser can pull from a prompt (no description). */
export function parsePrompt(source: string): Partial<JobPostDraft> {
  const text = source.toLowerCase()
  const out: Partial<JobPostDraft> = {}

  const title = parseTitle(source)
  if (title) out.title = title
  const cat = CATEGORY_RULES.find(([re]) => re.test(text))
  if (cat) {
    out.category = cat[1]
    out.skills = cat[2]
  }
  const industry = INDUSTRY_RULES.find(([re]) => re.test(text))
  if (industry) out.industry = industry[1]

  if (/part[ -]?time/.test(text)) out.jobType = "part_time"
  else if (/full[ -]?time/.test(text)) out.jobType = "full_time"
  if (/night shift/.test(text)) out.nightShift = true

  const area = Object.keys(AREA_CITY).find((a) => text.includes(a))
  if (area) {
    out.area = titleCase(area)
    out.city = AREA_CITY[area]
  }
  const city = Object.keys(CITY_MAP).find((c) => text.includes(c))
  if (city) out.city = CITY_MAP[city]
  if (/work from home|wfh|remote/.test(text)) out.locationType = "home"
  else if (/field|on[- ]road|delivery|visit/.test(text)) out.locationType = "field"
  else if (/office|wfo/.test(text) || out.area) out.locationType = "office"

  const salary = parseSalary(source)
  if (salary.min != null) {
    out.salaryMin = salary.min
    out.salaryMax = salary.max
    out.payType = /incentive/.test(text) ? "fixed_incentive" : "fixed"
  } else if (/incentive only/.test(text)) out.payType = "incentive"

  if (/post ?graduate|\bpg\b|\bmba\b/.test(text)) out.education = "post_graduate"
  else if (/graduate|degree|b\.?com|b\.?sc|b\.?a\b/.test(text)) out.education = "graduate"
  else if (/12th|puc|intermediate/.test(text)) out.education = "12th"
  else if (/10th|sslc/.test(text)) out.education = "10th"
  else if (/diploma/.test(text)) out.education = "diploma"
  else if (/\biti\b/.test(text)) out.education = "iti"

  if (/(good|fluent) english/.test(text)) out.english = "good"
  else if (/no english/.test(text)) out.english = "none"
  else if (/english/.test(text)) out.english = "basic"

  const years = text.match(/(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)/)
  if (/fresher/.test(text)) out.experienceType = "fresher"
  else if (years) {
    out.experienceType = "experienced"
    out.minExperienceYears = parseFloat(years[1])
  } else if (/any experience|experience not required/.test(text)) out.experienceType = "any"

  const langs = LANGS.filter((l) => text.includes(l)).map(titleCase)
  if (langs.length) out.languages = langs
  if (/walk[- ]?in/.test(text)) out.walkIn = true
  if (/joining fee|deposit/.test(text)) out.joiningFee = true

  return out
}

export interface PromptSignals {
  role: boolean
  area: boolean
  salary: boolean
  who: boolean
}

/** What a prompt already covers — drives the describe screen's chips. */
export function promptSignals(source: string): PromptSignals {
  const p = parsePrompt(source)
  return {
    // A known category, or a short title-like opening ("Telecaller …").
    role: Boolean(p.category || (p.title && p.title.split(" ").length <= 4)),
    area: Boolean(p.city || p.area || p.locationType === "home"),
    salary: p.salaryMin != null || p.payType === "incentive",
    who: Boolean(p.education || p.experienceType || p.english),
  }
}

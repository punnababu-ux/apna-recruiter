/** The job a recruiter is posting in the AI-first apna hire flow. Covers the
 *  live employer.apna.co posting form field for field (minus WhatsApp alert
 *  prefs, which move after publishing). "Required" here = the AI must fill it
 *  or the review screen asks for it; some fields are only required once a
 *  choice triggers them (walk-in → walk-in details, etc.). */

export type JobType = "full_time" | "part_time" | "both"
export type LocationType = "office" | "home" | "field"
export type PayType = "fixed" | "fixed_incentive" | "incentive"
export type Education = "10th" | "12th" | "diploma" | "iti" | "graduate" | "post_graduate"
export type EnglishLevel = "none" | "basic" | "good"
export type ExperienceType = "any" | "experienced" | "fresher"
export type ContactPreference = "self" | "other" | "none"
export type GenderPreference = "any" | "male" | "female"
export type WhoCanContact = "all" | "matched"
export type Strictness = "must" | "preferred"
export type JoiningFeeReason = "asset" | "deposit" | "training" | "commission" | "irda" | "other"
export type JoiningFeeWhen = "before_interview" | "after_confirmation" | "from_salary"

export interface WalkInDetails {
  address: string
  /** yyyy-mm-dd */
  startDate: string
  endDate: string
  /** HH:mm */
  startTime: string
  endTime: string
  instructions: string
}

export interface OtherRecruiter {
  name: string
  phone: string
  email: string
}

export interface JoiningFeeDetails {
  amount: number | null
  reason: JoiningFeeReason | ""
  when: JoiningFeeWhen | ""
}

export interface ScreeningQuestion {
  id: string
  question: string
  /** Disqualify candidates who answer "No". */
  mustHave: boolean
}

export interface JobPostDraft {
  /** Hiring for the recruiter's own company, or on behalf of a client. */
  hiringFor: "own" | "client"
  clientCompany: string
  title: string
  category: string
  industry: string
  jobType: JobType | ""
  nightShift: boolean
  locationType: LocationType | ""
  city: string
  /** Office address / locality for office jobs, working area for field jobs. */
  area: string
  /** Six digits, from the place search (Google Places in production) or
   *  typed in manual entry. Optional: drafts saved before it have none. */
  pincode?: string
  /** Office jobs: also take candidates willing to relocate to the city. */
  relocation: boolean
  payType: PayType | ""
  salaryMin: number | null
  salaryMax: number | null
  /** Average monthly incentive, for the two incentive pay types. */
  incentive: number | null
  perks: string[]
  joiningFee: boolean
  /** The recruiter has answered the joining-fee question. It's never
   *  defaulted — a candidate-safety question must be a real answer. */
  joiningFeeAnswered: boolean
  joiningFeeDetails: JoiningFeeDetails
  education: Education | ""
  english: EnglishLevel | ""
  experienceType: ExperienceType | ""
  minExperienceYears: number | null
  /** Must-have (only matching candidates can apply) vs preferred (others can
   *  still apply) — the live form's Eligible vs Preferred split, per field. */
  strictness: Record<"education" | "english" | "experience", Strictness>
  languages: string[]
  skills: string[]
  degrees: string[]
  assets: string[]
  gender: GenderPreference
  ageMin: number | null
  ageMax: number | null
  walkIn: boolean
  walkInDetails: WalkInDetails
  contact: ContactPreference
  otherRecruiter: OtherRecruiter
  whoCanContact: WhoCanContact
  screeningQuestions: ScreeningQuestion[]
  /** Plain text; lines starting with "- " render as bullets. */
  description: string
}

export type RequiredField =
  | "title"
  | "industry"
  | "jobType"
  | "location"
  | "pay"
  | "joiningFee"
  | "education"
  | "english"
  | "experience"
  | "walkIn"
  | "otherRecruiter"
  | "description"

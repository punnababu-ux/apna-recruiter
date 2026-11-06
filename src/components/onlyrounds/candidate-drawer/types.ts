import type { Verdict } from "@/components/onlyrounds/score-gauge"
import type { Candidate } from "@/components/onlyrounds/candidate-card"

// ── Data types ────────────────────────────────────────────────────────────

export type CriterionScore = {
  id: string
  text: string
  /** 0–10 score from the AI evaluation. */
  score: number
  reasoning: string
  /** When true, the criterion was a dealbreaker (must-have or red-flag). */
  dealbreaker?: boolean
  /** Optional timestamp in the call when this criterion was assessed. */
  atSecond?: number
}

export type CriteriaGroup = {
  id: string
  label: string
  description?: string
  items: CriterionScore[]
}

export type CefrDimension = {
  label: string
  score: number
  description: string
}

export type CefrAnalysis = {
  overall: number
  level: string
  recommendedFor: string
  dimensions: CefrDimension[]
  areasOfImprovement: string[]
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  description?: string
}

export type EducationEntry = {
  degree: string
  institution: string
  period: string
}

export type ProfileSummary = {
  about?: string
  location?: string
  experienceYears?: number
  currentRole?: string
  experience?: ExperienceEntry[]
  education?: EducationEntry[]
  skills?: string[]
  resumeUrl?: string
}

export type InterviewViolation = {
  id: string
  severity: "info" | "warning" | "destructive"
  title: string
  detail: string
  timestamp: string
}

export type CommunicationEvent = {
  id: string
  channel: "call" | "sms" | "email" | "whatsapp" | "voicemail"
  direction: "in" | "out" | "system"
  title: string
  detail?: string
  timestamp: string
  duration?: string
}

export type DrawerInsight = {
  tone: "ok" | "miss"
  label: string
  /** Optional timestamp in the call recording (seconds). Drives the
   *  per-chip "jump to moment" play button. */
  atSecond?: number
}

export type DrawerCandidate = {
  id: string
  name: string
  role?: string
  company?: string
  email?: string
  phone?: string
  score: number
  verdict: Verdict
  state?: Candidate["state"]
  source?: "applied" | "sourced"
  sourceDetail?: string
  cefrLevel?: string
  insights: DrawerInsight[]
  /** Total length of the call recording in seconds. Defaults to 5:47. */
  callDuration?: number
  /**
   * Whether the screening was conducted as an outbound audio call or a video
   * interview. Only one medium is present per candidate — they are mutually
   * exclusive.
   *
   * - "audio" → outbound phone call; shows an inline audio player bar.
   * - "video" → video interview; shows a floating video panel that opens
   *             alongside the drawer when the user clicks "Watch Video".
   *
   * Defaults to "audio" when omitted.
   */
  mediaType?: "audio" | "video"
  recommendations: string[]
  criteriaGroups: CriteriaGroup[]
  cefr?: CefrAnalysis
  notes?: string
  profile?: ProfileSummary
  violations?: InterviewViolation[]
  communication?: CommunicationEvent[]
  stage?: string
  retakeHistory?: Candidate["retakeHistory"]
}

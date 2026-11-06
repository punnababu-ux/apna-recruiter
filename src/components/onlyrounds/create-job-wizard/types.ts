import type { InterviewRoundsForm, JobDetailsForm } from "@/types/onlyrounds"

// ── Form shape ────────────────────────────────────────────────────────────

export type FormShape = {
  title: string
  jd: string
  details: JobDetailsForm
  rounds: InterviewRoundsForm
  promptText?: string
  attachedFileName?: string
}

export type GenerationData = {
  title?: string
  jobDescription?: string
  clientId?: string
  city?: string
  area?: string
  experienceType?: "any" | "experienced" | "freshers"
  experiencedPersona?: string
  fresherPersona?: string
  workType?: "part-time" | "full-time" | "both"
  workMode?: "wfh" | "wfo" | "field" | "store"
  scheduleDetails?: string
  compExperienced?: string
  compFresher?: string
  suggestedPresets?: Array<{
    title: string
    target: "freshers" | "experienced"
    questions: Array<{ question: string; answer: string }>
  }>
  suggestedRounds?: Array<{
    type: "screening" | "interview"
    title: string
    mustHave: string[]
    goodToHave: string[]
    redFlag: string[]
  }>
}

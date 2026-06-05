// ---- Interview rounds types ------------------------------------------------

export type TaskType = "screening" | "interview" | "scheduling" | "custom"
export type ScreeningMode = "ai" | "human"
export type ScreeningDirection = "inbound" | "outbound" | "both"
export type ScreeningFormat = "audio" | "video"
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

/**
 * Shared call configuration used by both Screening and Interview tasks.
 * An interview round is configured exactly like a screening call.
 */
export type ScreeningConfig = {
  mode: ScreeningMode | ""
  direction: ScreeningDirection | ""
  format: ScreeningFormat | ""
  /** Key questions / notes for a human-led call. */
  humanNotes: string
  /** CEFR language proficiency assessment add-on (+3–4 min). Can be enabled
   *  on at most one task across the whole pipeline. */
  cefrEnabled: boolean
  cefrMinLevel: CefrLevel | ""
  cefrPreferredLevel: CefrLevel | ""
  cefrQuestions: string
}

export type CriteriaCategory = "must-have" | "good-to-have" | "red-flag"
export type Criterion = {
  id: string
  category: CriteriaCategory
  text: string
}

export type AgentId = "isha" | "ravi"
export type InterviewLanguage = "english" | "hindi"

export type AgentMeta = {
  name: string
  role: string
  voice: "Male" | "Female"
  interviewsTaken: string
  completionRate: string
  recommended?: boolean
}

export type InterviewTask = {
  id: string
  type: TaskType
  /** Custom task name (Custom task type only; empty falls back to the label). */
  title: string
  /** Free-text notes — Custom task details, or Human-scheduling instructions. */
  notes: string
  /** Call config — used by Screening and Interview task types. */
  screening: ScreeningConfig
  /** Task-specific evaluation criteria. */
  criteria: Criterion[]
  /** AI interviewer persona for AI rounds. */
  agentId: AgentId
  /** Conversation language for AI rounds. */
  language: InterviewLanguage
}

export type InterviewRoundsForm = {
  tasks: InterviewTask[]
}

// ---- Job details types -----------------------------------------------------

export type ExperienceRequirement = "any" | "experienced" | "freshers"
export type WorkType = "part-time" | "full-time" | "both"
export type WorkMode = "wfh" | "wfo" | "field" | "store"

export type QAItem = { id: string; question: string; answer: string }

export type QuestionSection = {
  id: string
  title: string
  /** Who this section is shown to during the screening flow. */
  target: "freshers" | "experienced" | "both"
  /** How many questions from this section each candidate gets */
  questionsPerCandidate: number
  /** Whether to shuffle the question order per candidate */
  randomize: boolean
  items: QAItem[]
}

export type JobDetailsForm = {
  // Section 1
  clientId: string
  city: string
  area: string
  experienceType: ExperienceRequirement
  experiencedPersona: string
  fresherPersona: string

  // Section 2
  workType: WorkType | ""
  workMode: WorkMode | ""
  scheduleDetails: string

  // Section 3
  compExperienced: string
  compFresher: string

  // Section 4 — merged AI question bank + candidate FAQs
  questionSections: QuestionSection[]

  // Section 5
  additionalDetails: string
}

export type SectionId =
  | "basics"
  | "schedule"
  | "compensation"
  | "questions"
  | "additional"

export type SectionStatus =
  | "untouched"
  | "in-progress"
  | "complete"
  | "invalid"

import { CircleCheck, Flag, Star, type LucideIcon } from "lucide-react"

import type {
  AgentId,
  AgentMeta,
  CefrLevel,
  CriteriaCategory,
  InterviewLanguage,
  InterviewRoundsForm,
  JobDetailsForm,
  SectionId,
  TaskType,
  WorkMode,
  WorkType,
} from "@/types/onlyrounds"

// ---- Interview rounds constants --------------------------------------------

export const MAX_CRITERIA = 15

/** Order matters — keys render left→right in the picker (Ravi, then Isha). */
export const AGENTS: Record<AgentId, AgentMeta> = {
  ravi: {
    name: "Ravi",
    role: "Lead AI recruiter",
    voice: "Male",
    interviewsTaken: "16K",
    completionRate: "88%",
  },
  isha: {
    name: "Isha",
    role: "Senior AI recruiter",
    voice: "Female",
    interviewsTaken: "24K",
    completionRate: "96%",
    recommended: true,
  },
}

export const LANGUAGES: Record<
  InterviewLanguage,
  { label: string; badge: string }
> = {
  english: { label: "English", badge: "En" },
  hindi: { label: "Hindi", badge: "हि" },
}

export const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]

/** Task types that use the shared call/screening config + editor. */
export const CALL_TASK_TYPES: ReadonlySet<TaskType> = new Set([
  "screening",
  "interview",
])

export const defaultInterviewRounds: InterviewRoundsForm = {
  tasks: [],
}

// ---- Job details constants -------------------------------------------------

/** Mock client list — the real flow would fetch from the workspace. */
export const CLIENTS: { id: string; name: string }[] = [
  { id: "flipkart", name: "Flipkart" },
  { id: "swiggy", name: "Swiggy" },
  { id: "amazon", name: "Amazon" },
  { id: "zomato", name: "Zomato" },
  { id: "myntra", name: "Myntra" },
]

/** Display labels for work type values — used in forms and read-only views. */
export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  "part-time": "Part time",
  "full-time": "Full time",
  both: "Both",
}

/** Display labels for work mode values — used in forms and read-only views. */
export const WORK_MODE_LABELS: Record<WorkMode, string> = {
  wfh: "Work from home",
  wfo: "Work from office",
  field: "Field job",
  store: "Work from store",
}

export const SECTION_IDS = [
  "basics",
  "schedule",
  "compensation",
  "questions",
  "additional",
] as const

export const REQUIRED_SECTION_IDS: readonly SectionId[] = [
  "basics",
  "schedule",
  "compensation",
]

export const SECTION_LABELS: Record<SectionId, string> = {
  basics: "Basic job details",
  schedule: "Work schedule",
  compensation: "Compensation details",
  questions: "Question sections",
  additional: "Additional details",
}

export const defaultJobDetails: JobDetailsForm = {
  clientId: "",
  city: "",
  area: "",
  experienceType: "any",
  experiencedPersona: "",
  fresherPersona: "",
  workType: "",
  workMode: "",
  scheduleDetails: "",
  compExperienced: "",
  compFresher: "",
  questionSections: [],
  additionalDetails: "",
}

// ---- Criteria categories (consolidated from both step files) ---------------

export type CriteriaCategoryMeta = {
  key: CriteriaCategory
  label: string
  description: string
  icon: LucideIcon
  tone: string
  surface: string
}

export const CRITERIA_CATEGORIES: CriteriaCategoryMeta[] = [
  {
    key: "must-have",
    label: "Must-have",
    description: "Required criteria the candidate must meet.",
    icon: CircleCheck,
    tone: "text-success",
    surface: "border-border bg-muted/20",
  },
  {
    key: "good-to-have",
    label: "Good-to-have",
    description: "Bonus criteria that strengthen a candidate.",
    icon: Star,
    tone: "text-warning",
    surface: "border-border bg-muted/20",
  },
  {
    key: "red-flag",
    label: "Red flags",
    description: "Dealbreakers — candidate is not shortlisted if unmet.",
    icon: Flag,
    tone: "text-destructive",
    surface: "border-border bg-muted/20",
  },
]

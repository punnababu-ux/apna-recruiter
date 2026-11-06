import {
  Bot,
  CalendarClock,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Puzzle,
  UserRound,
  Users,
  type IconComponent,
} from "@apna/design-system"
import { type ChipTabItem } from "@/components/ui/chip-tabs"
import type { CefrLevel, ScreeningConfig, ScreeningDirection, ScreeningMode, TaskType } from "@/types/onlyrounds"

// ---- defaults / local helpers -------------------------------------------

export const makeScreening = (): ScreeningConfig => ({
  mode: "",
  direction: "",
  format: "",
  humanNotes: "",
  cefrEnabled: false,
  cefrMinLevel: "",
  cefrPreferredLevel: "",
  cefrQuestions: "",
})

/** Task types that may only appear once in the pipeline. */
export const SINGLETON_TASK_TYPES: ReadonlySet<TaskType> = new Set(["screening"])

// ---- task-type metadata -------------------------------------------------

type TaskTypeMeta = {
  type: TaskType
  label: string
  description: string
  icon: IconComponent
}

export const TASK_TYPES: TaskTypeMeta[] = [
  {
    type: "screening",
    label: "Screening",
    description: "AI or human phone / video screening call.",
    icon: PhoneCall,
  },
  {
    type: "interview",
    label: "Interview",
    description: "A structured interview round.",
    icon: Users,
  },
  {
    type: "scheduling",
    label: "Interview scheduling",
    description: "Coordinate and book interview slots.",
    icon: CalendarClock,
  },
  {
    type: "custom",
    label: "Custom task",
    description: "Define your own step in the pipeline.",
    icon: Puzzle,
  },
]

export const TASK_META = Object.fromEntries(
  TASK_TYPES.map((t) => [t.type, t]),
) as Record<TaskType, TaskTypeMeta>

// ---- chip option sets ---------------------------------------------------

export const modeChips = (noun: string): ChipTabItem<ScreeningMode>[] => [
  {
    value: "ai",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <Bot className="size-3.5" />
        AI {noun}
      </span>
    ),
  },
  {
    value: "human",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="size-3.5" />
        Human {noun}
      </span>
    ),
  },
]

export const CEFR_LABELS: Record<CefrLevel, string> = {
  A1: "A1 (Beginner)",
  A2: "A2 (Elementary)",
  B1: "B1 (Intermediate)",
  B2: "B2 (Upper-Int)",
  C1: "C1 (Advanced)",
  C2: "C2 (Mastery)",
}

export const DIRECTION_CHIPS: ChipTabItem<ScreeningDirection>[] = [
  {
    value: "inbound",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <PhoneIncoming className="size-3.5" />
        Inbound
      </span>
    ),
  },
  {
    value: "outbound",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <PhoneOutgoing className="size-3.5" />
        Outbound
      </span>
    ),
  },
  { value: "both", label: "Both" },
]

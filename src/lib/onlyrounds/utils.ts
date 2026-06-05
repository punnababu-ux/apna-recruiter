import type {
  Criterion,
  InterviewRoundsForm,
  InterviewTask,
  JobDetailsForm,
  ScreeningConfig,
  TaskType,
} from "@/types/onlyrounds"

import { CALL_TASK_TYPES } from "./constants"

// ---- Task label lookup (icon-free — avoids pulling lucide into utils) ------

const TASK_LABELS: Record<TaskType, string> = {
  screening: "Screening",
  interview: "Interview",
  scheduling: "Interview scheduling",
  custom: "Custom task",
}

// ---- AI-round helpers ------------------------------------------------------

/** True when the pipeline contains at least one AI screening or AI interview. */
export function hasAiRound(rounds: InterviewRoundsForm): boolean {
  return rounds.tasks.some(
    (t) => CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai",
  )
}

/** True when this specific task is an AI screening or AI interview. */
export function isAiRound(task: InterviewTask): boolean {
  return CALL_TASK_TYPES.has(task.type) && task.screening.mode === "ai"
}

// ---- AI context summaries (used when calling the generate-criteria API) ----

export function summarizeDetails(d: JobDetailsForm): string {
  const lines: string[] = []
  if (d.city) lines.push(`Location: ${d.city}${d.area ? `, ${d.area}` : ""}`)
  if (d.experienceType) lines.push(`Experience required: ${d.experienceType}`)
  if (d.experiencedPersona)
    lines.push(`Experienced profile: ${d.experiencedPersona}`)
  if (d.fresherPersona) lines.push(`Fresher profile: ${d.fresherPersona}`)
  if (d.workType) lines.push(`Work type: ${d.workType}`)
  if (d.workMode) lines.push(`Work mode: ${d.workMode}`)
  if (d.scheduleDetails) lines.push(`Schedule: ${d.scheduleDetails}`)
  if (d.compExperienced)
    lines.push(`Compensation (experienced): ${d.compExperienced}`)
  if (d.compFresher) lines.push(`Compensation (fresher): ${d.compFresher}`)
  return lines.join("\n")
}

export function summarizeTasks(tasks: InterviewTask[]): string {
  return tasks
    .map((t, i) => {
      const name =
        t.type === "custom" && t.title.trim()
          ? t.title.trim()
          : TASK_LABELS[t.type]
      const parts: string[] = []
      if (t.screening.mode) parts.push(t.screening.mode)
      if (CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai") {
        if (t.screening.direction) parts.push(t.screening.direction)
        if (t.screening.format) parts.push(t.screening.format)
      }
      return `${i + 1}. ${name}${parts.length ? ` (${parts.join(", ")})` : ""}`
    })
    .join("\n")
}

// ---- CEFR criteria sync ----------------------------------------------------

/**
 * Rebuilds the CEFR-pinned criteria rows at the top (min level) and bottom
 * (preferred level) of the list whenever the CEFR add-on config changes.
 * Rows whose id contains "cefr-min" or "cefr-pref" are managed here and
 * are treated as locked (non-editable) in the UI.
 */
export function syncCefrCriteria(
  criteria: Criterion[],
  screening: ScreeningConfig,
  taskId: string,
): Criterion[] {
  let next = (criteria ?? []).filter(
    (c) => !c.id.includes("cefr-min") && !c.id.includes("cefr-pref"),
  )
  if (screening.cefrEnabled) {
    if (screening.cefrMinLevel) {
      next = [
        {
          id: `crit-${taskId}-cefr-min`,
          category: "must-have",
          text: `Spoken English: Minimum CEFR ${screening.cefrMinLevel}`,
        },
        ...next,
      ]
    }
    if (screening.cefrPreferredLevel) {
      next = [
        ...next,
        {
          id: `crit-${taskId}-cefr-pref`,
          category: "good-to-have",
          text: `Spoken English: Preferred CEFR ${screening.cefrPreferredLevel}`,
        },
      ]
    }
  }
  return next
}

import type * as React from "react"
import { defaultJobDetails } from "@/lib/onlyrounds/constants"
import { summarizeDetails, summarizeTasks } from "@/lib/onlyrounds/utils"
import type {
  Criterion,
  JobDetailsForm,
  TaskType,
  AgentId,
  InterviewLanguage,
  WorkType,
  WorkMode,
} from "@/types/onlyrounds"
import type { FormShape, GenerationData } from "@/components/onlyrounds/create-job-wizard/types"
import { deriveTitleFromJd } from "@/components/onlyrounds/create-job-wizard/utils"

export function populateFromGeneration(
  data: GenerationData,
  promptValToSet: string | undefined,
  setForm: React.Dispatch<React.SetStateAction<FormShape>>,
  setLastCriteriaSnapshot: React.Dispatch<React.SetStateAction<string>>,
) {
  // 1. Prepare job details
  const details: JobDetailsForm = {
    ...defaultJobDetails,
    clientId: data.clientId ?? "",
    city: data.city ?? "",
    area: data.area ?? "",
    experienceType: data.experienceType ?? "any",
    experiencedPersona: data.experiencedPersona ?? "",
    fresherPersona: data.fresherPersona ?? "",
    workType: (data.workType ?? "") as "" | WorkType,
    workMode: (data.workMode ?? "") as "" | WorkMode,
    scheduleDetails: data.scheduleDetails ?? "",
    compExperienced: data.compExperienced ?? "",
    compFresher: data.compFresher ?? "",
    additionalDetails: "",
    questionSections: [],
    suggestedPresets: [],
  }

  details.questionSections = []
  details.suggestedPresets = data.suggestedPresets?.map((p) => ({
    title: p.title,
    target: p.target,
    questions: p.questions,
  })) ?? []

  // Map suggestedRounds to form tasks structure
  let roundCounter = 0
  const tasks = data.suggestedRounds?.map((r) => {
    roundCounter++
    const taskId = `task-${roundCounter}`
    
    const criteria: Criterion[] = []
    let critCounter = 0
    
    r.mustHave?.forEach((text: string) => {
      critCounter++
      criteria.push({
        id: `crit-${taskId}-${critCounter}`,
        category: "must-have",
        text: text.trim(),
      })
    })
    r.goodToHave?.forEach((text: string) => {
      critCounter++
      criteria.push({
        id: `crit-${taskId}-${critCounter}`,
        category: "good-to-have",
        text: text.trim(),
      })
    })
    r.redFlag?.forEach((text: string) => {
      critCounter++
      criteria.push({
        id: `crit-${taskId}-${critCounter}`,
        category: "red-flag",
        text: text.trim(),
      })
    })

    return {
      id: taskId,
      type: r.type as TaskType,
      title: r.title,
      notes: "",
      screening: {
        mode: "ai" as const,
        direction: "inbound" as const,
        format: "audio" as const,
        humanNotes: "",
        cefrEnabled: false,
        cefrMinLevel: "" as const,
        cefrPreferredLevel: "" as const,
        cefrQuestions: "",
      },
      criteria,
      agentId: "isha" as AgentId,
      language: "english" as InterviewLanguage,
    }
  }) ?? []

  const titleVal = data.title || deriveTitleFromJd(data.jobDescription || "") || ""

  setForm((prev) => {
    const next = {
      ...prev,
      jd: data.jobDescription || prev.jd || "",
      title: titleVal || prev.title || "",
      details,
      rounds: {
        tasks,
      },
    }
    if (promptValToSet !== undefined) {
      next.promptText = promptValToSet
    }
    return next
  })

  // Initialize snapshot states to avoid immediate regeneration
  const currentSnapshot = JSON.stringify({
    title: titleVal,
    jd: data.jobDescription || "",
    detailsSummary: summarizeDetails(details),
    tasksSummary: summarizeTasks(tasks),
  })
  setLastCriteriaSnapshot(currentSnapshot)
}

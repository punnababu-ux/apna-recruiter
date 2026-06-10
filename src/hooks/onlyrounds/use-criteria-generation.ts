"use client"

import * as React from "react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { CALL_TASK_TYPES, MAX_CRITERIA } from "@/lib/onlyrounds/constants"
import { summarizeDetails, summarizeTasks, syncCefrCriteria } from "@/lib/onlyrounds/utils"
import type {
  CriteriaCategory,
  Criterion,
  InterviewRoundsForm,
  InterviewTask,
} from "@/types/onlyrounds"

export interface FormShape {
  title: string
  jd: string
  details: Parameters<typeof summarizeDetails>[0]
  rounds: InterviewRoundsForm
}

export type SetFormFn = (updater: (prev: FormShape) => FormShape) => void

/**
 * Encapsulates all AI criteria-generation state and logic.
 *
 * @param formRef  A ref whose `.current` always points to the latest form state
 *                 (avoids stale closure without re-creating callbacks on every render).
 * @param setForm  The form-state setter from the wizard.
 */
export function useCriteriaGeneration(
  formRef: React.RefObject<{
    title: string
    jd: string
    details: Parameters<typeof summarizeDetails>[0]
    rounds: InterviewRoundsForm
  }>,
  setForm: SetFormFn,
) {
  const [generatingTasks, setGeneratingTasks] = useState<Record<string, boolean>>({})
  const abortRef = useRef<AbortController | null>(null)

  const generateTaskCriteria = React.useCallback(
    async (taskId: string, signal?: AbortSignal) => {
      const form = formRef.current
      if (!form) return
      const task: InterviewTask | undefined = form.rounds.tasks.find((t) => t.id === taskId)
      if (!task || !CALL_TASK_TYPES.has(task.type)) return

      setGeneratingTasks((prev) => ({ ...prev, [taskId]: true }))
      try {
        const res = await fetch("/api/onlyrounds/generate-criteria", {
          method: "POST",
          signal,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            jd: form.jd,
            detailsSummary: summarizeDetails(form.details),
            tasksSummary: summarizeTasks(form.rounds.tasks),
            taskName:
              task.title ||
              (task.type === "screening" ? "Screening" : "Interview"),
            taskType: task.type,
          }),
        })

        if (!res.ok) throw new Error("Failed to generate")
        const data = await res.json()
        if (data.error) throw new Error(data.error)

        const nextCriteria: Criterion[] = []
        let critCounter = 0
        const push = (category: CriteriaCategory, arr?: string[]) => {
          for (const raw of arr ?? []) {
            if (nextCriteria.length >= MAX_CRITERIA) break
            const text = String(raw).trim()
            if (text) {
              critCounter++
              nextCriteria.push({ id: `crit-${task.id}-${critCounter}`, category, text })
            }
          }
        }
        push("must-have", data.mustHave)
        push("good-to-have", data.goodToHave)
        push("red-flag", data.redFlag)

        const synced = syncCefrCriteria(nextCriteria, task.screening, task.id)

        setForm((prev) => ({
          ...prev,
          rounds: {
            ...prev.rounds,
            tasks: prev.rounds.tasks.map((t: InterviewTask) =>
              t.id === taskId ? { ...t, criteria: synced } : t,
            ),
          },
        }))
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        console.error(`Error generating criteria for task ${taskId}:`, err)
        toast.error(
          `Could not generate criteria for ${
            task.title ||
            (task.type === "screening" ? "Screening" : "Interview")
          } round.`,
        )
      } finally {
        setGeneratingTasks((prev) => {
          const next = { ...prev }
          delete next[taskId]
          return next
        })
      }
    },
    // formRef is stable; setForm is stable from useState.
    [formRef, setForm],
  )

  const generateAllCriteria = React.useCallback(async () => {
    const form = formRef.current
    if (!form) return
    const tasksToGenerate = form.rounds.tasks.filter(
      (t) =>
        CALL_TASK_TYPES.has(t.type) &&
        t.screening.mode === "ai" &&
        (!t.criteria || t.criteria.length === 0),
    )
    if (tasksToGenerate.length === 0) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    await Promise.all(
      tasksToGenerate.map((t) => generateTaskCriteria(t.id, controller.signal)),
    )
  }, [formRef, generateTaskCriteria])

  const abortGeneration = React.useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setGeneratingTasks({})
  }, [])

  return { generatingTasks, generateTaskCriteria, generateAllCriteria, abortGeneration }
}

"use client"

/**
 * InterviewRoundsStep — step 3 of the Create Job wizard.
 *
 * The recruiter assembles an ordered pipeline of tasks. Each task is one of
 * four types — Screening, Interview, Interview scheduling, or a Custom task —
 * picked from a chooser that appends a configurable task card to the list.
 *
 * Screening is fully configurable:
 *   • Type      — AI screening or Human screening
 *   • Direction — Inbound, Outbound, or Both        (AI only)
 *   • Format    — Audio or Video                     (AI only; Video is
 *                 unavailable for Outbound, which runs as a regular call)
 *   • Add-on    — CEFR language proficiency assessment (adds 3–4 min)
 *
 * The other task types are placeholders for now.
 *
 * Fully controlled — the wizard owns the form state.
 */

import { Plus } from "@apna/design-system"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { RoundsErrorContext } from "@/components/onlyrounds/shared"
import { isAiRound, syncCefrCriteria } from "@/lib/onlyrounds/utils"
import type { InterviewRoundsForm, InterviewTask, TaskType } from "@/types/onlyrounds"
import { SINGLETON_TASK_TYPES, makeScreening } from "@/components/onlyrounds/interview-rounds-step/constants"
import { useIdGenerator } from "@/components/onlyrounds/interview-rounds-step/use-id-generator"
import { TaskTypePicker } from "@/components/onlyrounds/interview-rounds-step/task-type-picker"
import { TaskCard } from "@/components/onlyrounds/interview-rounds-step/task-card"

export type { InterviewRoundsForm }

// ---- component ----------------------------------------------------------

export function InterviewRoundsStep({
  form,
  update,
  generatingTasks = {},
  showErrors = false,
}: {
  form: InterviewRoundsForm
  update: (next: InterviewRoundsForm) => void
  generatingTasks?: Record<string, boolean>
  showErrors?: boolean
}) {
  const [showPicker, setShowPicker] = React.useState(false)
  const nextTaskId = useIdGenerator("task")

  const addTask = (type: TaskType) => {
    const task: InterviewTask = {
      id: nextTaskId(),
      type,
      title: "",
      notes: "",
      screening: makeScreening(),
      criteria: [],
      agentId: "isha",
      language: "english",
    }
    update({ ...form, tasks: [...form.tasks, task] })
    setShowPicker(false)
  }

  const updateTask = (id: string, patch: Partial<InterviewTask>) => {
    update({
      ...form,
      tasks: form.tasks.map((t) => {
        if (t.id !== id) return t
        const nextTask = { ...t, ...patch }
        // If screening config is updated, sync CEFR levels in criteria list
        if (patch.screening) {
          // If the task has criteria, check if key configuration fields changed.
          // If so, clear criteria to require regeneration.
          if (t.criteria && t.criteria.length > 0) {
            const hasFieldChanges =
              patch.screening.mode !== t.screening.mode ||
              patch.screening.direction !== t.screening.direction ||
              patch.screening.format !== t.screening.format ||
              patch.screening.cefrEnabled !== t.screening.cefrEnabled ||
              patch.screening.cefrMinLevel !== t.screening.cefrMinLevel ||
              patch.screening.cefrPreferredLevel !== t.screening.cefrPreferredLevel

            if (hasFieldChanges) {
              nextTask.criteria = []
            } else {
              nextTask.criteria = syncCefrCriteria(nextTask.criteria, patch.screening, t.id)
            }
          }
        }
        return nextTask
      }),
    })
  }

  const removeTask = (id: string) => {
    const remaining = form.tasks.filter((t) => t.id !== id)
    update({ ...form, tasks: remaining })
  }

  // CEFR can be enabled on at most one task across the pipeline.
  const cefrTaskId = form.tasks.find((t) => t.screening.cefrEnabled)?.id ?? null

  // Singleton task types already present can't be added again.
  const disabledTypes = new Set<TaskType>(
    [...SINGLETON_TASK_TYPES].filter((type) =>
      form.tasks.some((t) => t.type === type),
    ),
  )

  const eligibleTasks = form.tasks.filter((t) => isAiRound(t))
  const isEvaluationCompleted =
    eligibleTasks.length > 0 &&
    eligibleTasks.every((t) => t.criteria && t.criteria.length > 0)
  const isAnyGenerating = Object.values(generatingTasks).some(Boolean)

  const clearAllCriteria = () => {
    update({
      ...form,
      tasks: form.tasks.map((t) => ({ ...t, criteria: [] })),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-tight">Interview rounds</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Build the pipeline each candidate moves through, in order. Add a task
            to get started.
          </p>
        </div>
        {isEvaluationCompleted && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAllCriteria}
            className="self-start mt-2 sm:mt-0"
          >
            Edit rounds
          </Button>
        )}
      </header>

      {/* Task list — RoundsErrorContext removes the need to prop-drill showErrors */}
      {form.tasks.length > 0 ? (
        <RoundsErrorContext.Provider value={showErrors}>
          <div className="flex flex-col gap-4">
            {form.tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                index={i + 1}
                task={task}
                onUpdate={(patch) => updateTask(task.id, patch)}
                onRemove={() => removeTask(task.id)}
                cefrLockedElsewhere={cefrTaskId !== null && cefrTaskId !== task.id}
                isAnyGenerating={isAnyGenerating}
                isEvaluationCompleted={isEvaluationCompleted}
              />
            ))}
          </div>
        </RoundsErrorContext.Provider>
      ) : null}

      {/* Empty state — picker shown inline */}
      {form.tasks.length === 0 && !showPicker && !isAnyGenerating ? (
        <TaskTypePicker
          index={1}
          title="Choose a task to add"
          onPick={addTask}
          disabledTypes={disabledTypes}
        />
      ) : null}

      {/* Add-task picker / CTA */}
      {!isEvaluationCompleted && !isAnyGenerating && (
        <>
          {showPicker ? (
            <TaskTypePicker
              index={form.tasks.length + 1}
              title="Add a task"
              onPick={addTask}
              onCancel={() => setShowPicker(false)}
              disabledTypes={disabledTypes}
            />
          ) : form.tasks.length > 0 ? (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPicker(true)}
              >
                <Plus className="size-3.5" />
                Add task
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}


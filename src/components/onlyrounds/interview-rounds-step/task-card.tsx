"use client"

import { Bookmark, ListTodo, MoreVertical, Trash2 } from "@apna/design-system"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field as UIField, FieldDescription, FieldLabel } from "@/components/ui/field"
import { CALL_TASK_TYPES } from "@/lib/onlyrounds/constants"
import { isAiRound } from "@/lib/onlyrounds/utils"
import type { InterviewTask } from "@/types/onlyrounds"
import { TASK_META } from "@/components/onlyrounds/interview-rounds-step/constants"
import { ScreeningSummary } from "@/components/onlyrounds/interview-rounds-step/screening-summary"
import { SchedulingEditor, ScreeningEditor } from "@/components/onlyrounds/interview-rounds-step/task-editors"
import { TaskCriteriaSection } from "@/components/onlyrounds/interview-rounds-step/criteria-editor"
import {
  CustomTaskReadOnly,
  HumanCallReadOnly,
  SchedulingReadOnly,
} from "@/components/onlyrounds/interview-rounds-step/read-only-views"
import {
  CustomTaskSkeleton,
  HumanCallSkeleton,
  SchedulingSkeleton,
} from "@/components/onlyrounds/interview-rounds-step/skeletons"

// ---- task card ----------------------------------------------------------

export function TaskCard({
  index,
  task,
  onUpdate,
  onRemove,
  cefrLockedElsewhere,
  isAnyGenerating,
  isEvaluationCompleted,
}: {
  index: number
  task: InterviewTask
  onUpdate: (patch: Partial<InterviewTask>) => void
  onRemove: () => void
  /** True when another task already has the CEFR add-on enabled. */
  cefrLockedElsewhere: boolean
  isAnyGenerating?: boolean
  isEvaluationCompleted?: boolean
}) {
  const meta = TASK_META[task.type]
  const Icon = meta.icon
  const bodyId = `task-${task.id}-body`
  const isCallTask = CALL_TASK_TYPES.has(task.type)

  const isAiRoundTask = isAiRound(task)
  const hasCriteria = task.criteria && task.criteria.length > 0
  const showCriteriaView = isAiRoundTask && (hasCriteria || isAnyGenerating)
  // Custom tasks show their user-given name (falling back to the label).
  const headerLabel =
    task.type === "custom" && task.title.trim()
      ? task.title.trim()
      : meta.label

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <Icon className="size-5 shrink-0 text-muted-foreground" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {headerLabel}
            </span>
            <span className="block text-xs text-muted-foreground">
              Task {index}
            </span>
          </span>
        </div>
        <ScreeningSummary task={task} />
        {!isEvaluationCompleted && !isAnyGenerating && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Task actions"
                >
                  <MoreVertical className="size-3.5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem variant="destructive" onClick={onRemove}>
                <Trash2 className="size-3.5" />
                Remove task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div
        id={bodyId}
        role="region"
        className="border-t border-border p-4"
      >
        {showCriteriaView ? (
          <TaskCriteriaSection
            index={index}
            task={task}
            generating={!!isAnyGenerating}
            onUpdateCriteria={(criteria) => onUpdate({ criteria, isCriteriaEdited: true })}
            onUpdateTask={(patch) => onUpdate(patch)}
          />
        ) : isAnyGenerating ? (
          <>
            {isCallTask ? (
              <HumanCallSkeleton />
            ) : task.type === "scheduling" ? (
              <SchedulingSkeleton />
            ) : (
              <CustomTaskSkeleton />
            )}
          </>
        ) : isEvaluationCompleted ? (
          <>
            {isCallTask ? (
              <HumanCallReadOnly
                noun={task.type === "interview" ? "interview" : "screening"}
                config={task.screening}
              />
            ) : task.type === "scheduling" ? (
              <SchedulingReadOnly config={task.screening} />
            ) : (
              <CustomTaskReadOnly task={task} />
            )}
          </>
        ) : (
          <>
            {isCallTask ? (
              <ScreeningEditor
                noun={task.type === "interview" ? "interview" : "screening"}
                config={task.screening}
                onChange={(screening) => onUpdate({ screening })}
                cefrLockedElsewhere={cefrLockedElsewhere}
              />
            ) : task.type === "scheduling" ? (
              <SchedulingEditor
                config={task.screening}
                onChange={(screening) => onUpdate({ screening })}
              />
            ) : (
              // custom
              <div className="flex flex-col gap-5">
                <UIField>
                  <FieldLabel icon={Bookmark}>Task name</FieldLabel>
                  <Input
                    value={task.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    placeholder="e.g. Take-home assignment"
                  />
                </UIField>
                <UIField>
                  <FieldLabel icon={ListTodo}>Task details</FieldLabel>
                  <Textarea
                    value={task.notes}
                    onChange={(e) => onUpdate({ notes: e.target.value })}
                    placeholder="e.g. Take-home assignment shared over email, 48-hour turnaround."
                    rows={4}
                  />
                  <FieldDescription>Describe what happens in this custom step.</FieldDescription>
                </UIField>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

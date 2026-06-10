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

import {
  Bookmark,
  Bot,
  CalendarClock,
  Check,
  CircleCheck,
  Compass,
  Flag,
  HelpCircle,
  Languages,
  Layout,
  ListTodo,
  Mars,
  MessageCircleQuestion,
  Mic,
  MoreVertical,
  Pause,
  Pencil,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Plus,
  Puzzle,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  Users,
  Venus,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { capitalize, cn } from "@/lib/utils"
import {
  DisplayField,
  InfoChip,
  RoundsErrorContext,
  SelectionCard,
  WizardField,
} from "@/components/onlyrounds/shared"
import {
  AGENTS,
  CALL_TASK_TYPES,
  CEFR_LEVELS,
  CRITERIA_CATEGORIES,
  LANGUAGES,
  MAX_CRITERIA,
} from "@/lib/onlyrounds/constants"
import { isAiRound, syncCefrCriteria } from "@/lib/onlyrounds/utils"
import type {
  AgentId,
  CefrLevel,
  CriteriaCategory,
  Criterion,
  InterviewLanguage,
  InterviewRoundsForm,
  InterviewTask,
  ScreeningConfig,
  ScreeningDirection,
  ScreeningFormat,
  ScreeningMode,
  TaskType,
} from "@/types/onlyrounds"

export type { InterviewRoundsForm }

// ---- defaults / local helpers -------------------------------------------

const makeScreening = (): ScreeningConfig => ({
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
const SINGLETON_TASK_TYPES: ReadonlySet<TaskType> = new Set(["screening"])

// ---- task-type metadata -------------------------------------------------

type TaskTypeMeta = {
  type: TaskType
  label: string
  description: string
  icon: LucideIcon
}

const TASK_TYPES: TaskTypeMeta[] = [
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

const TASK_META = Object.fromEntries(
  TASK_TYPES.map((t) => [t.type, t]),
) as Record<TaskType, TaskTypeMeta>

/** Create a useRef-based monotonic ID generator that resets with the component. */
function useIdGenerator(prefix: string) {
  const counter = React.useRef(0)
  return React.useCallback(() => {
    counter.current += 1
    return `${prefix}-${counter.current}`
  }, [prefix])
}

// ---- chip option sets ---------------------------------------------------

const modeChips = (noun: string): ChipTabItem<ScreeningMode>[] => [
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

const CEFR_LABELS: Record<CefrLevel, string> = {
  A1: "A1 (Beginner)",
  A2: "A2 (Elementary)",
  B1: "B1 (Intermediate)",
  B2: "B2 (Upper-Int)",
  C1: "C1 (Advanced)",
  C2: "C2 (Mastery)",
}

const DIRECTION_CHIPS: ChipTabItem<ScreeningDirection>[] = [
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
    <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-6">
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

// ---- task-type picker ---------------------------------------------------

function TaskTypePicker({
  index,
  title,
  onPick,
  onCancel,
  disabledTypes,
}: {
  /** The task number this picker will create (1-based). */
  index: number
  title: string
  onPick: (type: TaskType) => void
  onCancel?: () => void
  /** Types already used that can't be added again (e.g. Screening). */
  disabledTypes: ReadonlySet<TaskType>
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            {index}
          </span>
          <span className="text-sm font-medium">{title}</span>
        </div>
        {onCancel ? (
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TASK_TYPES.map((t) => {
          const Icon = t.icon
          const disabled = disabledTypes.has(t.type)
          return (
            <button
              key={t.type}
              type="button"
              disabled={disabled}
              onClick={() => onPick(t.type)}
              // No shadow — the picker container already carries the
              // elevation. `group` lets the icon box react on hover.
              className={cn(
                "group flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors",
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-primary hover:bg-accent/30",
              )}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {t.label}
                  {disabled ? (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      · Added
                    </span>
                  ) : null}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {t.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---- task card ----------------------------------------------------------

function TaskCard({
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
            onUpdateCriteria={(criteria) => onUpdate({ criteria })}
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

/** Compact chips shown in the task header — mode, direction, and call
 *  format (voice/video), each with its own icon. */
function ScreeningSummary({ task }: { task: InterviewTask }) {
  if (task.type === "custom") return null
  const { mode, direction, format } = task.screening
  if (!mode) return null

  const chips: { icon: LucideIcon; label: string }[] = [
    {
      icon: mode === "ai" ? Bot : UserRound,
      label: mode === "ai" ? "AI" : "Human",
    },
  ]
  // Direction / format only apply to AI call tasks (screening / interview).
  if (CALL_TASK_TYPES.has(task.type) && mode === "ai") {
    if (direction) {
      chips.push({
        icon:
          direction === "outbound"
            ? PhoneOutgoing
            : direction === "inbound"
              ? PhoneIncoming
              : PhoneCall,
        label: capitalize(direction),
      })
    }
    if (format) {
      chips.push({
        icon: format === "video" ? Video : Mic,
        label: format === "video" ? "Video call" : "Voice call",
      })
    }
  }

  return (
    <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
      {chips.map(({ icon, label }) => (
        <InfoChip key={label} icon={icon}>{label}</InfoChip>
      ))}
    </div>
  )
}

// ---- interview scheduling editor ----------------------------------------

function SchedulingEditor({
  config,
  onChange,
}: {
  // Reuses the call config's `mode` + `humanNotes`.
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
}) {
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

  return (
    <div className="flex flex-col gap-6">
      <UIField>
        <FieldLabel icon={CalendarClock}>Scheduling type</FieldLabel>
        <ChipTabs
          variant="choice"
          items={modeChips("scheduling")}
          value={config.mode}
          onValueChange={(v) => set({ mode: v })}
          aria-label="Scheduling type"
        />
      </UIField>

      {config.mode === "ai" ? (
        <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          AI scheduling is coming soon.
        </p>
      ) : config.mode === "human" ? (
        <UIField>
          <FieldLabel icon={ListTodo}>Task details</FieldLabel>
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Offer 3 slots across the week, confirm over WhatsApp, and share the meeting link a day before."
            rows={4}
          />
          <FieldDescription>Instructions for the team coordinating interview slots.</FieldDescription>
        </UIField>
      ) : null}
    </div>
  )
}

// ---- call task editor (screening + interview) ---------------------------

function ScreeningEditor({
  noun,
  config,
  onChange,
  cefrLockedElsewhere,
}: {
  /** Lowercase task noun used in labels, e.g. "screening" / "interview". */
  noun: string
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
  /** Another task already owns the CEFR add-on — hide it here. */
  cefrLockedElsewhere: boolean
}) {
  const showErrors = React.useContext(RoundsErrorContext)
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

  const Noun = capitalize(noun)
  const isAI = config.mode === "ai"
  // Video is available for inbound only. Outbound runs as a regular phone
  // call (audio), and "Both" includes outbound — so both disable video.
  const videoUnavailable =
    config.direction === "outbound" || config.direction === "both"

  const formatChips: ChipTabItem<ScreeningFormat>[] = [
    {
      value: "audio",
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Mic className="size-3.5" />
          Audio
        </span>
      ),
    },
    {
      value: "video",
      disabled: videoUnavailable,
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Video className="size-3.5" />
          Video
        </span>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <UIField>
        <FieldLabel icon={Wrench}>{Noun} type<span className="ml-0.5 text-destructive">*</span></FieldLabel>
        <ChipTabs
          variant="choice"
          items={modeChips(noun)}
          value={config.mode}
          onValueChange={(v) =>
            // Human mode has no CEFR add-on — clear it when switching.
            set(v === "human" ? { mode: v, cefrEnabled: false } : { mode: v })
          }
          aria-label={`${Noun} type`}
          aria-invalid={showErrors && !config.mode || undefined}
        />
      </UIField>

      {config.mode === "human" ? (
        <UIField>
          <FieldLabel icon={MessageCircleQuestion}>Key questions or notes</FieldLabel>
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Confirm notice period and expected CTC, check willingness to travel, and gauge spoken English."
            rows={4}
          />
          <FieldDescription>{`What should your team cover at this ${noun} stage?`}</FieldDescription>
        </UIField>
      ) : isAI ? (
        <>
          <UIField>
            <FieldLabel icon={Compass}>{Noun} direction<span className="ml-0.5 text-destructive">*</span></FieldLabel>
            <ChipTabs
              variant="choice"
              items={DIRECTION_CHIPS}
              value={config.direction}
              onValueChange={(v) =>
                // Outbound (and Both, which includes outbound) can't be
                // video — fall back to Audio if Video was selected.
                set(
                  (v === "outbound" || v === "both") &&
                    config.format === "video"
                    ? { direction: v, format: "audio" }
                    : { direction: v },
                )
              }
              aria-label={`${Noun} direction`}
              aria-invalid={showErrors && !config.direction || undefined}
            />
            <FieldDescription>Inbound: the candidate calls in. Outbound: we call the candidate.</FieldDescription>
          </UIField>

          <UIField>
            <FieldLabel icon={Layout}>{Noun} format<span className="ml-0.5 text-destructive">*</span></FieldLabel>
            <ChipTabs
              variant="choice"
              items={formatChips}
              value={config.format}
              onValueChange={(v) => set({ format: v })}
              aria-label={`${Noun} format`}
              aria-invalid={showErrors && !config.format || undefined}
            />
            {(config.direction === "outbound" || config.direction === "both") && (
              <FieldDescription>
                {config.direction === "outbound"
                  ? "Outbound runs as a regular call — audio only."
                  : '"Both" includes outbound calls — video isn\'t available.'}
              </FieldDescription>
            )}
          </UIField>

          {cefrLockedElsewhere ? (
            <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              The CEFR language assessment is enabled on another task. It can be
              used once per pipeline.
            </p>
          ) : (
            <CefrAddon config={config} onChange={onChange} />
          )}
        </>
      ) : null}
    </div>
  )
}

// ---- CEFR language proficiency add-on -----------------------------------

function CefrAddon({
  config,
  onChange,
}: {
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
}) {
  const showErrors = React.useContext(RoundsErrorContext)
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })
  const toggleId = React.useId()

  const minIdx = config.cefrMinLevel ? CEFR_LEVELS.indexOf(config.cefrMinLevel) : -1
  const preferredIdx = config.cefrPreferredLevel ? CEFR_LEVELS.indexOf(config.cefrPreferredLevel) : -1

  const minChips: ChipTabItem<CefrLevel>[] = CEFR_LEVELS.map((l, idx) => ({
    value: l,
    label: CEFR_LABELS[l],
    disabled: preferredIdx !== -1 && idx > preferredIdx,
  }))

  const preferredChips: ChipTabItem<CefrLevel>[] = CEFR_LEVELS.map((l, idx) => ({
    value: l,
    label: CEFR_LABELS[l],
    disabled: minIdx !== -1 && idx < minIdx,
  }))

  const setMinLevel = (min: CefrLevel | "") => {
    const patch: Partial<ScreeningConfig> = { cefrMinLevel: min }
    if (min && config.cefrPreferredLevel) {
      const minIdxVal = CEFR_LEVELS.indexOf(min)
      const prefIdxVal = CEFR_LEVELS.indexOf(config.cefrPreferredLevel)
      if (minIdxVal > prefIdxVal) {
        patch.cefrPreferredLevel = min
      }
    }
    set(patch)
  }

  const setPreferredLevel = (pref: CefrLevel | "") => {
    const patch: Partial<ScreeningConfig> = { cefrPreferredLevel: pref }
    if (pref && config.cefrMinLevel) {
      const minIdxVal = CEFR_LEVELS.indexOf(config.cefrMinLevel)
      const prefIdxVal = CEFR_LEVELS.indexOf(pref)
      if (minIdxVal > prefIdxVal) {
        patch.cefrMinLevel = pref
      }
    }
    set(patch)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium inline-flex items-center gap-2">
        <Puzzle className="size-4 text-muted-foreground shrink-0" />
        Add-ons
      </Label>
      <div className="overflow-hidden rounded-lg border border-border">
        <label
          htmlFor={toggleId}
          className="flex cursor-pointer items-start justify-between gap-3 p-3"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
              <Languages className="size-4 text-primary" />
              CEFR language proficiency assessment
              <Badge variant="info">New</Badge>
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Scores the candidate&apos;s spoken language level (A1–C2). Adds
              3–4 minutes.
            </span>
          </span>
          <Switch
            id={toggleId}
            checked={config.cefrEnabled}
            onCheckedChange={(checked) => set({ cefrEnabled: checked === true })}
          />
        </label>

        {config.cefrEnabled ? (
          <div className="flex flex-col gap-6 border-t border-border p-3">
            <UIField>
              <FieldLabel icon={Languages}>Minimum CEFR level<span className="ml-0.5 text-destructive">*</span></FieldLabel>
              <ChipTabs
                variant="choice"
                size="sm"
                items={minChips}
                value={config.cefrMinLevel}
                onValueChange={(v) => setMinLevel(v)}
                aria-label="Minimum CEFR level"
                aria-invalid={showErrors && !config.cefrMinLevel || undefined}
              />
              {showErrors && !config.cefrMinLevel && (
                <FieldError>Select a minimum level to enable the CEFR assessment.</FieldError>
              )}
              <FieldDescription>The lowest level a candidate must reach to pass.</FieldDescription>
            </UIField>
            <UIField>
              <FieldLabel icon={Languages}>Preferred CEFR level<span className="ml-1 text-xs font-normal text-muted-foreground">(Optional)</span></FieldLabel>
              <ChipTabs
                variant="choice"
                size="sm"
                items={preferredChips}
                value={config.cefrPreferredLevel}
                onValueChange={(v) => setPreferredLevel(v)}
                aria-label="Preferred CEFR level"
              />
              <FieldDescription>The level you&apos;d ideally like to see.</FieldDescription>
            </UIField>
            <UIField>
              <FieldLabel icon={HelpCircle}>Specific questions</FieldLabel>
              <Textarea
                value={config.cefrQuestions}
                onChange={(e) => set({ cefrQuestions: e.target.value })}
                placeholder="e.g. Ask the candidate to describe a past customer escalation in English."
                rows={3}
              />
              <FieldDescription>Optional — anything particular you want the assessment to probe.</FieldDescription>
            </UIField>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// ---- inline evaluation criteria editor ----------------------------------

function InlineCategoryGroup({
  label,
  description,
  Icon,
  tone,
  surface,
  items,
  atLimit,
  onAdd,
  onUpdate,
  onRemove,
}: {
  label: string
  description: string
  Icon: LucideIcon
  tone: string
  /** Tinted border + background that colour-codes the category. */
  surface: string
  items: Criterion[]
  atLimit: boolean
  onAdd: () => void
  onUpdate: (id: string, text: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border p-3", surface)}>
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4 shrink-0", tone)} />
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-muted-foreground">({items.length})</span>
      </div>
      <p className="-mt-1 text-xs text-muted-foreground">{description}</p>

      {items.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {items.map((c) => (
            <CriterionRow
              key={c.id}
              criterion={c}
              // Criteria synced from the CEFR add-on carry a "cefr-" id —
              // they're locked (not editable or removable).
              locked={c.id.includes("cefr-")}
              placeholder={`Describe a ${label.toLowerCase()} criterion`}
              onChange={(text) => onUpdate(c.id, text)}
              onRemove={() => onRemove(c.id)}
            />
          ))}
        </div>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={onAdd}
        disabled={atLimit}
        className="h-7 self-start bg-card text-xs"
        title={atLimit ? `Limit of ${MAX_CRITERIA} criteria reached` : undefined}
      >
        <Plus className="mr-1 size-3" />
        Add {label.toLowerCase()}
      </Button>
    </div>
  )
}

/**
 * A single criterion row.
 * - Locked (CEFR add-on): read-only, shows an "Add-on" tag inside the field,
 *   no edit/remove.
 * - Otherwise: read-only by default — click the pencil to edit, the check to
 *   confirm. New (empty) criteria open in edit mode.
 */
function CriterionRow({
  criterion,
  locked,
  placeholder,
  onChange,
  onRemove,
}: {
  criterion: Criterion
  locked: boolean
  placeholder: string
  onChange: (text: string) => void
  onRemove: () => void
}) {
  const [editing, setEditing] = React.useState(
    () => !locked && criterion.text.trim() === "",
  )

  if (locked) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex h-8 flex-1 items-center rounded-md border border-input bg-card px-3">
          <span className="flex-1 truncate text-xs">{criterion.text}</span>
        </div>
        <Badge variant="secondary" className="shrink-0 text-muted-foreground">
          Add-on
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      {editing ? (
        <Input
          autoFocus
          value={criterion.text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              setEditing(false)
            }
          }}
          className="h-8 flex-1 bg-card text-xs"
        />
      ) : (
        <div className="flex h-8 flex-1 items-center rounded-md border border-input bg-card px-3">
          <span className="flex-1 truncate text-xs">
            {criterion.text || (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={editing ? "Done editing" : "Edit criterion"}
        // Stop the input blurring before this click registers while editing.
        onMouseDown={editing ? (e) => e.preventDefault() : undefined}
        onClick={() => setEditing((v) => !v)}
      >
        {editing ? (
          <Check className="size-3" />
        ) : (
          <Pencil className="size-3" />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Remove criterion"
        onClick={onRemove}
      >
        <Trash2 className="size-3" />
      </Button>
    </div>
  )
}


// ---- AI interviewer card ------------------------------------------------

// InfoPill → use InfoChip (variant="outlined") from shared.tsx
const InfoPill = ({ icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <InfoChip icon={icon} variant="outlined">{children}</InfoChip>
)

function InterviewerCard({
  index,
  agentId,
  language,
  onAgentChange,
  onLanguageChange,
}: {
  index: number
  agentId: AgentId
  language: InterviewLanguage
  onAgentChange: (id: AgentId) => void
  onLanguageChange: (lang: InterviewLanguage) => void
}) {
  const [editOpen, setEditOpen] = React.useState(false)
  const agent = AGENTS[agentId]

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
        <Bot className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          {agent.name}
          <Sparkles className="size-3 text-primary" />
        </div>
        <div className="text-xs text-muted-foreground">
          {agent.role} · {agent.voice} voice
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <InfoPill icon={Languages}>{LANGUAGES[language].label}</InfoPill>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setEditOpen(true)}
        className="shrink-0 bg-card"
      >
        <Pencil className="size-3.5" />
        Edit
      </Button>

      <InterviewerEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        index={index}
        agentId={agentId}
        language={language}
        onSave={(a, l) => {
          onAgentChange(a)
          onLanguageChange(l)
          setEditOpen(false)
        }}
      />
    </div>
  )
}

function InterviewerEditDialog({
  open,
  onOpenChange,
  index,
  agentId,
  language,
  onSave,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  index: number
  agentId: AgentId
  language: InterviewLanguage
  onSave: (agentId: AgentId, language: InterviewLanguage) => void
}) {
  const [draftAgent, setDraftAgent] = React.useState<AgentId>(agentId)
  const [draftLang, setDraftLang] = React.useState<InterviewLanguage>(language)

  // Reset the drafts to the task's current values each time the dialog opens.
  React.useEffect(() => {
    if (open) {
      setDraftAgent(agentId)
      setDraftLang(language)
    }
  }, [open, agentId, language])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit round {index} configuration</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-1">
          {/* Language */}
          <section className="flex flex-col gap-4">
            <header className="flex items-start gap-2.5">
              <Languages className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-semibold">
                  Choose AI Interview language{" "}
                  <span className="text-destructive">*</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Select the primary language you want our AI to conduct
                  interviews in
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(Object.keys(LANGUAGES) as InterviewLanguage[]).map((lang) => (
                <LanguageOption
                  key={lang}
                  lang={lang}
                  selected={draftLang === lang}
                  onSelect={() => setDraftLang(lang)}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Reach out to us if you need additional languages
            </p>
          </section>

          {/* AI recruiter */}
          <section className="flex flex-col gap-4 border-t border-border pt-5">
            <header className="flex items-start gap-2.5">
              <Mic className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-semibold">
                  Choose your AI recruiter{" "}
                  <span className="text-destructive">*</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Choose the AI capabilities for your automated interviews
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(Object.keys(AGENTS) as AgentId[]).map((id) => (
                <AgentOption
                  key={id}
                  id={id}
                  selected={draftAgent === id}
                  onSelect={() => setDraftAgent(id)}
                />
              ))}
            </div>
          </section>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => onSave(draftAgent, draftLang)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border",
        selected ? "border-primary" : "border-muted-foreground/40",
      )}
      aria-hidden="true"
    >
      {selected ? <span className="size-2 rounded-full bg-primary" /> : null}
    </span>
  )
}

function LanguageOption({
  lang,
  selected,
  onSelect,
}: {
  lang: InterviewLanguage
  selected: boolean
  onSelect: () => void
}) {
  const meta = LANGUAGES[lang]
  return (
    <SelectionCard selected={selected} onSelect={onSelect} className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
        {meta.badge}
      </span>
      <span className="flex-1 text-sm font-medium">{meta.label}</span>
      <RadioDot selected={selected} />
    </SelectionCard>
  )
}

function AgentOption({
  id,
  selected,
  onSelect,
}: {
  id: AgentId
  selected: boolean
  onSelect: () => void
}) {
  const agent = AGENTS[id]
  const [playing, setPlaying] = React.useState(false)
  const Gender = agent.voice === "Female" ? Venus : Mars

  return (
    <SelectionCard selected={selected} onSelect={onSelect} className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
            <Bot className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold">
              {agent.name} ({agent.role})
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {agent.voice} Voice
              <Gender className="size-3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {agent.recommended ? (
            <Badge variant="default">Recommended</Badge>
          ) : null}
          <RadioDot selected={selected} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between rounded-md bg-muted/60 px-3 py-2.5">
        <div>
          <div className="text-base font-semibold">{agent.interviewsTaken}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3" />
            Interviews Taken
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-semibold">{agent.completionRate}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CircleCheck className="size-3" />
            Completion rate
          </div>
        </div>
      </div>

      {/* Preview tone — prototype placeholder (no audio wired). */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Preview Tone
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setPlaying((p) => !p)
            }}
            aria-label={playing ? "Pause preview" : "Play preview"}
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          </button>
          <div className="h-1 flex-1 rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <span className="text-xs text-muted-foreground">0:00 / 0:00</span>
        </div>
      </div>
    </SelectionCard>
  )
}

function TaskCriteriaSection({
  index,
  task,
  generating,
  onUpdateCriteria,
  onUpdateTask,
}: {
  index: number
  task: InterviewTask
  generating: boolean
  onUpdateCriteria: (criteria: Criterion[]) => void
  onUpdateTask: (patch: Partial<InterviewTask>) => void
}) {
  const criteria = task.criteria || []
  const total = criteria.length
  const atLimit = total >= MAX_CRITERIA
  const hasCriteria = total > 0
  const nextCritId = useIdGenerator(`crit-${task.id}`)

  const addCriterion = (category: CriteriaCategory) => {
    if (atLimit) return
    const newId = nextCritId()
    onUpdateCriteria([...criteria, { id: newId, category, text: "" }])
  }

  const updateText = (id: string, text: string) => {
    onUpdateCriteria(criteria.map((c) => (c.id === id ? { ...c, text } : c)))
  }

  const removeCriterion = (id: string) => {
    onUpdateCriteria(criteria.filter((c) => c.id !== id))
  }

  if (generating) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold animate-pulse">Evaluation criteria</span>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-3/4 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* AI interviewer (agent + language) — this is bot/language config,
          not criteria, so it sits ABOVE the evaluation-criteria heading. */}
      {hasCriteria ? (
        <InterviewerCard
          index={index}
          agentId={task.agentId ?? "isha"}
          language={task.language ?? "english"}
          onAgentChange={(agentId) => onUpdateTask({ agentId })}
          onLanguageChange={(language) => onUpdateTask({ language })}
        />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-semibold">Evaluation criteria</span>
        </div>
      </div>

      {!hasCriteria ? (
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            No evaluation criteria yet. Generate them specifically for this round.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {CRITERIA_CATEGORIES.map((meta) => (
            <InlineCategoryGroup
              key={meta.key}
              label={meta.label}
              description={meta.description}
              Icon={meta.icon}
              tone={meta.tone}
              surface={meta.surface}
              items={criteria.filter((c) => c.category === meta.key)}
              atLimit={atLimit}
              onAdd={() => addCriterion(meta.key)}
              onUpdate={updateText}
              onRemove={removeCriterion}
            />
          ))}
          <div className="flex justify-end border-t border-border pt-2 text-xs text-muted-foreground">
            {total} / {MAX_CRITERIA} criteria
          </div>
        </div>
      )}
    </div>
  )
}

// ---- read-only views for non-AI tasks when criteria generated -----------

function CustomTaskReadOnly({ task }: { task: InterviewTask }) {
  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label="Task name"
        value={task.title || "Custom task"}
      />
      <DisplayField
        label="Task details"
        value={task.notes || "No details provided."}
      />
    </div>
  )
}

function SchedulingReadOnly({ config }: { config: ScreeningConfig }) {
  const isAI = config.mode === "ai"
  const isHuman = config.mode === "human"

  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label="Scheduling type"
        value={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            {isAI ? (
              <>
                <Bot className="size-3.5 text-primary" />
                AI scheduling
              </>
            ) : isHuman ? (
              <>
                <UserRound className="size-3.5 text-primary" />
                Human scheduling
              </>
            ) : (
              "Not configured"
            )}
          </span>
        }
      />
      {isHuman && (
        <DisplayField
          label="Task details"
          value={config.humanNotes || "No instructions provided."}
        />
      )}
      {isAI && (
        <p className="text-xs text-muted-foreground">
          AI scheduling is coming soon.
        </p>
      )}
    </div>
  )
}

function HumanCallReadOnly({
  noun,
  config,
}: {
  noun: string
  config: ScreeningConfig
}) {
  const Noun = capitalize(noun)
  const isHuman = config.mode === "human"
  const isAI = config.mode === "ai"

  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label={`${Noun} type`}
        value={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            {isAI ? (
              <>
                <Bot className="size-3.5 text-primary" />
                AI {noun}
              </>
            ) : isHuman ? (
              <>
                <UserRound className="size-3.5 text-primary" />
                Human {noun}
              </>
            ) : (
              "Not configured"
            )}
          </span>
        }
      />
      {isHuman && (
        <DisplayField
          label="Key questions or notes"
          value={config.humanNotes || "No questions or notes provided."}
        />
      )}
    </div>
  )
}

// ---- skeleton loaders for non-AI tasks when criteria generating ---------
// All three task types share the same 2-field skeleton structure.

function TaskBodySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  )
}

// Aliases kept so callers don't need to change.
const CustomTaskSkeleton = TaskBodySkeleton
const SchedulingSkeleton = TaskBodySkeleton
const HumanCallSkeleton = TaskBodySkeleton

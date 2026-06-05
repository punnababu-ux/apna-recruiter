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
  Bot,
  CalendarClock,
  ChevronDown,
  Languages,
  Mic,
  MoreVertical,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Plus,
  Puzzle,
  Trash2,
  UserRound,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { EvaluationCriteriaSection } from "./evaluation-criteria"
import { type JobDetailsForm } from "./job-details-step"

// ---- types --------------------------------------------------------------

export type TaskType = "screening" | "interview" | "scheduling" | "custom"
export type ScreeningMode = "ai" | "human"
export type ScreeningDirection = "inbound" | "outbound" | "both"
export type ScreeningFormat = "audio" | "video"
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

/**
 * Shared call configuration. Both Screening and Interview tasks use this —
 * an interview round is configured exactly like a screening call (AI/human,
 * inbound/outbound/both, audio/video with the same constraints, plus the
 * CEFR add-on).
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

export type InterviewTask = {
  id: string
  type: TaskType
  /** Custom task name (Custom task type only; empty falls back to the label). */
  title: string
  /** Free-text notes — Custom task details, or Human-scheduling instructions. */
  notes: string
  /** Call config — used by Screening and Interview task types. The `mode`
   *  and `humanNotes` fields are also reused by Interview scheduling. */
  screening: ScreeningConfig
}

export type CriteriaCategory = "must-have" | "good-to-have" | "red-flag"
export type Criterion = {
  id: string
  category: CriteriaCategory
  text: string
}

export const MAX_CRITERIA = 15

export type InterviewRoundsForm = {
  tasks: InterviewTask[]
  criteria: Criterion[]
}

export const defaultInterviewRounds: InterviewRoundsForm = {
  tasks: [],
  criteria: [],
}

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

/** Task types that use the shared call/screening config + editor. */
const CALL_TASK_TYPES: ReadonlySet<TaskType> = new Set([
  "screening",
  "interview",
])

/** A task is an "AI round" when it's an AI screening or AI interview. */
export function hasAiRound(rounds: InterviewRoundsForm): boolean {
  return rounds.tasks.some(
    (t) => CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai",
  )
}

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

// Module-level monotonic counter for stable task ids (no Date.now/Math.random
// during render).
let taskIdCounter = 0
const nextTaskId = () => {
  taskIdCounter += 1
  return `task-${taskIdCounter}`
}

// ---- chip option sets ---------------------------------------------------

// Mode chips are built per-task so the label reads "AI screening" /
// "AI interview" etc.
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

const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
const CEFR_CHIPS: ChipTabItem<CefrLevel>[] = CEFR_LEVELS.map((l) => ({
  value: l,
  label: l,
}))

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

// ---- generate-context summaries -----------------------------------------

function summarizeDetails(d: JobDetailsForm): string {
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

function summarizeTasks(tasks: InterviewTask[]): string {
  return tasks
    .map((t, i) => {
      const meta = TASK_META[t.type]
      const name =
        t.type === "custom" && t.title.trim() ? t.title.trim() : meta.label
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

// ---- component ----------------------------------------------------------

export function InterviewRoundsStep({
  form,
  update,
  jobContext,
}: {
  form: InterviewRoundsForm
  update: (next: InterviewRoundsForm) => void
  /** Read-only job context used to generate evaluation criteria. */
  jobContext: { title: string; jd: string; details: JobDetailsForm }
}) {
  const [showPicker, setShowPicker] = React.useState(false)
  // Single-open accordion across task cards.
  const [openTaskId, setOpenTaskId] = React.useState<string | null>(
    form.tasks[0]?.id ?? null,
  )

  const addTask = (type: TaskType) => {
    const task: InterviewTask = {
      id: nextTaskId(),
      type,
      title: "",
      notes: "",
      screening: makeScreening(),
    }
    update({ ...form, tasks: [...form.tasks, task] })
    setOpenTaskId(task.id)
    setShowPicker(false)
  }

  const updateTask = (id: string, patch: Partial<InterviewTask>) => {
    update({
      ...form,
      tasks: form.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })
  }

  const removeTask = (id: string) => {
    const remaining = form.tasks.filter((t) => t.id !== id)
    update({ ...form, tasks: remaining })
    if (openTaskId === id) {
      setOpenTaskId(remaining[remaining.length - 1]?.id ?? null)
    }
  }

  const toggleTask = (id: string) => {
    setOpenTaskId((curr) => (curr === id ? null : id))
  }

  // CEFR can be enabled on at most one task across the pipeline.
  const cefrTaskId = form.tasks.find((t) => t.screening.cefrEnabled)?.id ?? null

  // Singleton task types already present can't be added again.
  const disabledTypes = new Set<TaskType>(
    [...SINGLETON_TASK_TYPES].filter((type) =>
      form.tasks.some((t) => t.type === type),
    ),
  )

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-semibold leading-tight">Interview rounds</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Build the pipeline each candidate moves through, in order. Add a task
          to get started.
        </p>
      </header>

      {/* Task list */}
      {form.tasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {form.tasks.map((task, i) => (
            <TaskCard
              key={task.id}
              index={i + 1}
              task={task}
              isOpen={openTaskId === task.id}
              onToggle={() => toggleTask(task.id)}
              onUpdate={(patch) => updateTask(task.id, patch)}
              onRemove={() => removeTask(task.id)}
              cefrLockedElsewhere={cefrTaskId !== null && cefrTaskId !== task.id}
            />
          ))}
        </div>
      ) : null}

      {/* Empty state — picker shown inline */}
      {form.tasks.length === 0 && !showPicker ? (
        <TaskTypePicker
          index={1}
          title="Choose a task to add"
          onPick={addTask}
          disabledTypes={disabledTypes}
        />
      ) : null}

      {/* Add-task picker / CTA */}
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

      {/* Evaluation criteria — available once at least one task exists. */}
      {form.tasks.length > 0 ? (
        <EvaluationCriteriaSection
          criteria={form.criteria ?? []}
          onChange={(criteria) => update({ ...form, criteria })}
          context={{
            title: jobContext.title,
            jd: jobContext.jd,
            detailsSummary: summarizeDetails(jobContext.details),
            tasksSummary: summarizeTasks(form.tasks),
          }}
        />
      ) : null}
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
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
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
                  : "hover:border-primary hover:bg-accent/40",
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
  isOpen,
  onToggle,
  onUpdate,
  onRemove,
  cefrLockedElsewhere,
}: {
  index: number
  task: InterviewTask
  isOpen: boolean
  onToggle: () => void
  onUpdate: (patch: Partial<InterviewTask>) => void
  onRemove: () => void
  /** True when another task already has the CEFR add-on enabled. */
  cefrLockedElsewhere: boolean
}) {
  const meta = TASK_META[task.type]
  const Icon = meta.icon
  const bodyId = `task-${task.id}-body`
  const isCallTask = CALL_TASK_TYPES.has(task.type)
  // Custom tasks show their user-given name (falling back to the label).
  const headerLabel =
    task.type === "custom" && task.title.trim()
      ? task.title.trim()
      : meta.label

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={bodyId}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <Icon className="size-5 shrink-0 text-muted-foreground" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {headerLabel}
            </span>
            <span className="block text-xs text-muted-foreground">
              Task {index}
            </span>
          </span>
        </button>
        <ScreeningSummary task={task} />
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
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse task" : "Expand task"}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-150",
              !isOpen && "-rotate-90",
            )}
          />
        </button>
      </div>

      {isOpen ? (
        <div
          id={bodyId}
          role="region"
          className="border-t border-border p-4"
        >
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
              <Field label="Task name">
                <Input
                  value={task.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="e.g. Take-home assignment"
                />
              </Field>
              <Field
                label="Task details"
                hint="Describe what happens in this custom step."
              >
                <Textarea
                  value={task.notes}
                  onChange={(e) => onUpdate({ notes: e.target.value })}
                  placeholder="e.g. Take-home assignment shared over email, 48-hour turnaround."
                  rows={4}
                />
              </Field>
            </div>
          )}
        </div>
      ) : null}
    </section>
  )
}

/** Compact one-line summary shown in the header for tasks that have a
 *  mode (screening / interview / scheduling). */
function ScreeningSummary({ task }: { task: InterviewTask }) {
  if (task.type === "custom") return null
  const { mode, direction, format } = task.screening
  if (!mode) return null
  const parts: string[] = [mode === "ai" ? "AI" : "Human"]
  // Direction / format only apply to call tasks (screening / interview).
  if (CALL_TASK_TYPES.has(task.type) && mode === "ai") {
    if (direction) parts.push(direction)
    if (format) parts.push(format)
  }
  return (
    <span className="hidden shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline">
      {parts.join(" · ")}
    </span>
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
    <div className="flex flex-col gap-5">
      <Field label="Scheduling type">
        <ChipTabs
          variant="choice"
          items={modeChips("scheduling")}
          value={config.mode}
          onValueChange={(v) => set({ mode: v })}
          aria-label="Scheduling type"
        />
      </Field>

      {config.mode === "ai" ? (
        <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          AI scheduling is coming soon.
        </p>
      ) : config.mode === "human" ? (
        <Field
          label="Task details"
          hint="Instructions for the team coordinating interview slots."
        >
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Offer 3 slots across the week, confirm over WhatsApp, and share the meeting link a day before."
            rows={4}
          />
        </Field>
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
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

  const Noun = noun.charAt(0).toUpperCase() + noun.slice(1)
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
    <div className="flex flex-col gap-5">
      <Field label={`${Noun} type`}>
        <ChipTabs
          variant="choice"
          items={modeChips(noun)}
          value={config.mode}
          onValueChange={(v) =>
            // Human mode has no CEFR add-on — clear it when switching.
            set(v === "human" ? { mode: v, cefrEnabled: false } : { mode: v })
          }
          aria-label={`${Noun} type`}
        />
      </Field>

      {config.mode === "human" ? (
        <Field
          label="Key questions or notes"
          hint={`What should your team cover at this ${noun} stage?`}
        >
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Confirm notice period and expected CTC, check willingness to travel, and gauge spoken English."
            rows={4}
          />
        </Field>
      ) : isAI ? (
        <>
          <Field
            label={`${Noun} direction`}
            hint="Inbound: the candidate calls in. Outbound: we call the candidate."
          >
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
            />
          </Field>

          <Field
            label={`${Noun} format`}
            hint={
              config.direction === "outbound"
                ? "Outbound runs as a regular call — audio only."
                : config.direction === "both"
                  ? "“Both” includes outbound calls — video isn’t available."
                  : undefined
            }
          >
            <ChipTabs
              variant="choice"
              items={formatChips}
              value={config.format}
              onValueChange={(v) => set({ format: v })}
              aria-label={`${Noun} format`}
            />
          </Field>

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
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })
  const toggleId = React.useId()

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">Add-ons</Label>
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
          <div className="flex flex-col gap-4 border-t border-border p-3">
            <Field
              label="Minimum CEFR level"
              hint="The lowest level a candidate must reach to pass."
            >
              <ChipTabs
                variant="choice"
                size="sm"
                items={CEFR_CHIPS}
                value={config.cefrMinLevel}
                onValueChange={(v) => set({ cefrMinLevel: v })}
                aria-label="Minimum CEFR level"
              />
            </Field>
            <Field
              label="Preferred CEFR level"
              hint="The level you’d ideally like to see."
            >
              <ChipTabs
                variant="choice"
                size="sm"
                items={CEFR_CHIPS}
                value={config.cefrPreferredLevel}
                onValueChange={(v) => set({ cefrPreferredLevel: v })}
                aria-label="Preferred CEFR level"
              />
            </Field>
            <Field
              label="Specific questions"
              hint="Optional — anything particular you want the assessment to probe."
            >
              <Textarea
                value={config.cefrQuestions}
                onChange={(e) => set({ cefrQuestions: e.target.value })}
                placeholder="e.g. Ask the candidate to describe a past customer escalation in English."
                rows={3}
              />
            </Field>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// ---- local field helper -------------------------------------------------

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

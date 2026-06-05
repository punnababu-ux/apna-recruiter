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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ---- types --------------------------------------------------------------

export type TaskType = "screening" | "interview" | "scheduling" | "custom"
export type ScreeningMode = "ai" | "human"
export type ScreeningDirection = "inbound" | "outbound" | "both"
export type ScreeningFormat = "audio" | "video"

export type ScreeningConfig = {
  mode: ScreeningMode | ""
  direction: ScreeningDirection | ""
  format: ScreeningFormat | ""
  /** CEFR language proficiency assessment add-on (+3–4 min). */
  cefrEnabled: boolean
  /** Key questions / notes for a human-led screening. */
  humanNotes: string
}

export type InterviewTask = {
  id: string
  type: TaskType
  /** Free-text notes for the Custom task type. */
  notes: string
  screening: ScreeningConfig
}

export type InterviewRoundsForm = {
  tasks: InterviewTask[]
}

export const defaultInterviewRounds: InterviewRoundsForm = { tasks: [] }

const makeScreening = (): ScreeningConfig => ({
  mode: "",
  direction: "",
  format: "",
  cefrEnabled: false,
  humanNotes: "",
})

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

const MODE_CHIPS: ChipTabItem<ScreeningMode>[] = [
  {
    value: "ai",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <Bot className="size-3.5" />
        AI screening
      </span>
    ),
  },
  {
    value: "human",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="size-3.5" />
        Human screening
      </span>
    ),
  },
]

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
}: {
  form: InterviewRoundsForm
  update: (next: InterviewRoundsForm) => void
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
      notes: "",
      screening: makeScreening(),
    }
    update({ tasks: [...form.tasks, task] })
    setOpenTaskId(task.id)
    setShowPicker(false)
  }

  const updateTask = (id: string, patch: Partial<InterviewTask>) => {
    update({
      tasks: form.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })
  }

  const removeTask = (id: string) => {
    const remaining = form.tasks.filter((t) => t.id !== id)
    update({ tasks: remaining })
    if (openTaskId === id) {
      setOpenTaskId(remaining[remaining.length - 1]?.id ?? null)
    }
  }

  const toggleTask = (id: string) => {
    setOpenTaskId((curr) => (curr === id ? null : id))
  }

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
        />
      ) : null}

      {/* Add-task picker / CTA */}
      {showPicker ? (
        <TaskTypePicker
          index={form.tasks.length + 1}
          title="Add a task"
          onPick={addTask}
          onCancel={() => setShowPicker(false)}
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
    </div>
  )
}

// ---- task-type picker ---------------------------------------------------

function TaskTypePicker({
  index,
  title,
  onPick,
  onCancel,
}: {
  /** The task number this picker will create (1-based). */
  index: number
  title: string
  onPick: (type: TaskType) => void
  onCancel?: () => void
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
          return (
            <button
              key={t.type}
              type="button"
              onClick={() => onPick(t.type)}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-left shadow-card transition-colors hover:border-primary hover:bg-accent/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{t.label}</span>
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
}: {
  index: number
  task: InterviewTask
  isOpen: boolean
  onToggle: () => void
  onUpdate: (patch: Partial<InterviewTask>) => void
  onRemove: () => void
}) {
  const meta = TASK_META[task.type]
  const Icon = meta.icon
  const bodyId = `task-${task.id}-body`

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
              {meta.label}
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
          {task.type === "screening" ? (
            <ScreeningEditor
              config={task.screening}
              onChange={(screening) => onUpdate({ screening })}
            />
          ) : task.type === "custom" ? (
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
          ) : (
            <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
              {meta.label} configuration is coming soon.
            </p>
          )}
        </div>
      ) : null}
    </section>
  )
}

/** Compact one-line summary of a screening task, shown in the header. */
function ScreeningSummary({ task }: { task: InterviewTask }) {
  if (task.type !== "screening") return null
  const { mode, direction, format } = task.screening
  if (!mode) return null
  const parts: string[] = [mode === "ai" ? "AI" : "Human"]
  if (mode === "ai") {
    if (direction) parts.push(direction)
    if (format) parts.push(format)
  }
  return (
    <span className="hidden shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline">
      {parts.join(" · ")}
    </span>
  )
}

// ---- screening editor ---------------------------------------------------

function ScreeningEditor({
  config,
  onChange,
}: {
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
}) {
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

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
      <Field label="Screening type">
        <ChipTabs
          variant="choice"
          items={MODE_CHIPS}
          value={config.mode}
          onValueChange={(v) => set({ mode: v })}
          aria-label="Screening type"
        />
      </Field>

      {config.mode === "human" ? (
        <Field
          label="Key questions or notes"
          hint="What should your team cover at this screening stage?"
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
            label="Screening direction"
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
              aria-label="Screening direction"
            />
          </Field>

          <Field
            label="Screening format"
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
              aria-label="Screening format"
            />
          </Field>

          {/* Add-ons */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Add-ons</Label>
            <label
              htmlFor="cefr-toggle"
              className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border border-border p-3"
            >
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
                  <Languages className="size-4 text-primary" />
                  CEFR language proficiency assessment
                  <Badge variant="info">New</Badge>
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Scores the candidate&apos;s spoken language level (A1–C2).
                  Adds 3–4 minutes to the screening.
                </span>
              </span>
              <Switch
                id="cefr-toggle"
                checked={config.cefrEnabled}
                onCheckedChange={(checked) =>
                  set({ cefrEnabled: checked === true })
                }
              />
            </label>
          </div>
        </>
      ) : null}
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

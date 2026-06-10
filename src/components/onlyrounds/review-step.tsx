"use client"

/**
 * ReviewStep — step 4 of the Create Job wizard.
 *
 * Shows a read-only summary of everything configured so far:
 *   1. Job description (title + JD)
 *   2. Job details (client, location, experience, schedule, compensation)
 *   3. Interview rounds — each task with its config + criteria.
 *      AI rounds also surface a "Test AI" CTA that opens the testing page.
 */

import {
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  CircleCheck,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  IndianRupee,
  Languages,
  Laptop,
  ListTodo,
  MapPin,
  MessageCircleQuestion,
  Mic,
  Phone,
  StickyNote,
  User,
  UserCheck,
  UserPlus,
  Video,
} from "lucide-react"
import * as React from "react"

import {
  AGENTS,
  CALL_TASK_TYPES,
  CLIENTS,
  CRITERIA_CATEGORIES,
  LANGUAGES,
  WORK_MODE_LABELS,
  WORK_TYPE_LABELS,
} from "@/lib/onlyrounds/constants"
import { isAiRound } from "@/lib/onlyrounds/utils"
import type {
  InterviewRoundsForm,
  InterviewTask,
  JobDetailsForm,
} from "@/types/onlyrounds"
import { ROUTES } from "@/components/onlyrounds/create-job-wizard"
import { DisplayField } from "@/components/onlyrounds/shared"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ── helpers ───────────────────────────────────────────────────────────────

function clientName(id: string) {
  return CLIENTS.find((c) => c.id === id)?.name ?? id
}

function taskLabel(task: InterviewTask): string {
  if (task.type === "custom") return task.title.trim() || "Custom task"
  if (task.type === "screening") return "Screening"
  if (task.type === "interview") return "Interview"
  if (task.type === "scheduling") return "Scheduling"
  return "Task"
}

// ── sub-components ────────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-semibold text-foreground inline-flex items-center leading-none gap-2">
        {Icon && <Icon className="size-4 text-muted-foreground shrink-0" />}
        {title}
      </h3>
      {children}
    </div>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-6">{children}</div>
}

function Divider() {
  return <div className="h-px bg-border" />
}

function CollapsibleJd({ jd }: { jd: string }) {
  const [expanded, setExpanded] = React.useState(false)
  const lines = jd.split("\n")
  const needsCollapse = lines.length > 6 || jd.length > 350

  if (!needsCollapse) {
    return <p className="whitespace-pre-wrap text-sm text-foreground">{jd}</p>
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className={cn("whitespace-pre-wrap text-sm text-foreground", !expanded && "line-clamp-6")}>
        {jd}
      </p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="self-start text-xs font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  )
}

// ── Criteria summary ──────────────────────────────────────────────────────

function CriteriaSummary({ task }: { task: InterviewTask }) {
  const criteria = task.criteria ?? []
  if (criteria.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide inline-flex items-center leading-none gap-1.5">
        <CircleCheck className="size-3 text-muted-foreground shrink-0" />
        Evaluation criteria
      </span>
      <div className="flex flex-col gap-3">
        {CRITERIA_CATEGORIES
          .map((meta) => ({ meta, items: criteria.filter((c) => c.category === meta.key) }))
          .filter(({ items }) => items.length > 0)
          .map(({ meta, items }) => {
            const Icon = meta.icon
            return (
              <div key={meta.key} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon className={cn("size-3.5 shrink-0", meta.tone)} />
                  <span className="text-xs font-medium">{meta.label}</span>
                </div>
                <ul className="flex flex-col gap-1">
                  {items.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-1 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  )
}

// ── Task card ─────────────────────────────────────────────────────────────

function TaskReviewCard({
  index,
  task,
  testBaseUrl,
}: {
  index: number
  task: InterviewTask
  /** Base URL for the AI test page, e.g. "/onlyrounds/test". Task id appended as query param. */
  testBaseUrl?: string
}) {
  const aiRound = isAiRound(task)
  const isCallTask = CALL_TASK_TYPES.has(task.type)
  const agent = aiRound ? AGENTS[task.agentId] : null
  const lang = aiRound ? LANGUAGES[task.language] : null
  const { mode, direction, format, cefrEnabled, cefrMinLevel, cefrPreferredLevel, humanNotes } =
    task.screening

  const testHref =
    testBaseUrl && aiRound
      ? `${testBaseUrl}?taskId=${task.id}`
      : undefined

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Task {index}</span>
          </div>
          <span className="text-sm font-semibold">{taskLabel(task)}</span>
        </div>

        {aiRound && testHref && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => window.open(testHref, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink className="size-3.5" />
            Test AI
          </Button>
        )}
      </div>

      {/* Call task config */}
      {isCallTask && mode && (
        <>
          <Divider />
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {/* Mode */}
              <Badge variant="secondary" className="gap-1 font-normal">
                {mode === "ai" ? (
                  <Bot className="size-3" />
                ) : (
                  <User className="size-3" />
                )}
                {mode === "ai" ? "AI" : "Human"} {task.type === "interview" ? "interview" : "screening"}
              </Badge>

              {/* Direction */}
              {mode === "ai" && direction && (
                <Badge variant="secondary" className="gap-1 font-normal">
                  <Phone className="size-3" />
                  {direction.charAt(0).toUpperCase() + direction.slice(1)}
                </Badge>
              )}

              {/* Format */}
              {mode === "ai" && format && (
                <Badge variant="secondary" className="gap-1 font-normal">
                  {format === "video" ? (
                    <Video className="size-3" />
                  ) : (
                    <Mic className="size-3" />
                  )}
                  {format === "video" ? "Video call" : "Audio call"}
                </Badge>
              )}

              {/* Language */}
              {aiRound && lang && (
                <Badge variant="secondary" className="gap-1 font-normal">
                  <Languages className="size-3" />
                  {lang.label}
                </Badge>
              )}
            </div>

            {/* Agent */}
            {agent && (
              <div className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                  <Bot className="size-4" />
                </span>
                <div className="text-xs">
                  <span className="font-medium">{agent.name}</span>
                  <span className="text-muted-foreground"> · {agent.role}</span>
                </div>
              </div>
            )}

            {/* CEFR */}
            {cefrEnabled && (cefrMinLevel || cefrPreferredLevel) && (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground inline-flex items-center leading-none gap-1.5">
                  <Languages className="size-3 text-muted-foreground shrink-0" />
                  CEFR language assessment
                </span>
                <div className="flex flex-wrap gap-2">
                  {cefrMinLevel && (
                    <span className="text-xs">
                      Min: <strong>{cefrMinLevel}</strong>
                    </span>
                  )}
                  {cefrPreferredLevel && (
                    <span className="text-xs text-muted-foreground">
                      · Preferred: <strong>{cefrPreferredLevel}</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Human notes */}
            {mode === "human" && humanNotes && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground inline-flex items-center leading-none gap-1.5">
                  <MessageCircleQuestion className="size-3 text-muted-foreground shrink-0" />
                  Key questions or notes
                </span>
                <p className="text-xs text-muted-foreground">{humanNotes}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Scheduling human notes */}
      {task.type === "scheduling" && humanNotes && (
        <>
          <Divider />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground inline-flex items-center leading-none gap-1.5">
              <ListTodo className="size-3 text-muted-foreground shrink-0" />
              Task details
            </span>
            <p className="text-xs text-muted-foreground">{humanNotes}</p>
          </div>
        </>
      )}

      {/* Custom task notes — stored in task.notes, not screening.humanNotes */}
      {task.type === "custom" && task.notes?.trim() && (
        <>
          <Divider />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground inline-flex items-center leading-none gap-1.5">
              <ListTodo className="size-3 text-muted-foreground shrink-0" />
              Task details
            </span>
            <p className="text-sm text-foreground whitespace-pre-wrap">{task.notes}</p>
          </div>
        </>
      )}

      {/* Criteria */}
      {(task.criteria ?? []).length > 0 && (
        <>
          <Divider />
          <CriteriaSummary task={task} />
        </>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export function ReviewStep({
  title,
  jd,
  details,
  rounds,
  testBaseUrl,
}: {
  title: string
  jd: string
  details: JobDetailsForm
  rounds: InterviewRoundsForm
  /** Base URL for the AI test page. Defaults to "/onlyrounds/test". */
  testBaseUrl?: string
}) {
  const base = testBaseUrl ?? ROUTES.aiTest

  const expLabel =
    details.experienceType === "experienced"
      ? "Experienced only"
      : details.experienceType === "freshers"
        ? "Freshers only"
        : "Any"

  return (
    <div className="flex flex-col gap-8">
      {/* ── Job description ─────────────────────────────────────── */}
      <Section title="Job description" icon={FileText}>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-col gap-5">
            <DisplayField label="Job title" value={title} icon={Briefcase} />
            {jd && (
              <DisplayField
                label="Job description"
                icon={FileText}
                value={<CollapsibleJd jd={jd} />}
              />
            )}
          </div>
        </div>
      </Section>

      {/* ── Job details ─────────────────────────────────────────── */}
      <Section title="Job details" icon={Briefcase}>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-col gap-8">
            <FieldGrid>
              <DisplayField label="Client" value={details.clientId ? clientName(details.clientId) : undefined} icon={Building2} />
              <DisplayField label="Location" value={[details.city, details.area].filter(Boolean).join(", ") || undefined} icon={MapPin} />
              <DisplayField label="Required experience" value={expLabel} icon={GraduationCap} />
              <DisplayField
                label="Work type"
                value={details.workType ? WORK_TYPE_LABELS[details.workType] : undefined}
                icon={CalendarDays}
              />
              <DisplayField
                label="Work mode"
                value={details.workMode ? WORK_MODE_LABELS[details.workMode] : undefined}
                icon={Laptop}
              />
              <DisplayField label="Compensation (experienced)" value={details.compExperienced || undefined} icon={IndianRupee} />
              <DisplayField label="Compensation (freshers)" value={details.compFresher || undefined} icon={IndianRupee} />
            </FieldGrid>

            {details.scheduleDetails && (
              <>
                <Divider />
                <DisplayField label="Work schedule" value={details.scheduleDetails} icon={Clock} />
              </>
            )}

            {details.experiencedPersona && (
              <>
                <Divider />
                <DisplayField label="Experienced candidate profile" value={details.experiencedPersona} icon={UserCheck} />
              </>
            )}

            {details.fresherPersona && (
              <>
                <Divider />
                <DisplayField label="Fresher candidate profile" value={details.fresherPersona} icon={UserPlus} />
              </>
            )}

            {details.additionalDetails && (
              <>
                <Divider />
                <DisplayField label="Additional details" value={details.additionalDetails} icon={StickyNote} />
              </>
            )}
          </div>
        </div>
      </Section>

      {/* ── Interview rounds ─────────────────────────────────────── */}
      {rounds.tasks.length > 0 && (
        <Section title="Interview rounds" icon={ListTodo}>
          <div className="flex flex-col gap-5">
            {rounds.tasks.map((task, i) => (
              <TaskReviewCard
                key={task.id}
                index={i + 1}
                task={task}
                testBaseUrl={base}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

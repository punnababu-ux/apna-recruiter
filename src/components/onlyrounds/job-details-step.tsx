"use client"

/**
 * JobDetailsStep — step 2 of the Create Job wizard.
 *
 * Sections:
 *   1. Basic job details    (client, city, area, experience type + persona)
 *   2. Work schedule        (work type, work mode, shift notes)
 *   3. Compensation         (fresher and/or experienced pay)
 *   4. Question sections    (merged AI question bank + candidate FAQs —
 *                            each section has target audience, per-candidate
 *                            count, randomize toggle, and a Q&A list)
 *   5. Additional details   (free-form)
 *
 * The step is fully controlled — the wizard owns the form state and this
 * component is purely presentational + a few tiny reducers for the
 * question/FAQ list editors.
 */

import { Briefcase, Building2, CalendarDays, Check, ChevronDown, Clock, Compass, Download, FileText, GraduationCap, IndianRupee, Laptop, MapPin, MessageCircleQuestion, MoreVertical, Pencil, Plus, Sparkles, StickyNote, Trash2, Upload, UserCheck, UserPlus, type IconComponent } from "@apna/design-system"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  CLIENTS,
  REQUIRED_SECTION_IDS,
  WORK_MODE_LABELS,
  WORK_TYPE_LABELS,
} from "@/lib/onlyrounds/constants"
import type {
  ExperienceRequirement,
  JobDetailsForm,
  QAItem,
  QuestionSection,
  QuestionSectionPreset,
  SectionId,
  SectionStatus,
  WorkMode,
  WorkType,
} from "@/types/onlyrounds"

export type { JobDetailsForm, SectionId, SectionStatus }

// ── Section model ──────────────────────────────────────────────────────────

// Per-section icon shown in the accordion header chip (replaces the
// numeric index).
const SECTION_ICONS: Record<SectionId, IconComponent> = {
  basics: Briefcase,
  schedule: Clock,
  compensation: IndianRupee,
  questions: MessageCircleQuestion,
  additional: FileText,
}

/**
 * Returns human-readable labels for every empty required field in the given
 * section. Optional sections (questions, additional) always return `[]`.
 */
export function validateSection(
  form: JobDetailsForm,
  id: SectionId,
): string[] {
  const errors: string[] = []
  switch (id) {
    case "basics":
      if (!form.clientId) errors.push("Client")
      if (!form.city.trim()) errors.push("Job city")
      if (!form.area.trim()) errors.push("Job area")
      if (
        (form.experienceType === "any" ||
          form.experienceType === "experienced") &&
        !form.experiencedPersona.trim()
      )
        errors.push("Experienced candidate profile")
      if (
        (form.experienceType === "any" || form.experienceType === "freshers") &&
        !form.fresherPersona.trim()
      )
        errors.push("Fresher candidate profile")
      return errors
    case "schedule":
      if (!form.workType) errors.push("Work type")
      if (!form.workMode) errors.push("Work mode")
      if (!form.scheduleDetails.trim()) errors.push("Work schedule details")
      return errors
    case "compensation":
      if (
        (form.experienceType === "any" ||
          form.experienceType === "experienced") &&
        !form.compExperienced.trim()
      )
        errors.push("Compensation for experienced")
      if (
        (form.experienceType === "any" || form.experienceType === "freshers") &&
        !form.compFresher.trim()
      )
        errors.push("Compensation for freshers")
      return errors
    case "questions":
    case "additional":
      return []
  }
}

/** True if the user has filled at least one field in this section. */
function sectionHasContent(form: JobDetailsForm, id: SectionId): boolean {
  switch (id) {
    case "basics":
      return Boolean(
        form.clientId ||
          form.city.trim() ||
          form.area.trim() ||
          form.experiencedPersona.trim() ||
          form.fresherPersona.trim(),
      )
    case "schedule":
      return Boolean(
        form.workType || form.workMode || form.scheduleDetails.trim(),
      )
    case "compensation":
      return Boolean(form.compExperienced.trim() || form.compFresher.trim())
    case "questions":
      return form.questionSections.length > 0
    case "additional":
      return form.additionalDetails.trim().length > 0
  }
}

/**
 * Derives the accordion-status pip for a section purely from form state and
 * the current `showErrors` flag — no stored state.
 */
export function getSectionStatus(
  form: JobDetailsForm,
  id: SectionId,
  showErrors: boolean,
): SectionStatus {
  if (
    id === "questions" ||
    id === "additional"
  ) {
    return sectionHasContent(form, id) ? "complete" : "untouched"
  }
  const errors = validateSection(form, id)
  if (errors.length === 0) return "complete"
  if (showErrors) return "invalid"
  return sectionHasContent(form, id) ? "in-progress" : "untouched"
}

/**
 * Returns human-readable labels for every mandatory field that is empty
 * across all required sections — backwards-compatible aggregator used by
 * the wizard's overall validity check.
 */
export function validateJobDetails(form: JobDetailsForm): string[] {
  return REQUIRED_SECTION_IDS.flatMap((id) => validateSection(form, id))
}

const MAX_QA = 15

/** Create a useRef-based monotonic ID generator scoped to a component instance. */
function useIdGen(prefix: string) {
  const counter = React.useRef(0)
  return React.useCallback(() => {
    counter.current += 1
    return `${prefix}-${counter.current}`
  }, [prefix])
}

type Draft = { key: string; question: string; answer: string }

// Single-select chip options for the segmented controls. Work type/mode
// include "" in the value union so an unselected (required) state renders
// with no chip highlighted.
const EXPERIENCE_CHIPS: ChipTabItem<ExperienceRequirement>[] = [
  { value: "any", label: "Any" },
  { value: "experienced", label: "Experienced only" },
  { value: "freshers", label: "Freshers only" },
]
const WORK_TYPE_CHIPS: ChipTabItem<WorkType | "">[] = [
  { value: "part-time", label: WORK_TYPE_LABELS["part-time"] },
  { value: "full-time", label: WORK_TYPE_LABELS["full-time"] },
  { value: "both", label: WORK_TYPE_LABELS["both"] },
]
const WORK_MODE_CHIPS: ChipTabItem<WorkMode | "">[] = [
  { value: "wfh", label: WORK_MODE_LABELS["wfh"] },
  { value: "wfo", label: WORK_MODE_LABELS["wfo"] },
  { value: "field", label: WORK_MODE_LABELS["field"] },
  { value: "store", label: WORK_MODE_LABELS["store"] },
]

// ---- component ----------------------------------------------------------

export function JobDetailsStep({
  form,
  update,
  showErrors = false,
  openSectionId,
  onSectionChange,
  jobTitle = "",
  jobJd = "",
}: {
  form: JobDetailsForm
  update: <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => void
  showErrors?: boolean
  /** Which section's body is open — single-open accordion. Lifted to the
   *  wizard so its footer can drive section navigation. */
  openSectionId: SectionId | null
  onSectionChange: (id: SectionId | null) => void
  jobTitle?: string
  jobJd?: string
}) {
  const showExperiencedPersona =
    form.experienceType === "any" || form.experienceType === "experienced"
  const showFresherPersona =
    form.experienceType === "any" || form.experienceType === "freshers"

  // Toggle handler shared by every section header — opens this one and
  // closes whichever was open. Clicking the open section again collapses
  // it fully.
  const toggle = (id: SectionId) =>
    onSectionChange(openSectionId === id ? null : id)

  return (
    <div className="flex flex-col gap-4">
      {/* Section 1 — basic job details */}
      <Section
        id="basics"
        title="Basic job details"
        description="Tell us who the role is for and where it's based."
        status={getSectionStatus(form, "basics", showErrors)}
        isOpen={openSectionId === "basics"}
        onToggle={() => toggle("basics")}
      >
        {/* Client — own line */}
        <UIField>
          <FieldLabel htmlFor="client" icon={Building2}>Client</FieldLabel>
          <Select
            value={form.clientId}
            onValueChange={(v) => update("clientId", (v as string) ?? "")}
          >
            <SelectTrigger
              id="client"
              className="w-full"
              aria-invalid={showErrors && !form.clientId ? true : undefined}
            >
              <SelectValue placeholder="Select the client" />
            </SelectTrigger>
            <SelectContent>
              {CLIENTS.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{showErrors && !form.clientId ? "Required" : undefined}</FieldError>
        </UIField>

        {/* Job city + Job area — side by side */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UIField>
            <FieldLabel htmlFor="city" icon={MapPin}>Job city</FieldLabel>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Bengaluru"
              aria-invalid={
                showErrors && !form.city.trim() ? true : undefined
              }
            />
            <FieldError>{showErrors && !form.city.trim() ? "Required" : undefined}</FieldError>
          </UIField>
          <UIField>
            <FieldLabel htmlFor="area" icon={Compass}>Job area</FieldLabel>
            <Input
              id="area"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Koramangala"
              aria-invalid={
                showErrors && !form.area.trim() ? true : undefined
              }
            />
            <FieldError>{showErrors && !form.area.trim() ? "Required" : undefined}</FieldError>
          </UIField>
        </div>

        {/* Required experience — full-width chip group below the grid so
            the chips have room to sit on one line. */}
        <UIField>
          <FieldLabel icon={GraduationCap}>Required experience</FieldLabel>
          <ChipTabs
            variant="choice"
            items={EXPERIENCE_CHIPS}
            value={form.experienceType}
            onValueChange={(v) => update("experienceType", v)}
            aria-label="Required experience"
          />
        </UIField>

        {showExperiencedPersona ? (
          <UIField>
            <FieldLabel htmlFor="experienced-persona" icon={UserCheck}>Who is an experienced candidate for this role?</FieldLabel>
            <Textarea
              id="experienced-persona"
              value={form.experiencedPersona}
              onChange={(e) => update("experiencedPersona", e.target.value)}
              placeholder="e.g. 2+ years in B2C product support, comfortable on calls, CRM-literate."
              rows={3}
              aria-invalid={
                showErrors && !form.experiencedPersona.trim()
                  ? true
                  : undefined
              }
            />
            {showErrors && !form.experiencedPersona.trim() ? (
              <FieldError>Required</FieldError>
            ) : (
              <FieldDescription>Describe the kind of experienced candidate you&apos;re hoping to meet.</FieldDescription>
            )}
          </UIField>
        ) : null}
        {showFresherPersona ? (
          <UIField>
            <FieldLabel htmlFor="fresher-persona" icon={UserPlus}>Who is a fresher candidate for this role?</FieldLabel>
            <Textarea
              id="fresher-persona"
              value={form.fresherPersona}
              onChange={(e) => update("fresherPersona", e.target.value)}
              placeholder="e.g. Graduates with strong spoken English, quick learners, open to shift work."
              rows={3}
              aria-invalid={
                showErrors && !form.fresherPersona.trim() ? true : undefined
              }
            />
            {showErrors && !form.fresherPersona.trim() ? (
              <FieldError>Required</FieldError>
            ) : (
              <FieldDescription>Describe the fresher profile that fits this role.</FieldDescription>
            )}
          </UIField>
        ) : null}
      </Section>

      {/* Section 2 — work schedule */}
      <Section
        id="schedule"
        title="Work schedule"
        description="What kind of work is this, and when will it happen?"
        status={getSectionStatus(form, "schedule", showErrors)}
        isOpen={openSectionId === "schedule"}
        onToggle={() => toggle("schedule")}
      >
        <UIField>
          <FieldLabel icon={CalendarDays}>Work type</FieldLabel>
          <ChipTabs
            variant="choice"
            items={WORK_TYPE_CHIPS}
            value={form.workType}
            onValueChange={(v) => update("workType", v)}
            aria-label="Work type"
            aria-invalid={showErrors && !form.workType ? true : undefined}
          />
          <FieldError>{showErrors && !form.workType ? "Required" : undefined}</FieldError>
        </UIField>
        <UIField>
          <FieldLabel icon={Laptop}>Work mode</FieldLabel>
          <ChipTabs
            variant="choice"
            items={WORK_MODE_CHIPS}
            value={form.workMode}
            onValueChange={(v) => update("workMode", v)}
            aria-label="Work mode"
            aria-invalid={showErrors && !form.workMode ? true : undefined}
          />
          <FieldError>{showErrors && !form.workMode ? "Required" : undefined}</FieldError>
        </UIField>
        <UIField>
          <FieldLabel htmlFor="schedule-details" icon={Clock}>Work schedule and shift details</FieldLabel>
          <Textarea
            id="schedule-details"
            value={form.scheduleDetails}
            onChange={(e) => update("scheduleDetails", e.target.value)}
            placeholder="Describe the expected schedule and shifts."
            rows={3}
            aria-invalid={
              showErrors && !form.scheduleDetails.trim() ? true : undefined
            }
          />
          {showErrors && !form.scheduleDetails.trim() ? (
            <FieldError>Required</FieldError>
          ) : (
            <FieldDescription>E.g. Mon–Sat, 9am–6pm; two rotational shifts; one weekly off.</FieldDescription>
          )}
        </UIField>
      </Section>

      {/* Section 3 — compensation */}
      <Section
        id="compensation"
        title="Compensation details"
        description="Share what each candidate profile can expect to earn."
        status={getSectionStatus(form, "compensation", showErrors)}
        isOpen={openSectionId === "compensation"}
        onToggle={() => toggle("compensation")}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {showExperiencedPersona ? (
            <UIField>
              <FieldLabel htmlFor="comp-experienced" icon={IndianRupee}>Compensation — experienced candidates</FieldLabel>
              <Input
                id="comp-experienced"
                value={form.compExperienced}
                onChange={(e) => update("compExperienced", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compExperienced.trim() ? true : undefined
                }
              />
              {showErrors && !form.compExperienced.trim() ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>E.g. ₹4–6 LPA fixed + incentives.</FieldDescription>
              )}
            </UIField>
          ) : null}
          {showFresherPersona ? (
            <UIField>
              <FieldLabel htmlFor="comp-fresher" icon={IndianRupee}>Compensation — fresher candidates</FieldLabel>
              <Input
                id="comp-fresher"
                value={form.compFresher}
                onChange={(e) => update("compFresher", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compFresher.trim() ? true : undefined
                }
              />
              {showErrors && !form.compFresher.trim() ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>E.g. ₹2–3 LPA fixed + incentives.</FieldDescription>
              )}
            </UIField>
          ) : null}
        </div>
      </Section>

      {/* Section 4 — question sections (merged AI question bank + candidate FAQs) */}
      <Section
        id="questions"
        title="Question sections"
        description="Optional — add screening questions and candidate FAQs."
        status={getSectionStatus(form, "questions", showErrors)}
        isOpen={openSectionId === "questions"}
        onToggle={() => toggle("questions")}
      >
        <QuestionSectionsEditor
          sections={form.questionSections}
          onChange={(next) => update("questionSections", next)}
          experienceType={form.experienceType}
          suggestedPresets={form.suggestedPresets}
          jobTitle={jobTitle}
          jobJd={jobJd}
        />
      </Section>

      {/* Section 5 — additional details */}
      <Section
        id="additional"
        title="Additional details"
        description="Optional — interview process, perks, anything else worth highlighting."
        status={getSectionStatus(form, "additional", showErrors)}
        isOpen={openSectionId === "additional"}
        onToggle={() => toggle("additional")}
      >
        <UIField>
          <FieldLabel htmlFor="additional-details" icon={StickyNote}>Notes</FieldLabel>
          <Textarea
            id="additional-details"
            value={form.additionalDetails}
            onChange={(e) => update("additionalDetails", e.target.value)}
            placeholder="Share anything else candidates should know."
            rows={5}
          />
        </UIField>
      </Section>
    </div>
  )
}

// ---- section primitives -------------------------------------------------

function StatusPip({ status }: { status: SectionStatus }) {
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-xs font-medium text-success">
        <Check className="size-3" />
        Complete
      </span>
    )
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-medium text-warning-foreground">
        In progress
      </span>
    )
  }
  if (status === "invalid") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
        Missing fields
      </span>
    )
  }
  // "untouched" → no pip. An empty section needs no badge; optionality is
  // already conveyed by the section's "Optional — …" description.
  return null
}

function Section({
  id,
  title,
  description,
  status,
  isOpen,
  onToggle,
  children,
}: {
  id: SectionId
  title: string
  description?: string
  status: SectionStatus
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const bodyId = `section-${id}-body`
  const Icon = SECTION_ICONS[id]
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/30"
      >
        {status === "complete" ? (
          <Check className="size-6 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <Icon
            className={cn(
              "size-6 shrink-0",
              status === "invalid"
                ? "text-destructive"
                : "text-muted-foreground",
            )}
            aria-hidden="true"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <StatusPip status={status} />
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-150",
            !isOpen && "-rotate-90",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen ? (
        <div
          id={bodyId}
          role="region"
          className="flex flex-col gap-4 border-t border-border bg-card p-5"
        >
          {children}
        </div>
      ) : null}
    </section>
  )
}

// ---- question sections editor ------------------------------------------

// Each preset hints its preferred target. When the job is single-audience
// the hint is ignored and the audience is forced to match the job-level
// setting.
const QUESTION_SECTION_PRESETS: QuestionSectionPreset[] = [
  { title: "English Speaking", target: "freshers" },
  { title: "Field Sales Capability", target: "experienced" },
  { title: "Technical Skills", target: "experienced" },
  { title: "Freshers", target: "freshers" },
  { title: "Experienced", target: "experienced" },
]

function QuestionSectionsEditor({
  sections,
  onChange,
  experienceType,
  suggestedPresets,
  jobTitle = "",
  jobJd = "",
}: {
  sections: QuestionSection[]
  onChange: (next: QuestionSection[]) => void
  experienceType: ExperienceRequirement
  suggestedPresets?: QuestionSectionPreset[]
  jobTitle?: string
  jobJd?: string
}) {
  const [showAddSection, setShowAddSection] = React.useState(false)
  const [addingSectionName, setAddingSectionName] = React.useState("")
  const nextSectionId = useIdGen("qs")
  // Accordion: at most one section open at a time. Lifted here so we can
  // open a freshly-added section and close the others in one go.
  const [expandedSectionId, setExpandedSectionId] = React.useState<
    string | null
  >(sections[0]?.id ?? null)

  // Default audience for a new section: forced to match the job-level
  // setting when it's single-audience, else use the preset's hint, else
  // default to "both" (sections like English Speaking are typically
  // relevant to both audiences when the job supports both).
  const resolveTarget = (
    presetTarget?: QuestionSection["target"],
  ): QuestionSection["target"] => {
    if (experienceType === "experienced") return "experienced"
    if (experienceType === "freshers") return "freshers"
    return presetTarget ?? "experienced"
  }

  const addSection = (
    title: string,
    presetTarget?: QuestionSection["target"],
  ) => {
    const trimmed = title.trim()
    if (!trimmed) return

    const newSection: QuestionSection = {
      id: nextSectionId(),
      title: trimmed,
      target: resolveTarget(presetTarget),
      questionsPerCandidate: 2,
      randomize: false,
      items: [],
    }
    // New sections append to the BOTTOM of the list — right where the
    // "Add section" CTA / add form sits — and auto-expand. All other
    // sections collapse via the single-open accordion model.
    onChange([...sections, newSection])
    setExpandedSectionId(newSection.id)
    setAddingSectionName("")
    setShowAddSection(false)
  }

  const updateSection = (id: string, patch: Partial<QuestionSection>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const removeSection = (id: string) => {
    const remaining = sections.filter((s) => s.id !== id)
    onChange(remaining)
    // If the user removed the currently-open section, expand the next
    // remaining one (if any) so the list never goes fully collapsed
    // after a delete.
    if (expandedSectionId === id) {
      setExpandedSectionId(remaining[0]?.id ?? null)
    }
  }

  const toggleSection = (id: string) => {
    setExpandedSectionId((curr) => (curr === id ? null : id))
  }

  const downloadSampleCsv = () => {
    const rows = [
      ["Question text", "Expected response / ideal answer outline"],
      [
        "How many years of experience do you have with React?",
        "Must mention 2+ years of production experience and key projects.",
      ],
      [
        "Do you have your own two-wheeler?",
        "Yes, I have a bike.",
      ],
    ]
    const blob = new Blob([rows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-questions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const presetsToUse = suggestedPresets && suggestedPresets.length > 0
    ? suggestedPresets
    : QUESTION_SECTION_PRESETS

  const unusedPresets = presetsToUse.filter(
    (p) => !sections.some((s) => s.title.toLowerCase() === p.title.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Section list */}
      {sections.length > 0 ? (
        <div className="flex flex-col gap-2">
          {sections.map((section) => (
            <QuestionSectionItem
              key={section.id}
              section={section}
              onUpdate={(patch) => updateSection(section.id, patch)}
              onRemove={() => removeSection(section.id)}
              experienceType={experienceType}
              isOpen={expandedSectionId === section.id}
              onToggle={() => toggleSection(section.id)}
              jobTitle={jobTitle}
              jobJd={jobJd}
              suggestedPresets={presetsToUse}
            />
          ))}
        </div>
      ) : null}

      {/* Empty state — only when there are no sections and the add form
          is not open. Carries its own CTA. */}
      {sections.length === 0 && !showAddSection ? (
        <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No question sections yet.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddSection(true)}
          >
            <Plus className="size-3.5" />
            Add section
          </Button>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={downloadSampleCsv}
            className="h-auto p-0 text-xs gap-1 mt-1"
          >
            <Download className="size-3" />
            Sample CSV
          </Button>
        </div>
      ) : null}

      {/* Add-section form — sits at the BOTTOM, where the CTA is, so the
          new section lands right where the user was looking. */}
      {showAddSection ? (
        <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/30 p-3">
          <span className="text-xs font-medium text-muted-foreground">
            Section name
          </span>
          <div className="flex gap-2">
            <Input
              autoFocus
              value={addingSectionName}
              onChange={(e) => setAddingSectionName(e.target.value)}
              placeholder="e.g. English Speaking"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSection(addingSectionName)
                }
                if (e.key === "Escape") {
                  setShowAddSection(false)
                  setAddingSectionName("")
                }
              }}
              className="flex-1 bg-background"
            />
            <Button
              type="button"
              size="lg"
              onClick={() => addSection(addingSectionName)}
              disabled={!addingSectionName.trim()}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setShowAddSection(false)
                setAddingSectionName("")
              }}
            >
              Cancel
            </Button>
          </div>
          {unusedPresets.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3 text-primary" />
                Suggestions:
              </span>
              {unusedPresets.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => addSection(preset.title, preset.target)}
                  className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs transition-colors hover:bg-muted"
                >
                  + {preset.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bottom-right Add section CTA — only when at least one section
          exists and the add form is not already open. */}
      {sections.length > 0 && !showAddSection ? (
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={downloadSampleCsv}
            className="h-auto p-0 text-xs gap-1"
          >
            <Download className="size-3" />
            Sample CSV
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddSection(true)}
          >
            <Plus className="size-3.5" />
            Add section
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function QuestionSectionItem({
  section,
  onUpdate,
  onRemove,
  experienceType,
  isOpen,
  onToggle,
  jobTitle = "",
  jobJd = "",
  suggestedPresets,
}: {
  section: QuestionSection
  onUpdate: (patch: Partial<QuestionSection>) => void
  onRemove: () => void
  experienceType: ExperienceRequirement
  /** Single source of truth for the accordion: only one section can be
   *  open at a time. Lifted to QuestionSectionsEditor. */
  isOpen: boolean
  onToggle: () => void
  jobTitle?: string
  jobJd?: string
  suggestedPresets?: QuestionSectionPreset[]
}) {
  const [editingTitle, setEditingTitle] = React.useState(false)
  const [titleDraft, setTitleDraft] = React.useState(section.title)
  // When the user starts editing the title from a collapsed section we
  // want the body to expand so they can see the rest while editing.
  const openIfNeeded = () => {
    if (!isOpen) onToggle()
  }

  const commitTitle = () => {
    const trimmed = titleDraft.trim()
    if (trimmed) onUpdate({ title: trimmed })
    else setTitleDraft(section.title)
    setEditingTitle(false)
  }



  const TARGET_LABELS: Record<QuestionSection["target"], string> = {
    freshers: "Freshers only",
    experienced: "Experienced only",
  }

  // Show the "For" dropdown only when the job supports both audiences.
  // Otherwise the section's audience is forced to match the job-level
  // setting (and the data is kept in sync below).
  const showTargetSelect = experienceType === "any"
  const forcedTarget: QuestionSection["target"] | null =
    experienceType === "experienced"
      ? "experienced"
      : experienceType === "freshers"
        ? "freshers"
        : null
  // Keep stored section.target in sync with the job-level setting when
  // the latter is single-audience.
  React.useEffect(() => {
    if (forcedTarget && section.target !== forcedTarget) {
      onUpdate({ target: forcedTarget })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedTarget])

  return (
    <div className="rounded-md border border-border bg-muted/20">
      {/* ── header row ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 text-muted-foreground"
          aria-label={isOpen ? "Collapse section" : "Expand section"}
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-150",
              !isOpen && "-rotate-90",
            )}
          />
        </button>

        {editingTitle ? (
          <Input
            autoFocus
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                commitTitle()
              }
              if (e.key === "Escape") {
                setTitleDraft(section.title)
                setEditingTitle(false)
              }
            }}
            onBlur={commitTitle}
            className="h-7 flex-1 text-sm font-medium"
          />
        ) : (
          <button
            type="button"
            // Title text is only a collapse/expand affordance. Editing
            // is exclusively triggered by the pencil icon next to it.
            onClick={onToggle}
            className="flex-1 cursor-pointer text-left text-sm font-medium"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {section.title}
          </button>
        )}

        {/* Compact metadata badges visible only when the section is
            collapsed — audience + question count. */}
        {!isOpen && !editingTitle ? (
          <>
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {TARGET_LABELS[section.target]}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {section.items.length === 0
                ? "No questions"
                : `${section.items.length} ${
                    section.items.length === 1 ? "question" : "questions"
                  }`}
            </span>
          </>
        ) : null}

        {editingTitle ? (
          // While renaming, the same slot becomes a Save (Check) button.
          // onMouseDown + preventDefault stops the input from losing focus
          // before our onClick runs — otherwise onBlur would commit and
          // flip editingTitle to false before this handler sees the
          // right state.
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Save section title"
            onMouseDown={(e) => e.preventDefault()}
            onClick={commitTitle}
          >
            <Check className="size-3.5" />
          </Button>
        ) : (
          // Idle: Randomize questions switch + three-dot menu.
          <div className="flex items-center gap-3 shrink-0">
            <label
              htmlFor={`rand-${section.id}`}
              className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground select-none"
            >
              <Switch
                id={`rand-${section.id}`}
                checked={section.randomize}
                onCheckedChange={(checked) => onUpdate({ randomize: checked })}
              />
              Randomize questions
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Section actions"
                  >
                    <MoreVertical className="size-3.5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setEditingTitle(true)
                    openIfNeeded()
                  }}
                >
                  <Pencil className="size-3" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={onRemove}>
                  <Trash2 className="size-3" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* ── expanded body ──────────────────────────────────────── */}
      {isOpen ? (
        <div className="border-t border-border">
          {/* settings row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-3 py-3">
            <UIField>
              <FieldLabel htmlFor={`target-${section.id}`} icon={GraduationCap}>
                Target audience
              </FieldLabel>
              {showTargetSelect ? (
                <Select
                  value={section.target}
                  onValueChange={(v) =>
                    onUpdate({ target: v as QuestionSection["target"] })
                  }
                >
                  <SelectTrigger
                    id={`target-${section.id}`}
                    className="w-full bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshers">Freshers only</SelectItem>
                    <SelectItem value="experienced">
                      Experienced only
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`target-${section.id}`}
                  readOnly
                  value={TARGET_LABELS[section.target]}
                  className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                />
              )}
            </UIField>

            <UIField>
              <FieldLabel htmlFor={`qpc-${section.id}`} icon={MessageCircleQuestion}>
                Questions per candidate
              </FieldLabel>
              <Input
                id={`qpc-${section.id}`}
                type="number"
                min={1}
                max={MAX_QA}
                value={section.questionsPerCandidate}
                onChange={(e) =>
                  onUpdate({
                    questionsPerCandidate: Math.min(
                      MAX_QA,
                      Math.max(1, Number(e.target.value) || 1),
                    ),
                  })
                }
                className="w-full bg-background"
              />
            </UIField>
          </div>

          {/* Q&A list */}
          <div className="px-3 pb-3 pt-0">
            <QuestionSectionBody
              sectionId={section.id}
              sectionTitle={section.title}
              sectionTarget={section.target}
              items={section.items}
              onChange={(items) => onUpdate({ items })}
              jobTitle={jobTitle}
              jobJd={jobJd}
              suggestedPresets={suggestedPresets}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function QuestionSectionBody({
  sectionId,
  sectionTitle,
  sectionTarget,
  items,
  onChange,
  jobTitle = "",
  jobJd = "",
  suggestedPresets,
}: {
  sectionId: string
  sectionTitle: string
  sectionTarget: QuestionSection["target"]
  items: QAItem[]
  onChange: (next: QAItem[]) => void
  jobTitle?: string
  jobJd?: string
  suggestedPresets?: QuestionSectionPreset[]
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [csvError, setCsvError] = React.useState<string | null>(null)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [drafts, setDrafts] = React.useState<Draft[]>([])
  const nextDraftId = useIdGen(`draft-${sectionId}`)
  const nextQaId = useIdGen(`qs-qa-${sectionId}`)
  const nextCsvId = useIdGen(`qs-csv-${sectionId}`)
  const makeDraft = (): Draft => ({ key: nextDraftId(), question: "", answer: "" })

  const [suggestions, setSuggestions] = React.useState<{ question: string; answer: string }[] | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = React.useState(false)
  const [suggestError, setSuggestError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const matchingPreset = suggestedPresets?.find(
      (p) => p.title.toLowerCase().trim() === sectionTitle.toLowerCase().trim()
    )
    if (matchingPreset && matchingPreset.questions && matchingPreset.questions.length > 0) {
      setSuggestions(matchingPreset.questions)
    }
  }, [suggestedPresets, sectionTitle])

  const visibleSuggestions = React.useMemo(() => {
    if (!suggestions) return []
    return suggestions.filter(
      (s) =>
        !items.some(
          (item) =>
            item.question.toLowerCase().trim() ===
            s.question.toLowerCase().trim(),
        ),
    )
  }, [suggestions, items])

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true)
    setSuggestError(null)
    try {
      const res = await fetch("/api/onlyrounds/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          jd: jobJd,
          sectionTitle,
          targetAudience: sectionTarget,
          existingQuestions: items.map((it) => it.question),
        }),
      })
      if (!res.ok) throw new Error("Failed to fetch suggested questions.")
      const data = await res.json()
      if (data.error) {
        setSuggestError(data.error)
      } else {
        setSuggestions(data.questions || [])
      }
    } catch (err) {
      console.error("[fetchSuggestions]", err)
      setSuggestError("Something went wrong while generating suggestions.")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const atLimit = items.length >= MAX_QA
  const remaining = Math.max(0, MAX_QA - items.length - drafts.length)

  const openAdd = () => {
    if (atLimit) return
    setEditingId(null)
    setDrafts([makeDraft()])
    setEditorOpen(true)
  }

  const openEdit = (item: QAItem) => {
    setEditingId(item.id)
    setDrafts([
      { key: item.id, question: item.question, answer: item.answer },
    ])
    setEditorOpen(true)
  }

  const updateDraft = (key: string, patch: Partial<Omit<Draft, "key">>) => {
    setDrafts((ds) => ds.map((d) => (d.key === key ? { ...d, ...patch } : d)))
  }

  const removeDraft = (key: string) => {
    setDrafts((ds) => (ds.length <= 1 ? ds : ds.filter((d) => d.key !== key)))
  }

  const addAnotherDraft = () => {
    setDrafts((ds) => {
      if (items.length + ds.length >= MAX_QA) return ds
      return [...ds, makeDraft()]
    })
  }

  const saveDraft = () => {
    if (editingId) {
      const d = drafts[0]
      const q = d.question.trim()
      const a = d.answer.trim()
      if (!q && !a) {
        setEditorOpen(false)
        return
      }
      onChange(
        items.map((it) =>
          it.id === editingId ? { ...it, question: q, answer: a } : it,
        ),
      )
      setEditorOpen(false)
      return
    }
    const filled = drafts
      .map((d) => ({ question: d.question.trim(), answer: d.answer.trim() }))
      .filter((d) => d.question || d.answer)
    if (filled.length === 0) {
      setEditorOpen(false)
      return
    }
    onChange(
      [
        ...items,
        ...filled.map((d) => ({
          id: nextQaId(),
          question: d.question,
          answer: d.answer,
        })),
      ].slice(0, MAX_QA),
    )
    setEditorOpen(false)
  }

  const canAddAnother = !editingId && items.length + drafts.length < MAX_QA
  const removeAt = (id: string) => onChange(items.filter((q) => q.id !== id))

  const handleCsv = async (file: File) => {
    setCsvError(null)
    if (!/\.csv$/i.test(file.name)) {
      setCsvError("Upload a .csv file.")
      return
    }
    const text = await file.text()
    const rows = parseCsv(text)
    const body = rows[0]?.[0]?.toLowerCase()?.startsWith("question")
      ? rows.slice(1)
      : rows
    const parsed = body
      .filter((r) => r.length >= 2 && (r[0].trim() || r[1].trim()))
      .map((r) => ({
        id: nextCsvId(),
        question: r[0].trim(),
        answer: r[1].trim(),
      }))
    if (parsed.length === 0) {
      setCsvError("No rows parsed from the CSV.")
      return
    }
    if (items.length + parsed.length > MAX_QA)
      setCsvError(`Only the first ${MAX_QA} entries were kept.`)
    onChange([...items, ...parsed].slice(0, MAX_QA))
  }



  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-card">
          {items.map((item, idx) => (
            <li key={item.id} className="flex items-center gap-3 px-3 py-2">
              <span className="w-6 shrink-0 text-xs font-medium text-muted-foreground">
                {idx + 1}.
              </span>
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="min-w-0 flex-1 cursor-pointer text-left text-sm"
              >
                <span className="block truncate font-medium">
                  {item.question || (
                    <span className="italic text-muted-foreground">
                      (empty question)
                    </span>
                  )}
                </span>
                {item.answer ? (
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.answer}
                  </span>
                ) : null}
              </button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Edit question"
                onClick={() => openEdit(item)}
              >
                <Pencil className="size-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Remove question"
                onClick={() => removeAt(item.id)}
              >
                <Trash2 className="size-3" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-3 items-start p-4 rounded-md border border-dashed border-border bg-muted/10">
          <p className="text-xs text-muted-foreground">
            No questions in this section yet. Add a question manually, upload a CSV, or let AI suggest questions tailored to your job description.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openAdd}
          disabled={atLimit}
        >
          <Plus className="size-3.5" />
          Add question
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={atLimit}
        >
          <Upload className="size-3.5" />
          Upload CSV
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={loadingSuggestions}
          onClick={fetchSuggestions}
          disabled={atLimit}
        >
          {!loadingSuggestions && <Sparkles className="size-3.5 text-primary" />}
          Suggest questions
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleCsv(f)
            e.currentTarget.value = ""
          }}
        />
        <span
          className={cn(
            "ml-auto text-xs text-muted-foreground",
            atLimit && "text-warning",
          )}
        >
          {items.length} / {MAX_QA}
        </span>
      </div>

      {csvError ? (
        <p className="text-xs text-destructive">{csvError}</p>
      ) : null}

      {suggestError ? (
        <p className="text-xs text-destructive">{suggestError}</p>
      ) : null}

      {/* Skeletons while loading */}
      {loadingSuggestions ? (
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton variant="ai" className="h-16 w-full" />
          <Skeleton variant="ai" className="h-16 w-full" />
          <Skeleton variant="ai" className="h-16 w-full" />
        </div>
      ) : null}

      {/* Suggestions block */}
      {!loadingSuggestions && visibleSuggestions.length > 0 ? (
        <div className="mt-2 rounded-md border border-border bg-muted/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1">
              <Sparkles className="size-3 text-primary" />
              AI Suggested Questions
            </span>
            <button
              type="button"
              onClick={() => setSuggestions(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Hide
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {visibleSuggestions.map((s, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-md border border-border bg-card p-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{s.question}</p>
                    <p className="mt-1 text-muted-foreground italic">
                      Expected response: {s.answer}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                    disabled={atLimit}
                    onClick={() => {
                      onChange([
                        ...items,
                        {
                          id: nextQaId(),
                          question: s.question,
                          answer: s.answer,
                        },
                      ])
                    }}
                    aria-label="Add suggestion"
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit question" : "Add questions"}
            </DialogTitle>
          </DialogHeader>
          <div className="-mx-1 flex max-h-96 flex-col gap-4 overflow-y-auto px-1 py-1">
            {drafts.map((d, idx) => (
              <div
                key={d.key}
                className={cn(
                  "flex flex-col gap-3",
                  !editingId &&
                    drafts.length > 1 &&
                    "rounded-md border border-border bg-muted/30 p-3",
                )}
              >
                {!editingId && drafts.length > 1 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Question {idx + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Remove question"
                      onClick={() => removeDraft(d.key)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qs-q-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Question
                  </Label>
                  <Input
                    id={`qs-q-${d.key}`}
                    autoFocus={idx === 0}
                    value={d.question}
                    onChange={(e) =>
                      updateDraft(d.key, { question: e.target.value })
                    }
                    placeholder="e.g. How many years of experience do you have?"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qs-a-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Answer / expected response
                  </Label>
                  <Textarea
                    id={`qs-a-${d.key}`}
                    value={d.answer}
                    onChange={(e) =>
                      updateDraft(d.key, { answer: e.target.value })
                    }
                    placeholder="Share the ideal answer or what a good response looks like."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            {!editingId ? (
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addAnotherDraft}
                  disabled={!canAddAnother}
                >
                  <Plus className="size-3.5" />
                  Add another question
                </Button>
                <span className="text-xs text-muted-foreground">
                  {remaining} {remaining === 1 ? "slot" : "slots"} left
                </span>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditorOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveDraft}>
              {editingId
                ? "Save changes"
                : drafts.length > 1
                  ? `Add ${drafts.length} questions`
                  : "Add question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Minimal CSV parser — handles quoted fields with commas/newlines and
// doubled-quote escapes. Adequate for the mocked prototype.
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cell += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ",") {
        row.push(cell)
        cell = ""
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++
        row.push(cell)
        rows.push(row)
        row = []
        cell = ""
      } else {
        cell += ch
      }
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}

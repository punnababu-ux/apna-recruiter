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

import {
  Check,
  ChevronDown,
  Download,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ---- types --------------------------------------------------------------

export type ExperienceRequirement = "any" | "experienced" | "freshers"
export type WorkType = "part-time" | "full-time" | "both"
export type WorkMode = "wfh" | "wfo" | "field" | "store"

export type QAItem = { id: string; question: string; answer: string }

export type QuestionSection = {
  id: string
  title: string
  /** Who this section is shown to during the screening flow.
   *  Forced to match the job-level `experienceType` when the job is
   *  single-audience; user-selectable (with `"both"` available) when the
   *  job is `"any"`. */
  target: "freshers" | "experienced" | "both"
  /** How many questions from this section each candidate gets */
  questionsPerCandidate: number
  /** Whether to shuffle the question order per candidate */
  randomize: boolean
  items: QAItem[]
}

export type JobDetailsForm = {
  // Section 1
  clientId: string
  city: string
  area: string
  experienceType: ExperienceRequirement
  experiencedPersona: string
  fresherPersona: string

  // Section 2
  workType: WorkType | ""
  workMode: WorkMode | ""
  scheduleDetails: string

  // Section 3
  compExperienced: string
  compFresher: string

  // Section 4 — merged AI question bank + candidate FAQs
  questionSections: QuestionSection[]

  // Section 5
  additionalDetails: string
}

export const defaultJobDetails: JobDetailsForm = {
  clientId: "",
  city: "",
  area: "",
  experienceType: "any",
  experiencedPersona: "",
  fresherPersona: "",
  workType: "",
  workMode: "",
  scheduleDetails: "",
  compExperienced: "",
  compFresher: "",
  questionSections: [],
  additionalDetails: "",
}

/**
 * Returns human-readable labels for every mandatory field that is empty.
 * Question bank, FAQs, and additional details are intentionally excluded.
 */
export function validateJobDetails(form: JobDetailsForm): string[] {
  const errors: string[] = []
  if (!form.clientId) errors.push("Client")
  if (!form.city.trim()) errors.push("Job city")
  if (!form.area.trim()) errors.push("Job area")
  if (
    (form.experienceType === "any" || form.experienceType === "experienced") &&
    !form.experiencedPersona.trim()
  )
    errors.push("Experienced candidate profile")
  if (
    (form.experienceType === "any" || form.experienceType === "freshers") &&
    !form.fresherPersona.trim()
  )
    errors.push("Fresher candidate profile")
  if (!form.workType) errors.push("Work type")
  if (!form.workMode) errors.push("Work mode")
  if (!form.scheduleDetails.trim()) errors.push("Work schedule details")
  if (
    (form.experienceType === "any" || form.experienceType === "experienced") &&
    !form.compExperienced.trim()
  )
    errors.push("Compensation for experienced")
  if (
    (form.experienceType === "any" || form.experienceType === "freshers") &&
    !form.compFresher.trim()
  )
    errors.push("Compensation for freshers")
  return errors
}

const MAX_QA = 15

// Module-level monotonic counter — used to mint stable keys for draft rows
// and saved QA items without calling Date.now/Math.random during render.
let qaIdCounter = 0
const nextId = (prefix: string) => {
  qaIdCounter += 1
  return `${prefix}-${qaIdCounter}`
}

type Draft = { key: string; question: string; answer: string }
const makeDraft = (): Draft => ({
  key: nextId("draft"),
  question: "",
  answer: "",
})

// Mock client list — the real flow would fetch from the workspace.
export const CLIENTS: { id: string; name: string }[] = [
  { id: "flipkart", name: "Flipkart" },
  { id: "swiggy", name: "Swiggy" },
  { id: "amazon", name: "Amazon" },
  { id: "zomato", name: "Zomato" },
  { id: "myntra", name: "Myntra" },
]

// ---- component ----------------------------------------------------------

export function JobDetailsStep({
  form,
  update,
  showErrors = false,
}: {
  form: JobDetailsForm
  update: <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => void
  showErrors?: boolean
}) {
  const showExperiencedPersona =
    form.experienceType === "any" || form.experienceType === "experienced"
  const showFresherPersona =
    form.experienceType === "any" || form.experienceType === "freshers"

  return (
    <div className="flex flex-col gap-5">
      {/* Section 1 — basic job details */}
      <Section
        index={1}
        title="Basic job details"
        description="Tell us who the role is for and where it's based."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Client"
            htmlFor="client"
            error={showErrors && !form.clientId ? "Required" : undefined}
          >
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
          </Field>
          <Field
            label="Job city"
            htmlFor="city"
            error={showErrors && !form.city.trim() ? "Required" : undefined}
          >
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Bengaluru"
              aria-invalid={
                showErrors && !form.city.trim() ? true : undefined
              }
            />
          </Field>
          <Field
            label="Job area"
            htmlFor="area"
            error={showErrors && !form.area.trim() ? "Required" : undefined}
          >
            <Input
              id="area"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Koramangala"
              aria-invalid={
                showErrors && !form.area.trim() ? true : undefined
              }
            />
          </Field>
          <Field label="Required experience" htmlFor="experience-type">
            <RadioGroup
              id="experience-type"
              value={form.experienceType}
              onValueChange={(v) =>
                update("experienceType", v as ExperienceRequirement)
              }
              className="mt-2 grid-flow-col auto-cols-max gap-4"
            >
              <RadioOption value="any" label="Any" />
              <RadioOption value="experienced" label="Experienced only" />
              <RadioOption value="freshers" label="Freshers only" />
            </RadioGroup>
          </Field>
        </div>

        {showExperiencedPersona ? (
          <Field
            label="Who is an experienced candidate for this role?"
            htmlFor="experienced-persona"
            hint="Describe the kind of experienced candidate you're hoping to meet."
            error={
              showErrors && !form.experiencedPersona.trim()
                ? "Required"
                : undefined
            }
          >
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
          </Field>
        ) : null}
        {showFresherPersona ? (
          <Field
            label="Who is a fresher candidate for this role?"
            htmlFor="fresher-persona"
            hint="Describe the fresher profile that fits this role."
            error={
              showErrors && !form.fresherPersona.trim() ? "Required" : undefined
            }
          >
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
          </Field>
        ) : null}
      </Section>

      {/* Section 2 — work schedule */}
      <Section
        index={2}
        title="Work schedule"
        description="What kind of work is this, and when will it happen?"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Work type"
            htmlFor="work-type"
            error={showErrors && !form.workType ? "Required" : undefined}
          >
            <Select
              value={form.workType}
              onValueChange={(v) =>
                update("workType", ((v as string) ?? "") as WorkType | "")
              }
            >
              <SelectTrigger
                id="work-type"
                className="w-full"
                aria-invalid={
                  showErrors && !form.workType ? true : undefined
                }
              >
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="part-time">Part time</SelectItem>
                <SelectItem value="full-time">Full time</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="Work mode"
            htmlFor="work-mode"
            error={showErrors && !form.workMode ? "Required" : undefined}
          >
            <Select
              value={form.workMode}
              onValueChange={(v) =>
                update("workMode", ((v as string) ?? "") as WorkMode | "")
              }
            >
              <SelectTrigger
                id="work-mode"
                className="w-full"
                aria-invalid={
                  showErrors && !form.workMode ? true : undefined
                }
              >
                <SelectValue placeholder="Select work mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wfh">Work from home</SelectItem>
                <SelectItem value="wfo">Work from office</SelectItem>
                <SelectItem value="field">Field job</SelectItem>
                <SelectItem value="store">Work from store</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field
          label="Work schedule and shift details"
          htmlFor="schedule-details"
          hint="E.g. Mon–Sat, 9am–6pm; two rotational shifts; one weekly off."
          error={
            showErrors && !form.scheduleDetails.trim() ? "Required" : undefined
          }
        >
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
        </Field>
      </Section>

      {/* Section 3 — compensation */}
      <Section
        index={3}
        title="Compensation details"
        description="Share what each candidate profile can expect to earn."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {showExperiencedPersona ? (
            <Field
              label="Compensation — experienced candidates"
              htmlFor="comp-experienced"
              hint="E.g. ₹4–6 LPA fixed + incentives."
              error={
                showErrors && !form.compExperienced.trim()
                  ? "Required"
                  : undefined
              }
            >
              <Input
                id="comp-experienced"
                value={form.compExperienced}
                onChange={(e) => update("compExperienced", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compExperienced.trim() ? true : undefined
                }
              />
            </Field>
          ) : null}
          {showFresherPersona ? (
            <Field
              label="Compensation — fresher candidates"
              htmlFor="comp-fresher"
              hint="E.g. ₹2–3 LPA fixed + incentives."
              error={
                showErrors && !form.compFresher.trim() ? "Required" : undefined
              }
            >
              <Input
                id="comp-fresher"
                value={form.compFresher}
                onChange={(e) => update("compFresher", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compFresher.trim() ? true : undefined
                }
              />
            </Field>
          ) : null}
        </div>
      </Section>

      {/* Section 4 — question sections (merged AI question bank + candidate FAQs) */}
      <QuestionSectionsEditor
        sections={form.questionSections}
        onChange={(next) => update("questionSections", next)}
        experienceType={form.experienceType}
      />

      {/* Section 5 — additional details */}
      <Section
        index={5}
        title="Additional details"
        description="Interview process, company benefits, perks, or anything else worth highlighting."
      >
        <Field label="Notes" htmlFor="additional-details">
          <Textarea
            id="additional-details"
            value={form.additionalDetails}
            onChange={(e) => update("additionalDetails", e.target.value)}
            placeholder="Share anything else candidates should know."
            rows={5}
          />
        </Field>
      </Section>
    </div>
  )
}

// ---- section primitives -------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  index?: number
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <header>
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={htmlFor}
        className={cn("text-sm font-medium", error && "text-destructive")}
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function RadioOption({ value, label }: { value: string; label: string }) {
  const id = `radio-${value}`
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem id={id} value={value} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
        {label}
      </Label>
    </div>
  )
}

// ---- question sections editor ------------------------------------------

// Each preset hints its preferred target. When the job is single-audience
// the hint is ignored and the audience is forced to match the job-level
// setting.
const QUESTION_SECTION_PRESETS: {
  title: string
  target: QuestionSection["target"]
}[] = [
  { title: "English Speaking", target: "both" },
  { title: "Field Sales Capability", target: "both" },
  { title: "Technical Skills", target: "experienced" },
  { title: "Freshers", target: "freshers" },
  { title: "Experienced", target: "experienced" },
]

function QuestionSectionsEditor({
  sections,
  onChange,
  experienceType,
}: {
  sections: QuestionSection[]
  onChange: (next: QuestionSection[]) => void
  experienceType: ExperienceRequirement
}) {
  const [showAddSection, setShowAddSection] = React.useState(false)
  const [addingSectionName, setAddingSectionName] = React.useState("")
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
    return presetTarget ?? "both"
  }

  const addSection = (
    title: string,
    presetTarget?: QuestionSection["target"],
  ) => {
    const trimmed = title.trim()
    if (!trimmed) return
    const newSection: QuestionSection = {
      id: nextId("qs"),
      title: trimmed,
      target: resolveTarget(presetTarget),
      questionsPerCandidate: 2,
      randomize: false,
      items: [],
    }
    // New sections appear at the TOP of the list (in the same spot the
    // "add" input was a moment ago) and auto-expand. All other sections
    // collapse via the single-open accordion model.
    onChange([newSection, ...sections])
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

  const unusedPresets = QUESTION_SECTION_PRESETS.filter(
    (p) => !sections.some((s) => s.title.toLowerCase() === p.title.toLowerCase()),
  )

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      {/* Title + Add CTA on a single row */}
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            Question sections
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Create sections for screening questions and candidate FAQs. Each
            section has its own per-candidate count and randomisation toggle.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddSection((s) => !s)}
          className="shrink-0"
        >
          <Plus className="size-3.5" />
          Add section
        </Button>
      </header>

      {/* Add-section form appears between header and list when active */}
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
              className="flex-1"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => addSection(addingSectionName)}
              disabled={!addingSectionName.trim()}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
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
              <span className="text-xs text-muted-foreground">Quick add:</span>
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

      {sections.length === 0 ? (
        <div className="flex min-h-20 items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
          No sections yet. Use Add section to create one.
        </div>
      ) : (
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
            />
          ))}
        </div>
      )}
    </section>
  )
}

function QuestionSectionItem({
  section,
  onUpdate,
  onRemove,
  experienceType,
  isOpen,
  onToggle,
}: {
  section: QuestionSection
  onUpdate: (patch: Partial<QuestionSection>) => void
  onRemove: () => void
  experienceType: ExperienceRequirement
  /** Single source of truth for the accordion: only one section can be
   *  open at a time. Lifted to QuestionSectionsEditor. */
  isOpen: boolean
  onToggle: () => void
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
    both: "Both",
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

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={editingTitle ? "Save section title" : "Rename section"}
          // When editing, we commit on click. Use onMouseDown +
          // preventDefault to stop the input from losing focus before
          // our onClick runs — otherwise the input's onBlur would
          // commit and flip editingTitle to false *before* this handler
          // sees the right value.
          onMouseDown={
            editingTitle ? (e) => e.preventDefault() : undefined
          }
          onClick={() => {
            if (editingTitle) {
              commitTitle()
              return
            }
            setEditingTitle(true)
            openIfNeeded()
          }}
        >
          {editingTitle ? (
            <Check className="size-3.5" />
          ) : (
            <Pencil className="size-3.5" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Remove section"
          onClick={onRemove}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      {/* ── expanded body ──────────────────────────────────────── */}
      {isOpen ? (
        <div className="border-t border-border">
          {/* settings row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-3 py-2.5">
            {showTargetSelect ? (
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                For
                <Select
                  value={section.target}
                  onValueChange={(v) =>
                    onUpdate({ target: v as QuestionSection["target"] })
                  }
                >
                  <SelectTrigger className="h-7 w-auto gap-1 border border-border bg-background px-2 text-xs font-medium text-foreground shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="freshers">Freshers only</SelectItem>
                    <SelectItem value="experienced">
                      Experienced only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </label>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                For
                {/* Mirrors the SelectTrigger's visual weight so the single-
                    audience read-only badge sits at the same height as the
                    other controls (h-7, same border/bg/padding). */}
                <span className="inline-flex h-7 items-center rounded-md border border-border bg-background px-2 text-xs font-medium text-foreground">
                  {TARGET_LABELS[section.target]}
                </span>
              </span>
            )}

            <label
              htmlFor={`qpc-${section.id}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              Per candidate
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
                className="h-7 w-16 text-center text-xs"
              />
            </label>

            <label
              htmlFor={`rand-${section.id}`}
              className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Switch
                id={`rand-${section.id}`}
                checked={section.randomize}
                onCheckedChange={(checked) =>
                  onUpdate({ randomize: checked === true })
                }
              />
              Randomize questions
            </label>
          </div>

          {/* Q&A list */}
          <div className="px-3 pb-3 pt-0">
            <QuestionSectionBody
              sectionId={section.id}
              items={section.items}
              onChange={(items) => onUpdate({ items })}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function QuestionSectionBody({
  sectionId,
  items,
  onChange,
}: {
  sectionId: string
  items: QAItem[]
  onChange: (next: QAItem[]) => void
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [csvError, setCsvError] = React.useState<string | null>(null)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [drafts, setDrafts] = React.useState<Draft[]>([])

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
          id: nextId("qs-qa"),
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
        id: nextId("qs-csv"),
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

  const downloadSample = () => {
    const rows = [
      "question,answer",
      `"What are the working hours?","Mon–Sat, 9am–6pm with rotational weekly offs."`,
      `"Do you have your own two-wheeler?","Yes, I have a bike."`,
    ]
    const blob = new Blob([rows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${sectionId}-questions.csv`
    a.click()
    URL.revokeObjectURL(url)
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
                <Pencil className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Remove question"
                onClick={() => removeAt(item.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground">
          No questions in this section yet.
        </p>
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
        <button
          type="button"
          onClick={downloadSample}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
        >
          <Download className="size-3" />
          Sample CSV
        </button>
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
                      <Trash2 className="size-3.5" />
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

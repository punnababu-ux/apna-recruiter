"use client"

/**
 * JobDetailsStep — step 2 of the Create Job wizard.
 *
 * Sections:
 *   1. Basic job details  (client, city, area, experience type + persona)
 *   2. Work schedule      (work type, work mode, shift notes)
 *   3. Compensation       (fresher and/or experienced pay)
 *   4. AI question bank   (upload or add questions, per-candidate count,
 *                          randomize)
 *   5. Candidate FAQs     (upload or add FAQs)
 *   6. Additional details (free-form)
 *
 * The step is fully controlled — the wizard owns the form state and this
 * component is purely presentational + a few tiny reducers for the
 * question/FAQ list editors.
 */

import { Download, Pencil, Plus, Trash2, Upload } from "lucide-react"
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

  // Section 4
  questions: QAItem[]
  questionsPerCandidate: number
  randomizeQuestions: boolean

  // Section 5
  faqs: QAItem[]

  // Section 6
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
  questions: [],
  questionsPerCandidate: 2,
  randomizeQuestions: false,
  faqs: [],
  additionalDetails: "",
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
const CLIENTS: { id: string; name: string }[] = [
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
}: {
  form: JobDetailsForm
  update: <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => void
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
          <Field label="Client" htmlFor="client">
            <Select
              value={form.clientId}
              onValueChange={(v) => update("clientId", (v as string) ?? "")}
            >
              <SelectTrigger id="client" className="w-full">
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
          <Field label="Job city" htmlFor="city">
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Bengaluru"
            />
          </Field>
          <Field label="Job area" htmlFor="area">
            <Input
              id="area"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Koramangala"
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
          >
            <Textarea
              id="experienced-persona"
              value={form.experiencedPersona}
              onChange={(e) => update("experiencedPersona", e.target.value)}
              placeholder="e.g. 2+ years in B2C product support, comfortable on calls, CRM-literate."
              rows={3}
            />
          </Field>
        ) : null}
        {showFresherPersona ? (
          <Field
            label="Who is a fresher candidate for this role?"
            htmlFor="fresher-persona"
            hint="Describe the fresher profile that fits this role."
          >
            <Textarea
              id="fresher-persona"
              value={form.fresherPersona}
              onChange={(e) => update("fresherPersona", e.target.value)}
              placeholder="e.g. Graduates with strong spoken English, quick learners, open to shift work."
              rows={3}
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
          <Field label="Work type" htmlFor="work-type">
            <Select
              value={form.workType}
              onValueChange={(v) =>
                update("workType", ((v as string) ?? "") as WorkType | "")
              }
            >
              <SelectTrigger id="work-type" className="w-full">
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="part-time">Part time</SelectItem>
                <SelectItem value="full-time">Full time</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Work mode" htmlFor="work-mode">
            <Select
              value={form.workMode}
              onValueChange={(v) =>
                update("workMode", ((v as string) ?? "") as WorkMode | "")
              }
            >
              <SelectTrigger id="work-mode" className="w-full">
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
        >
          <Textarea
            id="schedule-details"
            value={form.scheduleDetails}
            onChange={(e) => update("scheduleDetails", e.target.value)}
            placeholder="Describe the expected schedule and shifts."
            rows={3}
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
            >
              <Input
                id="comp-experienced"
                value={form.compExperienced}
                onChange={(e) => update("compExperienced", e.target.value)}
                placeholder="₹ Fixed + variable"
              />
            </Field>
          ) : null}
          {showFresherPersona ? (
            <Field
              label="Compensation — fresher candidates"
              htmlFor="comp-fresher"
              hint="E.g. ₹2–3 LPA fixed + incentives."
            >
              <Input
                id="comp-fresher"
                value={form.compFresher}
                onChange={(e) => update("compFresher", e.target.value)}
                placeholder="₹ Fixed + variable"
              />
            </Field>
          ) : null}
        </div>
      </Section>

      {/* Section 4 — AI question bank */}
      <QABankSection
        title="AI question bank"
        description="Upload a CSV or add questions manually. Up to 15 questions. The AI will ask a subset of these during screening."
        items={form.questions}
        onChange={(next) => update("questions", next)}
        extraControls={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <Field
              label="Questions per candidate"
              htmlFor="questions-per-candidate"
              hint="How many questions should each candidate answer?"
            >
              <Input
                id="questions-per-candidate"
                type="number"
                min={1}
                max={Math.max(1, form.questions.length || MAX_QA)}
                value={form.questionsPerCandidate}
                onChange={(e) =>
                  update(
                    "questionsPerCandidate",
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
                className="w-32"
              />
            </Field>
            <label
              htmlFor="randomize-questions"
              className="flex cursor-pointer items-center gap-2 pb-1 text-sm"
            >
              <Switch
                id="randomize-questions"
                checked={form.randomizeQuestions}
                onCheckedChange={(checked) =>
                  update("randomizeQuestions", checked === true)
                }
              />
              <span>Randomize questions for each candidate</span>
            </label>
          </div>
        }
      />

      {/* Section 5 — candidate FAQs */}
      <QABankSection
        title="Candidate FAQs"
        description="Upload a CSV or add FAQs manually. Up to 15 FAQs. Shown to candidates during the flow."
        items={form.faqs}
        onChange={(next) => update("faqs", next)}
      />

      {/* Section 6 — additional details */}
      <Section
        index={6}
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
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-gray-50 p-5">
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
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
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

// ---- question / FAQ bank editor ----------------------------------------

function QABankSection({
  title,
  description,
  items,
  onChange,
  extraControls,
}: {
  title: string
  description: string
  items: QAItem[]
  onChange: (next: QAItem[]) => void
  extraControls?: React.ReactNode
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  // Drafts are only populated when the dialog opens, so we start empty and
  // avoid calling any non-pure helpers during render.
  const [drafts, setDrafts] = React.useState<Draft[]>([])

  const atLimit = items.length >= MAX_QA
  const isFaqs = title === "Candidate FAQs"
  const singular = isFaqs ? "FAQ" : "question"
  const plural = isFaqs ? "FAQs" : "questions"
  const remaining = Math.max(
    0,
    MAX_QA - items.length - drafts.length,
  )

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
    const next = [
      ...items,
      ...filled.map((d) => ({
        id: nextId("qa"),
        question: d.question,
        answer: d.answer,
      })),
    ].slice(0, MAX_QA)
    onChange(next)
    setEditorOpen(false)
  }

  const canAddAnother =
    !editingId && items.length + drafts.length < MAX_QA

  const removeAt = (id: string) => {
    onChange(items.filter((q) => q.id !== id))
  }

  const handleCsv = async (file: File) => {
    setError(null)
    if (!/\.csv$/i.test(file.name)) {
      setError("Upload a .csv file.")
      return
    }
    const text = await file.text()
    const rows = parseCsv(text)
    // Accept either "question,answer" with no header or a header row.
    const body = rows[0]?.[0]?.toLowerCase()?.startsWith("question")
      ? rows.slice(1)
      : rows
    const parsed = body
      .filter((r) => r.length >= 2 && (r[0].trim() || r[1].trim()))
      .map((r) => ({
        id: nextId("qa-csv"),
        question: r[0].trim(),
        answer: r[1].trim(),
      }))
    const next = [...items, ...parsed].slice(0, MAX_QA)
    if (parsed.length === 0) {
      setError("No rows parsed from the CSV.")
      return
    }
    if (items.length + parsed.length > MAX_QA) {
      setError(`Only the first ${MAX_QA} entries were kept.`)
    }
    onChange(next)
  }

  const downloadSample = () => {
    const rows = isFaqs
      ? [
          "question,answer",
          `"What are the working hours?","Mon–Sat, 9am–6pm with rotational weekly offs."`,
          `"Is there cab facility?","Yes, pick-up and drop within 15km of the office."`,
        ]
      : [
          "question,answer",
          `"What shifts can you work?","I can work rotational shifts."`,
          `"Do you have your own two-wheeler?","Yes, I have a bike."`,
        ]
    const blob = new Blob([rows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = isFaqs ? "faqs-sample.csv" : "questions-sample.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Section index is embedded in the title prop's position in the form, but
  // we don't strictly need it numbered here — use a plain title header.
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-gray-50 p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-base font-semibold leading-tight">{title}</h3>
            <button
              type="button"
              onClick={downloadSample}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              <Download className="size-3" />
              Download sample CSV
            </button>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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
        </div>
      </header>

      {items.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-white">
          {items.map((item, idx) => (
            <li
              key={item.id}
              className="flex items-center gap-3 px-3 py-2"
            >
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
                    <span className="text-muted-foreground italic">
                      (empty {singular})
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
                aria-label={`Edit ${singular}`}
                onClick={() => openEdit(item)}
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Remove ${singular}`}
                onClick={() => removeAt(item.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openAdd}
          disabled={atLimit}
        >
          <Plus className="size-3.5" />
          Add {singular}
        </Button>
        <span
          className={cn(
            "text-xs text-muted-foreground",
            atLimit && "text-warning",
          )}
        >
          {items.length} / {MAX_QA}
        </span>
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}

      {extraControls ? (
        <div className="border-t border-border pt-4">{extraControls}</div>
      ) : null}

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="sm:max-w-lg [&_[data-slot=input]]:bg-white [&_[data-slot=textarea]]:bg-white [&_[data-slot=select-trigger]]:bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? `Edit ${singular}`
                : `Add ${plural}`}
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
                      {singular.charAt(0).toUpperCase() + singular.slice(1)}{" "}
                      {idx + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Remove ${singular}`}
                      onClick={() => removeDraft(d.key)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qa-dialog-question-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Question
                  </Label>
                  <Input
                    id={`qa-dialog-question-${d.key}`}
                    autoFocus={idx === 0}
                    value={d.question}
                    onChange={(e) =>
                      updateDraft(d.key, { question: e.target.value })
                    }
                    placeholder={
                      isFaqs
                        ? "e.g. What are the working hours?"
                        : "e.g. How many years of experience do you have?"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qa-dialog-answer-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Answer
                  </Label>
                  <Textarea
                    id={`qa-dialog-answer-${d.key}`}
                    value={d.answer}
                    onChange={(e) =>
                      updateDraft(d.key, { answer: e.target.value })
                    }
                    placeholder={
                      isFaqs
                        ? "Share the answer candidates should see."
                        : "Share the ideal answer or an example response."
                    }
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
                  Add another {singular}
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
                  ? `Add ${drafts.length} ${plural}`
                  : `Add ${singular}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
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

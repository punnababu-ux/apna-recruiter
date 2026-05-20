"use client"

/**
 * CreateJobWizard — 4-step wizard for authoring a job.
 *
 * Steps:
 *   1. Job Description — JD paste, AI-generate, or file upload
 *   2. Job Details     — experience / salary / location / work mode
 *   3. Interview Rounds — rounds pipeline setup
 *   4. Review & Publish — final review + publish
 *
 * Layout: 2-col — Stepper rail (240px) on the left, current step body on
 * the right, sticky footer with Back / Save & exit / Next.
 */

import { ArrowLeft, ArrowRight, Save, Sparkles, Upload, X } from "lucide-react"
import * as React from "react"
import { useState } from "react"

import {
  CLIENTS,
  JobDetailsStep,
  defaultJobDetails,
  type JobDetailsForm,
} from "@/components/onlyrounds/job-details-step"
import { Stepper, type Step, type StepStatus } from "@/components/onlyrounds/stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type StepId = "description" | "details" | "rounds" | "review"

const STEPS: { id: StepId; label: string; description: string }[] = [
  {
    id: "description",
    label: "Job Description",
    description: "Write, generate, or upload the JD",
  },
  {
    id: "details",
    label: "Job Details",
    description: "Experience, pay, and location",
  },
  {
    id: "rounds",
    label: "Interview Rounds",
    description: "Set up the screening pipeline",
  },
  {
    id: "review",
    label: "Review & Publish",
    description: "Review everything and publish",
  },
]

export function CreateJobWizard() {
  const [activeId, setActiveId] = useState<StepId>("description")
  const [form, setForm] = useState<FormShape>({
    title: "",
    jd: "",
    details: defaultJobDetails,
  })

  const [filledFromJd, setFilledFromJd] = useState(false)

  const updateDetails = <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }))
  }

  const activeIdx = STEPS.findIndex((s) => s.id === activeId)
  const isFirst = activeIdx === 0
  const isLast = activeIdx === STEPS.length - 1

  const stepsForRail: Step[] = STEPS.map((s, i) => {
    const status: StepStatus =
      i < activeIdx ? "completed" : i === activeIdx ? "current" : "pending"
    return {
      id: s.id,
      label: s.label,
      status,
    }
  })

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const goNext = () => {
    if (isLast) return
    const nextStep = STEPS[activeIdx + 1]

    // Auto-fill step 2 from JD when transitioning description → details
    if (
      activeId === "description" &&
      nextStep.id === "details" &&
      form.jd.trim().length > 0
    ) {
      const detailsAreEmpty =
        !form.details.city &&
        !form.details.clientId &&
        !form.details.workMode &&
        !form.details.workType
      if (detailsAreEmpty) {
        const extracted = extractDetailsFromJd(form.jd, form.title)
        if (Object.keys(extracted).length > 0) {
          setForm((prev) => ({
            ...prev,
            details: { ...prev.details, ...extracted },
          }))
          setFilledFromJd(true)
        }
      }
    }

    setActiveId(nextStep.id)
  }

  return (
    <div className="flex min-h-svh flex-col">
      {/* Sticky horizontal stepper, sits directly below the page header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card px-6 py-3">
        <div className="mx-auto w-full max-w-3xl">
          <Stepper
            orientation="horizontal"
            steps={stepsForRail}
            onStepClick={(id) => setActiveId(id as StepId)}
          />
        </div>
      </div>

      <div className="flex flex-1 px-6 py-6">
        {/* Body */}
        <section className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6">
          {activeId === "details" ? (
            <>
              {filledFromJd ? (
                <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm">
                  <Sparkles className="size-4 shrink-0 text-primary" />
                  <span>
                    Fields pre-filled from your job description — review and
                    adjust as needed.
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilledFromJd(false)}
                    className="ml-auto shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label="Dismiss"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : null}
              <JobDetailsStep form={form.details} update={updateDetails} />
            </>
          ) : (
            <div className="rounded-lg border border-border bg-card p-6">
              {activeId === "description" ? (
                <DescriptionStep form={form} update={update} />
              ) : null}
              {activeId === "rounds" ? (
                <StepPlaceholder>
                  Rounds pipeline builder — coming next.
                </StepPlaceholder>
              ) : null}
              {activeId === "review" ? (
                <StepPlaceholder>
                  Final review panel — coming after rounds.
                </StepPlaceholder>
              ) : null}
            </div>
          )}

          {/* Action card — sits below the step body */}
          <div className="rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  !isFirst && setActiveId(STEPS[activeIdx - 1].id)
                }
                disabled={isFirst}
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost">
                  <Save className="size-4" /> Save & exit
                </Button>
                <Button
                  size="lg"
                  onClick={goNext}
                >
                  {isLast ? "Publish job" : "Next"}
                  {!isLast ? <ArrowRight className="size-4" /> : null}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

type FormShape = {
  title: string
  jd: string
  details: JobDetailsForm
}

function DescriptionStep({
  form,
  update,
}: {
  form: FormShape
  update: <K extends keyof FormShape>(key: K, value: FormShape[K]) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Job title"
        htmlFor="title"
        hint="Shown on the candidate landing page."
      >
        <Input
          id="title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Customer Support Associate"
        />
      </Field>
      <JDField
        value={form.jd}
        onChange={(next) => update("jd", next)}
        title={form.title}
        onTitleChange={(next) => update("title", next)}
      />
    </div>
  )
}

function JDField({
  value,
  onChange,
  title,
  onTitleChange,
}: {
  value: string
  onChange: (next: string) => void
  title: string
  onTitleChange: (next: string) => void
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [generating, setGenerating] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const hasTitle = title.trim().length > 0
  const hasJd = value.trim().length > 0
  const canGenerate = hasTitle || hasJd

  const generate = async () => {
    if (!canGenerate) return
    setError(null)
    setGenerating(true)
    await new Promise((r) => setTimeout(r, 900))
    let role = title.trim()
    if (!role) {
      role = deriveTitleFromJd(value)
      if (role) onTitleChange(role)
    }
    if (!role) role = "this role"
    onChange(
      `About ${role}\n\n` +
        `We're looking for a ${role} to join a high-growth team. You'll own ` +
        `the end-to-end outcomes for your area, partner closely with cross-` +
        `functional stakeholders, and ship thoughtful work at a steady pace.\n\n` +
        `Responsibilities\n` +
        `• Lead core day-to-day execution for your scope\n` +
        `• Partner with product, design, and data peers\n` +
        `• Communicate trade-offs clearly and raise risks early\n\n` +
        `What we're looking for\n` +
        `• 2+ years of relevant experience\n` +
        `• Strong written communication and a bias for action\n` +
        `• Comfort working through ambiguity`,
    )
    setGenerating(false)
  }

  const handleFile = async (file: File) => {
    setError(null)
    if (!/\.(txt|md|pdf|docx?)$/i.test(file.name)) {
      setError("Upload a .txt, .md, .pdf, .doc, or .docx file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.")
      return
    }
    setProcessing(true)
    try {
      // Simulate server-side parse. For .txt/.md we can read locally;
      // richer formats would be parsed by the backend — here we mock a
      // realistic delay so the UI state is observable.
      let parsed = ""
      if (/\.(txt|md)$/i.test(file.name)) {
        parsed = await file.text()
        await new Promise((r) => setTimeout(r, 900))
      } else {
        await new Promise((r) => setTimeout(r, 1400))
        // Mock server-side parse: use filename stem as the role so the
        // derived title is plausible until real parsing is wired up.
        const stem = file.name
          .replace(/\.(pdf|docx?|txt|md)$/i, "")
          .replace(/[_\-]+/g, " ")
          .trim()
        const role = stem.length > 0 ? stem : "this role"
        parsed =
          `About ${role}\n\n` +
          `We're hiring a ${role} to own end-to-end outcomes, partner ` +
          `with cross-functional stakeholders, and ship with craft.\n\n` +
          `Responsibilities\n` +
          `• Drive day-to-day execution for your scope\n` +
          `• Partner with product, design, and data peers\n` +
          `• Communicate trade-offs and raise risks early\n\n` +
          `What we're looking for\n` +
          `• Relevant domain experience\n` +
          `• Strong written communication\n` +
          `• Comfort working through ambiguity`
      }
      onChange(parsed)
      const derived = deriveTitleFromJd(parsed)
      if (derived) onTitleChange(derived)
      setFileName(file.name)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="jd" className="text-sm font-medium">
          Job description
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generate}
            disabled={generating || !canGenerate}
            title={
              !canGenerate
                ? "Enter a job title or a few lines of description first"
                : undefined
            }
          >
            <Sparkles className="size-3.5" />
            {generating ? "Generating…" : "Generate with AI"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={processing}
            loading={processing}
            loadingText="Processing your document…"
          >
            <Upload className="size-3.5" />
            {fileName ? "Replace file" : "Upload JD"}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.md,.pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
              e.currentTarget.value = ""
            }}
          />
        </div>
      </div>
      <Textarea
        id="jd"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or write the JD here — or let AI draft a starting point."
        rows={12}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {fileName
            ? `Imported ${fileName}. Edit above to refine.`
            : "We'll auto-extract skills and must-haves from the JD."}
        </span>
        {error ? <span className="text-destructive">{error}</span> : null}
      </div>
    </div>
  )
}

// ---- known cities for JD extraction ------------------------------------

const KNOWN_CITIES: { value: string; pattern: RegExp }[] = [
  { value: "Bengaluru", pattern: /bengaluru|bangalore/i },
  { value: "Mumbai", pattern: /mumbai|bombay/i },
  { value: "Delhi", pattern: /delhi|new delhi/i },
  { value: "Hyderabad", pattern: /hyderabad/i },
  { value: "Chennai", pattern: /chennai|madras/i },
  { value: "Pune", pattern: /\bpune\b/i },
  { value: "Kolkata", pattern: /kolkata|calcutta/i },
  { value: "Hubli", pattern: /\bhubli\b/i },
  { value: "Ahmedabad", pattern: /ahmedabad/i },
  { value: "Gurgaon", pattern: /gurgaon|gurugram/i },
  { value: "Noida", pattern: /\bnoida\b/i },
  { value: "Jaipur", pattern: /\bjaipur\b/i },
  { value: "Lucknow", pattern: /\blucknow\b/i },
]

/**
 * Heuristic extraction of step-2 fields from a free-text JD. This is a
 * prototype mock — production would call a backend NLP endpoint instead.
 * Returns only the keys it's confident about so existing data isn't clobbered.
 */
function extractDetailsFromJd(
  jd: string,
  title: string,
): Partial<JobDetailsForm> {
  const combined = `${title} ${jd}`
  const result: Partial<JobDetailsForm> = {}

  // Client
  for (const client of CLIENTS) {
    if (new RegExp(client.name, "i").test(combined)) {
      result.clientId = client.id
      break
    }
  }

  // City
  for (const city of KNOWN_CITIES) {
    if (city.pattern.test(combined)) {
      result.city = city.value
      break
    }
  }

  // Area — look for "in <Area>, <City>" or "at <Area>" patterns
  const areaMatch = combined.match(
    /\b(?:in|at|near)\s+([A-Z][A-Za-z\s]{2,25?}?)(?=\s*[,.]|\s+(?:Bengaluru|Bangalore|Mumbai|Delhi|Hyderabad|Chennai|Pune|Kolkata|Hubli|Gurgaon|Noida))/,
  )
  if (areaMatch?.[1]) {
    const area = areaMatch[1].trim()
    // Skip if it looks like a city name itself
    if (!KNOWN_CITIES.some((c) => c.pattern.test(area))) {
      result.area = area
    }
  }

  // Experience type
  const hasFresher =
    /fresher|fresh\s*graduate|0\s*year|no.{0,10}experience\s+required/i.test(
      combined,
    )
  const hasExperienced =
    /experienced|\b\d\+?\s*(?:year|yr)s?\s*(?:of\s+)?(?:experience|exp)\b|\bmin(?:imum)?\s*\d\s*year/i.test(
      combined,
    )
  if (hasFresher && hasExperienced) result.experienceType = "any"
  else if (hasFresher) result.experienceType = "freshers"
  else if (hasExperienced) result.experienceType = "experienced"

  // Work type
  if (/part[\s-]?time/i.test(combined)) result.workType = "part-time"
  else if (/full[\s-]?time/i.test(combined)) result.workType = "full-time"

  // Work mode
  if (/work\s+from\s+home|wfh|\bremote\b/i.test(combined))
    result.workMode = "wfh"
  else if (
    /field\s*(?:job|work|sales|executive|agent|officer)/i.test(combined)
  )
    result.workMode = "field"
  else if (/work\s+from\s+store|store\s*(?:job|executive)/i.test(combined))
    result.workMode = "store"
  else if (/work\s+from\s+office|wfo|on[\s-]?site/i.test(combined))
    result.workMode = "wfo"

  // Compensation — match ₹/Rs patterns like "₹4–6 LPA"
  const salaryRe =
    /(?:₹|rs\.?|inr)\s*([\d,]+)\s*(?:–|-|to)\s*([\d,]+)\s*(?:lpa|l\.?p\.?a\.?|lakh(?:\s*per\s*annum)?|\/\s*(?:year|annum))/gi
  const salaryMatches = [...combined.matchAll(salaryRe)]
  if (salaryMatches.length >= 2) {
    result.compExperienced = `₹${salaryMatches[0][1].replace(/,/g, "")}–${salaryMatches[0][2].replace(/,/g, "")} LPA`
    result.compFresher = `₹${salaryMatches[1][1].replace(/,/g, "")}–${salaryMatches[1][2].replace(/,/g, "")} LPA`
  } else if (salaryMatches.length === 1) {
    const comp = `₹${salaryMatches[0][1].replace(/,/g, "")}–${salaryMatches[0][2].replace(/,/g, "")} LPA`
    if (result.experienceType === "freshers") result.compFresher = comp
    else result.compExperienced = comp
  }

  // Schedule — extract a schedule sentence if present
  const scheduleMatch = combined.match(
    /(?:schedule|timing|shift|working hours?)\s*[:\-]?\s*([^\n.]{10,120})/i,
  )
  if (scheduleMatch?.[1]) {
    result.scheduleDetails = scheduleMatch[1].trim()
  }

  return result
}

/**
 * Pull a plausible job title out of a free-text JD snippet. Mocked heuristic
 * for the prototype: scan for common role phrasings, then fall back to the
 * first short line of text.
 */
function deriveTitleFromJd(jd: string): string {
  const text = jd.trim()
  if (!text) return ""
  const patterns = [
    /looking for (?:an?\s+)?([A-Z][A-Za-z0-9/\-\s]{2,40}?)(?=\s+(?:to|who|with|and|\.|,|$))/,
    /hiring (?:an?\s+)?([A-Z][A-Za-z0-9/\-\s]{2,40}?)(?=\s+(?:to|who|with|and|\.|,|$))/,
    /(?:^|\n)\s*(?:Role|Position|Title)\s*[:\-]\s*([^\n]{2,60})/i,
  ]
  for (const re of patterns) {
    const m = text.match(re)
    if (m?.[1]) return m[1].trim().replace(/\s+/g, " ")
  }
  const firstLine = text.split(/\n/)[0].trim()
  if (firstLine.length > 0 && firstLine.length <= 60) return firstLine
  return firstLine.split(/\s+/).slice(0, 6).join(" ")
}

function StepPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
      {children}
    </div>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
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

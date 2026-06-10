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

import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Save,
  Sparkles,
  Upload,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useRef, useState } from "react"
import { useDraftPersistence } from "@/hooks/onlyrounds/use-draft-persistence"
import { useCriteriaGeneration } from "@/hooks/onlyrounds/use-criteria-generation"

import { InterviewRoundsStep } from "@/components/onlyrounds/interview-rounds-step"
import {
  JobDetailsStep,
  validateJobDetails,
  validateSection,
} from "@/components/onlyrounds/job-details-step"
import {
  CALL_TASK_TYPES,
  REQUIRED_SECTION_IDS,
  SECTION_IDS,
  SECTION_LABELS,
  defaultInterviewRounds,
  defaultJobDetails,
} from "@/lib/onlyrounds/constants"
import { hasAiRound } from "@/lib/onlyrounds/utils"
import type {
  InterviewRoundsForm,
  JobDetailsForm,
  SectionId,
} from "@/types/onlyrounds"
import { ReviewStep } from "@/components/onlyrounds/review-step"
import { Stepper, type Step } from "@/components/onlyrounds/stepper"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// ── Form shape ────────────────────────────────────────────────────────────

type FormShape = {
  title: string
  jd: string
  details: JobDetailsForm
  rounds: InterviewRoundsForm
}

// ── App routes ────────────────────────────────────────────────────────────

export const ROUTES = {
  jobs: "/onlyrounds/jobs",
  jobsNew: "/onlyrounds/jobs/new",
  aiTest: "/onlyrounds/test",
} as const

// ── Wizard constants ──────────────────────────────────────────────────────

/** Minimum JD length before "Generate" switches to "clean-up" mode. */
const JD_CLEANUP_THRESHOLD = 50
/** Maximum JD file size accepted by the upload flow. */
const MAX_JD_FILE_SIZE_BYTES = 5 * 1024 * 1024
/** Simulated parse delay for plain-text / markdown uploads. */
const MOCK_PARSE_DELAY_TXT_MS = 900
/** Simulated parse delay for binary uploads (PDF, DOCX). */
const MOCK_PARSE_DELAY_BINARY_MS = 1400

// ── Draft persistence ─────────────────────────────────────────────────────
// Prototype-level: persist to localStorage so the user can come back to a
// saved draft. Production would swap this for a server-side draft API.

const DRAFT_KEY = "onlyrounds:create-job-draft"

const emptyForm: FormShape = {
  title: "",
  jd: "",
  details: defaultJobDetails,
  rounds: defaultInterviewRounds,
}


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
  const router = useRouter()
  const [activeId, setActiveId] = useState<StepId>("description")

  const {
    form,
    setForm,
    isDirty,
    persistDraft,
    clearDraft,
  } = useDraftPersistence(DRAFT_KEY, emptyForm)

  // A ref that always points to the latest form — used by useCriteriaGeneration
  // so its callbacks don't go stale on every form change.
  const formRef = useRef(form)
  React.useEffect(() => { formRef.current = form }, [form])

  const {
    generatingTasks,
    generateTaskCriteria: _generateTaskCriteria,
    generateAllCriteria,
    abortGeneration,
  } = useCriteriaGeneration(formRef as React.RefObject<FormShape>, setForm)

  const [filledFromJd, setFilledFromJd] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [extracting, setExtracting] = useState(false)
  // Step 2 single-open accordion — lifted here so the sticky footer can
  // drive section navigation.
  const [step2OpenSection, setStep2OpenSection] = useState<SectionId | null>(
    "basics",
  )
  const [exitDialogOpen, setExitDialogOpen] = useState(false)
  const [showRoundErrors, setShowRoundErrors] = useState(false)


  /** Top-bar "Create new job" back link click. If there's nothing to
   *  lose, navigate immediately; otherwise open the 3-option confirm. */
  const handleExitAttempt = () => {
    if (isDirty) {
      setExitDialogOpen(true)
      return
    }
    router.push(ROUTES.jobs)
  }

  const handleDiscardAndExit = () => {
    setExitDialogOpen(false)
    router.push(ROUTES.jobs)
  }

  const handleSaveAndExit = () => {
    persistDraft(form) // from useDraftPersistence
    setExitDialogOpen(false)
    toast.success("Draft saved")
    router.push(ROUTES.jobs)
  }

  const updateDetails = <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }))
  }

  const updateRounds = (next: InterviewRoundsForm) => {
    setForm((prev) => ({ ...prev, rounds: next }))
  }

  const activeIdx = STEPS.findIndex((s) => s.id === activeId)
  const isFirst = activeIdx === 0
  const isLast = activeIdx === STEPS.length - 1

  // ── Derived footer state (Variant A + P2) ──────────────────────────────
  // Everything below is pure derivation — no extra state.

  const lastStep2SectionId = SECTION_IDS[SECTION_IDS.length - 1]

  const step2AllRequiredValid =
    activeId === "details" && validateJobDetails(form.details).length === 0

  /** Is the currently-open Step 2 section invalid? Drives Continue's
   *  disabled state per Variant A. Optional sections never disable. */
  const currentSectionInvalid =
    activeId === "details" &&
    step2OpenSection !== null &&
    REQUIRED_SECTION_IDS.includes(step2OpenSection) &&
    validateSection(form.details, step2OpenSection).length > 0

  /**
   * Are we positioned to advance the wizard step (rather than move
   * within Step 2)? True when we're on the very last Step 2 section, or
   * the user has collapsed every section.
   *
   * This is *the* key behaviour change: we no longer flip to "Next" just
   * because all required fields are valid. Continue walks linearly
   * through every section — including the optional Question sections and
   * Additional details — so the user always encounters them at least
   * once. They can still "skip" an optional section by clicking Continue
   * with it empty.
   */
  const aboutToAdvanceStep =
    activeId === "details" &&
    (step2OpenSection === lastStep2SectionId || step2OpenSection === null)

  /** Next section in Step 2 in declaration order. */
  const nextStep2Section = (curr: SectionId | null): SectionId | null => {
    if (!curr) return SECTION_IDS[0]
    const i = SECTION_IDS.indexOf(curr)
    return i >= 0 && i < SECTION_IDS.length - 1 ? SECTION_IDS[i + 1] : null
  }

  /** Previous section in Step 2 in declaration order. */
  const prevStep2Section = (curr: SectionId | null): SectionId | null => {
    if (!curr) return null
    const i = SECTION_IDS.indexOf(curr)
    return i > 0 ? SECTION_IDS[i - 1] : null
  }

  const eligibleTasks = form.rounds.tasks.filter(
    (t) => CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai"
  )
  const needsCriteriaGeneration =
    activeId === "rounds" &&
    eligibleTasks.length > 0 &&
    eligibleTasks.some((t) => !t.criteria || t.criteria.length === 0)

  // Primary CTA label: "Next" only when the next click should leave
  // Step 2 (on the last section or collapsed). Otherwise "Continue" —
  // moves to the next section within Step 2.
  const ctaLabel = isLast
    ? "Publish job"
    : activeId === "details" && !aboutToAdvanceStep
      ? "Continue"
      : needsCriteriaGeneration
        ? "Generate criteria"
        : "Next"

  // ctaBlocked — the action can't proceed yet, but the button stays
  // CLICKABLE (soft-disabled): clicking reveals the field-level errors
  // via goNext (which sets showErrors + opens the offending section).
  // Hard-disable is reserved for `extracting` (handled by `loading`).
  //   • Step 1 without title/JD
  //   • Step 2 with an invalid required section open (Continue won't move)
  //   • Step 2 about to advance step but a required section upstream is
  //     still invalid (Next can't actually advance)
  // Step 3 requires at least one AI round before the job can be created.
  const roundsBlocked = activeId === "rounds" && !hasAiRound(form.rounds)

  const ctaBlocked =
    (activeId === "description" &&
      (!form.title.trim() || !form.jd.trim())) ||
    (activeId === "details" && currentSectionInvalid) ||
    (aboutToAdvanceStep && !step2AllRequiredValid) ||
    (roundsBlocked && !needsCriteriaGeneration)

  const ctaDisabledReason =
    activeId === "description" && (!form.title.trim() || !form.jd.trim())
      ? "Add a job title and description first"
      : activeId === "details" && currentSectionInvalid && step2OpenSection
        ? `Fill the required fields in ${SECTION_LABELS[step2OpenSection]} to continue`
        : aboutToAdvanceStep && !step2AllRequiredValid
          ? "Some required sections still need to be filled"
          : roundsBlocked && !needsCriteriaGeneration
            ? "Add at least one AI round (AI screening or AI interview)"
            : null

  // Previous (P2): step-level when at section §1 or outside Step 2;
  // section-level inside Step 2 when a non-first section is open.
  const canGoPrev =
    !isFirst ||
    (activeId === "details" &&
      step2OpenSection !== null &&
      step2OpenSection !== SECTION_IDS[0])

  const stepsForRail: Step[] = STEPS.map((s, i) => {
    const status =
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


  const goNext = async () => {
    // ── Step 4 (Review & Publish) — publish and navigate to jobs list ─────
    if (isLast) {
      toast.success("Job published successfully!", {
        description: `"${form.title}" is now live and accepting candidates.`,
      })
      router.push(ROUTES.jobs)
      return
    }

    // ── Step 1 (Job Description) — validate, AI-extract, advance ────────
    if (activeId === "description") {
      const stepErrors: string[] = []
      if (!form.title.trim()) stepErrors.push("Job title")
      if (!form.jd.trim()) stepErrors.push("Job description")
      if (stepErrors.length > 0) {
        // Variant A: button is disabled in this case, so this branch is
        // only reached via keyboard or programmatic invocation. Toast
        // fallback for visibility.
        setShowErrors(true)
        toast.error(
          `${stepErrors.length} required ${
            stepErrors.length === 1 ? "field" : "fields"
          } missing`,
          { description: stepErrors.join(" · ") },
        )
        return
      }
      setShowErrors(false)

      // AI-powered auto-fill of Step 2 if Step 2 looks empty.
      if (form.jd.trim().length > 0) {
        const detailsAreEmpty =
          !form.details.city &&
          !form.details.clientId &&
          !form.details.workMode &&
          !form.details.workType
        if (detailsAreEmpty) {
          setExtracting(true)
          try {
            const res = await fetch("/api/onlyrounds/extract-jd", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ jd: form.jd, title: form.title }),
            })
            if (res.ok) {
              const extracted: Partial<JobDetailsForm> = await res.json()
              if (Object.keys(extracted).length > 0) {
                setForm((prev) => ({
                  ...prev,
                  details: { ...prev.details, ...extracted },
                }))
                setFilledFromJd(true)
              }
            }
          } catch {
            // Silent fail — network error doesn't block navigation
          } finally {
            setExtracting(false)
          }
        }
      }

      // Land on §1 of Step 2.
      setStep2OpenSection(SECTION_IDS[0])
      setActiveId("details")
      return
    }

    // ── Step 2 (Job Details) — section navigation, then step advance ────
    if (activeId === "details") {
      // If the current required section is invalid, the disabled CTA
      // should have blocked this — but if we get here via keyboard /
      // programmatic invocation, surface a toast.
      if (step2OpenSection && currentSectionInvalid) {
        const errs = validateSection(form.details, step2OpenSection)
        setShowErrors(true)
        toast.error(
          `${errs.length} required ${
            errs.length === 1 ? "field" : "fields"
          } missing in ${SECTION_LABELS[step2OpenSection]}`,
          { description: errs.join(" · ") },
        )
        return
      }

      // About to leave Step 2 (on the last section or everything
      // collapsed) → validate the whole step before advancing.
      if (aboutToAdvanceStep) {
        if (validateJobDetails(form.details).length === 0) {
          setShowErrors(false)
          setActiveId("rounds")
          return
        }
        // Required section(s) upstream are still invalid — toast and
        // auto-open the first one. (Disabled CTA usually prevents this
        // path; remaining as a safety net.)
        const firstInvalid = REQUIRED_SECTION_IDS.find(
          (id) => validateSection(form.details, id).length > 0,
        )
        if (firstInvalid) {
          const errs = validateSection(form.details, firstInvalid)
          setStep2OpenSection(firstInvalid)
          setShowErrors(true)
          toast.error(
            `${errs.length} required ${
              errs.length === 1 ? "field" : "fields"
            } missing in ${SECTION_LABELS[firstInvalid]}`,
            { description: errs.join(" · ") },
          )
        }
        return
      }

      // Otherwise: walk to the next section in declaration order. This
      // includes the optional sections — Continue never skips over them
      // any more, so the user is guaranteed to at least see them once.
      const next = nextStep2Section(step2OpenSection)
      if (next) {
        setStep2OpenSection(next)
      }
      return
    }

    // ── Step 3 (Interview Rounds) — require at least one AI round ────────
    if (activeId === "rounds") {
      if (!hasAiRound(form.rounds)) {
        toast.error("At least one AI round needs to be added to create job", {
          description: "Add an AI screening or AI interview task.",
        })
        return
      }
      const screeningIncomplete = form.rounds.tasks.some((t) => {
        if (!CALL_TASK_TYPES.has(t.type)) return false
        if (!t.screening.mode) return true
        if (t.screening.mode === "ai") {
          return !t.screening.direction || !t.screening.format
        }
        return false
      })
      if (screeningIncomplete) {
        setShowRoundErrors(true)
        toast.error("Some rounds have incomplete configuration", {
          description:
            "Select a type, direction, and format for every AI screening or interview round.",
        })
        return
      }

      const cefrMissingMin = form.rounds.tasks.some(
        (t) => t.screening.cefrEnabled && !t.screening.cefrMinLevel,
      )
      if (cefrMissingMin) {
        setShowRoundErrors(true)
        toast.error("Minimum CEFR level is required", {
          description:
            "Select a minimum CEFR level for the language assessment add-on.",
        })
        return
      }
      setShowRoundErrors(false)
      if (needsCriteriaGeneration) {
        await generateAllCriteria()
        return
      }
      setActiveId("review")
      return
    }

    // ── Step 4 — straightforward step advance ───────────────────────────
    setActiveId(STEPS[activeIdx + 1].id)
  }

  /**
   * P2 Previous — within-step first, then step-level.
   * On Step 2 with a non-first section open → open the previous section.
   * Otherwise (on §1, or outside Step 2) → go to the previous wizard step.
   */
  const goPrev = () => {
    if (
      activeId === "details" &&
      step2OpenSection !== null &&
      step2OpenSection !== SECTION_IDS[0]
    ) {
      setShowErrors(false)
      setStep2OpenSection(prevStep2Section(step2OpenSection))
      return
    }
    if (isFirst) return
    // Leaving step 3 — cancel any in-flight criteria generation and clear errors.
    if (activeId === "rounds") {
      abortGeneration()
      setShowRoundErrors(false)
    }
    setShowErrors(false)
    setActiveId(STEPS[activeIdx - 1].id)
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted">
      {/* Sticky top — title row + step-progress rail */}
      <div className="sticky top-0 z-10 border-b border-border bg-card">
        {/* Title row — back/title on the left, Save & exit on the right */}
        <div className="border-b border-border px-6 py-3">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleExitAttempt}
              aria-label="Back to jobs"
              className="group inline-flex items-center gap-2 text-base font-semibold text-foreground"
            >
              <span className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
                <ArrowLeft className="size-4" />
              </span>
              Create new job
            </button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSaveAndExit}
            >
              <Save className="size-4" />
              Save &amp; exit
            </Button>
          </div>
        </div>
        {/* Stepper row */}
        <div className="px-6 py-3">
          <div className="mx-auto w-full max-w-3xl">
            <Stepper
              orientation="horizontal"
              steps={stepsForRail}
              onStepClick={(id) => {
                setShowErrors(false)
                setActiveId(id as StepId)
              }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable body — between sticky top and sticky bottom */}
      <div className="flex-1 px-6 py-6 pb-24">
        <section className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-6">
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
              <JobDetailsStep
                form={form.details}
                update={updateDetails}
                showErrors={showErrors}
                openSectionId={step2OpenSection}
                onSectionChange={setStep2OpenSection}
              />
            </>
          ) : activeId === "rounds" ? (
            <InterviewRoundsStep
              form={form.rounds}
              update={updateRounds}
              generatingTasks={generatingTasks}
              showErrors={showRoundErrors}
            />
          ) : (
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              {activeId === "description" ? (
                <DescriptionStep
                  form={form}
                  update={update}
                  showErrors={showErrors}
                />
              ) : null}
              {activeId === "review" ? (
                <ReviewStep
                  title={form.title}
                  jd={form.jd}
                  details={form.details}
                  rounds={form.rounds}
                />
              ) : null}
            </div>
          )}
        </section>
      </div>

      {/* Sticky bottom — consistent across all steps */}
      <div className="sticky bottom-0 z-10 border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-6 py-3">
          {/* Left — Previous (chevron; the back arrow lives in the top
              bar, so the footer uses a chevron to stay distinct). base-ui's
              TooltipTrigger uses `render={...}` (not Radix's `asChild`). */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                }
              />
              <TooltipContent>
                {activeId === "details" &&
                step2OpenSection &&
                step2OpenSection !== SECTION_IDS[0]
                  ? "Previous section"
                  : "Previous step"}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right — adaptive primary CTA. Soft-disabled when blocked:
              the button LOOKS disabled (opacity + not-allowed cursor +
              aria-disabled) but stays clickable so a click reveals the
              field-level errors. The tooltip explains what's blocking. */}
          <Tooltip>
            <TooltipTrigger
              render={
                <span className={cn(ctaBlocked && "cursor-not-allowed")}>
                  <Button
                    size="lg"
                    onClick={goNext}
                    loading={extracting || Object.values(generatingTasks).some(Boolean)}
                    loadingText={Object.values(generatingTasks).some(Boolean) ? "Generating criteria…" : "Filling from JD…"}
                    aria-disabled={ctaBlocked || undefined}
                    className={cn(ctaBlocked && "opacity-50")}
                  >
                    {ctaLabel}
                    {!(extracting || Object.values(generatingTasks).some(Boolean)) ? <ChevronRight className="size-4" /> : null}
                  </Button>
                </span>
              }
            />
            {ctaDisabledReason ? (
              <TooltipContent>{ctaDisabledReason}</TooltipContent>
            ) : null}
          </Tooltip>
        </div>
      </div>

      {/* Exit-confirmation dialog — fires when the user clicks the
          top-bar "Create new job" link with unsaved changes. */}
      <AlertDialog
        open={exitDialogOpen}
        onOpenChange={setExitDialogOpen}
      >
        <AlertDialogContent>
          {/* Close (X) — replaces the footer Cancel; dismisses the dialog
              and stays in the wizard. */}
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            aria-label="Close"
            className="absolute top-3 right-3 text-muted-foreground"
          >
            <X className="size-4" />
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Save them as a draft to pick up
              later, or exit without saving to discard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              variant="ghost"
              onClick={handleDiscardAndExit}
            >
              Exit without saving
            </AlertDialogAction>
            <AlertDialogAction onClick={handleSaveAndExit}>
              <Save className="size-4" />
              Save &amp; exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function DescriptionStep({
  form,
  update,
  showErrors,
}: {
  form: FormShape
  update: <K extends keyof FormShape>(key: K, value: FormShape[K]) => void
  showErrors: boolean
}) {
  return (
    <div className="flex flex-col gap-5">
      <UIField>
        <FieldLabel htmlFor="title" icon={Briefcase}>Job title</FieldLabel>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Customer Support Associate"
          aria-invalid={showErrors && !form.title.trim() ? true : undefined}
        />
        {showErrors && !form.title.trim() ? (
          <FieldError>Required</FieldError>
        ) : (
          <FieldDescription>Shown on the candidate landing page.</FieldDescription>
        )}
      </UIField>
      <JDField
        value={form.jd}
        onChange={(next) => update("jd", next)}
        title={form.title}
        onTitleChange={(next) => update("title", next)}
        showErrors={showErrors}
      />
    </div>
  )
}

function JDField({
  value,
  onChange,
  title,
  onTitleChange,
  showErrors,
}: {
  value: string
  onChange: (next: string) => void
  title: string
  onTitleChange: (next: string) => void
  showErrors: boolean
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [generating, setGenerating] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)
  const [fileName, setFileName] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const hasTitle = title.trim().length > 0
  const hasJd = value.trim().length > 0
  // "Cleanup" mode kicks in when the user has typed/pasted a meaningful
  // chunk of JD — we still send the title if they have one, but the model
  // is expected to polish the existing text rather than write from scratch.
  const isCleanup = value.trim().length > JD_CLEANUP_THRESHOLD
  const canGenerate = hasTitle || hasJd

  const generate = async () => {
    if (!canGenerate) return
    setError(null)
    setGenerating(true)
    try {
      const res = await fetch("/api/onlyrounds/generate-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, jd: value }),
      })
      if (!res.ok) {
        setError("Could not generate. Try again in a moment.")
        return
      }
      const data = (await res.json()) as {
        jobDescription?: string
        title?: string
        error?: string
      }
      if (!data.jobDescription) {
        // Surface the server's specific reason (rate limit, schema error,
        // bad key, timeout, etc.) when present. Generic nudge otherwise.
        setError(
          data.error ?? "Add a job title or paste a rough JD, then try again.",
        )
        return
      }
      onChange(data.jobDescription)
      // Always apply the AI-cleaned title. The model strips qualifiers
      // ("with 5 years of experience", "in Bengaluru", etc.) from whatever
      // the user typed, and infers a title in CLEANUP mode when none was
      // provided. Fall back to the local regex if the model didn't return
      // one and the user's title is still empty.
      if (data.title) {
        onTitleChange(data.title)
      } else if (!title.trim()) {
        const derived = deriveTitleFromJd(data.jobDescription)
        if (derived) onTitleChange(derived)
      }
    } catch {
      setError("Could not reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleFile = async (file: File) => {
    setError(null)
    if (!/\.(txt|md|pdf|docx?)$/i.test(file.name)) {
      setError("Upload a .txt, .md, .pdf, .doc, or .docx file.")
      return
    }
    if (file.size > MAX_JD_FILE_SIZE_BYTES) {
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
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_TXT_MS))
      } else {
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_BINARY_MS))
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

  const jdMissing = showErrors && !value.trim()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label
          htmlFor="jd"
          className={cn("text-sm font-medium inline-flex items-center gap-2", jdMissing && "text-destructive")}
        >
          <FileText className="size-4 text-muted-foreground shrink-0" />
          Job description
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generate}
            disabled={!canGenerate || generating || processing}
            loading={generating}
            loadingText={isCleanup ? "Cleaning up with AI…" : "Writing with AI…"}
            title={
              !canGenerate
                ? "Enter a job title or a few lines of description first"
                : undefined
            }
          >
            <Sparkles className="size-3.5" />
            {isCleanup ? "Clean up with AI" : "Generate with AI"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={processing || generating}
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
      {/* The JD textarea — fully covered by an animated brand-gradient
          overlay while the AI is working. */}
      <div className="relative">
        <Textarea
          id="jd"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write the JD here — or let AI draft a starting point."
          rows={12}
          aria-invalid={jdMissing ? true : undefined}
          readOnly={generating}
        />
        {generating ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
            {/* Animated gradient fills the entire field */}
            <div
              className="absolute inset-0 animate-ai-shimmer"
              aria-hidden="true"
            />
            {/* Centered status chip — announced to screen readers */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-live="polite"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
                <Sparkles className="size-4 animate-pulse text-primary" />
                <span>
                  {isCleanup ? "Cleaning up with AI…" : "Writing with AI…"}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {fileName
            ? `Imported ${fileName}. Edit above to refine.`
            : "We'll auto-extract skills and must-haves from the JD."}
        </span>
        {jdMissing ? (
          <span className="text-destructive">Required</span>
        ) : error ? (
          <span className="text-destructive">{error}</span>
        ) : null}
      </div>
    </div>
  )
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

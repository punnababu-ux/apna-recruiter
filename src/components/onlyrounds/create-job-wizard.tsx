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
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Save,
  Sparkles,
  X,
  Paperclip,
  RotateCcw,
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
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
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
  promptText?: string
  attachedFileName?: string
}

// ── App routes ────────────────────────────────────────────────────────────

export const ROUTES = {
  jobs: "/onlyrounds/jobs",
  jobsNew: "/onlyrounds/jobs/new",
  aiTest: "/onlyrounds/test",
} as const

// ── Wizard constants ──────────────────────────────────────────────────────

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
  promptText: "",
  attachedFileName: "",
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
  } = useDraftPersistence(DRAFT_KEY, emptyForm)

  // A ref that always points to the latest form — used by useCriteriaGeneration
  // so its callbacks don't go stale on every form change.
  const formRef = useRef(form)
  React.useEffect(() => { formRef.current = form }, [form])

  const {
    generatingTasks,
    generateAllCriteria,
    abortGeneration,
  } = useCriteriaGeneration(formRef as React.RefObject<FormShape>, setForm)

  const [filledFromJd, setFilledFromJd] = useState(false)
  const hasResults = form.title.trim().length > 0 && form.jd.trim().length > 0
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
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BackButton
                onClick={handleExitAttempt}
                aria-label="Back to jobs"
              />
              <span className="text-base font-semibold text-foreground">
                Create new job
              </span>
            </div>
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
          <div className="mx-auto w-full max-w-5xl">
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
      <div className={cn(
        "flex-1 px-6 py-6 pb-24 flex flex-col",
        activeId === "description" && !hasResults ? "justify-center" : ""
      )}>
        <section className={cn(
          "mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-4",
          activeId === "description" && !hasResults ? "flex-1 justify-center" : ""
        )}>
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
                jobTitle={form.title}
                jobJd={form.jd}
              />
            </>
          ) : activeId === "rounds" ? (
            <InterviewRoundsStep
              form={form.rounds}
              update={updateRounds}
              generatingTasks={generatingTasks}
              showErrors={showRoundErrors}
            />
          ) : activeId === "description" ? (
            <DescriptionStep
              form={form}
              update={update}
              showErrors={showErrors}
            />
          ) : activeId === "review" ? (
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              <ReviewStep
                title={form.title}
                jd={form.jd}
                details={form.details}
                rounds={form.rounds}
              />
            </div>
          ) : null}
        </section>
      </div>

      {/* Sticky bottom — consistent across all steps */}
      <div className="sticky bottom-0 z-10 border-t border-border bg-card px-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 py-3">
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
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2"
            aria-label="Close"
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
              variant="outline"
              onClick={handleDiscardAndExit}
            >
              Exit without saving
            </AlertDialogAction>
            <AlertDialogAction onClick={handleSaveAndExit}>
              Save &amp; exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

const PLACEHOLDERS = [
  "e.g. 'Senior React Developer with 3+ years experience, remotely from India' or paste description...",
  "e.g. 'Customer Support Associate (English & Hindi speaking)' or paste description...",
  "e.g. 'Field Sales Executive with own bike in Bengaluru' or paste description...",
  "e.g. 'Manual Tester with experience in UI and API testing' or paste description...",
  "e.g. 'Product Manager to own roadmap and ship features' or paste description...",
]

function DescriptionStep({
  form,
  update,
  showErrors,
}: {
  form: FormShape
  update: <K extends keyof FormShape>(key: K, value: FormShape[K]) => void
  showErrors: boolean
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [promptVal, setPromptVal] = React.useState(form.promptText || "")
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null)
  const [generating, setGenerating] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showAllPrompt, setShowAllPrompt] = React.useState(false)

  const [displayedPlaceholder, setDisplayedPlaceholder] = React.useState("")
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0)

  React.useEffect(() => {
    if (generating || processing || promptVal.trim() !== "") {
      setDisplayedPlaceholder("")
      return
    }

    let charIdx = 0
    let currentText = ""
    const fullText = PLACEHOLDERS[placeholderIndex]
    
    const typingInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        currentText += fullText[charIdx]
        setDisplayedPlaceholder(currentText)
        charIdx++
      } else {
        clearInterval(typingInterval)
        
        const delayTimeout = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
        }, 4000)
        
        return () => clearTimeout(delayTimeout)
      }
    }, 35)

    return () => {
      clearInterval(typingInterval)
    }
  }, [placeholderIndex, generating, processing, promptVal])

  const hasResults = form.title.trim().length > 0 && form.jd.trim().length > 0

  const SUGGESTIONS = [
    "React Frontend Engineer with 3+ years experience, Remote",
    "Customer Support Associate (English & Hindi speaking)",
    "Field Sales Executive with own bike in Bengaluru",
  ]

  const unusedSuggestions = SUGGESTIONS.filter(
    (s) => s.toLowerCase() !== promptVal.toLowerCase(),
  )

  const handleReset = () => {
    setError(null)
    setPromptVal("")
    setAttachedFile(null)
    update("title", "")
    update("jd", "")
    update("promptText", "")
    update("attachedFileName", "")
    setShowAllPrompt(false)
  }

  const handleGenerate = async (seedText?: string) => {
    const textToSubmit = seedText || promptVal.trim()
    if (!textToSubmit) return
    setError(null)
    setGenerating(true)
    try {
      const res = await fetch("/api/onlyrounds/generate-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jd: textToSubmit }),
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
        setError(data.error ?? "Add more details, then try again.")
        return
      }
      update("promptText", textToSubmit)
      update("jd", data.jobDescription)
      if (data.title) {
        update("title", data.title)
      } else {
        const derived = deriveTitleFromJd(data.jobDescription)
        if (derived) update("title", derived)
      }
    } catch {
      setError("Could not reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handlePolish = async () => {
    setError(null)
    setGenerating(true)
    try {
      const res = await fetch("/api/onlyrounds/generate-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: form.title, jd: form.jd }),
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
        setError(data.error ?? "Could not refine the description.")
        return
      }
      update("jd", data.jobDescription)
      if (data.title) update("title", data.title)
    } catch {
      setError("Could not reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleFileUpload = async (file: File) => {
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
      let parsed = ""
      if (/\.(txt|md)$/i.test(file.name)) {
        parsed = await file.text()
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_TXT_MS))
      } else {
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_BINARY_MS))
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
      update("promptText", `Uploaded file: ${file.name}`)
      update("attachedFileName", file.name)
      update("jd", parsed)
      const derived = deriveTitleFromJd(parsed)
      if (derived) update("title", derived)
    } finally {
      setProcessing(false)
    }
  }

  const jdMissing = showErrors && !form.jd.trim()
  const titleMissing = showErrors && !form.title.trim()

  return (
    <div className="flex flex-col gap-4">
      {hasResults ? (
        /* Result State: Sliding Split View (2-column layout) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Left Column: Prompt / File Summary */}
          <div className="md:col-span-1">
            <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-4 h-fit shadow-sm">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Your Input
                </h4>
                {form.attachedFileName ? (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground p-2 rounded-md bg-muted/30 border border-border">
                    <Paperclip className="size-3.5 text-primary shrink-0" />
                    <span className="truncate flex-1">{form.attachedFileName}</span>
                  </div>
                ) : form.promptText ? (
                  <div className="flex flex-col gap-1.5">
                    <div className={cn(
                      "text-sm font-medium text-foreground italic whitespace-pre-wrap leading-relaxed",
                      showAllPrompt && "max-h-60 overflow-y-auto pr-1"
                    )}>
                      &ldquo;
                      {form.promptText.length > 180 && !showAllPrompt
                        ? `${form.promptText.slice(0, 180)}...`
                        : form.promptText}
                      &rdquo;
                    </div>
                    {form.promptText.length > 180 ? (
                      <button
                        type="button"
                        onClick={() => setShowAllPrompt(!showAllPrompt)}
                        className="text-xs text-primary font-semibold hover:underline self-start cursor-pointer mt-0.5"
                      >
                        {showAllPrompt ? "See less" : "See more"}
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Custom details entered manually.
                  </p>
                )}
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs gap-1.5 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Rewrite Prompt
              </Button>
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col gap-4">
            <UIField>
              <FieldLabel htmlFor="title" icon={Briefcase}>Job title</FieldLabel>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Customer Support Associate"
                aria-invalid={titleMissing ? true : undefined}
              />
              {titleMissing ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>Shown on candidate landing page.</FieldDescription>
              )}
            </UIField>

            <UIField>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="jd" icon={FileText}>Job description</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePolish}
                  loading={generating}
                  disabled={generating || !form.jd.trim()}
                  className="h-7 text-xs gap-1 cursor-pointer"
                >
                  {!generating && <Sparkles className="size-3 text-primary" />}
                  Polish with AI
                </Button>
              </div>
              <div className="relative">
                <Textarea
                  id="jd"
                  value={form.jd}
                  onChange={(e) => update("jd", e.target.value)}
                  placeholder="Paste or write the JD details here..."
                  rows={12}
                  aria-invalid={jdMissing ? true : undefined}
                  readOnly={generating}
                />
                {generating ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-background z-10">
                    <Skeleton variant="ai" className="absolute inset-0 rounded-none" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
                        <Sparkles className="size-4 animate-pulse text-primary" />
                        <span>Polishing with AI…</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {jdMissing ? (
                <FieldError>Required</FieldError>
              ) : error ? (
                <p className="text-xs text-destructive mt-1">{error}</p>
              ) : (
                <FieldDescription>Editable. We&apos;ll auto-extract skills from this text.</FieldDescription>
              )}
            </UIField>
          </div>
        </div>
      ) : (
        /* Initial State: Unified AI Command Bar Card */
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm w-full animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <div className={cn(
              "flex size-10 items-center justify-center rounded-full text-primary transition-all duration-300 border border-primary/15 shadow-xs",
              !generating && !processing ? "animate-ai-container-glow-shimmer" : "bg-primary/10"
            )}>
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">What is your hiring requirement?</h3>
          </div>

          <div className="relative rounded-lg border border-border bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all flex flex-col">
            {/* token-lint-ignore: Need fixed field-sizing and fixed height to prevent prompt input card auto-expansion */}
            <Textarea
              value={promptVal}
              onChange={(e) => setPromptVal(e.target.value)}
              placeholder={generating || processing ? "" : displayedPlaceholder}
              className="w-full h-28 max-h-28 [field-sizing:fixed] resize-none border-0 bg-transparent p-4 pb-2 text-sm focus-visible:ring-0 focus-visible:outline-hidden overflow-y-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              readOnly={generating || processing}
            />
            
            {generating || processing ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-background z-10">
                <Skeleton variant="ai" className="absolute inset-0 rounded-none" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
                    <Sparkles className="size-4 animate-pulse text-primary" />
                    <span>
                      {processing ? "Processing document…" : "Writing with AI…"}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {!(generating || processing) ? (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => fileRef.current?.click()}
                    title="Attach file"
                    disabled={generating || processing}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  
                  {attachedFile ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground border border-border max-w-48">
                      <FileText className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate flex-1">{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="hover:text-destructive cursor-pointer shrink-0"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ) : null}

                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,.md,.pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) {
                        setAttachedFile(f)
                        handleFileUpload(f)
                      }
                      e.currentTarget.value = ""
                    }}
                  />
                </div>

                <Button
                  type="button"
                  size="sm"
                  disabled={(!promptVal.trim() && !attachedFile) || generating || processing}
                  onClick={() => handleGenerate()}
                  className="gap-1.5 cursor-pointer font-medium"
                >
                  <Sparkles className="size-3.5" />
                  Generate JD
                </Button>
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="text-xs text-destructive mt-2 text-center">{error}</p>
          ) : null}

          {unusedSuggestions.length > 0 && !generating && !processing ? (
            <div className="mt-5 flex flex-wrap items-center gap-1.5 justify-center">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3 text-primary" />
                Suggestions:
              </span>
              {unusedSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setPromptVal(suggestion)
                    setError(null)
                  }}
                  className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
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

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

import { Sparkles, X } from "@apna/design-system"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useRef, useState } from "react"
import { useDraftPersistence } from "@/hooks/onlyrounds/use-draft-persistence"
import { useCriteriaGeneration } from "@/hooks/onlyrounds/use-criteria-generation"
import { InterviewRoundsStep } from "@/components/onlyrounds/interview-rounds-step"
import { JobDetailsStep, validateJobDetails, validateSection } from "@/components/onlyrounds/job-details-step"
import {
  CALL_TASK_TYPES,
  REQUIRED_SECTION_IDS,
  SECTION_IDS,
  SECTION_LABELS,
  defaultInterviewRounds,
  defaultJobDetails,
} from "@/lib/onlyrounds/constants"
import { hasAiRound, summarizeDetails, summarizeTasks } from "@/lib/onlyrounds/utils"
import type {
  InterviewRoundsForm,
  JobDetailsForm,
  SectionId,
} from "@/types/onlyrounds"
import { ReviewStep } from "@/components/onlyrounds/review-step"
import type { Step } from "@apna/design-system"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { FormShape, GenerationData } from "@/components/onlyrounds/create-job-wizard/types"
import { STEPS, type StepId } from "@/components/onlyrounds/create-job-wizard/steps"
import { populateFromGeneration } from "@/components/onlyrounds/create-job-wizard/populate-from-generation"
import { WizardTopBar } from "@/components/onlyrounds/create-job-wizard/wizard-top-bar"
import { WizardFooter } from "@/components/onlyrounds/create-job-wizard/wizard-footer"
import { ExitDialog } from "@/components/onlyrounds/create-job-wizard/exit-dialog"
import { DescriptionStep } from "@/components/onlyrounds/create-job-wizard/description-step"

export type { GenerationData } from "@/components/onlyrounds/create-job-wizard/types"

// ── App routes ────────────────────────────────────────────────────────────

export const ROUTES = {
  jobs: "/apnahire/jobs",
  jobsNew: "/apnahire/jobs/new",
  aiTest: "/apnahire/test",
} as const

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
  const [lastCriteriaSnapshot, setLastCriteriaSnapshot] = useState<string>("")

  const populateFormFromGeneration = (data: GenerationData, promptValToSet?: string) =>
    populateFromGeneration(data, promptValToSet, setForm, setLastCriteriaSnapshot)

  // On-the-fly criteria regeneration when entering Step 3 (Rounds).
  // The snapshot is remembered during render; the generation itself waits
  // until after, so a render doesn't call the network.
  const [regen, setRegen] = React.useState(false)
  if (activeId === "rounds") {
    const currentSnapshot = JSON.stringify({
      title: form.title,
      jd: form.jd,
      detailsSummary: summarizeDetails(form.details),
      tasksSummary: summarizeTasks(form.rounds.tasks),
    })
    if (currentSnapshot !== lastCriteriaSnapshot) {
      const previous = lastCriteriaSnapshot
      setLastCriteriaSnapshot(currentSnapshot)
      if (previous) {
        const tasksToRegenerate = form.rounds.tasks.filter(
          (t) => CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai" && !t.isCriteriaEdited
        )
        if (tasksToRegenerate.length > 0) {
          setForm((prev) => ({
            ...prev,
            rounds: {
              ...prev.rounds,
              tasks: prev.rounds.tasks.map((t) =>
                CALL_TASK_TYPES.has(t.type) && t.screening.mode === "ai" && !t.isCriteriaEdited
                  ? { ...t, criteria: [] }
                  : t
              ),
            },
          }))
          setRegen(true)
        }
      }
    }
  }
  React.useEffect(() => {
    if (!regen) return
    const t = window.setTimeout(() => {
      setRegen(false)
      generateAllCriteria().then(() => {
        toast.success("Evaluation criteria updated", {
          description: "AI rounds updated to match your new job details.",
        })
      })
    }, 0)
    return () => window.clearTimeout(t)
  }, [regen, generateAllCriteria])

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
              const extracted = await res.json()
              if (Object.keys(extracted).length > 0) {
                populateFormFromGeneration(extracted)
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

      const cefrTasksCount = form.rounds.tasks.filter((t) => t.screening.cefrEnabled).length
      if (cefrTasksCount > 1) {
        setShowRoundErrors(true)
        toast.error("Multiple CEFR language assessments enabled", {
          description: "CEFR language proficiency assessment can only be enabled in one task.",
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
      <WizardTopBar
        handleExitAttempt={handleExitAttempt}
        handleSaveAndExit={handleSaveAndExit}
        stepsForRail={stepsForRail}
        setShowErrors={setShowErrors}
        setActiveId={setActiveId}
      />

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
                <div className="flex items-center gap-3 rounded-card-nested border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm">
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
              populateFormFromGeneration={populateFormFromGeneration}
            />
          ) : activeId === "review" ? (
            <div className="rounded-card border border-border bg-card p-6">
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
      {!(activeId === "description" && (!form.title.trim() || !form.jd.trim())) && (
        <WizardFooter
          activeId={activeId}
          step2OpenSection={step2OpenSection}
          canGoPrev={canGoPrev}
          goPrev={goPrev}
          goNext={goNext}
          ctaBlocked={ctaBlocked}
          ctaLabel={ctaLabel}
          ctaDisabledReason={ctaDisabledReason}
          extracting={extracting}
          generatingTasks={generatingTasks}
        />
      )}

      {/* Exit-confirmation dialog — fires when the user clicks the
          top-bar "Create new job" link with unsaved changes. */}
      <ExitDialog
        exitDialogOpen={exitDialogOpen}
        setExitDialogOpen={setExitDialogOpen}
        handleDiscardAndExit={handleDiscardAndExit}
        handleSaveAndExit={handleSaveAndExit}
      />
    </div>
  )
}


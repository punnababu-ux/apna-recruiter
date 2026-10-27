"use client"

/**
 * PostJobFlow — the "Create new job" wizard (stages 1–3; stage 4 is the
 * plan page at /apnahire/jobs/new/plans). One decision per screen, in the
 * order of SCREENS (wizard-screens.tsx):
 *
 *   describe ──"Draft my job" (drafts in place)──▶ title → … → review → plans
 *       └──── "Fill it in myself" ────────▶ title
 *
 * The description is drafted once; every later screen arrives answered and
 * marked "From your description" until the recruiter changes it (aiFilled).
 * The question screens share one layout (WIZARD_LAYOUT): the question
 * column, and from `lg` the candidate preview beside it, scrolled to the part
 * being edited (phones see it on the review screen). Describe has no
 * preview (there's no job to show yet): one centred column
 * (SOLO_LAYOUT), about as wide as the question column. The footer spans the
 * screen's content area: Back on its left edge, Next on its right.
 *
 * Guards against losing work:
 *   - Drafting again over a draft the recruiter has worked on asks first; an
 *     unchanged description just carries on, without re-running the AI.
 *   - The job description remembers which answers it was written from
 *     (descriptionBasis), so the description screen knows when it's stale.
 *
 * Footer CTA is dark gray on every step (WizardFooter's rule) — the green
 * one is the plan page's post / pay. One progress indicator per screen: the
 * header stepper from `sm` up, the footer bar below it.
 *
 * Everything is auto-saved to localStorage, so a refresh, "Save & exit" or
 * the plan page's step links resume on the same screen.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  WizardFooter,
  WizardTypingProvider,
} from "@apna/design-system"
import { useDraftPersistence } from "@/hooks/onlyrounds/use-draft-persistence"
import { CandidateJobPreview } from "@/components/apnahire/post-job/candidate-job-preview"
import {
  JobPostingChrome,
  JobPostingStepMenu,
  type JobPostingStep,
} from "@/components/apnahire/post-job/job-posting-chrome"
import type { UpdateDraft } from "@/components/apnahire/post-job/job-fields"
import {
  SCREENS,
  STAGE_LABELS,
  screenIndex,
  type ScreenCtx,
  type ScreenId,
  type StageId,
} from "@/components/apnahire/post-job/wizard-screens"
import { EMPTY_JOB_DRAFT, locationLabel, mergeDraft, normalizeDraft } from "@/lib/apnahire/job-draft"
import { rememberPostIntent } from "@/lib/apnahire/post-intent"
import { PaymentSuccess } from "@/components/apnahire/payment-success"
import { SlotsFullDialog } from "@/components/apnahire/slots/slots-full-dialog"
import { JobSlotsControls, PrototypeSettings, openPrototypeSettings } from "@/components/apnahire/prototype-settings"
import { freeSlots, setJobSlots, todayLabel, useJobSlots } from "@/hooks/use-job-slots"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

interface FlowState {
  screen: ScreenId
  prompt: string
  /** The description the current draft came from — "" before any draft. */
  draftedPrompt: string
  draft: JobPostDraft
  aiFilled: (keyof JobPostDraft)[]
  /** Set when a screen was opened to edit something (review's "Edit") —
   *  Next goes back there instead of onward. */
  returnTo: ScreenId | null
  /** descriptionBasisOf(draft) when the description was last written. */
  descriptionBasis: string
}

const EMPTY_FLOW: FlowState = {
  screen: "describe",
  prompt: "",
  draftedPrompt: "",
  draft: EMPTY_JOB_DRAFT,
  aiFilled: [],
  returnTo: null,
  descriptionBasis: "",
}
export const JOB_DRAFT_STORAGE_KEY = "apnahire:job-draft"

const STAGES: StageId[] = ["job", "candidates", "setup"]

/** The question screens' content area: the question column + the candidate
 *  preview (from `lg`), together. The footer spans the same area, so Back
 *  sits on its left edge and Next on its right — under the preview on
 *  desktop. */
const CONTENT_WIDTH = "mx-auto w-full max-w-5xl"
const WIZARD_LAYOUT = `${CONTENT_WIDTH} grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]`
/** Describe (and DraftingState, which repeats it — it can't import from
 *  here): no preview yet, so one centred column, ~ the question column's
 *  width (656px at lg), so the text doesn't change width when the preview
 *  arrives on the first question. */
const SOLO_WIDTH = "mx-auto w-full max-w-2xl"

/** The answers a job description talks about. When these change, the
 *  description may be out of date. */
const descriptionBasisOf = (d: JobPostDraft) =>
  JSON.stringify([
    d.title,
    d.category,
    d.industry,
    d.locationType,
    d.city,
    d.area,
    d.education,
    d.english,
    d.experienceType,
    d.minExperienceYears,
    d.languages,
    d.skills,
  ])

async function callDraftApi(body: object): Promise<Partial<JobPostDraft>> {
  const res = await fetch("/api/apnahire/draft-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return res.ok ? res.json() : {}
}

const filledKeys = (result: Partial<JobPostDraft>) =>
  (Object.keys(result) as (keyof JobPostDraft)[]).filter((k) => {
    const v = result[k]
    return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)
  })

/** Screens from earlier versions of the flow, mapped to where they live now. */
const RENAMED: Record<string, ScreenId> = {
  welcome: "describe",
  "intro-job": "title",
  company: "title",
  "job-basics": "job-type",
  pay: "pay-type",
  requirements: "education",
  "intro-candidates": "education",
  "intro-setup": "interview",
  "interview-contact": "interview",
}

/** A saved draft from an older version of the flow (phase-based, or with
 *  screens that have since merged) still opens in the right place. */
function normalizeFlow(raw: Partial<FlowState> & { phase?: string }): FlowState {
  const resolve = (id: unknown): ScreenId | null => {
    if (typeof id !== "string") return null
    if (screenIndex(id as ScreenId) >= 0) return id as ScreenId
    return RENAMED[id] ?? null
  }
  const screen = resolve(raw.screen) ?? (raw.phase === "review" ? "review" : "describe")
  return {
    ...EMPTY_FLOW,
    ...raw,
    screen,
    draft: normalizeDraft(raw.draft),
    aiFilled: raw.aiFilled ?? [],
    returnTo: resolve(raw.returnTo),
    draftedPrompt: raw.draftedPrompt ?? raw.prompt ?? "",
    descriptionBasis: raw.descriptionBasis ?? "",
  }
}

/** Fill of each stage's progress segment. */
function stageProgress(screen: ScreenId): number[] {
  const current = SCREENS[screenIndex(screen)]?.stage ?? null
  const at = current ? STAGES.indexOf(current) : -1
  return STAGES.map((stage, i) => {
    if (i < at) return 1
    if (i > at) return 0
    const inStage = SCREENS.filter((s) => s.stage === stage)
    return (inStage.findIndex((s) => s.id === screen) + 1) / inStage.length
  })
}

export function PostJobFlow() {
  const router = useRouter()
  const {
    form: raw,
    setForm: setState,
    persistDraft,
    hydrated,
    pending,
    resume,
    discard,
  } = useDraftPersistence<FlowState>(JOB_DRAFT_STORAGE_KEY, EMPTY_FLOW, { ask: true })
  const state = React.useMemo(() => normalizeFlow(raw), [raw])

  const [direction, setDirection] = React.useState<"forward" | "back">("forward")
  const [error, setError] = React.useState<string | null>(null)
  const [attempts, setAttempts] = React.useState(0)
  const [draftResult, setDraftResult] = React.useState<Partial<JobPostDraft> | null>(null)
  /** "Draft my job" is running — on the Describe screen, not a screen of its own. */
  const [drafting, setDrafting] = React.useState(false)
  /** Posted into a subscription slot: show the job-live screen. */
  const [live, setLive] = React.useState<{ title: string; note: string } | null>(null)
  const [refining, setRefining] = React.useState(false)
  const [writing, setWriting] = React.useState(false)
  const [flashKey, setFlashKey] = React.useState(0)
  const [confirmRedraft, setConfirmRedraft] = React.useState(false)

  React.useEffect(() => {
    // Not while a saved draft waits for "continue or start new": the empty
    // form would overwrite it.
    if (hydrated && !pending) persistDraft(state)
  }, [hydrated, pending, state, persistDraft])

  // Coming back to finish (the plan step's links, a draft's "Finish
  // posting"): ?resume=1 continues without asking.
  React.useEffect(() => {
    if (pending && new URLSearchParams(window.location.search).has("resume")) resume()
  }, [pending, resume])
  // The plan page's step menu: &stage=… opens that step's first question.
  const stageJumped = React.useRef(false)
  React.useEffect(() => {
    if (!hydrated || pending || stageJumped.current) return
    stageJumped.current = true
    const to = new URLSearchParams(window.location.search).get("stage")
    const first = SCREENS.find((s) => s.stage === to)
    if (first) setState((s) => ({ ...s, screen: first.id, returnTo: null }))
  }, [hydrated, pending, setState])
  const askResume = !!pending && !(typeof window !== "undefined" && window.location.search.includes("resume"))

  // Arrived from "Post a job with AI calling" (?addon=ai-calling): the plan
  // step opens the order summary with the AI calling agent added.
  React.useEffect(() => {
    rememberPostIntent(window.location.search)
  }, [])

  // An id this version doesn't know (a draft saved by a newer build) falls
  // back to the first screen instead of crashing.
  const def = SCREENS[screenIndex(state.screen)] ?? SCREENS[0]

  const goTo = React.useCallback(
    (screen: ScreenId, dir: "forward" | "back" = "forward", returnTo: ScreenId | null = null) => {
      setDirection(dir)
      setError(null)
      setAttempts(0)
      setState((s) => ({ ...s, screen, returnTo }))
      window.scrollTo({ top: 0 })
    },
    [setState],
  )

  /** A recruiter edit: the field is theirs now, no longer "AI-filled". */
  const update: UpdateDraft = React.useCallback(
    (key, value) => {
      setError(null)
      setState((s) => ({
        ...s,
        draft: { ...normalizeDraft(s.draft), [key]: value },
        aiFilled: (s.aiFilled ?? []).filter((k) => k !== key),
      }))
    },
    [setState],
  )

  const applyPatch = (patch: Partial<JobPostDraft>) =>
    (Object.entries(patch) as [keyof JobPostDraft, never][]).forEach(([k, v]) => update(k, v))

  const runDraft = async () => {
    setConfirmRedraft(false)
    setDraftResult(null)
    setError(null)
    setDrafting(true)
    const result = await callDraftApi({ prompt: state.prompt.trim() }).catch(() => ({}))
    setDraftResult(result)
  }

  const hasAnswers = JSON.stringify(state.draft) !== JSON.stringify(EMPTY_JOB_DRAFT)

  const submitPrompt = () => {
    const prompt = state.prompt.trim()
    if (!prompt) {
      setError("Describe the job, or fill it in manually")
      setAttempts((n) => n + 1)
      return
    }
    // Same description as last time: nothing new to draft — carry on.
    if (prompt === state.draftedPrompt.trim() && hasAnswers) return goTo("title")
    // A new description over answers the recruiter has: ask before replacing.
    if (hasAnswers) return setConfirmRedraft(true)
    void runDraft()
  }

  // DraftingState calls this once it has finished revealing the result.
  const finishDrafting = React.useCallback(() => {
    const result = draftResult ?? {}
    // A joining fee the AI heard about still needs the recruiter's own answer.
    const draft = {
      ...mergeDraft(EMPTY_JOB_DRAFT, result),
      joiningFeeAnswered: false,
    }
    setState((s) => ({
      ...s,
      screen: "title",
      draft,
      draftedPrompt: s.prompt.trim(),
      aiFilled: filledKeys(result),
      returnTo: null,
      descriptionBasis: draft.description ? descriptionBasisOf(draft) : "",
    }))
    setDrafting(false)
    setDirection("forward")
    window.scrollTo({ top: 0 })
  }, [draftResult, setState])

  /** Resolves true when the AI changed something. */
  const refine = async (instruction: string): Promise<boolean> => {
    setRefining(true)
    try {
      const result = await callDraftApi({
        current: state.draft,
        instruction,
      }).catch(() => ({}))
      const next = mergeDraft(state.draft, result)
      const changed = (Object.keys(next) as (keyof JobPostDraft)[]).filter(
        (k) => JSON.stringify(state.draft[k]) !== JSON.stringify(next[k]),
      )
      if (!changed.length) return false
      setFlashKey((n) => n + 1)
      setState((s) => ({
        ...s,
        draft: next,
        aiFilled: Array.from(new Set([...(s.aiFilled ?? []), ...changed])),
      }))
      return true
    } finally {
      setRefining(false)
    }
  }

  // writeDescription reads the latest draft when it runs, not the one it
  // closed over (the description screen calls it from an effect).
  const draftRef = React.useRef(state.draft)
  React.useEffect(() => {
    draftRef.current = state.draft
  }, [state.draft])

  const writeDescription = React.useCallback(
    async (instruction?: string) => {
      setWriting(true)
      try {
        const d = draftRef.current
        const summary = [
          d.title,
          d.category,
          d.industry,
          d.area,
          d.city,
          d.education,
          d.experienceType,
          ...d.languages,
          instruction,
        ]
          .filter(Boolean)
          .join(", ")
        const result = await callDraftApi({ prompt: summary }).catch(() => ({}) as Partial<JobPostDraft>)
        if (result.description) {
          setFlashKey((n) => n + 1)
          setState((s) => ({
            ...s,
            draft: {
              ...normalizeDraft(s.draft),
              description: result.description!,
            },
            aiFilled: Array.from(new Set([...(s.aiFilled ?? []), "description" as const])),
            descriptionBasis: descriptionBasisOf(normalizeDraft(s.draft)),
          }))
        }
      } finally {
        setWriting(false)
      }
    },
    [setState],
  )

  // Subscribers post into a job slot at the end instead of buying a plan.
  const slots = useJobSlots()
  const [slotsFullOpen, setSlotsFullOpen] = React.useState(false)

  /** Post into a slot (freeing `expireId`'s first), then off to Jobs. */
  const postInSlot = (expireId?: string) => {
    if (!slots) return
    const title = state.draft.title.trim() || "Your job"
    const expired = expireId ? slots.jobs.find((j) => j.id === expireId) : undefined
    const kept = expired ? slots.jobs.filter((j) => j.id !== expired.id) : slots.jobs
    setJobSlots({
      ...slots,
      jobs: [
        ...kept,
        {
          id: `job-${Date.now().toString(36)}`,
          title,
          location: locationLabel(state.draft) ?? "",
          postedAt: todayLabel(),
          applied: 0,
        },
      ],
    })
    // The job-live screen, not a toast: nothing was paid, so no payment details.
    setLive({
      title,
      note: expired
        ? `${expired.title} expired to free its slot`
        : `${kept.length + 1} of ${slots.total} job slots in use`,
    })
    setSlotsFullOpen(false)
    try {
      window.localStorage.removeItem(JOB_DRAFT_STORAGE_KEY)
    } catch {
      // Storage blocked — nothing to clear.
    }
  }

  const next = () => {
    if (state.screen === "describe") return drafting ? undefined : submitPrompt()
    // Safety net: an answer can go missing after its screen was passed (a
    // later edit, a jump back). Review doesn't send you hunting — it opens
    // the first unfinished screen with what's missing.
    if (state.screen === "review") {
      const unfinished = SCREENS.find((s) => s.id !== "review" && s.check?.(state.draft))
      if (unfinished) {
        goTo(unfinished.id, "back")
        setError(unfinished.check!(state.draft))
        return
      }
    }
    const problem = def.check?.(state.draft)
    if (problem) {
      setError(problem)
      setAttempts((n) => n + 1)
      return
    }
    if (state.returnTo) return goTo(state.returnTo)
    if (state.screen === "review") {
      persistDraft(state)
      if (slots) {
        // A free slot posts now; with every slot taken, expire or upgrade.
        if (freeSlots(slots) > 0) return postInSlot()
        return setSlotsFullOpen(true)
      }
      router.push("/apnahire/jobs/new/plans")
      return
    }
    const following = SCREENS[screenIndex(state.screen) + 1]
    if (following) goTo(following.id)
  }

  const back = () => {
    if (state.returnTo) return goTo(state.returnTo, "back")
    const previous = SCREENS[screenIndex(state.screen) - 1]
    // The manual intro is only on the way in by hand; an AI draft's first
    // question goes back to its description.
    if (previous?.id === "manual-intro" && state.draftedPrompt) return goTo("describe", "back")
    if (previous) goTo(previous.id, "back")
  }

  const ctx: ScreenCtx = {
    draft: state.draft,
    update,
    aiFilled: state.aiFilled,
    prompt: state.prompt,
    setPrompt: (prompt) => {
      setError(null)
      setState((s) => ({ ...s, prompt }))
    },
    submitPrompt,
    drafting,
    draftResult,
    finishDrafting,
    edit: (id) => goTo(id, "forward", state.screen),
    applyPatch,
    refine,
    refining,
    writeDescription,
    writing,
    descriptionStale:
      !!state.draft.description.trim() &&
      !!state.descriptionBasis &&
      state.descriptionBasis !== descriptionBasisOf(state.draft),
  }

  const stage = def.stage
  /** Before the stages (describe, the manual intro): no job to preview yet,
   *  so one centred column. */
  const solo = stage === null
  const chromeStep: JobPostingStep = stage ?? "job"
  /** Back to the start of a stage already reached (stepper, phone step menu). */
  const jumpToStage = (to: StageId) => {
    const first = SCREENS.find((s) => s.stage === to)
    if (first && STAGES.indexOf(to) <= (stage ? STAGES.indexOf(stage) : -1)) goTo(first.id, "back")
  }
  const firstOfStage = stage !== null && SCREENS.find((s) => s.stage === stage)?.id === state.screen
  // Subscribers' last step commits: "Post job", the flow's one green CTA.
  const postsNow = state.screen === "review" && !state.returnTo && !!slots
  const nextLabel = state.returnTo
    ? "Done"
    : postsNow
      ? "Post job"
      : def.isEmpty?.(state.draft)
        ? "Skip"
        : (def.cta ?? "Next")

  // Wait for the saved draft before rendering, so a resumed flow doesn't
  // flash the first screen.
  if (!hydrated) return <div className="min-h-svh bg-background" />

  if (live) {
    return (
      <PaymentSuccess
        lines={[]}
        total={0}
        orderId=""
        note={live.note}
        postedJob={{ title: live.title, onViewJobs: () => router.push("/apnahire/jobs") }}
        onSearchCandidates={() => router.push("/apnahire/database/search-candidates")}
      />
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <JobPostingChrome
        current={chromeStep}
        stepperClassName="max-sm:hidden"
        onStepClick={(step) => step !== "plan" && jumpToStage(step)}
        onSaveExit={() => persistDraft(state)}
      />

      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className={solo ? SOLO_WIDTH : WIZARD_LAYOUT}>
          <div
            key={state.screen}
            className={cn(
              "flex min-w-0 flex-col gap-6 animate-in fade-in duration-300 fill-mode-both",
              direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4",
            )}
          >
            {/* The chapter marker, on the first question of each stage — in
                  place of a separate intro screen. */}
            {/* From sm the stepper shows progress: a quiet chapter marker on
                  each stage's first question, in place of an intro screen. */}
            {firstOfStage && stage && (
              <p className="text-xs font-semibold text-muted-foreground max-sm:hidden">
                Step {STAGES.indexOf(stage) + 1} of 3 · {STAGE_LABELS[stage]}
              </p>
            )}
            {/* Filled in by hand (no AI draft): each question types itself in. */}
            <WizardTypingProvider value={!state.draftedPrompt}>
              <def.Render {...ctx} />
            </WizardTypingProvider>
          </div>
          {/* From the first question on: on Describe there's no job yet,
                only an empty card that squeezed the description box. */}
          {!solo && (
            <aside className="hidden lg:block">
              <div className="sticky top-36 flex flex-col gap-3">
                {/* Prototype only: a silent click opens the hidden preview settings
                      (PrototypeSettings). Remove before production. */}
                <p onClick={openPrototypeSettings} className="text-center text-xs font-medium text-muted-foreground">
                  Candidate view
                </p>
                <CandidateJobPreview draft={state.draft} flashKey={flashKey} focus={def.preview} />
              </div>
            </aside>
          )}
        </div>
      </main>

      <WizardFooter
        progress={stage ? stageProgress(state.screen) : undefined}
        progressClassName="sm:hidden"
        innerClassName={solo ? SOLO_WIDTH : CONTENT_WIDTH}
        onBack={back}
        backLabel={state.returnTo ? "Cancel" : "Back"}
        loading={drafting}
        status={
          stage ? (
            // Phones: the step and its menu live in the bottom bar, by the
            // thumb. From sm the header stepper shows the step instead.
            <JobPostingStepMenu current={stage} onJump={(s) => s !== "plan" && jumpToStage(s)} />
          ) : undefined
        }
        secondary={
          state.screen === "describe" && !drafting ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                // By hand from here: back returns to the intro, titles type in.
                setState((s) => ({ ...s, draftedPrompt: "" }))
                goTo("manual-intro")
              }}
            >
              Fill manually
            </Button>
          ) : undefined
        }
        nextLabel={nextLabel}
        nextVariant={postsNow ? "default" : "emphasis"}
        onNext={next}
        error={error}
        errorKey={attempts}
      />

      {slots && slots.jobs.length > 0 && (
        <SlotsFullDialog
          open={slotsFullOpen}
          onOpenChange={setSlotsFullOpen}
          slots={slots}
          onExpireAndPost={(id) => postInSlot(id)}
          onUpgrade={() => {
            persistDraft(state)
            router.push("/apnahire/jobs/new/plans?upgrade=slot")
          }}
        />
      )}

      {/* Prototype: preview the subscription states that change how posting ends. */}
      <PrototypeSettings label="Preview job posting state">
        <JobSlotsControls />
      </PrototypeSettings>

      {/* A saved draft: continue it or start a new job. */}
      <AlertDialog open={askResume}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continue your draft?</AlertDialogTitle>
            <AlertDialogDescription>
              {normalizeFlow(pending ?? EMPTY_FLOW).draft.title.trim() || "Untitled job"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={discard}>Start new</AlertDialogCancel>
            <AlertDialogAction variant="emphasis" onClick={resume}>
              Continue draft
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmRedraft} onOpenChange={setConfirmRedraft}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Redraft the job?</AlertDialogTitle>
            <AlertDialogDescription>This replaces your current answers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setState((s) => ({ ...s, draftedPrompt: s.prompt.trim() }))
                goTo("title")
              }}
            >
              Keep answers
            </AlertDialogCancel>
            <AlertDialogAction variant="emphasis" onClick={() => void runDraft()}>
              Redraft
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

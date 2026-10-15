"use client"

/**
 * PostJobFlow — the "Create new job" wizard (stages 1–3; stage 4 is the
 * plan page at /apnahire/jobs/new/plans). One decision per screen, in the
 * order of SCREENS (wizard-screens.tsx):
 *
 *   describe ──"Draft my job"──▶ drafting ──▶ title → … → review → plans
 *       └──── "Fill it in myself" ────────▶ title
 *
 * The description is drafted once; every later screen arrives answered and
 * marked "From your description" until the recruiter changes it (aiFilled).
 * Every screen shares one layout (WIZARD_LAYOUT): the question column, and
 * from `lg` the candidate preview beside it, scrolled to the part being
 * edited (phones see it on the review screen). The footer spans that whole
 * content area: Back on its left edge, Next on its right.
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
} from "@apna/design-system"
import { useDraftPersistence } from "@/hooks/onlyrounds/use-draft-persistence"
import { CandidateJobPreview } from "@/components/apnahire/post-job/candidate-job-preview"
import { DraftingState } from "@/components/apnahire/post-job/drafting-state"
import { JobPostingChrome, type JobPostingStep } from "@/components/apnahire/post-job/job-posting-chrome"
import type { UpdateDraft } from "@/components/apnahire/post-job/job-fields"
import {
  SCREENS,
  STAGE_LABELS,
  screenIndex,
  type ScreenCtx,
  type ScreenId,
  type StageId,
} from "@/components/apnahire/post-job/wizard-screens"
import { EMPTY_JOB_DRAFT, mergeDraft, normalizeDraft } from "@/lib/apnahire/job-draft"
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

/** The one content area every screen uses: the question column + the
 *  candidate preview (from `lg`), together. The footer spans the same area,
 *  so Back sits on its left edge and Next on its right — under the preview
 *  on desktop. DraftingState repeats the grid (it can't import from here —
 *  this file imports it). */
const CONTENT_WIDTH = "mx-auto w-full max-w-5xl"
const WIZARD_LAYOUT = `${CONTENT_WIDTH} grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]`

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
  workplace: "location",
  "job-basics": "job-type",
  "pay-type": "pay",
  salary: "pay",
  perks: "pay",
  "intro-candidates": "requirements",
  "intro-setup": "interview-contact",
  interview: "interview-contact",
  contact: "interview-contact",
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
    // "drafting" is never saved (see the auto-save effect), so a reload
    // mid-draft resumes on the prompt, not a spinner that never ends.
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
  const { form: raw, setForm: setState, persistDraft, hydrated } = useDraftPersistence<FlowState>(
    JOB_DRAFT_STORAGE_KEY,
    EMPTY_FLOW,
  )
  const state = React.useMemo(() => normalizeFlow(raw), [raw])

  const [direction, setDirection] = React.useState<"forward" | "back">("forward")
  const [error, setError] = React.useState<string | null>(null)
  const [attempts, setAttempts] = React.useState(0)
  const [draftResult, setDraftResult] = React.useState<Partial<JobPostDraft> | null>(null)
  const [refining, setRefining] = React.useState(false)
  const [writing, setWriting] = React.useState(false)
  const [flashKey, setFlashKey] = React.useState(0)
  const [confirmRedraft, setConfirmRedraft] = React.useState(false)

  React.useEffect(() => {
    if (hydrated && state.screen !== "drafting") persistDraft(state)
  }, [hydrated, state, persistDraft])

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
    goTo("drafting")
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

  // The drafting screen calls this once it has finished revealing the result.
  const finishDrafting = React.useCallback(() => {
    const result = draftResult ?? {}
    // A joining fee the AI heard about still needs the recruiter's own answer.
    const draft = { ...mergeDraft(EMPTY_JOB_DRAFT, result), joiningFeeAnswered: false }
    setState((s) => ({
      ...s,
      screen: "title",
      draft,
      draftedPrompt: s.prompt.trim(),
      aiFilled: filledKeys(result),
      returnTo: null,
      descriptionBasis: draft.description ? descriptionBasisOf(draft) : "",
    }))
    setDirection("forward")
    window.scrollTo({ top: 0 })
  }, [draftResult, setState])

  /** Resolves true when the AI changed something. */
  const refine = async (instruction: string): Promise<boolean> => {
    setRefining(true)
    try {
      const result = await callDraftApi({ current: state.draft, instruction }).catch(() => ({}))
      const next = mergeDraft(state.draft, result)
      const changed = (Object.keys(next) as (keyof JobPostDraft)[]).filter(
        (k) => JSON.stringify(state.draft[k]) !== JSON.stringify(next[k]),
      )
      if (!changed.length) return false
      setFlashKey((n) => n + 1)
      setState((s) => ({ ...s, draft: next, aiFilled: Array.from(new Set([...(s.aiFilled ?? []), ...changed])) }))
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
        const summary = [d.title, d.category, d.industry, d.area, d.city, d.education, d.experienceType, ...d.languages, instruction]
          .filter(Boolean)
          .join(", ")
        const result = await callDraftApi({ prompt: summary }).catch(() => ({}) as Partial<JobPostDraft>)
        if (result.description) {
          setFlashKey((n) => n + 1)
          setState((s) => ({
            ...s,
            draft: { ...normalizeDraft(s.draft), description: result.description! },
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

  const next = () => {
    if (state.screen === "describe") return submitPrompt()
    const problem = def.check?.(state.draft)
    if (problem) {
      setError(problem)
      setAttempts((n) => n + 1)
      return
    }
    if (state.returnTo) return goTo(state.returnTo)
    if (state.screen === "review") {
      persistDraft(state)
      router.push("/apnahire/jobs/new/plans")
      return
    }
    const following = SCREENS.slice(screenIndex(state.screen) + 1).find((s) => s.id !== "drafting")
    if (following) goTo(following.id)
  }

  const back = () => {
    if (state.returnTo) return goTo(state.returnTo, "back")
    const previous = SCREENS.slice(0, screenIndex(state.screen))
      .reverse()
      .find((s) => s.id !== "drafting")
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
  const chromeStep: JobPostingStep = stage ?? "job"
  const firstOfStage = stage !== null && SCREENS.find((s) => s.stage === stage)?.id === state.screen
  const nextLabel = state.returnTo
    ? "Done"
    : def.isEmpty?.(state.draft)
      ? "Skip"
      : (def.cta ?? "Next")

  // Wait for the saved draft before rendering, so a resumed flow doesn't
  // flash the first screen.
  if (!hydrated) return <div className="min-h-svh bg-background" />

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <JobPostingChrome
        current={chromeStep}
        stepperClassName="max-sm:hidden"
        onStepClick={(step) => {
          if (step === "plan") return
          const first = SCREENS.find((s) => s.stage === step)
          if (first && STAGES.indexOf(step) <= (stage ? STAGES.indexOf(stage) : -1)) goTo(first.id, "back")
        }}
        onSaveExit={() => persistDraft(state)}
      />

      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {state.screen === "drafting" ? (
          <DraftingState prompt={state.prompt} result={draftResult} onComplete={finishDrafting} />
        ) : (
          <div className={WIZARD_LAYOUT}>
            <div
              key={state.screen}
              className={cn(
                "flex min-w-0 flex-col gap-6 animate-in fade-in duration-300 fill-mode-both",
                direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4",
              )}
            >
              {/* The chapter marker, on the first question of each stage — in
                  place of a separate intro screen. */}
              {firstOfStage && stage && (
                <p className="text-xs font-semibold text-muted-foreground">
                  Step {STAGES.indexOf(stage) + 1} of 3 · {STAGE_LABELS[stage]}
                </p>
              )}
              <def.Render {...ctx} />
            </div>
            {/* On every screen — on Describe it's the empty job the
                description will fill. */}
            <aside className="hidden lg:block">
              <div className="sticky top-36 flex flex-col gap-3">
                <p className="text-center text-xs font-medium text-muted-foreground">Candidate view</p>
                <CandidateJobPreview draft={state.draft} flashKey={flashKey} focus={def.preview} />
              </div>
            </aside>
          </div>
        )}
      </main>

      {state.screen !== "drafting" && (
        <WizardFooter
          progress={stage ? stageProgress(state.screen) : undefined}
          progressClassName="sm:hidden"
          innerClassName={CONTENT_WIDTH}
          onBack={back}
          backLabel={state.returnTo ? "Cancel" : "Back"}
          secondary={
            state.screen === "describe" ? (
              <Button type="button" variant="outline" size="lg" onClick={() => goTo("title")}>
                Fill manually
              </Button>
            ) : undefined
          }
          nextLabel={nextLabel}
          onNext={next}
          error={error}
          errorKey={attempts}
        />
      )}

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

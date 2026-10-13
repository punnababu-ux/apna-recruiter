"use client"

/**
 * PostJobFlow — the AI-first "Create new job" flow (steps 1–2; step 3 is the
 * plan page at /apnahire/jobs/new/plans).
 *
 *   describe ──prompt/voice──▶ drafting (live build) ──▶ review ──▶ plans
 *        └──── "Fill the form instead" ─────────────────────▶ review
 *
 * Tracks two things beyond the draft itself, because research showed
 * recruiters rubber-stamp AI output they aren't made to look at:
 *   - aiFilled: draft keys the AI wrote that the recruiter hasn't touched
 *     (shown as "AI-filled" until confirmed or edited)
 *   - confirmed: which of the five key fields the recruiter has checked.
 *     Editing a key field counts as confirming it; the AI changing one
 *     un-confirms it.
 *
 * All of it is auto-saved to localStorage, so a refresh or "Save & exit"
 * resumes exactly where the recruiter left off.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { useDraftPersistence } from "@/hooks/onlyrounds/use-draft-persistence"
import { DescribeStep } from "@/components/apnahire/post-job/describe-step"
import { DraftingState } from "@/components/apnahire/post-job/drafting-state"
import { ReviewStep } from "@/components/apnahire/post-job/review-step"
import { JobPostingChrome } from "@/components/apnahire/post-job/job-posting-chrome"
import type { UpdateDraft } from "@/components/apnahire/post-job/job-fields"
import {
  EMPTY_JOB_DRAFT,
  KEY_FIELDS,
  keyFieldOf,
  mergeDraft,
  missingRequired,
  normalizeDraft,
} from "@/lib/apnahire/job-draft"
import type { JobPostDraft, KeyField, RequiredField } from "@/types/apnahire-job"

type Phase = "describe" | "drafting" | "review"

interface FlowState {
  phase: Phase
  prompt: string
  draft: JobPostDraft
  askFields: RequiredField[]
  aiFilled: (keyof JobPostDraft)[]
  confirmed: KeyField[]
}

const EMPTY_FLOW: FlowState = {
  phase: "describe",
  prompt: "",
  draft: EMPTY_JOB_DRAFT,
  askFields: [],
  aiFilled: [],
  confirmed: [],
}
export const JOB_DRAFT_STORAGE_KEY = "apnahire:job-draft"

async function callDraftApi(body: object): Promise<Partial<JobPostDraft>> {
  const res = await fetch("/api/apnahire/draft-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return res.ok ? res.json() : {}
}

/** Which fields an AI edit actually changed — used to flash them. */
function changedKeys(before: JobPostDraft, after: JobPostDraft): (keyof JobPostDraft)[] {
  return (Object.keys(after) as (keyof JobPostDraft)[]).filter(
    (k) => JSON.stringify(before[k]) !== JSON.stringify(after[k]),
  )
}

const keyFieldsIn = (keys: (keyof JobPostDraft)[]) =>
  Array.from(new Set(keys.map(keyFieldOf).filter(Boolean))) as KeyField[]

export interface AiFlash {
  keys: (keyof JobPostDraft)[]
  /** Bumped on every AI edit so the highlight replays. */
  nonce: number
}

export function PostJobFlow() {
  const router = useRouter()
  const { form: rawState, setForm: setState, persistDraft, hydrated } = useDraftPersistence<FlowState>(
    JOB_DRAFT_STORAGE_KEY,
    EMPTY_FLOW,
  )
  // Drafts saved by an older version of the flow lack newer fields.
  const state: FlowState = React.useMemo(
    () => ({
      ...EMPTY_FLOW,
      ...rawState,
      draft: normalizeDraft(rawState.draft),
      aiFilled: rawState.aiFilled ?? [],
      confirmed: rawState.confirmed ?? [],
    }),
    [rawState],
  )

  const [refining, setRefining] = React.useState(false)
  const [writingDescription, setWritingDescription] = React.useState(false)
  /** The AI's answer while the drafting screen plays out; null = still working. */
  const [draftResult, setDraftResult] = React.useState<Partial<JobPostDraft> | null>(null)
  const [flash, setFlash] = React.useState<AiFlash | null>(null)

  const phase = state.phase

  // "drafting" is never saved, so a reload mid-draft resumes on the prompt
  // rather than a spinner that will never resolve.
  React.useEffect(() => {
    if (hydrated && state.phase !== "drafting") persistDraft(state)
  }, [hydrated, state, persistDraft])

  const flashChanges = (keys: (keyof JobPostDraft)[]) => {
    if (keys.length) setFlash((f) => ({ keys, nonce: (f?.nonce ?? 0) + 1 }))
  }

  /** A recruiter edit: the field is theirs now — no longer "AI-filled", and
   *  a key field they changed counts as checked. */
  const update: UpdateDraft = React.useCallback(
    (key, value) =>
      setState((s) => {
        const kf = keyFieldOf(key)
        const confirmed = s.confirmed ?? []
        return {
          ...s,
          draft: { ...normalizeDraft(s.draft), [key]: value },
          aiFilled: (s.aiFilled ?? []).filter((k) => k !== key),
          confirmed: kf && !confirmed.includes(kf) ? [...confirmed, kf] : confirmed,
        }
      }),
    [setState],
  )

  const applyRecruiterPatch = (patch: Partial<JobPostDraft>) =>
    (Object.entries(patch) as [keyof JobPostDraft, never][]).forEach(([k, v]) => update(k, v))

  const confirm = (field: KeyField) =>
    setState((s) => ({ ...s, confirmed: Array.from(new Set([...(s.confirmed ?? []), field])) }))

  const draftFromPrompt = async () => {
    const prompt = state.prompt.trim()
    if (!prompt) return
    setDraftResult(null)
    setState((s) => ({ ...s, phase: "drafting" }))
    const result = await callDraftApi({ prompt }).catch(() => ({}))
    setDraftResult(result)
  }

  // Called by the drafting screen once it has finished revealing the result.
  const finishDrafting = React.useCallback(() => {
    const result = draftResult ?? {}
    const draft = mergeDraft(EMPTY_JOB_DRAFT, result)
    const aiFilled = (Object.keys(result) as (keyof JobPostDraft)[]).filter((k) => {
      const v = result[k]
      return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)
    })
    setFlash(null)
    setState((s) => ({ ...s, phase: "review", draft, askFields: missingRequired(draft), aiFilled, confirmed: [] }))
  }, [draftResult, setState])

  const fillManually = () =>
    setState((s) => {
      const draft = normalizeDraft(s.draft)
      return { ...s, phase: "review", draft, askFields: missingRequired(draft) }
    })

  /** Resolves true when the AI changed something. Feedback is shown inline
   *  in the review footer (a toast would sit on top of Continue). */
  const refine = async (instruction: string): Promise<boolean> => {
    setRefining(true)
    try {
      const result = await callDraftApi({ current: state.draft, instruction }).catch(() => ({}))
      if (Object.keys(result).length === 0) return false
      const next = mergeDraft(state.draft, result)
      const changed = changedKeys(state.draft, next)
      if (changed.length === 0) return false
      flashChanges(changed)
      // The AI changed these, so they need the recruiter's eyes again.
      const touchedKeyFields = keyFieldsIn(changed)
      setState((s) => ({
        ...s,
        draft: next,
        aiFilled: Array.from(new Set([...(s.aiFilled ?? []), ...changed])),
        confirmed: (s.confirmed ?? []).filter((f) => !touchedKeyFields.includes(f)),
      }))
      return true
    } finally {
      setRefining(false)
    }
  }

  const writeDescription = async () => {
    setWritingDescription(true)
    try {
      const d = state.draft
      const summary = [d.title, d.industry, d.area, d.city, d.education, d.experienceType, ...d.languages]
        .filter(Boolean)
        .join(", ")
      const result = await callDraftApi({ prompt: summary })
      if (result.description) {
        flashChanges(["description"])
        setState((s) => ({
          ...s,
          draft: { ...normalizeDraft(s.draft), description: result.description! },
          aiFilled: Array.from(new Set([...(s.aiFilled ?? []), "description" as const])),
        }))
      }
    } finally {
      setWritingDescription(false)
    }
  }

  const goToStep = (step: "describe" | "review" | "plan") => {
    if (step === "describe") setState((s) => ({ ...s, phase: "describe" }))
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted">
      <JobPostingChrome
        current={phase === "review" ? "review" : "describe"}
        onStepClick={phase === "review" ? goToStep : undefined}
        onSaveExit={() => persistDraft(state)}
      />
      <main className="flex-1 px-4 py-6 sm:px-6">
        {phase === "review" ? (
          <ReviewStep
            draft={state.draft}
            update={update}
            askFields={state.askFields}
            aiFilled={state.aiFilled}
            confirmed={state.confirmed.filter((f) => KEY_FIELDS.includes(f))}
            onConfirm={confirm}
            onApplyFix={applyRecruiterPatch}
            onRefine={refine}
            onWriteDescription={writeDescription}
            refining={refining}
            writingDescription={writingDescription}
            flash={flash}
            onContinue={() => {
              persistDraft(state)
              router.push("/apnahire/jobs/new/plans")
            }}
          />
        ) : phase === "drafting" ? (
          <DraftingState prompt={state.prompt} result={draftResult} onComplete={finishDrafting} />
        ) : (
          <DescribeStep
            prompt={state.prompt}
            onPromptChange={(prompt) => setState((s) => ({ ...s, prompt }))}
            onSubmit={draftFromPrompt}
            onFillManually={fillManually}
          />
        )}
      </main>
    </div>
  )
}

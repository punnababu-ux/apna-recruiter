"use client"

/**
 * DraftingState — the wait between "Draft my job" and the review screen,
 * built to show work rather than hide it. The recruiter's own words stay on
 * screen; each stage ticks off with the values the AI actually pulled out
 * ("Koramangala, Bengaluru", "₹15,000 – ₹20,000"); and the candidate
 * preview assembles alongside. Fields the AI couldn't find are flagged as
 * "you'll add this next", so the gaps on the review screen aren't a surprise.
 *
 * Pacing: stage 1 spins until the AI responds (that part is real), then the
 * remaining stages reveal at a fixed beat so each result is readable.
 */

import * as React from "react"
import { Badge, Check, Sparkles, Spinner } from "@apna/design-system"
import { CandidateJobPreview } from "@/components/apnahire/post-job/candidate-job-preview"
import {
  EDUCATION_LABELS,
  EMPTY_JOB_DRAFT,
  ENGLISH_LABELS,
  JOB_TYPE_LABELS,
  experienceLabel,
  locationLabel,
  mergeDraft,
  salaryLabel,
} from "@/lib/apnahire/job-draft"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

type Patch = Partial<JobPostDraft>

interface Stage {
  label: string
  /** Fields this stage contributes to the preview. */
  keys: (keyof JobPostDraft)[]
  /** What the AI found, as chips; null entries become "add this next". */
  values: (d: JobPostDraft, raw: Patch) => { label: string; missing?: boolean }[]
}

const found = (label: string | null | undefined, missingLabel: string) =>
  label ? { label } : { label: missingLabel, missing: true }

const STAGES: Stage[] = [
  {
    label: "Understanding the role",
    keys: ["title", "category", "industry", "jobType", "nightShift", "skills"],
    values: (d) => [
      found(d.title, "Job title"),
      ...(d.category ? [{ label: d.category }] : []),
      found(d.industry, "Industry"),
      { label: JOB_TYPE_LABELS[d.jobType || "full_time"] },
    ],
  },
  {
    label: "Setting location & pay",
    keys: ["locationType", "city", "area", "payType", "salaryMin", "salaryMax", "incentive", "joiningFee"],
    values: (d) => [found(locationLabel(d), "Location"), found(salaryLabel(d) && `${salaryLabel(d)} / month`, "Salary")],
  },
  {
    label: "Working out who can apply",
    keys: ["education", "english", "experienceType", "minExperienceYears", "languages", "assets", "ageMin", "ageMax"],
    values: (d) => [
      found(d.education && EDUCATION_LABELS[d.education], "Education"),
      found(d.english && ENGLISH_LABELS[d.english], "English level"),
      found(experienceLabel(d), "Experience"),
      ...d.languages.map((l) => ({ label: l })),
    ],
  },
  {
    label: "Writing the job description",
    keys: ["description"],
    values: (d) => [found(d.description.trim() ? "Description written" : null, "Description")],
  },
]

const FIRST_STAGE_MIN_MS = 700
const STAGE_BEAT_MS = 650
const HANDOFF_MS = 700

export function DraftingState({
  prompt,
  result,
  onComplete,
}: {
  prompt: string
  /** The AI's answer, or null while it's still working. */
  result: Patch | null
  onComplete: () => void
}) {
  const [done, setDone] = React.useState(0)
  const [minElapsed, setMinElapsed] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setMinElapsed(true), FIRST_STAGE_MIN_MS)
    return () => window.clearTimeout(t)
  }, [])

  // Once the AI has answered, tick the stages off one beat at a time, then
  // hand over to the review screen.
  React.useEffect(() => {
    if (!result || !minElapsed) return
    if (done < STAGES.length) {
      const t = window.setTimeout(() => setDone((n) => n + 1), done === 0 ? 0 : STAGE_BEAT_MS)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(onComplete, HANDOFF_MS)
    return () => window.clearTimeout(t)
  }, [result, minElapsed, done, onComplete])

  const full = mergeDraft(EMPTY_JOB_DRAFT, result ?? {})
  // The preview only shows what's been "revealed" so far.
  const revealedKeys = new Set(STAGES.slice(0, done).flatMap((s) => s.keys))
  const revealed = mergeDraft(
    EMPTY_JOB_DRAFT,
    Object.fromEntries(Object.entries(result ?? {}).filter(([k]) => revealedKeys.has(k as keyof JobPostDraft))) as Patch
  )

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-8 lg:flex-row lg:items-start" aria-live="polite">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex max-w-xl flex-col gap-2 self-end rounded-2xl rounded-br-sm bg-card px-4 py-3 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="text-xs font-medium text-muted-foreground">You asked for</span>
          <p className="text-sm text-foreground">{prompt}</p>
        </div>

        <div className="flex items-center gap-3 animate-in fade-in duration-500">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Sparkles className={cn("size-5", done < STAGES.length && "animate-pulse")} aria-hidden />
          </span>
          <div className="flex flex-col">
            <h1 className="text-h4 text-foreground">
              {done < STAGES.length ? "Drafting your job…" : "Your draft is ready"}
            </h1>
            <p className="text-body-sm text-muted-foreground">
              {done < STAGES.length ? "Pulling out the details from what you said." : "Opening it for your review."}
            </p>
          </div>
        </div>

        <ol className="flex flex-col gap-4">
          {STAGES.map((stage, i) => {
            const isDone = i < done
            const isActive = i === done
            return (
              <li
                key={stage.label}
                className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500"
                style={{ animationDelay: `${150 + i * 90}ms` }}
              >
                <div className={cn("flex items-center gap-3 text-sm", isDone || isActive ? "text-foreground" : "text-muted-foreground")}>
                  <span className="flex size-5 items-center justify-center">
                    {isDone ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground animate-in zoom-in-50 duration-300">
                        <Check className="size-3" aria-hidden />
                      </span>
                    ) : isActive ? (
                      <Spinner />
                    ) : (
                      <span aria-hidden className="size-4 rounded-full border border-border" />
                    )}
                  </span>
                  <span className={cn(isDone && "font-medium")}>{stage.label}</span>
                </div>
                {isDone && (
                  <div className="flex flex-wrap gap-1.5 pl-8">
                    {stage.values(full, result ?? {}).map((v, j) => (
                      <Badge
                        key={v.label}
                        variant={v.missing ? "outline" : "secondary"}
                        className={cn(
                          "animate-in fade-in zoom-in-95 fill-mode-both duration-300",
                          v.missing && "border-dashed text-muted-foreground"
                        )}
                        style={{ animationDelay: `${j * 70}ms` }}
                      >
                        {v.missing ? `${v.label} — you'll add this next` : v.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-3 animate-in fade-in slide-in-from-right-4 fill-mode-both duration-700 lg:w-80">
        <p className="text-center text-xs font-medium text-muted-foreground">How candidates will see your job</p>
        <CandidateJobPreview draft={revealed} loading={done < STAGES.length} />
      </aside>
    </div>
  )
}

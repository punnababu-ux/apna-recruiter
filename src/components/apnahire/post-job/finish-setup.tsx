"use client"

/**
 * FinishSetup — PREVIEW ONLY (?flow=essential). The questions a job can go
 * live without, asked on the job-live screen while the first candidates are
 * still on their way: who they call, walk-in, questions for applicants,
 * perks. Each row shows the default that holds if it is never answered; a tap
 * opens the same question the posting flow asks, in a pop-up.
 *
 * shortcut: answers stay in this component, wire them to the posted job
 * (and its page) when the flow ships.
 */

import * as React from "react"
import { Button, Check, ChevronRight, DoorOpen, Gift, ListChecks, MapPin, Phone, Users } from "@apna/design-system"
import { PlanPopup, PopupBody, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { DistanceField, SCREENS, type ScreenCtx, type ScreenId } from "@/components/apnahire/post-job/wizard-screens"
import { useClientSnapshot } from "@/hooks/use-client-snapshot"
import { distanceText, genderAgeLabel, normalizeDraft } from "@/lib/apnahire/job-draft"
import type { JobPostDraft } from "@/types/apnahire-job"

/** Distance has no screen of its own: essential never asks it while posting. */
const Distance = (ctx: ScreenCtx) => <DistanceField ctx={ctx} />

const ROWS: { id: ScreenId | "distance"; label: string; icon: React.ReactNode; value: (d: JobPostDraft) => string }[] = [
  {
    id: "contact",
    label: "Who candidates call",
    icon: <Phone aria-hidden />,
    value: (d) =>
      d.contact === "self" ? "You" : d.contact === "other" ? d.otherRecruiter.name || "A teammate" : "You call them first",
  },
  { id: "interview", label: "Walk-in interview", icon: <DoorOpen aria-hidden />, value: (d) => (d.walkIn ? "Yes" : "No") },
  {
    id: "screening",
    label: "Questions for applicants",
    icon: <ListChecks aria-hidden />,
    value: (d) => (d.screeningQuestions.length ? `${d.screeningQuestions.length} added` : "None"),
  },
  { id: "distance", label: "How far candidates can live", icon: <MapPin aria-hidden />, value: distanceText },
  {
    // Gender and age shut candidates out, so they are never asked before posting.
    id: "preferences",
    label: "Gender, age and other preferences",
    icon: <Users aria-hidden />,
    value: genderAgeLabel,
  },
  { id: "perks", label: "Perks", icon: <Gift aria-hidden />, value: (d) => d.perks.join(", ") || "None" },
]

const noop = () => {}

type RowId = ScreenId | "distance"
type Saved = { draft: Partial<JobPostDraft>; done: RowId[] }
/** Prototype: the last posted job's Finish setup answers. In production
 *  they are saved on the job. */
const STORAGE_KEY = "apnahire:finish-setup"
function readSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Saved) : null
  } catch {
    return null
  }
}
function writeSaved(saved: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // Storage blocked: the answers last for this visit only.
  }
}

/** The last posted job's Finish setup, wherever the recruiter comes back to
 *  it (the Jobs page). Gone once every row is answered. */
export function SavedFinishSetup() {
  const saved = useClientSnapshot(readSaved, null)
  if (!saved || saved.done.length >= ROWS.length) return null
  return <FinishSetup draft={saved.draft} initialDone={saved.done} jobTitle={saved.draft.title} />
}

export function FinishSetup({
  draft: initial,
  initialDone = [],
  jobTitle,
}: {
  draft: Partial<JobPostDraft>
  initialDone?: RowId[]
  /** Names the job when the list is shown away from its "job is live" screen. */
  jobTitle?: string
}) {
  const [draft, setDraft] = React.useState(() => normalizeDraft(initial))
  const [done, setDone] = React.useState<RowId[]>(initialDone)
  const [open, setOpen] = React.useState<ScreenId | "distance" | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  // Saved as soon as the job is live, so the list is still there on the Jobs page.
  React.useEffect(() => {
    if (!readSaved() || readSaved()?.draft.title !== initial.title) writeSaved({ draft: initial, done: initialDone })
    // Once, for the job this list was opened for.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const screen = open === "distance" ? { Render: Distance, check: undefined } : SCREENS.find((s) => s.id === open)
  const ctx: ScreenCtx = {
    draft,
    update: (key, value) => {
      setError(null)
      setDraft((d) => ({ ...d, [key]: value }))
    },
    aiFilled: [],
    prompt: "",
    setPrompt: noop,
    submitPrompt: noop,
    drafting: false,
    draftResult: null,
    finishDrafting: noop,
    edit: noop,
    applyPatch: noop,
    refine: async () => false,
    refining: false,
    writeDescription: async () => {},
    writing: false,
    stopWriting: noop,
    descriptionStale: false,
    part: "perks",
  }
  const save = () => {
    const problem = screen?.check?.(draft)
    if (problem) return setError(problem)
    if (open) {
      const next = Array.from(new Set([...done, open]))
      setDone(next)
      writeSaved({ draft, done: next })
    }
    setOpen(null)
  }
  return (
    <div className="flex w-full flex-col gap-2 rounded-card-nested border border-border bg-muted/40 p-3 sm:p-4">
      <div className="flex flex-col gap-1 px-1">
        <p className="text-sm font-semibold text-foreground">Finish setup{jobTitle ? ` · ${jobTitle}` : ""}</p>
        <p className="text-xs text-muted-foreground">Optional. Your job works without it.</p>
      </div>
      <ul className="flex flex-col">
        {ROWS.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              className="ink press-subtle relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-1 py-2 text-left transition-interactive hover:bg-muted [&_svg]:size-5 [&_svg]:shrink-0"
              onClick={() => {
                setError(null)
                setOpen(row.id)
              }}
            >
              <span className={done.includes(row.id) ? "text-success" : "text-muted-foreground"}>
                {done.includes(row.id) ? <Check aria-hidden /> : row.icon}
              </span>
              <span className="min-w-0 flex-1 text-sm text-foreground">{row.label}</span>
              <span className="max-w-32 truncate text-sm text-muted-foreground">{row.value(draft)}</span>
              <ChevronRight className="text-muted-foreground" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <PlanPopup open={!!screen} onOpenChange={(o) => !o && setOpen(null)}>
        <PopupHeader title="Finish setup" description={ROWS.find((r) => r.id === open)?.label} />
        <PopupBody>
          {screen && <screen.Render {...ctx} />}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </PopupBody>
        <PopupFooter>
          <Button type="button" size="lg" onClick={save}>
            Done
          </Button>
        </PopupFooter>
      </PlanPopup>
    </div>
  )
}

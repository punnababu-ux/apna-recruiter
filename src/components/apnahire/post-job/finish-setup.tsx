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
import { Button, Check, ChevronRight, DoorOpen, Gift, ListChecks, MapPin, Navigation, Sheet, SheetPanel, SheetPanelHeader, cn, Phone, Users } from "@apna/design-system"
import { PlanPopup, PopupBody, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { DistanceField, SCREENS, type ScreenCtx, type ScreenId } from "@/components/apnahire/post-job/wizard-screens"
import { distanceText, genderAgeLabel, locationLabel, normalizeDraft } from "@/lib/apnahire/job-draft"
import type { JobPostDraft } from "@/types/apnahire-job"

/** Distance has no screen of its own: essential never asks it while posting. */
const Distance = (ctx: ScreenCtx) => <DistanceField ctx={ctx} />

// Each row shows its answer; the tick says it was saved. Two rows hold too
// much for the row and show a count: preferences ("5 set") and perks ("4 perks").
const count = (n: number, one: string, many: string, none: string) => (n ? `${n} ${n === 1 ? one : many}` : none)
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
  // The most edited field on live (data bank §2d): one tap to correct it.
  { id: "location", label: "Job location", icon: <MapPin aria-hidden />, value: (d) => locationLabel(d) ?? "Not set" },
  { id: "distance", label: "How far candidates can live", icon: <Navigation aria-hidden />, value: distanceText },
  // Gender and age shut candidates out, so they are never asked before posting.
  {
    id: "preferences",
    label: "Gender, age and other preferences",
    icon: <Users aria-hidden />,
    // Languages, skills, must-haves, degrees, gender, age: a count, not a list.
    value: (d) =>
      count(
        d.languages.length + d.skills.length + d.assets.length + d.degrees.length + (genderAgeLabel(d) === "Anyone" ? 0 : 1),
        "set",
        "set",
        "Anyone",
      ),
  },
  { id: "perks", label: "Perks", icon: <Gift aria-hidden />, value: (d) => count(d.perks.length, "perk", "perks", "None") },
]

const noop = () => {}

type RowId = ScreenId | "distance"
type Saved = { draft: Partial<JobPostDraft>; done: RowId[] }
/** Prototype: the last posted job's Finish setup answers. In production
 *  they are saved on the job. */
const STORAGE_KEY = "apnahire:finish-setup"
const EVENT = "apnahire:finish-setup"
let cachedRaw: string | null | undefined
let cached: Saved | null = null
function readSaved(): Saved | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Storage blocked: nothing saved.
  }
  // The same object while the text is the same, so readers do not re-render.
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cached = raw ? (JSON.parse(raw) as Saved) : null
    } catch {
      cached = null
    }
  }
  return cached
}
function writeSaved(saved: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // Storage blocked: the answers last for this visit only.
  }
  window.dispatchEvent(new Event(EVENT))
}
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** The last posted job's Finish setup: its answers and how many rows are
 *  still open. Null when no job was posted through the essential flow. */
export function useSavedFinishSetup(): { draft: Partial<JobPostDraft>; left: number } | null {
  const saved = React.useSyncExternalStore(subscribe, readSaved, () => null)
  return React.useMemo(
    () => (saved ? { draft: saved.draft, left: ROWS.filter((r) => !saved.done.includes(r.id)).length } : null),
    [saved],
  )
}

/** Finish setup as a side panel, opened from the job's card on the Jobs
 *  page (never a block on the dashboard itself; Punna, 2026-11-11). */
export function FinishSetupPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const saved = React.useSyncExternalStore(subscribe, readSaved, () => null)
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPanel>
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto bg-card py-4">
          <SheetPanelHeader title="Finish setup" />
          <p className="px-4 text-sm text-muted-foreground sm:px-5">
            {saved?.draft.title ? `${saved.draft.title} · ` : ""}Optional. Your job works without it.
          </p>
          <div className="px-3 sm:px-4">
            {saved && <FinishSetup draft={saved.draft} initialDone={saved.done} plain />}
          </div>
        </div>
      </SheetPanel>
    </Sheet>
  )
}

/** A job's settings in job details ("About this job"): the same rows and
 *  step-through pop-up. Prototype: the last posted job shows its saved
 *  answers; any other job shows sample answers and saves nothing. */
export function JobSetup({ job }: { job: { title: string; city: string; area: string } }) {
  const saved = React.useSyncExternalStore(subscribe, readSaved, () => null)
  const own = saved?.draft.title === job.title ? saved : null
  return (
    <FinishSetup
      key={own ? "saved" : job.title}
      draft={own ? own.draft : { title: job.title, city: job.city, area: job.area }}
      initialDone={own ? own.done : []}
      persist={!!own}
      title="Job settings"
      plain
    />
  )
}

export function FinishSetup({
  draft: initial,
  initialDone = [],
  plain,
  persist = true,
  title = "Finish setup",
}: {
  draft: Partial<JobPostDraft>
  initialDone?: RowId[]
  /** Inside a panel that has its own title: the rows only, no frame. */
  plain?: boolean
  /** False: a sample job, nothing is saved. */
  persist?: boolean
  /** The pop-up's title. Job details calls these "Job settings". */
  title?: string
}) {
  const [draft, setDraft] = React.useState(() => normalizeDraft(initial))
  // What was last saved: Skip and close drop the open row's unsaved edits.
  const [kept, setKept] = React.useState(draft)
  const [done, setDone] = React.useState<RowId[]>(initialDone)
  const [open, setOpen] = React.useState<ScreenId | "distance" | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  // Saved as soon as the job is live, so the list is still there on the Jobs page.
  React.useEffect(() => {
    if (persist && (!readSaved() || readSaved()?.draft.title !== initial.title)) writeSaved({ draft: initial, done: initialDone })
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
  // The pop-up steps through the rows: after this one, the next row that is
  // not saved yet (later rows first, then earlier ones). None left: it closes.
  const at = ROWS.findIndex((r) => r.id === open)
  const nextRow = (saved: RowId[]) =>
    [...ROWS.slice(at + 1), ...ROWS.slice(0, Math.max(at, 0))].find((r) => !saved.includes(r.id))?.id ?? null
  const upcoming = nextRow(open ? [...done, open] : done)
  const save = () => {
    const problem = screen?.check?.(draft)
    if (problem) return setError(problem)
    if (!open) return
    const saved = Array.from(new Set([...done, open]))
    setDone(saved)
    setKept(draft)
    if (persist) writeSaved({ draft, done: saved })
    setOpen(nextRow(saved))
  }
  const leave = (to: RowId | null) => {
    setError(null)
    setDraft(kept)
    setOpen(to)
  }
  return (
    <div className={cn("flex w-full flex-col gap-2", !plain && "rounded-card-nested border border-border bg-muted/40 p-3 sm:p-4")}>
      {!plain && (
        <div className="flex flex-col gap-1 px-1">
          <p className="text-sm font-semibold text-foreground">Finish setup</p>
          <p className="text-xs text-muted-foreground">Optional. Your job works without it.</p>
        </div>
      )}
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
              <span className="max-w-32 truncate text-sm text-muted-foreground">
                {row.value(draft)}
              </span>
              <ChevronRight className="text-muted-foreground" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <PlanPopup open={!!screen} onOpenChange={(o) => !o && leave(null)}>
        <PopupHeader title={title} description={at < 0 ? undefined : `${ROWS[at].label} · ${at + 1} of ${ROWS.length}`} />
        <PopupBody>
          {screen && <screen.Render {...ctx} />}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </PopupBody>
        <PopupFooter>
          {upcoming && (
            <Button type="button" size="lg" variant="outline" onClick={() => leave(upcoming)}>
              Skip
            </Button>
          )}
          <Button type="button" size="lg" onClick={save}>
            {upcoming ? "Save and next" : "Done"}
          </Button>
        </PopupFooter>
      </PlanPopup>
    </div>
  )
}

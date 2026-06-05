"use client"

/**
 * CandidateDrawer — right-side panel showing the full AI evaluation of a
 * single candidate. Opens from a CandidateCard click; closable via X,
 * Escape, or backdrop click.
 *
 * Sections (top → bottom):
 *   - Sticky header (avatar · name · score gauge · contact · prev/next · close)
 *   - Primary action bar (Re-take · Reject · Move to next round)
 *   - Drawer tabs (AI screening insights · Notes)
 *   - Scrollable content per tab
 *
 * The "AI screening insights" tab is the meat:
 *   - Call player stub (placeholder)
 *   - Insight chip cloud (with disabled play-to-timestamp affordance)
 *   - Recommended Next Steps (prose AI suggestion)
 *   - Screening criteria analysis (Must / Preferred / Red flag)
 *   - English communication detailed analysis (CEFR breakdown)
 *
 * Drawer is rendered to a portal via the shadcn Sheet primitive. Width
 * fixed at 480px on lg+, full-screen on mobile.
 */

import {
  AtSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Pause,
  Pencil,
  Phone,
  Play,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react"
import * as React from "react"

import { ScoreGauge, type Verdict } from "@/components/onlyrounds/score-gauge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ── Data types ────────────────────────────────────────────────────────────

export type CriterionScore = {
  id: string
  text: string
  /** 0–10 score from the AI evaluation. */
  score: number
  reasoning: string
  /** When true, the criterion was a dealbreaker (must-have or red-flag). */
  dealbreaker?: boolean
}

export type CriteriaGroup = {
  id: string
  label: string
  description?: string
  items: CriterionScore[]
}

export type CefrDimension = {
  label: string
  score: number
  description: string
}

export type CefrAnalysis = {
  overall: number
  level: string
  recommendedFor: string
  dimensions: CefrDimension[]
  areasOfImprovement: string[]
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  description?: string
}

export type EducationEntry = {
  degree: string
  institution: string
  period: string
}

export type ProfileSummary = {
  about?: string
  location?: string
  experienceYears?: number
  currentRole?: string
  experience?: ExperienceEntry[]
  education?: EducationEntry[]
  skills?: string[]
  resumeUrl?: string
}

export type DrawerCandidate = {
  id: string
  name: string
  role?: string
  company?: string
  email?: string
  phone?: string
  score: number
  verdict: Verdict
  cefrLevel?: string
  insights: { tone: "ok" | "miss"; label: string }[]
  recommendations: string[]
  criteriaGroups: CriteriaGroup[]
  cefr?: CefrAnalysis
  notes?: string
  profile?: ProfileSummary
}

// ── Drawer ────────────────────────────────────────────────────────────────

export function CandidateDrawer({
  open,
  onOpenChange,
  candidate,
  roundName = "Screening",
  onMoveToNextRound,
  onReject,
  onReTake,
  onAddNote,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidate: DrawerCandidate | null
  roundName?: string
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}) {
  // Keyboard navigation: ← / → for prev/next when the drawer is open
  // and the focused element is not a text input. Avoids hijacking typing
  // inside the Notes textarea or any future search input.
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const inEditable =
        t?.tagName === "INPUT" ||
        t?.tagName === "TEXTAREA" ||
        t?.isContentEditable
      if (inEditable) return
      if (e.key === "ArrowLeft" && hasPrev) {
        e.preventDefault()
        onPrev?.()
      } else if (e.key === "ArrowRight" && hasNext) {
        e.preventDefault()
        onNext?.()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, hasPrev, hasNext, onPrev, onNext])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 sm:max-w-[480px]"
      >
        {candidate ? (
          <DrawerBody
            candidate={candidate}
            roundName={roundName}
            onMoveToNextRound={onMoveToNextRound}
            onReject={onReject}
            onReTake={onReTake}
            onAddNote={onAddNote}
            onPrev={onPrev}
            onNext={onNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onClose={() => onOpenChange(false)}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

// ── Body ──────────────────────────────────────────────────────────────────

function DrawerBody({
  candidate,
  roundName,
  onMoveToNextRound,
  onReject,
  onReTake,
  onAddNote,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onClose,
}: {
  candidate: DrawerCandidate
  roundName: string
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  onClose: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Sticky header */}
      <SheetHeader className="border-b border-border p-0">
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Avatar className="size-10 shrink-0">
              <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                {initials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <SheetTitle className="truncate text-base">
                {candidate.name}
              </SheetTitle>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {[candidate.role, candidate.company].filter(Boolean).join(" @ ")}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {candidate.email && (
                  <span className="inline-flex items-center gap-1">
                    <AtSign className="size-3" />
                    {candidate.email}
                  </span>
                )}
                {candidate.phone && (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="size-3" />
                    {candidate.phone}
                  </span>
                )}
                {candidate.phone && (
                  <MessageCircle className="size-3 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close drawer"
            >
              <X className="size-4" />
            </Button>
            <ScoreGauge
              score={candidate.score}
              verdict={candidate.verdict}
              layout="row"
            />
          </div>
        </div>

        {/* Round badge + prev/next */}
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Round</span>
            <Badge variant="secondary">{roundName}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous candidate"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next candidate"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Primary action bar */}
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5">
          <Button variant="outline" size="sm" onClick={onReTake} className="h-8">
            <RotateCcw className="size-3.5" />
            Re-take
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="h-8 text-destructive hover:text-destructive"
            >
              <XCircle className="size-3.5" />
              Reject
            </Button>
            <Button size="sm" onClick={onMoveToNextRound} className="h-8">
              <CircleCheck className="size-3.5" />
              Move to next round
            </Button>
          </div>
        </div>
      </SheetHeader>

      {/* Tabs */}
      <Tabs defaultValue="insights" className="flex flex-1 flex-col overflow-hidden">
        <TabsList variant="line" className="shrink-0 border-b border-border px-4">
          <TabsTrigger value="insights">AI screening insights</TabsTrigger>
          <TabsTrigger value="profile">Full profile</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="insights" className="m-0 p-4">
            <InsightsTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="profile" className="m-0 p-4">
            <ProfileTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="notes" className="m-0 p-4">
            <NotesTab candidate={candidate} onAddNote={onAddNote} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

// ── Insights tab ──────────────────────────────────────────────────────────

function InsightsTab({ candidate }: { candidate: DrawerCandidate }) {
  return (
    <div className="flex flex-col gap-6">
      <CallPlayerStub />

      {/* Insight chips */}
      <section className="flex flex-col gap-2">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          AI call insights
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {candidate.insights.map((it, i) => (
            <span
              key={i}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs",
                it.tone === "ok"
                  ? "border-success/40 bg-success/5"
                  : "border-destructive/40 bg-destructive/5 text-destructive",
              )}
            >
              {it.tone === "ok" ? (
                <CircleCheck className="size-3 text-success" />
              ) : (
                <XCircle className="size-3" />
              )}
              {it.label}
              <button
                type="button"
                aria-label="Jump to moment in call"
                className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-sm hover:bg-muted"
                disabled
              >
                <Play className="size-2.5" />
              </button>
            </span>
          ))}
        </div>
        {candidate.cefrLevel && (
          <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-xs">
            <span>
              Directional CEFR Level:{" "}
              <strong className="font-semibold">{candidate.cefrLevel}</strong>
            </span>
            <a href="#cefr" className="text-primary hover:underline">
              See detailed analysis
            </a>
          </div>
        )}
      </section>

      {/* Recommendations */}
      {candidate.recommendations.length > 0 && (
        <section className="rounded-lg border border-border bg-muted/20 p-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Next step for you · Recommended
          </h4>
          <ul className="flex flex-col gap-1.5 text-sm">
            {candidate.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/50" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Criteria analysis */}
      {candidate.criteriaGroups.length > 0 && (
        <section className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Screening criteria analysis
          </h4>
          {candidate.criteriaGroups.map((g) => (
            <CriteriaGroupBlock key={g.id} group={g} />
          ))}
        </section>
      )}

      {/* CEFR */}
      {candidate.cefr && (
        <section id="cefr" className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            English communication detailed analysis
          </h4>
          <CefrBlock cefr={candidate.cefr} />
        </section>
      )}
    </div>
  )
}

// ── Profile tab ───────────────────────────────────────────────────────────

function ProfileTab({ candidate }: { candidate: DrawerCandidate }) {
  const p = candidate.profile
  if (!p) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <FileText className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No profile uploaded yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Candidate hasn't shared a resume or completed their profile.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Quick meta row */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {p.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" />
            {p.location}
          </span>
        )}
        {typeof p.experienceYears === "number" && (
          <span className="inline-flex items-center gap-1">
            <Briefcase className="size-3" />
            {p.experienceYears} years experience
          </span>
        )}
        {p.currentRole && (
          <span className="inline-flex items-center gap-1">
            Currently:{" "}
            <span className="text-foreground">{p.currentRole}</span>
          </span>
        )}
      </div>

      {p.about && (
        <section className="flex flex-col gap-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            About
          </h4>
          <p className="text-sm">{p.about}</p>
        </section>
      )}

      {p.experience && p.experience.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Briefcase className="size-3" />
            Experience
          </h4>
          <ol className="flex flex-col gap-3">
            {p.experience.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-0.5 border-l-2 border-border pl-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{e.role}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {e.company}
                </span>
                {e.description && (
                  <p className="mt-1 text-xs">{e.description}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.education && p.education.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <GraduationCap className="size-3" />
            Education
          </h4>
          <ol className="flex flex-col gap-3">
            {p.education.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-0.5 border-l-2 border-border pl-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{e.degree}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {e.institution}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.skills && p.skills.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {p.skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-normal">
                {s}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {p.resumeUrl && (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => window.open(p.resumeUrl, "_blank")}
        >
          <FileText className="size-3.5" />
          Open resume
        </Button>
      )}
    </div>
  )
}

// ── Notes tab ─────────────────────────────────────────────────────────────

function NotesTab({
  candidate,
  onAddNote,
}: {
  candidate: DrawerCandidate
  onAddNote?: () => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {candidate.notes ? (
        <p className="text-sm whitespace-pre-wrap">{candidate.notes}</p>
      ) : (
        <p className="text-sm text-muted-foreground">No note added yet.</p>
      )}
      <Button variant="outline" size="sm" onClick={onAddNote} className="self-start">
        <Pencil className="size-3.5" />
        {candidate.notes ? "Edit note" : "Add a note"}
      </Button>
    </div>
  )
}

// ── Sub-blocks ────────────────────────────────────────────────────────────

function CallPlayerStub() {
  const [playing, setPlaying] = React.useState(false)
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 px-3 py-2.5">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause" : "Play"}
        className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card"
      >
        {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
      </button>
      <div className="h-1 flex-1 rounded-full bg-muted">
        <div className="h-full w-0 rounded-full bg-primary" />
      </div>
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        0:00 / 0:00
      </span>
    </div>
  )
}

function CriteriaGroupBlock({ group }: { group: CriteriaGroup }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h5 className="text-sm font-semibold">{group.label}</h5>
        {group.description && (
          <p className="text-xs text-muted-foreground">{group.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {group.items.map((c) => (
          <CriterionRow key={c.id} item={c} />
        ))}
      </div>
    </div>
  )
}

function CriterionRow({ item }: { item: CriterionScore }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 px-3 py-2 text-left"
      >
        <span className="text-xs">{item.text}</span>
        <span
          className={cn(
            "shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
            item.score >= 7
              ? "bg-success/10 text-success"
              : item.score >= 4
                ? "bg-warning/10 text-warning"
                : "bg-destructive/10 text-destructive",
          )}
        >
          {item.score} / 10
        </span>
      </button>
      {open && (
        <div className="border-t border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
          {item.reasoning}
        </div>
      )}
    </div>
  )
}

function CefrBlock({ cefr }: { cefr: CefrAnalysis }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <div className="flex flex-wrap gap-4 text-xs">
        <span>
          Overall: <strong className="font-semibold">{cefr.overall.toFixed(2)} / 10</strong>
        </span>
        <span>
          CEFR: <strong className="font-semibold">{cefr.level}</strong>
        </span>
        <span>
          Recommended for: <strong className="font-semibold">{cefr.recommendedFor}</strong>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {cefr.dimensions.map((d) => (
          <div key={d.label} className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{d.label}</span>
              <span className="font-semibold tabular-nums">
                {d.score} / 10
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{d.description}</p>
          </div>
        ))}
      </div>
      {cefr.areasOfImprovement.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h5 className="text-xs font-semibold">Areas of improvement</h5>
          <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
            {cefr.areasOfImprovement.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
}

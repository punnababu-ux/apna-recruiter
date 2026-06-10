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
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Pause,
  Pencil,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  RotateCcw,
  ShieldAlert,
  Video,
  VideoOff,
  Voicemail,
  X,
  XCircle,
  Star,
  Flag,
  QrCode,
  Sparkles,
  Footprints,
} from "lucide-react"
import * as ReactDOM from "react-dom"
import * as React from "react"

import type { Verdict } from "@/components/onlyrounds/score-gauge"
import type { Candidate } from "@/components/onlyrounds/candidate-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CandidateStatusBadge } from "@/components/onlyrounds/shared"
import { AttemptStatusBand } from "@/components/onlyrounds/attempt-status-band"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ── Data types ────────────────────────────────────────────────────────────

export type CriterionScore = {
  id: string
  text: string
  /** 0–10 score from the AI evaluation. */
  score: number
  reasoning: string
  /** When true, the criterion was a dealbreaker (must-have or red-flag). */
  dealbreaker?: boolean
  /** Optional timestamp in the call when this criterion was assessed. */
  atSecond?: number
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

export type InterviewViolation = {
  id: string
  severity: "info" | "warning" | "destructive"
  title: string
  detail: string
  timestamp: string
}

export type CommunicationEvent = {
  id: string
  channel: "call" | "sms" | "email" | "whatsapp" | "voicemail"
  direction: "in" | "out" | "system"
  title: string
  detail?: string
  timestamp: string
  duration?: string
}

export type DrawerInsight = {
  tone: "ok" | "miss"
  label: string
  /** Optional timestamp in the call recording (seconds). Drives the
   *  per-chip "jump to moment" play button. */
  atSecond?: number
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
  state?: Candidate["state"]
  source?: "applied" | "sourced"
  sourceDetail?: string
  cefrLevel?: string
  insights: DrawerInsight[]
  /** Total length of the call recording in seconds. Defaults to 5:47. */
  callDuration?: number
  /**
   * Whether the screening was conducted as an outbound audio call or a video
   * interview. Only one medium is present per candidate — they are mutually
   * exclusive.
   *
   * - "audio" → outbound phone call; shows an inline audio player bar.
   * - "video" → video interview; shows a floating video panel that opens
   *             alongside the drawer when the user clicks "Watch Video".
   *
   * Defaults to "audio" when omitted.
   */
  mediaType?: "audio" | "video"
  recommendations: string[]
  criteriaGroups: CriteriaGroup[]
  cefr?: CefrAnalysis
  notes?: string
  profile?: ProfileSummary
  violations?: InterviewViolation[]
  communication?: CommunicationEvent[]
  stage?: string
  retakeHistory?: Candidate["retakeHistory"]
}

// ── Drawer ────────────────────────────────────────────────────────────────

export function CandidateDrawer({
  open,
  onOpenChange,
  candidate,
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
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: (note: string) => void
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
        showCloseButton={false}
        className="w-full p-0 data-[side=right]:sm:max-w-4xl"
      >
        {candidate ? (
          <DrawerBody
            candidate={candidate}
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

function ContactActions({ phone, name }: { phone: string; name: string }) {
  const digits = phone.replace(/[^\d]/g, "")
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    `tel:+${digits}`
  )}`

  return (
    <span className="inline-flex items-center gap-1.5">
      {/* WhatsApp */}
      <button
        type="button"
        aria-label={`Message ${name} on WhatsApp`}
        onClick={() => {
          window.open(`https://wa.me/${digits}`, "_blank", "noopener,noreferrer")
        }}
        className="inline-flex size-5 items-center justify-center rounded text-[#25D366] hover:bg-muted" // token-lint-ignore: whatsapp-brand-color
      >
        <WhatsAppIcon className="size-3.5" />
      </button>

      {/* QR Code */}
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label={`Show call QR for ${name}`}
              className="inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <QrCode className="size-3.5" />
            </button>
          }
        />
        <PopoverContent
          align="start"
          className="w-auto p-3 z-50 bg-popover border border-border rounded-lg shadow-md"
        >
          <div className="flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt={`QR code to call ${name}`}
              width={180}
              height={180}
              className="rounded-md border border-border"
            />
            <p className="text-xs text-muted-foreground">
              Scan to call <span className="font-medium text-foreground">+{digits}</span>
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  )
}


type Stage = "screening" | "interview" | "selected"

const STAGES: { key: Stage; label: string; number: number }[] = [
  { key: "screening", label: "Screening", number: 1 },
  { key: "interview", label: "Tech Interview", number: 2 },
  { key: "selected", label: "Selected", number: 3 },
]

const STAGE_ORDER: Stage[] = ["screening", "interview", "selected"]

const isStageCompleted = (currentStage: Stage, stepStage: Stage) => {
  const currentIndex = STAGE_ORDER.indexOf(currentStage)
  const stepIndex = STAGE_ORDER.indexOf(stepStage)
  return currentIndex >= stepIndex
}

function DrawerBody({
  candidate,
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
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: (note: string) => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [noteText, setNoteText] = React.useState(candidate.notes || "")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const lastCandidateIdRef = React.useRef(candidate.id)

  React.useEffect(() => {
    if (lastCandidateIdRef.current !== candidate.id) {
      lastCandidateIdRef.current = candidate.id
      setNoteText(candidate.notes || "")
      setIsEditing(false)
    } else if (!isEditing) {
      setNoteText(candidate.notes || "")
    }
  }, [candidate.id, candidate.notes, isEditing])

  React.useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => {
        textareaRef.current?.focus()
        const len = textareaRef.current?.value.length ?? 0
        textareaRef.current?.setSelectionRange(len, len)
      })
    }
  }, [isEditing])

  const commitNote = () => {
    const trimmed = noteText.trim()
    setIsEditing(false)
    onAddNote?.(trimmed)
  }

  const cancelNote = () => {
    setNoteText(candidate.notes || "")
    setIsEditing(false)
  }

  const currentStage = (candidate.stage as Stage) || "screening"

  return (
    <div className="flex h-full flex-col">
      {/* Sticky header */}
      <SheetHeader className="p-0 border-b border-border">
        <div className="p-4 flex flex-col gap-3">
          {/* Top row: Avatar + Name & Details + Top-Right Actions */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                  {initials(candidate.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <SheetTitle className="truncate text-base">
                    {candidate.name}
                  </SheetTitle>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold")}>{candidate.source === "sourced" ? "Sourced" : "Applied"}</span>
                      }
                    />
                    <TooltipContent>
                      {candidate.source === "sourced" ? (candidate.sourceDetail || "Sourced candidate") : "Applied directly"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                {(candidate.role || candidate.company) && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {[candidate.role, candidate.company].filter(Boolean).join(" @ ")}
                  </p>
                )}
                {/* Contact info: aligned with name and job details */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {candidate.email && (
                    <span className="inline-flex items-center gap-1">
                      <AtSign className="size-3.5" />
                      {candidate.email}
                    </span>
                  )}
                  {candidate.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="size-3.5" />
                      {candidate.phone}
                      <ContactActions phone={candidate.phone} name={candidate.name} />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Top-Right sticky header actions */}
            <div className="flex items-center gap-1.5 shrink-0 -mt-1">
              <div className="flex items-center gap-0.5 border-r border-border pr-1.5 mr-1">
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
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close drawer"
                className="shrink-0"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Pipeline Stepper Subheader */}
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2 bg-muted/10">
          {/* Horizontal breadcrumb pipeline stepper */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-2xs">
            {STAGES.map((s, idx) => {
              const isCompleted = isStageCompleted(currentStage, s.key)
              const isActive = currentStage === s.key
              return (
                <React.Fragment key={s.key}>
                  {idx > 0 && (
                    <span className="text-muted-foreground/30 font-medium">/</span>
                  )}
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full text-3xs font-semibold font-mono border",
                        isActive && "bg-primary border-primary text-primary-foreground",
                        isCompleted && !isActive && "bg-success-subtle border-success/30 text-success",
                        !isCompleted && !isActive && "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      {s.number}
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        isActive && "text-foreground font-semibold",
                        isCompleted && !isActive && "text-muted-foreground",
                        !isCompleted && !isActive && "text-muted-foreground/60"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                </React.Fragment>
              )
            })}
          </div>

          {/* Candidate status badge opposite to the pipeline steps */}
          {(() => {
            const state = candidate.state || {
              kind: "completed" as const,
              score: candidate.score,
              verdict: candidate.verdict,
              insights: [],
            }
            return (
              <div className="flex shrink-0 items-center">
                <CandidateStatusBadge state={state} />
              </div>
            )
          })()}
        </div>

      </SheetHeader>

      {/* Tabs */}
      <Tabs
        defaultValue="profile"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="w-full shrink-0 overflow-x-auto border-b border-border">
          <TabsList
            variant="line"
            className="px-4 gap-4"
          >
            <TabsTrigger value="profile">Full profile</TabsTrigger>
            <TabsTrigger value="insights">AI screening insights</TabsTrigger>
            <TabsTrigger value="violations">Interview violations report</TabsTrigger>
            <TabsTrigger value="timeline">Communication timelines</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="profile" className="m-0 p-4">
            <ProfileTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="insights" className="m-0 p-4">
            <InsightsTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="violations" className="m-0 p-4">
            <ViolationsTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="timeline" className="m-0 p-4">
            <TimelineTab candidate={candidate} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Combined Notes & Actions Sticky Footer */}
      <div className="border-t border-border bg-card flex flex-col shrink-0">
        {/* Notes */}
        <div className="p-4 pb-2.5">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">Notes</h4>
          {isEditing ? (
            <div
              className="flex flex-col gap-1.5 bg-muted/30 p-2 rounded-lg border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Textarea
                ref={textareaRef}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value.slice(0, 300))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    commitNote()
                  } else if (e.key === "Escape") {
                    e.preventDefault()
                    cancelNote()
                  }
                }}
                placeholder="Add reason for rejection or any other notes"
                rows={2}
                maxLength={300}
                inputSize="sm"
                className="resize-none bg-card text-xs"
              />
              <div className="flex items-center justify-between text-2xs">
                <span className="tabular-nums text-muted-foreground">
                  {noteText.length}/300
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="xs"
                    className="h-6 px-2 text-2xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      cancelNote()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    className="h-6 px-2 text-2xs bg-primary text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      commitNote()
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 text-left text-sm hover:bg-muted/40 transition-colors"
            >
              {noteText ? (
                <span className="text-foreground whitespace-pre-wrap">{noteText}</span>
              ) : (
                <span className="text-muted-foreground">No note added</span>
              )}
              <Pencil className="size-3.5 text-muted-foreground shrink-0 ml-2" />
            </button>
          )}
        </div>

        {/* Action bar below Notes */}
        {candidate.stage !== "selected" && (
          <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3 bg-muted/10">
            <Button variant="outline" size="sm" onClick={onReTake} className="h-8 bg-card">
              <RotateCcw className="size-3.5" />
              Re-take
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onReject}
                className="h-8 bg-card"
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
        )}
      </div>
    </div>
  )
}

// ── Insights tab ──────────────────────────────────────────────────────────

function RetakeHistoryBlock({ history }: { history: NonNullable<Candidate["retakeHistory"]> }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <RotateCcw className="size-3.5 text-muted-foreground shrink-0" />
        Re-Take History
      </div>
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
          {history.map((h, i) => (
            <li key={i} className="flex items-start justify-between gap-3">
              <span className="leading-relaxed">– {h.label}</span>
              <span className="shrink-0 font-medium font-mono text-2xs tabular-nums text-muted-foreground/80 mt-0.5">
                {h.at}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Video player (inline sticky) ─────────────────────────────────────────

// ── Video popup (portal, YouTube iframe) ────────────────────────────────

const DEMO_VIDEO_ID = "Ks-_Mh1QhMc" // Andrew Ng — demo interview recording

function VideoPopup({
  candidateName,
  onClose,
  seekRef,
}: {
  candidateName: string
  onClose: () => void
  /** Parent passes a mutable ref; VideoPopup stores its seek fn here. */
  seekRef: React.MutableRefObject<((sec: number) => void) | null>
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // Register the YouTube seek fn so InsightsTab can call it
  React.useEffect(() => {
    seekRef.current = (sec: number) => {
      const win = iframeRef.current?.contentWindow
      if (!win) return
      win.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [sec, true] }),
        "*",
      )
      win.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*",
      )
    }
    return () => { seekRef.current = null }
  }, [seekRef])

  if (typeof document === "undefined") return null

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 animate-in fade-in slide-in-from-right-4 duration-200"
      style={{ top: "16px", right: "calc(56rem + 12px)" }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Video className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm font-semibold text-foreground">
            {candidateName} — Interview recording
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* YouTube iframe (16:9) */}
        <div className="aspect-video w-full bg-muted">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1`}
            title={`${candidateName} interview recording`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        </div>

        {/* Hint footer */}
        <div className="border-t border-border bg-muted/30 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Click{" "}
            <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-success/10 border border-success/30">
              <Play className="size-2 fill-success text-success ml-px" />
            </span>{" "}
            on any criteria below to jump to that moment in the recording
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Audio player (sticky seek bar) ────────────────────────────────────────

function AudioPlayer({
  elapsed,
  totalSec,
  playing,
  onTogglePlay,
  onSeek,
}: {
  elapsed: number
  totalSec: number
  playing: boolean
  onTogglePlay: () => void
  onSeek: (sec: number) => void
}) {
  const pct = totalSec > 0 ? (elapsed / totalSec) * 100 : 0
  const trackRef = React.useRef<HTMLDivElement>(null)

  const handleTrackClick = (e: React.MouseEvent) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onSeek(Math.round(ratio * totalSec))
  }

  return (
    <div className={cn(
      "transition-all duration-200",
      playing
        /* Playing → full-bleed sticky strip below the tab bar */
        ? "-mx-4 sticky top-0 z-10 bg-card border-b border-border shadow-sm"
        /* At rest → normal rounded card, same style as other insight cards */
        : "rounded-lg border border-border bg-card",
    )}>
      <div className={cn(
        "flex items-center gap-3",
        playing ? "px-4 py-3" : "p-3",
      )}>
        {/* Icon + label */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
          <Mic className="size-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground">Outbound call recording</span>
            <span className="text-2xs tabular-nums text-muted-foreground font-mono shrink-0">
              {fmtMmSs(elapsed)} / {fmtMmSs(totalSec)}
            </span>
          </div>
          {/* Seek bar */}
          <div
            ref={trackRef}
            role="slider"
            aria-label="Audio position"
            aria-valuemin={0}
            aria-valuemax={totalSec}
            aria-valuenow={elapsed}
            onClick={handleTrackClick}
            className="h-1.5 w-full cursor-pointer rounded-full bg-muted overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        {/* Play / Pause */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "Pause audio" : "Play audio"}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted hover:bg-muted/70 transition-colors"
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
        </button>
      </div>
    </div>
  )
}

// ── InsightsTab ───────────────────────────────────────────────────────────

function InsightsTab({ candidate }: { candidate: DrawerCandidate }) {
  const totalSec = candidate.callDuration ?? 5 * 60 + 47
  const mediaType = candidate.mediaType ?? "audio"
  const [elapsed, setElapsed] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  // For video mode: whether the floating video panel is open
  const [videoOpen, setVideoOpen] = React.useState(false)

  // Ref that VideoPopup registers its YouTube seek fn into
  const videoSeekRef = React.useRef<((sec: number) => void) | null>(null)

  // Reset when switching candidates
  React.useEffect(() => {
    setElapsed(0)
    setPlaying(false)
    setVideoOpen(false)
  }, [candidate.id])

  // Advance time when playing.
  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e >= totalSec) {
          setPlaying(false)
          return totalSec
        }
        return e + 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing, totalSec])

  const seekTo = React.useCallback(
    (sec: number) => {
      const clamped = Math.min(Math.max(0, sec), totalSec)
      if (mediaType === "video") {
        // Open the popup and forward the seek to the YouTube iframe
        setVideoOpen(true)
        // Small delay so the iframe has time to mount before seeking
        setTimeout(() => videoSeekRef.current?.(clamped), 300)
      } else {
        setElapsed(clamped)
        setPlaying(true)
      }
    },
    [totalSec, mediaType],
  )

  const state = candidate.state
  if (state && state.kind !== "completed") {
    return (
      <div className="flex flex-col gap-6">
        {state.kind === "pending" && (
          <AttemptStatusBand
            tone="warning"
            label="Interview Pending"
            reason="Call not connected, Rescheduled for completion"
            attempted={state.attempted}
            total={state.total}
            helper="We're trying to reach the candidate for this interview. We'll update the status once they respond."
            attempts={state.attempts}
            flush
          />
        )}
        {state.kind === "incomplete" && (
          <AttemptStatusBand
            tone="warning"
            label="Interview Incomplete"
            reason="Candidate left early, Rescheduled for completion"
            attempted={state.attempted}
            total={state.total}
            helper="Candidate attempted the interview but didn't complete it. We've notified the candidate to complete the interview, we'll update the status here once it's completed."
            attempts={state.attempts}
            flush
          />
        )}
        {state.kind === "no-response" && (
          <AttemptStatusBand
            tone="muted"
            label="No Response"
            reason="Candidate did not respond after all attempts"
            attempted={state.attempted}
            total={state.total}
            attempts={state.attempts}
            flush
          />
        )}
        {state.kind === "not-interested" && (
          <AttemptStatusBand
            tone="muted"
            label="Not Interested"
            reason="Candidate declared not interested in this opportunity"
            flush
          />
        )}
        {candidate.retakeHistory && candidate.retakeHistory.length > 0 && (
          <RetakeHistoryBlock history={candidate.retakeHistory} />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Media player (sticky) ───────────────────────────────── */}
      {mediaType === "audio" ? (
        <AudioPlayer
          elapsed={elapsed}
          totalSec={totalSec}
          playing={playing}
          onTogglePlay={() => setPlaying((p) => !p)}
          onSeek={(s) => {
            setElapsed(s)
            setPlaying(true)
          }}
        />
      ) : (
        /* Video: thumbnail card + floating panel */
        <>
          <div className="bg-muted/30 p-3 rounded-lg flex items-center justify-between gap-3 border border-border">
            <div className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="relative w-20 h-12 rounded-md border border-border bg-accent/20 flex items-center justify-center overflow-hidden shrink-0">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {initials(candidate.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  {videoOpen ? (
                    <VideoOff className="size-3 text-white" />
                  ) : (
                    <Play className="size-3 text-white fill-white/80" />
                  )}
                </div>
                <div className="absolute bottom-0.5 right-0.5 bg-black/60 px-1 rounded-sm text-white font-mono text-2xs scale-90 origin-bottom-right">
                  {fmtMmSs(totalSec)}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-foreground">Video interview recording</h5>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any{" "}
                  <span className="inline-flex size-3 items-center justify-center rounded-full bg-success/10 border border-success/30">
                    <Play className="size-1.5 fill-success text-success ml-px" />
                  </span>{" "}
                  below to jump to that moment
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-card text-xs gap-1.5 h-8 font-medium text-foreground border-border hover:bg-muted shrink-0"
              onClick={() => {
                setVideoOpen((o) => !o)
                if (!videoOpen) setPlaying(true)
                else setPlaying(false)
              }}
            >
              {videoOpen ? (
                <>
                  <VideoOff className="size-3.5" />
                  Close video
                </>
              ) : (
                <>
                  <Video className="size-3.5" />
                  Watch video
                </>
              )}
            </Button>
          </div>

          {/* Video popup portal */}
          {videoOpen && (
            <VideoPopup
              candidateName={candidate.name}
              seekRef={videoSeekRef}
              onClose={() => setVideoOpen(false)}
            />
          )}
        </>
      )}

      {/* Insight chips */}
      <section className="flex flex-col gap-3">
        <div className="border border-border bg-muted/10 p-4 rounded-lg flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary shrink-0" />
            <h4 className="text-sm font-bold text-foreground">
              AI call insights for {candidate.name}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.insights.map((it, i) => {
              const hasAtSecond = typeof it.atSecond === "number"
              return (
                <span
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs shadow-2xs transition-colors bg-card",
                    it.tone === "ok"
                      ? "border-success/40 text-success-foreground"
                      : "border-destructive/40 text-destructive"
                  )}
                >
                  {it.tone === "ok" ? (
                    <CircleCheck className="size-3 text-success shrink-0" />
                  ) : (
                    <XCircle className="size-3 text-destructive shrink-0" />
                  )}
                  <span className="text-foreground">{it.label}</span>
                  {hasAtSecond && (
                    <button
                      type="button"
                      onClick={() => seekTo(it.atSecond!)}
                      aria-label={`Jump to ${fmtMmSs(it.atSecond!)} in ${mediaType}`}
                      className="ml-1 inline-flex size-4 items-center justify-center rounded-full border border-border bg-muted/40 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <Play className="size-2 text-muted-foreground fill-muted-foreground ml-0.5" />
                    </button>
                  )}
                </span>
              )
            })}
          </div>
        </div>

        {candidate.cefrLevel && (
          <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2 text-xs">
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground">Directional CEFR Level:</span>
              <span className="inline-flex items-center rounded bg-info/10 px-1.5 py-0.5 font-bold text-info">
                {candidate.cefrLevel}
              </span>
            </span>
            <a href="#cefr" className="text-primary hover:underline font-semibold">
              See detailed analysis
            </a>
          </div>
        )}
      </section>

      {/* Recommendations */}
      {candidate.recommendations.length > 0 && (
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <Footprints className="size-4 text-info shrink-0" />
            Next step for you
          </div>
          <div className="rounded-lg border border-info/20 bg-info/5 p-4">
            <h5 className="text-sm font-bold text-foreground mb-3">
              Candidate is a strong fit. Proceed with next steps.
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              {candidate.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-info/70" />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Criteria analysis */}
      {candidate.criteriaGroups.length > 0 && (
        <section className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Screening criteria analysis
          </h4>
          {candidate.criteriaGroups.map((g) => (
            <CriteriaGroupBlock key={g.id} group={g} onSeek={seekTo} mediaType={mediaType} />
          ))}
        </section>
      )}

      {/* CEFR */}
      {candidate.cefr && (
        <section id="cefr" className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 border-b border-border pb-1">
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              English communication detailed analysis
            </h4>
            <span className="inline-flex items-center rounded-full bg-success px-2.5 py-0.5 text-2xs font-semibold text-success-foreground">
              Overall: {candidate.cefr.overall.toFixed(3)}/10
            </span>
          </div>
          <CefrBlock cefr={candidate.cefr} />
        </section>
      )}
      {candidate.retakeHistory && candidate.retakeHistory.length > 0 && (
        <RetakeHistoryBlock history={candidate.retakeHistory} />
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
            Candidate hasn&apos;t shared a resume or completed their profile.
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
        <section className="flex flex-col gap-3.5">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Briefcase className="size-3" />
            Experience
          </h4>
          <ol className="flex flex-col gap-3">
            {p.experience.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 border border-border bg-muted/10 rounded-lg p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">{e.role}</span>
                  <span className="shrink-0 text-xs text-muted-foreground font-medium">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {e.company}
                </span>
                {e.description && (
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{e.description}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.education && p.education.length > 0 && (
        <section className="flex flex-col gap-3.5">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <GraduationCap className="size-3" />
            Education
          </h4>
          <ol className="flex flex-col gap-3">
            {p.education.map((e, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 border border-border bg-muted/10 rounded-lg p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">{e.degree}</span>
                  <span className="shrink-0 text-xs text-muted-foreground font-medium">
                    {e.period}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
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

// ── Violations tab ────────────────────────────────────────────────────────

function ViolationsTab({ candidate }: { candidate: DrawerCandidate }) {
  const items = candidate.violations ?? []
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <CircleCheck className="size-8 text-success" />
        <div>
          <p className="text-sm font-medium">No violations detected</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Candidate completed the round without any flagged behaviour.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Behavioural signals flagged during the AI session — review for
        integrity concerns.
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((v) => (
          <li
            key={v.id}
            className={cn(
              "flex items-start gap-3 rounded-md border bg-card p-3",
              v.severity === "destructive"
                ? "border-destructive/30"
                : v.severity === "warning"
                  ? "border-warning/30"
                  : "border-border",
            )}
          >
            <ShieldAlert
              className={cn(
                "size-4 shrink-0",
                v.severity === "destructive"
                  ? "text-destructive"
                  : v.severity === "warning"
                    ? "text-warning"
                    : "text-info",
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{v.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {v.timestamp}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{v.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Timeline tab ──────────────────────────────────────────────────────────

const CHANNEL_ICON = {
  call: PhoneOutgoing,
  sms: MessageCircle,
  email: Mail,
  whatsapp: MessageCircle,
  voicemail: Voicemail,
} as const

function TimelineTab({ candidate }: { candidate: DrawerCandidate }) {
  const items = candidate.communication ?? []
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <CalendarDays className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No communication yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Call attempts, messages, and replies will appear here.
          </p>
        </div>
      </div>
    )
  }
  return (
    <ol className="relative flex flex-col gap-3 pl-5">
      <span className="absolute top-1 bottom-1 left-1.5 w-px bg-border" />
      {items.map((e) => {
        let Icon = CHANNEL_ICON[e.channel]
        if (e.channel === "call" && e.direction === "in") Icon = PhoneIncoming
        return (
          <li key={e.id} className="relative flex flex-col gap-0.5">
            <span className="absolute top-0.5 -left-[18px] flex size-4 items-center justify-center rounded-full border border-border bg-card"> {/* token-lint-ignore: timeline-icon-alignment */}
              <Icon className="size-2.5 text-muted-foreground" />
            </span>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{e.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {e.timestamp}
              </span>
            </div>
            {e.detail && (
              <p className="text-xs text-muted-foreground">{e.detail}</p>
            )}
            {e.duration && (
              <p className="text-2xs text-muted-foreground">
                Duration · {e.duration}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}


// ── Criterion sub-blocks ──────────────────────────────────────────────────

function fmtMmSs(s: number) {
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, "0")}`
}

function getGroupHeaderInfo(id: string, label: string) {
  const normId = id.toLowerCase()
  const normLabel = label.toLowerCase()
  if (normId.includes("must") || normLabel.includes("must")) {
    return {
      Icon: CircleCheck,
      iconClass: "text-success",
      labelText: "Must have criteria",
    }
  }
  if (normId.includes("preferred") || normLabel.includes("preferred")) {
    return {
      Icon: Star,
      iconClass: "text-info fill-info/20",
      labelText: "Preferred criteria",
    }
  }
  return {
    Icon: Flag,
    iconClass: "text-destructive fill-destructive/20",
    labelText: "Red flag criteria",
  }
}

function CriteriaGroupBlock({
  group,
  onSeek,
  mediaType,
}: {
  group: CriteriaGroup
  onSeek?: (sec: number) => void
  mediaType?: "audio" | "video"
}) {
  const { Icon, iconClass, labelText } = getGroupHeaderInfo(group.id, group.label)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("size-4 shrink-0", iconClass)} />
          <span className="text-xs font-bold uppercase tracking-wide text-foreground">
            {labelText}
          </span>
        </div>
        <div className="h-px bg-border flex-1 ml-3" />
      </div>
      <div className="flex flex-col gap-3">
        {group.items.map((c) => (
          <CriterionRow key={c.id} item={c} onSeek={onSeek} mediaType={mediaType} />
        ))}
      </div>
    </div>
  )
}

function CriterionRow({
  item,
  onSeek,
  mediaType = "audio",
}: {
  item: CriterionScore
  onSeek?: (sec: number) => void
  mediaType?: "audio" | "video"
}) {
  const isHigh = item.score >= 7
  const isMid = item.score >= 4 && item.score < 7
  const hasTimestamp = typeof item.atSecond === "number"

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Card Header */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b border-border px-3 py-2 text-xs font-semibold",
          isHigh
            ? "bg-success/5"
            : isMid
              ? "bg-warning/5"
              : "bg-destructive/5"
        )}
      >
        <span className="text-foreground font-medium">{item.text}</span>
        <span className="shrink-0 text-muted-foreground font-mono">
          {item.score} / 10
        </span>
      </div>

      {/* Card Body */}
      <div className="flex items-center justify-between gap-4 p-3 bg-card">
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {item.reasoning}
        </p>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                onClick={() => onSeek?.(item.atSecond ?? 0)}
                aria-label={
                  hasTimestamp
                    ? `Jump to ${fmtMmSs(item.atSecond!)} in ${mediaType}`
                    : `Play from start in ${mediaType}`
                }
                className="flex size-6 shrink-0 items-center justify-center rounded-full border border-success/30 bg-success/5 text-success hover:bg-success/15 hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="size-2.5 fill-success text-success ml-0.5" />
              </button>
            }
          />
          <TooltipContent side="left">
            {hasTimestamp
              ? `Jump to ${fmtMmSs(item.atSecond!)} in ${mediaType === "video" ? "video" : "audio"}`
              : `Play ${mediaType === "video" ? "video" : "audio"} from start`}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function CefrDimensionCard({ dimension }: { dimension: CefrDimension }) {
  const isMti =
    dimension.label.toLowerCase().includes("mother") ||
    dimension.label.toLowerCase().includes("influence")
  const isHigh = dimension.score >= 7 && !isMti

  return (
    <div
      className={cn(
        "rounded-lg border bg-card overflow-hidden",
        isHigh ? "border-border" : "border-warning/30"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b border-border px-3 py-2 text-xs font-semibold",
          isHigh ? "bg-success/5" : "bg-warning/5"
        )}
      >
        <span className="text-foreground font-medium">{dimension.label}</span>
        <span className="shrink-0 text-muted-foreground font-mono">
          {dimension.score} / 10
        </span>
      </div>
      <div className="p-3 bg-card">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {dimension.description}
        </p>
      </div>
    </div>
  )
}

function CefrBlock({ cefr }: { cefr: CefrAnalysis }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Sub-header row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-1">
        <span className="flex items-center gap-1.5">
          <span>Directional CEFR Level:</span>
          <Badge variant="info">{cefr.level}</Badge>
        </span>
        <span className="flex items-center gap-1.5">
          <span>Recommended for:</span>
          <Badge variant="success">{cefr.recommendedFor}</Badge>
        </span>
      </div>

      {/* Grid of Dimension Cards */}
      <div className="flex flex-col gap-3">
        {cefr.dimensions.map((d) => (
          <CefrDimensionCard key={d.label} dimension={d} />
        ))}
      </div>

      {/* Areas of Improvement */}
      {cefr.areasOfImprovement.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/10 p-3 mt-1">
          <h5 className="text-xs font-bold text-foreground mb-2">Areas of improvement</h5>
          <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
            {cefr.areasOfImprovement.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span className="leading-relaxed">{a}</span>
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

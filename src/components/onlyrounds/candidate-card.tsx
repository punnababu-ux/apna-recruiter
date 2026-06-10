"use client"

/**
 * CandidateCard — single row in the candidate pipeline.
 *
 * State branches (one of):
 *   - pending       → call attempts running; show attempt counter + helper
 *   - incomplete    → all attempts used, still not complete; show "View" log link
 *   - completed     → AI scored the candidate; show insight chip cloud + verdict
 *   - no-response   → simple muted status row
 *   - not-interested→ simple muted status row
 *
 * The whole card is clickable (opens the drawer). Action buttons stop
 * propagation so they don't fire the card click.
 */

import {
  AtSign,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  History,
  Phone,
  Pencil,
  QrCode,
  XCircle,
  CircleCheck,
  RotateCcw,
} from "lucide-react"

import * as React from "react"

import {
  AttemptStatusBand,
  type AttemptLogEntry,
} from "@/components/onlyrounds/attempt-status-band"
import { ScoreGauge, type Verdict } from "@/components/onlyrounds/score-gauge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type CandidateInsight = {
  /** "ok" = positive finding, "miss" = topic not covered. */
  tone: "ok" | "miss"
  label: string
}

export type CandidateState =
  | { kind: "pending"; attempted: number; total: number; attempts?: AttemptLogEntry[] }
  | { kind: "incomplete"; attempted: number; total: number; attempts?: AttemptLogEntry[] }
  | { kind: "completed"; score: number; verdict: Verdict; insights: CandidateInsight[] }
  | { kind: "no-response"; attempted: number; total: number; attempts?: AttemptLogEntry[] }
  | { kind: "not-interested" }

/** CEFR levels A1–C2, or "na" when the assessment hasn't run / wasn't requested. */
export type CefrLevel = "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | "na"

export type Candidate = {
  id: string
  name: string
  role?: string
  company?: string
  email?: string
  phone?: string
  state: CandidateState
  cefrLevel?: CefrLevel
  /** Initial note text. Card manages its own editing state from here. */
  note?: string
  /** Chronological log of prior re-take attempts. When present, a history
   *  toggle appears next to the Re-take button. */
  retakeHistory?: AttemptLogEntry[]
}

const NOTE_MAX_CHARS = 300

export function CandidateCard({
  candidate,
  onOpen,
  onMoveToNextRound,
  onReject,
  onReTake,
  onAddNote,
  onViewInsights,
  className,
}: {
  candidate: Candidate
  onOpen?: () => void
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: () => void
  onViewInsights?: () => void
  className?: string
}) {
  const { name, role, company, email, phone, state, retakeHistory } = candidate
  const hasRetakeHistory = retakeHistory && retakeHistory.length > 0
  const [historyOpen, setHistoryOpen] = React.useState(false)

  const stop = (fn?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    fn?.()
  }

  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (onOpen && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onOpen()
        }
      }}
      className={cn(
        "rounded-lg border border-border bg-card transition-shadow",
        onOpen && "cursor-pointer hover:shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {/* Header: identity + contact + score/status */}
      <div className="flex items-start gap-3 px-4 py-3">
        <Avatar className="size-9">
          <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-semibold">{name}</h3>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </div>
          {(role || company) && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {role}
              {role && company ? " @ " : ""}
              {company}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {email && (
              <span className="inline-flex items-center gap-1">
                <AtSign className="size-3" />
                {email}
              </span>
            )}
            {phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3" />
                {phone}
                <ContactActions phone={phone} name={name} onStop={stop} />
              </span>
            )}
          </div>
        </div>

        {/* Right-edge status indicator */}
        <div className="flex shrink-0 items-center">
          {state.kind === "completed" && (
            <ScoreGauge score={state.score} verdict={state.verdict} layout="row" />
          )}
          {state.kind === "pending" && (
            <Badge variant="warning">Interview pending</Badge>
          )}
          {state.kind === "incomplete" && (
            <Badge variant="warning">Incomplete call</Badge>
          )}
          {state.kind === "no-response" && (
            <Badge variant="secondary">No response</Badge>
          )}
          {state.kind === "not-interested" && (
            <Badge variant="secondary">Not interested</Badge>
          )}
        </div>
      </div>

      {/* State-specific body */}
      {state.kind === "pending" && (
        <AttemptStatusBand
          tone="warning"
          label="Interview Pending"
          reason="Call not connected, Rescheduled for completion"
          attempted={state.attempted}
          total={state.total}
          helper="We're trying to reach the candidate for this interview. We'll update the status once they respond."
          attempts={state.attempts}
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
        />
      )}

      {state.kind === "completed" && state.insights.length > 0 && (
        <div className="border-t border-border px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            AI call insights
          </div>
          <div className="flex flex-wrap gap-1.5">
            {state.insights.slice(0, 12).map((it, i) => (
              <InsightChip key={i} tone={it.tone}>
                {it.label}
              </InsightChip>
            ))}
          </div>
          {state.insights.length > 12 && (
            <button
              type="button"
              onClick={stop(onViewInsights)}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              See detailed insights… ›
            </button>
          )}
          {state.insights.length <= 12 && onViewInsights && (
            <button
              type="button"
              onClick={stop(onViewInsights)}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              See detailed insights… ›
            </button>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={stop(onReTake)}
            className="h-8"
          >
            <RotateCcw className="size-3.5" />
            Re-take
          </Button>
          {hasRetakeHistory ? (
            <Button
              variant="outline"
              size="sm"
              onClick={stop(() => setHistoryOpen((v) => !v))}
              aria-expanded={historyOpen}
              aria-label={
                historyOpen ? "Hide re-take history" : "Show re-take history"
              }
              className="h-8 px-2"
            >
              <History className="size-3.5" />
              {historyOpen ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={stop(onReject)}
            className="h-8 text-destructive hover:text-destructive"
          >
            <XCircle className="size-3.5" />
            Reject
          </Button>
          <Button size="sm" onClick={stop(onMoveToNextRound)} className="h-8">
            <CircleCheck className="size-3.5" />
            Move to next round
          </Button>
        </div>
      </div>

      {/* Re-take history (expanded) */}
      {hasRetakeHistory && historyOpen ? (
        <div className="border-t border-border px-4 py-3">
          <div className="flex flex-col gap-2 rounded-md bg-muted/50 px-3 py-2.5">
            <p className="text-xs font-semibold">Re-Take History</p>
            <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
              {retakeHistory!.map((h, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span>– {h.label}</span>
                  <span className="shrink-0 tabular-nums">{h.at}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Note section — empty / editing / view */}
      <CandidateNote initialNote={candidate.note} onSave={onAddNote} />
    </article>
  )
}

// ── CandidateNote (tri-state: empty → editing → view) ─────────────────────

function CandidateNote({
  initialNote,
  onSave,
}: {
  initialNote?: string
  /** Called whenever the note is committed (blur or Enter). Receives the
   *  trimmed value; empty string means the note was cleared. */
  onSave?: (value: string) => void
}) {
  const [note, setNote] = React.useState(initialNote ?? "")
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(note)
  const ref = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (editing) {
      // Defer focus so the textarea is in the DOM.
      requestAnimationFrame(() => {
        ref.current?.focus()
        const len = ref.current?.value.length ?? 0
        ref.current?.setSelectionRange(len, len)
      })
    }
  }, [editing])

  const startEditing = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDraft(note)
    setEditing(true)
  }

  const commit = () => {
    const trimmed = draft.trim()
    setNote(trimmed)
    setEditing(false)
    onSave?.(trimmed)
  }

  const cancel = () => {
    setDraft(note)
    setEditing(false)
  }

  // ── Empty: just the right-aligned link ──────────────────────────────────
  if (!note && !editing) {
    return (
      <div className="flex items-center justify-end border-t border-border px-4 py-2 text-xs">
        <button
          type="button"
          onClick={startEditing}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3" />
          Add a note
        </button>
      </div>
    )
  }

  // ── Editing: full-width textarea + char counter ────────────────────────
  if (editing) {
    const remaining = NOTE_MAX_CHARS - draft.length
    return (
      <div
        className="flex flex-col gap-1 border-t border-border bg-muted/30 px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Textarea
          ref={ref}
          value={draft}
          onChange={(e) =>
            setDraft(e.target.value.slice(0, NOTE_MAX_CHARS))
          }
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              commit()
            } else if (e.key === "Escape") {
              e.preventDefault()
              cancel()
            }
          }}
          placeholder="Add reason for rejection or any other notes"
          rows={2}
          maxLength={NOTE_MAX_CHARS}
          className="resize-none border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0 focus-visible:outline-none"
        />
        <div className="flex justify-end text-2xs tabular-nums text-muted-foreground">
          {draft.length}/{NOTE_MAX_CHARS}
          <span className="sr-only">
            {remaining} characters remaining
          </span>
        </div>
      </div>
    )
  }

  // ── View: saved note + edit pencil ─────────────────────────────────────
  return (
    <div className="flex items-start justify-between gap-3 border-t border-border bg-muted/30 px-4 py-2 text-xs">
      <p className="flex-1 whitespace-pre-wrap text-foreground">{note}</p>
      <button
        type="button"
        onClick={startEditing}
        aria-label="Edit note"
        className="shrink-0 text-muted-foreground hover:text-foreground"
      >
        <Pencil className="size-3.5" />
      </button>
    </div>
  )
}

// ── Contact actions (WhatsApp · QR) ───────────────────────────────────────

/** WhatsApp brand glyph (lucide has no official WhatsApp icon). */
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

function ContactActions({
  phone,
  name,
  onStop,
}: {
  phone: string
  name: string
  /** Card's stopPropagation wrapper so clicks don't open the drawer. */
  onStop: (fn?: () => void) => (e: React.MouseEvent) => void
}) {
  // Digits only for tel:/wa.me links.
  const digits = phone.replace(/[^\d]/g, "")
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    `tel:+${digits}`,
  )}`

  return (
    <span className="inline-flex items-center gap-1">
      {/* WhatsApp */}
      <button
        type="button"
        aria-label={`Message ${name} on WhatsApp`}
        onClick={onStop(() => {
          window.open(`https://wa.me/${digits}`, "_blank", "noopener,noreferrer")
        })}
        className="inline-flex size-5 items-center justify-center rounded text-[#25D366] hover:bg-muted" // token-lint-ignore: whatsapp-brand-color
      >
        <WhatsAppIcon className="size-3.5" />
      </button>

      {/* QR — popover with a scannable tel: code */}
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label={`Show call QR for ${name}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <QrCode className="size-3.5" />
            </button>
          }
        />
        <PopoverContent
          align="start"
          className="w-auto p-3"
          onClick={(e) => e.stopPropagation()}
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

// ── Insight chip (inline — green check or red cross) ──────────────────────

function InsightChip({
  tone,
  children,
}: {
  tone: "ok" | "miss"
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs",
        tone === "ok"
          ? "border-success/40 bg-success/5 text-success-foreground"
          : "border-destructive/40 bg-destructive/5 text-destructive",
      )}
    >
      {tone === "ok" ? (
        <CircleCheck className="size-3 text-success" />
      ) : (
        <XCircle className="size-3" />
      )}
      <span className={tone === "ok" ? "text-foreground" : undefined}>
        {children}
      </span>
    </span>
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

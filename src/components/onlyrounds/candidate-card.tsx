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
  ChevronRight,
  MessageCircle,
  Phone,
  Pencil,
  XCircle,
  CircleCheck,
  RotateCcw,
} from "lucide-react"

import { AttemptStatusBand } from "@/components/onlyrounds/attempt-status-band"
import { ScoreGauge, type Verdict } from "@/components/onlyrounds/score-gauge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export type CandidateInsight = {
  /** "ok" = positive finding, "miss" = topic not covered. */
  tone: "ok" | "miss"
  label: string
}

export type CandidateState =
  | { kind: "pending"; attempted: number; total: number }
  | { kind: "incomplete"; attempted: number; total: number }
  | { kind: "completed"; score: number; verdict: Verdict; insights: CandidateInsight[] }
  | { kind: "no-response"; attempted: number; total: number }
  | { kind: "not-interested" }

export type Candidate = {
  id: string
  name: string
  role?: string
  company?: string
  email?: string
  phone?: string
  state: CandidateState
}

export function CandidateCard({
  candidate,
  onOpen,
  onMoveToNextRound,
  onReject,
  onReTake,
  onAddNote,
  onViewInsights,
  selectable,
  selected,
  onSelectChange,
  className,
}: {
  candidate: Candidate
  onOpen?: () => void
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: () => void
  onViewInsights?: () => void
  /** When true, a leading checkbox is rendered. Used by bulk-select. */
  selectable?: boolean
  selected?: boolean
  onSelectChange?: (next: boolean) => void
  className?: string
}) {
  const { name, role, company, email, phone, state } = candidate

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
        "rounded-lg border bg-card transition-shadow",
        selected
          ? "border-primary ring-1 ring-primary/30"
          : "border-border",
        onOpen && "cursor-pointer hover:shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      {/* Header: identity + contact + score/status */}
      <div className="flex items-start gap-3 px-4 py-3">
        {selectable && (
          <div
            className="flex h-9 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={selected}
              onCheckedChange={(v) => onSelectChange?.(v === true)}
              aria-label={`Select ${name}`}
            />
          </div>
        )}
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
              <span className="inline-flex items-center gap-1">
                <Phone className="size-3" />
                {phone}
              </span>
            )}
            {phone && (
              <button
                type="button"
                onClick={stop()}
                aria-label="Message on WhatsApp"
                className="inline-flex size-4 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="size-3" />
              </button>
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
          tone="info"
          label="Interview Pending"
          reason="Call not connected, Rescheduled for completion"
          attempted={state.attempted}
          total={state.total}
          helper="We're trying to reach the candidate for this interview. We'll update the status once they respond."
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
          onViewAttempts={stop()}
        />
      )}

      {state.kind === "no-response" && (
        <AttemptStatusBand
          tone="muted"
          label="No Response"
          reason="Candidate did not respond after all attempts"
          attempted={state.attempted}
          total={state.total}
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
        <Button
          variant="outline"
          size="sm"
          onClick={stop(onReTake)}
          className="h-8"
        >
          <RotateCcw className="size-3.5" />
          Re-take
        </Button>
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

      {/* Footer note action */}
      <div className="flex items-center justify-end border-t border-border px-4 py-1.5 text-xs">
        <button
          type="button"
          onClick={stop(onAddNote)}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3" />
          Add a note
        </button>
      </div>
    </article>
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

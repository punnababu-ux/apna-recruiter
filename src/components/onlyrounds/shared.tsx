"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import type { CandidateState } from "@/components/onlyrounds/candidate-card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ── WizardField ───────────────────────────────────────────────────────────
// Shared form-field wrapper used across all wizard steps.
// Unifies the three previously-duplicated local Field helpers.

export function WizardField({
  label,
  htmlFor,
  hint,
  error,
  required,
  optional,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  required?: boolean
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={htmlFor}
        className={cn("text-sm font-medium", error && "text-destructive")}
      >
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
        {optional && (
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            (Optional)
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export function DisplayField({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value?: string | React.ReactNode | null
  icon?: LucideIcon
}) {
  if (value == null) return null
  return (
    <div className="flex flex-col gap-1">
      <span className="text-overline text-muted-foreground inline-flex items-center leading-none gap-1.5">
        {Icon && <Icon className="size-3 text-muted-foreground shrink-0" aria-hidden />}
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-sm font-medium text-foreground whitespace-pre-wrap">
          {value || "—"}
        </span>
      ) : (
        value
      )}
    </div>
  )
}

// ── IconLabel ─────────────────────────────────────────────────────────────
// Plain inline "icon + text" pair. Used for meta lines under list rows or
// page headers (client, location, created date, owner, etc.).
// Inherits text size + colour from the parent — keep it light.

export function IconLabel({
  icon: Icon,
  children,
  iconClassName,
  className,
}: {
  icon: LucideIcon
  children: React.ReactNode
  /** Override the icon size. Defaults to size-3.5 (good for text-sm/-xs). */
  iconClassName?: string
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Icon className={cn("size-3.5 shrink-0", iconClassName)} aria-hidden />
      {children}
    </span>
  )
}

// ── InfoChip ──────────────────────────────────────────────────────────────
// Icon + label inline chip.
//
// CONTRAST RULE — pick the variant by the SURFACE the chip sits on:
//   • "muted"    → only on a plain white `bg-card` / `bg-background` surface.
//   • "outlined" → on ANY tinted or coloured surface (bg-muted, bg-accent,
//                  bg-*-subtle, etc). The white fill + border guarantees the
//                  chip reads regardless of the backdrop. When unsure, use
//                  "outlined" — it is always safe.
//
// Rationale: a `bg-muted` chip on a tinted container (e.g. bg-accent/30)
// has near-zero contrast and visually disappears. Defaulting tinted-surface
// chips to "outlined" prevents that class of bug.

export function InfoChip({
  icon: Icon,
  children,
  variant = "muted",
}: {
  icon: LucideIcon
  children: React.ReactNode
  variant?: "muted" | "outlined"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-muted-foreground",
        variant === "outlined"
          ? "border border-border bg-card"
          : "bg-muted",
      )}
    >
      <Icon className="size-3" />
      {children}
    </span>
  )
}

// ── SelectionCard ─────────────────────────────────────────────────────────
// Selectable card with border/background toggle and keyboard support.
// Uses div[role=button] to allow nested interactive elements (e.g. play buttons).

export function SelectionCard({
  selected,
  onSelect,
  className,
  children,
}: {
  selected: boolean
  onSelect: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "cursor-pointer rounded-lg border p-4 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        selected ? "border-primary bg-accent/30" : "border-border hover:bg-muted/40",
        className,
      )}
    >
      {children}
    </div>
  )
}

// ── RoundsErrorContext ────────────────────────────────────────────────────
// Carries the showErrors flag from InterviewRoundsStep down to ScreeningEditor
// and CefrAddon without prop-drilling through TaskCard.

export const RoundsErrorContext = React.createContext(false)

// ── ClientLogo ────────────────────────────────────────────────────────────
// Shared client/company logo helper.
export function ClientLogo({
  name,
  src,
  size = "sm",
}: {
  name: string
  src?: string
  size?: "sm" | "md"
}) {
  const sizeClass = size === "sm" ? "size-8" : "size-9"
  if (src) {
    return (
      <img
        src={src}
        alt={`${name} logo`}
        className={cn(
          sizeClass,
          "shrink-0 rounded-md border border-border bg-background object-contain p-1"
        )}
      />
    )
  }
  return (
    <div
      className={cn(
        sizeClass,
        "flex shrink-0 items-center justify-center rounded-md border border-border bg-muted text-xs font-semibold text-muted-foreground"
      )}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  )
}

// ── CandidateStatusBadge ──────────────────────────────────────────────────
// Shared fit/status badge rendering logic.
export function CandidateStatusBadge({ state }: { state: CandidateState }) {
  if (state.kind === "completed") {
    if (state.verdict === "fit") {
      return (
        <Badge variant="success" className="border border-success/30 font-semibold">
          Fit · {state.score}
        </Badge>
      )
    } else if (state.verdict === "not-fit") {
      return (
        <Badge variant="destructive" className="border border-destructive/30 font-semibold">
          Not fit · {state.score}
        </Badge>
      )
    } else {
      return (
        <Badge variant="warning" className="border border-warning/30 font-semibold">
          Review · {state.score}
        </Badge>
      )
    }
  }
  if (state.kind === "pending") {
    return (
      <Badge variant="warning" className="border border-warning/30 font-semibold">
        Interview pending
      </Badge>
    )
  }
  if (state.kind === "incomplete") {
    return (
      <Badge variant="warning" className="border border-warning/30 font-semibold">
        Incomplete call
      </Badge>
    )
  }
  if (state.kind === "no-response") {
    return (
      <Badge variant="secondary" className="border border-border font-semibold">
        No response
      </Badge>
    )
  }
  return (
    <Badge variant="secondary" className="border border-border font-semibold">
      Not interested
    </Badge>
  )
}

"use client"

import {
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  FileText,
  IndianRupee,
  MessageCircleQuestion,
  type IconComponent,
} from "@apna/design-system"
import * as React from "react"
import { cn } from "@/lib/utils"
import type { SectionId, SectionStatus } from "@/types/onlyrounds"

// Per-section icon shown in the accordion header chip (replaces the
// numeric index).
const SECTION_ICONS: Record<SectionId, IconComponent> = {
  basics: Briefcase,
  schedule: Clock,
  compensation: IndianRupee,
  questions: MessageCircleQuestion,
  additional: FileText,
}

// ---- section primitives -------------------------------------------------

function StatusPip({ status }: { status: SectionStatus }) {
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success-subtle px-2 py-0.5 text-xs font-medium text-success">
        <Check className="size-3" />
        Complete
      </span>
    )
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-medium text-warning-foreground">
        In progress
      </span>
    )
  }
  if (status === "invalid") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
        Missing fields
      </span>
    )
  }
  // "untouched" → no pip. An empty section needs no badge; optionality is
  // already conveyed by the section's "Optional — …" description.
  return null
}

export function Section({
  id,
  title,
  description,
  status,
  isOpen,
  onToggle,
  children,
}: {
  id: SectionId
  title: string
  description?: string
  status: SectionStatus
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const bodyId = `section-${id}-body`
  const Icon = SECTION_ICONS[id]
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-interactive hover:bg-muted/30"
      >
        {status === "complete" ? (
          <Check className="size-6 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <Icon
            className={cn(
              "size-6 shrink-0",
              status === "invalid"
                ? "text-destructive"
                : "text-muted-foreground",
            )}
            aria-hidden="true"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <StatusPip status={status} />
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-select",
            !isOpen && "-rotate-90",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen ? (
        <div
          id={bodyId}
          role="region"
          className="flex flex-col gap-4 border-t border-border bg-card p-5"
        >
          {children}
        </div>
      ) : null}
    </section>
  )
}

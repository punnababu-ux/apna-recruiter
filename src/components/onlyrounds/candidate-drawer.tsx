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

import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"
import { DrawerBody } from "@/components/onlyrounds/candidate-drawer/drawer-body"

export type {
  CefrAnalysis,
  CefrDimension,
  CommunicationEvent,
  CriteriaGroup,
  CriterionScore,
  DrawerCandidate,
  DrawerInsight,
  EducationEntry,
  ExperienceEntry,
  InterviewViolation,
  ProfileSummary,
} from "@/components/onlyrounds/candidate-drawer/types"

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


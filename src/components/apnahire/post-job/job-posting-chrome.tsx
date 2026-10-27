"use client"

/**
 * JobPostingChrome — sticky header for every step of "Create new job":
 * back + title row (Save & exit on the right) over a horizontal stepper.
 * Shared by the posting wizard and the plan step so the four steps read as
 * one flow.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  BackButton,
  Button,
  ChevronDown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Save,
  Stepper,
  type Step,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

/** The wizard's three stages, then the plan page. */
export type JobPostingStep = "job" | "candidates" | "setup" | "plan"

const STEPS: { id: JobPostingStep; label: string }[] = [
  { id: "job", label: "Job details" },
  { id: "candidates", label: "Who can apply" },
  { id: "setup", label: "Hiring setup" },
  { id: "plan", label: "Select plan" },
]

interface JobPostingChromeProps {
  current: JobPostingStep
  onStepClick?: (step: JobPostingStep) => void
  /** Extra header actions left of Save & exit. */
  actions?: React.ReactNode
  /** Persist before leaving; Save & exit always returns to the jobs list. */
  onSaveExit?: () => void
  /** Called instead of leaving (back or Save & exit) so the page can step
   *  in first, e.g. the express-checkout exit nudge. Call `proceed` to
   *  carry on leaving. Without it, both leave straight away. */
  onExitAttempt?: (proceed: () => void) => void
  /** E.g. "max-sm:hidden" when the page shows progress elsewhere on phones
   *  (the wizard footer's bar) — one progress indicator per screen. */
  stepperClassName?: string
}

export function JobPostingChrome({
  current,
  onStepClick,
  actions,
  onSaveExit,
  onExitAttempt,
  stepperClassName,
}: JobPostingChromeProps) {
  const router = useRouter()
  const currentIdx = STEPS.findIndex((s) => s.id === current)
  const steps: Step[] = STEPS.map((s, i) => ({
    id: s.id,
    label: s.label,
    status: i < currentIdx ? "completed" : i === currentIdx ? "current" : "pending",
  }))

  const leave = (proceed: () => void) => (onExitAttempt ? onExitAttempt(proceed) : proceed())

  return (
    <div className="sticky top-0 z-sticky border-b border-border bg-card">
      <div className={cn("border-b border-border px-4 py-2.5 sm:px-6 sm:py-3", stepperClassName && "max-sm:border-b-0")}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <BackButton onClick={() => leave(() => router.push("/apnahire/jobs"))} aria-label="Back to jobs" />
            <span className="text-sm font-semibold text-foreground sm:text-base">Create new job</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {actions}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                leave(() => {
                  onSaveExit?.()
                  toast.success("Draft saved")
                  router.push("/apnahire/jobs")
                })
              }
            >
              <Save className="size-4" aria-hidden />
              <span className="hidden sm:inline">Save &amp; exit</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={cn("px-4 py-2 sm:px-6 sm:py-3", stepperClassName)}>
        <div className="mx-auto w-full max-w-6xl">
          <Stepper
            orientation="horizontal"
            steps={steps}
            onStepClick={onStepClick ? (id) => onStepClick(id as JobPostingStep) : undefined}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * The phone's step indicator, in the bottom bar of every step (questions and
 * the plan page): "Step 2 of 4 / Who can apply ⌄". Tapping opens the steps;
 * earlier ones jump back, later ones are disabled. From sm the header
 * stepper does this job, so it hides itself there.
 */
export function JobPostingStepMenu({
  current,
  onJump,
}: {
  current: JobPostingStep
  onJump: (step: JobPostingStep) => void
}) {
  const at = STEPS.findIndex((s) => s.id === current)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="ink relative -ml-2 flex min-w-0 shrink-0 items-center gap-1 rounded-control px-2 py-1 text-left transition-interactive sm:hidden"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">
                Step {at + 1} of {STEPS.length}
              </span>
              <span className="truncate text-sm font-semibold text-foreground">{STEPS[at].label}</span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        }
      />
      <DropdownMenuContent align="start" side="top">
        {STEPS.map((s, i) => (
          <DropdownMenuItem key={s.id} disabled={i >= at} onClick={() => onJump(s.id)}>
            Step {i + 1} · {s.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

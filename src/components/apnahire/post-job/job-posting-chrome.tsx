"use client"

/**
 * JobPostingChrome — sticky header for every step of "Create new job":
 * back + title row (Save & exit on the right) over a horizontal stepper.
 * Shared by the AI posting flow and the plan step so the three steps read
 * as one flow.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { BackButton, Button, Save, Stepper, type Step } from "@apna/design-system"

export type JobPostingStep = "describe" | "review" | "plan"

const STEPS: { id: JobPostingStep; label: string }[] = [
  { id: "describe", label: "Describe the role" },
  { id: "review", label: "Review & preview" },
  { id: "plan", label: "Select plan" },
]

interface JobPostingChromeProps {
  current: JobPostingStep
  onStepClick?: (step: JobPostingStep) => void
  /** Extra header actions left of Save & exit. */
  actions?: React.ReactNode
  /** Persist before leaving; Save & exit always returns to the jobs list. */
  onSaveExit?: () => void
}

export function JobPostingChrome({ current, onStepClick, actions, onSaveExit }: JobPostingChromeProps) {
  const router = useRouter()
  const currentIdx = STEPS.findIndex((s) => s.id === current)
  const steps: Step[] = STEPS.map((s, i) => ({
    id: s.id,
    label: s.label,
    status: i < currentIdx ? "completed" : i === currentIdx ? "current" : "pending",
  }))

  return (
    <div className="sticky top-0 z-sticky border-b border-border bg-card">
      <div className="border-b border-border px-6 py-3">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton onClick={() => router.push("/apnahire/jobs")} aria-label="Back to jobs" />
            <span className="text-base font-semibold text-foreground">Create new job</span>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onSaveExit?.()
                toast.success("Draft saved")
                router.push("/apnahire/jobs")
              }}
            >
              <Save className="size-4" aria-hidden />
              Save &amp; exit
            </Button>
          </div>
        </div>
      </div>
      <div className="px-6 py-3">
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

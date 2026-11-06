"use client"

import { Save, Stepper, type Step } from "@apna/design-system"
import type * as React from "react"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import type { StepId } from "@/components/onlyrounds/create-job-wizard/steps"

// Sticky top — title row + step-progress rail
export function WizardTopBar({
  handleExitAttempt,
  handleSaveAndExit,
  stepsForRail,
  setShowErrors,
  setActiveId,
}: {
  handleExitAttempt: () => void
  handleSaveAndExit: () => void
  stepsForRail: Step[]
  setShowErrors: React.Dispatch<React.SetStateAction<boolean>>
  setActiveId: React.Dispatch<React.SetStateAction<StepId>>
}) {
  return (
    <div className="sticky top-0 z-sticky border-b border-border bg-card">
      {/* Title row — back/title on the left, Save & exit on the right */}
      <div className="border-b border-border px-6 py-3">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BackButton
              onClick={handleExitAttempt}
              aria-label="Back to jobs"
            />
            <span className="text-base font-semibold text-foreground">
              Create new job
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveAndExit}
          >
            <Save className="size-4" />
            Save &amp; exit
          </Button>
        </div>
      </div>
      {/* Stepper row */}
      <div className="px-6 py-3">
        <div className="mx-auto w-full max-w-5xl">
          <Stepper
            orientation="horizontal"
            steps={stepsForRail}
            onStepClick={(id) => {
              setShowErrors(false)
              setActiveId(id as StepId)
            }}
          />
        </div>
      </div>
    </div>
  )
}

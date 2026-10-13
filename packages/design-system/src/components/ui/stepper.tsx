"use client"

/**
 * Stepper — wizard progress rail, vertical or horizontal.
 *
 * Ordered list of steps, each with a status glyph (completed ✓ / current
 * numbered / pending numbered-outline), label, and optional description.
 * Purely presentational — the parent drives navigation; pass `onStepClick`
 * to make completed/current steps clickable.
 *
 * API
 *   <Stepper orientation="horizontal" steps={[{ id, label, status }]} />
 */

import * as React from "react"

import { Check } from "@/icons/icons"
import { cn } from "@/lib/utils"

export type StepStatus = "completed" | "current" | "pending"

export type Step = {
  id: string
  label: string
  description?: string
  status: StepStatus
}

export function Stepper({
  steps,
  onStepClick,
  orientation = "vertical",
  className,
}: {
  steps: Step[]
  onStepClick?: (id: string) => void
  orientation?: "vertical" | "horizontal"
  className?: string
}) {
  const horizontal = orientation === "horizontal"
  return (
    <ol
      className={cn(
        horizontal
          ? "flex w-full items-center gap-3"
          : "flex flex-col gap-5",
        className,
      )}
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1
        const connected = !isLast
        if (horizontal) {
          return (
            <React.Fragment key={step.id}>
              <li className="flex shrink-0 items-center">
                <button
                  type="button"
                  onClick={
                    onStepClick ? () => onStepClick(step.id) : undefined
                  }
                  disabled={!onStepClick || step.status === "pending"}
                  className={cn(
                    "flex items-center gap-2 text-left",
                    onStepClick &&
                      step.status !== "pending" &&
                      "cursor-pointer",
                  )}
                >
                  <StepGlyph status={step.status} index={idx + 1} />
                  {/* Below sm only the current step keeps its label (the
                      others stay as numbered glyphs, still announced), so a
                      3–5 step rail fits a phone without scrolling sideways. */}
                  <span
                    className={cn(
                      "text-sm font-medium leading-tight",
                      step.status === "current" && "text-primary",
                      step.status === "pending" && "text-muted-foreground",
                      step.status !== "current" && "max-sm:sr-only",
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
              {connected ? (
                <li
                  aria-hidden
                  className={cn(
                    "h-px flex-1",
                    step.status === "completed"
                      ? "bg-primary/50"
                      : "bg-border",
                  )}
                />
              ) : null}
            </React.Fragment>
          )
        }
        return (
          <li key={step.id} className="relative flex gap-3">
            {connected ? (
              <span
                aria-hidden
                className={cn(
                  "absolute left-3 top-7 h-[calc(100%+0.5rem)] w-px -translate-x-px",
                  step.status === "completed" ? "bg-primary/50" : "bg-border",
                )}
              />
            ) : null}
            <StepGlyph status={step.status} index={idx + 1} />
            <button
              type="button"
              onClick={onStepClick ? () => onStepClick(step.id) : undefined}
              disabled={!onStepClick || step.status === "pending"}
              className={cn(
                "min-w-0 flex-1 text-left",
                onStepClick && step.status !== "pending" && "cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium leading-tight",
                  step.status === "current" && "text-foreground",
                  step.status === "pending" && "text-muted-foreground",
                )}
              >
                {step.label}
              </div>
              {step.description ? (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              ) : null}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function StepGlyph({ status, index }: { status: StepStatus; index: number }) {
  if (status === "completed") {
    return (
      <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-3.5" />
      </span>
    )
  }
  if (status === "current") {
    return (
      <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {index}
      </span>
    )
  }
  return (
    <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground">
      {index}
    </span>
  )
}

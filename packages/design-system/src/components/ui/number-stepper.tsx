"use client"

/**
 * NumberStepper — a small whole-number answer set with − and + instead of
 * typing: years of experience, number of openings. Faster than a keyboard on
 * a phone, and it can't produce an invalid value.
 *
 * The value is announced through a live region, and the buttons say what
 * they change ("Decrease minimum experience"). At `min` / `max` the matching
 * button disables.
 *
 * API
 *   <NumberStepper
 *     label="Minimum experience"
 *     value={years}
 *     onValueChange={setYears}
 *     min={0}
 *     max={30}
 *     format={(n) => `${n} yr${n === 1 ? "" : "s"}`}
 *   />
 */

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "@/icons/icons"
import { cn } from "@/lib/utils"

interface NumberStepperProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  label: React.ReactNode
  /** Plain-text name for the buttons' labels, when `label` isn't a string. */
  name?: string
  description?: React.ReactNode
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  format?: (value: number) => React.ReactNode
}

function NumberStepper({
  label,
  name,
  description,
  value,
  onValueChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  format = (n) => n,
  className,
  ...props
}: NumberStepperProps) {
  const id = React.useId()
  const what = name ?? (typeof label === "string" ? label.toLowerCase() : "value")
  return (
    <div
      data-slot="number-stepper"
      className={cn("flex items-center justify-between gap-4 py-3", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <span id={`${id}-label`} className="text-sm font-medium text-foreground">
          {label}
        </span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
      <div className="flex shrink-0 items-center gap-3" role="group" aria-labelledby={`${id}-label`}>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Decrease ${what}`}
          disabled={value - step < min}
          onClick={() => onValueChange(Math.max(min, value - step))}
        >
          <Minus />
        </Button>
        <span aria-live="polite" className="min-w-12 text-center text-sm font-semibold tabular-nums text-foreground">
          {format(value)}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Increase ${what}`}
          disabled={value + step > max}
          onClick={() => onValueChange(Math.min(max, value + step))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export { NumberStepper }
export type { NumberStepperProps }

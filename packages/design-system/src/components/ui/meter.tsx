"use client"

/**
 * Meter — a quiet bar for how much of something is used or left: job slots
 * in use, database credits left, days left in a billing cycle. A gauge, not
 * a task's progress (that's Wizard's segmented progress).
 *
 *   value / max   the filled share
 *   tone          "default" (primary) · "warning" (running low) ·
 *                 "destructive" (none left). The caller decides when a
 *                 reading counts as low; the meter only paints it.
 *   size          "sm" (6px, default) · "lg" (18px, a headline gauge such as
 *                 the days left in a plan's cycle)
 *   label         the accessible name ("Job slots in use"). The visible
 *                 label and figures stay with the caller, so a meter sits
 *                 under any layout.
 *
 * a11y: Base UI Meter (role="meter", aria-valuenow / min / max).
 *
 *   <Meter label="Database credits left" value={320} max={500} />
 */

import * as React from "react"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const meterTrackVariants = cva("w-full overflow-hidden rounded-full bg-border", {
  variants: { size: { sm: "h-1.5", lg: "h-4.5" } },
  defaultVariants: { size: "sm" },
})

const meterIndicatorVariants = cva("h-full rounded-full transition-interactive", {
  variants: {
    tone: {
      default: "bg-primary",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: { tone: "default" },
})

function Meter({
  label,
  value,
  max = 100,
  tone,
  size,
  className,
}: {
  label: string
  value: number
  max?: number
  className?: string
} & VariantProps<typeof meterIndicatorVariants> & VariantProps<typeof meterTrackVariants>) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      aria-label={label}
      value={Math.max(0, Math.min(value, max))}
      max={max}
      className={cn("w-full", className)}
    >
      <MeterPrimitive.Track className={meterTrackVariants({ size })}>
        <MeterPrimitive.Indicator className={meterIndicatorVariants({ tone })} />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  )
}

export { Meter, meterIndicatorVariants, meterTrackVariants }

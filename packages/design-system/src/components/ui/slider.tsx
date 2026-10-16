"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  thumbLabels,
  size = "default",
  ...props
}: SliderPrimitive.Root.Props & {
  /** Accessible names for the thumbs, e.g. ["Minimum salary", "Maximum salary"]. */
  thumbLabels?: string[]
  /** "sm" is a slim seek bar (4px track, 12px solid thumb) for media
   *  players; "default" is the form control. */
  size?: "default" | "sm"
}) {
  const current = value ?? defaultValue
  const thumbs = Array.isArray(current) ? current.length : 1
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-size={size}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex w-full items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn("relative w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2", size === "sm" ? "h-1" : "h-2")}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="absolute h-full bg-primary data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {/* One thumb per value: pass an array (`[min, max]`) for a range. */}
        {Array.from({ length: thumbs }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            index={i}
            data-slot="slider-thumb"
            getAriaLabel={thumbLabels ? () => thumbLabels[i] ?? "" : undefined}
            className={cn(
              "block rounded-full transition-interactive hover:ring-4 hover:ring-primary/15 has-focus-visible:ring-3 has-focus-visible:ring-ring/50 data-dragging:scale-110 data-dragging:ring-4 data-dragging:ring-primary/20 data-disabled:cursor-not-allowed",
              size === "sm" ? "size-3 bg-primary" : "size-5 border-2 border-primary bg-background"
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }

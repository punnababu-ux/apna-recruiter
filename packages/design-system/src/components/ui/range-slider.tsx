"use client"

/**
 * RangeSlider — a from–to range picked by dragging two handles along a
 * ruler: salary brackets, age bands. Built for touch first:
 *
 *   - Ruler track: minor ticks every `ticks.minor`, taller major ticks every
 *     `ticks.major`; ticks inside the range take the accent.
 *   - A soft band fills the chosen range.
 *   - Pill handles (24×40) with grip lines — big enough to grab with a
 *     thumb. While hovered, dragged or focused a handle glows and shows
 *     its value in a bubble above it.
 *   - Crossing a major tick gives a light haptic tick on phones that
 *     support it.
 *   - `unset`: grey until the user has given a value, so a default range
 *     never reads as an answer.
 *   - `invalid`: the handle at fault turns destructive.
 *
 * Built on Base UI Slider (via the same primitive as Slider), so dragging,
 * keyboard (arrows / PageUp / Home / End) and screen readers work; each
 * handle is named by `thumbLabels` and announces `formatValue(value)`.
 *
 * API
 *   <RangeSlider
 *     min={5000} max={60000} step={500}
 *     value={[15000, 20000]}
 *     onValueChange={([lo, hi]) => …}
 *     ticks={{ minor: 2500, major: 10000 }}
 *     scale={[5000, 20000, 40000, 60000]}
 *     formatValue={(n) => `₹${n.toLocaleString("en-IN")}`}
 *     thumbLabels={["Minimum salary", "Maximum salary"]}
 *   />
 */

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  /** Tick spacing in value units. */
  ticks?: { minor: number; major: number }
  /** Values labelled under the track. */
  scale?: number[]
  formatValue?: (value: number) => string
  /** Shorter form for the scale labels, e.g. "₹20k". */
  formatScale?: (value: number) => string
  thumbLabels?: [string, string]
  /** Nothing chosen yet: shown in grey. */
  unset?: boolean
  /** Which handle is in error. */
  invalid?: "min" | "max" | null
  className?: string
}

function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  ticks,
  scale,
  formatValue = (n) => String(n),
  formatScale = formatValue,
  thumbLabels,
  unset = false,
  invalid = null,
  className,
}: RangeSliderProps) {
  const pct = (v: number) => ((Math.min(max, Math.max(min, v)) - min) / (max - min)) * 100
  const [lo, hi] = value

  // A light tick on phones as a handle crosses a major mark.
  const lastBand = React.useRef<number[]>([])
  const haptic = (next: number[]) => {
    if (!ticks) return
    const bands = next.map((v) => Math.floor(v / ticks.major))
    if (lastBand.current.length && bands.some((b, i) => b !== lastBand.current[i])) {
      try {
        navigator.vibrate?.(6)
      } catch {
        // Not supported, or blocked — the tick is a nicety.
      }
    }
    lastBand.current = bands
  }

  const tickValues: { v: number; major: boolean }[] = []
  if (ticks) {
    for (let v = Math.ceil(min / ticks.minor) * ticks.minor; v <= max; v += ticks.minor) {
      tickValues.push({ v, major: v % ticks.major === 0 })
    }
  }

  return (
    <div data-slot="range-slider" data-unset={unset || undefined} className={cn("flex flex-col gap-1", className)}>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => {
          const next = v as number[]
          haptic(next)
          onValueChange([next[0], next[1]])
        }}
        className="relative w-full touch-none select-none pt-9"
      >
        <SliderPrimitive.Control className="relative flex h-10 w-full items-center">
          {/* Baseline + ruler ticks, under the band and handles. */}
          <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          {tickValues.map(({ v, major }) => {
            const inRange = !unset && v >= lo && v <= hi
            return (
              <span
                key={v}
                aria-hidden
                className={cn(
                  "absolute top-1/2 w-px -translate-x-1/2 -translate-y-1/2 rounded-full transition-interactive duration-150",
                  major ? "h-3" : "h-1.5",
                  inRange ? (major ? "bg-primary" : "bg-primary/50") : major ? "bg-muted-foreground" : "bg-border"
                )}
                style={{ left: `${pct(v)}%` }}
              />
            )
          })}
          <SliderPrimitive.Track className="relative h-7 w-full">
            {/* The chosen range: a soft band behind the ticks' accent. */}
            <SliderPrimitive.Indicator
              className={cn(
                "absolute h-full rounded-lg transition-interactive duration-150",
                unset ? "bg-muted" : invalid ? "bg-destructive/10" : "bg-accent"
              )}
            />
          </SliderPrimitive.Track>
          {[0, 1].map((i) => {
            const bad = (i === 0 && invalid === "min") || (i === 1 && invalid === "max")
            return (
              <SliderPrimitive.Thumb
                key={i}
                index={i}
                getAriaLabel={thumbLabels ? () => thumbLabels[i] : undefined}
                getAriaValueText={(_, v) => formatValue(v)}
                className={cn(
                  "group/thumb flex h-10 w-6 cursor-grab items-center justify-center gap-0.5 rounded-xl border-2 border-background shadow-popover outline-none transition-[box-shadow,scale,background-color] duration-150",
                  // Focus lands on the hidden input inside the thumb, so it's
                  // focus-within, not a data attribute.
                  "data-dragging:scale-105 data-dragging:cursor-grabbing data-dragging:ring-4 focus-within:ring-4",
                  unset
                    ? "bg-muted-foreground ring-muted-foreground/20"
                    : bad
                      ? "bg-destructive ring-destructive/20"
                      : "bg-primary ring-primary/20"
                )}
              >
                {/* Grip lines. */}
                <span aria-hidden className="h-3 w-0.5 rounded-full bg-primary-foreground" />
                <span aria-hidden className="h-3 w-0.5 rounded-full bg-primary-foreground" />
                {/* Value bubble while dragging / focused. */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold tabular-nums opacity-0 transition-[opacity,translate] duration-150",
                    "translate-y-1 group-hover/thumb:translate-y-0 group-hover/thumb:opacity-100 group-data-dragging/thumb:translate-y-0 group-data-dragging/thumb:opacity-100 group-focus-within/thumb:translate-y-0 group-focus-within/thumb:opacity-100",
                    bad ? "bg-destructive text-destructive-foreground" : "bg-foreground text-background"
                  )}
                >
                  {formatValue(value[i])}
                </span>
              </SliderPrimitive.Thumb>
            )
          })}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
      {scale && (
        <div aria-hidden className="relative h-4 text-xs tabular-nums text-muted-foreground">
          {scale.map((v, i) => (
            <span
              key={v}
              className={cn(
                "absolute whitespace-nowrap",
                i === 0 ? "" : i === scale.length - 1 ? "-translate-x-full" : "-translate-x-1/2"
              )}
              style={{ left: `${pct(v)}%` }}
            >
              {formatScale(v)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export { RangeSlider }
export type { RangeSliderProps }

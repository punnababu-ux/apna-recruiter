"use client"

/**
 * ChipTabs — pill-shaped segmented control.
 *
 * A tab group rendered as rounded-full chips. Active chip gets the
 * `secondary` surface; inactive chips are text-only and gain a muted
 * hover. Each item can optionally carry a numeric `count` rendered in
 * a subdued weight next to the label.
 *
 * Controlled: owners hold `value` + `onValueChange`. Keyboard/accessibility
 * maps to a radiogroup — each chip is a `role="tab"` within `role="tablist"`
 * so assistive tech reads the set as a single control.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

export type ChipTabItem<V extends string = string> = {
  value: V
  label: React.ReactNode
  count?: number
}

export function ChipTabs<V extends string = string>({
  items,
  value,
  onValueChange,
  className,
  size = "md",
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: {
  items: ChipTabItem<V>[]
  value: V
  onValueChange: (next: V) => void
  className?: string
  size?: "sm" | "md"
  "aria-label"?: string
  /** When true (e.g. a required, unselected field), inactive chips gain a
   *  destructive outline to signal a selection is needed. */
  "aria-invalid"?: boolean
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid || undefined}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {items.map((item) => {
        const active = value === item.value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
              active
                ? "border-transparent bg-secondary text-secondary-foreground"
                : ariaInvalid
                  ? "border-destructive/60 text-destructive hover:bg-destructive/10"
                  : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.label}
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "text-xs",
                  active ? "text-secondary-foreground/70" : "text-muted-foreground"
                )}
              >
                ({item.count})
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

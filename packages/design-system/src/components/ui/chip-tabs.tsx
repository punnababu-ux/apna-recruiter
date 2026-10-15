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
import { useSlidingIndicator } from "../../hooks/use-sliding-indicator"

export type ChipTabItem<V extends string = string> = {
  value: V
  label: React.ReactNode
  count?: number
  /** Render the chip non-interactive and dimmed (e.g. an option that
   *  isn't valid given another selection). */
  disabled?: boolean
}

export function ChipTabs<V extends string = string>({
  items,
  value,
  onValueChange,
  className,
  size = "md",
  variant = "default",
  itemClassName,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: {
  items: ChipTabItem<V>[]
  value: V
  onValueChange: (next: V) => void
  className?: string
  /** `lg` (40px) is the touch size for answers in a wizard screen. */
  size?: "sm" | "md" | "lg"
  /**
   * Visual treatment:
   * - "default" — segmented control: active chip on the `secondary`
   *   surface, inactive chips text-only. Use for view-switching tabs.
   * - "choice" — single-select form field: inactive chips are filled
   *   grey, the selected chip gets a green (brand) tint + green border.
   * - "solid" — high-contrast ink chip on a translucent track, for a
   *   compact switcher sitting on a tinted surface rather than on the page
   *   background. Inactive chips are text-only and un-bolded.
   */
  variant?: "default" | "choice" | "solid"
  /** Layout-only overrides for each chip (padding, width). Not for colour —
   *  that belongs to `variant`. */
  itemClassName?: string
  "aria-label"?: string
  /** When true (e.g. a required, unselected field), inactive chips gain a
   *  destructive outline to signal a selection is needed. */
  "aria-invalid"?: boolean
}) {
  // Segmented variants share one pill that slides to the selection. "choice"
  // is a form field where every chip is filled, so it keeps per-chip
  // highlighting.
  const slides = variant !== "choice"
  const { containerRef, indicatorRef } = useSlidingIndicator(value)

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className={cn("relative isolate flex flex-wrap items-center gap-2", className)}
    >
      {slides && (
        <span
          ref={indicatorRef}
          aria-hidden
          className={cn(
            "sliding-indicator rounded-full",
            variant === "solid" ? "bg-chip-solid" : "bg-secondary"
          )}
        />
      )}
      {items.map((item) => {
        const active = value === item.value
        const stateClass =
          variant === "solid"
            ? active
              ? "border-transparent font-semibold text-chip-solid-foreground"
              : "border-transparent font-regular text-muted-foreground hover:text-foreground"
            : variant === "choice"
            ? active
              ? "border-primary bg-accent text-accent-foreground"
              : ariaInvalid
                ? "border-destructive/60 bg-destructive/5 text-destructive hover:bg-destructive/10"
                : "border-border bg-muted text-muted-foreground hover:text-foreground"
            : active
              ? "border-transparent text-secondary-foreground"
              : ariaInvalid
                ? "border-destructive/60 text-destructive hover:bg-destructive/10"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            data-indicator-active={(slides && active) || undefined}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "ink press relative inline-flex items-center justify-center gap-1 rounded-full border font-medium transition-interactive outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40",
              size === "sm" ? "h-7 px-2.5 text-xs" : size === "lg" ? "h-10 px-4 text-sm" : "h-8 px-3 text-sm",
              variant === "solid" && size === "md" && "px-4",
              stateClass,
              itemClassName
            )}
          >
            {item.label}
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "text-xs",
                  active
                    ? "text-secondary-foreground/70"
                    : "text-muted-foreground"
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

"use client"

/**
 * SegmentedTabSwitcher — a responsive top-level section switcher.
 *
 * Two layouts, one controlled `value`/`onValueChange`, breakpoint-driven —
 * both render in the DOM simultaneously and CSS (`md:`) decides which shows:
 *
 *   Desktop (≥ md) — a full-width segmented pill. Each item gets equal
 *   width (`flex-1`), stacking an icon+label row over an optional
 *   description line. The active item floats as a solid card with a
 *   shadow on the track.
 *
 *   Mobile (< md) — a horizontally-scrolling row of icon+label chips
 *   (no description line — "YouTube/Airbnb style" filter chips). The
 *   active chip gets a solid card background; others sit on a flat
 *   translucent track. Scrolls with no visible scrollbar.
 *
 * Extracted from the apnahire self-checkout page's Jobs/Database/
 * Unlimited/Enterprise switcher. Colour is themeable via `trackClassName`
 * (the desktop pill's background, AND each inactive mobile chip's own
 * background — the mobile row itself never paints a background, only its
 * chips do) and `activeClassName`/`mobileActiveClassName` (active
 * icon+label colour, which the source design intentionally differs
 * between layouts) — the defaults below use ordinary theme-aware tokens;
 * a page with its own fixed-across-themes marketing surface (like
 * checkout's ambient-mesh hero) should override them.
 *
 * Rule of thumb for reuse: pick this over `Tabs`/`ChipTabs` only when you
 * need BOTH the two-line desktop pill AND a distinct mobile chip-carousel
 * layout for the same control. For a plain single-row tab bar (any
 * viewport), use `Tabs`. For inline filter/choice chips that wrap instead
 * of scroll, use `ChipTabs`.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SegmentedTabItem<V extends string = string> {
  value: V
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface SegmentedTabSwitcherProps<V extends string = string> {
  items: SegmentedTabItem<V>[]
  value: V
  onValueChange: (value: V) => void
  /** Desktop pill background, and each inactive mobile chip's own
   *  background (the mobile row itself is never painted). Defaults to
   *  `bg-muted`. */
  trackClassName?: string
  /** Icon/label colour for the active item on the desktop pill. Defaults
   *  to `text-primary`. */
  activeClassName?: string
  /** Icon/label colour for the active chip on mobile — a brand accent
   *  often reads better here than the desktop's neutral active colour
   *  (that's the case in the source this was extracted from). Defaults
   *  to `activeClassName`. */
  mobileActiveClassName?: string
  /** Icon/label colour for inactive items, both layouts. Defaults to
   *  `text-muted-foreground`. */
  inactiveClassName?: string
  /** Desktop description-line colour (both states). Defaults to
   *  `text-muted-foreground`. */
  mutedClassName?: string
  className?: string
}

export function SegmentedTabSwitcher<V extends string = string>({
  items,
  value,
  onValueChange,
  trackClassName,
  activeClassName = "text-primary",
  mobileActiveClassName,
  inactiveClassName = "text-muted-foreground",
  mutedClassName = "text-muted-foreground",
  className,
}: SegmentedTabSwitcherProps<V>) {
  return (
    <div data-slot="segmented-tab-switcher" className={cn("w-full", className)}>
      {/* Desktop — full-width segmented pill, two-line items. `items-stretch`
          (not `items-center`) is load-bearing: if one item's description
          wraps to a second line, every pill must grow to match its height,
          not just the wrapped one — stretch achieves that for free. */}
      <div
        className={cn(
          "hidden w-full items-stretch gap-2 rounded-full bg-muted p-2 md:flex",
          trackClassName
        )}
      >
        {items.map(({ value: v, label, description, icon }) => {
          const active = v === value
          return (
            <button
              key={v}
              type="button"
              onClick={() => onValueChange(v)}
              aria-pressed={active}
              className={cn(
                "flex flex-1 flex-col items-start justify-center gap-1 rounded-full px-5 py-3 text-left transition-all duration-200",
                active ? "bg-card shadow-sm" : "hover:bg-card/60"
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold",
                  active ? activeClassName : inactiveClassName
                )}
              >
                {icon}
                {label}
              </span>
              {description && (
                <span
                  className={cn(
                    "text-xs leading-tight",
                    mutedClassName,
                    !active && "opacity-70"
                  )}
                >
                  {description}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile — horizontally-scrolling icon+label chip carousel, full-bleed
          to the viewport edge (the classic "negative margin on the scroll
          container, matching padding on its content" trick): the outer div
          cancels this component's usual parent gutter (px-4 sm:px-10) so
          the scrollable area itself reaches the true screen edge, while the
          inner row re-adds that same padding so the first/last chip still
          starts with a visual gutter — one that scrolls away as the user
          swipes, instead of being a hard stop. No background on the row
          itself (that painted a visible rectangular tint behind/around the
          chips) — each chip carries its own pill background instead, same
          as the source design. */}
      <div className="no-scrollbar -mx-4 overflow-x-auto pb-1 sm:-mx-10 md:hidden">
        {/* `w-max` is load-bearing: without it, this row (a plain block-level
            flex child) sizes to fill the *viewport*, not its own content —
            its overflowing children then render past its own box and
            trailing padding entirely, so the last chip has no right gutter
            at max scroll. `w-max` makes the row grow to fit all children
            (+ both paddings), which is what the scrollable area should be
            measuring in the first place. */}
        <div className="flex w-max gap-2 px-4 sm:px-10">
          {items.map(({ value: v, label, icon }) => {
            const active = v === value
            return (
              <button
                key={v}
                type="button"
                onClick={() => onValueChange(v)}
                aria-pressed={active}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? cn("border-transparent bg-card font-bold shadow-sm", mobileActiveClassName ?? activeClassName)
                    : cn("border-transparent bg-muted hover:bg-muted", inactiveClassName, trackClassName)
                )}
              >
                {icon}
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

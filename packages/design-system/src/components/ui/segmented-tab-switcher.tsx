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
 * icon+label colour, split in two so a design can differ per layout) —
 * the defaults below use ordinary theme-aware tokens;
 * a page with its own fixed-across-themes marketing surface (like
 * checkout's ambient-mesh hero) should override them. Glyph sizing is the
 * component's own (24px desktop, 20px mobile) — call sites pass icons
 * without a size class.
 *
 * Rule of thumb for reuse: pick this over `Tabs`/`ChipTabs` only when you
 * need BOTH the two-line desktop pill AND a distinct mobile chip-carousel
 * layout for the same control. For a plain single-row tab bar (any
 * viewport), use `Tabs`. For inline filter/choice chips that wrap instead
 * of scroll, use `ChipTabs`.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { useSlidingIndicator } from "../../hooks/use-sliding-indicator"

export interface SegmentedTabItem<V extends string = string> {
  value: V
  label: string
  /** Shorter label for the mobile chip row, where four full labels
   *  ("Enterprise plans") don't fit. Falls back to `label`. */
  shortLabel?: string
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
  /** Icon/label colour for the active chip on mobile, for designs that
   *  tint it differently from the desktop pill. Defaults to
   *  `activeClassName`. */
  mobileActiveClassName?: string
  /** Icon/label colour for inactive items, both layouts. Defaults to
   *  `text-muted-foreground`. */
  inactiveClassName?: string
  /** Desktop description-line colour (both states). Defaults to
   *  `text-muted-foreground`. */
  mutedClassName?: string
  /** Surface treatment for the active desktop pill — the single indicator
   *  that slides between items — replacing the default `bg-card shadow-card`
   *  outright. Pass the complete string — a partial
   *  override (say `"shadow-none"`) would drop the fill rather than merge
   *  with it. Use an inset ring, not `border`, for a stroke: a real border
   *  grows the pill and therefore the whole track. */
  activeItemClassName?: string
  /** Extra classes for the phone chip row's selected pill (e.g. a lift for
   *  a surface whose colour matches the default pill). */
  mobileActiveItemClassName?: string
  /** The mobile carousel is full-bleed: it cancels the parent's gutter and
   *  re-adds it inside, so the scroll area reaches the screen edge while the
   *  first and last chips keep a gutter that scrolls away. These two must
   *  mirror whatever gutter the PARENT uses — override both together when it
   *  isn't the default `px-4 sm:px-10`, or the carousel over/undershoots and
   *  can cause horizontal page scroll. */
  mobileBleedClassName?: string
  mobileGutterClassName?: string
  /** Colour preset. `checkout` is self-checkout's look (grey track, ringed
   *  white pill, green active label, fixed across themes), used by the plans
   *  hero and every phone chip row (MobileChipRow). Prefer it to passing the
   *  colour props one by one; they still override it. */
  appearance?: "default" | "checkout"
  className?: string
}

const APPEARANCES = {
  default: {
    track: undefined,
    active: "text-primary",
    inactive: "text-muted-foreground",
    muted: "text-muted-foreground",
    activeItem: "bg-card shadow-card",
  },
  checkout: {
    track: "bg-checkout-track",
    active: "text-checkout-primary",
    inactive: "text-checkout-hero-fg-secondary",
    muted: "text-checkout-hero-fg-secondary",
    // bg-plan-card: on dark the pill matches the plan cards below it.
    activeItem: "bg-plan-card ring-1 ring-border shadow-none dark:ring-0",
  },
} as const

export function SegmentedTabSwitcher<V extends string = string>({
  items,
  value,
  onValueChange,
  appearance = "default",
  trackClassName: trackProp,
  activeClassName: activeProp,
  mobileActiveClassName,
  inactiveClassName: inactiveProp,
  mutedClassName: mutedProp,
  activeItemClassName: activeItemProp,
  mobileActiveItemClassName,
  mobileBleedClassName = "-mx-4 sm:-mx-10",
  mobileGutterClassName = "px-4 sm:px-10",
  className,
}: SegmentedTabSwitcherProps<V>) {
  const preset = APPEARANCES[appearance]
  const trackClassName = trackProp ?? preset.track
  const activeClassName = activeProp ?? preset.active
  const inactiveClassName = inactiveProp ?? preset.inactive
  const mutedClassName = mutedProp ?? preset.muted
  const activeItemClassName = activeItemProp ?? preset.activeItem
  // One pill per layout that glides to the active item, rather than each
  // item painting its own active background (which read as a cross-fade).
  const { containerRef: desktopTrackRef, indicatorRef: desktopPillRef } = useSlidingIndicator(value)
  const { containerRef: mobileRowRef, indicatorRef: mobilePillRef } = useSlidingIndicator(value)

  return (
    <div data-slot="segmented-tab-switcher" className={cn("w-full", className)}>
      {/* Desktop — full-width segmented pill, two-line items. `items-stretch`
          (not `items-center`) is load-bearing: if one item's description
          wraps to a second line, every pill must grow to match its height,
          not just the wrapped one — stretch achieves that for free. */}
      <div
        ref={desktopTrackRef}
        className={cn(
          "relative isolate hidden w-full items-stretch gap-2 rounded-full bg-muted p-2 md:flex",
          trackClassName
        )}
      >
        <span
          ref={desktopPillRef}
          aria-hidden
          data-slot="segmented-tab-indicator"
          className={cn("sliding-indicator rounded-full", activeItemClassName)}
        />
        {items.map(({ value: v, label, description, icon }) => {
          const active = v === value
          return (
            <button
              key={v}
              type="button"
              onClick={() => onValueChange(v)}
              aria-pressed={active}
              data-indicator-active={active || undefined}
              className={cn(
                "flex flex-1 flex-col items-start justify-center gap-1 rounded-full px-8 py-3 text-left ink relative transition-interactive outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                !active && "hover:bg-card/60"
              )}
            >
              {/* 18px/28 label with 24px glyphs — the switcher sets the icon
                  size itself (rather than trusting each call site to pass a
                  matching one) so the two scale together. The descendant
                  selector outranks a `size-*` on the icon element. */}
              <span
                className={cn(
                  "flex items-center gap-2 text-lg leading-7 font-semibold [&_svg]:size-6",
                  active ? activeClassName : inactiveClassName
                )}
              >
                {icon}
                {label}
              </span>
              {description && (
                <span className={cn("text-xs leading-4", mutedClassName)}>
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
          cancels the parent's gutter (mobileBleedClassName, default
          px-4 sm:px-10 — override it when the parent differs) so
          the scrollable area itself reaches the true screen edge, while the
          inner row re-adds that same padding so the first/last chip still
          starts with a visual gutter — one that scrolls away as the user
          swipes, instead of being a hard stop. No background on the row
          itself (that painted a visible rectangular tint behind/around the
          chips) — each chip carries its own pill background instead, same
          as the source design. */}
      <div
        className={cn(
          // pt-px / -mt-px: room for the selected pill's outer ring, which a
          // scroller would otherwise clip at the top (layout unchanged).
          "no-scrollbar -mt-px overflow-x-auto pt-px pb-1 md:hidden",
          mobileBleedClassName
        )}
      >
        {/* `w-max` is load-bearing: without it, this row (a plain block-level
            flex child) sizes to fill the *viewport*, not its own content —
            its overflowing children then render past its own box and
            trailing padding entirely, so the last chip has no right gutter
            at max scroll. `w-max` makes the row grow to fit all children
            (+ both paddings), which is what the scrollable area should be
            measuring in the first place. */}
        <div
          ref={mobileRowRef}
          className={cn("relative isolate flex w-max gap-2", mobileGutterClassName)}
        >
          <span
            ref={mobilePillRef}
            aria-hidden
            // An outer ring, so the pill's visible edge sits where the grey
            // chips' fill ends (an inset ring made it read ~2px smaller).
            // The ring (--border) keeps the white selected chip
            // visible on a white surface (a card, a panel), not just on a
            // grey one; the shadow alone vanished there.
            className={cn("sliding-indicator rounded-full shadow-control ring-1 ring-border", appearance === "checkout" ? "bg-plan-card dark:ring-0" : "bg-card", mobileActiveItemClassName)}
          />
          {items.map(({ value: v, label, shortLabel, icon }) => {
            const active = v === value
            return (
              <button
                key={v}
                type="button"
                onClick={() => onValueChange(v)}
                aria-pressed={active}
                data-indicator-active={active || undefined}
                // 32px chips, 14px labels; the selected one semibold, not
                // bold — compact and quiet next to the 16px titles they
                // filter (was 38px with a bold selected label).
                className={cn(
                  "flex shrink-0 items-center gap-1.5 ink press relative rounded-full border h-8 px-3.5 text-sm font-medium whitespace-nowrap transition-interactive [&_svg]:size-5",
                  active
                    ? cn("border-transparent font-semibold", mobileActiveClassName ?? activeClassName)
                    : cn("border-transparent bg-muted hover:bg-muted", inactiveClassName, trackClassName)
                )}
              >
                {icon}
                {shortLabel ?? label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

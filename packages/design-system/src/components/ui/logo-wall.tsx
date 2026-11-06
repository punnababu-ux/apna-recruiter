import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LogoWall — a row of client/partner logos.
 *
 * Generalises the strip in `trust-bar.tsx`, which is wider than its content
 * column in Figma and scrolls horizontally rather than wrapping or being
 * squeezed — that's the one layout this ships today.
 *
 * `logo` is a `ReactNode`, not a `src` string: the design system has no
 * `next` dependency, so it can't render `next/image` itself, and a plain
 * `<img>` here would trip `@next/next/no-img-element` in any app that lints
 * this package's output. The caller renders whichever it prefers and hands
 * this the element — the same "pass pre-styled nodes" rule `PricingCard`
 * documents for the same reason.
 *
 * `w-full` on the root is load-bearing: every known caller sits inside a
 * `flex-col items-center` wrapper (for the centered heading above it), and
 * under `items-center` a flex item's cross-axis width shrinks to its own
 * max-content size rather than the available width — `overflow-x-auto`
 * then has nothing to clip against, and the full unscrolled logo row
 * overflows the page. `w-full` forces the intended width so the scroll
 * container actually contains its content instead of just wrapping it.
 */

export interface LogoWallItem {
  name: string
  logo: React.ReactNode
}

export interface LogoWallProps extends React.ComponentProps<"div"> {
  items: LogoWallItem[]
  /** h-8 or h-9 — matches whatever height the caller rendered each logo at. */
  itemHeight?: keyof typeof ITEM_HEIGHT
  /** Grayscale at rest, full colour on hover — for a quieter wall. */
  muted?: boolean
  /** Glide the logos left in an endless loop (pauses on hover, edges fade).
   *  Reduced motion: the same row, still and clipped at the edge. */
  marquee?: boolean
  /** The still row: centred (default), or from the start edge, under a
   *  left-aligned heading (express checkout's "Trusted by"). */
  align?: "center" | "start"
}

const ITEM_HEIGHT = {
  /** A supporting row inside a product page (express checkout): small on phones. */
  compact: "h-6 sm:h-8",
  sm: "h-8",
  md: "h-9",
} as const

function LogoWall({
  items,
  itemHeight = "md",
  muted = false,
  marquee = false,
  align = "center",
  className,
  ...props
}: LogoWallProps) {
  const renderItems = (copy: number) =>
    items.map((item) => (
      <div
        key={`${copy}-${item.name}`}
        aria-hidden={copy > 0 || undefined}
        className={cn(
          ITEM_HEIGHT[itemHeight],
          "flex shrink-0 items-center [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto",
          // Spacing as padding, not gap, so both copies are the same width
          // and the loop's half-way point is exact.
          marquee && "pr-14",
          // The second copy only exists for the loop.
          copy > 0 && "motion-reduce:hidden",
          // Dark: a light silhouette (brand-logo in index.css).
          "brand-logo",
          muted && "opacity-60 grayscale transition-interactive hover:opacity-100 hover:grayscale-0"
        )}
      >
        {item.logo}
      </div>
    ))

  if (marquee) {
    return (
      <div
        data-slot="logo-wall"
        data-marquee
        className={cn(
          "no-scrollbar w-full overflow-clip mask-x-from-90% mask-x-to-100%",
          className
        )}
        {...props}
      >
        {/* Clipped, never scrolled: a scroller with nothing focusable in it
            fails axe. Don't wrap the row under reduced motion either; it
            added up to 520px to phone checkout pages (Punna, 2026-11-06). */}
        <div className="flex w-max items-center animate-marquee">
          {renderItems(0)}
          {renderItems(1)}
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="logo-wall"
      // No negative-margin bleed: with w-full it shifted the wall 16px left
      // of its column. The row centres itself (mx-auto) when it fits and
      // scrolls from its start when it doesn't.
      // A scroller with nothing focusable inside must take focus itself, or
      // keyboard users can't reach the clipped logos.
      tabIndex={0}
      role="region"
      aria-label="Client logos"
      className={cn(
        "no-scrollbar w-full overflow-x-auto outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <div className={cn("flex w-max items-center gap-14", align === "center" && "mx-auto")}>
        {items.map((item) => (
          <div
            key={item.name}
            className={cn(
              ITEM_HEIGHT[itemHeight],
              "flex shrink-0 items-center [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto",
              // Dark: a light silhouette (brand-logo in index.css).
              "brand-logo",
              muted && "opacity-60 grayscale transition-interactive hover:opacity-100 hover:grayscale-0"
            )}
          >
            {item.logo}
          </div>
        ))}
      </div>
    </div>
  )
}

export { LogoWall }

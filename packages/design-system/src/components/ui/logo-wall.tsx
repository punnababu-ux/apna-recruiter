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
 */

export interface LogoWallItem {
  name: string
  logo: React.ReactNode
}

export interface LogoWallProps extends React.ComponentProps<"div"> {
  items: LogoWallItem[]
  /** h-8 or h-9 — matches whatever height the caller rendered each logo at. */
  itemHeight?: "sm" | "md"
  /** Grayscale at rest, full colour on hover — for a quieter wall. */
  muted?: boolean
}

const ITEM_HEIGHT = {
  sm: "h-8",
  md: "h-9",
} as const

function LogoWall({
  items,
  itemHeight = "md",
  muted = false,
  className,
  ...props
}: LogoWallProps) {
  return (
    <div
      data-slot="logo-wall"
      className={cn("no-scrollbar -mx-4 overflow-x-auto px-4", className)}
      {...props}
    >
      <div className="flex w-max items-center gap-14">
        {items.map((item) => (
          <div
            key={item.name}
            className={cn(
              ITEM_HEIGHT[itemHeight],
              "flex shrink-0 items-center [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto",
              muted && "opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
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

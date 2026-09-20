/**
 * Section — one horizontal band of a page.
 *
 * Every marketing page is a stack of bands, and the recipe is always the same:
 * a full-bleed element that paints the background and owns the page gutters,
 * wrapping a centred column capped to a content width. That pair appears eight
 * times in the self-checkout page alone, written out by hand each time. This is
 * it, named.
 *
 * Deliberately the only layout component in the system. There is no Container,
 * Grid or Stack: `Section` already does what a Container would, and a bare
 * `grid gap-6 md:grid-cols-3` is shorter and more legible than any `<Grid>`
 * wrapper — AGENTS.md already requires gap-based flex/grid, so the primitive
 * would buy indirection rather than consistency.
 */

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const sectionVariants = cva(
  // The page gutters. Kept identical to the recipe already in use so bands
  // converted to this component line up with bands that haven't been yet.
  "group/section w-full px-4 sm:px-8 lg:px-12",
  {
    variants: {
      tone: {
        /** Inherits whatever the page canvas is — a gradient, usually. */
        transparent: "",
        default: "bg-background",
        muted: "bg-muted",
        card: "bg-card",
        /** Deliberately dark band. Sets the foreground so descendants inherit it. */
        ink: "bg-ink text-ink-fg",
      },
      size: {
        sm: "py-12",
        md: "py-16 md:py-24",
        lg: "py-24 md:py-32",
        none: "py-0",
      },
    },
    defaultVariants: {
      tone: "transparent",
      size: "md",
    },
  }
)

const INNER_WIDTH = {
  narrow: "max-w-narrow",
  band: "max-w-band",
  wide: "max-w-wide",
  full: "",
} as const

export interface SectionProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  /** Content column cap. `band` (1152px) is the house width. */
  width?: keyof typeof INNER_WIDTH
  /**
   * Drop the centred inner column and let children span the full width —
   * for marquees and edge-to-edge media. The gutters still apply.
   */
  bleed?: boolean
  innerClassName?: string
}

function Section({
  className,
  innerClassName,
  tone,
  size,
  width = "band",
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      data-tone={tone ?? "transparent"}
      className={cn(sectionVariants({ tone, size }), className)}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <div className={cn("mx-auto w-full", INNER_WIDTH[width], innerClassName)}>
          {children}
        </div>
      )}
    </section>
  )
}

export { Section, sectionVariants }

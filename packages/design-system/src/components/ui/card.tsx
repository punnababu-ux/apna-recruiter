/**
 * Card — the base surface every other surface is built on.
 *
 * The system went without one for a long time, and the cost is visible: the
 * app hand-rolls `rounded-2xl border border-border bg-card p-6` in two dozen
 * places, and those copies have already drifted apart on radius, border alpha
 * and shadow. This is that string, once, with the variation named.
 *
 * `tone` is the reason this is a primitive rather than a snippet. Marketing
 * puts a deliberately dark card on the ordinary light canvas, and getting that
 * right means more than a background: the title, the description and the
 * border all have to move together. A caller picking `tone="ink"` gets all of
 * it, and `CardDescription` reads the tone off the root via `data-tone` rather
 * than having the prop threaded down to it.
 *
 * Colour beyond the tone is the caller's. Like `PricingCard`, this component
 * takes pre-styled nodes instead of growing a prop for every accent — a
 * surface with its own palette shouldn't have to fight the primitive.
 */

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col rounded-surface border text-card-foreground",
  {
    variants: {
      tone: {
        default: "border-border bg-card",
        muted: "border-transparent bg-muted",
        ink: "border-ink-border bg-ink text-ink-fg",
        ghost: "border-transparent bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      /** Adds the system-wide hover lift. Use only when the whole card is a link. */
      interactive: {
        true: "card-hover-lift",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      padding: "md",
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, tone, padding, interactive, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-tone={tone ?? "default"}
      className={cn(cardVariants({ tone, padding, interactive }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-h6 font-heading font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        // `--muted-foreground` is a near-black-on-white role and disappears on
        // ink, so the ink surface swaps in its own muted foreground. Read off
        // the root's data-tone rather than threading the prop down.
        "text-sm text-muted-foreground group-data-[tone=ink]/card:text-ink-fg-muted",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
}

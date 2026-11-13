import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        /* Neutral, but visible on a card — e.g. a job card's "finish
         * posting" note. `default` is the card colour itself. */
        muted: "bg-muted text-foreground border-border",
        /* Text on a tint is that tint's `-subtle-foreground` (AGENTS.md,
         * "Contrast"). The role colour itself measured 3.6–4.2:1 on its
         * tint, and 3.2–3.6:1 for the description (2026-11-12). */
        destructive:
          "bg-destructive-subtle text-destructive-subtle-foreground border-destructive/20 *:data-[slot=alert-description]:text-destructive-subtle-foreground/90 *:[svg]:text-current",
        success:
          "bg-success-subtle text-success-subtle-foreground border-success/20 *:data-[slot=alert-description]:text-success-subtle-foreground/90 *:[svg]:text-current",
        warning:
          "bg-warning-subtle text-warning-subtle-foreground border-warning/40 *:data-[slot=alert-description]:text-warning-subtle-foreground/90 *:[svg]:text-current",
        info:
          "bg-info-subtle text-info-subtle-foreground border-info/20 *:data-[slot=alert-description]:text-info-subtle-foreground/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }

/**
 * Textarea — multi-line text field. Auto-grows with `field-sizing: content`.
 *
 * API
 *   <Textarea inputSize="sm|default|lg" />
 *
 * Size matches Input: adjusts padding, text size, and min-height.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex field-sizing-content w-full rounded-lg border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      inputSize: {
        sm: "min-h-14 px-3 py-2 text-sm",
        default: "min-h-20 px-3.5 py-2.5 text-sm",
        lg: "min-h-24 px-4 py-3 text-sm",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>

function Textarea({ className, inputSize, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ inputSize }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }

/**
 * Input — single-line text field.
 *
 * API
 *   <Input inputSize="sm|default|lg" />
 *
 * The native `size` attribute is reserved for character-width hints; we
 * therefore expose our size variant as `inputSize` to avoid a collision.
 * Heights match Button (`h-9 | h-10 | h-11`) so inline layouts pair cleanly.
 * Text size is locked to `text-sm` (0.875rem / 14px) across all variants —
 * that's the project-wide minimum for editable controls, matching iOS's
 * no-zoom threshold on desktop and preserving readability on small fields.
 */

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      inputSize: {
        sm: "h-9 px-3 py-1.5 text-sm file:h-7 file:text-xs",
        default: "h-10 px-3.5 py-2 text-sm file:h-8 file:text-sm",
        lg: "h-11 px-4 py-2.5 text-sm file:h-9 file:text-sm",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, inputSize, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ inputSize }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }

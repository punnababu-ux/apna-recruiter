"use client"

/**
 * RadioGroup / RadioGroupItem — single choice. One radio look in the
 * system: a ring that turns green with a green dot inside (the checkout
 * plan rows' Figma radio).
 *
 * RadioMark — the same mark, display only, for a card that is itself the
 * radio (role="radio" on the card, or an OptionCard): the card carries the
 * semantics and the keyboard, the mark just shows the state.
 *
 *   <RadioGroup value={v} onValueChange={setV}>
 *     <RadioGroupItem value="upi" />
 *   </RadioGroup>
 *   <OptionCard … trailing={<RadioMark checked={selected} />} />
 */

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border-2 border-input transition-interactive press outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center transition-select data-starting-style:scale-0 data-ending-style:scale-0"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

/** Display-only radio mark; see the header. `lg` (20px) for cards. */
function RadioMark({
  checked,
  size = "default",
  className,
}: {
  checked: boolean
  size?: "default" | "lg"
  className?: string
}) {
  return (
    <span
      aria-hidden
      data-slot="radio-mark"
      data-checked={checked || undefined}
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full border-2 border-input transition-interactive data-checked:border-primary",
        size === "lg" ? "size-5" : "size-4",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full bg-primary transition-select",
          size === "lg" ? "size-2.5" : "size-2",
          checked ? "scale-100" : "scale-0"
        )}
      />
    </span>
  )
}

export { RadioGroup, RadioGroupItem, RadioMark }

"use client"

/**
 * RadioCard — a whole card that is one radio option, with a visible radio
 * mark: pick one of a few things that each need a few lines (which active
 * job to expire for a new one, a plan row). Selected: a 2px primary border;
 * the card stays white (unlike OptionCard, which fills in instead of
 * showing a radio).
 *
 *   <RadioCardGroup aria-label="Job to expire">
 *     <RadioCard selected={id === a} onSelect={() => setId(a)} radioPosition="start">
 *       …
 *     </RadioCard>
 *   </RadioCardGroup>
 *
 * `radioPosition`: "start" (left, desktop rows) or "end" (right of the
 * first line, phone cards) — or pass both with `radioPosition="responsive"`
 * to put it at the end on phones and the start from sm.
 *
 * A11y: the group is a radiogroup; each card is role="radio" with
 * aria-checked, focusable, Enter/Space select.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { RadioMark } from "./radio-group"

function RadioCardGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="radiogroup" data-slot="radio-card-group" className={cn("flex flex-col gap-3", className)} {...props} />
}

interface RadioCardProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  selected: boolean
  onSelect: () => void
  radioPosition?: "start" | "end" | "responsive"
}

function RadioCard({ selected, onSelect, radioPosition = "start", className, children, ...props }: RadioCardProps) {
  const mark = <RadioMark checked={selected} size="lg" />
  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      data-slot="radio-card"
      data-selected={selected || undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "ink press-subtle relative flex cursor-pointer items-start gap-4 rounded-xl bg-card p-4 text-left outline-none transition-interactive focus-visible:ring-3 focus-visible:ring-ring/50",
        selected ? "border-2 border-primary" : "border border-border hover:border-input",
        className
      )}
      {...props}
    >
      {radioPosition !== "end" && (
        <span className={cn("flex shrink-0 self-center", radioPosition === "responsive" && "max-sm:hidden")}>{mark}</span>
      )}
      <div className="min-w-0 flex-1">{children}</div>
      {radioPosition !== "start" && (
        <span className={cn("flex shrink-0", radioPosition === "responsive" && "sm:hidden")}>{mark}</span>
      )}
    </div>
  )
}

export { RadioCard, RadioCardGroup }
export type { RadioCardProps }

"use client"

/**
 * RadioCard — large clickable card that wraps a RadioGroupItem.
 *
 * Used for the screening-direction (Inbound / Outbound) and screening-
 * format (Audio / Video) pickers. Title + description + optional leading
 * icon; the whole card is the click target. Selection state is reflected
 * via a ring + tinted surface.
 *
 * Usage:
 *   <RadioGroup value={dir} onValueChange={setDir}>
 *     <RadioCard value="inbound" icon={<MicIcon />}
 *       title="Inbound" description="Candidates call in" />
 *     <RadioCard value="outbound" icon={<PhoneIcon />}
 *       title="Outbound" description="We call candidates" />
 *   </RadioGroup>
 */

import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export function RadioCard({
  value,
  title,
  description,
  icon,
  selected,
  className,
}: {
  value: string
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  selected?: boolean
  className?: string
}) {
  return (
    <label
      className={cn(
        "group/radio-card relative flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors",
        "hover:border-primary/40 hover:bg-accent/40",
        selected && "border-primary/60 bg-accent/60 ring-2 ring-ring/20",
        className,
      )}
    >
      {icon ? (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <RadioGroupItem value={value} className="mt-0.5 shrink-0" />
    </label>
  )
}

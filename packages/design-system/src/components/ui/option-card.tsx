"use client"

/**
 * OptionCard — a large tappable answer to one question: "Full time / Part
 * time", "Work from office / home / field", an industry tile. The answer
 * surface of the one-question-per-screen wizard (see `wizard.tsx`), where a
 * tap is easier than a dropdown and the options can carry a line of help.
 *
 * Two layouts:
 *   `row`  (default) — icon left, title + description, full width. For 2–4
 *          options that each need a sentence of explanation.
 *   `tile` — icon on top, title under it, in a 2-column grid. For longer
 *          lists of short labels (job role, industry, perks).
 *
 * Selection reads like ChipTabs' `choice` variant (primary border + accent
 * fill), so a picked answer looks the same whether it's a chip or a card.
 *
 * Group semantics come from `OptionCardGroup`: `type="single"` makes the
 * cards a radiogroup (role="radio" + aria-checked), `type="multiple"` makes
 * them checkboxes. Each card is a native button, so Tab/Enter/Space work.
 *
 * API
 *   <OptionCardGroup type="single" aria-label="Job type" columns={1}>
 *     <OptionCard
 *       icon={<Briefcase />}
 *       title="Full time"
 *       description="Regular hours, 5–6 days a week"
 *       selected={value === "full_time"}
 *       onSelect={() => setValue("full_time")}
 *     />
 *   </OptionCardGroup>
 */

import * as React from "react"

import { cn } from "@/lib/utils"

type GroupType = "single" | "multiple"

const OptionCardGroupContext = React.createContext<GroupType>("single")

interface OptionCardGroupProps extends React.ComponentProps<"div"> {
  type?: GroupType
  /** 1 = stacked rows; 2 = a tile grid (two columns from phone width up). */
  columns?: 1 | 2
}

function OptionCardGroup({ type = "single", columns = 1, className, ...props }: OptionCardGroupProps) {
  return (
    <OptionCardGroupContext.Provider value={type}>
      <div
        data-slot="option-card-group"
        role={type === "single" ? "radiogroup" : "group"}
        className={cn("grid gap-3", columns === 2 ? "grid-cols-2" : "grid-cols-1", className)}
        {...props}
      />
    </OptionCardGroupContext.Provider>
  )
}

interface OptionCardProps extends Omit<React.ComponentProps<"button">, "title" | "onSelect"> {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  selected: boolean
  onSelect: () => void
  layout?: "row" | "tile"
  /** Right-aligned extra in a row card, e.g. a "Recommended" badge. */
  trailing?: React.ReactNode
}

function OptionCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  layout = "row",
  trailing,
  className,
  ...props
}: OptionCardProps) {
  const type = React.useContext(OptionCardGroupContext)
  const tile = layout === "tile"
  return (
    <button
      type="button"
      data-slot="option-card"
      data-layout={layout}
      data-selected={selected || undefined}
      role={type === "single" ? "radio" : "checkbox"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "ink press-subtle relative flex w-full gap-3 rounded-xl border bg-card text-left transition-interactive outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        tile ? "min-h-24 flex-col items-start justify-between p-4" : "items-start p-4",
        selected
          ? "border-primary bg-accent text-accent-foreground ring-1 ring-primary"
          : "border-border text-foreground hover:border-input hover:bg-muted/50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        tile ? "[&_svg:not([class*='size-'])]:size-6" : "[&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    >
      {icon && <span className={cn("flex", !tile && "pt-0.5")}>{icon}</span>}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-semibold leading-5">{title}</span>
        {description && (
          <span className={cn("text-xs leading-4", selected ? "text-accent-foreground/80" : "text-muted-foreground")}>
            {description}
          </span>
        )}
      </span>
      {trailing && !tile && <span className="flex shrink-0 self-center">{trailing}</span>}
    </button>
  )
}

export { OptionCard, OptionCardGroup }
export type { OptionCardProps, OptionCardGroupProps }

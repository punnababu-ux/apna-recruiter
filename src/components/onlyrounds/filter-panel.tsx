"use client"

/**
 * FilterPanel — collapsible filter rail for the candidate pipeline.
 *
 * Mirrors the Figma wireframe: title row with count badge, then a stack
 * of FilterGroup sections. Each group renders a label and a checkbox
 * list; optional "Keywords" slot accepts a free-text search.
 *
 * Lives at ~280px wide on the left of Job Detail. Composition of our
 * Accordion + Checkbox + Input primitives.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export type FilterOption = { id: string; label: string; count: number }
export type FilterGroup = {
  id: string
  label: string
  options: FilterOption[]
}

export function FilterPanel({
  title = "Filters",
  count = 0,
  groups,
  selected = {},
  onToggle,
  extraTop,
  className,
}: {
  title?: string
  count?: number
  groups: FilterGroup[]
  selected?: Record<string, Set<string>>
  onToggle?: (groupId: string, optionId: string) => void
  extraTop?: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        "flex w-72 shrink-0 flex-col gap-4 rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      <header className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">({count})</span>
      </header>

      {extraTop ? <div>{extraTop}</div> : null}

      <Accordion
        defaultValue={groups.map((g) => g.id)}
        className="flex flex-col"
      >
        {groups.map((group) => {
          const picked = selected[group.id] ?? new Set<string>()
          return (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="border-b-0 py-1"
            >
              <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ul className="flex flex-col gap-1.5">
                  {group.options.map((opt) => {
                    const id = `${group.id}-${opt.id}`
                    return (
                      <li key={opt.id} className="flex items-center gap-2">
                        <Checkbox
                          id={id}
                          checked={picked.has(opt.id)}
                          onCheckedChange={() =>
                            onToggle?.(group.id, opt.id)
                          }
                        />
                        <label
                          htmlFor={id}
                          className="flex-1 cursor-pointer text-sm text-foreground"
                        >
                          {opt.label}{" "}
                          <span className="text-muted-foreground">
                            ({opt.count})
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </aside>
  )
}

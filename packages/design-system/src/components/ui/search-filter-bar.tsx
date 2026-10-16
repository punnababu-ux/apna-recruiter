"use client"

/**
 * SearchFilterBar — a search field with a Filters button beside it.
 *
 * Filters open in a popover from md and in a bottom sheet on phones (the
 * pattern for any picker on a phone: thumb reach, full-width rows, a 44px
 * touch target per option). The popover filters live; the sheet stages
 * picks and applies them on "Apply filters" (dismissing it discards them),
 * and "Clear filters" clears everything and closes it.
 *
 *   <SearchFilterBar value={q} onChange={setQ}
 *     filterGroups={[{ label: "Location", options, selected, onToggle }]}
 *     onClearFilters={clear} />
 */

import * as React from "react"
import { Search, SlidersHorizontal } from "@/icons/icons"

import { Badge } from "./badge"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Sheet, SheetContent, SheetTitle } from "./sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export type FilterGroup = {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

export interface SearchFilterBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  /** Pass one or more filter groups to show the Filters popover. */
  filterGroups?: FilterGroup[]
  /** Called by "Clear filters" (popover and sheet). */
  onClearFilters?: () => void
  className?: string
}

export function SearchFilterBar({
  placeholder = "Search…",
  value,
  onChange,
  filterGroups,
  onClearFilters,
  className,
}: SearchFilterBarProps) {
  const isMobile = useIsMobile()
  const [sheetOpen, setSheetOpen] = React.useState(false)
  // The sheet's staged picks, by group label; committed on Apply.
  const [draft, setDraft] = React.useState<Record<string, string[]>>({})
  const activeFilterCount =
    filterGroups?.reduce((sum, g) => sum + g.selected.length, 0) ?? 0
  const hasFilters = (filterGroups?.length ?? 0) > 0

  const trigger = (
    // The search field's 40px height, with a 14px label.
    <Button variant="outline" className="h-10 gap-1.5 cursor-pointer">
      <SlidersHorizontal className="size-4" />
      <span>Filters</span>
      {activeFilterCount > 0 && (
        <Badge variant="success" className="ml-1 h-5 min-w-5 px-1.5 text-2xs">
          {activeFilterCount}
        </Badge>
      )}
    </Button>
  )

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        {/* Input's own default size: 40px, 16px text on phones (iOS
            Safari zooms into a field under 16px), 14px from md. It was
            forced to 36px / 12px here. */}
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-card pl-9"
        />
      </div>

      {hasFilters && isMobile && (
        <>
          {React.cloneElement(trigger, {
            onClick: () => {
              setDraft(Object.fromEntries(filterGroups!.map((g) => [g.label, g.selected])))
              setSheetOpen(true)
            },
          })}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            {/* No overflow-hidden: it would clip the close bubble. */}
            <SheetContent side="bottom" className="max-h-5/6 gap-0 rounded-t-2xl border-t-0 p-0 pb-safe">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 pt-5 pb-4">
                <SheetTitle className="text-h4 text-foreground">Filters</SheetTitle>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    onClearFilters?.()
                    setSheetOpen(false)
                  }}
                  disabled={activeFilterCount === 0 && Object.values(draft).every((d) => d.length === 0)}
                  className="h-auto px-0"
                >
                  Clear filters
                </Button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <FilterGroups
                  touch
                  groups={filterGroups!.map((g) => {
                    const selected = draft[g.label] ?? g.selected
                    return {
                      ...g,
                      selected,
                      onToggle: (v: string) =>
                        setDraft((d) => ({
                          ...d,
                          [g.label]: selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v],
                        })),
                    }
                  })}
                />
              </div>
              <div className="border-t border-border p-4">
                <Button
                  type="button"
                  size="xl"
                  className="w-full"
                  onClick={() => {
                    // Toggle exactly the options whose state changed.
                    filterGroups!.forEach((g) => {
                      const next = draft[g.label] ?? g.selected
                      g.options.forEach((opt) => {
                        if (next.includes(opt) !== g.selected.includes(opt)) g.onToggle(opt)
                      })
                    })
                    setSheetOpen(false)
                  }}
                >
                  Apply filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}

      {hasFilters && !isMobile && (
        <Popover>
          <PopoverTrigger render={trigger} />
          <PopoverContent align="end" className="w-64 p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Filters</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                disabled={activeFilterCount === 0}
                className="h-6 px-1.5 text-2xs cursor-pointer"
              >
                Clear filters
              </Button>
            </div>
            <FilterGroups groups={filterGroups!} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

/** The groups and their options. `touch`: the bottom sheet's full-width,
 *  44px rows with 14px labels; otherwise the popover's compact list. */
function FilterGroups({ groups, touch = false }: { groups: FilterGroup[]; touch?: boolean }) {
  return groups.map((group, i) => (
    <div key={group.label}>
      {i > 0 && <div className="border-t border-border" />}
      <div className={cn("flex flex-col gap-1.5", touch ? "px-5 py-4" : "p-3")}>
        <span className={cn("font-semibold text-muted-foreground", touch ? "text-sm" : "text-2xs")}>
          {group.label}
        </span>
        <div className={cn("flex flex-col", touch ? "-mx-2" : "gap-1")}>
          {group.options.map((opt) => {
            const id = `filter-${group.label}-${opt}${touch ? "-sheet" : ""}`
              .replace(/\s+/g, "-")
              .toLowerCase()
            return (
              <label
                key={opt}
                htmlFor={id}
                className={cn(
                  "flex cursor-pointer items-center rounded-md hover:bg-muted",
                  touch ? "h-11 gap-3 px-2 text-sm" : "gap-2 px-1.5 py-1 text-xs"
                )}
              >
                <Checkbox
                  id={id}
                  checked={group.selected.includes(opt)}
                  onCheckedChange={() => group.onToggle(opt)}
                />
                <span className="truncate">{opt}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  ))
}

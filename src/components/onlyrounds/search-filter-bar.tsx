"use client"

/**
 * SearchFilterBar — search input + optional filter popover.
 *
 * Used on the Jobs list, Clients list, and any future table surface.
 * Pass `filterGroups` to enable the Filters button; omit it for search-only.
 */

import { Search, SlidersHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type FilterGroup = {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

export function SearchFilterBar({
  placeholder = "Search…",
  value,
  onChange,
  filterGroups,
  onClearFilters,
  className,
}: {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  /** Pass one or more filter groups to show the Filters popover. */
  filterGroups?: FilterGroup[]
  /** Called when "Clear all" is clicked in the filter popover. */
  onClearFilters?: () => void
  className?: string
}) {
  const activeFilterCount =
    filterGroups?.reduce((sum, g) => sum + g.selected.length, 0) ?? 0
  const hasFilters = (filterGroups?.length ?? 0) > 0

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Search */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-card pl-9"
        />
      </div>

      {/* Filters popover — only rendered when filterGroups are provided */}
      {hasFilters && (
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="lg">
                <SlidersHorizontal className="size-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="success" className="ml-1 h-5 min-w-5 px-1.5">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            }
          />
          <PopoverContent align="end" className="w-64 p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-sm font-medium">Filters</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                disabled={activeFilterCount === 0}
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            </div>
            {filterGroups!.map((group, i) => (
              <div key={group.label}>
                {i > 0 && <div className="border-t border-border" />}
                <div className="flex flex-col gap-1.5 p-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {group.label}
                  </span>
                  <div className="flex flex-col gap-1">
                    {group.options.map((opt) => {
                      const id = `filter-${group.label}-${opt}`
                        .replace(/\s+/g, "-")
                        .toLowerCase()
                      return (
                        <label
                          key={opt}
                          htmlFor={id}
                          className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-muted"
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
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

"use client"

/**
 * BulkActionBar — sticky toolbar shown above a candidate list when one
 * or more candidates are selected. Provides bulk actions and an exit
 * affordance.
 *
 * Layout:
 *   left   → select-all checkbox + "N selected" / "N of M selected"
 *   right  → Re-take · Reject · Move to next round · clear (X)
 */

import { CircleCheck, RotateCcw, X, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function BulkActionBar({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onClear,
  onMoveToNextRound,
  onReject,
  onReTake,
  className,
}: {
  selectedCount: number
  totalCount: number
  /** True when every candidate in scope is selected. */
  allSelected: boolean
  /** Called when the master checkbox is toggled. */
  onSelectAll: (next: boolean) => void
  /** Clear selection and exit bulk mode. */
  onClear: () => void
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  className?: string
}) {
  return (
    <div
      role="region"
      aria-label={`${selectedCount} candidates selected`}
      className={cn(
        "sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/30 bg-card px-4 py-2 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(v) => onSelectAll(v === true)}
          aria-label={allSelected ? "Unselect all" : "Select all"}
        />
        <span className="text-sm font-medium">
          <span className="tabular-nums">{selectedCount}</span>{" "}
          <span className="text-muted-foreground">
            of <span className="tabular-nums">{totalCount}</span> selected
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onReTake}
          className="h-8"
        >
          <RotateCcw className="size-3.5" />
          Re-take
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReject}
          className="h-8 text-destructive hover:text-destructive"
        >
          <XCircle className="size-3.5" />
          Reject
        </Button>
        <Button size="sm" onClick={onMoveToNextRound} className="h-8">
          <CircleCheck className="size-3.5" />
          Move to next round
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClear}
          aria-label="Clear selection"
          className="ml-1"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}

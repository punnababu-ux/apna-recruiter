"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TaskType } from "@/types/onlyrounds"
import { TASK_TYPES } from "@/components/onlyrounds/interview-rounds-step/constants"

// ---- task-type picker ---------------------------------------------------

export function TaskTypePicker({
  index,
  title,
  onPick,
  onCancel,
  disabledTypes,
}: {
  /** The task number this picker will create (1-based). */
  index: number
  title: string
  onPick: (type: TaskType) => void
  onCancel?: () => void
  /** Types already used that can't be added again (e.g. Screening). */
  disabledTypes: ReadonlySet<TaskType>
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            {index}
          </span>
          <span className="text-sm font-medium">{title}</span>
        </div>
        {onCancel ? (
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TASK_TYPES.map((t) => {
          const Icon = t.icon
          const disabled = disabledTypes.has(t.type)
          return (
            <button
              key={t.type}
              type="button"
              disabled={disabled}
              onClick={() => onPick(t.type)}
              // No shadow — the picker container already carries the
              // elevation. `group` lets the icon box react on hover.
              className={cn(
                "ink press-subtle group relative flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-left transition-interactive",
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-primary hover:bg-accent/30",
              )}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary transition-interactive group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {t.label}
                  {disabled ? (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      · Added
                    </span>
                  ) : null}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {t.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

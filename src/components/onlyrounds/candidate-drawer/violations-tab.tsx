"use client"

import { CircleCheck, ShieldAlert } from "@apna/design-system"
import { cn } from "@/lib/utils"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"

// ── Violations tab ────────────────────────────────────────────────────────

export function ViolationsTab({ candidate }: { candidate: DrawerCandidate }) {
  const items = candidate.violations ?? []
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <CircleCheck className="size-8 text-success" />
        <div>
          <p className="text-sm font-medium">No violations detected</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Candidate completed the round without any flagged behaviour.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Behavioural signals flagged during the AI session — review for
        integrity concerns.
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((v) => (
          <li
            key={v.id}
            className={cn(
              "flex items-start gap-3 rounded-md border bg-card p-3",
              v.severity === "destructive"
                ? "border-destructive/30"
                : v.severity === "warning"
                  ? "border-warning/30"
                  : "border-border",
            )}
          >
            <ShieldAlert
              className={cn(
                "size-4 shrink-0",
                v.severity === "destructive"
                  ? "text-destructive"
                  : v.severity === "warning"
                    ? "text-warning"
                    : "text-info",
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{v.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {v.timestamp}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{v.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

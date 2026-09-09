"use client"

/**
 * CandidateTable — Compact tabular view of the candidate pipeline.
 *
 * Implements a table displaying Candidate name (with source detail tooltip),
 * Phone number, Resume view action, AI Evaluation score, and quick actions
 * (Re-take, Reject, Move to next round).
 */

import * as React from "react"
import { FileText, RotateCcw, XCircle, CircleCheck } from "@apna/design-system"

import type { Candidate } from "@/components/onlyrounds/candidate-card"
import { CandidateStatusBadge } from "@/components/onlyrounds/shared"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SortableTableHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
  type SortDirection,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type SortKey = "name" | "phone" | "resume" | "state" | "actions"

type ColumnWidths = Record<SortKey, number>

const MIN_WIDTH = 60
const DEFAULT_WIDTHS: ColumnWidths = {
  name: 280,
  phone: 180,
  resume: 160,
  state: 160,
  actions: 240,
}

export function CandidateTable({
  candidates,
  onOpen,
  onReTake,
  onReject,
  onMoveToNextRound,
}: {
  candidates: (Candidate & { stage: string })[]
  onOpen: (id: string) => void
  onReTake?: (id: string) => void
  onReject?: (id: string) => void
  onMoveToNextRound?: (id: string) => void
}) {
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)
  const [widths, setWidths] = React.useState<ColumnWidths>(DEFAULT_WIDTHS)

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return candidates
    const copy = [...candidates]
    copy.sort((a, b) => {
      let av = a[sortKey as keyof Candidate] ?? ""
      let bv = b[sortKey as keyof Candidate] ?? ""

      if (typeof av === "string" && typeof bv === "string") {
        av = av.toLowerCase()
        bv = bv.toLowerCase()
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return copy
  }, [candidates, sortKey, sortDir])

  const setSort = (key: SortKey) => (next: SortDirection) => {
    if (!next) {
      setSortKey(null)
      setSortDir(null)
      return
    }
    setSortKey(key)
    setSortDir(next)
  }

  const resize = (key: SortKey) => (delta: number) => {
    setWidths((prev) => ({
      ...prev,
      [key]: Math.max(MIN_WIDTH, prev[key] + delta),
    }))
  }

  const sortFor = (key: SortKey): SortDirection =>
    sortKey === key ? sortDir : null

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table className="table-fixed">
        <colgroup>
          <col style={{ width: widths.name }} />
          <col style={{ width: widths.phone }} />
          <col style={{ width: widths.resume }} />
          <col style={{ width: widths.state }} />
          <col style={{ width: widths.actions }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <SortableTableHead
              sort={sortFor("name")}
              onSortChange={setSort("name")}
              resizable
              onResize={resize("name")}
              className="pl-4"
            >
              Candidate
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("phone")}
              onSortChange={setSort("phone")}
              resizable
              onResize={resize("phone")}
            >
              Phone
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("resume")}
              onSortChange={setSort("resume")}
              resizable
              onResize={resize("resume")}
            >
              Resume
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("state")}
              onSortChange={setSort("state")}
              resizable
              onResize={resize("state")}
            >
              AI Score
            </SortableTableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((c) => {
            const state = c.state
            // Derive verdict chip
            const scoreChip = <CandidateStatusBadge state={state} />

            return (
              <TableRow
                key={c.id}
                className="cursor-pointer"
                onClick={() => onOpen(c.id)}
              >
                {/* Candidate identity + source chip */}
                <TableCell className="pl-4 truncate">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-foreground truncate">{c.name}</span>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold shrink-0")}>
                              {c.source === "sourced" ? "Sourced" : "Applied"}
                            </span>
                          }
                        />
                        <TooltipContent>
                          {c.source === "sourced"
                            ? (c.sourceDetail === "manually added"
                                ? "Manually added"
                                : c.sourceDetail || "Sourced candidate")
                            : "Applied directly"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {(c.role || c.company) && (
                      <span className="text-xs text-muted-foreground truncate">
                        {c.role}{c.role && c.company ? " @ " : ""}{c.company}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Phone */}
                <TableCell className="truncate">
                  <span className="text-sm text-muted-foreground">{c.phone ?? "—"}</span>
                </TableCell>

                {/* Resume */}
                <TableCell className="truncate">
                  {c.resumeFile || c.resumeUrl ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        const url = c.resumeFile
                          ? URL.createObjectURL(c.resumeFile)
                          : c.resumeUrl!
                        window.open(url, "_blank", "noopener,noreferrer")
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <FileText className="size-3.5 shrink-0" />
                      View resume
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>

                {/* AI Score */}
                <TableCell className="truncate">{scoreChip}</TableCell>

                {/* Actions */}
                <TableCell className="pr-4">
                  {c.stage !== "selected" ? (
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => onReTake?.(c.id)}
                        title="Re-take"
                      >
                        <RotateCcw className="size-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5"
                        onClick={() => onReject?.(c.id)}
                        title="Reject"
                      >
                        <XCircle className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs shrink-0"
                        onClick={() => onMoveToNextRound?.(c.id)}
                        title="Move to next round"
                      >
                        <CircleCheck className="size-3" />
                        Move to next round
                      </Button>
                    </div>
                  ) : (
                    <div className="text-right text-xs text-muted-foreground">—</div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

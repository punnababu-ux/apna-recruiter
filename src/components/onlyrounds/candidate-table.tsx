"use client"

/**
 * CandidateTable — Compact tabular view of the candidate pipeline.
 *
 * Implements a table displaying Candidate name (with source detail tooltip),
 * Phone number, Resume view action, AI Evaluation score, and quick actions
 * (Re-take, Reject, Move to next round).
 */

import * as React from "react"
import { FileText, RotateCcw, XCircle, CircleCheck } from "lucide-react"

import type { Candidate } from "@/components/onlyrounds/candidate-card"
import { CandidateStatusBadge } from "@/components/onlyrounds/shared"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function CandidateTable({
  candidates,
  onOpen,
}: {
  candidates: (Candidate & { stage: string })[]
  onOpen: (id: string) => void
}) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-64">Candidate</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>AI Score</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((c) => {
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
                <TableCell className="pl-4">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-foreground">{c.name}</span>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold")}>
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
                      <span className="text-xs text-muted-foreground">
                        {c.role}{c.role && c.company ? " @ " : ""}{c.company}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Phone */}
                <TableCell>
                  <span className="text-sm text-muted-foreground">{c.phone ?? "—"}</span>
                </TableCell>

                {/* Resume */}
                <TableCell>
                  {c.resumeFile ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(URL.createObjectURL(c.resumeFile!), "_blank", "noopener,noreferrer")
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <FileText className="size-3.5" />
                      View
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>

                {/* AI Score */}
                <TableCell>{scoreChip}</TableCell>

                {/* Actions */}
                <TableCell className="pr-4">
                  <div
                    className="flex items-center justify-end gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onOpen(c.id)}
                      title="Re-take"
                    >
                      <RotateCcw className="size-3" />
                      Re-take
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onOpen(c.id)}
                      title="Reject"
                    >
                      <XCircle className="size-3" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onOpen(c.id)}
                      title="Move to next round"
                    >
                      <CircleCheck className="size-3" />
                      Move to next round
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Pencil,
  Phone,
  RotateCcw,
  X,
  XCircle,
  Download,
} from "@apna/design-system"
import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateStatusBadge } from "@/components/onlyrounds/shared"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"
import { ContactActions } from "@/components/onlyrounds/candidate-drawer/contact-actions"
import { InsightsTab } from "@/components/onlyrounds/candidate-drawer/insights-tab"
import { ProfileTab } from "@/components/onlyrounds/candidate-drawer/profile-tab"
import { ViolationsTab } from "@/components/onlyrounds/candidate-drawer/violations-tab"
import { TimelineTab } from "@/components/onlyrounds/candidate-drawer/timeline-tab"
import { initials } from "@/components/onlyrounds/candidate-drawer/utils"

// ── Body ──────────────────────────────────────────────────────────────────

type Stage = "screening" | "interview" | "selected"

const STAGES: { key: Stage; label: string; number: number }[] = [
  { key: "screening", label: "Screening", number: 1 },
  { key: "interview", label: "Tech Interview", number: 2 },
  { key: "selected", label: "Selected", number: 3 },
]

const STAGE_ORDER: Stage[] = ["screening", "interview", "selected"]

const isStageCompleted = (currentStage: Stage, stepStage: Stage) => {
  const currentIndex = STAGE_ORDER.indexOf(currentStage)
  const stepIndex = STAGE_ORDER.indexOf(stepStage)
  return currentIndex >= stepIndex
}

export function DrawerBody({
  candidate,
  onMoveToNextRound,
  onReject,
  onReTake,
  onAddNote,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onClose,
}: {
  candidate: DrawerCandidate
  onMoveToNextRound?: () => void
  onReject?: () => void
  onReTake?: () => void
  onAddNote?: (note: string) => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  onClose: () => void
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [noteText, setNoteText] = React.useState(candidate.notes || "")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [seen, setSeen] = React.useState({ id: candidate.id, notes: candidate.notes, isEditing })
  if (candidate.id !== seen.id) {
    setSeen({ id: candidate.id, notes: candidate.notes, isEditing: false })
    setNoteText(candidate.notes || "")
    setIsEditing(false)
  } else if (!isEditing && candidate.notes !== seen.notes) {
    setSeen({ id: candidate.id, notes: candidate.notes, isEditing })
    setNoteText(candidate.notes || "")
  } else if (isEditing !== seen.isEditing) {
    setSeen({ id: candidate.id, notes: candidate.notes, isEditing })
  }

  React.useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => {
        textareaRef.current?.focus()
        const len = textareaRef.current?.value.length ?? 0
        textareaRef.current?.setSelectionRange(len, len)
      })
    }
  }, [isEditing])

  const commitNote = () => {
    const trimmed = noteText.trim()
    setIsEditing(false)
    onAddNote?.(trimmed)
  }

  const cancelNote = () => {
    setNoteText(candidate.notes || "")
    setIsEditing(false)
  }

  const currentStage = (candidate.stage as Stage) || "screening"

  return (
    <div className="flex h-full flex-col">
      {/* Sticky header */}
      <SheetHeader className="p-0 border-b border-border">
        <div className="p-4 flex flex-col gap-3">
          {/* Top row: Avatar + Name & Details + Top-Right Actions */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                  {initials(candidate.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <SheetTitle className="truncate text-base">
                    {candidate.name}
                  </SheetTitle>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <span className={cn(badgeVariants({ variant: "outline" }), "text-2xs leading-none text-muted-foreground font-semibold")}>{candidate.source === "sourced" ? "Sourced" : "Applied"}</span>
                      }
                    />
                    <TooltipContent>
                      {candidate.source === "sourced" ? (candidate.sourceDetail || "Sourced candidate") : "Applied directly"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                {(candidate.role || candidate.company) && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {[candidate.role, candidate.company].filter(Boolean).join(" @ ")}
                  </p>
                )}
                {/* Contact info: aligned with name and job details */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {candidate.email && (
                    <span className="inline-flex items-center gap-1">
                      <AtSign className="size-3.5" />
                      {candidate.email}
                    </span>
                  )}
                  {candidate.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="size-3.5" />
                      {candidate.phone}
                      <ContactActions phone={candidate.phone} name={candidate.name} />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Top-Right sticky header actions */}
            <div className="flex items-center gap-1.5 shrink-0 -mt-1">
              <div className="flex items-center gap-0.5 border-r border-border pr-1.5 mr-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous candidate"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next candidate"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close drawer"
                className="shrink-0"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Pipeline Stepper Subheader */}
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2 bg-muted/10">
          {/* Horizontal breadcrumb pipeline stepper */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-2xs">
            {STAGES.map((s, idx) => {
              const isCompleted = isStageCompleted(currentStage, s.key)
              const isActive = currentStage === s.key
              return (
                <React.Fragment key={s.key}>
                  {idx > 0 && (
                    <span className="text-muted-foreground/30 font-medium">/</span>
                  )}
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full text-3xs font-semibold font-mono border",
                        isActive && "bg-primary border-primary text-primary-foreground",
                        isCompleted && !isActive && "bg-success-subtle border-success/30 text-success",
                        !isCompleted && !isActive && "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      {s.number}
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        isActive && "text-foreground font-semibold",
                        isCompleted && !isActive && "text-muted-foreground",
                        !isCompleted && !isActive && "text-muted-foreground/60"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                </React.Fragment>
              )
            })}
          </div>

          {/* Verdict badge + download report (completed only) */}
          {(() => {
            const state = candidate.state || {
              kind: "completed" as const,
              score: candidate.score,
              verdict: candidate.verdict,
              insights: [],
            }
            const isCompleted = state.kind === "completed"
            return (
              <div className="flex shrink-0 items-center gap-2">
                <CandidateStatusBadge state={state} />
                {isCompleted && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    title="Download AI assessment report"
                    aria-label="Download AI assessment report"
                    onClick={() => {
                      const lines = [
                        `AI Interview Assessment Report`,
                        `================================`,
                        `Candidate : ${candidate.name}`,
                        `Role      : ${candidate.role}`,
                        `Company   : ${candidate.company}`,
                        `Score     : ${candidate.score ?? "N/A"} / 100`,
                        `Verdict   : ${
                          candidate.verdict === "fit"
                            ? "Fit"
                            : candidate.verdict === "not-fit"
                              ? "Not Fit"
                              : "Under Review"
                        }`,
                        `CEFR Level: ${candidate.cefrLevel ?? "N/A"}`,
                        ``,
                        `AI Recommendations`,
                        `------------------`,
                        ...(candidate.recommendations ?? []).map(
                          (r, i) => `${i + 1}. ${r}`,
                        ),
                        ``,
                        `Criteria Analysis`,
                        `-----------------`,
                        ...(candidate.criteriaGroups ?? []).flatMap((g) => [
                          ``,
                          `[${g.label}]`,
                          ...g.items.map(
                            (item) =>
                              `  • (${item.score}/10) ${item.text}\n    → ${item.reasoning}`,
                          ),
                        ]),
                      ]
                      const blob = new Blob([lines.join("\n")], {
                        type: "text/plain",
                      })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `AI_Report_${candidate.name.replace(/\s+/g, "_")}.txt`
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                  >
                    <Download className="size-3.5" />
                  </Button>
                )}
              </div>
            )
          })()}
        </div>

      </SheetHeader>

      {/* Tabs */}
      <Tabs
        defaultValue="profile"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="w-full shrink-0 overflow-x-auto border-b border-border">
          <TabsList
            variant="line"
            className="px-4 gap-4"
          >
            <TabsTrigger value="profile">Full profile</TabsTrigger>
            <TabsTrigger value="insights">AI screening insights</TabsTrigger>
            <TabsTrigger value="violations">Interview violations report</TabsTrigger>
            <TabsTrigger value="timeline">Communication timelines</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="profile" className="m-0 p-4">
            <ProfileTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="insights" className="m-0 p-4">
            <InsightsTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="violations" className="m-0 p-4">
            <ViolationsTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="timeline" className="m-0 p-4">
            <TimelineTab candidate={candidate} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Combined Notes & Actions Sticky Footer */}
      <div className="border-t border-border bg-card flex flex-col shrink-0">
        {/* Notes */}
        <div className="p-4 pb-2.5">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">Notes</h4>
          {isEditing ? (
            <div
              className="flex flex-col gap-1.5 bg-muted/30 p-2 rounded-lg border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Textarea
                ref={textareaRef}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value.slice(0, 300))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    commitNote()
                  } else if (e.key === "Escape") {
                    e.preventDefault()
                    cancelNote()
                  }
                }}
                placeholder="Add reason for rejection or any other notes"
                rows={2}
                maxLength={300}
                inputSize="sm"
                className="resize-none bg-card text-xs"
              />
              <div className="flex items-center justify-between text-2xs">
                <span className="tabular-nums text-muted-foreground">
                  {noteText.length}/300
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="xs"
                    className="h-6 px-2 text-2xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      cancelNote()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    className="h-6 px-2 text-2xs bg-cta-primary text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      commitNote()
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 text-left text-sm hover:bg-muted/40 transition-interactive"
            >
              {noteText ? (
                <span className="text-foreground whitespace-pre-wrap">{noteText}</span>
              ) : (
                <span className="text-muted-foreground">No note added</span>
              )}
              <Pencil className="size-3.5 text-muted-foreground shrink-0 ml-2" />
            </button>
          )}
        </div>

        {/* Action bar below Notes */}
        {candidate.stage !== "selected" && (
          <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3 bg-muted/10">
            <Button variant="outline" size="sm" onClick={onReTake} className="h-8 bg-card">
              <RotateCcw className="size-3.5" />
              Re-take
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onReject}
                className="h-8 bg-card"
              >
                <XCircle className="size-3.5" />
                Reject
              </Button>
              <Button size="sm" onClick={onMoveToNextRound} className="h-8">
                <CircleCheck className="size-3.5" />
                Move to next round
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

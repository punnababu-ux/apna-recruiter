"use client"

/**
 * CandidateCard — single row in the candidate pipeline.
 *
 * Composes Avatar, contact-meta strip, AIInsightChip list, ScorePill,
 * and a per-candidate action cluster. Rejected-by-AI and incomplete-call
 * states are supported inline.
 *
 * Design intent: information-dense but quiet. Contact affordances
 * (email / phone / whatsapp) are icon-only tooltips; score and verdict
 * read from the right edge; AI insights are a wrapping row of outlined
 * chips so they don't shout. Actions live in the bottom bar so the
 * reading path (identity → signals → decision) stays left-to-right.
 */

import {
  AtSign,
  Edit3,
  MessageCircle,
  MoreVertical,
  Phone,
  Pencil,
} from "lucide-react"

import { AIInsightChip } from "@/components/onlyrounds/ai-insight-chip"
import { ScorePill } from "@/components/onlyrounds/score-pill"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type Verdict = "fit" | "review" | "not-fit"

export type CandidateInsight = {
  tone: "miss" | "warn" | "info" | "ok"
  label: string
}

export type Candidate = {
  id: string
  name: string
  email?: string
  phone?: string
  score?: number
  verdict?: Verdict
  statusTag?: { label: string; tone: "success" | "warning" | "destructive" | "info" }
  insights?: CandidateInsight[]
  rejectedByAI?: boolean
  incompleteCall?: { attempted: number; total: number; message: string }
}

export function CandidateCard({
  candidate,
  onMoveToSelected,
  onReTake,
  onAddNote,
  className,
}: {
  candidate: Candidate
  onMoveToSelected?: () => void
  onReTake?: () => void
  onAddNote?: () => void
  className?: string
}) {
  const {
    name,
    email,
    phone,
    score,
    verdict,
    statusTag,
    insights,
    rejectedByAI,
    incompleteCall,
  } = candidate

  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card transition-shadow hover:shadow-sm",
        className,
      )}
    >
      {/* Header: identity + contact + score */}
      <div className="flex items-start gap-3 px-4 py-3">
        <Avatar className="size-9">
          <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold">{name}</h3>
            {statusTag ? (
              <Badge variant={statusTag.tone} className="capitalize">
                {statusTag.label}
              </Badge>
            ) : null}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {email ? (
              <span className="inline-flex items-center gap-1">
                <AtSign className="size-3" /> {email}
              </span>
            ) : null}
            {phone ? (
              <span className="inline-flex items-center gap-1">
                <Phone className="size-3" /> {phone}
              </span>
            ) : null}
            {phone ? (
              <span className="inline-flex size-4 items-center justify-center text-muted-foreground">
                <MessageCircle className="size-3" />
              </span>
            ) : null}
          </div>
        </div>
        {typeof score === "number" && verdict ? (
          <ScorePill score={score} verdict={verdict} className="mt-0.5" />
        ) : null}
      </div>

      {/* Insights */}
      {insights && insights.length > 0 ? (
        <div className="border-t border-border px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-highlight" />
            AI call insights
          </div>
          <div className="flex flex-wrap gap-1.5">
            {insights.map((it, i) => (
              <AIInsightChip key={i} tone={it.tone}>
                {it.label}
              </AIInsightChip>
            ))}
          </div>
        </div>
      ) : null}

      {/* Incomplete-call banner (replaces normal action bar when active) */}
      {incompleteCall ? (
        <Alert
          variant="warning"
          className="rounded-none border-x-0 border-b-0 px-4 py-3"
        >
          <AlertTitle className="text-xs font-medium">
            Call not connected:{" "}
            <span className="font-normal opacity-80">
              {incompleteCall.message}
            </span>
          </AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-1.5">
            <Progress
              value={(incompleteCall.attempted / incompleteCall.total) * 100}
              className="h-1.5"
            />
            <span className="text-2xs text-muted-foreground">
              {incompleteCall.attempted} of {incompleteCall.total} call attempts
              completed
            </span>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReTake}
              className="h-8"
            >
              <Edit3 className="size-3.5" />
              Re-take
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {rejectedByAI ? (
              <Badge variant="destructive">{name} was rejected by AI</Badge>
            ) : null}
            <Button
              variant="default"
              size="sm"
              onClick={onMoveToSelected}
              className="h-8"
            >
              Move to selected
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="More"
                    className="h-8 px-2"
                  >
                    <MoreVertical className="size-3.5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Re-evaluate</DropdownMenuItem>
                <DropdownMenuItem>Re-take interview</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Footer note action */}
      <div className="flex items-center justify-end border-t border-border px-4 py-1.5 text-xs">
        <button
          type="button"
          onClick={onAddNote}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3" />
          Add a note
        </button>
      </div>
    </article>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
}

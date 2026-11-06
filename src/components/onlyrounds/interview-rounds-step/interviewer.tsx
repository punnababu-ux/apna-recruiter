"use client"

import {
  Bot,
  CircleCheck,
  Languages,
  Mars,
  Mic,
  Pause,
  Pencil,
  Play,
  Sparkles,
  Users,
  Venus,
  type IconComponent,
} from "@apna/design-system"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { InfoChip, SelectionCard } from "@/components/onlyrounds/shared"
import { AGENTS, LANGUAGES } from "@/lib/onlyrounds/constants"
import type { AgentId, InterviewLanguage } from "@/types/onlyrounds"

// ---- AI interviewer card ------------------------------------------------

// InfoPill → use InfoChip (variant="outlined") from shared.tsx
const InfoPill = ({ icon, children }: { icon: IconComponent; children: React.ReactNode }) => (
  <InfoChip icon={icon} variant="outlined">{children}</InfoChip>
)

export function InterviewerCard({
  index,
  agentId,
  language,
  onAgentChange,
  onLanguageChange,
}: {
  index: number
  agentId: AgentId
  language: InterviewLanguage
  onAgentChange: (id: AgentId) => void
  onLanguageChange: (lang: InterviewLanguage) => void
}) {
  const [editOpen, setEditOpen] = React.useState(false)
  const agent = AGENTS[agentId]

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
        <Bot className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          {agent.name}
          <Sparkles className="size-3 text-primary" />
        </div>
        <div className="text-xs text-muted-foreground">
          {agent.role} · {agent.voice} voice
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <InfoPill icon={Languages}>{LANGUAGES[language].label}</InfoPill>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setEditOpen(true)}
        className="shrink-0 bg-card"
      >
        <Pencil className="size-3.5" />
        Edit
      </Button>

      <InterviewerEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        index={index}
        agentId={agentId}
        language={language}
        onSave={(a, l) => {
          onAgentChange(a)
          onLanguageChange(l)
          setEditOpen(false)
        }}
      />
    </div>
  )
}

function InterviewerEditDialog({
  open,
  onOpenChange,
  index,
  agentId,
  language,
  onSave,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  index: number
  agentId: AgentId
  language: InterviewLanguage
  onSave: (agentId: AgentId, language: InterviewLanguage) => void
}) {
  const [draftAgent, setDraftAgent] = React.useState<AgentId>(agentId)
  const [draftLang, setDraftLang] = React.useState<InterviewLanguage>(language)

  // Reset the drafts to the task's current values each time the dialog opens.
  React.useEffect(() => {
    if (open) {
      setDraftAgent(agentId)
      setDraftLang(language)
    }
  }, [open, agentId, language])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit round {index} configuration</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-1">
          {/* Language */}
          <section className="flex flex-col gap-4">
            <header className="flex items-start gap-2.5">
              <Languages className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-semibold">
                  Choose AI Interview language{" "}
                  <span className="text-destructive">*</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Select the primary language you want our AI to conduct
                  interviews in
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(Object.keys(LANGUAGES) as InterviewLanguage[]).map((lang) => (
                <LanguageOption
                  key={lang}
                  lang={lang}
                  selected={draftLang === lang}
                  onSelect={() => setDraftLang(lang)}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Reach out to us if you need additional languages
            </p>
          </section>

          {/* AI recruiter */}
          <section className="flex flex-col gap-4 border-t border-border pt-5">
            <header className="flex items-start gap-2.5">
              <Mic className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-semibold">
                  Choose your AI recruiter{" "}
                  <span className="text-destructive">*</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Choose the AI capabilities for your automated interviews
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(Object.keys(AGENTS) as AgentId[]).map((id) => (
                <AgentOption
                  key={id}
                  id={id}
                  selected={draftAgent === id}
                  onSelect={() => setDraftAgent(id)}
                />
              ))}
            </div>
          </section>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => onSave(draftAgent, draftLang)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border",
        selected ? "border-primary" : "border-muted-foreground/40",
      )}
      aria-hidden="true"
    >
      {selected ? <span className="size-2 rounded-full bg-primary" /> : null}
    </span>
  )
}

function LanguageOption({
  lang,
  selected,
  onSelect,
}: {
  lang: InterviewLanguage
  selected: boolean
  onSelect: () => void
}) {
  const meta = LANGUAGES[lang]
  return (
    <SelectionCard selected={selected} onSelect={onSelect} className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
        {meta.badge}
      </span>
      <span className="flex-1 text-sm font-medium">{meta.label}</span>
      <RadioDot selected={selected} />
    </SelectionCard>
  )
}

function AgentOption({
  id,
  selected,
  onSelect,
}: {
  id: AgentId
  selected: boolean
  onSelect: () => void
}) {
  const agent = AGENTS[id]
  const [playing, setPlaying] = React.useState(false)
  const Gender = agent.voice === "Female" ? Venus : Mars

  return (
    <SelectionCard selected={selected} onSelect={onSelect} className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
            <Bot className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold">
              {agent.name} ({agent.role})
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {agent.voice} Voice
              <Gender className="size-3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {agent.recommended ? (
            <Badge variant="default">Recommended</Badge>
          ) : null}
          <RadioDot selected={selected} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between rounded-md bg-muted/60 px-3 py-2.5">
        <div>
          <div className="text-base font-semibold">{agent.interviewsTaken}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3" />
            Interviews Taken
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-semibold">{agent.completionRate}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CircleCheck className="size-3" />
            Completion rate
          </div>
        </div>
      </div>

      {/* Preview tone — prototype placeholder (no audio wired). */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Preview Tone
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setPlaying((p) => !p)
            }}
            aria-label={playing ? "Pause preview" : "Play preview"}
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          </button>
          <div className="h-1 flex-1 rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <span className="text-xs text-muted-foreground">0:00 / 0:00</span>
        </div>
      </div>
    </SelectionCard>
  )
}

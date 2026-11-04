"use client"

/**
 * ChatThread — one Apna Chat thread, for one job and one candidate (PRD
 * FR-1). A drill-down: on phones it is the whole screen (no top or bottom
 * bar), so its header is the app bar.
 *
 *   Header    Back · avatar · name and facts · ⋮ (Not interested)
 *   Job card  the job the thread is about, with its tier (FR-1)
 *   Warning   "Apna never asks for money…" (PRD guardrails)
 *   Messages  candidate on the left; the recruiter and the AI on the right,
 *             the AI's carrying its "Apna Assistant for…" label. Candidate
 *             quick replies read as chips (FR-4); the recruiter's show
 *             Sent or Read (FR-15)
 *   Urgent    the AI summary and suggested replies above the composer
 *             (FR-6); a suggestion fills the composer, it never sends
 *   Composer  text and Send. Sending takes the thread off Urgent and stops
 *             the AI (useChats)
 *
 * Scripted mock data: nothing leaves the prototype.
 */

import * as React from "react"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  BackButton,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MapPin,
  MoreVertical,
  Send,
  ShieldCheck,
  Sparkles,
  Textarea,
} from "@apna/design-system"
import { useChats } from "@/hooks/apnahire/use-chats"
import { useAppBack } from "@/lib/apnahire/nav"
import {
  AI_LABEL,
  MONEY_WARNING,
  TIER_LABEL,
  type ChatMessage,
  type ChatThread as Thread,
} from "@/content/chats"
import { cn } from "@/lib/utils"

function Bubble({ m }: { m: ChatMessage }) {
  const mine = m.from !== "candidate"
  if (m.quickReply) {
    return (
      <div className="flex flex-col items-start gap-1">
        <Badge variant="outline" className="h-8 bg-card px-3 text-sm">
          {m.text}
        </Badge>
        <span className="text-xs text-muted-foreground">{m.time}</span>
      </div>
    )
  }
  return (
    <div className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
      {m.from === "ai" && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5" aria-hidden />
          {AI_LABEL}
        </span>
      )}
      <p
        className={cn(
          "max-w-xs rounded-2xl px-3 py-2 text-sm md:max-w-md",
          m.from === "candidate" && "border border-border bg-card text-foreground",
          m.from === "recruiter" && "bg-accent text-accent-foreground",
          m.from === "ai" && "bg-muted text-foreground"
        )}
      >
        {m.text}
      </p>
      <span className="text-xs text-muted-foreground">
        {m.time}
        {m.from === "recruiter" && ` · ${m.read ? "Read" : "Sent"}`}
      </span>
    </div>
  )
}

export function ChatThread({ thread }: { thread: Thread }) {
  const back = useAppBack("/apnahire/chats")
  const { markRead, reply } = useChats()
  const [draft, setDraft] = React.useState("")
  const end = React.useRef<HTMLDivElement>(null)
  const urgent = thread.status === "urgent"

  React.useEffect(() => {
    markRead(thread.id)
  }, [markRead, thread.id])
  React.useEffect(() => {
    end.current?.scrollIntoView({ block: "end" })
  }, [thread.messages.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    reply(thread.id, text)
    setDraft("")
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted md:min-h-0 md:flex-1">
      {/* The app bar on phones; under the 64px top bar from md. */}
      <header className="sticky top-0 z-sticky flex flex-col gap-3 border-b border-border bg-card px-4 py-3 md:top-16">
        <div className="flex items-center gap-3">
          <BackButton onClick={back} />
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-muted text-sm font-semibold text-muted-foreground">
              {thread.candidate.initial}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-base font-semibold text-foreground">{thread.candidate.name}</span>
            <span className="truncate text-xs text-muted-foreground">{thread.candidate.meta}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Chat actions" className="shrink-0 text-muted-foreground" />
              }
            >
              <MoreVertical className="size-5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* PRD: the recruiter's "Not interested" closes the thread as
                  "Not a fit" and stops the AI. Not wired in this spike. */}
              <DropdownMenuItem className="whitespace-nowrap">Not interested</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* The job card: which job this thread is about. */}
        <Link
          href="/apnahire/jobs"
          className="ink relative flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 transition-interactive"
        >
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-foreground">{thread.job.title}</span>
            <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {thread.job.area}, {thread.job.city}
            </span>
          </span>
          <Badge variant="secondary">{TIER_LABEL[thread.job.tier]}</Badge>
        </Link>
      </header>

      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
          {MONEY_WARNING}
        </p>
        {thread.messages.map((m) => (
          <Bubble key={m.id} m={m} />
        ))}
        <div ref={end} />
      </div>

      <footer className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-card px-4 pt-3 pb-safe-3">
        {urgent && thread.summary && (
          <div className="flex flex-col gap-2">
            <Badge variant="destructive">Urgent: needs reply</Badge>
            <p className="flex gap-1.5 text-sm text-foreground">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <span>
                <span className="font-semibold">AI summary: </span>
                {thread.summary}
              </span>
            </p>
            {thread.suggestedReplies && (
              <div className="flex flex-wrap gap-2">
                {thread.suggestedReplies.map((s) => (
                  <Button key={s} variant="outline" size="sm" onClick={() => setDraft(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <Textarea
            aria-label="Message"
            placeholder="Type a message"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            className="max-h-32 min-h-10 px-3 py-2 text-sm"
          />
          <Button type="submit" size="icon" aria-label="Send" disabled={!draft.trim()}>
            <Send className="size-4" aria-hidden />
          </Button>
        </form>
      </footer>
    </div>
  )
}

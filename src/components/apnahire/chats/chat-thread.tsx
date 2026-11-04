"use client"

/**
 * ChatThread — one Apna Chat thread, for one job and one candidate (PRD
 * FR-1). A drill-down: on phones it is the whole screen (no top or bottom
 * bar), so its header is the app bar.
 *
 *   Header    Back · avatar (lg) · name and facts · ⋮ (Not interested), then
 *             the job's nested card (rounded-card-nested, press-subtle)
 *   Messages  ChatMessageList: a ChatNotice for "Apna never asks for money…"
 *             (PRD guardrails), then ChatDayDividers and ChatBubbles. The
 *             candidate is incoming; the recruiter outgoing with Sent or
 *             Read (FR-15); the AI an assistant bubble with its "Apna
 *             Assistant for…" label. Candidate quick replies are ChatChoice
 *             (FR-4). Consecutive messages from one sender are grouped
 *   Composer  ChatComposer, docked. On urgent threads its top slot holds the
 *             AI summary (Alert, info: AI output, no alarm; the inbox
 *             already carries the one red "Urgent") and SuggestionChips
 *             (FR-6); a suggestion fills the composer, it never sends.
 *             Sending takes the thread off Urgent and stops the AI (useChats)
 *
 * Scripted mock data: nothing leaves the prototype.
 */

import * as React from "react"
import Link from "next/link"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  BackButton,
  Badge,
  Button,
  ChatBubble,
  ChatChoice,
  ChatComposer,
  ChatDayDivider,
  ChatMessageList,
  ChatNotice,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MapPin,
  MoreVertical,
  ShieldCheck,
  Sparkles,
  SuggestionChips,
} from "@apna/design-system"
import { IconLabel } from "@/components/onlyrounds/shared"
import { useChats } from "@/hooks/apnahire/use-chats"
import { useAppBack } from "@/lib/apnahire/nav"
import {
  AI_LABEL,
  MONEY_WARNING,
  TIER_LABEL,
  type ChatMessage,
  type ChatThread as Thread,
} from "@/content/chats"

type Position = "single" | "first" | "middle" | "last"

/** "10:42 am" is today; "Yesterday", "Mon" are their own day. */
const dayOf = (m: ChatMessage) => (m.time.includes(":") ? "Today" : m.time)

/** Where a message sits in a run from one sender on one day. */
function positionOf(messages: ChatMessage[], i: number): Position {
  const m = messages[i]
  const same = (o?: ChatMessage) => !!o && o.from === m.from && !o.quickReply && dayOf(o) === dayOf(m)
  const prev = same(messages[i - 1])
  const next = same(messages[i + 1])
  return prev && next ? "middle" : prev ? "last" : next ? "first" : "single"
}

function Messages({ messages }: { messages: ChatMessage[] }) {
  return (
    <>
      {messages.map((m, i) => {
        const day = dayOf(m)
        const divider = i === 0 || dayOf(messages[i - 1]) !== day
        // Older days show the day in the divider, so the bubble has no time.
        const time = m.time.includes(":") ? m.time : undefined
        return (
          <React.Fragment key={m.id}>
            {divider && <ChatDayDivider>{day}</ChatDayDivider>}
            {m.quickReply ? (
              <ChatChoice time={time}>{m.text}</ChatChoice>
            ) : (
              <ChatBubble
                variant={m.from === "candidate" ? "incoming" : m.from === "ai" ? "assistant" : "outgoing"}
                time={time}
                status={m.from === "candidate" ? undefined : m.read ? "read" : "sent"}
                label={m.from === "ai" ? AI_LABEL : undefined}
                groupPosition={positionOf(messages, i)}
              >
                {m.text}
              </ChatBubble>
            )}
          </React.Fragment>
        )
      })}
    </>
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

  const send = (text: string) => {
    reply(thread.id, text)
    setDraft("")
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted md:min-h-0 md:flex-1">
      {/* The app bar on phones; under the 64px top bar from md. */}
      <header className="sticky top-0 z-sticky flex flex-col gap-3 border-b border-border bg-card px-4 py-3 md:top-16">
        <div className="flex items-center gap-3">
          <BackButton onClick={back} />
          <Avatar size="lg">
            <AvatarFallback className="bg-accent text-accent-foreground">{thread.candidate.initial}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-h6 truncate">{thread.candidate.name}</span>
            <span className="text-caption truncate text-muted-foreground">{thread.candidate.meta}</span>
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
          className="ink relative flex items-center justify-between gap-3 rounded-card-nested border border-border px-3 py-2 transition-interactive press-subtle"
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-body-sm truncate font-semibold">{thread.job.title}</span>
            <span className="text-caption truncate text-muted-foreground">
              <IconLabel icon={MapPin}>
                {thread.job.area}, {thread.job.city}
              </IconLabel>
            </span>
          </span>
          <Badge variant="secondary">{TIER_LABEL[thread.job.tier]}</Badge>
        </Link>
      </header>

      <ChatMessageList className="flex-1 px-4 py-4">
        <ChatNotice icon={<ShieldCheck aria-hidden />}>{MONEY_WARNING}</ChatNotice>
        <Messages messages={thread.messages} />
        <div ref={end} />
      </ChatMessageList>

      <ChatComposer
        value={draft}
        onValueChange={setDraft}
        onSend={send}
        top={
          urgent && thread.summary ? (
            <div className="flex flex-col gap-2">
              <Alert variant="info">
                <Sparkles aria-hidden />
                <AlertTitle>AI summary</AlertTitle>
                <AlertDescription>{thread.summary}</AlertDescription>
              </Alert>
              {thread.suggestedReplies && <SuggestionChips items={thread.suggestedReplies} onSelect={setDraft} />}
            </div>
          ) : undefined
        }
      />
    </div>
  )
}

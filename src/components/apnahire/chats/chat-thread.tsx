"use client"

/**
 * ChatThread — one Apna Chat thread, for one job and one candidate (PRD
 * FR-1). A drill-down: on phones it is the whole screen (no top or bottom
 * bar), so its header is the app bar. From md it is the right pane of the
 * chat workspace: it scrolls on its own, the header (an h-16 band, then the
 * job card as an h-14 sub-row, both shared with the other panes, see
 * chat-bands.ts) sticks to the top of the
 * pane and the composer to its bottom, and Back is hidden (the list is
 * beside it).
 *
 *   Header    Back · avatar (lg) · name and facts (both open the profile panel
 *             below xl) · Profile button (below xl) · ⋮ (Not interested), then
 *             the job's nested card (rounded-card-nested, press-subtle)
 *   Wallpaper The whole area under the header (messages and composer) is
 *             `chat-wallpaper`: the doodle canvas, so the bubbles, dividers
 *             and chips (bg-card, shadow-control) lift off it as in WhatsApp
 *   Messages  ChatMessageList: a ChatNotice for "Apna never asks for money…"
 *             (PRD guardrails), then ChatDayDividers and ChatBubbles. The
 *             candidate is incoming; the recruiter outgoing with Sent or
 *             Read (FR-15); the AI an assistant bubble with its "Apna
 *             Assistant for…" label. Candidate quick replies are ChatChoice
 *             (FR-4). Consecutive messages from one sender are grouped
 *   Composer  ChatComposer, floating (transparent, pill input, round Mic or
 *             Send beside it). On urgent threads with a summary its top slot
 *             is one scrolling chip row: "AI summary" (Sparkles) first, then
 *             the suggested replies (FR-6). A reply chip fills the composer,
 *             it never sends. The summary is on request, not always shown:
 *             "AI summary" opens a PlanPopup (bottom sheet on phones, dialog
 *             from md, the CloseBubble) with the ai-calling clay (the one AI
 *             object in ValueArt), the summary text and the same replies as
 *             actions; picking one fills the composer and closes the pop-up.
 *             Sending takes the thread off Urgent and stops the AI (useChats)
 *
 * Scripted mock data: nothing leaves the prototype.
 */

import * as React from "react"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  UserRound,
  ShieldCheck,
  Sparkles,
  SuggestionChips,
} from "@apna/design-system"
import { CandidateProfileSheet } from "@/components/apnahire/chats/candidate-profile-panel"
import { BAND, SUBROW } from "@/components/apnahire/chats/chat-bands"
import { PlanPopup, PopupBody, PopupHeader } from "@/components/apnahire/plan-popup"
import { IconLabel } from "@/components/onlyrounds/shared"
import { useChats } from "@/hooks/apnahire/use-chats"
import { cn } from "@/lib/utils"
import { useAppBack } from "@/lib/apnahire/nav"
import {
  AI_LABEL,
  MONEY_WARNING,
  TIER_LABEL,
  type ChatMessage,
  type ChatThread as Thread,
} from "@/content/chats"

/** The "AI summary" chip's value: not a reply, so it never lands in the draft. */
const SUMMARY = "ai-summary"

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
                media={
                  m.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- mock photo, size known
                    <img src={m.image.src} alt={m.image.alt} width={m.image.width} height={m.image.height} loading="lazy" />
                  )
                }
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
  const [summaryOpen, setSummaryOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)
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

  const pickReply = (text: string) => {
    setDraft(text)
    setSummaryOpen(false)
  }

  return (
    <div className="chat-wallpaper flex min-h-svh flex-col md:min-h-0 md:flex-1 md:overflow-y-auto">
      {/* The app bar on phones; the top of the pane from md. */}
      <header className="sticky top-0 z-sticky flex flex-col border-b border-border bg-card max-md:gap-3 max-md:px-4 max-md:py-3 md:border-b-0">
        <div className={cn("flex items-center gap-3", BAND)}>
          <BackButton className="md:hidden" onClick={back} />
          {/* Below xl the avatar and name open the profile panel too. */}
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-control text-left xl:pointer-events-none"
            aria-label={`Open ${thread.candidate.name}'s profile`}
          >
            <Avatar size="lg">
              {thread.candidate.photo && <AvatarImage src={thread.candidate.photo} alt="" />}
              <AvatarFallback className="bg-accent text-accent-foreground">{thread.candidate.initial}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-h6 truncate">{thread.candidate.name}</span>
              <span className="text-caption truncate text-muted-foreground">{thread.candidate.meta}</span>
            </span>
          </button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Candidate profile"
            className="shrink-0 xl:hidden"
            onClick={() => setProfileOpen(true)}
          >
            <UserRound className="size-4" aria-hidden />
          </Button>
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
        {/* The job card: which job this thread is about. From md it is the
            sub-row under the band (one line, same height as the list's and
            the profile's sub-rows). */}
        <div className={SUBROW}>
          <Link
            href="/apnahire/jobs"
            className="ink relative flex w-full items-center justify-between gap-3 rounded-card-nested border border-border px-3 py-2 transition-interactive press-subtle md:h-9 md:py-0"
          >
            <span className="flex min-w-0 flex-col md:flex-row md:items-center md:gap-2">
              <span className="text-body-sm truncate font-semibold">{thread.job.title}</span>
              <span className="text-caption truncate text-muted-foreground">
                <IconLabel icon={MapPin}>
                  {thread.job.area}, {thread.job.city}
                </IconLabel>
              </span>
            </span>
            <Badge variant="secondary" className="shrink-0">
              {TIER_LABEL[thread.job.tier]}
            </Badge>
          </Link>
        </div>
      </header>

      <CandidateProfileSheet thread={thread} open={profileOpen} onOpenChange={setProfileOpen} />

      <ChatMessageList className="flex-1 px-4 py-4 md:py-3">
        <ChatNotice icon={<ShieldCheck aria-hidden />}>{MONEY_WARNING}</ChatNotice>
        <Messages messages={thread.messages} />
        <div ref={end} />
      </ChatMessageList>

      <ChatComposer
        variant="floating"
        value={draft}
        onValueChange={setDraft}
        onSend={send}
        top={
          urgent && thread.summary ? (
            <SuggestionChips
              layout="scroll"
              label="AI summary and suggested replies"
              items={[
                { label: "AI summary", icon: <Sparkles aria-hidden />, value: SUMMARY },
                ...(thread.suggestedReplies ?? []),
              ]}
              onSelect={(item) => (item === SUMMARY ? setSummaryOpen(true) : setDraft(item))}
            />
          ) : undefined
        }
      />

      {thread.summary && (
        <PlanPopup open={summaryOpen} onOpenChange={setSummaryOpen}>
          <PopupHeader art="ai-calling" title="AI summary" description="Apna Assistant, from this chat" />
          <PopupBody>
            <p className="text-body-sm text-foreground">{thread.summary}</p>
            {thread.suggestedReplies && (
              <div className="flex flex-col gap-2">
                <span className="text-caption text-muted-foreground">Suggested replies</span>
                <SuggestionChips
                  items={thread.suggestedReplies}
                  icon={<Sparkles aria-hidden />}
                  onSelect={pickReply}
                />
              </div>
            )}
          </PopupBody>
        </PlanPopup>
      )}
    </div>
  )
}

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
 *             status ticks (clock, sent, delivered, read; FR-15); the AI an
 *             assistant bubble with its "Apna Assistant for…" label and the
 *             same ticks. Every bubble shows its clock time; a ChatDayDivider
 *             opens each day. A thread that was unread when opened gets a
 *             ChatUnreadDivider above the candidate's first message since the
 *             recruiter's or AI's last one, and opens scrolled to it (else to
 *             the newest message), again after photos load. Candidate quick replies are ChatChoice
 *             (FR-4). Consecutive messages from one sender are grouped
 *   Expired   A job that expired (ChatJob.expired): an "Expired" Badge on the
 *             job card and a warning ChatNotice above the messages. The thread
 *             stays open; the AI sends nothing new
 *   Unavailable  A deleted or blocked candidate: the composer and the chips
 *             give way to one ChatNotice bar (UNAVAILABLE_COPY); history stays
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
  AlertTriangle,
  Badge,
  Ban,
  Button,
  ChatBubble,
  ChatChoice,
  ChatComposer,
  ChatDayDivider,
  ChatMessageList,
  ChatNotice,
  ChatUnreadDivider,
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
  EXPIRED_NOTICE,
  MONEY_WARNING,
  TIER_LABEL,
  UNAVAILABLE_COPY,
  type ChatMessage,
  type ChatThread as Thread,
} from "@/content/chats"

/** The "AI summary" chip's value: not a reply, so it never lands in the draft. */
const SUMMARY = "ai-summary"

type Position = "single" | "first" | "middle" | "last"

/** Where a message sits in a run from one sender on one day. */
function positionOf(messages: ChatMessage[], i: number): Position {
  const m = messages[i]
  const same = (o?: ChatMessage) => !!o && o.from === m.from && !o.quickReply && o.day === m.day
  const prev = same(messages[i - 1])
  const next = same(messages[i + 1])
  return prev && next ? "middle" : prev ? "last" : next ? "first" : "single"
}

/** How many candidate messages sit after the recruiter's or the AI's last one. */
function trailingCandidateCount(messages: ChatMessage[]) {
  let n = 0
  for (let i = messages.length - 1; i >= 0 && messages[i].from === "candidate"; i--) n++
  return n
}

function Messages({
  messages,
  unreadCount,
  unreadRef,
  onImageLoad,
}: {
  messages: ChatMessage[]
  /** Candidate messages to flag as unread (0: no divider). They are the last `unreadCount` messages. */
  unreadCount: number
  unreadRef: React.Ref<HTMLDivElement>
  onImageLoad: () => void
}) {
  const unreadFrom = unreadCount > 0 ? messages.length - unreadCount : -1
  return (
    <>
      {messages.map((m, i) => {
        const dayDivider = i === 0 || messages[i - 1].day !== m.day
        return (
          <React.Fragment key={m.id}>
            {/* Order: the message's day divider, then the unread divider, then the message. */}
            {dayDivider && <ChatDayDivider>{m.day}</ChatDayDivider>}
            {i === unreadFrom && (
              <ChatUnreadDivider ref={unreadRef} className="-mx-4 scroll-mt-40">
                {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
              </ChatUnreadDivider>
            )}
            {m.quickReply ? (
              <ChatChoice time={m.time}>{m.text}</ChatChoice>
            ) : (
              <ChatBubble
                variant={m.from === "candidate" ? "incoming" : m.from === "ai" ? "assistant" : "outgoing"}
                time={m.time}
                status={m.from === "candidate" ? undefined : (m.status ?? "sent")}
                label={m.from === "ai" ? AI_LABEL : undefined}
                groupPosition={positionOf(messages, i)}
                media={
                  m.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- mock photo, size known
                    <img
                      src={m.image.src}
                      alt={m.image.alt}
                      width={m.image.width}
                      height={m.image.height}
                      loading="lazy"
                      onLoad={onImageLoad}
                    />
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
  const unreadDivider = React.useRef<HTMLDivElement>(null)
  // True for a moment after opening: photos that load then re-scroll to the open position.
  const opening = React.useRef(false)
  const unavailable = thread.candidate.availability
  const urgent = thread.status === "urgent" && !unavailable

  // Whether the thread was unread when opened: captured before markRead clears
  // it, and again when the pane switches to another thread.
  const [opened, setOpened] = React.useState({ id: thread.id, unread: thread.unread })
  if (opened.id !== thread.id) setOpened({ id: thread.id, unread: thread.unread })
  const unreadCount = opened.unread ? trailingCandidateCount(thread.messages) : 0

  /** The unread divider at the top, else the newest message at the bottom. */
  const scrollToOpenPosition = React.useCallback(() => {
    if (unreadDivider.current) unreadDivider.current.scrollIntoView({ block: "start" })
    else end.current?.scrollIntoView({ block: "end" })
  }, [])

  React.useEffect(() => {
    markRead(thread.id)
  }, [markRead, thread.id])
  React.useEffect(() => {
    opening.current = true
    scrollToOpenPosition()
    const timer = window.setTimeout(() => {
      opening.current = false
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [thread.id, unreadCount, scrollToOpenPosition])
  // A new message while the thread is open: follow it.
  const count = thread.messages.length
  const seen = React.useRef(count)
  React.useEffect(() => {
    if (count > seen.current) end.current?.scrollIntoView({ block: "end" })
    seen.current = count
  }, [count])

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
              <DropdownMenuItem className="whitespace-nowrap" disabled={!!unavailable}>
                Not interested
              </DropdownMenuItem>
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
            <span className="flex shrink-0 items-center gap-1.5">
              {thread.job.expired && <Badge variant="secondary">Expired</Badge>}
              <Badge variant="secondary">{TIER_LABEL[thread.job.tier]}</Badge>
            </span>
          </Link>
        </div>
      </header>

      <CandidateProfileSheet thread={thread} open={profileOpen} onOpenChange={setProfileOpen} />

      <ChatMessageList className="flex-1 px-4 py-4 md:py-3">
        <ChatNotice icon={<ShieldCheck aria-hidden />}>{MONEY_WARNING}</ChatNotice>
        {thread.job.expired && (
          <ChatNotice tone="warning" icon={<AlertTriangle aria-hidden />}>
            {EXPIRED_NOTICE}
          </ChatNotice>
        )}
        <Messages
          messages={thread.messages}
          unreadCount={unreadCount}
          unreadRef={unreadDivider}
          onImageLoad={() => {
            if (opening.current) scrollToOpenPosition()
          }}
        />
        <div ref={end} />
      </ChatMessageList>

      {unavailable ? (
        // No composer and no AI chips: the history stays readable, nothing can be sent.
        <div className="sticky bottom-0 z-sticky flex justify-center px-3 pt-2 pb-safe-3">
          <ChatNotice icon={<Ban aria-hidden />} className="max-w-none">
            {UNAVAILABLE_COPY[unavailable].notice}
          </ChatNotice>
        </div>
      ) : (
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
      )}

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

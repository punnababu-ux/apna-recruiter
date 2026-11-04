/**
 * Chat primitives — the message surface of Apna Chat (recruiter <-> candidate).
 *
 * Inspiration: WhatsApp's chat (bubbles grouped by sender, time and ticks
 * inside the bubble corner, day separators, centred system pills) with
 * Intercom/Front touches (an AI-assistant label, suggested replies).
 *
 * API
 *   <ChatMessageList>                       role="log" column; gap between groups
 *   <ChatDayDivider>Today</ChatDayDivider>  centred card pill
 *   <ChatBubble variant="incoming|outgoing|assistant"
 *               time="10:42" status="sent|read"   // status: outgoing/assistant
 *               label="Apna Assistant for …"      // assistant sender line, Sparkles icon
 *               groupPosition="single|first|middle|last">text</ChatBubble>
 *   <ChatChoice time="10:41">Interested</ChatChoice>   candidate quick reply
 *   <ChatNotice icon={<ShieldAlert />} tone="default|warning">…</ChatNotice>
 *
 * Variants: incoming = bg-card + border, start side. outgoing = bg-accent,
 * end side. assistant = the info-subtle surface (AI is sky across the
 * product, as the AI summary is), end side: it speaks for the recruiter.
 * Its label and time use the surface's own foreground, never the generic
 * muted grey, so they keep contrast on the tint (contrast rule: text
 * ≥ 4.5:1 on its own surface; the bubble stands apart from the wallpaper).
 * Consecutive bubbles from one sender pass groupPosition: the corner on the
 * sender's side tightens to `rounded-field` where it touches a neighbour.
 *
 * Wallpaper: the list is meant to sit on `chat-wallpaper` (doodle canvas). So
 * the pieces lift off it like WhatsApp's: bubbles, ChatChoice, ChatDayDivider
 * and ChatNotice all carry `shadow-control`, the smallest elevation role (a
 * hairline lift). `shadow-card` would be a card's resting shadow: too heavy for
 * a row of small bubbles. Incoming stays bg-card; the divider and the default
 * notice are bg-card too (the muted pill would vanish into the muted canvas).
 *
 * Radius: bubbles use `rounded-bubble`. ChatNotice uses `rounded-surface`:
 * it is a small inline notice, not a card (Card corners rule covers cards on
 * a page or nested in one), so the mid surface role fits, not card/card-nested.
 *
 * A11y: ChatMessageList is role="log" aria-live="polite". Ticks are
 * decorative; the status is announced via a visually-hidden "Sent"/"Read".
 * ChatChoice and ChatDayDivider are plain text, not interactive.
 *
 * Usage
 *   <ChatMessageList>
 *     <ChatDayDivider>Today</ChatDayDivider>
 *     <ChatBubble variant="incoming" time="10:40">Hi, is the role open?</ChatBubble>
 *     <ChatBubble variant="outgoing" time="10:41" status="read">Yes!</ChatBubble>
 *   </ChatMessageList>
 */
import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Check, Sparkles } from "@/icons/icons"

type ChatBubbleVariant = "incoming" | "outgoing" | "assistant"
type ChatGroupPosition = "single" | "first" | "middle" | "last"

const bubbleVariants = cva(
  "relative flex w-fit max-w-xs flex-col rounded-bubble px-3 py-2 text-body-sm shadow-control md:max-w-md",
  {
    variants: {
      variant: {
        incoming: "self-start border border-border bg-card text-card-foreground",
        outgoing: "self-end bg-accent text-accent-foreground",
        assistant: "self-end border border-info/30 bg-info-subtle text-info-subtle-foreground",
      },
    },
  }
)

/* The sender's side is the start for incoming, the end for the others. */
const groupCorners: Record<ChatBubbleVariant, Record<ChatGroupPosition, string>> = {
  incoming: {
    single: "",
    first: "rounded-es-field",
    middle: "rounded-ss-field rounded-es-field",
    last: "rounded-ss-field",
  },
  outgoing: {
    single: "",
    first: "rounded-ee-field",
    middle: "rounded-se-field rounded-ee-field",
    last: "rounded-se-field",
  },
  assistant: {
    single: "",
    first: "rounded-ee-field",
    middle: "rounded-se-field rounded-ee-field",
    last: "rounded-se-field",
  },
}

function ChatTicks({ status }: { status: "sent" | "read" }) {
  return (
    <span
      data-slot="chat-bubble-status"
      className={cn("inline-flex items-center", status === "read" && "text-info")}
    >
      <Check aria-hidden className="size-3.5" />
      {status === "read" && <Check aria-hidden className="-ml-2 size-3.5" />}
      <span className="sr-only">{status === "read" ? "Read" : "Sent"}</span>
    </span>
  )
}

function ChatBubble({
  variant,
  time,
  status,
  label,
  groupPosition = "single",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  variant: ChatBubbleVariant
  time?: string
  /** Outgoing and assistant only. */
  status?: "sent" | "read"
  /** Assistant sender line, shown above the text with a Sparkles icon. */
  label?: React.ReactNode
  groupPosition?: ChatGroupPosition
  children?: React.ReactNode
}) {
  const showStatus = status && variant !== "incoming"
  // The label and time read on the bubble's own surface.
  const metaTone = variant === "assistant" ? "text-info-subtle-foreground" : "text-muted-foreground"
  return (
    <div
      data-slot="chat-bubble"
      data-variant={variant}
      className={cn(bubbleVariants({ variant }), groupCorners[variant][groupPosition], className)}
      {...props}
    >
      {label && (
        <span
          data-slot="chat-bubble-label"
          className={cn("mb-1 flex items-center gap-1 text-caption", metaTone)}
        >
          <Sparkles aria-hidden className="size-3.5 shrink-0" />
          <span>{label}</span>
        </span>
      )}
      <span className="whitespace-pre-wrap break-words">{children}</span>
      {(time || showStatus) && (
        <span
          data-slot="chat-bubble-meta"
          className={cn("mt-0.5 flex items-center gap-1 self-end text-caption", metaTone)}
        >
          {time && <time>{time}</time>}
          {showStatus && <ChatTicks status={status} />}
        </span>
      )}
    </div>
  )
}

function ChatChoice({
  time,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  time?: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="chat-choice"
      className={cn(
        "inline-flex w-fit max-w-xs items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-1.5 text-body-sm font-medium text-card-foreground shadow-control md:max-w-md",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {time && <time className="text-caption font-normal text-muted-foreground">{time}</time>}
    </div>
  )
}

function ChatDayDivider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-day-divider"
      className={cn(
        "w-fit self-center rounded-full bg-card px-3 py-1 text-caption text-muted-foreground shadow-control",
        className
      )}
      {...props}
    />
  )
}

function ChatNotice({
  icon,
  tone = "default",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  icon?: React.ReactNode
  tone?: "default" | "warning"
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="chat-notice"
      data-tone={tone}
      className={cn(
        "flex w-fit max-w-xs items-start gap-2 self-center rounded-surface px-3 py-2 text-center text-caption shadow-control md:max-w-md [&>svg]:mt-0.5 [&>svg]:size-3.5 [&>svg]:shrink-0",
        tone === "warning"
          ? "bg-warning-subtle text-warning-subtle-foreground"
          : "bg-card text-muted-foreground",
        className
      )}
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  )
}

function ChatMessageList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-message-list"
      role="log"
      aria-live="polite"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

export { ChatBubble, ChatChoice, ChatDayDivider, ChatNotice, ChatMessageList }

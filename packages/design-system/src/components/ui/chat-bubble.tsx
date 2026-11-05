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
 *               time="10:42 am"                   // every bubble shows its time
 *               status="sending|sent|delivered|read"   // outgoing/assistant only
 *               label="Apna Assistant for …"      // assistant sender line, Sparkles icon
 *               media={<img src alt width height />}   // photo above the text
 *               avatar={<Avatar size="sm" …/>}    // who sent it (see Sender identity)
 *               senderName="Ravi"                 // name above the first bubble of a run
 *               groupPosition="single|first|middle|last">text</ChatBubble>
 *   <ChatChoice time="10:41 am" avatar senderName>Interested</ChatChoice>   candidate quick reply
 *   <ChatUnreadDivider>2 unread messages</ChatUnreadDivider>   full-width band
 *   <ChatStatusTicks status="read" />       the same ticks, for the inbox row
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
 * Sender identity (WhatsApp group, Intercom): pass `avatar` and/or `senderName`.
 * Incoming puts the avatar column on the start side, outgoing and assistant on
 * the end side. The avatar shows only on the LAST bubble of a run (groupPosition
 * "last" or "single"), bottom-aligned, and that bubble's corner next to it
 * tightens to `rounded-field` (its tail). The other bubbles of the run keep an
 * empty size-7 spacer so the text lines up. Pass a small avatar sized to the
 * slot: `<Avatar size="sm" className="size-7 ring-2 ring-card">`; the ring keeps
 * its edge on the wallpaper (the image or tint alone can melt into it).
 * `senderName` shows above the FIRST bubble of a run ("first" or "single"), in
 * text-caption font-medium text-foreground: the foreground role is far above
 * 4.5:1 on the wallpaper in light and dark, where muted text would be marginal.
 * An assistant bubble with a `label` never shows the name too (the label is its
 * sender line). The slot is size-7 (28px): the sm avatar (24px) is too small to
 * read a face, size-8 pushes the column wide on a phone.
 *
 * Width: every bubble and choice sits in a row (`chat-sender-row`) capped at
 * `max-w-2/3` of the list (WhatsApp keeps 65-75%), so the opposite side always
 * keeps a clear third; the avatar column counts inside that cap. The bubble
 * itself keeps `max-w-xs` / `md:max-w-md`, so on a wide pane the px cap wins
 * (the effective width is the smaller of the two).
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
 * Media: `media` (an <img> with width and height set, so the bubble does not
 * jump when it loads) sits above the text, WhatsApp style: the photo is inset
 * 4px from the bubble edge (the bubble's padding less the negative margin) and
 * runs full width. Its corners are `rounded-field`: the bubble's own radius
 * minus the inset would be near `rounded-field` already, and field is the
 * smaller role the grouped corners use, so the photo nests inside the bubble
 * without a corner clash. The photo is capped at max-h-80 and cropped
 * (object-cover). The bubble keeps its border or shadow-control edge, so an
 * image bubble stays visible on the wallpaper; the time stays under the photo,
 * at the end, on the bubble's own surface. Give the <img> a meaningful alt.
 *
 * Status (WhatsApp): sending = Clock, sent = one tick, delivered = two ticks
 * in the bubble's muted tone, read = two ticks in `--chat-tick-read` (sky).
 * Time and ticks sit inline at the bottom-end of the bubble. Contrast rule:
 * the icons are ≥ 3:1 on their bubble, light and dark (read tick 6.0:1 on
 * the outgoing and 5.5:1 on the assistant bubble in light, 8.2:1 and 5.1:1 in
 * dark; delivered uses the bubble's own meta text colour, ≥ 4.5:1 outgoing).
 * Colour is not the only cue: each status has a visually-hidden label and a
 * `title` tooltip ("Sending", "Sent", "Delivered", "Read").
 *
 * ChatUnreadDivider: a band across the thread (bg-info-subtle) with a centred
 * card pill, placed above the first unread message. Pass -mx-* to run it
 * edge to edge of a padded list.
 *
 * A11y: ChatMessageList is role="log" aria-live="polite". Ticks are
 * decorative; the status is announced via a visually-hidden label.
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
import { Check, Clock, Sparkles } from "@/icons/icons"

type ChatBubbleVariant = "incoming" | "outgoing" | "assistant"
type ChatMessageStatus = "sending" | "sent" | "delivered" | "read"
type ChatGroupPosition = "single" | "first" | "middle" | "last"

const bubbleVariants = cva(
  "relative flex w-fit max-w-xs min-w-0 flex-col rounded-bubble px-3 py-2 text-body-sm shadow-control md:max-w-md",
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

/* The tail: the bottom corner on the sender's side, tightened where the avatar sits. */
const avatarTail: Record<ChatBubbleVariant, string> = {
  incoming: "rounded-es-field",
  outgoing: "rounded-ee-field",
  assistant: "rounded-ee-field",
}

const STATUS_LABEL: Record<ChatMessageStatus, string> = {
  sending: "Sending",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
}

/** The message status glyphs. `tone` is the text colour for every state but
 *  read (default: muted text); read always uses the read-tick role. */
function ChatStatusTicks({
  status,
  tone = "text-muted-foreground",
  className,
}: {
  status: ChatMessageStatus
  tone?: string
  className?: string
}) {
  const double = status === "delivered" || status === "read"
  return (
    <span
      data-slot="chat-bubble-status"
      data-status={status}
      title={STATUS_LABEL[status]}
      className={cn("inline-flex shrink-0 items-center", status === "read" ? "text-chat-tick-read" : tone, className)}
    >
      {status === "sending" ? (
        <Clock aria-hidden className="size-3" />
      ) : (
        <Check aria-hidden className="size-3.5" />
      )}
      {double && <Check aria-hidden className="-ml-2 size-3.5" />}
      <span className="sr-only">{STATUS_LABEL[status]}</span>
    </span>
  )
}

/** Wraps a bubble or choice in its row: the row carries the width cap (max-w-2/3
 *  of the message area, so the far side always keeps a clear third) and, when
 *  given, the sender's avatar column and name. The avatar slot is size-7;
 *  it holds the avatar on the last bubble of a run and stays empty (a spacer)
 *  on the others, so the text lines up. */
function ChatSender({
  side,
  avatar,
  senderName,
  showAvatar,
  showName,
  children,
}: {
  side: "start" | "end"
  avatar?: React.ReactNode
  senderName?: string
  showAvatar: boolean
  showName: boolean
  children: React.ReactNode
}) {
  const name = showName ? senderName : undefined
  const slot = avatar ? (
    <div data-slot="chat-bubble-avatar" className="flex size-7 shrink-0 items-end">
      {showAvatar && avatar}
    </div>
  ) : null
  return (
    <div
      data-slot="chat-sender-row"
      className={cn("flex w-fit max-w-2/3 items-end gap-2", side === "start" ? "self-start" : "self-end")}
    >
      {side === "start" && slot}
      <div className="flex min-w-0 flex-col gap-1">
        {name && (
          <span
            data-slot="chat-bubble-sender"
            className={cn("text-caption font-medium text-foreground", side === "start" ? "self-start" : "self-end")}
          >
            {name}
          </span>
        )}
        {children}
      </div>
      {side === "end" && slot}
    </div>
  )
}

function ChatBubble({
  variant,
  time,
  status,
  label,
  media,
  avatar,
  senderName,
  groupPosition = "single",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  variant: ChatBubbleVariant
  time?: string
  /** Outgoing and assistant only. */
  status?: ChatMessageStatus
  /** Assistant sender line, shown above the text with a Sparkles icon. */
  label?: React.ReactNode
  /** A photo above the text: an <img> with width, height and alt. */
  media?: React.ReactNode
  /** The sender's avatar, a size-7 `Avatar`. Shown on the last bubble of a run only. */
  avatar?: React.ReactNode
  /** The sender's name, above the first bubble of a run. Ignored when `label` is set. */
  senderName?: string
  groupPosition?: ChatGroupPosition
  children?: React.ReactNode
}) {
  const lastOfRun = groupPosition === "last" || groupPosition === "single"
  const firstOfRun = groupPosition === "first" || groupPosition === "single"
  const showStatus = status && variant !== "incoming"
  // The label and time read on the bubble's own surface.
  const metaTone = variant === "assistant" ? "text-info-subtle-foreground" : "text-muted-foreground"
  const bubble = (
    <div
      data-slot="chat-bubble"
      data-variant={variant}
      className={cn(
        bubbleVariants({ variant }),
        groupCorners[variant][groupPosition],
        avatar && lastOfRun && avatarTail[variant],
        className
      )}
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
      {media && (
        <div
          data-slot="chat-bubble-media"
          className="-mx-2 -mt-1 mb-1 overflow-hidden rounded-field [&>img]:block [&>img]:h-auto [&>img]:max-h-80 [&>img]:w-full [&>img]:object-cover"
        >
          {media}
        </div>
      )}
      {children && <span className="whitespace-pre-wrap break-words">{children}</span>}
      {(time || showStatus) && (
        <span
          data-slot="chat-bubble-meta"
          className={cn("mt-0.5 flex items-center gap-1 self-end text-caption", metaTone)}
        >
          {time && <time>{time}</time>}
          {showStatus && <ChatStatusTicks status={status} tone={metaTone} />}
        </span>
      )}
    </div>
  )
  return (
    <ChatSender
      side={variant === "incoming" ? "start" : "end"}
      avatar={avatar}
      senderName={label ? undefined : senderName}
      showAvatar={lastOfRun}
      showName={firstOfRun}
    >
      {bubble}
    </ChatSender>
  )
}

function ChatChoice({
  time,
  avatar,
  senderName,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  time?: string
  /** The candidate's avatar, a size-7 `Avatar`, beside the chip. */
  avatar?: React.ReactNode
  /** The candidate's name, above the chip. */
  senderName?: string
  children?: React.ReactNode
}) {
  const choice = (
    <div
      data-slot="chat-choice"
      className={cn(
        "inline-flex w-fit max-w-xs items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-body-sm font-medium text-card-foreground shadow-control md:max-w-md",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {time && <time className="text-caption font-normal text-muted-foreground">{time}</time>}
    </div>
  )
  return (
    <ChatSender side="start" avatar={avatar} senderName={senderName} showAvatar showName>
      {choice}
    </ChatSender>
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

function ChatUnreadDivider({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-unread-divider"
      className={cn("flex items-center justify-center self-stretch bg-info-subtle px-4 py-1.5", className)}
      {...props}
    >
      <span className="rounded-full bg-card px-3 py-1 text-caption font-medium text-info-subtle-foreground shadow-control">
        {children}
      </span>
    </div>
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

export { ChatBubble, ChatChoice, ChatDayDivider, ChatUnreadDivider, ChatStatusTicks, ChatNotice, ChatMessageList }
export type { ChatMessageStatus }

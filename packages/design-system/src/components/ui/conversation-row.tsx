/**
 * ConversationRow — one chat in the list: avatar, name, time, last message,
 * unread count and an optional status badge. WhatsApp's row, with an
 * Intercom-style status under the preview.
 *
 * API
 *   <ConversationList label="Conversations">
 *     <ConversationRow
 *       name="Ravi Kumar" initial="R"
 *       avatarSrc="/images/chats/ravi-kumar.jpg"   // optional photo; the initial is the fallback
 *       subtitle="Delivery Executive · Super premium"
 *       preview="Can I join from Monday?" time="10:42 am"
 *       previewStatus="read"                 // ticks before the preview (your last message)
 *       unread unreadCount={2}
 *       status={<Badge variant="warning">Awaiting reply</Badge>}
 *       render={<Link href="/chat/42" />}   // Next Link, or any element
 *       active                              // the open chat on desktop panes
 *     />
 *   </ConversationList>
 *
 * Links: the row renders an `<a>` when `href` is set, a `<button>`-less
 * `<div>` otherwise. Product code passes Next's Link with `render` (Base UI
 * useRender, as the other primitives do); `href` alone is for plain anchors.
 *
 * Separators: each row has `border-b`; ConversationList removes the last
 * one, so rows in a list need no extra handling.
 *
 * Time (WhatsApp's list rules): a clock time for today ("10:42 am"), then
 * "Yesterday", the weekday within the last week, else a date ("2 Nov").
 *
 * previewStatus: when the last message is yours (recruiter or AI), the same
 * ticks as in the thread (ChatStatusTicks, with a visually-hidden label)
 * lead the preview. Leave it off when the last message is the candidate's.
 *
 * Unread: the time turns primary, the preview turns foreground, and the
 * count shows as a green pill. Badge's `count` variant is red, so the pill
 * is drawn here with semantic tokens.
 */

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChatStatusTicks, type ChatMessageStatus } from "@/components/ui/chat-bubble"

interface ConversationRowProps extends useRender.ComponentProps<"a"> {
  name: string
  /** Avatar fallback letter, shown while there is no photo or it fails to load. */
  initial: string
  /** Photo for the avatar (alt = name). */
  avatarSrc?: string
  /** e.g. the job and plan: "Delivery Executive · Super premium". */
  subtitle?: string
  /** Last message, clamped to one line. */
  preview: string
  /** "10:42 am" today, "Yesterday", a weekday, or a date: "2 Nov". */
  time: string
  /** Ticks before the preview, when the last message is the recruiter's or the AI's. */
  previewStatus?: ChatMessageStatus
  unreadCount?: number
  /** Status slot under the preview, usually a Badge. */
  status?: React.ReactNode
  /** The selected row in a two-pane desktop layout. */
  active?: boolean
  /** Unread styling; defaults to true when unreadCount > 0. */
  unread?: boolean
}

function ConversationRow({
  name,
  initial,
  avatarSrc,
  subtitle,
  preview,
  time,
  previewStatus,
  unreadCount,
  status,
  active = false,
  unread,
  className,
  render,
  ...props
}: ConversationRowProps) {
  const isUnread = unread ?? (unreadCount ?? 0) > 0
  const hasLink = props.href !== undefined

  return useRender({
    defaultTagName: hasLink ? "a" : "div",
    props: mergeProps<"a">(
      {
        className: cn(
          "ink relative flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-interactive outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
          active && "bg-accent",
          className
        ),
        children: (
          <>
            <Avatar size="lg">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
              <AvatarFallback className="bg-accent text-accent-foreground">{initial}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-h6 min-w-0 truncate">{name}</span>
                <span className={cn("text-caption shrink-0", isUnread ? "text-primary" : "text-muted-foreground")}>
                  {time}
                </span>
              </div>
              {subtitle && <span className="text-caption truncate text-muted-foreground">{subtitle}</span>}
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-1">
                  {previewStatus && <ChatStatusTicks status={previewStatus} />}
                  <span className={cn("text-body-sm min-w-0 truncate", isUnread ? "text-foreground" : "text-muted-foreground")}>
                    {preview}
                  </span>
                </span>
                {unreadCount ? (
                  <Badge variant="count-positive" size="count" className="shrink-0">
                    {unreadCount}
                    <span className="sr-only"> unread</span>
                  </Badge>
                ) : null}
              </div>
              {status && <div className="mt-1 flex">{status}</div>}
            </div>
          </>
        ),
      },
      { ...props, "aria-current": active ? "true" : undefined }
    ),
    render,
    state: { active, unread: isUnread },
  })
}

function ConversationList({
  label,
  className,
  children,
}: {
  /** Accessible name for the list. */
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <ul
      data-slot="conversation-list"
      aria-label={label}
      className={cn("flex flex-col [&>li:last-child>*]:border-b-0", className)}
    >
      {React.Children.map(children, (child) => (child ? <li>{child}</li> : null))}
    </ul>
  )
}

export { ConversationRow, ConversationList }
export type { ConversationRowProps }

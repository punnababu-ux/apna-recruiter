"use client"

/**
 * Chat attachments — the file pieces of a chat: a card for a file that was
 * sent, and the tray of files waiting to be sent.
 *
 * API
 *   <ChatFileCard name="Job description.pdf" size={245760} onAction={open} actionLabel="Open" />
 *   <ChatAttachmentTray items={pending} onRemove={(id) => …} />
 *   formatFileSize(245760)   // "240 KB"
 *   fileKind("cv.pdf", type) // "document" | "sheet" | "image" | "other"
 *
 * ChatFileCard   A file-type icon tile, the name (truncated at the end, full
 *                name in the `title`) and the meta line "PDF · 240 KB".
 *                `variant="bubble"` (default) goes inside a ChatBubble's
 *                `media` slot: it takes its colours from the bubble
 *                (`text-current`, never a fixed grey), so the name and meta
 *                keep the bubble's own text contrast (≥ 4.5:1) in the
 *                incoming, outgoing and assistant bubbles, light and dark, and
 *                the icon (≥ 3:1) sits on a `bg-background/50` tile.
 *                `variant="standalone"` is a bordered bg-card row for use
 *                outside a bubble. `onAction` or `href` adds a quiet action
 *                (default label "Open").
 * ChatAttachmentTray  The row of pending files above a composer's input. An
 *                image gets a square thumbnail (`object-cover`,
 *                `rounded-field`), any other file a chip with its icon and
 *                name. Each has a remove button labelled "Remove <name>".
 *                Scrolls sideways when many (`no-scrollbar`, `mask-fade-e`).
 *                Pair with ChatComposer `attachments`.
 *
 * Contrast: on the tray's surface (bg-card) the thumbnail's remove button is
 * a bg-card disc with a foreground X (≥ 4.5:1) and a border (≥ 3:1), so it
 * stays visible over any photo.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { File, FileSpreadsheet, FileText, ImageIcon, X } from "@/icons/icons"

type ChatFileKind = "document" | "sheet" | "image" | "other"

const KIND_ICON = {
  document: FileText,
  sheet: FileSpreadsheet,
  image: ImageIcon,
  other: File,
} as const satisfies Record<ChatFileKind, unknown>

/** The file's extension in capitals ("PDF"), or "" when it has none. */
function fileExtension(name: string) {
  const dot = name.lastIndexOf(".")
  return dot > 0 && dot < name.length - 1 ? name.slice(dot + 1).toUpperCase() : ""
}

/** Which icon a file gets: by MIME type, then by extension. */
function fileKind(name: string, type = ""): ChatFileKind {
  const ext = fileExtension(name)
  if (type.startsWith("image/")) return "image"
  if (["XLS", "XLSX", "CSV"].includes(ext)) return "sheet"
  if (["PDF", "DOC", "DOCX", "TXT"].includes(ext)) return "document"
  return "other"
}

/** Bytes as the card shows them: "512 B", "240 KB", "1.5 MB". */
function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, "")} MB`
}

function ChatFileCard({
  name,
  size,
  type,
  actionLabel = "Open",
  onAction,
  href,
  variant = "bubble",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  name: string
  /** Size in bytes. */
  size?: number
  /** MIME type, to pick the icon (image/…); the extension is used otherwise. */
  type?: string
  /** The action's label. Default "Open". */
  actionLabel?: string
  onAction?: () => void
  /** Makes the action a link, opened in a new tab. */
  href?: string
  /** "bubble" (default): inside a ChatBubble, colours from the bubble. "standalone": a bordered bg-card row. */
  variant?: "bubble" | "standalone"
}) {
  const Icon = KIND_ICON[fileKind(name, type)]
  const meta = [fileExtension(name), size === undefined ? "" : formatFileSize(size)].filter(Boolean).join(" · ")
  const actionProps = href
    ? { render: <a href={href} target="_blank" rel="noreferrer" />, nativeButton: false }
    : { onClick: onAction }
  return (
    <div
      data-slot="chat-file-card"
      data-variant={variant}
      className={cn(
        "flex min-w-0 items-center gap-2.5 rounded-field p-2 text-body-sm",
        variant === "bubble"
          ? "bg-background/50 text-current"
          : "border border-border bg-card text-card-foreground shadow-control",
        className
      )}
      {...props}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-background/70 text-current">
        <Icon aria-hidden className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span title={name} className="truncate font-medium">
          {name}
        </span>
        {meta && <span className="text-caption">{meta}</span>}
      </span>
      {(onAction || href) && (
        <Button type="button" variant="ghost" size="sm" className="shrink-0 text-current" {...actionProps}>
          {actionLabel}
          <span className="sr-only">{name}</span>
        </Button>
      )}
    </div>
  )
}

interface ChatAttachmentItem {
  id: string
  name: string
  /** Size in bytes. */
  size: number
  /** MIME type. */
  type: string
  /** An object URL or image URL: an image with a `url` shows as a thumbnail. */
  url?: string
}

function ChatAttachmentTray({
  items,
  onRemove,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  items: ChatAttachmentItem[]
  onRemove: (id: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div
      data-slot="chat-attachment-tray"
      role="group"
      aria-label={`${items.length} ${items.length === 1 ? "attachment" : "attachments"}`}
      className={cn("no-scrollbar mask-fade-e flex gap-2 overflow-x-auto px-1 pt-2 pb-1", className)}
      {...props}
    >
      {items.map((item) => {
        const remove = (
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={`Remove ${item.name}`}
            onClick={() => onRemove(item.id)}
            className="rounded-full bg-card text-foreground"
          >
            <X aria-hidden />
          </Button>
        )
        if (item.url && fileKind(item.name, item.type) === "image") {
          return (
            <div key={item.id} data-slot="chat-attachment" className="relative size-16 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
              <img src={item.url} alt={item.name} className="size-full rounded-field object-cover" />
              <span className="absolute -top-1.5 -right-1.5 flex">{remove}</span>
            </div>
          )
        }
        const Icon = KIND_ICON[fileKind(item.name, item.type)]
        return (
          <div
            key={item.id}
            data-slot="chat-attachment"
            className="flex h-16 w-44 shrink-0 items-center gap-2 rounded-field border border-border bg-muted pr-1 pl-2.5 text-foreground"
          >
            <Icon aria-hidden className="size-5 shrink-0" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span title={item.name} className="truncate text-body-sm font-medium">
                {item.name}
              </span>
              <span className="text-caption">{formatFileSize(item.size)}</span>
            </span>
            {remove}
          </div>
        )
      })}
    </div>
  )
}

export { ChatFileCard, ChatAttachmentTray, fileKind, formatFileSize }
export type { ChatAttachmentItem, ChatFileKind }

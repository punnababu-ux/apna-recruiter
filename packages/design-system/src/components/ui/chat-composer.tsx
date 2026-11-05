"use client"

/**
 * ChatComposer — the message box at the foot of a chat. A growing textarea
 * with one round trailing button: Send (green, the screen's one primary
 * action) when there is text, Mic when the box is empty, as in WhatsApp. Both
 * are the same size, so the swap never shifts the layout.
 *
 * Enter sends, Shift+Enter starts a new line (as in PromptInput). The box
 * grows with its content up to `max-h-32`, then scrolls.
 *
 * API
 *   <ChatComposer
 *     value={text}
 *     onValueChange={setText}
 *     onSend={(t) => post(t)}
 *     onMic={startRecording}      // optional; Mic is disabled without it
 *     top={<SuggestionChips … />} // optional slot above the input row
 *     leading={<Button … />}      // optional buttons left of the input (attach, templates)
 *     attachments={<ChatAttachmentTray … />}  // optional, above the input row
 *     canSend={text !== "" || files.length > 0}  // optional override (see Attachments)
 *     onPasteFiles={add} onDropFiles={add}    // optional; files pasted or dropped
 *     variant="docked | floating" // default docked
 *   />
 *
 * Attachments: the composer holds no files, the parent does. `attachments`
 * (a ChatAttachmentTray) sits above the input row, inside the pill (floating)
 * or the field block (docked). `canSend` overrides "there is text": pass true
 * when files are pending, so Send is on with an empty caption. Mic shows only
 * with no text AND `canSend` not true. `onSend` gets the trimmed text, which
 * may be "". `onPasteFiles(files)` fires when the clipboard holds files (a
 * pasted image; pasted text still goes into the box). `onDropFiles(files)`
 * fires on a file dropped on the input area, which shows a drop state (a
 * primary ring and "Drop files to attach"). Both are inert when not given.
 * `leading` sits left of the text, inside the pill (floating) or before the
 * textarea (docked); give it ghost icon buttons, each with an aria-label.
 *
 * Variants
 *   docked    sticky bottom-0 bar on the StickyCtaBar surface (frosted card
 *             strip, top border) with the home-indicator inset; the textarea
 *             is a bordered field and Mic is a quiet ghost button.
 *             `docked={false}` (docked variant only) drops the bar for a plain
 *             block inside a card or a desktop pane.
 *   floating  WhatsApp style, for a `chat-wallpaper` thread. No bar: the
 *             container is transparent and sticky at the bottom (safe-area
 *             padding, `pb-safe-3`), so messages scroll behind it. The input
 *             is a rounded pill card (bg-card, `shadow-popover`: it floats
 *             over scrolling content, one step above the bubbles'
 *             `shadow-control`) and BESIDE it, not inside, sits a separate
 *             round primary button, Mic or Send. `top` floats above too (a
 *             scroll SuggestionChips row). The container lets touches through
 *             to the messages except on the pill, button and `top`.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Send } from "@/icons/icons"

interface ChatComposerProps {
  value: string
  onValueChange: (value: string) => void
  /** Called with the trimmed text on Send or Enter. */
  onSend: (text: string) => void
  placeholder?: string
  /** Slot above the input row: an AI summary, suggestion chips. */
  top?: React.ReactNode
  /** "docked": frosted bottom bar (default). "floating": transparent, pill input + round button. */
  variant?: "docked" | "floating"
  /** Docked variant only: false gives a plain block, not a sticky bar. */
  docked?: boolean
  /** Buttons left of the input (attach, templates): ghost icon buttons with aria-labels. */
  leading?: React.ReactNode
  /** Above the input row, inside the pill: a ChatAttachmentTray. */
  attachments?: React.ReactNode
  /** Overrides "there is text" for Send and the Mic swap: true with pending attachments. */
  canSend?: boolean
  /** Files pasted into the box (an image from the clipboard). */
  onPasteFiles?: (files: File[]) => void
  /** Files dropped on the input area. Shows a drop state while dragging over it. */
  onDropFiles?: (files: File[]) => void
  /** Voice-note tap, shown while the box is empty and nothing is attached. */
  onMic?: () => void
  disabled?: boolean
  className?: string
}

function ChatComposer({
  value,
  onValueChange,
  onSend,
  placeholder = "Type a message",
  top,
  variant = "docked",
  docked = true,
  leading,
  attachments,
  canSend: canSendProp,
  onPasteFiles,
  onDropFiles,
  onMic,
  disabled = false,
  className,
}: ChatComposerProps) {
  const text = value.trim()
  const floating = variant === "floating"
  const ready = canSendProp ?? text.length > 0
  const canSend = ready && !disabled
  // Drag depth: dragenter and dragleave also fire for the children.
  const [dragDepth, setDragDepth] = React.useState(0)
  const dragging = dragDepth > 0

  function send() {
    if (canSend) onSend(text)
  }

  const isFileDrag = (e: React.DragEvent) => !!onDropFiles && !disabled && e.dataTransfer.types.includes("Files")
  const dropProps = {
    onDragEnter: (e: React.DragEvent) => {
      if (isFileDrag(e)) setDragDepth((d) => d + 1)
    },
    onDragOver: (e: React.DragEvent) => {
      if (isFileDrag(e)) e.preventDefault()
    },
    onDragLeave: (e: React.DragEvent) => {
      if (isFileDrag(e)) setDragDepth((d) => Math.max(0, d - 1))
    },
    onDrop: (e: React.DragEvent) => {
      if (!isFileDrag(e)) return
      e.preventDefault()
      setDragDepth(0)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) onDropFiles?.(files)
    },
  }

  const textarea = (
    <Textarea
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault()
          send()
        }
      }}
      onPaste={(e) => {
        const files = Array.from(e.clipboardData.files)
        if (!onPasteFiles || files.length === 0) return
        onPasteFiles(files)
        // Text copied from a document can carry a preview image too: keep the text.
        if (!e.clipboardData.getData("text/plain")) e.preventDefault()
      }}
      placeholder={placeholder}
      aria-label={placeholder}
      disabled={disabled}
      rows={1}
      inputSize="sm"
      className={cn(
        "min-h-10 max-h-32 flex-1 resize-none py-2 text-base md:text-sm",
        floating &&
          "min-h-10 rounded-composer border-0 bg-transparent px-4 py-2.5 hover:border-0 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
      )}
    />
  )
  const dropOverlay = dragging && (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-card/90 text-body-sm font-medium text-foreground"
    >
      Drop files to attach
    </span>
  )
  const action =
    ready ? (
      <Button
        type="button"
        size="icon-lg"
        aria-label="Send"
        disabled={disabled}
        onClick={send}
        className={cn(floating && "shrink-0 rounded-full shadow-popover")}
      >
        <Send />
      </Button>
    ) : (
      <Button
        type="button"
        variant={floating ? "default" : "ghost"}
        size="icon-lg"
        aria-label="Record voice note"
        disabled={disabled || !onMic}
        onClick={onMic}
        className={cn(floating && "shrink-0 rounded-full shadow-popover")}
      >
        <Mic />
      </Button>
    )

  if (floating) {
    return (
      <div
        data-slot="chat-composer"
        data-variant="floating"
        className={cn(
          "pointer-events-none sticky bottom-0 z-sticky flex flex-col gap-2 px-3 pt-2 pb-safe-3 *:pointer-events-auto",
          className
        )}
      >
        {top}
        <div className="flex items-end gap-2">
          <div
            {...dropProps}
            className={cn(
              "relative flex min-w-0 flex-1 flex-col rounded-composer bg-card shadow-popover transition-interactive focus-within:ring-3 focus-within:ring-ring/50",
              dragging && "ring-2 ring-primary"
            )}
          >
            {attachments}
            <div className="flex items-end">
              {leading && <div className="flex shrink-0 items-center gap-0.5 pb-1 pl-1">{leading}</div>}
              {textarea}
            </div>
            {dropOverlay}
          </div>
          {action}
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="chat-composer"
      data-variant="docked"
      className={cn(
        "flex flex-col gap-2",
        docked && "sticky bottom-0 z-sticky border-t border-border bg-card/95 px-4 pt-3 pb-safe-3 backdrop-blur-md",
        className
      )}
    >
      {top}
      <div className="flex items-end gap-2">
        <div {...dropProps} className={cn("relative flex min-w-0 flex-1 flex-col gap-1 rounded-lg", dragging && "ring-2 ring-primary")}>
          {attachments}
          <div className="flex items-end gap-1">
            {leading && <div className="flex shrink-0 items-center gap-0.5">{leading}</div>}
            {textarea}
          </div>
          {dropOverlay}
        </div>
        {action}
      </div>
    </div>
  )
}

export { ChatComposer }
export type { ChatComposerProps }

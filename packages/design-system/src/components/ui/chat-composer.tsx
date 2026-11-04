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
 *     variant="docked | floating" // default docked
 *   />
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
  /** Voice-note tap, shown while the box is empty. */
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
  onMic,
  disabled = false,
  className,
}: ChatComposerProps) {
  const text = value.trim()
  const floating = variant === "floating"
  const canSend = text.length > 0 && !disabled

  function send() {
    if (canSend) onSend(text)
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
  const action =
    text.length > 0 ? (
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
          <div className="flex min-w-0 flex-1 items-end rounded-composer bg-card shadow-popover transition-interactive focus-within:ring-3 focus-within:ring-ring/50">
            {textarea}
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
        {textarea}
        {action}
      </div>
    </div>
  )
}

export { ChatComposer }
export type { ChatComposerProps }

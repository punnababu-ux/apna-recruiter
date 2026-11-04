"use client"

/**
 * ChatComposer — the message box docked at the foot of a chat. A growing
 * textarea with one round trailing button: Send (green, the screen's one
 * primary action) when there is text, Mic (quiet) when the box is empty, as
 * in WhatsApp. Both are the same size, so the swap never shifts the layout.
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
 *     docked                      // default: sticky bottom-0 bar
 *   />
 *
 * `docked` uses the StickyCtaBar surface (frosted card strip, top border)
 * with the home-indicator inset. `docked={false}` is a plain block for a
 * composer that lives inside a card or a desktop pane.
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
  /** Sticky bottom bar with the frosted surface (default), or a plain block. */
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
  docked = true,
  onMic,
  disabled = false,
  className,
}: ChatComposerProps) {
  const text = value.trim()
  const canSend = text.length > 0 && !disabled

  function send() {
    if (canSend) onSend(text)
  }

  return (
    <div
      data-slot="chat-composer"
      className={cn(
        "flex flex-col gap-2",
        docked && "sticky bottom-0 z-sticky border-t border-border bg-card/95 px-4 pt-3 pb-safe-3 backdrop-blur-md",
        className
      )}
    >
      {top}
      <div className="flex items-end gap-2">
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
          className="min-h-10 max-h-32 flex-1 resize-none py-2 text-base md:text-sm"
        />
        {text.length > 0 ? (
          <Button
            type="button"
            size="icon-lg"
            aria-label="Send"
            disabled={disabled}
            onClick={send}
          >
            <Send />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label="Record voice note"
            disabled={disabled || !onMic}
            onClick={onMic}
          >
            <Mic />
          </Button>
        )}
      </div>
    </div>
  )
}

export { ChatComposer }
export type { ChatComposerProps }

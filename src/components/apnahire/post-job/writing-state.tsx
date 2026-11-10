"use client"

/**
 * WritingState — what "writing the description" is doing, in the same voice
 * as DraftingState's strip on the Describe screen: one rolling line under
 * the box ("Reading your answers…", "Writing the summary…"), the Sparkles
 * pulse, and one quiet way out, "Stop, I'll paste mine" (a link, never an
 * outlined CTA: the AI is working, not asking). The box above it wears the
 * loading ring and the page the AI backdrop, as on Describe.
 *
 * Lines roll on a fixed beat and hold on the last one until the text lands;
 * the wait is real (10–15 s), so nothing is faked.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { Button, Sparkles } from "@apna/design-system"
import { cn } from "@/lib/utils"

const LINES = ["Reading your answers", "Writing the summary", "Listing the responsibilities", "Adding the requirements"]
const LINE_BEAT_MS = 2200

export function WritingState({ onStop, compact }: { onStop: () => void; compact?: boolean }) {
  const [at, setAt] = React.useState(0)
  React.useEffect(() => {
    if (at >= LINES.length - 1) return
    const t = window.setTimeout(() => setAt((n) => n + 1), LINE_BEAT_MS)
    return () => window.clearTimeout(t)
  }, [at])
  return (
    <div
      aria-live="polite"
      className={cn(
        "flex items-center justify-between gap-3 overflow-hidden",
        compact
          ? "text-sm"
          : "mx-3 -mt-4 h-12 rounded-b-card-nested bg-muted px-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-300",
      )}
    >
      {typeof document !== "undefined" &&
        createPortal(<span aria-hidden className="ai-backdrop" />, document.querySelector("[data-ai-backdrop-host]") ?? document.body)}
      <p key={at} className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-300">
        <Sparkles className="size-4 shrink-0 animate-pulse text-info" aria-hidden />
        <span className="truncate">{LINES[at]}…</span>
      </p>
      <Button type="button" variant="link-inline" className="shrink-0 text-foreground" onClick={onStop}>
        {/* The full label doesn't fit beside the line on a phone (rule 4: short copy for narrow). */}
        {compact ? "Stop" : (
          <>
            <span className="sm:hidden">Stop</span>
            <span className="hidden sm:inline">Stop, I’ll paste mine</span>
          </>
        )}
      </Button>
    </div>
  )
}

/** Types an arriving text into view: how many characters to show, growing
 *  until the whole text is there (null = show it all). */
export function useTypeIn(text: string, start: boolean) {
  const [shown, setShown] = React.useState<number | null>(null)
  // The text just landed from the AI: start from nothing. Set during render,
  // the sanctioned reset-on-prop-change pattern (no setState in an effect).
  const [seen, setSeen] = React.useState(text)
  if (text !== seen) {
    setSeen(text)
    if (start) setShown(0)
  }
  React.useEffect(() => {
    if (shown == null) return
    if (shown >= text.length) {
      const t = window.setTimeout(() => setShown(null), 0)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setShown((n) => (n == null ? null : Math.min(n + 4, text.length))), 16)
    return () => window.clearTimeout(t)
  }, [shown, text.length])
  return shown == null ? null : text.slice(0, shown)
}

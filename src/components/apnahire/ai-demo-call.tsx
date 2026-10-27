"use client"

/**
 * AI calling, shared pieces for the order summary's add-on card:
 *
 *   AiSparkle   the multi-colour AI sparkle (decorative)
 *   AiDemoCall  the demo call as one compact pill: play / stop · "Listen to / Demo" ·
 *               अ | En toggle, the letters inside. No scrub bar or timer (user call,
 *               2026-10-27): it's a taste of the call, not a player.
 *
 * Composition only: Button and ChipTabs from the design system.
 */

import * as React from "react"
import Image from "next/image"
import { Button, ChipTabs, Pause, Play, Separator } from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"

const DEMO = AI_CALLING_ADDON.demo
type CallId = (typeof DEMO.calls)[number]["value"]

/** The multi-colour AI sparkle (Figma "icons8-ai"); decorative. */
export function AiSparkle({ className }: { className?: string }) {
  return <Image src="/illustrations/ai-sparkle.svg" alt="" width={24} height={24} className={className} />
}

/** Play / stop plus the language switch. Without a recording `src`, play
 *  runs silently for the call's length, so it behaves the same either way. */
export function AiDemoCall() {
  const [lang, setLang] = React.useState<CallId>(DEMO.calls[0].value)
  const call = DEMO.calls.find((c) => c.value === lang) ?? DEMO.calls[0]
  const [playing, setPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  React.useEffect(() => {
    if (!playing || call.src) return
    const id = window.setTimeout(() => setPlaying(false), call.durationSec * 1000)
    return () => window.clearTimeout(id)
  }, [playing, call])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) audio.play().catch(() => setPlaying(false))
    else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [playing])

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card p-1">
      <Button
        type="button"
        variant="info"
        size="icon-sm"
        className="shrink-0 rounded-full"
        aria-label={playing ? "Stop demo call" : "Play demo call"}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <Pause className="fill-current" /> : <Play className="fill-current" />}
      </Button>
      {/* "Listen to" small over "Demo" larger; a rule sets off the switch. */}
      <div className="flex flex-col whitespace-nowrap">
        <span className="text-2xs leading-3 text-muted-foreground">{DEMO.eyebrow}</span>
        <span className="text-sm leading-4 font-semibold text-foreground">{DEMO.title}</span>
      </div>
      <Separator orientation="vertical" className="mx-1 h-6 data-vertical:self-center" />
      {/* Two letter chips; the chosen one takes the green tint. Not the dark
          solid pill: it would read as a second "Add" next to the CTA. */}
      <ChipTabs
        aria-label="Demo call language"
        variant="choice"
        size="sm"
        className="shrink-0 flex-nowrap gap-1"
        items={DEMO.calls.map((c) => ({
          value: c.value,
          label: (
            <span title={c.label}>
              <span aria-hidden>{c.glyph}</span>
              <span className="sr-only">{c.label}</span>
            </span>
          ),
        }))}
        value={lang}
        onValueChange={(next) => {
          setLang(next)
          setPlaying(false)
        }}
      />
      {call.src && (
        <audio ref={audioRef} key={call.value} src={call.src} preload="none" onEnded={() => setPlaying(false)} />
      )}
    </div>
  )
}

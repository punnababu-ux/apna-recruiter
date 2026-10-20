"use client"

/**
 * AI calling, shared pieces for the order summary's add-on card:
 *
 *   AiSparkle   the multi-colour AI sparkle (decorative)
 *   AiDemoCall  the demo call: "Demo call" · Hindi / English chips · a
 *               player, on the card's stronger sky strip
 *
 * (Until 2026-10-20 these lived in a "How AI calling works" pop-up; its
 * content moved onto the card itself.)
 *
 * Composition only: Avatar, ChipTabs, Slider and Button from the design
 * system; the strip is the `bg-gradient-ai-demo-strong` token.
 */

import * as React from "react"
import Image from "next/image"
import { Avatar, AvatarImage, Button, ChipTabs, Pause, Play, Slider } from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"

const DEMO = AI_CALLING_ADDON.demo
type CallId = (typeof DEMO.calls)[number]["value"]

const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`

/** The multi-colour AI sparkle (Figma "icons8-ai"); decorative. */
export function AiSparkle({ className }: { className?: string }) {
  return <Image src="/illustrations/ai-sparkle.svg" alt="" width={24} height={24} className={className} />
}

/** The demo call: title, language chips and a player. Without a recording
 *  `src` the timeline runs silently, so the control behaves the same
 *  either way. */
export function AiDemoCall() {
  const [lang, setLang] = React.useState<CallId>(DEMO.calls[0].value)
  const call = DEMO.calls.find((c) => c.value === lang) ?? DEMO.calls[0]
  const [elapsed, setElapsed] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const done = elapsed >= call.durationSec
  const isPlaying = playing && !done

  // Silent timeline when there's no recording.
  React.useEffect(() => {
    if (!isPlaying || call.src) return
    const id = window.setInterval(() => setElapsed((e) => Math.min(e + 1, call.durationSec)), 1000)
    return () => window.clearInterval(id)
  }, [isPlaying, call])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => setPlaying(false))
    else audio.pause()
  }, [isPlaying])

  const toggle = () => {
    if (done) {
      setElapsed(0)
      if (audioRef.current) audioRef.current.currentTime = 0
      setPlaying(true)
    } else {
      setPlaying(!isPlaying)
    }
  }

  const seek = (sec: number) => {
    setElapsed(sec)
    if (audioRef.current) audioRef.current.currentTime = sec
  }

  return (
    // The card's own sky, a couple of steps deeper (gradient-ai-demo-strong).
    <div className="flex flex-col gap-2 rounded-xl bg-gradient-ai-demo-strong p-3">
      {/* Title and chips share a row where there's room; on a phone the
          chips take their own line rather than squeezing the title. */}
      {/* Title at the left, chips at the far right, one row. */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold whitespace-nowrap text-foreground">{DEMO.title}</span>
        <ChipTabs
          aria-label="Demo call language"
          variant="choice"
          size="sm"
          // One row of two chips, never stacked.
          className="shrink-0 flex-nowrap"
          items={DEMO.calls.map((c) => ({ value: c.value, label: c.label }))}
          value={lang}
          onValueChange={(next) => {
            setLang(next)
            setPlaying(false)
            setElapsed(0)
          }}
        />
      </div>

      <div className="flex items-center gap-3 rounded-full bg-card p-1">
        <div className="flex min-w-0 flex-1 items-center gap-2 p-1">
          <Avatar className="size-7">
            <AvatarImage src="/illustrations/ai-agent-avatar.png" alt="AI calling agent" />
          </Avatar>
          <span className="shrink-0 text-2xs text-muted-foreground tabular-nums">
            {mmss(elapsed)}/{mmss(call.durationSec)}
          </span>
          <Slider
            size="sm"
            className="flex-1"
            min={0}
            max={call.durationSec}
            value={elapsed}
            onValueChange={(v) => seek(Array.isArray(v) ? v[0] : v)}
            thumbLabels={["Demo call position"]}
          />
        </div>
        <Button
          type="button"
          variant="checkout"
          size="icon-sm"
          className="shrink-0 rounded-full"
          aria-label={isPlaying ? "Pause demo call" : "Play demo call"}
          onClick={toggle}
        >
          {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
        </Button>
      </div>

      {call.src && (
        <audio
          ref={audioRef}
          key={call.value}
          src={call.src}
          preload="none"
          onTimeUpdate={(e) => setElapsed(Math.floor(e.currentTarget.currentTime))}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  )
}

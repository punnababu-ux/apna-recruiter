"use client"

/**
 * MomentCarousel — the Lounge hero's demo recordings, in onlyround.ai's
 * hero pattern: one card in front with a suite-gradient disc and a play
 * button, its neighbours dimmed and tucked behind on either side, ← → to
 * turn. The cards are frosted (surface-frosted), so the hero gradient
 * tints through rather than reading flat white. Rotates every 5s; pauses on hover, while a recording is open, and
 * stays put with reduced motion.
 *
 * Play opens the recording in a pop-up (DemoPlayer): the disc with
 * play / pause, the title, a seek bar. Composition only — Card, Badge,
 * Button, Dialog, Slider. Without a `src` yet the timeline runs silently
 * (as the AI calling explainer's demo call does), so the control already
 * behaves the way it will.
 */

import * as React from "react"
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Pause,
  Play,
  Slider,
} from "@apna/design-system"
import { ILLUSTRATION_TONE, type IllustrationTone } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

const TONES: IllustrationTone[] = ["plum", "green", "gold", "sky"]

export interface Moment {
  title: string
  tags: readonly string[]
  /** The demo recording (audio or video file in /public). */
  src?: string
  /** Length shown before the file loads (and the silent timeline's length). */
  durationSec: number
}

const mmss = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(Math.floor(sec % 60)).padStart(2, "0")}`

export function MomentCarousel({ moments, label }: { moments: readonly Moment[]; label: string }) {
  const [index, setIndex] = React.useState(0)
  const [hovered, setHovered] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const n = moments.length
  const go = (step: number) => setIndex((i) => (i + step + n) % n)

  React.useEffect(() => {
    if (hovered || open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % n), 5000)
    return () => window.clearInterval(id)
  }, [hovered, open, n])

  return (
    <div
      className="flex w-full flex-col items-center gap-6"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="relative grid w-full max-w-md place-items-center" aria-roledescription="carousel" aria-label={label}>
        {moments.map((moment, i) => {
          // -1 / 0 / 1: left neighbour, front, right neighbour; others hidden.
          const offset = ((i - index + n + 1) % n) - 1
          const front = offset === 0
          return (
            <Card
              key={moment.title}
              padding="lg"
              aria-hidden={!front}
              inert={!front}
              className={cn(
                "surface-frosted col-start-1 row-start-1 w-full max-w-xs items-center gap-5 text-center transition-interactive duration-enter ease-out-ui sm:max-w-sm",
                front && "z-10 shadow-elevated",
                offset === -1 && "-translate-x-1/4 scale-90 opacity-50 sm:-translate-x-1/3",
                offset === 1 && "translate-x-1/4 scale-90 opacity-50 sm:translate-x-1/3",
                !front && "pointer-events-none shadow-card",
                Math.abs(offset) > 1 && "opacity-0"
              )}
            >
              <Disc tone={TONES[i % TONES.length]}>
                <PlayButton playing={false} label={`Play ${moment.title}`} onClick={() => setOpen(true)} />
              </Disc>
              <p className="text-h5 text-balance text-foreground">{moment.title}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {moment.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Previous recording" onClick={() => go(-1)}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Next recording" onClick={() => go(1)}>
          <ArrowRight />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-6 sm:max-w-sm sm:p-8">
          {/* Mounted per opening, so closing stops and resets it. */}
          {open && <DemoPlayer moment={moments[index]} tone={TONES[index % TONES.length]} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

/** The suite-gradient disc the play button sits on. */
function Disc({ tone, children }: { tone: IllustrationTone; children: React.ReactNode }) {
  return (
    <span className={cn("flex size-36 items-center justify-center rounded-full shadow-card", ILLUSTRATION_TONE[tone])}>
      {children}
    </span>
  )
}

function PlayButton({ playing, label, onClick }: { playing: boolean; label: string; onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon-lg"
      className="size-14 rounded-full border-transparent bg-card text-foreground shadow-elevated"
      aria-label={label}
      onClick={onClick}
    >
      {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
    </Button>
  )
}

function DemoPlayer({ moment, tone }: { moment: Moment; tone: IllustrationTone }) {
  const [elapsed, setElapsed] = React.useState(0)
  const [duration, setDuration] = React.useState(moment.durationSec)
  const [playing, setPlaying] = React.useState(true)
  const mediaRef = React.useRef<HTMLAudioElement>(null)
  const done = elapsed >= duration
  const isPlaying = playing && !done

  // Silent timeline when there's no recording yet.
  React.useEffect(() => {
    if (!isPlaying || moment.src) return
    const id = window.setInterval(() => setElapsed((e) => Math.min(e + 1, duration)), 1000)
    return () => window.clearInterval(id)
  }, [isPlaying, moment.src, duration])

  React.useEffect(() => {
    const media = mediaRef.current
    if (!media) return
    if (isPlaying) media.play().catch(() => setPlaying(false))
    else media.pause()
  }, [isPlaying])

  const toggle = () => {
    if (done) {
      setElapsed(0)
      if (mediaRef.current) mediaRef.current.currentTime = 0
      setPlaying(true)
    } else setPlaying(!isPlaying)
  }

  const seek = (sec: number) => {
    setElapsed(sec)
    if (mediaRef.current) mediaRef.current.currentTime = sec
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Disc tone={tone}>
        <PlayButton playing={isPlaying} label={isPlaying ? "Pause recording" : "Play recording"} onClick={toggle} />
      </Disc>
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-h5 text-foreground">{moment.title}</DialogTitle>
        <DialogDescription className="text-overline text-muted-foreground">Live demo recording</DialogDescription>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Slider
          size="sm"
          min={0}
          max={duration}
          value={elapsed}
          onValueChange={(v) => seek(Array.isArray(v) ? v[0] : v)}
          thumbLabels={["Recording position"]}
        />
        <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>{mmss(elapsed)}</span>
          <span>{mmss(duration)}</span>
        </div>
      </div>
      {moment.src && (
        <audio
          ref={mediaRef}
          src={moment.src}
          preload="metadata"
          onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setDuration(Math.floor(e.currentTarget.duration))}
          onTimeUpdate={(e) => setElapsed(Math.floor(e.currentTarget.currentTime))}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  )
}

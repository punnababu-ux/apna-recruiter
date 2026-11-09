"use client"

import { Mic, Pause, Play, Video, X } from "@apna/design-system"
import * as ReactDOM from "react-dom"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { fmtMmSs } from "@/components/onlyrounds/candidate-drawer/utils"

// ── Video player (inline sticky) ─────────────────────────────────────────

// ── Video popup (portal, YouTube iframe) ────────────────────────────────

const DEMO_VIDEO_ID = "Ks-_Mh1QhMc" // Andrew Ng — demo interview recording

export function VideoPopup({
  candidateName,
  onClose,
  seekRef,
}: {
  candidateName: string
  onClose: () => void
  /** Parent passes a mutable ref; VideoPopup stores its seek fn here. */
  seekRef: React.MutableRefObject<((sec: number) => void) | null>
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // Register the YouTube seek fn so InsightsTab can call it
  React.useEffect(() => {
    seekRef.current = (sec: number) => {
      const win = iframeRef.current?.contentWindow
      if (!win) return
      win.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [sec, true] }),
        "*",
      )
      win.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*",
      )
    }
    return () => { seekRef.current = null }
  }, [seekRef])

  if (typeof document === "undefined") return null

  return ReactDOM.createPortal(
    <div
      className="fixed z-modal animate-in fade-in slide-in-from-right-4 duration-200"
      style={{ top: "16px", right: "calc(56rem + 12px)" }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-overlay border border-border bg-card shadow-dialog">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Video className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm font-semibold text-foreground">
            {candidateName} — Interview recording
          </span>
          {/* A floating panel, not a dialog: its close stays inside. */}
          <Button type="button" variant="ghost" size="icon-xs" className="shrink-0 text-muted-foreground" onClick={onClose} aria-label="Close video">
            <X />
          </Button>
        </div>

        {/* YouTube iframe (16:9) */}
        <div className="aspect-video w-full bg-muted">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1`}
            title={`${candidateName} interview recording`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        </div>

        {/* Hint footer */}
        <div className="border-t border-border bg-muted/30 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Click{" "}
            <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-success/10 border border-success/30">
              <Play className="size-2 fill-success text-success ml-px" />
            </span>{" "}
            on any criteria below to jump to that moment in the recording
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Audio player (sticky seek bar) ────────────────────────────────────────

export function AudioPlayer({
  elapsed,
  totalSec,
  playing,
  onTogglePlay,
  onSeek,
}: {
  elapsed: number
  totalSec: number
  playing: boolean
  onTogglePlay: () => void
  onSeek: (sec: number) => void
}) {
  const pct = totalSec > 0 ? (elapsed / totalSec) * 100 : 0
  const trackRef = React.useRef<HTMLDivElement>(null)

  const handleTrackClick = (e: React.MouseEvent) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onSeek(Math.round(ratio * totalSec))
  }

  return (
    <div className={cn(
      "transition-interactive duration-enter",
      playing
        /* Playing → full-bleed sticky strip below the tab bar */
        ? "-mx-4 sticky top-0 z-docked bg-card border-b border-border shadow-card"
        /* At rest → normal rounded card, same style as other insight cards */
        : "rounded-card-nested border border-border bg-card",
    )}>
      <div className={cn(
        "flex items-center gap-3",
        playing ? "px-4 py-3" : "p-3",
      )}>
        {/* Icon + label */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
          <Mic className="size-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground">Outbound call recording</span>
            <span className="text-2xs tabular-nums text-muted-foreground font-mono shrink-0">
              {fmtMmSs(elapsed)} / {fmtMmSs(totalSec)}
            </span>
          </div>
          {/* Seek bar */}
          <div
            ref={trackRef}
            role="slider"
            aria-label="Audio position"
            aria-valuemin={0}
            aria-valuemax={totalSec}
            aria-valuenow={elapsed}
            onClick={handleTrackClick}
            className="h-1.5 w-full cursor-pointer rounded-full bg-muted overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        {/* Play / Pause */}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="shrink-0 rounded-full"
          onClick={onTogglePlay}
          aria-label={playing ? "Pause audio" : "Play audio"}
        >
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>
    </div>
  )
}

"use client"

import {
  CircleCheck,
  Play,
  RotateCcw,
  ShieldAlert,
  Video,
  VideoOff,
  XCircle,
  Sparkles,
  Footprints,
} from "@apna/design-system"
import * as React from "react"
import type { Candidate } from "@/components/onlyrounds/candidate-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AttemptStatusBand } from "@/components/onlyrounds/attempt-status-band"
import { cn } from "@/lib/utils"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"
import { AudioPlayer, VideoPopup } from "@/components/onlyrounds/candidate-drawer/media-players"
import { CefrBlock, CriteriaGroupBlock } from "@/components/onlyrounds/candidate-drawer/criteria-blocks"
import { fmtMmSs, initials } from "@/components/onlyrounds/candidate-drawer/utils"

// ── Insights tab ──────────────────────────────────────────────────────────

function RetakeHistoryBlock({ history }: { history: NonNullable<Candidate["retakeHistory"]> }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <RotateCcw className="size-3.5 text-muted-foreground shrink-0" />
        Re-Take History
      </div>
      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
          {history.map((h, i) => (
            <li key={i} className="flex items-start justify-between gap-3">
              <span className="leading-relaxed">– {h.label}</span>
              <span className="shrink-0 font-medium font-mono text-2xs tabular-nums text-muted-foreground/80 mt-0.5">
                {h.at}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── InsightsTab ───────────────────────────────────────────────────────────

export function InsightsTab({ candidate }: { candidate: DrawerCandidate }) {
  const totalSec = candidate.callDuration ?? 5 * 60 + 47
  const mediaType = candidate.mediaType ?? "audio"
  const [elapsed, setElapsed] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)
  // For video mode: whether the floating video panel is open
  const [videoOpen, setVideoOpen] = React.useState(false)

  // Ref that VideoPopup registers its YouTube seek fn into
  const videoSeekRef = React.useRef<((sec: number) => void) | null>(null)

  // Reset when switching candidates.
  const [seenId, setSeenId] = React.useState(candidate.id)
  if (candidate.id !== seenId) {
    setSeenId(candidate.id)
    setElapsed(0)
    setPlaying(false)
    setVideoOpen(false)
  }

  // Advance time when playing.
  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e >= totalSec) {
          setPlaying(false)
          return totalSec
        }
        return e + 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing, totalSec])

  const seekTo = React.useCallback(
    (sec: number) => {
      const clamped = Math.min(Math.max(0, sec), totalSec)
      if (mediaType === "video") {
        // Open the popup and forward the seek to the YouTube iframe
        setVideoOpen(true)
        // Small delay so the iframe has time to mount before seeking
        setTimeout(() => videoSeekRef.current?.(clamped), 300)
      } else {
        setElapsed(clamped)
        setPlaying(true)
      }
    },
    [totalSec, mediaType],
  )

  const state = candidate.state

  // Incomplete: show status band + partial insights (criteria + CEFR)
  if (state && state.kind === "incomplete") {
    const hasPartialData =
      candidate.criteriaGroups.length > 0 || !!candidate.cefr
    return (
      <div className="flex flex-col gap-6">
        {/* Status band */}
        <AttemptStatusBand
          tone="warning"
          label="Interview Incomplete"
          reason="Candidate left early, Rescheduled for completion"
          attempted={state.attempted}
          total={state.total}
          helper="Candidate attempted the interview but didn't complete it. We've notified them to complete it — status will update once done."
          attempts={state.attempts}
          flush
        />

        {hasPartialData && (
          <>
            {/* Audio player for partial recording */}
            {(candidate.callDuration ?? 0) > 0 && mediaType === "audio" && (
              <AudioPlayer
                elapsed={elapsed}
                totalSec={totalSec}
                playing={playing}
                onTogglePlay={() => setPlaying((p) => !p)}
                onSeek={(s) => { setElapsed(s); setPlaying(true) }}
              />
            )}

            {/* Partial assessment banner */}
            <div className="rounded-lg border border-warning/40 bg-warning/5 px-4 py-3 flex items-start gap-3">
              <ShieldAlert className="size-4 text-warning shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Partial assessment — no conclusion drawn
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The interview ended early. The criteria and language scores
                  below reflect only what the AI captured before the call
                  disconnected. No overall fit verdict has been assigned.
                </p>
              </div>
            </div>

            {/* Partial criteria */}
            {candidate.criteriaGroups.length > 0 && (
              <section className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Partial screening criteria
                </h4>
                {candidate.criteriaGroups.map((g) => (
                  <CriteriaGroupBlock
                    key={g.id}
                    group={g}
                    onSeek={seekTo}
                    mediaType={mediaType}
                  />
                ))}
              </section>
            )}

            {/* Partial CEFR */}
            {candidate.cefr && (
              <section id="cefr" className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 border-b border-border pb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    English communication — partial assessment
                  </h4>
                  <span className="inline-flex items-center rounded-full bg-warning/15 px-2.5 py-0.5 text-2xs font-semibold text-warning">
                    Partial · {candidate.cefr.level}
                  </span>
                </div>
                <CefrBlock cefr={candidate.cefr} />
              </section>
            )}
          </>
        )}

        {candidate.retakeHistory && candidate.retakeHistory.length > 0 && (
          <RetakeHistoryBlock history={candidate.retakeHistory} />
        )}
      </div>
    )
  }

  // Pending / no-response / not-interested: status band only
  if (state && state.kind !== "completed") {
    return (
      <div className="flex flex-col gap-6">
        {state.kind === "pending" && (
          <AttemptStatusBand
            tone="warning"
            label="Interview Pending"
            reason="Call not connected, Rescheduled for completion"
            attempted={state.attempted}
            total={state.total}
            helper="We're trying to reach the candidate for this interview. We'll update the status once they respond."
            attempts={state.attempts}
            flush
          />
        )}
        {state.kind === "no-response" && (
          <AttemptStatusBand
            tone="muted"
            label="No Response"
            reason="Candidate did not respond after all attempts"
            attempted={state.attempted}
            total={state.total}
            attempts={state.attempts}
            flush
          />
        )}
        {state.kind === "not-interested" && (
          <AttemptStatusBand
            tone="muted"
            label="Not Interested"
            reason="Candidate declared not interested in this opportunity"
            flush
          />
        )}
        {candidate.retakeHistory && candidate.retakeHistory.length > 0 && (
          <RetakeHistoryBlock history={candidate.retakeHistory} />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Media player (sticky) ───────────────────────────────── */}
      {mediaType === "audio" ? (
        <AudioPlayer
          elapsed={elapsed}
          totalSec={totalSec}
          playing={playing}
          onTogglePlay={() => setPlaying((p) => !p)}
          onSeek={(s) => {
            setElapsed(s)
            setPlaying(true)
          }}
        />
      ) : (
        /* Video: thumbnail card + floating panel */
        <>
          <div className="bg-muted/30 p-3 rounded-lg flex items-center justify-between gap-3 border border-border">
            <div className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="relative w-20 h-12 rounded-md border border-border bg-accent/20 flex items-center justify-center overflow-hidden shrink-0">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {initials(candidate.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  {videoOpen ? (
                    <VideoOff className="size-3 text-white" />
                  ) : (
                    <Play className="size-3 text-white fill-white/80" />
                  )}
                </div>
                <div className="absolute bottom-0.5 right-0.5 bg-black/60 px-1 rounded-sm text-white font-mono text-2xs scale-90 origin-bottom-right">
                  {fmtMmSs(totalSec)}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-foreground">Video interview recording</h5>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any{" "}
                  <span className="inline-flex size-3 items-center justify-center rounded-full bg-success/10 border border-success/30">
                    <Play className="size-1.5 fill-success text-success ml-px" />
                  </span>{" "}
                  below to jump to that moment
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-card text-xs gap-1.5 h-8 font-medium text-foreground border-border hover:bg-muted shrink-0"
              onClick={() => {
                setVideoOpen((o) => !o)
                if (!videoOpen) setPlaying(true)
                else setPlaying(false)
              }}
            >
              {videoOpen ? (
                <>
                  <VideoOff className="size-3.5" />
                  Close video
                </>
              ) : (
                <>
                  <Video className="size-3.5" />
                  Watch video
                </>
              )}
            </Button>
          </div>

          {/* Video popup portal */}
          {videoOpen && (
            <VideoPopup
              candidateName={candidate.name}
              seekRef={videoSeekRef}
              onClose={() => setVideoOpen(false)}
            />
          )}
        </>
      )}

      {/* Insight chips */}
      <section className="flex flex-col gap-3">
        <div className="border border-border bg-muted/10 p-4 rounded-lg flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary shrink-0" />
            <h4 className="text-sm font-bold text-foreground">
              AI call insights for {candidate.name}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.insights.map((it, i) => {
              const hasAtSecond = typeof it.atSecond === "number"
              return (
                <span
                  key={i}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs shadow-card transition-interactive bg-card",
                    it.tone === "ok"
                      ? "border-success/40 text-success-foreground"
                      : "border-destructive/40 text-destructive"
                  )}
                >
                  {it.tone === "ok" ? (
                    <CircleCheck className="size-3 text-success shrink-0" />
                  ) : (
                    <XCircle className="size-3 text-destructive shrink-0" />
                  )}
                  <span className="text-foreground">{it.label}</span>
                  {hasAtSecond && (
                    <button
                      type="button"
                      onClick={() => seekTo(it.atSecond!)}
                      aria-label={`Jump to ${fmtMmSs(it.atSecond!)} in ${mediaType}`}
                      className="ml-1 inline-flex size-4 items-center justify-center rounded-full border border-border bg-muted/40 hover:bg-muted transition-interactive cursor-pointer"
                    >
                      <Play className="size-2 text-muted-foreground fill-muted-foreground ml-0.5" />
                    </button>
                  )}
                </span>
              )
            })}
          </div>
        </div>

        {candidate.cefrLevel && (
          <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2 text-xs">
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground">Directional CEFR Level:</span>
              <span className="inline-flex items-center rounded bg-info/10 px-1.5 py-0.5 font-bold text-info">
                {candidate.cefrLevel}
              </span>
            </span>
            <a href="#cefr" className="text-primary hover:underline font-semibold">
              See detailed analysis
            </a>
          </div>
        )}
      </section>

      {/* Recommendations */}
      {candidate.recommendations.length > 0 && (
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <Footprints className="size-4 text-info shrink-0" />
            Next step for you
          </div>
          <div className="rounded-lg border border-info/20 bg-info/5 p-4">
            <h5 className="text-sm font-bold text-foreground mb-3">
              Candidate is a strong fit. Proceed with next steps.
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              {candidate.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-info/70" />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Criteria analysis */}
      {candidate.criteriaGroups.length > 0 && (
        <section className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Screening criteria analysis
          </h4>
          {candidate.criteriaGroups.map((g) => (
            <CriteriaGroupBlock key={g.id} group={g} onSeek={seekTo} mediaType={mediaType} />
          ))}
        </section>
      )}

      {/* CEFR */}
      {candidate.cefr && (
        <section id="cefr" className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 border-b border-border pb-1">
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              English communication detailed analysis
            </h4>
            <span className="inline-flex items-center rounded-full bg-success px-2.5 py-0.5 text-2xs font-semibold text-success-foreground">
              Overall: {candidate.cefr.overall.toFixed(3)}/10
            </span>
          </div>
          <CefrBlock cefr={candidate.cefr} />
        </section>
      )}
      {candidate.retakeHistory && candidate.retakeHistory.length > 0 && (
        <RetakeHistoryBlock history={candidate.retakeHistory} />
      )}
    </div>
  )
}

"use client"

/**
 * AiCallingExplainer — the "How AI calling works" pop-up behind the AI
 * calling add-on's "How it works" button (Figma 3025:52757).
 *
 *   Header  AI sparkle · title, then one line on what the agent does
 *   Proof   two tiles: "30%" higher call pickup · ready to interview
 *   Demo    a violet → mint card with a demo call player, Hindi / English
 *   CTA     the add-on's own action ("Add AI calling · ₹1,600"), full width
 *
 * A centred dialog from md, a bottom sheet below it (the OfferDialog
 * pattern), same content in both. The close control is the system
 * CloseBubble both primitives render. Back closes it (useBackToClose), the
 * order summary underneath stays open.
 *
 * Composition only: Dialog / Sheet, Avatar, ChipTabs, Slider and Button from
 * the design system; the demo card's wash is the `bg-gradient-ai-demo` token.
 */

import * as React from "react"
import Image from "next/image"
import {
  Avatar,
  AvatarImage,
  Button,
  ChipTabs,
  CircleCheckBig,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Pause,
  Play,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  Slider,
} from "@apna/design-system"
import { AI_CALLING_ADDON } from "@/content/job-plans"
import { useBackToClose } from "@/hooks/use-back-to-close"
import { useIsMobile } from "@/hooks/use-mobile"

const COPY = AI_CALLING_ADDON.explainer
type CallId = (typeof COPY.demo.calls)[number]["value"]

const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`

/** The multi-colour AI sparkle (Figma "icons8-ai"); decorative. */
export function AiSparkle({ className }: { className?: string }) {
  return <Image src="/illustrations/ai-sparkle.svg" alt="" width={24} height={24} className={className} />
}

export function AiCallingExplainer({
  open,
  onOpenChange,
  ctaLabel,
  onCta,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** e.g. "Add AI calling · ₹1,600". */
  ctaLabel: string
  onCta: () => void
}) {
  const isMobile = useIsMobile()
  useBackToClose(open, () => onOpenChange(false))
  const Title = isMobile ? SheetTitle : DialogTitle
  const Description = isMobile ? SheetDescription : DialogDescription

  const body = (
    <>
      <div className="flex flex-col gap-2 px-4 pt-6 pb-5">
        <div className="flex items-center gap-2">
          <AiSparkle className="size-6 shrink-0" />
          <Title className="text-xl font-semibold text-foreground">{COPY.title}</Title>
        </div>
        <Description className="text-sm text-muted-foreground">{COPY.description}</Description>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4 pb-5">
        {COPY.stats.map((stat) => (
          <div key={stat.title} className="flex flex-col gap-1.5 rounded-xl bg-muted p-3">
            {"value" in stat ? (
              <span className="text-2xl leading-7 font-bold text-checkout-primary">{stat.value}</span>
            ) : (
              <CircleCheckBig className="size-7 text-checkout-primary" aria-hidden />
            )}
            <span className="text-sm font-semibold text-foreground">{stat.title}</span>
            <span className="text-xs text-muted-foreground">{stat.body}</span>
          </div>
        ))}
      </div>

      <div className="px-4">
        <DemoCall />
      </div>

      <div className="p-4">
        <Button
          type="button"
          variant="checkout"
          size="xl"
          className="w-full"
          onClick={() => {
            onCta()
            onOpenChange(false)
          }}
        >
          {ctaLabel}
        </Button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {/* No overflow-hidden: it would clip the close bubble. */}
        <SheetContent side="bottom" className="gap-0 rounded-t-2xl border-t-0 p-0 pb-safe">
          {body}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-md">{body}</DialogContent>
    </Dialog>
  )
}

/** The demo call: language chips and a player. Without a recording `src`
 *  the timeline runs silently, so the control behaves the same either way.
 *  Lives inside the pop-up's content, so closing it stops and resets. */
function DemoCall() {
  const [lang, setLang] = React.useState<CallId>(COPY.demo.calls[0].value)
  const call = COPY.demo.calls.find((c) => c.value === lang) ?? COPY.demo.calls[0]
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
    <div className="flex flex-col gap-2 rounded-xl bg-gradient-ai-demo p-3">
      {/* Title and chips share a row where there's room; on a phone the
          chips take their own line rather than squeezing the title. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap text-foreground">{COPY.demo.title}</span>
          <AiSparkle className="size-4.5 shrink-0" />
        </div>
        <ChipTabs
          aria-label="Demo call language"
          variant="choice"
          size="sm"
          className="sm:ml-auto"
          items={COPY.demo.calls.map((c) => ({ value: c.value, label: c.label }))}
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

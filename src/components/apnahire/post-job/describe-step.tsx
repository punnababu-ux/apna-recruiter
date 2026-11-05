"use client"

/**
 * The wizard's "Describe the job" screen: one prompt box, and every later
 * screen arrives answered from it. Voice is a first-class way in (a labelled
 * "Speak" pill with a live waveform, not a bare icon). Example chips fill the
 * box and focus it, so they read as a starting point to edit, not a menu.
 * The CTA ("Draft my job") and "Fill it in myself" live in the wizard
 * footer; Enter in the box submits too.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { AudioLines, Badge, Button, Check, Plus, PromptInput, WizardQuestion } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { promptSignals, type PromptSignals } from "@/lib/apnahire/prompt-parse"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { DraftingState } from "@/components/apnahire/post-job/drafting-state"
import type { JobPostDraft } from "@/types/apnahire-job"

interface DescribeStepProps {
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: () => void
  drafting: boolean
  draftResult: Partial<JobPostDraft> | null
  onDrafted: () => void
}

/** Staggered entrance — each block rises in a beat after the previous. */
const rise = (i: number) => ({
  className: "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500",
  style: { animationDelay: `${i * 80}ms` },
})

function VoiceWave() {
  return (
    <span aria-hidden className="flex h-4 items-center gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-full w-0.5 rounded-full bg-current animate-voice-bar"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  )
}

const SIGNALS: { key: keyof PromptSignals; label: string }[] = [
  { key: "role", label: "Role" },
  { key: "area", label: "Area" },
  { key: "salary", label: "Salary" },
  { key: "who", label: "Who can apply" },
]

/** Live chips that tick as the prompt covers each thing a good draft needs —
 *  teaches what to include before submitting, without blocking it. */
function PromptCoverage({ prompt }: { prompt: string }) {
  const signals = promptSignals(prompt)
  return (
    <div className="relative z-20 flex flex-wrap items-center gap-2" aria-live="polite">
      {SIGNALS.map((s) => {
        const on = signals[s.key]
        return (
          <Badge
            key={s.key}
            variant={on ? "success" : "outline"}
            className={on ? "gap-1 animate-in zoom-in-95 duration-200" : "gap-1 border-dashed text-muted-foreground"}
          >
            {on ? <Check aria-hidden /> : <Plus aria-hidden />}
            {s.label}
          </Badge>
        )
      })}
    </div>
  )
}

export function DescribeStep({
  prompt,
  onPromptChange,
  onSubmit,
  drafting,
  draftResult,
  onDrafted,
}: DescribeStepProps) {
  const speech = useSpeechRecognition()
  const baseRef = React.useRef("")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (speech.listening || speech.transcript) {
      onPromptChange([baseRef.current, speech.transcript].filter(Boolean).join(" "))
    }
    // onPromptChange is a state setter from the parent; only the transcript drives this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.transcript])

  // Leaving the screen (Draft my job / Fill it in myself) stops the mic.
  const { stop } = speech
  React.useEffect(() => stop, [stop])

  const toggleMic = () => {
    if (speech.listening) return speech.stop()
    baseRef.current = prompt.trim()
    speech.start()
  }

  // Talk, after Gemini: a tinted round-ended control with sound bars; while
  // listening it turns into a pill of moving light (ai-voice).
  const voiceControl = speech.supported ? (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      className={cn(
        "rounded-full text-foreground",
        speech.listening ? "ai-voice px-4" : "bg-info/10 text-info hover:bg-info/15",
      )}
      aria-pressed={speech.listening}
      onClick={toggleMic}
    >
      {speech.listening ? <VoiceWave /> : <AudioLines className="size-4" aria-hidden />}
      {speech.listening ? "Listening · Stop" : "Speak"}
    </Button>
  ) : (
    <span />
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Page-level, so no transformed parent clips it; main sits above it. */}
      {drafting && typeof document !== "undefined" && createPortal(<span aria-hidden className="ai-backdrop" />, document.body)}
      <WizardQuestion
        {...rise(0)}
        title="Describe the job"
        description="Type or speak. We’ll fill in the rest."
      />

      <div {...rise(1)} className={`${rise(1).className} flex w-full flex-col gap-2`}>
        {/* While drafting, the prompt is read-only and wears the loading ring;
            the steps appear in a gray card under it instead of a new screen. */}
        <div className="relative z-10 rounded-2xl">
          {!drafting && <span aria-hidden className="ai-idle" />}
          <PromptInput
            id="job-prompt"
            aria-label="About the job"
            ref={inputRef}
            size="lg"
            hideSubmit
            value={prompt}
            onValueChange={onPromptChange}
            onSubmit={() => {
              speech.stop()
              onSubmit()
            }}
            active={speech.listening}
            placeholder={
              speech.listening
                ? "Listening…"
                : "e.g. Telecaller in Koramangala, ₹15–20k, graduate, Hindi, 1 year experience"
            }
            disabled={drafting}
            footerStart={drafting ? <span /> : voiceControl}
          />
          {drafting && <span aria-hidden className="loading-ring" />}
        </div>
        {drafting ? <DraftingState result={draftResult} onComplete={onDrafted} /> : <PromptCoverage prompt={prompt} />}
        {speech.error && <p className="text-xs text-destructive">{speech.error}</p>}
      </div>

    </div>
  )
}

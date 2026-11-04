"use client"

/**
 * The wizard's "Describe the job" screen: one prompt box, and every later
 * screen arrives answered from it. Voice is a first-class way in (a labelled
 * "Speak" pill; while listening the box glows and the chips say what to say
 * next). Example chips fill the
 * box and focus it, so they read as a starting point to edit, not a menu.
 * The CTA ("Draft my job") and "Fill it in myself" live in the wizard
 * footer; Enter in the box submits too.
 */

import * as React from "react"
import { Badge, Button, Check, Mic, Plus, PromptInput, WizardQuestion } from "@apna/design-system"
import { promptSignals, type PromptSignals } from "@/lib/apnahire/prompt-parse"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { DraftingState } from "@/components/apnahire/post-job/drafting-state"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

const EXAMPLES = [
  {
    label: "Telecaller · Bengaluru",
    text: "Telecaller for my real estate office in Koramangala, Bengaluru. ₹15–20k, graduate, Hindi, 1 year calling experience",
  },
  {
    label: "Delivery · Mumbai",
    text: "Delivery executive for our e-commerce hub in Andheri, Mumbai. ₹18k + incentive, 10th pass, freshers welcome",
  },
  {
    label: "Back office · Pune",
    text: "Back office executive at our insurance office in Pune. ₹14–16k, 12th pass, basic English",
  },
]

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
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="h-full w-0.5 rounded-full bg-current animate-voice-bar"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  )
}

const SIGNALS: { key: keyof PromptSignals; label: string; say: string }[] = [
  { key: "role", label: "Role", say: "the role" },
  { key: "area", label: "Area", say: "the area" },
  { key: "salary", label: "Salary", say: "the salary" },
  { key: "who", label: "Who can apply", say: "who can apply" },
]

/** Live chips that tick as the prompt covers each thing a good draft needs —
 *  teaches what to include before submitting, without blocking it. While
 *  listening, the next one to say is lit and named, so a speaker knows what
 *  to say next without stopping to read. */
function PromptCoverage({ prompt, listening }: { prompt: string; listening: boolean }) {
  const signals = promptSignals(prompt)
  const missing = SIGNALS.filter((s) => !signals[s.key])
  const next = listening ? missing[0] : undefined
  const done = prompt.trim() && missing.length === 0
  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        {SIGNALS.map((s) => {
          const on = signals[s.key]
          return (
            <Badge
              key={s.key}
              variant={on ? "success" : "outline"}
              className={cn(
                "gap-1",
                on && "animate-in zoom-in-95 duration-200",
                !on && s !== next && "border-dashed text-muted-foreground",
                s === next && "animate-pulse border-primary text-primary",
              )}
            >
              {on ? <Check aria-hidden /> : <Plus aria-hidden />}
              {s.label}
            </Badge>
          )
        })}
      </div>
      {done ? (
        <p className="flex items-center gap-1 text-xs font-medium text-foreground">
          <Check className="size-4 text-primary" aria-hidden />
          All set, ready to draft
        </p>
      ) : next ? (
        <p className="text-xs font-medium text-foreground">Now say {next.say}</p>
      ) : (
        prompt.trim() && (
          <p className="text-xs text-muted-foreground">
            Add {missing.map((m) => m.label.toLowerCase()).join(", ")}, or we ask later.
          </p>
        )
      )}
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

  const applyExample = (text: string) => {
    onPromptChange(text)
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(text.length, text.length)
    })
  }

  const voiceControl = speech.supported ? (
    <Button
      type="button"
      variant="outline"
      className={cn("rounded-full", speech.listening && "border-primary text-primary")}
      aria-pressed={speech.listening}
      onClick={toggleMic}
    >
      {speech.listening ? <VoiceWave /> : <Mic className="size-4" aria-hidden />}
      {speech.listening ? "Listening · Stop" : "Speak"}
    </Button>
  ) : (
    <span />
  )

  return (
    <div className="flex flex-col gap-6">
      <WizardQuestion
        {...rise(0)}
        title="Describe the job"
        description="Type or speak. We fill in the rest."
      />

      <div {...rise(1)} className={`${rise(1).className} flex w-full flex-col gap-2`}>
        <label htmlFor="job-prompt" className="text-sm font-medium text-foreground">
          About the job
        </label>
        {/* While drafting, the prompt is read-only and wears the loading ring;
            the steps appear in a gray card under it instead of a new screen.
            While listening, it glows. */}
        <div className="relative z-10 rounded-2xl">
          {speech.listening && <span aria-hidden className="voice-glow" />}
          <PromptInput
            id="job-prompt"
            ref={inputRef}
            size="lg"
            hideSubmit
            // Phones: the keyboard hides the footer's "Draft my job", so the
            // box shows its own arrow while typing.
            submitWhileTyping={!speech.listening}
            submitLabel="Draft my job"
            enterKeyHint="go"
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
        {drafting ? <DraftingState result={draftResult} onComplete={onDrafted} /> : <PromptCoverage prompt={prompt} listening={speech.listening} />}
        {speech.error && <p className="text-xs text-destructive">{speech.error}</p>}
      </div>

      {!drafting && (
        <div {...rise(2)} className={`${rise(2).className} flex flex-wrap items-center gap-2`}>
          <span className="text-xs font-medium text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <Button
              key={ex.label}
              type="button"
              size="sm"
              variant="outline"
              className="rounded-full"
              title={ex.text}
              onClick={() => applyExample(ex.text)}
            >
              {ex.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

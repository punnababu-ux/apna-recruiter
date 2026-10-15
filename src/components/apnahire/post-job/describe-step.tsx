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
import { Badge, Button, Check, Mic, Plus, PromptInput, WizardQuestion } from "@apna/design-system"
import { promptSignals, type PromptSignals } from "@/lib/apnahire/prompt-parse"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"

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
  const missing = SIGNALS.filter((s) => !signals[s.key])
  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
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
      {prompt.trim() && missing.length > 0 && (
        <span className="text-xs text-muted-foreground">
          Add {missing.map((m) => m.label.toLowerCase()).join(", ")} for a fuller draft — or we&apos;ll ask after.
        </span>
      )}
    </div>
  )
}

export function DescribeStep({ prompt, onPromptChange, onSubmit }: DescribeStepProps) {
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
      size="sm"
      variant={speech.listening ? "default" : "outline"}
      className="rounded-full"
      aria-pressed={speech.listening}
      onClick={toggleMic}
    >
      {speech.listening ? <VoiceWave /> : <Mic className="size-4" aria-hidden />}
      {speech.listening ? "Stop" : "Speak"}
    </Button>
  ) : (
    <span />
  )

  return (
    <div className="flex flex-col gap-6">
      <WizardQuestion
        {...rise(0)}
        title="Describe the job"
        description="Type or speak. We’ll fill in the details for you to check."
      />

      <div {...rise(1)} className={`${rise(1).className} flex w-full flex-col gap-2`}>
        <label htmlFor="job-prompt" className="text-sm font-medium text-foreground">
          About the job
        </label>
        <PromptInput
          id="job-prompt"
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
          footerStart={voiceControl}
        />
        <PromptCoverage prompt={prompt} />
        {speech.error && <p className="text-xs text-destructive">{speech.error}</p>}
      </div>

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
    </div>
  )
}

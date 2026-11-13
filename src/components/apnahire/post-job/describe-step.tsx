"use client"

/**
 * The wizard's "Describe the job" screen: one prompt box, and every later
 * screen arrives answered from it. Voice is a first-class way in (a mic beside the send
 * arrow, on the right; while listening the box glows and the chips say what to say
 * next). Example chips fill the
 * box and focus it, so they read as a starting point to edit, not a menu.
 * The CTA ("Draft my job") and "Fill it in myself" live in the wizard
 * footer; Enter in the box submits too.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { AudioLines, Badge, Button, Check, Circle, PromptInput, WizardQuestion } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { promptSignals, type PromptSignals } from "@/lib/apnahire/prompt-parse"
import { DEMO_ROLES, rolePromptChips, type PromptChip } from "@/lib/apnahire/role-profiles"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { VoiceDots, VoiceLine } from "./voice-dots"
import { DraftingState } from "@/components/apnahire/post-job/drafting-state"
import type { JobPostDraft } from "@/types/apnahire-job"

interface DescribeStepProps {
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: () => void
  drafting: boolean
  draftResult: Partial<JobPostDraft> | null
  onDrafted: () => void
  /** PREVIEW (?flow=essential): the chips follow the role, and demo roles fill the box. */
  essential?: boolean
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
function PromptCoverage({
  prompt,
  listening,
  essential,
}: {
  prompt: string
  listening: boolean
  essential?: boolean
}) {
  const signals = promptSignals(prompt)
  // Essential: what this role needs (role-profiles.ts), not one fixed list.
  const chips: PromptChip[] = essential
    ? rolePromptChips(prompt)
    : SIGNALS.map((s) => ({ ...s, on: signals[s.key] }))
  const missing = chips.filter((s) => !s.on)
  const next = listening ? missing[0] : undefined
  const done = prompt.trim() && missing.length === 0
  // Before any input the placeholder's example already says what to include.
  if (!prompt.trim() && !listening) return null
  return (
    <div className="relative z-20 flex flex-col gap-2 animate-in fade-in duration-200" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((s) => {
          const on = s.on
          return (
            <Badge
              key={s.key}
              variant={on ? "success" : "outline"}
              className={cn(
                "gap-1",
                on && "animate-in zoom-in-95 duration-200",
                !on && s !== next && "bg-card text-muted-foreground",
                s === next && "animate-pulse border-primary text-primary",
              )}
            >
              {/* Status only: a + or dashed outline read as "tap to add" in user testing. */}
              {on ? <Check aria-hidden /> : <Circle aria-hidden />}
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
            Add {missing.map((m) => (m.label === "English" ? m.label : m.label.toLowerCase())).join(", ")}, or we ask later.
          </p>
        )
      )}
    </div>
  )
}

const noSubscribe = () => () => {}
const meshFlag = () => new URLSearchParams(window.location.search).get("voice") === "mesh"

export function DescribeStep({
  prompt,
  onPromptChange,
  onSubmit,
  drafting,
  draftResult,
  onDrafted,
  essential,
}: DescribeStepProps) {
  const speech = useSpeechRecognition()
  // PREVIEW (?voice=mesh): an "OK Google" halftone flows around the box while listening.
  const mesh = React.useSyncExternalStore(noSubscribe, meshFlag, () => false)
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

  // Mic beside the send arrow, both under the right thumb (ChatGPT, Claude).
  // The arrow stays disabled until there is text.
  const micIcon = speech.supported && (
    <Button
      type="button"
      size="icon"
      variant={speech.listening && !mesh ? "ghost" : "outline"}
      className={cn("rounded-full", speech.listening && !mesh && "ai-voice")}
      aria-pressed={speech.listening}
      aria-label={speech.listening ? "Stop speaking" : "Speak"}
      onClick={toggleMic}
    >
      {/* PREVIEW (?voice=mesh): a neutral button with a line that moves with the voice. */}
      {speech.listening ? mesh ? <VoiceLine pulse={speech.transcript} /> : <VoiceWave /> : <AudioLines aria-hidden />}
    </Button>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Portaled to the page root (data-ai-backdrop-host, an isolated stacking
          context), so no transformed parent clips it and it sits BEHIND the
          page's content, never over the field (it was over it on phones). */}
      {drafting &&
        typeof document !== "undefined" &&
        createPortal(
          <span aria-hidden className="ai-backdrop" />,
          document.querySelector("[data-ai-backdrop-host]") ?? document.body,
        )}
      <WizardQuestion
        {...rise(0)}
        title="Describe the job"
        description="Type or speak. We’ll fill in the rest."
      />

      <div {...rise(1)} className={`${rise(1).className} flex w-full flex-col gap-4`}>
        {/* While drafting, the prompt is read-only and wears the loading ring;
            the steps appear in a gray card under it instead of a new screen.
            While listening, it glows. */}
        <div className="relative z-10 rounded-2xl">
          {speech.listening ? <span aria-hidden className="voice-glow" /> : !drafting && <span aria-hidden className="ai-idle" />}
          {mesh && <VoiceDots active={speech.listening} />}
          <PromptInput
            id="job-prompt"
            aria-label="About the job"
            ref={inputRef}
            size="lg"
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
            actions={drafting ? undefined : micIcon}
          />
          {drafting && <span aria-hidden className="loading-ring" />}
        </div>
        {drafting ? <DraftingState result={draftResult} onComplete={onDrafted} /> : <PromptCoverage prompt={prompt} listening={speech.listening} essential={essential} />}
        {speech.error && <p className="text-xs text-destructive">{speech.error}</p>}
      </div>

      {/* Demo: each role asks different questions; one tap fills the box. */}
      {essential && !drafting && !prompt.trim() && !speech.listening && (
        <div {...rise(2)} className={`${rise(2).className} relative z-20 flex flex-col gap-2`}>
          <p className="text-xs font-medium text-muted-foreground">Try a role</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ROLES.map((role) => (
              <Button
                key={role.label}
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  onPromptChange(role.prompt)
                  inputRef.current?.focus()
                }}
              >
                {role.label}
              </Button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

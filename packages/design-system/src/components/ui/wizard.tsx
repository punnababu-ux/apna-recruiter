"use client"

/**
 * Wizard — the frame for a one-question-per-screen flow (job posting): each
 * screen asks one thing in a big heading, the answer is something you tap
 * (OptionCard, NumberStepper, chips), and a fixed footer moves you on.
 *
 *   WizardQuestion     eyebrow / tags · heading · one line of help
 *   StepIntro          the chapter break between stages: art, "Step 2",
 *                      heading, what this stage covers
 *   SegmentedProgress  one segment per stage, each filling as you go
 *   WizardFooter       progress on its top edge, then Back + the step CTA
 *
 * RULE — the footer CTA is `emphasis` (dark gray) on every step: "Next",
 * "Get started", "Draft my job". Green (`default` / `checkout`) is kept for
 * the one action that commits — posting / paying — so the moment that
 * matters is the only green one in the flow. This is the wizard exception
 * to Button's one-primary rule: here `emphasis` may be the screen's only
 * CTA. Don't pass `nextVariant="default"` for an ordinary step.
 *
 * Two "backs", two jobs: the header's BackButton (outlined circle) leaves
 * the flow; the footer's "Back" (outline button, chevron + label) goes to
 * the previous question. They're different actions, so they look different
 * — but each is always drawn the same way. Don't restyle either locally.
 *
 * Errors: Next stays enabled. Tapping it on an unanswered screen shows the
 * reason above the buttons (role="alert") and nudges the button
 * (`errorKey` bumps replay the nudge) — a disabled button can't explain
 * itself.
 *
 * API
 *   <WizardQuestion eyebrow={<Badge>Must-have</Badge>} title="What's the minimum education?" description="…" />
 *   <StepIntro art={<JobCardArt />} step="Step 2" title="Decide who can apply" description="…" />
 *   <WizardFooter
 *     progress={[1, 0.4, 0]}
 *     onBack={back}
 *     nextLabel="Next"
 *     onNext={next}
 *     error={error}
 *     errorKey={attempts}
 *   />
 */

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ChevronLeft, CircleAlert } from "@/icons/icons"
import { cn } from "@/lib/utils"
import { haptic } from "@/components/ui/ink-provider"

/* ── WizardQuestion ─────────────────────────────────────────────────── */

/** Inside it, a WizardQuestion's string title types itself in, with a light
 *  haptic tick per word (e.g. a flow filled in by hand, where each screen is
 *  a fresh question). Off by default. */
const WizardTypingContext = React.createContext(false)

function WizardTypingProvider({ value, children }: { value: boolean; children: React.ReactNode }) {
  return <WizardTypingContext.Provider value={value}>{children}</WizardTypingContext.Provider>
}

const TYPE_MS = 28

/** The title typed out a character at a time. The full text holds the space
 *  from the start (invisible), so nothing below moves while it types; screen
 *  readers get the whole title at once. Reduced motion: shown whole. */
function TypedTitle({ text }: { text: string }) {
  const [shown, setShown] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(text.length)
    setShown(0)
    let i = 0
    const t = window.setInterval(() => {
      i += 1
      setShown(i)
      if (text[i - 1] === " " || i === text.length) haptic(6)
      if (i >= text.length) window.clearInterval(t)
    }, TYPE_MS)
    return () => window.clearInterval(t)
  }, [text])
  return (
    <span className="grid">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {text.slice(0, shown)}
      </span>
    </span>
  )
}

interface WizardQuestionProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Small line above the heading: a tag, "Step 1", a status. */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

function WizardQuestion({ eyebrow, title, description, className, ...props }: WizardQuestionProps) {
  const typing = React.useContext(WizardTypingContext)
  return (
    <div data-slot="wizard-question" className={cn("flex flex-col gap-2", className)} {...props}>
      {eyebrow && <div className="flex flex-wrap items-center gap-2">{eyebrow}</div>}
      {/* Calm by default: a 20px question over 14px help. The answers below
          are the focus, not the heading. */}
      <h1 className="text-h4 text-balance text-foreground">
        {typing && typeof title === "string" ? <TypedTitle text={title} /> : title}
      </h1>
      {description && <p className="text-body-sm text-pretty text-muted-foreground">{description}</p>}
    </div>
  )
}

/* ── StepIntro ──────────────────────────────────────────────────────── */

interface StepIntroProps extends Omit<React.ComponentProps<"div">, "title"> {
  art?: React.ReactNode
  /** "Step 1" */
  step: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
}

function StepIntro({ art, step, title, description, children, className, ...props }: StepIntroProps) {
  return (
    <div data-slot="step-intro" className={cn("flex flex-col gap-8", className)} {...props}>
      {art && <div className="flex justify-center">{art}</div>}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground">{step}</span>
        <h1 className="text-h3 text-balance text-foreground">{title}</h1>
        <p className="text-body-sm text-pretty text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}

/* ── SegmentedProgress ──────────────────────────────────────────────── */

interface SegmentedProgressProps extends React.ComponentProps<"div"> {
  /** One entry per stage, each 0–1. */
  segments: number[]
  label?: string
}

function SegmentedProgress({ segments, label = "Progress", className, ...props }: SegmentedProgressProps) {
  const total = segments.reduce((a, b) => a + Math.min(1, Math.max(0, b)), 0)
  return (
    <div
      data-slot="segmented-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((total / Math.max(1, segments.length)) * 100)}
      className={cn("grid gap-1", className)}
      style={{
        gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {segments.map((v, i) => (
        <span key={i} className="h-1 overflow-hidden bg-muted">
          <span
            className="block h-full origin-left bg-foreground transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleX(${Math.min(1, Math.max(0, v))})` }}
          />
        </span>
      ))}
    </div>
  )
}

/* ── WizardFooter ───────────────────────────────────────────────────── */

interface WizardFooterProps extends React.ComponentProps<"div"> {
  progress?: number[]
  onBack?: () => void
  backLabel?: React.ReactNode
  /** Replaces Back on the left, e.g. "Fill it in myself" on the first
   *  screen. Use an `outline` Button, like Back: the left slot always has a
   *  visible edge, so it lines up with the content column like Next does. */
  secondary?: React.ReactNode
  /** Left of the bar, e.g. "Step 1 of 3 / Job details" opening a step menu.
   *  With it, Back turns into an icon button beside Next, so the two actions
   *  sit together under the thumb. */
  status?: React.ReactNode
  nextLabel: React.ReactNode
  onNext: () => void
  /** `emphasis` for every step; `default` only for the committing action. */
  nextVariant?: "emphasis" | "default"
  loading?: boolean
  error?: string | null
  /** Bump on each failed Next to replay the nudge. */
  errorKey?: number
  /** The width box — give it the page's content width (and grid, if the
   *  page has a side column) so Back and Next sit on the content column's
   *  outer edges. */
  innerClassName?: string
  /** The cell holding the error and buttons, e.g. the first grid column. */
  contentClassName?: string
  /** E.g. "sm:hidden" when a header stepper already shows progress on
   *  wider screens — one progress indicator per screen. */
  progressClassName?: string
}

function WizardFooter({
  progress,
  onBack,
  backLabel = "Back",
  secondary,
  status,
  nextLabel,
  onNext,
  nextVariant = "emphasis",
  loading = false,
  error,
  errorKey = 0,
  innerClassName,
  contentClassName,
  progressClassName,
  className,
  ...props
}: WizardFooterProps) {
  return (
    <div
      data-slot="wizard-footer"
      className={cn("sticky bottom-0 z-sticky border-t border-border bg-background pb-safe", className)}
      {...props}
    >
      {progress && <SegmentedProgress segments={progress} className={progressClassName} />}
      {/* Padding outside the width box, as on the page above, so the box is
          exactly as wide as the page's content area. */}
      <div className="px-4 py-3 sm:px-6">
        <div className={cn("mx-auto w-full", innerClassName)}>
          <div data-slot="wizard-footer-content" className={cn("flex flex-col gap-3", contentClassName)}>
            {error && (
              <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive">
                <CircleAlert className="size-4 shrink-0" aria-hidden />
                {error}
              </p>
            )}
            <div className="flex items-center justify-between gap-3">
              {secondary ??
                status ??
                (onBack ? (
                  // A plain outline button, same height as the CTA — the
                  // system's secondary action, not a styled one-off.
                  <Button type="button" variant="outline" size="lg" leadingIcon={<ChevronLeft />} onClick={onBack}>
                    {backLabel}
                  </Button>
                ) : (
                  <span />
                ))}
              <div className="flex shrink-0 items-center gap-2">
              {status && !secondary && onBack && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  className="size-11 rounded-full"
                  aria-label={typeof backLabel === "string" ? backLabel : "Back"}
                  onClick={onBack}
                >
                  <ChevronLeft />
                </Button>
              )}
              <Button
                // Re-keyed on each failed attempt so the nudge replays.
                key={errorKey}
                type="button"
                variant={nextVariant}
                size="lg"
                loading={loading}
                className={cn("min-w-32", error && errorKey > 0 && "animate-nudge")}
                onClick={onNext}
              >
                {nextLabel}
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { WizardQuestion, WizardTypingProvider, StepIntro, SegmentedProgress, WizardFooter }
export type { WizardQuestionProps, StepIntroProps, SegmentedProgressProps, WizardFooterProps }

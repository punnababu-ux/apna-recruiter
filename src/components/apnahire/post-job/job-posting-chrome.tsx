"use client"

/**
 * JobPostingChrome — sticky header for every step of "Create new job":
 * back + title row (Save & exit on the right) over a horizontal stepper.
 * Shared by the posting wizard and the plan step so the four steps read as
 * one flow.
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  BackButton,
  Button,
  ChevronDown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Save,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Stepper,
  type Step,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { HelpMenu } from "@/components/apnahire/post-job/help-menu"

/** The wizard's three stages, then the plan page. */
export type JobPostingStep = "job" | "candidates" | "setup" | "plan"

const ALL_STEPS: { id: JobPostingStep; label: string }[] = [
  { id: "job", label: "Job details" },
  { id: "candidates", label: "Who can apply" },
  { id: "setup", label: "Hiring setup" },
  { id: "plan", label: "Select plan" },
]

/** PREVIEW (?flow=essential): the third step is only the review. */
export type StepLabels = Partial<Record<JobPostingStep, string>>
export const ESSENTIAL_STEP_LABELS: StepLabels = { setup: "Review" }
const withLabels = (labels?: StepLabels) =>
  labels ? ALL_STEPS.map((s) => ({ ...s, label: labels[s.id] ?? s.label })) : ALL_STEPS

interface JobPostingChromeProps {
  current: JobPostingStep
  onStepClick?: (step: JobPostingStep) => void
  /** Extra header actions left of help and Save & exit, set off by a rule. */
  actions?: React.ReactNode
  /** Persist before leaving; Save & exit always returns to the jobs list. */
  onSaveExit?: () => void
  /** Called instead of leaving (back or Save & exit) so the page can step
   *  in first, e.g. the express-checkout exit nudge. Call `proceed` to
   *  carry on leaving. Without it, both leave straight away. */
  onExitAttempt?: (proceed: () => void) => void
  /** E.g. "max-sm:hidden" when the page shows progress elsewhere on phones
   *  (the wizard footer's bar) — one progress indicator per screen. */
  stepperClassName?: string
  /** A strip at the header's bottom, pinned with it (ExtraOffBar). */
  below?: React.ReactNode
  labels?: StepLabels
}

export function JobPostingChrome({
  current,
  onStepClick,
  actions,
  onSaveExit,
  onExitAttempt,
  stepperClassName,
  below,
  labels,
}: JobPostingChromeProps) {
  const router = useRouter()
  const STEPS = withLabels(labels)
  const currentIdx = STEPS.findIndex((s) => s.id === current)
  const steps: Step[] = STEPS.map((s, i) => ({
    id: s.id,
    label: s.label,
    status: i < currentIdx ? "completed" : i === currentIdx ? "current" : "pending",
  }))

  const leave = (proceed: () => void) => (onExitAttempt ? onExitAttempt(proceed) : proceed())
  const title = current === "plan" ? "Select a job type" : "Create new job"

  return (
    <div className="sticky top-0 z-sticky border-b border-border bg-card">
      {/* A 64px row, as self-checkout's top bar (CheckoutTopBar h-16), so
          both checkouts' bars are the same height (user call, 2026-10-30). */}
      <div
        className={cn(
          "px-4 sm:px-6",
          current !== "plan" && "border-b border-border",
          stepperClassName && "max-sm:border-b-0",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 sm:gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <BackButton onClick={() => leave(() => router.push("/apnahire/jobs"))} aria-label="Back to jobs" />
            {/* The plan step is checkout: pick a job type, then publish (user call, 2026-10-30). */}
            {/* text-h5: the app's page-title preset, as self-checkout's top bar
                ("Select plans"), so both checkouts' titles match (user call,
                2026-10-30). */}
            <span className="truncate text-h5 text-foreground">{title}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Status (the balance), a rule, then the actions: help, then leave. */}
            {actions && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {actions}
                <Separator orientation="vertical" className="mx-0.5 h-5 data-vertical:self-center" />
              </div>
            )}
            <HelpMenu />
            {/* Not on the plan step: the draft is already saved by then, so
                back leaves without losing anything (user call, 2026-10-30). */}
            {current !== "plan" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  leave(() => {
                    onSaveExit?.()
                    toast.success("Draft saved")
                    router.push("/apnahire/jobs")
                  })
                }
              >
                <Save className="size-4" aria-hidden />
                <span className="hidden sm:inline">Save &amp; exit</span>
                <span className="sm:hidden">Save</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* No stepper on the plan step: it's checkout now, and live's ticks
          there can't be clicked either (user call, 2026-10-29). */}
      {current !== "plan" && (
        <div className={cn("px-4 py-2 sm:px-6 sm:py-3", stepperClassName)}>
          <div className="mx-auto w-full max-w-6xl">
            <Stepper
              orientation="horizontal"
              steps={steps}
              onStepClick={onStepClick ? (id) => onStepClick(id as JobPostingStep) : undefined}
            />
          </div>
        </div>
      )}
      {below}
    </div>
  )
}

/**
 * The phone's step indicator, in the bottom bar of every step (questions and
 * the plan page): "Step 2 of 4 / Who can apply ⌄". Tapping opens the steps;
 * earlier ones jump back, later ones are disabled. From sm the header
 * stepper does this job, so it hides itself there.
 */
/** One question in the step menu (the wizard passes these). */
export interface StepMenuScreen {
  id: string
  label: string
  stage: JobPostingStep
  icon?: React.ReactNode
  /** Not reached yet: shown, but can't be opened. */
  disabled?: boolean
  current?: boolean
}

export function JobPostingStepMenu({
  current,
  onJump,
  screens,
  onPickScreen,
  labels,
}: {
  labels?: StepLabels
  current: JobPostingStep
  onJump: (step: JobPostingStep) => void
  /** Every question, grouped by step: any one already reached opens
   *  directly, on every width (user call, 2026-11-05). */
  screens?: StepMenuScreen[]
  onPickScreen?: (id: string) => void
}) {
  const STEPS = withLabels(labels)
  const at = STEPS.findIndex((s) => s.id === current)
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const trigger = (
    <button
      type="button"
      className={cn(
        "ink relative -ml-2 flex min-w-0 shrink-0 items-center gap-1 rounded-control px-2 py-1 text-left transition-interactive",
        !screens && "sm:hidden",
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span className="text-xs text-muted-foreground">
          Step {at + 1} of {STEPS.length}
        </span>
        <span className="truncate text-sm font-semibold text-foreground">{STEPS[at].label}</span>
      </span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </button>
  )
  // Phones: every question in a bottom sheet, each with its icon, and the
  // recruiter's avatar marking "You are here" (user call, 2026-11-05).
  if (screens && isMobile) {
    const groups = STEPS.filter((s) => screens.some((q) => q.stage === s.id))
    return (
      <>
        {React.cloneElement(trigger, { onClick: () => setOpen(true) })}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="max-h-svh gap-0 rounded-t-2xl p-0 pb-safe data-[side=bottom]:border-t-0"
          >
            <SheetHeader className="px-5 pt-6 pb-4">
              <SheetTitle className="text-base font-semibold">Steps</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-col overflow-y-auto px-3 py-2">
              {groups.map((s, gi) => (
                <section key={s.id} className="flex flex-col gap-1 py-3">
                  {gi > 0 && <Separator className="-mt-3 mb-3" />}
                  {/* Section heading: the menu type scale (AGENTS.md "Menus"). */}
                  <h3 className="flex items-center gap-2 px-2 pb-1 text-base font-semibold text-foreground">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs">
                      {STEPS.indexOf(s) + 1}
                    </span>
                    {s.label}
                  </h3>
                  {screens
                    .filter((q) => q.stage === s.id)
                    .map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        disabled={q.disabled}
                        aria-current={q.current ? "step" : undefined}
                        onClick={() => {
                          setOpen(false)
                          if (!q.current) onPickScreen?.(q.id)
                        }}
                        className={cn(
                          "ink relative flex min-h-11 items-center gap-3 rounded-control px-2 text-left text-sm text-foreground transition-interactive disabled:text-muted-foreground disabled:opacity-60",
                          q.current && "bg-muted font-semibold",
                        )}
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-5">
                          {q.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{q.label}</span>
                        {q.current && (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card py-0.5 pr-2.5 pl-0.5 text-xs font-medium text-foreground">
                            <Avatar className="size-5">
                              <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                                R
                              </AvatarFallback>
                            </Avatar>
                            You are here
                          </span>
                        )}
                      </button>
                    ))}
                </section>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(
              "ink relative -ml-2 flex min-w-0 shrink-0 items-center gap-1 rounded-control px-2 py-1 text-left transition-interactive",
              !screens && "sm:hidden",
            )}
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">
                Step {at + 1} of {STEPS.length}
              </span>
              <span className="truncate text-sm font-semibold text-foreground">{STEPS[at].label}</span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        }
      />
      <DropdownMenuContent align="start" side="top" className={screens && "max-h-96 min-w-60 overflow-y-auto"}>
        {screens
          ? STEPS.filter((s) => screens.some((q) => q.stage === s.id)).map((s, i) => (
              <React.Fragment key={s.id}>
                {i > 0 && <DropdownMenuSeparator />}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    Step {STEPS.indexOf(s) + 1} · {s.label}
                  </DropdownMenuLabel>
                  {screens
                    .filter((q) => q.stage === s.id)
                    .map((q) => (
                      <DropdownMenuItem
                        key={q.id}
                        disabled={q.disabled}
                        aria-current={q.current ? "step" : undefined}
                        className={cn(q.current && "font-semibold text-primary")}
                        onClick={() => !q.current && onPickScreen?.(q.id)}
                      >
                        {q.icon}
                        {q.label}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
              </React.Fragment>
            ))
          : STEPS.map((s, i) => (
              <DropdownMenuItem key={s.id} disabled={i >= at} onClick={() => onJump(s.id)}>
                Step {i + 1} · {s.label}
              </DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

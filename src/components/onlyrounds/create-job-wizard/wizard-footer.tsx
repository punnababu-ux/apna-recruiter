"use client"

import { ChevronLeft, ChevronRight } from "@apna/design-system"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SECTION_IDS } from "@/lib/onlyrounds/constants"
import type { SectionId } from "@/types/onlyrounds"
import { cn } from "@/lib/utils"
import type { StepId } from "@/components/onlyrounds/create-job-wizard/steps"

// Sticky bottom — consistent across all steps
export function WizardFooter({
  activeId,
  step2OpenSection,
  canGoPrev,
  goPrev,
  goNext,
  ctaBlocked,
  ctaLabel,
  ctaDisabledReason,
  extracting,
  generatingTasks,
}: {
  activeId: StepId
  step2OpenSection: SectionId | null
  canGoPrev: boolean
  goPrev: () => void
  goNext: () => void
  ctaBlocked: boolean
  ctaLabel: string
  ctaDisabledReason: string | null
  extracting: boolean
  generatingTasks: Record<string, boolean>
}) {
  return (
    <div className="sticky bottom-0 z-sticky border-t border-border bg-card px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 py-3">
        {/* Left — Previous (chevron; the back arrow lives in the top
            bar, so the footer uses a chevron to stay distinct). base-ui's
            TooltipTrigger uses `render={...}` (not Radix's `asChild`). */}
        <div className="flex items-center gap-1">
          {activeId !== "description" && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    onClick={goPrev}
                    disabled={!canGoPrev}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                }
              />
              <TooltipContent>
                {activeId === "details" &&
                step2OpenSection &&
                step2OpenSection !== SECTION_IDS[0]
                  ? "Previous section"
                  : "Previous step"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Right — adaptive primary CTA. Soft-disabled when blocked:
            the button LOOKS disabled (opacity + not-allowed cursor +
            aria-disabled) but stays clickable so a click reveals the
            field-level errors. The tooltip explains what's blocking. */}
        <Tooltip>
          <TooltipTrigger
            render={
              <span className={cn(ctaBlocked && "cursor-not-allowed")}>
                <Button
                  size="lg"
                  onClick={goNext}
                  loading={extracting || Object.values(generatingTasks).some(Boolean)}
                  loadingText={Object.values(generatingTasks).some(Boolean) ? "Generating criteria…" : "Filling from JD…"}
                  aria-disabled={ctaBlocked || undefined}
                  className={cn(ctaBlocked && "opacity-50")}
                >
                  {ctaLabel}
                  {!(extracting || Object.values(generatingTasks).some(Boolean)) ? <ChevronRight className="size-4" /> : null}
                </Button>
              </span>
            }
          />
          {ctaDisabledReason ? (
            <TooltipContent>{ctaDisabledReason}</TooltipContent>
          ) : null}
        </Tooltip>
      </div>
    </div>
  )
}

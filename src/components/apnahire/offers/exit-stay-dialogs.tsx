"use client"

/**
 * The exit pop-ups for a returning recruiter (one who already had the 10%
 * offer), in place of ExitOfferDialog. Both use the PlanPopup frame.
 *
 *   StayDialog         express checkout. `where="plan"`: leaving the plan
 *                      page ("Just one step…", Go back). `where="summary"`:
 *                      closing the order summary ("Are you sure?", Change plan).
 *   LeaveReasonsDialog self-checkout's plans page: "What's your reason for
 *                      leaving?" — Skip or Submit both leave.
 *
 * The outline button (or Skip / Submit) → onLeave; the green button, X or
 * Escape → onStay.
 */

import { Button } from "@apna/design-system"
import {
  PlanPopup,
  PopupFooter,
  PopupHeader,
  ReasonStep,
  useReasons,
} from "@/components/apnahire/plan-popup"

const LEAVE_REASONS = [
  "I didn't find what I'm looking for",
  "Plans were too expensive",
  "I'm casually checking out plans",
  "Others",
] as const

export function StayDialog({
  open,
  where,
  jobTitle,
  onStay,
  onLeave,
}: {
  open: boolean
  where: "plan" | "summary"
  jobTitle: string
  onStay: () => void
  onLeave: () => void
}) {
  const strong = "font-semibold text-foreground"
  return (
    <PlanPopup open={open} onOpenChange={(next) => !next && onStay()}>
      {where === "plan" ? (
        <PopupHeader
          art="job-types"
          alone
          title="Just one step to make your job live"
          description={
            <>
              Join <span className={strong}>7 lakh+</span> recruiters who finished posting and found candidates
              within <span className={strong}>48 hours</span>
            </>
          }
        />
      ) : (
        <PopupHeader
          art="job-types"
          alone
          title="Are you sure?"
          description={
            <>
              <span className={strong}>112+</span> recruiters have recently hired for{" "}
              <span className={strong}>{jobTitle}</span> on apna
            </>
          }
        />
      )}
      <PopupFooter>
        <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={onLeave}>
          {where === "plan" ? "Go back" : "Change plan"}
        </Button>
        <Button size="lg" className="w-full sm:flex-1" onClick={onStay}>
          Continue posting
        </Button>
      </PopupFooter>
    </PlanPopup>
  )
}

export function LeaveReasonsDialog({
  open,
  onStay,
  onLeave,
}: {
  open: boolean
  onStay: () => void
  onLeave: (answers: string[]) => void
}) {
  const reasons = useReasons(LEAVE_REASONS)
  const leave = (answers: string[]) => {
    reasons.reset()
    onLeave(answers)
  }
  return (
    <PlanPopup open={open} onOpenChange={(next) => !next && onStay()}>
      <PopupHeader
        art="contact"
        title="Sorry to see you go"
        description="What's your reason for leaving? It helps us improve."
      />
      <ReasonStep id="leave-reason" state={reasons} />
      <PopupFooter>
        <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={() => leave([])}>
          Skip
        </Button>
        <Button size="lg" className="w-full sm:flex-1" disabled={!reasons.ready} onClick={() => leave(reasons.answers)}>
          Submit
        </Button>
      </PopupFooter>
    </PlanPopup>
  )
}

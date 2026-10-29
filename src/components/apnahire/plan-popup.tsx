"use client"

/**
 * PlanPopup — the one frame for a subscriber's plan pop-ups (cancel,
 * downgrade, upgrade confirmation), so they share size, padding, type and
 * button row. A dialog from md, a bottom sheet on phones; both draw the
 * CloseBubble, never a close button inside.
 *
 *   <PlanPopup open onOpenChange>
 *     <PopupHeader art title description />          clay beside the title,
 *                                                     then a rule
 *     <PopupBody>…</PopupBody>                          the content
 *     <PopupFooter>buttons</PopupFooter>                the action row
 *   </PlanPopup>
 *
 *   ReasonStep    "Why are you …?": checkboxes plus an "Other reasons" note,
 *                 for cancel and downgrade alike.
 *   ChangeList    a titled box of ✓ / ✗ lines ("Here is what will change").
 *   PopupResult   the centred last step: one clay picture on top (ValueArt,
 *                 as every centred confirmation pop-up), title, text, CTA.
 */

import * as React from "react"
import {
  Check,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  Textarea,
  X,
} from "@apna/design-system"
import { ValueArt, type ValueName } from "@/components/marketing/value-art"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const MobileContext = React.createContext(false)

export function PlanPopup({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  return (
    <MobileContext.Provider value={isMobile}>
      {isMobile ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="gap-0 rounded-t-2xl p-0 pb-safe data-[side=bottom]:border-t-0">
            {children}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="gap-0 rounded-overlay p-0 sm:max-w-md">{children}</DialogContent>
        </Dialog>
      )}
    </MobileContext.Provider>
  )
}

export function PopupTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  const Title = React.useContext(MobileContext) ? SheetTitle : DialogTitle
  return <Title className={cn("text-h4 text-foreground", className)}>{children}</Title>
}

export function PopupDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  const Description = React.useContext(MobileContext) ? SheetDescription : DialogDescription
  return <Description className={cn("text-sm text-muted-foreground", className)}>{children}</Description>
}

/** Every step's title row, the pop-up header pattern (docs/CLAY-
 *  ILLUSTRATIONS.md): one clay object beside the title (`xs`), then a rule
 *  above the content. `alone`: no PopupBody follows (a plain confirm), so
 *  it closes its own space and the footer's rule is the only one. */
export function PopupHeader({
  title,
  description,
  art,
  alone,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  art: ValueName
  alone?: boolean
}) {
  return (
    <>
      <div className={cn("flex items-center gap-4 px-5 pt-6 sm:px-6", alone ? "pb-5" : "pb-4")}>
        <ValueArt name={art} size="xs" />
        <div className="flex min-w-0 flex-col gap-1">
          <PopupTitle>{title}</PopupTitle>
          {description && <PopupDescription>{description}</PopupDescription>}
        </div>
      </div>
      {!alone && <Separator />}
    </>
  )
}

export function PopupBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col gap-4 px-5 py-5 sm:px-6", className)}>{children}</div>
}

/** The action row (AGENTS.md "CTAs in a pop-up"): side by side, secondary
 *  first, equal halves on every width. `stack`: a pair whose labels can't
 *  share a 320px row — stacked on phones, primary on top. Buttons take no
 *  width classes of their own. */
export function PopupFooter({ stack, children }: { stack?: boolean; children: React.ReactNode }) {
  return (
    <>
      <Separator />
      <div
        className={cn(
          "flex gap-3 px-5 py-4 sm:flex-row sm:px-6 sm:*:flex-1",
          stack ? "flex-col-reverse *:w-full sm:*:w-auto" : "*:min-w-0 *:flex-1"
        )}
      >
        {children}
      </div>
    </>
  )
}

/** "Why are you …?": any number of reasons; "Other reasons" asks for a
 *  note. `ready` is true once there is something to send. */
export function useReasons(reasons: readonly string[]) {
  const other = reasons[reasons.length - 1]
  const [picked, setPicked] = React.useState<string[]>([])
  const [note, setNote] = React.useState("")
  const ready = picked.length > 0 && (!picked.includes(other) || note.trim().length > 0)
  const answers = picked.includes(other) ? [...picked, note.trim()] : picked
  const reset = () => {
    setPicked([])
    setNote("")
  }
  return { reasons, other, picked, setPicked, note, setNote, ready, answers, reset }
}

export function ReasonStep({ id, state }: { id: string; state: ReturnType<typeof useReasons> }) {
  const toggle = (reason: string, on: boolean) =>
    state.setPicked((list) => (on ? [...list, reason] : list.filter((r) => r !== reason)))
  return (
    <PopupBody>
      {/* The system's field set: a checkbox group with its own (hidden) legend. */}
      <FieldSet>
        <FieldLegend className="sr-only">Reasons</FieldLegend>
        <FieldGroup className="gap-4">
          {state.reasons.map((reason, i) => (
            <Field key={reason} orientation="horizontal">
              <Checkbox
                id={`${id}-${i}`}
                checked={state.picked.includes(reason)}
                onCheckedChange={(on) => toggle(reason, on)}
              />
              <FieldLabel htmlFor={`${id}-${i}`} className="font-regular text-foreground">
                {reason}
              </FieldLabel>
            </Field>
          ))}
          {state.picked.includes(state.other) && (
            <Textarea
              aria-label="Other reason"
              placeholder="Tell us more"
              value={state.note}
              onChange={(e) => state.setNote(e.target.value)}
              className="text-base md:text-sm"
            />
          )}
        </FieldGroup>
      </FieldSet>
    </PopupBody>
  )
}

/** A titled grey box of lines, each a gain (✓) or a loss (✗): the muted
 *  nested surface, as the usage tiles. */
export function ChangeList({
  title,
  items,
  className,
}: {
  title: React.ReactNode
  items: { text: React.ReactNode; lost?: boolean }[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-card-nested bg-muted p-4", className)}>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map(({ text, lost }, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
            {lost ? (
              <X className="size-5 shrink-0 text-muted-foreground" aria-label="Goes down" />
            ) : (
              <Check className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            )}
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The centred last step of a flow: clay on top, never a line icon. */
export function PopupResult({
  art,
  title,
  children,
  note,
  action,
}: {
  art: ValueName
  title: React.ReactNode
  children: React.ReactNode
  /** A box under the text (an info alert). */
  note?: React.ReactNode
  action: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-5 pt-8 pb-5 text-center sm:px-6">
        <ValueArt name={art} size="sm" />
        <div className="flex flex-col gap-1">
          <PopupTitle>{title}</PopupTitle>
          <PopupDescription>{children}</PopupDescription>
        </div>
        {note}
      </div>
      <Separator />
      <div className="px-5 py-4 sm:px-6">{action}</div>
    </>
  )
}

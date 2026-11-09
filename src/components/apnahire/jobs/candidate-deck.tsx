"use client"

/**
 * CandidateDeck — the phone's decision step. A tapped
 * candidate becomes a floating card, with the previous and next cards
 * peeking at its sides.
 *
 *   Drag sideways  The cards follow the finger; the one in hand tilts a
 *                  little. Past a third of the width, or on a flick: left is
 *                  the next candidate, right the previous. Swiping never
 *                  decides: a slip must not reject a real person.
 *   Scroll up      The card becomes a normal profile screen: the name and
 *                  tabs stay, a back button takes the photo's place, no pill,
 *                  no sideways drag. Scrolling back to the top returns it to
 *                  the card; the back button goes to the list.
 *   Reject,        On the card, so they travel with it. The card flies out
 *   Shortlist      and the next one slides in. Undo brings the candidate back.
 *   Floating pill  Navigation only: previous, "1 of 4", next, close.
 *
 * Decisions: docs/DECISIONS.md, "Phone candidate deck".
 */

import * as React from "react"
import {
  BackButton,
  Button,
  ChevronLeft,
  ChevronRight,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  X,
  cn,
} from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import { CandidateDetails } from "@/components/apnahire/jobs/candidate-details"
import type { ChatThread } from "@/content/chats"

const THROW_MS = 320
const END = "__end"
/** The gap between cards: the 8px in the design system's deck-slide. */
const CARD_GAP = 8

export type DeckOutcome = "shortlisted" | "rejected"
export type DeckHandle = { decide: (id: string, v: DeckOutcome) => void }
type DeckRow = { id: string; name: string; status: string }

export function CandidateDeck({
  rows,
  walk,
  startId,
  fromY,
  handle,
  threadOf,
  onAddNote,
  onClose,
  onDecide,
  actions,
}: {
  rows: DeckRow[]
  /** The candidates to walk through, fixed when the card opens. */
  walk: string[]
  startId: string
  /** How far below its resting place the card starts: the tapped row. */
  fromY?: number
  handle: React.Ref<DeckHandle>
  threadOf: (id: string) => ChatThread | undefined
  onAddNote: (id: string, text: string) => void
  onClose: () => void
  onDecide: (id: string, v: DeckOutcome) => void
  actions: (id: string) => React.ReactNode
}) {
  const stage = React.useRef<HTMLDivElement>(null)
  const top = React.useRef<HTMLDivElement>(null)
  const busy = React.useRef(false)
  const drag = React.useRef<{ x: number; y: number; t: number; on: boolean; id: number } | null>(null)
  const [flown, setFlown] = React.useState<Map<string, DeckOutcome>>(new Map())
  const [full, setFull] = React.useState(false)
  const [entered, setEntered] = React.useState(false)

  // A flown card comes back if its decision is undone.
  const ids = walk.filter((id) => {
    const row = rows.find((r) => r.id === id)
    return row && flown.get(id) !== row.status
  })
  const [position, setPosition] = React.useState(() => Math.max(0, ids.indexOf(startId)))
  const [lastFlown, setLastFlown] = React.useState<string | null>(null)
  const [count, setCount] = React.useState(ids.length)
  if (count !== ids.length) {
    setCount(ids.length)
    const at = lastFlown ? ids.indexOf(lastFlown) : -1
    if (ids.length > count && at >= 0) {
      setPosition(at)
      setLastFlown(null)
      setFull(false)
    }
  }
  const index = Math.min(position, ids.length)
  const list = [...ids, END]
  const activeId = ids[index]
  // Two each side, so a card arrives from off screen and never pops in.
  const shown = list.slice(Math.max(0, index - 2), index + 3)

  const setOffset = (dx: number) => {
    stage.current?.style.setProperty("--deck-x", `${dx}px`)
    stage.current?.style.setProperty("--deck-tilt", `${dx / 40}deg`)
  }
  const follow = (on: boolean) => {
    if (!stage.current) return
    if (on) stage.current.dataset.dragging = ""
    else delete stage.current.dataset.dragging
  }

  const go = (to: number) => {
    if (busy.current || to < 0 || to >= list.length) return
    follow(false)
    setOffset(0)
    setEntered(true)
    setFull(false)
    setPosition(to)
  }

  /** The card flies out while the next one slides into its place. */
  const decide = (id: string, v: DeckOutcome) => {
    const el = top.current
    if (!el || busy.current) return
    busy.current = true
    setEntered(true)
    follow(false)
    setOffset(-(el.offsetWidth + CARD_GAP))
    stage.current?.style.setProperty("--deck-tilt", "0deg")
    const dir = v === "shortlisted" ? 1 : -1
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const flight = el.animate(
      { translate: `${dir * 130}vw 40px`, rotate: `${dir * 18}deg`, opacity: 0.6 },
      { duration: still ? 0 : THROW_MS, easing: "ease-out", fill: "forwards" },
    )
    flight.onfinish = () => {
      // The next card is already in place: swap its offset for its slot unseen.
      follow(true)
      setOffset(0)
      setLastFlown(id)
      onDecide(id, v)
      setFlown((m) => new Map(m).set(id, v))
      setFull(false)
      busy.current = false
      requestAnimationFrame(() => requestAnimationFrame(() => follow(false)))
    }
  }
  React.useImperativeHandle(handle, () => ({ decide }))

  const onPointerDown = (e: React.PointerEvent) => {
    if (full || busy.current || (e.target as HTMLElement).closest("textarea")) return
    drag.current = { x: e.clientX, y: e.clientY, t: e.timeStamp, on: false, id: e.pointerId }
  }
  // Nothing on that side: the card resists instead of following.
  const pull = (dx: number) => ((dx > 0 && index === 0) || (dx < 0 && index === list.length - 1) ? dx / 4 : dx)
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.on) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - d.y)) return
      d.on = true
      e.currentTarget.setPointerCapture(d.id)
      follow(true)
    }
    // Follows the finger directly, without a React render per frame.
    setOffset(pull(dx))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current
    const el = top.current
    drag.current = null
    if (!d?.on || !el) return
    const dx = e.clientX - d.x
    const flick = Math.abs(dx) / Math.max(e.timeStamp - d.t, 1) > 0.6
    const far = e.type === "pointerup" && (Math.abs(dx) > el.clientWidth / 3 || flick)
    if (far) go(index + (dx < 0 ? 1 : -1))
    follow(false)
    setOffset(0)
  }

  const onCardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop
    if (!full && y > 8) setFull(true)
    else if (full && y <= 0) setFull(false)
  }

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="inset-0 gap-0 bg-transparent p-0 shadow-none data-starting-style:translate-y-0 data-[side=bottom]:h-svh data-[side=bottom]:max-h-none data-[side=bottom]:rounded-none data-[side=bottom]:border-0"
      >
        <SheetTitle className="sr-only">Candidate details</SheetTitle>
        <div
          ref={stage}
          className="relative h-full overflow-hidden"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {shown.map((id) => {
            const slot = list.indexOf(id) - index
            const front = slot === 0
            const thread = id !== END ? threadOf(id) : undefined
            return (
              <div
                key={id}
                ref={front ? top : undefined}
                inert={!front}
                aria-hidden={!front}
                onPointerDown={front ? onPointerDown : undefined}
                onPointerMove={front ? onPointerMove : undefined}
                onPointerUp={front ? onPointerUp : undefined}
                onPointerCancel={front ? onPointerUp : undefined}
                className={cn(
                  "deck-slide absolute touch-pan-y overflow-hidden bg-card",
                  front && "z-10 deck-tilt",
                  front && full ? "inset-0" : "deck-card-shadow inset-x-5 top-4 bottom-28 rounded-card",
                  front && !entered && "animate-deck-enter",
                )}
                style={{ "--deck-slot": slot, ...(front && fromY !== undefined ? { "--deck-from": `${fromY}px` } : {}) } as React.CSSProperties}
              >
                {id === END ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <ValueArt name="no-results" size="sm" />
                    <h2 className="text-h4 text-foreground">You have seen everyone</h2>
                    <Button size="lg" onClick={onClose}>Back to candidates</Button>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div onScroll={front ? onCardScroll : undefined} className="no-scrollbar min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain">
                      {/* Always taller than the screen, so growing can't undo the scroll. */}
                      <div className="min-h-svh">
                        {thread && (
                          <CandidateDetails
                            thread={thread}
                            onAddNote={(text) => onAddNote(id, text)}
                            leading={front && full ? <BackButton onClick={onClose} /> : undefined}
                          />
                        )}
                      </div>
                    </div>
                    <div className={cn("flex shrink-0 items-center gap-2 border-t border-border bg-card p-3", front && full && "pb-safe-4")}>
                      {actions(id)}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {!full && (<div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-safe-4">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-card p-2 shadow-elevated">
            <Button variant="ghost" size="icon-lg" aria-label="Previous candidate" disabled={index === 0} onClick={() => go(index - 1)}>
              <ChevronLeft aria-hidden />
            </Button>
            {activeId && <span className="px-1 text-sm whitespace-nowrap text-muted-foreground">{index + 1} of {ids.length}</span>}
            <Button variant="ghost" size="icon-lg" aria-label="Next candidate" disabled={!activeId} onClick={() => go(index + 1)}>
              <ChevronRight aria-hidden />
            </Button>
            <Separator orientation="vertical" className="my-auto h-6" />
            <Button variant="ghost" size="icon-lg" aria-label="Close" onClick={onClose}>
              <X aria-hidden />
            </Button>
          </div>
        </div>)}
      </SheetContent>
    </Sheet>
  )
}

"use client"

/**
 * StoryGlass — About's "How we got here" told through glass.
 *
 * Only the site's own language: the four suite gradients (sky, green, plum,
 * gold — the stacking cards' order), frosted glass, the watermark marker.
 *
 * Each chapter is a card in its suite gradient, the marker (2019, 400M…)
 * large on the open side, the story on a glass panel. The cards stack in
 * the site's deck (ScrollStack), all one height. As a card enters, its
 * gradient fades up and the glass settles; the marker rolls with the
 * scroll — numbers count, words rise letter by letter — landing as the
 * card stacks. (A pinned single stage was tried first: it held the scroll
 * and felt unresponsive between chapters.)
 * Desktop: alternating, glass right then left. Phones: a plain column,
 * marker on top, glass below.
 * Reduced motion: no roll, no travel; cards simply show.
 */

import { useEffect, useRef, useState, type ReactNode } from "react"
import { ScrollStack, ScrollStackItem } from "@apna/design-system"
import { ILLUSTRATION_TONE, type IllustrationTone } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

export type StoryBeat = { marker: string; title: string; description: string }

const TONES: IllustrationTone[] = ["sky", "green", "plum", "gold"]
const tone = (i: number) => ILLUSTRATION_TONE[TONES[i % TONES.length]]

export function StoryGlass({ heading, beats }: { heading: ReactNode; beats: readonly StoryBeat[] }) {
  const deckRef = useRef<HTMLDivElement>(null)

  // One height for the whole deck: a stacked card shorter than the one
  // beneath lets that one's bottom show under it. Every card takes the
  // tallest card's natural height (from lg, where they stack), re-measured
  // whenever a card's size or the window changes.
  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    const desktop = window.matchMedia("(min-width: 1024px)")
    const items = () => [...deck.querySelectorAll<HTMLElement>("[data-slot=scroll-stack-item]")]
    let frame = 0
    const level = () => {
      frame = 0
      const cards = items()
      cards.forEach((c) => (c.style.minHeight = ""))
      if (!desktop.matches) return
      const tallest = Math.max(...cards.map((c) => c.offsetHeight))
      cards.forEach((c) => (c.style.minHeight = `${tallest}px`))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(level) }
    level()
    const ro = new ResizeObserver(schedule)
    // Watch the glass panels (the content), not the cards: the cards'
    // heights are what this sets.
    deck.querySelectorAll("[data-story-panel]").forEach((p) => ro.observe(p))
    window.addEventListener("resize", schedule)
    desktop.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener("resize", schedule)
      desktop.removeEventListener("change", schedule)
    }
  }, [beats.length])

  return (
    <section aria-label="How we got here" className="bg-card px-4 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto flex max-w-band flex-col gap-10">
        {heading}
        {/* The site's stacking deck: each card pins a little lower than the
            last, the next slides over it, the ones beneath ease back. */}
        <div ref={deckRef}>
          <ScrollStack>
            {beats.map((beat, i) => (
              <Chapter key={beat.marker} beat={beat} index={i} total={beats.length} />
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  )
}

/**
 * One chapter: a stage card in its suite gradient, the marker large behind
 * a glass panel. It comes alive as it scrolls into view — the gradient fades
 * up, the marker sharpens out of a blur and counts up, the glass settles —
 * once. Stacks in the site's deck (ScrollStack).
 */
function Chapter({
  beat,
  index,
  total,
  className,
}: {
  beat: StoryBeat
  index: number
  total: number
  /** The deck's pin offset, passed in by ScrollStack. */
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Alternate sides from lg: glass right, then left.
  const flip = index % 2 === 1
  // How far the card has travelled from entering the screen to its resting
  // place (0 → 1): its pin on the deck from lg, the upper third on phones.
  // The marker's roll follows this, so it lands as the card stacks — and
  // stops when the scrolling stops.
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const desktop = window.matchMedia("(min-width: 1024px)")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    const update = () => {
      frame = 0
      // Reduced motion: the marker is simply there.
      if (still) { setProgress(1); return }
      const vh = window.innerHeight
      const rest = desktop.matches ? parseFloat(getComputedStyle(el).top) || 0 : vh * 0.3
      const p = (vh - el.getBoundingClientRect().top) / (vh - rest)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      // Fire as the card starts entering, so the roll is under way as you
      // arrive, not after you've stopped to read.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <ScrollStackItem
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden border-transparent p-3 lg:flex lg:min-h-96 lg:items-stretch lg:p-6",
        flip ? "lg:justify-start" : "lg:justify-end",
        className
      )}
    >
      {/* The gradient fades up over the muted resting fill. */}
      <div aria-hidden className={cn("story-fade absolute inset-0 -z-20", tone(index), seen ? "opacity-100" : "opacity-0")} />
      {/* The marker fills the open side of the card, whole: centred in
          the space beside the glass, sized to that space so even "400M"
          and "Today" never run off the card or under the panel. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 flex h-28 items-center px-6 select-none lg:inset-y-0 lg:h-auto lg:w-7/12 lg:justify-center lg:px-10",
          flip ? "lg:right-0 lg:left-auto" : "lg:left-0"
        )}
      >
        <span className={cn("story-fade story-marker", seen ? "opacity-100 blur-none" : "translate-y-6 opacity-0 blur-xl")}>
          <CountUp value={beat.marker} progress={progress} />
        </span>
      </div>
      <div
        data-story-panel
        className={cn(
          "story-fade mt-24 flex flex-col gap-4 rounded-card-nested bg-surface-glass p-6 backdrop-blur-xl lg:mt-0 lg:w-5/12 lg:justify-center lg:gap-5 lg:p-10",
          seen ? "opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <span className="text-overline text-muted-foreground tabular-nums">
          {beat.marker} · {index + 1} of {total}
        </span>
        <h3 className="text-h4 text-balance text-foreground lg:text-h3">{beat.title}</h3>
        <p className="text-body-sm text-pretty text-muted-foreground lg:text-body">{beat.description}</p>
      </div>
    </ScrollStackItem>
  )
}

/**
 * A marker that rolls with the scroll: `progress` 0 → 1 takes "400M" up from
 * 0 and a year up from ten years before; a word ("apna", "Today") rises in
 * letter by letter. Gently eased, so it rolls the whole way and slows as it lands.
 */
function CountUp({ value, progress }: { value: string; progress: number }) {
  const match = /^(\d+)(.*)$/.exec(value)
  if (!match) return <LetterRoll value={value} progress={progress} />
  const target = Number(match[1])
  const suffix = match[2]
  const isYear = target > 1900 && target < 2100 && !suffix
  const from = isYear ? target - 10 : 0
  return <>{`${Math.round(from + (target - from) * easeOut(progress))}${suffix}`}</>
}

/**
 * A word's version of the count-up, like an odometer settling: each letter
 * rises into place from below, the next a little behind the one before.
 */
function LetterRoll({ value, progress }: { value: string; progress: number }) {
  const letters = Array.from(value)
  // Each letter takes half the travel; their starts spread over the rest.
  const span = 0.5
  const step = letters.length > 1 ? (1 - span) / (letters.length - 1) : 0
  return (
    <span className="inline-flex">
      {letters.map((ch, i) => {
        const local = Math.min(1, Math.max(0, (progress - i * step) / span))
        return (
          <span key={i} className="story-roll-slot">
            <span className="story-roll-char" style={{ translate: `0 ${(1 - easeOut(local)) * 110}%` }}>
              {ch}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/** Even through the middle, slowing only as it lands: an ease-out this
 *  gentle keeps the roll alive for the whole slide instead of finishing in
 *  its first third. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.6)
}

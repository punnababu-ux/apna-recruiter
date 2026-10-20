"use client"

/**
 * The hall — the awards page as an auditorium. House lights down (the page
 * turns dark in both themes) and a gallery walk: scrolling down walks you
 * sideways past the awards. The one in the centre stands in the light,
 * full size, its glow behind it; the ones ahead and behind recede — smaller,
 * dimmer, pushed back into the dark.
 *
 *   HallLights  keeps the dark theme on <body> while mounted
 *               and takes it off on leaving (the page's inline script puts
 *               it on before first paint)
 *   HallWalk    the walk. From md it's a pinned corridor driven by scroll;
 *               on phones a swipe carousel, every award lit
 *   Exhibit     one award: `model` (GLB, turning) wins over `video` (a
 *               seamless 360° turn, plays only while lit) over the picture
 */

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@apna/design-system"
import { AwardModel } from "@/components/marketing/award-model"
import { cn } from "@/lib/utils"

export function HallLights() {
  useEffect(() => {
    // <body>, not the canvas: pop-ups (search results, menus) render in
    // portals outside the canvas and must be dark too. Not <html>: the
    // theme provider owns its class and resets it.
    const root = document.body
    if (root.classList.contains("dark") && !root.hasAttribute("data-hall-dark")) return
    root.classList.add("dark")
    root.setAttribute("data-hall-dark", "")
    return () => {
      root.classList.remove("dark")
      root.removeAttribute("data-hall-dark")
    }
  }, [])
  return null
}

export type HallAward = {
  image: string
  video?: string
  /** A GLB: the award in real 3D, turning, draggable. Wins over video. */
  model?: string
  by: string
  title: string
  year: string
  description: string
}

/** Each award gets this much scroll, in screen heights. */
const SCROLL_PER_AWARD = 0.8

export function HallWalk({ awards }: { awards: readonly HallAward[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  // Phones have no corridor: every award stands lit.
  const [allLit, setAllLit] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-exhibit]"))
    const desktop = window.matchMedia("(min-width: 768px)")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (!desktop.matches) return
      const vw = window.innerWidth
      const travel = section.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel))
      const shift = progress * (track.scrollWidth - track.clientWidth)
      track.style.transform = `translate3d(${-shift}px, 0, 0)`

      let nearest = 0
      let best = Infinity
      items.forEach((el, i) => {
        // How far this exhibit is from the centre, in screen widths.
        const center = el.offsetLeft + el.offsetWidth / 2 - shift
        const d = Math.abs(center - vw / 2) / vw
        if (d < best) { best = d; nearest = i }
        const depth = Math.min(d, 0.6)
        const body = el.querySelector<HTMLElement>("[data-exhibit-body]")
        if (body && !still.matches) {
          body.style.transform = `perspective(1200px) translateZ(${-depth * 500}px) rotateY(${(center < vw / 2 ? 1 : -1) * depth * 30}deg)`
        }
      })
      setActive(nearest)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    const size = () => {
      setAllLit(!desktop.matches)
      // The corridor is as long as the walk: one stretch of scroll per award.
      section.style.height = desktop.matches ? `${(awards.length * SCROLL_PER_AWARD + 1) * 100}vh` : ""
      if (!desktop.matches) {
        track.style.transform = ""
        items.forEach((el) => { const b = el.querySelector<HTMLElement>("[data-exhibit-body]"); if (b) b.style.transform = "" })
      }
      update()
    }
    size()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", size)
    desktop.addEventListener("change", size)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", size)
      desktop.removeEventListener("change", size)
    }
  }, [awards.length])

  return (
    <section ref={sectionRef} aria-label="The awards" className="relative">
      <div className="overflow-x-clip md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:justify-center md:pt-24">
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto py-24 will-change-transform md:snap-none md:overflow-visible md:py-0"
        >
          {/* Lead-in and lead-out, so the first and last awards can reach the centre. */}
          <div aria-hidden className="w-1/12 shrink-0 md:w-1/4" />
          {awards.map((award, i) => (
            <Exhibit key={award.title} award={award} lit={allLit || i === active} />
          ))}
          <div aria-hidden className="w-1/12 shrink-0 md:w-1/4" />
        </div>

        {/* Where you are in the walk. */}
        <div className="hidden items-center justify-center gap-3 pt-6 md:flex" aria-hidden>
          <span className="text-caption tabular-nums text-foreground">{String(active + 1).padStart(2, "0")}</span>
          <div className="flex gap-1">
            {awards.map((a, i) => (
              <span
                key={a.title}
                className={cn(
                  "h-px w-6 transition-interactive",
                  i === active ? "bg-foreground" : "bg-border"
                )}
              />
            ))}
          </div>
          <span className="text-caption tabular-nums text-muted-foreground">{String(awards.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  )
}

function Exhibit({ award, lit }: { award: HallAward; lit: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (lit) v.play().catch(() => {})
    else v.pause()
  }, [lit])

  const media = award.model ? (
    <AwardModel src={award.model} alt={award.title} />
  ) : award.video ? (
    <video
      ref={videoRef}
      src={award.video}
      poster={award.image}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={award.title}
      className="size-full object-contain"
    />
  ) : (
    <Image
      src={award.image}
      alt={award.title}
      width={600}
      height={600}
      className="size-full rounded-card-nested object-cover hall-rim"
    />
  )

  return (
    <article
      data-exhibit
      data-lit={lit ? "" : undefined}
      className="group/exhibit w-5/6 shrink-0 snap-center md:w-1/2"
    >
      <div data-exhibit-body className="flex flex-col items-center gap-6 px-4 transition-transform duration-enter ease-out-ui">
        <div className="hall-exhibit relative">
          <div aria-hidden className="hall-spotlight absolute -inset-x-24 -top-64 -bottom-8" />
          <div aria-hidden className="hall-halo absolute -inset-1/4 md:-inset-1/2" />
          <div className={cn("hall-dim relative aspect-square", award.model && "hall-float")}>{media}</div>
        </div>
        <div className="hall-dim flex max-w-md flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3">
            <span className="text-overline text-muted-foreground">{award.by}</span>
            <Badge variant="outline" className="shrink-0 tabular-nums">
              {award.year}
            </Badge>
          </div>
          <h3 className="text-h3 text-balance text-foreground">{award.title}</h3>
          <p className="text-body-sm text-pretty text-muted-foreground">{award.description}</p>
        </div>
      </div>
    </article>
  )
}

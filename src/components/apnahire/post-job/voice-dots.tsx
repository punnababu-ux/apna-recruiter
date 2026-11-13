"use client"

/**
 * VoiceDots — while the mic listens, a faint halftone
 * of gray dots flows out around the prompt box, after Android's "OK Google"
 * (2026-11-13). Dots are biggest at the box's edge and shrink as they fade
 * outward; the outer edge is uneven and drifts, so it never reads as a
 * frame, and the rows ripple like fabric rather than sitting straight. Starting spreads it out from the box; stopping draws it back in.
 *
 * Canvas, because CSS can't size each dot by its distance. Colour is neutral
 * gray (`text-muted-foreground`) at low strength, so the glow stays the
 * only colour (Punna, 2026-11-13); read from the canvas's computed colour.
 * Place it inside the prompt's `relative` wrapper, after `voice-glow`. Sideways it never
 * passes the page edge (phones: the 1rem padding). Reduced motion: one
 * still frame, no drift.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

const GAP = 7 // grid step, px
const MAX_R = 1.9 // dot radius at the box's edge, px
const TOP = 104 // reach above the box, px: faint by the time it meets the text
const BOTTOM = 40 // below: thin there, the chips sit on it
const SIDE_MAX = 56 // desktop reach sideways; phones get the page padding
const EDGE = 4 // gap kept from the screen edge, px
const FADE = 12 // the dots thin out over this much before the canvas ends, px
const BOX_RADIUS = 16
const WARP = 3 // how far a dot moves off its row, px: under half the grid step, so rows never cross

/** The fabric: a slow, smooth wave field that bends the rows and columns,
 *  so the grid ripples like cloth instead of sitting in straight lines. */
function warp(x: number, y: number, t: number) {
  return [
    WARP * (0.65 * Math.sin(y * 0.045 + x * 0.012 + t * 1.1) + 0.35 * Math.sin(y * 0.11 - x * 0.03 - t * 0.7)),
    WARP * (0.65 * Math.sin(x * 0.038 - y * 0.015 - t * 0.9) + 0.35 * Math.sin(x * 0.09 + y * 0.04 + t * 1.3)),
  ]
}

/** Signed distance from a point to a rounded rectangle (negative inside). */
function roundedRectDistance(px: number, py: number, w: number, h: number, r: number) {
  const qx = Math.abs(px - w / 2) - (w / 2 - r)
  const qy = Math.abs(py - h / 2) - (h / 2 - r)
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r
}

/** How far the dots reach at this angle and time: 0.12–1. A few broad lobes
 *  that drift at different speeds, so the edge is uneven and never a frame. */
function reachAt(angle: number, t: number) {
  const n =
    0.5 +
    0.3 * Math.sin(angle * 2 + t * 0.6) +
    0.2 * Math.sin(angle * 3 - t * 0.9 + 1.3) +
    0.1 * Math.sin(angle * 7 + t * 1.4 + 0.4)
  return Math.min(1, Math.max(0.12, n))
}

export function VoiceDots({ active, className }: { active: boolean; className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const activeRef = React.useRef(active)
  const kickRef = React.useRef<() => void>(undefined)
  const [mounted, setMounted] = React.useState(active)
  if (active && !mounted) setMounted(true)

  React.useEffect(() => {
    activeRef.current = active
    kickRef.current?.() // a still frame (reduced motion) needs a redraw to close
  }, [active])

  React.useEffect(() => {
    const canvas = ref.current
    const box = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !box || !ctx) return
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    const color = getComputedStyle(canvas).color
    let side = 16
    let w = 0
    let h = 0

    const size = () => {
      const r = box.getBoundingClientRect()
      side = Math.max(0, Math.min(SIDE_MAX, r.left - EDGE, innerWidth - r.right - EDGE))
      w = r.width
      h = r.height
      const dpr = devicePixelRatio || 1
      const cw = w + side * 2
      const ch = h + TOP + BOTTOM
      Object.assign(canvas.style, { left: `${-side}px`, top: `${-TOP}px`, width: `${cw}px`, height: `${ch}px` })
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(box)

    let spread = 0 // 0 → 1 as it opens, back to 0 as it closes
    let last = performance.now()
    let raf = 0
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const target = activeRef.current ? 1 : 0
      spread = still ? target : spread + (target - spread) * Math.min(1, dt * (target ? 5 : 8))
      const t = still ? 0 : now / 1000
      ctx.clearRect(0, 0, w + side * 2, h + TOP + BOTTOM)
      ctx.fillStyle = color
      const cx = w / 2
      const cy = h / 2
      for (let y = GAP / 2; y < h + TOP + BOTTOM; y += GAP) {
        for (let x = GAP / 2; x < w + side * 2; x += GAP) {
          const bx = x - side
          const by = y - TOP
          const d = roundedRectDistance(bx, by, w, h, BOX_RADIUS)
          if (d < 0) continue // under the box
          // Room on this side: less sideways and below, so it stays clear.
          const room = by < 0 ? TOP : by > h ? BOTTOM : side
          const reach = room * reachAt(Math.atan2((by - cy) / h, (bx - cx) / w), t) * spread
          // Fade out before the canvas edge, so no dot is ever cut off (phones:
          // the field sits 16px from the screen edge).
          const edge = Math.min(x, w + side * 2 - x, y, h + TOP + BOTTOM - y)
          const k = (1 - d / Math.max(reach, 0.001)) * Math.min(1, edge / FADE)
          if (k <= 0) continue
          // Bigger and stronger at the box, smaller and fainter outward (halftone).
          ctx.globalAlpha = Math.pow(k, 1.4) * 0.35
          const [ox, oy] = warp(x, y, t)
          ctx.beginPath()
          ctx.arc(x + ox, y + oy, 0.3 + MAX_R * k, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!activeRef.current && spread < 0.01) {
        setMounted(false)
        return
      }
      raf = still && activeRef.current ? 0 : requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    kickRef.current = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    return () => {
      kickRef.current = undefined
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [mounted])

  if (!mounted) return null
  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute -z-1 text-muted-foreground", className)} />
}

/**
 * VoiceLine — the mic button's face while listening:
 * one line that moves like a voice waveform, in the button's own colour.
 * It swells each time `pulse` changes (new words heard) and settles back to
 * a gentle ripple in a pause. The line's ends stay still, so it reads as a
 * wave, not a scribble. Reduced motion: a still curve.
 */
const LINE_W = 22
const LINE_H = 16

function linePath(t: number, amp: number) {
  let d = ""
  for (let x = 0; x <= LINE_W; x += 0.5) {
    const env = Math.sin((Math.PI * x) / LINE_W) ** 2 // still at the ends
    // Two soft, wide waves (about 1½ and 2½ across), so it flows instead of jittering.
    const wave = 0.65 * Math.sin(x * 0.43 + t * 6) + 0.35 * Math.sin(x * 0.71 - t * 4.2)
    const y = LINE_H / 2 + amp * env * wave
    d += `${x ? "L" : "M"}${x} ${y.toFixed(2)}`
  }
  return d
}

export function VoiceLine({ pulse }: { pulse: string }) {
  const pathRef = React.useRef<SVGPathElement>(null)
  const energy = React.useRef(1) // opens loud, as the mic starts

  React.useEffect(() => {
    energy.current = 1
  }, [pulse])

  React.useEffect(() => {
    const path = pathRef.current
    if (!path) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.setAttribute("d", linePath(0.3, 4))
      return
    }
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      energy.current = Math.max(0.28, energy.current - dt * 1.4) // a pause settles in about half a second
      path.setAttribute("d", linePath(now / 1000, 7 * energy.current))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg aria-hidden width={LINE_W} height={LINE_H} viewBox={`-1 0 ${LINE_W + 2} ${LINE_H}`} fill="none">
      <path ref={pathRef} d={linePath(0, 0)} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

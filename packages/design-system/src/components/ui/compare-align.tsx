"use client"

/**
 * CompareAlign — keeps every comparison row level, whatever the prices.
 *
 * The rule (AGENTS.md, "Side-by-side choices compare one to one"): across
 * the cards of a row, prices sit on one line, their notes on one line and
 * the CTAs on one line. Static layout can't promise that once a price grows
 * ("₹9,999 ₹15,378 35% OFF" outgrows a 248px card and its % tag wraps, in
 * that card only). This component makes it hold for any numbers:
 *
 *   1. Wrapping is decided per row, not per card. If ONE card's price row
 *      wraps, every card in that row gets `data-compare-stack`, which puts
 *      the % tag on its own line under the price in all of them
 *      (styles/index.css). Same layout across the row, never a mix.
 *   2. Each marked line (`data-compare="price"`, `"price-suffix"`, `"cta"`,
 *      …) gets the row's tallest height as its min-height, so a card with
 *      no tag (the Unlimited card) reserves the line its siblings use.
 *
 * Cards are grouped the way `scripts/check-alignment.js` groups them: cards
 * that sit side by side on screen, so it works across containers (the job
 * credit grid and the Unlimited card) and switches off when cards stack on
 * phones. It re-measures when a card changes size (viewport, fonts) or the
 * content inside one changes (the 10% offer, the slot picker). Everything
 * runs in one frame: reset, measure, write — no flash of the wrong layout.
 *
 * PricingCard, the Subscription plan cards and OfferChoice already carry
 * the marks; a new comparison surface adds `data-compare-card` and
 * `data-compare="…"` the same way and is aligned for free.
 *
 * Usage (root layout, once):
 *   <CompareAlign />
 *
 * Renders nothing.
 */

import * as React from "react"

const CARD = "[data-compare-card]"
const STACK = "data-compare-stack"
const SYNCED = "data-compare-synced"

const visible = (el: Element) => {
  const r = el.getBoundingClientRect()
  return r.width > 0 && r.height > 0
}

/** The card's own marked lines (not those of a card nested inside it). */
const ownLines = (card: Element) =>
  [...card.querySelectorAll<HTMLElement>("[data-compare]")].filter(
    (el) => el.closest(CARD) === card && visible(el)
  )

/** A price row wrapped when one of its items starts below the first one. */
function wraps(row: HTMLElement) {
  const style = getComputedStyle(row)
  if (!style.display.includes("flex") || style.flexWrap !== "wrap") return false
  const items = [...row.children].filter(visible)
  if (items.length < 2) return false
  const first = items[0].getBoundingClientRect()
  return items.slice(1).some((item) => item.getBoundingClientRect().top >= first.bottom - 1)
}

/** Cards side by side: they overlap vertically by at least half of the
 *  shorter one and don't overlap horizontally. */
function sideBySide(a: Element, b: Element) {
  const ra = a.getBoundingClientRect()
  const rb = b.getBoundingClientRect()
  const shared = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
  return shared >= 0.5 * Math.min(ra.height, rb.height) && (ra.right <= rb.left || rb.right <= ra.left)
}

function align() {
  const cards = [...document.querySelectorAll<HTMLElement>(CARD)]

  // Reset to the natural layout, then decide from that.
  for (const card of cards) card.removeAttribute(STACK)
  for (const line of document.querySelectorAll<HTMLElement>(`[${SYNCED}]`)) {
    line.style.minHeight = ""
    line.removeAttribute(SYNCED)
  }

  const rows: HTMLElement[][] = []
  for (const card of cards.filter(visible)) {
    const row = rows.find((r) => r.some((c) => sideBySide(c, card)))
    if (row) row.push(card)
    else rows.push([card])
  }

  const sideRows = rows.filter((r) => r.length > 1)
  for (const row of sideRows) {
    const anyWraps = row.some((card) =>
      ownLines(card).some((line) => line.dataset.compare === "price" && wraps(line))
    )
    if (anyWraps) for (const card of row) card.setAttribute(STACK, "")
  }

  // Measure every row first, then write, so layout is forced once.
  const writes: [HTMLElement, number][] = []
  for (const row of sideRows) {
    const byKey = new Map<string, HTMLElement[]>()
    for (const card of row) {
      for (const line of ownLines(card)) {
        const key = line.dataset.compare!
        byKey.set(key, [...(byKey.get(key) ?? []), line])
      }
    }
    for (const lines of byKey.values()) {
      if (lines.length < 2) continue
      const heights = lines.map((l) => l.getBoundingClientRect().height)
      const tallest = Math.max(...heights)
      lines.forEach((line, i) => {
        if (tallest - heights[i] > 0.5) writes.push([line, tallest])
      })
    }
  }
  for (const [line, height] of writes) {
    line.style.minHeight = `${height}px`
    line.setAttribute(SYNCED, "")
  }
}

/** Does this mutation touch a comparison card (or add one)? */
function concernsCards(m: MutationRecord) {
  const target = m.target instanceof Element ? m.target : m.target.parentElement
  if (target?.closest(CARD)) return true
  return [...m.addedNodes, ...m.removedNodes].some(
    (n) => n instanceof Element && (n.matches(CARD) || n.querySelector(CARD))
  )
}

function CompareAlign() {
  React.useEffect(() => {
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        align()
        observeCards()
      })
    }

    // Observing a new element fires once straight away; observe each card
    // only once, or every run would schedule the next.
    const observed = new WeakSet<Element>()
    const resize = new ResizeObserver(schedule)
    const observeCards = () => {
      for (const card of document.querySelectorAll(CARD)) {
        if (observed.has(card)) continue
        observed.add(card)
        resize.observe(card)
      }
    }

    // Our own writes are attributes and styles, which this doesn't watch,
    // so aligning never re-triggers itself.
    const mutations = new MutationObserver((records) => {
      if (records.some(concernsCards)) schedule()
    })
    mutations.observe(document.body, { childList: true, subtree: true, characterData: true })

    schedule()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}

export { CompareAlign }

"use client"

/**
 * useCardHover — desktop plan cards: true while the card is hovered or has
 * focus inside it. Its CTA is the quiet outline at rest and turns the green
 * primary while active, so at most one green shows (AGENTS.md, the
 * one-primary rule). Spread `props` on the card's wrapper.
 *
 * The recommended card's edge goes with it: RECOMMENDED_EDGE.
 */

import * as React from "react"

export function useCardHover() {
  const [active, setActive] = React.useState(false)
  const props = {
    onPointerEnter: () => setActive(true),
    onPointerLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(false)
    },
  }
  return { active, props }
}

/** The recommended plan's edge: the Recommended ribbon's blue, 2px (border +
 *  outline), so the card size never shifts. An outline, not a ring: the
 *  hover lift replaces box-shadow, which would drop a ring and make the
 *  edge and the ribbon jump. */
export const RECOMMENDED_EDGE = "border-ribbon-fill outline outline-ribbon-fill"

/** For cards drawn in a loop: a wrapper that tracks its own hover and hands
 *  `active` to its children. */
export function CardHover({
  className,
  children,
}: {
  className?: string
  children: (active: boolean) => React.ReactNode
}) {
  const { active, props } = useCardHover()
  return (
    <div className={className ?? "flex flex-col"} {...props}>
      {children(active)}
    </div>
  )
}

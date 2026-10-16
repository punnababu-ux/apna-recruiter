/**
 * HeroBackdrop — the homepage hero's living background (AmbientBackdrop),
 * running over the page's existing gradient.
 *
 * Starts 4rem above the hero so it also sits behind the transparent header
 * at the top of the page (no seam where the header ends).
 */

import { AmbientBackdrop } from "@apna/design-system"

export function HeroBackdrop() {
  return <AmbientBackdrop className="inset-x-0 -top-16 bottom-0" />
}

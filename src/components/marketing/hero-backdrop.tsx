/**
 * HeroBackdrop — the homepage hero's living background (AmbientBackdrop),
 * running over the page's existing gradient.
 *
 * Starts 4.5rem (the header's 72px) above the hero so it also sits behind the header
 * at the top of the page (no seam where the header ends).
 */

import { AmbientBackdrop } from "@apna/design-system"

export function HeroBackdrop() {
  return <AmbientBackdrop className="inset-x-0 -top-18 bottom-0" />
}

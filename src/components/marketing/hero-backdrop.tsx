"use client"

/**
 * HeroBackdrop — the homepage hero's living background (AmbientBackdrop),
 * running over the page's existing gradient.
 *
 * Starts 4rem above the hero so it also sits behind the transparent header
 * at the top of the page (no seam where the header ends).
 *
 * TEMPORARY: the prototype gear (bottom-left) switches Live / Static so the
 * motion can be judged against the original. Remove the switch once the
 * look is signed off.
 */

import * as React from "react"
import { AmbientBackdrop } from "@apna/design-system"
import { PrototypeOption, PrototypeSection, PrototypeSettings } from "@/components/apnahire/prototype-settings"

export function HeroBackdrop() {
  const [live, setLive] = React.useState(true)

  return (
    <>
      {live && <AmbientBackdrop className="inset-x-0 -top-16 bottom-0" />}
      <PrototypeSettings label="Preview settings">
        <PrototypeSection title="Hero background">
          <PrototypeOption active={live} onClick={() => setLive(true)}>
            Live
          </PrototypeOption>
          <PrototypeOption active={!live} onClick={() => setLive(false)}>
            Static (current)
          </PrototypeOption>
        </PrototypeSection>
      </PrototypeSettings>
    </>
  )
}

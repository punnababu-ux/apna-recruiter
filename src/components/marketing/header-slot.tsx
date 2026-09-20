"use client"

/**
 * HeaderSlot — lets a page publish a secondary bar into `SiteHeader`.
 *
 * `SiteHeader` renders in `(marketing)/layout.tsx`, above every page in the
 * tree. A page that needs a secondary bar under it — the pricing tab
 * switcher, so far the only case — can't hand it down as a prop, because
 * layouts don't take props from the pages they wrap. It has to go up
 * instead, and context is the standard way to do that in the App Router.
 *
 * Split into two contexts on purpose. A single context holding `{ slot,
 * setSlot }` would re-render every consumer whenever `slot` changes —
 * including the page that just called `setSlot`, which would then re-run
 * its effect and call `setSlot` again on every render. Splitting the setter
 * (referentially stable, from `useState`) from the value means the
 * publishing page only touches the setter context and never re-renders
 * because of its own publish.
 */

import * as React from "react"

export interface HeaderSlotState {
  subNav: React.ReactNode
  showSubNav: boolean
}

const HeaderSlotValueContext = React.createContext<HeaderSlotState | null>(null)
const HeaderSlotSetterContext = React.createContext<
  React.Dispatch<React.SetStateAction<HeaderSlotState | null>> | null
>(null)

export function HeaderSlotProvider({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = React.useState<HeaderSlotState | null>(null)
  return (
    <HeaderSlotSetterContext.Provider value={setSlot}>
      <HeaderSlotValueContext.Provider value={slot}>
        {children}
      </HeaderSlotValueContext.Provider>
    </HeaderSlotSetterContext.Provider>
  )
}

/** `SiteHeader` only — the currently published slot, or none. */
export function useHeaderSlotValue() {
  return React.useContext(HeaderSlotValueContext)
}

/**
 * Publish `subNav` into the header for as long as the caller is mounted, and
 * clear it on unmount. Pass `null` to publish nothing (the default state).
 */
export function useHeaderSlot(subNav: React.ReactNode, showSubNav: boolean) {
  const setSlot = React.useContext(HeaderSlotSetterContext)

  React.useEffect(() => {
    setSlot?.(subNav ? { subNav, showSubNav } : null)
    return () => setSlot?.(null)
  }, [setSlot, subNav, showSubNav])
}

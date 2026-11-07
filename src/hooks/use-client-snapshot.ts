"use client"

import * as React from "react"

/** A value that only exists in the browser (storage, the URL).
 *  The server and the first paint use `server`. After that, `read` runs once
 *  for this component and is kept. `server` must be a stable value: a
 *  boolean, null, or a constant declared outside the component. */
export function useClientSnapshot<T>(read: () => T, server: T): T {
  const cache = React.useRef<{ value: T } | null>(null)
  return React.useSyncExternalStore(
    subscribe,
    () => {
      if (!cache.current) cache.current = { value: read() }
      return cache.current.value
    },
    () => server,
  )
}

function subscribe() {
  return () => {}
}

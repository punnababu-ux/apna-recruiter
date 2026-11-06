"use client"

import * as React from "react"

/** Create a useRef-based monotonic ID generator that resets with the component. */
export function useIdGenerator(prefix: string) {
  const counter = React.useRef(0)
  return React.useCallback(() => {
    counter.current += 1
    return `${prefix}-${counter.current}`
  }, [prefix])
}

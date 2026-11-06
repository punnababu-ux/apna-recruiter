"use client"

import * as React from "react"

export const MAX_QA = 15

/** Create a useRef-based monotonic ID generator scoped to a component instance. */
export function useIdGen(prefix: string) {
  const counter = React.useRef(0)
  return React.useCallback(() => {
    counter.current += 1
    return `${prefix}-${counter.current}`
  }, [prefix])
}

export type Draft = { key: string; question: string; answer: string }

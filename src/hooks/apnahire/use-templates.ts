"use client"

/**
 * useTemplates — the canned responses (TEMPLATES) plus the ones the recruiter
 * saved this session under "Mine". One shared in-memory list, like useChats:
 * every thread's picker reads the same state. Saved ones are lost on reload
 * (prototype, no API).
 */

import * as React from "react"
import { TEMPLATES, type ChatTemplate } from "@/content/chats"

let mine: ChatTemplate[] = []
let all: ChatTemplate[] = TEMPLATES
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** The name shown in the picker for a saved text: its first words. */
function labelFor(text: string) {
  const one = text.replace(/\s+/g, " ").trim()
  return one.length > 36 ? `${one.slice(0, 35).trimEnd()}…` : one
}

export function useTemplates() {
  const templates = React.useSyncExternalStore(subscribe, () => all, () => TEMPLATES)
  return {
    templates,
    /** Saves the text under "Mine". The same text twice is kept once. Returns false when there is nothing to save. */
    save: React.useCallback((text: string) => {
      const clean = text.trim()
      if (!clean) return false
      if (!mine.some((t) => t.text === clean)) {
        mine = [{ id: `mine-${Date.now()}`, group: "Mine", label: labelFor(clean), text: clean }, ...mine]
        all = [...TEMPLATES, ...mine]
        listeners.forEach((l) => l())
      }
      return true
    }, []),
  }
}

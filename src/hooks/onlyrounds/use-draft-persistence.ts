"use client"

import * as React from "react"
import { toast } from "sonner"

/**
 * Persist a wizard form to localStorage and reload it on mount.
 * Returns the form state, a setter, and a dirty flag.
 *
 * @param key    localStorage key
 * @param empty  Factory value used when no draft exists and as the clean baseline.
 */
export function useDraftPersistence<T>(
  key: string,
  empty: T,
): {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  isDirty: boolean
  persistDraft: (form: T) => void
  clearDraft: () => void
} {
  const [form, setForm] = React.useState<T>(empty)
  const [lastSavedJson, setLastSavedJson] = React.useState<string>(
    () => JSON.stringify(empty),
  )

  // Load draft once on the client.
  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return
      const draft = { ...(empty as object), ...(JSON.parse(raw) as Partial<T>) } as T
      setForm(draft)
      setLastSavedJson(JSON.stringify(draft))
      toast.info("Loaded your saved draft", {
        description: "Pick up where you left off.",
      })
    } catch {
      // Corrupt / missing draft — silent.
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const isDirty = React.useMemo(
    () => JSON.stringify(form) !== lastSavedJson,
    [form, lastSavedJson],
  )

  const persistDraft = React.useCallback(
    (next: T) => {
      if (typeof window === "undefined") return
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
        setLastSavedJson(JSON.stringify(next))
      } catch {
        // Quota exceeded / disabled — silently ignore.
      }
    },
    [key],
  )

  const clearDraft = React.useCallback(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Silent.
    }
  }, [key])

  return { form, setForm, isDirty, persistDraft, clearDraft }
}

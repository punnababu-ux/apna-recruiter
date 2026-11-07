"use client"

import * as React from "react"
import { toast } from "sonner"
import { useClientSnapshot } from "@/hooks/use-client-snapshot"

/**
 * Persist a wizard form to localStorage and reload it on mount.
 * Returns the form state, a setter, and a dirty flag.
 *
 * @param key    localStorage key
 * @param empty  Factory value used when no draft exists and as the clean baseline.
 * @param ask    Don't load a saved draft by itself: hold it in `pending`
 *               until the caller resumes or discards it (e.g. "Continue your
 *               draft or start new?").
 */
export function useDraftPersistence<T>(
  key: string,
  empty: T,
  { ask = false }: { ask?: boolean } = {},
): {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  isDirty: boolean
  persistDraft: (form: T) => void
  clearDraft: () => void
  /** True once the saved draft (if any) has been read. Auto-save must wait
   *  for this, or it overwrites the saved draft with the empty baseline. */
  hydrated: boolean
  /** With `ask`: a saved draft waiting for resume / discard. */
  pending: T | null
  resume: () => void
  discard: () => void
} {
  type Loaded = { hydrated: true; form: T; json: string; pending: T | null; hadDraft: boolean }
  const loaded = useClientSnapshot<Loaded | null>(() => {
    const blank = JSON.stringify(empty)
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return { hydrated: true, form: empty, json: blank, pending: null, hadDraft: false }
      const draft = { ...(empty as object), ...(JSON.parse(raw) as Partial<T>) } as T
      if (ask) return { hydrated: true, form: empty, json: blank, pending: draft, hadDraft: true }
      return { hydrated: true, form: draft, json: JSON.stringify(draft), pending: null, hadDraft: true }
    } catch {
      return { hydrated: true, form: empty, json: blank, pending: null, hadDraft: false }
    }
  }, null)

  const [form, setForm] = React.useState<T>(empty)
  const [lastSavedJson, setLastSavedJson] = React.useState<string>(() => JSON.stringify(empty))
  const [pending, setPending] = React.useState<T | null>(null)
  const [appliedKey, setAppliedKey] = React.useState<string | null>(null)
  if (loaded && appliedKey !== key) {
    setAppliedKey(key)
    setPending(loaded.pending)
    if (!loaded.pending) {
      setForm(loaded.form)
      setLastSavedJson(loaded.json)
    }
  }
  const hydrated = loaded !== null

  React.useEffect(() => {
    if (!loaded?.hadDraft || loaded.pending) return
    // A fixed id: this runs twice in dev (StrictMode), but the toast shows once.
    toast.info("Loaded your saved draft", {
      id: `draft-loaded:${key}`,
      description: "Pick up where you left off.",
    })
  }, [loaded, key])

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

  const resume = React.useCallback(() => {
    if (!pending) return
    setForm(pending)
    setLastSavedJson(JSON.stringify(pending))
    setPending(null)
  }, [pending])

  const discard = React.useCallback(() => {
    clearDraft()
    setPending(null)
  }, [clearDraft])

  return { form, setForm, isDirty, persistDraft, clearDraft, hydrated, pending, resume, discard }
}

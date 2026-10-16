"use client"

/**
 * useSession — who is signed in, for the prototype.
 *
 *   { kind: "phone", phone }          mobile number + OTP (SMB recruiters; a
 *                                      new number signs up on the spot)
 *   { kind: "enterprise", email }     email + password (accounts are created
 *                                      by the company's admin, never here)
 *   null                              signed out
 *
 * Kept in localStorage so every tab and page agrees, like
 * useActiveSubscription. In production this is the real auth session.
 */

import * as React from "react"

export type Session =
  | { kind: "phone"; phone: string }
  | { kind: "enterprise"; email: string }

const STORAGE_KEY = "apnahire:session"
const EVENT = "apnahire:session"

let cachedRaw: string | null | undefined
let cached: Session | null = null

function read(): Session | null {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    raw = null
  }
  // Same object for the same stored value: useSyncExternalStore needs a
  // stable snapshot.
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cached = raw ? (JSON.parse(raw) as Session) : null
    } catch {
      cached = null
    }
  }
  return cached
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

/** Set by signOut: a deliberate log-out, so the page guard lets the
 *  caller's own navigation (home) win instead of redirecting to login. */
let loggingOut = false
export const isLoggingOut = () => loggingOut

export function signIn(session: Session) {
  loggingOut = false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Storage blocked — the session lasts until reload.
  }
  window.dispatchEvent(new Event(EVENT))
}

export function signOut() {
  loggingOut = true
  // Long enough for the caller's navigation to land; after that the guard
  // is back on (a later visit to the app goes to login as usual).
  window.setTimeout(() => {
    loggingOut = false
  }, 1500)
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nothing stored
  }
  window.dispatchEvent(new Event(EVENT))
}

/** `undefined` until the browser has been read (server render, first
 *  hydration pass), then the session or `null`. */
export function useSession(): Session | null | undefined {
  return React.useSyncExternalStore(subscribe, read, () => undefined)
}

/** Where login was asked for, so it can return there. Only same-site paths. */
export function safeNext(next: string | null | undefined, fallback: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback
}

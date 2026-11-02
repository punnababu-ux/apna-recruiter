"use client"

/**
 * usePriceLayout — the prototype switch for self-checkout's phone job
 * credit prices:
 *
 *   inline is live (user call, 2026-11-02), both checkouts.
 *   badge   was live V14: struck price + price, the % OFF pill under them, the
 *           per-credit price in green under the validity.
 *   inline  preview (user call, 2026-11-02): "−22%" as plain text on the
 *           price line, a smaller price, the per-credit price under it in
 *           blue, level with the validity.
 *   below   preview (user call, 2026-11-02): the price row as live, plain
 *           "−22%" under it instead of the pill, the per-credit price under
 *           the validity in blue.
 *   cta     preview (user call, 2026-11-02): "inline", with the per-credit
 *           price under the validity in blue and a small outline "Buy now"
 *           under every price, the Unlimited card's too.
 *   cta-outline  preview, self-checkout (user call, 2026-11-02): "cta" with an
 *           outline (secondary) "Buy" in place of the green one.
 *
 * Set from the preview settings ("Phone job credit prices") or `?price=inline`
 * `?price=below` or `?price=cta` (wins over the stored choice); remembered in this browser. Remove with
 * PrototypeSettings before production, keeping the chosen layout.
 */

import * as React from "react"

export type PriceLayout = "badge" | "inline" | "below" | "cta" | "cta-outline"

const KEY = "apnahire:price-layout"
const EVENT = "apnahire:price-layout"

function read(): PriceLayout {
  try {
    const flag = new URLSearchParams(window.location.search).get("price")
    const stored = window.localStorage.getItem(KEY)
    for (const v of [flag, stored]) if (v === "inline" || v === "below" || v === "cta" || v === "cta-outline" || v === "badge") return v
    return "inline"
  } catch {
    return "inline"
  }
}

function subscribe(notify: () => void) {
  window.addEventListener(EVENT, notify)
  window.addEventListener("storage", notify)
  return () => {
    window.removeEventListener(EVENT, notify)
    window.removeEventListener("storage", notify)
  }
}

export function usePriceLayout(): PriceLayout {
  return React.useSyncExternalStore(subscribe, read, () => "inline")
}

export function setPriceLayout(next: PriceLayout) {
  try {
    window.localStorage.setItem(KEY, next)
    // The address wins over the stored choice, so drop a stale ?price=.
    const url = new URL(window.location.href)
    if (url.searchParams.has("price")) {
      url.searchParams.delete("price")
      window.history.replaceState(null, "", url)
    }
  } catch {
    // Storage blocked: the switch just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

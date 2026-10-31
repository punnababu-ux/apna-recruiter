"use client"

/**
 * useCheckoutVersion — which design version of the two checkouts (express
 * and self-checkout) to show, so versions can be compared side by side.
 *
 *   v1  frozen 2026-10-30: phone plan cards with the feature line and corner
 *       tabs (tick, Recommended), Unlimited as its own Buy now card, the
 *       pinned 10% strip with its countdown, self-checkout's white bar and
 *       tab strip that hides on scroll, "Select a job type" (renamed 2026-10-30, all versions).
 *  v2  V1 plus, in self-checkout only: the phone tab strip uses standard
 *      underline tabs (Tabs `line`) instead of the pill chips, and the
 *      claimed 10% is a solid green success banner above the tab's heading
 *      instead of the strip in the header. Express: the same 10% banner
 *      (above "Single job posting stays active for 15 days"); otherwise as V1.
 *  v3  V2 plus, in both checkouts: the phone Unlimited card loses its dark
 *      frame. A white card with a 2px plum edge, "apna Unlimited" as a
 *      corner tab like "Recommended". Self-checkout's Enterprise tab on
 *      phones: one comparison table (a column per plan, each feature named
 *      once, what every plan shares said once as the subtitle) instead of
 *      4 cards.
 *  v4  V3 plus, in express checkout's job cards on phones: the features as
 *      signals instead of text. A key above the cards names four columns
 *      once (Visibility · WhatsApp · Urgently hiring tag · Top placement); each card
 *      shows signal bars for visibility and WhatsApp reach, and the urgent
 *      and top-placement icons lit or faded. Under each name, who it's for
 *      ("Higher visibility, for faster hiring"); no feature text.
 *  v5  V4 plus, every phone plan card in both checkouts: the selection tick
 *      is a small green circle inside the card's top-right corner instead
 *      of the corner tab.
 *  v6  built on V1, not V5: on phones, in both checkouts, no card has a
 *      selected state or a button and there is no sticky buy bar. A tap on
 *      a card opens its order summary (Enterprise: contact sales).
 *  v7  V6 plus, in express checkout's job cards on phones: each card's
 *      feature line opens with its boost (Classic 1x, Premium 2x, Super
 *      premium 3x), and the visibility line's ticks become antenna bars.
 *  v8  V6 plus the same boost item, but its icon is the antenna bars (1, 2,
 *      3) and its label "1x boost" / "2x boost" / "3x boost"; the
 *      visibility line keeps V6's ticks.
 *  v9  V6 plus, in self-checkout on phones: V2's underline tab strip
 *      (`lineTabs`) instead of the pill chips. Nothing else from V2.
 *  v10 V6 plus, in express job cards on phones: the visibility line shows
 *      antenna bars (1, 2, 3) and says the boost ("2x boost, for faster
 *      hiring"; Super premium is 4x).
 *  v11 FINAL 2026-10-30, express checkout's default (EXPRESS_DEFAULT), phones
 *      and desktop. Desktop: the same panel, cards and Unlimited card as
 *      phones (one fact a line; desktop keeps the word WhatsApp).
 *      V10 plus, in express on phones: the three job types sit together in
 *      one panel titled "Single job posting" (the desktop frame), apart
 *      from the subscription card.
 *  v12 V11 plus: the Unlimited card's "Dynamic visibility" pulse is blue
 *      (`text-info`, as Top placement) instead of V11's violet, to compare.
 *  v13 V11 plus, in self-checkout's Jobs tab on phones: the 3, 6 and 13
 *      credit packs in one panel ("Job credit packages", as express V11's
 *      job types), with "What 1 job credit will get you?" and "Buy 1 job
 *      credit" inside it, under the cards.
 *  v14 FINAL 2026-10-31, self-checkout's default (SELF_DEFAULT). V13 plus
 *      V9's underline tabs on self-checkout's phone tab strip.
 *
 * A new version adds an entry here, then branches where it differs:
 * `if (versionAtLeast(useCheckoutVersion(), "v2")) …` (a later version
 * keeps the earlier ones' changes). V1's code
 * stays as it is, so it can always be shown again.
 *
 * Chosen from the hidden preview settings (CheckoutVersionControls, both
 * checkouts) and remembered in this browser; `?v=v2` in the address
 * overrides it for that tab, so two tabs can show two versions. A
 * prototype control: remove with PrototypeSettings before production,
 * keeping the chosen version.
 */

import * as React from "react"

export type CheckoutVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8" | "v9" | "v10" | "v11" | "v12" | "v13" | "v14"

export const CHECKOUT_VERSIONS: { value: CheckoutVersion; label: string }[] = [
  { value: "v1", label: "V1 · frozen Oct 30" },
  { value: "v2", label: "V2 · underline tabs, 10% banner" },
  { value: "v3", label: "V3 · V2 + Unlimited corner tab, Enterprise table" },
  { value: "v4", label: "V4 · V3 + express job cards as signals" },
  { value: "v5", label: "V5 · V4 + tick as a circle" },
  { value: "v6", label: "V6 · V1, tap a card to buy (no bar, no selection)" },
  { value: "v7", label: "V7 · V6 + 1x/2x/3x boost on job cards" },
  { value: "v8", label: "V8 · V6 + boost with antenna bars" },
  { value: "v9", label: "V9 · V6 + underline tabs" },
  { value: "v10", label: "V10 · V6 + bars and boost in the visibility line" },
  { value: "v11", label: "V11 · frozen Oct 30, express default" },
  { value: "v12", label: "V12 · V11 + blue pulse for dynamic visibility" },
  { value: "v13", label: "V13 · V11 + self-checkout packs grouped" },
  { value: "v14", label: "V14 · final Oct 31, self-checkout default" },
]

const KEY = "apnahire:checkout-version"
const EVENT = "apnahire:checkout-version"
const FALLBACK: CheckoutVersion = "v1"
/** Express checkout (the job-posting plan step) opens on V11, frozen
 *  2026-10-30; self-checkout (/apnahire/credits) on V14, final 2026-10-31
 *  (user calls). Every other page stays on V1. */
const EXPRESS_DEFAULT: CheckoutVersion = "v11"
const SELF_DEFAULT: CheckoutVersion = "v14"
const pageDefault = () => {
  const path = window.location.pathname
  if (path.startsWith("/apnahire/jobs")) return EXPRESS_DEFAULT
  if (path.startsWith("/apnahire/credits")) return SELF_DEFAULT
  return FALLBACK
}

const known = (v: string | null) => CHECKOUT_VERSIONS.find((o) => o.value === v)?.value

function read(): CheckoutVersion {
  try {
    return known(new URLSearchParams(window.location.search).get("v")) ?? known(window.localStorage.getItem(KEY)) ?? pageDefault()
  } catch {
    return pageDefault()
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

/** What each version is built from (itself last). V2–V5 stack on each
 *  other; V6 starts again from V1. */
const LINEAGE: Record<CheckoutVersion, CheckoutVersion[]> = {
  v1: ["v1"],
  v2: ["v1", "v2"],
  v3: ["v1", "v2", "v3"],
  v4: ["v1", "v2", "v3", "v4"],
  v5: ["v1", "v2", "v3", "v4", "v5"],
  v6: ["v1", "v6"],
  v7: ["v1", "v6", "v7"],
  v8: ["v1", "v6", "v8"],
  v9: ["v1", "v6", "v9"],
  v10: ["v1", "v6", "v10"],
  v11: ["v1", "v6", "v10", "v11"],
  v12: ["v1", "v6", "v10", "v11", "v12"],
  v13: ["v1", "v6", "v10", "v11", "v13"],
  v14: ["v1", "v6", "v10", "v11", "v13", "v14"],
}

/** True when `version` includes `min`'s changes (it is `min`, or built on it). */
export const versionAtLeast = (version: CheckoutVersion, min: CheckoutVersion) => LINEAGE[version].includes(min)

/** Self-checkout's phone tab strip as underline tabs: V2 (and later), V9, V14. */
export const lineTabs = (version: CheckoutVersion) =>
  versionAtLeast(version, "v2") || versionAtLeast(version, "v9") || versionAtLeast(version, "v14")

export function useCheckoutVersion(): CheckoutVersion {
  return React.useSyncExternalStore(subscribe, read, () => FALLBACK)
}

export function setCheckoutVersion(next: CheckoutVersion) {
  try {
    window.localStorage.setItem(KEY, next)
    // The address wins over the stored choice, so drop a stale ?v=.
    const url = new URL(window.location.href)
    if (url.searchParams.has("v")) {
      url.searchParams.delete("v")
      window.history.replaceState(null, "", url)
    }
  } catch {
    // Storage blocked: the switch just won't persist.
  }
  window.dispatchEvent(new Event(EVENT))
}

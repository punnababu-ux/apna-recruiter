import { readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

export const EXPRESS = "/apnahire/jobs/new/plans"
export const SELF = "/apnahire/credits"
export const JOB_POST = "/apnahire/jobs/new"

type Seed = {
  /** The 10% exit offer already claimed. */
  offer?: boolean
  /** Had the offer before: exit pop-ups give no discount. */
  returning?: boolean
}

/**
 * Signs in and fixes the state every run starts from (the same seed as
 * scripts/capture-handoff.mjs): a phone session, a job draft, today's
 * pricing phase, the order-summary animation already played.
 */
export async function open(page: Page, path: string, { offer = false, returning = false }: Seed = {}) {
  await page.addInitScript(
    ({ offer, returning }) => {
      if (sessionStorage.getItem("e2e:init")) return
      sessionStorage.setItem("e2e:init", "1")
      localStorage.clear()
      localStorage.setItem("apnahire:session", JSON.stringify({ kind: "phone", phone: "9876543210" }))
      localStorage.setItem(
        "apnahire:job-draft",
        JSON.stringify({ draft: { title: "Delivery executive", city: "Bengaluru", locationType: "office" } }),
      )
      localStorage.setItem("apnahire:pricing-phase", "today")
      sessionStorage.setItem("top-up-credits:played", "1")
      // A fixed deadline keeps the offer countdown text stable between runs.
      if (offer) localStorage.setItem("apna:extra-off-deadline", String(Date.now() + 86_399_000 - 48_000))
      if (returning) localStorage.setItem("apna:returning-recruiter", "1")
    },
    { offer, returning },
  )
  // On every load, reloads included: the Next dev badge sits over bottom-left buttons on phones,
  // and the text caret blinks between screenshots.
  await page.addInitScript(() => {
    const style = () => {
      const s = document.createElement("style")
      s.textContent = "nextjs-portal{display:none!important} *{caret-color:transparent!important}"
      document.head.appendChild(s)
    }
    if (document.head) style()
    else document.addEventListener("DOMContentLoaded", style)
  })
  await page.goto(path, { waitUntil: "networkidle" })
  await page.waitForTimeout(800)
}

export const settle = (page: Page, ms = 600) => page.waitForTimeout(ms)

/** The hidden prototype panel (a silent tap on the GST note), then pick each option by its label. */
export async function prototype(page: Page, ...options: string[]) {
  await page.getByText("*GST applicable", { exact: true }).filter({ visible: true }).first().click()
  await settle(page)
  for (const o of options) {
    await page.getByText(o, { exact: true }).filter({ visible: true }).first().click()
    await settle(page)
  }
  await page.keyboard.press("Escape")
  await settle(page)
}

export const SUBSCRIPTION_LAYOUT = "Subscription (3 plans + monthly)"

/** Nothing pokes out sideways: the page never scrolls horizontally. Names the first elements past the edge. */
export async function expectNoHorizontalOverflow(page: Page, label = "page") {
  // clientWidth, not innerWidth: on a touch viewport wide content zooms the layout out and
  // innerWidth grows with it, so the difference would always read 0.
  const { over, culprits } = await page.evaluate(() => {
    const width = document.documentElement.clientWidth
    // Content inside a clipping ancestor (a marquee) can't widen the page, so it is never the culprit.
    const clipped = (el: HTMLElement) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        if (getComputedStyle(a).overflowX !== "visible") return true
      }
      return false
    }
    const culprits = [...document.body.querySelectorAll<HTMLElement>("*")]
      .filter((el) => el.getBoundingClientRect().right > width + 0.5 && getComputedStyle(el).position !== "fixed")
      .filter((el) => !clipped(el))
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)
    return { over: document.documentElement.scrollWidth - width, culprits }
  })
  expect(over, `${label}: wider than the screen (${culprits.join(", ")})`).toBeLessThanOrEqual(0)
}

/**
 * No collapsed CTA: every sized button is at least 24px (the `xs` sizes).
 * Link variants have no min-height (they are one line of text by design), so they're skipped.
 */
export async function expectNoCollapsedButtons(page: Page, min = 24) {
  const collapsed = await page.evaluate((min) => {
    return [...document.querySelectorAll<HTMLElement>("[data-slot=button]")]
      .filter((b) => {
        const r = b.getBoundingClientRect()
        const cs = getComputedStyle(b)
        const sized = parseFloat(cs.minHeight) > 0
        return sized && r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && r.height < min
      })
      .map((b) => `${(b.textContent ?? b.getAttribute("aria-label") ?? "").trim().slice(0, 30)} (${Math.round(b.getBoundingClientRect().height)}px)`)
  }, min)
  expect(collapsed, "buttons shorter than their size allows").toEqual([])
}

const alignmentScript = readFileSync(join(__dirname, "../scripts/check-alignment.js"), "utf8")

/** AGENTS.md "Side-by-side choices compare one to one": prices, notes and CTAs level across a row. */
export async function expectCardsAligned(page: Page) {
  const result = (await page.evaluate(alignmentScript)) as { ok: boolean; problems: string[] }
  expect(result.problems, "card lines not level").toEqual([])
}

/**
 * axe on the page, WCAG 2.1 A and AA. Known product-wide issues are passed in
 * `skip` with a reason at the call site, so they stay visible, not silenced.
 */
export async function expectAccessible(page: Page, { skip = [] as string[], include }: { skip?: string[]; include?: string } = {}) {
  let axe = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).exclude("nextjs-portal")
  if (include) axe = axe.include(include)
  if (skip.length) axe = axe.disableRules(skip)
  const { violations } = await axe.analyze()
  const summary = violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× ${v.help}`)
  expect(summary, "accessibility violations").toEqual([])
}

import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { EXPRESS, JOB_POST, SELF, SUBSCRIPTION_LAYOUT as SUB, open, prototype, settle } from "./helpers"

/**
 * Known axe violations, found 2026-11-06 in light mode. Each entry names ONE shared cause, so it is
 * matched per node (against the node's selector + html), not per rule: the same rule failing on any
 * other element still fails the test, and so does a known cause that spreads to a new rule.
 * `nodes` is the most nodes one page shows (phone / desktop). Fix the cause, then delete the entry.
 */
type Known = { rule: string; match: RegExp; nodes: string; what: string }

const KNOWN: Known[] = []

const isDesktop = () => test.info().project.name === "desktop"

/** axe (WCAG 2.1 A/AA) on the page; fails on every node that is not a KNOWN one, as `id (impact): target`. */
async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("nextjs-portal")
    .analyze()
  const fresh = violations.flatMap((v) =>
    v.nodes
      .filter((n) => !KNOWN.some((k) => k.rule === v.id && k.match.test(`${n.target.join(" ")} ${n.html}`)))
      .map((n) => `${v.id} (${v.impact}): ${n.target.join(" ")} — ${n.html.slice(0, 120)}`),
  )
  expect(fresh, "new accessibility violations (not in KNOWN)").toEqual([])
}

/** The card holding `title`: click its CTA. Same lookup as scripts/capture-handoff.mjs. */
async function cardCta(page: Page, title: string, label: string | RegExp) {
  const btn = page
    .locator("[data-compare-card], [data-slot=card], article, li, div")
    .filter({ has: page.getByText(title, { exact: true }) })
    .filter({ has: page.getByRole("button", { name: label }) })
    .last()
    .getByRole("button", { name: label })
    .filter({ visible: true })
    .first()
  await btn.scrollIntoViewIfNeeded()
  await btn.click()
  await settle(page, 1200)
}

const continueToSummary = async (page: Page) => {
  await page.getByRole("button", { name: "Continue" }).filter({ visible: true }).first().click()
  await settle(page, 1500)
}

/** Park the mouse in a corner so no card is hovered while axe reads colours. */
async function rest(page: Page) {
  const size = page.viewportSize()!
  await page.mouse.move(size.width - 2, size.height - 2)
  await settle(page, 1200)
}

const expressPlans = async (page: Page) => {
  await open(page, EXPRESS)
  await prototype(page, SUB)
}

const SCREENS: { name: string; run: (page: Page) => Promise<unknown> }[] = [
  { name: "express plans", run: expressPlans },
  {
    name: "express upsell pop-up",
    run: async (page) => {
      await expressPlans(page)
      await cardCta(page, "Classic job", "Buy now")
    },
  },
  {
    name: "express order summary",
    run: async (page) => {
      await expressPlans(page)
      await cardCta(page, "Classic job", "Buy now")
      await continueToSummary(page)
    },
  },
  { name: "self-checkout jobs tab", run: (page) => open(page, SELF) },
  {
    name: "self-checkout order summary",
    run: async (page) => {
      await open(page, SELF)
      await cardCta(page, "3 job credits", "Buy now")
      if (!isDesktop()) await continueToSummary(page)
      await settle(page, 1500)
    },
  },
  {
    name: "self-checkout upsell pop-up",
    run: async (page) => {
      await open(page, SELF)
      await cardCta(page, "13 job credits", "Buy now")
    },
  },
  { name: "job posting first screen", run: (page) => open(page, JOB_POST) },
  { name: "jobs list", run: (page) => open(page, "/apnahire/jobs") },
  { name: "ECC job page", run: (page) => open(page, "/apnahire/jobs/telecaller-koramangala") },
  {
    name: "ECC job page with candidate profile",
    run: (page) => open(page, "/apnahire/jobs/telecaller-koramangala?leadId=aditi"),
  },
  { name: "homepage", run: (page) => open(page, "/") },
  { name: "pricing", run: (page) => open(page, "/pricing") },
  // The login steps, signed out (signed in, they redirect to the app).
  { name: "login", run: (page) => open(page, "/login", { signedOut: true }) },
  {
    name: "login, no number",
    run: async (page) => {
      await open(page, "/login", { signedOut: true })
      await page.getByRole("button", { name: "Send OTP" }).click()
    },
  },
  { name: "verify OTP", run: (page) => open(page, "/login/otp?phone=9876543210", { signedOut: true }) },
  { name: "enterprise login", run: (page) => open(page, "/login/enterprise", { signedOut: true }) },
  {
    name: "enterprise login, wrong password",
    run: async (page) => {
      await open(page, "/login/enterprise", { signedOut: true })
      await page.locator("#ent-email").fill("asha@vermalogistics.in")
      await page.getByRole("button", { name: "Continue", exact: true }).click()
      await page.locator("#ent-password").fill("wrong")
      await page.getByRole("button", { name: "Log in" }).click()
      await expect(page.getByText("That password isn't right.")).toBeVisible()
    },
  },
  { name: "onboarding", run: (page) => open(page, "/onboarding?phone=9876543210") },
  {
    // The offer banner and the red chips both failed contrast until 2026-11-12.
    name: "onboarding, every answer missing",
    run: async (page) => {
      await open(page, "/onboarding?phone=9876543210")
      await page.getByRole("button", { name: "Post a job" }).click()
    },
  },
  {
    // Preview: each gap said in words, the controls in their normal look.
    name: "onboarding, every answer missing, words only",
    run: async (page) => {
      await open(page, "/onboarding?phone=9876543210&check=soft")
      await page.getByRole("button", { name: "Post a job" }).click()
    },
  },
  {
    // Preview: the one quiet line above the button.
    name: "onboarding, every answer missing, one quiet line",
    run: async (page) => {
      await open(page, "/onboarding?phone=9876543210&check=note")
      await page.getByRole("button", { name: "Post a job" }).click()
    },
  },
]

test.describe("accessibility (axe, WCAG 2.1 A/AA, light mode)", () => {
  for (const { name, run } of SCREENS) {
    test(name, async ({ page }) => {
      await run(page)
      await rest(page)
      await expectAccessible(page)
    })
  }

  test("keyboard: Tab reaches a Buy now button with a visible focus style", async ({ page }) => {
    await expressPlans(page)
    await page.mouse.move(0, 0)
    let found: { outline: string; shadow: string } | null = null
    for (let i = 0; i < 80 && !found; i++) {
      await page.keyboard.press("Tab")
      found = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el || !/^buy now$/i.test((el.textContent ?? "").trim())) return null
        const s = getComputedStyle(el)
        const noOutline = s.outlineStyle === "none" || s.outlineWidth === "0px"
        return { outline: noOutline ? "none" : s.outline, shadow: s.boxShadow }
      })
    }
    expect(found, "focus never reached a Buy now button").not.toBeNull()
    expect(found!.outline !== "none" || found!.shadow !== "none", "focused Buy now has no outline or box-shadow").toBe(true)
  })
})

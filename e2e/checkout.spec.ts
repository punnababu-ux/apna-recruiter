import { test, expect, type Page } from "@playwright/test"
import {
  EXPRESS,
  SELF,
  SUBSCRIPTION_LAYOUT as SUB,
  open,
  prototype,
  settle,
  expectCardsAligned,
  expectNoCollapsedButtons,
  expectNoHorizontalOverflow,
} from "./helpers"

const CREDITS_HELD = "4 job + 1 Premium + AI + 1 add-on credit"
const CREDITS_PARTIAL = "1 job credit (top-up for most)"

const isDesktop = () => test.info().project.name === "desktop"

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

/** Phone: the tab strip. Desktop: the big tab cards (the docked top-bar tabs are hidden at the top). */
async function selfTab(page: Page, tab: string) {
  const phone = (page.viewportSize()?.width ?? 0) < 800
  const target = phone
    ? page.getByRole("tab").filter({ hasText: tab }).filter({ visible: true }).first()
    : page.locator("button:not([role=tab])", { hasText: tab }).filter({ visible: true }).first()
  await target.click()
  await settle(page, 1200)
}

/** The "Continue" in the upsell pop-up leads to the order summary. */
async function continueToSummary(page: Page) {
  await page.getByRole("button", { name: "Continue" }).filter({ visible: true }).first().click()
  await settle(page, 1500)
}

/** The checks every checkout screen has to pass. Card rows only line up on desktop (phones stack cards). */
async function expectLayout(page: Page, { cards = true }: { cards?: boolean } = {}) {
  await expectNoHorizontalOverflow(page)
  await expectNoCollapsedButtons(page)
  if (cards && isDesktop()) await expectCardsAligned(page)
}

/** A hovered card turns its CTA green, so park the mouse in a corner before a shot. */
async function rest(page: Page, ms = 1500) {
  const size = page.viewportSize()!
  await page.mouse.move(size.width - 2, size.height - 2)
  await settle(page, ms)
}

async function expressPlans(page: Page, ...options: string[]) {
  await prototype(page, SUB, ...options)
}

async function expressSummary(page: Page) {
  await open(page, EXPRESS)
  await prototype(page, SUB)
  await cardCta(page, "Classic job", "Buy now")
  await continueToSummary(page)
}

async function selfSummary(page: Page) {
  await open(page, SELF)
  await cardCta(page, "3 job credits", "Buy now")
  if (!isDesktop()) await continueToSummary(page)
  await settle(page, 1500)
}

test.describe("express checkout", () => {
  test("plans, no credits", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page)
    await expectLayout(page)
  })

  test("plans, offer claimed", async ({ page }) => {
    await open(page, EXPRESS, { offer: true })
    await expressPlans(page)
    await expectLayout(page)
  })

  test("plans, credits held", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page, CREDITS_HELD)
    await expectLayout(page)
  })

  test("plans, partial credits", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page, CREDITS_PARTIAL)
    await expectLayout(page)
  })

  test("order summary", async ({ page }) => {
    await expressSummary(page)
    await expectLayout(page, { cards: false })
  })

  test("plans at 320px", async ({ page }) => {
    test.skip(isDesktop(), "phone width only")
    test.fixme(
      true,
      "Express plans at 320px: a plan card's whitespace-nowrap validity line ('Active for 15 days') ends past the " +
        "screen edge, so the page scrolls sideways. Same bug as job-posting.spec.ts 'the plans step at 320px'.",
    )
    await page.setViewportSize({ width: 320, height: 640 })
    await open(page, EXPRESS)
    await expressPlans(page)
    await expectNoHorizontalOverflow(page)
  })

  test("@visual plans, no credits", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page)
    await rest(page)
    await expect(page).toHaveScreenshot("express-plans.png", { fullPage: true })
  })

  test("@visual plans, offer claimed", async ({ page }) => {
    await open(page, EXPRESS, { offer: true })
    await expressPlans(page)
    await rest(page)
    await expect(page).toHaveScreenshot("express-offer.png", { fullPage: true })
  })

  test("@visual plans, credits held", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page, CREDITS_HELD)
    await rest(page)
    await expect(page).toHaveScreenshot("express-credits.png", { fullPage: true })
  })

  test("@visual plans, partial credits", async ({ page }) => {
    await open(page, EXPRESS)
    await expressPlans(page, CREDITS_PARTIAL)
    await rest(page)
    await expect(page).toHaveScreenshot("express-partial.png", { fullPage: true })
  })

  test("@visual upsell pop-up", async ({ page }) => {
    await open(page, EXPRESS)
    await prototype(page, SUB)
    await cardCta(page, "Classic job", "Buy now")
    await rest(page)
    await expect(page).toHaveScreenshot("express-upsell.png")
  })

  test("@visual order summary", async ({ page }) => {
    await expressSummary(page)
    await rest(page)
    await expect(page).toHaveScreenshot("express-summary.png")
  })
})

test.describe("self checkout", () => {
  test("Jobs tab", async ({ page }) => {
    await open(page, SELF)
    await expectLayout(page)
  })

  test("Jobs tab, offer claimed", async ({ page }) => {
    await open(page, SELF, { offer: true })
    await expectLayout(page)
  })

  test("Unlimited tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Unlimited")
    await expectLayout(page)
  })

  test("Database tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Database")
    await expectLayout(page)
  })

  test("Enterprise tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Enterprise")
    await expectLayout(page)
  })

  test("order summary", async ({ page }) => {
    await selfSummary(page)
    await expectLayout(page, { cards: false })
  })

  test("Jobs tab at 320px", async ({ page }) => {
    test.skip(isDesktop(), "phone width only")
    await page.setViewportSize({ width: 320, height: 640 })
    await open(page, SELF)
    await expectNoHorizontalOverflow(page)
  })

  test("@visual Jobs tab", async ({ page }) => {
    await open(page, SELF)
    await rest(page)
    await expect(page).toHaveScreenshot("self-jobs.png", { fullPage: true })
  })

  test("@visual Jobs tab, offer claimed", async ({ page }) => {
    await open(page, SELF, { offer: true })
    await rest(page)
    await expect(page).toHaveScreenshot("self-offer.png", { fullPage: true })
  })

  test("@visual Unlimited tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Unlimited")
    await rest(page)
    await expect(page).toHaveScreenshot("self-unlimited.png", { fullPage: true })
  })

  test("@visual Database tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Database")
    await rest(page)
    await expect(page).toHaveScreenshot("self-database.png", { fullPage: true })
  })

  test("@visual Enterprise tab", async ({ page }) => {
    await open(page, SELF)
    await selfTab(page, "Enterprise")
    await rest(page)
    await expect(page).toHaveScreenshot("self-enterprise.png", { fullPage: true })
  })

  test("@visual order summary", async ({ page }) => {
    await selfSummary(page)
    await rest(page)
    await expect(page).toHaveScreenshot("self-summary.png")
  })

  test("@visual how job credits work", async ({ page }) => {
    await open(page, SELF)
    await page.getByText("How job credits work", { exact: false }).filter({ visible: true }).first().click()
    await settle(page, 1500)
    await rest(page)
    await expect(page).toHaveScreenshot("self-job-types.png")
  })
})

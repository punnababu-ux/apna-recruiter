import { test, expect, type Page } from "@playwright/test"
import { open, settle, expectNoCollapsedButtons, expectNoHorizontalOverflow } from "./helpers"

// Layout tests for the recruiter app (src/app/apnahire): the jobs list, the ECC job page and its states,
// the job states, chats and every other product route. Checkout and job posting live in their own specs.
// Each screen: no sideways scroll, no collapsed buttons; phones also at 320px.

const ECC = "/apnahire/jobs/telecaller-koramangala"

const isDesktop = () => test.info().project.name === "desktop"
const isPhone = () => !isDesktop()

/** The checks every screen has to pass. */
async function expectLayout(page: Page, label: string) {
  await expectNoHorizontalOverflow(page, label)
  await expectNoCollapsedButtons(page)
  await expectTappableCardsRipple(page, label)
}

/** A card whose whole surface is a tap target must answer the tap (AGENTS.md, "Clickable cards"). */
async function expectTappableCardsRipple(page: Page, label: string) {
  const silent = await page.evaluate(() =>
    [...document.querySelectorAll('a[class*="after:inset-0"], button[class*="after:inset-0"]')]
      .map((el) => [el.textContent?.trim(), el.closest('[data-slot="card"]')] as const)
      .filter(([, card]) => card && !(card.classList.contains("ink") && card.classList.contains("cursor-pointer")))
      .map(([name]) => name),
  )
  expect(silent, `${label}: tappable cards with no ripple`).toEqual([])
  const raised = await page.evaluate(() =>
    [...document.querySelectorAll('[data-slot="card"]')]
      .filter((c) => !c.matches(":hover") && getComputedStyle(c).boxShadow !== "none")
      .map((c) => c.textContent?.trim().slice(0, 40)),
  )
  expect(raised, `${label}: cards with a shadow at rest`).toEqual([])
}

/** Scroll to the bottom and back: sticky bars (match sections, results bar, docked header) engage on the way. */
async function scrollThrough(page: Page, label: string) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await settle(page, 500)
  await expectLayout(page, `${label} (scrolled to the bottom)`)
  await page.evaluate(() => window.scrollTo(0, 0))
  await settle(page, 500)
  await expectLayout(page, `${label} (back at the top)`)
}

/** Park the mouse in a corner (hover states) and let motion settle before a shot. */
async function rest(page: Page, ms = 1200) {
  const size = page.viewportSize()!
  await page.mouse.move(size.width - 2, size.height - 2)
  await settle(page, ms)
}

type Screen = {
  name: string
  path: string
  prepare?: (page: Page) => Promise<void>
  desktopOnly?: boolean
  scroll?: boolean
  /** A real product bug at 320px, not yet fixed: what, where, by how many px. */
  fixme320?: string
}

/** Every screen gets the same three tests: its layout, its layout at 320px (phone only), and the scroll round trip. */
function screens(group: string, list: Screen[]) {
  test.describe(group, () => {
    for (const s of list) {
      test(s.name, async ({ page }) => {
        test.skip(!!s.desktopOnly && isPhone(), "desktop only")
        if (s.scroll) test.slow()
        await open(page, s.path)
        await s.prepare?.(page)
        await expectLayout(page, s.name)
        if (s.scroll) await scrollThrough(page, s.name)
      })

      test(`${s.name} at 320px`, async ({ page }) => {
        test.skip(isDesktop() || !!s.desktopOnly, "phone width only")
        test.fixme(!!s.fixme320, s.fixme320)
        if (s.scroll) test.slow()
        await page.setViewportSize({ width: 320, height: 640 })
        await open(page, s.path)
        await s.prepare?.(page)
        await expectLayout(page, `${s.name} at 320px`)
        if (s.scroll) await scrollThrough(page, `${s.name} at 320px`)
      })
    }
  })
}

// ── Jobs list ───────────────────────────────────────────────────────────────

const search = (page: Page, text: string) => page.getByPlaceholder("Search by job title…").filter({ visible: true }).first().fill(text)

/** Opens the Filters control (a popover on desktop, a bottom sheet on phones), ticks `option`, applies it. */
async function applyFilter(page: Page, option: string) {
  await page.getByRole("button", { name: /^Filters/ }).filter({ visible: true }).first().click()
  await settle(page)
  await page.getByText(option, { exact: true }).filter({ visible: true }).first().click()
  await settle(page)
  if (isPhone()) await page.getByRole("button", { name: "Apply filters" }).click()
  else await page.keyboard.press("Escape")
  await settle(page, 800)
}

screens("jobs list", [
  { name: "all jobs", path: "/apnahire/jobs", scroll: true },
  { name: "active", path: "/apnahire/jobs?tab=active" },
  { name: "under review", path: "/apnahire/jobs?tab=under_review" },
  { name: "draft", path: "/apnahire/jobs?tab=draft" },
  { name: "expired", path: "/apnahire/jobs?tab=expired" },
  {
    name: "search with matches",
    path: "/apnahire/jobs",
    prepare: async (page) => {
      await search(page, "sales")
      await settle(page, 800)
    },
  },
  {
    name: "search with no match",
    path: "/apnahire/jobs",
    prepare: async (page) => {
      await search(page, "zzzz")
      await settle(page, 800)
    },
  },
  {
    name: "location filter applied",
    path: "/apnahire/jobs",
    prepare: (page) => applyFilter(page, "Bengaluru"),
  },
])

// ── ECC job page ────────────────────────────────────────────────────────────

async function pickView(page: Page, view: "Detailed cards" | "Compact list" | "Table") {
  await page.getByRole("button", { name: view }).filter({ visible: true }).first().click()
  await settle(page, 800)
}

async function openSideFilters(page: Page) {
  await page.getByRole("button", { name: /^Filters/ }).filter({ visible: true }).first().click()
  await settle(page, 800)
}

screens("ECC job page", [
  { name: "default", path: ECC, scroll: true },
  { name: "no applicants (active leads)", path: `${ECC}?applicants=0`, scroll: true },
  { name: "database tab", path: `${ECC}?tab=database` },
  { name: "profile sheet open", path: `${ECC}?leadId=aditi` },
  { name: "side filter panel, closed", path: ECC, desktopOnly: true },
  {
    name: "side filter panel, open",
    path: ECC,
    desktopOnly: true,
    prepare: openSideFilters,
    scroll: true,
  },
  {
    name: "compact view",
    path: ECC,
    desktopOnly: true,
    prepare: (page) => pickView(page, "Compact list"),
    scroll: true,
  },
  {
    name: "table view",
    path: ECC,
    desktopOnly: true,
    prepare: (page) => pickView(page, "Table"),
    scroll: true,
  },
  {
    name: "filter applied (results bar)",
    path: ECC,
    desktopOnly: true,
    prepare: async (page) => {
      await applyFilter(page, "Graduate")
      await expect(page.getByText(/Showing \d+ of \d+/).filter({ visible: true }).first()).toBeVisible()
    },
    scroll: true,
  },
  {
    name: "candidate selected (bulk actions)",
    path: ECC,
    desktopOnly: true,
    prepare: async (page) => {
      await applyFilter(page, "Graduate")
      await page.getByRole("checkbox", { name: "Select all shown candidates" }).filter({ visible: true }).first().click()
      await expect(page.getByRole("button", { name: "Download Excel" }).filter({ visible: true }).first()).toBeVisible()
    },
  },
  { name: "phone: queue", path: `${ECC}`, scroll: true },
  {
    name: "phone: filter applied",
    path: `${ECC}`,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      await applyFilter(page, "Graduate")
    },
  },
  {
    name: "phone: sort sheet",
    path: `${ECC}`,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      await page.getByRole("button", { name: /^Sort candidates/ }).click()
      await expect(page.getByRole("radio", { name: "Recently applied" })).toBeVisible()
    },
  },
  {
    name: "phone: undo a decision",
    path: ECC,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      const rejected = page.getByText(/^Rejected/).first()
      const before = (await rejected.textContent()) ?? ""
      const call = page.locator('a[href^="tel:"]').first()
      await call.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault(), { once: true })) // a real tel: stalls the browser
      await call.click()
      await settle(page, 800) // the sheet is still sliding in
      await page.getByRole("radio", { name: "Rejected" }).click()
      await expect(rejected).not.toHaveText(before)
      await page.getByRole("button", { name: "Undo" }).click()
      await expect(rejected).toHaveText(before)
    },
  },
  {
    name: "phone: did not pick up shows on the card",
    path: ECC,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      const call = page.locator('a[href^="tel:"]').first()
      await call.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault(), { once: true }))
      await call.click()
      await settle(page, 800)
      await page.getByRole("radio", { name: "Did not pick up" }).click()
      await page.getByText(/^Called/).filter({ visible: true }).first().click()
      await expect(page.getByRole("button", { name: "Did not pick up" }).first()).toBeVisible()
    },
  },
  {
    name: "phone: Later changes nothing",
    path: ECC,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      const call = page.locator('a[href^="tel:"]').first()
      await call.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault(), { once: true }))
      await call.click()
      await settle(page, 800)
      await page.getByRole("button", { name: "Later" }).click()
      await settle(page, 800)
      await page.getByText(/^All/).filter({ visible: true }).first().click()
      await expect(page.getByRole("button", { name: "Update status" }).first()).toBeVisible()
    },
  },
  {
    name: "phone: reject from the card, then undo",
    path: ECC,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      await expect(page.getByText("To call (4)").filter({ visible: true })).toBeVisible()
      await page.getByRole("button", { name: /^Reject / }).first().click()
      await expect(page.getByText("To call (3)").filter({ visible: true })).toBeVisible()
      await page.getByRole("button", { name: "Undo" }).click()
      await expect(page.getByText("To call (4)").filter({ visible: true })).toBeVisible()
    },
  },
  { name: "phone: just posted", path: `${ECC}?applicants=0` },
  {
    name: "phone: after a call",
    path: `${ECC}`,
    prepare: async (page) => {
      test.skip(isDesktop(), "phone only")
      await page.locator('a[href^="tel:"]').first().click({ noWaitAfter: true })
      await expect(page.getByRole("radio", { name: "Did not pick up" })).toBeVisible()
    },
  },
  {
    name: "pipeline: shortlisted",
    path: ECC,
    prepare: async (page) => {
      await page.getByText(/^Shortlisted \(\d+\)/).filter({ visible: true }).first().click()
      await settle(page, 800)
    },
  },
])

// ── Other job states ────────────────────────────────────────────────────────

screens("job states", [
  { name: "expired job", path: "/apnahire/jobs/field-sales-expired" },
  { name: "under review job", path: "/apnahire/jobs/field-sales-pune-review" },
  { name: "draft job", path: "/apnahire/jobs/customer-support-draft" },
  { name: "active job, other", path: "/apnahire/jobs/delivery-andheri" },
])

// ── Chats (the Express inbox) ───────────────────────────────────────────────

screens("chats", [
  { name: "inbox", path: "/apnahire/chats", scroll: true },
  { name: "thread", path: "/apnahire/chats/t-ravi" },
  { name: "thread not found", path: "/apnahire/chats/nobody" },
])

// ── Every other product route ───────────────────────────────────────────────

screens("product routes", [
  { name: "dashboard", path: "/apnahire/dashboard" },
  { name: "campus AI", path: "/apnahire/campus-ai" },
  { name: "settings", path: "/apnahire/settings" },
  { name: "profile", path: "/apnahire/profile" },
  { name: "support", path: "/apnahire/support" },
  { name: "plan", path: "/apnahire/plan" },
  { name: "usage", path: "/apnahire/usage" },
  { name: "reports", path: "/apnahire/reports" },
  { name: "notifications", path: "/apnahire/notifications" },
  { name: "database: search candidates", path: "/apnahire/database/search-candidates" },
  { name: "database: unlocked candidates", path: "/apnahire/database/unlocked-candidates" },
  { name: "database: saved searches", path: "/apnahire/database/saved-searches" },
  { name: "invite centre: database WhatsApp invites", path: "/apnahire/invite-centre/database-wa-invites" },
  { name: "invite centre: job WhatsApp connects", path: "/apnahire/invite-centre/job-wa-connects" },
  { name: "sidebar specs", path: "/apnahire/sidebar-specs" },
  { name: "sidebar specs, interactive", path: "/apnahire/sidebar-specs/interactive" },
])

// ── Screenshots (local only) ────────────────────────────────────────────────

test.describe("screenshots", () => {
  test("@visual jobs list", async ({ page }) => {
    await open(page, "/apnahire/jobs")
    await rest(page)
    await expect(page).toHaveScreenshot("app-jobs.png", { fullPage: true })
  })

  test("@visual ECC job page", async ({ page }) => {
    await open(page, ECC)
    await rest(page)
    await expect(page).toHaveScreenshot("app-ecc.png", { fullPage: true })
  })

  test("@visual ECC job page, no applicants", async ({ page }) => {
    await open(page, `${ECC}?applicants=0`)
    await rest(page)
    await expect(page).toHaveScreenshot("app-ecc-no-applicants.png", { fullPage: true })
  })
})

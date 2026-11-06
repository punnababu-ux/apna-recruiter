import { test, expect, type Page } from "@playwright/test"
import { open, settle, expectNoCollapsedButtons, expectNoHorizontalOverflow } from "./helpers"

// Layout tests for every marketing route (src/app/(marketing)): no sideways scroll, no collapsed buttons, on
// desktop and phone, and at 320px on phone. There are no dynamic marketing routes: every page is listed here.
// A new page.tsx under (marketing) needs a line in ROUTES.

const ROUTES = [
  { name: "home", path: "/" },
  { name: "pricing", path: "/pricing" },
  { name: "enterprise", path: "/enterprise" },
  { name: "products: smart jobs", path: "/products/smart-jobs" },
  { name: "products: AI calling agent", path: "/products/ai-calling-agent" },
  { name: "products: database", path: "/products/database" },
  { name: "products: unlimited", path: "/products/unlimited" },
  { name: "customer stories", path: "/customer-stories" },
  { name: "customer story: PwC", path: "/customer-stories/pwc" },
  { name: "about", path: "/about" },
  { name: "about: culture", path: "/about/culture" },
  { name: "about: leadership", path: "/about/leadership" },
  { name: "about: management", path: "/about/management" },
  { name: "about: by the numbers", path: "/about/numbers" },
  { name: "newsroom", path: "/newsroom" },
  { name: "newsroom: awards", path: "/newsroom/awards" },
  { name: "careers", path: "/careers" },
  { name: "interview prep lounge", path: "/interview-prep-lounge" },
] as const

const isDesktop = () => test.info().project.name === "desktop"

/** The checks every page has to pass. */
async function expectLayout(page: Page, label: string) {
  await expectNoHorizontalOverflow(page, label)
  await expectNoCollapsedButtons(page)
}

/**
 * Scroll to the bottom in steps (lazy images, reveal-on-scroll bands and the docked header all engage on
 * the way), check the page there, then come back to the top and check again.
 */
async function scrollThrough(page: Page, label: string) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const step = page.viewportSize()!.height
  for (let y = step; y < height + step; y += step) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.waitForTimeout(120)
  }
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

/** Real product bugs, not yet fixed: route name -> what, where, by how many px. `phone` = 375px, `narrow` = 320px. */
const FIXME: Record<string, { phone?: string; narrow?: string }> = {
  home: {
    narrow:
      "Home, the apna Database and apna Enterprise product cards: their stat-tile row (grid-cols-3, e.g. '22+ " +
      "Precision filters') ends at x=337 on a 320px screen, 17px past the edge, and the page scrolls sideways",
  },
  "interview prep lounge": {
    phone:
      "Interview prep lounge, the 'Prepare for 25,000+ top roles' card: its title and the role-chip row " +
      "(Sales, BPO, IT, Finance, Retail) end 7px past the 375px screen and the page scrolls 37px sideways",
    narrow:
      "Interview prep lounge, the same card: at 320px the page content is 390px wide (the hero, buttons and " +
      "cards all stretch to x=328-360), 70px of sideways scroll",
  },
}

test.describe("marketing pages", () => {
  for (const route of ROUTES) {
    test(route.name, async ({ page }) => {
      test.fixme(!isDesktop() && !!FIXME[route.name]?.phone, FIXME[route.name]?.phone)
      test.slow()
      await open(page, route.path)
      await scrollThrough(page, route.name)
    })

    test(`${route.name} at 320px`, async ({ page }) => {
      test.skip(isDesktop(), "phone width only")
      test.fixme(!!FIXME[route.name]?.narrow, FIXME[route.name]?.narrow)
      test.slow()
      await page.setViewportSize({ width: 320, height: 640 })
      await open(page, route.path)
      await scrollThrough(page, `${route.name} at 320px`)
    })
  }
})

// ── Screenshots (local only) ────────────────────────────────────────────────
// Masked: the logo marquees, the offer countdown and the rotating hero visuals (anything animated).

const animated = (page: Page) => [
  page.locator("[class*=marquee]"),
  page.locator("[data-slot=marquee]"),
  page.locator("[class*=animate-]"),
  page.locator("video"),
  page.locator("[data-countdown]"),
]

test.describe("screenshots", () => {
  test("@visual homepage", async ({ page }) => {
    await open(page, "/")
    await rest(page)
    await expect(page).toHaveScreenshot("marketing-home.png", { fullPage: true, mask: animated(page) })
  })

  test("@visual pricing", async ({ page }) => {
    await open(page, "/pricing")
    await rest(page)
    await expect(page).toHaveScreenshot("marketing-pricing.png", { fullPage: true, mask: animated(page) })
  })
})

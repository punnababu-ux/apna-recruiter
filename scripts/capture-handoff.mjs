// Re-captures the Checkout Dev Handoff screens (phone 430 and desktop 1440, @2x)
// from the local dev server on :3000. See docs/start-here/AI-HANDOFF.md → "Checkout dev hand-off".
// usage: PLAYWRIGHT=<path to playwright/index.mjs> node scripts/capture-handoff.mjs <outDir> [nameFilter]
// shortcut: Playwright isn't a repo dependency; it is loaded from the npx cache and drives the
// system Chrome. Add it as a devDependency if this becomes a regular task.
const { chromium } = await import(process.env.PLAYWRIGHT ?? "/Users/punna.babu/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs")
const [,, OUT, FILTER = ""] = process.argv
const BASE = "http://localhost:3000"
const EXPRESS = "/apnahire/jobs/new/plans", SELF = "/apnahire/credits"
const browser = await chromium.launch({ channel: "chrome" })

async function open(device, path, { offer = false, returning = false } = {}) {
  const phone = device === "phone"
  const ctx = await browser.newContext({
    viewport: phone ? { width: 430, height: 932 } : { width: 1440, height: 900 },
    deviceScaleFactor: 2, isMobile: phone, hasTouch: phone, reducedMotion: "reduce",
  })
  await ctx.addInitScript(({ offer, returning }) => {
    if (sessionStorage.getItem("cap:init")) return
    sessionStorage.setItem("cap:init", "1")
    localStorage.clear()
    localStorage.setItem("apnahire:session", JSON.stringify({ kind: "phone", phone: "9876543210" }))
    localStorage.setItem("apnahire:job-draft", JSON.stringify({ draft: { title: "Delivery executive", city: "Bengaluru", locationType: "office" } }))
    localStorage.setItem("apnahire:pricing-phase", "today")
    sessionStorage.setItem("top-up-credits:played", "1")
    if (offer) localStorage.setItem("apna:extra-off-deadline", String(Date.now() + 86399000 - 48000))
    if (returning) localStorage.setItem("apna:returning-recruiter", "1")
  }, { offer, returning })
  const p = await ctx.newPage()
  await p.goto(BASE + path, { waitUntil: "networkidle" })
  await p.addStyleTag({ content: "nextjs-portal{display:none!important} *{caret-color:transparent!important}" })
  await p.waitForTimeout(1200)
  return p
}
const settle = (p, ms = 900) => p.waitForTimeout(ms)
const clickText = async (p, text, { exact = true, nth = 0, role } = {}) => {
  const loc = role ? p.getByRole(role, { name: text, exact }) : p.getByText(text, { exact })
  const l = loc.filter({ visible: true }).nth(nth)
  await l.click({ timeout: 5000 }).catch(() => l.click({ force: true })); await settle(p)
}
// Hidden prototype panel: a silent click on the GST note opens it.
async function prototype(p, ...options) {
  await clickText(p, "*GST applicable")
  for (const o of options) await clickText(p, o)
  await p.keyboard.press("Escape"); await settle(p)
}
// Card CTA: the nth visible button with this label inside the card holding `title`.
async function cardCta(p, title, label) {
  const btn = p.locator("[data-compare-card], [data-slot=card], article, li, div")
    .filter({ has: p.getByText(title, { exact: true }) }).filter({ has: p.getByRole("button", { name: label }) })
    .last().getByRole("button", { name: label }).filter({ visible: true }).first()
  await btn.scrollIntoViewIfNeeded(); await btn.click(); await settle(p, 1200)
}
// Phone: the tab strip; desktop: the big tab cards (the docked top-bar tabs are hidden at the top).
const tabClick = (p, tab) => (p.viewportSize().width < 800
  ? p.getByRole("tab").filter({ hasText: tab }).filter({ visible: true }).first()
  : p.locator("button:not([role=tab])", { hasText: tab }).filter({ visible: true }).first()).click()
// Page shot: the content down to the GST note, at the device's width.
async function pageShot(p, name) {
  await p.evaluate(() => window.scrollTo(0, 0)); await rest(p)
  const w = p.viewportSize().width
  await p.setViewportSize({ width: w, height: 3000 }); await settle(p, 1200)
  const gst = p.getByText("*GST applicable", { exact: true }).filter({ visible: true }).last()
  const box = await gst.boundingBox()
  const h = Math.ceil(box.y + box.height + 24)
  await p.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 88, clip: { x: 0, y: 0, width: w, height: h } })
  await p.setViewportSize({ width: w, height: w < 800 ? 932 : 900 }); await settle(p)
}
const rest = (p) => p.mouse.move(p.viewportSize().width - 2, p.viewportSize().height - 2)
const viewShot = (p, name) => rest(p).then(() => settle(p, 1500)).then(() => p.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 88 }))

const SUB = "Subscription (3 plans + monthly)"
const back = (p) => p.getByRole("button", { name: /back/i }).filter({ visible: true }).first().click().then(() => settle(p, 1500))
const screens = {
  "x-stay-plan": async (d) => { const p = await open(d, EXPRESS, { returning: true }); await prototype(p, SUB); await back(p); await viewShot(p, `x-stay-plan-${d}`) },
  "x-stay-summary": async (d) => {
    const p = await open(d, EXPRESS, { returning: true }); await prototype(p, SUB)
    await cardCta(p, "Classic job", "Buy now")
    await clickText(p, "Continue", { role: "button", exact: false }); await settle(p, 1500)
    if (d === "phone") await back(p); else await clickText(p, "Close", { role: "button" })
    await settle(p, 1500); await viewShot(p, `x-stay-summary-${d}`)
  },
  "x-reasons": async (d) => { const p = await open(d, SELF, { returning: true }); await back(p); await viewShot(p, `x-reasons-${d}`) },
  "e-plans": async (d) => { const p = await open(d, EXPRESS); await prototype(p, SUB); await pageShot(p, `e-plans-${d}`) },
  "e-offer": async (d) => { const p = await open(d, EXPRESS, { offer: true }); await prototype(p, SUB); await pageShot(p, `e-offer-${d}`) },
  "e-credits": async (d) => { const p = await open(d, EXPRESS); await prototype(p, SUB, "4 job + 1 Premium + AI + 1 add-on credit"); await pageShot(p, `e-credits-${d}`) },
  "e-partial": async (d) => { const p = await open(d, EXPRESS); await prototype(p, SUB, "1 job credit (top-up for most)"); await pageShot(p, `e-partial-${d}`) },
  "e-upsell": async (d) => {
    const p = await open(d, EXPRESS); await prototype(p, SUB)
    await cardCta(p, "Classic job", "Buy now"); await viewShot(p, `e-upsell-${d}`)
    await clickText(p, "Continue", { role: "button", exact: false }); await settle(p, 1500); await viewShot(p, `e-summary-${d}`)
    await clickText(p, /^Add( ·.*)?$/, { role: "button" }); await settle(p, 2500); await viewShot(p, `e-summary-added-${d}`)
  },
  "e-summary-credit": async (d) => {
    const p = await open(d, EXPRESS); await prototype(p, SUB, "4 job + 1 Premium + AI + 1 add-on credit")
    await cardCta(p, "Classic job", "Post now"); await settle(p, 1500); await viewShot(p, `e-summary-credit-${d}`)
  },
  "s-jobs": async (d) => { const p = await open(d, SELF); await pageShot(p, `s-jobs-${d}`) },
  "s-offer": async (d) => { const p = await open(d, SELF, { offer: true }); await pageShot(p, `s-offer-${d}`) },
  "s-tabs": async (d) => {
    const p = await open(d, SELF)
    for (const [tab, name] of [["Unlimited", "s-unlimited"], ["Database", "s-database"], ["Enterprise", "s-enterprise"]]) {
      await tabClick(p, tab); await settle(p, 1200)
      await pageShot(p, `${name}-${d}`)
    }
  },
  "s-pack-upsell": async (d) => {
    const p = await open(d, SELF)
    await cardCta(p, "22 job credits", "Buy now").catch(() => cardCta(p, "13 job credits", "Buy now"))
    await viewShot(p, `s-pack-upsell-${d}`)
  },
  "s-db-upsell": async (d) => {
    const p = await open(d, SELF)
    await tabClick(p, "Database"); await settle(p, 1200)
    await cardCta(p, "1,600 database credits", "Buy now"); await viewShot(p, `s-db-upsell-${d}`)
  },
  "s-summary": async (d) => {
    const p = await open(d, SELF)
    await cardCta(p, "3 job credits", "Buy now")
    if (d === "phone") { await clickText(p, "Continue", { role: "button", exact: false }); await settle(p, 1500) }
    await viewShot(p, `s-summary-${d}`)
  },
  "e-jobtypes": async (d) => {
    const p = await open(d, SELF)
    await clickText(p, "How job credits work", { exact: false }); await settle(p, 1500); await viewShot(p, `e-jobtypes-${d}`)
  },
}
for (const [key, run] of Object.entries(screens)) {
  if (FILTER && !key.includes(FILTER)) continue
  for (const d of ["phone", "desktop"]) {
    try { await run(d); console.log("ok", key, d) } catch (e) { console.log("FAIL", key, d, e.message.split("\n")[0]) }
  }
}
await browser.close()

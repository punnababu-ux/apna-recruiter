// node scripts/render-recruiter-icons.mjs public/recruiter 1.12 0.84
// Re-renders the install icons from public/brand/files/apna-recruiter-icon-dark.svg.
// Args: out dir, wordmark scale for the drawn/iOS icons, for the maskable one.
// 1.12 / 0.84 (2026-11-14): bigger on phones; the maskable stays inside
// Android's visible circle (middle 72 of 108 dp). 1 / 0.8 = the original art.
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
const require = createRequire(process.cwd() + "/package.json")
const { chromium } = require("playwright")
const [outDir, kAny, kMask] = process.argv.slice(2)
const svg = readFileSync("public/brand/files/apna-recruiter-icon-dark.svg", "utf8")
const tile = svg.slice(0, svg.indexOf("<path"))
const words = svg.slice(svg.indexOf("<path"), svg.lastIndexOf("</svg>"))
const make = (k, bleed) =>
  (bleed ? tile.replace(' clip-path="url(#c)"', "") : tile) +
  `<g transform="translate(256 256) scale(${k}) translate(-256 -256)">${words}</g></svg>`
const jobs = [
  ["icon-512", 512, make(kAny, false)],
  ["icon-192", 192, make(kAny, false)],
  ["apple-touch-icon", 180, make(kAny, true)],
  ["icon-maskable-512", 512, make(kMask, true)],
]
const browser = await chromium.launch({ channel: "chrome" })
for (const [name, size, s] of jobs) {
  const page = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 600, height: 600 } })
  await page.setContent(`<html><body style="margin:0;background:transparent">${s.replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body></html>`)
  await page.screenshot({ path: `${outDir}/${name}.png`, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
  await page.close()
}
await browser.close()

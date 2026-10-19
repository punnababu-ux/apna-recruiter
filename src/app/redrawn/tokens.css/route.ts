/**
 * /redrawn/tokens.css — the design system's token layers (primitives +
 * semantics), served to the redrawn deck (public/redrawn/index.html), which is
 * a standalone page outside the Next build. The deck reads its brand colours,
 * fonts, mother gradient and hero blobs from these variables, so a change in
 * the design system's tokens shows up in the deck too.
 *
 * Read from the package's source files at build time (a static route).
 */

import { readFile } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-static"

const TOKENS_DIR = path.join(process.cwd(), "packages/design-system/src/styles/tokens")

export async function GET() {
  const files = ["primitives.css", "semantic.css"]
  const css = (await Promise.all(files.map((f) => readFile(path.join(TOKENS_DIR, f), "utf8")))).join("\n")
  return new Response(css, { headers: { "Content-Type": "text/css; charset=utf-8" } })
}

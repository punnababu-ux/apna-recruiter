/**
 * /design-system/foundations/clay — the 3D clay illustrations: the set,
 * when to use them, the generation prompt (from content/clay-style.ts) and
 * how a new one gets into the product. Long form: docs/CLAY-ILLUSTRATIONS.md.
 */

import { readdirSync } from "node:fs"
import path from "node:path"
import Image from "next/image"
import { Badge } from "@apna/design-system"
import { CopyBlock } from "@/components/design-system/copy-block"
import {
  CLAY_EXAMPLES,
  CLAY_OPENING,
  CLAY_STYLE,
  CLAY_SUBJECT_TEMPLATE,
  CLAY_TEXT_EXCEPTION,
  clayPrompt,
} from "@/content/clay-style"

const DIR = "images/company/values"

const USE = [
  "One clay object stands for one idea: a value, a feature, a step. It sits on a card's open side or above a short statement.",
  "On a gradient or a frosted card. Never inside the product's working screens (dashboards, checkout, forms): they're for marketing and company pages.",
  "One object per card, never a scene with several. Sizes: lg on stack cards, md in bands, sm at the top of a grid card (ValueArt).",
  "Always transparent PNG, 640×640, served as-is (unoptimized): re-encoding smears the cut edge.",
]

const DONT = [
  "No text, numbers or logos on the object (an earlier batch came back with file names engraved on it). The one exception: an object that is a document, like a book cover, with its text spelled out exactly.",
  "No glossy, metallic or gradient surfaces; no colours outside the palette (brand green and mint, sky blue, warm yellow, off-white, a touch of deep plum).",
  "No people or hands. (A separate people set is its own style.)",
  "Don't mix in other 3D styles or flat illustrations on the same page.",
]

const STEPS = [
  "Write the subject: one object, one or two details that carry the meaning, then each part's colour (the template below).",
  "Prompt = the opening line + the subject + the style block, word for word (or copy a full example and swap its subject). Generate 3–4 and pick the cleanest silhouette (it must read at ~200px).",
  "Put the picks in the clay Figma file (R5vLmJRvUuzgHNOr1abmHA) and ask Claude to bring them in.",
  "Cut out the grey backdrop: scripts/clay-cutout.py (defaults 9/6/0; near-white objects e.g. 6 4 18). Check on a coloured background.",
  "Resize to 640×640, save to public/images/company/values/<name>.png, add the name to READY in marketing/value-art.tsx.",
]

export default function ClayPage() {
  const files = readdirSync(path.join(process.cwd(), "public", DIR))
    .filter((f) => f.endsWith(".png"))
    .sort()

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="secondary">3D clay</Badge>
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">3D clay illustrations</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Handmade-looking plasticine objects in the brand palette: the warm, human side of the marketing pages. Every
          one is generated from the same style block, so the set reads as one family.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="border-b border-border/60 pb-2 font-heading text-lg font-semibold text-foreground">
          The set <span className="text-sm font-regular text-muted-foreground">({files.length})</span>
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {files.map((f) => (
            <li key={f} className="flex flex-col items-center gap-2 rounded-card-nested bg-gradient-illustration-sky p-3">
              <Image src={`/${DIR}/${f}`} alt="" width={160} height={160} unoptimized className="size-28 object-contain" />
              <span className="text-caption text-center text-muted-foreground">{f.replace(/\.png$/, "")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="border-b border-border/60 pb-2 font-heading text-lg font-semibold text-foreground">Use them</h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-foreground">
            {USE.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="border-b border-border/60 pb-2 font-heading text-lg font-semibold text-foreground">Never</h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-foreground">
            {DONT.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-border/60 pb-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">Generating a new one</h2>
          <p className="text-sm text-muted-foreground">
            A prompt is three parts: the opening line, a subject you write, then the style block, unchanged.
          </p>
        </div>

        <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-foreground">
          {STEPS.map((s) => <li key={s}>{s}</li>)}
        </ol>

        <h3 className="pt-2 font-heading text-base font-semibold text-foreground">1 · Opening line (always the same)</h3>
        <CopyBlock text={CLAY_OPENING} />

        <h3 className="pt-2 font-heading text-base font-semibold text-foreground">2 · Subject (template)</h3>
        <CopyBlock text={CLAY_SUBJECT_TEMPLATE} />

        <h3 className="pt-2 font-heading text-base font-semibold text-foreground">3 · Style block (always the same)</h3>
        <CopyBlock text={CLAY_STYLE} label="Copy style" />

        <h3 className="pt-2 font-heading text-base font-semibold text-foreground">Examples: full prompts</h3>
        <div className="flex flex-col gap-4">
          {CLAY_EXAMPLES.map((ex) => (
            <div key={ex.name} className="flex flex-col gap-2">
              <span className="text-overline text-muted-foreground">
                {ex.name} · {ex.file}.png
              </span>
              <CopyBlock text={clayPrompt(ex.subject)} label="Copy prompt" />
            </div>
          ))}
        </div>

        <h3 className="pt-2 font-heading text-base font-semibold text-foreground">The text exception</h3>
        <p className="text-sm text-muted-foreground">
          {CLAY_TEXT_EXCEPTION.name}: {CLAY_TEXT_EXCEPTION.note} Spell every word out, line by line, and check the
          spelling on each render.
        </p>
        <CopyBlock
          text={clayPrompt(CLAY_TEXT_EXCEPTION.subject).replace("no text, no logos", "no logos")}
          label="Copy prompt"
        />
      </section>
    </div>
  )
}

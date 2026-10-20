/**
 * The 3D clay illustration style — the one source for the prompt every clay
 * picture is generated from. Shown on /design-system/foundations/clay and
 * described in docs/CLAY-ILLUSTRATIONS.md. Change the style here, once.
 *
 * A prompt = the opening line + SUBJECT (one or two sentences: the object
 * and its colours) + CLAY_STYLE (unchanged). Taken from the prompts the
 * existing set was generated with (2026-10).
 */

/** The prompt's first line, before the subject. */
export const CLAY_OPENING = "A single 3D clay object, centred, three-quarter view from slightly above."

/** Everything after the subject. Paste word for word. */
export const CLAY_STYLE = `Style: soft matte clay / plasticine look, smooth hand-sculpted forms with slightly rounded edges, subtle fingerprint-free surface, soft studio lighting from the top left, gentle ambient occlusion, a soft contact shadow under the object. Palette: apna brand green (#1F8268 and lighter mint #9DE2C9), sky blue, warm yellow, warm off-white and a touch of deep plum (#4E3A52) for accents; no other colours.
Plain flat light-grey background (#E9E9EC), no gradient, no scene, no text, no logos, no people figures. Square 1:1, object filling about 70% of the frame, high detail, clean silhouette for background removal.`

/** The subject's shape: the object and its parts, then each part's colour. */
export const CLAY_SUBJECT_TEMPLATE = `Subject: a rounded clay [object] with [one or two simple details that carry the meaning]. [Colour] [main part], [colour] [second part], a [deep plum / warm yellow] [accent].`

export type ClayExample = { name: string; file: string; subject: string; note?: string }

/** Subjects the set was generated from (Enterprise, Resources). */
export const CLAY_EXAMPLES: ClayExample[] = [
  {
    name: "Employer branding",
    file: "employer-branding",
    subject:
      "a rounded clay award rosette / ribbon badge with a blank shield in the centre, standing on a small pedestal. Warm yellow ribbon, deep plum shield, off-white pedestal.",
  },
  {
    name: "Team management",
    file: "team-management",
    subject:
      "three rounded clay ID badges on lanyards, fanned out and overlapping, each with a simple blank avatar circle. Mint, sky blue and off-white badges, deep plum lanyards.",
  },
  {
    name: "ATS integrations",
    file: "ats-integrations",
    subject:
      "two chunky rounded clay puzzle pieces clicking together, with a small plug-and-socket detail. Sky blue and mint pieces, a warm yellow plug.",
  },
  {
    name: "Reports",
    file: "reports",
    subject:
      "a rounded clay clipboard holding a simple bar chart, with a small download arrow badge at the corner. Off-white clipboard, mint and sky blue bars, a deep plum arrow badge.",
  },
  {
    name: "Power features",
    file: "power-features",
    subject:
      "a chunky clay lightning bolt bursting out of a rounded clay rocket-booster ring. Warm yellow bolt, mint ring, deep plum accents.",
  },
  {
    name: "Dedicated support",
    file: "dedicated-support",
    subject:
      "a rounded clay headset with a small speech bubble beside it. Deep plum headset, mint ear cushions, a sky blue bubble.",
  },
  {
    name: "Smart inbound hiring",
    file: "smart-inbound",
    subject:
      "a rounded clay inbox tray with three small profile cards dropping into it from above. Sky blue tray, off-white cards, mint and warm yellow avatar dots.",
  },
  {
    name: "AI-powered database search",
    file: "database-search",
    subject:
      "a chunky clay magnifier over a short stack of rounded database discs, with a tiny sparkle on the lens. Deep plum magnifier, mint and sky blue discs, a warm yellow sparkle.",
  },
  {
    name: "Walk-ins",
    file: "walk-ins",
    subject:
      "a rounded clay calendar page with a check mark, and a small clay footprint pair walking toward it. Off-white calendar, a mint check, warm yellow footprints, a deep plum binding.",
  },
  {
    name: "HQ building",
    file: "enterprise",
    subject:
      "a small modern office tower with three stacked, gently rounded floors, a soft green glass band wrapping each floor, and a tiny flag of three connected people icons on the roof — an enterprise headquarters that feels welcoming, not corporate. Beside its base, two little rounded blocks like building bricks, one stacked on the other, hinting at teams scaling up.",
  },
  {
    name: "Mission (About)",
    file: "mission",
    subject:
      "a small, chunky arched clay bridge spanning a gap between two rounded clay cliffs, a tiny off-white clay house on the left cliff and a small warm yellow clay briefcase on the right, a little mint clay flag at the top of the arch. Sky blue deck, off-white arch, a thin deep plum band where the deck meets each cliff.",
  },
]

/**
 * The one exception to "no text": an object that IS a document, like a
 * report's book cover. Spell the text out exactly, line by line, and say
 * nothing else may appear. Check the spelling on every render.
 */
export const CLAY_TEXT_EXCEPTION: ClayExample = {
  name: "Book cover (the Gen Z playbook)",
  file: "genz-playbook-clay",
  subject:
    "a thick rounded clay hardback book standing upright at a slight three-quarter angle, chunky soft edges and a visible off-white page block on the side. Smooth deep plum clay cover with the title raised in off-white clay letters, exactly: “The India Gen Z Talent Playbook”, in four lines: “The India” / “Gen Z” / “Talent” / “Playbook”. Bold, rounded, evenly spaced letters, correctly spelled. Nothing else on the cover: no other text, no numbers, no logos.",
  note: "Drop “no text” from the style block for this one only.",
}

/** A full prompt, ready to paste. */
export function clayPrompt(subject: string) {
  return `${CLAY_OPENING}\nSubject: ${subject}\n\n${CLAY_STYLE}`
}

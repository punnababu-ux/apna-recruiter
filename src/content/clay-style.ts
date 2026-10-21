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

/**
 * Pick the object's colours for the surface it sits on (user call,
 * 2026-10-21) — the main body in a colour that stands off the surface:
 *   white / light page      anything
 *   green offer header      off-white and warm yellow lead; never sky blue
 *                           (clashes) or mint/green as the body (vanishes)
 *   plum premium header     off-white, mint or sky lead; plum only as a small
 *                           accent (vanishes); not yellow as the body (the
 *                           header's gold glow sits right behind it)
 */
export const CLAY_SURFACES = [
  { surface: "White or light page", lead: "Any palette colour", avoid: "—" },
  { surface: "Green offer header (upsells, exit offer)", lead: "Off-white, warm yellow", avoid: "Sky blue; mint or green as the main body" },
  { surface: "Plum premium header (annual, credits or plan, slots)", lead: "Off-white, mint, sky blue", avoid: "Plum or yellow as the main body" },
] as const

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
  {
    name: "Contact (the contact pop-up)",
    file: "contact",
    subject:
      "a rounded clay speech bubble with a small clay paper plane resting on its top edge, as if a message is about to fly off. Sky blue bubble with three small off-white dots inside, a warm yellow paper plane, a thin deep plum rim around the bubble's tail.",
  },
  {
    name: "Success (thank-you pop-ups)",
    file: "success",
    subject:
      "a rounded clay badge with a chunky check mark on its face, a few small clay confetti pieces popping out around it. Mint badge, an off-white check, warm yellow and sky blue confetti, a thin deep plum rim.",
  },
  {
    name: "Coming soon (pages still being built)",
    file: "coming-soon",
    subject:
      "a small rounded clay rocket standing on a little launch pad, a soft clay puff of cloud at its base, about to take off. Off-white rocket with a mint window, warm yellow fins, a deep plum pad.",
  },
  {
    name: "No results (empty searches)",
    file: "no-results",
    subject:
      "a chunky clay magnifier leaning over an empty rounded clay tray, a tiny clay swirl of dust inside the tray. Deep plum magnifier, sky blue tray, an off-white lens with a soft highlight.",
  },
  {
    name: "Job types (the job types pop-up)",
    file: "job-types",
    subject:
      "a rounded clay briefcase with a small clay star badge pinned to its side, standing beside a slightly smaller plain briefcase. Mint briefcase, off-white smaller briefcase, a warm yellow star, deep plum handles.",
  },
  {
    name: "Three jobs (upsell: post 3 jobs and save)",
    file: "three-jobs",
    subject:
      "three small rounded clay job cards stacked and fanned out, a little clay tag with a downward arrow hanging from the top card. Off-white cards with a mint stripe each, a warm yellow tag, a deep plum arrow.",
  },
  {
    name: "Credit pack (upsell: bigger credit pack)",
    file: "credit-pack",
    subject:
      "a small rounded clay gift box overflowing with chunky clay coins, the lid tipped open. Off-white box with a warm yellow ribbon, warm yellow coins, a small deep plum bow.",
    note: "Sits on the green offer header: off-white and yellow lead (the first, sky-blue box clashed with the green).",
  },
  {
    name: "Annual (upsell: go annual)",
    file: "annual",
    subject:
      "a rounded clay calendar page with a small clay crown resting on its top edge. Off-white page with a mint header strip, a warm yellow crown, deep plum binding rings.",
  },
  {
    name: "Unlimited (upsell: credits or a plan)",
    file: "unlimited",
    subject:
      "a chunky rounded clay infinity loop lying at a slight angle, with three small clay job cards riding along its curve as if circling endlessly. Mint loop, off-white cards with a sky blue stripe each, a small deep plum dot where the loop crosses.",
    note: "Says the offer (unlimited posts), not the layout: a forking path for 'credits or a plan' read as abstract. Sits on the plum header: mint and off-white lead.",
  },

  {
    name: "Exit offer (10% extra off)",
    file: "exit-offer",
    subject:
      "a chunky rounded clay price tag with a little clay sparkle beside it, its string looped in a bow. Warm yellow tag with an off-white hole ring, a mint sparkle, a deep plum string.",
  },
  {
    name: "Expired (offer expired)",
    file: "expired",
    subject:
      "a rounded clay hourglass with the last few grains settled at the bottom, slightly tilted. Off-white frame, sky blue glass, warm yellow sand, deep plum caps.",
  },
  {
    name: "Slots full (all job slots are in use)",
    file: "slots-full",
    subject:
      "a small rounded clay shelf with three clay job cards standing in its three slots, all full, a tiny clay plus sign beside it waiting. Off-white shelf, mint cards, a warm yellow plus, a deep plum base.",
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

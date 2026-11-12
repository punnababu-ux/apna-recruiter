---
name: reels-design-library
description: Punna's library of design, Claude and dev tips collected from saved Instagram reels (colour, typography, motion, art direction, tools, inspiration sites, security). Use when Punna asks "what did my reels say about X", wants a reference, tool or palette from the library, asks to add a new reel, or when reviewing a design for colour emphasis, type hierarchy or motion and a second lens helps. Not a replacement for a project's own design system.
---

# Reels design library

Source: reel summaries made by Meta AI, pasted by Punna on 2026-11-12, then merged and fact-flagged.
Full notes per reel: `entries.md` in this folder (read only the entry you need).
Page source: `library.html` in this folder. Published page: https://claude.ai/artifact/KPo798t5RDjZje7vQcxkFB

## Rules for using it

1. A project's own design system wins (in apna-ds, AGENTS.md). Use this library for ideas and reasons, never to override tokens or rules.
2. Meta AI summaries are a guide, not a record. Anything under "Doubtful" in `entries.md` is unchecked: verify before recommending a tool, a number or a fact.
3. Component libraries from reels are ideas only in apna-ds: raw Tailwind values fail `npm run lint:tokens`. Rebuild on tokens.
4. Several creators repost one template. Count repeats as one voice.

## Where it sits in the workflow (apna-ds)

1. **Before designing a screen or component:** read the eight principles below and pick the ones that apply. State them in the plan in one line each.
2. **Before showing a design change:** run the quick review lens below next to Sumit's lenses (`design-variants` skill, section 1c). Report holds / fails per line.
3. **When a reference or tool is needed:** look in `entries.md` first (inspiration sites, palettes, motion values, tools), then the web.
4. **When the library disagrees with AGENTS.md or `docs/DECISIONS.md`:** those win. Say so, and log it if it is a new question.

## Not verified (web check 2026-11-12) — never state these as fact

- Tools: AnimmasterLib (no official site; price and scam claims both unverified), OriginKit (Product Hunt page only), GetLayers (third-party listing only), Podie (not found), VengeanceUI (no licence named).
- People and names: "Anithing", the Grafix Mistri host's name, Rajat Patel at PhonePe / Airtel, Alex Brinza on Thinking Orbs, Marcelo Cedeno as MDX's founder.
- Claims: the red book as Albers' *Interaction of Color*, LogoRig, a `ui-animation-polish` skill, Jason Murray's "Taxonomy of Visuals" / "IRIS" as a public project, the Harper's Bazaar cobalt quote, Fonts In Use's 34k count, Kokonut UI's Tailwind v4 support, who made the font pairing sheet.
- Never supplied: links to the reels themselves.

## The eight principles

1. **One loud colour.** Two quiet colours carry the page; one saturated accent goes only on what should be clicked. Measure visual weight, not area (~80/15/5 in practice). Design in greyscale first. Match saturation between base and accent.
2. **Brief Claude like a junior.** Give references ("Linear for product UI", "Stripe for landing"), a style guide or a design system. Never "modern and professional".
3. **Few type sizes.** Three or fewer per screen. Hierarchy from weight, colour, spacing, position, casing before a new size. Line height: body 1.5, subheads 1.25, headings 1.0, huge titles 0.9; adjust by eye.
4. **Taste is trained.** Daily look at real work: Mobbin (app flows), Godly (motion), Cosmos (moodboards), Fonts In Use, It's Nice That, Glaser archive, Cooper Hewitt, Design Reviewed.
5. **Name the mechanism.** Operation → domain → technique → execution (Jason Murray). Techniques: form substitution, scale disparity, frame within a frame.
6. **Motion is short and purposeful.** 150–250ms, ease-out entrances, exits ~20% shorter, stagger ~30ms, press scale 0.97, popovers from the trigger at 0.95, no bounce on everyday UI, transform and opacity only, honour reduced motion.
7. **Pick a style on purpose.** One main + one support (~70/30). Neumorphism fails contrast.
8. **Never trust input.** Parameterised queries, keys out of the frontend and git history, AI spend caps, rate limits. Review AI code like a junior's PR.

## Quick review lens (run when asked to review with the library)

- Where does the eye land first? Is that the primary action?
- How many places use the accent on this screen?
- How many type sizes on this screen? Could weight or spacing replace one?
- Does every colour have a job (brand, semantic, neutral)?
- Any motion over 300ms, bouncing, or ignoring reduced motion?
- Can the choice be explained by mechanism, not style?

## Tools index (verify before recommending)

| Tool | For | Status |
|---|---|---|
| Thinking Orbs (github.com/Jakubantalik/thinking-orbs) | AI loading states | Confirmed MIT; React + React Native; best fit for AI surfaces |
| Hazeglow (hazeglow.dev) | Animated grainy mesh gradients | Confirmed; Lite free MIT |
| Kokonut UI (MIT), Skiper UI (freemium, $129), Magic UI, Aceternity, 21st.dev, Shadcnblocks | Animated shadcn blocks | Ideas only |
| useLayouts (uselayouts.com), Evil Buttons (evilbuttons.com, Apache-2.0) | Animated components, buttons | Confirmed free |
| AI Particle Simulator (particles.casberry.in) | Particle backgrounds | Real; no licence stated |
| daisyUI | CSS-only Tailwind classes | MIT; clashes with token systems |
| VengeanceUI (vengeanceui.com) | Cinematic interactions | No licence named |
| AnimmasterLib, OriginKit, GetLayers, Podie | Various | Could not verify; don't recommend |

Web-checked 2026-11-12; details at the end of `entries.md`.

## Reading list

Laws of UX (Yablonski; lawsofux.com) · Bierut, "How to…" · Albers, Interaction of Color · Swiss Style (Müller-Brockmann, Hofmann, Ruder).

## Adding a reel

1. Append an entry to `entries.md` in the same shape: topic, link, points, takeaway, relevant, doubtful.
2. Merge with an existing entry if it repeats one; note shared templates.
3. If it changes a principle or the tools table, update this file.
4. Update `library.html` (add the entry to the `E` array) and republish it to the same artifact URL.

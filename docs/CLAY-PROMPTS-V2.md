# Clay icons v2 — prompts

Moulded, machine-finished clay. Colour by meaning, picked for the surface
each icon sits on. Draft for generation (2026-10-30); once a round passes,
this replaces the style in `src/content/clay-style.ts`.

## How to build a prompt

**Opening line + Subject + Style block.** Paste the opening and style as is.

**Reference image:** attach `three-jobs` (the approved one, 2026-10-30) with
every prompt and add: "Match the material, angle, lighting and bevel of the
reference image."

**Opening line**

> A single 3D clay icon object, centred, three-quarter view from the front and slightly above, the object turned about 20° — never flat-on.

**Style block**

> Style: matte modelling-clay material with a fine, even clay grain, pressed in a precision mould: machine-finished, perfectly symmetrical forms, uniform rounded bevels on every edge, crisp clean seams, no fingerprints, tool marks, lumps or hand-sculpted wobble. A soft clay sheen, not glossy plastic. Soft studio key light from the top left, a gentle bright rim light along the top and right edges, subtle ambient occlusion, no cast or contact shadow. One simple object with a clear silhouette, no scene and no extra props. The main object is the hero; any secondary part (a tag, badge, sparkle) is about a third of its size, sits in front of it, never pinned to its edge, and is attached where it would be in real life. Arrows are straight (up or down), never diagonal. Stacked items are fanned in a clear arc so each one is visible. The object is one dominant colour, with at most one detail colour and one small accent; symbols are chunky raised moulded glyphs. Use only these colours: gold #FFC94D, caramel #E0A76A, tan brown #C47A3F, coral red #F06A6F, sky blue #6CB8F0, mint #7FD8B4, off-white #F4F1EC, white glyphs, dark slate #4A4E63 glyphs. No dark green, no purple or plum anywhere. Plain flat light-grey background (#E9E9EC), no text, no logos. Square 1:1, object filling about 75% of the frame, crisp silhouette for background removal.

## Lessons from review (apply to every new subject)

Found in rounds 1–3 (2026-10-30); the subjects below already follow them.

1. **Say the finished state.** Generators draw things in progress: sand
   still falling, a lid half open. Spell out the end state ("top bulb
   empty, nothing falling"; "shackle fully closed").
2. **One meaning per symbol.** Red + white plus = first aid. Check each
   symbol for a second meaning before using it; say "No red" or "No rocket"
   when a cliché tends to creep in.
3. **The user's meaning, not the system's.** Database = finding people, not
   a cylinder. Draw what the recruiter gets.
4. **One colour per idea, across the set.** Job = caramel + white
   briefcase. People = sky blue figure, white head. Money/offer = gold.
   Ended/alert = coral. Done = mint.
5. **Never cover the part that carries the meaning.** A secondary prop sits
   at a corner (lower right), never over the crossing, the clasp, the face.
6. **Every item in a group shows whole.** Fanned cards show each avatar.
7. **Compact shapes.** At most about 1.4 times as wide as tall, or it
   shrinks to half height at 56px.
8. **No blank slabs.** A large flat face reads "empty"; give it a raised
   detail (a grid, a glyph).
9. **Chunky over thin.** Rings, strings, handles, rims: thick, or they
   vanish at 56px.
10. **No two icons share an object.** Coming soon was a rocket like deploy;
    it is now a cone.

11. **Off-white is never the main colour on white.** On a white page it
    vanishes (improve, round 1). Use it for details only; the body is a
    colour.
12. **Name a familiar object for the shape.** "Box" became a ring box;
    "crate" became a pet bowl; "desk in-tray" worked first time.
13. **Check look-alikes before approving.** A striped cone is close to a
    well-known logo; an eye in clay can look odd. Ask "what else is this?".
14. **The mood fits the meaning.** Coming soon is hopeful (a sprout), not a
    warning (a cone).
15. **Put the angle in every subject** ("turned about 20°"). The opening
    line alone did not hold it.
16. **Always attach the reference image.** Without it the finish slips back
    to handmade (lumps, wobbly edges).
17. **One name, one meaning.** Before installing, check every place the
    name is used (`access` meant both "locked" and "let in").
19. **No small symbols.** A ₹ the size of a note corner comes out garbled. A symbol is either the hero (the coin) or left out.
18. **Erase the watermark** even on transparent files; the sparkle can
    survive background removal.

## The surfaces

Every icon also appears in dark mode (near-black plum #1C151E), so every
body is a light, saturated colour.

| Surface | Colours | Lead with | Never as the body |
|---|---|---|---|
| A · Green offer header | #00A86B → #082820 | Gold, caramel, off-white, coral | Mint, sky blue, any green |
| B · Plum premium header | #4E3A52 → #120E13, gold glow top-left | Sky blue, mint, off-white, coral | Plum or purple; avoid gold as the whole body (it melts into the glow) |
| C · White pop-up / page | #FFFFFF | Any | Off-white alone (needs a coloured part) |
| D · Marketing pages | Frosted white on the light mesh gradient | Any | Off-white alone |

Colour meanings: gold = money, offers, rewards · caramel = jobs, briefcase,
cards · tan brown = wallet, leather · coral = alert, expired, limits ·
sky blue = people, AI, calls, search, data · mint = success, growth ·
off-white = paper, neutral parts.

---

## A · Green offer header (jobs upsells, exit offer)

**three-jobs** (Post 3 jobs and save)
> ✅ Approved — this is the reference image.
>
> Subject: three wide rounded job cards (landscape, wider than tall) fanned out in a clear arc so all three are visible; the front card carries a raised briefcase glyph. A price tag about a third of the cards' height hangs in front of the front card, its string looped through a hole in the front card's top-right corner, with a raised arrow pointing straight down. Caramel cards (#E0A76A), white briefcase glyph, gold tag (#FFC94D) with a dark slate arrow.

**credit-pack** (Bigger credit pack)
> ✅ Installed (2026-10-30).
>
> Subject: a wide rounded open box, lid tipped back, filled with thick round coins; three coins stand up at the front, fanned so each raised ₹ symbol faces forward. Off-white box (#F4F1EC), gold coins (#FFC94D), white ₹ symbols, a coral ribbon band (#F06A6F) around the box.

**exit-offer** (Extra 10% off)
> ✅ Installed (2026-10-30). Rendered gold came out mustard (#E2B553); if regenerated, ask for "bright warm gold, not mustard".
>
> Subject: a thick rounded twelve-point starburst badge with short, soft points, tilted, with a raised % symbol in the centre. Bright warm gold body (#FFC94D, not mustard), dark slate % symbol, a small off-white four-point sparkle floating just in front of its top-right.

## B · Plum premium header (subscription upgrades, slots full)

**annual** (Go annual)
> ✅ Round 2 approved (2026-10-30): 12-square grid, big crown, gold square. Awaiting the file to install.
>
> Round 1: finish right; blank page reads "empty", crown ~15% wide (a speck at 56px), 62% flat off-white, rings thin. Not installed.
>
> Subject: a thick rounded desk calendar, three-quarter view, with two chunky binding rings; the page shows a raised grid of 12 small rounded squares (3 rows of 4), one square highlighted. A crown about a third of the calendar's width sits on top, centred between the rings. Sky blue header strip (#6CB8F0), off-white page (#F4F1EC) with off-white squares, the highlighted square gold (#FFC94D), white rings, a gold crown (#FFC94D). No numbers or text.

**unlimited** (Credits or a plan)
> ✅ Round 3 installed (2026-10-30): crossing visible, briefcase lower right; aspect 1.33 (42px tall at 56).
>
> Round 2: aspect 1.46 (38px tall at 56), turned, briefcase reads. But the briefcase hides the crossing, so the loops read as two rings ("OO"), not infinity. Usable; one more try with the subject below.
>
> Round 1 (2026-10-30): colour and finish right. Aspect 1.78, so at 56px it is only 31px tall (the other icons fill ~56); flat-on, not turned; briefcase ~12% wide, a speck at 56px. Not installed.
>
> Subject: a very chunky, thick rounded infinity loop, turned about 30° and tilted back so it shows depth, compact (about 1.4 times as wide as tall). The loop is one continuous twisted band: the crossing in the middle is clearly visible, one strand passing over the other. A gold briefcase about a third of the loop's height sits in front of the lower right curve, never covering the crossing. Sky blue loop (#6CB8F0), gold briefcase (#FFC94D) with a white clasp.

**slots-full** (All job slots are in use)
> ✅ Round 2 approved (2026-10-30): caramel job cards, briefcase, sky plus floating front-right. Awaiting the background-removed file.
>
> Round 1: finish and angle right. Red disc + white plus reads as first aid / medical. Blank mint cards read as files, not jobs (jobs are caramel elsewhere). Badge glued to the tray's face. Not installed.
>
> Subject: a wide rounded tray with three slots, each holding an upright wide job card, filled to the brim, the front card carrying a raised white briefcase glyph. A round badge with a raised plus, about a third of the tray's height, floats just in front of the tray's lower right, not attached to it. Off-white tray (#F4F1EC), caramel cards (#E0A76A), a sky blue badge (#6CB8F0) with a white plus. No red.

**database** (Database credits, database offers)
> ✅ Round 2 approved (2026-10-30): reads as "find a person in a pool". Minor: the magnifier hides most of the cards' avatars, and the cards sit at a different tilt from the magnifier. If redone, fan the cards out to the left so each avatar shows whole. Installed as database-search.png.
>
> Round 1: finish right, but a database cylinder is a cliché and says "data", not "people". apna Database is candidate search. Concept changed.
>
> Subject: a chunky magnifying glass, tilted, its round lens framing a raised person (round head, rounded shoulders) inside it; behind it, two wide rounded profile cards fanned out, each with a small raised avatar circle, so the magnifier picks one person out of many. Gold magnifier ring and handle (#FFC94D), white lens, sky blue person (#6CB8F0) with a white head, off-white cards (#F4F1EC) with sky blue avatars. The magnifier is the hero; the cards are about two thirds of its height.

## C · White pop-ups (product)

**expired** (offer expired, cancel plan, plan ended)
> ✅ Round 2 approved (2026-10-30): top empty, sand settled. Installed.
>
> Round 1: finish, tilt and colours right. Half the sand is still on top and falling, so it reads "time running out" (a countdown), not "expired".
>
> Subject: a rounded hourglass, slightly tilted, finished: the top bulb completely empty, all the sand settled in a mound at the bottom, nothing falling. Coral frame (#F06A6F), off-white glass (#F4F1EC), gold sand (#FFC94D).

**contact** (Contact us, Talk to sales)
> ✅ Round 1 approved (2026-10-30). Slightly flatter than the set (turned ~10°, not 20°); fine at 56px. Installed.
>
> Subject: a thick rounded speech bubble with a clear tail at its lower left, three raised dots inside. Sky blue bubble (#6CB8F0), white dots.

**job-types** (job types pop-up, plan step)
> ✅ Round 1 installed (2026-10-30). Also used by "Continue your draft?" (post-job flow), where a briefcase + star is the wrong message; see **draft** below.
>
> Subject: a chunky rounded briefcase with a thick top handle and a front clasp; a gold star badge about a third of its height floats in front of its lower right, not covering the clasp. Caramel body (#E0A76A), off-white clasp (#F4F1EC), a gold star (#FFC94D).

**draft** (new: "Continue your draft?", replaces job-types there)
> ✅ Round 2 approved (2026-10-30): turned, one even colour. Installed; "Continue your draft?" uses it.
>
> Round 1: meaning reads (unfinished job + pencil). Flat-on, not turned; "lower half blank" came out as a two-tone seam across the card (reads as a folder). Pencil has a wood/graphite tip outside the palette (fine, it reads).
>
> Subject: a wide rounded job card, turned about 20° and tilted back so its thickness shows, one even caramel colour all over (no seam, no second tone): two raised text lines at its top, the space below them empty, a chunky pencil lying diagonally across its lower right, tip touching the card. Caramel card (#E0A76A) with a white briefcase glyph at top left and off-white lines (#F4F1EC), a gold pencil (#FFC94D) with a coral eraser (#F06A6F).

**improve** (plan change: upgrade)
> ✅ Round 2 approved (2026-10-30): sky bars on a shared base, gold top bar, mint arrow. Installed.
>
> Round 1: reads as growth; arrow on the gold bar works. But two of three bars are off-white, and this sits on white pop-ups: they vanish, leaving a lone gold bar. Bars also stand apart with an empty top-left. Not installed.
>
> Subject: a compact bar chart of three thick rounded bars touching side by side on one shared base, rising left to right, all bars fully visible, with a chunky arrow pointing straight up from the top of the tallest bar. Sky blue short bars (#6CB8F0), the tallest bar gold (#FFC94D), a mint arrow (#7FD8B4) with a thick stem. No off-white bars.

**success** (thank-you, plan changed)
> ✅ Round 1 installed (2026-10-30).
>
> Subject: a thick round badge with a chunky raised check mark in the centre, nothing else. Mint body (#7FD8B4), white check.

**access** (city locked, access)
> Round 1 (2026-10-30): well made (closed, chunky). But `access` serves two opposite meanings: "Lock your plan to a city" (city-lock dialog) and the Interview lounge's "Access" step (students get in). A locked padlock is wrong for the second, and a plain padlock doesn't say "city" for the first. Split into **city-lock** (this) and **lounge-access** (below).
>
> ✅ city-lock installed (2026-10-30); the city-lock dialog uses it.
>
> Subject (**city-lock**): a chunky rounded padlock, locked: the thick shackle fully closed into the body; on its front, instead of a keyhole, a raised map pin. Gold body (#FFC94D), off-white shackle (#F4F1EC), a sky blue map pin (#6CB8F0) with a white dot.

**lounge-access** (Interview lounge "Access" step)
> ✅ Installed (2026-10-30); the lounge Access step uses it. Note: team-management is also ID badges (three, fanned); different page, but keep that one a group so they never look alike.
>
> Subject: a chunky rounded entry pass on a short lanyard loop, a raised round avatar at its top and a raised check mark below it. Sky blue pass (#6CB8F0), white avatar, a mint check (#7FD8B4), an off-white loop (#F4F1EC).

**no-results** (empty search)
> Round 1 (2026-10-30): well made, but a "?" also reads as help/FAQ. User call: show an empty box instead.
>
> Round 2: empty reads, but the hinged lid makes it a jewellery / ring box, and the magnifier floats over the lid, not into the box.
>
> ✅ Round 4 approved (2026-10-30): desk in-tray, empty, magnifier on the rim. Installed.
>
> Round 3: came out round; a round caramel tub reads as a pet bowl. Magnifier still thin.
>
> Subject: a wide, shallow, open-top rectangular tray (four straight sides, softly rounded corners, like a desk in-tray), no lid at all, seen from slightly above, clearly empty inside (a plain inner floor), with a chunky magnifying glass (thick ring and handle, as thick as the tray's walls) resting on its front rim, its lens over the empty inside. Caramel box (#E0A76A) with an off-white inner floor (#F4F1EC), a sky blue magnifier ring and handle (#6CB8F0), a white lens. Nothing in the box, nothing in the lens.

**coming-soon** (pages still being built)
> Round 1 (2026-10-30): well made, but a coral-and-white striped cone is close to a well-known media-player logo, and coral means alert/ended in this set, so it reads "blocked". Coming soon should feel hopeful.
>
> ✅ Round 2 installed (2026-10-30).
>
> Subject: a small rounded flower pot with a young sprout growing out of it: a short thick stem and two chunky rounded leaves, just opened. Caramel pot (#E0A76A), off-white soil top (#F4F1EC), mint stem and leaves (#7FD8B4), a tiny gold bud (#FFC94D) between the leaves. No flower yet, no text.

**restricted** (not allowed / no access; not used yet)
> ✅ Installed (2026-10-30): the coral striped cone from coming-soon round 1, kept by user call. Use where the recruiter cannot go or do something (no permission, feature not on their plan). Watch the resemblance to a media-player logo if it is ever shown large.

**ai-calling** (AI calling agent)
> Round 1 (2026-10-30): handset reads. But the waves are white: on a white pop-up (and the light sky AI add-on card) they vanish, leaving a phone and a floating star. The sparkle sits apart from the phone, so "AI" reads as decoration.
>
> ✅ Round 3 approved (2026-10-30): smooth moulded finish back. Installed (watermark erased); not used on any screen yet.
>
> Round 2: colours and sparkle fixed. But the finish drifted to handmade: lumpy, uneven surfaces, soft wobbly edges. Regenerate with the three-jobs reference image attached.
>
> Subject: a chunky rounded phone handset tilted at an angle, two thick curved signal waves beside its upper end, and a chunky four-point sparkle about a third of the handset's size sitting at the end of the outer wave, touching it (the AI). Sky blue handset (#6CB8F0), mint waves (#7FD8B4), a gold sparkle (#FFC94D). No white parts. Perfectly smooth moulded surfaces, crisp even edges, no lumps.

**wallet** (balance, payments)
> ✅ Round 2 approved (2026-10-30): no symbol, notes read as money. Installed; not used on any screen yet.
>
> Round 1 (2026-10-30): wallet, strap and notes right. The small ₹ on the note came out garbled.
>
> Subject: a chunky rounded bifold wallet, turned about 20°, a thick strap with a round snap button, three banknotes fanned so each shows, peeking out of the top. Tan brown body (#C47A3F), mint notes (#7FD8B4) with a raised round dot in the centre of the front note (no symbol), a gold snap (#FFC94D).

**coin** (price, credits)
> ✅ Round 1 installed (2026-10-30); not used on any screen yet. Not a replacement for the design system `Coin` (the small flat gold ₹ in buttons and the bottom bar).
>
> Subject: a thick round coin turned about 25° so its edge shows, a raised rim and a chunky raised ₹ symbol in the centre. Gold body (#FFC94D), white ₹.

**alert** (warnings)
> ✅ Round 1 installed (2026-10-30). not used on any screen yet.
>
> Subject: a thick round badge turned about 20°, a chunky raised exclamation mark in the centre, nothing else. Coral body (#F06A6F), white mark.

**info** (new: notes, tips, "good to know"; not used yet)
> ✅ Round 1 approved (2026-10-30). Generated turned the other way from alert and success; installed mirrored so all three badges face the same way. Not used on any screen yet.
>
> Subject: a thick round badge turned about 20°, a chunky raised lowercase "i" in the centre (a round dot above a short rounded bar), nothing else. Gold body (#FFC94D), a dark slate "i" (#4A4E63). Same badge shape as alert and success.

## D · Marketing pages

### Enterprise

**employer-branding**
> ✅ Round 2 approved (2026-10-30): turned, edge shows, even scallops. Installed.
>
> Round 1 (2026-10-30): reads, colours right. Came out dead flat-on (0°) and the scalloped rim is slightly wobbly. Regenerate with the reference attached.
>
> Subject: a chunky rounded award rosette, turned about 25° to the right so its thick edge shows, an evenly scalloped rim (12 identical scallops), with two thick ribbon tails hanging below and a raised star in the centre. Gold rosette (#FFC94D), sky blue tails (#6CB8F0), a white star.

**team-management**
> Round 1 (2026-10-30): colours and finish right. But the middle badge covers half of each side badge's avatar (cut-off people), and the group faces flat-on.
>
> ✅ Round 3 approved (2026-10-30): three figures on a base, every head visible. Installed.
>
> Round 2: same cut-off avatars; the generator keeps centring each avatar, so overlapping badges always hide them. Drop the badges.
>
> Subject: three chunky rounded person figures (round head, rounded shoulders, like simple pawns) standing close together in a shallow V on one small round base, the middle one slightly taller and in front, turned about 20° as a group; each figure fully visible, none covering another's head. Sky blue, mint and gold bodies (#6CB8F0, #7FD8B4, #FFC94D) with white heads, an off-white base (#F4F1EC). No badges, no cards.

**ats-integrations**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: two chunky rounded puzzle pieces fully joined together, the tab sitting inside the slot. Sky blue piece (#6CB8F0) and gold piece (#FFC94D).

**reports**
> ✅ Round 1 approved (2026-10-30). Close to improve (rising bars, gold tallest) but the clipboard sets it apart. Installed.
>
> Subject: a chunky rounded clipboard, turned about 20°, holding a white sheet with a raised bar chart of three thick bars. Sky blue board (#6CB8F0), a gold clip (#FFC94D), a white sheet, mint and gold bars.

**power-features**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: a chunky, thick rounded lightning bolt, turned about 20° so its depth shows. Gold body (#FFC94D), nothing else.

**dedicated-support**
> ✅ Round 2 approved (2026-10-30): thick mic arm, big gold mic. Installed.
>
> Round 1 (2026-10-30): finish and colours right. But the mic arm is thin and the gold tip tiny: at 56px it vanishes and the icon reads as music headphones, not support.
>
> Subject: a chunky rounded headset, turned about 20°, a thick band, two ear cups, and a prominent microphone arm as thick as the band, curving to the front, ending in a large rounded mic about the size of a third of an ear cup. Sky blue band and ear cups (#6CB8F0), white cushions, a gold mic tip (#FFC94D).

**smart-inbound**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: a chunky rounded funnel, turned about 20°, with two small profile cards dropping into its wide top, each card and its avatar fully visible. Sky blue funnel (#6CB8F0), white cards with raised gold avatars (#FFC94D). No tray (no-results is the in-tray).

**database-search**
> ✅ Already installed (2026-10-30): the gold magnifier picking a person out of profile cards (see **database** above). Nothing to generate; skip it.

**walk-ins**
> Round 1 (2026-10-30): finish right. But the figure has arms and legs (an exit-sign person, not our pawn people) and turns away into the door, so it reads "leaving", the opposite of walk-in.
>
> ✅ Round 3 approved (2026-10-30): open door + welcome mat reads at 56px. Minor: the door swings out and the inner wall reads like a second panel; regenerate only if it bothers you large. Installed.
>
> Round 2: still arm stubs, and a faceless figure cannot show which way it walks, so "in" vs "out" stays unreadable. Frame came out lumpy. Drop the person.
>
> Subject: a chunky rounded open door in its frame, turned about 20°, the door swung wide open inward, a warm glow of light from inside; in front of it on the floor a thick rounded welcome mat. Off-white frame (#F4F1EC), caramel door (#E0A76A), a gold mat (#FFC94D), a sky blue floor inside the doorway (#6CB8F0). No people, no text on the mat. Perfectly smooth moulded surfaces.

**enterprise**
> ✅ Round 2 approved (2026-10-30): reads as an office tower. Tall and slim, so it looks narrower than its neighbours in a square card. Installed.
>
> Round 1 (2026-10-30): finish right, but squat rounded stacked rings read as a database server or a food container (the cliché we removed from database), and the many thin window lines vanish at 56px.
>
> Subject: a slim office skyscraper, about twice as tall as it is wide, a rectangular box with straight sides and softly rounded edges, turned about 20° so two faces show; each face has a grid of chunky square windows (3 across, 4 rows), a flat roof with a small raised block on top. Sky blue body (#6CB8F0), white window bands, a gold door (#FFC94D).

### Company (About, Culture, Careers)

**mission**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: a chunky rounded flag waving on a thick short pole, planted in a small round base, turned about 20°. Gold flag (#FFC94D), white pole, a sky blue base (#6CB8F0).

**ownership**
> ✅ Round 1 approved (2026-10-30). Minor: the hole sits off-centre (top right of the head). Installed; the hole is see-through.
>
> Subject: a chunky rounded key, turned about 20°, a round head and three thick teeth. Gold body (#FFC94D), a dark slate hole in the head.

**customer-obsession**
> ✅ Round 1 approved (2026-10-30). Coral here is the heart's own colour, not "alert". Installed.
>
> Subject: a thick rounded heart, turned about 20°, a raised star on its face. Coral heart (#F06A6F), a white star.

**empathy**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: two thick rounded speech bubbles overlapping, each with a clear tail, the front one with a raised heart. Sky blue back bubble (#6CB8F0), mint front bubble (#7FD8B4), a coral heart (#F06A6F). No dots (contact is the bubble with dots).

**transparency**
> ✅ Round 2 approved (2026-10-30): glass reads (pale tint + glare streaks). Handles still thin; fine at 56px. Background removal may eat the pale glass: check it survives. Installed; the glass survived.
>
> Round 1 (2026-10-30): finish right, but solid white panes read as cupboard doors, not glass: the opposite of "transparent". Handles thin.
>
> Subject: a chunky rounded window with a thick frame and two square panes of clear glass, turned about 20°; the right pane swung wide open. The glass is a very pale see-through sky tint with two short diagonal white glare streaks on each pane (the familiar "glass" mark). Sky blue frame (#6CB8F0), a chunky gold handle on each pane (#FFC94D). No solid panes, no eye.

**momentum**
> Round 2 (user: looks bad): the wavy tail joined to the plane makes one tadpole-like shape. Curved trails keep failing; use short straight speed lines instead.
>
> Round 1 (2026-10-30): plane right. But the trail is three bundled tubes curling down into a hook: reads as a tentacle, and a downward hook says "falling", not momentum.
>
> ✅ Round 4 approved (2026-10-30): plane alone, mint crease. Installed.
>
> Round 3 (user: looks like the plane is pooping): anything behind the tail reads as dropping out of it. Plane alone.
>
> Subject: a chunky rounded paper plane alone, climbing steeply to the upper right at about 45°, turned about 20° so its folded wings and thickness show. Sky blue plane (#6CB8F0) with a mint fold line along its centre crease (#7FD8B4). Nothing behind or below it: no trail, no lines, no clouds.

**ownership-over-hierarchy**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: three chunky rounded blocks of exactly the same height side by side on one level, turned about 20°, the middle one with a raised star. Mint, sky blue and caramel blocks, a gold star (#FFC94D).

**raise-the-bar**
> ✅ Round 1 approved (2026-10-30). Bowl is round, slightly mug-like; the stem and base make it a trophy. If redone: "a cup that flares wider at the rim". Awaiting the transparent file.
>
> Subject: a chunky rounded trophy cup with two thick handles on a short base, turned about 20°. Gold cup (#FFC94D), a sky blue base (#6CB8F0).

### Interview prep lounge

**student**
> ✅ Round 1 installed (2026-10-30).
>
> Subject: a chunky rounded graduation cap, turned about 20°, a thick tassel hanging over its edge. Sky blue cap (#6CB8F0), a gold tassel (#FFC94D).

**university**
> ✅ Round 1 approved (2026-10-30). A columned building can also read "bank"; its card title and the student cap beside it settle it. Installed.
>
> Subject: a small chunky rounded building with four thick columns and a triangular roof on a stepped base, turned about 20°. White columns, a sky blue roof and base (#6CB8F0), a gold door (#FFC94D).

**government**
> Subject: a small chunky rounded building with a large dome on top, turned about 20°. Mint body (#7FD8B4), a sky blue dome (#6CB8F0), a gold finial (#FFC94D), white windows.

**deploy**
> Subject: a chunky rounded rocket lifting off a small round pad, turned about 20°, a short thick flame below it. Sky blue body (#6CB8F0), a white window, coral fins (#F06A6F), a gold flame (#FFC94D).

**practise**
> Subject: a chunky rounded microphone on a short thick stand, turned about 20°. Sky blue head (#6CB8F0), a gold stand (#FFC94D).

**track**
> Subject: a thick rounded speedometer dial, turned about 20°, a raised needle pointing to the upper right. Sky blue body (#6CB8F0), a white face with mint, gold and coral arc bands, a dark slate needle.

---

## How to check a round

1. Generate in one session, same tool and settings, with the reference
   image attached.
2. Crop out the generator's watermark (Gemini's sparkle, bottom-right),
   then remove the backgrounds.
3. Place each icon on its real surface: A on a #00A86B → #082820 sweep,
   B on a #4E3A52 → #120E13 sweep, C and D on white. Then every icon on
   #1C151E (dark mode).
4. An icon fails if it sinks into its surface or its sheen, bevel or angle
   doesn't match the rest. Fix that subject, not the style block.

## Measured (round 1, 2026-10-30)

The header icon sits top-left, where the green header is its lightest
(#00A86B). Average body vs that green has almost no light/dark contrast:
three-jobs 1.1, credit-pack 1.3, exit-offer 1.2 (annual 1.9). They read by
hue only (warm on green). Fine on screen today; at small sizes or for
colour-blind users they blur. On the darker header (#135343) and plum
(#4E3A52) all are 3.4–6.8, fine.

| Icon | Main colours rendered | Aspect | Note |
|---|---|---|---|
| three-jobs | #D39F61 caramel, #915E37 shade | 1.16 wide | On spec |
| credit-pack | #E4DFD8 off-white, coral ribbon | 0.99 | On spec; lightest of the three |
| exit-offer | #E2B553 gold | 0.94 | Duller than #FFC94D; spiky shape fills 66%, looks smallest |
| annual (r1) | #E5E2DD off-white 62%, #88A8B9 blue | 0.85 tall | Too plain; see subject |

If the green-header icons need more separation, the cheaper fix is in code (a soft
light halo behind the header icon), not a regeneration.

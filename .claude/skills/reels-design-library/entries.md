# Reels library (raw entries)

## 1. Aminul Islam: 5 websites to sharpen design taste
- Topic: Web design inspiration
- Link: not given
- Sent twice (second summary gave fuller addresses; merged here)
- Sites:
  - howtotalktowhitekidsaboutracism.com: interactive project about racism; bold type, illustration, scroll-driven storytelling
  - twomuch.studio: studio portfolio; grid layout, 3D product renders, motion
  - Shopify Editions "Exponential" (Oct 28, 2026): AI features (agentic commerce, Sidekick, Canvas editor), 150+ updates; product-marketing reference
  - unbelievablycrap.com: black/white/red, breaks the grid but stays readable
  - haoqi.design: Haoqi Wen's portfolio; large 3D type, motion + typography
- Conflict: Shopify URL given as "shopify.fall2026" and "shopify.com/editions/winter2026" for a Fall '26 release; confirm the real address
- Note: full links only by commenting "WEB" (DM bait)
- Doubtful: Meta AI's context on the Shopify release (10th release, "heavy on mobile") is not checked

## 2. Peter A Surowski: SQL injection warning for vibe coders
- Topic: Security / AI-generated code
- Link: not given
- Attack: `' OR 1=1 --` in a login field; works when the query is built by string concatenation
- Fixes: validate input; sanitise as backup; parameterised queries (the real fix)
- Takeaway: review AI-written SQL like a junior's PR; parameterise, add least-privilege DB accounts
- Doubtful: "23% of breaches in 2025" not checked; "strip code characters" is weak advice (escaping is fragile; parameterise instead)

## 3. Omar Farook: Claude redesigns a button pair
- Topic: Claude for UI / CTA design
- Link: not given
- Secondary "Log in": outline removed, text link, underline on hover
- Primary: lift on hover (shadow + translateY), rotating conic-gradient glow
- Copy: "Get started" -> "Book my first client" (outcome, not task)
- Takeaway: give Claude a style guide / design system, or it defaults to Inter, purple gradients, rounded cards
- Doubtful: -8px lift seems large (maybe -2px); "CSS can't animate gradients" is outdated (@property can); Claude Design launch date not checked

## 4. Quanova AI: the 60-30-10 colour rule ("TAKTO 75" keyboard page)
- Topic: Colour / visual hierarchy
- Link: not given
- 60% Chalk White #F2F1EE (background), 30% Onyx Black #121214 (text, structure), 10% accent (CTAs, highlights)
- Accents: Tangerine Glow #FF8A1C (warm), Electric Violet #7B4DFF (premium, tech), Mint Rush #22E3A2 (fresh)
- Takeaway: same layout, one accent swap changes the mood; keep the accent rare so it stands out (same idea as Von Restorff / one green per surface)
- Doubtful: tangerine and mint fail contrast as text or with white labels on the light background; fine as fills with dark labels. Brand and renders are AI-generated (Blender)
- Second Quanova reel (same rule, applied to the keyboard itself, not the page): 60% case/keycaps, 30% frame/secondary keys, 10% Esc key, knob, small key cluster
  - Oat milk + forest green + tomato red: calm, intentional
  - Midnight navy + powder blue + sunflower yellow: yellow "wakes it up"
  - Blush pink + charcoal ink + fresh mint: mint is the surprise pop
  - No hex codes given in the summary

## 5. Ayo Omolewa: three rules so a mobile app doesn't look flat
- Topic: Visual hierarchy / mobile UI
- Link: not given
- Three planes: big background text, subject in the middle, buttons on top; overlap gives depth
- One signal colour, only on tappable things; the rest is "ink and paper"
- Huge vs tiny: primary very large, secondary small, avoid middle sizes
- Takeaway: generic-looking UI is usually a hierarchy problem, not styling
- Doubtful: commenters' point stands: you still need a button hierarchy (primary, secondary, destructive), not one colour for everything tappable. Overlaps with entry 4 (accent rarity)

## 6. Jameel Haider: Hazeglow Generator (animated grainy mesh gradients)
- Topic: Tools / backgrounds and gradients
- Link: not given (DM hook "GLOW")
- What: free in-browser builder; shapes (pill, band, blob, ring, 16-point mesh); size, softness, warp; effects (grain, motion, dither, halftone, glass, ASCII)
- Export: React snippet, JSON, PNG/MP4; `npm i hazeglow`; WebGL2, ~13kb, pauses off-screen, CSS fallback, reads CSS variables
- Pricing: Lite free (MIT), Pro $7/mo planned (Framer, Figma, brand kits)
- Takeaway: grain hides banding on large gradients
- Doubtful: all specs (size, licence, price, npm name) are from the promo/Meta AI, not checked. Alternatives named: FeralUI Gradient Builder, 21st.dev Mesh Gradient

## 7. Grafix Mistri Show (Bhavya Taneja's podcast): 4 designers to follow
- Topic: People to follow / learning
- Link: not given
- Rajat Patel: product designer (ex Zepto, PhonePe, Airtel), building molecule.community; Claude for design, frontend, critiques
- "Anithing": storytelling, satisfying design content
- Ben Marriott: motion design tutorials (YouTube)
- Michael Bierut (Pentagram): book "How to use graphic design to sell things, explain things, make things look better…"
- Doubtful: "Anithing" is likely a misheard name, no info found by Meta AI; "Rajat Patel / Claude Design" label unclear (Claude Design is Anthropic's product, not his); Rajat's career details not checked

## 8. Alex Yates: beat "Claude slop" with reference sites
- Topic: Claude for UI / prompting
- Link: not given
- Idea: name real sites + the one thing to borrow, instead of "modern and professional"
- Apple: animations · Duolingo: onboarding · Linear: product UI · Pentagram: typography · Muji: minimalism · Airbnb: search and filters · Aesop: art direction · Notion: dashboards · Stripe: landing pages · Framer: micro-interactions
- Takeaway: brief Claude like a junior designer, with references; pick references that fit the product
- Doubtful: "Claude defaults to big serif title + dark background" conflicts with entry 3 (Inter + purple gradients); the default varies by model and prompt. Overlaps with entry 3 (give Claude a style guide)

## 9. Marcelo Cedeno (MDX studio): 4 experimental carousels
- Topic: Motion / web inspiration
- Link: not given
- 3D curving image wave · circular card orbit · chaotic multimedia collage · diagonal stack with depth
- Shown in Figma with "Copy to Figma" / "Export HTML"
- Takeaway: treat a carousel as motion design; production needs keyboard nav, reduced motion, pause on hover/focus (WCAG 2.2.2)
- Doubtful: the NN/g click-through point and MDX "award-winning" are Meta AI context, not checked; export tool not named
- Second Cedeno reel: "POV: you mastered colour theory", 4 mockups with 5-colour palettes
  - Crest (finance app): burnt orange, peach, burgundy; warm, approachable finance
  - Kai Rennard (personal brand): teals and tans; calm, earthy
  - Emberline (analytics dashboard): high-contrast reds/oranges; urgent
  - Orvane (celestial site): night blues + beige; premium, sci-fi
  - Takeaway: assign colours roles (brand, semantic, neutral), check contrast; ties to entry 4 (60-30-10)
  - Doubtful: showcase, not a tutorial; no hex codes; theory points are Meta AI's, not from the reel

## 10. Strategy Fox: 10 UI styles to pick on purpose
- Topic: Visual styles / anti-slop
- Link: not given
- Skeuomorphism (tactile, dates fast) · Minimalism (safe, trust) · Glassmorphism (frosted panels) · Neumorphism (soft, low contrast, fails a11y) · Claymorphism (puffy 3D, friendly) · Neo-brutalism (thick borders, raw) · Bento grid (modular tiles) · Retro Y2K (chrome, gloss) · Liquid Glass (Apple, iOS 26 / macOS Tahoe) · Flat (clear but clickability can be unclear)
- Pick by feeling: premium = glass; friendly = clay; raw = neo-brutalism; trust = minimal/flat; nostalgic = skeuo
- Takeaway: one main style + one support (~70/30), e.g. minimalism + bento for SaaS
- Relevant: Apna already mixes frosted glass (marketing cards) + clay illustrations + minimal product UI
- Doubtful: NN/g "2026 report" not checked
- Companion reel (creator unknown): 20 graphic design styles, poster per style, names only
  - Minimal and structured: minimalism, Swiss, editorial
  - Digital: glassmorphism, clay, pixel art, futuristic
  - Retro: Y2K, retro 70s/80s, Victorian
  - Expressive: maximalism, surreal, pop art, collage, bohemian, graffiti, handwritten
  - Experimental: cyberpunk, aurora (northern-lights gradients), vector art
  - Takeaway: a naming reference; pick a style by audience, not mood board
  - Doubtful: examples may be AI-generated (commenters); trend commentary is Meta AI's

## 11. Vibee (?): Kokonut UI, "physical-feeling" React components
- Topic: Tools / component libraries
- Link: not given
- What: 100+ free MIT components; Tailwind + Framer Motion + shadcn; installs as source via shadcn CLI (`npx shadcn add @kokonutui/pull-cord`)
- Demos: lamp pull-cord, clicking temperature dial, tear-off confirm stub, pluckable headline, rings past 100%, 3D terrain heatmap, slide to pay
- Takeaway: a motion layer, not a design system; still needs base primitives
- Relevant: Apna's DS is shadcn-style on Base UI with tokens; any borrowed component must be rebuilt on tokens (raw Tailwind values fail lint:tokens) and adds Framer Motion
- Doubtful: creator name unclear ("Vibee's demo"); ~1.8k stars, Tailwind v4 claim not checked. Similar: Magic UI, Skiper UI

## 12. Vishal Kumar: 5 resource sites for building UI with AI
- Topic: Tools / assets and components
- Link: not given
- GetLayers: hero sections, gradients, 3D scenes to feed AI tools; Figma plugin; mostly paid
- OriginKit: animations, text effects
- useLayouts: animated UI components
- Evil Buttons: playful animated buttons
- Podie: UI kits + full app templates
- Takeaway: start AI builds from designed assets, not a blank prompt
- Doubtful: Meta AI says the other four are "less documented"; names and paid/free status not checked. GetLayers "3D" may be video, per comments

## 13. Jason Murray (Modern Art Direction): "Taxonomy of Visuals"
- Topic: Art direction / design reasoning
- Link: not given (waitlist: comment "IRIS")
- Problem: moodboards without reasons; "make it premium" never becomes a defensible choice
- Structure: Operation (goal, e.g. Differentiate) -> Domain (Feature: colour/shape; Semantic: meaning; Cultural: context) -> Technique (e.g. semantic contrast, contextual metaphor) -> Execution (real ads: Rolling Stone, Vogue, Absolut, LOEWE)
- Takeaway: name the mechanism, not the aesthetic; useful for briefing AI and defending choices to stakeholders
- Status: beta, inside his bootcamp; may not go public
- Doubtful: "IRIS" may be the tool's name or just the hook; client list not checked
- Second Murray reel: 3 techniques for when you're stuck
  - Form substitution (keep the shape, swap the object): Absolut Athens column-bottle, PS2 controller in an eye, diamond pupil
  - Scale disparity (wild size contrast): Esquire person inside a Campbell's can, child with flower-balloon, woman beside giant fish
  - Frame within a frame (a boundary inside the image): Se7en poster, The Lobster poster, mirror photo by the sea
  - Relevant: usable in Apna's clay illustrations and marketing heroes
  - Doubtful: poster descriptions are Meta AI's, not checked

## 14. Kevin: 3 sites for vibe coders
- Topic: Tools
- Link: not given (DM hook "VIBE")
- Particles Casberry: particle backgrounds (orbs, starfields, mesh), tweak params, export Vanilla JS / React; free in browser
- OriginKit: second mention (also in entry 12); Tailwind + shadcn, 100+ micro-interactions (mesh text, morph, draggable stickers); pricing unknown
- DaisyUI: CSS-only Tailwind plugin, semantic classes (btn, card, modal), themes; free, open source; well established
- Doubtful: "vibe coding coined in 2026" is wrong; Karpathy coined it in Feb 2025. "Particles Casberry" name may be misheard
- Relevant: DaisyUI's own class/theme system would clash with Apna's token system; reference only

## 15. Matt D. Smith (Shift Nudge): Design principles part 1, typography
- Topic: Typography / hierarchy
- Link: not given (comment "16" for the Claude skill file)
- Five attributes per text style: size, weight, line height, width, alignment; change one, rebalance the rest
- Rule: 3 type sizes or fewer per screen; first get hierarchy from weight, colour, spacing, position, casing
- Takeaway: "Fewer sizes. More intention."; precise words help direct AI
- Series: 16 principles, packaged as a Claude Code / Cursor skill file
- Relevant: Apna's scale is large (text-xs..6xl + presets); the rule applies per screen, not to the whole scale. Menu type scale in AGENTS.md already does this (base semibold heading, xs subtext, sm rows)
- Doubtful: "known for Float Label pattern adopted by Apple and Google" not checked

## 16. Font pairing cheat sheet (image, creator unknown)
- Topic: Typography / font pairing
- Link: not given; source is a screenshot
- Roles: headings bold/display, subheadings medium/semibold, body regular/light
- 12 pairs (heading + body): Playfair Display + Montserrat (modern, clean) · Montserrat + Lato (bold, minimal) · Bodoni Moda + Poppins (elegant) · Pacifico + Montserrat (creative) · Lora + Open Sans (strong) · Helvetica Neue + Source Sans Pro (minimal) · Abril Fatface + Raleway (vintage) · Rajdhani + Roboto (tech) · Quicksand + Nunito (soft, friendly) · Cormorant Garamond + Lato (luxury) · Anton + Muli (edgy) · Fraunces + Inter (fresh)
- Tips: 2-3 fonts per design; pair a display font with a clean one; hierarchy through weight; same pairing across the brand
- Doubtful: Helvetica Neue is not free (the rest are Google Fonts); Muli is now "Mulish" on Google Fonts; some mood labels are loose (Lora "strong & modern")
- Relevant: Apna = Google Sans Flex bold (marketing headlines) + Inter (everything else); matches the "display + clean" tip

## 17. Maxwell Gomes: "10-second rule" for vertical logo lockups
- Topic: Branding / logo construction
- Link: not given
- Width: wordmark = 3x icon width (copy the icon twice beside itself)
- Height: tagline = 1/3 of wordmark height (stack 3 wordmarks, split the bottom one in thirds)
- Demo brand: "CRATE - shop in bulk", cube icon
- Takeaway: a starting grid; then adjust optically (a dense icon and a thin wordmark need visual-weight tweaks, not just maths)
- Doubtful: commenters say the result isn't balanced; LogoRig and its ink-density method are Meta AI context, not checked

## 18. Maxwell Gomes: tint, tone, shade
- Topic: Colour / vocabulary
- Link: not given
- Tint = colour + white (lighter, softer; backgrounds) · Tone = colour + grey (muted, less saturated) · Shade = colour + black (darker; text, emphasis)
- Mnemonic: white = tint, grey = tone, black = shade
- Takeaway: precise words for briefs and dev hand-off; a 50-950 ramp is tints (low numbers) to shades (high numbers)
- Relevant: Apna's primitives.css ramps work this way; "-subtle" fills are tints
- Book shown: Josef Albers, "Interaction of Color" (identification is Meta AI's, not checked)
- Third Gomes reel: Swiss Style (International Typographic Style) -> filed as entry 20 below

## 19. Abhay: 5 sites to build taste daily
- Topic: Inspiration sources
- Link: not given (hook "PART 2")
- Godly: websites with motion (steal the motion, not the layout)
- Cosmos: calmer Pinterest alternative for moodboards
- Mobbin: real app screens and flows (onboarding, checkout, settings)
- Fonts In Use: typography in real contexts, fonts named
- It's Nice That: case studies, design thinking (read, don't scroll)
- Takeaway: taste comes from daily exposure to good work; mix inspiration, reference, and thinking
- Relevant: Mobbin is the most useful for Apna (checkout, job posting, plan flows from real apps)
- Doubtful: "Fonts In Use lists commercial licensing for every entry" is likely wrong; it names fonts, licences come from the foundry

## 20. Maxwell Gomes: Swiss Style in 10 seconds
- Topic: Design history / layout and grids
- Link: not given
- Rule: strict grid, sans-serif type, flush left / ragged right, lots of white space
- Origin: Zurich and Basel, 1950s; one page in German, French, Italian; teachers Müller-Brockmann, Hofmann, Ruder; journal Neue Grafik (1958-65); Helvetica (Neue Haas Grotesk), Max Miedinger, Haas foundry, 1957
- Principles: grid decides placement; hierarchy by size and weight; asymmetric balance; white space as structure; photos cropped to the grid; restrained colour + one accent
- Today: column grids, 8pt spacing, Tailwind spacing scales come from it
- Takeaway: if a design feels cluttered, start with a grid and remove ornament
- Relevant: Apna's spacing scale and one-accent rule are Swiss in spirit
- Doubtful: "only grotesques were used" overstated; "neutral style that couldn't serve propaganda" is interpretation
- Fourth Gomes reel: formula for leading -> filed as entry 23 below

## 23. Maxwell Gomes: a formula for leading (line height)
- Topic: Typography / line height
- Link: not given
- Leading = font size x multiplier, smaller multiplier as text grows: body 1.5 (24px -> 36) · subheads 1.25 (36 -> 45) · headings 1.0 (64 -> 64) · big titles 0.9 (150 -> 135)
- Adjust by eye: large x-height fonts, long lines (70+ characters -> 1.5-1.7), short lines may want ~1.3
- Practice: unitless CSS line-height; Tailwind leading-normal 1.5, leading-tight 1.25
- Doubtful: "WCAG 2.1 requires 1.5x" is wrong; AA (1.4.12) only says text must not break when a user sets 1.5; 1.5 as a target is AAA (1.4.8). 24px body is large for UI (usually 14-16px)
- Relevant: Apna's text presets (text-h1..h6, text-body) carry their own line heights; check them against this scale

## 24. Aevy: 4 free design archives for building taste
- Topic: Inspiration sources / design history
- Link: not given
- Fonts In Use (fontsinuse.com): fonts in real work, 34k+ entries; second mention (entry 19)
- Milton Glaser Design Study Center (archives.sva.edu): Glaser's sketches and posters (I ❤ NY, Dylan poster), plus Louise Fili, Sagmeister, Chermayeff & Geismar
- Cooper Hewitt (cooperhewitt.org): Smithsonian design museum collection, 30 centuries; its own open-source typeface (Chester Jenkins, 2014)
- Design Reviewed (designreviewed.com): 150 years of graphic design and type (Die Reklame 1925, etc.)
- Takeaway: build taste from real work, not AI mockups; same thesis as entry 19 (Abhay)
- Checked from general knowledge: Glaser I ❤ NY 1977, Cooper Hewitt typeface 2014 hold up; entry counts not checked

## 25. Ryyze Academy: 4-colour palette from the golden angle (137.5°)
- Topic: Colour / palette generation
- Link: not given
- Steps: main colour (#FFC300 yellow) -> rotate hue 137.5° for accent (teal #449D8F) -> desaturate main ~60% for neutral (olive #9A8B45) -> darken accent ~25% for contrast (#2F4F4B)
- Result: main + accent + neutral + contrast; then apply with 60-30-10
- Doubtful: #FFC300 is hue ~46°, #449D8F is ~170°, so the shown rotation is ~124°, not 137.5° (commenters also say the video was off); 137.5° is not "split-complementary" (that's 150°/210°); the golden angle is a spacing rule from nature, not a proven colour harmony. Treat as a starting point

## 26. Book: "Laws of UX", Jon Yablonski (O'Reilly)
- Topic: Foundations / UX psychology (reading list)
- Source: cover image; logged from general knowledge, not from reading the book
- Subtitle: Using psychology to design better products and services; 1st ed 2020, 2nd ed 2024
- Covers short principles from psychology, e.g. Jakob's law (users expect your site to work like others), Fitts's law (bigger, closer targets are faster), Hick's law (more choices = slower), Miller's law (chunk information), Postel's law (accept varied input, give predictable output), peak-end rule, aesthetic-usability effect, Von Restorff effect, Tesler's law (complexity has to live somewhere), Doherty threshold (respond in <400ms)
- Free companion site: lawsofux.com (one page per law)
- Relevant: AGENTS.md already applies Hick + Von Restorff; Tesler fits "relocate complexity", Doherty fits "never wait without feedback"

## 27. Archie: Thinking Orbs, loading states for AI interfaces
- Topic: Tools / AI UI and motion
- Link: not given (DM hook "Orb")
- What: open-source (MIT) dotted-orb animations, one per AI state: thinking, searching, solving, listening, composing, working, connecting, weaving, shaping
- Build: 2D canvas, 60fps, respects reduced motion, pauses off-screen; two sizes designed separately (64px avatar/loading, 20px inline); monochrome, adapts to light/dark
- Platforms: React / React Native, SwiftUI, Flutter port; `npm install thinking-orbs`
- Rules: don't scale one size into the other; indeterminate only, never a progress bar
- Takeaway: "status language": tell users what the AI is doing, not just that it's busy
- Relevant: Apna's AI calling agent and AI screening; monochrome orbs could take the AI sky colour (text-info) per the AI-look rule; compare with the existing ai-idle halo
- Doubtful: creators (Jakub Antalik, Alex Brinza), npm name and API not checked; alternatives OrbKit, Orbling

## 28. Alex Yates: 20-point security checklist to paste into Claude
- Topic: Security / AI-built sites (second Yates reel; pairs with entry 2)
- Link: not given
- Secrets: no keys in frontend or repos; check env vars; search git history for keys
- Access: protect admin routes; real auth with hashed passwords; role checks; validate input; escape output (XSS); parameterised queries; lock down database rules
- Traffic and data: rate limiting; spend caps on paid AI APIs; safe file uploads; CSRF; strict CORS
- Production: HTTPS; security headers (CSP, HSTS, etc.); HttpOnly/Secure/SameSite cookies; debug off; final settings check
- Prompt: "audit for vulnerabilities and production-readiness; for each issue explain it, point to the file, give the fix"
- Add: dependency updates, logging/monitoring, a WAF
- Takeaway: catches the common 80%; not a real security review
- Relevant: Apna prototype has AI API routes (draft-job, onlyrounds/*); spend caps and rate limits matter there. Claude Code already has a built-in /security-review command

## 29. Charles Liu: 20 micro-animation tips in 60 seconds
- Topic: Motion / micro-interactions
- Link: not given
- Timing: ease-out for entrances, ease-in-out for movement; dropdowns 150-250ms; exits ~20% shorter; >300-400ms feels slow
- Sequence: stagger list rows ~30ms; stagger secondary details; overlap old and new states
- Touch: buttons scale to 0.97 on press; stretch a moving knob ~12%; pulse on success; rubber-band past drag limits
- Space: move along arcs; enter from and exit to the trigger; reuse layoutId for persistent objects; popovers start at 0.95 scale, not 0
- Polish: icon swaps with scale + blur crossfade; masks for reveals; no bounce on everyday UI; track the pointer directly while dragging
- Takeaway: one considered interaction per component; 2-3 duration tokens; always honour reduced motion; animate transform and opacity only
- Relevant: Apna already has most of this as tokens and utilities (duration-hover/enter/exit/select, press = scale, transition-select spring, reduced motion handled once, sliding indicators). Gaps to check: popovers enter from the trigger? exits shorter than entrances?
- Doubtful: "ui-animation-polish" Claude skill not checked; EU Accessibility Act / Apple-IBM duration claims are Meta AI context. Your installed animate / review-animations skills cover the same ground

## 30. Kevin: 3 animated UI block libraries
- Topic: Tools / component libraries (second Kevin reel, after entry 14)
- Link: not given (DM hook "Libraries")
- AnimmasterLib: 250-300+ WebGL/GSAP blocks, vanilla JS; paid; commenters raise copyright/scam concerns -> avoid until checked
- SkiperUI: React + Tailwind + shadcn blocks (heroes, pricing, cards); freemium; `pnpm dlx shadcn@latest add @skiper-ui/...`; second mention (entry 11)
- VengeanceUI: cinematic React interactions (displacement hovers, scroll layouts, 3D books); 46 components; `npx shadcn@latest add @vengeanceui/...`; said to be MIT + Vercel OSS program
- Safer alternatives named by commenters: Aceternity UI, Shadcnblocks, 21st.dev, Magic UI
- Takeaway: block libraries for landing pages; test performance and reduced motion
- Relevant: same as Kokonut (entry 11): raw Tailwind values fail lint:tokens; ideas only, rebuild on Apna tokens
- Doubtful: VengeanceUI licence conflicts (summary says MIT, comments say mostly paid); counts and "10k+ developers" not checked

## 31. Alena: 4 mood palettes in Pantone shades
- Topic: Colour / palette inspiration
- Link: not given (hex codes via comment "HEX")
- Autumn: dark green, orange, white (2411 U, 2347 U, P 179-1 U); holiday branding
- Swamp: swamp green, chive blossom, rose red (15-6310, 18-3634, 18-1852 TCX); moody, editorial
- Yummy anchovy: chocolate plum, popcorn, cerulean (19-1110, 12-0825, 15-4020 TCX); food packaging
- Flower market: vanilla custard, flamingo pink, brandy brown (12-0815, 16-1615, 18-1541 TCX); soft, vintage
- Takeaway: browns, plum, olive, burgundy as the new neutrals; warm brown + one cool jewel tone
- Context: Pantone Colour of the Year 2026 is Cloud Dancer (soft white)
- Note: codes are Pantone (print/textile), not screen colours; convert before using in UI
- Relevant: low for Apna product UI; possible for marketing or clay illustration colour

## 32. Mange Marketing: 3 "luxury" palettes
- Topic: Colour / palettes to borrow
- Link: not given
- Velvet plum: mint #C6F0E4, #A7E8D7 + plum #64165D, #8A176E; beauty, fashion, boutique
- Forest luxe: champagne #D8C19A, gold #B78B45 + forest #123B2C, #08251D; heritage, watches, wellness
- Cobalt noir: silver #B7C1CC, cobalt #315BCE, navy #17264F, black #111318; tech, finance
- Takeaway: luxury = fewer hues, low-saturation jewel tones + metallic neutrals + white space; test palettes against real product photos
- Relevant: Apna's premium cues already lean this way (mother plum gradient, gold for apna Unlimited and the plans look); velvet plum and forest luxe are close references
- Doubtful: trend claims (Pinterest "Plum noir", Harper's Bazaar on cobalt, runway names) are Meta AI's, not checked

## 21. Nunes: "quiet vs loud" colour rule
- Topic: Colour / hierarchy
- Link: not given
- Rule: two muted base colours + one saturated accent, only on what you want clicked
- Examples: Palmatech (sky blue + white + hot pink) · SOMA (amber red + off-white + yellow "Buy a call") · hold-music service (sapphire + ocean blue + neon jade)
- Takeaway: design in greyscale first; if it doesn't read without colour, more colour won't fix it
- Same principle as entries 4 (60-30-10), 5 (signal colour), 9 (Cedeno palettes): fifth reel on it
- Same reel template also posted by Ryan Naghibzadeh (sky blue + white + amber red; red orange + white + "yellow punk"; sapphire + ocean blue + neon jade); Meta AI says Brandon Groce and Logoeleven use the same examples -> one template shared across accounts, not independent sources
  - Adds: match saturation (muted base needs a muted accent); complementary accent = max contrast (desaturate 10-20%), split-complementary = safer
- Doubtful: brand examples (Mailchimp, Spotify, Netflix) are Meta AI's; WCAG 4.5:1 is for text, a button fill needs 3:1 against its surroundings

## 22. Diego Aranda: 60/30/10 with a "weird" accent
- Topic: Colour / hierarchy (sixth reel on the same principle; merge with 4, 5, 9, 21)
- Link: not given
- Palettes: startup (black + white + lime #C8F432) · classy (navy #14213D + cream #F4EDE0 + coral #FF6B5B) · calm (forest #1F302B + sand #E8DCC4 + electric purple #B85CF6)
- New points: count visual weight, not area (real sites ~80/15/5); you can flip it (60% brand, 30% neutral) if the accent stays rare; if the accent token appears in 20 components, the rule is broken
- Doubtful: lime #C8F432 fails as text on white (fine as a fill with a dark label); Apple/Google examples are Meta AI's

## Web check, 2026-11-12 (overrides the "Doubtful" notes above where they differ)
- Hazeglow: confirmed at hazeglow.dev (free MIT Lite, `npm i hazeglow`, ~13 kB, Pro $7/mo coming soon)
- Thinking Orbs: confirmed, MIT, github.com/Jakubantalik/thinking-orbs, npm `thinking-orbs`, 9 states; React + React Native only, Flutter port unofficial; Alex Brinza not confirmed
- Kokonut UI: MIT, github.com/kokonut-labs/kokonutui; add registry to components.json first; ~2k stars; Tailwind v4 unconfirmed
- Skiper UI: skiper-ui.com, freemium, Premium $129 one-time, free tier needs attribution
- VengeanceUI: vengeanceui.com, 46 components, "open source" but no licence named, no repo found
- AnimmasterLib: no official site found; price and scam/copyright claims both unverified
- useLayouts: uselayouts.com, free, 69 components · Evil Buttons: evilbuttons.com, Apache-2.0 · daisyUI: MIT
- "Particles Casberry" = "AI Particle Simulator", particles.casberry.in, no licence stated
- OriginKit: only a Product Hunt page · GetLayers: only a third-party listing, Figma plugin/paid unconfirmed · Podie: not found
- Shopify Editions Fall '26 "Exponential": shopify.com/editions/fall2026 (winter2026 was a different edition)
- Aminul's four other sites all exist; unbelievablycrap.com = Liubomyr Ulytskyi's portfolio; haoqi.design = Haoqi Wen
- SQL injection "23% of breaches" is wrong: 23.4% of critical web-app vulnerabilities (Checkmarx 2024); injection is A05 in OWASP Top 10:2025
- Matt D. Smith float label: confirmed (2013)
- Rajat Patel: ex-Zepto confirmed, site molades.com; PhonePe/Airtel unconfirmed. Podcast host name and "Anithing": not found
- Albers red-cover book, LogoRig, "ui-animation-polish" skill, Murray's taxonomy/"IRIS", font-sheet author: could not confirm
- Fonts In Use: no per-entry licensing; 34k count unconfirmed · Cooper Hewitt typeface: confirmed (2014, OFL)
- Pantone 2026 Cloud Dancer: confirmed · Pinterest Plum Noir: confirmed · Harper's Bazaar cobalt quote: secondhand
- MDX: Awwwards honourable mentions only; Cedeno as founder unconfirmed · Claude Design launch 17 Apr 2026: confirmed

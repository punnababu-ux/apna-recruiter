# Design System Components

Inventory of components in `@apna/design-system`. Organized according to **Ant Design / Material Design 3 (M3)** component taxonomy. Import snippets are copy-paste ready.

> **Before you build a new one:** ⌘-F this file. The closest match is almost always enough. See `AGENTS.md` for the component-first rule.

---

## 1. Actions

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Button           | `import { Button } from "@apna/design-system"`                         | Primary action surface. 11 variants — includes `checkout` / `checkout-inset` for the fixed-light self-checkout surface, `emphasis` (the companion push on a screen whose primary CTA is taken — dark gray on light, white inside a `data-surface="dark"` area), and the only two link styles: `link` (standalone blue action link) and `link-inline` (underlined, in the surrounding text colour). Sizes up to `xl` (48px) for the full-width CTA at the foot of a panel or sheet. One primary CTA per screen — see the rules in its JSDoc. |
| ButtonGroup      | `import { ButtonGroup, ButtonGroupText } from "@apna/design-system"`   | Horizontally grouped buttons with shared border. |
| BackButton       | `import { BackButton } from "@apna/design-system"`                     | Back navigation — the only back control in the product: a 32px outlined circle + ChevronLeft, no variants. First item in a header row, `gap-3` before the title/logo. See the rule in its JSDoc. |
| Toggle           | `import { Toggle } from "@apna/design-system"`                         | On/off button. Use for formatting toolbars.      |
| ToggleGroup      | `import { ToggleGroup, ToggleGroupItem } from "@apna/design-system"`   | Multiple toggles, single- or multi-select.       |
| InkProvider      | `import { InkProvider } from "@apna/design-system"`                    | Mount once in the root layout. Feeds the press position to every `ink` surface (the live-surface ripple). Renders nothing. |
| CloseBubble      | `import { CloseBubble } from "@apna/design-system"`                    | The pop-up close control: 32px dark translucent disc, white X, outside the card 8px above its top-right corner. Rendered automatically by `DialogContent` and bottom `SheetContent`; you rarely use it directly. |
| useSlidingIndicator | `import { useSlidingIndicator } from "@apna/design-system"`         | Hook for hand-built segmented controls: moves one `sliding-indicator` pill onto the option marked `data-indicator-active`, so selection slides instead of cross-fading. |

## 2. Form & Inputs

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Field            | `import { Field, FieldLabel, FieldDescription, FieldError } from "@apna/design-system"` | Label + control + help/error wrapper. |
| Label            | `import { Label } from "@apna/design-system"`                         | Accessible form label.                           |
| Input            | `import { Input } from "@apna/design-system"`                         | Single-line text input.                          |
| OtpInput         | `import { OtpInput } from "@apna/design-system"` | One box per digit for a login code: auto-advance, Backspace back, arrows, paste / SMS autofill fills all boxes, `onComplete` when full, `invalid` state. Boxes narrow on small phones. |
| Textarea         | `import { Textarea } from "@apna/design-system"`                       | Multi-line input.                                |
| PromptInput      | `import { PromptInput } from "@apna/design-system"`                    | AI prompt box: auto-growing textarea + footer actions (mic) + round submit. Enter submits, Shift+Enter newlines. `size="lg"` hero / `"default"` bar; `loading`, `active` (voice writing into it); `submitText` for a labelled submit instead of the arrow; `hideSubmit` when the page's own CTA submits. The submit is dark gray (`emphasis`) — asking AI is never the commit. |
| Checkbox         | `import { Checkbox } from "@apna/design-system"`                       | Binary toggle with `indeterminate` support.      |
| RadioGroup       | `import { RadioGroup, RadioGroupItem, RadioMark } from "@apna/design-system"`     | Single-select from 2+ options. The one radio look: a ring that turns green around a green dot. `RadioMark` is the same mark, display only, for a card that is itself the radio. A selectable card with its own fill (OptionCard) needs no radio. |
| RadioCard        | `import { RadioCard, RadioCardGroup } from "@apna/design-system"` | A whole card as one radio option with a visible RadioMark and a 2px primary border when selected (stays white — OptionCard fills instead). `radioPosition`: "start" · "end" · "responsive" (end on phones, start from sm). E.g. which active job to expire for a new one. |
| Switch           | `import { Switch } from "@apna/design-system"`                         | Instant on/off. Persist on change.               |
| Select           | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@apna/design-system"` | Styled dropdown. Use for 4+ options. |
| Autocomplete     | `import { Autocomplete, AutocompleteInput, AutocompleteContent, AutocompleteList, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteCollection, AutocompleteItem, AutocompleteEmpty } from "@apna/design-system"` | Search field with suggestions that filter as you type, optionally in labelled groups (Base UI Autocomplete). The input carries the search glyph and Input's `inputSize`; items take `render={<a href />}` to be links. The marketing header's site search. |
| Slider           | `import { Slider } from "@apna/design-system"`                         | Slider built on Base UI Slider. Pass an array (`value={[min, max]}`) for a range with two thumbs; `thumbLabels` names them. `size="sm"`: a slim seek bar (4px track, 12px solid thumb) for media players. |
| OptionCard       | `import { OptionCard, OptionCardGroup } from "@apna/design-system"`    | Large tappable answer to one question — `layout="row"` (icon, title, description) or `"tile"` in a 2-column grid. `OptionCardGroup type="single"` = radiogroup, `"multiple"` = checkboxes. Selected reads like ChipTabs `choice`. |
| RangeSlider      | `import { RangeSlider } from "@apna/design-system"`                    | From–to range on a ruler (salary bracket): pill handles with grips, value bubble on hover/drag/focus, accent band and in-range ticks, haptic tick on major marks. `unset` (grey until answered), `invalid` ("min"/"max"). Built on Base UI Slider. |
| NumberStepper    | `import { NumberStepper } from "@apna/design-system"`                  | − n + for a small whole number (years of experience). Disables at `min`/`max`; value announced live. |
| SearchFilterBar  | `import { SearchFilterBar } from "@apna/design-system"`               | Search input with optional multi-group filters: a popover from md, a bottom sheet on phones (44px rows; picks apply on "Apply filters", "Clear filters" clears and closes). `mobileFilters="inside"`: on phones a pill field with a grey Filters pill inset 2px at its end; the pill steps aside while typing (a clear ✕ takes its place). Search and filters always combine. |

## 3. Data Display

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Avatar           | `import { Avatar, AvatarImage, AvatarFallback } from "@apna/design-system"` | User image with fallback. Supports groups.  |
| Badge            | `import { Badge } from "@apna/design-system"`                         | Status / count marker (`variant`: 12 roles incl. `ribbon` / `discount` for pricing cards and `count` for unread markers, `on-dark` / `on-tint` translucent pills, `size`: "default" · "sm" · "lg" · "ribbon" · "count" · "dot"). Unread count on an icon: `variant="count" size="count"`; a bare attention dot: `size="dot"`. Pair `variant="ribbon"` with `size="ribbon"` for the flush card-corner treatment. |
| MetricCard       | `import { MetricCard } from "@apna/design-system"`                    | `variant="metric"` (default): dashboard stat, bordered, icon + trend. `variant="stat"`: marketing stat tile, borderless, value-first, no icon/trend chrome. |
| Skeleton         | `import { Skeleton } from "@apna/design-system"`                       | Loading placeholder shape.                       |
| Spinner          | `import { Spinner } from "@apna/design-system"`                       | Indeterminate loading indicator.                 |
| Separator        | `import { Separator } from "@apna/design-system"`                     | Horizontal or vertical divider.                  |
| Empty            | `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@apna/design-system"` | Empty-state scaffold. |

## 4. Navigation

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tabs             | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@apna/design-system"` | Sectioned view switcher; one indicator slides to the active tab. `TabsList variant`: `default` (muted track), `inverted` (dark pill on white), `line` (underline), `checkout` (self-checkout's grey track + ringed white pill + green label, fixed across themes). |
| ChipTabs         | `import { ChipTabs } from "@apna/design-system"`                      | Segmented control / pill-shaped choice tabs (`variant`: "default" · "choice" · "solid"; `size`: "sm" · "md" · "lg" — `lg` (40px) for answers on a wizard screen; `itemClassName` for layout-only chip overrides). |
| SegmentedTabSwitcher | `import { SegmentedTabSwitcher } from "@apna/design-system"`      | Responsive section switcher — two-line desktop pill, horizontal-scroll mobile chip carousel. Extracted from self-checkout. `appearance="checkout"` is the plans hero / phone chip row look (use it rather than passing colour props). `activeItemClassName` themes the active pill; `mobileBleedClassName` / `mobileGutterClassName` must mirror the parent's gutter, or the full-bleed carousel over/undershoots. |
| Stepper          | `import { Stepper, type Step } from "@apna/design-system"`             | Wizard progress rail, vertical or horizontal. Steps are `{ id, label, status: "completed"\|"current"\|"pending" }`; `onStepClick` makes non-pending steps clickable. Below `sm` only the current step keeps its label. |
| Wizard           | `import { WizardQuestion, StepIntro, SegmentedProgress, WizardFooter } from "@apna/design-system"` | One-question-per-screen frame: big question heading, chapter-break intros, per-stage progress bar, sticky footer with Back + CTA. Footer CTA is `emphasis` on every step — green only for the committing action (see the rule in `wizard.tsx`). Next shows why it can't continue instead of disabling. One progress indicator per screen: pass `progressClassName="sm:hidden"` when a header stepper shows it on wider screens. |
| Breadcrumb       | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@apna/design-system"` | Hierarchical location trail. |
| Sidebar          | `import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@apna/design-system"` | Persistent app sidebar primitives. |
| ReusableSidebar  | `import { ReusableSidebar } from "@apna/design-system"`                | High-level configurable sidebar shell.           |
| BottomNav        | `import { BottomNav, type BottomNavItem } from "@apna/design-system"` | Fixed mobile bottom tab bar. Hidden at `md+`. Items accept `href` (link) or `onClick` (button) + optional `badge` overlay. `featured` raises one (middle) item into a promoted tile above the bar (e.g. Plans). |
| Fab              | `import { Fab } from "@apna/design-system"` | Phones' extended floating action button for a screen's one main action: a green "+ label" pill 16px above the BottomNav, shrinking to a round icon while scrolling down. One per screen; give the screen ~80px of end room. |
| StickyCtaBar     | `import { StickyCtaBar } from "@apna/design-system"` | Phones' bottom-pinned CTA dock (< md): frosted card strip, home-indicator inset, one full-width pill Button inside (`size="xl"`). Owns the dock's look so every screen's sticky CTA matches. |
| BottomNavMenu    | `import { BottomNavMenu, type BottomNavMenuItem } from "@apna/design-system"` | The bottom bar's "More" card: icon tiles (4 across) rising just above the bar, which stays visible. Flat destinations only; optional red `dot` per tile. Tap outside / Escape / a tile closes it. `clearFeatured` when the bar has a raised item; `header` for a full-width block above the tiles (e.g. the account alert). |

## 5. Overlays & Dialogs

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Tooltip          | `import { Tooltip, TooltipTrigger, TooltipContent } from "@apna/design-system"` | Short hover hint. Not for interactive content. |
| Popover          | `import { Popover, PopoverTrigger, PopoverContent } from "@apna/design-system"` | Click-open floating panel.          |
| DropdownMenu     | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@apna/design-system"` | Popup action menu built on Base UI Menu. |
| Dialog           | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@apna/design-system"` | Modal. Focus-trapped. |
| AlertDialog      | `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@apna/design-system"` | Confirm destructive / irreversible actions. |
| Sheet            | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@apna/design-system"` | Edge-docked drawer. A bottom `SheetContent` is a phone pop-up (CloseBubble outside it). |
| SheetPanel       | `import { SheetPanel, SheetPanelHeader } from "@apna/design-system"` | The app's side panel (order summary, notifications): muted frame, 448px / 512px, rounded left corners, white card sections. `SheetPanelHeader` is its one title row (20px heading, optional action, Back on phones / X from sm). Never a bare `SheetContent side="right"`. |

## 6. Feedback & Status

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Alert            | `import { Alert, AlertTitle, AlertDescription } from "@apna/design-system"` | Static banner. Use for persistent messages. Variants: default · muted (neutral but visible on a card) · destructive · success · warning · info. |
| AlertBanner      | `import { AlertBanner } from "@apna/design-system"`                   | High-emphasis action banner with icon, title, and action link or standalone CTA. |
| RenewalBanner    | `import { RenewalBanner } from "@apna/design-system"`                 | Richer banner: icon + headline/subline, checklist, price + MRP + discount, CTA. For "renew your plan" reminders. |
| Sonner (toast)   | `import { toast } from "sonner"`                                       | Transient toast. Mounted via `<Toaster />` in root layout. |

## 7. Data & Layout

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Table            | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter } from "@apna/design-system"` | Semantic tabular data. |
| Accordion        | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@apna/design-system"` | Expand/collapse grouped content. |
| PhoneFrame       | `import { PhoneFrame } from "@apna/design-system"`                     | Phone bezel for previewing a mobile screen inside a desktop page; the screen scrolls on its own. `label` names the region. |
| PricingCard      | `import { PricingCard } from "@apna/design-system"`                    | Plan/bundle card — ribbon, one or more meta rows, price+MRP+badge, CTA slot. Pure layout; caller supplies coloured ribbon/badge/cta. `emphasis`: "price" (default) or "title" picks which line leads. `surface="inset"` for a card nested in an always-dark surface. |
| ApnaLogo         | `import { ApnaLogo } from "@apna/design-system"`                       | Brand mark lockup with gradient and wordmark.    |
| LogoApnaHire     | `import { LogoApnaHire, LogoApnaWordmark } from "@apna/design-system"` | "apnaHire" wordmark (expanded sidebar, the Jobs top bar on phones) and "apna" alone (collapsed sidebar). Sized by the caller (`h-6 w-auto`). |
| OnlyRoundsLogo   | `import { OnlyRoundsLogo, OnlyRoundsLogoMark } from "@apna/design-system"` | OnlyRounds lockup and its mark alone. |
| Coin             | `import { Coin } from "@apna/design-system"` | Gold disc carrying an icon (₹): the mark of the Plans destination — bottom bar Plans tile, sidebar plans link, `premium` Button. `size`: "md" (24px) · "lg" (28px). |
| JobCardFrame     | `import { JobCardFrame, JobMetricPill } from "@apna/design-system"` | The jobs-list card every product composes: optional logo · title (stretched link: the whole card opens the job) + status badge · meta line · actions, a row of `JobMetricPill` links (label + count + unread dot that pings three times), an optional banner. Inner controls keep their own clicks; only the innermost pressed surface ripples. |
| LogoApnaUnlimited | `import { LogoApnaUnlimited } from "@apna/design-system"`             | "apna ∞ Unlimited" wordmark — `variant="default\|white\|gradient"` (dark/light/Accent-Gradient fill). |

## 8. Marketing & Layout

| Component        | Import                                                                 | tldr                                             |
|------------------|------------------------------------------------------------------------|--------------------------------------------------|
| Section          | `import { Section } from "@apna/design-system"`                        | One horizontal band: background, page gutters, centred column. `tone` (transparent·default·muted·card·ink), `size`, `width` (narrow·band·wide·full), `bleed`. The only layout component — use bare `grid`/`flex` inside it. |
| SectionHeading   | `import { SectionHeading } from "@apna/design-system"`                 | Eyebrow + title + description + actions. Carries `text-balance`, a reading measure, and the gap. Sets no colour, so it works on any `tone`. `level` picks the heading tag and type preset. |
| Card             | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@apna/design-system"` | The base surface. `tone` (default·muted·ink·ghost), `padding`, `interactive`. `CardDescription` follows the tone via `data-tone` — don't thread the prop. |
| LogoWall         | `import { LogoWall } from "@apna/design-system"`                       | Horizontally-scrolling logo strip (`no-scrollbar`, wider than its column by design). `items: { name, logo }[]` — `logo` is a node, not a `src`: the system can't import `next/image`, so the caller renders the `<img>`/`<Image>` and hands it over. `itemHeight`, `muted` (grayscale, colour on hover). |
| AmbientBackdrop  | `import { AmbientBackdrop } from "@apna/design-system"`                | Living layer over a gradient canvas: blobs in the canvas's own hues drift on long loops (`--ambient-*`, `--duration-ambient`), a light wanders across them on its own quicker loop (`glow`, no pointer tracking — phones too) and a film grain (`grain`). `absolute` — pass the inset; put it first in a `relative isolate` parent. Decorative, pauses off-screen, still under reduced motion. The homepage hero. |
| ScrollStack      | `import { ScrollStack, ScrollStackItem } from "@apna/design-system"`  | Cards that stack as you scroll: from lg each `ScrollStackItem` pins 1rem below the last (sticky), the next slides over it, and each card eases back 4% per card on top of it — back of the deck smallest, front full size (`stack-item`, `--stack-depth`). Below lg a plain column. Item = opaque `bg-card` `rounded-3xl` frame; pass layout/padding via `className`. Reduced motion keeps the stacking, drops the recede. The homepage product cards. |

**Tone pairing.** `Section tone="ink"` and `Card tone="ink"` both set a foreground, so descendants inherit correctly. Don't put `text-muted-foreground` inside either — it's a near-black role and disappears; the ink surface supplies `text-ink-fg-muted`.

---

## Conventions every component follows

- `"use client"` at the top only when necessary.
- Root element carries `data-slot="<component-name>"` for styling hooks.
- `className` merged through `cn()` (`@/lib/utils`).
- Built on Base UI (`@base-ui/react`) primitives where available.
- Trigger-style props use Base UI's `render={<Component … />}` pattern.
- Variant props powered by `class-variance-authority`.
- Only semantic tokens in `className`. No raw colours.

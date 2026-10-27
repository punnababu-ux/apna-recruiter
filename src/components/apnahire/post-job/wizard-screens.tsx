"use client"

/**
 * The job posting wizard's screens, in order. One decision per screen; each
 * arrives already answered from the recruiter's description where the AI
 * could, marked "From your description", so most screens are a glance and
 * a tap on Next. A screen the AI couldn't answer arrives empty, and Next
 * says what's missing instead of moving on.
 *
 *   describe →
 *   Job details:   title · job role · industry · job type · workplace ·
 *                  location · pay type · salary · perks · joining fee
 *   Who can apply: education · English · experience · preferences ·
 *                  screening · description
 *   Hiring setup:  interview · contact · review → /apnahire/jobs/new/plans
 *
 * Phone first (as in the reference prototype): one question per screen,
 * titled as a question, every single choice an OptionCard with a line of
 * help, so nothing scrolls under the fixed footer.
 *
 * No screen exists only to be clicked through: no welcome, no stage intros,
 * no company question (it's a line on the title screen). The five fields
 * that decide who sees the job (title, job role, industry, location, pay)
 * each keep their own screen, even when the AI is sure — research showed
 * recruiters don't check AI answers they aren't shown.
 */

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Bike,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Button,
  Calculator,
  CalendarDays,
  Check,
  ChefHat,
  ChipTabs,
  Clock,
  DoorOpen,
  Field,
  FieldDescription,
  FieldLabel,
  GraduationCap,
  Headset,
  Heart,
  Home,
  IndianRupee,
  Info,
  Input,
  Laptop,
  Lock,
  MapPin,
  Monitor,
  Moon,
  OptionCard,
  OptionCardGroup,
  Package,
  Pencil,
  Phone,
  PromptInput,
  RefreshCw,
  Route,
  Search,
  Separator,
  ShieldCheck,
  RangeSlider,
  Smartphone,
  Sparkle,
  Sparkles,
  Store,
  Switch,
  Target,
  Textarea,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wand2,
  Wrench,
  WizardQuestion,
} from "@apna/design-system"
import { CandidateJobPreview, type PreviewSection } from "@/components/apnahire/post-job/candidate-job-preview"
import { DescribeStep } from "@/components/apnahire/post-job/describe-step"
import {
  AddCustom,
  ChipMultiSelect,
  EducationField,
  EnglishField,
  ExperienceField,
  JoiningFeeDetailsFields,
  ListSelect,
  OtherRecruiterFields,
  ScreeningQuestionsField,
  WalkInDetailsFields,
  WhoCanContactField,
  toNumber,
  type UpdateDraft,
} from "@/components/apnahire/post-job/job-fields"
import {
  ACCOUNT_PHONE,
  ASSETS,
  CATEGORIES,
  CITIES,
  COMPANY_NAME,
  DEGREES,
  EDUCATION_LABELS,
  ENGLISH_LABELS,
  INDUSTRIES,
  JOB_TYPE_LABELS,
  LANGUAGES,
  LANGUAGE_NATIVE,
  LOCATION_TYPE_LABELS,
  PAY_TYPE_LABELS,
  PERKS,
  POPULAR_AREAS,
  categoryForTitle,
  companyName,
  experienceLabel,
  locationLabel,
  missingRequired,
  runJobChecks,
  salaryLabel,
} from "@/lib/apnahire/job-draft"
import { cn } from "@/lib/utils"
import type { JobPostDraft, JobType, PayType } from "@/types/apnahire-job"
import { inr, num } from "@/lib/format"

export type StageId = "job" | "candidates" | "setup"

export type ScreenId =
  | "describe"
  | "manual-intro"
  | "title"
  | "category"
  | "industry"
  | "job-type"
  | "workplace"
  | "location"
  | "pay-type"
  | "salary"
  | "perks"
  | "joining-fee"
  | "education"
  | "english"
  | "experience"
  | "preferences"
  | "screening"
  | "description"
  | "interview"
  | "contact"
  | "review"

export interface ScreenCtx {
  draft: JobPostDraft
  update: UpdateDraft
  /** Draft keys the AI filled that the recruiter hasn't changed. */
  aiFilled: (keyof JobPostDraft)[]
  prompt: string
  setPrompt: (p: string) => void
  submitPrompt: () => void
  /** "Draft my job" is running; DraftingState shows its progress. */
  drafting: boolean
  draftResult: Partial<JobPostDraft> | null
  finishDrafting: () => void
  /** Open a screen, then come back to the current one (review's "Edit"). */
  edit: (id: ScreenId) => void
  applyPatch: (patch: Partial<JobPostDraft>) => void
  refine: (instruction: string) => Promise<boolean>
  refining: boolean
  writeDescription: (instruction?: string) => Promise<void>
  writing: boolean
  /** The answers the description was written from have changed since. */
  descriptionStale: boolean
}

export interface ScreenDef {
  id: ScreenId
  /** null = before the stages start (describe). */
  stage: StageId | null
  /** Optional screens: Next reads "Skip" while they're empty. */
  isEmpty?: (d: JobPostDraft) => boolean
  /** Why Next can't move on yet, or null. */
  check?: (d: JobPostDraft) => string | null
  cta?: string
  /** Part of the candidate preview this screen changes — scrolled into view. */
  preview?: PreviewSection
  Render: React.ComponentType<ScreenCtx>
}

// ── Shared bits ────────────────────────────────────────────────────────────

/** "From your description" — shown while any of the screen's fields still
 *  hold the AI's answer. Goes once the recruiter changes it. */
function AiTag({ ctx, keys }: { ctx: ScreenCtx; keys: (keyof JobPostDraft)[] }) {
  if (!keys.some((k) => ctx.aiFilled.includes(k))) return null
  return (
    <Badge variant="info" className="gap-1">
      <Sparkles aria-hidden /> AI-filled · check it
    </Badge>
  )
}

/** "Can't change this after posting" — information, so neutral, not a
 *  warning: yellow on every locked field would teach people to skip yellow. */
function LockNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-sm text-muted-foreground">
      <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

/** Rule-based checks for one screen (unserved city, two roles in a title…). */
function Checks({ ctx, ids }: { ctx: ScreenCtx; ids: string[] }) {
  const checks = runJobChecks(ctx.draft).filter((c) => ids.includes(c.id))
  if (!checks.length) return null
  return (
    <div className="flex flex-col gap-2">
      {checks.map((c) => (
        <Alert key={c.id} variant={c.severity === "block" ? "destructive" : "warning"}>
          <AlertTitle>{c.title}</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-2">
            {c.detail}
            {c.fix && (
              <Button type="button" size="sm" variant="outline" onClick={() => ctx.applyPatch(c.fix!.patch)}>
                {c.fix.label}
              </Button>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

const blockingCheck = (d: JobPostDraft, ids: string[]) =>
  runJobChecks(d).find((c) => c.severity === "block" && ids.includes(c.id))?.title ?? null

/** A labelled group inside a screen that answers two related questions. */
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-foreground">{label}</h2>
      {children}
    </div>
  )
}

function SwitchRow({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon?: React.ReactNode
  title: string
  description: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-border p-4">
      {icon}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Telesales: <Phone />,
  "Customer Support": <Headset />,
  "Field Sales": <Route />,
  Delivery: <Bike />,
  "Back Office": <Monitor />,
  Accounts: <Calculator />,
  Driver: <Truck />,
  Teaching: <GraduationCap />,
  "Cook / Chef": <ChefHat />,
  Security: <ShieldCheck />,
  Housekeeping: <Home />,
  "Retail Sales": <Store />,
  Other: <Briefcase />,
}

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  "BPO / Call Centre": <Headset />,
  "Banking & Finance": <Wallet />,
  Insurance: <ShieldCheck />,
  "Real Estate": <Building2 />,
  "E-commerce & Logistics": <Package />,
  "Food & Hospitality": <ChefHat />,
  Retail: <Store />,
  Healthcare: <Heart />,
  Education: <GraduationCap />,
  Manufacturing: <Wrench />,
  "IT & Software": <Laptop />,
  Telecom: <Smartphone />,
  "Marketing & Advertising": <Target />,
  Other: <Briefcase />,
}

/** Other names for the same job — suggestions must never nudge the
 *  recruiter towards a different role. */
const TITLE_VARIANTS: Record<string, string[]> = {
  Telesales: ["Telecaller", "Tele Sales Executive", "Inside Sales Executive", "Senior Telecaller"],
  "Customer Support": [
    "Customer Support Executive",
    "Customer Care Executive",
    "Voice Process Executive",
    "Chat Support Executive",
  ],
  "Field Sales": ["Field Sales Executive", "Business Development Executive", "Sales Officer", "Area Sales Executive"],
  Delivery: ["Delivery Executive", "Delivery Partner", "Rider", "Last Mile Delivery Executive"],
  "Back Office": ["Back Office Executive", "Data Entry Operator", "Office Assistant", "MIS Executive"],
  Accounts: ["Accountant", "Accounts Executive", "Junior Accountant", "Billing Executive"],
  Driver: ["Driver", "Car Driver", "Delivery Driver", "Commercial Vehicle Driver"],
  "Retail Sales": ["Retail Sales Executive", "Store Associate", "Sales Associate", "Cashier"],
}

/** The list with what's already picked (by the AI or earlier) moved to the
 *  front, so it's in the first view, not below the fold. Fixed when the
 *  screen opens: a tap never makes the list jump. Not for ordered scales
 *  (education, English), where the order is the meaning. */
function usePickedFirst(list: string[], picked: string | string[]) {
  const [order] = React.useState(() => {
    const p = (Array.isArray(picked) ? picked : [picked]).filter(Boolean)
    return [...p.filter((x) => list.includes(x)), ...list.filter((x) => !p.includes(x))]
  })
  return order
}

// ── Before the stages ──────────────────────────────────────────────────────

function Describe(ctx: ScreenCtx) {
  return (
    <DescribeStep
      prompt={ctx.prompt}
      onPromptChange={ctx.setPrompt}
      onSubmit={ctx.submitPrompt}
      drafting={ctx.drafting}
      draftResult={ctx.draftResult}
      onDrafted={ctx.finishDrafting}
    />
  )
}

/** What each stage asks, for the manual intro. */
const STAGE_SUMMARY: Record<StageId, string> = {
  job: "Title, role, location and pay",
  candidates: "Must-haves and preferences",
  setup: "Interview, contact, review",
}

/** "Fill manually" primes the recruiter before 18 questions: four steps,
 *  one question at a time, a review before it goes live. Only on the way in
 *  by hand; the AI draft skips it (its answers are already there). */
function ManualIntro(ctx: ScreenCtx) {
  return (
    <>
      <WizardQuestion
        eyebrow={<span className="text-overline text-primary">Hiring for {companyName(ctx.draft)}</span>}
        title="Post a job in four short steps"
        description="One question at a time. Review before posting."
      />
      <ol className="flex flex-col">
        {[
          ...(Object.keys(STAGE_SUMMARY) as StageId[]).map((id) => [STAGE_LABELS[id], STAGE_SUMMARY[id]]),
          ["Select plan", "Pick a plan and post"],
        ].map(([label, summary], i) => (
          <li key={label} className="flex items-start gap-4 border-t border-border py-4 first:border-t-0 first:pt-0">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-muted text-base font-semibold text-foreground">
              {i + 1}
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-base font-semibold text-foreground">{label}</span>
              <span className="text-sm text-muted-foreground">{summary}</span>
            </span>
          </li>
        ))}
      </ol>
    </>
  )
}

// ── Job details ────────────────────────────────────────────────────────────

function Title(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const [changingCompany, setChangingCompany] = React.useState(draft.hiringFor === "client")
  const category = draft.category || (draft.title ? categoryForTitle(draft.title) : undefined)
  const variants = (category ? TITLE_VARIANTS[category] : undefined)?.filter(
    (t) => t.toLowerCase() !== draft.title.trim().toLowerCase(),
  )
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["title"]} />}
        title="What’s the job title?"
        description="Words candidates search for."
      />
      <Checks ctx={ctx} ids={["multi-role", "generic-title"]} />
      <Input
        aria-label="Job title"
        inputSize="lg"
        value={draft.title}
        onChange={(e) => update("title", e.target.value)}
        placeholder="e.g. Telecaller"
        maxLength={60}
      />
      {variants && variants.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">Similar titles</span>
          <div className="flex flex-wrap gap-2">
            {variants.map((t) => (
              <Button
                key={t}
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => update("title", t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      )}
      <LockNote>Only small edits after posting.</LockNote>

      {/* Who's hiring: almost always the recruiter's own company, so it's a
          line, not a screen. */}
      <Separator />
      {changingCompany ? (
        <Group label="Hiring for">
          <OptionCardGroup aria-label="Hiring for">
            <OptionCard
              icon={<Building2 />}
              title={COMPANY_NAME}
              description="Your company"
              selected={draft.hiringFor === "own"}
              onSelect={() => update("hiringFor", "own")}
            />
            <OptionCard
              icon={<Users />}
              title="A client"
              description="You're hiring for someone else"
              selected={draft.hiringFor === "client"}
              onSelect={() => update("hiringFor", "client")}
            />
          </OptionCardGroup>
          {draft.hiringFor === "client" && (
            <Field>
              <FieldLabel htmlFor="client-company">Client name</FieldLabel>
              <Input
                id="client-company"
                value={draft.clientCompany}
                onChange={(e) => update("clientCompany", e.target.value)}
                placeholder="e.g. Sunrise Retail Pvt Ltd"
              />
            </Field>
          )}
        </Group>
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="size-4 shrink-0" aria-hidden />
          <span>
            Hiring for <span className="font-medium text-foreground">{companyName(draft)}</span>
          </span>
          <Button
            type="button"
            variant="link-inline"
            className="text-foreground"
            onClick={() => setChangingCompany(true)}
          >
            Change
          </Button>
        </p>
      )}
    </>
  )
}

function Category(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const suggested = draft.title ? categoryForTitle(draft.title) : undefined
  const categories = usePickedFirst(CATEGORIES, draft.category || suggested || "")
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["category"]} />}
        title="What’s the job role?"
        description="Decides who sees your job."
      />
      <Checks ctx={ctx} ids={["category-mismatch"]} />
      {/* Above the tiles, so it's read before the choice — not below 13 of them. */}
      <LockNote>Can&apos;t be changed after posting.</LockNote>
      <OptionCardGroup aria-label="Job role" columns={2}>
        {categories.map((c) => (
          <OptionCard
            key={c}
            layout="tile"
            icon={CATEGORY_ICONS[c]}
            title={c}
            description={c === suggested ? "Suggested" : undefined}
            selected={draft.category === c}
            onSelect={() => update("category", c)}
          />
        ))}
      </OptionCardGroup>
    </>
  )
}

function Industry(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const industries = usePickedFirst(INDUSTRIES, draft.industry)
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["industry"]} />}
        title="Which industry is it in?"
        description="Decides who sees your job."
      />
      <OptionCardGroup aria-label="Industry" columns={2}>
        {industries.map((i) => (
          <OptionCard
            key={i}
            layout="tile"
            icon={INDUSTRY_ICONS[i]}
            title={i}
            selected={draft.industry === i}
            onSelect={() => update("industry", i)}
          />
        ))}
      </OptionCardGroup>
    </>
  )
}

const WORKPLACE_HELP: Record<keyof typeof LOCATION_TYPE_LABELS, [React.ReactNode, string]> = {
  office: [<Building2 key="i" />, "At your office or store every day"],
  home: [<Home key="i" />, "Fully remote"],
  field: [<Route key="i" />, "Mostly travelling, e.g. sales or delivery"],
}

/** The night-shift card's sky — kept to the middle of the card, clear of
 *  the label on the left and the switch on the right. Positions are % of
 *  the card; delays stagger the motion so nothing moves in step. */
const STARS: { x: number; y: number; size: string; delay: number }[] = [
  { x: 40, y: 22, size: "size-0.5", delay: 600 },
  { x: 47, y: 72, size: "size-0.5", delay: 1500 },
  { x: 58, y: 64, size: "size-0.5", delay: 400 },
  { x: 66, y: 24, size: "size-1", delay: 900 },
  { x: 77, y: 76, size: "size-0.5", delay: 200 },
  { x: 83, y: 30, size: "size-0.5", delay: 1200 },
]
const SPARKLES: { x: number; y: number; size: string; delay: number }[] = [
  { x: 52, y: 18, size: "size-3", delay: 0 },
  { x: 72, y: 52, size: "size-2", delay: 800 },
  { x: 86, y: 62, size: "size-2.5", delay: 1600 },
]
const CLOUDS: { x: number; y: number; size: string; delay: number }[] = [
  { x: 34, y: 48, size: "h-5 w-20", delay: 0 },
  { x: 62, y: 6, size: "h-4 w-16", delay: 3000 },
]

/** Night shift: switching it on turns the card into a night sky — a deep
 *  blue gradient, drifting clouds, twinkling stars and a filled moon — so
 *  the answer is felt, not just toggled. Off, it's an ordinary switch card.
 *  The sky is a layer that fades in, so the change reads as dusk falling. */
function NightShiftCard({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  const place = (o: { x: number; y: number }) => ({
    left: `${o.x}%`,
    top: `${o.y}%`,
  })
  return (
    <label
      className={cn(
        "relative isolate flex items-center gap-3 overflow-hidden rounded-xl border p-4 transition-colors duration-500",
        checked ? "border-night-sky-border text-night-sky-fg" : "border-border bg-card text-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-night-sky transition-opacity duration-700",
          checked ? "opacity-100" : "opacity-0",
        )}
      />
      {checked && (
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {CLOUDS.map((c) => (
            <span
              key={`c${c.x}`}
              className={cn(
                "absolute rounded-full bg-night-sky-cloud blur-md animate-in fade-in duration-1000",
                c.size,
              )}
              style={place(c)}
            >
              <span className="block size-full animate-drift" style={{ animationDelay: `${c.delay}ms` }} />
            </span>
          ))}
          {STARS.map((st) => (
            <span
              key={`s${st.x}`}
              className={cn("absolute animate-in fade-in zoom-in-50 duration-700", st.size)}
              style={place(st)}
            >
              <span
                className="block size-full rounded-full bg-night-sky-star animate-twinkle"
                style={{ animationDelay: `${st.delay}ms` }}
              />
            </span>
          ))}
          {SPARKLES.map((sp) => (
            <span key={`p${sp.x}`} className="absolute animate-in fade-in zoom-in-50 duration-700" style={place(sp)}>
              <Sparkle
                className={cn("fill-current text-night-sky-star animate-twinkle", sp.size)}
                style={{ animationDelay: `${sp.delay}ms` }}
              />
            </span>
          ))}
        </span>
      )}
      <Moon
        aria-hidden
        className={cn(
          "size-5 shrink-0 transition-transform duration-500",
          checked && "-rotate-12 fill-current text-night-sky-star",
        )}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold">Night shift</span>
        <span
          className={cn(
            "text-xs transition-colors duration-500",
            checked ? "text-night-sky-fg-muted" : "text-muted-foreground",
          )}
        >
          Mostly after 9 PM
        </span>
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

/** As in the reference prototype: each job type is a full card with a line
 *  saying what it means, not a bare chip. */
const JOB_TYPE_HELP: Record<JobType, [React.ReactNode, string]> = {
  full_time: [<BriefcaseBusiness key="i" />, "Regular hours, 5–6 days a week"],
  part_time: [<Clock key="i" />, "Fewer hours or days a week"],
  both: [<Users key="i" />, "Open to full-time and part-time"],
}

function JobType(ctx: ScreenCtx) {
  const { draft, update } = ctx
  return (
    <>
      <WizardQuestion eyebrow={<AiTag ctx={ctx} keys={["jobType", "nightShift"]} />} title="What type of job is it?" />
      <OptionCardGroup aria-label="Job type">
        {(Object.keys(JOB_TYPE_LABELS) as JobType[]).map((t) => (
          <OptionCard
            key={t}
            icon={JOB_TYPE_HELP[t][0]}
            title={JOB_TYPE_LABELS[t]}
            description={JOB_TYPE_HELP[t][1]}
            selected={draft.jobType === t}
            onSelect={() => update("jobType", t)}
          />
        ))}
      </OptionCardGroup>
      <NightShiftCard checked={draft.nightShift} onCheckedChange={(v) => update("nightShift", v)} />
    </>
  )
}

function Workplace(ctx: ScreenCtx) {
  const { draft, update } = ctx
  return (
    <>
      <WizardQuestion eyebrow={<AiTag ctx={ctx} keys={["locationType"]} />} title="Where will they work?" />
      <OptionCardGroup aria-label="Workplace">
        {(Object.keys(LOCATION_TYPE_LABELS) as (keyof typeof LOCATION_TYPE_LABELS)[]).map((t) => (
          <OptionCard
            key={t}
            icon={WORKPLACE_HELP[t][0]}
            title={LOCATION_TYPE_LABELS[t]}
            description={WORKPLACE_HELP[t][1]}
            selected={draft.locationType === t}
            onSelect={() => update("locationType", t)}
          />
        ))}
      </OptionCardGroup>
    </>
  )
}

/** Every known area as "Area, City", for the location search. */
const ALL_AREAS = Object.entries(POPULAR_AREAS).flatMap(([city, areas]) => areas.map((area) => ({ area, city })))

/** One row of the location list: an icon, the place, a tick when picked. */
function PlaceRow({
  icon,
  label,
  picked = false,
  onPick,
}: {
  icon: React.ReactNode
  label: string
  picked?: boolean
  onPick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={picked}
      className={cn(
        "ink relative flex w-full items-center gap-3 border-t border-border px-4 py-3.5 text-left text-sm transition-interactive first:border-t-0 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        picked ? "bg-accent font-medium text-accent-foreground" : "text-foreground hover:bg-muted/50",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {picked && <Check className="size-4 text-primary" aria-hidden />}
    </button>
  )
}

/** Office or field work: one search box for the area, with the city's
 *  popular areas under it (the reference prototype's pattern) — a tap, not
 *  a city dropdown plus a free-text field. Typing searches every city;
 *  anything else typed is kept as the area in the current city. Remote work
 *  only needs a city. */
function Location(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const home = draft.locationType === "home"
  const field = draft.locationType === "field"
  const [query, setQuery] = React.useState(draft.area)
  // The last area picked from the list (or loaded): while the box shows it,
  // the list stays on the city's popular areas instead of searching.
  const [picked, setPicked] = React.useState(draft.area)
  const q = query.trim().toLowerCase()
  const searching = q.length > 0 && q !== picked.trim().toLowerCase()
  const confirmed = !!picked && picked === draft.area && !!draft.city
  const matches = searching
    ? ALL_AREAS.filter((a) => `${a.area} ${a.city}`.toLowerCase().includes(q)).slice(0, 6)
    : (POPULAR_AREAS[draft.city] ?? []).slice(0, 4).map((area) => ({ area, city: draft.city }))
  // Typing a city ("hyde…") offers the city itself first: picking it
  // switches the list to that city's popular areas.
  const cityMatches = searching ? CITIES.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 2) : []
  const pickCity = (city: string) => {
    update("city", city)
    update("area", "")
    setQuery("")
    setPicked("")
  }
  const pick = (area: string, city: string) => {
    update("area", area)
    update("city", city)
    setQuery(area)
    setPicked(area)
  }
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["city", "area"]} />}
        title={home ? "Where can candidates apply from?" : field ? "Where’s the work area?" : "Where’s the office?"}
        description={home ? "The city you hire from." : "Shown on the job post."}
      />
      <Checks ctx={ctx} ids={["unserved-city"]} />
      {home || !draft.city ? (
        <Field>
          <FieldLabel htmlFor="job-city">City</FieldLabel>
          <ListSelect
            id="job-city"
            value={draft.city}
            options={CITIES}
            placeholder="Select city"
            onChange={(v) => update("city", v)}
          />
        </Field>
      ) : null}
      {!home && (
        <>
          {/* Picked: one confirmed card; Change goes back to the search. */}
          {confirmed ? (
            <div className="flex items-start gap-3 rounded-card-nested border border-primary bg-card p-4 ring-1 ring-primary">
              <MapPin className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-base font-semibold text-foreground">{draft.area}</span>
                <span className="text-sm text-muted-foreground">
                  {draft.area}, {draft.city}
                </span>
              </span>
              <button
                type="button"
                className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                onClick={() => {
                  setPicked("")
                  setQuery("")
                }}
              >
                Change
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  aria-label={field ? "Base area" : "Office area"}
                  className="pl-10"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    // Typed text counts as the area until a suggestion is picked.
                    update("area", e.target.value)
                  }}
                  placeholder="Search area or city"
                />
              </div>
              {matches.length + cityMatches.length > 0 && (
                <div className="flex flex-col overflow-hidden rounded-card-nested border border-border">
                  <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-1">
                    <span className="text-overline text-muted-foreground">
                      {searching ? "Matching places" : `Popular in ${draft.city}`}
                    </span>
                    {!searching && (
                      <button
                        type="button"
                        className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                        onClick={() => pickCity("")}
                      >
                        Change city
                      </button>
                    )}
                  </div>
                  {cityMatches.map((c) => (
                    <PlaceRow
                      key={c}
                      icon={<Building2 aria-hidden />}
                      label={`${c} · see areas`}
                      onPick={() => pickCity(c)}
                    />
                  ))}
                  {matches.map((m) => (
                    <PlaceRow
                      key={`${m.area}-${m.city}`}
                      icon={<MapPin aria-hidden />}
                      label={`${m.area}, ${m.city}`}
                      picked={draft.area === m.area && draft.city === m.city}
                      onPick={() => pick(m.area, m.city)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          <p className="flex items-start gap-3 rounded-card-nested bg-muted p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            Only the area is shown.
          </p>
        </>
      )}
      {draft.locationType === "office" && draft.city && (
        <SwitchRow
          title="Accept candidates willing to relocate"
          description="From anywhere in India"
          checked={draft.relocation}
          onCheckedChange={(v) => update("relocation", v)}
        />
      )}
    </>
  )
}

/** The slider covers the range most apna jobs pay in, so a ₹15–20k band is
 *  wide enough to grab. Higher salaries are typed — up to the live form's
 *  ₹1,49,999 cap. */
const SALARY = { sliderMin: 5000, sliderMax: 60000, step: 500, cap: 149999 }
const onSlider = (n: number) => Math.min(SALARY.sliderMax, Math.max(SALARY.sliderMin, n))

function salaryError(d: JobPostDraft): string | null {
  const fixed = d.payType === "fixed" || d.payType === "fixed_incentive"
  if (!fixed) return null
  if (d.salaryMax != null && d.salaryMax > SALARY.cap) return `Max is ${inr(SALARY.cap)}`
  if (d.salaryMin != null && d.salaryMax != null && d.salaryMax < d.salaryMin) return "Max is below min"
  return null
}

const PAY_TYPE_HELP: Record<PayType, [React.ReactNode, string]> = {
  fixed: [<Wallet key="i" />, "Same salary every month"],
  fixed_incentive: [<TrendingUp key="i" />, "Salary plus performance-based pay"],
  incentive: [<Target key="i" />, "Pay depends entirely on performance"],
}

function PayType(ctx: ScreenCtx) {
  const { draft, update } = ctx
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["payType"]} />}
        title="How will you pay?"
        description="Clear pay gets better applicants."
      />
      <OptionCardGroup aria-label="Pay type">
        {(Object.keys(PAY_TYPE_LABELS) as PayType[]).map((t) => (
          <OptionCard
            key={t}
            icon={PAY_TYPE_HELP[t][0]}
            title={PAY_TYPE_LABELS[t]}
            description={PAY_TYPE_HELP[t][1]}
            selected={draft.payType === t}
            onSelect={() => update("payType", t)}
          />
        ))}
      </OptionCardGroup>
    </>
  )
}

/** "What candidates see": the monthly numbers the post will show, so the
 *  recruiter sees the result of the inputs as they type. */
function CandidatesSee({ draft }: { draft: JobPostDraft }) {
  const fixed = draft.payType !== "incentive"
  const incentive = draft.payType !== "fixed"
  const range = (lo: number | null, hi: number | null) =>
    lo == null && hi == null
      ? "—"
      : lo === hi || hi == null
        ? inr(lo ?? 0)
        : lo == null
          ? inr(hi)
          : `${inr(lo)} – ${inr(hi)}`
  const inc = incentive ? (draft.incentive ?? 0) : 0
  const lo = fixed ? draft.salaryMin : 0
  const hi = fixed ? draft.salaryMax : 0
  const potential =
    (fixed && lo == null && hi == null) || (!fixed && !inc)
      ? "—"
      : range(lo == null ? null : lo + inc, hi == null ? null : hi + inc)
  return (
    <div className="flex flex-col gap-2 rounded-card-nested bg-muted p-4 text-sm">
      <span className="text-overline text-muted-foreground">What candidates see</span>
      {fixed && (
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Fixed salary / month</span>
          <span className="shrink-0 whitespace-nowrap text-foreground">{range(draft.salaryMin, draft.salaryMax)}</span>
        </div>
      )}
      {incentive && (
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Average incentive / month</span>
          <span className="shrink-0 whitespace-nowrap text-foreground">{inr(inc)}</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between gap-3 font-semibold text-foreground">
        <span>Earning potential / month</span>
        <span className="shrink-0 whitespace-nowrap">{potential}</span>
      </div>
    </div>
  )
}

function Salary(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const fixed = draft.payType === "fixed" || draft.payType === "fixed_incentive"
  const incentive = draft.payType === "incentive" || draft.payType === "fixed_incentive"
  const lo = onSlider(draft.salaryMin ?? 15000)
  const hi = onSlider(Math.max(draft.salaryMax ?? 25000, lo))
  const err = salaryError(draft)
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["salaryMin", "salaryMax", "incentive"]} />}
        title="What’s the monthly salary?"
        description={
          <>
            Pay type: {draft.payType ? PAY_TYPE_LABELS[draft.payType] : "—"} ·{" "}
            <button
              type="button"
              className="font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => ctx.edit("pay-type")}
            >
              Change
            </button>
          </>
        }
      />
      {fixed && (
        <div className="flex flex-col gap-5">
          <div className="flex items-end gap-3">
            <Field className="flex-1">
              <FieldLabel htmlFor="salary-min">From</FieldLabel>
              <Input
                id="salary-min"
                inputMode="numeric"
                placeholder="₹"
                value={draft.salaryMin == null ? "" : num(draft.salaryMin)}
                onChange={(e) => update("salaryMin", toNumber(e.target.value))}
              />
            </Field>
            <span className="pb-2.5 text-sm text-muted-foreground">to</span>
            <Field className="flex-1">
              <FieldLabel htmlFor="salary-max">To (monthly)</FieldLabel>
              <Input
                id="salary-max"
                inputMode="numeric"
                placeholder="₹"
                value={draft.salaryMax == null ? "" : num(draft.salaryMax)}
                onChange={(e) => update("salaryMax", toNumber(e.target.value))}
                aria-invalid={err ? true : undefined}
              />
            </Field>
          </div>
          <RangeSlider
            min={SALARY.sliderMin}
            max={SALARY.sliderMax}
            step={SALARY.step}
            value={[lo, hi]}
            onValueChange={([a, b]) => {
              update("salaryMin", a)
              update("salaryMax", b)
            }}
            ticks={{ minor: 2500, major: 10000 }}
            scale={[SALARY.sliderMin, 20000, 40000, SALARY.sliderMax]}
            formatValue={inr}
            formatScale={(n) => (n === SALARY.sliderMax ? `₹${n / 1000}k+` : `₹${n / 1000}k`)}
            thumbLabels={["Minimum salary", "Maximum salary"]}
            unset={draft.salaryMin == null && draft.salaryMax == null}
            invalid={err ? "max" : null}
          />
          {err && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {err}
            </p>
          )}
        </div>
      )}
      {incentive && (
        <Field>
          <FieldLabel htmlFor="incentive">Average monthly incentive</FieldLabel>
          <Input
            id="incentive"
            inputMode="numeric"
            placeholder="₹ e.g. 5,000"
            value={draft.incentive == null ? "" : num(draft.incentive)}
            onChange={(e) => update("incentive", toNumber(e.target.value))}
          />
        </Field>
      )}
      <CandidatesSee draft={draft} />
    </>
  )
}

/** An emoji per perk, so each is found at a glance (the prototype's pattern). */
const PERK_EMOJI: Record<string, string> = {
  "Flexible working hours": "🕒",
  "Weekly payout": "💸",
  "Overtime pay": "⏱️",
  "Joining bonus": "🎉",
  "Annual bonus": "🎁",
  PF: "🏦",
  "ESI (ESIC)": "🩺",
  "Travel allowance": "🚌",
  "Petrol allowance": "⛽",
  "Mobile allowance": "📱",
  "Internet allowance": "📶",
  Laptop: "💻",
  "Health insurance": "🏥",
  "Food/Meals": "🍱",
  Accommodation: "🏠",
  "5 working days": "📅",
  "One-way cab": "🚕",
  "Two-way cab": "🚖",
}

function Perks(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const perks = usePickedFirst(PERKS, draft.perks)
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["perks"]} />}
        title="Any extra perks?"
        description="Perks attract more applicants."
      />
      <ChipMultiSelect
        label="Perks"
        options={perks}
        value={draft.perks}
        onChange={(v) => update("perks", v)}
        emoji={PERK_EMOJI}
        size="lg"
      />
      <AddCustom
        placeholder="Add another perk"
        onAdd={(v) => update("perks", Array.from(new Set([...draft.perks, v])))}
      />
    </>
  )
}

function JoiningFee(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const answered = draft.joiningFeeAnswered
  const answer = (fee: boolean) => {
    update("joiningFee", fee)
    update("joiningFeeAnswered", true)
  }
  return (
    <>
      <WizardQuestion title="Do candidates pay any joining fee?" description="Fees, deposits or kit charges." />
      {/* Never pre-answered: a candidate-safety question needs a real answer. */}
      <OptionCardGroup aria-label="Joining fee">
        <OptionCard
          icon={<ShieldCheck />}
          title="No"
          description="Candidates pay nothing"
          selected={answered && !draft.joiningFee}
          onSelect={() => answer(false)}
        />
        <OptionCard
          icon={<IndianRupee />}
          title="Yes"
          description="A fee or deposit applies"
          selected={answered && draft.joiningFee}
          onSelect={() => answer(true)}
        />
      </OptionCardGroup>
      {answered && draft.joiningFee && (
        <>
          <Alert variant="warning">
            <AlertDescription>Fee jobs are reviewed before going live.</AlertDescription>
          </Alert>
          <JoiningFeeDetailsFields draft={draft} update={update} />
        </>
      )}
    </>
  )
}

// ── Who can apply ──────────────────────────────────────────────────────────

function Education(ctx: ScreenCtx) {
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["education"]} />}
        title="What’s the minimum education?"
        description="This level or higher."
      />
      <EducationField draft={ctx.draft} update={ctx.update} />
    </>
  )
}

function English(ctx: ScreenCtx) {
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["english"]} />}
        title="How much English is needed?"
        description="Ask only what the job needs."
      />
      <EnglishField draft={ctx.draft} update={ctx.update} />
    </>
  )
}

function Experience(ctx: ScreenCtx) {
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["experienceType", "minExperienceYears"]} />}
        title="How much experience do they need?"
      />
      <ExperienceField draft={ctx.draft} update={ctx.update} />
    </>
  )
}

const hasPreferences = (d: JobPostDraft) =>
  d.languages.length > 0 ||
  d.skills.length > 0 ||
  d.assets.length > 0 ||
  d.degrees.length > 0 ||
  d.gender !== "any" ||
  d.ageMin != null ||
  d.ageMax != null

function Preferences(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const count = (n: number) => (n ? `${n} added` : "None")
  // Anything already filled (by the AI or earlier) opens, so it can be
  // checked without hunting for it.
  const [open] = React.useState(
    () =>
      [
        draft.languages.length && "languages",
        draft.skills.length && "skills",
        draft.assets.length && "assets",
        draft.degrees.length && "degrees",
        (draft.gender !== "any" || draft.ageMin != null || draft.ageMax != null) && "gender-age",
      ].filter(Boolean) as string[],
  )
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["languages", "skills", "assets"]} />}
        title="Anyone you’d prefer?"
        description="Optional. Matches show first."
      />
      <Accordion multiple defaultValue={open} className="flex flex-col gap-2">
        <AccordionItem value="languages" className="rounded-xl border border-border px-4">
          <AccordionTrigger>Languages · {count(draft.languages.length)}</AccordionTrigger>
          <AccordionContent>
            <ChipMultiSelect
              label="Languages"
              options={LANGUAGES}
              display={LANGUAGE_NATIVE}
              value={draft.languages}
              onChange={(v) => update("languages", v)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills" className="rounded-xl border border-border px-4">
          <AccordionTrigger>Skills · {count(draft.skills.length)}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <ChipMultiSelect
              label="Skills"
              options={draft.skills}
              value={draft.skills}
              onChange={(v) => update("skills", v)}
            />
            <AddCustom
              placeholder="Add a skill"
              onAdd={(v) => update("skills", Array.from(new Set([...draft.skills, v])))}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="assets" className="rounded-xl border border-border px-4">
          <AccordionTrigger>Must own · {count(draft.assets.length)}</AccordionTrigger>
          <AccordionContent>
            <ChipMultiSelect
              label="Assets"
              options={ASSETS}
              value={draft.assets}
              onChange={(v) => update("assets", v)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="degrees" className="rounded-xl border border-border px-4">
          <AccordionTrigger>Degree · {count(draft.degrees.length)}</AccordionTrigger>
          <AccordionContent>
            <ChipMultiSelect
              label="Degrees"
              options={DEGREES}
              value={draft.degrees}
              onChange={(v) => update("degrees", v)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gender-age" className="rounded-xl border border-border px-4">
          <AccordionTrigger>
            Gender &amp; age ·{" "}
            {draft.gender === "any" && draft.ageMin == null && draft.ageMax == null ? "Anyone" : "Set"}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <ChipTabs
              variant="choice"
              size="lg"
              aria-label="Gender"
              items={[
                { value: "any", label: "Anyone" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              value={draft.gender}
              onValueChange={(v) => update("gender", v)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="age-min">Age from</FieldLabel>
                <Input
                  id="age-min"
                  inputMode="numeric"
                  placeholder="18"
                  value={draft.ageMin ?? ""}
                  onChange={(e) => update("ageMin", toNumber(e.target.value))}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="age-max">to</FieldLabel>
                <Input
                  id="age-max"
                  inputMode="numeric"
                  placeholder="60"
                  value={draft.ageMax ?? ""}
                  onChange={(e) => update("ageMax", toNumber(e.target.value))}
                />
              </Field>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

function Screening(ctx: ScreenCtx) {
  return (
    <>
      <WizardQuestion title="Any questions for applicants?" description="Optional yes/no questions." />
      <ScreeningQuestionsField draft={ctx.draft} update={ctx.update} />
    </>
  )
}

function Description(ctx: ScreenCtx) {
  const { draft, update, aiFilled, descriptionStale, writeDescription } = ctx
  const [instruction, setInstruction] = React.useState("")
  const n = draft.description.trim().length
  const untouched = aiFilled.includes("description")

  // Written at the start, from the first draft. If the answers it was
  // written from have changed and the recruiter hasn't edited it, rewrite
  // it on arrival so it never contradicts the job.
  const autoRewrote = React.useRef(false)
  React.useEffect(() => {
    if (descriptionStale && untouched && !autoRewrote.current) {
      autoRewrote.current = true
      void writeDescription()
    }
  }, [descriptionStale, untouched, writeDescription])

  const rewrite = async () => {
    await writeDescription(instruction.trim() || undefined)
    setInstruction("")
  }
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["description"]} />}
        title="How does the description read?"
        description={n ? "Written from your answers. Edit freely." : "We can write it for you."}
      />
      {descriptionStale && !untouched && n > 0 && (
        <Alert variant="warning">
          <AlertTitle>Your answers changed since this was written</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-2">
            Rewriting replaces your edits.
            <Button
              type="button"
              size="sm"
              variant="outline"
              loading={ctx.writing}
              onClick={() => void writeDescription()}
            >
              <RefreshCw aria-hidden /> Rewrite
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {n === 0 && (
        <Button type="button" variant="outline" size="lg" loading={ctx.writing} onClick={() => void writeDescription()}>
          <Wand2 aria-hidden /> Write it for me
        </Button>
      )}
      <Field>
        <FieldLabel htmlFor="job-description">Description</FieldLabel>
        <Textarea
          id="job-description"
          inputSize="lg"
          value={draft.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What will they do day to day?"
        />
        <FieldDescription className="flex justify-between tabular-nums">
          <span>{n < 150 ? "Aim for 150+ characters" : "Good length"}</span>
          <span>{n} / 3000</span>
        </FieldDescription>
      </Field>
      {n > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Rewrite with AI</span>
          <PromptInput
            aria-label="How should we rewrite it?"
            value={instruction}
            onValueChange={setInstruction}
            onSubmit={() => void rewrite()}
            loading={ctx.writing}
            placeholder="e.g. Shorter, mention weekly payout"
            submitLabel="Rewrite description"
          />
        </div>
      )}
    </>
  )
}

// ── Hiring setup ───────────────────────────────────────────────────────────

function Interview(ctx: ScreenCtx) {
  const { draft, update } = ctx
  const w = draft.walkInDetails
  return (
    <>
      <WizardQuestion
        eyebrow={<AiTag ctx={ctx} keys={["walkIn"]} />}
        title="Is this a walk-in interview?"
        description="Candidates visit at set times."
      />
      <OptionCardGroup aria-label="Interview type">
        <OptionCard
          icon={<CalendarDays />}
          title="No, I’ll schedule interviews"
          description="You call shortlisted candidates"
          selected={!draft.walkIn}
          onSelect={() => update("walkIn", false)}
        />
        <OptionCard
          icon={<DoorOpen />}
          title="Yes, walk-in"
          description="Candidates drop in at set times"
          selected={draft.walkIn}
          onSelect={() => {
            update("walkIn", true)
            // The venue is usually the office.
            if (!w.address)
              update("walkInDetails", {
                ...w,
                address: [draft.area, draft.city].filter(Boolean).join(", "),
              })
            // "I'll contact them first" doesn't work for a walk-in.
            if (draft.contact === "none") update("contact", "self")
          }}
        />
      </OptionCardGroup>
      {draft.walkIn && <WalkInDetailsFields draft={draft} update={update} />}
    </>
  )
}

function Contact(ctx: ScreenCtx) {
  const { draft, update } = ctx
  return (
    <>
      <WizardQuestion title="Can candidates call you after applying?" description="Shown only after applying." />
      <OptionCardGroup aria-label="Candidate contact">
        <OptionCard
          icon={<Phone />}
          title="Yes, me"
          description={ACCOUNT_PHONE}
          selected={draft.contact === "self"}
          onSelect={() => update("contact", "self")}
        />
        <OptionCard
          icon={<Users />}
          title="Yes, a teammate"
          description="Share their number"
          selected={draft.contact === "other"}
          onSelect={() => update("contact", "other")}
        />
        <OptionCard
          icon={<Lock />}
          title="No"
          description={draft.walkIn ? "Not for walk-ins" : "You call them first"}
          disabled={draft.walkIn}
          selected={draft.contact === "none"}
          onSelect={() => update("contact", "none")}
        />
      </OptionCardGroup>
      {draft.contact === "other" && <OtherRecruiterFields draft={draft} update={update} />}
      {draft.contact !== "none" && <WhoCanContactField draft={draft} update={update} />}
    </>
  )
}

// ── Review ─────────────────────────────────────────────────────────────────

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: React.ReactNode
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-2 border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
          <Pencil aria-hidden /> Edit
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </section>
  )
}

function Review(ctx: ScreenCtx) {
  const { draft } = ctx
  const [instruction, setInstruction] = React.useState("")
  const [status, setStatus] = React.useState<string | null>(null)
  const ask = async () => {
    const text = instruction.trim()
    if (!text) return
    const changed = await ctx.refine(text)
    setStatus(changed ? "Updated." : "No changes. Try rephrasing.")
    if (changed) setInstruction("")
  }
  const strict = (s: "must" | "preferred") => (s === "preferred" ? " (preferred)" : "")
  const reqs = [
    draft.education && `${EDUCATION_LABELS[draft.education]}${strict(draft.strictness.education)}`,
    draft.english &&
      `${ENGLISH_LABELS[draft.english]}${draft.english === "none" ? "" : strict(draft.strictness.english)}`,
    experienceLabel(draft) &&
      `${experienceLabel(draft)}${draft.experienceType === "experienced" ? strict(draft.strictness.experience) : ""}`,
  ].filter(Boolean)
  const prefs = [
    draft.languages.join(", "),
    draft.skills.join(", "),
    draft.assets.length ? `Must own: ${draft.assets.join(", ")}` : "",
    draft.gender !== "any" ? (draft.gender === "male" ? "Male" : "Female") : "",
  ].filter(Boolean)
  return (
    <>
      <WizardQuestion title="Review" description="This is what candidates see." />
      <Checks ctx={ctx} ids={["unserved-city", "category-mismatch", "multi-role", "generic-title"]} />

      {/* Phones get the preview here; wider screens have it beside the questions. */}
      <div className="flex justify-center lg:hidden">
        <div className="w-full max-w-xs">
          <CandidateJobPreview draft={draft} />
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-border bg-card p-4">
        <ReviewSection title="Job" onEdit={() => ctx.edit("title")}>
          {draft.title || "—"} · {companyName(draft)}
          <br />
          {[
            draft.category,
            draft.industry,
            draft.jobType && JOB_TYPE_LABELS[draft.jobType],
            draft.nightShift && "Night shift",
          ]
            .filter(Boolean)
            .join(" · ")}
        </ReviewSection>
        <ReviewSection title="Location" onEdit={() => ctx.edit("location")}>
          {locationLabel(draft) ?? "—"}
        </ReviewSection>
        <ReviewSection title="Pay & perks" onEdit={() => ctx.edit("salary")}>
          {salaryLabel(draft) ? `${salaryLabel(draft)} / month` : "—"}
          {draft.perks.length > 0 && <> · {draft.perks.join(", ")}</>}
          <br />
          {draft.joiningFee && draft.joiningFeeDetails.amount != null
            ? `Joining fee ${inr(draft.joiningFeeDetails.amount)}`
            : "No joining fee"}
        </ReviewSection>
        <ReviewSection title="Who can apply" onEdit={() => ctx.edit("education")}>
          {reqs.join(" · ") || "—"}
        </ReviewSection>
        <ReviewSection title="Preferences" onEdit={() => ctx.edit("preferences")}>
          {prefs.join(" · ") || "None"}
        </ReviewSection>
        <ReviewSection title="Description" onEdit={() => ctx.edit("description")}>
          <span className="line-clamp-3 whitespace-pre-line">{draft.description || "—"}</span>
        </ReviewSection>
        <ReviewSection title="Interview & contact" onEdit={() => ctx.edit("interview")}>
          {draft.walkIn ? "Walk-in" : "Scheduled interviews"} ·{" "}
          {draft.contact === "self"
            ? "Candidates can call you"
            : draft.contact === "other"
              ? `Candidates call ${draft.otherRecruiter.name || "a teammate"}`
              : "You call candidates first"}
        </ReviewSection>
      </div>

      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Sparkles className="size-4" aria-hidden /> Ask AI to change something
        </span>
        <PromptInput
          aria-label="What should we change?"
          value={instruction}
          onValueChange={(v) => {
            setInstruction(v)
            setStatus(null)
          }}
          onSubmit={() => void ask()}
          loading={ctx.refining}
          placeholder="e.g. Make it 18–22k"
          submitLabel="Apply change"
        />
        {status && (
          <p role="status" className="text-xs text-muted-foreground">
            {status}
          </p>
        )}
      </div>

      <LockNote>Job role can&apos;t change after posting.</LockNote>
    </>
  )
}

// ── The flow ───────────────────────────────────────────────────────────────

const has = (s: string) => s.trim().length > 0

export const SCREENS: ScreenDef[] = [
  { id: "describe", stage: null, cta: "Draft my job", Render: Describe },
  { id: "manual-intro", stage: null, cta: "Get started", Render: ManualIntro },

  {
    id: "title",
    stage: "job",
    preview: "top",
    check: (d) =>
      d.title.trim().length < 3
        ? "Add a job title"
        : d.hiringFor === "client" && !has(d.clientCompany)
          ? "Add the client name"
          : null,
    Render: Title,
  },
  {
    id: "category",
    stage: "job",
    preview: "top",
    check: (d) => (!d.category ? "Choose a job role" : null),
    Render: Category,
  },
  {
    id: "industry",
    stage: "job",
    preview: "top",
    check: (d) => (!d.industry ? "Choose an industry" : null),
    Render: Industry,
  },
  {
    id: "job-type",
    stage: "job",
    preview: "top",
    check: (d) => (!d.jobType ? "Choose a job type" : null),
    Render: JobType,
  },
  {
    id: "workplace",
    stage: "job",
    preview: "top",
    check: (d) => (!d.locationType ? "Choose a workplace" : null),
    Render: Workplace,
  },
  {
    id: "location",
    stage: "job",
    preview: "top",
    check: (d) =>
      !d.city
        ? "Choose a city"
        : d.locationType !== "home" && !has(d.area)
          ? "Add the area"
          : blockingCheck(d, ["unserved-city"]),
    Render: Location,
  },
  {
    id: "pay-type",
    stage: "job",
    preview: "top",
    check: (d) => (!d.payType ? "Choose a pay type" : null),
    Render: PayType,
  },
  {
    id: "salary",
    stage: "job",
    preview: "top",
    check: (d) => {
      const err = salaryError(d)
      if (err) return err
      // Name whichever part is actually missing — with "Fixed + incentive",
      // a complete salary range and no incentive is about the incentive.
      const needsFixed = d.payType !== "incentive"
      const needsIncentive = d.payType !== "fixed"
      if (needsFixed && (d.salaryMin == null || d.salaryMax == null)) return "Add the salary range"
      if (needsIncentive && d.incentive == null) return "Add the average monthly incentive"
      return null
    },
    Render: Salary,
  },
  {
    id: "perks",
    stage: "job",
    preview: "top",
    isEmpty: (d) => d.perks.length === 0,
    Render: Perks,
  },
  {
    id: "joining-fee",
    stage: "job",
    preview: "interview",
    check: (d) =>
      !d.joiningFeeAnswered
        ? "Answer the fee question"
        : missingRequired(d).includes("joiningFee")
          ? "Add the fee details"
          : null,
    Render: JoiningFee,
  },

  {
    id: "education",
    stage: "candidates",
    preview: "requirements",
    check: (d) => (missingRequired(d).includes("education") ? "Choose education" : null),
    Render: Education,
  },
  {
    id: "english",
    stage: "candidates",
    preview: "requirements",
    check: (d) => (missingRequired(d).includes("english") ? "Choose English level" : null),
    Render: English,
  },
  {
    id: "experience",
    stage: "candidates",
    preview: "requirements",
    check: (d) => (missingRequired(d).includes("experience") ? "Choose experience" : null),
    Render: Experience,
  },
  {
    id: "preferences",
    stage: "candidates",
    preview: "requirements",
    isEmpty: (d) => !hasPreferences(d),
    check: (d) =>
      d.ageMin != null && d.ageMin < 18
        ? "Minimum age is 18"
        : d.ageMin != null && d.ageMax != null && d.ageMax < d.ageMin
          ? "Max age is below min age"
          : null,
    Render: Preferences,
  },
  {
    id: "screening",
    stage: "candidates",
    isEmpty: (d) => d.screeningQuestions.length === 0,
    Render: Screening,
  },
  {
    id: "description",
    stage: "candidates",
    preview: "description",
    check: (d) => (!has(d.description) ? "Add a description" : null),
    Render: Description,
  },

  {
    id: "interview",
    stage: "setup",
    preview: "interview",
    check: (d) => {
      if (!missingRequired(d).includes("walkIn")) return null
      const w = d.walkInDetails
      if (w.endDate && w.startDate && w.endDate < w.startDate) return "End date is before start date"
      return "Add walk-in details"
    },
    Render: Interview,
  },
  {
    id: "contact",
    stage: "setup",
    preview: "interview",
    check: (d) => (missingRequired(d).includes("otherRecruiter") ? "Add your teammate's details" : null),
    Render: Contact,
  },
  {
    id: "review",
    stage: "setup",
    preview: "top",
    cta: "Choose a plan",
    check: (d) => {
      const blocked = runJobChecks(d).find((c) => c.severity === "block")
      if (blocked) return blocked.title
      const first = SCREENS.find((s) => s.id !== "review" && s.check?.(d))
      return first ? `Finish “${SCREEN_NAMES[first.id]}” first` : null
    },
    Render: Review,
  },
]

/** Short names for errors and the review's "finish X first". */
export const SCREEN_NAMES: Record<ScreenId, string> = {
  describe: "Describe the job",
  "manual-intro": "Get started",
  title: "Job title",
  category: "Job role",
  industry: "Industry",
  "job-type": "Job type",
  workplace: "Workplace",
  location: "Location",
  "pay-type": "Pay type",
  salary: "Salary",
  perks: "Perks",
  "joining-fee": "Joining fee",
  education: "Education",
  english: "English",
  experience: "Experience",
  preferences: "Preferences",
  screening: "Screening questions",
  description: "Job description",
  interview: "Interview",
  contact: "Candidate contact",
  review: "Review",
}

export const STAGE_LABELS: Record<StageId, string> = {
  job: "Job details",
  candidates: "Who can apply",
  setup: "Hiring setup",
}

export const screenIndex = (id: ScreenId) => SCREENS.findIndex((s) => s.id === id)

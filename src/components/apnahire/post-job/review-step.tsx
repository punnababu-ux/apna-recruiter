"use client"

/**
 * Step 2 — review the AI's draft. Research on the old flows found recruiters
 * don't review AI output they aren't made to look at, and that most bad jobs
 * come from a wrong title, category, industry, location or salary. So:
 *
 *   1. "AI needs N things" — required fields the AI couldn't fill.
 *   2. "Check before you post" — the five key fields, each confirmed
 *      explicitly with the reason it matters (AI-filled ones marked).
 *   3. Sections (Job, Location, Pay, Who can apply, Screening, Interview &
 *      contact, Description, More options), read-mode with Edit.
 *   Right: job checks (rule-based, opt-in fixes) over the live preview.
 *   Bottom: "Ask AI to change anything" + Continue (gated on all three).
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
  AlertTriangle,
  Badge,
  Button,
  Card,
  Check,
  CheckCircle2,
  ChipTabs,
  Field,
  FieldLabel,
  Input,
  Pencil,
  PromptInput,
  ShieldAlert,
  Sparkles,
  Switch,
  Wand2,
  X,
} from "@apna/design-system"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { CandidateJobPreview } from "@/components/apnahire/post-job/candidate-job-preview"
import { MicButton } from "@/components/apnahire/post-job/mic-button"
import {
  AddCustom,
  CategoryField,
  ChipMultiSelect,
  ContactField,
  DescriptionField,
  EducationField,
  EnglishField,
  ExperienceField,
  FIELD_EDITORS,
  IndustryField,
  JobTypeField,
  JoiningFeeField,
  LocationField,
  PayField,
  ScreeningQuestionsField,
  TitleField,
  WalkInField,
  type UpdateDraft,
} from "@/components/apnahire/post-job/job-fields"
import {
  ASSETS,
  DEGREES,
  EDUCATION_LABELS,
  ENGLISH_LABELS,
  JOB_TYPE_LABELS,
  KEY_FIELDS,
  KEY_FIELD_KEYS,
  KEY_FIELD_LABELS,
  KEY_FIELD_WHY,
  LANGUAGES,
  LOCATION_TYPE_LABELS,
  PAY_TYPE_LABELS,
  PERKS,
  REQUIRED_FIELD_LABELS,
  experienceLabel,
  inr,
  keyFieldValue,
  locationLabel,
  missingRequired,
  requiredFieldSummary,
  runJobChecks,
  salaryLabel,
  type JobCheck,
} from "@/lib/apnahire/job-draft"
import type { JobPostDraft, KeyField, RequiredField } from "@/types/apnahire-job"
import type { AiFlash } from "@/components/apnahire/post-job/post-job-flow"

type SectionId = "job" | "location" | "pay" | "who" | "screening" | "contact" | "description" | "more"

const SECTION_OF: Record<keyof JobPostDraft, SectionId> = {
  title: "job",
  category: "job",
  industry: "job",
  jobType: "job",
  locationType: "location",
  city: "location",
  area: "location",
  relocation: "location",
  payType: "pay",
  salaryMin: "pay",
  salaryMax: "pay",
  incentive: "pay",
  joiningFee: "pay",
  joiningFeeDetails: "pay",
  education: "who",
  english: "who",
  experienceType: "who",
  minExperienceYears: "who",
  strictness: "who",
  screeningQuestions: "screening",
  walkIn: "contact",
  walkInDetails: "contact",
  contact: "contact",
  otherRecruiter: "contact",
  whoCanContact: "contact",
  description: "description",
  languages: "more",
  nightShift: "more",
  perks: "more",
  skills: "more",
  degrees: "more",
  assets: "more",
  gender: "more",
  ageMin: "more",
  ageMax: "more",
}

const SECTION_FOR_KEY_FIELD: Record<KeyField, SectionId> = {
  title: "job",
  category: "job",
  industry: "job",
  location: "location",
  pay: "pay",
}

/** Staggered entrance for the review blocks. */
const rise = (i: number) => ({
  className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500",
  style: { animationDelay: `${i * 60}ms` },
})

interface ReviewStepProps {
  draft: JobPostDraft
  update: UpdateDraft
  /** Required fields the AI couldn't fill when it drafted — asked up top. */
  askFields: RequiredField[]
  /** Draft keys the AI filled that the recruiter hasn't touched since. */
  aiFilled: (keyof JobPostDraft)[]
  confirmed: KeyField[]
  onConfirm: (field: KeyField) => void
  onApplyFix: (patch: Partial<JobPostDraft>) => void
  onRefine: (instruction: string) => Promise<boolean>
  onWriteDescription: () => Promise<void>
  refining: boolean
  writingDescription: boolean
  /** Fields the AI just changed — their sections and the preview flash. */
  flash: AiFlash | null
  onContinue: () => void
}

export function ReviewStep({
  draft,
  update,
  askFields,
  aiFilled,
  confirmed,
  onConfirm,
  onApplyFix,
  onRefine,
  onWriteDescription,
  refining,
  writingDescription,
  flash,
  onContinue,
}: ReviewStepProps) {
  const [openSection, setOpenSection] = React.useState<SectionId | null>(null)
  const sectionRefs = React.useRef<Partial<Record<SectionId, HTMLDivElement | null>>>({})

  const missing = missingRequired(draft)
  const checks = runJobChecks(draft)
  const blocked = checks.some((c) => c.severity === "block")
  const unconfirmed = KEY_FIELDS.filter((f) => keyFieldValue(f, draft) && !confirmed.includes(f))

  const flashed = new Set(flash?.keys.map((k) => SECTION_OF[k]))
  const flashKey = (id: SectionId) => (flash && flashed.has(id) ? flash.nonce : undefined)
  const aiSections = new Set(aiFilled.map((k) => SECTION_OF[k]))

  const openAndScroll = (id: SectionId) => {
    setOpenSection(id)
    requestAnimationFrame(() => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" }))
  }

  const sectionProps = (id: SectionId, order: number) => ({
    open: openSection === id,
    onOpenChange: (open: boolean) => setOpenSection(open ? id : null),
    order,
    flashKey: flashKey(id),
    aiFilled: aiSections.has(id),
    sectionRef: (el: HTMLDivElement | null) => {
      sectionRefs.current[id] = el
    },
  })

  const describeAction = (
    <Button type="button" size="sm" variant="ghost" onClick={onWriteDescription} disabled={writingDescription || !draft.title.trim()}>
      <Wand2 className="size-4" aria-hidden />
      {draft.description.trim() ? "Rewrite with AI" : "Write with AI"}
    </Button>
  )

  const strict = (k: keyof JobPostDraft["strictness"], label: string | null | false | "") =>
    label ? (draft.strictness[k] === "preferred" ? `${label} (preferred)` : label) : null

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex min-w-0 flex-1 flex-col gap-4 pb-40">
        <div {...rise(0)} className={`${rise(0).className} flex flex-col gap-1`}>
          <h1 className="text-h3 text-foreground">Review your job</h1>
          <p className="text-body-sm text-muted-foreground">
            Drafted from your description. Fill the gaps, confirm the key details, and see exactly what candidates will see.
          </p>
        </div>

        {askFields.length > 0 && (
          <div {...rise(1)}>
            <MissingFieldsStrip draft={draft} update={update} askFields={askFields} describeAction={describeAction} />
          </div>
        )}

        <div {...rise(2)}>
          <KeyFieldsCard
            draft={draft}
            confirmed={confirmed}
            aiFilled={aiFilled}
            onConfirm={onConfirm}
            onEdit={(f) => openAndScroll(SECTION_FOR_KEY_FIELD[f])}
          />
        </div>

        <ReviewSection
          title="Job"
          {...sectionProps("job", 3)}
          complete={!missing.includes("title") && !missing.includes("industry") && !missing.includes("jobType")}
          summary={[draft.title, draft.category, draft.industry, draft.jobType && JOB_TYPE_LABELS[draft.jobType]]}
        >
          <TitleField draft={draft} update={update} />
          <div className="grid gap-4 sm:grid-cols-2">
            <CategoryField draft={draft} update={update} />
            <IndustryField draft={draft} update={update} />
          </div>
          <JobTypeField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Location"
          {...sectionProps("location", 4)}
          complete={!missing.includes("location")}
          summary={[
            draft.locationType && LOCATION_TYPE_LABELS[draft.locationType],
            locationLabel(draft),
            draft.relocation && "Open to relocation",
          ]}
        >
          <LocationField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Pay"
          {...sectionProps("pay", 5)}
          complete={!missing.includes("pay") && !missing.includes("joiningFee")}
          summary={[
            draft.payType && PAY_TYPE_LABELS[draft.payType],
            salaryLabel(draft) && `${salaryLabel(draft)} / month`,
            draft.joiningFee
              ? `Joining fee ${draft.joiningFeeDetails.amount != null ? inr(draft.joiningFeeDetails.amount) : ""}`
              : "No joining fee",
          ]}
        >
          <PayField draft={draft} update={update} />
          <JoiningFeeField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Who can apply"
          {...sectionProps("who", 6)}
          complete={!missing.includes("education") && !missing.includes("english") && !missing.includes("experience")}
          summary={[
            strict("education", draft.education && EDUCATION_LABELS[draft.education]),
            strict("english", draft.english && ENGLISH_LABELS[draft.english]),
            strict("experience", experienceLabel(draft)),
          ]}
        >
          <EducationField draft={draft} update={update} />
          <EnglishField draft={draft} update={update} />
          <ExperienceField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Screening questions"
          {...sectionProps("screening", 7)}
          complete
          optional
          summary={[
            draft.screeningQuestions.length
              ? `${draft.screeningQuestions.length} question${draft.screeningQuestions.length === 1 ? "" : "s"}`
              : "None yet — add yes/no questions candidates answer when applying",
            draft.screeningQuestions.some((q) => q.mustHave) && "some must-answer Yes",
          ]}
        >
          <ScreeningQuestionsField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Interview & contact"
          {...sectionProps("contact", 8)}
          complete={!missing.includes("walkIn") && !missing.includes("otherRecruiter")}
          summary={[
            draft.walkIn ? "Walk-in interview" : "Not a walk-in",
            draft.contact === "self"
              ? "Candidates can call you"
              : draft.contact === "other"
                ? `Candidates call ${draft.otherRecruiter.name || "another recruiter"}`
                : "You'll call candidates first",
            draft.contact !== "none" && draft.whoCanContact === "matched" && "strong matches only",
          ]}
        >
          <WalkInField draft={draft} update={update} />
          <ContactField draft={draft} update={update} />
        </ReviewSection>

        <ReviewSection
          title="Description"
          {...sectionProps("description", 9)}
          complete={!missing.includes("description")}
          summary={[draft.description.split("\n")[0]]}
        >
          <DescriptionField draft={draft} update={update} action={describeAction} />
        </ReviewSection>

        <div {...rise(10)}>
          <MoreOptions draft={draft} update={update} />
        </div>
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-3 animate-in fade-in slide-in-from-right-4 fill-mode-both duration-700 lg:sticky lg:top-40 lg:w-80">
        <JobChecks checks={checks} onApplyFix={onApplyFix} />
        <p className="text-center text-xs font-medium text-muted-foreground">How candidates will see your job</p>
        <CandidateJobPreview draft={draft} flashKey={flash?.nonce} />
      </aside>

      <ReviewFooter
        missingCount={missing.length}
        unconfirmedCount={unconfirmed.length}
        blocked={blocked}
        onContinue={onContinue}
        onRefine={onRefine}
        refining={refining}
      />
    </div>
  )
}

// ── "AI needs N things" ────────────────────────────────────────────────────

function MissingFieldsStrip({
  draft,
  update,
  askFields,
  describeAction,
}: {
  draft: JobPostDraft
  update: UpdateDraft
  askFields: RequiredField[]
  describeAction: React.ReactNode
}) {
  const missing = missingRequired(draft)
  // Conditional fields (walk-in details etc.) can become required after
  // drafting — ask them here too, once triggered.
  const shown = [...askFields, ...missing.filter((f) => !askFields.includes(f))]
  const remaining = shown.filter((f) => missing.includes(f)).length

  return (
    <Card padding="md" className="flex flex-col gap-5 border-primary/30 bg-accent/40">
      <div className="flex items-center gap-2">
        {remaining === 0 ? (
          <CheckCircle2 className="size-5 text-success" aria-hidden />
        ) : (
          <Sparkles className="size-5 text-primary" aria-hidden />
        )}
        <p className="text-sm font-semibold text-foreground">
          {remaining === 0 ? "All filled in" : `${remaining} more thing${remaining === 1 ? "" : "s"} to post your job`}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {shown.map((f) => {
          // Answered fields collapse to one line; the section card below
          // is where they're changed from here on.
          if (!missing.includes(f)) {
            return (
              <p
                key={f}
                className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-top-1 duration-300"
              >
                <CheckCircle2 className="size-4 shrink-0 text-success animate-in zoom-in-50 duration-300" aria-hidden />
                <span className="text-muted-foreground">{REQUIRED_FIELD_LABELS[f]}</span>
                <span className="truncate font-medium">{requiredFieldSummary(f, draft)}</span>
              </p>
            )
          }
          return f === "description" ? (
            <DescriptionField key={f} draft={draft} update={update} action={describeAction} />
          ) : (
            React.createElement(FIELD_EDITORS[f], { key: f, draft, update })
          )
        })}
      </div>
    </Card>
  )
}

// ── "Check before you post" ────────────────────────────────────────────────

function KeyFieldsCard({
  draft,
  confirmed,
  aiFilled,
  onConfirm,
  onEdit,
}: {
  draft: JobPostDraft
  confirmed: KeyField[]
  aiFilled: (keyof JobPostDraft)[]
  onConfirm: (f: KeyField) => void
  onEdit: (f: KeyField) => void
}) {
  const rows = KEY_FIELDS.filter((f) => keyFieldValue(f, draft))
  if (rows.length === 0) return null
  const done = rows.filter((f) => confirmed.includes(f)).length

  return (
    <Card padding="md" className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">Check before you post</p>
          <p className="text-xs text-muted-foreground">These decide who sees your job — most mismatched jobs go wrong here.</p>
        </div>
        <Badge variant={done === rows.length ? "success" : "secondary"}>
          {done}/{rows.length} checked
        </Badge>
      </div>
      <ul className="flex flex-col divide-y divide-border">
        {rows.map((f) => {
          const isConfirmed = confirmed.includes(f)
          const byAi = KEY_FIELD_KEYS[f].some((k) => aiFilled.includes(k))
          return (
            <li key={f} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  {KEY_FIELD_LABELS[f]}
                  {byAi && !isConfirmed && (
                    <Badge variant="info" className="gap-1">
                      <Sparkles aria-hidden /> AI-filled
                    </Badge>
                  )}
                </p>
                <p className="truncate text-sm font-medium text-foreground">{keyFieldValue(f, draft)}</p>
                <p className="text-xs text-muted-foreground">{KEY_FIELD_WHY[f]}</p>
              </div>
              {isConfirmed ? (
                <span className="flex items-center gap-1.5 text-sm font-medium text-success animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle2 className="size-4" aria-hidden /> Checked
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => onEdit(f)}>
                    <Pencil className="size-3.5" aria-hidden /> Change
                  </Button>
                  <Button type="button" size="sm" onClick={() => onConfirm(f)}>
                    <Check className="size-3.5" aria-hidden /> Looks right
                  </Button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

// ── Job checks (beside the preview) ────────────────────────────────────────

function JobChecks({ checks, onApplyFix }: { checks: JobCheck[]; onApplyFix: (patch: Partial<JobPostDraft>) => void }) {
  if (checks.length === 0) {
    return (
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5 text-success" aria-hidden /> Job check: no issues found
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      {checks.map((c) => (
        <Alert
          key={c.id}
          variant={c.severity === "block" ? "destructive" : "warning"}
          className="animate-in fade-in slide-in-from-top-1 duration-300"
        >
          {c.severity === "block" ? <ShieldAlert aria-hidden /> : <AlertTriangle aria-hidden />}
          <AlertTitle>{c.title}</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-2">
            {c.detail}
            {c.fix && (
              <Button type="button" size="sm" variant="outline" onClick={() => onApplyFix(c.fix!.patch)}>
                {c.fix.label}
              </Button>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

// ── Section card ───────────────────────────────────────────────────────────

function ReviewSection({
  title,
  summary,
  complete,
  optional = false,
  open,
  onOpenChange,
  order,
  flashKey,
  aiFilled,
  sectionRef,
  children,
}: {
  title: string
  summary: (string | null | false | undefined | "")[]
  complete: boolean
  optional?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Position in the entrance stagger. */
  order: number
  /** Set (and bumped) when the AI just changed this section. */
  flashKey?: number
  /** Some value here came from the AI and hasn't been touched since. */
  aiFilled: boolean
  sectionRef: (el: HTMLDivElement | null) => void
  children: React.ReactNode
}) {
  const parts = summary.filter(Boolean) as string[]
  return (
    <Card ref={sectionRef} padding="md" className={`${rise(order).className} flex scroll-mt-48 flex-col gap-4`} style={rise(order).style}>
      <div
        key={flashKey}
        className={`-m-2 flex items-start justify-between gap-3 rounded-lg p-2 ${flashKey ? "animate-ai-flash" : ""}`}
      >
        <div className="flex min-w-0 flex-col gap-1">
          <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
            {title}
            {!complete && <Badge variant="warning">Needs info</Badge>}
            {optional && <Badge variant="secondary">Optional</Badge>}
            {aiFilled && complete && (
              <Badge variant="info" className="gap-1">
                <Sparkles aria-hidden /> AI-filled
              </Badge>
            )}
          </p>
          {!open && <p className="truncate text-sm text-muted-foreground">{parts.length ? parts.join(" · ") : "Not added yet"}</p>}
        </div>
        <Button type="button" size="sm" variant={open ? "default" : "outline"} onClick={() => onOpenChange(!open)}>
          {open ? (
            "Done"
          ) : (
            <>
              <Pencil className="size-3.5" aria-hidden /> Edit
            </>
          )}
        </Button>
      </div>
      {open && <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-top-1 duration-300">{children}</div>}
    </Card>
  )
}

// ── More options ───────────────────────────────────────────────────────────

function MoreOptions({ draft, update }: { draft: JobPostDraft; update: UpdateDraft }) {
  const toNumber = (v: string) => {
    const n = parseInt(v.replace(/[^\d]/g, ""), 10)
    return Number.isFinite(n) ? n : null
  }
  const customPerks = draft.perks.filter((p) => !PERKS.includes(p))
  const showDegrees = draft.education === "graduate" || draft.education === "post_graduate"

  return (
    <Accordion>
      <AccordionItem value="more">
        <AccordionTrigger>More options (optional) — perks, skills, languages, age, assets, shift</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-6 pt-2">
            <Field>
              <FieldLabel>Perks</FieldLabel>
              <ChipMultiSelect label="Perks" options={[...PERKS, ...customPerks]} value={draft.perks} onChange={(v) => update("perks", v)} />
              <AddCustom placeholder="Add another perk" onAdd={(p) => update("perks", Array.from(new Set([...draft.perks, p])))} />
            </Field>

            <Field>
              <FieldLabel>Skills</FieldLabel>
              {draft.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {draft.skills.map((s) => (
                    <Badge key={s} variant="outline" className="gap-1">
                      {s}
                      <button type="button" aria-label={`Remove ${s}`} onClick={() => update("skills", draft.skills.filter((x) => x !== s))}>
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <AddCustom
                placeholder="Add a skill (up to 15)"
                onAdd={(s) => draft.skills.length < 15 && update("skills", Array.from(new Set([...draft.skills, s])))}
              />
            </Field>

            <Field>
              <FieldLabel>Regional languages</FieldLabel>
              <ChipMultiSelect label="Regional languages" options={LANGUAGES} value={draft.languages} onChange={(v) => update("languages", v)} />
            </Field>

            {showDegrees && (
              <Field>
                <FieldLabel>Degree / specialisation</FieldLabel>
                <ChipMultiSelect label="Degree" options={DEGREES} value={draft.degrees} onChange={(v) => update("degrees", v)} />
              </Field>
            )}

            <Field>
              <FieldLabel>Candidate must have</FieldLabel>
              <ChipMultiSelect label="Assets" options={ASSETS} value={draft.assets} onChange={(v) => update("assets", v)} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Gender preference</FieldLabel>
                <ChipTabs
                  variant="choice"
                  size="sm"
                  aria-label="Gender preference"
                  items={[
                    { value: "any", label: "Any" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  value={draft.gender}
                  onValueChange={(v) => update("gender", v)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="age-min">Age range (years)</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="age-min"
                    inputMode="numeric"
                    aria-label="Minimum age"
                    placeholder="18"
                    value={draft.ageMin ?? ""}
                    onChange={(e) => update("ageMin", toNumber(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input
                    inputMode="numeric"
                    aria-label="Maximum age"
                    placeholder="60"
                    value={draft.ageMax ?? ""}
                    onChange={(e) => update("ageMax", toNumber(e.target.value))}
                  />
                </div>
              </Field>
            </div>

            <label className="flex items-center justify-between gap-3 text-sm text-foreground">
              Night shift job
              <Switch checked={draft.nightShift} onCheckedChange={(v) => update("nightShift", v)} />
            </label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────

function ReviewFooter({
  missingCount,
  unconfirmedCount,
  blocked,
  onContinue,
  onRefine,
  refining,
}: {
  missingCount: number
  unconfirmedCount: number
  blocked: boolean
  onContinue: () => void
  onRefine: (instruction: string) => Promise<boolean>
  refining: boolean
}) {
  const [instruction, setInstruction] = React.useState("")
  const [status, setStatus] = React.useState<{ ok: boolean; text: string } | null>(null)
  const speech = useSpeechRecognition()

  React.useEffect(() => {
    if (speech.transcript) setInstruction(speech.transcript)
  }, [speech.transcript])

  const submit = async () => {
    speech.stop()
    const text = instruction.trim()
    if (!text) return
    const ok = await onRefine(text)
    setStatus(
      ok
        ? { ok, text: "Updated — check the preview" }
        : { ok, text: "Couldn't apply that. Try rephrasing, or edit the field directly." },
    )
    if (ok) setInstruction("")
  }

  const ready = missingCount === 0 && unconfirmedCount === 0 && !blocked
  const label = ready
    ? "Continue to select plan"
    : missingCount > 0
      ? `${missingCount} thing${missingCount === 1 ? "" : "s"} left`
      : unconfirmedCount > 0
        ? `Check ${unconfirmedCount} detail${unconfirmedCount === 1 ? "" : "s"}`
        : "Fix the issue to continue"

  return (
    <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-card px-6 py-3">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <PromptInput
            value={instruction}
            onValueChange={(v) => {
              setInstruction(v)
              setStatus(null)
            }}
            onSubmit={submit}
            loading={refining}
            active={speech.listening}
            placeholder="Ask AI to change anything — e.g. “make it ₹18–22k and add Kannada”"
            submitLabel="Apply change"
            actions={
              <MicButton
                supported={speech.supported}
                listening={speech.listening}
                onToggle={speech.listening ? speech.stop : speech.start}
              />
            }
          />
          {status && (
            <p role="status" className={status.ok ? "flex items-center gap-1.5 text-xs text-success" : "text-xs text-destructive"}>
              {status.ok && <CheckCircle2 className="size-3.5" aria-hidden />}
              {status.text}
            </p>
          )}
        </div>
        <Button size="lg" className="shrink-0" disabled={!ready} onClick={onContinue}>
          {label}
        </Button>
      </div>
    </div>
  )
}

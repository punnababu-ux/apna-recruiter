"use client"

/**
 * Field editors for the AI-first posting flow. Each edits one field group of
 * a JobPostDraft and is used in two places: the "AI needs N things" strip
 * (only groups the AI couldn't fill) and the matching review section's edit
 * mode — one editor, two placements, so they can't disagree on options or
 * validation. Conditional details (walk-in, other recruiter, joining fee)
 * appear only once their trigger is chosen, as on the live form.
 */

import * as React from "react"
import {
  Button,
  ChipTabs,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Plus,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  Toggle,
  X,
  type ChipTabItem,
} from "@apna/design-system"
import {
  ACCOUNT_PHONE,
  CATEGORIES,
  CITIES,
  EDUCATION_LABELS,
  ENGLISH_LABELS,
  EXPERIENCE_LABELS,
  EXPERIENCE_YEARS,
  INDUSTRIES,
  JOB_TYPE_LABELS,
  JOINING_FEE_REASON_LABELS,
  JOINING_FEE_WHEN_LABELS,
  LOCATION_TYPE_LABELS,
  PAY_TYPE_LABELS,
  newQuestion,
  suggestedQuestions,
} from "@/lib/apnahire/job-draft"
import type {
  Education,
  EnglishLevel,
  ExperienceType,
  JobPostDraft,
  JobType,
  JoiningFeeReason,
  JoiningFeeWhen,
  LocationType,
  PayType,
  RequiredField,
  Strictness,
} from "@/types/apnahire-job"

export type UpdateDraft = <K extends keyof JobPostDraft>(key: K, value: JobPostDraft[K]) => void

export interface FieldEditorProps {
  draft: JobPostDraft
  update: UpdateDraft
}

const items = <V extends string>(labels: Record<V, string>): ChipTabItem<V | "">[] =>
  (Object.keys(labels) as V[]).map((value) => ({ value, label: labels[value] }))

const toNumber = (v: string) => {
  const n = parseInt(v.replace(/[^\d]/g, ""), 10)
  return Number.isFinite(n) ? n : null
}

function ListSelect({
  id,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string
  value: string
  options: string[]
  placeholder: string
  onChange: (v: string) => void
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange((v as string) ?? "")}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* A value the AI returned that isn't in our list (e.g. an unserved
            city) still shows, so the job check can explain it. */}
        {value && !options.includes(value) && <SelectItem value={value}>{value}</SelectItem>}
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/** Multi-select chip row (perks, languages, assets, degrees). */
export function ChipMultiSelect({
  options,
  value,
  onChange,
  label,
}: {
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Toggle
          key={o}
          size="sm"
          variant="outline"
          pressed={value.includes(o)}
          onPressedChange={() => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o])}
        >
          {o}
        </Toggle>
      ))}
    </div>
  )
}

/** Free-text add row for custom perks / skills. */
export function AddCustom({ placeholder, onAdd }: { placeholder: string; onAdd: (v: string) => void }) {
  const [text, setText] = React.useState("")
  const add = () => {
    const v = text.trim()
    if (!v) return
    onAdd(v)
    setText("")
  }
  return (
    <div className="flex items-center gap-2">
      <Input
        inputSize="sm"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            add()
          }
        }}
      />
      <Button type="button" size="sm" variant="outline" onClick={add} disabled={!text.trim()}>
        <Plus className="size-4" aria-hidden /> Add
      </Button>
    </div>
  )
}

// ── Job ────────────────────────────────────────────────────────────────────

export function TitleField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <FieldLabel htmlFor="job-title">Job title</FieldLabel>
      <Input id="job-title" value={draft.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Telecaller" />
      <FieldDescription>One role per job. Only similar title edits are allowed after posting.</FieldDescription>
    </Field>
  )
}

export function CategoryField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <FieldLabel htmlFor="job-category">Job category</FieldLabel>
      <ListSelect
        id="job-category"
        value={draft.category}
        options={CATEGORIES}
        placeholder="Select category"
        onChange={(v) => update("category", v)}
      />
      <FieldDescription>Decides who sees your job. Can&apos;t be changed after posting.</FieldDescription>
    </Field>
  )
}

export function IndustryField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <FieldLabel htmlFor="job-industry">Your industry</FieldLabel>
      <ListSelect
        id="job-industry"
        value={draft.industry}
        options={INDUSTRIES}
        placeholder="Select industry"
        onChange={(v) => update("industry", v)}
      />
      <FieldDescription>The most common reason jobs reach the wrong candidates.</FieldDescription>
    </Field>
  )
}

export function JobTypeField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <FieldLabel>Job type</FieldLabel>
      <ChipTabs
        variant="choice"
        size="sm"
        aria-label="Job type"
        items={items<JobType>(JOB_TYPE_LABELS)}
        value={draft.jobType}
        onValueChange={(v) => update("jobType", v)}
      />
    </Field>
  )
}

// ── Location ───────────────────────────────────────────────────────────────

export function LocationField({ draft, update }: FieldEditorProps) {
  const areaLabel = draft.locationType === "field" ? "Area candidates will work in" : "Office address / area"
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Where will they work?</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Work location type"
          items={items<LocationType>(LOCATION_TYPE_LABELS)}
          value={draft.locationType}
          onValueChange={(v) => update("locationType", v)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="job-city">City</FieldLabel>
          <ListSelect id="job-city" value={draft.city} options={CITIES} placeholder="Select city" onChange={(v) => update("city", v)} />
        </Field>
        {draft.locationType !== "home" && (
          <Field>
            <FieldLabel htmlFor="job-area">{areaLabel}</FieldLabel>
            <Input id="job-area" value={draft.area} onChange={(e) => update("area", e.target.value)} placeholder="e.g. Koramangala" />
          </Field>
        )}
      </div>
      {draft.locationType === "office" && draft.city && (
        <label className="flex items-center justify-between gap-3 text-sm text-foreground">
          Also accept candidates from anywhere in India willing to relocate to {draft.city}
          <Switch checked={draft.relocation} onCheckedChange={(v) => update("relocation", v)} />
        </label>
      )}
    </div>
  )
}

// ── Pay ────────────────────────────────────────────────────────────────────

export function PayField({ draft, update }: FieldEditorProps) {
  const showFixed = draft.payType !== "incentive"
  const showIncentive = draft.payType === "incentive" || draft.payType === "fixed_incentive"
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Pay type</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Pay type"
          items={items<PayType>(PAY_TYPE_LABELS)}
          value={draft.payType}
          onValueChange={(v) => update("payType", v)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        {showFixed && (
          <Field>
            <FieldLabel htmlFor="salary-min">Fixed salary / month</FieldLabel>
            <div className="flex items-center gap-2">
              <Input
                id="salary-min"
                inputMode="numeric"
                aria-label="Minimum salary"
                placeholder="₹ Min"
                value={draft.salaryMin ?? ""}
                onChange={(e) => update("salaryMin", toNumber(e.target.value))}
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                inputMode="numeric"
                aria-label="Maximum salary"
                placeholder="₹ Max"
                value={draft.salaryMax ?? ""}
                onChange={(e) => update("salaryMax", toNumber(e.target.value))}
              />
            </div>
          </Field>
        )}
        {showIncentive && (
          <Field>
            <FieldLabel htmlFor="incentive">Average incentive / month</FieldLabel>
            <Input
              id="incentive"
              inputMode="numeric"
              placeholder="₹ e.g. 5000"
              value={draft.incentive ?? ""}
              onChange={(e) => update("incentive", toNumber(e.target.value))}
            />
          </Field>
        )}
      </div>
    </div>
  )
}

/** Asked explicitly (not tucked away) and never defaulted by the AI — a
 *  candidate-safety field. */
export function JoiningFeeField({ draft, update }: FieldEditorProps) {
  const f = draft.joiningFeeDetails
  const set = (patch: Partial<typeof f>) => update("joiningFeeDetails", { ...f, ...patch })
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Does the candidate pay any fee or deposit?</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Joining fee"
          items={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
          value={draft.joiningFee ? "yes" : "no"}
          onValueChange={(v) => update("joiningFee", v === "yes")}
        />
      </Field>
      {draft.joiningFee && (
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="fee-amount">Fee amount</FieldLabel>
            <Input
              id="fee-amount"
              inputMode="numeric"
              placeholder="₹"
              value={f.amount ?? ""}
              onChange={(e) => set({ amount: toNumber(e.target.value) })}
            />
          </Field>
          <Field>
            <FieldLabel>What is it for?</FieldLabel>
            <ChipTabs
              variant="choice"
              size="sm"
              aria-label="Fee reason"
              items={items<JoiningFeeReason>(JOINING_FEE_REASON_LABELS)}
              value={f.reason}
              onValueChange={(v) => set({ reason: v })}
            />
          </Field>
          <Field>
            <FieldLabel>When is it paid?</FieldLabel>
            <ChipTabs
              variant="choice"
              size="sm"
              aria-label="When the fee is paid"
              items={items<JoiningFeeWhen>(JOINING_FEE_WHEN_LABELS)}
              value={f.when}
              onValueChange={(v) => set({ when: v })}
            />
          </Field>
        </div>
      )}
    </div>
  )
}

// ── Who can apply ──────────────────────────────────────────────────────────

/** Must-have = only matching candidates can apply; preferred = they're
 *  ranked higher but others can still apply. */
function StrictnessToggle({
  value,
  onChange,
  label,
}: {
  value: Strictness
  onChange: (v: Strictness) => void
  label: string
}) {
  return (
    <ChipTabs
      size="sm"
      aria-label={`${label}: must-have or preferred`}
      items={[
        { value: "must", label: "Must-have" },
        { value: "preferred", label: "Preferred" },
      ]}
      value={value}
      onValueChange={onChange}
    />
  )
}

const strictnessSetter =
  (draft: JobPostDraft, update: UpdateDraft, key: keyof JobPostDraft["strictness"]) => (v: Strictness) =>
    update("strictness", { ...draft.strictness, [key]: v })

export function EducationField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FieldLabel>Minimum education</FieldLabel>
        {draft.education && (
          <StrictnessToggle label="Education" value={draft.strictness.education} onChange={strictnessSetter(draft, update, "education")} />
        )}
      </div>
      <ChipTabs
        variant="choice"
        size="sm"
        aria-label="Minimum education"
        items={items<Education>(EDUCATION_LABELS)}
        value={draft.education}
        onValueChange={(v) => update("education", v)}
      />
    </Field>
  )
}

export function EnglishField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FieldLabel>English level</FieldLabel>
        {draft.english && draft.english !== "none" && (
          <StrictnessToggle label="English" value={draft.strictness.english} onChange={strictnessSetter(draft, update, "english")} />
        )}
      </div>
      <ChipTabs
        variant="choice"
        size="sm"
        aria-label="English level"
        items={items<EnglishLevel>(ENGLISH_LABELS)}
        value={draft.english}
        onValueChange={(v) => update("english", v)}
      />
    </Field>
  )
}

const YEAR_ITEMS: ChipTabItem<string>[] = EXPERIENCE_YEARS.map((y) => ({
  value: String(y),
  label: y < 1 ? "6 months" : `${y} year${y === 1 ? "" : "s"}`,
}))

export function ExperienceField({ draft, update }: FieldEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Experience</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Experience"
          items={items<ExperienceType>(EXPERIENCE_LABELS)}
          value={draft.experienceType}
          onValueChange={(v) => update("experienceType", v)}
        />
      </Field>
      {draft.experienceType === "experienced" && (
        <Field>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FieldLabel>Minimum experience</FieldLabel>
            <StrictnessToggle
              label="Experience"
              value={draft.strictness.experience}
              onChange={strictnessSetter(draft, update, "experience")}
            />
          </div>
          <ChipTabs
            variant="choice"
            size="sm"
            aria-label="Minimum experience"
            items={YEAR_ITEMS}
            value={draft.minExperienceYears == null ? "" : String(draft.minExperienceYears)}
            onValueChange={(v) => update("minExperienceYears", v ? parseFloat(v) : null)}
          />
        </Field>
      )}
    </div>
  )
}

// ── Interview & contact ────────────────────────────────────────────────────

export function WalkInField({ draft, update }: FieldEditorProps) {
  const w = draft.walkInDetails
  const set = (patch: Partial<typeof w>) => update("walkInDetails", { ...w, ...patch })
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>Walk-in interview?</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Walk-in interview"
          items={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
          value={draft.walkIn ? "yes" : "no"}
          onValueChange={(v) => {
            update("walkIn", v === "yes")
            // Pre-fill the venue with the office — usually the same place.
            if (v === "yes" && !w.address) set({ address: [draft.area, draft.city].filter(Boolean).join(", ") })
            // "I'll call them first" isn't possible for a walk-in.
            if (v === "yes" && draft.contact === "none") update("contact", "self")
          }}
        />
      </Field>
      {draft.walkIn && (
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="walkin-address">Walk-in address</FieldLabel>
            <Input id="walkin-address" value={w.address} onChange={(e) => set({ address: e.target.value })} placeholder="Building, street, area" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="walkin-start">Start date</FieldLabel>
              <Input id="walkin-start" type="date" value={w.startDate} onChange={(e) => set({ startDate: e.target.value })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="walkin-end">End date</FieldLabel>
              <Input id="walkin-end" type="date" min={w.startDate || undefined} value={w.endDate} onChange={(e) => set({ endDate: e.target.value })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="walkin-from">From</FieldLabel>
              <Input id="walkin-from" type="time" value={w.startTime} onChange={(e) => set({ startTime: e.target.value })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="walkin-to">To</FieldLabel>
              <Input id="walkin-to" type="time" value={w.endTime} onChange={(e) => set({ endTime: e.target.value })} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="walkin-notes">Instructions (optional)</FieldLabel>
            <Textarea
              id="walkin-notes"
              inputSize="sm"
              maxLength={300}
              value={w.instructions}
              onChange={(e) => set({ instructions: e.target.value })}
              placeholder="e.g. Bring ID proof and your resume"
            />
          </Field>
        </div>
      )}
    </div>
  )
}

export function ContactField({ draft, update }: FieldEditorProps) {
  const r = draft.otherRecruiter
  const set = (patch: Partial<typeof r>) => update("otherRecruiter", { ...r, ...patch })
  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel>After they apply, can candidates call or WhatsApp?</FieldLabel>
        <ChipTabs
          variant="choice"
          size="sm"
          aria-label="Contact preference"
          items={[
            { value: "self", label: "Yes, me" },
            { value: "other", label: "Yes, another recruiter" },
            { value: "none", label: "No, I'll call them first", disabled: draft.walkIn },
          ]}
          value={draft.contact}
          onValueChange={(v) => update("contact", v)}
        />
        {draft.contact === "self" && (
          <FieldDescription>They&apos;ll reach you on {ACCOUNT_PHONE} (from your account).</FieldDescription>
        )}
      </Field>
      {draft.contact === "other" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="rec-name">Recruiter&apos;s name</FieldLabel>
            <Input id="rec-name" value={r.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field>
            <FieldLabel htmlFor="rec-phone">WhatsApp number</FieldLabel>
            <Input id="rec-phone" inputMode="tel" value={r.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91" />
          </Field>
          <Field>
            <FieldLabel htmlFor="rec-email">Email</FieldLabel>
            <Input id="rec-email" type="email" value={r.email} onChange={(e) => set({ email: e.target.value })} />
          </Field>
        </div>
      )}
      {draft.contact !== "none" && (
        <Field>
          <FieldLabel>Who can contact you?</FieldLabel>
          <ChipTabs
            variant="choice"
            size="sm"
            aria-label="Who can contact you"
            items={[
              { value: "all", label: "All candidates" },
              { value: "matched", label: "Only strong matches (~60%)" },
            ]}
            value={draft.whoCanContact}
            onValueChange={(v) => update("whoCanContact", v)}
          />
        </Field>
      )}
    </div>
  )
}

// ── Description & screening ────────────────────────────────────────────────

export function DescriptionField({ draft, update, action }: FieldEditorProps & { action?: React.ReactNode }) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor="job-description">Job description</FieldLabel>
        {action}
      </div>
      <Textarea
        id="job-description"
        inputSize="lg"
        value={draft.description}
        onChange={(e) => update("description", e.target.value)}
        placeholder="What will they do day to day? Lines starting with “- ” show as bullets."
      />
    </Field>
  )
}

/** Yes/no questions candidates answer when applying. A must-have question
 *  screens out anyone who answers "No". */
export function ScreeningQuestionsField({ draft, update }: FieldEditorProps) {
  const qs = draft.screeningQuestions
  const suggestions = suggestedQuestions(draft.category).filter((s) => !qs.some((q) => q.question === s))
  return (
    <div className="flex flex-col gap-4">
      {qs.length > 0 && (
        <ul className="flex flex-col gap-2">
          {qs.map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3">
              <span className="min-w-0 flex-1 text-sm text-foreground">{q.question}</span>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Must answer Yes
                <Switch
                  checked={q.mustHave}
                  onCheckedChange={(v) =>
                    update(
                      "screeningQuestions",
                      qs.map((x) => (x.id === q.id ? { ...x, mustHave: v } : x)),
                    )
                  }
                />
              </label>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label={`Remove question: ${q.question}`}
                onClick={() =>
                  update(
                    "screeningQuestions",
                    qs.filter((x) => x.id !== q.id),
                  )
                }
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">Suggested for this role</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => update("screeningQuestions", [...qs, newQuestion(s)])}
              >
                <Plus className="size-3.5" aria-hidden /> {s}
              </Button>
            ))}
          </div>
        </div>
      )}
      <AddCustom
        placeholder="Write your own yes/no question"
        onAdd={(q) => update("screeningQuestions", [...qs, newQuestion(q)])}
      />
    </div>
  )
}

export const FIELD_EDITORS: Record<Exclude<RequiredField, "description">, React.ComponentType<FieldEditorProps>> = {
  title: TitleField,
  industry: IndustryField,
  jobType: JobTypeField,
  location: LocationField,
  pay: PayField,
  joiningFee: JoiningFeeField,
  education: EducationField,
  english: EnglishField,
  experience: ExperienceField,
  walkIn: WalkInField,
  otherRecruiter: ContactField,
}

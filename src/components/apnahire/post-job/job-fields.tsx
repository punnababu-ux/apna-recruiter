"use client"

/**
 * Field editors for the job posting wizard: the parts of a screen below its
 * main question — the details a choice unlocks (walk-in dates, the other
 * recruiter, the joining fee) and the multi-field requirement editors. The
 * main question on each screen is an OptionCard group in
 * wizard-screens.tsx; these fill in under it, as on the live form.
 */

import * as React from "react"
import {
  Button,
  ChipTabs,
  Field,
  FieldLabel,
  Input,
  Backpack,
  GraduationCap,
  Hammer,
  NumberStepper,
  OptionCard,
  OptionCardGroup,
  Plus,
  School,
  ScrollText,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  Toggle,
  University,
  X,
  type ChipTabItem,
} from "@apna/design-system"
import {
  EDUCATION_LABELS,
  ENGLISH_LABELS,
  EXPERIENCE_LABELS,
  JOINING_FEE_REASON_LABELS,
  JOINING_FEE_WHEN_LABELS,
  newQuestion,
  suggestedQuestions,
} from "@/lib/apnahire/job-draft"
import type {
  Education,
  EnglishLevel,
  ExperienceType,
  JobPostDraft,
  JoiningFeeReason,
  JoiningFeeWhen,
  Strictness,
} from "@/types/apnahire-job"

export type UpdateDraft = <K extends keyof JobPostDraft>(key: K, value: JobPostDraft[K]) => void

export interface FieldEditorProps {
  draft: JobPostDraft
  update: UpdateDraft
}

const items = <V extends string>(labels: Record<V, string>): ChipTabItem<V | "">[] =>
  (Object.keys(labels) as V[]).map((value) => ({
    value,
    label: labels[value],
  }))

export const toNumber = (v: string) => {
  const n = parseInt(v.replace(/[^\d]/g, ""), 10)
  return Number.isFinite(n) ? n : null
}

// ── Shared bits ────────────────────────────────────────────────────────────

export function ListSelect({
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
  emoji,
  size = "sm",
  display,
}: {
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
  label: string
  /** An emoji before each option (perks), to find one at a glance. */
  emoji?: Record<string, string>
  /** "lg" where the chips are the whole screen (perks). */
  size?: "sm" | "lg"
  /** Shown text per option (e.g. a language in its own script). */
  display?: Record<string, string>
}) {
  // Values the AI or the recruiter added that aren't in the list still show.
  const all = Array.from(new Set([...options, ...value]))
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {all.map((o) => (
        <Toggle
          key={o}
          size={size}
          variant="outline"
          pressed={value.includes(o)}
          onPressedChange={() => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o])}
        >
          {emoji?.[o] && <span aria-hidden>{emoji[o]}</span>}
          {display?.[o] ? <span aria-label={o}>{display[o]}</span> : o}
        </Toggle>
      ))}
    </div>
  )
}

/** Free-text add row for custom perks / skills / questions. */
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
        aria-label={placeholder}
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

// ── Pay ────────────────────────────────────────────────────────────────────

/** Asked explicitly and never defaulted by the AI — a candidate-safety field. */
export function JoiningFeeDetailsFields({ draft, update }: FieldEditorProps) {
  const f = draft.joiningFeeDetails
  const set = (patch: Partial<typeof f>) => update("joiningFeeDetails", { ...f, ...patch })
  return (
    <div className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="fee-amount">Amount</FieldLabel>
        <Input
          id="fee-amount"
          inputMode="numeric"
          placeholder="₹"
          value={f.amount ?? ""}
          onChange={(e) => set({ amount: toNumber(e.target.value) })}
        />
      </Field>
      <Field>
        <FieldLabel>For</FieldLabel>
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
        <FieldLabel>Paid when</FieldLabel>
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
  )
}

// ── Who can apply ──────────────────────────────────────────────────────────

/** A single choice as OptionCards, each with a line saying what it means.
 *  The picked card can hold more under its answer — `details` (e.g. the
 *  years of experience) and, with `mustHave`, its "Must-have" switch (on:
 *  only matching candidates can apply; off: it only ranks them). Those
 *  controls sit beside the card's button, not in it (no control inside a
 *  control), so the frame moves to a wrapper around both. */
function ChoiceCards<V extends string>({
  label,
  labels,
  help,
  icons,
  value,
  onChange,
  mustHave,
  details,
}: {
  label: string
  labels: Record<V, string>
  help: Record<V, string>
  icons?: Record<V, React.ReactNode>
  value: V | ""
  onChange: (v: V) => void
  mustHave?: { value: Strictness; onChange: (v: Strictness) => void; applicable: boolean }
  details?: Partial<Record<V, React.ReactNode>>
}) {
  return (
    <OptionCardGroup aria-label={label}>
      {(Object.keys(labels) as V[]).map((v) => {
        const picked = value === v
        const withSwitch = picked && mustHave?.applicable
        const extra = picked ? details?.[v] : null
        const on = withSwitch && mustHave.value === "must"
        const card = (
          <OptionCard
            key={v}
            icon={icons?.[v]}
            title={labels[v]}
            description={help[v]}
            selected={picked}
            onSelect={() => onChange(v)}
            className={withSwitch || extra ? "rounded-none border-0 ring-0" : undefined}
          />
        )
        if (!withSwitch && !extra) return card
        return (
          <div key={v} className="overflow-hidden rounded-xl border border-primary bg-accent ring-1 ring-primary">
            {card}
            <div className="flex flex-col gap-3 px-4 pb-4">
              {extra && <div className="border-t border-primary/20 pt-3">{extra}</div>}
              {withSwitch && (
                <label className="flex items-center gap-3 border-t border-primary/20 pt-3">
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-xs font-semibold text-accent-foreground">Must-have</span>
                    <span className="text-xs text-accent-foreground/80">
                      {on ? "Only matches can apply" : "All can apply; matches first"}
                    </span>
                  </span>
                  <Switch
                    checked={on}
                    onCheckedChange={(c) => mustHave.onChange(c ? "must" : "preferred")}
                    aria-label={`${label} is a must-have`}
                  />
                </label>
              )}
            </div>
          </div>
        )
      })}
    </OptionCardGroup>
  )
}

const EDUCATION_ICONS: Record<Education, React.ReactNode> = {
  "10th": <Backpack />,
  "12th": <School />,
  diploma: <ScrollText />,
  iti: <Hammer />,
  graduate: <GraduationCap />,
  post_graduate: <University />,
}

const EDUCATION_HELP: Record<Education, string> = {
  "10th": "Anyone can apply",
  "12th": "12th pass or higher",
  diploma: "Diploma or higher",
  iti: "ITI certificate or higher",
  graduate: "Bachelor’s degree or higher",
  post_graduate: "Master’s degree",
}
const ENGLISH_HELP: Record<EnglishLevel, string> = {
  none: "Candidates don’t need to speak English",
  basic: "Can understand and reply in simple sentences",
  good: "Speaks fluently with customers and colleagues",
}
const EXPERIENCE_HELP: Record<ExperienceType, string> = {
  any: "Freshers and experienced candidates can apply",
  experienced: "Set the years of experience you need",
  fresher: "Only candidates with no work experience",
}

const strictnessSetter =
  (draft: JobPostDraft, update: UpdateDraft, key: keyof JobPostDraft["strictness"]) => (v: Strictness) =>
    update("strictness", { ...draft.strictness, [key]: v })

export function EducationField({ draft, update }: FieldEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChoiceCards
        label="Minimum education"
        labels={EDUCATION_LABELS}
        help={EDUCATION_HELP}
        icons={EDUCATION_ICONS}
        value={draft.education}
        onChange={(v) => update("education", v)}
        mustHave={{
          value: draft.strictness.education,
          onChange: strictnessSetter(draft, update, "education"),
          applicable: !!draft.education,
        }}
      />
    </div>
  )
}

export function EnglishField({ draft, update }: FieldEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChoiceCards
        label="English level"
        labels={ENGLISH_LABELS}
        help={ENGLISH_HELP}
        value={draft.english}
        onChange={(v) => update("english", v)}
        mustHave={{
          value: draft.strictness.english,
          onChange: strictnessSetter(draft, update, "english"),
          applicable: !!draft.english && draft.english !== "none",
        }}
      />
    </div>
  )
}

export function ExperienceField({ draft, update }: FieldEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <ChoiceCards
        label="Experience"
        labels={EXPERIENCE_LABELS}
        help={EXPERIENCE_HELP}
        value={draft.experienceType}
        onChange={(v) => {
          update("experienceType", v)
          if (v === "experienced" && draft.minExperienceYears == null) update("minExperienceYears", 1)
        }}
        mustHave={{
          value: draft.strictness.experience,
          onChange: strictnessSetter(draft, update, "experience"),
          applicable: draft.experienceType === "experienced",
        }}
        details={{
          experienced: (
            <NumberStepper
              label="At least"
              name="minimum experience"
              value={Math.max(1, Math.round(draft.minExperienceYears ?? 1))}
              onValueChange={(n) => update("minExperienceYears", n)}
              min={1}
              max={30}
              format={(n) => `${n} yr${n === 1 ? "" : "s"}`}
            />
          ),
        }}
      />
    </div>
  )
}

// ── Interview & contact ────────────────────────────────────────────────────

export function WalkInDetailsFields({ draft, update }: FieldEditorProps) {
  const w = draft.walkInDetails
  const set = (patch: Partial<typeof w>) => update("walkInDetails", { ...w, ...patch })
  return (
    <div className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="walkin-address">Address</FieldLabel>
        <Input
          id="walkin-address"
          value={w.address}
          onChange={(e) => set({ address: e.target.value })}
          placeholder="Building, street, area"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="walkin-start">From date</FieldLabel>
          <Input
            id="walkin-start"
            type="date"
            value={w.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="walkin-end">To date</FieldLabel>
          <Input
            id="walkin-end"
            type="date"
            min={w.startDate || undefined}
            value={w.endDate}
            onChange={(e) => set({ endDate: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="walkin-from">From</FieldLabel>
          <Input
            id="walkin-from"
            type="time"
            value={w.startTime}
            onChange={(e) => set({ startTime: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="walkin-to">To</FieldLabel>
          <Input id="walkin-to" type="time" value={w.endTime} onChange={(e) => set({ endTime: e.target.value })} />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="walkin-notes">Notes (optional)</FieldLabel>
        <Textarea
          id="walkin-notes"
          inputSize="sm"
          maxLength={300}
          value={w.instructions}
          onChange={(e) => set({ instructions: e.target.value })}
          placeholder="e.g. Bring ID and resume"
        />
      </Field>
    </div>
  )
}

export function OtherRecruiterFields({ draft, update }: FieldEditorProps) {
  const r = draft.otherRecruiter
  const set = (patch: Partial<typeof r>) => update("otherRecruiter", { ...r, ...patch })
  return (
    <div className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="rec-name">Name</FieldLabel>
        <Input id="rec-name" value={r.name} onChange={(e) => set({ name: e.target.value })} />
      </Field>
      <Field>
        <FieldLabel htmlFor="rec-phone">WhatsApp number</FieldLabel>
        <Input
          id="rec-phone"
          inputMode="tel"
          value={r.phone}
          onChange={(e) => set({ phone: e.target.value })}
          placeholder="+91"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="rec-email">Email</FieldLabel>
        <Input id="rec-email" type="email" value={r.email} onChange={(e) => set({ email: e.target.value })} />
      </Field>
    </div>
  )
}

export function WhoCanContactField({ draft, update }: FieldEditorProps) {
  return (
    <Field>
      <FieldLabel>Who can call</FieldLabel>
      <ChipTabs
        variant="choice"
        size="sm"
        aria-label="Who can contact you"
        items={[
          { value: "all", label: "Everyone" },
          { value: "matched", label: "Strong matches only" },
        ]}
        value={draft.whoCanContact}
        onValueChange={(v) => update("whoCanContact", v)}
      />
    </Field>
  )
}

// ── Screening ──────────────────────────────────────────────────────────────

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
                Required
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
          <p className="text-xs font-medium text-muted-foreground">Suggested</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant="outline"
                className="h-auto max-w-full rounded-full py-1.5 text-left whitespace-normal"
                onClick={() => update("screeningQuestions", [...qs, newQuestion(s)])}
              >
                <Plus className="size-3.5" aria-hidden /> {s}
              </Button>
            ))}
          </div>
        </div>
      )}
      <AddCustom
        placeholder="Add your own question"
        onAdd={(q) => update("screeningQuestions", [...qs, newQuestion(q)])}
      />
    </div>
  )
}

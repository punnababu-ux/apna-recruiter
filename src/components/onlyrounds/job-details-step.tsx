"use client"

/**
 * JobDetailsStep — step 2 of the Create Job wizard.
 *
 * Sections:
 *   1. Basic job details    (client, city, area, experience type + persona)
 *   2. Work schedule        (work type, work mode, shift notes)
 *   3. Compensation         (fresher and/or experienced pay)
 *   4. Question sections    (merged AI question bank + candidate FAQs —
 *                            each section has target audience, per-candidate
 *                            count, randomize toggle, and a Q&A list)
 *   5. Additional details   (free-form)
 *
 * The step is fully controlled — the wizard owns the form state and this
 * component is purely presentational + a few tiny reducers for the
 * question/FAQ list editors.
 */

import {
  Building2,
  CalendarDays,
  Clock,
  Compass,
  GraduationCap,
  IndianRupee,
  Laptop,
  MapPin,
  StickyNote,
  UserCheck,
  UserPlus,
} from "@apna/design-system"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import { Field as UIField, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CLIENTS, WORK_MODE_LABELS, WORK_TYPE_LABELS } from "@/lib/onlyrounds/constants"
import type {
  ExperienceRequirement,
  JobDetailsForm,
  SectionId,
  SectionStatus,
  WorkMode,
  WorkType,
} from "@/types/onlyrounds"
import { getSectionStatus } from "@/components/onlyrounds/job-details-step/validation"
import { Section } from "@/components/onlyrounds/job-details-step/section"
import { QuestionSectionsEditor } from "@/components/onlyrounds/job-details-step/question-sections-editor"

export {
  getSectionStatus,
  validateJobDetails,
  validateSection,
} from "@/components/onlyrounds/job-details-step/validation"

export type { JobDetailsForm, SectionId, SectionStatus }

// Single-select chip options for the segmented controls. Work type/mode
// include "" in the value union so an unselected (required) state renders
// with no chip highlighted.
const EXPERIENCE_CHIPS: ChipTabItem<ExperienceRequirement>[] = [
  { value: "any", label: "Any" },
  { value: "experienced", label: "Experienced only" },
  { value: "freshers", label: "Freshers only" },
]
const WORK_TYPE_CHIPS: ChipTabItem<WorkType | "">[] = [
  { value: "part-time", label: WORK_TYPE_LABELS["part-time"] },
  { value: "full-time", label: WORK_TYPE_LABELS["full-time"] },
  { value: "both", label: WORK_TYPE_LABELS["both"] },
]
const WORK_MODE_CHIPS: ChipTabItem<WorkMode | "">[] = [
  { value: "wfh", label: WORK_MODE_LABELS["wfh"] },
  { value: "wfo", label: WORK_MODE_LABELS["wfo"] },
  { value: "field", label: WORK_MODE_LABELS["field"] },
  { value: "store", label: WORK_MODE_LABELS["store"] },
]

// ---- component ----------------------------------------------------------

export function JobDetailsStep({
  form,
  update,
  showErrors = false,
  openSectionId,
  onSectionChange,
  jobTitle = "",
  jobJd = "",
}: {
  form: JobDetailsForm
  update: <K extends keyof JobDetailsForm>(
    key: K,
    value: JobDetailsForm[K],
  ) => void
  showErrors?: boolean
  /** Which section's body is open — single-open accordion. Lifted to the
   *  wizard so its footer can drive section navigation. */
  openSectionId: SectionId | null
  onSectionChange: (id: SectionId | null) => void
  jobTitle?: string
  jobJd?: string
}) {
  const showExperiencedPersona =
    form.experienceType === "any" || form.experienceType === "experienced"
  const showFresherPersona =
    form.experienceType === "any" || form.experienceType === "freshers"

  // Toggle handler shared by every section header — opens this one and
  // closes whichever was open. Clicking the open section again collapses
  // it fully.
  const toggle = (id: SectionId) =>
    onSectionChange(openSectionId === id ? null : id)

  return (
    <div className="flex flex-col gap-4">
      {/* Section 1 — basic job details */}
      <Section
        id="basics"
        title="Basic job details"
        description="Tell us who the role is for and where it's based."
        status={getSectionStatus(form, "basics", showErrors)}
        isOpen={openSectionId === "basics"}
        onToggle={() => toggle("basics")}
      >
        {/* Client — own line */}
        <UIField>
          <FieldLabel htmlFor="client" icon={Building2}>Client</FieldLabel>
          <Select
            value={form.clientId}
            onValueChange={(v) => update("clientId", (v as string) ?? "")}
          >
            <SelectTrigger
              id="client"
              className="w-full"
              aria-invalid={showErrors && !form.clientId ? true : undefined}
            >
              <SelectValue placeholder="Select the client" />
            </SelectTrigger>
            <SelectContent>
              {CLIENTS.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{showErrors && !form.clientId ? "Required" : undefined}</FieldError>
        </UIField>

        {/* Job city + Job area — side by side */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UIField>
            <FieldLabel htmlFor="city" icon={MapPin}>Job city</FieldLabel>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Bengaluru"
              aria-invalid={
                showErrors && !form.city.trim() ? true : undefined
              }
            />
            <FieldError>{showErrors && !form.city.trim() ? "Required" : undefined}</FieldError>
          </UIField>
          <UIField>
            <FieldLabel htmlFor="area" icon={Compass}>Job area</FieldLabel>
            <Input
              id="area"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Koramangala"
              aria-invalid={
                showErrors && !form.area.trim() ? true : undefined
              }
            />
            <FieldError>{showErrors && !form.area.trim() ? "Required" : undefined}</FieldError>
          </UIField>
        </div>

        {/* Required experience — full-width chip group below the grid so
            the chips have room to sit on one line. */}
        <UIField>
          <FieldLabel icon={GraduationCap}>Required experience</FieldLabel>
          <ChipTabs
            variant="choice"
            items={EXPERIENCE_CHIPS}
            value={form.experienceType}
            onValueChange={(v) => update("experienceType", v)}
            aria-label="Required experience"
          />
        </UIField>

        {showExperiencedPersona ? (
          <UIField>
            <FieldLabel htmlFor="experienced-persona" icon={UserCheck}>Who is an experienced candidate for this role?</FieldLabel>
            <Textarea
              id="experienced-persona"
              value={form.experiencedPersona}
              onChange={(e) => update("experiencedPersona", e.target.value)}
              placeholder="e.g. 2+ years in B2C product support, comfortable on calls, CRM-literate."
              rows={3}
              aria-invalid={
                showErrors && !form.experiencedPersona.trim()
                  ? true
                  : undefined
              }
            />
            {showErrors && !form.experiencedPersona.trim() ? (
              <FieldError>Required</FieldError>
            ) : (
              <FieldDescription>Describe the kind of experienced candidate you&apos;re hoping to meet.</FieldDescription>
            )}
          </UIField>
        ) : null}
        {showFresherPersona ? (
          <UIField>
            <FieldLabel htmlFor="fresher-persona" icon={UserPlus}>Who is a fresher candidate for this role?</FieldLabel>
            <Textarea
              id="fresher-persona"
              value={form.fresherPersona}
              onChange={(e) => update("fresherPersona", e.target.value)}
              placeholder="e.g. Graduates with strong spoken English, quick learners, open to shift work."
              rows={3}
              aria-invalid={
                showErrors && !form.fresherPersona.trim() ? true : undefined
              }
            />
            {showErrors && !form.fresherPersona.trim() ? (
              <FieldError>Required</FieldError>
            ) : (
              <FieldDescription>Describe the fresher profile that fits this role.</FieldDescription>
            )}
          </UIField>
        ) : null}
      </Section>

      {/* Section 2 — work schedule */}
      <Section
        id="schedule"
        title="Work schedule"
        description="What kind of work is this, and when will it happen?"
        status={getSectionStatus(form, "schedule", showErrors)}
        isOpen={openSectionId === "schedule"}
        onToggle={() => toggle("schedule")}
      >
        <UIField>
          <FieldLabel icon={CalendarDays}>Work type</FieldLabel>
          <ChipTabs
            variant="choice"
            items={WORK_TYPE_CHIPS}
            value={form.workType}
            onValueChange={(v) => update("workType", v)}
            aria-label="Work type"
            aria-invalid={showErrors && !form.workType ? true : undefined}
          />
          <FieldError>{showErrors && !form.workType ? "Required" : undefined}</FieldError>
        </UIField>
        <UIField>
          <FieldLabel icon={Laptop}>Work mode</FieldLabel>
          <ChipTabs
            variant="choice"
            items={WORK_MODE_CHIPS}
            value={form.workMode}
            onValueChange={(v) => update("workMode", v)}
            aria-label="Work mode"
            aria-invalid={showErrors && !form.workMode ? true : undefined}
          />
          <FieldError>{showErrors && !form.workMode ? "Required" : undefined}</FieldError>
        </UIField>
        <UIField>
          <FieldLabel htmlFor="schedule-details" icon={Clock}>Work schedule and shift details</FieldLabel>
          <Textarea
            id="schedule-details"
            value={form.scheduleDetails}
            onChange={(e) => update("scheduleDetails", e.target.value)}
            placeholder="Describe the expected schedule and shifts."
            rows={3}
            aria-invalid={
              showErrors && !form.scheduleDetails.trim() ? true : undefined
            }
          />
          {showErrors && !form.scheduleDetails.trim() ? (
            <FieldError>Required</FieldError>
          ) : (
            <FieldDescription>E.g. Mon–Sat, 9am–6pm; two rotational shifts; one weekly off.</FieldDescription>
          )}
        </UIField>
      </Section>

      {/* Section 3 — compensation */}
      <Section
        id="compensation"
        title="Compensation details"
        description="Share what each candidate profile can expect to earn."
        status={getSectionStatus(form, "compensation", showErrors)}
        isOpen={openSectionId === "compensation"}
        onToggle={() => toggle("compensation")}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {showExperiencedPersona ? (
            <UIField>
              <FieldLabel htmlFor="comp-experienced" icon={IndianRupee}>Compensation — experienced candidates</FieldLabel>
              <Input
                id="comp-experienced"
                value={form.compExperienced}
                onChange={(e) => update("compExperienced", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compExperienced.trim() ? true : undefined
                }
              />
              {showErrors && !form.compExperienced.trim() ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>E.g. ₹4–6 LPA fixed + incentives.</FieldDescription>
              )}
            </UIField>
          ) : null}
          {showFresherPersona ? (
            <UIField>
              <FieldLabel htmlFor="comp-fresher" icon={IndianRupee}>Compensation — fresher candidates</FieldLabel>
              <Input
                id="comp-fresher"
                value={form.compFresher}
                onChange={(e) => update("compFresher", e.target.value)}
                placeholder="₹ Fixed + variable"
                aria-invalid={
                  showErrors && !form.compFresher.trim() ? true : undefined
                }
              />
              {showErrors && !form.compFresher.trim() ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>E.g. ₹2–3 LPA fixed + incentives.</FieldDescription>
              )}
            </UIField>
          ) : null}
        </div>
      </Section>

      {/* Section 4 — question sections (merged AI question bank + candidate FAQs) */}
      <Section
        id="questions"
        title="Question sections"
        description="Optional — add screening questions and candidate FAQs."
        status={getSectionStatus(form, "questions", showErrors)}
        isOpen={openSectionId === "questions"}
        onToggle={() => toggle("questions")}
      >
        <QuestionSectionsEditor
          sections={form.questionSections}
          onChange={(next) => update("questionSections", next)}
          experienceType={form.experienceType}
          suggestedPresets={form.suggestedPresets}
          jobTitle={jobTitle}
          jobJd={jobJd}
        />
      </Section>

      {/* Section 5 — additional details */}
      <Section
        id="additional"
        title="Additional details"
        description="Optional — interview process, perks, anything else worth highlighting."
        status={getSectionStatus(form, "additional", showErrors)}
        isOpen={openSectionId === "additional"}
        onToggle={() => toggle("additional")}
      >
        <UIField>
          <FieldLabel htmlFor="additional-details" icon={StickyNote}>Notes</FieldLabel>
          <Textarea
            id="additional-details"
            value={form.additionalDetails}
            onChange={(e) => update("additionalDetails", e.target.value)}
            placeholder="Share anything else candidates should know."
            rows={5}
          />
        </UIField>
      </Section>
    </div>
  )
}


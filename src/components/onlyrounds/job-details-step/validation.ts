import { REQUIRED_SECTION_IDS } from "@/lib/onlyrounds/constants"
import type { JobDetailsForm, SectionId, SectionStatus } from "@/types/onlyrounds"

// ── Section model ──────────────────────────────────────────────────────────

/**
 * Returns human-readable labels for every empty required field in the given
 * section. Optional sections (questions, additional) always return `[]`.
 */
export function validateSection(
  form: JobDetailsForm,
  id: SectionId,
): string[] {
  const errors: string[] = []
  switch (id) {
    case "basics":
      if (!form.clientId) errors.push("Client")
      if (!form.city.trim()) errors.push("Job city")
      if (!form.area.trim()) errors.push("Job area")
      if (
        (form.experienceType === "any" ||
          form.experienceType === "experienced") &&
        !form.experiencedPersona.trim()
      )
        errors.push("Experienced candidate profile")
      if (
        (form.experienceType === "any" || form.experienceType === "freshers") &&
        !form.fresherPersona.trim()
      )
        errors.push("Fresher candidate profile")
      return errors
    case "schedule":
      if (!form.workType) errors.push("Work type")
      if (!form.workMode) errors.push("Work mode")
      if (!form.scheduleDetails.trim()) errors.push("Work schedule details")
      return errors
    case "compensation":
      if (
        (form.experienceType === "any" ||
          form.experienceType === "experienced") &&
        !form.compExperienced.trim()
      )
        errors.push("Compensation for experienced")
      if (
        (form.experienceType === "any" || form.experienceType === "freshers") &&
        !form.compFresher.trim()
      )
        errors.push("Compensation for freshers")
      return errors
    case "questions":
    case "additional":
      return []
  }
}

/** True if the user has filled at least one field in this section. */
function sectionHasContent(form: JobDetailsForm, id: SectionId): boolean {
  switch (id) {
    case "basics":
      return Boolean(
        form.clientId ||
          form.city.trim() ||
          form.area.trim() ||
          form.experiencedPersona.trim() ||
          form.fresherPersona.trim(),
      )
    case "schedule":
      return Boolean(
        form.workType || form.workMode || form.scheduleDetails.trim(),
      )
    case "compensation":
      return Boolean(form.compExperienced.trim() || form.compFresher.trim())
    case "questions":
      return form.questionSections.length > 0
    case "additional":
      return form.additionalDetails.trim().length > 0
  }
}

/**
 * Derives the accordion-status pip for a section purely from form state and
 * the current `showErrors` flag — no stored state.
 */
export function getSectionStatus(
  form: JobDetailsForm,
  id: SectionId,
  showErrors: boolean,
): SectionStatus {
  if (
    id === "questions" ||
    id === "additional"
  ) {
    return sectionHasContent(form, id) ? "complete" : "untouched"
  }
  const errors = validateSection(form, id)
  if (errors.length === 0) return "complete"
  if (showErrors) return "invalid"
  return sectionHasContent(form, id) ? "in-progress" : "untouched"
}

/**
 * Returns human-readable labels for every mandatory field that is empty
 * across all required sections — backwards-compatible aggregator used by
 * the wizard's overall validity check.
 */
export function validateJobDetails(form: JobDetailsForm): string[] {
  return REQUIRED_SECTION_IDS.flatMap((id) => validateSection(form, id))
}

"use client"

import { Download, Plus, Sparkles } from "@apna/design-system"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ExperienceRequirement, QuestionSection, QuestionSectionPreset } from "@/types/onlyrounds"
import { useIdGen } from "@/components/onlyrounds/job-details-step/question-shared"
import { QuestionSectionItem } from "@/components/onlyrounds/job-details-step/question-section-item"

// ---- question sections editor ------------------------------------------

// Each preset hints its preferred target. When the job is single-audience
// the hint is ignored and the audience is forced to match the job-level
// setting.
const QUESTION_SECTION_PRESETS: QuestionSectionPreset[] = [
  { title: "English Speaking", target: "freshers" },
  { title: "Field Sales Capability", target: "experienced" },
  { title: "Technical Skills", target: "experienced" },
  { title: "Freshers", target: "freshers" },
  { title: "Experienced", target: "experienced" },
]

export function QuestionSectionsEditor({
  sections,
  onChange,
  experienceType,
  suggestedPresets,
  jobTitle = "",
  jobJd = "",
}: {
  sections: QuestionSection[]
  onChange: (next: QuestionSection[]) => void
  experienceType: ExperienceRequirement
  suggestedPresets?: QuestionSectionPreset[]
  jobTitle?: string
  jobJd?: string
}) {
  const [showAddSection, setShowAddSection] = React.useState(false)
  const [addingSectionName, setAddingSectionName] = React.useState("")
  const nextSectionId = useIdGen("qs")
  // Accordion: at most one section open at a time. Lifted here so we can
  // open a freshly-added section and close the others in one go.
  const [expandedSectionId, setExpandedSectionId] = React.useState<
    string | null
  >(sections[0]?.id ?? null)

  // Default audience for a new section: forced to match the job-level
  // setting when it's single-audience, else use the preset's hint, else
  // default to "both" (sections like English Speaking are typically
  // relevant to both audiences when the job supports both).
  const resolveTarget = (
    presetTarget?: QuestionSection["target"],
  ): QuestionSection["target"] => {
    if (experienceType === "experienced") return "experienced"
    if (experienceType === "freshers") return "freshers"
    return presetTarget ?? "experienced"
  }

  const addSection = (
    title: string,
    presetTarget?: QuestionSection["target"],
  ) => {
    const trimmed = title.trim()
    if (!trimmed) return

    const newSection: QuestionSection = {
      id: nextSectionId(),
      title: trimmed,
      target: resolveTarget(presetTarget),
      questionsPerCandidate: 2,
      randomize: false,
      items: [],
    }
    // New sections append to the BOTTOM of the list — right where the
    // "Add section" CTA / add form sits — and auto-expand. All other
    // sections collapse via the single-open accordion model.
    onChange([...sections, newSection])
    setExpandedSectionId(newSection.id)
    setAddingSectionName("")
    setShowAddSection(false)
  }

  const updateSection = (id: string, patch: Partial<QuestionSection>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const removeSection = (id: string) => {
    const remaining = sections.filter((s) => s.id !== id)
    onChange(remaining)
    // If the user removed the currently-open section, expand the next
    // remaining one (if any) so the list never goes fully collapsed
    // after a delete.
    if (expandedSectionId === id) {
      setExpandedSectionId(remaining[0]?.id ?? null)
    }
  }

  const toggleSection = (id: string) => {
    setExpandedSectionId((curr) => (curr === id ? null : id))
  }

  const downloadSampleCsv = () => {
    const rows = [
      ["Question text", "Expected response / ideal answer outline"],
      [
        "How many years of experience do you have with React?",
        "Must mention 2+ years of production experience and key projects.",
      ],
      [
        "Do you have your own two-wheeler?",
        "Yes, I have a bike.",
      ],
    ]
    const blob = new Blob([rows.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample-questions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const presetsToUse = suggestedPresets && suggestedPresets.length > 0
    ? suggestedPresets
    : QUESTION_SECTION_PRESETS

  const unusedPresets = presetsToUse.filter(
    (p) => !sections.some((s) => s.title.toLowerCase() === p.title.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Section list */}
      {sections.length > 0 ? (
        <div className="flex flex-col gap-2">
          {sections.map((section) => (
            <QuestionSectionItem
              key={section.id}
              section={section}
              onUpdate={(patch) => updateSection(section.id, patch)}
              onRemove={() => removeSection(section.id)}
              experienceType={experienceType}
              isOpen={expandedSectionId === section.id}
              onToggle={() => toggleSection(section.id)}
              jobTitle={jobTitle}
              jobJd={jobJd}
              suggestedPresets={presetsToUse}
            />
          ))}
        </div>
      ) : null}

      {/* Empty state — only when there are no sections and the add form
          is not open. Carries its own CTA. */}
      {sections.length === 0 && !showAddSection ? (
        <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No question sections yet.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddSection(true)}
          >
            <Plus className="size-3.5" />
            Add section
          </Button>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={downloadSampleCsv}
            className="h-auto p-0 text-xs gap-1 mt-1"
          >
            <Download className="size-3" />
            Sample CSV
          </Button>
        </div>
      ) : null}

      {/* Add-section form — sits at the BOTTOM, where the CTA is, so the
          new section lands right where the user was looking. */}
      {showAddSection ? (
        <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/30 p-3">
          <span className="text-xs font-medium text-muted-foreground">
            Section name
          </span>
          <div className="flex gap-2">
            <Input
              autoFocus
              value={addingSectionName}
              onChange={(e) => setAddingSectionName(e.target.value)}
              placeholder="e.g. English Speaking"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSection(addingSectionName)
                }
                if (e.key === "Escape") {
                  setShowAddSection(false)
                  setAddingSectionName("")
                }
              }}
              className="flex-1 bg-background"
            />
            <Button
              type="button"
              size="lg"
              onClick={() => addSection(addingSectionName)}
              disabled={!addingSectionName.trim()}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setShowAddSection(false)
                setAddingSectionName("")
              }}
            >
              Cancel
            </Button>
          </div>
          {unusedPresets.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3 text-primary" />
                Suggestions:
              </span>
              {unusedPresets.map((preset) => (
                <Button
                  key={preset.title}
                  type="button"
                  variant="outline"
                  size="xs"
                  className="rounded-full font-medium"
                  onClick={() => addSection(preset.title, preset.target)}
                >
                  + {preset.title}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bottom-right Add section CTA — only when at least one section
          exists and the add form is not already open. */}
      {sections.length > 0 && !showAddSection ? (
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={downloadSampleCsv}
            className="h-auto p-0 text-xs gap-1"
          >
            <Download className="size-3" />
            Sample CSV
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddSection(true)}
          >
            <Plus className="size-3.5" />
            Add section
          </Button>
        </div>
      ) : null}
    </div>
  )
}

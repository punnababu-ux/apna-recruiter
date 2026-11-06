"use client"

import {
  Check,
  ChevronDown,
  GraduationCap,
  MessageCircleQuestion,
  MoreVertical,
  Pencil,
  Trash2,
} from "@apna/design-system"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Field as UIField, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { ExperienceRequirement, QuestionSection, QuestionSectionPreset } from "@/types/onlyrounds"
import { MAX_QA } from "@/components/onlyrounds/job-details-step/question-shared"
import { QuestionSectionBody } from "@/components/onlyrounds/job-details-step/question-section-body"

export function QuestionSectionItem({
  section,
  onUpdate,
  onRemove,
  experienceType,
  isOpen,
  onToggle,
  jobTitle = "",
  jobJd = "",
  suggestedPresets,
}: {
  section: QuestionSection
  onUpdate: (patch: Partial<QuestionSection>) => void
  onRemove: () => void
  experienceType: ExperienceRequirement
  /** Single source of truth for the accordion: only one section can be
   *  open at a time. Lifted to QuestionSectionsEditor. */
  isOpen: boolean
  onToggle: () => void
  jobTitle?: string
  jobJd?: string
  suggestedPresets?: QuestionSectionPreset[]
}) {
  const [editingTitle, setEditingTitle] = React.useState(false)
  const [titleDraft, setTitleDraft] = React.useState(section.title)
  // When the user starts editing the title from a collapsed section we
  // want the body to expand so they can see the rest while editing.
  const openIfNeeded = () => {
    if (!isOpen) onToggle()
  }

  const commitTitle = () => {
    const trimmed = titleDraft.trim()
    if (trimmed) onUpdate({ title: trimmed })
    else setTitleDraft(section.title)
    setEditingTitle(false)
  }

  const TARGET_LABELS: Record<QuestionSection["target"], string> = {
    freshers: "Freshers only",
    experienced: "Experienced only",
  }

  // Show the "For" dropdown only when the job supports both audiences.
  // Otherwise the section's audience is forced to match the job-level
  // setting (and the data is kept in sync below).
  const showTargetSelect = experienceType === "any"
  const forcedTarget: QuestionSection["target"] | null =
    experienceType === "experienced"
      ? "experienced"
      : experienceType === "freshers"
        ? "freshers"
        : null
  // Keep stored section.target in sync with the job-level setting when
  // the latter is single-audience.
  React.useEffect(() => {
    if (forcedTarget && section.target !== forcedTarget) {
      onUpdate({ target: forcedTarget })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedTarget])

  return (
    <div className="rounded-md border border-border bg-muted/20">
      {/* ── header row ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="shrink-0 text-muted-foreground"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse section" : "Expand section"}
        >
          <ChevronDown className={cn("size-4 transition-select", !isOpen && "-rotate-90")} />
        </Button>

        {editingTitle ? (
          <Input
            autoFocus
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                commitTitle()
              }
              if (e.key === "Escape") {
                setTitleDraft(section.title)
                setEditingTitle(false)
              }
            }}
            onBlur={commitTitle}
            className="h-7 flex-1 text-sm font-medium"
          />
        ) : (
          <button
            type="button"
            // Title text is only a collapse/expand affordance. Editing
            // is exclusively triggered by the pencil icon next to it.
            onClick={onToggle}
            className="flex-1 cursor-pointer text-left text-sm font-medium"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {section.title}
          </button>
        )}

        {/* Compact metadata badges visible only when the section is
            collapsed — audience + question count. */}
        {!isOpen && !editingTitle ? (
          <>
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {TARGET_LABELS[section.target]}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {section.items.length === 0
                ? "No questions"
                : `${section.items.length} ${
                    section.items.length === 1 ? "question" : "questions"
                  }`}
            </span>
          </>
        ) : null}

        {editingTitle ? (
          // While renaming, the same slot becomes a Save (Check) button.
          // onMouseDown + preventDefault stops the input from losing focus
          // before our onClick runs — otherwise onBlur would commit and
          // flip editingTitle to false before this handler sees the
          // right state.
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Save section title"
            onMouseDown={(e) => e.preventDefault()}
            onClick={commitTitle}
          >
            <Check className="size-3.5" />
          </Button>
        ) : (
          // Idle: Randomize questions switch + three-dot menu.
          <div className="flex items-center gap-3 shrink-0">
            <label
              htmlFor={`rand-${section.id}`}
              className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground select-none"
            >
              <Switch
                id={`rand-${section.id}`}
                checked={section.randomize}
                onCheckedChange={(checked) => onUpdate({ randomize: checked })}
              />
              Randomize questions
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Section actions"
                  >
                    <MoreVertical className="size-3.5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setEditingTitle(true)
                    openIfNeeded()
                  }}
                >
                  <Pencil className="size-3" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={onRemove}>
                  <Trash2 className="size-3" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* ── expanded body ──────────────────────────────────────── */}
      {isOpen ? (
        <div className="border-t border-border">
          {/* settings row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-3 py-3">
            <UIField>
              <FieldLabel htmlFor={`target-${section.id}`} icon={GraduationCap}>
                Target audience
              </FieldLabel>
              {showTargetSelect ? (
                <Select
                  value={section.target}
                  onValueChange={(v) =>
                    onUpdate({ target: v as QuestionSection["target"] })
                  }
                >
                  <SelectTrigger
                    id={`target-${section.id}`}
                    className="w-full bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshers">Freshers only</SelectItem>
                    <SelectItem value="experienced">
                      Experienced only
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`target-${section.id}`}
                  readOnly
                  value={TARGET_LABELS[section.target]}
                  className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                />
              )}
            </UIField>

            <UIField>
              <FieldLabel htmlFor={`qpc-${section.id}`} icon={MessageCircleQuestion}>
                Questions per candidate
              </FieldLabel>
              <Input
                id={`qpc-${section.id}`}
                type="number"
                min={1}
                max={MAX_QA}
                value={section.questionsPerCandidate}
                onChange={(e) =>
                  onUpdate({
                    questionsPerCandidate: Math.min(
                      MAX_QA,
                      Math.max(1, Number(e.target.value) || 1),
                    ),
                  })
                }
                className="w-full bg-background"
              />
            </UIField>
          </div>

          {/* Q&A list */}
          <div className="px-3 pb-3 pt-0">
            <QuestionSectionBody
              sectionId={section.id}
              sectionTitle={section.title}
              sectionTarget={section.target}
              items={section.items}
              onChange={(items) => onUpdate({ items })}
              jobTitle={jobTitle}
              jobJd={jobJd}
              suggestedPresets={suggestedPresets}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

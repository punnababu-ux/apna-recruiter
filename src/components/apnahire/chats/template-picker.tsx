"use client"

/**
 * TemplatePicker — the composer's "Templates" button (PRD FR-3). A Zap icon
 * button opens a Popover with a search field and the canned responses in
 * groups (Greeting, Interview, Follow-up, Closing, Mine). It is an inline
 * Autocomplete: the search field keeps focus, ↑/↓ move the highlight, Enter
 * picks it, Esc closes (focus goes back to the message box). The first match
 * is highlighted as you type, so "/" then Enter picks it fast.
 *
 * Picking fills the draft with the placeholders resolved for this thread and
 * closes the picker. It never sends. Each row shows the resolved text, so the
 * recruiter reads what will land. The footer saves the current draft under
 * "Mine" (disabled while the draft is empty).
 *
 * The parent owns `open`, so the thread can also open it when the recruiter
 * types "/" into an empty box.
 */

import * as React from "react"
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  BookmarkPlus,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Zap,
} from "@apna/design-system"
import {
  TEMPLATE_GROUPS,
  fillTemplate,
  type ChatTemplate,
  type TemplateContext,
  type TemplateGroup,
} from "@/content/chats"

interface Group {
  label: TemplateGroup
  items: ChatTemplate[]
}

export function TemplatePicker({
  templates,
  context,
  canSave,
  open,
  onOpenChange,
  onPick,
  onSave,
  disabled,
}: {
  templates: ChatTemplate[]
  /** What this thread fills into the placeholders. */
  context: TemplateContext
  /** The draft has text, so "Save current text as template" is on. */
  canSave: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The template's text with the placeholders resolved. */
  onPick: (text: string) => void
  onSave: () => void
  disabled?: boolean
}) {
  const groups = React.useMemo<Group[]>(
    () =>
      TEMPLATE_GROUPS.map((label) => ({ label, items: templates.filter((t) => t.group === label) })).filter(
        (g) => g.items.length > 0
      ),
    [templates]
  )
  const pick = (template: ChatTemplate) => {
    onPick(fillTemplate(template.text, context))
    onOpenChange(false)
  }
  // Enter picks the highlighted template. Base UI's Autocomplete only fills
  // the search field on Enter, so the picker tracks the highlight itself.
  const highlighted = React.useRef<ChatTemplate | undefined>(undefined)

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Templates"
                  disabled={disabled}
                  className="rounded-full text-muted-foreground"
                />
              }
            />
          }
        >
          <Zap aria-hidden className="size-5" />
        </TooltipTrigger>
        <TooltipContent>Templates</TooltipContent>
      </Tooltip>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="w-80 gap-0 p-0"
        finalFocus={() => document.querySelector<HTMLTextAreaElement>("[data-slot=chat-composer] textarea")}
      >
        <Autocomplete
          inline
          autoHighlight
          items={groups}
          itemToStringValue={(t: ChatTemplate) => `${t.label} ${t.text}`}
          onItemHighlighted={(t: ChatTemplate | undefined) => {
            highlighted.current = t
          }}
        >
          <div className="p-2">
            <AutocompleteInput
              placeholder="Search templates"
              aria-label="Search templates"
              onKeyDown={(e) => {
                if (e.key === "Enter" && highlighted.current) {
                  e.preventDefault()
                  pick(highlighted.current)
                }
              }}
            />
          </div>
          <div className="max-h-64 overflow-y-auto px-1.5 pb-1.5">
            <AutocompleteEmpty>No templates found</AutocompleteEmpty>
            <AutocompleteList>
              {(group: Group) => (
                <AutocompleteGroup key={group.label} items={group.items}>
                  <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(t: ChatTemplate) => (
                      <AutocompleteItem
                        key={t.id}
                        value={t}
                        onClick={() => pick(t)}
                        className="group flex-col items-start gap-0.5 py-2"
                      >
                        <span className="font-medium">{t.label}</span>
                        <span className="line-clamp-2 text-caption text-muted-foreground group-data-highlighted:text-accent-foreground">
                          {fillTemplate(t.text, context)}
                        </span>
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
              )}
            </AutocompleteList>
          </div>
        </Autocomplete>
        <div className="border-t border-border p-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canSave}
            onClick={() => {
              onSave()
              onOpenChange(false)
            }}
            className="w-full justify-start"
          >
            <BookmarkPlus aria-hidden />
            Save current text as template
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

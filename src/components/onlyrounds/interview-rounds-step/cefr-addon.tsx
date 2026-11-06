"use client"

import { HelpCircle, Languages, Puzzle } from "@apna/design-system"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Field as UIField, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { RoundsErrorContext } from "@/components/onlyrounds/shared"
import { CEFR_LEVELS } from "@/lib/onlyrounds/constants"
import type { CefrLevel, ScreeningConfig } from "@/types/onlyrounds"
import { CEFR_LABELS } from "@/components/onlyrounds/interview-rounds-step/constants"

// ---- CEFR language proficiency add-on -----------------------------------

export function CefrAddon({
  config,
  onChange,
}: {
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
}) {
  const showErrors = React.useContext(RoundsErrorContext)
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })
  const toggleId = React.useId()

  const minIdx = config.cefrMinLevel ? CEFR_LEVELS.indexOf(config.cefrMinLevel) : -1
  const preferredIdx = config.cefrPreferredLevel ? CEFR_LEVELS.indexOf(config.cefrPreferredLevel) : -1

  const minChips: ChipTabItem<CefrLevel>[] = CEFR_LEVELS.map((l, idx) => ({
    value: l,
    label: CEFR_LABELS[l],
    disabled: preferredIdx !== -1 && idx > preferredIdx,
  }))

  const preferredChips: ChipTabItem<CefrLevel>[] = CEFR_LEVELS.map((l, idx) => ({
    value: l,
    label: CEFR_LABELS[l],
    disabled: minIdx !== -1 && idx < minIdx,
  }))

  const setMinLevel = (min: CefrLevel | "") => {
    const patch: Partial<ScreeningConfig> = { cefrMinLevel: min }
    if (min && config.cefrPreferredLevel) {
      const minIdxVal = CEFR_LEVELS.indexOf(min)
      const prefIdxVal = CEFR_LEVELS.indexOf(config.cefrPreferredLevel)
      if (minIdxVal > prefIdxVal) {
        patch.cefrPreferredLevel = min
      }
    }
    set(patch)
  }

  const setPreferredLevel = (pref: CefrLevel | "") => {
    const patch: Partial<ScreeningConfig> = { cefrPreferredLevel: pref }
    if (pref && config.cefrMinLevel) {
      const minIdxVal = CEFR_LEVELS.indexOf(config.cefrMinLevel)
      const prefIdxVal = CEFR_LEVELS.indexOf(pref)
      if (minIdxVal > prefIdxVal) {
        patch.cefrMinLevel = pref
      }
    }
    set(patch)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium inline-flex items-center gap-2">
        <Puzzle className="size-4 text-muted-foreground shrink-0" />
        Add-ons
      </Label>
      <div className="overflow-hidden rounded-lg border border-border">
        <label
          htmlFor={toggleId}
          className="flex cursor-pointer items-start justify-between gap-3 p-3"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
              <Languages className="size-4 text-primary" />
              CEFR language proficiency assessment
              <Badge variant="info">New</Badge>
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Scores the candidate&apos;s spoken language level (A1–C2). Adds
              3–4 minutes.
            </span>
          </span>
          <Switch
            id={toggleId}
            checked={config.cefrEnabled}
            onCheckedChange={(checked) => set({ cefrEnabled: checked === true })}
          />
        </label>

        {config.cefrEnabled ? (
          <div className="flex flex-col gap-6 border-t border-border p-3">
            <UIField>
              <FieldLabel icon={Languages}>Minimum CEFR level<span className="ml-0.5 text-destructive">*</span></FieldLabel>
              <ChipTabs
                variant="choice"
                size="sm"
                items={minChips}
                value={config.cefrMinLevel}
                onValueChange={(v) => setMinLevel(v)}
                aria-label="Minimum CEFR level"
                aria-invalid={showErrors && !config.cefrMinLevel || undefined}
              />
              {showErrors && !config.cefrMinLevel && (
                <FieldError>Select a minimum level to enable the CEFR assessment.</FieldError>
              )}
              <FieldDescription>The lowest level a candidate must reach to pass.</FieldDescription>
            </UIField>
            <UIField>
              <FieldLabel icon={Languages}>Preferred CEFR level<span className="ml-1 text-xs font-normal text-muted-foreground">(Optional)</span></FieldLabel>
              <ChipTabs
                variant="choice"
                size="sm"
                items={preferredChips}
                value={config.cefrPreferredLevel}
                onValueChange={(v) => setPreferredLevel(v)}
                aria-label="Preferred CEFR level"
              />
              <FieldDescription>The level you&apos;d ideally like to see.</FieldDescription>
            </UIField>
            <UIField>
              <FieldLabel icon={HelpCircle}>Specific questions</FieldLabel>
              <Textarea
                value={config.cefrQuestions}
                onChange={(e) => set({ cefrQuestions: e.target.value })}
                placeholder="e.g. Ask the candidate to describe a past customer escalation in English."
                rows={3}
              />
              <FieldDescription>Optional — anything particular you want the assessment to probe.</FieldDescription>
            </UIField>
          </div>
        ) : null}
      </div>
    </div>
  )
}

"use client"

import {
  CalendarClock,
  Compass,
  Layout,
  ListTodo,
  MessageCircleQuestion,
  Mic,
  Video,
  Wrench,
} from "@apna/design-system"
import * as React from "react"
import { ChipTabs, type ChipTabItem } from "@/components/ui/chip-tabs"
import { Textarea } from "@/components/ui/textarea"
import { Field as UIField, FieldDescription, FieldLabel } from "@/components/ui/field"
import { capitalize } from "@/lib/utils"
import { RoundsErrorContext } from "@/components/onlyrounds/shared"
import type { ScreeningConfig, ScreeningFormat } from "@/types/onlyrounds"
import { DIRECTION_CHIPS, modeChips } from "@/components/onlyrounds/interview-rounds-step/constants"
import { CefrAddon } from "@/components/onlyrounds/interview-rounds-step/cefr-addon"

// ---- interview scheduling editor ----------------------------------------

export function SchedulingEditor({
  config,
  onChange,
}: {
  // Reuses the call config's `mode` + `humanNotes`.
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
}) {
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

  return (
    <div className="flex flex-col gap-4">
      <UIField>
        <FieldLabel icon={CalendarClock}>Scheduling type</FieldLabel>
        <ChipTabs
          variant="choice"
          items={modeChips("scheduling")}
          value={config.mode}
          onValueChange={(v) => set({ mode: v })}
          aria-label="Scheduling type"
        />
      </UIField>

      {config.mode === "ai" ? (
        <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          AI scheduling is coming soon.
        </p>
      ) : config.mode === "human" ? (
        <UIField>
          <FieldLabel icon={ListTodo}>Task details</FieldLabel>
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Offer 3 slots across the week, confirm over WhatsApp, and share the meeting link a day before."
            rows={4}
          />
          <FieldDescription>Instructions for the team coordinating interview slots.</FieldDescription>
        </UIField>
      ) : null}
    </div>
  )
}

// ---- call task editor (screening + interview) ---------------------------

export function ScreeningEditor({
  noun,
  config,
  onChange,
  cefrLockedElsewhere,
}: {
  /** Lowercase task noun used in labels, e.g. "screening" / "interview". */
  noun: string
  config: ScreeningConfig
  onChange: (next: ScreeningConfig) => void
  /** Another task already owns the CEFR add-on — hide it here. */
  cefrLockedElsewhere: boolean
}) {
  const showErrors = React.useContext(RoundsErrorContext)
  const set = (patch: Partial<ScreeningConfig>) =>
    onChange({ ...config, ...patch })

  const Noun = capitalize(noun)
  const isAI = config.mode === "ai"
  // Video is available for inbound only. Outbound runs as a regular phone
  // call (audio), and "Both" includes outbound — so both disable video.
  const videoUnavailable =
    config.direction === "outbound" || config.direction === "both"

  const formatChips: ChipTabItem<ScreeningFormat>[] = [
    {
      value: "audio",
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Mic className="size-3.5" />
          Audio
        </span>
      ),
    },
    {
      value: "video",
      disabled: videoUnavailable,
      label: (
        <span className="inline-flex items-center gap-1.5">
          <Video className="size-3.5" />
          Video
        </span>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <UIField>
        <FieldLabel icon={Wrench}>{Noun} type<span className="ml-0.5 text-destructive">*</span></FieldLabel>
        <ChipTabs
          variant="choice"
          items={modeChips(noun)}
          value={config.mode}
          onValueChange={(v) =>
            // Human mode has no CEFR add-on — clear it when switching.
            set(v === "human" ? { mode: v, cefrEnabled: false } : { mode: v })
          }
          aria-label={`${Noun} type`}
          aria-invalid={showErrors && !config.mode || undefined}
        />
      </UIField>

      {config.mode === "human" ? (
        <UIField>
          <FieldLabel icon={MessageCircleQuestion}>Key questions or notes</FieldLabel>
          <Textarea
            value={config.humanNotes}
            onChange={(e) => set({ humanNotes: e.target.value })}
            placeholder="e.g. Confirm notice period and expected CTC, check willingness to travel, and gauge spoken English."
            rows={4}
          />
          <FieldDescription>{`What should your team cover at this ${noun} stage?`}</FieldDescription>
        </UIField>
      ) : isAI ? (
        <>
          <UIField>
            <FieldLabel icon={Compass}>{Noun} direction<span className="ml-0.5 text-destructive">*</span></FieldLabel>
            <ChipTabs
              variant="choice"
              items={DIRECTION_CHIPS}
              value={config.direction}
              onValueChange={(v) =>
                // Outbound (and Both, which includes outbound) can't be
                // video — fall back to Audio if Video was selected.
                set(
                  (v === "outbound" || v === "both") &&
                    config.format === "video"
                    ? { direction: v, format: "audio" }
                    : { direction: v },
                )
              }
              aria-label={`${Noun} direction`}
              aria-invalid={showErrors && !config.direction || undefined}
            />
            <FieldDescription>Inbound: the candidate calls in. Outbound: we call the candidate.</FieldDescription>
          </UIField>

          <UIField>
            <FieldLabel icon={Layout}>{Noun} format<span className="ml-0.5 text-destructive">*</span></FieldLabel>
            <ChipTabs
              variant="choice"
              items={formatChips}
              value={config.format}
              onValueChange={(v) => set({ format: v })}
              aria-label={`${Noun} format`}
              aria-invalid={showErrors && !config.format || undefined}
            />
            {(config.direction === "outbound" || config.direction === "both") && (
              <FieldDescription>
                {config.direction === "outbound"
                  ? "Outbound runs as a regular call — audio only."
                  : '"Both" includes outbound calls — video isn\'t available.'}
              </FieldDescription>
            )}
          </UIField>

          {cefrLockedElsewhere ? (
            <p className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              CEFR language proficiency assessment can only be enabled in one task.
            </p>
          ) : (
            <CefrAddon config={config} onChange={onChange} />
          )}
        </>
      ) : null}
    </div>
  )
}

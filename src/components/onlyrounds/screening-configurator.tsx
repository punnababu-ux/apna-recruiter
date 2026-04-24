"use client"

/**
 * ScreeningConfigurator — picks interview direction + format + add-ons.
 *
 * Two RadioGroup pairs (direction / format) laid out as RadioCards, then a
 * feature-toggle row for add-on capabilities (video recording, violations
 * report, transcript). Pure presentation; parent owns state.
 */

import {
  Mic,
  MonitorPlay,
  PhoneIncoming,
  PhoneOutgoing,
  ShieldAlert,
  Video,
} from "lucide-react"

import { RadioCard } from "@/components/onlyrounds/radio-card"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

export type ScreeningDirection = "inbound" | "outbound"
export type ScreeningFormat = "audio" | "video"

export type ScreeningAddOns = {
  recording: boolean
  violations: boolean
  transcript: boolean
}

export function ScreeningConfigurator({
  direction,
  format,
  addOns,
  onDirectionChange,
  onFormatChange,
  onAddOnsChange,
}: {
  direction: ScreeningDirection
  format: ScreeningFormat
  addOns: ScreeningAddOns
  onDirectionChange: (d: ScreeningDirection) => void
  onFormatChange: (f: ScreeningFormat) => void
  onAddOnsChange: (next: ScreeningAddOns) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-medium">How should the call start?</h3>
          <p className="text-xs text-muted-foreground">
            Inbound lets candidates dial in; outbound dials them automatically.
          </p>
        </div>
        <RadioGroup
          value={direction}
          onValueChange={(v) => onDirectionChange(v as ScreeningDirection)}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <RadioCard
            value="inbound"
            icon={<PhoneIncoming className="size-4" />}
            title="Inbound"
            description="Candidate calls the shared number"
            selected={direction === "inbound"}
          />
          <RadioCard
            value="outbound"
            icon={<PhoneOutgoing className="size-4" />}
            title="Outbound"
            description="We call the candidate at the scheduled time"
            selected={direction === "outbound"}
          />
        </RadioGroup>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-medium">Interview format</h3>
          <p className="text-xs text-muted-foreground">
            Video unlocks proctoring and violation reports.
          </p>
        </div>
        <RadioGroup
          value={format}
          onValueChange={(v) => onFormatChange(v as ScreeningFormat)}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <RadioCard
            value="audio"
            icon={<Mic className="size-4" />}
            title="Audio only"
            description="Lowest friction, fastest to complete"
            selected={format === "audio"}
          />
          <RadioCard
            value="video"
            icon={<Video className="size-4" />}
            title="Audio + video"
            description="Enables proctoring and richer signals"
            selected={format === "video"}
          />
        </RadioGroup>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Add-ons</h3>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          <AddOnRow
            icon={<MonitorPlay className="size-4" />}
            id="recording"
            title="Record the call"
            description="Store audio/video for review in the candidate card."
            checked={addOns.recording}
            onChange={(v) => onAddOnsChange({ ...addOns, recording: v })}
          />
          <AddOnRow
            icon={<ShieldAlert className="size-4" />}
            id="violations"
            title="Interview violation report"
            description="Flag tab switches, multiple faces, and off-screen gazes."
            checked={addOns.violations}
            onChange={(v) => onAddOnsChange({ ...addOns, violations: v })}
            disabled={format !== "video"}
          />
          <AddOnRow
            icon={<Mic className="size-4" />}
            id="transcript"
            title="Auto transcript"
            description="Full verbatim transcript with speaker diarization."
            checked={addOns.transcript}
            onChange={(v) => onAddOnsChange({ ...addOns, transcript: v })}
          />
        </div>
      </section>
    </div>
  )
}

function AddOnRow({
  icon,
  id,
  title,
  description,
  checked,
  onChange,
  disabled,
}: {
  icon: React.ReactNode
  id: string
  title: string
  description: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {title}
        </Label>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="mt-0.5 shrink-0"
      />
    </div>
  )
}

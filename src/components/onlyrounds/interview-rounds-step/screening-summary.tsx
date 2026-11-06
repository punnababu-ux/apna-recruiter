"use client"

import {
  Bot,
  Mic,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  UserRound,
  Video,
  type IconComponent,
} from "@apna/design-system"
import { capitalize } from "@/lib/utils"
import { InfoChip } from "@/components/onlyrounds/shared"
import { CALL_TASK_TYPES } from "@/lib/onlyrounds/constants"
import type { InterviewTask } from "@/types/onlyrounds"

/** Compact chips shown in the task header — mode, direction, and call
 *  format (voice/video), each with its own icon. */
export function ScreeningSummary({ task }: { task: InterviewTask }) {
  if (task.type === "custom") return null
  const { mode, direction, format } = task.screening
  if (!mode) return null

  const chips: { icon: IconComponent; label: string }[] = [
    {
      icon: mode === "ai" ? Bot : UserRound,
      label: mode === "ai" ? "AI" : "Human",
    },
  ]
  // Direction / format only apply to AI call tasks (screening / interview).
  if (CALL_TASK_TYPES.has(task.type) && mode === "ai") {
    if (direction) {
      chips.push({
        icon:
          direction === "outbound"
            ? PhoneOutgoing
            : direction === "inbound"
              ? PhoneIncoming
              : PhoneCall,
        label: capitalize(direction),
      })
    }
    if (format) {
      chips.push({
        icon: format === "video" ? Video : Mic,
        label: format === "video" ? "Video call" : "Voice call",
      })
    }
  }

  return (
    <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
      {chips.map(({ icon, label }) => (
        <InfoChip key={label} icon={icon}>{label}</InfoChip>
      ))}
    </div>
  )
}

"use client"

import { Bot, UserRound } from "@apna/design-system"
import { capitalize } from "@/lib/utils"
import { DisplayField } from "@/components/onlyrounds/shared"
import type { InterviewTask, ScreeningConfig } from "@/types/onlyrounds"

// ---- read-only views for non-AI tasks when criteria generated -----------

export function CustomTaskReadOnly({ task }: { task: InterviewTask }) {
  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label="Task name"
        value={task.title || "Custom task"}
      />
      <DisplayField
        label="Task details"
        value={task.notes || "No details provided."}
      />
    </div>
  )
}

export function SchedulingReadOnly({ config }: { config: ScreeningConfig }) {
  const isAI = config.mode === "ai"
  const isHuman = config.mode === "human"

  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label="Scheduling type"
        value={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            {isAI ? (
              <>
                <Bot className="size-3.5 text-primary" />
                AI scheduling
              </>
            ) : isHuman ? (
              <>
                <UserRound className="size-3.5 text-primary" />
                Human scheduling
              </>
            ) : (
              "Not configured"
            )}
          </span>
        }
      />
      {isHuman && (
        <DisplayField
          label="Task details"
          value={config.humanNotes || "No instructions provided."}
        />
      )}
      {isAI && (
        <p className="text-xs text-muted-foreground">
          AI scheduling is coming soon.
        </p>
      )}
    </div>
  )
}

export function HumanCallReadOnly({
  noun,
  config,
}: {
  noun: string
  config: ScreeningConfig
}) {
  const Noun = capitalize(noun)
  const isHuman = config.mode === "human"
  const isAI = config.mode === "ai"

  return (
    <div className="flex flex-col gap-4">
      <DisplayField
        label={`${Noun} type`}
        value={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            {isAI ? (
              <>
                <Bot className="size-3.5 text-primary" />
                AI {noun}
              </>
            ) : isHuman ? (
              <>
                <UserRound className="size-3.5 text-primary" />
                Human {noun}
              </>
            ) : (
              "Not configured"
            )}
          </span>
        }
      />
      {isHuman && (
        <DisplayField
          label="Key questions or notes"
          value={config.humanNotes || "No questions or notes provided."}
        />
      )}
    </div>
  )
}

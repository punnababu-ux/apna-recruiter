"use client"

import { AudioLines, Button, Mic, Tooltip, TooltipContent, TooltipTrigger } from "@apna/design-system"

/** Voice toggle for a PromptInput. Renders nothing where the browser has
 *  no speech recognition, rather than a button that can't work. */
export function MicButton({
  supported,
  listening,
  onToggle,
  size = "icon-sm",
}: {
  supported: boolean
  listening: boolean
  onToggle: () => void
  size?: "icon-sm" | "icon"
}) {
  if (!supported) return null
  const label = listening ? "Stop listening" : "Speak instead of typing"
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            size={size}
            variant={listening ? "default" : "outline"}
            className="rounded-full"
            aria-pressed={listening}
            aria-label={label}
            onClick={onToggle}
          >
            {listening ? <AudioLines className="animate-pulse" /> : <Mic />}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

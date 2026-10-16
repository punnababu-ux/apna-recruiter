"use client"

/**
 * PromptInput — the AI prompt box: an auto-growing textarea with a footer
 * row for actions (mic, attachments) and a round submit button.
 *
 * Enter submits, Shift+Enter inserts a newline. `loading` swaps the submit
 * glyph for a spinner and blocks re-submits. `size="lg"` is the hero
 * variant (first screen of an AI flow); `"default"` is the compact bar used
 * for follow-up instructions.
 *
 * The submit is `emphasis` (dark gray), never green: asking the AI is a step,
 * not the commit — green is kept for post / pay (Button's one-primary rule).
 *
 * API
 *   <PromptInput
 *     value={text}
 *     onValueChange={setText}
 *     onSubmit={() => run(text)}
 *     placeholder="Describe who you want to hire…"
 *     actions={<Button size="icon-sm" variant="ghost"><Mic /></Button>}
 *     loading={busy}
 *     size="lg"
 *   />
 *
 * Accessibility: name the textarea with a visible `<label htmlFor={id}>`
 * (preferred) or `aria-label`; with neither, the placeholder is used. The
 * submit button is labelled by `submitLabel` / `submitText`.
 */

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ArrowUp, Sparkles } from "@/icons/icons"
import { cn } from "@/lib/utils"

interface PromptInputProps
  extends Omit<React.ComponentProps<"textarea">, "value" | "onChange" | "onSubmit" | "size"> {
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
  /** Extra controls left of the submit button (e.g. a mic toggle). */
  actions?: React.ReactNode
  /** Left side of the footer row (e.g. a hint or example chips). */
  footerStart?: React.ReactNode
  loading?: boolean
  size?: "default" | "lg"
  submitLabel?: string
  /** Render the submit as a labelled button (e.g. "Draft my job") instead
   *  of a bare arrow — clearer when the box could be mistaken for search. */
  submitText?: string
  /** Highlights the box while an external input (voice) is writing into it. */
  active?: boolean
  /** Hide the submit button when the page has its own CTA for it (a wizard
   *  footer's "Draft my job"). Enter still submits. */
  hideSubmit?: boolean
}

function PromptInput({
  value,
  onValueChange,
  onSubmit,
  actions,
  footerStart,
  loading = false,
  size = "default",
  submitLabel = "Submit",
  submitText,
  active = false,
  hideSubmit = false,
  disabled,
  placeholder,
  className,
  ...props
}: PromptInputProps) {
  const lg = size === "lg"
  const canSubmit = value.trim().length > 0 && !loading && !disabled

  return (
    <div
      data-slot="prompt-input"
      data-size={size}
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl border border-input bg-card shadow-card transition-interactive focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        active && "border-ring ring-3 ring-ring/50",
        lg ? "p-4" : "p-2.5",
        className
      )}
    >
      <textarea
        data-slot="prompt-input-textarea"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            if (canSubmit) onSubmit()
          }
        }}
        placeholder={placeholder}
        // A visible <label htmlFor={id}> names the box; fall back to the
        // placeholder only when there's no id to label it by.
        aria-label={props["aria-label"] ?? (props.id ? undefined : placeholder)}
        disabled={disabled}
        rows={lg ? 3 : 1}
        className={cn(
          "field-sizing-content w-full resize-none bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
          lg ? "min-h-20 px-1 text-base" : "min-h-6 px-1.5 text-sm"
        )}
        {...props}
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">{footerStart}</div>
        <div className="flex shrink-0 items-center gap-1.5">
          {actions}
          {hideSubmit ? null : submitText ? (
            <Button type="button" variant="emphasis" size={lg ? "default" : "sm"} className="rounded-full" disabled={!canSubmit} onClick={onSubmit}>
              {loading ? <Spinner /> : <Sparkles />}
              {submitText}
            </Button>
          ) : (
            <Button
              type="button"
              variant="emphasis"
              size={lg ? "icon" : "icon-sm"}
              className="rounded-full"
              disabled={!canSubmit}
              onClick={onSubmit}
              aria-label={submitLabel}
            >
              {loading ? <Spinner /> : <ArrowUp />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export { PromptInput }
export type { PromptInputProps }

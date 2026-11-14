"use client"

/**
 * FloatingInput — a single-line text field whose label lives inside it.
 *
 * The label rests on the text line, where a placeholder would be. Once the
 * field has focus or a value (typed or autofilled) it floats to the top of
 * the field at caption size and stays there, so the question is never lost.
 * An empty field shows one text, not two (label + placeholder).
 *
 * API
 *   <FloatingInput label="Your full name" value={…} onChange={…} />
 *   <FloatingInput label="Company name" placeholder="e.g. Swiggy" />
 *   <FloatingInput label="Mobile number" prefix="+91" type="tel" />
 *   <FloatingInput label="Password" type="password" trailing={<Button variant="link" size="sm">Show</Button>} />
 *
 *   label           the field's name; also its accessible name (a real <label>)
 *   placeholder     an optional example. It shows only while the field is
 *                   focused and empty; before that the label is in its place.
 *   prefix          fixed text before the value ("+91", "₹"). It belongs to
 *                   the value, so it shows with it: hidden while the label
 *                   rests on the text line, in view once the label floats.
 *                   The label and the prefix never share a line. It is read
 *                   out as part of the field's description.
 *   trailing        one small action at the end of the field, always in view
 *                   (Show / Hide on a password, an info button). The label
 *                   and the value stop before it.
 *   id              optional; generated when missing
 *   className       on the frame (layout)
 *   inputClassName  on the input itself
 *   …               every other <input> prop (`type`, `autoComplete`,
 *                   `aria-invalid`, `disabled`, `ref`, …) goes to the input
 *
 * Why inside the field and not on its border (Material's outlined "notch"):
 * a label that cuts the border needs a patch of the surface's colour behind
 * it, and a frosted or gradient surface has no such colour. Inside the field
 * it works on any surface.
 *
 * When to use it (Punna, 2026-11-14): where two or more short text fields sit
 * together (a form: name, company, email, mobile number, password), so the
 * group reads uncluttered. A screen that asks ONE question (each job-posting
 * step) keeps `Input` under its heading: the heading is the label. Keep
 * `Field` + `FieldLabel` + `Input` when the label is a full question or an
 * example must stay visible. Choice questions (chips, radios), selects,
 * dates and times keep their label above.
 *
 * Errors and hints sit under it as with Input: wrap it in `Field` and add
 * `FieldError` / `FieldDescription`. `aria-invalid` paints the error border,
 * and the field stays red while the cursor is back in it.
 *
 * Size: one, 56px, a full touch target with room for both lines. Text is
 * 16px on phones (no iOS zoom on focus) and 14px from md, like Input; the
 * floated label is 12px at both.
 *
 * Structure: the frame carries Input's look (`inputVariants`) and the input
 * inside it is bare, so a prefix and an action can sit in the same box. A
 * press anywhere on the frame puts the cursor in the field.
 *
 * Motion: the label moves by translate and scale only, and the prefix
 * fades, over `--duration-hover` (`transition-interactive`). Reduced motion
 * is handled once, in the base layer.
 */

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"
import { inputVariants } from "@/components/ui/input"

type FloatingInputProps = Omit<React.ComponentProps<"input">, "size" | "prefix"> & {
  label: React.ReactNode
  prefix?: React.ReactNode
  trailing?: React.ReactNode
  inputClassName?: string
}

const shown = (node: React.ReactNode) => node != null && node !== false && node !== ""

function FloatingInput({
  className,
  inputClassName,
  label,
  prefix,
  trailing,
  id,
  placeholder,
  "aria-describedby": describedBy,
  ...props
}: FloatingInputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const hasPrefix = shown(prefix)
  const hasTrailing = shown(trailing)
  const prefixId = hasPrefix ? `${inputId}-prefix` : undefined
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"

  return (
    <div
      data-slot="floating-input"
      className={cn(
        // Input's own look, on the frame. Clipped, so a browser's autofill
        // tint on the input inside keeps the frame's corners.
        inputVariants({ inputSize: "lg" }),
        "relative flex h-14 cursor-text items-stretch overflow-hidden p-0",
        // Focus comes from the input, never from the action at the end.
        !invalid &&
          "has-[[data-slot=floating-input-control]:focus-visible]:border-ring has-[[data-slot=floating-input-control]:focus-visible]:ring-3 has-[[data-slot=floating-input-control]:focus-visible]:ring-ring/50",
        // Input's error and disabled looks: its own selectors (`aria-invalid:`,
        // `disabled:`) match an input, and this frame is not one.
        invalid &&
          "border-destructive ring-3 ring-destructive/20 hover:border-destructive dark:border-destructive/50 dark:ring-destructive/40 dark:hover:border-destructive/50",
        props.disabled && "pointer-events-none cursor-not-allowed bg-input/50 opacity-50 dark:bg-input/80",
        className
      )}
      // A press on the frame itself (the prefix, the space around the
      // action) puts the cursor in the field, as a press on the input does.
      // Stopping the default keeps a focused field from blurring first.
      onMouseDown={(event) => {
        const control = event.currentTarget.querySelector<HTMLInputElement>("[data-slot=floating-input-control]")
        const target = event.target as HTMLElement
        if (!control || target === control || target.closest("[data-slot=floating-input-trailing]")) return
        event.preventDefault()
        control.focus()
      }}
    >
      {/* The label's box: it ends where the action starts, so a long label
          truncates before it. The input comes first in the DOM (it is the
          `peer`) and last on the line, after the prefix. */}
      <div className="relative flex min-w-0 flex-1">
        <InputPrimitive
          id={inputId}
          data-slot="floating-input-control"
          // A lone space keeps `:placeholder-shown` true while the field is
          // empty. That one selector tells the label where to sit, with no
          // state and no effect.
          placeholder={placeholder || " "}
          aria-describedby={[prefixId, describedBy].filter(Boolean).join(" ") || undefined}
          className={cn(
            // The value sits on the lower line; the top one is the label's.
            "peer order-last h-full min-w-0 flex-1 bg-transparent pt-6 pb-2 outline-none disabled:cursor-not-allowed",
            hasPrefix ? "pl-2" : "pl-4",
            hasTrailing ? "pr-2" : "pr-4",
            // The example waits until the label has left the text line.
            "placeholder:text-transparent placeholder:transition-colors placeholder:duration-hover focus:placeholder:text-muted-foreground",
            inputClassName
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          data-slot="floating-input-label"
          className={cn(
            // Resting: centred in the field, at the input's own text size.
            // -top-px stands in for the frame's border, so the label keeps
            // the field's centre line.
            "pointer-events-none absolute -top-px left-4 origin-left translate-y-4 truncate text-base leading-6 text-muted-foreground transition-interactive select-none md:text-sm md:leading-6",
            hasTrailing ? "right-2" : "right-4",
            // Floated (focus, a value, autofill): 12px on the top line. The
            // scale brings 16px, and 14px from md, down to 12px.
            "peer-focus:translate-y-1 peer-focus:scale-75 md:peer-focus:scale-86",
            "peer-[:not(:placeholder-shown)]:translate-y-1 peer-[:not(:placeholder-shown)]:scale-75 md:peer-[:not(:placeholder-shown)]:scale-86",
            "peer-autofill:translate-y-1 peer-autofill:scale-75 md:peer-autofill:scale-86"
          )}
        >
          {label}
        </label>
        {hasPrefix && (
          <span
            id={prefixId}
            data-slot="floating-input-prefix"
            className={cn(
              // On the value's line, in its own type. Out of sight while the
              // label rests there; it takes no press, so one on it reaches
              // the frame.
              "pointer-events-none flex shrink-0 items-center pt-6 pb-2 pl-4 text-foreground opacity-0 transition-interactive select-none",
              "peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:opacity-100 peer-autofill:opacity-100"
            )}
          >
            {prefix}
          </span>
        )}
      </div>
      {hasTrailing && (
        <div data-slot="floating-input-trailing" className="flex shrink-0 cursor-default items-center pr-4">
          {trailing}
        </div>
      )}
    </div>
  )
}

export { FloatingInput }
export type { FloatingInputProps }

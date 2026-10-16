"use client"

/**
 * OtpInput — a one-time code, one box per digit (login by mobile number).
 *
 * Typing moves to the next box, Backspace on an empty box moves back,
 * arrows move between boxes, and pasting a whole code (or the SMS autofill
 * `one-time-code`) fills every box at once. Digits only. `onComplete` fires
 * when the last box fills, so the screen can verify without a button press.
 *
 *   <OtpInput length={6} value={code} onChange={setCode} onComplete={verify}
 *     invalid={wrongCode} autoFocus />
 *
 * Boxes share Input's look (inputVariants, 48px square, 20px digits) and its
 * invalid state. On a narrow phone they narrow (never below the row) rather
 * than push the row past the card. A11y: one group labelled by `aria-label`; each box says
 * which digit it is.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants } from "./input"

export interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  invalid?: boolean
  disabled?: boolean
  autoFocus?: boolean
  "aria-label"?: string
  className?: string
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  invalid,
  disabled,
  autoFocus,
  "aria-label": ariaLabel = "One-time code",
  className,
}: OtpInputProps) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? "")

  const focus = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus()

  // Re-enabled with an empty code (a wrong code was cleared): back to the
  // first box, so the next attempt needs no tap.
  React.useEffect(() => {
    if (!disabled && autoFocus && !value) refs.current[0]?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on re-enable
  }, [disabled])

  const commit = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, length)
    onChange(clean)
    if (clean.length === length) onComplete?.(clean)
    return clean
  }

  const setAt = (i: number, char: string) => {
    const arr = digits.slice()
    arr[i] = char
    // Keep the code contiguous: a box can't hold a digit past an empty one.
    return commit(arr.join("").slice(0, length))
  }

  return (
    <div role="group" aria-label={ariaLabel} data-slot="otp-input" className={cn("flex gap-2", className)}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          maxLength={length}
          value={d}
          className={cn(inputVariants({ inputSize: "default" }), "h-12 max-w-12 min-w-0 flex-1 px-0 text-center text-xl font-semibold tabular-nums md:text-xl")}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            const typed = e.target.value.replace(/\D/g, "")
            if (!typed) return
            if (typed.length > 1) {
              // Paste or SMS autofill into one box: spread from here.
              const clean = commit((value.slice(0, i) + typed).slice(0, length))
              focus(clean.length)
              return
            }
            setAt(Math.min(i, value.length), typed)
            focus(Math.min(i, value.length) + 1)
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault()
              if (d) {
                commit(value.slice(0, i) + value.slice(i + 1))
              } else if (i > 0) {
                commit(value.slice(0, i - 1) + value.slice(i))
                focus(i - 1)
              }
            } else if (e.key === "ArrowLeft") {
              e.preventDefault()
              focus(i - 1)
            } else if (e.key === "ArrowRight") {
              e.preventDefault()
              focus(i + 1)
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const clean = commit(e.clipboardData.getData("text"))
            focus(clean.length)
          }}
        />
      ))}
    </div>
  )
}

/**
 * DatePicker — convenience composition of Popover + Calendar.
 *
 * API
 *   <DatePicker
 *     value={date}                 // controlled Date | undefined
 *     defaultValue={new Date()}    // uncontrolled initial value
 *     onChange={(date) => ...}     // fired when selection changes
 *     placeholder="Pick a date"
 *     format={(d) => d.toLocaleDateString()}
 *     disabled
 *     inputSize="sm|default|lg"
 *   />
 *
 * Notes
 * - Trigger is a Button (outline, full-width) showing the formatted date.
 * - Calendar is single-select; popover auto-closes on pick.
 * - Pass `calendarProps` to forward additional DayPicker options (e.g. disabled
 *   ranges, `captionLayout="dropdown"`, locale).
 */

"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ButtonSize = React.ComponentProps<typeof Button>["size"]

const SIZE_MAP: Record<"sm" | "default" | "lg", ButtonSize> = {
  sm: "sm",
  default: "default",
  lg: "lg",
}

type CalendarProps = React.ComponentProps<typeof Calendar>

type DatePickerProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  /** Format the selected date for display in the trigger. */
  format?: (date: Date) => string
  disabled?: boolean
  inputSize?: "sm" | "default" | "lg"
  className?: string
  /** id/name for forms. Exposes a hidden input with an ISO date string. */
  id?: string
  name?: string
  /** Forwarded to the underlying Calendar. */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "defaultMonth"
  >
}

function defaultFormat(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function toISODate(date: Date) {
  // Local-date ISO (YYYY-MM-DD) without timezone shift.
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  format = defaultFormat,
  disabled,
  inputSize = "default",
  className,
  id,
  name,
  calendarProps,
}: DatePickerProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue)
  const selected = isControlled ? value : internal
  const [open, setOpen] = React.useState(false)

  const handleSelect = (next: Date | undefined) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
    if (next) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size={SIZE_MAP[inputSize]}
            disabled={disabled}
            data-slot="date-picker-trigger"
            data-placeholder={selected ? undefined : ""}
            className={cn(
              "w-full justify-start font-normal data-[placeholder]:text-muted-foreground",
              className
            )}
          >
            <CalendarIcon data-icon="inline-start" />
            {selected ? format(selected) : placeholder}
          </Button>
        }
      />
      <PopoverContent
        align="start"
        className="w-auto p-0"
        data-slot="date-picker-content"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected}
          autoFocus
          {...calendarProps}
        />
      </PopoverContent>
      {name ? (
        <input
          type="hidden"
          id={id}
          name={name}
          value={selected ? toISODate(selected) : ""}
        />
      ) : null}
    </Popover>
  )
}

export { DatePicker, type DatePickerProps }

"use client"

/**
 * Autocomplete — a search field whose suggestions filter as you type, in
 * optional labelled groups. Built on Base UI Autocomplete: the input keeps
 * focus while ↑/↓ move the highlight, Enter picks it, Escape closes.
 *
 * API
 *   <Autocomplete items={groups} itemToStringValue={(i) => i.label}>
 *     <AutocompleteInput placeholder="Search" />
 *     <AutocompleteContent>
 *       <AutocompleteEmpty>No results</AutocompleteEmpty>
 *       <AutocompleteList>
 *         {(group) => (
 *           <AutocompleteGroup key={group.label} items={group.items}>
 *             <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
 *             <AutocompleteCollection>
 *               {(item) => <AutocompleteItem key={item.id} value={item}>{item.label}</AutocompleteItem>}
 *             </AutocompleteCollection>
 *           </AutocompleteGroup>
 *         )}
 *       </AutocompleteList>
 *     </AutocompleteContent>
 *   </Autocomplete>
 *
 * `AutocompleteInput` carries the search glyph and Input's sizes
 * (`inputSize`); `className` styles the field, `containerClassName` its
 * width. Items take `render={<a href=… />}` to be real links.
 *
 * a11y: Base UI wires combobox / listbox roles and aria-activedescendant;
 * group labels are announced with their items.
 */

import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Search } from "@/icons/icons"
import { inputVariants } from "./input"

const Autocomplete = AutocompletePrimitive.Root

function AutocompleteInput({
  className,
  containerClassName,
  inputSize = "sm",
  ...props
}: AutocompletePrimitive.Input.Props &
  VariantProps<typeof inputVariants> & { containerClassName?: string }) {
  return (
    <div data-slot="autocomplete-input" className={cn("relative", containerClassName)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <AutocompletePrimitive.Input
        className={cn(inputVariants({ inputSize }), "pl-9", className)}
        {...props}
      />
    </div>
  )
}

function AutocompleteContent({
  className,
  sideOffset = 6,
  align = "start",
  children,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<AutocompletePrimitive.Positioner.Props, "sideOffset" | "align">) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner sideOffset={sideOffset} align={align} className="isolate z-popover">
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-content"
          className={cn(
            "max-h-(--available-height) w-(--anchor-width) min-w-72 overflow-y-auto rounded-lg bg-popover p-1.5 text-sm text-popover-foreground shadow-popover ring-1 ring-foreground/10 outline-hidden duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
            className
          )}
          {...props}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={cn("flex flex-col gap-1 empty:hidden", className)}
      {...props}
    />
  )
}

function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function AutocompleteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn("px-2 pt-2 pb-1 text-overline text-muted-foreground", className)}
      {...props}
    />
  )
}

const AutocompleteCollection = AutocompletePrimitive.Collection

function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={cn(
        "ink relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-hidden transition-interactive select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn("px-2 py-3 text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteCollection,
  AutocompleteItem,
  AutocompleteEmpty,
}

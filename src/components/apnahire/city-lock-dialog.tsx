"use client"

/**
 * CityLockDialog — "Lock your plan to {city}?" A subscription hires in one
 * city, set once; after that only support can change it. Shown wherever the
 * city is first set:
 *   - the job-posting plan step, before paying for a subscription (the job's city)
 *   - the location step of the first job after buying from the plans page
 *   - "Set city" in Plan details and Manage plan (no city given: a picker)
 *
 *   <CityLockDialog open onOpenChange city="Pune" onConfirm={(c) => …} />
 */

import * as React from "react"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  Button,
  Field,
  FieldLabel,
} from "@apna/design-system"
import { ChangeList, PlanPopup, PopupBody, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { lockSubscriptionCity, type Subscription } from "@/hooks/use-job-slots"
import { CITIES } from "@/lib/apnahire/job-draft"

export function CityLockDialog({
  open,
  onOpenChange,
  city,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The city to lock; leave out to let the recruiter pick one. */
  city?: string
  onConfirm: (city: string) => void
}) {
  const [query, setQuery] = React.useState("")
  // Only a city from the list can be locked, not whatever was typed.
  const chosen = city ?? (CITIES.includes(query) ? query : "")
  return (
    <PlanPopup open={open} onOpenChange={onOpenChange}>
      <PopupHeader
        art="access"
        title={city ? `Lock your plan to ${city}?` : "Set your hiring city"}
        description="Your plan hires in one city."
      />
      <PopupBody>
        {!city && (
          <Field>
            <FieldLabel htmlFor="lock-city">City</FieldLabel>
            <Autocomplete items={CITIES} value={query} onValueChange={setQuery}>
              <AutocompleteInput id="lock-city" placeholder="Search city" className="text-base md:text-sm" />
              <AutocompleteContent>
                <AutocompleteEmpty>No city matches &ldquo;{query}&rdquo;</AutocompleteEmpty>
                <AutocompleteList>
                  {(c: string) => (
                    <AutocompleteItem key={c} value={c}>
                      {c}
                    </AutocompleteItem>
                  )}
                </AutocompleteList>
              </AutocompleteContent>
            </Autocomplete>
          </Field>
        )}
        <ChangeList
          title="Once locked"
          items={[
            { text: <>Every job posts in {chosen || "this city"}</> },
            { text: "Database credits work in any city" },
            { text: "Changing it needs customer support", lost: true },
          ]}
        />
      </PopupBody>
      <PopupFooter>
        <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={() => onOpenChange(false)}>
          {city ? "Go back" : "Not now"}
        </Button>
        <Button size="lg" className="w-full sm:flex-1" disabled={!chosen} onClick={() => onConfirm(chosen)}>
          Lock city
        </Button>
      </PopupFooter>
    </PlanPopup>
  )
}

/** "City not set · Set city", for Plan details and Manage plan: picks the
 *  city in CityLockDialog and locks the plan to it. */
export function SetCityAction({ sub }: { sub: Subscription }) {
  const [open, setOpen] = React.useState(false)
  return (
    <span className="flex flex-wrap items-baseline gap-x-3">
      City not set
      <Button variant="link" size="sm" onClick={() => setOpen(true)}>
        Set city
      </Button>
      <CityLockDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={(city) => {
          lockSubscriptionCity(sub, city)
          setOpen(false)
        }}
      />
    </span>
  )
}

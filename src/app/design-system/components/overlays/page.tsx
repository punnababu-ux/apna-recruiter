"use client"

import * as React from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Badge,
} from "@apna/design-system"
import { MoreHorizontal, Info, Edit, Trash, Settings } from "@apna/design-system"

export default function OverlaysComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">Category 5</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          5. Overlays & Dialogs
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tooltips, popovers, dropdown menus, modals, alert dialogs, and side drawers.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Tooltip, Popover, DropdownMenu, Dialog, Sheet } from "@apna/design-system"'}</code>
      </div>

      {/* Tooltip & Popover */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Tooltips & Popovers
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="sm">
                  <Info className="mr-1 size-3.5" />
                  Hover for Tooltip
                </Button>
              }
            />
            <TooltipContent>
              <p className="text-2xs">Useful contextual hint</p>
            </TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger
              render={
                <Button variant="secondary" size="sm">
                  Click for Popover
                </Button>
              }
            />
            <PopoverContent className="w-64 p-4 space-y-2">
              <h4 className="text-xs font-bold text-foreground">Popover Header</h4>
              <p className="text-3xs text-muted-foreground">
                Floating content panel with rich interactive elements inside.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Dropdown Menus & Actions
        </h2>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm">
                  Action Menu
                  <MoreHorizontal className="ml-1.5 size-3.5" />
                </Button>
              }
            />
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <Edit className="mr-2 size-3.5" />
                Edit Job Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-3.5" />
                Configure Criteria
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 size-3.5" />
                Delete Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modal Dialog */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Modal Dialogs
        </h2>
        <div>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="default" size="sm">
                  Open Modal Dialog
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to publish this job posting to job boards?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="default" size="sm">Confirm & Publish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

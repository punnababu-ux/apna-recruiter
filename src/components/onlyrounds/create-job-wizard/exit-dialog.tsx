"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

/**
 * Exit-confirmation dialog — fires when the user clicks the
 * top-bar "Create new job" link with unsaved changes.
 */
export function ExitDialog({
  exitDialogOpen,
  setExitDialogOpen,
  handleDiscardAndExit,
  handleSaveAndExit,
}: {
  exitDialogOpen: boolean
  setExitDialogOpen: (open: boolean) => void
  handleDiscardAndExit: () => void
  handleSaveAndExit: () => void
}) {
  return (
    <AlertDialog
      open={exitDialogOpen}
      onOpenChange={setExitDialogOpen}
    >
      {/* A forced choice: no close X (pop-ups never carry their own). */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Save them as a draft to pick up
            later, or exit without saving to discard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            variant="outline"
            onClick={handleDiscardAndExit}
          >
            Exit without saving
          </AlertDialogAction>
          <AlertDialogAction onClick={handleSaveAndExit}>
            Save &amp; exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

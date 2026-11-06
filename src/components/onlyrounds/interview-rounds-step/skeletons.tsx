import { Skeleton } from "@/components/ui/skeleton"

// ---- skeleton loaders for non-AI tasks when criteria generating ---------
// All three task types share the same 2-field skeleton structure.

function TaskBodySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Skeleton variant="ai" className="h-4 w-28" />
        <Skeleton variant="ai" className="h-9 w-48" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton variant="ai" className="h-4 w-24" />
        <Skeleton variant="ai" className="h-20 w-full" />
      </div>
    </div>
  )
}

// Aliases kept so callers don't need to change.
export const CustomTaskSkeleton = TaskBodySkeleton
export const SchedulingSkeleton = TaskBodySkeleton
export const HumanCallSkeleton = TaskBodySkeleton

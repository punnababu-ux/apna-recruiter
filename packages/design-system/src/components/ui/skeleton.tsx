import { cn } from "@/lib/utils"

function Skeleton({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "ai"
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md",
        variant === "default" && "animate-pulse bg-muted",
        variant === "ai" && "animate-ai-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

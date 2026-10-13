import { cn } from "@/lib/utils"

function Skeleton({
  className,
  variant = "default",
  inline = false,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "ai"
  /** Render as an inline-block `<span>` — for a placeholder inside running
   *  text or a `<p>`, where a `<div>` is invalid HTML. */
  inline?: boolean
}) {
  const Tag = (inline ? "span" : "div") as "div"
  return (
    <Tag
      data-slot="skeleton"
      className={cn(
        "rounded-md",
        inline && "inline-block align-middle",
        variant === "default" && "animate-pulse bg-muted",
        variant === "ai" && "animate-ai-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

import * as React from "react"
import { cn } from "@/lib/utils"

/** Shared field chrome so Input, Textarea and Select trigger look identical. */
export const fieldClassName =
  "w-full min-w-0 rounded-lg border border-input bg-white text-base text-foreground transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-[#9a9a9a] hover:border-[#cfd1d6] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/10"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClassName, "h-12 px-4", className)}
      {...props}
    />
  )
}

export { Input }

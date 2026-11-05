import { cn } from "@/lib/utils"

/**
 * VinFast wordmark rendered as a CSS mask so it inherits `currentColor`
 * (works on both the transparent-over-hero and solid header states).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="VinFast"
      className={cn("block aspect-[950/110] h-3.5 bg-current sm:h-4", className)}
      style={{
        WebkitMaskImage: "url(/images/brand/vinfast-wordmark.png)",
        maskImage: "url(/images/brand/vinfast-wordmark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  )
}

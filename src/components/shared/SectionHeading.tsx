import { cn } from "@/lib/utils"
import { Reveal } from "@/components/shared/Reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
  id?: string
  /** Optional element placed opposite the heading on wide screens (e.g. a link). */
  aside?: React.ReactNode
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, id, aside }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance sm:text-[40px] lg:text-[44px]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{description}</p>
        )}
      </div>
      {aside}
    </Reveal>
  )
}

import { Gem, ShieldCheck, Waves, Zap, type LucideIcon } from "lucide-react"

import { benefits } from "@/data/content"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"

const icons: Record<(typeof benefits)[number]["icon"], LucideIcon> = { Zap, Gem, Waves, ShieldCheck }

export function BenefitsSection() {
  return (
    <section id="vi-sao" aria-labelledby="benefits-title" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="benefits-title"
          eyebrow="Vì sao chọn VinFast"
          title="Nhiều hơn một chiếc xe điện"
          description="Một hệ sinh thái di chuyển trọn vẹn — từ công nghệ trên xe đến trạm sạc và dịch vụ hậu mãi."
        />

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title}>
                <Reveal delay={i * 0.08} className="h-full border-t pt-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

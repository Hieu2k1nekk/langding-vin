"use client"

import { ArrowRight, BadgePercent, Calculator, CarFront, Check, Landmark, type LucideIcon } from "lucide-react"

import { promotions } from "@/data/content"
import type { NeedValue } from "@/data/content"
import { requestConsultation } from "@/lib/consultation-events"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"

const icons: Record<(typeof promotions)[number]["icon"], LucideIcon> = { BadgePercent, Landmark, Calculator, CarFront }

const ctaByPromotion: Record<(typeof promotions)[number]["id"], { label: string; need: NeedValue }> = {
  "uu-dai": { label: "Nhận thông tin ưu đãi", need: "mua-xe" },
  "tra-gop": { label: "Tư vấn trả góp", need: "tra-gop" },
  "tai-chinh": { label: "Gặp chuyên viên tài chính", need: "tra-gop" },
  "lai-thu": { label: "Đặt lịch lái thử", need: "lai-thu" },
}

export function PromotionSection() {
  return (
    <section id="uu-dai" aria-labelledby="promotions-title" className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading
          id="promotions-title"
          eyebrow="Ưu đãi & chính sách"
          title="Sở hữu VinFast dễ dàng hơn bao giờ hết"
          description="Chương trình ưu đãi và chính sách tài chính được cập nhật theo từng thời điểm. Liên hệ đại lý để nhận thông tin mới nhất."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 xl:grid-cols-4">
          {promotions.map((promo, i) => {
            const Icon = icons[promo.icon]
            const cta = ctaByPromotion[promo.id]
            return (
              <li key={promo.id}>
                <Reveal
                  delay={(i % 4) * 0.08}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-surface text-foreground">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {promo.placeholder && (
                      <span className="rounded-full border border-dashed border-amber-400 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">
                        Cần cập nhật
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{promo.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{promo.description}</p>
                  <ul className="mt-5 space-y-2.5 border-t pt-5">
                    {promo.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => requestConsultation({ need: cta.need })}
                    className="group mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-medium text-primary"
                  >
                    {cta.label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Nội dung có nhãn “Cần cập nhật” là thông tin mẫu — đại lý cần thay bằng chương trình thực tế đang áp dụng.
        </p>
      </div>
    </section>
  )
}

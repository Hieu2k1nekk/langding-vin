"use client"

import { ArrowRight, PlugZap, RefreshCw, ShieldCheck, Ticket, type LucideIcon } from "lucide-react"

import { promotions } from "@/data/content"
import { requestConsultation } from "@/lib/consultation-events"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"

const icons: Record<(typeof promotions)[number]["icon"], LucideIcon> = { ShieldCheck, RefreshCw, Ticket, PlugZap }

export function PromotionSection() {
  return (
    <section id="uu-dai" aria-labelledby="promotions-title" className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading
          id="promotions-title"
          eyebrow="Ưu đãi & chính sách"
          title="Chương trình ưu đãi đang áp dụng"
          description="Mức ưu đãi tính theo giá bán lẻ đề xuất (MSRP) của VinFast. Liên hệ đại lý để được hướng dẫn điều kiện và hồ sơ áp dụng."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 xl:grid-cols-4">
          {promotions.map((promo, i) => {
            const Icon = icons[promo.icon]
            return (
              <li key={promo.id}>
                <Reveal
                  delay={(i % 4) * 0.08}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-7"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-surface text-foreground">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg leading-snug font-semibold tracking-tight">{promo.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{promo.eligibility}</p>

                  <dl className="mt-5 divide-y divide-border border-t">
                    {promo.tiers.map((tier) => (
                      <div key={tier.models} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-sm leading-snug">{tier.models}</dt>
                        <dd className="shrink-0 text-right text-[15px] font-semibold tracking-tight text-primary">
                          {tier.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {promo.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{promo.note}</p>}

                  <button
                    type="button"
                    onClick={() => requestConsultation({ need: "mua-xe" })}
                    className="group mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-medium text-primary"
                  >
                    {promo.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Chương trình có thể thay đổi hoặc kết thúc sớm theo chính sách của VinFast. Vui lòng liên hệ đại lý để xác nhận
          điều kiện áp dụng tại thời điểm mua xe.
        </p>
      </div>
    </section>
  )
}

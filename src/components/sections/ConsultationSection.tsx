import { Clock, MapPin, MessageCircle, Phone } from "lucide-react"

import { siteConfig, CONSULTATION_ANCHOR } from "@/config/site"
import { Reveal } from "@/components/shared/Reveal"
import { ConsultationForm } from "@/components/sections/ConsultationForm"

const contacts = [
  { icon: Phone, label: "Hotline tư vấn", value: siteConfig.hotline.display, href: `tel:${siteConfig.hotline.tel}` },
  { icon: MessageCircle, label: "Zalo", value: siteConfig.sales.display, href: siteConfig.social.zalo },
  { icon: Clock, label: "Giờ làm việc", value: siteConfig.openingHours },
  { icon: MapPin, label: "Showroom", value: siteConfig.address, href: siteConfig.mapUrl },
]

export function ConsultationSection() {
  return (
    <section id={CONSULTATION_ANCHOR} aria-labelledby="consultation-title" className="section-y bg-surface">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Đăng ký tư vấn</p>
          <h2
            id="consultation-title"
            className="mt-4 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance sm:text-[40px] lg:text-[44px]"
          >
            Nhận báo giá & đặt lịch lái thử
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            Để lại thông tin, chuyên viên của {siteConfig.dealerName} sẽ liên hệ tư vấn dòng xe, báo giá lăn bánh và
            phương án tài chính phù hợp nhất với bạn.
          </p>

          <ul className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
            {contacts.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-foreground shadow-soft">
                    <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{label}</span>
                    <span className="mt-0.5 block text-[15px] font-medium break-words">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 transition-colors hover:text-primary"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
          <ConsultationForm />
        </Reveal>
      </div>
    </section>
  )
}

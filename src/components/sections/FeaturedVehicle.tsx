"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Keyboard } from "swiper/modules"
import type { Swiper as SwiperInstance } from "swiper"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"
import "swiper/css"

import { featuredVehicle } from "@/data/content"
import { formatPrice, getVehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { requestConsultation } from "@/lib/consultation-events"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"

const GALLERY_SIZES = "(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
const noopSubscribe = () => () => {}

/** Swiper reads the clock while rendering, so it can only mount on the client (Cache Components prerender). */
function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}

export function FeaturedVehicle() {
  const mounted = useMounted()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [active, setActive] = useState(0)
  const vehicle = getVehicle(featuredVehicle.vehicleId)
  const gallery = featuredVehicle.gallery

  return (
    <section id="noi-bat" aria-labelledby="featured-title" className="section-y bg-surface">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Gallery */}
        <Reveal className="min-w-0 lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl bg-[#e4e6ea]">
            {mounted ? (
              <Swiper
                modules={[A11y, Keyboard]}
                onSwiper={setSwiper}
                onSlideChange={(s) => setActive(s.activeIndex)}
                keyboard={{ enabled: true, onlyInViewport: true }}
                a11y={{ prevSlideMessage: "Ảnh trước", nextSlideMessage: "Ảnh tiếp theo" }}
                speed={600}
                className="aspect-[4/3] sm:aspect-[16/10]"
              >
                {gallery.map((img) => (
                  <SwiperSlide key={img.src}>
                    <div className="relative h-full w-full">
                      <Image src={img.src} alt={img.alt} fill sizes={GALLERY_SIZES} className="object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                <Image src={gallery[0].src} alt={gallery[0].alt} fill sizes={GALLERY_SIZES} className="object-cover" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4 sm:p-5">
              <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {gallery[active].label} · {active + 1}/{gallery.length}
              </span>
              <div className="pointer-events-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => swiper?.slidePrev()}
                  disabled={active === 0}
                  aria-label="Ảnh trước"
                  className="grid size-10 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => swiper?.slideNext()}
                  disabled={active === gallery.length - 1}
                  aria-label="Ảnh tiếp theo"
                  className="grid size-10 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white disabled:opacity-40"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="Chọn ảnh">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => swiper?.slideTo(i)}
                aria-label={`Xem ảnh: ${img.label}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-surface transition",
                  i === active ? "ring-foreground" : "ring-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 170px, 25vw" className="object-cover" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="eyebrow">{featuredVehicle.eyebrow}</p>
          <h2 id="featured-title" className="mt-4 text-[32px] leading-tight font-semibold tracking-[-0.025em] sm:text-[40px] lg:text-[44px]">
            {featuredVehicle.title}
          </h2>
          <p className="mt-2 text-lg text-foreground/80">{featuredVehicle.subtitle}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{featuredVehicle.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
            {featuredVehicle.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col-reverse justify-end bg-white p-4 sm:p-5">
                <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-[13px]">{spec.label}</dt>
                <dd className="text-[26px] font-semibold tracking-tight sm:text-[30px]">
                  {spec.value}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">{spec.unit}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
            <div className="shrink-0">
              <p className="text-xs text-muted-foreground">Giá niêm yết từ</p>
              <p className="mt-0.5 text-[28px] font-semibold tracking-tight whitespace-nowrap">
                {formatPrice(vehicle?.priceFrom ?? null)}*
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Button size="lg" onClick={() => requestConsultation({ vehicle: "vf7", need: "lai-thu" })}>
                <CalendarDays aria-hidden="true" />
                Đăng ký lái thử
              </Button>
              <Button size="lg" variant="outline" className="bg-white" onClick={() => requestConsultation({ vehicle: "vf7", need: "mua-xe" })}>
                Nhận báo giá
              </Button>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">* {vehicle?.priceNote}. Thông số mang tính tham khảo.</p>
        </Reveal>
      </div>
    </section>
  )
}

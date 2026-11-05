"use client"

import { useState } from "react"
import Image from "next/image"
import { m } from "motion/react"
import { ArrowRight } from "lucide-react"

import { heroSlides } from "@/data/content"
import { formatPrice, getVehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { requestConsultation } from "@/lib/consultation-events"
import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export function HeroSection() {
  const [index, setIndex] = useState(0)
  const activeVehicle = getVehicle(heroSlides[index].vehicleId)

  return (
    <section
      id="trang-chu"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] overflow-hidden bg-ink text-white h-[100svh] max-h-[1000px]"
    >
      {/* Background images — cross-fade between models. On phones the photo sits in a band under the
          header (a full-bleed portrait crop would cut the car down to a wheel); from lg it fills the hero. */}
      <div className="absolute inset-x-0 top-14 -z-10 h-[clamp(280px,82vw,520px)] lg:inset-0 lg:h-auto">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
        {/* Legibility overlays: fade into the dark base below lg, bottom + left scrims from lg */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:from-black/85 lg:via-black/10 lg:to-black/30" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/25 to-transparent lg:block" />
      </div>

      <div className="container-page flex w-full flex-col justify-end pt-28 pb-8 sm:pb-12 lg:pb-14">
        <div className="max-w-[720px] lg:max-w-none">
          <m.p {...fadeUp(0.1)} className="text-[11px] font-medium tracking-[0.28em] text-white/70 uppercase sm:text-xs">
            Khám phá tương lai di chuyển
          </m.p>
          <m.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="mt-5 text-[38px] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-[56px] lg:text-[64px] xl:text-[72px]"
          >
            <span className="lg:block">Chọn VinFast – </span>
            <span className="text-white/65 lg:whitespace-nowrap">Chọn phong cách sống xanh.</span>
          </m.h1>
          <m.p
            {...fadeUp(0.32)}
            className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-white/75 sm:mt-6 sm:text-[17px]"
          >
            Trải nghiệm công nghệ xe điện hiện đại, thiết kế đẳng cấp và giải pháp di chuyển thông minh dành cho bạn.
          </m.p>
          <m.div {...fadeUp(0.44)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="light" className="sm:min-w-44">
              <a href="#san-pham">
                Khám phá dòng xe
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="glass" className="sm:min-w-44" onClick={() => requestConsultation()}>
              Nhận tư vấn ngay
            </Button>
          </m.div>
        </div>

        {/* Model switcher */}
        <m.div
          {...fadeUp(0.6)}
          className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-5 sm:mt-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="hidden text-sm text-white/70 lg:block" aria-live="polite">
            <span className="font-medium text-white">VinFast {activeVehicle?.name}</span>
            <span className="mx-2 text-white/30">/</span>
            Giá niêm yết từ {formatPrice(activeVehicle?.priceFrom ?? null)}*
          </div>
          {heroSlides.length === 1 ? (
            // Single model: a plain caption — a lone tab would do nothing.
            <div className="pb-1">
              <span className="block text-[15px] font-semibold text-white sm:text-base">{heroSlides[0].label}</span>
              <span className="mt-0.5 block text-xs text-white/50">{heroSlides[0].caption}</span>
            </div>
          ) : (
            <div role="tablist" aria-label="Chọn mẫu xe hiển thị" className="grid grid-cols-3 gap-2 sm:gap-6 lg:flex lg:gap-10">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.label}
                  role="tab"
                  type="button"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className="group relative -mt-5 pt-5 pb-1 text-left"
                >
                  <span
                    className={cn(
                      "absolute inset-x-0 -top-px h-0.5 origin-left bg-white transition-transform duration-500",
                      i === index ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <span
                    className={cn(
                      "block text-[15px] font-semibold transition-colors sm:text-base",
                      i === index ? "text-white" : "text-white/50 group-hover:text-white/80",
                    )}
                  >
                    {slide.label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-white/50">{slide.caption}</span>
                </button>
              ))}
            </div>
          )}
        </m.div>
      </div>
    </section>
  )
}

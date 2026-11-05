"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Keyboard } from "swiper/modules"
import type { Swiper as SwiperInstance } from "swiper"
import { ArrowLeft, ArrowRight } from "lucide-react"
import "swiper/css"

import type { GalleryImage } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { useMounted } from "@/lib/use-mounted"

const SLIDE_SIZES = "(min-width: 640px) 520px, 100vw"

function Slide({ img, name, preload }: { img: GalleryImage; name: string; preload?: boolean }) {
  return (
    <div
      className={cn(
        "relative h-full w-full",
        img.fit === "contain" && "bg-gradient-to-b from-white to-[#eceef1]",
      )}
    >
      <Image
        src={img.src}
        alt={`VinFast ${name} — ${img.label}`}
        fill
        sizes={SLIDE_SIZES}
        preload={preload}
        className={img.fit === "contain" ? "object-contain px-6 pt-10 pb-8" : "object-cover"}
      />
    </div>
  )
}

type Props = {
  images: GalleryImage[]
  name: string
  swiper: SwiperInstance | null
  onSwiper: (swiper: SwiperInstance) => void
  active: number
  onActiveChange: (index: number) => void
}

/** Swipeable colour + interior gallery for the vehicle detail sheet. State lives in the sheet so the colour picker can drive it. */
export function VehicleGallery({ images, name, swiper, onSwiper, active, onActiveChange }: Props) {
  const mounted = useMounted()

  return (
    <div className="shrink-0">
      <div className="relative overflow-hidden bg-surface">
        {mounted ? (
          <Swiper
            modules={[A11y, Keyboard]}
            onSwiper={onSwiper}
            onSlideChange={(s) => onActiveChange(s.activeIndex)}
            keyboard={{ enabled: true }}
            a11y={{ prevSlideMessage: "Ảnh trước", nextSlideMessage: "Ảnh tiếp theo" }}
            speed={500}
            className="aspect-[16/11]"
          >
            {images.map((img, i) => (
              <SwiperSlide key={img.src}>
                <Slide img={img} name={name} preload={i === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="aspect-[16/11]">
            <Slide img={images[0]} name={name} preload />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4">
          <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {images[active].label} · {active + 1}/{images.length}
          </span>
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              disabled={active === 0}
              aria-label="Ảnh trước"
              className="grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white disabled:opacity-40"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              disabled={active === images.length - 1}
              aria-label="Ảnh tiếp theo"
              className="grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white disabled:opacity-40"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="snap-rail flex gap-2 overflow-x-auto px-6 pt-3 pb-1 sm:px-8"
        role="group"
        aria-label={`Chọn ảnh VinFast ${name}`}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => swiper?.slideTo(i)}
            aria-label={`Xem ảnh: ${img.label}`}
            aria-current={i === active ? "true" : undefined}
            className={cn(
              "relative my-1 aspect-[4/3] w-[72px] shrink-0 overflow-hidden rounded-lg bg-surface ring-2 ring-offset-2 transition",
              i === active ? "ring-foreground" : "ring-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="72px"
              className={img.fit === "contain" ? "object-contain p-1" : "object-cover"}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

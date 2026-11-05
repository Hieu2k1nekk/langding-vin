"use client"

import { useState } from "react"
import type { Swiper as SwiperInstance } from "swiper"
import { CalendarDays, X } from "lucide-react"

import { formatPrice, PRICE_DISCLAIMER, type Vehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { VehicleGallery } from "@/components/sections/VehicleGallery"

type Props = {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onQuote: (vehicle: Vehicle) => void
  onTestDrive: (vehicle: Vehicle) => void
  /** Element that opened the sheet; focus returns here without scrolling. */
  returnFocusRef?: React.RefObject<HTMLElement | null>
  /** Fires once the close animation has finished and focus is restored. */
  onClosed?: () => void
}

export function VehicleDetailSheet({ vehicle, open, onOpenChange, onQuote, onTestDrive, returnFocusRef, onClosed }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="gap-0 overflow-hidden border-l-0 bg-white p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-[520px] data-[side=right]:lg:max-w-[1080px]"
        // Radix's default focus restore scrolls back to the card and cancels the scroll to the form.
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          returnFocusRef?.current?.focus({ preventScroll: true })
          onClosed?.()
        }}
      >
        {/* Outside the scroll area and above the gallery so it stays reachable on phones. */}
        <SheetClose asChild>
          <button
            type="button"
            aria-label="Đóng"
            className="absolute top-3 right-3 z-30 grid size-10 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white lg:top-4 lg:right-4 lg:shadow-none"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </SheetClose>
        {vehicle && <DetailBody key={vehicle.id} vehicle={vehicle} onQuote={onQuote} onTestDrive={onTestDrive} />}
      </SheetContent>
    </Sheet>
  )
}

/** Keyed by vehicle so gallery position and colour selection reset when another vehicle opens. */
function DetailBody({ vehicle, onQuote, onTestDrive }: Pick<Props, "onQuote" | "onTestDrive"> & { vehicle: Vehicle }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [active, setActive] = useState(0)
  // Last colour shown, so the picker keeps its selection while browsing interior photos.
  const [colorIndex, setColorIndex] = useState(() => vehicle.gallery.findIndex((img) => img.color))
  const swatches = vehicle.gallery.map((img, i) => ({ ...img, index: i })).filter((img) => img.color)

  const onActiveChange = (i: number) => {
    setActive(i)
    if (vehicle.gallery[i]?.color) setColorIndex(i)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:h-full lg:overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="lg:flex lg:flex-col lg:justify-center lg:pb-4">
        <VehicleGallery
          images={vehicle.gallery}
          name={vehicle.name}
          swiper={swiper}
          onSwiper={setSwiper}
          active={active}
          onActiveChange={onActiveChange}
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-6 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:pt-10">
        <p className="eyebrow">{vehicle.segment}</p>
        <SheetTitle className="mt-2 text-[26px] font-semibold tracking-[-0.02em] lg:text-[30px]">
          VinFast {vehicle.name}
        </SheetTitle>
        <SheetDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {vehicle.description}
        </SheetDescription>

        <div className="mt-5 rounded-2xl bg-surface px-5 py-4">
          <p className="text-xs text-muted-foreground">Giá niêm yết từ</p>
          <p className="mt-0.5 text-[26px] font-semibold tracking-tight">{formatPrice(vehicle.priceFrom)}*</p>
        </div>

        <h3 className="mt-6 text-sm font-semibold">Thông số nổi bật</h3>
        <dl className="mt-3 grid grid-cols-3 gap-3 border-y py-3.5">
          {vehicle.highlights.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs text-muted-foreground">{spec.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <dl className="divide-y divide-border text-sm">
          {vehicle.versions && (
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Phiên bản</dt>
              <dd className="text-right font-medium">{vehicle.versions.join(" · ")}</dd>
            </div>
          )}
          {swatches.length > 0 && (
            <div className="flex items-center justify-between gap-4 py-3">
              <dt>
                <span className="block text-muted-foreground">Chọn màu</span>
                <span className="mt-0.5 block font-medium first-letter:uppercase">
                  {vehicle.gallery[colorIndex]?.label.replace(/^Màu /, "")}
                </span>
              </dt>
              <dd className="flex flex-wrap justify-end gap-2" role="group" aria-label={`Chọn màu VinFast ${vehicle.name}`}>
                {swatches.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => swiper?.slideTo(img.index)}
                    aria-label={img.label}
                    aria-pressed={img.index === colorIndex}
                    title={img.label}
                    className={cn(
                      "size-7 rounded-full ring-2 ring-offset-2 transition",
                      img.index === colorIndex ? "ring-foreground" : "ring-transparent hover:ring-border",
                    )}
                  >
                    <span
                      className="block size-full rounded-full border border-black/10"
                      style={{ backgroundColor: img.color }}
                    />
                  </button>
                ))}
              </dd>
            </div>
          )}
          {vehicle.premiumPaintFee && (
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Màu nâng cao</dt>
              <dd className="font-medium">+{formatPrice(vehicle.premiumPaintFee)}</dd>
            </div>
          )}
        </dl>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          * {vehicle.priceNote}. {PRICE_DISCLAIMER} Thông số mang tính tham khảo.
        </p>

        <div className="sticky bottom-0 -mx-6 mt-auto grid grid-cols-2 gap-2.5 border-t bg-white px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8">
          <Button variant="outline" size="lg" onClick={() => onTestDrive(vehicle)}>
            <CalendarDays aria-hidden="true" />
            Lái thử
          </Button>
          <Button size="lg" onClick={() => onQuote(vehicle)}>
            Nhận báo giá
          </Button>
        </div>
      </div>
    </div>
  )
}

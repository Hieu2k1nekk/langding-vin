"use client"

import Image from "next/image"
import { CalendarDays } from "lucide-react"

import { formatPrice, PRICE_DISCLAIMER, type Vehicle } from "@/data/vehicles"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"

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
        className="w-full gap-0 overflow-y-auto border-l-0 bg-white p-0 sm:max-w-[520px]"
        // Radix's default focus restore scrolls back to the card and cancels the scroll to the form.
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          returnFocusRef?.current?.focus({ preventScroll: true })
          onClosed?.()
        }}
      >
        {vehicle && (
          <>
            <div className="relative aspect-[16/11] w-full shrink-0 bg-surface">
              <Image
                src={vehicle.image.src}
                alt={vehicle.image.alt}
                fill
                sizes="(min-width: 640px) 520px, 100vw"
                className="object-cover"
                style={{ objectPosition: vehicle.image.position }}
              />
            </div>
            <div className="flex flex-1 flex-col px-6 pt-7 sm:px-8">
              <p className="eyebrow">{vehicle.segment}</p>
              <SheetTitle className="mt-3 text-[30px] font-semibold tracking-[-0.02em]">VinFast {vehicle.name}</SheetTitle>
              <SheetDescription className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {vehicle.description}
              </SheetDescription>

              <div className="mt-7 rounded-2xl bg-surface p-5">
                <p className="text-xs text-muted-foreground">Giá niêm yết từ</p>
                <p className="mt-1 text-[28px] font-semibold tracking-tight">{formatPrice(vehicle.priceFrom)}*</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{vehicle.priceNote}.</p>
              </div>

              <h3 className="mt-8 text-sm font-semibold">Thông số nổi bật</h3>
              <dl className="mt-3 divide-y divide-border">
                {vehicle.highlights.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 py-3.5 text-[15px]">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="font-medium">{spec.value}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 py-3.5 text-[15px]">
                  <dt className="text-muted-foreground">Phiên bản</dt>
                  <dd className="text-right font-medium">{vehicle.versions.join(" · ")}</dd>
                </div>
              </dl>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                * {PRICE_DISCLAIMER} Thông số mang tính tham khảo, có thể khác nhau giữa các phiên bản.
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
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

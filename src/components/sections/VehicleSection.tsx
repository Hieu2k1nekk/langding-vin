"use client"

import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import { PRICE_DISCLAIMER, vehicles, type Vehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { consultationFormEnabled, requestConsultation } from "@/lib/consultation-events"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { VehicleCard } from "@/components/sections/VehicleCard"
import { VehicleDetailSheet } from "@/components/sections/VehicleDetailSheet"

export function VehicleSection() {
  const [selected, setSelected] = useState<Vehicle | null>(null)
  const [open, setOpen] = useState(false)
  const [railIndex, setRailIndex] = useState(0)
  const railRef = useRef<HTMLUListElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const pendingPrefill = useRef<(() => void) | null>(null)

  const showDetail = (v: Vehicle) => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setSelected(v)
    setOpen(true)
  }

  const prefill = (v: Vehicle, need: "mua-xe" | "lai-thu") => {
    const run = () => requestConsultation({ vehicle: v.id, need })
    if (!open || !consultationFormEnabled) {
      setOpen(false)
      return run()
    }
    // Scrolling while the sheet is still unmounting gets cancelled; wait until it has fully closed.
    pendingPrefill.current = run
    setOpen(false)
  }

  const onSheetClosed = () => {
    pendingPrefill.current?.()
    pendingPrefill.current = null
  }

  const onRailScroll = () => {
    const rail = railRef.current
    const item = rail?.firstElementChild as HTMLElement | null | undefined
    if (!rail || !item) return
    const step = item.offsetWidth + 16
    setRailIndex(Math.min(vehicles.length - 1, Math.round(rail.scrollLeft / step)))
  }

  const scrollRailTo = (i: number) => {
    const rail = railRef.current
    const item = rail?.firstElementChild as HTMLElement | null | undefined
    if (rail && item) rail.scrollTo({ left: i * (item.offsetWidth + 16), behavior: "smooth" })
  }

  return (
    <section id="san-pham" aria-labelledby="vehicles-title" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="vehicles-title"
          eyebrow="Dòng xe VinFast"
          title="Lựa chọn hoàn hảo cho mọi hành trình"
          description="Từ mẫu xe đô thị nhỏ gọn đến SUV 7 chỗ cao cấp — tất cả đều thuần điện, êm ái và thông minh."
          aside={
            <button
              type="button"
              onClick={() => requestConsultation({ need: "mua-xe" })}
              className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-primary"
            >
              Nhận bảng giá đầy đủ
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          }
        />

        <ul
          ref={railRef}
          onScroll={onRailScroll}
          aria-label="Danh sách dòng xe"
          className="snap-rail -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8"
        >
          {vehicles.map((v, i) => (
            <li key={v.id} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <VehicleCard vehicle={v} onDetail={showDetail} onQuote={(veh) => prefill(veh, "mua-xe")} />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Rail pagination (mobile/tablet portrait only) */}
        <div className="mt-6 flex justify-center gap-1 md:hidden">
          {vehicles.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => scrollRailTo(i)}
              aria-label={`Xem VinFast ${v.name}`}
              aria-current={i === railIndex ? "true" : undefined}
              className="grid h-6 place-items-center px-1"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === railIndex ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20",
                )}
              />
            </button>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground md:mt-10">* {PRICE_DISCLAIMER}</p>
      </div>

      <VehicleDetailSheet
        vehicle={selected}
        open={open}
        onOpenChange={setOpen}
        onQuote={(v) => prefill(v, "mua-xe")}
        onTestDrive={(v) => prefill(v, "lai-thu")}
        returnFocusRef={triggerRef}
        onClosed={onSheetClosed}
      />
    </section>
  )
}

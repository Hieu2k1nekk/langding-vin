import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { formatPrice, type Vehicle } from "@/data/vehicles"
import { Button } from "@/components/ui/button"

type VehicleCardProps = {
  vehicle: Vehicle
  onDetail: (vehicle: Vehicle) => void
  onQuote: (vehicle: Vehicle) => void
}

export function VehicleCard({ vehicle, onDetail, onQuote }: VehicleCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface transition-shadow duration-500 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onDetail(vehicle)}
        className="relative block aspect-[16/11] overflow-hidden bg-gradient-to-b from-white to-[#eceef1] text-left"
        aria-label={`Xem chi tiết VinFast ${vehicle.name}`}
      >
        <Image
          src={vehicle.image.src}
          alt={vehicle.image.alt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 84vw"
          className="object-contain px-5 pt-10 pb-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {vehicle.segment}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">VinFast {vehicle.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{vehicle.tagline}</p>
          </div>
          <button
            type="button"
            onClick={() => onDetail(vehicle)}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-foreground transition-colors hover:bg-ink hover:text-white"
            aria-label={`Thông tin VinFast ${vehicle.name}`}
          >
            <ArrowUpRight className="size-[18px]" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">{vehicle.description}</p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-black/[0.06] pt-5">
          {vehicle.highlights.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs text-muted-foreground">{spec.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold tracking-tight">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-6">
          <p className="text-xs text-muted-foreground">Giá niêm yết từ</p>
          <p className="mt-0.5 text-[22px] font-semibold tracking-tight">
            {formatPrice(vehicle.priceFrom)}
            <span className="align-super text-xs text-muted-foreground">*</span>
          </p>
          {/* Always rendered so prices and buttons line up across cards in a row. */}
          <p className="mt-1 min-h-4 text-xs text-muted-foreground">
            {vehicle.premiumPaintFee ? `Màu nâng cao: +${formatPrice(vehicle.premiumPaintFee)}` : null}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Button variant="outline" onClick={() => onDetail(vehicle)}>
              Xem chi tiết
            </Button>
            <Button onClick={() => onQuote(vehicle)}>Nhận báo giá</Button>
          </div>
        </div>
      </div>
    </article>
  )
}

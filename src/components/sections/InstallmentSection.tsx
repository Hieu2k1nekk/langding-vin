"use client"

import { useId, useState } from "react"
import { Info } from "lucide-react"

import { purchaseSteps } from "@/data/content"
import { formatCurrency, vehicles } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { requestConsultation } from "@/lib/consultation-events"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"

const DOWN_PAYMENTS = [20, 30, 50, 70]
const TERMS = [3, 5, 7, 8]
/** Lãi suất GIẢ ĐỊNH chỉ để minh họa — không phải chính sách của ngân hàng/đại lý. */
const ASSUMED_RATES = [7, 9, 11]

type SegmentedProps<T extends number> = {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
  format: (v: T) => string
}

function Segmented<T extends number>({ label, options, value, onChange, format }: SegmentedProps<T>) {
  const id = useId()
  return (
    <div>
      <p id={id} className="text-sm font-medium">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={id} className="mt-2.5 grid grid-cols-4 gap-1 rounded-xl bg-surface p-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={opt === value}
            onClick={() => onChange(opt)}
            className={cn(
              "h-10 rounded-lg text-sm font-medium transition-all",
              opt === value ? "bg-white text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {format(opt)}
          </button>
        ))}
      </div>
    </div>
  )
}

export function InstallmentSection() {
  const pricedVehicles = vehicles.filter((v) => v.priceFrom)
  const [vehicleId, setVehicleId] = useState(pricedVehicles[2]?.id ?? pricedVehicles[0].id)
  const [down, setDown] = useState(30)
  const [term, setTerm] = useState(5)
  const [rate, setRate] = useState(9)

  const vehicle = pricedVehicles.find((v) => v.id === vehicleId)!
  const price = vehicle.priceFrom ?? 0
  const downAmount = Math.round((price * down) / 100)
  const loan = price - downAmount
  const months = term * 12
  // Dư nợ giảm dần: kỳ đầu = gốc chia đều + lãi trên toàn bộ dư nợ.
  const principalPerMonth = loan / months
  const firstMonth = principalPerMonth + (loan * rate) / 100 / 12
  const totalInterest = ((loan * rate) / 100 / 12) * ((months + 1) / 2)

  return (
    <section id="tra-gop" aria-labelledby="installment-title" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="installment-title"
          eyebrow="Trả góp"
          title="Ước tính khoản trả góp của bạn"
          description="Chọn mẫu xe và phương án tài chính để có con số tham khảo. Chuyên viên sẽ tư vấn gói vay chính xác theo ngân hàng và hồ sơ của bạn."
        />

        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="min-w-0 space-y-7 rounded-2xl border p-5 sm:p-8 lg:col-span-7">
            <div>
              <Label htmlFor="estimate-vehicle" className="text-sm font-medium">
                Dòng xe
              </Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger id="estimate-vehicle" className="mt-2.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pricedVehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      VinFast {v.name} — từ {formatCurrency(v.priceFrom!)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Segmented label="Trả trước" options={DOWN_PAYMENTS} value={down} onChange={setDown} format={(v) => `${v}%`} />
            <Segmented label="Thời hạn vay" options={TERMS} value={term} onChange={setTerm} format={(v) => `${v} năm`} />
            <div>
              <Segmented
                label="Lãi suất giả định (%/năm)"
                options={ASSUMED_RATES}
                value={rate}
                onChange={setRate}
                format={(v) => `${v}%`}
              />
              <p className="mt-2.5 flex gap-2 text-xs leading-relaxed text-muted-foreground">
                <Info className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                Mức lãi suất chỉ dùng để minh họa, không phải lãi suất thực tế của ngân hàng.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex min-w-0 flex-col rounded-2xl bg-ink p-6 text-white sm:p-8 lg:col-span-5">
            <p className="text-sm text-white/60">Trả hàng tháng (kỳ đầu)</p>
            <p className="mt-2 text-[36px] leading-none font-semibold tracking-tight sm:text-[44px]" aria-live="polite">
              {formatCurrency(Math.round(firstMonth))}
            </p>
            <dl className="mt-8 space-y-3.5 border-t border-white/10 pt-6 text-[15px]">
              {[
                ["Giá niêm yết tham khảo", formatCurrency(price)],
                [`Trả trước (${down}%)`, formatCurrency(downAmount)],
                ["Số tiền vay", formatCurrency(loan)],
                ["Tổng lãi ước tính", formatCurrency(Math.round(totalInterest))],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-white/60">{k}</dt>
                  <dd className="font-medium tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-white/50">
              Tính theo dư nợ giảm dần, chưa gồm lệ phí trước bạ, biển số, bảo hiểm và các chi phí lăn bánh khác.
            </p>
            <div className="mt-auto pt-8">
              <Button
                size="lg"
                variant="light"
                className="w-full"
                onClick={() => requestConsultation({ vehicle: vehicleId, need: "tra-gop" })}
              >
                Nhận phương án trả góp chi tiết
              </Button>
            </div>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-8">
          {purchaseSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08}>
                <span className="text-sm font-medium text-primary tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useId, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, startOfToday } from "date-fns"
import { vi } from "date-fns/locale"
import { AnimatePresence, m } from "motion/react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { CalendarDays, ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { needs, regions } from "@/data/content"
import { vehicles } from "@/data/vehicles"
import { cn } from "@/lib/utils"
import { onConsultationRequest } from "@/lib/consultation-events"
import { consultationSchema, type ConsultationInput, type ConsultationValues } from "@/lib/validations/consultation"
import { submitConsultation } from "@/services/consultation.service"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { fieldClassName, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const defaultValues: ConsultationInput = {
  fullName: "",
  phone: "",
  vehicle: "",
  region: "",
  need: "mua-xe",
  testDriveDate: undefined,
  note: "",
}

type FieldProps = {
  id: string
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}

function Field({ id, label, optional, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">(không bắt buộc)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-destructive">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function ConsultationForm() {
  const uid = useId()
  const ids = {
    fullName: `${uid}-name`,
    phone: `${uid}-phone`,
    vehicle: `${uid}-vehicle`,
    region: `${uid}-region`,
    need: `${uid}-need`,
    date: `${uid}-date`,
    note: `${uid}-note`,
  }
  const [submitted, setSubmitted] = useState<ConsultationValues | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [dateOpen, setDateOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    setValue,

    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput, unknown, ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues,
    mode: "onTouched",
  })

  const need = useWatch({ control, name: "need" })

  useEffect(
    () =>
      onConsultationRequest(({ vehicle, need }) => {
        setSubmitted(null)
        if (vehicle) setValue("vehicle", vehicle, { shouldValidate: true })
        if (need) setValue("need", need)
      }),
    [setValue],
  )

  useEffect(() => {
    if (need !== "lai-thu") setValue("testDriveDate", undefined)
  }, [need, setValue])

  const onSubmit = async (values: ConsultationValues) => {
    setServerError(null)
    const result = await submitConsultation(values)
    if (result.ok) {
      setSubmitted(values)
      reset(defaultValues)
      toast.success("Đã gửi yêu cầu tư vấn", { description: "Chuyên viên sẽ liên hệ với bạn trong thời gian sớm nhất." })
    } else {
      setServerError(result.message)
      toast.error("Gửi yêu cầu thất bại", { description: result.message })
    }
  }

  const describe = (key: keyof typeof errors, id: string) =>
    errors[key] ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {}

  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft sm:p-8 lg:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-success/10 text-success">
              <CircleCheck className="size-8" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Cảm ơn {submitted.fullName}!</h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Yêu cầu của bạn đã được ghi nhận. Chuyên viên tư vấn sẽ liên hệ qua số{" "}
              <span className="font-medium text-foreground">{submitted.phone}</span> trong thời gian sớm nhất.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button variant="outline" size="lg" onClick={() => setSubmitted(null)}>
                Gửi yêu cầu khác
              </Button>
              <Button asChild size="lg">
                <a href={`tel:${siteConfig.hotline.tel}`}>Gọi {siteConfig.hotline.display}</a>
              </Button>
            </div>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Form đăng ký tư vấn"
            className="grid gap-5 sm:grid-cols-2"
          >
            <Field id={ids.fullName} label="Họ và tên" error={errors.fullName?.message}>
              <Input
                id={ids.fullName}
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                {...describe("fullName", ids.fullName)}
                {...register("fullName")}
              />
            </Field>

            <Field id={ids.phone} label="Số điện thoại" error={errors.phone?.message}>
              <Input
                id={ids.phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0912 345 678"
                {...describe("phone", ids.phone)}
                {...register("phone")}
              />
            </Field>

            <Field id={ids.vehicle} label="Dòng xe quan tâm" error={errors.vehicle?.message}>
              <Controller
                control={control}
                name="vehicle"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={ids.vehicle} className="w-full" onBlur={field.onBlur} {...describe("vehicle", ids.vehicle)}>
                      <SelectValue placeholder="Chọn dòng xe" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          VinFast {v.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="chua-xac-dinh">Chưa xác định — cần tư vấn</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field id={ids.region} label="Khu vực" error={errors.region?.message}>
              <Controller
                control={control}
                name="region"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={ids.region} className="w-full" onBlur={field.onBlur} {...describe("region", ids.region)}>
                      <SelectValue placeholder="Chọn tỉnh / thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <fieldset className="sm:col-span-2">
              <legend id={ids.need} className="mb-2 text-sm font-medium">
                Nhu cầu
              </legend>
              <Controller
                control={control}
                name="need"
                render={({ field }) => (
                  <RadioGroupPrimitive.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-labelledby={ids.need}
                    className="grid gap-2.5 sm:grid-cols-3"
                  >
                    {needs.map((n) => (
                      <RadioGroupPrimitive.Item
                        key={n.value}
                        value={n.value}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 text-left transition-colors outline-none",
                          "hover:border-[#cfd1d6] focus-visible:ring-4 focus-visible:ring-primary/10",
                          "data-[state=checked]:border-primary data-[state=checked]:bg-primary-soft/60",
                        )}
                      >
                        <span className="grid size-[18px] shrink-0 place-items-center rounded-full border-[1.5px] border-[#c4c6cc] transition-colors group-data-[state=checked]:border-primary">
                          <span className="size-2 scale-0 rounded-full bg-primary transition-transform group-data-[state=checked]:scale-100" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium">{n.label}</span>
                          <span className="block text-xs text-muted-foreground">{n.description}</span>
                        </span>
                      </RadioGroupPrimitive.Item>
                    ))}
                  </RadioGroupPrimitive.Root>
                )}
              />
            </fieldset>

            <AnimatePresence initial={false}>
              {need === "lai-thu" && (
                <m.div
                  key="date"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="-m-1 overflow-hidden p-1 sm:col-span-2"
                >
                  <Field id={ids.date} label="Ngày mong muốn lái thử" optional error={errors.testDriveDate?.message}>
                    <Controller
                      control={control}
                      name="testDriveDate"
                      render={({ field }) => (
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                          <PopoverTrigger asChild>
                            <button
                              id={ids.date}
                              type="button"
                              className={cn(
                                fieldClassName,
                                "flex h-12 w-full items-center justify-between gap-3 px-4 text-left data-[state=open]:border-primary data-[state=open]:ring-4 data-[state=open]:ring-primary/10",
                              )}
                            >
                              <span className="flex items-center gap-2.5">
                                <CalendarDays className="size-[18px] text-muted-foreground" aria-hidden="true" />
                                {field.value ? (
                                  <span className="first-letter:uppercase">
                                    {format(field.value, "EEEE, dd/MM/yyyy", { locale: vi })}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">Chọn ngày</span>
                                )}
                              </span>
                              <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto rounded-xl p-2 shadow-lift">
                            <Calendar
                              mode="single"
                              locale={vi}
                              selected={field.value}
                              onSelect={(d) => {
                                field.onChange(d)
                                setDateOpen(false)
                              }}
                              disabled={{ before: startOfToday() }}
                              startMonth={startOfToday()}
                              className="[--cell-size:--spacing(10)]"
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </Field>
                </m.div>
              )}
            </AnimatePresence>

            <Field id={ids.note} label="Ghi chú" optional error={errors.note?.message} className="sm:col-span-2">
              <Textarea
                id={ids.note}
                placeholder="Phiên bản, màu sắc, thời gian liên hệ thuận tiện…"
                maxLength={500}
                {...describe("note", ids.note)}
                {...register("note")}
              />
            </Field>

            {serverError && (
              <div
                role="alert"
                className="flex gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive sm:col-span-2"
              >
                <CircleAlert className="mt-px size-4 shrink-0" aria-hidden="true" />
                <p>
                  {serverError} Hotline:{" "}
                  <a href={`tel:${siteConfig.hotline.tel}`} className="font-medium underline underline-offset-2">
                    {siteConfig.hotline.display}
                  </a>
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-1 sm:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground md:max-w-sm">
                Bằng việc gửi thông tin, bạn đồng ý để đại lý liên hệ tư vấn theo{" "}
                <a href="#chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-foreground">
                  chính sách bảo mật
                </a>
                .
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto md:min-w-48">
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                    Đang gửi…
                  </>
                ) : (
                  "Gửi yêu cầu tư vấn"
                )}
              </Button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}

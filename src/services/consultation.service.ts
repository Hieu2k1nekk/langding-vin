import { format } from "date-fns"

import { normalizeVnPhone, type ConsultationValues } from "@/lib/validations/consultation"

export type ConsultationPayload = Omit<ConsultationValues, "testDriveDate"> & {
  testDriveDate?: string
  source: string
  submittedAt: string
}

export type SubmitResult = { ok: true; id: string } | { ok: false; message: string }

/**
 * Endpoint nhận lead. Khi có API thật, đặt NEXT_PUBLIC_CONSULTATION_API
 * (VD: https://api.example.com/leads) — service sẽ tự chuyển từ mock sang gọi API.
 */
const API_ENDPOINT = process.env.NEXT_PUBLIC_CONSULTATION_API

export function toPayload(values: ConsultationValues): ConsultationPayload {
  return {
    ...values,
    phone: normalizeVnPhone(values.phone),
    // Format in local time — toISOString() would shift the date back a day in UTC+7.
    testDriveDate: values.testDriveDate ? format(values.testDriveDate, "yyyy-MM-dd") : undefined,
    source: "landing-page",
    submittedAt: new Date().toISOString(),
  }
}

async function postToApi(payload: ConsultationPayload): Promise<SubmitResult> {
  const res = await fetch(API_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) return { ok: false, message: "Máy chủ đang bận, vui lòng thử lại sau." }
  const data = (await res.json().catch(() => ({}))) as { id?: string }
  return { ok: true, id: data.id ?? crypto.randomUUID() }
}

/** Mock: giả lập độ trễ mạng. Nhập số 0900000000 để thử luồng lỗi. */
async function mockSubmit(payload: ConsultationPayload): Promise<SubmitResult> {
  await new Promise((r) => setTimeout(r, 1200))
  if (payload.phone === "0900000000") {
    return { ok: false, message: "Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi hotline." }
  }
  if (process.env.NODE_ENV !== "production") console.info("[mock] consultation lead", payload)
  return { ok: true, id: crypto.randomUUID() }
}

export async function submitConsultation(values: ConsultationValues): Promise<SubmitResult> {
  const payload = toPayload(values)
  try {
    return API_ENDPOINT ? await postToApi(payload) : await mockSubmit(payload)
  } catch {
    return { ok: false, message: "Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại." }
  }
}

import { z } from "zod"
import { needs } from "@/data/content"

/**
 * Số di động Việt Nam: 10 số, đầu 03/05/07/08/09.
 * Chấp nhận tiền tố +84 / 84 và khoảng trắng, dấu chấm, gạch ngang.
 */
const VN_PHONE_REGEX = /^0(3|5|7|8|9)\d{8}$/

export function normalizeVnPhone(raw: string): string {
  const digits = raw.replace(/[\s.\-()]/g, "")
  if (digits.startsWith("+84")) return "0" + digits.slice(3)
  if (digits.startsWith("84") && digits.length === 11) return "0" + digits.slice(2)
  return digits
}

const needValues = needs.map((n) => n.value) as [string, ...string[]]

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập họ và tên")
    .min(2, "Họ và tên quá ngắn")
    .max(60, "Họ và tên tối đa 60 ký tự")
    .regex(/^[\p{L}\s'.-]+$/u, "Họ và tên chỉ gồm chữ cái"),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .refine((v) => VN_PHONE_REGEX.test(normalizeVnPhone(v)), {
      message: "Số điện thoại không hợp lệ (VD: 0912 345 678)",
    }),
  vehicle: z.string().min(1, "Vui lòng chọn dòng xe quan tâm"),
  region: z.string().min(1, "Vui lòng chọn khu vực"),
  need: z.enum(needValues, { message: "Vui lòng chọn nhu cầu" }),
  testDriveDate: z.date().optional(),
  note: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự").optional(),
})

export type ConsultationInput = z.input<typeof consultationSchema>
export type ConsultationValues = z.output<typeof consultationSchema>

/**
 * Danh sách dòng xe — thêm / sửa / xóa xe tại đây.
 *
 * GIÁ: giá niêm yết tham khảo, tổng hợp từ báo chí (xem `priceNote`).
 * Giá thay đổi thường xuyên — BẮT BUỘC đối chiếu bảng giá chính hãng trước khi công bố.
 * THÔNG SỐ: số liệu tham khảo theo công bố của hãng, có thể khác nhau giữa các phiên bản.
 */

export type VehicleSpec = {
  label: string
  value: string
}

export type Vehicle = {
  id: string
  name: string
  segment: string
  tagline: string
  description: string
  /** Giá niêm yết thấp nhất (VNĐ). `null` → hiển thị "Liên hệ". */
  priceFrom: number | null
  priceNote: string
  image: {
    src: string
    alt: string
    /** CSS object-position để căn xe trong khung ảnh. */
    position?: string
  }
  highlights: VehicleSpec[]
  versions: string[]
}

export const vehicles: Vehicle[] = [
  {
    id: "vf3",
    name: "VF 3",
    segment: "Mini eSUV · Hạng A0",
    tagline: "Nhỏ gọn, cá tính cho phố thị",
    description:
      "Mẫu xe điện cỡ nhỏ với thiết kế vuông vức trẻ trung, dễ dàng xoay trở và đỗ xe trong đô thị đông đúc.",
    priceFrom: 285_000_000,
    priceNote: "Giá niêm yết tham khảo bản Eco, cập nhật 11/2026",
    image: {
      src: "/images/vehicles/vf3.webp",
      alt: "VinFast VF 3 màu vàng nhìn từ phía trước tại triển lãm",
      position: "50% 60%",
    },
    highlights: [
      { label: "Quãng đường", value: "~210 km" },
      { label: "Số chỗ", value: "4 chỗ" },
      { label: "Công suất", value: "43 hp" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "vf5",
    name: "VF 5",
    segment: "SUV đô thị · Hạng A",
    tagline: "Năng động, linh hoạt mỗi ngày",
    description:
      "SUV điện hạng A với khoang cabin rộng rãi, trang bị tiện nghi hiện đại, lý tưởng cho gia đình trẻ.",
    priceFrom: 529_000_000,
    priceNote: "Giá niêm yết tham khảo bản Plus, cập nhật 11/2026",
    image: {
      src: "/images/vehicles/vf5.webp",
      alt: "VinFast VF 5 màu xanh VinFast Blue góc trước bên trái",
      position: "45% 60%",
    },
    highlights: [
      { label: "Quãng đường", value: "~326 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "134 hp" },
    ],
    versions: ["Plus"],
  },
  {
    id: "vf6",
    name: "VF 6",
    segment: "SUV · Hạng B",
    tagline: "Thiết kế tinh tế, công nghệ thông minh",
    description:
      "Đường nét thanh lịch, nội thất tối giản cùng hệ thống hỗ trợ lái nâng cao — cân bằng hoàn hảo giữa phong cách và thực dụng.",
    priceFrom: 646_000_000,
    priceNote: "Giá niêm yết tham khảo bản Eco, cập nhật 11/2026",
    image: {
      src: "/images/vehicles/vf6.webp",
      alt: "VinFast VF 6 màu vàng trưng bày tại triển lãm ô tô",
      position: "55% 60%",
    },
    highlights: [
      { label: "Quãng đường", value: "~480 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "Đến 201 hp" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "vf7",
    name: "VF 7",
    segment: "SUV coupé · Hạng C",
    tagline: "Thể thao, phá cách, đầy cảm xúc",
    description:
      "Ngôn ngữ thiết kế “Asymmetric Aeroflow” đậm chất thể thao, khoang lái hướng về người lái cùng hiệu năng mạnh mẽ.",
    priceFrom: 740_000_000,
    priceNote: "Giá niêm yết tham khảo bản Eco, cập nhật 09/2026",
    image: {
      src: "/images/vehicles/vf7.webp",
      alt: "VinFast VF 7 màu xanh VinFast Blue góc trước bên phải",
      position: "50% 60%",
    },
    highlights: [
      { label: "Quãng đường", value: "~450 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "Đến 349 hp" },
    ],
    versions: ["Eco", "Plus 1 cầu", "Plus 2 cầu"],
  },
  {
    id: "vf8",
    name: "VF 8",
    segment: "SUV · Hạng D",
    tagline: "Mạnh mẽ, sang trọng, đẳng cấp",
    description:
      "SUV điện hạng D với hệ dẫn động hai mô-tơ, khả năng tăng tốc ấn tượng và không gian cao cấp cho mọi hành trình.",
    priceFrom: 898_000_000,
    priceNote: "Giá niêm yết tham khảo bản Eco, cập nhật 09/2026",
    image: {
      src: "/images/vehicles/vf8.webp",
      alt: "VinFast VF 8 màu trắng trưng bày tại triển lãm IAA 2023",
      position: "50% 60%",
    },
    highlights: [
      { label: "Quãng đường", value: "~471 km" },
      { label: "Số chỗ", value: "5 chỗ" },
      { label: "Công suất", value: "402 hp" },
    ],
    versions: ["Eco", "Plus"],
  },
  {
    id: "vf9",
    name: "VF 9",
    segment: "SUV full-size · Hạng E",
    tagline: "Đỉnh cao không gian & tiện nghi",
    description:
      "SUV điện cỡ lớn 7 chỗ với không gian ba hàng ghế rộng rãi, trang bị tiện nghi cao cấp và quãng đường di chuyển vượt trội.",
    priceFrom: 1_348_000_000,
    priceNote: "Giá niêm yết tham khảo bản Eco, cập nhật 11/2026",
    image: {
      src: "/images/vehicles/vf9.webp",
      alt: "VinFast VF 9 màu bạc trưng bày tại New York Auto Show",
      position: "50% 55%",
    },
    highlights: [
      { label: "Quãng đường", value: "~626 km" },
      { label: "Số chỗ", value: "6–7 chỗ" },
      { label: "Công suất", value: "402 hp" },
    ],
    versions: ["Eco", "Plus"],
  },
]

export const PRICE_DISCLAIMER =
  "Giá niêm yết tham khảo, đã bao gồm VAT, chưa bao gồm ưu đãi và chi phí lăn bánh. Giá có thể thay đổi theo chính sách của VinFast — vui lòng liên hệ để nhận báo giá chính xác."

export function formatPrice(value: number | null): string {
  if (value === null) return "Liên hệ"
  if (value >= 1_000_000_000) {
    const ty = value / 1_000_000_000
    return `${ty.toLocaleString("vi-VN", { maximumFractionDigits: 3 })} tỷ`
  }
  return `${Math.round(value / 1_000_000).toLocaleString("vi-VN")} triệu`
}

export function formatCurrency(value: number): string {
  return `${Math.round(value).toLocaleString("vi-VN")} ₫`
}

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id)
}

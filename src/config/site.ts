/**
 * Thông tin đại lý. Tên đại lý (`dealerName`) và `url` vẫn là placeholder — cần cập nhật trước khi triển khai.
 */
export const siteConfig = {
  name: "VinFast Showroom",
  dealerName: "Đại lý VinFast [Tên đại lý]",
  shortDescription:
    "Đại lý ủy quyền VinFast — tư vấn, báo giá, lái thử và hỗ trợ trả góp các dòng ô tô điện VinFast.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinfast-dealer.example.com",
  locale: "vi_VN",
  // Hotline và Zalo dùng chung một số
  hotline: {
    display: "086.727.1960",
    tel: "0867271960",
  },
  sales: {
    display: "086.727.1960",
    tel: "0867271960",
  },
  address: "Số 492, Đường 30/6, Phố Phúc Trì, Phường Hoa Lư, Tỉnh Ninh Bình",
  openingHours: "08:00 – 20:00, tất cả các ngày trong tuần",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Số 492 Đường 30/6, Phúc Trì, Hoa Lư, Ninh Bình"),
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61596056886051",
    zalo: "https://zalo.me/0867271960",
  },
} as const

/**
 * Bật/tắt từng section. Đặt `false` để tạm ẩn (code vẫn giữ nguyên);
 * link menu/footer trỏ tới section bị ẩn cũng tự ẩn theo.
 */
export const sectionVisibility = {
  "noi-bat": false, // Sản phẩm nổi bật (VF 7)
  "vi-sao": false, // Vì sao chọn VinFast
  "uu-dai": true, // Ưu đãi & chính sách
  "hoi-dap": false, // Câu hỏi thường gặp
  "tin-tuc": false, // Tin tức & cẩm nang
  "dang-ky": false, // Form đăng ký tư vấn — khi ẩn, các nút "Nhận báo giá"/"Lái thử" mở Zalo
} as const satisfies Record<string, boolean>

export const isSectionVisible = (id: string) =>
  sectionVisibility[id as keyof typeof sectionVisibility] ?? true

const allNavItems = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Ưu đãi", href: "#uu-dai" },
  { label: "Trả góp", href: "#tra-gop" },
  { label: "Tin tức", href: "#tin-tuc" },
  { label: "Liên hệ", href: "#lien-he" },
] as const

export const navItems = allNavItems.filter((item) => isSectionVisible(item.href.slice(1)))

/** Anchor id of the consultation form section. */
export const CONSULTATION_ANCHOR = "dang-ky"

/**
 * Thông tin đại lý — TẤT CẢ là placeholder, cần thay bằng dữ liệu thật trước khi triển khai.
 */
export const siteConfig = {
  name: "VinFast Showroom",
  dealerName: "Đại lý VinFast [Tên đại lý]",
  shortDescription:
    "Đại lý ủy quyền VinFast — tư vấn, báo giá, lái thử và hỗ trợ trả góp các dòng ô tô điện VinFast.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinfast-dealer.example.com",
  locale: "vi_VN",
  hotline: {
    display: "1900 xxxx",
    tel: "1900xxxx",
  },
  sales: {
    display: "09xx xxx xxx",
    tel: "09xxxxxxxx",
  },
  email: "tuvan@vinfast-dealer.example.com",
  address: "Số [xx], Đường [Tên đường], Quận/Huyện [xx], Tỉnh/Thành phố [xx]",
  openingHours: "08:00 – 20:00, tất cả các ngày trong tuần",
  mapUrl: "https://maps.google.com/?q=VinFast",
  social: {
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    zalo: "https://zalo.me/09xxxxxxxx",
  },
} as const

/**
 * Bật/tắt từng section. Đặt `false` để tạm ẩn (code vẫn giữ nguyên);
 * link menu/footer trỏ tới section bị ẩn cũng tự ẩn theo.
 */
export const sectionVisibility = {
  "vi-sao": false, // Vì sao chọn VinFast
  "uu-dai": false, // Ưu đãi & chính sách
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

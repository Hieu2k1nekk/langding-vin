/**
 * Nội dung tĩnh của landing page.
 * Mục có `placeholder: true` là nội dung mẫu — CẦN CẬP NHẬT theo chính sách thực tế của đại lý.
 */

export const heroSlides = [
  {
    vehicleId: "vf9",
    label: "VF 9",
    caption: "SUV full-size 7 chỗ",
    src: "/images/vehicles/vf9.webp",
    alt: "VinFast VF 9 màu bạc tại triển lãm",
    position: "60% 55%",
  },
] as const

export const featuredVehicle = {
  vehicleId: "vf7",
  eyebrow: "Mẫu xe nổi bật",
  title: "VinFast VF 7",
  subtitle: "Bản giao hưởng của thiết kế và hiệu năng.",
  description:
    "Mang ngôn ngữ thiết kế bất đối xứng đầy cảm xúc, VF 7 sở hữu dáng SUV coupé thể thao, khoang lái hướng về người điều khiển và hệ dẫn động hai cầu mạnh mẽ trên phiên bản Plus.",
  specs: [
    { value: "349", unit: "hp", label: "Công suất tối đa (Plus 2 cầu)" },
    { value: "~450", unit: "km", label: "Quãng đường mỗi lần sạc" },
    { value: "12.9", unit: "inch", label: "Màn hình giải trí trung tâm" },
    { value: "5", unit: "chỗ", label: "Không gian rộng rãi" },
  ],
  gallery: [
    {
      src: "/images/vehicles/vf7.webp",
      alt: "Ngoại thất VinFast VF 7 màu xanh, góc trước bên phải",
      label: "Ngoại thất",
    },
    {
      src: "/images/vehicles/vf7-green.webp",
      alt: "VinFast VF 7 màu xanh rêu tại triển lãm",
      label: "Phiên bản màu",
    },
    {
      src: "/images/vehicles/vf7-interior.webp",
      alt: "Khoang lái VinFast VF 7 với màn hình trung tâm",
      label: "Khoang lái",
    },
    {
      src: "/images/vehicles/vf7-cockpit.webp",
      alt: "Vô lăng và màn hình giải trí VinFast VF 7",
      label: "Tiện nghi",
    },
  ],
} as const

export const benefits = [
  {
    icon: "Zap",
    title: "Công nghệ xe điện hiện đại",
    description:
      "Nền tảng thuần điện, hệ thống hỗ trợ lái nâng cao (ADAS) và kết nối thông minh, cập nhật phần mềm từ xa.",
  },
  {
    icon: "Gem",
    title: "Thiết kế đẳng cấp",
    description:
      "Ngôn ngữ thiết kế tinh giản, sang trọng, mang dấu ấn riêng với logo chữ V đặc trưng.",
  },
  {
    icon: "Waves",
    title: "Vận hành êm ái",
    description:
      "Mô-tơ điện phản hồi tức thì, không tiếng ồn động cơ, không rung — trải nghiệm lái thư thái trên mọi cung đường.",
  },
  {
    icon: "ShieldCheck",
    title: "Hệ sinh thái & hậu mãi",
    description:
      "Mạng lưới trạm sạc rộng khắp, xưởng dịch vụ chính hãng và chính sách bảo hành, cứu hộ dành riêng cho xe điện.",
  },
] as const

/**
 * Chương trình ưu đãi — nội dung do đại lý cung cấp (11/2026).
 * MSRP = giá bán lẻ đề xuất (giá niêm yết) của VinFast.
 */
export const promotions = [
  {
    id: "cong-an-bo-doi",
    icon: "ShieldCheck",
    title: "Công an – Bộ đội và nhân viên VN POST",
    eligibility:
      "Khách hàng đang phục vụ (đã biên chế) trong Quân đội nhân dân và Công an nhân dân Việt Nam và người thân (Vợ chồng/con cái/ tứ thân phụ mẫu)",
    tiers: [
      { models: "VF 2, VF 3 & Minio Green", value: "6% MSRP" },
      { models: "VF 9, VF 8 Thế hệ mới, Lạc Hồng 900 LX, EC Van & VF Wild", value: "7% MSRP" },
      { models: "Các dòng xe còn lại", value: "9% MSRP" },
    ],
    note: null,
    cta: "Nhận tư vấn ưu đãi",
  },
  {
    id: "doi-xang-sang-dien",
    icon: "RefreshCw",
    title: "Đổi xăng sang điện",
    eligibility:
      "Khách hàng đang sở hữu xe ô tô xăng / xe máy xăng / xe máy điện VinFast / ô tô điện VinFast.",
    tiers: [
      { models: "VF 2, VF 3 & Minio Green", value: "3% MSRP" },
      { models: "VF 9, VF 8 Thế hệ mới, Lạc Hồng 900 LX, EC Van & VF Wild", value: "5% MSRP" },
      { models: "Các dòng xe còn lại", value: "9% MSRP" },
    ],
    note: null,
    cta: "Nhận tư vấn ưu đãi",
  },
  {
    id: "voucher-xe-xang",
    icon: "Ticket",
    title: "Voucher xe xăng VinFast",
    eligibility: "Khách hàng mua xe mới Fadil, Lux A, Lux SA sẽ được tặng voucher giảm giá.",
    tiers: [
      { models: "Fadil", value: "30 triệu" },
      { models: "Lux A", value: "60 triệu" },
      { models: "Lux SA", value: "80 triệu" },
    ],
    note: "Lưu ý: không cộng dồn với các chương trình khác.",
    cta: "Nhận tư vấn ưu đãi",
  },
  {
    id: "mien-phi-sac",
    icon: "PlugZap",
    title: "Miễn phí sạc",
    eligibility: "Liên hệ để nhận hướng dẫn cụ thể.",
    tiers: [
      { models: "Thời hạn", value: "Đến 10/02/2029" },
      { models: "Áp dụng", value: "Tất cả các dòng xe" },
    ],
    note: null,
    cta: "Liên hệ nhận hướng dẫn",
  },
] as const

export const purchaseSteps = [
  { title: "Đăng ký tư vấn", description: "Để lại thông tin, chuyên viên liên hệ trong vòng 15 phút." },
  { title: "Lái thử & báo giá", description: "Trải nghiệm xe thực tế và nhận báo giá chi tiết." },
  { title: "Ký hợp đồng", description: "Hoàn thiện thủ tục mua xe hoặc hồ sơ vay ngân hàng." },
  { title: "Nhận xe", description: "Bàn giao xe, hướng dẫn sử dụng và kích hoạt dịch vụ." },
] as const

export const news = [
  {
    title: "Hướng dẫn sạc xe điện tại nhà an toàn và tiết kiệm",
    excerpt: "Những lưu ý khi lắp đặt bộ sạc, lựa chọn thời điểm sạc và cách bảo vệ tuổi thọ pin.",
    category: "Kinh nghiệm",
    image: "/images/vehicles/vf5-red.webp",
    href: "#tin-tuc",
  },
  {
    title: "Chọn dòng VinFast nào phù hợp với gia đình bạn?",
    excerpt: "So sánh nhanh không gian, quãng đường và chi phí giữa các dòng VF 3 đến VF 9.",
    category: "Tư vấn",
    image: "/images/vehicles/vf3-green.webp",
    href: "#tin-tuc",
  },
  {
    title: "Quy trình mua xe trả góp: từ hồ sơ đến nhận xe",
    excerpt: "Các bước chuẩn bị giấy tờ, thẩm định khoản vay và thời gian giải ngân thông thường.",
    category: "Tài chính",
    image: "/images/vehicles/vf9-ocean.webp",
    href: "#tin-tuc",
  },
] as const

export const faqs = [
  {
    question: "Mua xe VinFast cần những thủ tục gì?",
    answer:
      "Khách hàng cá nhân cần chuẩn bị CCCD/hộ chiếu còn hiệu lực. Khách hàng doanh nghiệp cần giấy phép đăng ký kinh doanh và giấy giới thiệu. Sau khi ký hợp đồng và thanh toán, đại lý sẽ hỗ trợ toàn bộ thủ tục đăng ký, đăng kiểm và bàn giao xe.",
  },
  {
    question: "Đại lý có hỗ trợ mua xe trả góp không?",
    answer:
      "Có. Đại lý liên kết với nhiều ngân hàng để hỗ trợ vay mua xe với thủ tục nhanh gọn. Tỷ lệ trả trước, thời hạn và lãi suất phụ thuộc vào từng ngân hàng và hồ sơ của khách hàng — vui lòng đăng ký để được tư vấn phương án phù hợp.",
  },
  {
    question: "Làm thế nào để đăng ký lái thử?",
    answer:
      "Bạn chỉ cần điền form đăng ký và chọn nhu cầu “Lái thử”, hoặc gọi hotline. Chuyên viên sẽ liên hệ xác nhận dòng xe, thời gian và địa điểm lái thử phù hợp. Khi đến lái thử, vui lòng mang theo giấy phép lái xe hạng B trở lên.",
  },
  {
    question: "Làm thế nào để nhận báo giá chi tiết?",
    answer:
      "Nhấn “Nhận báo giá” trên dòng xe bạn quan tâm hoặc điền form đăng ký tư vấn. Đại lý sẽ gửi báo giá chi tiết gồm giá niêm yết, ưu đãi hiện hành và dự toán chi phí lăn bánh theo khu vực của bạn.",
  },
  {
    question: "Chính sách bảo hành xe VinFast như thế nào?",
    answer:
      "Xe và pin được bảo hành theo chính sách chính hãng của VinFast, thời hạn và điều kiện khác nhau tùy dòng xe. Chuyên viên sẽ cung cấp thông tin bảo hành chi tiết cho dòng xe bạn quan tâm. [Cập nhật chính sách bảo hành hiện hành tại đây]",
  },
] as const

export const regions = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Miền Bắc (tỉnh khác)",
  "Miền Trung (tỉnh khác)",
  "Miền Nam (tỉnh khác)",
] as const

export const needs = [
  { value: "mua-xe", label: "Mua xe", description: "Báo giá & ưu đãi" },
  { value: "lai-thu", label: "Lái thử", description: "Đặt lịch trải nghiệm" },
  { value: "tra-gop", label: "Tư vấn trả góp", description: "Phương án tài chính" },
] as const

export type NeedValue = (typeof needs)[number]["value"]

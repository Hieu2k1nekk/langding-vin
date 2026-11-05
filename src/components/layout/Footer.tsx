import { Clock, MapPin, Phone } from "lucide-react"

import { isSectionVisible, navItems, siteConfig } from "@/config/site"
import { imageCredits } from "@/data/image-credits"
import { vehicles } from "@/data/vehicles"
import { Logo } from "@/components/shared/Logo"
import { FacebookIcon, ZaloIcon } from "@/components/shared/SocialIcons"

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Zalo", href: siteConfig.social.zalo, Icon: ZaloIcon },
]

/** Cached so the footer stays statically prerenderable under Cache Components. */
async function CopyrightYear() {
  "use cache"
  return new Date().getFullYear()
}

export function Footer() {
  return (
    <footer id="lien-he" aria-labelledby="footer-title" className="scroll-mt-16 bg-ink pb-24 text-white/70 xl:pb-0">
      <h2 id="footer-title" className="sr-only">
        Liên hệ {siteConfig.dealerName}
      </h2>
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo className="h-[15px] text-white" />
          <p className="mt-6 text-[15px] font-medium text-white">{siteConfig.dealerName}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">{siteConfig.shortDescription}</p>
          <ul className="mt-6 flex gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-4">
          <p className="text-sm font-medium text-white">Liên hệ</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`tel:${siteConfig.hotline.tel}`} className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  Hotline/Zalo: <span className="font-medium text-white">{siteConfig.hotline.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>Showroom: {siteConfig.address}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {siteConfig.openingHours}
            </li>
          </ul>
        </address>

        <nav aria-label="Liên kết nhanh" className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-4">
          <div>
            <p className="text-sm font-medium text-white">Khám phá</p>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              {isSectionVisible("hoi-dap") && (
                <li>
                  <a href="#hoi-dap" className="hover:text-white">
                    Hỏi đáp
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Dòng xe</p>
            <ul className="mt-5 space-y-3 text-sm">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <a href="#san-pham" className="hover:text-white">
                    VinFast {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div id="chinh-sach-bao-mat" className="container-page scroll-mt-20 border-t border-white/10 py-8 text-xs leading-relaxed">
        <p className="font-medium text-white/80">Chính sách bảo mật</p>
        <p className="mt-2 max-w-4xl">
          Thông tin bạn cung cấp chỉ được sử dụng để tư vấn, báo giá và hỗ trợ mua xe; không chia sẻ cho bên thứ ba ngoài
          mục đích này. [Cần cập nhật: nội dung chính sách bảo mật đầy đủ của đại lý.]
        </p>
        <p className="mt-4 max-w-4xl">
          Giá, thông số và hình ảnh trên trang mang tính tham khảo. {siteConfig.dealerName} là đại lý ủy quyền; thương
          hiệu VinFast thuộc sở hữu của VinFast.
        </p>
        <details className="mt-4 max-w-4xl">
          <summary className="cursor-pointer hover:text-white/90">Nguồn hình ảnh</summary>
          <ul className="mt-2 space-y-1">
            <li>
              Ảnh các dòng xe trong mục Sản phẩm —{" "}
              <a href="https://vinfastauto.com/vn_vi" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                VinFast (vinfastauto.com)
              </a>
            </li>
            {imageCredits.map((c) => (
              <li key={c.file}>
                {c.subject} — ảnh của {c.author},{" "}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                  {c.license}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-white/10 py-6 text-xs sm:flex-row sm:justify-between">
        <p>
          © <CopyrightYear /> {siteConfig.dealerName}. Bảo lưu mọi quyền.
        </p>
        <a href="#chinh-sach-bao-mat" className="hover:text-white">
          Chính sách bảo mật
        </a>
      </div>
    </footer>
  )
}

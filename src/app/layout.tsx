import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro } from "next/font/google"

import { siteConfig } from "@/config/site"
import { vehicles } from "@/data/vehicles"
import { Providers } from "@/components/shared/Providers"
import "./globals.css"

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const title = "Đại lý VinFast chính hãng – Báo giá, lái thử & trả góp xe điện"
const description =
  "Khám phá các dòng ô tô điện VinFast VF 3, VF 5, VF 6, VF 7, VF 8, VF 9. Nhận báo giá lăn bánh, đăng ký lái thử và tư vấn trả góp tại đại lý ủy quyền VinFast."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.dealerName}` },
  description,
  keywords: ["VinFast", "xe điện", "ô tô điện", "đại lý VinFast", "giá xe VinFast", ...vehicles.map((v) => `VinFast ${v.name}`)],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.dealerName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: siteConfig.dealerName,
  description: siteConfig.shortDescription,
  url: siteConfig.url,
  telephone: siteConfig.hotline.tel,
  address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressCountry: "VN" },
  brand: { "@type": "Brand", name: "VinFast" },
  sameAs: Object.values(siteConfig.social),
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${beVietnam.variable} antialiased`}>
      <body>
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:shadow-lift"
        >
          Bỏ qua đến nội dung chính
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

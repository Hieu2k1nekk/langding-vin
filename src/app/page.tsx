import { isSectionVisible } from "@/config/site"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingContact } from "@/components/layout/FloatingContact"
import { HeroSection } from "@/components/sections/HeroSection"
import { VehicleSection } from "@/components/sections/VehicleSection"
import { FeaturedVehicle } from "@/components/sections/FeaturedVehicle"
import { BenefitsSection } from "@/components/sections/BenefitsSection"
import { PromotionSection } from "@/components/sections/PromotionSection"
import { InstallmentSection } from "@/components/sections/InstallmentSection"
import { ConsultationSection } from "@/components/sections/ConsultationSection"
import { NewsSection } from "@/components/sections/NewsSection"
import { FAQSection } from "@/components/sections/FAQSection"

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="noi-dung">
        <HeroSection />
        <VehicleSection />
        <FeaturedVehicle />
        {isSectionVisible("vi-sao") && <BenefitsSection />}
        {isSectionVisible("uu-dai") && <PromotionSection />}
        <InstallmentSection />
        {isSectionVisible("dang-ky") && <ConsultationSection />}
        {isSectionVisible("tin-tuc") && <NewsSection />}
        {isSectionVisible("hoi-dap") && <FAQSection />}
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

import { faqs } from "@/data/content"
import { siteConfig } from "@/config/site"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/shared/Reveal"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

export function FAQSection() {
  return (
    <section id="hoi-dap" aria-labelledby="faq-title" className="section-y bg-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Câu hỏi thường gặp</p>
          <h2 id="faq-title" className="mt-4 text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[40px] lg:text-[44px]">
            Giải đáp thắc mắc
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Chưa tìm thấy câu trả lời? Gọi{" "}
            <a href={`tel:${siteConfig.hotline.tel}`} className="font-medium text-foreground underline-offset-4 hover:underline">
              {siteConfig.hotline.display}
            </a>{" "}
            để được hỗ trợ trực tiếp.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-2xl bg-white px-5 shadow-soft sm:px-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`} className="border-b last:border-b-0">
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:py-6 sm:text-[17px]">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-relaxed text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

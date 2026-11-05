import Image from "next/image"

import { news } from "@/data/content"
import { Reveal } from "@/components/shared/Reveal"
import { SectionHeading } from "@/components/shared/SectionHeading"

export function NewsSection() {
  return (
    <section id="tin-tuc" aria-labelledby="news-title" className="section-y bg-white">
      <div className="container-page">
        <SectionHeading
          id="news-title"
          eyebrow="Tin tức & cẩm nang"
          title="Kiến thức cho chủ xe điện"
          description="Kinh nghiệm sử dụng, chăm sóc xe và lựa chọn tài chính — được đội ngũ đại lý tổng hợp."
        />

        <ul className="snap-rail -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {news.map((post, i) => (
            <li key={post.title} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative h-full">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-surface">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 400px, (min-width: 768px) 31vw, 84vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                    />
                  </div>
                  <p className="mt-5 text-xs font-medium tracking-wide text-primary uppercase">{post.category}</p>
                  <h3 className="mt-2 text-lg leading-snug font-semibold tracking-tight">
                    {/* Bài viết chi tiết: thay href khi có trang tin tức. */}
                    <a href={post.href} className="after:absolute after:inset-0 hover:text-primary">
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

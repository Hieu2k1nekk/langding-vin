"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, m } from "motion/react"
import { ArrowUp, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { requestConsultation } from "@/lib/consultation-events"
import { Button } from "@/components/ui/button"
import { ZaloIcon } from "@/components/shared/SocialIcons"

/** Visible once the visitor has scrolled past most of the hero. */
function usePastHero() {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return past
}

const ease = [0.22, 1, 0.36, 1] as const

export function FloatingContact() {
  const visible = usePastHero()

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile / tablet: bottom action bar */}
          <m.div
            key="bar"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl xl:hidden"
          >
            <div className="mx-auto grid max-w-lg grid-cols-[auto_1fr_1fr] gap-2.5">
              <a
                href={siteConfig.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Zalo"
                className="grid size-12 place-items-center rounded-lg border text-[#0068ff]"
              >
                <ZaloIcon className="size-7" />
              </a>
              <Button asChild variant="outline" size="lg" className="min-w-0 px-3">
                <a href={`tel:${siteConfig.hotline.tel}`}>
                  <Phone aria-hidden="true" />
                  Gọi ngay
                </a>
              </Button>
              <Button size="lg" className="min-w-0 px-3" onClick={() => requestConsultation({ need: "mua-xe" })}>
                Nhận báo giá
              </Button>
            </div>
          </m.div>

          {/* Desktop: floating buttons */}
          <m.div
            key="fab"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease }}
            className="fixed right-5 bottom-6 z-40 hidden flex-col items-end gap-3 xl:flex"
          >
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat Zalo"
              className="grid size-12 place-items-center rounded-full bg-white text-[#0068ff] shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <ZaloIcon className="size-7" />
            </a>
            <a
              href={`tel:${siteConfig.hotline.tel}`}
              aria-label={`Gọi hotline ${siteConfig.hotline.display}`}
              title={siteConfig.hotline.display}
              className="grid size-12 place-items-center rounded-full bg-primary text-white shadow-lift transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              <Phone className="size-[18px]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Lên đầu trang"
              className="grid size-12 place-items-center rounded-full bg-white text-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp className="size-[18px]" aria-hidden="true" />
            </button>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}

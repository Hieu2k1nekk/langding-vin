"use client"

import { useEffect, useState } from "react"
import { m } from "motion/react"
import { ArrowRight, Menu, Phone } from "lucide-react"

import { navItems, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { consultationFormEnabled, requestConsultation } from "@/lib/consultation-events"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/shared/Logo"

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return scrolled
}

/** Tracks which nav section currently sits in the upper part of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const sectionIds = navItems.map((i) => i.href.slice(1))

export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const solid = scrolled || open

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    // Wait for the sheet to release its scroll lock before scrolling.
    window.setTimeout(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
      history.replaceState(null, "", href)
    }, open ? 260 : 0)
  }

  const openConsultation = () => {
    setOpen(false)
    if (!consultationFormEnabled) return requestConsultation()
    window.setTimeout(() => requestConsultation(), open ? 260 : 0)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-white/90 text-foreground shadow-[0_1px_0_var(--border)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent text-white",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href="#trang-chu" onClick={(e) => goTo(e, "#trang-chu")} className="shrink-0 py-2" aria-label="VinFast — Trang chủ">
          <Logo className="h-[13px] sm:h-[15px]" />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => goTo(e, item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 text-[14px] font-medium transition-colors",
                      solid ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
                      isActive && (solid ? "text-foreground" : "text-white"),
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <m.span
                        layoutId="nav-indicator"
                        className={cn("absolute inset-x-3.5 -bottom-0.5 h-px", solid ? "bg-foreground" : "bg-white")}
                        transition={{ type: "spring", stiffness: 400, damping: 36 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${siteConfig.hotline.tel}`}
            className={cn(
              "hidden items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-medium transition-colors xl:flex",
              solid ? "text-foreground hover:text-primary" : "text-white hover:text-white/80",
            )}
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.hotline.display}
          </a>
          <Button
            size="sm"
            variant={solid ? "default" : "light"}
            className="hidden h-10 px-4 sm:inline-flex"
            onClick={openConsultation}
          >
            Đăng ký tư vấn
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("-mr-2.5 lg:hidden", !solid && "text-white hover:bg-white/10")}
                aria-label="Mở menu"
              >
                <Menu className="size-[22px]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full gap-0 border-l-0 bg-white p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Điều hướng trang và liên hệ đại lý</SheetDescription>
              <div className="flex h-16 items-center border-b px-5">
                <Logo className="h-[13px] text-foreground" />
              </div>
              <nav aria-label="Điều hướng di động" className="flex-1 overflow-y-auto px-5 py-4">
                <ul>
                  {navItems.map((item, i) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={open ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => goTo(e, item.href)}
                        className={cn(
                          "flex items-center justify-between border-b border-border/70 py-4 text-[22px] font-medium tracking-tight",
                          active === item.href.slice(1) ? "text-foreground" : "text-foreground/60",
                        )}
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-3 border-t bg-surface px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <a href={`tel:${siteConfig.hotline.tel}`} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft">
                  <span className="grid size-10 place-items-center rounded-full bg-primary-soft text-primary">
                    <Phone className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Hotline tư vấn</span>
                    <span className="block text-lg font-semibold">{siteConfig.hotline.display}</span>
                  </span>
                </a>
                <Button size="lg" className="w-full" onClick={openConsultation}>
                  Đăng ký tư vấn
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

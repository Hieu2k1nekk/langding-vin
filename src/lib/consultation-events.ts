import { CONSULTATION_ANCHOR, isSectionVisible, siteConfig } from "@/config/site"
import type { NeedValue } from "@/data/content"

export type ConsultationPrefill = { vehicle?: string; need?: NeedValue }

const EVENT = "consultation:prefill"

/** False while the form section is hidden — CTAs then open Zalo chat instead. */
export const consultationFormEnabled = isSectionVisible(CONSULTATION_ANCHOR)

/** Scroll to the form and prefill it — lets any CTA on the page target the form without prop drilling. */
export function requestConsultation(prefill: ConsultationPrefill = {}) {
  if (!consultationFormEnabled) {
    // Must run synchronously inside the click handler, or the popup blocker stops it.
    window.open(siteConfig.social.zalo, "_blank", "noopener,noreferrer")
    return
  }
  window.dispatchEvent(new CustomEvent<ConsultationPrefill>(EVENT, { detail: prefill }))
  // Wait for the prefill to render: Motion measures height:auto layouts by restoring
  // window.scrollY, which would cancel a smooth scroll started in the same frame.
  window.setTimeout(() => {
    requestAnimationFrame(() => {
      document.getElementById(CONSULTATION_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, 50)
}

export function onConsultationRequest(handler: (prefill: ConsultationPrefill) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<ConsultationPrefill>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

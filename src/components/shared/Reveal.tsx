"use client"

import { m, type HTMLMotionProps } from "motion/react"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** Vertical offset in px the element travels while fading in. */
  y?: number
}

/** Fades content in once when it scrolls into view. */
export function Reveal({ delay = 0, y = 20, children, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </m.div>
  )
}

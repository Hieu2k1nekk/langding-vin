"use client"

import { LazyMotion, MotionConfig, domAnimation } from "motion/react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!rounded-xl !border-border !shadow-lift !font-sans !text-[14px]",
              description: "!text-muted-foreground",
            },
          }}
        />
      </MotionConfig>
    </LazyMotion>
  )
}

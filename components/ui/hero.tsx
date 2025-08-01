"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroProps {
  title: ReactNode
  description?: ReactNode
  image?: string
  video?: string
  children?: ReactNode
  className?: string
  overlay?: boolean
  height?: "small" | "medium" | "large" | "full"
  position?: "center" | "top" | "bottom"
}

export function Hero({
  title,
  description,
  image,
  video,
  children,
  className,
  overlay = true,
  height = "medium",
  position = "center",
}: HeroProps) {
  const heightClasses = {
    small: "min-h-[40vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[80vh]",
    full: "min-h-screen",
  }

  const positionClasses = {
    center: "items-center",
    top: "items-start pt-24",
    bottom: "items-end pb-24",
  }

  return (
    <section className={cn("relative flex w-full", heightClasses[height], positionClasses[position], className)}>
      {/* Background Image or Video */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Image src={image || "/placeholder.svg"} alt="" fill priority className="object-cover" sizes="100vw" />
          {overlay && <div className="absolute inset-0 bg-background/70" />}
        </div>
      )}

      {video && (
        <div className="absolute inset-0 w-full h-full">
          <video autoPlay muted loop playsInline className="object-cover w-full h-full">
            <source src={video} type="video/mp4" />
          </video>
          {overlay && <div className="absolute inset-0 bg-background/70" />}
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {typeof title === "string" ? (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              {title}
            </motion.h1>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {title}
            </motion.div>
          )}

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-xl text-foreground/80"
            >
              {typeof description === "string" ? <p>{description}</p> : description}
            </motion.div>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

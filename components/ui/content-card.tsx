"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentCardProps {
  title: string
  description?: string
  image?: string
  icon?: ReactNode
  link?: string
  className?: string
  imageAspect?: "square" | "video" | "wide" | "portrait"
  hoverEffect?: boolean
  index?: number
}

export function ContentCard({
  title,
  description,
  image,
  icon,
  link,
  className,
  imageAspect = "video",
  hoverEffect = true,
  index = 0,
}: ContentCardProps) {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
  }

  const cardContent = (
    <>
      {image && (
        <div className={cn("relative overflow-hidden rounded-t-lg", aspectRatioClasses[imageAspect])}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {icon && <div className="mb-4 text-primary">{icon}</div>}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        {description && <p className="text-foreground/70">{description}</p>}
        {link && (
          <div className="mt-4 flex items-center text-primary font-medium">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "bg-card border border-border rounded-lg overflow-hidden",
        hoverEffect && "group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        className,
      )}
    >
      {link ? (
        <Link href={link} className="block h-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}

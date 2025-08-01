"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedTechIconProps {
  icon: LucideIcon
  color?: string
  size?: number
  pulseEffect?: boolean
  rotateEffect?: boolean
  hoverScale?: number
  className?: string
}

export default function AnimatedTechIcon({
  icon: Icon,
  color = "#3b82f6",
  size = 24,
  pulseEffect = false,
  rotateEffect = false,
  hoverScale = 1.2,
  className,
}: AnimatedTechIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: hoverScale,
      rotate: rotateEffect ? 10 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        duration: 1.5,
      },
    },
  }

  return (
    <motion.div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={iconVariants}
      initial="initial"
      animate={pulseEffect ? "pulse" : isHovered ? "hover" : "initial"}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1.5 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: color }}
        />
      )}
      <Icon size={size} color={color} />
    </motion.div>
  )
}

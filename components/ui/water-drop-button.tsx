"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface WaterDropButtonProps {
  children: ReactNode
  onClick?: () => void
  size?: "small" | "medium" | "large"
  className?: string
}

const WaterDropButton = ({ children, onClick, size = "medium", className = "" }: WaterDropButtonProps) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-medium text-white ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      {/* Reflective highlight */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
        initial={{ x: "-100%", y: "-100%" }}
        whileHover={{ x: "100%", y: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Water drop effect */}
      <motion.div
        className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      />

      {/* Button text */}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.button>
  )
}

export default WaterDropButton

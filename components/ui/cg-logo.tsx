"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CGLogoProps {
  className?: string
}

export default function CGLogo({ className }: CGLogoProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-white font-bold text-xl tracking-tight">CG</span>
    </motion.div>
  )
}

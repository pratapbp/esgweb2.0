"use client"

import { motion } from "framer-motion"

interface CoreValuePillProps {
  label: string
  color: string
  delay?: number
}

const CoreValuePill = ({ label, color, delay = 0 }: CoreValuePillProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="relative"
    >
      <div className={`px-4 py-2 rounded-full ${color} text-white font-medium shadow-lg`}>
        {/* Reflective highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>

        {/* Water drop effect */}
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />

        <span className="relative z-10">{label}</span>
      </div>
    </motion.div>
  )
}

export default CoreValuePill

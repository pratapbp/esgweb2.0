"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AiCapabilityCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay?: number
}

const AiCapabilityCard = ({ title, description, icon, color, delay = 0 }: AiCapabilityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100"></div>

      <div className="relative h-full p-6 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden">
        {/* Reflective highlight */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

        <div className="flex items-start">
          {/* Icon with gradient background */}
          <div className="relative z-10 mr-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10">
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
              className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            >
              {icon}
            </motion.div>
          </div>

          <div className="flex-1">
            <h3 className="relative z-10 text-lg font-bold mb-2">{title}</h3>
            <p className="relative z-10 text-foreground/80 text-sm">{description}</p>
          </div>
        </div>

        {/* Water drop effect */}
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      </div>
    </motion.div>
  )
}

export default AiCapabilityCard

"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Brain, Cloud, Zap, Cpu, Database, Globe, Shield, Code, LineChart } from "lucide-react"

interface GlassCardProps {
  title: string
  description: string
  icon: string
  delay?: number
}

const GlassCard = ({ title, description, icon, delay = 0 }: GlassCardProps) => {
  const icons: Record<string, React.ReactNode> = {
    Brain: <Brain className="w-8 h-8" />,
    Cloud: <Cloud className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Cpu: <Cpu className="w-8 h-8" />,
    Database: <Database className="w-8 h-8" />,
    Globe: <Globe className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Code: <Code className="w-8 h-8" />,
    LineChart: <LineChart className="w-8 h-8" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
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

        {/* Icon with gradient background */}
        <div className="relative z-10 mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm border border-white/10">
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
            className="text-blue-500 dark:text-blue-400"
          >
            {icons[icon]}
          </motion.div>
        </div>

        <h3 className="relative z-10 text-xl font-bold mb-2">{title}</h3>
        <p className="relative z-10 text-foreground/80">{description}</p>

        {/* Water drop effect */}
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
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

export default GlassCard

"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Database, Cloud, Shield, Cpu, Code, BarChart, Layers, Workflow } from "lucide-react"

interface FloatingIcon {
  icon: React.ReactNode
  x: number
  y: number
  size: number
  speed: number
  color: string
  delay: number
}

export default function FloatingTechIcons() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<FloatingIcon[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    // Create floating icons
    iconsRef.current = [
      {
        icon: <Database />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#3b82f6",
        delay: Math.random() * 2,
      },
      {
        icon: <Cloud />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#60a5fa",
        delay: Math.random() * 2,
      },
      {
        icon: <Shield />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#4f46e5",
        delay: Math.random() * 2,
      },
      {
        icon: <Cpu />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#8b5cf6",
        delay: Math.random() * 2,
      },
      {
        icon: <Code />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#ec4899",
        delay: Math.random() * 2,
      },
      {
        icon: <BarChart />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#f59e0b",
        delay: Math.random() * 2,
      },
      {
        icon: <Layers />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#10b981",
        delay: Math.random() * 2,
      },
      {
        icon: <Workflow />,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 20 + Math.random() * 10,
        speed: 0.5 + Math.random() * 0.5,
        color: "#6366f1",
        delay: Math.random() * 2,
      },
    ]
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {iconsRef.current.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: icon.x,
            y: icon.y,
            opacity: 0,
          }}
          animate={{
            x: [icon.x, icon.x + 50, icon.x - 30, icon.x],
            y: [icon.y, icon.y - 40, icon.y + 60, icon.y],
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.8, 1, 0.9, 0.7],
          }}
          transition={{
            duration: 15 * icon.speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: icon.delay,
            ease: "easeInOut",
          }}
          style={{
            color: icon.color,
            fontSize: icon.size,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  )
}

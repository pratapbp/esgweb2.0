"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface MetricProps {
  value: number
  suffix?: string
  label: string
  delay?: number
  duration?: number
  color: string
}

const Metric = ({ value, suffix = "", label, delay = 0, duration = 2, color }: MetricProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const increment = end / 100
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / (duration * 1000), 1)

      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      start = Math.min(Math.floor(easedProgress * end), end)
      setCount(start)

      if (start === end) {
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, duration, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 ${color} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100`}
      ></div>

      <div className="relative p-8 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden text-center">
        {/* Reflective highlight */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

        <div className="relative z-10">
          <div className="text-4xl md:text-5xl font-bold mb-2">
            <span ref={countRef}>{count}</span>
            {suffix}
          </div>
          <p className="text-foreground/80">{label}</p>
        </div>

        {/* Water drop effect */}
        <motion.div
          className={`absolute bottom-0 right-0 w-32 h-32 ${color.replace("/20", "/10")} rounded-full blur-2xl`}
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

export default function AIMetricsSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Impact</span>{" "}
            in Numbers
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Measurable results that demonstrate our commitment to excellence and client success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Metric value={200} suffix="+" label="Enterprise Clients" delay={0.1} color="bg-blue-500/20" />
          <Metric value={95} suffix="%" label="Client Retention Rate" delay={0.2} color="bg-violet-500/20" />
          <Metric value={50} suffix="+" label="SAP Implementations" delay={0.3} color="bg-emerald-500/20" />
          <Metric value={30} suffix="%" label="Avg. Efficiency Improvement" delay={0.4} color="bg-amber-500/20" />
        </div>
      </div>
    </section>
  )
}

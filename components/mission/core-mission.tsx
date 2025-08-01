"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Rocket, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export function CoreMission() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.1) 50%, transparent 60%)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            Core Mission Pillars
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Foundation for <span className="text-emerald-600">Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ESG Inc is built on three fundamental pillars that guide every transformation we deliver, ensuring
            sustainable value creation and lasting business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <CoreValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CoreValue {
  title: string
  description: string
  icon: React.ElementType
  gradient: string
  bgColor: string
}

const coreValues: CoreValue[] = [
  {
    title: "Enterprise Excellence",
    description:
      "We drive operational excellence across SAP landscapes, optimizing processes, systems, and technologies to deliver measurable business outcomes.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-400",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Intelligent Innovation",
    description:
      "We pioneer AI-enhanced SAP solutions that anticipate business needs, adapt to market changes, and accelerate sustainable growth.",
    icon: Lightbulb,
    gradient: "from-teal-500 to-emerald-400",
    bgColor: "bg-teal-50 border-teal-200",
  },
  {
    title: "Sustainable Transformation",
    description:
      "We build lasting value through SAP transformations that evolve with your business, ensuring long-term competitive advantages.",
    icon: Rocket,
    gradient: "from-emerald-600 to-green-500",
    bgColor: "bg-green-50 border-green-200",
  },
]

function CoreValueCard({ value, index }: { value: CoreValue; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "border rounded-2xl p-8 h-full hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group",
        value.bgColor,
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
          "bg-gradient-to-br",
          value.gradient,
        )}
      >
        <value.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed">{value.description}</p>
    </motion.div>
  )
}

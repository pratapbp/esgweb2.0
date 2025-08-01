"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Brain, Zap, TrendingUp, BarChart, Factory, Shield } from "lucide-react"

export default function ManufacturingAIServices() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const services = [
    {
      title: "AI-Powered Predictive Maintenance",
      description:
        "Reduce downtime by up to 45% with machine learning algorithms that predict equipment failures before they occur.",
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      image: "/images/manufacturing/predictive-maintenance.jpg",
    },
    {
      title: "Intelligent Quality Control",
      description: "Improve product quality with computer vision and AI that detects defects with 99.8% accuracy.",
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      image: "/images/manufacturing/quality-control.jpg",
    },
    {
      title: "Supply Chain Optimization",
      description:
        "Reduce inventory costs by 30% with AI algorithms that optimize inventory levels and predict supply chain disruptions.",
      icon: <TrendingUp className="h-8 w-8 text-green-400" />,
      image: "/images/manufacturing/supply-chain.jpg",
    },
    {
      title: "Energy Optimization",
      description:
        "Reduce energy consumption by 25% with AI that optimizes energy usage based on production schedules and demand.",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      image: "/images/manufacturing/energy-optimization.jpg",
    },
    {
      title: "Production Planning",
      description:
        "Increase throughput by 20% with AI algorithms that optimize production schedules and resource allocation.",
      icon: <Factory className="h-8 w-8 text-red-400" />,
      image: "/images/manufacturing/production-planning.jpg",
    },
    {
      title: "Performance Analytics",
      description: "Gain real-time insights into manufacturing performance with AI-powered dashboards and analytics.",
      icon: <BarChart className="h-8 w-8 text-blue-400" />,
      image: "/images/manufacturing/performance-analytics.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <Brain className="mr-2 h-4 w-4" />
            AI-Powered Solutions
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforming Manufacturing with <span className="gradient-text">Artificial Intelligence</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered solutions help manufacturers improve efficiency, quality, and innovation across their
            operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="relative h-64 rounded-t-xl overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg?height=300&width=400&query=manufacturing ai"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                <div className="absolute top-4 left-4 p-2 rounded-lg bg-gray-900/80">{service.icon}</div>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-b-xl">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>

              {hoveredService === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded transform rotate-3"
                >
                  AI-Powered
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

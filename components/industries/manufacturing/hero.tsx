"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Cpu, BarChart3, Zap, TrendingUp } from "lucide-react"

export default function ManufacturingHero() {
  const [currentMetric, setCurrentMetric] = useState(0)

  const metrics = [
    { value: "47%", label: "Increase in operational efficiency", icon: <TrendingUp className="h-5 w-5" /> },
    { value: "68%", label: "Reduction in unplanned downtime", icon: <Zap className="h-5 w-5" /> },
    { value: "3.2x", label: "ROI from smart manufacturing", icon: <BarChart3 className="h-5 w-5" /> },
    { value: "35%", label: "Reduction in inventory costs", icon: <Factory className="h-5 w-5" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [metrics.length])

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/manufacturing/circuit-pattern.svg')] bg-repeat opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium">
              <Factory className="mr-2 h-4 w-4" />
              Industry 4.0 Solutions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Manufacturing
              </span>{" "}
              with Smart Technology
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Revolutionize your manufacturing operations with AI-powered automation, predictive maintenance, and IoT
              integration. Drive efficiency, reduce costs, and improve product quality through cutting-edge Industry 4.0
              solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Explore Solutions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-950/50 px-8 py-3 bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-600/20">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Smart Manufacturing</p>
                  <p className="font-semibold">AI-Powered Operations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-600/20">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Real-time Analytics</p>
                  <p className="font-semibold">Data-Driven Insights</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <Image
                src="/images/industries/manufacturing-hero.jpg"
                alt="Smart manufacturing facility with robots and AI integration"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>

              {/* Animated Metric Overlay */}
              <motion.div
                key={currentMetric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-600/20">{metrics[currentMetric].icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{metrics[currentMetric].value}</p>
                    <p className="text-sm text-gray-300">{metrics[currentMetric].label}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg transform rotate-3">
              <p className="font-bold text-sm">Industry 4.0</p>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white p-3 rounded-lg shadow-lg transform -rotate-2">
              <p className="font-bold text-sm">AI-Powered</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

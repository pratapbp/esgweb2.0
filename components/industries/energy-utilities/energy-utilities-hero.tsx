"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Battery, Wind, Sun, Gauge, Shield, TrendingUp, Globe, Cpu, BarChart3 } from "lucide-react"

export default function EnergyUtilitiesHero() {
  const [mounted, setMounted] = useState(false)
  const [currentMetric, setCurrentMetric] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: "Grid Efficiency", value: "98.7%", icon: Gauge, color: "text-green-400" },
    { label: "Outage Prediction", value: "99.2%", icon: Shield, color: "text-blue-400" },
    { label: "Carbon Reduction", value: "45%", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Smart Meters", value: "2.4M", icon: BarChart3, color: "text-purple-400" },
  ]

  const floatingIcons = [
    { Icon: Zap, delay: 0, x: 100, y: 50 },
    { Icon: Battery, delay: 0.5, x: 200, y: 100 },
    { Icon: Wind, delay: 1, x: 150, y: 150 },
    { Icon: Sun, delay: 1.5, x: 250, y: 80 },
    { Icon: Globe, delay: 2, x: 180, y: 200 },
    { Icon: Cpu, delay: 2.5, x: 120, y: 120 },
  ]

  if (!mounted) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-400/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              x: [x, x + 20, x],
              y: [y, y - 10, y],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Energy Flow Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0,300 Q 200,200 400,300 T 800,300"
            stroke="url(#energyGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.path
            d="M 0,400 Q 300,300 600,400 T 1200,400"
            stroke="url(#energyGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Zap className="w-4 h-4 mr-2" />
                  Smart Grid Technology
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                    Intelligent
                  </span>
                  <br />
                  <span className="text-white">Energy</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Solutions
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Transform your energy operations with AI-powered smart grid management, predictive maintenance, and
                  carbon tracking solutions. Built on SAP IS-U with advanced GenAI capabilities.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "99.9% Uptime", desc: "Predictive maintenance" },
                  { icon: TrendingUp, label: "45% Efficiency", desc: "Smart optimization" },
                  { icon: Battery, label: "Real-time", desc: "Grid monitoring" },
                  { icon: Globe, label: "Carbon neutral", desc: "ESG compliance" },
                ].map(({ icon: Icon, label, desc }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                  >
                    <Icon className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-white font-semibold">{label}</div>
                    <div className="text-gray-400 text-sm">{desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white border-0"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Smart Grid Solutions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Energy Analytics
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Live Grid Metrics</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>

                {/* Current Metric Display */}
                <motion.div
                  key={currentMetric}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  {(() => {
                    const metric = metrics[currentMetric]
                    const IconComponent = metric.icon
                    return (
                      <>
                        <IconComponent className={`w-16 h-16 mx-auto mb-4 ${metric.color}`} />
                        <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                        <div className="text-gray-400">{metric.label}</div>
                      </>
                    )
                  })()}
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => {
                    const IconComponent = metric.icon
                    return (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          currentMetric === index
                            ? "bg-blue-500/20 border-blue-500/50"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentMetric(index)}
                      >
                        <IconComponent className={`w-6 h-6 mb-2 ${metric.color}`} />
                        <div className="text-white font-semibold text-lg">{metric.value}</div>
                        <div className="text-gray-400 text-sm">{metric.label}</div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Status Indicators */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-300">All Systems Operational</span>
                    </div>
                    <div className="text-gray-400">Last updated: Now</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}

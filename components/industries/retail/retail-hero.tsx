"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye, Zap, TrendingUp, Users, Package } from "lucide-react"

const animatedElements = [
  { icon: ShoppingCart, label: "AI Checkout", x: 20, y: 30, delay: 0 },
  { icon: Eye, label: "Customer Analytics", x: 70, y: 20, delay: 0.5 },
  { icon: Zap, label: "Real-time Pricing", x: 80, y: 60, delay: 1 },
  { icon: TrendingUp, label: "Demand Forecasting", x: 30, y: 70, delay: 1.5 },
  { icon: Users, label: "Footfall Analysis", x: 60, y: 80, delay: 2 },
  { icon: Package, label: "Smart Inventory", x: 10, y: 50, delay: 2.5 },
]

const kpiData = [
  { label: "Revenue Increase", value: "23%", trend: "up" },
  { label: "Cart Abandonment", value: "-45%", trend: "down" },
  { label: "Inventory Accuracy", value: "98.5%", trend: "up" },
  { label: "Customer Satisfaction", value: "4.8/5", trend: "up" },
]

export default function RetailHero() {
  const [currentKPI, setCurrentKPI] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKPI((prev) => (prev + 1) % kpiData.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10">
        <div className="absolute inset-0 bg-[url('/images/retail-grid.svg')] opacity-20" />
      </div>

      {/* Floating AI Elements */}
      <div className="absolute inset-0">
        {animatedElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: `${element.x}%`, top: `${element.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: element.delay, duration: 0.5 }}
          >
            <motion.div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-blue-200/50 dark:border-blue-700/50"
              whileHover={{ scale: 1.1, y: -5 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: element.delay }}
            >
              <element.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                {element.label}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              🛍️ Smart Retail Transformation
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
          >
            Smarter Retail Starts with{" "}
            <span className="relative">
              Real-Time AI
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Deliver exceptional customer experiences, streamline operations, and maximize revenue through{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">SAP + GenAI-powered</span> retail
            ecosystems.
          </motion.p>

          {/* KPI Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50 max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentKPI}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{kpiData[currentKPI].label}</p>
                  <p
                    className={`text-2xl font-bold ${
                      kpiData[currentKPI].trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {kpiData[currentKPI].value}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore AI Retail Stack
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
            >
              Request Retail Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>500+ Retail Transformations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>SAP Certified Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>AI-First Approach</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

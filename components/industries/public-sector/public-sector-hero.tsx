"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Shield, Zap, Globe, Brain, ArrowRight, Play } from "lucide-react"
import { useState, useEffect } from "react"

export function PublicSectorHero() {
  const [metrics, setMetrics] = useState({
    citizensServed: 12500000,
    processingTime: 85,
    transparency: 94,
    satisfaction: 91,
  })

  const floatingIcons = [
    { icon: Building2, delay: 0, x: 100, y: 50 },
    { icon: Users, delay: 0.5, x: 200, y: 100 },
    { icon: Shield, delay: 1, x: 150, y: 150 },
    { icon: Zap, delay: 1.5, x: 250, y: 80 },
    { icon: Globe, delay: 2, x: 180, y: 200 },
    { icon: Brain, delay: 2.5, x: 120, y: 120 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        citizensServed: prev.citizensServed + Math.floor(Math.random() * 100),
        processingTime: Math.max(80, prev.processingTime + (Math.random() - 0.5) * 2),
        transparency: Math.min(100, Math.max(90, prev.transparency + (Math.random() - 0.5) * 1)),
        satisfaction: Math.min(100, Math.max(85, prev.satisfaction + (Math.random() - 0.5) * 1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              x: [item.x, item.x + 20, item.x],
              y: [item.y, item.y - 20, item.y],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
          >
            <item.icon className="w-8 h-8 text-blue-500/40" />
          </motion.div>
        ))}
      </div>

      {/* Smart City Dashboard Animation */}
      <div className="absolute right-10 top-20 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-sm font-semibold text-blue-600 mb-4">Live City Dashboard</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Citizens Served</span>
              <motion.span
                key={metrics.citizensServed}
                initial={{ scale: 1.2, color: "#3b82f6" }}
                animate={{ scale: 1, color: "#374151" }}
                className="text-xs font-mono"
              >
                {metrics.citizensServed.toLocaleString()}+
              </motion.span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Processing Speed</span>
              <motion.span
                key={Math.floor(metrics.processingTime)}
                initial={{ scale: 1.2, color: "#10b981" }}
                animate={{ scale: 1, color: "#374151" }}
                className="text-xs font-mono"
              >
                {Math.floor(metrics.processingTime)}% faster
              </motion.span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Transparency</span>
              <motion.span
                key={Math.floor(metrics.transparency)}
                initial={{ scale: 1.2, color: "#8b5cf6" }}
                animate={{ scale: 1, color: "#374151" }}
                className="text-xs font-mono"
              >
                {Math.floor(metrics.transparency)}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="w-4 h-4 mr-2" />
            AI-Native Public Sector Solutions
          </Badge>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Governance Reimagined—
            <br />
            <span className="text-4xl md:text-6xl">Transparent, Inclusive, Intelligent.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Deliver fast, secure, and citizen-first services with ESGit's AI-native public sector solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Explore Smart Governance Stack
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 rounded-full bg-transparent"
            >
              <Play className="w-5 h-5 mr-2" />
              Request Digital Transformation Blueprint
            </Button>
          </motion.div>

          {/* Citizen Journey Flow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Citizen Journey → Digital Action</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {[
                { step: "Citizen Query", icon: Users, color: "blue" },
                { step: "AI Processing", icon: Brain, color: "indigo" },
                { step: "Smart Routing", icon: Zap, color: "purple" },
                { step: "Automated Action", icon: Shield, color: "green" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-full bg-${item.color}-100 flex items-center justify-center mb-2`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.step}</span>
                  {index < 3 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                      className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mt-2"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

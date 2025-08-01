"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Zap, Brain, Lock, Globe } from "lucide-react"

export function BFSIHero() {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    fraudPrevention: 0,
    riskReduction: 0,
    complianceSpeed: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMetrics({
        fraudPrevention: 98.9,
        riskReduction: 67,
        complianceSpeed: 85,
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const floatingElements = [
    { icon: Shield, delay: 0, color: "text-green-500" },
    { icon: TrendingUp, delay: 0.5, color: "text-blue-500" },
    { icon: Zap, delay: 1, color: "text-yellow-500" },
    { icon: Brain, delay: 1.5, color: "text-purple-500" },
    { icon: Lock, delay: 2, color: "text-red-500" },
    { icon: Globe, delay: 2.5, color: "text-indigo-500" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20" />

        {/* Floating Financial Icons */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.color}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + index * 12}%`,
              top: `${30 + (index % 3) * 20}%`,
            }}
          >
            <element.icon size={32} />
          </motion.div>
        ))}

        {/* Payment Flow Animation */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="relative">
            <motion.div
              className="absolute w-4 h-4 bg-green-500 rounded-full"
              animate={{
                x: [0, 100, 200, 250],
                y: [0, -20, 0, 20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <div className="absolute top-4 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-30" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
          >
            <Brain className="w-4 h-4 mr-2" />
            BFSI AI Transformation
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Frictionless, Secure, and Predictive Financial Ecosystems
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            Powered by GenAI + ESGit AI Stack
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Deliver superior CX, automate compliance, reduce fraud, and scale financial innovation across the BFSI value
            chain.
          </p>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {animatedMetrics.fraudPrevention.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fraud Detection Accuracy</div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{animatedMetrics.riskReduction}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Risk Reduction</div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">{animatedMetrics.complianceSpeed}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Faster Compliance</div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Explore AI in Finance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 px-8 py-4 text-lg bg-transparent"
            >
              <Shield className="w-5 h-5 mr-2" />
              Request Compliance Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

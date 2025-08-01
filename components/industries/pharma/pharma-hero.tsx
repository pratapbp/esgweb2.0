"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Brain,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Microscope,
  FlaskConical,
  Pill,
  HeartHandshake,
} from "lucide-react"

const pharmaMetrics = [
  { label: "Drug Discovery Acceleration", value: "65%", icon: FlaskConical },
  { label: "Clinical Trial Efficiency", value: "40%", icon: Users },
  { label: "Regulatory Compliance", value: "99.8%", icon: Shield },
  { label: "Time to Market Reduction", value: "18 months", icon: Clock },
]

const moleculeData = [
  { name: "Compound A", success: 85, phase: "Phase III" },
  { name: "Compound B", success: 72, phase: "Phase II" },
  { name: "Compound C", success: 91, phase: "FDA Review" },
  { name: "Compound D", success: 68, phase: "Phase I" },
]

export default function PharmaHero() {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [moleculeIndex, setMoleculeIndex] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Set initial window size
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % pharmaMetrics.length)
      setMoleculeIndex((prev) => (prev + 1) % moleculeData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentMetricIcon = pharmaMetrics[currentMetric].icon
  const currentMetricValue = pharmaMetrics[currentMetric].value
  const currentMetricLabel = pharmaMetrics[currentMetric].label

  // Don't render animations until mounted to avoid SSR issues
  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                <Microscope className="w-4 h-4 mr-2" />
                Pharma & Life Sciences Innovation
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Smarter Science.{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Safer Outcomes.
                </span>{" "}
                Scalable Manufacturing.
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Empower R&D, clinical trials, manufacturing, and regulatory functions with ESGit's intelligent pharma
                ecosystem powered by GenAI, SAP Life Sciences, RPA, and blockchain-backed compliance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Explore Pharma AI Stack
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
                >
                  <Activity className="w-5 h-5 mr-2" />
                  Request Clinical Trial Demo
                </Button>
              </div>

              {/* Static Metrics for SSR */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">65%</div>
                      <div className="text-gray-300 text-sm">Drug Discovery Acceleration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Static for SSR */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Live AI Insights</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>

                {/* Static content for SSR */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">Compound A</span>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Phase III</Badge>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full w-[85%]" />
                  </div>
                  <span className="text-gray-300 text-sm">Success Probability: 85%</span>
                </div>

                {/* Real-time Alerts */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-green-400 font-medium text-sm">Compliance Alert</div>
                      <div className="text-gray-300 text-xs">FDA submission ready - 99.8% confidence</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-blue-400 font-medium text-sm">Trial Optimization</div>
                      <div className="text-gray-300 text-xs">Patient matching improved by 34%</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-purple-400 font-medium text-sm">Manufacturing Alert</div>
                      <div className="text-gray-300 text-xs">Cold chain temperature optimal</div>
                    </div>
                  </div>
                </div>

                {/* AI Copilot Preview */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-medium">ESG Pharma Copilot</span>
                  </div>
                  <div className="text-gray-300 text-sm mb-3">
                    "Based on current trial data, I recommend adjusting the dosage protocol for optimal efficacy..."
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs"
                  >
                    Ask Copilot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Molecular Structure Animation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              animate={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* DNA Helix Animation */}
        <div className="absolute right-10 top-1/4 opacity-30">
          <motion.div
            className="w-32 h-64"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <svg viewBox="0 0 100 200" className="w-full h-full">
              <path
                d="M20 0 Q50 25 80 50 Q50 75 20 100 Q50 125 80 150 Q50 175 20 200"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M80 0 Q50 25 20 50 Q50 75 80 100 Q50 125 20 150 Q50 175 80 200"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <Microscope className="w-4 h-4 mr-2" />
              Pharma & Life Sciences Innovation
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Smarter Science.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Safer Outcomes.
              </span>{" "}
              Scalable Manufacturing.
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Empower R&D, clinical trials, manufacturing, and regulatory functions with ESGit's intelligent pharma
              ecosystem powered by GenAI, SAP Life Sciences, RPA, and blockchain-backed compliance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                Explore Pharma AI Stack
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
              >
                <Activity className="w-5 h-5 mr-2" />
                Request Clinical Trial Demo
              </Button>
            </div>

            {/* Rotating Metrics */}
            <motion.div
              key={currentMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    {React.createElement(currentMetricIcon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{currentMetricValue}</div>
                    <div className="text-gray-300 text-sm">{currentMetricLabel}</div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {pharmaMetrics.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMetric ? "bg-cyan-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* AI Insights Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Live AI Insights</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* Molecule Analysis */}
              <motion.div
                key={moleculeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">{moleculeData[moleculeIndex].name}</span>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    {moleculeData[moleculeIndex].phase}
                  </Badge>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${moleculeData[moleculeIndex].success}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span className="text-gray-300 text-sm">
                  Success Probability: {moleculeData[moleculeIndex].success}%
                </span>
              </motion.div>

              {/* Real-time Alerts */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-green-400 font-medium text-sm">Compliance Alert</div>
                    <div className="text-gray-300 text-xs">FDA submission ready - 99.8% confidence</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-blue-400 font-medium text-sm">Trial Optimization</div>
                    <div className="text-gray-300 text-xs">Patient matching improved by 34%</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-purple-400 font-medium text-sm">Manufacturing Alert</div>
                    <div className="text-gray-300 text-xs">Cold chain temperature optimal</div>
                  </div>
                </div>
              </div>

              {/* AI Copilot Preview */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">ESG Pharma Copilot</span>
                </div>
                <div className="text-gray-300 text-sm mb-3">
                  "Based on current trial data, I recommend adjusting the dosage protocol for optimal efficacy..."
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs"
                >
                  Ask Copilot
                </Button>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Pill className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <HeartHandshake className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

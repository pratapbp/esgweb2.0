"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, Shield, Activity, Stethoscope, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HealthcareHero() {
  const [currentScan, setCurrentScan] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const scanTypes = [
    { type: "X-Ray Analysis", confidence: "97.3%", finding: "No abnormalities detected", icon: Brain },
    { type: "MRI Processing", confidence: "94.8%", finding: "Tissue analysis complete", icon: Activity },
    { type: "CT Scan Review", confidence: "99.1%", finding: "Diagnostic markers identified", icon: Heart },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true)
      setTimeout(() => {
        setCurrentScan((prev) => (prev + 1) % scanTypes.length)
        setIsScanning(false)
      }, 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const floatingIcons = [
    { icon: Heart, delay: 0, x: 20, y: 30 },
    { icon: Brain, delay: 1, x: 80, y: 20 },
    { icon: Shield, delay: 2, x: 60, y: 70 },
    { icon: Activity, delay: 3, x: 10, y: 60 },
    { icon: Stethoscope, delay: 4, x: 90, y: 50 },
    { icon: Zap, delay: 5, x: 40, y: 80 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-green-800">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={index}
              className="absolute text-white/10"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <IconComponent size={60} />
            </motion.div>
          )
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="space-y-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                AI-Native Healthcare Innovation
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Smarter, Safer, and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Scalable Healthcare
                </span>
                —Powered by AI
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Drive patient outcomes, reduce risks, and automate compliance with GenAI, SAP, and ESGit Copilot for
                Healthcare.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Brain className="mr-2 h-5 w-5" />
                Explore Healthcare AI Stack
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                <Shield className="mr-2 h-5 w-5" />
                Request HIPAA Audit Demo
              </Button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">97%</div>
                <div className="text-sm text-blue-200">Diagnostic Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">35%</div>
                <div className="text-sm text-blue-200">Reduced Wait Times</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50%</div>
                <div className="text-sm text-blue-200">Cost Savings</div>
              </div>
            </div>
          </motion.div>

          {/* AI Diagnostic Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">AI Diagnostic Console</h3>
                  <Badge className={`${isScanning ? "bg-green-500" : "bg-blue-500"} text-white`}>
                    {isScanning ? "Processing..." : "Ready"}
                  </Badge>
                </div>

                {/* Scan Display */}
                <div className="bg-black/50 rounded-lg p-4 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScan}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="text-center text-white"
                    >
                      {React.createElement(scanTypes[currentScan].icon, {
                        size: 80,
                        className: "mx-auto mb-4 text-green-400",
                      })}
                      <div className="text-lg font-semibold">{scanTypes[currentScan].type}</div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Scanning Animation */}
                  {isScanning && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  )}
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-white">
                    <span>Confidence Level:</span>
                    <span className="font-bold text-green-400">{scanTypes[currentScan].confidence}</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Finding:</span>
                    <span className="font-semibold text-blue-300">{scanTypes[currentScan].finding}</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Processing Time:</span>
                    <span className="font-semibold text-purple-300">0.3s</span>
                  </div>
                </div>

                {/* AI Prompt */}
                <div className="bg-blue-900/30 rounded-lg p-3">
                  <div className="text-xs text-blue-200 mb-1">AI Prompt:</div>
                  <div className="text-sm text-white font-mono">
                    "Analyze medical imaging for diagnostic markers, cross-reference with patient history, and provide
                    confidence-scored recommendations..."
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

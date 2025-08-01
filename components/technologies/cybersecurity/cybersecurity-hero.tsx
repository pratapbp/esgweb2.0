"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, Lock, Eye, Zap, CheckCircle, ArrowRight, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CybersecurityHero() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [threatCount, setThreatCount] = useState(1247)
  const [mounted, setMounted] = useState(false)

  const securityMetrics = [
    { label: "Threats Blocked", value: "99.8%", icon: Shield, color: "text-green-400" },
    { label: "Response Time", value: "< 30s", icon: Zap, color: "text-blue-400" },
    { label: "Zero-Day Detection", value: "94.2%", icon: Eye, color: "text-purple-400" },
    { label: "Compliance Score", value: "100%", icon: CheckCircle, color: "text-cyan-400" },
  ]

  const threatTypes = [
    { name: "Malware", count: 342, trend: "+12%" },
    { name: "Phishing", count: 189, trend: "-8%" },
    { name: "Ransomware", count: 67, trend: "+23%" },
    { name: "DDoS", count: 45, trend: "-15%" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % securityMetrics.length)
      setThreatCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(interval)
  }, [mounted, securityMetrics.length])

  // Render static content during SSR
  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">
                    <Shield className="h-3 w-3 mr-1" />
                    Advanced Threat Protection
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Cyber
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    security
                  </span>
                  <br />
                  AI Shield
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Next-generation cybersecurity powered by artificial intelligence. Detect, prevent, and respond to
                  threats in real-time with our comprehensive security ecosystem.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Start Security Assessment
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {securityMetrics.map((metric, index) => {
                  const IconComponent = metric.icon
                  return (
                    <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
                      <CardContent className="p-4 text-center">
                        <IconComponent className={`h-6 w-6 ${metric.color} mx-auto mb-2`} />
                        <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-red-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Threats Blocked Today</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs text-green-400">Live</span>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-red-400 mb-2">{threatCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">+{Math.floor(Math.random() * 10) + 1} in the last minute</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Threat Categories</h3>
                  <div className="space-y-3">
                    {threatTypes.map((threat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-4 w-4 text-orange-400" />
                          <span className="text-white font-medium">{threat.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">{threat.count}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              threat.trend.startsWith("+")
                                ? "bg-red-500/20 text-red-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {threat.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-xl border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Lock className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Security Status</div>
                        <div className="text-green-400 text-sm">All Systems Protected</div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0.1,
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Shield className="h-4 w-4 text-red-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">
                  <Shield className="h-3 w-3 mr-1" />
                  Advanced Threat Protection
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
              >
                Cyber
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  security
                </span>
                <br />
                AI Shield
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Next-generation cybersecurity powered by artificial intelligence. Detect, prevent, and respond to
                threats in real-time with our comprehensive security ecosystem.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg">
                <Shield className="h-5 w-5 mr-2" />
                Start Security Assessment
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Security Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {securityMetrics.map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <Card
                    key={index}
                    className={`bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-300 ${
                      activeMetric === index ? "border-red-500/50 shadow-lg shadow-red-500/20" : ""
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className={`h-6 w-6 ${metric.color} mx-auto mb-2`} />
                      <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Threat Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Real-time Threat Counter */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-red-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Threats Blocked Today</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-400 mb-2">{threatCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">+{Math.floor(Math.random() * 10) + 1} in the last minute</div>
              </CardContent>
            </Card>

            {/* Threat Types Breakdown */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Threat Categories</h3>
                <div className="space-y-3">
                  {threatTypes.map((threat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-white font-medium">{threat.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300">{threat.count}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            threat.trend.startsWith("+")
                              ? "bg-red-500/20 text-red-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {threat.trend}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-xl border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Lock className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Security Status</div>
                      <div className="text-green-400 text-sm">All Systems Protected</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

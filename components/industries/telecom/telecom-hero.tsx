"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Wifi,
  Radio,
  Satellite,
  Network,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Play,
  ArrowRight,
} from "lucide-react"

export default function TelecomHero() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [networkNodes, setNetworkNodes] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([])

  const metrics = [
    { icon: Users, value: "5.2B", label: "Connected Subscribers", color: "text-blue-400" },
    { icon: Network, value: "99.9%", label: "Network Uptime", color: "text-green-400" },
    { icon: Zap, value: "18%", label: "ARPU Increase", color: "text-yellow-400" },
    { icon: TrendingUp, value: "45%", label: "Churn Reduction", color: "text-purple-400" },
  ]

  useEffect(() => {
    // Generate random network nodes
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: Math.random() > 0.3,
    }))
    setNetworkNodes(nodes)

    // Animate metrics
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleNetworkDemo = () => {
    window.open("/demo/network-intelligence", "_blank")
  }

  const handlePersonalizationDemo = () => {
    window.open("/demo/customer-personalization", "_blank")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Network Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {networkNodes.map((node, index) => (
            <g key={node.id}>
              {/* Network connections */}
              {networkNodes.slice(index + 1).map((otherNode) => {
                const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
                if (distance < 25) {
                  return (
                    <motion.line
                      key={`${node.id}-${otherNode.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={otherNode.x}
                      y2={otherNode.y}
                      stroke="url(#networkGradient)"
                      strokeWidth="0.1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: node.active && otherNode.active ? 0.6 : 0.2 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                  )
                }
                return null
              })}
              {/* Network nodes */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="0.5"
                fill={node.active ? "#3B82F6" : "#6B7280"}
                initial={{ scale: 0 }}
                animate={{ scale: node.active ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Smartphone className="w-4 h-4 mr-2" />
                5G & Beyond Ready
              </Badge>
            </div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connecting Billions—
              <br />
              <span className="text-white">Smarter, Faster, Seamless</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Redefine customer experience, automate service delivery, and optimize network operations with ESGit's
              AI-first telecom solutions powered by GenAI, SAP, and intelligent automation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={handleNetworkDemo}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Network className="w-5 h-5 mr-2" />
                Launch Network Intelligence Suite
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                onClick={handlePersonalizationDemo}
                variant="outline"
                className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                See AI-Driven Personalization Demo
              </Button>
            </motion.div>

            {/* Real-time Metrics */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    activeMetric === index
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105"
                      : "bg-black/20 border-gray-600/30"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-gray-400">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Network Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 overflow-hidden">
              {/* Global Network Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-80 h-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Globe className="w-full h-full text-blue-400/30" />

                  {/* Network Towers */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{
                        top: `${20 + Math.sin((i * Math.PI) / 4) * 30}%`,
                        left: `${50 + Math.cos((i * Math.PI) / 4) * 30}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.25,
                      }}
                    >
                      <Radio className="w-full h-full text-white" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Real-time Data Streams */}
              <div className="absolute top-4 right-4 space-y-2">
                {["5G Signal", "Data Flow", "AI Processing"].map((label, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-300">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Usage Heatmap Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-xs text-gray-300 mb-2">Network Usage Heatmap</div>
                  <div className="flex space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-sm"
                        style={{ height: `${Math.random() * 20 + 10}px` }}
                        animate={{ height: [`${Math.random() * 20 + 10}px`, `${Math.random() * 20 + 10}px`] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 opacity-20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Satellite className="w-16 h-16 text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 opacity-20"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <Wifi className="w-12 h-12 text-purple-400" />
      </motion.div>
    </section>
  )
}

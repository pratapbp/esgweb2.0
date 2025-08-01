"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Smartphone,
  Database,
  Brain,
  Zap,
  Shield,
  Globe,
  ArrowDown,
  ArrowRight,
  Activity,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"

const architectureFlow = [
  {
    title: "Subscriber Device / SIM",
    icon: Smartphone,
    description: "5G/4G devices with smart SIM cards",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    title: "SAP C4C + Usage Data",
    icon: Database,
    description: "Customer data and real-time usage analytics",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    title: "GenAI Insight Layer",
    icon: Brain,
    description: "AI-powered analytics and decision engine",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    title: "Smart Plans + Alerts via SAP TM",
    icon: Zap,
    description: "Dynamic plan generation and automated alerts",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    title: "SLA Monitoring with Blockchain Ledger",
    icon: Shield,
    description: "Transparent SLA tracking and enforcement",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    title: "Personalized CX Engine",
    icon: Globe,
    description: "Multi-channel customer experience platform",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
]

const outcomes = [
  { metric: "+18%", label: "ARPU Increase", icon: TrendingUp, color: "text-green-400" },
  { metric: "-45%", label: "Churn Reduction", icon: Users, color: "text-blue-400" },
  { metric: "+70%", label: "SLA Resolution", icon: Clock, color: "text-purple-400" },
  { metric: "2 hrs", label: "Average Resolution Time", icon: Activity, color: "text-yellow-400" },
]

export default function NetworkArchitecture() {
  const [activeStep, setActiveStep] = useState(0)
  const [dataFlow, setDataFlow] = useState<Array<{ id: number; active: boolean }>>([])

  useEffect(() => {
    // Simulate data flow animation
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % architectureFlow.length)
    }, 3000)

    // Generate data flow particles
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      active: Math.random() > 0.5,
    }))
    setDataFlow(particles)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 mb-4">
            AI-Native Telco Architecture
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Intelligent Network Flow
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the complete AI-driven telecom architecture that transforms every touchpoint from subscriber
            devices to personalized customer experiences.
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Flow Diagram */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {architectureFlow.map((step, index) => (
              <div key={index} className="relative">
                <motion.div
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    activeStep === index
                      ? `${step.bgColor} ${step.borderColor} scale-105 shadow-lg`
                      : "bg-gray-800/50 border-gray-600/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${step.bgColor} flex-shrink-0`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                    {activeStep === index && (
                      <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Active</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Flow Arrow */}
                {index < architectureFlow.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowDown className="w-6 h-6 text-gray-500" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Interactive Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20 h-full">
              <CardHeader>
                <CardTitle className="text-white">Real-time Data Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 overflow-hidden rounded-lg bg-black/20">
                  {/* Data Flow Visualization */}
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    {/* Network Grid */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                      </pattern>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Data Flow Paths */}
                    {architectureFlow.map((_, index) => {
                      const y = 50 + index * 50
                      return (
                        <g key={index}>
                          <motion.line
                            x1="50"
                            y1={y}
                            x2="350"
                            y2={y}
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            opacity={activeStep === index ? 1 : 0.3}
                            animate={{
                              strokeDasharray: activeStep === index ? ["5,5"] : ["0,0"],
                              strokeDashoffset: activeStep === index ? [0, -10] : 0,
                            }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />

                          {/* Data Packets */}
                          {activeStep === index && (
                            <motion.circle
                              cx="50"
                              cy={y}
                              r="4"
                              fill="#3B82F6"
                              animate={{ cx: [50, 350] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          )}
                        </g>
                      )
                    })}

                    {/* Network Nodes */}
                    {[50, 150, 250, 350].map((x, index) => (
                      <motion.circle
                        key={index}
                        cx={x}
                        cy="200"
                        r="8"
                        fill="#8B5CF6"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      />
                    ))}
                  </svg>

                  {/* Real-time Metrics Overlay */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs text-gray-300">Data Throughput</div>
                      <div className="text-lg font-bold text-green-400">4.2 Gbps</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs text-gray-300">Active Sessions</div>
                      <div className="text-lg font-bold text-blue-400">2.1M</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs text-gray-300">AI Processing</div>
                      <div className="text-lg font-bold text-purple-400">Real-time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Outcomes Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Proven Outcomes</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-600/20"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <outcome.icon className={`w-6 h-6 ${outcome.color}`} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${outcome.color} mb-2`}>{outcome.metric}</div>
                <div className="text-sm text-gray-400">{outcome.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold">
              <ArrowRight className="w-5 h-5 mr-2" />
              Implement This Architecture
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

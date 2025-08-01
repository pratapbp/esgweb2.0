"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MonitorIcon as Sensors, Brain, Zap, Shield, TrendingUp, Activity, Database, Cpu, Network } from "lucide-react"

interface FrameworkStep {
  id: string
  title: string
  description: string
  icon: any
  color: string
  systems: string[]
}

const frameworkSteps: FrameworkStep[] = [
  {
    id: "sensors",
    title: "IoT Sensors / Smart Meters",
    description: "Real-time data collection from distributed energy assets and grid infrastructure",
    icon: Sensors,
    color: "text-blue-400",
    systems: ["IoT Platform", "Smart Meters", "Edge Computing", "5G Networks"],
  },
  {
    id: "sap-ml",
    title: "SAP IS-U + ML Forecasting",
    description: "Intelligent utility management with machine learning-powered demand forecasting",
    icon: Database,
    color: "text-green-400",
    systems: ["SAP IS-U", "SAP Analytics Cloud", "ML Models", "Data Lake"],
  },
  {
    id: "genai",
    title: "GenAI Control Logic",
    description: "AI-driven decision making for optimal grid operations and resource allocation",
    icon: Brain,
    color: "text-purple-400",
    systems: ["GenAI Engine", "Decision Trees", "Optimization Algorithms", "Neural Networks"],
  },
  {
    id: "rpa",
    title: "RPA Dispatch / Alerts / Billing",
    description: "Automated workflows for field operations, customer notifications, and billing processes",
    icon: Zap,
    color: "text-orange-400",
    systems: ["RPA Bots", "Workflow Engine", "Notification System", "Billing Automation"],
  },
  {
    id: "blockchain",
    title: "ESG Blockchain Reporting Engine",
    description: "Immutable audit trails for carbon tracking and regulatory compliance reporting",
    icon: Shield,
    color: "text-cyan-400",
    systems: ["Blockchain Network", "Smart Contracts", "ESG Metrics", "Audit Trail"],
  },
]

export default function DigitalGridFramework() {
  const [activeStep, setActiveStep] = useState(0)
  const [gridMetrics, setGridMetrics] = useState({
    uptime: 99.99,
    efficiency: 94.5,
    transparency: 100,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % frameworkSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setGridMetrics((prev) => ({
        uptime: Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.01),
        efficiency: Math.min(100, prev.efficiency + (Math.random() - 0.5) * 0.5),
        transparency: 100, // Always 100% with blockchain
      }))
    }, 2000)

    return () => clearInterval(metricsInterval)
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mb-4">
            <Network className="h-4 w-4 mr-2" />
            Digital Grid Architecture
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Complete{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ESG Framework
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            End-to-end intelligent energy infrastructure with AI-powered automation and blockchain transparency
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Framework Flow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {frameworkSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index < frameworkSteps.length - 1 ? "pb-6" : ""}`}
              >
                {/* Connection Line */}
                {index < frameworkSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-gray-600 to-gray-700" />
                )}

                <Card
                  className={`bg-gray-900/60 backdrop-blur-xl border-gray-700 transition-all duration-500 ${
                    activeStep === index ? "border-blue-500/50 shadow-lg shadow-blue-500/20" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gray-800 ${step.color} ${
                          activeStep === index ? "animate-pulse" : ""
                        }`}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{step.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {step.systems.map((system, idx) => (
                            <Badge key={idx} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                              {system}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Live Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Framework Results */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <TrendingUp className="h-6 w-6 text-blue-400 mr-3" />
                  Framework Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Uptime Metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Grid Uptime</span>
                    <span className="text-2xl font-bold text-green-400">{gridMetrics.uptime.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${gridMetrics.uptime}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">+99.99% uptime achieved</p>
                </div>

                {/* Efficiency Metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Operational Efficiency</span>
                    <span className="text-2xl font-bold text-blue-400">{gridMetrics.efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${gridMetrics.efficiency}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">-40% manual reporting</p>
                </div>

                {/* Transparency Metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Audit Transparency</span>
                    <span className="text-2xl font-bold text-cyan-400">{gridMetrics.transparency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 to-green-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">+100% audit transparency</p>
                </div>
              </CardContent>
            </Card>

            {/* Active Step Details */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="h-5 w-5 text-orange-400 mr-2" />
                  Currently Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gray-800 ${frameworkSteps[activeStep].color}`}>
                    {(() => {
                      const Icon = frameworkSteps[activeStep].icon
                      return <Icon className="h-5 w-5" />
                    })()}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{frameworkSteps[activeStep].title}</h4>
                    <p className="text-gray-400 text-sm">{frameworkSteps[activeStep].description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Processing Status</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Architecture */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Cpu className="h-5 w-5 text-purple-400 mr-2" />
                  Architecture Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">5</div>
                    <div className="text-xs text-gray-400">Processing Layers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
                    <div className="text-xs text-gray-400">Monitoring</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400 mb-1">AI</div>
                    <div className="text-xs text-gray-400">Powered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400 mb-1">∞</div>
                    <div className="text-xs text-gray-400">Scalability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Brain, AlertTriangle, CheckCircle, ArrowDown, Clock, Target, TrendingDown } from "lucide-react"

const architectureSteps = [
  {
    title: "Transaction Stream",
    description: "Real-time transaction data ingestion",
    icon: Zap,
    color: "blue",
    metrics: "10M+ transactions/day",
  },
  {
    title: "AI Model (ESGit Copilot + ML Scoring)",
    description: "Advanced ML models for pattern recognition",
    icon: Brain,
    color: "purple",
    metrics: "< 50ms processing time",
  },
  {
    title: "Anomaly Detection Engine",
    description: "Real-time anomaly scoring and classification",
    icon: AlertTriangle,
    color: "orange",
    metrics: "98.9% accuracy rate",
  },
  {
    title: "Alert + Automated Block/Flag (via RPA)",
    description: "Automated response and risk mitigation",
    icon: Shield,
    color: "red",
    metrics: "< 1s response time",
  },
  {
    title: "SAP Core Banking / Insurance System",
    description: "Integration with core business systems",
    icon: CheckCircle,
    color: "green",
    metrics: "99.99% uptime",
  },
]

const kpiMetrics = [
  { label: "Response Time", value: "< 1s", icon: Clock, trend: "down" },
  { label: "Detection Accuracy", value: "98.9%", icon: Target, trend: "up" },
  { label: "False Positives", value: "50%", icon: TrendingDown, trend: "down", suffix: "reduction" },
]

export function FraudShieldArchitecture() {
  const [animatedStep, setAnimatedStep] = useState(0)
  const [dataFlow, setDataFlow] = useState(0)

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setAnimatedStep((prev) => (prev + 1) % architectureSteps.length)
    }, 2000)

    const flowTimer = setInterval(() => {
      setDataFlow((prev) => (prev + 1) % 100)
    }, 100)

    return () => {
      clearInterval(stepTimer)
      clearInterval(flowTimer)
    }
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <Shield className="w-4 h-4 mr-2" />
          AI-Powered Architecture
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Real-Time Fraud Shield
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Advanced AI architecture for instant fraud detection and automated response across all financial transactions
        </p>
      </motion.div>

      {/* Architecture Flow */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="space-y-6">
          {architectureSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative overflow-hidden ${
                  animatedStep === index ? "ring-2 ring-blue-500 shadow-lg" : ""
                } transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900/30 relative`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                      {animatedStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-blue-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{step.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {step.metrics}
                      </Badge>
                    </div>

                    {/* Data Flow Animation */}
                    {index < architectureSteps.length - 1 && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <motion.div
                          className="w-2 h-6 bg-gradient-to-b from-blue-500 to-transparent rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {index < architectureSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* KPI Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`p-3 rounded-full ${
                    metric.trend === "up" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                  }`}
                >
                  <metric.icon className={`w-6 h-6 ${metric.trend === "up" ? "text-green-600" : "text-blue-600"}`} />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                {metric.value}
                {metric.suffix && <span className="text-sm font-normal text-gray-500 ml-1">{metric.suffix}</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Real-time Data Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Live Transaction Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{(dataFlow * 1000).toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Transactions/sec</div>
              </div>

              <div className="flex-1 mx-8">
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    animate={{ width: `${dataFlow}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{Math.floor(dataFlow * 0.989)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

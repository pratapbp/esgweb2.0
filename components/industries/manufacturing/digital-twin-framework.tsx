"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, BarChart3, Brain, AlertTriangle, CheckCircle } from "lucide-react"

export default function DigitalTwinFramework() {
  const [activeStep, setActiveStep] = useState(0)
  const [sensorData, setSensorData] = useState({
    temperature: 72,
    vibration: 0.3,
    pressure: 145,
    efficiency: 87,
  })

  const frameworkSteps = [
    {
      title: "IoT Sensor Data",
      description: "Real-time data collection from manufacturing equipment",
      icon: <Cpu className="h-6 w-6 text-blue-400" />,
      details: "Temperature, vibration, pressure, and performance sensors continuously monitor equipment health",
      status: "active",
    },
    {
      title: "SAP Asset Intelligence + ML",
      description: "Intelligent asset management with machine learning",
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      details: "SAP Asset Intelligence Network processes sensor data using advanced ML algorithms",
      status: "processing",
    },
    {
      title: "GenAI Anomaly Scoring",
      description: "AI-powered anomaly detection and scoring",
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      details: "GenAI models analyze patterns and assign risk scores to potential equipment failures",
      status: "analyzing",
    },
    {
      title: "Predictive Alerts + RPA Resolution",
      description: "Automated alerts and resolution workflows",
      icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
      details: "RPA bots automatically create work orders and schedule maintenance based on predictions",
      status: "alerting",
    },
    {
      title: "SAP Fiori Dashboard + ESGit Copilot",
      description: "Intelligent dashboards with AI assistance",
      icon: <BarChart3 className="h-6 w-6 text-green-400" />,
      details: "Real-time dashboards with ESGit Copilot providing intelligent insights and recommendations",
      status: "dashboard",
    },
  ]

  const equipmentData = [
    {
      id: "CNC-001",
      name: "CNC Machine 1",
      health: 94,
      status: "Optimal",
      nextMaintenance: "12 days",
      alerts: 0,
    },
    {
      id: "ROBOT-002",
      name: "Assembly Robot 2",
      health: 78,
      status: "Warning",
      nextMaintenance: "3 days",
      alerts: 1,
    },
    {
      id: "CONV-003",
      name: "Conveyor Belt 3",
      health: 56,
      status: "Critical",
      nextMaintenance: "Immediate",
      alerts: 3,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % frameworkSteps.length)

      // Simulate real-time sensor data updates
      setSensorData((prev) => ({
        temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 2)),
        vibration: Math.max(0.1, Math.min(1.0, prev.vibration + (Math.random() - 0.5) * 0.1)),
        pressure: Math.max(120, Math.min(180, prev.pressure + (Math.random() - 0.5) * 5)),
        efficiency: Math.max(70, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 3)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [frameworkSteps.length])

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-400"
    if (health >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimal":
        return "bg-green-900/30 text-green-400 border-green-700/50"
      case "Warning":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
      case "Critical":
        return "bg-red-900/30 text-red-400 border-red-700/50"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-700/50"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Digital Twin & <span className="gradient-text">IoT Framework</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our real-time digital twin framework that transforms manufacturing operations through intelligent
            automation and predictive insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Framework Flow */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-400 mr-2" />
                  Real-time Manufacturing Intelligence Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {frameworkSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0.5,
                        scale: activeStep === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${
                        activeStep === index ? "bg-blue-900/20 border-blue-700/50" : "bg-gray-800/30 border-gray-700/30"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${activeStep === index ? "bg-blue-900/50" : "bg-gray-800"}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                        <p className="text-gray-300 text-xs">{step.details}</p>
                      </div>
                      {activeStep === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600"
                        >
                          <CheckCircle className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Animated Connection Lines */}
                <div className="relative mt-6">
                  <svg className="w-full h-8" viewBox="0 0 400 32">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0 16 Q 100 8 200 16 T 400 16"
                      stroke="url(#flowGradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Data Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                  Live Sensor Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{sensorData.temperature.toFixed(1)}°F</div>
                    <div className="text-xs text-gray-400">Temperature</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-400">{sensorData.vibration.toFixed(2)}g</div>
                    <div className="text-xs text-gray-400">Vibration</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{sensorData.pressure.toFixed(0)} PSI</div>
                    <div className="text-xs text-gray-400">Pressure</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-400">{sensorData.efficiency.toFixed(0)}%</div>
                    <div className="text-xs text-gray-400">Efficiency</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 text-green-400 mr-2" />
                  Equipment Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {equipmentData.map((equipment, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{equipment.name}</span>
                      <Badge className={getStatusColor(equipment.status)}>{equipment.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        Health: <span className={getHealthColor(equipment.health)}>{equipment.health}%</span>
                      </span>
                      <span>Next: {equipment.nextMaintenance}</span>
                    </div>
                    {equipment.alerts > 0 && (
                      <div className="mt-2 text-xs text-red-400">
                        {equipment.alerts} active alert{equipment.alerts > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

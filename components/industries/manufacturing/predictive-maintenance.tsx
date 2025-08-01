"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, Wrench, BarChart3 } from "lucide-react"

export default function PredictiveMaintenanceSection() {
  const [maintenanceData, setMaintenanceData] = useState({
    alerts: 3,
    uptime: 98.7,
    savings: 2.4,
    predictions: 15,
  })

  const [selectedEquipment, setSelectedEquipment] = useState(0)

  const equipmentData = [
    {
      name: "CNC Machine #1",
      status: "optimal",
      health: 92,
      nextMaintenance: "14 days",
      alerts: 0,
      efficiency: 96,
    },
    {
      name: "Assembly Robot #2",
      status: "warning",
      health: 78,
      nextMaintenance: "3 days",
      alerts: 2,
      efficiency: 89,
    },
    {
      name: "Conveyor System #3",
      status: "optimal",
      health: 88,
      nextMaintenance: "21 days",
      alerts: 0,
      efficiency: 94,
    },
    {
      name: "Quality Scanner #4",
      status: "critical",
      health: 65,
      nextMaintenance: "Immediate",
      alerts: 1,
      efficiency: 82,
    },
  ]

  const maintenanceFeatures = [
    {
      title: "AI-Powered Failure Prediction",
      description: "Machine learning algorithms analyze sensor data to predict equipment failures weeks in advance",
      icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
      benefits: ["Early warning system", "Reduced unplanned downtime", "Optimized maintenance schedules"],
    },
    {
      title: "Real-Time Equipment Monitoring",
      description: "Continuous monitoring of equipment health through IoT sensors and advanced analytics",
      icon: <Clock className="h-6 w-6 text-green-400" />,
      benefits: ["24/7 monitoring", "Instant alerts", "Performance tracking"],
    },
    {
      title: "Maintenance Optimization",
      description: "Optimize maintenance schedules and resource allocation based on actual equipment condition",
      icon: <Wrench className="h-6 w-6 text-purple-400" />,
      benefits: ["Cost optimization", "Resource efficiency", "Extended equipment life"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMaintenanceData((prev) => ({
        alerts: Math.max(0, prev.alerts + (Math.random() > 0.7 ? 1 : -1)),
        uptime: Math.min(100, Math.max(95, prev.uptime + (Math.random() - 0.5) * 0.5)),
        savings: Math.max(0, prev.savings + (Math.random() - 0.5) * 0.1),
        predictions: Math.max(0, prev.predictions + (Math.random() > 0.8 ? 1 : 0)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400 bg-green-900/30 border-green-700"
      case "warning":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-700"
      case "critical":
        return "text-red-400 bg-red-900/30 border-red-700"
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <Clock className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-400 text-sm font-medium mb-4">
            <Wrench className="mr-2 h-4 w-4" />
            Predictive Maintenance
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prevent Failures Before{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              They Happen
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your maintenance strategy with AI-powered predictive analytics that identify potential equipment
            failures before they occur, reducing downtime and maintenance costs by up to 40%.
          </p>
        </div>

        {/* Real-time Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-red-400 mb-2">{maintenanceData.alerts}</div>
                <div className="text-sm text-gray-400">Active Alerts</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-400 mb-2">{maintenanceData.uptime.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Equipment Uptime</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-400 mb-2">${maintenanceData.savings.toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Cost Savings</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-purple-400 mb-2">{maintenanceData.predictions}</div>
                <div className="text-sm text-gray-400">Predictions Made</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Equipment Monitoring Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                  Equipment Health Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.map((equipment, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedEquipment === index
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedEquipment(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{equipment.name}</h4>
                        <Badge className={`${getStatusColor(equipment.status)} border`}>
                          {getStatusIcon(equipment.status)}
                          <span className="ml-1 capitalize">{equipment.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Health</div>
                          <div className="font-semibold">{equipment.health}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Next Service</div>
                          <div className="font-semibold">{equipment.nextMaintenance}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Efficiency</div>
                          <div className="font-semibold">{equipment.efficiency}%</div>
                        </div>
                      </div>

                      {equipment.alerts > 0 && (
                        <div className="mt-2 flex items-center text-red-400 text-sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {equipment.alerts} alert{equipment.alerts > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features and Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {maintenanceFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gray-800">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Predictive Maintenance ROI</h3>
                <p className="text-gray-300">
                  See the potential impact of implementing predictive maintenance in your facility
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
                  <div className="text-sm text-gray-400">Reduction in Maintenance Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">25%</div>
                  <div className="text-sm text-gray-400">Increase in Equipment Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
                  <div className="text-sm text-gray-400">Reduction in Unplanned Downtime</div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button className="bg-purple-600 hover:bg-purple-700">Calculate Your ROI</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

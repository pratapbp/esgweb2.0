"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, Thermometer, Gauge, Activity, Zap, Shield, TrendingUp } from "lucide-react"

export default function IoTManufacturingSection() {
  const [sensorData, setSensorData] = useState({
    temperature: 72,
    pressure: 145,
    vibration: 0.8,
    energy: 85,
  })

  const [connectedDevices, setConnectedDevices] = useState(1247)

  const iotSolutions = [
    {
      title: "Smart Sensors & Monitoring",
      description:
        "Deploy thousands of IoT sensors to monitor equipment performance, environmental conditions, and production metrics in real-time",
      icon: <Activity className="h-8 w-8 text-blue-400" />,
      features: [
        "Temperature & humidity monitoring",
        "Vibration analysis",
        "Pressure monitoring",
        "Energy consumption tracking",
      ],
      benefits: {
        "Data Points": "50M+/day",
        "Response Time": "<1 sec",
        Accuracy: "99.9%",
      },
    },
    {
      title: "Edge Computing & Analytics",
      description:
        "Process data at the edge for instant decision-making and reduced latency in critical manufacturing processes",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      features: ["Real-time data processing", "Local decision making", "Reduced bandwidth usage", "Offline capability"],
      benefits: {
        Latency: "<10ms",
        "Bandwidth Savings": "70%",
        Uptime: "99.8%",
      },
    },
    {
      title: "Secure IoT Infrastructure",
      description:
        "Enterprise-grade security for IoT devices and data transmission, ensuring protection against cyber threats",
      icon: <Shield className="h-8 w-8 text-green-400" />,
      features: ["End-to-end encryption", "Device authentication", "Network segmentation", "Threat detection"],
      benefits: {
        "Security Score": "A+",
        Incidents: "0",
        Compliance: "100%",
      },
    },
  ]

  const sensorTypes = [
    { name: "Temperature", icon: <Thermometer className="h-5 w-5" />, count: 324, status: "optimal" },
    { name: "Pressure", icon: <Gauge className="h-5 w-5" />, count: 156, status: "optimal" },
    { name: "Vibration", icon: <Activity className="h-5 w-5" />, count: 289, status: "warning" },
    { name: "Energy", icon: <Zap className="h-5 w-5" />, count: 478, status: "optimal" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        temperature: Math.max(65, Math.min(80, prev.temperature + (Math.random() - 0.5) * 2)),
        pressure: Math.max(140, Math.min(160, prev.pressure + (Math.random() - 0.5) * 5)),
        vibration: Math.max(0.5, Math.min(1.2, prev.vibration + (Math.random() - 0.5) * 0.1)),
        energy: Math.max(75, Math.min(95, prev.energy + (Math.random() - 0.5) * 3)),
      }))

      setConnectedDevices((prev) => prev + Math.floor(Math.random() * 3 - 1))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium mb-4">
            <Wifi className="mr-2 h-4 w-4" />
            IoT in Manufacturing
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect Your{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Manufacturing
            </span>{" "}
            Ecosystem
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your factory into a smart, connected ecosystem with IoT sensors, edge computing, and real-time
            analytics that provide unprecedented visibility and control over your operations.
          </p>
        </div>

        {/* Real-time IoT Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Wifi className="h-5 w-5 text-green-400 mr-2" />
                  Live IoT Dashboard
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-gray-400">{connectedDevices.toLocaleString()} devices connected</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Thermometer className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">{sensorData.temperature.toFixed(1)}°F</div>
                  <div className="text-sm text-gray-400">Temperature</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Gauge className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{sensorData.pressure.toFixed(0)} PSI</div>
                  <div className="text-sm text-gray-400">Pressure</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">{sensorData.vibration.toFixed(2)} mm/s</div>
                  <div className="text-sm text-gray-400">Vibration</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{sensorData.energy.toFixed(0)}%</div>
                  <div className="text-sm text-gray-400">Energy Efficiency</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sensorTypes.map((sensor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={getStatusColor(sensor.status)}>{sensor.icon}</div>
                      <div>
                        <div className="font-semibold text-sm">{sensor.name}</div>
                        <div className="text-xs text-gray-400">{sensor.count} sensors</div>
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${sensor.status === "optimal" ? "bg-green-500" : sensor.status === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                    ></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* IoT Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {iotSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 h-full hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-gray-800">{solution.icon}</div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                  </div>
                  <p className="text-gray-300">{solution.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Performance Metrics</h4>
                    <div className="space-y-2">
                      {Object.entries(solution.benefits).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{key}</span>
                          <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* IoT Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-center">IoT Manufacturing Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold">Sensors & Devices</h4>
                  <p className="text-sm text-gray-400">
                    Smart sensors collect real-time data from equipment and environment
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-600 flex items-center justify-center">
                    <Wifi className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold">Connectivity</h4>
                  <p className="text-sm text-gray-400">Secure wireless networks transmit data to processing systems</p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold">Edge Computing</h4>
                  <p className="text-sm text-gray-400">
                    Local processing enables real-time decision making and response
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-yellow-600 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold">Analytics & AI</h4>
                  <p className="text-sm text-gray-400">
                    Advanced analytics provide insights and predictive capabilities
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">Explore IoT Implementation</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

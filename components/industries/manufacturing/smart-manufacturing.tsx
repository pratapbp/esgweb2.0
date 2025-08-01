"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Factory, Cpu, Database, Cloud, Zap } from "lucide-react"

export default function SmartManufacturingSection() {
  const [activeDemo, setActiveDemo] = useState("digital-twin")

  const smartManufacturingFeatures = [
    {
      id: "digital-twin",
      title: "Digital Twin Technology",
      description:
        "Create virtual replicas of physical manufacturing processes for real-time monitoring and optimization",
      icon: <Cpu className="h-6 w-6 text-blue-400" />,
      benefits: ["Real-time simulation", "Predictive modeling", "Process optimization", "Risk reduction"],
      metrics: { efficiency: "+35%", downtime: "-42%", quality: "+28%" },
    },
    {
      id: "ai-optimization",
      title: "AI-Powered Optimization",
      description:
        "Machine learning algorithms that continuously optimize production parameters and resource allocation",
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      benefits: ["Automated decision making", "Resource optimization", "Quality improvement", "Cost reduction"],
      metrics: { productivity: "+45%", waste: "-38%", energy: "-25%" },
    },
    {
      id: "connected-factory",
      title: "Connected Factory Ecosystem",
      description: "Integrated systems that connect machines, sensors, and software for seamless data flow",
      icon: <Factory className="h-6 w-6 text-green-400" />,
      benefits: ["System integration", "Data visibility", "Process automation", "Real-time control"],
      metrics: { visibility: "+90%", response: "-60%", integration: "100%" },
    },
  ]

  const technologyStack = [
    { name: "Industrial IoT", icon: <Zap className="h-5 w-5" />, usage: "95%" },
    { name: "Machine Learning", icon: <Brain className="h-5 w-5" />, usage: "88%" },
    { name: "Cloud Computing", icon: <Cloud className="h-5 w-5" />, usage: "92%" },
    { name: "Big Data Analytics", icon: <Database className="h-5 w-5" />, usage: "85%" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <Brain className="mr-2 h-4 w-4" />
            Smart Manufacturing
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Future of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Manufacturing
            </span>{" "}
            is Here
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform traditional manufacturing into intelligent, connected operations that adapt, learn, and optimize
            in real-time through advanced AI and IoT technologies.
          </p>
        </div>

        <Tabs defaultValue="digital-twin" value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-3xl">
              {smartManufacturingFeatures.map((feature) => (
                <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2 py-3 px-4">
                  {feature.icon}
                  <span className="hidden sm:inline">{feature.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {smartManufacturingFeatures.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 rounded-lg bg-gray-800">{feature.icon}</div>
                        <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      </div>
                      <p className="text-gray-300 text-lg">{feature.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-3">Key Benefits</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {feature.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-sm text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-400 mb-3">Performance Metrics</h4>
                        <div className="space-y-3">
                          {Object.entries(feature.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-sm text-gray-400 capitalize">{key}</span>
                              <Badge variant="secondary" className="bg-blue-900/30 text-blue-400">
                                {value}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h4 className="font-semibold mb-4">Technology Implementation</h4>

                    {/* Interactive Demo Visualization */}
                    <div className="bg-gray-950 rounded-lg p-6 mb-6 min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <p className="text-gray-400 mb-2">Interactive Demo</p>
                        <p className="text-sm text-gray-500">{feature.title} Simulation</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-300">Technology Stack</h5>
                      {technologyStack.map((tech, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="text-blue-400">{tech.icon}</div>
                            <span className="text-sm text-gray-300">{tech.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                style={{ width: tech.usage }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{tech.usage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

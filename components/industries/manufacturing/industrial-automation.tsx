"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BotIcon as Robot, Cog, Zap, BarChart3, ArrowRight, Play } from "lucide-react"

export default function IndustrialAutomationSection() {
  const [activeAutomation, setActiveAutomation] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const automationSolutions = [
    {
      title: "Robotic Process Automation",
      description: "Intelligent robots that handle repetitive tasks with precision and consistency",
      icon: <Robot className="h-8 w-8 text-blue-400" />,
      applications: ["Assembly line automation", "Quality inspection", "Material handling", "Packaging operations"],
      benefits: { productivity: "+65%", accuracy: "99.8%", cost: "-40%" },
      image: "/images/manufacturing/robotic-automation.jpg",
    },
    {
      title: "Automated Quality Control",
      description: "AI-powered vision systems that detect defects and ensure product quality",
      icon: <Cog className="h-8 w-8 text-green-400" />,
      applications: [
        "Visual inspection",
        "Dimensional analysis",
        "Surface defect detection",
        "Compliance verification",
      ],
      benefits: { defects: "-85%", speed: "10x", reliability: "99.9%" },
      image: "/images/manufacturing/quality-control.jpg",
    },
    {
      title: "Smart Production Lines",
      description: "Interconnected systems that optimize workflow and resource utilization",
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      applications: ["Workflow optimization", "Resource allocation", "Bottleneck elimination", "Real-time adjustments"],
      benefits: { efficiency: "+55%", waste: "-45%", throughput: "+38%" },
      image: "/images/manufacturing/smart-production.jpg",
    },
  ]

  const automationStats = [
    { label: "Manufacturing Plants Automated", value: "2,500+", trend: "+23%" },
    { label: "Average ROI", value: "340%", trend: "+15%" },
    { label: "Defect Reduction", value: "87%", trend: "+12%" },
    { label: "Energy Savings", value: "32%", trend: "+8%" },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveAutomation((prev) => (prev + 1) % automationSolutions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, automationSolutions.length])

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium mb-4">
            <Robot className="mr-2 h-4 w-4" />
            Industrial Automation
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Automate Your{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Manufacturing
            </span>{" "}
            Operations
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leverage cutting-edge automation technologies to streamline operations, reduce human error, and achieve
            unprecedented levels of efficiency and quality in your manufacturing processes.
          </p>
        </div>

        {/* Automation Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {automationStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <Badge variant="secondary" className="bg-green-900/30 text-green-400 text-xs">
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Automation Showcase */}
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-gray-400 hover:text-white"
              >
                <Play className={`h-4 w-4 mr-2 ${isPlaying ? "animate-pulse" : ""}`} />
                {isPlaying ? "Auto-playing" : "Paused"}
              </Button>

              <div className="flex space-x-2">
                {automationSolutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveAutomation(index)
                      setIsPlaying(false)
                    }}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      activeAutomation === index ? "bg-green-500" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            key={activeAutomation}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 rounded-lg bg-gray-800">{automationSolutions[activeAutomation].icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{automationSolutions[activeAutomation].title}</h3>
                    <Badge variant="outline" className="mt-1">
                      Solution {activeAutomation + 1} of {automationSolutions.length}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8">{automationSolutions[activeAutomation].description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Key Applications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {automationSolutions[activeAutomation].applications.map((app, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-300">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Performance Impact</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(automationSolutions[activeAutomation].benefits).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-gray-800 rounded-lg">
                          <div className="text-lg font-bold text-green-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="mt-8 bg-green-600 hover:bg-green-700">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent lg:bg-gradient-to-r"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                      {automationSolutions[activeAutomation].icon}
                    </div>
                    <p className="text-gray-400">Automation Visualization</p>
                    <p className="text-sm text-gray-500">{automationSolutions[activeAutomation].title}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Automation Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                Increased Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Automation reduces cycle times and eliminates bottlenecks, resulting in significant productivity gains.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Productivity Increase</span>
                  <span className="text-sm font-semibold text-blue-400">+65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Cycle Time Reduction</span>
                  <span className="text-sm font-semibold text-blue-400">-45%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="h-5 w-5 text-green-400 mr-2" />
                Enhanced Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Consistent, precise operations eliminate human error and ensure superior product quality.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Defect Reduction</span>
                  <span className="text-sm font-semibold text-green-400">-87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Quality Consistency</span>
                  <span className="text-sm font-semibold text-green-400">99.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-purple-400 mr-2" />
                Cost Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Lower labor costs, reduced waste, and improved resource utilization drive significant savings.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Operating Cost Reduction</span>
                  <span className="text-sm font-semibold text-purple-400">-40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Waste Reduction</span>
                  <span className="text-sm font-semibold text-purple-400">-52%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Target } from "lucide-react"

const kpiData = [
  {
    id: 1,
    title: "Active AI Models",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Activity,
    color: "text-green-500",
  },
  {
    id: 2,
    title: "Processing Speed",
    value: "2.3ms",
    change: "-15%",
    trend: "down",
    icon: TrendingUp,
    color: "text-blue-500",
  },
  {
    id: 3,
    title: "Client Satisfaction",
    value: "98.7%",
    change: "+2.1%",
    trend: "up",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Revenue Impact",
    value: "$2.4M",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
  },
  {
    id: 5,
    title: "Accuracy Rate",
    value: "99.2%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    color: "text-orange-500",
  },
]

export function LiveKPIStream() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % kpiData.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30">
            <Activity className="w-4 h-4 mr-2" />
            Live Performance Metrics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-luminous-white mb-4">Real-Time Business Intelligence</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Watch our AI-powered solutions deliver measurable results across key performance indicators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                currentIndex === index ? "scale-105 ring-2 ring-electric-cyan/50" : ""
              } transition-all duration-300`}
            >
              <Card className="bg-gray-900/60 backdrop-blur-md border-gray-700 hover:border-electric-cyan/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`${kpi.color} mb-3 flex justify-center`}>
                    <kpi.icon className="h-8 w-8" />
                  </div>
                  <div className="text-2xl font-bold text-luminous-white mb-1">{kpi.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{kpi.title}</div>
                  <div
                    className={`flex items-center justify-center text-sm ${
                      kpi.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {kpi.change}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

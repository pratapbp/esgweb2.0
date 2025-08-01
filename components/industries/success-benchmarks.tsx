"use client"

import { motion } from "framer-motion"
import { TrendingUp, Shield, Activity, Zap, Users, Globe, BarChart3, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const benchmarks = [
  {
    icon: Shield,
    industry: "BFSI",
    metric: "$250M+",
    description: "Fraud prevented with AI-powered detection",
    improvement: "94% reduction in false positives",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Activity,
    industry: "Manufacturing",
    metric: "60%",
    description: "Fewer supply chain disruptions",
    improvement: "Predictive maintenance ROI: 340%",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    icon: Users,
    industry: "Healthcare",
    metric: "24x7",
    description: "Patient intake via RPA bots",
    improvement: "85% faster claim processing",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    icon: Zap,
    industry: "Energy",
    metric: "99.5%",
    description: "Uptime for grid analytics",
    improvement: "40% reduction in energy waste",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Globe,
    industry: "Telecom",
    metric: "5G+AI",
    description: "Network optimization at scale",
    improvement: "50% faster service deployment",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: BarChart3,
    industry: "Retail",
    metric: "98%",
    description: "Inventory accuracy with AI",
    improvement: "30% increase in customer satisfaction",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    icon: Target,
    industry: "Pharma",
    metric: "3x",
    description: "Faster drug discovery with AI",
    improvement: "60% reduction in R&D costs",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
  {
    icon: TrendingUp,
    industry: "Logistics",
    metric: "45%",
    description: "Route optimization improvement",
    improvement: "Real-time tracking: 99.9% accuracy",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
  },
]

export default function SuccessBenchmarks() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm border-purple-500/30 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 transition-colors duration-300 mb-6"
          >
            Success Benchmarks
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">
              Proven Results
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Across Industries
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real impact delivered through AI-powered SAP solutions across diverse industry verticals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((benchmark, index) => (
            <motion.div
              key={benchmark.industry}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`group hover:shadow-2xl transition-all duration-300 border-2 ${benchmark.borderColor} ${benchmark.bgColor} hover:scale-105 cursor-pointer h-full`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${benchmark.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <benchmark.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-800/50 text-gray-300 border-gray-700">
                      {benchmark.industry}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {benchmark.metric}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{benchmark.description}</p>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400">{benchmark.improvement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">Ready to achieve similar results in your industry?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Industry Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all duration-300"
            >
              Download Benchmark Report
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

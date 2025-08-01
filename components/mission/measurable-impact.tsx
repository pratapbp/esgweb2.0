"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function MeasurableImpact() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isChartInView = useInView(chartRef, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-3 mb-8">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Measurable Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Quantifiable{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Mission Results
            </span>
          </h2>
          <p className="text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            Our mission translates to tangible results for our clients. Here's how our AI-enhanced SAP solutions have
            delivered quantifiable business outcomes across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-emerald-800/40 backdrop-blur-sm border border-emerald-400/20 rounded-2xl p-6 group hover:bg-emerald-800/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      metric.color === "emerald"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : metric.color === "teal"
                          ? "bg-teal-500/20 text-teal-400"
                          : "bg-green-500/20 text-green-400",
                    )}
                  >
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-100">{metric.title}</h3>
                </div>

                <div className="flex justify-between items-baseline mb-3">
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                  <div
                    className={cn(
                      "text-sm font-medium px-2 py-1 rounded-full",
                      metric.trend === "up" ? "text-emerald-400 bg-emerald-500/20" : "text-red-400 bg-red-500/20",
                    )}
                  >
                    {metric.trend === "up" ? "↗" : "↘"} {metric.change}
                  </div>
                </div>
                <p className="text-emerald-100/70 text-sm leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          <div
            ref={chartRef}
            className="lg:col-span-8 bg-emerald-800/30 backdrop-blur-sm border border-emerald-400/20 rounded-2xl p-8 h-[450px]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isChartInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-emerald-100 mb-2">Mission Impact Trajectory</h3>
                <p className="text-emerald-100/70 text-sm">
                  Quarterly performance metrics across key transformation areas
                </p>
              </div>

              <ChartContainer
                config={{
                  efficiency: {
                    label: "Operational Efficiency",
                    color: "rgb(16, 185, 129)",
                  },
                  innovation: {
                    label: "Innovation Rate",
                    color: "rgb(20, 184, 166)",
                  },
                  sustainability: {
                    label: "Sustainability Impact",
                    color: "rgb(34, 197, 94)",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.2)" />
                    <XAxis dataKey="quarter" stroke="rgba(16, 185, 129, 0.7)" />
                    <YAxis stroke="rgba(16, 185, 129, 0.7)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="var(--color-efficiency)"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "var(--color-efficiency)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="innovation"
                      stroke="var(--color-innovation)"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "var(--color-innovation)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sustainability"
                      stroke="var(--color-sustainability)"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "var(--color-sustainability)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const impactMetrics = [
  {
    title: "Operational Efficiency",
    value: "43%",
    change: "12% YoY",
    trend: "up",
    color: "emerald",
    icon: Target,
    description: "Average increase in operational efficiency across SAP implementations with AI enhancement",
  },
  {
    title: "Innovation Velocity",
    value: "2.8x",
    change: "0.4x Q/Q",
    trend: "up",
    color: "teal",
    icon: Zap,
    description: "Multiplier of innovation velocity compared to traditional SAP transformation approaches",
  },
  {
    title: "Sustainability Impact",
    value: "31%",
    change: "7% YoY",
    trend: "up",
    color: "green",
    icon: TrendingUp,
    description: "Reduction in resource consumption through optimized SAP processes and AI automation",
  },
]

const chartData = [
  { quarter: "Q1 '23", efficiency: 15, innovation: 10, sustainability: 12 },
  { quarter: "Q2 '23", efficiency: 22, innovation: 15, sustainability: 18 },
  { quarter: "Q3 '23", efficiency: 28, innovation: 23, sustainability: 22 },
  { quarter: "Q4 '23", efficiency: 32, innovation: 27, sustainability: 24 },
  { quarter: "Q1 '24", efficiency: 37, innovation: 32, sustainability: 26 },
  { quarter: "Q2 '24", efficiency: 43, innovation: 38, sustainability: 31 },
]

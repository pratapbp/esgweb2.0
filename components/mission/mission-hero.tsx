"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MissionHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-400/30">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-emerald-400 font-semibold text-lg tracking-wide">OUR MISSION</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Transforming</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Enterprise Excellence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-emerald-100/90 mb-8 leading-relaxed max-w-4xl">
            We revolutionize businesses through intelligent SAP solutions, strategically enhanced by AI to maximize
            operational excellence, drive innovation, and create sustainable competitive advantages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              className="group text-lg px-8 py-6 bg-emerald-500 hover:bg-emerald-400 text-white border-0 shadow-lg shadow-emerald-500/25"
              size="lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              <span>Discover Our Approach</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-6 border-emerald-400/50 text-emerald-100 hover:bg-emerald-500/10 hover:border-emerald-400 bg-transparent"
              size="lg"
            >
              Explore Solutions
            </Button>
          </div>

          {/* Mission metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            {missionMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-emerald-900/30 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-emerald-400 mb-1">{metric.value}</div>
                <div className="text-emerald-100/80 text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated accent elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </section>
  )
}

const missionMetrics = [
  { value: "500+", label: "Enterprise Transformations" },
  { value: "98%", label: "Client Success Rate" },
  { value: "15+", label: "Years of SAP Excellence" },
]

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, ArrowRight, Play, Mic, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const heroMessages = [
  "Think SAP. Choose ESG.",
  "Shaping a Smarter, More Sustainable Future",
  "Intelligence. Innovation. Integrity.",
  "Experience ESGit's AI Operating System",
]

export default function AIHeroSection() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % heroMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          className="w-96 h-96 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* Neural Network Visualization */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-cyan-500 rounded-full"
              style={{
                top: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 8)}%`,
                left: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 8)}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}

          {/* Central Core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.4)",
                "0 0 40px rgba(6, 182, 212, 0.6)",
                "0 0 20px rgba(6, 182, 212, 0.4)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Brain className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* AI Status Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/30 px-4 py-2 text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
              ESGit AI OS Online
            </Badge>
          </motion.div>

          {/* Dynamic Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-100">Think </span>
              <span className="text-gradient">SAP</span>
              <span className="text-slate-100">.</span>
              <br />
              <span className="text-slate-100">Choose </span>
              <span className="text-gradient">ESG</span>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl md:text-2xl text-slate-100/90 mb-8 font-light"
              >
                {heroMessages[currentMessage]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button className="btn-primary px-8 py-4 text-lg font-semibold group">
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Discover
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button className="btn-secondary px-8 py-4 text-lg group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>

            <Button className="btn-ghost px-8 py-4 text-lg group">
              <Mic className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Voice Assistant
            </Button>
          </motion.div>

          {/* AI Capabilities Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Brain, title: "AI-Powered SAP", desc: "Intelligent enterprise solutions" },
              { icon: Zap, title: "Real-time Analytics", desc: "Instant business insights" },
              { icon: Sparkles, title: "Predictive Intelligence", desc: "Future-ready decisions" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl hover:bg-white/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <item.icon className="h-8 w-8 text-cyan-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function MissionStatement() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-3 mb-8">
              <Quote className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Mission Statement</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-8">
              Transforming Enterprises Through
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                Intelligent SAP Solutions
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="bg-emerald-900/30 backdrop-blur-sm border border-emerald-400/20 rounded-2xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-emerald-100 leading-relaxed mb-6">
                At ESG Inc, we are committed to revolutionizing enterprise operations through our expertise in SAP
                solutions and AI integration. Our mission is to bridge the gap between traditional enterprise systems
                and cutting-edge technologies, creating intelligent ecosystems that drive sustainable business value.
              </p>

              <p className="text-xl md:text-2xl text-emerald-100/90 leading-relaxed">
                We believe in delivering excellence through innovation, integrity, and results-driven approaches. Our
                focus extends beyond implementation to encompass comprehensive transformation, ensuring our clients
                achieve lasting competitive advantages in their industries.
              </p>
            </div>

            {/* Mission principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {missionPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-emerald-800/40 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{principle.icon}</div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">{principle.title}</h3>
                  <p className="text-emerald-100/80 text-sm">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          />
        </div>
      </div>
    </section>
  )
}

const missionPrinciples = [
  {
    title: "Innovation First",
    description: "Leading with cutting-edge AI and SAP technologies",
    icon: "🚀",
  },
  {
    title: "Client Success",
    description: "Delivering measurable business outcomes and value",
    icon: "🎯",
  },
  {
    title: "Sustainable Growth",
    description: "Building solutions that evolve with your business",
    icon: "🌱",
  },
]

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Cpu, Eye, Network, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function FutureFocus() {
  const [activeIndex, setActiveIndex] = useState(0)
  const futureAreas = [
    {
      title: "Autonomous SAP Systems",
      description:
        "Creating self-managing, self-healing SAP landscapes that minimize manual intervention and maximize system availability and performance.",
      icon: Cpu,
      initiatives: [
        "Self-tuning databases and applications",
        "Predictive maintenance systems",
        "Auto-scaling resource management",
        "Proactive anomaly detection and resolution",
      ],
    },
    {
      title: "Hyper-personalized User Experiences",
      description:
        "Tailoring SAP interfaces and workflows to individual user patterns, preferences, and business needs through advanced AI personalization.",
      icon: Eye,
      initiatives: [
        "AI-driven interface adaptation",
        "Context-aware workflow suggestions",
        "Behavioral pattern recognition",
        "Dynamic information prioritization",
      ],
    },
    {
      title: "Intelligent Enterprise Integration",
      description:
        "Seamlessly connecting SAP ecosystems with broader technology landscapes through smart, adaptive integrations that evolve with business needs.",
      icon: Network,
      initiatives: [
        "Dynamic API orchestration",
        "Cross-system process optimization",
        "Real-time data synchronization",
        "Intelligent integration monitoring",
      ],
    },
    {
      title: "Quantum-Enhanced Analytics",
      description:
        "Leveraging quantum computing capabilities to solve previously impossible SAP data analysis problems and unlock new insights.",
      icon: Zap,
      initiatives: [
        "Quantum algorithm exploration",
        "Complex optimization problems",
        "Supply chain scenario planning",
        "Financial risk modeling",
      ],
    },
  ]

  const ActiveAreaIcon = futureAreas[activeIndex].icon
  const ActiveAreaTitle = futureAreas[activeIndex].title
  const ActiveAreaDescription = futureAreas[activeIndex].description
  const ActiveAreaInitiatives = futureAreas[activeIndex].initiatives

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(30deg, transparent 40%, rgba(16, 185, 129, 0.1) 50%, transparent 60%)`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Future Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our <span className="text-emerald-600">Future Focus</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            As we continue our mission, these strategic focus areas guide our innovation and development of
            next-generation SAP solutions that will define the future of enterprise transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {futureAreas.map((area, index) => (
              <button
                key={area.title}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full text-left p-6 border-l-4 transition-all duration-300 rounded-r-xl",
                  activeIndex === index
                    ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10"
                    : "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-25",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        activeIndex === index ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600",
                      )}
                    >
                      <area.icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={cn(
                        "text-lg font-semibold",
                        activeIndex === index ? "text-emerald-700" : "text-gray-900",
                      )}
                    >
                      {area.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 transition-transform",
                      activeIndex === index ? "rotate-90 text-emerald-600" : "text-gray-400",
                    )}
                  />
                </div>

                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                    <ul className="space-y-2">
                      {area.initiatives.map((initiative) => (
                        <li key={initiative} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 mr-3 shrink-0"></span>
                          <span className="text-gray-700 text-sm">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <ActiveAreaIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-emerald-100 text-sm font-medium">2025+ Vision</div>
                </div>

                <h4 className="text-2xl font-bold mb-4">{ActiveAreaTitle}</h4>
                <p className="text-emerald-100 leading-relaxed mb-6">{ActiveAreaDescription}</p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm font-medium text-emerald-200 mb-2">Key Initiatives:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {ActiveAreaInitiatives.slice(0, 2).map((initiative) => (
                      <div key={initiative} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                        <span className="text-emerald-100 text-sm">{initiative}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="mt-6 flex gap-2 justify-center">
              {futureAreas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === index ? "w-8 bg-emerald-500" : "w-2 bg-emerald-200 hover:bg-emerald-300",
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

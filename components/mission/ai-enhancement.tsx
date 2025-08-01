"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Bot, BrainCircuit, Database, BarChart4, Network, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiEnhancement() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-cycle through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % aiEnhancements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const activeEnhancement = aiEnhancements[activeTab]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BrainCircuit className="w-4 h-4" />
              AI-Enhanced Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How <span className="text-emerald-600">AI Amplifies</span> Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our mission is amplified through strategic AI integration, creating more intelligent, adaptive, and
              powerful SAP solutions that deliver transformative business outcomes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Enhancement Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-lg shadow-emerald-500/10"
          >
            <div className="space-y-4">
              {aiEnhancements.map((enhancement, index) => (
                <button
                  key={enhancement.title}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-4",
                    activeTab === index
                      ? "bg-emerald-50 border border-emerald-200 shadow-sm"
                      : "hover:bg-emerald-25 hover:border-emerald-100 border border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg shrink-0",
                      activeTab === index ? "text-emerald-600 bg-emerald-100" : "text-gray-500 bg-gray-100",
                    )}
                  >
                    <enhancement.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-1",
                        activeTab === index ? "text-emerald-700" : "text-gray-900",
                      )}
                    >
                      {enhancement.title}
                    </h3>
                    {activeTab === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-gray-600 text-sm leading-relaxed"
                      >
                        {enhancement.description}
                      </motion.p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="mb-6">
                {activeEnhancement.icon && <activeEnhancement.icon className="w-12 h-12 text-emerald-200 mb-4" />}
                <h4 className="text-2xl font-bold mb-2">{activeEnhancement.title}</h4>
                <p className="text-emerald-100 leading-relaxed">{activeEnhancement.description}</p>
              </div>

              <div className="flex items-center text-emerald-200 hover:text-white transition-colors cursor-pointer">
                <span className="font-medium">Explore Implementation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 flex gap-2 justify-center">
              {aiEnhancements.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeTab === index ? "w-8 bg-emerald-500" : "w-2 bg-emerald-200",
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

const aiEnhancements = [
  {
    title: "Intelligent Process Enhancement",
    description:
      "AI analyzes SAP workflows to identify bottlenecks, predict optimization opportunities, and automate routine tasks, boosting operational efficiency by up to 40%.",
    icon: Zap,
  },
  {
    title: "Predictive Analytics & Insights",
    description:
      "Machine learning models extract deeper insights from SAP data, enabling more accurate forecasting and proactive decision-making across all business functions.",
    icon: BarChart4,
  },
  {
    title: "Cognitive Data Integration",
    description:
      "AI enhances data integration across SAP systems, ensuring cleaner data flows, automatic classification, and smarter data governance protocols.",
    icon: Database,
  },
  {
    title: "Neural Network Optimization",
    description:
      "Advanced neural networks continuously optimize SAP configurations based on usage patterns, business priorities, and performance metrics.",
    icon: Network,
  },
  {
    title: "Conversational Business Intelligence",
    description:
      "Natural language processing enables intuitive interaction with SAP systems, democratizing access to enterprise data and insights.",
    icon: Bot,
  },
  {
    title: "Cognitive Computing Integration",
    description:
      "Combining SAP with cognitive computing creates systems that can reason, learn, and adapt to changing business conditions in real-time.",
    icon: BrainCircuit,
  },
]

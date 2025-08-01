"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowRight, BrainCircuit, Database, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SapAiIntegrationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const integrations = [
    {
      title: "Predictive Analytics",
      description: "AI-powered forecasting integrated with SAP data for accurate business predictions.",
      icon: <BarChart3 className="h-6 w-6" />,
      image: "/images/ai-predictive-scoring.jpg",
    },
    {
      title: "Intelligent Automation",
      description: "Automate complex SAP workflows with AI-driven decision making.",
      icon: <Zap className="h-6 w-6" />,
      image: "/interconnected-automation.png",
    },
    {
      title: "Natural Language Processing",
      description: "Extract insights from unstructured data within your SAP ecosystem.",
      icon: <BrainCircuit className="h-6 w-6" />,
      image: "/abstract-ai-network.png",
    },
    {
      title: "Data Intelligence",
      description: "Unified data management combining SAP and non-SAP sources for comprehensive insights.",
      icon: <Database className="h-6 w-6" />,
      image: "/images/sap-data-architecture.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 mb-4">
            <BrainCircuit className="h-5 w-5 mr-2" />
            <span className="font-medium">Intelligent Enterprise</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            SAP + AI <span className="gradient-text">Integration</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how we seamlessly integrate artificial intelligence with SAP to create intelligent enterprise
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

                <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-blue-600">{item.icon}</div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>

                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-violet-900/30 backdrop-blur-sm rounded-xl border border-blue-800/30 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold mb-2">Ready to transform your enterprise with AI-enhanced SAP?</h3>
            <p className="text-gray-300">Schedule a consultation with our experts to explore the possibilities.</p>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
            Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

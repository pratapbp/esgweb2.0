"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowRight, BrainCircuit, Database, Workflow, Zap, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AiWorkflowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const workflowSteps = [
    {
      title: "Data Collection",
      description: "Intelligent data gathering from SAP and non-SAP sources",
      icon: <Database className="h-6 w-6" />,
      image: "/images/workflow/data-collection.jpg",
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "AI Processing",
      description: "Advanced algorithms analyze and extract insights",
      icon: <BrainCircuit className="h-6 w-6" />,
      image: "/images/workflow/ai-processing.jpg",
      color: "from-violet-600 to-violet-400",
    },
    {
      title: "Enrichment",
      description: "Data enrichment with contextual intelligence",
      icon: <Zap className="h-6 w-6" />,
      image: "/images/workflow/lead-enrichment.jpg",
      color: "from-emerald-600 to-emerald-400",
    },
    {
      title: "Personalization",
      description: "Tailored recommendations and insights",
      icon: <LineChart className="h-6 w-6" />,
      image: "/images/workflow/personalization.jpg",
      color: "from-amber-600 to-amber-400",
    },
    {
      title: "Automation",
      description: "Intelligent process automation and execution",
      icon: <Workflow className="h-6 w-6" />,
      image: "/images/workflow/automation.jpg",
      color: "from-red-600 to-red-400",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 mb-4">
            <BrainCircuit className="h-5 w-5 mr-2" />
            <span className="font-medium">AI-Powered Workflow</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent <span className="gradient-text">SAP Processes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our AI technologies enhance and transform traditional SAP workflows into intelligent business
            processes.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Connecting lines */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-violet-600 to-red-600 transform -translate-y-1/2 hidden lg:block"></div>

          {/* Workflow steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step number indicator */}
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700 z-10">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>

                {/* Step card */}
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48">
                    <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                    {/* Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color}`}>{step.icon}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated dots on the line */}
          <div className="hidden lg:block">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${index * 25}%` }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: [0, 1.5, 1] } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/50"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
            Explore AI Capabilities <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

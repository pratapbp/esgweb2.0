"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import DataEngineIcon from "../icons/data-engine-icon"
import CloudEngineIcon from "../icons/cloud-engine-icon"
import SecurityEngineIcon from "../icons/security-engine-icon"
import IntegrationEngineIcon from "../icons/integration-engine-icon"

export default function SapProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "SAP S/4HANA Transformation",
      description:
        "Complete digital core transformation with SAP S/4HANA, enabling real-time analytics and streamlined processes.",
      image: "/images/sap-workflow/data-integration.jpg",
      icon: DataEngineIcon,
      color: "from-blue-600 to-blue-400",
      benefits: [
        "30% faster financial close process",
        "Real-time inventory visibility",
        "Unified data model across enterprise",
        "Simplified IT landscape",
      ],
      diagram: "/images/sap-workflow/s4hana-diagram.jpg",
    },
    {
      title: "SAP Intelligent Supply Chain",
      description: "AI-enhanced supply chain management with predictive analytics and automated workflows.",
      image: "/images/sap-workflow/process-automation.jpg",
      icon: IntegrationEngineIcon,
      color: "from-purple-600 to-purple-400",
      benefits: [
        "40% reduction in stockouts",
        "Predictive demand forecasting",
        "Automated supplier management",
        "End-to-end supply chain visibility",
      ],
      diagram: "/images/sap-workflow/supply-chain-diagram.jpg",
    },
    {
      title: "SAP Analytics Cloud",
      description: "Comprehensive business intelligence platform with AI-powered insights and planning capabilities.",
      image: "/images/sap-workflow/analytics-insights.jpg",
      icon: CloudEngineIcon,
      color: "from-emerald-600 to-emerald-400",
      benefits: [
        "Self-service analytics dashboards",
        "AI-driven business insights",
        "Integrated planning and analysis",
        "Predictive forecasting models",
      ],
      diagram: "/images/sap-workflow/analytics-diagram.jpg",
    },
    {
      title: "SAP SuccessFactors",
      description: "Cloud-based human capital management solution with AI-powered talent analytics.",
      image: "/images/sap-workflow/user-experience.jpg",
      icon: SecurityEngineIcon,
      color: "from-amber-600 to-amber-400",
      benefits: [
        "Enhanced employee experience",
        "Data-driven talent decisions",
        "Streamlined HR processes",
        "Continuous performance management",
      ],
      diagram: "/images/sap-workflow/successfactors-diagram.jpg",
    },
  ]

  const currentProject = projects[activeProject]
  const IconComponent = currentProject.icon

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            SAP{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
              Project Showcase
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
            Explore our innovative SAP implementations that have transformed enterprises across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project Selection */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {projects.map((project, index) => {
                const ProjectIcon = project.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                      activeProject === index
                        ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/10"
                        : "border-gray-700 bg-gray-900/50 hover:bg-gray-800/70"
                    }`}
                    onClick={() => setActiveProject(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          activeProject === index ? "bg-gradient-to-r " + project.color : "bg-gray-800"
                        }`}
                      >
                        <ProjectIcon isActive={activeProject === index} />
                      </div>
                      <h3 className="text-lg font-semibold font-poppins">{project.title}</h3>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Project Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 overflow-hidden rounded-2xl border border-gray-700 bg-gray-900"
              ref={containerRef}
            >
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 bg-gradient-to-r ${currentProject.color}`}>
                    <IconComponent isActive={true} size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-poppins">{currentProject.title}</h3>
                </div>
                <p className="text-gray-300 font-poppins">{currentProject.description}</p>
              </div>

              <div className="relative h-[300px] border-b border-gray-800">
                <Image
                  src={currentProject.diagram || "/placeholder.svg"}
                  alt={`${currentProject.title} workflow diagram`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4 font-poppins">Key Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentProject.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-poppins">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 font-poppins">
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

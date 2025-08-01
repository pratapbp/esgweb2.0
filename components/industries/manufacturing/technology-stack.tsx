"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Cpu, Database, Cloud, Shield, BarChart3, Factory } from "lucide-react"

export default function TechnologyStack() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)

  const technologies = [
    {
      name: "SAP S/4HANA",
      description: "Core ERP system optimized for manufacturing with real-time analytics and simplified data model.",
      icon: <Database className="h-8 w-8 text-blue-400" />,
      category: "SAP",
    },
    {
      name: "SAP Manufacturing Execution",
      description: "Connects manufacturing processes with business operations for end-to-end visibility and control.",
      icon: <Factory className="h-8 w-8 text-blue-400" />,
      category: "SAP",
    },
    {
      name: "SAP Digital Manufacturing Cloud",
      description: "Cloud-based manufacturing solution that enables smart factory operations and insights.",
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      category: "SAP",
    },
    {
      name: "Machine Learning",
      description: "Advanced algorithms that learn from data to predict equipment failures and optimize operations.",
      icon: <Cpu className="h-8 w-8 text-purple-400" />,
      category: "AI",
    },
    {
      name: "Computer Vision",
      description: "AI-powered visual inspection that detects defects with greater accuracy than human inspection.",
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      category: "AI",
    },
    {
      name: "Predictive Analytics",
      description: "Data-driven insights that forecast trends, identify patterns, and recommend actions.",
      icon: <BarChart3 className="h-8 w-8 text-purple-400" />,
      category: "AI",
    },
  ]

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine SAP's enterprise solutions with cutting-edge AI technologies to deliver intelligent manufacturing
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div
                className={`p-6 rounded-xl border ${
                  tech.category === "SAP" ? "border-blue-700 bg-blue-900/10" : "border-purple-700 bg-purple-900/10"
                } transition-all hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  {tech.icon}
                  <span
                    className={`ml-3 text-xs font-bold uppercase px-2 py-1 rounded-full ${
                      tech.category === "SAP" ? "bg-blue-900/50 text-blue-300" : "bg-purple-900/50 text-purple-300"
                    }`}
                  >
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>

              {hoveredTech === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded transform rotate-3 ${
                    tech.category === "SAP" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  {tech.category === "SAP" ? "SAP Certified" : "AI-Powered"}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Integrated Technology Ecosystem</h3>
              <p className="text-gray-300 mb-6">
                Our solutions seamlessly integrate SAP's enterprise capabilities with advanced AI technologies to create
                a comprehensive manufacturing intelligence platform.
              </p>

              <ul className="space-y-3">
                {[
                  "End-to-end integration from shop floor to top floor",
                  "Real-time data flow between operational and business systems",
                  "Unified analytics across all manufacturing processes",
                  "Secure, scalable architecture for enterprise deployment",
                ].map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-blue-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/manufacturing/technology-integration.jpg"
                alt="Integrated technology ecosystem for manufacturing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

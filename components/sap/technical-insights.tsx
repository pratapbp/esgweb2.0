"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, Server, Database, Workflow, Gauge, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type InsightTab = "architecture" | "integration" | "performance" | "security"

type TechnicalPoint = {
  icon: React.ReactNode
  title: string
  description: string
}

export default function TechnicalInsights() {
  const [activeTab, setActiveTab] = useState<InsightTab>("architecture")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(typeof window !== "undefined")
  }, [])

  const tabsData = {
    architecture: {
      title: "SAP Architecture & Design",
      description:
        "Our AI-enhanced architecture designs optimize system performance, scalability, and integration capabilities.",
      points: [
        {
          icon: <Server className="h-5 w-5" />,
          title: "Microservices Integration",
          description: "AI-optimized microservices architecture that seamlessly integrates with your SAP core systems.",
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "HANA Optimization",
          description: "Advanced data modeling and query optimization leveraging AI to maximize SAP HANA performance.",
        },
        {
          icon: <Workflow className="h-5 w-5" />,
          title: "Flexible System Design",
          description:
            "Future-proof architecture that adapts to changing business requirements with minimal disruption.",
        },
      ],
    },
    integration: {
      title: "Integration Capabilities",
      description:
        "Connect your SAP ecosystem with internal and external systems through intelligent integration points.",
      points: [
        {
          icon: <Code className="h-5 w-5" />,
          title: "API Management",
          description:
            "AI-powered API design and management for seamless connectivity with minimal maintenance overhead.",
        },
        {
          icon: <Server className="h-5 w-5" />,
          title: "Multi-Cloud Strategy",
          description:
            "Intelligent cloud integration that optimizes workload distribution across multiple environments.",
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "Data Synchronization",
          description: "Real-time data synchronization between systems with AI-driven conflict resolution.",
        },
      ],
    },
    performance: {
      title: "Performance Optimization",
      description: "Maximize your SAP system performance with our AI-enhanced optimization techniques.",
      points: [
        {
          icon: <Gauge className="h-5 w-5" />,
          title: "Predictive Scaling",
          description:
            "AI algorithms that anticipate processing needs and scale resources proactively rather than reactively.",
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "Query Optimization",
          description:
            "Machine learning-powered query analysis and automatic optimization for HANA and traditional databases.",
        },
        {
          icon: <Server className="h-5 w-5" />,
          title: "Load Balancing",
          description: "Intelligent workload distribution that adapts to changing conditions and usage patterns.",
        },
      ],
    },
    security: {
      title: "Security & Compliance",
      description: "Protect your SAP ecosystem with our comprehensive security framework enhanced by AI capabilities.",
      points: [
        {
          icon: <Server className="h-5 w-5" />,
          title: "Threat Detection",
          description:
            "AI-powered anomaly detection that identifies potential security threats before they become problems.",
        },
        {
          icon: <Database className="h-5 w-5" />,
          title: "Compliance Automation",
          description:
            "Intelligent compliance monitoring and documentation that adapts to changing regulatory requirements.",
        },
        {
          icon: <Code className="h-5 w-5" />,
          title: "Secure Development",
          description: "AI-enhanced code scanning and security practices integrated into the development lifecycle.",
        },
      ],
    },
  }

  const currentTabData = tabsData[activeTab]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the technical foundation of our AI-enhanced SAP solutions that drive performance, security, and
              integration capabilities.
            </p>
          </motion.div>
        )}

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {(Object.keys(tabsData) as InsightTab[]).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 ${
                activeTab === tab ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700 hover:border-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Tab content */}
        {isClient && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentTabData.title}</h3>
                <p className="text-gray-300 md:max-w-2xl">{currentTabData.description}</p>
              </div>
              <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTabData.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                >
                  <div className="p-3 rounded-lg bg-blue-900/50 mb-4 inline-block">{point.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{point.title}</h4>
                  <p className="text-gray-400">{point.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Diagram Visualization */}
            <div className="mt-12 p-6 border border-gray-700 rounded-xl overflow-hidden">
              <h4 className="text-xl font-semibold mb-4 text-center">SAP System Architecture with AI Integration</h4>
              <div className="w-full h-[300px] bg-gray-800/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Code className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive architecture diagram will be displayed here</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

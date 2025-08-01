"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Code, Database, Shield, Cloud, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TechnicalCapabilities() {
  const [activeTab, setActiveTab] = useState("sap")

  const tabs = [
    { id: "sap", label: "SAP Technologies", icon: <Database className="h-5 w-5" /> },
    { id: "ai", label: "AI & ML", icon: <Cpu className="h-5 w-5" /> },
    { id: "cloud", label: "Cloud Infrastructure", icon: <Cloud className="h-5 w-5" /> },
    { id: "security", label: "Security", icon: <Shield className="h-5 w-5" /> },
    { id: "integration", label: "Integration", icon: <Code className="h-5 w-5" /> },
  ]

  const tabContent = {
    sap: {
      title: "SAP Technologies",
      description: "Our expertise spans the entire SAP ecosystem, from core ERP to specialized solutions.",
      image: "/images/sap-integration-diagram.jpg",
      features: [
        "SAP S/4HANA Implementation & Migration",
        "SAP Business Technology Platform (BTP)",
        "SAP Analytics Cloud & Business Intelligence",
        "SAP Customer Experience Solutions",
        "SAP Integrated Business Planning",
        "SAP SuccessFactors & Human Experience Management",
      ],
    },
    ai: {
      title: "AI & Machine Learning",
      description:
        "Cutting-edge artificial intelligence and machine learning capabilities that transform business processes.",
      image: "/ai-powered-insights.png",
      features: [
        "Natural Language Processing & Generation",
        "Computer Vision & Image Recognition",
        "Predictive Analytics & Forecasting",
        "Anomaly Detection & Pattern Recognition",
        "Recommendation Engines",
        "Reinforcement Learning Systems",
      ],
    },
    cloud: {
      title: "Cloud Infrastructure",
      description: "Secure, scalable cloud solutions that provide the foundation for your digital transformation.",
      image: "/interconnected-tech-network.png",
      features: [
        "Multi-Cloud Architecture Design",
        "Cloud Migration & Optimization",
        "Serverless Computing",
        "Containerization & Orchestration",
        "Infrastructure as Code (IaC)",
        "Cloud Cost Optimization",
      ],
    },
    security: {
      title: "Security",
      description: "Comprehensive security solutions to protect your SAP and AI investments.",
      image: "/images/services/cybersecurity.jpg",
      features: [
        "SAP Security & Authorization",
        "Data Protection & Privacy",
        "Identity & Access Management",
        "Threat Detection & Response",
        "Security Compliance & Governance",
        "Secure DevOps Practices",
      ],
    },
    integration: {
      title: "Integration",
      description: "Seamless integration capabilities that connect your enterprise systems and data sources.",
      image: "/images/data-integration.jpg",
      features: [
        "API Management & Development",
        "Enterprise Application Integration",
        "Data Integration & ETL",
        "Microservices Architecture",
        "Event-Driven Architecture",
        "Legacy System Integration",
      ],
    },
  }

  const currentContent = tabContent[activeTab as keyof typeof tabContent]

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced technical stack powers enterprise-grade SAP and AI solutions.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                activeTab === tab.id
                  ? "border-blue-500 bg-blue-900/20 text-blue-400"
                  : "border-gray-700 hover:border-gray-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{currentContent.title}</h3>
              <p className="text-gray-300 mb-6">{currentContent.description}</p>

              <div className="space-y-3 mb-8">
                {currentContent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore {currentContent.title} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-700">
              <Image
                src={currentContent.image || "/placeholder.svg"}
                alt={currentContent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

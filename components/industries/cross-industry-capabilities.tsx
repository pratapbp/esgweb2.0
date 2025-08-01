"use client"

import { motion } from "framer-motion"
import { Database, Cloud, Shield, BarChart3, Cpu, Workflow } from "lucide-react"

export default function CrossIndustryCapabilities() {
  const capabilities = [
    {
      title: "Data & Analytics",
      description: "Transform raw data into actionable insights with our advanced analytics solutions",
      icon: <Database className="h-10 w-10" />,
    },
    {
      title: "Cloud Solutions",
      description: "Accelerate innovation with scalable, secure cloud infrastructure and applications",
      icon: <Cloud className="h-10 w-10" />,
    },
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security strategies and solutions",
      icon: <Shield className="h-10 w-10" />,
    },
    {
      title: "Business Intelligence",
      description: "Make data-driven decisions with powerful BI tools and dashboards",
      icon: <BarChart3 className="h-10 w-10" />,
    },
    {
      title: "AI & Machine Learning",
      description: "Leverage AI to automate processes and uncover new business opportunities",
      icon: <Cpu className="h-10 w-10" />,
    },
    {
      title: "Process Automation",
      description: "Streamline operations with intelligent automation and workflow solutions",
      icon: <Workflow className="h-10 w-10" />,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cross-Industry Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core technology capabilities that drive transformation across all industries
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-primary mb-4">{capability.icon}</div>
              <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
              <p className="text-muted-foreground">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

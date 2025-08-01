"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Cloud, Shield, Code, Cpu, Network, Sparkles, Layers, GitBranch, Server } from "lucide-react"

const technologies = [
  {
    category: "Artificial Intelligence",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    techs: ["GPT-4", "TensorFlow", "PyTorch", "Hugging Face", "OpenAI API", "LangChain"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
    techs: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform"],
  },
  {
    category: "Data & Analytics",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    techs: ["SAP HANA", "Snowflake", "Apache Spark", "Databricks", "Power BI", "Tableau"],
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    techs: ["Zero Trust", "OAuth 2.0", "SAML", "Encryption", "GDPR", "SOC 2"],
  },
  {
    category: "Development Stack",
    icon: Code,
    color: "from-indigo-500 to-purple-500",
    techs: ["Next.js", "React", "Node.js", "Python", "TypeScript", "GraphQL"],
  },
  {
    category: "Integration & APIs",
    icon: Network,
    color: "from-yellow-500 to-orange-500",
    techs: ["REST APIs", "GraphQL", "SAP APIs", "Webhooks", "Message Queues", "Event Streaming"],
  },
]

const floatingElements = [
  { icon: Cpu, position: "top-10 left-10", delay: 0 },
  { icon: Server, position: "top-20 right-20", delay: 0.5 },
  { icon: GitBranch, position: "bottom-20 left-20", delay: 1 },
  { icon: Layers, position: "bottom-10 right-10", delay: 1.5 },
]

export function TechInnovationWall() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900/20 to-gray-800/20">
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: element.delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className={`absolute ${element.position} text-electric-cyan`}
        >
          <element.icon className="h-16 w-16" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Technology Innovation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Cutting-Edge Technology Stack</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on the most advanced technologies to deliver unparalleled performance and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tech.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-luminous-white group-hover:text-electric-cyan transition-colors">
                      {tech.category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {tech.techs.map((techName, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + techIndex * 0.05 }}
                        className="bg-gray-800/50 rounded-lg p-3 text-center hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <span className="text-sm font-medium text-gray-300">{techName}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Innovation Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50+", label: "Technologies Integrated" },
            { value: "99.9%", label: "System Uptime" },
            { value: "10x", label: "Performance Improvement" },
            { value: "24/7", label: "Continuous Innovation" },
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-electric-cyan mb-2">{metric.value}</div>
              <div className="text-gray-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

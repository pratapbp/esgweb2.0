"use client"

import { motion } from "framer-motion"
import { Database, Cloud, Shield, Zap, Brain, Code } from "lucide-react"

const techCategories = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    technologies: ["GPT-4", "TensorFlow", "PyTorch", "Hugging Face", "OpenAI"],
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "SAP Ecosystem",
    icon: Database,
    technologies: ["S/4HANA", "SuccessFactors", "Ariba", "Concur", "Fieldglass"],
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Docker"],
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    title: "Blockchain & Security",
    icon: Shield,
    technologies: ["Ethereum", "Polygon", "Hyperledger", "Web3", "Smart Contracts"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Automation & RPA",
    icon: Zap,
    technologies: ["UiPath", "Automation Anywhere", "Blue Prism", "Power Automate"],
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Development Stack",
    icon: Code,
    technologies: ["Next.js", "React", "Node.js", "Python", "TypeScript"],
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
]

export default function AITechStack() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mb-6">Cutting-Edge Technology Stack</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built on the most advanced technologies to deliver unparalleled performance, security, and scalability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:bg-white/40 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-700">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + techIndex * 0.05 }}
                    className="flex items-center justify-between p-3 bg-white/30 rounded-lg hover:bg-white/50 transition-all duration-200"
                  >
                    <span className="font-medium text-slate-700">{tech}</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

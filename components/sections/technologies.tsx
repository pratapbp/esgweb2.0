"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Cpu, Database, Layers, Lightbulb, Cog, Bot, Network, Lock } from "lucide-react"

export default function Technologies() {
  const technologies = [
    {
      title: "General AI (Strong AI)",
      description: "Advanced AI systems capable of understanding, learning, and applying knowledge across domains.",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Superintelligent AI",
      description: "Next-generation AI with cognitive capabilities surpassing human intelligence in most domains.",
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Reactive Machines",
      description: "AI systems that respond to different kinds of stimuli without prior memory or past experiences.",
      icon: <Cog className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Limited Memory",
      description: "AI that can use past experiences to inform future decisions, learning from historical data.",
      icon: <Database className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Theory of Mind",
      description: "Advanced AI capable of understanding emotions, beliefs, and thoughts of other entities.",
      icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Self-aware AI",
      description: "Future AI systems with consciousness and understanding of their own existence.",
      icon: <Bot className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Machine Learning (ML)",
      description: "Systems that automatically learn and improve from experience without explicit programming.",
      icon: <Network className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Blockchain",
      description: "Decentralized, secure ledger technology enabling transparent and immutable record-keeping.",
      icon: <Layers className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Robotic Process Automation (RPA)",
      description: "Technology that automates repetitive tasks through software robots or artificial intelligence.",
      icon: <Lock className="h-8 w-8 text-blue-500" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="technologies" className="py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Cutting-Edge <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We leverage advanced technologies to deliver innovative solutions
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="tech-grid"
        >
          {technologies.map((tech, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-900/50 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 group-hover:bg-blue-900/30 transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {tech.title}
                  </h3>
                  <p className="text-gray-400">{tech.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

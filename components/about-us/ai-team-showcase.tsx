"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Database, Zap, Award, Rocket, Target, Globe, BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// AI Capabilities Data
const aiCapabilities = [
  {
    title: "Generative AI & LLMs",
    description: "Custom AI models and intelligent automation solutions",
    icon: <Brain className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    expertise: 95,
    projects: 25,
    technologies: ["GPT-4", "Claude", "Custom LLMs", "Prompt Engineering"],
  },
  {
    title: "Machine Learning",
    description: "Predictive analytics and intelligent decision systems",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    expertise: 92,
    projects: 18,
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "MLOps"],
  },
  {
    title: "AI-Powered SAP",
    description: "Intelligent SAP solutions with embedded AI capabilities",
    icon: <Database className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
    expertise: 88,
    projects: 32,
    technologies: ["SAP AI Core", "SAP Analytics Cloud", "HANA ML", "BTP AI"],
  },
  {
    title: "Intelligent Automation",
    description: "RPA and workflow automation with AI enhancement",
    icon: <Zap className="h-8 w-8" />,
    color: "from-yellow-500 to-orange-500",
    expertise: 90,
    projects: 22,
    technologies: ["UiPath", "Power Automate", "Zapier", "Custom Bots"],
  },
]

// Team Excellence Metrics
const teamMetrics = [
  {
    title: "AI Projects Delivered",
    value: "150+",
    description: "Successful AI implementations",
    icon: <Rocket className="h-6 w-6" />,
    color: "text-blue-400",
  },
  {
    title: "Client Satisfaction",
    value: "98%",
    description: "Average satisfaction rate",
    icon: <Award className="h-6 w-6" />,
    color: "text-green-400",
  },
  {
    title: "AI Model Accuracy",
    value: "94%",
    description: "Average model performance",
    icon: <Target className="h-6 w-6" />,
    color: "text-purple-400",
  },
  {
    title: "Global Reach",
    value: "25+",
    description: "Countries served",
    icon: <Globe className="h-6 w-6" />,
    color: "text-cyan-400",
  },
]

// Innovation Areas
const innovationAreas = [
  {
    area: "AI Ethics & Governance",
    description: "Responsible AI development and deployment practices",
    progress: 95,
  },
  {
    area: "Edge AI Solutions",
    description: "AI processing at the edge for real-time applications",
    progress: 88,
  },
  {
    area: "Quantum-Ready AI",
    description: "Preparing AI algorithms for quantum computing",
    progress: 75,
  },
  {
    area: "Explainable AI",
    description: "Making AI decisions transparent and interpretable",
    progress: 92,
  },
]

export default function AITeamShowcase() {
  const [activeCapability, setActiveCapability] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % aiCapabilities.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            AI Excellence &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our team combines deep technical expertise with innovative thinking to deliver cutting-edge AI solutions
            that transform businesses.
          </p>
        </motion.div>

        {/* AI Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${capability.color} bg-opacity-20`}>
                      <div className="text-white">{capability.icon}</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {capability.projects} Projects
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                    {capability.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{capability.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Team Expertise</span>
                      <span className="text-white font-semibold">{capability.expertise}%</span>
                    </div>
                    <Progress value={capability.expertise} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {capability.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-500 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Team{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`${metric.color} mb-4 flex justify-center`}>{metric.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-lg font-semibold text-gray-200 mb-2">{metric.title}</div>
                    <div className="text-sm text-gray-400">{metric.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Innovation Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Innovation{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Areas</span>
          </h3>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {innovationAreas.map((area, index) => (
                    <motion.div
                      key={area.area}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{area.area}</h4>
                          <p className="text-sm text-gray-400">{area.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-400">{area.progress}%</div>
                        </div>
                      </div>
                      <Progress value={area.progress} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

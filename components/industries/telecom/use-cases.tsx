"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Headphones, DollarSign, Bot, Gift, Zap, ArrowRight, Play, Settings, CheckCircle } from "lucide-react"

const useCases = [
  {
    area: "Network Ops",
    icon: Network,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    useCase: "Predictive outage prevention with LLM models",
    description: "AI-powered network monitoring that predicts and prevents outages before they impact customers",
    benefits: ["99.9% uptime", "67% fewer outages", "Real-time optimization"],
    technologies: ["Machine Learning", "IoT Sensors", "Predictive Analytics"],
    implementation: "Deploy AI models across network infrastructure for continuous monitoring and prediction",
  },
  {
    area: "Customer Support",
    icon: Headphones,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    useCase: "AI Copilot + NLP for Tier-1 auto-resolution",
    description: "Intelligent customer service automation that resolves 70% of queries without human intervention",
    benefits: ["70% auto-resolution", "24/7 availability", "Instant responses"],
    technologies: ["Natural Language Processing", "AI Copilot", "Knowledge Base"],
    implementation: "Integrate AI copilot with existing CRM and knowledge management systems",
  },
  {
    area: "Billing & Revenue",
    icon: DollarSign,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    useCase: "Dynamic pricing engine using usage patterns",
    description: "AI-driven pricing optimization based on real-time usage data and market conditions",
    benefits: ["18% ARPU increase", "Dynamic pricing", "Revenue optimization"],
    technologies: ["Usage Analytics", "Pricing Algorithms", "Real-time Processing"],
    implementation: "Deploy pricing engine with SAP billing systems for real-time rate adjustments",
  },
  {
    area: "Service Delivery",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    useCase: "Zero-touch provisioning with RPA bots",
    description: "Automated service provisioning that eliminates manual processes and reduces deployment time",
    benefits: ["Zero-touch deployment", "70% faster provisioning", "Error reduction"],
    technologies: ["RPA Bots", "SAP TM", "Workflow Automation"],
    implementation: "Implement RPA bots integrated with SAP TM for automated service provisioning",
  },
  {
    area: "Product Bundling",
    icon: Gift,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    useCase: "GenAI to auto-create personalized offers by region/device/history",
    description: "AI-generated personalized product bundles based on customer behavior and preferences",
    benefits: ["Personalized offers", "Higher conversion", "Customer satisfaction"],
    technologies: ["Generative AI", "Customer Analytics", "Recommendation Engine"],
    implementation: "Deploy GenAI models with customer data platform for personalized offer generation",
  },
]

export default function TelecomUseCases() {
  const [activeUseCase, setActiveUseCase] = useState(0)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = async (useCase) => {
    setIsDeploying(true)

    // Simulate deployment process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Open deployment configuration
    window.open(`/deploy/telecom/${useCase.area.toLowerCase().replace(" ", "-")}`, "_blank")

    setIsDeploying(false)
  }

  const handleDemo = (useCase) => {
    window.open(`/demo/telecom/${useCase.area.toLowerCase().replace(" ", "-")}`, "_blank")
  }

  const ActiveUseCaseIcon = useCases[activeUseCase].icon
  const ActiveUseCaseColor = useCases[activeUseCase].color
  const ActiveUseCaseBgColor = useCases[activeUseCase].bgColor

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 mb-4">
            Telecom AI Use Cases
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI-Powered Telecom Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform every aspect of your telecom operations with intelligent AI solutions that drive efficiency,
            enhance customer experience, and optimize revenue.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Use Cases List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeUseCase === index
                    ? `${useCase.bgColor} ${useCase.borderColor} scale-105 shadow-lg`
                    : "bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50"
                }`}
                onClick={() => setActiveUseCase(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${useCase.bgColor} flex-shrink-0`}>
                    <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/30">{useCase.area}</Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{useCase.useCase}</h3>
                    <p className="text-sm text-gray-400">{useCase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Use Case Details */}
          <motion.div
            className="lg:sticky lg:top-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-4 rounded-lg ${ActiveUseCaseBgColor}`}>
                        <ActiveUseCaseIcon className={`w-8 h-8 ${ActiveUseCaseColor}`} />
                      </div>
                      <div>
                        <Badge className="mb-2 bg-gray-700/50 text-gray-300 border-gray-600/30">
                          {useCases[activeUseCase].area}
                        </Badge>
                        <CardTitle className="text-xl text-white">{useCases[activeUseCase].useCase}</CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-300">{useCases[activeUseCase].description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Benefits</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {useCases[activeUseCase].benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCases[activeUseCase].technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Implementation */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Implementation</h4>
                      <p className="text-gray-300 text-sm">{useCases[activeUseCase].implementation}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => handleDeploy(useCases[activeUseCase])}
                        disabled={isDeploying}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {isDeploying ? (
                          <>
                            <Settings className="w-4 h-4 mr-2 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Click-to-Deploy
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDemo(useCases[activeUseCase])}
                        variant="outline"
                        className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

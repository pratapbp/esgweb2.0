"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  Shield,
  Users,
  Brain,
  Zap,
  Bot,
  Database,
  Network,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const challengesSolutions = [
  {
    challenge: "Network congestion & outages",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    solution: "GenAI-based predictive optimization + SAP NOC Copilot",
    solutionIcon: Brain,
    benefits: ["67% reduction in outages", "Real-time anomaly detection", "Predictive maintenance"],
    technology: ["Machine Learning", "SAP NOC", "IoT Sensors"],
  },
  {
    challenge: "Low ARPU & churn",
    icon: TrendingDown,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    solution: "AI-based retention modeling & hyper-personalized offers",
    solutionIcon: Users,
    benefits: ["18% ARPU increase", "45% churn reduction", "Personalized experiences"],
    technology: ["Customer Analytics", "GenAI", "Behavioral Modeling"],
  },
  {
    challenge: "Manual provisioning & service delays",
    icon: Clock,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    solution: "RPA + SAP TM automation",
    solutionIcon: Bot,
    benefits: ["Zero-touch provisioning", "70% faster deployment", "Automated workflows"],
    technology: ["RPA Bots", "SAP TM", "Process Automation"],
  },
  {
    challenge: "Complex SLA enforcement",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    solution: "Blockchain SLA ledger + smart alerting",
    solutionIcon: Database,
    benefits: ["Transparent SLA tracking", "Automated penalties", "Real-time monitoring"],
    technology: ["Blockchain", "Smart Contracts", "Real-time Analytics"],
  },
  {
    challenge: "Fragmented customer insights",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    solution: "Unified SAP CX + AI-powered segmentation",
    solutionIcon: Network,
    benefits: ["360° customer view", "Intelligent segmentation", "Unified experience"],
    technology: ["SAP CX", "AI Analytics", "Data Integration"],
  },
]

const customerTypes = [
  { name: "Retail Subscribers", count: "4.2B", growth: "+12%", color: "text-blue-400" },
  { name: "Enterprise Customers", count: "850K", growth: "+28%", color: "text-green-400" },
  { name: "Rural Networks", count: "1.2B", growth: "+35%", color: "text-purple-400" },
]

export default function ChallengesSolutions() {
  const [activeChallenge, setActiveChallenge] = useState(0)
  const [activeCustomerType, setActiveCustomerType] = useState(0)

  const SolutionIcon = challengesSolutions[activeChallenge].solutionIcon

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
            Industry Challenges vs ESGit Solutions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Transforming Telecom Operations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Address critical telecom challenges with AI-driven solutions that optimize networks, enhance customer
            experience, and automate operations.
          </p>
        </motion.div>

        {/* Customer Type Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex bg-black/40 backdrop-blur-sm rounded-full p-2 border border-gray-600">
            {customerTypes.map((type, index) => (
              <Button
                key={type.name}
                onClick={() => setActiveCustomerType(index)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCustomerType === index
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="font-medium">{type.name}</span>
                <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">{type.growth}</Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Challenges List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Industry Challenges</h3>
            {challengesSolutions.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeChallenge === index
                    ? `${item.bgColor} ${item.borderColor} scale-105`
                    : "bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50"
                }`}
                onClick={() => setActiveChallenge(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">{item.challenge}</h4>
                    <p className="text-sm text-gray-400">Click to see AI solution</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Solution Details */}
          <motion.div
            className="lg:sticky lg:top-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChallenge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                        <SolutionIcon className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">ESGit Solution</CardTitle>
                        <p className="text-blue-300">{challengesSolutions[activeChallenge].solution}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Benefits</h4>
                      <div className="space-y-2">
                        {challengesSolutions[activeChallenge].benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {challengesSolutions[activeChallenge].technology.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      Deploy This Solution
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Customer Insights */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTypes.map((type, index) => (
              <motion.div
                key={type.name}
                className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                  activeCustomerType === index
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105"
                    : "bg-black/20 border-gray-600/30"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl font-bold ${type.color} mb-2`}>{type.count}</div>
                <div className="text-white font-medium mb-1">{type.name}</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{type.growth}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

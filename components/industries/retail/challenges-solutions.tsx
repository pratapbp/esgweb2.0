"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Network, Eye, Shield, TrendingUp, Brain } from "lucide-react"

const challenges = [
  {
    id: "inventory",
    icon: Package,
    challenge: "Inventory waste & shrinkage",
    solution: "GenAI demand planning + RPA restock",
    description: "AI-powered demand forecasting reduces waste by 35% and automates restocking workflows",
    kpi: "Waste reduced by 35%",
    architecture: ["SAP S/4HANA", "GenAI Forecasting", "RPA Bots", "IoT Sensors"],
    useCase: "Automated inventory optimization with predictive analytics and real-time restocking triggers",
  },
  {
    id: "abandonment",
    icon: ShoppingCart,
    challenge: "High cart abandonment",
    solution: "AI chatbots + personalized offers",
    description: "Intelligent chatbots with personalized recommendations reduce abandonment by 42%",
    kpi: "Abandonment down 42%",
    architecture: ["SAP Emarsys", "GenAI Chatbots", "Personalization Engine", "Real-time Analytics"],
    useCase: "Dynamic offer generation based on customer behavior and browsing patterns",
  },
  {
    id: "omnichannel",
    icon: Network,
    challenge: "Complex omnichannel orchestration",
    solution: "SAP CX + ESGit Copilot flow builders",
    description: "Unified customer experience across all channels with AI-powered orchestration",
    kpi: "Channel sync 99.2%",
    architecture: ["SAP CX Suite", "ESGit Copilot", "API Gateway", "Event Streaming"],
    useCase: "Seamless customer journey orchestration across web, mobile, and physical stores",
  },
  {
    id: "insights",
    icon: Eye,
    challenge: "Customer insights lacking",
    solution: "NLP from reviews + CV-based footfall",
    description: "Advanced analytics combining review sentiment and computer vision for deep insights",
    kpi: "Insight accuracy 94%",
    architecture: ["Computer Vision", "NLP Engine", "SAP Analytics Cloud", "Data Lake"],
    useCase: "Real-time customer sentiment analysis and behavior tracking for actionable insights",
  },
  {
    id: "fraud",
    icon: Shield,
    challenge: "Returns & fraud",
    solution: "Computer vision + anomaly detection",
    description: "AI-powered fraud detection and automated returns processing with 96% accuracy",
    kpi: "Fraud detection 96%",
    architecture: ["Computer Vision", "ML Anomaly Detection", "SAP Fraud Management", "Blockchain"],
    useCase: "Automated fraud scoring and intelligent returns processing with visual verification",
  },
]

export default function ChallengesSolutions() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              🎯 Retail Challenges + ESGit Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform Retail Challenges into AI Advantages
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover how ESGit's AI-first solutions address the most pressing retail challenges with measurable
              results
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  selectedChallenge === item.id
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                }`}
                onClick={() => setSelectedChallenge(selectedChallenge === item.id ? null : item.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">{item.challenge}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{item.solution}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    >
                      {item.kpi}
                    </Badge>
                    <motion.div
                      animate={{ rotate: selectedChallenge === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TrendingUp className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {selectedChallenge === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                      >
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">
                              Architecture Components:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.architecture.map((component, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {component}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">Use Case:</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.useCase}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
            <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              See These Solutions in Action
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Experience how ESGit's AI-powered retail solutions can transform your business with a personalized demo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Interactive Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Download Solution Brief
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

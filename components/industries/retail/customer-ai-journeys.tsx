"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, Package, ShoppingCart, Heart, Eye, Brain, TrendingUp } from "lucide-react"

const journeyNodes = [
  {
    id: "discovery",
    icon: Search,
    title: "AI-Powered Product Discovery",
    description: "Intelligent search and recommendation engine",
    details: {
      technologies: ["Computer Vision", "NLP Search", "Recommendation Engine", "SAP Commerce"],
      features: ["Visual search", "Voice search", "Personalized recommendations", "Trend analysis"],
      kpis: ["Search accuracy: 94%", "Click-through rate: +45%", "Discovery time: -60%"],
    },
    position: { x: 10, y: 20 },
  },
  {
    id: "offers",
    icon: Zap,
    title: "Smart Offers Engine",
    description: "Real-time personalized promotions",
    details: {
      technologies: ["ML Personalization", "Real-time Analytics", "SAP Emarsys", "Pricing Engine"],
      features: ["Dynamic pricing", "Personalized offers", "A/B testing", "Behavioral triggers"],
      kpis: ["Conversion rate: +32%", "Average order value: +28%", "Offer relevance: 89%"],
    },
    position: { x: 70, y: 15 },
  },
  {
    id: "inventory",
    icon: Package,
    title: "Real-time Inventory via SAP S/4HANA",
    description: "Live inventory management and allocation",
    details: {
      technologies: ["SAP S/4HANA", "IoT Sensors", "Real-time Analytics", "Demand Forecasting"],
      features: ["Real-time stock levels", "Automated reordering", "Multi-channel allocation", "Demand prediction"],
      kpis: ["Stock accuracy: 99.2%", "Out-of-stock: -65%", "Inventory turnover: +35%"],
    },
    position: { x: 30, y: 50 },
  },
  {
    id: "checkout",
    icon: ShoppingCart,
    title: "Checkout Copilot + Fraud Shield",
    description: "AI-assisted checkout with fraud protection",
    details: {
      technologies: ["Conversational AI", "Fraud Detection ML", "Payment Gateway", "Computer Vision"],
      features: ["Voice checkout", "Fraud scoring", "Payment assistance", "Receipt automation"],
      kpis: ["Checkout time: -55%", "Fraud prevention: 96%", "Payment success: 99.1%"],
    },
    position: { x: 80, y: 60 },
  },
  {
    id: "loyalty",
    icon: Heart,
    title: "Loyalty + Feedback NLP Engine",
    description: "Customer retention and sentiment analysis",
    details: {
      technologies: ["NLP Engine", "Sentiment Analysis", "SAP Loyalty Management", "Customer Analytics"],
      features: ["Sentiment tracking", "Loyalty rewards", "Feedback analysis", "Retention campaigns"],
      kpis: ["Customer retention: +42%", "Sentiment score: 4.6/5", "Loyalty engagement: +38%"],
    },
    position: { x: 20, y: 80 },
  },
]

const connections = [
  { from: "discovery", to: "offers" },
  { from: "offers", to: "inventory" },
  { from: "inventory", to: "checkout" },
  { from: "checkout", to: "loyalty" },
]

export default function CustomerAIJourneys() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
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
              🧬 Customer-Centric AI Journeys
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Complete AI-Powered Customer Experience
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Explore how AI transforms every touchpoint of the customer journey with measurable impact
            </p>
          </motion.div>
        </div>

        {/* Interactive Journey Map */}
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <div className="relative h-96 overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((connection, index) => {
                const fromNode = journeyNodes.find((n) => n.id === connection.from)
                const toNode = journeyNodes.find((n) => n.id === connection.to)
                if (!fromNode || !toNode) return null

                const x1 = (fromNode.position.x / 100) * 100 + "%"
                const y1 = (fromNode.position.y / 100) * 100 + "%"
                const x2 = (toNode.position.x / 100) * 100 + "%"
                const y2 = (toNode.position.y / 100) * 100 + "%"

                return (
                  <motion.line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.5 }}
                  />
                )
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Journey Nodes */}
            {journeyNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div
                  className={`relative p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg transition-all duration-300 ${
                    selectedNode === node.id ? "ring-4 ring-blue-300 dark:ring-blue-600" : ""
                  } ${hoveredNode === node.id ? "shadow-xl" : ""}`}
                >
                  <node.icon className="w-6 h-6 text-white" />

                  {/* Pulse Animation */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
                </div>

                {/* Node Label */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{node.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-32">{node.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Node Details */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {journeyNodes
                .filter((node) => node.id === selectedNode)
                .map((node) => (
                  <Card key={node.id} className="shadow-lg border-2 border-blue-200/50 dark:border-blue-700/50">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                          <node.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">{node.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-lg">{node.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-600" />
                            Technologies
                          </h4>
                          <div className="space-y-2">
                            {node.details.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="block w-fit bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-purple-600" />
                            Key Features
                          </h4>
                          <div className="space-y-2">
                            {node.details.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                              >
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* KPIs */}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Impact KPIs
                          </h4>
                          <div className="space-y-2">
                            {node.details.kpis.map((kpi, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium"
                              >
                                <TrendingUp className="w-4 h-4" />
                                {kpi}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Deep Dive Architecture
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
                        >
                          Request Demo
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
                        >
                          Download Specs
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Click on any node above to explore detailed architecture and KPI insights
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

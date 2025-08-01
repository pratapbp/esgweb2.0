"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Send,
  Mic,
  Settings,
  FileText,
  Zap,
  Loader2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Database,
  Leaf,
} from "lucide-react"

interface CopilotResponse {
  type: "billing" | "carbon" | "rpa" | "renewable" | "grid"
  title: string
  content: string
  steps?: string[]
  kpis?: { metric: string; value: string }[]
  timeline?: string
}

const sampleQueries = [
  "Simulate smart billing setup using SAP IS-U",
  "Generate carbon report for 10 substations",
  "Build RPA flow for outage alerts + field dispatch",
  "Optimize renewable energy asset performance",
  "Create smart grid load balancing strategy",
]

export default function UtilityCopilot() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<CopilotResponse | null>(null)
  const [isListening, setIsListening] = useState(false)

  const handleQuery = async (queryText: string = query) => {
    if (!queryText.trim()) return

    setIsLoading(true)
    setQuery(queryText)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate response based on query content
    let mockResponse: CopilotResponse

    if (queryText.toLowerCase().includes("billing") || queryText.toLowerCase().includes("sap is-u")) {
      mockResponse = {
        type: "billing",
        title: "Smart Billing Setup with SAP IS-U",
        content:
          "I'll help you configure an intelligent billing system using SAP IS-U with automated meter reading and AI-powered usage analytics.",
        steps: [
          "Configure SAP IS-U master data for smart meters",
          "Set up automated meter reading interfaces",
          "Implement AI-based usage pattern analysis",
          "Configure dynamic pricing rules",
          "Set up exception handling workflows",
          "Deploy customer self-service portal",
        ],
        kpis: [
          { metric: "Billing Accuracy", value: "99.8%" },
          { metric: "Processing Time", value: "-75%" },
          { metric: "Customer Satisfaction", value: "+45%" },
        ],
        timeline: "6-8 weeks implementation",
      }
    } else if (queryText.toLowerCase().includes("carbon") || queryText.toLowerCase().includes("emission")) {
      mockResponse = {
        type: "carbon",
        title: "Carbon Reporting for 10 Substations",
        content:
          "Generating comprehensive carbon footprint analysis with real-time monitoring and blockchain-verified audit trails.",
        steps: [
          "Deploy IoT sensors for emission monitoring",
          "Configure SAP ESG data collection",
          "Set up blockchain audit trail",
          "Implement AI-powered anomaly detection",
          "Generate automated compliance reports",
          "Create stakeholder dashboards",
        ],
        kpis: [
          { metric: "Emission Accuracy", value: "99.9%" },
          { metric: "Reporting Time", value: "-90%" },
          { metric: "Compliance Score", value: "100%" },
        ],
        timeline: "4-6 weeks deployment",
      }
    } else if (queryText.toLowerCase().includes("rpa") || queryText.toLowerCase().includes("outage")) {
      mockResponse = {
        type: "rpa",
        title: "RPA Outage Alert & Field Dispatch System",
        content:
          "Creating an intelligent RPA workflow for automated outage detection, alert generation, and optimal crew dispatch.",
        steps: [
          "Set up grid monitoring sensors",
          "Configure outage detection algorithms",
          "Build RPA alert generation bots",
          "Implement GPS-based crew dispatch",
          "Create customer notification system",
          "Deploy real-time status tracking",
        ],
        kpis: [
          { metric: "Response Time", value: "-70%" },
          { metric: "Crew Efficiency", value: "+85%" },
          { metric: "Customer Satisfaction", value: "+60%" },
        ],
        timeline: "3-4 weeks implementation",
      }
    } else if (
      queryText.toLowerCase().includes("renewable") ||
      queryText.toLowerCase().includes("solar") ||
      queryText.toLowerCase().includes("wind")
    ) {
      mockResponse = {
        type: "renewable",
        title: "Renewable Energy Asset Optimization",
        content:
          "Implementing AI-driven renewable asset management with predictive maintenance and performance optimization.",
        steps: [
          "Deploy weather monitoring systems",
          "Configure asset performance tracking",
          "Implement predictive maintenance AI",
          "Set up energy storage optimization",
          "Create revenue maximization algorithms",
          "Deploy carbon credit automation",
        ],
        kpis: [
          { metric: "Asset Efficiency", value: "+45%" },
          { metric: "Maintenance Costs", value: "-50%" },
          { metric: "Revenue Optimization", value: "+35%" },
        ],
        timeline: "8-10 weeks rollout",
      }
    } else {
      mockResponse = {
        type: "grid",
        title: "Smart Grid Load Balancing Strategy",
        content:
          "Developing an intelligent grid management system with AI-powered load forecasting and automated demand response.",
        steps: [
          "Implement smart grid sensors",
          "Deploy AI forecasting models",
          "Configure automated load balancing",
          "Set up demand response programs",
          "Create dynamic pricing engine",
          "Deploy grid stability monitoring",
        ],
        kpis: [
          { metric: "Load Prediction", value: "95% accuracy" },
          { metric: "Peak Reduction", value: "-35%" },
          { metric: "Grid Stability", value: "+40%" },
        ],
        timeline: "10-12 weeks implementation",
      }
    }

    setResponse(mockResponse)
    setIsLoading(false)
  }

  const getResponseIcon = (type: string) => {
    switch (type) {
      case "billing":
        return Settings
      case "carbon":
        return Leaf
      case "rpa":
        return Zap
      case "renewable":
        return TrendingUp
      case "grid":
        return Database
      default:
        return Brain
    }
  }

  const getResponseColor = (type: string) => {
    switch (type) {
      case "billing":
        return "text-blue-400"
      case "carbon":
        return "text-green-400"
      case "rpa":
        return "text-orange-400"
      case "renewable":
        return "text-purple-400"
      case "grid":
        return "text-cyan-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Utility Copilot Engine
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ask Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Energy Assistant
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant insights, configurations, and implementation strategies for your utility operations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Copilot Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Brain className="h-6 w-6 text-purple-400 mr-3" />
                  ESGit Utility Copilot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Query Input */}
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about SAP configurations, carbon reporting, RPA workflows..."
                      className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      onKeyPress={(e) => e.key === "Enter" && handleQuery()}
                    />
                    <Button
                      onClick={() => setIsListening(!isListening)}
                      variant="outline"
                      size="icon"
                      className={`border-gray-600 ${isListening ? "text-red-400 border-red-400" : "text-gray-400"}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleQuery()}
                      disabled={isLoading || !query.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Sample Queries */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Try these sample queries:</p>
                    <div className="flex flex-wrap gap-2">
                      {sampleQueries.map((sample, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuery(sample)}
                          className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {sample}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-8"
                  >
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                      <span className="text-gray-300">Analyzing your query...</span>
                    </div>
                  </motion.div>
                )}

                {/* Response */}
                <AnimatePresence>
                  {response && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const Icon = getResponseIcon(response.type)
                          return <Icon className={`h-5 w-5 ${getResponseColor(response.type)}`} />
                        })()}
                        <h3 className="text-lg font-semibold text-white">{response.title}</h3>
                      </div>

                      <p className="text-gray-300">{response.content}</p>

                      {response.steps && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-400">Implementation Steps:</h4>
                          <div className="space-y-2">
                            {response.steps.map((step, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-medium mt-0.5">
                                  {index + 1}
                                </div>
                                <span className="text-gray-300 text-sm">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {response.timeline && (
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-gray-400">Timeline:</span>
                            <span className="text-sm text-white font-medium">{response.timeline}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* KPIs & Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {response && response.kpis && (
              <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    Expected Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {response.kpis.map((kpi, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">{kpi.metric}</span>
                          <span className="text-green-400 font-semibold text-lg">{kpi.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Copilot Capabilities */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Copilot Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">SAP Configs</div>
                  </div>
                  <div className="text-center">
                    <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">Carbon Reports</div>
                  </div>
                  <div className="text-center">
                    <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">RPA Workflows</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">AI Strategies</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

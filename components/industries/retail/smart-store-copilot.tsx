"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Mic, MicOff, TrendingUp, Zap, Eye, Brain } from "lucide-react"

const sampleQuestions = [
  "Simulate SAP + CV checkout experience in GenAI mode",
  "Give me a return fraud prevention model",
  "What's the ROI for footfall analytics AI?",
  "Show me dynamic pricing architecture for fashion retail",
  "How to implement AI chatbots for cart abandonment?",
]

const responseTypes = [
  { id: "flow", label: "App Flow", icon: Zap, color: "blue" },
  { id: "modules", label: "SAP Modules", icon: Brain, color: "purple" },
  { id: "kpi", label: "KPI Improvements", icon: TrendingUp, color: "green" },
  { id: "architecture", label: "Architecture", icon: Eye, color: "indigo" },
]

const mockResponses = {
  checkout: {
    flow: "Customer approaches → CV identifies customer → AI suggests products → Voice-activated checkout → Payment processing → Receipt generation",
    modules: ["SAP Commerce Cloud", "SAP Payment Engine", "SAP Customer Data Platform", "Computer Vision API"],
    kpi: ["Checkout time: -65%", "Customer satisfaction: +32%", "Payment errors: -78%", "Staff efficiency: +45%"],
    architecture:
      "Computer Vision → Customer Recognition → AI Recommendation Engine → Voice Interface → Payment Gateway → SAP Integration",
  },
  fraud: {
    flow: "Return request → Image analysis → Fraud scoring → Decision engine → Automated response → Case management",
    modules: ["SAP Fraud Management", "Computer Vision", "ML Scoring Engine", "SAP Service Cloud"],
    kpi: ["Fraud detection: 96%", "Processing time: -70%", "False positives: -45%", "Cost savings: $2.3M"],
    architecture:
      "Return Portal → CV Analysis → ML Fraud Scoring → Decision Engine → SAP Fraud Management → Automated Response",
  },
  footfall: {
    flow: "Camera feeds → People counting → Behavior analysis → Heatmap generation → Insights dashboard → Action recommendations",
    modules: ["Computer Vision", "SAP Analytics Cloud", "Real-time Processing", "Dashboard Engine"],
    kpi: ["Conversion rate: +23%", "Store optimization: +18%", "Staff allocation: +35%", "Revenue per sqft: +28%"],
    architecture:
      "IP Cameras → CV Processing → Analytics Engine → SAP Analytics Cloud → Real-time Dashboard → Action Triggers",
  },
}

export default function SmartStoreCopilot() {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [activeResponseType, setActiveResponseType] = useState("flow")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (question: string) => {
    setIsLoading(true)
    setQuery(question)

    // Simulate API call
    setTimeout(() => {
      if (question.toLowerCase().includes("checkout")) {
        setSelectedResponse("checkout")
      } else if (question.toLowerCase().includes("fraud")) {
        setSelectedResponse("fraud")
      } else if (question.toLowerCase().includes("footfall")) {
        setSelectedResponse("footfall")
      } else {
        setSelectedResponse("checkout") // Default
      }
      setIsLoading(false)
    }, 1500)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real implementation, this would start/stop speech recognition
  }

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
              🤖 Smart Store Copilot
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ESGit Copilot for Retail
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Ask our AI assistant anything about retail transformation, SAP integration, or technology architecture
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <Card className="mb-8 shadow-lg border-2 border-blue-200/50 dark:border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">ESGit Retail Copilot</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your AI assistant for retail transformation
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Ask about retail AI, SAP integration, or technology architecture..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit(query)}
                  className="flex-1"
                />
                <Button
                  onClick={toggleListening}
                  variant="outline"
                  size="icon"
                  className={`${isListening ? "bg-red-100 border-red-300 text-red-600" : ""}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => handleSubmit(query)}
                  disabled={!query.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Sample Questions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSubmit(question)}
                      className="text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Display */}
          <AnimatePresence>
            {(selectedResponse || isLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg border-2 border-green-200/50 dark:border-green-700/50">
                  <CardContent className="p-6">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-slate-600 dark:text-slate-400">
                          Analyzing your query and generating response...
                        </p>
                      </div>
                    ) : (
                      selectedResponse && (
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-200">Copilot Response</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Based on your query: "{query}"
                              </p>
                            </div>
                          </div>

                          {/* Response Type Tabs */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {responseTypes.map((type) => (
                              <Button
                                key={type.id}
                                variant={activeResponseType === type.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveResponseType(type.id)}
                                className={`flex items-center gap-2 ${
                                  activeResponseType === type.id
                                    ? `bg-${type.color}-600 hover:bg-${type.color}-700`
                                    : `hover:bg-${type.color}-50 dark:hover:bg-${type.color}-900/30`
                                }`}
                              >
                                <type.icon className="w-4 h-4" />
                                {type.label}
                              </Button>
                            ))}
                          </div>

                          {/* Response Content */}
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                            {activeResponseType === "flow" && (
                              <div>
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Process Flow:</h5>
                                <p className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                                  {mockResponses[selectedResponse as keyof typeof mockResponses]?.flow}
                                </p>
                              </div>
                            )}

                            {activeResponseType === "modules" && (
                              <div>
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                  Required SAP Modules & Technologies:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {mockResponses[selectedResponse as keyof typeof mockResponses]?.modules.map(
                                    (module, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                      >
                                        {module}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                            {activeResponseType === "kpi" && (
                              <div>
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                  Expected KPI Improvements:
                                </h5>
                                <div className="grid grid-cols-2 gap-3">
                                  {mockResponses[selectedResponse as keyof typeof mockResponses]?.kpi.map(
                                    (kpi, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                        <span className="text-slate-700 dark:text-slate-300">{kpi}</span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}

                            {activeResponseType === "architecture" && (
                              <div>
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                  System Architecture:
                                </h5>
                                <p className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                                  {mockResponses[selectedResponse as keyof typeof mockResponses]?.architecture}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mt-6">
                            <Button variant="outline" size="sm">
                              Download Architecture Diagram
                            </Button>
                            <Button variant="outline" size="sm">
                              Schedule Deep Dive Session
                            </Button>
                            <Button variant="outline" size="sm">
                              Request Custom Demo
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

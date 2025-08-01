"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Smartphone,
  Users,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react"

const sampleQueries = [
  "What's causing signal drops in Hyderabad?",
  "Generate prepaid plan bundles for Gen Z in rural Karnataka",
  "Show top 10 churn-prone customers based on usage",
  "Optimize network capacity for upcoming festival season",
  "Create personalized offers for high-value customers",
]

const mockResponses = {
  "What's causing signal drops in Hyderabad?": {
    type: "network_analysis",
    data: {
      rootCause: "Tower overload in Banjara Hills and Jubilee Hills areas",
      affectedTowers: 12,
      impactedUsers: 45000,
      diagnostics: [
        "Peak usage: 89% capacity during 7-9 PM",
        "Weather impact: 15% signal degradation due to monsoon",
        "Infrastructure: 3 towers require immediate maintenance",
      ],
      recommendations: [
        "Deploy temporary cell towers in high-traffic areas",
        "Implement load balancing across adjacent towers",
        "Schedule maintenance for off-peak hours",
      ],
    },
  },
  "Generate prepaid plan bundles for Gen Z in rural Karnataka": {
    type: "plan_generation",
    data: {
      targetSegment: "Gen Z (18-25) in Rural Karnataka",
      generatedPlans: [
        {
          name: "Rural Connect Plus",
          price: "₹299/month",
          features: ["50GB Data", "Unlimited Local Calls", "100 SMS", "Social Media Free"],
          appeal: "High data for social media and entertainment",
        },
        {
          name: "Student Special",
          price: "₹199/month",
          features: ["30GB Data", "Educational Apps Free", "Weekend Data Boost", "Family Sharing"],
          appeal: "Education-focused with family benefits",
        },
        {
          name: "Entertainment Pack",
          price: "₹399/month",
          features: ["75GB Data", "OTT Subscriptions", "Gaming Data Free", "Music Streaming"],
          appeal: "Entertainment and gaming focused",
        },
      ],
    },
  },
  "Show top 10 churn-prone customers based on usage": {
    type: "churn_analysis",
    data: {
      totalAnalyzed: 2500000,
      churnRisk: "High",
      customers: [
        {
          id: "CX001",
          name: "Rajesh Kumar",
          riskScore: 92,
          reason: "Declining usage, competitor offers",
          value: "₹1,200/month",
        },
        {
          id: "CX002",
          name: "Priya Sharma",
          riskScore: 89,
          reason: "Service complaints, bill disputes",
          value: "₹850/month",
        },
        {
          id: "CX003",
          name: "Amit Patel",
          riskScore: 87,
          reason: "Network issues, poor coverage",
          value: "₹950/month",
        },
        {
          id: "CX004",
          name: "Sneha Reddy",
          riskScore: 85,
          reason: "Price sensitivity, usage drop",
          value: "₹750/month",
        },
        {
          id: "CX005",
          name: "Vikram Singh",
          riskScore: 83,
          reason: "Competitor migration signals",
          value: "₹1,100/month",
        },
      ],
      retentionActions: [
        "Personalized retention offers",
        "Priority customer service",
        "Network improvement in their areas",
        "Loyalty rewards and discounts",
      ],
    },
  },
}

export default function TelecomCopilot() {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [chatHistory, setChatHistory] = useState<Array<{ query: string; response: any; timestamp: Date }>>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResponse = mockResponses[query as keyof typeof mockResponses] || {
      type: "general",
      data: {
        message:
          "I can help you with network analysis, customer insights, plan generation, and more. Try asking about specific telecom challenges!",
      },
    }

    const newEntry = {
      query,
      response: mockResponse,
      timestamp: new Date(),
    }

    setChatHistory((prev) => [...prev, newEntry])
    setResponse(mockResponse)
    setQuery("")
    setIsLoading(false)
  }

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking)
    // Text-to-speech would be implemented here
  }

  const renderResponse = (responseData: any) => {
    switch (responseData.type) {
      case "network_analysis":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="text-lg font-semibold text-white">Network Analysis Results</h4>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h5 className="font-semibold text-red-300 mb-2">Root Cause Identified</h5>
              <p className="text-gray-300">{responseData.data.rootCause}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{responseData.data.affectedTowers}</div>
                  <div className="text-xs text-gray-400">Affected Towers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {responseData.data.impactedUsers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Impacted Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">89%</div>
                  <div className="text-xs text-gray-400">Peak Capacity</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-blue-300 mb-2">Diagnostics</h5>
                <ul className="space-y-1">
                  {responseData.data.diagnostics.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-300 mb-2">Recommendations</h5>
                <ul className="space-y-1">
                  {responseData.data.recommendations.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case "plan_generation":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-semibold text-white">Generated Plan Bundles</h4>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <h5 className="font-semibold text-blue-300 mb-1">Target Segment</h5>
              <p className="text-gray-300">{responseData.data.targetSegment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {responseData.data.generatedPlans.map((plan: any, index: number) => (
                <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2">{plan.name}</h5>
                  <div className="text-2xl font-bold text-white mb-2">{plan.price}</div>
                  <ul className="space-y-1 mb-3">
                    {plan.features.map((feature: string, fIndex: number) => (
                      <li key={fIndex} className="text-sm text-gray-300 flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 italic">{plan.appeal}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case "churn_analysis":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-400" />
              <h4 className="text-lg font-semibold text-white">Churn Risk Analysis</h4>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {responseData.data.totalAnalyzed.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Customers Analyzed</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{responseData.data.churnRisk}</div>
                <div className="text-xs text-gray-400">Risk Level</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{responseData.data.customers.length}</div>
                <div className="text-xs text-gray-400">High Risk Customers</div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-3">Top Churn-Prone Customers</h5>
              <div className="space-y-2">
                {responseData.data.customers.map((customer: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-white">{customer.name}</div>
                      <div className="text-sm text-gray-400">{customer.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-red-400">{customer.riskScore}% Risk</div>
                      <div className="text-sm text-gray-400">{customer.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="font-semibold text-green-300 mb-2">Recommended Retention Actions</h5>
              <ul className="space-y-1">
                {responseData.data.retentionActions.map((action: string, index: number) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-300">{responseData.data.message}</p>
          </div>
        )
    }
  }

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
            ESGit Telco Copilot
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your AI-Powered Telecom Assistant
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant insights, generate solutions, and optimize operations with our intelligent telecom copilot
            powered by advanced AI and real-time data analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Copilot Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-white">Telco AI Copilot</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sample Queries */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Try asking:</h4>
                  <div className="space-y-2">
                    {sampleQueries.map((sampleQuery, index) => (
                      <button
                        key={index}
                        onClick={() => handleSampleQuery(sampleQuery)}
                        className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 border border-gray-600/30 hover:border-blue-500/30"
                      >
                        "{sampleQuery}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about network issues, customer insights, or plan optimization..."
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 pr-20"
                      disabled={isLoading}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={toggleListening}
                        className={`p-2 ${isListening ? "text-red-400" : "text-gray-400"} hover:text-white`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={toggleSpeaking}
                        className={`p-2 ${isSpeaking ? "text-blue-400" : "text-gray-400"} hover:text-white`}
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Ask Copilot
                      </>
                    )}
                  </Button>
                </form>

                {/* Voice Indicator */}
                {isListening && (
                  <motion.div
                    className="flex items-center justify-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Mic className="w-5 h-5 text-red-400" />
                    <span className="text-red-300">Listening...</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-600/20 h-full">
              <CardHeader>
                <CardTitle className="text-white">AI Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Ask a question to get started with AI insights</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {chatHistory.map((entry, index) => (
                        <div key={index} className="space-y-3">
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                            <div className="text-sm text-blue-300 mb-1">You asked:</div>
                            <div className="text-white">{entry.query}</div>
                          </div>
                          <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-4">
                            {renderResponse(entry.response)}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

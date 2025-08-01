"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Send, MessageSquare, Shield, Globe } from "lucide-react"
import { useState } from "react"

const sampleQueries = [
  "What's the fastest way to digitize benefit delivery in SAP?",
  "Translate this welfare bill into 5 languages using GenAI",
  "Show fraud prevention model for citizen fund transfers",
  "Create a smart city dashboard for traffic management",
  "Generate compliance checklist for public procurement",
]

const mockResponses = {
  "What's the fastest way to digitize benefit delivery in SAP?": {
    type: "blueprint",
    title: "Digital Benefit Delivery Blueprint",
    content: {
      architecture: [
        "SAP S/4HANA Public Sector Core",
        "ESGit AI Eligibility Engine",
        "RPA Disbursement Automation",
        "Blockchain Audit Trail",
      ],
      timeline: "4-6 weeks implementation",
      kpis: ["95% automation rate", "4-hour processing time", "99.9% accuracy"],
      modules: ["SAP Ariba", "SuccessFactors", "Process Automation"],
    },
  },
  "Translate this welfare bill into 5 languages using GenAI": {
    type: "translation",
    title: "Multilingual Policy Translation",
    content: {
      languages: ["Spanish", "French", "Mandarin", "Arabic", "Hindi"],
      accuracy: "98.5% translation accuracy",
      features: ["Legal terminology preservation", "Cultural context adaptation", "Real-time updates"],
      timeline: "2-3 minutes per document",
    },
  },
  "Show fraud prevention model for citizen fund transfers": {
    type: "riskModel",
    title: "AI Fraud Prevention Framework",
    content: {
      detection: ["Pattern analysis", "Behavioral scoring", "Real-time monitoring"],
      accuracy: "96.8% fraud detection rate",
      response: "< 500ms decision time",
      integration: ["SAP Banking", "Blockchain verification", "ML risk scoring"],
    },
  },
}

export function PublicSectorCopilot() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuery = async (queryText: string) => {
    setIsLoading(true)
    setQuery(queryText)

    // Simulate API call
    setTimeout(() => {
      const mockResponse = mockResponses[queryText as keyof typeof mockResponses] || {
        type: "general",
        title: "AI Analysis Complete",
        content: {
          summary: "Based on your query, I've analyzed the requirements and generated recommendations.",
          recommendations: ["Implement SAP integration", "Deploy AI automation", "Enable real-time monitoring"],
          nextSteps: ["Schedule consultation", "Review architecture", "Begin pilot program"],
        },
      }
      setResponse(mockResponse)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
            <Brain className="w-4 h-4 mr-2" />
            AI Copilot for Public Sector
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Intelligent Government Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant insights, blueprints, and recommendations for your public sector transformation initiatives.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Query Interface */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                    Ask the AI Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about SAP integration, AI automation, or compliance..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleQuery(query)}
                    />
                    <Button
                      onClick={() => handleQuery(query)}
                      disabled={!query.trim() || isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Sample Queries:</h4>
                    <div className="space-y-2">
                      {sampleQueries.map((sampleQuery, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3 text-wrap bg-transparent"
                          onClick={() => handleQuery(sampleQuery)}
                        >
                          <span className="text-sm">{sampleQuery}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    AI Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="ml-2 text-gray-600">Analyzing your query...</span>
                    </div>
                  ) : response ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-gray-800">{response.title}</h3>

                      {response.type === "blueprint" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Architecture Components:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {response.content.architecture.map((item: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 rounded">
                              <span className="text-sm font-medium text-blue-800">Timeline:</span>
                              <p className="text-sm text-blue-700">{response.content.timeline}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                              <span className="text-sm font-medium text-green-800">Expected KPIs:</span>
                              <ul className="text-xs text-green-700 mt-1">
                                {response.content.kpis.map((kpi: string, idx: number) => (
                                  <li key={idx}>• {kpi}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {response.type === "translation" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Supported Languages:</h4>
                            <div className="flex flex-wrap gap-2">
                              {response.content.languages.map((lang: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <Globe className="w-3 h-3 mr-1" />
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded">
                            <span className="text-sm font-medium text-purple-800">
                              Accuracy: {response.content.accuracy}
                            </span>
                          </div>
                        </div>
                      )}

                      {response.type === "riskModel" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Detection Methods:</h4>
                            <div className="grid gap-2">
                              {response.content.detection.map((method: string, idx: number) => (
                                <div key={idx} className="flex items-center p-2 bg-red-50 rounded">
                                  <Shield className="w-4 h-4 mr-2 text-red-600" />
                                  <span className="text-sm text-red-800">{method}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-green-50 rounded">
                              <span className="text-sm font-medium text-green-800">Accuracy:</span>
                              <p className="text-sm text-green-700">{response.content.accuracy}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded">
                              <span className="text-sm font-medium text-blue-800">Response Time:</span>
                              <p className="text-sm text-blue-700">{response.content.response}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Ask a question to get started with AI-powered insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

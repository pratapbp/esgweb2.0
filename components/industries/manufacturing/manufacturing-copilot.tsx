"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, Mic, Factory, BarChart3, Cpu, Zap } from "lucide-react"

export default function ManufacturingCopilot() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  const quickQuestions = [
    "What is the best SAP + GenAI setup for auto manufacturing?",
    "Simulate a factory floor with 6 RPA bots and IoT feeds",
    "Suggest KPIs for smart procurement with S/4HANA",
    "Show me predictive maintenance architecture",
    "Compare SAP vs cloud-native manufacturing solutions",
  ]

  const handleQuery = async (question: string) => {
    setIsLoading(true)
    setQuery(question)

    try {
      const response = await fetch("/api/copilot/manufacturing-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      })

      const data = await response.json()
      setResponse(data)
    } catch (error) {
      console.error("Error querying manufacturing copilot:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleQuery(query)
    }
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <Brain className="mr-2 h-4 w-4" />
            AI Manufacturing Expert
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ESGit Copilot for <span className="gradient-text">Manufacturing</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get expert insights on SAP + AI manufacturing solutions, architecture recommendations, and KPI optimization
            strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-400 mr-2" />
                  Manufacturing Intelligence Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about SAP manufacturing solutions, AI use cases, or architecture..."
                    className="flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                  <Button type="button" variant="outline" className="border-gray-700 bg-transparent">
                    <Mic className="h-4 w-4" />
                  </Button>
                </form>

                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuery(question)}
                      className="text-xs border-gray-700 hover:bg-gray-800"
                    >
                      {question}
                    </Button>
                  ))}
                </div>

                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-900/30 rounded-lg">
                        <Brain className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-400 mb-2">ESGit Manufacturing Expert</h4>

                        {response.type === "architecture" && (
                          <div className="space-y-4">
                            <p className="text-gray-300">{response.explanation}</p>
                            <div>
                              <h5 className="font-semibold mb-2">Architecture Components:</h5>
                              <div className="space-y-2">
                                {response.components.map((component: string, index: number) => (
                                  <div key={index} className="flex items-center">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                                    <span className="text-gray-300">{component}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {response.benefits && (
                              <div>
                                <h5 className="font-semibold mb-2">Key Benefits:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {response.benefits.map((benefit: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {response.type === "kpis" && (
                          <div className="space-y-4">
                            <p className="text-gray-300">{response.explanation}</p>
                            <div className="grid grid-cols-2 gap-4">
                              {response.kpis.map((kpi: any, index: number) => (
                                <div key={index} className="bg-gray-900 rounded-lg p-3">
                                  <div className="text-lg font-bold text-green-400">{kpi.metric}</div>
                                  <div className="text-sm text-gray-400">{kpi.description}</div>
                                  <div className="text-xs text-blue-400">{kpi.target}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {response.type === "comparison" && (
                          <div className="space-y-4">
                            <p className="text-gray-300">{response.explanation}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                                <h5 className="font-semibold text-blue-400 mb-2">SAP-Native Approach</h5>
                                <ul className="space-y-1 text-sm text-gray-300">
                                  {response.sapNative.map((item: string, index: number) => (
                                    <li key={index}>• {item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                                <h5 className="font-semibold text-purple-400 mb-2">Cloud-Native Approach</h5>
                                <ul className="space-y-1 text-sm text-gray-300">
                                  {response.cloudNative.map((item: string, index: number) => (
                                    <li key={index}>• {item}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {response.type === "simulation" && (
                          <div className="space-y-4">
                            <p className="text-gray-300">{response.explanation}</p>
                            <div className="bg-gray-900 rounded-lg p-4">
                              <h5 className="font-semibold mb-2">Factory Floor Simulation</h5>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {response.bots.map((bot: any, index: number) => (
                                  <div key={index} className="bg-gray-800 rounded p-3 text-center">
                                    <div className="text-2xl mb-1">{bot.icon}</div>
                                    <div className="text-sm font-semibold">{bot.name}</div>
                                    <div className="text-xs text-gray-400">{bot.function}</div>
                                    <div className="text-xs text-green-400">{bot.status}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Factory className="h-5 w-5 text-green-400 mr-2" />
                  Manufacturing Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">SAP Manufacturing</span>
                    <Badge variant="secondary" className="text-xs">
                      Expert
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Predictive Maintenance</span>
                    <Badge variant="secondary" className="text-xs">
                      Expert
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Digital Twins</span>
                    <Badge variant="secondary" className="text-xs">
                      Expert
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">IoT Integration</span>
                    <Badge variant="secondary" className="text-xs">
                      Expert
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                  Response Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Architecture Flow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Factory className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Prebuilt SAP Config</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">KPI Dashboards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Predictive Models</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

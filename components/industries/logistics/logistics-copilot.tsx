"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Truck, Package, BarChart3, Zap, Lightbulb, TrendingUp } from "lucide-react"

const quickQuestions = [
  "How can AI optimize my delivery routes?",
  "What's the ROI of warehouse automation?",
  "How to improve supply chain visibility?",
  "Best practices for inventory management?",
  "How to reduce logistics costs with AI?",
]

const sampleConversation = [
  {
    type: "bot",
    message:
      "Hello! I'm your Logistics AI Assistant. I can help you understand how AI can transform your supply chain operations. What would you like to know?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    type: "user",
    message: "How can AI help reduce our delivery costs?",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    type: "bot",
    message:
      "Great question! AI can reduce delivery costs through several approaches:\n\n🚛 **Smart Route Optimization**: AI analyzes traffic, weather, and delivery constraints to find the most efficient routes, typically reducing fuel costs by 20-30%.\n\n📦 **Predictive Load Planning**: AI optimizes truck capacity utilization, reducing the number of trips needed.\n\n⏰ **Dynamic Scheduling**: Real-time adjustments based on changing conditions prevent delays and overtime costs.\n\nWould you like me to explain any of these in more detail?",
    timestamp: new Date(Date.now() - 180000),
  },
]

export function LogisticsCopilot() {
  const [messages, setMessages] = useState(sampleConversation)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        message: generateAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (question) => {
    const responses = {
      route:
        "AI route optimization uses machine learning to analyze historical traffic patterns, weather data, and delivery constraints. Our clients typically see 25-35% reduction in fuel costs and 30% improvement in delivery times. The system continuously learns and adapts to provide increasingly better routes.",
      warehouse:
        "Warehouse automation with AI delivers impressive ROI - typically 200-300% within 18 months. Key benefits include 45% efficiency gains, 99.8% accuracy rates, and 30% cost reduction. The system pays for itself through reduced labor costs and improved throughput.",
      visibility:
        "Supply chain visibility is achieved through IoT sensors, real-time tracking, and AI analytics. You'll get 99% visibility across all touchpoints, predictive alerts for potential issues, and comprehensive dashboards. This typically reduces response times by 50%.",
      inventory:
        "AI-powered inventory management uses predictive analytics to forecast demand with 95% accuracy. This reduces inventory holding costs by 40% while preventing stockouts. The system automatically optimizes reorder points and quantities based on real-time demand patterns.",
      costs:
        "AI reduces logistics costs through multiple vectors: route optimization (25% savings), inventory optimization (40% reduction), predictive maintenance (30% cost avoidance), and automated operations (35% efficiency gain). Combined, clients typically see 20-35% total cost reduction.",
    }

    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes("route") || lowerQuestion.includes("delivery")) return responses.route
    if (lowerQuestion.includes("warehouse") || lowerQuestion.includes("automation")) return responses.warehouse
    if (lowerQuestion.includes("visibility") || lowerQuestion.includes("tracking")) return responses.visibility
    if (lowerQuestion.includes("inventory") || lowerQuestion.includes("stock")) return responses.inventory
    if (lowerQuestion.includes("cost") || lowerQuestion.includes("save")) return responses.costs

    return "That's an excellent question about logistics optimization! Our AI solutions are designed to address the specific challenges you're facing. I'd recommend scheduling a consultation with our logistics experts who can provide detailed insights tailored to your operations. Would you like me to help you set that up?"
  }

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ask Our Logistics
            <span className="block text-blue-600">AI Expert</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers about AI-powered logistics solutions, implementation strategies, and ROI calculations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Logistics AI Assistant</CardTitle>
                    <p className="text-blue-100 text-sm">Powered by ESGit Intelligence</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-100">Online</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Quick Questions */}
              {!isExpanded && (
                <div className="p-6 bg-gray-50 border-b">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Popular Questions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        className="text-left h-auto p-3 hover:bg-blue-50 hover:border-blue-300"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className={`${isExpanded ? "h-96" : "h-64"} overflow-y-auto p-6 space-y-4`}>
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-3 max-w-3xl ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`p-4 rounded-lg ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.message}</p>
                        <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex space-x-4">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about AI logistics solutions..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Instant responses
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      ROI calculations
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Minimize" : "Expand"} Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Route Optimization</h3>
              <p className="text-gray-600 text-sm">AI-powered routing solutions</p>
            </Card>

            <Card className="p-6 text-center">
              <Package className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Warehouse AI</h3>
              <p className="text-gray-600 text-sm">Autonomous operations</p>
            </Card>

            <Card className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Supply Chain Analytics</h3>
              <p className="text-gray-600 text-sm">Predictive insights</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

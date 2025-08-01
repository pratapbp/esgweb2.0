"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Send, Sparkles, TrendingUp, BarChart3, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface IndustryCopilotProps {
  selectedIndustry?: string | null
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  industry?: string
}

const quickQuestions = [
  "Top SAP AI use cases in Healthcare",
  "Retail supply chain automation examples",
  "BFSI vs Manufacturing AI adoption",
  "Energy sector RPA automation metrics",
  "Telecom 5G + SAP integration",
  "Manufacturing predictive maintenance ROI",
]

export default function IndustryCopilot({ selectedIndustry }: IndustryCopilotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "👋 I'm your Industry Intelligence Copilot! I can help you explore AI-powered solutions across 20+ industries, compare benchmarks, and provide detailed use cases. What industry would you like to explore?",
      timestamp: new Date(),
    },
  ])

  useEffect(() => {
    if (selectedIndustry && isOpen) {
      const industryMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `🎯 Great choice! Let me share insights about ${selectedIndustry}. Here are some key AI transformation areas I can help you explore:

• **SAP + AI Integration**: S/4HANA with embedded ML
• **Process Automation**: RPA + intelligent workflows  
• **Predictive Analytics**: Real-time business insights
• **Customer Experience**: AI-powered personalization

What specific aspect interests you most?`,
        timestamp: new Date(),
        industry: selectedIndustry,
      }
      setMessages((prev) => [...prev, industryMessage])
    }
  }, [selectedIndustry, isOpen])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/copilot/industry-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: message,
          industry: selectedIndustry,
          context: "industry_exploration",
        }),
      })

      const data = await response.json()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.response || "I'm processing your industry query. Let me provide detailed insights...",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I'm experiencing some technical difficulties. Please try again or contact our team for immediate assistance.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Floating Industry Copilot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group"
            >
              <Brain className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-1 -right-1">
                <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </Button>

            {/* Floating hint */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-xl border border-purple-500/20 rounded-xl px-4 py-2 shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-white whitespace-nowrap">Industry Intelligence</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Industry Copilot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.3 : 1,
              y: isMinimized ? 50 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`fixed bottom-6 right-6 z-40 ${
              isMinimized ? "w-80 h-20" : "w-[450px] h-[700px]"
            } bg-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Industry Intelligence</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">AI-Powered Insights</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-purple-400"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[450px]">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                            : "bg-purple-500/10 border border-purple-500/20 text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.type === "user" ? "text-white/70" : "text-gray-400"}`}>
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                          <span className="text-sm text-gray-400 ml-2">Analyzing industry data...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Questions */}
                <div className="px-4 py-2 border-t border-purple-500/20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-purple-500/10 border-purple-500/30 text-gray-300 hover:text-purple-400 transition-colors"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-purple-500/20">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                      placeholder="Ask about industry AI solutions..."
                      className="flex-1 bg-purple-500/10 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500/50"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

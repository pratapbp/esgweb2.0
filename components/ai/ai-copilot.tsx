"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Mic, Send, X, Minimize2, Maximize2, Volume2, VolumeX, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your ESGit AI Copilot. I can help you with SAP solutions, industry insights, and answer any questions about our services. How can I assist you today?",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I understand you're interested in our services. Let me help you with that. Our SAP solutions are designed to transform your business operations with cutting-edge AI integration.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // Voice recognition implementation would go here
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
    // Text-to-speech implementation would go here
  }

  return (
    <>
      {/* Floating AI Copilot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-neural-violet to-electric-cyan text-midnight-blue shadow-2xl shadow-electric-cyan/30 hover:shadow-electric-cyan/50 hover:scale-110 transition-all duration-300 group"
            >
              <Brain className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-2 -right-2">
                <div className="w-4 h-4 bg-success-green rounded-full animate-pulse" />
              </div>
            </Button>

            {/* Floating hint */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-midnight-blue/90 backdrop-blur-xl border border-electric-cyan/20 rounded-xl px-4 py-2 shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-electric-cyan" />
                <span className="text-sm text-luminous-white whitespace-nowrap">Ask me anything!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Copilot Panel */}
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
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? "w-80 h-20" : "w-96 h-[600px]"
            } bg-midnight-blue/90 backdrop-blur-xl border border-electric-cyan/20 rounded-2xl shadow-2xl shadow-electric-cyan/10 transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-electric-cyan/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neural-violet to-electric-cyan rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-midnight-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-luminous-white">ESGit AI Copilot</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                    <span className="text-xs text-luminous-white/60">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSpeakToggle}
                  className={`text-luminous-white/60 hover:text-electric-cyan ${
                    isSpeaking ? "text-electric-cyan" : ""
                  }`}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-luminous-white/60 hover:text-electric-cyan"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-luminous-white/60 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue"
                            : "bg-electric-cyan/10 border border-electric-cyan/20 text-luminous-white"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.type === "user" ? "text-midnight-blue/70" : "text-luminous-white/60"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t border-electric-cyan/20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-electric-cyan/10 border-electric-cyan/30 text-luminous-white/80"
                      onClick={() => setMessage("Tell me about SAP services")}
                    >
                      SAP Services
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-electric-cyan/10 border-electric-cyan/30 text-luminous-white/80"
                      onClick={() => setMessage("Show me AI solutions")}
                    >
                      AI Solutions
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-electric-cyan/10 border-electric-cyan/30 text-luminous-white/80"
                      onClick={() => setMessage("Industry expertise")}
                    >
                      Industries
                    </Badge>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-electric-cyan/20">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceToggle}
                      className={`text-luminous-white/60 hover:text-electric-cyan ${
                        isListening ? "text-electric-cyan animate-pulse" : ""
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask me anything about ESGit..."
                      className="flex-1 bg-electric-cyan/10 border-electric-cyan/20 text-luminous-white placeholder-luminous-white/50 focus:border-electric-cyan/50"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:shadow-lg hover:shadow-electric-cyan/30 disabled:opacity-50"
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

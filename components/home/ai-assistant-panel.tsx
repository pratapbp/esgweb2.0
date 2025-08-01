"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, MessageSquare, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AIAssistantPanel() {
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  // Default fallback image
  const aiAssistantImage = "/ai-powered-insights.png"

  const demoMessages = [
    "How can I optimize my SAP supply chain processes?",
    "What AI solutions do you offer for predictive maintenance?",
    "Can you help with SAP S/4HANA migration?",
  ]

  // Simulate typing effect
  const handleDemoClick = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setCurrentMessageIndex((prev) => (prev + 1) % demoMessages.length)
    }, 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-blue-600 mr-4">
                <Bot className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">AI Assistant</h2>
            </div>

            <p className="text-xl text-gray-300 mb-8">
              Experience the power of our AI assistant, designed to provide instant answers to your SAP and technology
              questions.
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  title: "Instant SAP Expertise",
                  description: "Get immediate answers to complex SAP implementation and configuration questions.",
                  icon: <Sparkles className="h-5 w-5 text-blue-400" />,
                },
                {
                  title: "AI-Powered Recommendations",
                  description: "Receive tailored suggestions for optimizing your enterprise systems.",
                  icon: <Sparkles className="h-5 w-5 text-blue-400" />,
                },
                {
                  title: "24/7 Support",
                  description: "Access assistance anytime, anywhere with our always-available AI assistant.",
                  icon: <Sparkles className="h-5 w-5 text-blue-400" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="p-2 rounded-lg bg-blue-900/50 mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Try Our AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
              <Image
                src={aiAssistantImage || "/placeholder.svg?height=500&width=800&query=ai assistant interface"}
                alt="AI Assistant Interface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>

              {/* Demo Chat Interface */}
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-600 mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold">ESG AI Assistant</h3>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  <div className="bg-gray-800/70 rounded-lg p-3 max-w-[80%] backdrop-blur-sm">
                    <p className="text-sm text-gray-300">
                      Hello! I'm your ESG AI Assistant. How can I help you with your SAP and technology needs today?
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-900/70 rounded-lg p-3 max-w-[80%] backdrop-blur-sm">
                      <p className="text-sm">{demoMessages[currentMessageIndex]}</p>
                    </div>
                  </div>

                  {!isTyping && (
                    <div className="bg-gray-800/70 rounded-lg p-3 max-w-[80%] backdrop-blur-sm">
                      <p className="text-sm text-gray-300">
                        I'd be happy to help with that! Here's what you need to know about{" "}
                        {currentMessageIndex === 0
                          ? "optimizing your SAP supply chain processes"
                          : currentMessageIndex === 1
                            ? "our AI solutions for predictive maintenance"
                            : "SAP S/4HANA migration"}
                        ...
                      </p>
                    </div>
                  )}

                  {isTyping && (
                    <div className="bg-gray-800/70 rounded-lg p-3 max-w-[80%] backdrop-blur-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="w-full bg-gray-800/70 border border-gray-700 rounded-lg py-3 px-4 text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleDemoClick}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center"
                initial={{
                  x: 20 + index * 30,
                  y: 50 + index * 40,
                  scale: 0.8,
                  opacity: 0.6,
                }}
                animate={{
                  x: [20 + index * 30, 40 + index * 30, 20 + index * 30],
                  y: [50 + index * 40, 70 + index * 40, 50 + index * 40],
                  scale: [0.8, 1, 0.8],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="h-6 w-6 text-blue-400" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

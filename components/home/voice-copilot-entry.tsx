"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Sparkles } from "lucide-react"

export function VoiceCopilotEntry() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate listening for 3 seconds
      setTimeout(() => {
        setIsListening(false)
        setIsSpeaking(true)
        // Simulate speaking for 2 seconds
        setTimeout(() => setIsSpeaking(false), 2000)
      }, 3000)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neural-violet/10 to-electric-cyan/10" />
        {isListening && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-electric-cyan to-neural-violet"
          />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-neural-violet/20 text-neural-violet border-neural-violet/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Voice-Powered AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Meet Your AI Copilot</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of human-AI interaction with our voice-powered copilot
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
            <CardContent className="p-12 text-center">
              {/* Voice Visualizer */}
              <div className="mb-8">
                <motion.div
                  animate={
                    isListening
                      ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }
                      : isSpeaking
                        ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
                        : {}
                  }
                  transition={{ duration: 1, repeat: isListening || isSpeaking ? Number.POSITIVE_INFINITY : 0 }}
                  className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-electric-cyan to-neural-violet flex items-center justify-center"
                >
                  {isListening ? (
                    <Mic className="h-16 w-16 text-white" />
                  ) : isSpeaking ? (
                    <Volume2 className="h-16 w-16 text-white" />
                  ) : (
                    <MessageSquare className="h-16 w-16 text-white" />
                  )}
                </motion.div>
              </div>

              {/* Status Text */}
              <div className="mb-8">
                {isListening ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-electric-cyan text-xl font-semibold"
                  >
                    Listening... Ask me anything about SAP or AI solutions
                  </motion.div>
                ) : isSpeaking ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neural-violet text-xl font-semibold"
                  >
                    I can help you with SAP implementations, AI strategies, and more...
                  </motion.div>
                ) : (
                  <div className="text-gray-300 text-lg">
                    Click the microphone to start a conversation with your AI copilot
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={toggleListening}
                  disabled={isSpeaking}
                  className={`px-8 py-4 text-lg transition-all duration-300 ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue hover:scale-105"
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-5 w-5 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Start Voice Chat
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  disabled={!isSpeaking}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-5 w-5 mr-2" />
                      Mute
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-5 w-5 mr-2" />
                      Unmuted
                    </>
                  )}
                </Button>
              </div>

              {/* Sample Questions */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-3">Try asking:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>"How can AI improve my SAP implementation?"</li>
                    <li>"What's the ROI of digital transformation?"</li>
                    <li>"Show me predictive analytics use cases"</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-3">I can help with:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>SAP strategy and implementation</li>
                    <li>AI and machine learning solutions</li>
                    <li>Digital transformation roadmaps</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

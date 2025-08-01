"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Mail, Calendar, X, Sparkles } from "lucide-react"

const quickActions = [
  {
    icon: MessageSquare,
    label: "Chat with AI",
    color: "bg-blue-600 hover:bg-blue-700",
    action: () => console.log("Open AI Chat"),
  },
  {
    icon: Phone,
    label: "Schedule Call",
    color: "bg-green-600 hover:bg-green-700",
    action: () => console.log("Schedule Call"),
  },
  {
    icon: Mail,
    label: "Send Email",
    color: "bg-purple-600 hover:bg-purple-700",
    action: () => console.log("Send Email"),
  },
  {
    icon: Calendar,
    label: "Book Demo",
    color: "bg-orange-600 hover:bg-orange-700",
    action: () => console.log("Book Demo"),
  },
]

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Button
                  onClick={action.action}
                  className={`${action.color} text-white shadow-lg hover:scale-105 transition-transform`}
                  size="sm"
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-600 hover:bg-red-700 rotate-45"
            : "bg-gradient-to-r from-electric-cyan to-neural-violet hover:scale-110"
        }`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white" />}
      </Button>
    </div>
  )
}

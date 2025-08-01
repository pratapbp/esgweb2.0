"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function IndustrySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Industries")

  const categories = [
    "All Industries",
    "Manufacturing",
    "Financial",
    "Healthcare",
    "Technology",
    "Energy",
    "Retail",
    "Transportation",
  ]

  const handleSelect = (category: string) => {
    setSelectedCategory(category)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{selectedCategory}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-lg z-50"
          >
            <div className="py-1">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedCategory === category ? "bg-primary/10 text-primary" : "hover:bg-card/80"
                  }`}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

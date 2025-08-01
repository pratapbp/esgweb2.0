"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BlogHero() {
  const [searchTerm, setSearchTerm] = useState("")
  const [animatedText, setAnimatedText] = useState("SAP Solutions")

  // Rotate through different topics for animation
  useEffect(() => {
    const topics = [
      "SAP Solutions",
      "AI Technologies",
      "Industry Insights",
      "Digital Transformation",
      "Cloud Innovation",
      "Data Analytics",
    ]

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % topics.length
      setAnimatedText(topics[index])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 opacity-70">
        <div className="absolute inset-0 bg-[url('/abstract-digital-background.png')] mix-blend-overlay opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI-Powered Insights on{" "}
            <motion.span
              key={animatedText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            >
              {animatedText}
            </motion.span>
          </h1>

          <p className="text-xl text-gray-200 mb-8">
            Explore AI-generated content that combines our expertise in SAP, industry knowledge, and cutting-edge
            technologies.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search for topics, industries, or technologies..."
              className="pl-10 h-12 bg-white/10 backdrop-blur-md border-gray-700 text-white placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Brain, LineChart, Zap, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type InsightCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string | null
  stats: { label: string; value: string }[]
}

export default function AIInsightsCards() {
  const [activeCard, setActiveCard] = useState<string>("predictive")

  // Default fallback image
  const fallbackImage = "/abstract-data-flow.png"

  const insightCards: InsightCard[] = [
    {
      id: "predictive",
      title: "Predictive Analytics",
      description: "Anticipate business trends and make data-driven decisions with our AI-powered predictive models.",
      icon: <LineChart className="h-6 w-6" />,
      image: "/images/predictive-dashboard.jpg",
      stats: [
        { label: "Forecast Accuracy", value: "94%" },
        { label: "Decision Speed", value: "3.2x" },
        { label: "Cost Reduction", value: "27%" },
      ],
    },
    {
      id: "anomaly",
      title: "Anomaly Detection",
      description: "Identify unusual patterns and potential issues before they impact your business operations.",
      icon: <Zap className="h-6 w-6" />,
      image: "/images/anomaly-detection.jpg",
      stats: [
        { label: "Early Detection", value: "98%" },
        { label: "False Positives", value: "<3%" },
        { label: "Response Time", value: "↓68%" },
      ],
    },
    {
      id: "patterns",
      title: "Pattern Recognition",
      description: "Discover hidden relationships in your data to unlock new business opportunities and efficiencies.",
      icon: <Brain className="h-6 w-6" />,
      image: "/images/data-patterns.jpg",
      stats: [
        { label: "Pattern Accuracy", value: "91%" },
        { label: "New Insights", value: "4.7x" },
        { label: "Process Efficiency", value: "↑36%" },
      ],
    },
  ]

  const currentCard = insightCards.find((card) => card.id === activeCard) || insightCards[0]

  // Determine the image source, ensuring we never pass an empty string
  const imageSource = currentCard.image && currentCard.image.trim() !== "" ? currentCard.image : fallbackImage

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to transform your SAP data into actionable business insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {insightCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
                activeCard === card.id
                  ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/10"
                  : "border-gray-700 bg-gray-900/50 hover:bg-gray-900"
              }`}
              onClick={() => setActiveCard(card.id)}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${activeCard === card.id ? "bg-blue-600" : "bg-gray-800"}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={activeCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-blue-600 mr-4">{currentCard.icon}</div>
                <h3 className="text-2xl font-bold">{currentCard.title}</h3>
              </div>

              <p className="text-gray-300 mb-8">{currentCard.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {currentCard.stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                  </div>
                ))}
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore {currentCard.title} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative h-[300px] lg:h-auto">
              <Image
                src={
                  imageSource && imageSource.trim() !== ""
                    ? imageSource
                    : "/placeholder.svg?height=400&width=600&query=ai analytics dashboard"
                }
                alt={currentCard.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent lg:bg-gradient-to-l"></div>

              <div className="absolute bottom-6 right-6 p-3 rounded-lg bg-blue-900/70 backdrop-blur-sm border border-blue-700">
                <BarChart className="h-6 w-6 text-blue-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

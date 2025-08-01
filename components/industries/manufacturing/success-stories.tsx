"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ManufacturingSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const successStories = [
    {
      title: "Global automotive giant reduced defects by 42% using GenAI+CV inspection",
      company: "Fortune 500 Automotive Manufacturer",
      industry: "Automotive",
      challenge:
        "Manual quality inspection processes were missing 15% of defects, leading to costly recalls and customer dissatisfaction.",
      solution:
        "Implemented ESGit's GenAI-powered computer vision system integrated with SAP Quality Management for real-time defect detection.",
      results: {
        defectReduction: "42%",
        qualityScore: "99.2%",
        costSavings: "$8.5M annually",
        inspectionSpeed: "3x faster",
      },
      metrics: [
        { label: "Defect Detection Rate", value: "99.2%", improvement: "+15%" },
        { label: "Inspection Time", value: "30 seconds", improvement: "-67%" },
        { label: "False Positives", value: "0.8%", improvement: "-85%" },
        { label: "Annual Savings", value: "$8.5M", improvement: "New" },
      ],
      quote:
        "ESGit's AI vision system has revolutionized our quality control. We now catch defects that human inspectors would miss, and we do it 3x faster.",
      clientName: "Sarah Chen",
      clientTitle: "VP of Manufacturing Excellence",
      duration: "6 months implementation",
      technologies: ["Computer Vision", "SAP QM", "GenAI", "IoT Sensors"],
      whitepaper: "automotive-ai-quality-control.pdf",
    },
    {
      title: "20+ plants unified under one SAP Digital Core",
      company: "Global Industrial Equipment Manufacturer",
      industry: "Industrial Equipment",
      challenge:
        "Disparate systems across 20+ manufacturing plants led to poor visibility, inconsistent processes, and high operational costs.",
      solution:
        "Deployed SAP S/4HANA Digital Core with ESGit's AI-powered integration platform to unify all manufacturing operations.",
      results: {
        plantIntegration: "20+ plants",
        dataVisibility: "Real-time",
        processStandardization: "95%",
        operationalEfficiency: "+35%",
      },
      metrics: [
        { label: "System Integration", value: "20 plants", improvement: "100%" },
        { label: "Data Latency", value: "< 5 seconds", improvement: "-95%" },
        { label: "Process Standardization", value: "95%", improvement: "+78%" },
        { label: "Operational Costs", value: "-28%", improvement: "New" },
      ],
      quote:
        "ESGit transformed our fragmented manufacturing landscape into a unified, intelligent operation. We now have complete visibility across all plants.",
      clientName: "Michael Rodriguez",
      clientTitle: "Chief Operations Officer",
      duration: "18 months rollout",
      technologies: ["SAP S/4HANA", "Digital Manufacturing", "AI Integration", "IoT Platform"],
      whitepaper: "digital-core-transformation.pdf",
    },
    {
      title: "$3.5M saved in raw material sourcing using AI cost prediction models",
      company: "Leading Chemical Manufacturer",
      industry: "Chemicals",
      challenge:
        "Volatile raw material prices and complex supplier networks resulted in unpredictable costs and supply chain disruptions.",
      solution:
        "Implemented ESGit's AI-powered procurement platform with predictive cost modeling integrated with SAP Ariba.",
      results: {
        costSavings: "$3.5M annually",
        priceAccuracy: "94%",
        supplierOptimization: "60% improvement",
        contractNegotiation: "45% faster",
      },
      metrics: [
        { label: "Cost Prediction Accuracy", value: "94%", improvement: "+67%" },
        { label: "Supplier Performance", value: "98%", improvement: "+23%" },
        { label: "Contract Cycle Time", value: "12 days", improvement: "-45%" },
        { label: "Annual Savings", value: "$3.5M", improvement: "New" },
      ],
      quote:
        "The AI cost prediction models have given us unprecedented visibility into market trends. We're now proactive instead of reactive in our sourcing strategy.",
      clientName: "Dr. Jennifer Liu",
      clientTitle: "Chief Procurement Officer",
      duration: "8 months implementation",
      technologies: ["SAP Ariba", "AI Forecasting", "Market Intelligence", "Blockchain"],
      whitepaper: "ai-procurement-optimization.pdf",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, successStories.length])

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setIsAutoPlaying(false)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setIsAutoPlaying(false)
  }

  const currentData = successStories[currentStory]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manufacturing <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real transformations from leading manufacturers who chose ESGit's AI-powered solutions.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {currentData.industry}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {currentData.duration}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Play className="h-4 w-4 mr-1" />
                      Video Story
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Whitepaper
                    </Button>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">{currentData.title}</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-2">Challenge</h4>
                      <p className="text-gray-300">{currentData.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">ESGit Solution</h4>
                      <p className="text-gray-300">{currentData.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentData.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-4">Key Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {currentData.metrics.map((metric, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">{metric.value}</div>
                            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                            <div className="text-xs text-green-500">{metric.improvement}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                      <p className="text-gray-300 italic mb-3">"{currentData.quote}"</p>
                      <div className="text-sm">
                        <div className="font-semibold text-blue-400">{currentData.clientName}</div>
                        <div className="text-gray-400">{currentData.clientTitle}</div>
                        <div className="text-gray-500">{currentData.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevStory}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentStory(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    currentStory === index ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                isAutoPlaying
                  ? "bg-green-900/30 text-green-400 border border-green-700/50"
                  : "bg-gray-800 text-gray-400 border border-gray-700"
              }`}
            >
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Zap } from "lucide-react"

const successStories = [
  {
    id: "pricing",
    title: "AI-powered pricing led to 18% revenue lift in 6 weeks",
    company: "Global Fashion Retailer",
    industry: "Fashion & Apparel",
    challenge: "Manual pricing strategies causing margin loss and competitive disadvantage",
    solution: "GenAI dynamic pricing with competitor analysis and demand forecasting",
    results: [
      { metric: "Revenue Increase", value: "18%", icon: DollarSign },
      { metric: "Margin Improvement", value: "12%", icon: TrendingUp },
      { metric: "Price Optimization Speed", value: "95%", icon: Zap },
      { metric: "Competitive Response Time", value: "2 hours", icon: Users },
    ],
    technologies: ["SAP S/4HANA", "GenAI Pricing Engine", "Competitor Intelligence", "Real-time Analytics"],
    timeline: "6 weeks implementation",
    roi: "340% ROI in first quarter",
    testimonial:
      "ESGit's AI pricing solution transformed our competitive positioning overnight. We're now responding to market changes in hours, not days.",
    clientRole: "Chief Revenue Officer",
    videoThumbnail: "/images/case-studies/pricing-success.jpg",
  },
  {
    id: "returns",
    title: "RPA reduced returns processing time by 70%",
    company: "E-commerce Giant",
    industry: "E-commerce",
    challenge: "Manual returns processing causing customer dissatisfaction and high operational costs",
    solution: "RPA bots with AI fraud detection and automated customer communication",
    results: [
      { metric: "Processing Time Reduction", value: "70%", icon: Zap },
      { metric: "Customer Satisfaction", value: "4.8/5", icon: Users },
      { metric: "Fraud Detection Accuracy", value: "96%", icon: TrendingUp },
      { metric: "Cost Savings", value: "$2.3M", icon: DollarSign },
    ],
    technologies: ["RPA Platform", "Computer Vision", "SAP Service Cloud", "ML Fraud Detection"],
    timeline: "8 weeks implementation",
    roi: "280% ROI in 6 months",
    testimonial:
      "The automated returns process has revolutionized our customer service. What used to take days now happens in minutes.",
    clientRole: "VP of Customer Operations",
    videoThumbnail: "/images/case-studies/returns-automation.jpg",
  },
  {
    id: "footfall",
    title: "CV-enabled footfall analytics increased conversions by 23%",
    company: "Premium Retail Chain",
    industry: "Luxury Retail",
    challenge: "Limited insights into customer behavior and store optimization opportunities",
    solution: "Computer vision analytics with heatmap generation and behavior analysis",
    results: [
      { metric: "Conversion Rate Increase", value: "23%", icon: TrendingUp },
      { metric: "Store Layout Optimization", value: "35%", icon: Zap },
      { metric: "Staff Allocation Efficiency", value: "28%", icon: Users },
      { metric: "Revenue per Square Foot", value: "31%", icon: DollarSign },
    ],
    technologies: ["Computer Vision", "SAP Analytics Cloud", "Heatmap Analytics", "Real-time Dashboard"],
    timeline: "4 weeks implementation",
    roi: "420% ROI in first year",
    testimonial:
      "Understanding customer flow patterns has completely changed how we design our stores. Every square foot now works harder.",
    clientRole: "Director of Store Operations",
    videoThumbnail: "/images/case-studies/footfall-analytics.jpg",
  },
]

export default function SuccessSnapshots() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % successStories.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setAutoPlay(false)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setAutoPlay(false)
  }

  const currentData = successStories[currentStory]

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              📈 Retail Success Snapshots
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real Transformations, Measurable Results
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover how leading retailers achieved breakthrough results with ESGit's AI-powered solutions
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Story Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={prevStory} className="rounded-full bg-transparent">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStory(index)
                      setAutoPlay(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStory ? "bg-blue-600 w-8" : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextStory} className="rounded-full bg-transparent">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoPlay(!autoPlay)}
                className="flex items-center gap-2"
              >
                {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {autoPlay ? "Pause" : "Play"}
              </Button>
            </div>
          </div>

          {/* Story Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl border-2 border-blue-200/50 dark:border-blue-700/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Video/Image Section */}
                    <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
                      <div className="relative">
                        <div className="aspect-video bg-black/20 rounded-lg mb-6 flex items-center justify-center">
                          <Button
                            size="lg"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full p-4"
                          >
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {currentData.industry}
                          </Badge>
                          <h3 className="text-2xl font-bold leading-tight">{currentData.title}</h3>
                          <p className="text-blue-100">{currentData.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="space-y-6">
                        {/* Challenge & Solution */}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Challenge:</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{currentData.challenge}</p>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Solution:</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{currentData.solution}</p>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {currentData.results.map((result, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 text-center"
                            >
                              <result.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                                {result.value}
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{result.metric}</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {currentData.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Timeline: </span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {currentData.timeline}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">ROI: </span>
                            <span className="font-semibold text-green-600 dark:text-green-400">{currentData.roi}</span>
                          </div>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <p className="text-slate-700 dark:text-slate-300 italic mb-2">"{currentData.testimonial}"</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">— {currentData.clientRole}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Download Full Case Study
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Similar Demo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
              <TrendingUp className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Join hundreds of retailers who have transformed their operations with ESGit's AI-powered solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Transformation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
                >
                  View All Case Studies
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

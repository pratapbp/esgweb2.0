"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, TrendingUp, Users, ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react"

const successStories = [
  {
    title: "Decreased dropped call rate by 67% using network AI twins",
    company: "TeleMax India",
    industry: "Telecommunications",
    challenge: "High dropped call rates during peak hours affecting customer satisfaction",
    solution: "Implemented AI-powered network twins for predictive optimization and real-time load balancing",
    results: [
      "67% reduction in dropped calls",
      "99.8% network uptime achieved",
      "25% improvement in customer satisfaction",
      "₹50M annual savings in infrastructure costs",
    ],
    metrics: {
      before: "15.2%",
      after: "5.1%",
      improvement: "67%",
      timeframe: "6 months",
    },
    testimonial:
      "ESGit's AI network twins transformed our infrastructure reliability. The predictive capabilities have been game-changing for our operations.",
    author: "Rajesh Kumar, CTO",
    image: "/images/testimonials/testimonial-1.jpg",
    video: "/videos/telemax-case-study.mp4",
    tags: ["Network Optimization", "AI Twins", "Predictive Analytics"],
  },
  {
    title: "ARPU up by $4/month via GenAI bundle optimizer",
    company: "ConnectPlus Telecom",
    industry: "Mobile Services",
    challenge: "Low ARPU and difficulty in creating personalized offers for diverse customer segments",
    solution: "Deployed GenAI-powered bundle optimizer for dynamic, personalized plan generation",
    results: [
      "$4 monthly ARPU increase per customer",
      "32% higher plan adoption rate",
      "18% reduction in customer churn",
      "45% improvement in offer relevance",
    ],
    metrics: {
      before: "$12/month",
      after: "$16/month",
      improvement: "33%",
      timeframe: "4 months",
    },
    testimonial:
      "The GenAI bundle optimizer has revolutionized how we approach customer offers. The personalization level is unprecedented.",
    author: "Priya Sharma, Head of Revenue",
    image: "/images/testimonials/testimonial-2.jpg",
    video: "/videos/connectplus-case-study.mp4",
    tags: ["Revenue Optimization", "GenAI", "Personalization"],
  },
  {
    title: "70% fewer Tier-1 support tickets due to NLP Copilot",
    company: "VoiceNet Solutions",
    industry: "Customer Service",
    challenge: "Overwhelming support ticket volume and long resolution times affecting customer experience",
    solution: "Implemented AI-powered NLP Copilot for automated Tier-1 support and intelligent routing",
    results: [
      "70% reduction in Tier-1 tickets",
      "85% first-contact resolution rate",
      "60% faster average resolution time",
      "40% improvement in CSAT scores",
    ],
    metrics: {
      before: "12,000 tickets/day",
      after: "3,600 tickets/day",
      improvement: "70%",
      timeframe: "3 months",
    },
    testimonial:
      "Our NLP Copilot has transformed customer service. Agents can now focus on complex issues while AI handles routine queries seamlessly.",
    author: "Amit Patel, VP Customer Experience",
    image: "/images/testimonials/testimonial-3.jpg",
    video: "/videos/voicenet-case-study.mp4",
    tags: ["Customer Support", "NLP", "Automation"],
  },
]

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const playVideo = () => {
    setIsVideoPlaying(true)
    // In a real implementation, this would open a video modal or player
    window.open(successStories[activeStory].video, "_blank")
  }

  const viewFullCaseStudy = () => {
    window.open(`/case-studies/telecom/${activeStory + 1}`, "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 mb-4">
            Case Studies & Results
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Proven Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how leading telecom companies have transformed their operations and achieved remarkable results
            with ESGit's AI-powered solutions.
          </p>
        </motion.div>

        {/* Story Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={prevStory}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStory === index ? "bg-blue-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStory}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Success Story Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Story Content */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {successStories[activeStory].tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">{successStories[activeStory].title}</h3>

                <div className="flex items-center space-x-4 mb-6">
                  <div>
                    <div className="text-lg font-semibold text-blue-300">{successStories[activeStory].company}</div>
                    <div className="text-sm text-gray-400">{successStories[activeStory].industry}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Challenge</h4>
                  <p className="text-gray-300 text-sm">{successStories[activeStory].challenge}</p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Solution</h4>
                  <p className="text-gray-300 text-sm">{successStories[activeStory].solution}</p>
                </div>
              </div>

              {/* Results */}
              <div>
                <h4 className="font-semibold text-white mb-3">Key Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {successStories[activeStory].results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                <blockquote className="text-gray-300 italic mb-4">
                  "{successStories[activeStory].testimonial}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <img
                    src={successStories[activeStory].image || "/placeholder.svg"}
                    alt={successStories[activeStory].author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{successStories[activeStory].author}</div>
                    <div className="text-xs text-gray-400">{successStories[activeStory].company}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={playVideo}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video Case Study
                </Button>
                <Button
                  onClick={viewFullCaseStudy}
                  variant="outline"
                  className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Full Case Study
                </Button>
              </div>
            </div>

            {/* Metrics Visualization */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="text-sm text-red-300 mb-1">Before</div>
                        <div className="text-2xl font-bold text-white">
                          {successStories[activeStory].metrics.before}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-sm text-green-300 mb-1">After</div>
                        <div className="text-2xl font-bold text-white">{successStories[activeStory].metrics.after}</div>
                      </div>
                    </div>

                    {/* Improvement Highlight */}
                    <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
                      <div className="text-4xl font-bold text-green-400 mb-2">
                        {successStories[activeStory].metrics.improvement}
                      </div>
                      <div className="text-sm text-gray-300">Improvement</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Achieved in {successStories[activeStory].metrics.timeframe}
                      </div>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Implementation Progress</span>
                        <span className="text-green-400">100%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">2.5M+</div>
                  <div className="text-xs text-gray-400">Users Impacted</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">₹125M</div>
                  <div className="text-xs text-gray-400">Annual Savings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

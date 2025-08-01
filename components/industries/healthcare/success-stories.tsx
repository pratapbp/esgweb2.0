"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Play,
  Download,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const successStories = [
  {
    id: 1,
    title: "Reduced ER wait times by 35% using Copilot AI scheduling",
    client: "Metropolitan General Hospital",
    industry: "Large Hospital System",
    challenge: "Emergency department overcrowding and long patient wait times",
    solution: "AI-powered patient triage and resource optimization system",
    results: [
      { metric: "Wait Time Reduction", value: "35%", icon: Clock },
      { metric: "Patient Satisfaction", value: "92%", icon: Users },
      { metric: "Staff Efficiency", value: "+28%", icon: TrendingUp },
      { metric: "Cost Savings", value: "$2.1M", icon: DollarSign },
    ],
    description:
      "Implemented ESGit's AI Copilot to optimize emergency department scheduling and patient flow, resulting in significant improvements in patient care and operational efficiency.",
    image: "/images/testimonials/testimonial-1.jpg",
    videoUrl: "#",
    caseStudyUrl: "#",
    tags: ["AI Scheduling", "Emergency Care", "Patient Flow"],
  },
  {
    id: 2,
    title: "Increased claim acceptance from 76% to 97% with GenAI",
    client: "Regional Healthcare Network",
    industry: "Multi-facility Healthcare",
    challenge: "High claim rejection rates and revenue cycle inefficiencies",
    solution: "GenAI-powered claim validation and processing system",
    results: [
      { metric: "Claim Acceptance", value: "97%", icon: TrendingUp },
      { metric: "Processing Time", value: "-60%", icon: Clock },
      { metric: "Revenue Recovery", value: "$8.5M", icon: DollarSign },
      { metric: "Staff Productivity", value: "+45%", icon: Users },
    ],
    description:
      "Deployed intelligent claim processing system using GenAI to validate claims before submission, dramatically improving acceptance rates and revenue cycle performance.",
    image: "/images/testimonials/testimonial-2.jpg",
    videoUrl: "#",
    caseStudyUrl: "#",
    tags: ["Claims Processing", "Revenue Cycle", "GenAI"],
  },
  {
    id: 3,
    title: "Smart clinical matching engine reduced trial recruitment time by 50%",
    client: "Academic Medical Center",
    industry: "Research Institution",
    challenge: "Slow and inefficient clinical trial patient recruitment",
    solution: "AI-powered patient matching and recruitment platform",
    results: [
      { metric: "Recruitment Time", value: "-50%", icon: Clock },
      { metric: "Match Accuracy", value: "94%", icon: TrendingUp },
      { metric: "Trial Enrollment", value: "+75%", icon: Users },
      { metric: "Research ROI", value: "+120%", icon: DollarSign },
    ],
    description:
      "Developed intelligent patient matching system for clinical trials, using AI to identify eligible patients and streamline the recruitment process.",
    image: "/images/testimonials/testimonial-3.jpg",
    videoUrl: "#",
    caseStudyUrl: "#",
    tags: ["Clinical Trials", "Patient Matching", "Research"],
  },
]

export function HealthcareSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setIsAutoPlaying(false)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setIsAutoPlaying(false)
  }

  const story = successStories[currentStory]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800">Healthcare Success Stories</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Real Results, Real Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how healthcare organizations are transforming patient care and operational efficiency with ESGit's AI
            solutions.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Story Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={prevStory} className="rounded-full bg-transparent">
                <ChevronLeft size={16} />
              </Button>

              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStory(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStory ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={nextStory} className="rounded-full bg-transparent">
                <ChevronRight size={16} />
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
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="space-y-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {story.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-gray-900 leading-tight">{story.title}</h3>

                        {/* Client Info */}
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-blue-600">{story.client}</div>
                          <div className="text-gray-600">{story.industry}</div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">{story.description}</p>

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {story.results.map((result, index) => {
                            const IconComponent = result.icon
                            return (
                              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                                <IconComponent size={24} className="mx-auto mb-2 text-blue-600" />
                                <div className="text-2xl font-bold text-gray-900 mb-1">{result.value}</div>
                                <div className="text-sm text-gray-600">{result.metric}</div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video Case Study
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Image/Video */}
                    <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center min-h-[400px]">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 text-center text-white p-8">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                          <Play size={32} />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Watch Success Story</h4>
                        <p className="text-blue-100">See how {story.client} transformed their operations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Auto-playing stories</span>
                <Button variant="ghost" size="sm" onClick={() => setIsAutoPlaying(false)} className="text-xs">
                  Pause
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const successStories = [
  {
    id: 1,
    company: "Global Manufacturing Corp",
    industry: "Manufacturing",
    challenge: "Outdated ERP system causing 40% operational inefficiency",
    solution: "SAP S/4HANA implementation with AI-powered predictive maintenance",
    results: {
      efficiency: "+65%",
      downtime: "-80%",
      savings: "$2.4M annually",
    },
    testimonial:
      "ESG transformed our entire operation. The AI-powered insights have revolutionized how we approach maintenance and production planning.",
    client: {
      name: "Sarah Johnson",
      title: "CTO",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    timeline: "6 months",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    company: "RetailTech Solutions",
    industry: "Retail",
    challenge: "Poor customer experience and inventory management issues",
    solution: "Omnichannel retail platform with AI-driven customer analytics",
    results: {
      conversion: "+45%",
      satisfaction: "+70%",
      inventory: "-30% waste",
    },
    testimonial:
      "The AI recommendations have completely changed how we understand our customers. Sales have never been better.",
    client: {
      name: "Michael Chen",
      title: "VP of Operations",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
    },
    timeline: "4 months",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    company: "FinanceFirst Bank",
    industry: "Banking",
    challenge: "High fraud rates and slow transaction processing",
    solution: "AI-powered fraud detection and real-time processing system",
    results: {
      fraud: "-95%",
      processing: "+300%",
      satisfaction: "+60%",
    },
    testimonial:
      "ESG's AI solution has made our fraud detection incredibly accurate while improving customer experience significantly.",
    client: {
      name: "Emily Rodriguez",
      title: "Chief Risk Officer",
      avatar: "/placeholder.svg?height=60&width=60&text=ER",
    },
    timeline: "8 months",
    color: "from-purple-500 to-pink-500",
  },
]

export function ClientSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
  }

  const story = successStories[currentStory]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/30 to-gray-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-success-green/20 text-success-green border-success-green/30">
            <Star className="w-4 h-4 mr-2" />
            Client Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Transforming Businesses Worldwide</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our AI-powered solutions have delivered measurable results for leading enterprises
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
                <CardContent className="p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Story Content */}
                    <div>
                      <div className="flex items-center mb-6">
                        <Badge className={`bg-gradient-to-r ${story.color} text-white border-none mr-4`}>
                          {story.industry}
                        </Badge>
                        <div className="text-gray-400">{story.timeline} implementation</div>
                      </div>

                      <h3 className="text-3xl font-bold text-luminous-white mb-4">{story.company}</h3>

                      <div className="space-y-4 mb-8">
                        <div>
                          <h4 className="text-lg font-semibold text-electric-cyan mb-2">Challenge</h4>
                          <p className="text-gray-300">{story.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-electric-cyan mb-2">Solution</h4>
                          <p className="text-gray-300">{story.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(story.results).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center p-4 bg-gray-800/50 rounded-lg"
                          >
                            <div className="text-2xl font-bold text-success-green mb-1">{value}</div>
                            <div className="text-sm text-gray-400 capitalize">{key}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="relative">
                      <div className="absolute top-0 left-0 text-electric-cyan opacity-20">
                        <Quote className="h-16 w-16" />
                      </div>
                      <div className="bg-gray-800/30 p-8 rounded-2xl relative z-10">
                        <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">"{story.testimonial}"</p>
                        <div className="flex items-center">
                          <img
                            src={story.client.avatar || "/placeholder.svg"}
                            alt={story.client.name}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <div className="font-semibold text-luminous-white">{story.client.name}</div>
                            <div className="text-gray-400">{story.client.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStory}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory ? "bg-electric-cyan" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextStory}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Success Stories" },
            { value: "98.7%", label: "Client Satisfaction" },
            { value: "$50M+", label: "Client Savings" },
            { value: "25+", label: "Industries Served" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-electric-cyan mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

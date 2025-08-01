"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Truck,
  Package,
  BarChart3,
  Clock,
  DollarSign,
  Award,
  Target,
  Zap,
} from "lucide-react"

const successStories = [
  {
    id: "global-freight",
    company: "Global Freight Solutions",
    industry: "Transportation & Logistics",
    size: "5,000+ employees",
    challenge: "Inefficient route planning and high fuel costs across 50+ distribution centers",
    solution: "AI-powered route optimization with real-time traffic analysis and predictive routing",
    results: {
      costReduction: "32%",
      fuelSavings: "28%",
      deliveryTime: "35%",
      customerSatisfaction: "94%",
    },
    metrics: [
      { label: "Annual Savings", value: "$12.5M", icon: DollarSign },
      { label: "Routes Optimized", value: "50K+", icon: Truck },
      { label: "CO2 Reduction", value: "40%", icon: Target },
      { label: "Implementation Time", value: "3 months", icon: Clock },
    ],
    testimonial: {
      quote:
        "ESGit's AI route optimization transformed our operations. We're saving millions while delivering faster than ever before.",
      author: "Sarah Chen",
      role: "VP of Operations",
      image: "/images/testimonials/testimonial-1.jpg",
    },
    tags: ["Route Optimization", "Cost Reduction", "Sustainability"],
  },
  {
    id: "mega-distribution",
    company: "MegaDistribution Corp",
    industry: "E-commerce & Retail",
    size: "10,000+ employees",
    challenge: "Manual warehouse operations causing delays and accuracy issues",
    solution: "Autonomous warehouse management with AI-powered inventory optimization",
    results: {
      efficiency: "45%",
      accuracy: "99.8%",
      throughput: "60%",
      laborCosts: "30%",
    },
    metrics: [
      { label: "Orders Processed", value: "1M+/day", icon: Package },
      { label: "Accuracy Rate", value: "99.8%", icon: Target },
      { label: "Efficiency Gain", value: "45%", icon: TrendingUp },
      { label: "ROI Achievement", value: "18 months", icon: Award },
    ],
    testimonial: {
      quote:
        "The autonomous warehouse solution exceeded our expectations. 99.8% accuracy with 45% efficiency improvement is remarkable.",
      author: "Michael Rodriguez",
      role: "Warehouse Operations Director",
      image: "/images/testimonials/testimonial-2.jpg",
    },
    tags: ["Warehouse Automation", "Inventory Management", "Accuracy"],
  },
  {
    id: "supply-chain-inc",
    company: "SupplyChain Innovations Inc",
    industry: "Manufacturing",
    size: "2,500+ employees",
    challenge: "Limited supply chain visibility and reactive problem-solving",
    solution: "End-to-end supply chain visibility platform with predictive analytics",
    results: {
      visibility: "99%",
      responseTime: "75%",
      stockouts: "60%",
      planningAccuracy: "92%",
    },
    metrics: [
      { label: "Supply Chain Visibility", value: "99%", icon: BarChart3 },
      { label: "Faster Response", value: "75%", icon: Zap },
      { label: "Stockout Reduction", value: "60%", icon: Package },
      { label: "Planning Accuracy", value: "92%", icon: Target },
    ],
    testimonial: {
      quote:
        "Complete visibility transformed our supply chain from reactive to predictive. We now prevent issues before they occur.",
      author: "Jennifer Park",
      role: "Supply Chain VP",
      image: "/images/testimonials/testimonial-3.jpg",
    },
    tags: ["Supply Chain Visibility", "Predictive Analytics", "Risk Management"],
  },
]

export function SuccessStories() {
  const [activeStory, setActiveStory] = useState("global-freight")
  const [hoveredMetric, setHoveredMetric] = useState(null)

  const currentStory = successStories.find((story) => story.id === activeStory)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800">
            <Award className="w-4 h-4 mr-2" />
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proven Results
            <span className="block text-green-600">Across Industries</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how leading companies achieved breakthrough results with ESGit's AI-powered logistics solutions.
          </p>
        </div>

        <Tabs value={activeStory} onValueChange={setActiveStory} className="w-full">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3 mb-12 h-auto">
            {successStories.map((story) => (
              <TabsTrigger key={story.id} value={story.id} className="flex flex-col items-start p-6 h-auto text-left">
                <div className="font-semibold text-lg mb-1">{story.company}</div>
                <div className="text-sm text-gray-600 mb-2">{story.industry}</div>
                <div className="flex flex-wrap gap-1">
                  {story.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {successStories.map((story) => (
            <TabsContent key={story.id} value={story.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Story Content */}
                <div className="space-y-8">
                  {/* Company Info */}
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {story.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{story.company}</h3>
                        <p className="text-gray-600">
                          {story.industry} • {story.size}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {story.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-red-500" />
                        Challenge
                      </h4>
                      <p className="text-gray-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        {story.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-blue-500" />
                        Solution
                      </h4>
                      <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        {story.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                      Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {story.metrics.map((metric, index) => (
                        <Card
                          key={index}
                          className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            hoveredMetric === `${story.id}-${index}` ? "ring-2 ring-green-500" : ""
                          }`}
                          onMouseEnter={() => setHoveredMetric(`${story.id}-${index}`)}
                          onMouseLeave={() => setHoveredMetric(null)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <metric.icon className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                              <div className="text-sm text-gray-600">{metric.label}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={story.testimonial.image || "/placeholder.svg"}
                        alt={story.testimonial.author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <blockquote className="text-gray-700 mb-4 italic text-lg">
                          "{story.testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{story.testimonial.author}</div>
                            <div className="text-sm text-gray-600">{story.testimonial.role}</div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Results Visualization */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                      Results Overview
                    </h4>

                    <div className="space-y-6">
                      {Object.entries(story.results).map(([key, value], index) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              {value.includes("%") ? `+${value}` : value}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${Math.min(Number.parseInt(value) || 80, 100)}%`,
                                animationDelay: `${index * 200}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="text-center">
                    <Button size="lg" className="w-full">
                      <Users className="w-5 h-5 mr-2" />
                      Read Full Case Study
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-green-100 mb-6">
              Join these industry leaders who transformed their logistics operations with ESGit's AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Award className="w-5 h-5 mr-2" />
                Start Your Transformation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <BarChart3 className="w-5 h-5 mr-2" />
                Calculate Your ROI
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

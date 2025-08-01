"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  MapPin,
  BarChart3,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const useCases = [
  {
    id: "routing",
    title: "Smart Route Optimization",
    icon: MapPin,
    category: "Transportation",
    description: "AI-powered dynamic routing that adapts to real-time conditions",
    metrics: {
      efficiency: "+35%",
      cost: "-25%",
      time: "-30%",
      satisfaction: "98%",
    },
    features: [
      "Real-time traffic analysis",
      "Weather-based routing",
      "Dynamic re-routing",
      "Multi-modal optimization",
      "Carbon footprint tracking",
    ],
    testimonial: {
      quote: "ESGit's routing optimization reduced our delivery costs by 25% while improving customer satisfaction.",
      author: "Sarah Chen",
      role: "Logistics Director",
      company: "Global Freight Solutions",
    },
    image: "/images/services/supply-chain.jpg",
  },
  {
    id: "warehouse",
    title: "Autonomous Warehouse Operations",
    icon: Package,
    category: "Warehousing",
    description: "AI-driven warehouse automation with predictive inventory management",
    metrics: {
      efficiency: "+45%",
      accuracy: "99.8%",
      cost: "-30%",
      throughput: "+40%",
    },
    features: [
      "Automated picking systems",
      "Predictive maintenance",
      "Inventory optimization",
      "Quality control automation",
      "Real-time tracking",
    ],
    testimonial: {
      quote: "The autonomous warehouse solution transformed our operations, achieving 99.8% accuracy.",
      author: "Michael Rodriguez",
      role: "Operations Manager",
      company: "MegaDistribution Corp",
    },
    image: "/images/manufacturing/supply-chain.jpg",
  },
  {
    id: "visibility",
    title: "End-to-End Supply Chain Visibility",
    icon: BarChart3,
    category: "Analytics",
    description: "Complete supply chain transparency with predictive analytics",
    metrics: {
      visibility: "99%",
      prediction: "95%",
      response: "-50%",
      compliance: "100%",
    },
    features: [
      "Real-time tracking",
      "Predictive analytics",
      "Risk assessment",
      "Compliance monitoring",
      "Performance dashboards",
    ],
    testimonial: {
      quote: "Complete visibility across our supply chain has been a game-changer for our business.",
      author: "Jennifer Park",
      role: "Supply Chain VP",
      company: "TechManufacturing Inc",
    },
    image: "/images/data-analytics-dashboard.jpg",
  },
  {
    id: "procurement",
    title: "Intelligent Procurement",
    icon: Shield,
    category: "Procurement",
    description: "AI-powered supplier selection and contract optimization",
    metrics: {
      savings: "20%",
      efficiency: "+35%",
      risk: "-40%",
      compliance: "100%",
    },
    features: [
      "Supplier risk assessment",
      "Contract optimization",
      "Spend analysis",
      "Automated sourcing",
      "Performance monitoring",
    ],
    testimonial: {
      quote: "Intelligent procurement helped us reduce costs by 20% while improving supplier quality.",
      author: "David Kim",
      role: "Procurement Director",
      company: "Industrial Solutions Ltd",
    },
    image: "/images/team-collaboration.jpg",
  },
]

export function UseCases() {
  const [activeUseCase, setActiveUseCase] = useState("routing")
  const [hoveredMetric, setHoveredMetric] = useState(null)

  const currentUseCase = useCases.find((uc) => uc.id === activeUseCase)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">Use Cases & Success Stories</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real-World
            <span className="block text-purple-600">Logistics Transformations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how leading companies are leveraging ESGit's AI-powered logistics solutions to achieve breakthrough
            results.
          </p>
        </div>

        <Tabs value={activeUseCase} onValueChange={setActiveUseCase} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            {useCases.map((useCase) => (
              <TabsTrigger key={useCase.id} value={useCase.id} className="flex items-center gap-2 p-4">
                <useCase.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{useCase.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {useCases.map((useCase) => (
            <TabsContent key={useCase.id} value={useCase.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-8">
                  <div>
                    <Badge className="mb-4" variant="outline">
                      {useCase.category}
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(useCase.metrics).map(([key, value], index) => (
                      <Card
                        key={key}
                        className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          hoveredMetric === key ? "ring-2 ring-purple-500" : ""
                        }`}
                        onMouseEnter={() => setHoveredMetric(key)}
                        onMouseLeave={() => setHoveredMetric(null)}
                      >
                        <div className="text-2xl font-bold text-purple-600 mb-1">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                      </Card>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCase.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <blockquote className="text-gray-700 mb-4 italic">"{useCase.testimonial.quote}"</blockquote>
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold text-gray-900">{useCase.testimonial.author}</div>
                            <div className="text-sm text-gray-600">
                              {useCase.testimonial.role}, {useCase.testimonial.company}
                            </div>
                          </div>
                          <div className="ml-auto flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Button size="lg" className="w-full sm:w-auto">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Explore This Solution
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={useCase.image || "/placeholder.svg"}
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className="mb-2 bg-white/20 text-white border-white/30">
                        <Zap className="w-4 h-4 mr-2" />
                        AI-Powered
                      </Badge>
                      <h4 className="text-white font-semibold text-lg">{useCase.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">See These Solutions in Action</h3>
            <p className="text-purple-100 mb-6">
              Schedule a personalized demo to see how these use cases apply to your specific logistics challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Clock className="w-5 h-5 mr-2" />
                Book Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Package className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

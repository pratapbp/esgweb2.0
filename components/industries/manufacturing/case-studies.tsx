"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Factory, Car, Cpu, Pill, ArrowRight, TrendingUp, DollarSign, Clock } from "lucide-react"

export default function CaseStudiesSection() {
  const [selectedStudy, setSelectedStudy] = useState("automotive")

  const caseStudies = [
    {
      id: "automotive",
      industry: "Automotive Manufacturing",
      company: "Global Auto Corp",
      icon: <Car className="h-8 w-8 text-blue-400" />,
      challenge:
        "Reducing production downtime and improving quality control in a high-volume automotive assembly plant",
      solution:
        "Implemented AI-powered predictive maintenance, smart quality control systems, and real-time production optimization",
      results: [
        { metric: "Downtime Reduction", value: "68%", icon: <Clock className="h-5 w-5" /> },
        { metric: "Quality Improvement", value: "45%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Cost Savings", value: "$4.2M", icon: <DollarSign className="h-5 w-5" /> },
        { metric: "ROI", value: "340%", icon: <TrendingUp className="h-5 w-5" /> },
      ],
      timeline: "8 months",
      technologies: ["Predictive Maintenance", "Computer Vision", "IoT Sensors", "Machine Learning"],
      testimonial: {
        quote:
          "The transformation has been remarkable. We've not only reduced costs but also improved our product quality significantly. The predictive maintenance system alone has saved us millions in unplanned downtime.",
        author: "Sarah Johnson",
        position: "VP of Operations, Global Auto Corp",
      },
    },
    {
      id: "electronics",
      industry: "Electronics Manufacturing",
      company: "TechComponents Inc",
      icon: <Cpu className="h-8 w-8 text-green-400" />,
      challenge: "Optimizing complex supply chain and improving defect detection in semiconductor manufacturing",
      solution:
        "Deployed AI-driven supply chain optimization, advanced quality inspection systems, and smart inventory management",
      results: [
        { metric: "Supply Chain Efficiency", value: "52%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Defect Detection", value: "94%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Inventory Reduction", value: "38%", icon: <DollarSign className="h-5 w-5" /> },
        { metric: "Production Speed", value: "31%", icon: <Clock className="h-5 w-5" /> },
      ],
      timeline: "6 months",
      technologies: ["Supply Chain AI", "Computer Vision", "Demand Forecasting", "Automated QC"],
      testimonial: {
        quote:
          "The AI-powered quality control system has revolutionized our manufacturing process. We can now detect defects that were previously impossible to catch, ensuring our customers receive the highest quality products.",
        author: "Michael Chen",
        position: "Manufacturing Director, TechComponents Inc",
      },
    },
    {
      id: "pharmaceutical",
      industry: "Pharmaceutical Manufacturing",
      company: "MedPharma Solutions",
      icon: <Pill className="h-8 w-8 text-purple-400" />,
      challenge:
        "Ensuring compliance and traceability while optimizing production efficiency in pharmaceutical manufacturing",
      solution:
        "Implemented blockchain-based traceability, automated compliance monitoring, and smart batch processing",
      results: [
        { metric: "Compliance Score", value: "99.8%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Batch Processing Time", value: "-42%", icon: <Clock className="h-5 w-5" /> },
        { metric: "Traceability Accuracy", value: "100%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Regulatory Savings", value: "$2.1M", icon: <DollarSign className="h-5 w-5" /> },
      ],
      timeline: "10 months",
      technologies: ["Blockchain", "Automated Compliance", "Smart Sensors", "Process Analytics"],
      testimonial: {
        quote:
          "The blockchain-based traceability system has given us complete visibility into our supply chain. We can now track every ingredient from source to final product, ensuring the highest standards of quality and compliance.",
        author: "Dr. Lisa Rodriguez",
        position: "Quality Assurance Director, MedPharma Solutions",
      },
    },
  ]

  const implementationPhases = [
    { phase: "Assessment", duration: "2-4 weeks", description: "Comprehensive analysis of current operations" },
    { phase: "Design", duration: "3-6 weeks", description: "Custom solution architecture and planning" },
    { phase: "Implementation", duration: "8-16 weeks", description: "System deployment and integration" },
    { phase: "Optimization", duration: "4-8 weeks", description: "Fine-tuning and performance optimization" },
  ]

  const currentStudy = caseStudies.find((study) => study.id === selectedStudy) || caseStudies[0]

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-900/30 border border-orange-700/50 text-orange-400 text-sm font-medium mb-4">
            <Factory className="mr-2 h-4 w-4" />
            Success Stories
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real-World{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Manufacturing
            </span>{" "}
            Transformations
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how leading manufacturers have transformed their operations with our smart manufacturing solutions,
            achieving significant improvements in efficiency, quality, and profitability.
          </p>
        </div>

        <Tabs defaultValue="automotive" value={selectedStudy} onValueChange={setSelectedStudy} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              {caseStudies.map((study) => (
                <TabsTrigger key={study.id} value={study.id} className="flex items-center gap-2 py-3 px-4">
                  {study.icon}
                  <span className="hidden sm:inline">{study.industry.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {caseStudies.map((study) => (
            <TabsContent key={study.id} value={study.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Case Study Details */}
                <div className="space-y-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 rounded-lg bg-gray-800">{study.icon}</div>
                        <div>
                          <CardTitle className="text-2xl">{study.industry}</CardTitle>
                          <p className="text-gray-400">{study.company}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">Challenge</h4>
                        <p className="text-gray-300">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2">Solution</h4>
                        <p className="text-gray-300">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-400 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div>
                          <span className="text-sm text-gray-400">Implementation Timeline</span>
                          <div className="font-semibold">{study.timeline}</div>
                        </div>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testimonial */}
                  <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="text-4xl text-orange-400 mb-2">"</div>
                        <p className="text-gray-300 italic">{study.testimonial.quote}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {study.testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{study.testimonial.author}</div>
                          <div className="text-sm text-gray-400">{study.testimonial.position}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results and Metrics */}
                <div className="space-y-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                        Key Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {study.results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="text-center p-4 bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center justify-center mb-2 text-green-400">{result.icon}</div>
                            <div className="text-2xl font-bold text-green-400 mb-1">{result.value}</div>
                            <div className="text-sm text-gray-400">{result.metric}</div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Implementation Timeline */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-400 mr-2" />
                        Implementation Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {implementationPhases.map((phase, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold">{phase.phase}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {phase.duration}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400">{phase.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gray-900 border-gray-800 text-center">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-400 mb-1">2,500+</div>
                        <div className="text-sm text-gray-400">Successful Projects</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800 text-center">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                        <div className="text-sm text-gray-400">Client Satisfaction</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

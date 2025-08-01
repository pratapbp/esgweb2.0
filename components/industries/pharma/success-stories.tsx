"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Award,
  Building2,
  MapPin,
  Calendar,
  Target,
  Zap,
} from "lucide-react"

const successStories = [
  {
    id: "trial-matching",
    title: "AI-Powered Trial Matching Reduces Phase 1-2 Time by 40%",
    client: "Global Biotech Leader",
    industry: "Biotechnology",
    location: "Boston, MA",
    duration: "8 months",
    challenge: "Lengthy patient recruitment and protocol optimization for oncology trials",
    solution: "Implemented ESG's AI trial matching platform with GenAI protocol generation",
    results: {
      primary: "40% reduction in Phase 1-2 duration",
      metrics: [
        { label: "Patient Enrollment Speed", before: "12 months", after: "7 months", improvement: 42 },
        { label: "Protocol Optimization", before: "6 weeks", after: "1 week", improvement: 83 },
        { label: "Regulatory Approval Time", before: "8 months", after: "5 months", improvement: 38 },
        { label: "Cost Reduction", before: "$2.5M", after: "$1.5M", improvement: 40 },
      ],
    },
    technologies: ["SAP Clinical", "AI Patient Matching", "GenAI Protocols", "Regulatory Intelligence"],
    testimonial: {
      quote:
        "ESG's AI platform transformed our clinical trial operations. The intelligent patient matching and automated protocol generation saved us months of development time.",
      author: "Dr. Sarah Chen",
      role: "VP of Clinical Development",
    },
    workflow: [
      { step: "AI Patient Analysis", description: "Analyze patient databases for eligibility" },
      { step: "Protocol Generation", description: "GenAI creates optimized trial protocols" },
      { step: "Regulatory Review", description: "Automated compliance checking" },
      { step: "Trial Execution", description: "Real-time monitoring and optimization" },
    ],
  },
  {
    id: "cold-chain",
    title: "Blockchain-Based Tracking Increases Cold Chain Compliance by 99.2%",
    client: "Leading Vaccine Manufacturer",
    industry: "Vaccines & Biologics",
    location: "Basel, Switzerland",
    duration: "6 months",
    challenge: "Temperature excursions and compliance issues in global vaccine distribution",
    solution: "Deployed ESG's blockchain-enabled cold chain monitoring with IoT integration",
    results: {
      primary: "99.2% cold chain compliance achieved",
      metrics: [
        { label: "Temperature Compliance", before: "94.5%", after: "99.2%", improvement: 5 },
        { label: "Product Loss Reduction", before: "3.2%", after: "0.3%", improvement: 91 },
        { label: "Audit Preparation Time", before: "2 weeks", after: "2 hours", improvement: 99 },
        { label: "Regulatory Confidence", before: "85%", after: "100%", improvement: 18 },
      ],
    },
    technologies: ["Blockchain Ledger", "IoT Sensors", "SAP EWM", "Predictive Analytics"],
    testimonial: {
      quote:
        "The blockchain-based tracking system gave us complete visibility and confidence in our cold chain operations. Regulatory audits are now seamless.",
      author: "Marcus Weber",
      role: "Global Supply Chain Director",
    },
    workflow: [
      { step: "IoT Monitoring", description: "Real-time temperature and humidity tracking" },
      { step: "Blockchain Logging", description: "Immutable audit trail creation" },
      { step: "Predictive Alerts", description: "AI-powered deviation prediction" },
      { step: "Automated Response", description: "Immediate corrective actions" },
    ],
  },
  {
    id: "documentation",
    title: "RPA + Copilot Reduces Documentation Hours by 80% in Regulatory Filing",
    client: "Mid-Size Pharmaceutical Company",
    industry: "Generic Pharmaceuticals",
    location: "Mumbai, India",
    duration: "4 months",
    challenge: "Manual regulatory documentation processes causing delays in ANDA submissions",
    solution: "Implemented ESG's RPA-powered documentation system with AI copilot assistance",
    results: {
      primary: "80% reduction in documentation time",
      metrics: [
        { label: "Document Generation Speed", before: "40 hours", after: "8 hours", improvement: 80 },
        { label: "Accuracy Rate", before: "92%", after: "99.5%", improvement: 8 },
        { label: "Submission Timeline", before: "6 months", after: "3 months", improvement: 50 },
        { label: "Compliance Score", before: "88%", after: "99%", improvement: 13 },
      ],
    },
    technologies: ["RPA Automation", "GenAI Copilot", "Document Intelligence", "Compliance Engine"],
    testimonial: {
      quote:
        "The automated documentation system revolutionized our regulatory processes. We can now focus on innovation rather than paperwork.",
      author: "Priya Sharma",
      role: "Head of Regulatory Affairs",
    },
    workflow: [
      { step: "Data Collection", description: "Automated gathering of regulatory data" },
      { step: "Document Generation", description: "AI-powered document creation" },
      { step: "Compliance Check", description: "Automated regulatory verification" },
      { step: "Submission Prep", description: "Final review and submission" },
    ],
  },
]

export default function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length)
    setActiveWorkflowStep(0)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)
    setActiveWorkflowStep(0)
  }

  const story = successStories[currentStory]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Award className="w-4 h-4 mr-2" />
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proven{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Results
            </span>{" "}
            in Pharma Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how leading pharmaceutical companies have transformed their operations with ESG's intelligent
            solutions.
          </p>
        </motion.div>

        {/* Story Navigation */}
        <div className="flex items-center justify-center mb-8">
          <Button variant="outline" onClick={prevStory} className="mr-4 bg-transparent">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex space-x-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStory(index)
                  setActiveWorkflowStep(0)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStory ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" onClick={nextStory} className="ml-4 bg-transparent">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Story Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-0 shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{story.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>{story.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>{story.industry}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{story.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2 ml-4">
                    {story.results.primary}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Challenge & Solution */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Challenge & Solution</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <h5 className="font-medium text-red-900 mb-2">Challenge</h5>
                        <p className="text-red-700 text-sm">{story.challenge}</p>
                      </div>
                      <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                        <h5 className="font-medium text-green-900 mb-2">Solution</h5>
                        <p className="text-green-700 text-sm">{story.solution}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mt-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Technology Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {story.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Measurable Results</h4>
                    <div className="space-y-4">
                      {story.results.metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                            <Badge className="bg-green-100 text-green-800">+{metric.improvement}%</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Before: {metric.before}</span>
                            <span>After: {metric.after}</span>
                          </div>
                          <Progress value={metric.improvement} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Workflow Visualization */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Implementation Workflow</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {story.workflow.map((step, idx) => (
                      <motion.div
                        key={idx}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          activeWorkflowStep === idx
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 bg-white hover:border-green-300"
                        }`}
                        onClick={() => setActiveWorkflowStep(idx)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              activeWorkflowStep === idx ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <h5 className="font-medium text-gray-900">{step.step}</h5>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-gray-700 italic mb-4">"{story.testimonial.quote}"</blockquote>
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">{story.testimonial.author}</div>
                        <div className="text-gray-600">{story.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join leading pharmaceutical companies who have transformed their operations with ESG's intelligent
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Your Transformation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 font-semibold bg-transparent"
              >
                <Zap className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

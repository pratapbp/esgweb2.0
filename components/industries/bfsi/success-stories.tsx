"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, FileCheck, Play, Building2, Shield, Users } from "lucide-react"

const successStories = [
  {
    title: "Reduced lending defaults by 32% using AI credit models",
    company: "Global Investment Bank",
    industry: "Banking",
    challenge: "High default rates and slow credit decisions affecting profitability",
    solution: "Implemented ESGit AI credit scoring with alternative data sources and bias mitigation",
    results: {
      defaultReduction: "32%",
      approvalSpeed: "95% faster",
      accuracy: "94.2%",
      roi: "$45M saved annually",
    },
    metrics: [
      { label: "Default Rate", before: "4.2%", after: "2.9%", improvement: "32% reduction" },
      { label: "Approval Time", before: "7-14 days", after: "< 1 hour", improvement: "95% faster" },
      { label: "Model Accuracy", before: "78%", after: "94.2%", improvement: "16.2% increase" },
    ],
    icon: TrendingUp,
    color: "green",
    videoUrl: "/videos/banking-success.mp4",
  },
  {
    title: "$40M saved through real-time fraud prevention",
    company: "Major Payment Processor",
    industry: "Payments",
    challenge: "Rising fraud losses and high false positive rates impacting customer experience",
    solution: "Deployed ESGit real-time fraud detection with behavioral analytics and ML scoring",
    results: {
      fraudSaved: "$40M",
      detectionRate: "98.9%",
      falsePositives: "60% reduction",
      customerSatisfaction: "89% increase",
    },
    metrics: [
      { label: "Fraud Detection", before: "85%", after: "98.9%", improvement: "13.9% increase" },
      { label: "False Positives", before: "12%", after: "4.8%", improvement: "60% reduction" },
      { label: "Response Time", before: "5 minutes", after: "< 1 second", improvement: "99.7% faster" },
    ],
    icon: DollarSign,
    color: "blue",
    videoUrl: "/videos/fraud-prevention.mp4",
  },
  {
    title: "GRC Copilot reduced audit prep time by 70%",
    company: "Regional Insurance Company",
    industry: "Insurance",
    challenge: "Manual compliance processes taking weeks and prone to human error",
    solution: "Implemented ESGit GRC Copilot with automated compliance monitoring and reporting",
    results: {
      timeReduction: "70%",
      accuracy: "99.2%",
      costSavings: "$2.8M",
      complianceScore: "98%",
    },
    metrics: [
      { label: "Audit Prep Time", before: "40 hours", after: "12 hours", improvement: "70% reduction" },
      { label: "Compliance Accuracy", before: "92%", after: "99.2%", improvement: "7.2% increase" },
      { label: "Manual Effort", before: "80%", after: "15%", improvement: "81% reduction" },
    ],
    icon: FileCheck,
    color: "purple",
    videoUrl: "/videos/compliance-automation.mp4",
  },
]

export function BFSISuccessStories() {
  const [selectedStory, setSelectedStory] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <TrendingUp className="w-4 h-4 mr-2" />
          Case Studies & Metrics
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Proven Results Across BFSI
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Real-world success stories demonstrating the transformative impact of our AI-powered BFSI solutions
        </p>
      </motion.div>

      {/* Story Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {successStories.map((story, index) => {
          const IconComponent = story.icon
          return (
            <Button
              key={index}
              variant={selectedStory === index ? "default" : "outline"}
              onClick={() => setSelectedStory(index)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{story.industry}</span>
            </Button>
          )
        })}
      </div>

      {/* Selected Story Details */}
      <motion.div
        key={selectedStory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
      >
        {/* Story Overview */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                {(() => {
                  const IconComponent = successStories[selectedStory].icon
                  return <IconComponent className="w-5 h-5 text-blue-600" />
                })()}
              </div>
              <Badge variant="secondary">{successStories[selectedStory].industry}</Badge>
            </div>
            <CardTitle className="text-xl mb-2">{successStories[selectedStory].title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{successStories[selectedStory].company}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Challenge
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{successStories[selectedStory].challenge}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Solution
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{successStories[selectedStory].solution}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Key Results
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(successStories[selectedStory].results).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                    <div className="font-bold text-green-600">{value}</div>
                    <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative">
              <div
                className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowVideo(true)}
              >
                <div className="text-center">
                  <Play className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Watch Success Story</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {successStories[selectedStory].metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{metric.label}</h4>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {metric.improvement}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Before</div>
                      <div className="font-bold text-red-600">{metric.before}</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">After</div>
                      <div className="font-bold text-green-600">{metric.after}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <Users className="w-5 h-5 mr-2" />
          Schedule Your Success Story Consultation
        </Button>
      </motion.div>
    </section>
  )
}

// Export as default as well for compatibility
export default BFSISuccessStories

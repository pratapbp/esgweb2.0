"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Users, GraduationCap, Play, TrendingUp } from "lucide-react"
import { useState } from "react"

const caseStudies = [
  {
    id: 1,
    title: "Reduced permit processing from 30 days to 4 hrs",
    organization: "Metropolitan City Council",
    sector: "Municipal Services",
    icon: Building,
    color: "blue",
    challenge: "Manual permit processing causing citizen frustration and business delays",
    solution: "AI-powered document verification + automated workflow routing + real-time status updates",
    results: {
      timeReduction: "96% faster processing",
      satisfaction: "94% citizen satisfaction",
      cost: "$2.3M annual savings",
      volume: "15,000+ permits processed",
    },
    technologies: ["SAP Build Process Automation", "ESGit AI Copilot", "Document AI", "Blockchain Audit"],
    videoPreview: "/images/case-studies/permit-processing.jpg",
    metrics: [
      { label: "Processing Time", before: "30 days", after: "4 hours", improvement: "96%" },
      { label: "Citizen Satisfaction", before: "67%", after: "94%", improvement: "40%" },
      { label: "Staff Efficiency", before: "Manual", after: "Automated", improvement: "85%" },
    ],
  },
  {
    id: 2,
    title: "10M+ citizens onboarded in multilingual digital portal",
    organization: "National Digital Services Agency",
    sector: "e-Governance",
    icon: Users,
    color: "green",
    challenge: "Language barriers preventing citizen access to government services",
    solution: "AI-powered multilingual portal + voice assistance + cultural adaptation",
    results: {
      reach: "10M+ citizens served",
      languages: "50+ languages supported",
      accessibility: "99.9% uptime",
      adoption: "78% digital adoption rate",
    },
    technologies: ["SAP Customer Experience", "GenAI Translation", "Voice AI", "Mobile-First Design"],
    videoPreview: "/images/case-studies/digital-portal.jpg",
    metrics: [
      { label: "Citizen Reach", before: "2.3M", after: "10M+", improvement: "335%" },
      { label: "Language Support", before: "3", after: "50+", improvement: "1567%" },
      { label: "Digital Adoption", before: "23%", after: "78%", improvement: "239%" },
    ],
  },
  {
    id: 3,
    title: "AI Copilot transformed scholarship selection for underserved students",
    organization: "Department of Education",
    sector: "Education Services",
    icon: GraduationCap,
    color: "purple",
    challenge: "Bias in scholarship selection and delayed disbursement affecting student outcomes",
    solution: "AI-powered eligibility assessment + bias detection + automated disbursement",
    results: {
      fairness: "95% bias reduction",
      speed: "From 6 months to 2 weeks",
      reach: "40% more students served",
      success: "85% graduation rate improvement",
    },
    technologies: ["SAP SuccessFactors", "AI Bias Detection", "Predictive Analytics", "Automated Workflows"],
    videoPreview: "/images/case-studies/scholarship-ai.jpg",
    metrics: [
      { label: "Selection Bias", before: "High", after: "95% reduced", improvement: "95%" },
      { label: "Processing Time", before: "6 months", after: "2 weeks", improvement: "92%" },
      { label: "Student Reach", before: "5,000", after: "7,000+", improvement: "40%" },
    ],
  },
]

export function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="w-4 h-4 mr-2" />
            Success Stories & Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Transforming Public Services with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world results from government organizations that have embraced AI-powered transformation.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {caseStudies.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-l-4 ${
                  selectedStory === story.id
                    ? `border-l-${story.color}-500 bg-${story.color}-50/30`
                    : "border-l-gray-200 hover:border-l-blue-400"
                }`}
                onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-${story.color}-100 flex items-center justify-center flex-shrink-0`}
                      >
                        <story.icon className={`w-8 h-8 text-${story.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800 mb-2">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600">{story.organization}</p>
                        <Badge variant="secondary" className="mt-2">
                          {story.sector}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Play className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>

                {selectedStory === story.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Story Details */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Challenge:</h4>
                            <p className="text-gray-600">{story.challenge}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Solution:</h4>
                            <p className="text-gray-600">{story.solution}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {story.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Metrics & Results */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Key Results:</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(story.results).map(([key, value]) => (
                                <div key={key} className={`p-3 bg-${story.color}-50 rounded-lg`}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 capitalize">{key}:</span>
                                  </div>
                                  <span className={`text-sm font-bold text-${story.color}-800`}>{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Before vs After:</h4>
                            <div className="space-y-3">
                              {story.metrics.map((metric, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                                    <Badge variant="secondary" className="text-xs">
                                      +{metric.improvement}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2 bg-red-50 rounded text-red-700">Before: {metric.before}</div>
                                    <div className="p-2 bg-green-50 rounded text-green-700">After: {metric.after}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

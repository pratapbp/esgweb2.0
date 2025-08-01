"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Leaf, Calculator, ChevronDown, ChevronUp, TrendingUp, Clock, Shield, Activity } from "lucide-react"

interface SuccessStory {
  id: string
  title: string
  subtitle: string
  icon: any
  color: string
  mainMetric: {
    value: string
    label: string
  }
  challenge: string
  solution: string
  implementation: {
    phase: string
    duration: string
    activities: string[]
  }[]
  results: {
    metric: string
    before: string
    after: string
    improvement: string
  }[]
  technologies: string[]
}

const successStories: SuccessStory[] = [
  {
    id: "outage-response",
    title: "Outage Response Transformation",
    subtitle: "70% improvement across 3,000 sq km grid",
    icon: Zap,
    color: "text-orange-400",
    mainMetric: {
      value: "70%",
      label: "Faster Response Time",
    },
    challenge:
      "A major utility company serving 500,000+ customers across 3,000 square kilometers faced significant challenges with outage response times, leading to customer dissatisfaction and regulatory penalties.",
    solution:
      "Implemented ESGit's AI-powered outage prediction system with automated dispatch and real-time grid monitoring, reducing response times from hours to minutes.",
    implementation: [
      {
        phase: "Phase 1: Infrastructure Setup",
        duration: "4 weeks",
        activities: [
          "Deploy IoT sensors across grid infrastructure",
          "Install AI-powered monitoring systems",
          "Configure SAP IS-U integration",
          "Set up automated alert systems",
        ],
      },
      {
        phase: "Phase 2: AI Model Training",
        duration: "6 weeks",
        activities: [
          "Train predictive maintenance models",
          "Implement outage prediction algorithms",
          "Configure automated dispatch workflows",
          "Test emergency response protocols",
        ],
      },
      {
        phase: "Phase 3: Full Deployment",
        duration: "8 weeks",
        activities: [
          "Roll out across entire grid network",
          "Train field operations teams",
          "Implement customer notification system",
          "Monitor and optimize performance",
        ],
      },
    ],
    results: [
      { metric: "Average Response Time", before: "4.2 hours", after: "1.3 hours", improvement: "-70%" },
      { metric: "Customer Satisfaction", before: "72%", after: "94%", improvement: "+31%" },
      { metric: "Preventive Maintenance", before: "35%", after: "85%", improvement: "+143%" },
      { metric: "Operational Costs", before: "$2.4M/year", after: "$1.6M/year", improvement: "-33%" },
    ],
    technologies: ["AI Prediction Models", "IoT Sensors", "SAP IS-U", "RPA Automation", "Mobile Apps"],
  },
  {
    id: "carbon-audit",
    title: "Carbon Audit Automation",
    subtitle: "Full Scope 1-2-3 automation via SAP + Blockchain",
    icon: Leaf,
    color: "text-green-400",
    mainMetric: {
      value: "100%",
      label: "Audit Automation",
    },
    challenge:
      "Energy conglomerate with 50+ facilities struggled with manual carbon tracking, spending 6 months annually on compliance reporting with frequent errors and audit failures.",
    solution:
      "Deployed comprehensive ESG automation platform with blockchain-verified carbon tracking, real-time monitoring, and automated regulatory reporting across all emission scopes.",
    implementation: [
      {
        phase: "Phase 1: ESG Foundation",
        duration: "6 weeks",
        activities: [
          "Deploy SAP ESG management system",
          "Install emission monitoring sensors",
          "Configure blockchain audit trail",
          "Set up data validation protocols",
        ],
      },
      {
        phase: "Phase 2: Scope Integration",
        duration: "8 weeks",
        activities: [
          "Implement Scope 1 direct emissions tracking",
          "Configure Scope 2 energy consumption monitoring",
          "Set up Scope 3 supply chain integration",
          "Deploy AI-powered anomaly detection",
        ],
      },
      {
        phase: "Phase 3: Reporting Automation",
        duration: "4 weeks",
        activities: [
          "Configure automated report generation",
          "Set up stakeholder dashboards",
          "Implement regulatory submission workflows",
          "Deploy carbon offset recommendations",
        ],
      },
    ],
    results: [
      { metric: "Reporting Time", before: "6 months", after: "2 days", improvement: "-99%" },
      { metric: "Data Accuracy", before: "78%", after: "99.8%", improvement: "+28%" },
      { metric: "Compliance Score", before: "65%", after: "100%", improvement: "+54%" },
      { metric: "Audit Preparation", before: "400 hours", after: "8 hours", improvement: "-98%" },
    ],
    technologies: ["SAP ESG", "Blockchain", "IoT Sensors", "AI Analytics", "GenAI Reports"],
  },
  {
    id: "billing-automation",
    title: "Smart Billing Revolution",
    subtitle: "RPA bot reduced billing cycle time by 3 weeks",
    icon: Calculator,
    color: "text-blue-400",
    mainMetric: {
      value: "3 weeks",
      label: "Cycle Reduction",
    },
    challenge:
      "Regional utility serving 200,000+ customers faced monthly billing delays, manual meter reading errors, and customer service overload due to billing disputes and delayed statements.",
    solution:
      "Implemented intelligent RPA-powered billing system with automated meter reading, AI-driven usage analytics, and real-time customer portal integration through SAP IS-U.",
    implementation: [
      {
        phase: "Phase 1: Smart Meter Integration",
        duration: "8 weeks",
        activities: [
          "Deploy smart meter infrastructure",
          "Configure automated data collection",
          "Set up SAP IS-U integration",
          "Implement data validation protocols",
        ],
      },
      {
        phase: "Phase 2: RPA Automation",
        duration: "6 weeks",
        activities: [
          "Deploy RPA billing bots",
          "Configure exception handling workflows",
          "Set up automated dispute resolution",
          "Implement customer notification system",
        ],
      },
      {
        phase: "Phase 3: Customer Experience",
        duration: "4 weeks",
        activities: [
          "Launch customer self-service portal",
          "Deploy mobile app integration",
          "Configure usage analytics dashboard",
          "Implement predictive billing alerts",
        ],
      },
    ],
    results: [
      { metric: "Billing Cycle Time", before: "4 weeks", after: "1 week", improvement: "-75%" },
      { metric: "Billing Accuracy", before: "92%", after: "99.7%", improvement: "+8%" },
      { metric: "Customer Complaints", before: "1,200/month", after: "180/month", improvement: "-85%" },
      { metric: "Processing Costs", before: "$180K/month", after: "$45K/month", improvement: "-75%" },
    ],
    technologies: ["RPA Bots", "Smart Meters", "SAP IS-U", "AI Analytics", "Customer Portal"],
  },
]

export default function SuccessStories() {
  const [expandedStory, setExpandedStory] = useState<string | null>(null)

  const toggleStory = (id: string) => {
    setExpandedStory(expandedStory === id ? null : id)
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Proven Results
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real-World{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how leading energy companies transformed their operations with ESGit's AI-powered solutions
          </p>
        </motion.div>

        <div className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className={`p-4 rounded-xl bg-gray-800 ${story.color}`}>
                        <story.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-white mb-2">{story.title}</CardTitle>
                        <p className="text-gray-400 text-lg">{story.subtitle}</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${story.color} mb-1`}>{story.mainMetric.value}</div>
                        <div className="text-gray-400 text-sm">{story.mainMetric.label}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStory(story.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedStory === story.id ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedStory === story.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <div className="border-t border-gray-700 pt-8">
                          <div className="grid lg:grid-cols-2 gap-12">
                            {/* Challenge & Solution */}
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                  <Shield className="h-5 w-5 text-red-400 mr-2" />
                                  Challenge
                                </h4>
                                <p className="text-gray-300 leading-relaxed">{story.challenge}</p>
                              </div>

                              <div>
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                  <Activity className="h-5 w-5 text-green-400 mr-2" />
                                  Solution
                                </h4>
                                <p className="text-gray-300 leading-relaxed">{story.solution}</p>
                              </div>

                              {/* Technologies */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                  {story.technologies.map((tech, idx) => (
                                    <Badge key={idx} variant="outline" className="border-blue-500/30 text-blue-300">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Implementation & Results */}
                            <div className="space-y-8">
                              {/* Implementation Phases */}
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                  <Clock className="h-5 w-5 text-blue-400 mr-2" />
                                  Implementation Timeline
                                </h4>
                                <div className="space-y-4">
                                  {story.implementation.map((phase, idx) => (
                                    <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="text-white font-medium">{phase.phase}</h5>
                                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                                          {phase.duration}
                                        </Badge>
                                      </div>
                                      <div className="space-y-1">
                                        {phase.activities.map((activity, actIdx) => (
                                          <div key={actIdx} className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                            <span className="text-gray-300 text-sm">{activity}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Results */}
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                  <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                                  Key Results
                                </h4>
                                <div className="space-y-3">
                                  {story.results.map((result, idx) => (
                                    <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 font-medium">{result.metric}</span>
                                        <span className="text-green-400 font-bold">{result.improvement}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Before: {result.before}</span>
                                        <span className="text-gray-300">After: {result.after}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Collective Impact</h3>
            <p className="text-gray-300">Combined results across all implementations</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$12M+</div>
              <div className="text-gray-400">Annual Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">750K+</div>
              <div className="text-gray-400">Customers Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.8%</div>
              <div className="text-gray-400">Average Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">85%</div>
              <div className="text-gray-400">Process Automation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

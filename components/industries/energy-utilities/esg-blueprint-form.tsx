"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, FileText, TrendingUp, Zap, Clock, Target, CheckCircle, Loader2 } from "lucide-react"

interface FormData {
  companyName: string
  email: string
  utilityType: string
  gridSize: string
  sapSystems: string[]
  sustainabilityPriorities: string[]
  currentChallenges: string
  timeline: string
}

interface AnalysisResult {
  auditScore: number
  roadmap: {
    phase: string
    duration: string
    investment: string
    activities: string[]
  }[]
  automationPriorities: {
    category: string
    priority: "High" | "Medium" | "Low"
    impact: string
  }[]
  copilotKit: string[]
  kpiTargets: {
    metric: string
    current: string
    target: string
    timeline: string
  }[]
}

const utilityTypes = [
  "Electric Utility",
  "Gas Utility",
  "Water Utility",
  "Renewable Energy",
  "Multi-Utility",
  "Independent Power Producer",
]

const gridSizes = [
  "Small (< 50,000 customers)",
  "Medium (50,000 - 250,000 customers)",
  "Large (250,000 - 1M customers)",
  "Enterprise (1M+ customers)",
]

const sapSystems = [
  "SAP IS-U (Utilities)",
  "SAP EAM (Asset Management)",
  "SAP ESG (Sustainability)",
  "SAP Analytics Cloud",
  "SAP S/4HANA",
  "SAP GRC (Governance)",
  "None - New Implementation",
]

const sustainabilityPriorities = [
  "Carbon Emission Reduction",
  "Water Conservation",
  "Renewable Energy Integration",
  "Waste Management",
  "Energy Efficiency",
  "Regulatory Compliance",
  "ESG Reporting",
  "Circular Economy",
]

const timelines = [
  "Immediate (0-3 months)",
  "Short-term (3-6 months)",
  "Medium-term (6-12 months)",
  "Long-term (12+ months)",
]

export default function ESGBlueprintForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    utilityType: "",
    gridSize: "",
    sapSystems: [],
    sustainabilityPriorities: [],
    currentChallenges: "",
    timeline: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleCheckboxChange = (field: "sapSystems" | "sustainabilityPriorities", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const generateAnalysis = (): AnalysisResult => {
    // AI-powered analysis simulation
    const baseScore = 75 + Math.floor(Math.random() * 20)
    const hasAdvancedSAP = formData.sapSystems.some((sys) => sys.includes("Analytics") || sys.includes("ESG"))
    const finalScore = hasAdvancedSAP ? Math.min(100, baseScore + 10) : baseScore

    return {
      auditScore: finalScore,
      roadmap: [
        {
          phase: "Foundation & Assessment",
          duration: "4-6 weeks",
          investment: "$150K - $300K",
          activities: [
            "Current state ESG audit and gap analysis",
            "SAP system integration assessment",
            "Stakeholder alignment and governance setup",
            "Data quality and availability review",
          ],
        },
        {
          phase: "Core Implementation",
          duration: "8-12 weeks",
          investment: "$400K - $800K",
          activities: [
            "Deploy ESGit AI platform and SAP integrations",
            "Implement automated data collection systems",
            "Configure carbon tracking and reporting workflows",
            "Set up predictive analytics and monitoring",
          ],
        },
        {
          phase: "Optimization & Scale",
          duration: "6-8 weeks",
          investment: "$200K - $400K",
          activities: [
            "Fine-tune AI models and automation workflows",
            "Expand to additional facilities and processes",
            "Deploy advanced analytics and insights",
            "Establish continuous improvement processes",
          ],
        },
      ],
      automationPriorities: [
        { category: "Carbon Emission Tracking", priority: "High", impact: "90% reduction in manual reporting" },
        { category: "Energy Efficiency Monitoring", priority: "High", impact: "35% improvement in optimization" },
        { category: "Regulatory Compliance", priority: "Medium", impact: "100% automated report generation" },
        { category: "Asset Performance Management", priority: "Medium", impact: "50% reduction in maintenance costs" },
        { category: "Customer Engagement", priority: "Low", impact: "60% improvement in satisfaction scores" },
      ],
      copilotKit: [
        "ESG Copilot for sustainability insights",
        "Carbon Calculator with blockchain verification",
        "Predictive Maintenance AI for grid assets",
        "Regulatory Compliance Assistant",
        "Energy Optimization Recommendations Engine",
      ],
      kpiTargets: [
        { metric: "Carbon Footprint Reduction", current: "Baseline", target: "25-40%", timeline: "12 months" },
        { metric: "ESG Reporting Accuracy", current: "75-85%", target: "99%+", timeline: "6 months" },
        {
          metric: "Operational Efficiency",
          current: "Current state",
          target: "30-50% improvement",
          timeline: "9 months",
        },
        { metric: "Compliance Score", current: "Variable", target: "100%", timeline: "6 months" },
      ],
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call and analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const analysis = generateAnalysis()
    setAnalysisResult(analysis)
    setIsSubmitting(false)
    setShowResult(true)
  }

  const isFormValid =
    formData.companyName &&
    formData.email &&
    formData.utilityType &&
    formData.gridSize &&
    formData.sapSystems.length > 0 &&
    formData.sustainabilityPriorities.length > 0

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
            <Brain className="h-4 w-4 mr-2" />
            AI-Powered Assessment
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get Your Personalized{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ESG Blueprint
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Receive a comprehensive AI analysis with implementation roadmap, automation priorities, and KPI targets
            tailored to your utility
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Assessment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <FileText className="h-6 w-6 text-purple-400 mr-3" />
                  ESG Assessment Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-300">
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Your utility company"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  {/* Utility Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Utility Type *</Label>
                    <Select
                      value={formData.utilityType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, utilityType: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select your utility type" />
                      </SelectTrigger>
                      <SelectContent>
                        {utilityTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Grid Size */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Grid Size / Coverage *</Label>
                    <Select
                      value={formData.gridSize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gridSize: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select your grid size" />
                      </SelectTrigger>
                      <SelectContent>
                        {gridSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* SAP Systems */}
                  <div className="space-y-3">
                    <Label className="text-gray-300">Current SAP Systems *</Label>
                    <div className="grid md:grid-cols-2 gap-2">
                      {sapSystems.map((system) => (
                        <div key={system} className="flex items-center space-x-2">
                          <Checkbox
                            id={system}
                            checked={formData.sapSystems.includes(system)}
                            onCheckedChange={() => handleCheckboxChange("sapSystems", system)}
                          />
                          <Label htmlFor={system} className="text-gray-300 text-sm">
                            {system}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sustainability Priorities */}
                  <div className="space-y-3">
                    <Label className="text-gray-300">Sustainability Priorities *</Label>
                    <div className="grid md:grid-cols-2 gap-2">
                      {sustainabilityPriorities.map((priority) => (
                        <div key={priority} className="flex items-center space-x-2">
                          <Checkbox
                            id={priority}
                            checked={formData.sustainabilityPriorities.includes(priority)}
                            onCheckedChange={() => handleCheckboxChange("sustainabilityPriorities", priority)}
                          />
                          <Label htmlFor={priority} className="text-gray-300 text-sm">
                            {priority}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Challenges */}
                  <div className="space-y-2">
                    <Label htmlFor="challenges" className="text-gray-300">
                      Current ESG Challenges
                    </Label>
                    <Textarea
                      id="challenges"
                      value={formData.currentChallenges}
                      onChange={(e) => setFormData((prev) => ({ ...prev, currentChallenges: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Describe your main ESG and sustainability challenges..."
                      rows={3}
                    />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Implementation Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select preferred timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generating AI Analysis...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Generate ESG Blueprint
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {showResult && analysisResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {/* AI Audit Score */}
                  <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-xl border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center">
                        <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                        AI Audit Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-5xl font-bold text-green-400 mb-2">{analysisResult.auditScore}</div>
                        <div className="text-gray-300">ESG Readiness Score</div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                          <motion.div
                            className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisResult.auditScore}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Implementation Roadmap */}
                  <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center">
                        <Clock className="h-5 w-5 text-blue-400 mr-2" />
                        3-Phase Implementation Roadmap
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResult.roadmap.map((phase, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-medium">{phase.phase}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                                  {phase.duration}
                                </Badge>
                                <Badge variant="outline" className="border-green-500/30 text-green-300">
                                  {phase.investment}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {phase.activities.map((activity, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                  <span className="text-gray-300 text-sm">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Automation Priorities */}
                  <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center">
                        <Zap className="h-5 w-5 text-orange-400 mr-2" />
                        Automation Priority Heatmap
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.automationPriorities.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex-1">
                              <div className="text-white font-medium">{item.category}</div>
                              <div className="text-gray-400 text-sm">{item.impact}</div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                item.priority === "High"
                                  ? "border-red-500/30 text-red-300"
                                  : item.priority === "Medium"
                                    ? "border-yellow-500/30 text-yellow-300"
                                    : "border-green-500/30 text-green-300"
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* ESG Copilot Starter Kit */}
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center">
                        <Brain className="h-5 w-5 text-purple-400 mr-2" />
                        ESG Copilot Starter Kit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analysisResult.copilotKit.map((tool, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-purple-400" />
                            <span className="text-gray-300 text-sm">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* KPI Targets */}
                  <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center">
                        <Target className="h-5 w-5 text-cyan-400 mr-2" />
                        Expected KPI Improvements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.kpiTargets.map((kpi, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-medium">{kpi.metric}</span>
                              <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                                {kpi.timeline}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Current: {kpi.current}</span>
                              <span className="text-green-400 font-medium">Target: {kpi.target}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Placeholder when no results */}
            {!showResult && (
              <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-700">
                <CardContent className="p-12 text-center">
                  <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">AI Analysis Ready</h3>
                  <p className="text-gray-500">
                    Complete the form to receive your personalized ESG blueprint with implementation roadmap and KPI
                    targets.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Users, Shield, Zap, Brain, CheckCircle, TrendingUp } from "lucide-react"
import { useState } from "react"

const departments = [
  { value: "urban", label: "Urban Development" },
  { value: "defense", label: "Defense & Security" },
  { value: "health", label: "Public Health" },
  { value: "education", label: "Education Services" },
  { value: "welfare", label: "Social Welfare" },
  { value: "transport", label: "Transportation" },
  { value: "finance", label: "Public Finance" },
  { value: "environment", label: "Environment & Sustainability" },
]

const beneficiaryRanges = [
  { value: "small", label: "< 100K citizens" },
  { value: "medium", label: "100K - 1M citizens" },
  { value: "large", label: "1M - 10M citizens" },
  { value: "mega", label: "10M+ citizens" },
]

const maturityLevels = [
  { value: "basic", label: "Basic - Paper-based processes" },
  { value: "digital", label: "Digital - Some online services" },
  { value: "integrated", label: "Integrated - Connected systems" },
  { value: "intelligent", label: "Intelligent - AI-powered services" },
]

const improvementAreas = [
  { id: "processing", label: "Processing Speed", icon: Zap },
  { id: "transparency", label: "Transparency", icon: Shield },
  { id: "accessibility", label: "Citizen Accessibility", icon: Users },
  { id: "compliance", label: "Regulatory Compliance", icon: FileText },
  { id: "automation", label: "Process Automation", icon: Brain },
  { id: "satisfaction", label: "Citizen Satisfaction", icon: CheckCircle },
]

export function SmartServicesForm() {
  const [formData, setFormData] = useState({
    department: "",
    beneficiaries: "",
    maturity: "",
    improvements: [] as string[],
    challenges: "",
    timeline: "",
    budget: "",
  })
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImprovementChange = (improvementId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      improvements: checked
        ? [...prev.improvements, improvementId]
        : prev.improvements.filter((id) => id !== improvementId),
    }))
  }

  const generateAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        auditScore: Math.floor(Math.random() * 20) + 80, // 80-100
        roadmap: [
          {
            phase: "Foundation",
            duration: "2-3 months",
            activities: ["Data integration", "Process mapping", "Staff training"],
            investment: "$150K - $300K",
          },
          {
            phase: "Automation",
            duration: "3-4 months",
            activities: ["RPA deployment", "AI model training", "Workflow optimization"],
            investment: "$300K - $500K",
          },
          {
            phase: "Intelligence",
            duration: "2-3 months",
            activities: ["AI Copilot integration", "Predictive analytics", "Citizen portal"],
            investment: "$200K - $400K",
          },
        ],
        heatmap: {
          high: ["Document processing", "Citizen queries", "Compliance reporting"],
          medium: ["Data entry", "Status tracking", "Inter-department coordination"],
          low: ["Archive management", "Routine notifications", "Basic reporting"],
        },
        starterKit: [
          "SAP Public Sector Core license",
          "ESGit AI Copilot setup",
          "Process automation templates",
          "Citizen portal framework",
          "Training materials & documentation",
        ],
        kpiTargets: {
          processingTime: "75% reduction",
          citizenSatisfaction: "90%+ rating",
          automation: "80% of routine tasks",
          transparency: "100% process visibility",
        },
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Brain className="w-4 h-4 mr-2" />
            Smart Public Services Assessment
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI-Powered Transformation Planner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a personalized digital transformation roadmap with AI audit score, security recommendations, and
            implementation timeline.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Assessment Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Department Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Domain</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
                    <Select
                      value={formData.beneficiaries}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, beneficiaries: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select beneficiary range" />
                      </SelectTrigger>
                      <SelectContent>
                        {beneficiaryRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maturity">Digital Maturity Level</Label>
                    <Select
                      value={formData.maturity}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, maturity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select current maturity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {maturityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Target Improvement Areas</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {improvementAreas.map((area) => (
                        <div key={area.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={area.id}
                            checked={formData.improvements.includes(area.id)}
                            onCheckedChange={(checked) => handleImprovementChange(area.id, checked as boolean)}
                          />
                          <Label htmlFor={area.id} className="flex items-center text-sm">
                            <area.icon className="w-4 h-4 mr-2" />
                            {area.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Primary Challenges</Label>
                    <Textarea
                      id="challenges"
                      placeholder="Describe your main operational challenges..."
                      value={formData.challenges}
                      onChange={(e) => setFormData((prev) => ({ ...prev, challenges: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Target Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3months">3 months</SelectItem>
                          <SelectItem value="6months">6 months</SelectItem>
                          <SelectItem value="12months">12 months</SelectItem>
                          <SelectItem value="18months">18+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100k">$100K - $500K</SelectItem>
                          <SelectItem value="500k">$500K - $1M</SelectItem>
                          <SelectItem value="1m">$1M - $5M</SelectItem>
                          <SelectItem value="5m">$5M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generateAnalysis}
                    disabled={!formData.department || !formData.beneficiaries || isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate AI Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analysis Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Analyzing your requirements...</p>
                        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                      </div>
                    </div>
                  ) : analysis ? (
                    <div className="space-y-6">
                      {/* AI Audit Score */}
                      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Audit Score</h3>
                        <div className="text-4xl font-bold text-green-600 mb-2">{analysis.auditScore}/100</div>
                        <p className="text-sm text-gray-600">Readiness for AI transformation</p>
                      </div>

                      {/* Implementation Roadmap */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Implementation Roadmap</h4>
                        <div className="space-y-3">
                          {analysis.roadmap.map((phase: any, idx: number) => (
                            <div key={idx} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-800">{phase.phase}</span>
                                <Badge variant="outline">{phase.duration}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{phase.activities.join(", ")}</p>
                              <p className="text-xs text-blue-600 font-medium">{phase.investment}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fraud/AML Heatmap */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Automation Priority Heatmap</h4>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-red-700">High Priority:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {analysis.heatmap.high.map((item: string, idx: number) => (
                                <Badge key={idx} variant="destructive" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-orange-700">Medium Priority:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {analysis.heatmap.medium.map((item: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ESG Copilot Starter Kit */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">ESG Copilot Starter Kit</h4>
                        <div className="space-y-2">
                          {analysis.starterKit.map((item: string, idx: number) => (
                            <div key={idx} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* KPI Targets */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Expected KPI Improvements</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(analysis.kpiTargets).map(([key, value]) => (
                            <div key={key} className="p-2 bg-blue-50 rounded text-center">
                              <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                              <p className="text-sm font-semibold text-blue-800">{value as string}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Complete the assessment to get your personalized AI transformation plan</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

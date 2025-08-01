"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Brain, Zap, Shield, BarChart3, FileText, CheckCircle, Loader2, AlertTriangle } from "lucide-react"

const institutionTypes = [
  "Commercial Bank",
  "Investment Bank",
  "Credit Union",
  "NBFC",
  "Insurance Company",
  "Payment Processor",
  "Fintech Startup",
  "Asset Management",
  "Other",
]

const systemSizes = [
  "Small (< 10K customers)",
  "Medium (10K - 100K customers)",
  "Large (100K - 1M customers)",
  "Enterprise (> 1M customers)",
]

const coreApps = [
  "Temenos T24",
  "SAP Banking",
  "Oracle FLEXCUBE",
  "FIS Profile",
  "Finastra Fusion",
  "Custom Built",
  "Other",
]

const challenges = [
  "Fraud Detection & Prevention",
  "Regulatory Compliance",
  "Credit Risk Management",
  "Customer Experience",
  "Digital Transformation",
  "Data Analytics & AI",
  "Cybersecurity",
  "Process Automation",
]

export function FinanceAcceleratorForm() {
  const [formData, setFormData] = useState({
    institutionType: "",
    systemSize: "",
    coreApps: [] as string[],
    primaryChallenge: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate AI analysis based on form data
    const analysis = {
      auditScore: Math.floor(Math.random() * 20) + 80, // 80-100
      securityRoadmap: [
        "Implement multi-factor authentication",
        "Deploy AI-powered fraud detection",
        "Enhance data encryption protocols",
        "Establish real-time monitoring",
      ],
      fraudHeatmap: {
        high: ["Account Takeover", "Payment Fraud"],
        medium: ["Identity Theft", "Card Fraud"],
        low: ["Check Fraud", "Wire Fraud"],
      },
      copilotKit: [
        "BFSI Compliance Assistant",
        "Real-time Risk Monitor",
        "Fraud Detection Engine",
        "Regulatory Reporting Tool",
      ],
      recommendations: [
        `For ${formData.institutionType}, focus on ${formData.primaryChallenge.toLowerCase()}`,
        "Integrate ESGit AI Stack with existing systems",
        "Implement phased rollout approach",
        "Establish KPI monitoring dashboard",
      ],
    }

    setAiAnalysis(analysis)
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleCoreAppChange = (app: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      coreApps: checked ? [...prev.coreApps, app] : prev.coreApps.filter((a) => a !== app),
    }))
  }

  if (isSubmitted && aiAnalysis) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-600">Analysis Complete!</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">Your personalized BFSI transformation roadmap is ready</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Audit Score */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-6 py-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{aiAnalysis.auditScore}/100</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Audit Score</div>
                  </div>
                </div>
              </div>

              {/* Security Roadmap */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Security Roadmap
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiAnalysis.securityRoadmap.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fraud/AML Heatmap */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Fraud/AML Heatmap
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(aiAnalysis.fraudHeatmap).map(([level, risks]) => (
                    <div
                      key={level}
                      className={`rounded-lg p-4 ${
                        level === "high"
                          ? "bg-red-50 dark:bg-red-900/20"
                          : level === "medium"
                            ? "bg-yellow-50 dark:bg-yellow-900/20"
                            : "bg-green-50 dark:bg-green-900/20"
                      }`}
                    >
                      <h4
                        className={`font-medium mb-2 capitalize ${
                          level === "high" ? "text-red-600" : level === "medium" ? "text-yellow-600" : "text-green-600"
                        }`}
                      >
                        {level} Risk
                      </h4>
                      <div className="space-y-1">
                        {(risks as string[]).map((risk, index) => (
                          <Badge key={index} variant="outline" className="text-xs block w-fit">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ESG Copilot Starter Kit */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  ESG Copilot Starter Kit
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiAnalysis.copilotKit.map((tool: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3"
                    >
                      <Zap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-sm">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  AI Recommendations
                </h3>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Schedule Implementation Call
                </Button>
                <Button size="lg" variant="outline">
                  <FileText className="w-5 h-5 mr-2" />
                  Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    )
  }

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
          <Brain className="w-4 h-4 mr-2" />
          Finance Accelerator Form
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get Your Personalized BFSI AI Roadmap
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          GPT-enhanced analysis to deliver customized AI audit score, security roadmap, and fraud prevention strategy
        </p>
      </motion.div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            BFSI Transformation Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Institution Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="institutionType">Type of Institution *</Label>
                <Select
                  value={formData.institutionType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, institutionType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemSize">System Size *</Label>
                <Select
                  value={formData.systemSize}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, systemSize: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select system size" />
                  </SelectTrigger>
                  <SelectContent>
                    {systemSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Core Applications */}
            <div className="space-y-3">
              <Label>Core Apps Used (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {coreApps.map((app) => (
                  <div key={app} className="flex items-center space-x-2">
                    <Checkbox
                      id={app}
                      checked={formData.coreApps.includes(app)}
                      onCheckedChange={(checked) => handleCoreAppChange(app, checked as boolean)}
                    />
                    <Label htmlFor={app} className="text-sm">
                      {app}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Challenge */}
            <div className="space-y-3">
              <Label>Primary Challenge *</Label>
              <RadioGroup
                value={formData.primaryChallenge}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, primaryChallenge: value }))}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {challenges.map((challenge) => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <RadioGroupItem value={challenge} id={challenge} />
                      <Label htmlFor={challenge} className="text-sm">
                        {challenge}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                placeholder="Tell us more about your specific requirements, current challenges, or goals..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={
                  isSubmitting ||
                  !formData.institutionType ||
                  !formData.systemSize ||
                  !formData.primaryChallenge ||
                  !formData.companyName ||
                  !formData.contactName ||
                  !formData.email
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating AI Analysis...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Get My BFSI AI Roadmap
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

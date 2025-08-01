"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Brain, Zap, CheckCircle, Factory } from "lucide-react"

export default function IndustryBlueprintForm() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    subIndustry: "",
    businessSize: "",
    painPoints: [] as string[],
    aiMaturity: "",
    currentSystems: [] as string[],
    timeline: "",
    budget: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const subIndustries = [
    "Automotive",
    "Heavy Manufacturing",
    "FMCG (Fast-Moving Consumer Goods)",
    "Pharmaceutical",
    "Electronics",
    "Aerospace & Defense",
    "Chemical Processing",
    "Food & Beverage",
    "Textile & Apparel",
    "Metal & Mining",
  ]

  const businessSizes = [
    "Startup (1-50 employees)",
    "Small Business (51-200 employees)",
    "Mid-Market (201-1000 employees)",
    "Enterprise (1000+ employees)",
  ]

  const painPointOptions = [
    "High unplanned downtime",
    "Inventory management challenges",
    "Quality control issues",
    "Supply chain disruptions",
    "Maintenance inefficiencies",
    "Lack of real-time visibility",
    "Compliance and safety concerns",
    "Workforce management",
    "Energy optimization",
    "Cost reduction pressures",
  ]

  const aiMaturityLevels = [
    "Beginner (No AI implementation)",
    "Exploring (Pilot projects)",
    "Developing (Some AI solutions)",
    "Advanced (Multiple AI implementations)",
    "Expert (AI-first organization)",
  ]

  const currentSystemOptions = [
    "SAP S/4HANA",
    "SAP ECC",
    "SAP Plant Maintenance",
    "SAP Ariba",
    "Microsoft Dynamics",
    "Oracle ERP",
    "Custom Legacy Systems",
    "No ERP System",
  ]

  const handlePainPointChange = (painPoint: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      painPoints: checked ? [...prev.painPoints, painPoint] : prev.painPoints.filter((p) => p !== painPoint),
    }))
  }

  const handleSystemChange = (system: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      currentSystems: checked ? [...prev.currentSystems, system] : prev.currentSystems.filter((s) => s !== system),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/manufacturing-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting blueprint request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 border border-green-700/50 mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Blueprint Request Submitted!</h2>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for your interest in ESGit's manufacturing solutions. Our AI experts are generating your
                personalized blueprint.
              </p>
            </div>

            <Card className="bg-gray-900 border-gray-800 text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">What happens next:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">AI Analysis (2-4 hours)</div>
                      <div className="text-sm text-gray-400">
                        Our GenAI system analyzes your requirements and generates a custom solution roadmap
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-medium">Expert Review (24 hours)</div>
                      <div className="text-sm text-gray-400">
                        Our manufacturing specialists review and enhance the AI-generated blueprint
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">Delivery & Consultation</div>
                      <div className="text-sm text-gray-400">
                        Receive your personalized blueprint with a complimentary 30-minute consultation
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
            <FileText className="mr-2 h-4 w-4" />
            GPT-Augmented Blueprint
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Request Your <span className="gradient-text">Industry Blueprint</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get a personalized manufacturing transformation roadmap powered by AI analysis of your specific requirements
            and industry challenges.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 text-blue-400 mr-2" />
                Manufacturing Transformation Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessSize">Business Size *</Label>
                    <Select
                      value={formData.businessSize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, businessSize: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select business size" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Industry Specifics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="subIndustry">Sub-Industry *</Label>
                    <Select
                      value={formData.subIndustry}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, subIndustry: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {subIndustries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="aiMaturity">AI Maturity Score *</Label>
                    <Select
                      value={formData.aiMaturity}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, aiMaturity: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select AI maturity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiMaturityLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Pain Points */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Primary Pain Points *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {painPointOptions.map((painPoint) => (
                      <div key={painPoint} className="flex items-center space-x-2">
                        <Checkbox
                          id={painPoint}
                          checked={formData.painPoints.includes(painPoint)}
                          onCheckedChange={(checked) => handlePainPointChange(painPoint, checked as boolean)}
                        />
                        <Label htmlFor={painPoint} className="text-sm font-normal cursor-pointer">
                          {painPoint}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Systems */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Current Systems</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSystemOptions.map((system) => (
                      <div key={system} className="flex items-center space-x-2">
                        <Checkbox
                          id={system}
                          checked={formData.currentSystems.includes(system)}
                          onCheckedChange={(checked) => handleSystemChange(system, checked as boolean)}
                        />
                        <Label htmlFor={system} className="text-sm font-normal cursor-pointer">
                          {system}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timeline">Implementation Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="over-5m">Over $5M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Tell us more about your specific challenges, goals, or requirements..."
                    className="bg-gray-800 border-gray-700 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Generating Blueprint...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Generate My Blueprint
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* What You'll Receive */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/30 border border-blue-700/50 mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Solution Roadmap</h3>
                <p className="text-sm text-gray-400">
                  Custom transformation plan tailored to your industry and challenges
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/30 border border-purple-700/50 mb-4">
                  <Factory className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">ESGit Reference Architecture</h3>
                <p className="text-sm text-gray-400">
                  Detailed technical architecture with SAP + AI integration patterns
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 border border-green-700/50 mb-4">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">KPI Predictions</h3>
                <p className="text-sm text-gray-400">Projected performance improvements and ROI calculations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

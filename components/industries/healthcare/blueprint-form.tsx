"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Brain, Hospital, Users, DollarSign, Shield, FileText, CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const hospitalSizes = [
  { value: "small", label: "Small (< 100 beds)", description: "Community hospitals and clinics" },
  { value: "medium", label: "Medium (100-300 beds)", description: "Regional medical centers" },
  { value: "large", label: "Large (300-500 beds)", description: "Major hospital systems" },
  { value: "enterprise", label: "Enterprise (500+ beds)", description: "Academic medical centers" },
]

const existingSystems = [
  "Epic EMR",
  "Cerner",
  "SAP Health",
  "Allscripts",
  "athenahealth",
  "NextGen",
  "eClinicalWorks",
  "MEDITECH",
  "Other",
  "None",
]

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Other",
]

const painPoints = [
  { id: "wait-times", label: "Long patient wait times" },
  { id: "claim-rejections", label: "High claim rejection rates" },
  { id: "staff-efficiency", label: "Staff productivity issues" },
  { id: "compliance", label: "Compliance and audit challenges" },
  { id: "patient-satisfaction", label: "Low patient satisfaction scores" },
  { id: "data-silos", label: "Disconnected systems and data silos" },
  { id: "scheduling", label: "Manual scheduling processes" },
  { id: "documentation", label: "Excessive documentation burden" },
]

export function HealthcareBlueprintForm() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    hospitalSize: "",
    claimVolume: "",
    existingSystems: [] as string[],
    languagesServed: [] as string[],
    selectedPainPoints: [] as string[],
    additionalRequirements: "",
    budget: "",
    timeline: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSystemChange = (system: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      existingSystems: checked ? [...prev.existingSystems, system] : prev.existingSystems.filter((s) => s !== system),
    }))
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      languagesServed: checked
        ? [...prev.languagesServed, language]
        : prev.languagesServed.filter((l) => l !== language),
    }))
  }

  const handlePainPointChange = (painPoint: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedPainPoints: checked
        ? [...prev.selectedPainPoints, painPoint]
        : prev.selectedPainPoints.filter((p) => p !== painPoint),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/healthcare-blueprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
                <p className="text-gray-600 mb-6">
                  We've received your healthcare AI blueprint request. Our team will analyze your requirements and
                  prepare a customized solution roadmap.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Personalized solution roadmap (24-48 hours)</li>
                      <li>• SAP optimization checklist</li>
                      <li>• HIPAA audit-readiness assessment</li>
                      <li>• ROI projections and implementation timeline</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Interim Healthcare AI Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800">AI Health Blueprint</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Your Personalized Healthcare AI Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your healthcare organization and receive a customized AI implementation strategy with ROI
            projections and compliance guidance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <span>Healthcare AI Blueprint Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Organization Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Hospital className="mr-2 h-5 w-5 text-blue-600" />
                    Organization Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                        placeholder="Enter your healthcare organization name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalSize">Hospital Size *</Label>
                      <Select
                        value={formData.hospitalSize}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, hospitalSize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital size" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitalSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              <div>
                                <div className="font-medium">{size.label}</div>
                                <div className="text-sm text-gray-500">{size.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                        placeholder="Your full name"
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
                        placeholder="your.email@hospital.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="claimVolume">Monthly Claim Volume</Label>
                      <Input
                        id="claimVolume"
                        value={formData.claimVolume}
                        onChange={(e) => setFormData((prev) => ({ ...prev, claimVolume: e.target.value }))}
                        placeholder="e.g., 10,000 claims/month"
                      />
                    </div>
                  </div>
                </div>

                {/* Systems in Use */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                    Current Systems
                  </h3>

                  <div>
                    <Label>Existing Healthcare Systems (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {existingSystems.map((system) => (
                        <div key={system} className="flex items-center space-x-2">
                          <Checkbox
                            id={system}
                            checked={formData.existingSystems.includes(system)}
                            onCheckedChange={(checked) => handleSystemChange(system, checked as boolean)}
                          />
                          <Label htmlFor={system} className="text-sm">
                            {system}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Languages Served */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-orange-600" />
                    Patient Demographics
                  </h3>

                  <div>
                    <Label>Languages Served (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languagesServed.includes(language)}
                            onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pain Points */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-red-600" />
                    Key Challenges
                  </h3>

                  <div>
                    <Label>Primary Pain Points (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      {painPoints.map((painPoint) => (
                        <div key={painPoint.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={painPoint.id}
                            checked={formData.selectedPainPoints.includes(painPoint.id)}
                            onCheckedChange={(checked) => handlePainPointChange(painPoint.id, checked as boolean)}
                          />
                          <Label htmlFor={painPoint.id} className="text-sm">
                            {painPoint.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="additionalRequirements">Additional Requirements or Goals</Label>
                    <Textarea
                      id="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData((prev) => ({ ...prev, additionalRequirements: e.target.value }))}
                      placeholder="Tell us about any specific requirements, compliance needs, or strategic goals..."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget">Estimated Budget Range</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100k">Under $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="over-5m">Over $5M</SelectItem>
                          <SelectItem value="not-sure">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Implementation Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                          <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                          <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                          <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                          <SelectItem value="planning">Still planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Your Blueprint...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Generate My Healthcare AI Blueprint
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    You'll receive a personalized roadmap, SAP optimization checklist, and HIPAA audit-readiness
                    assessment within 24-48 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

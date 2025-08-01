"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Upload, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const industries = [
  "Manufacturing",
  "Healthcare",
  "BFSI",
  "Retail",
  "Energy & Utilities",
  "Telecommunications",
  "Pharmaceuticals",
  "Automotive",
  "Aerospace & Defense",
  "Public Sector",
  "Education",
  "Hospitality",
  "Agriculture",
  "Construction",
  "Media & Entertainment",
  "Transportation & Logistics",
  "Consumer Goods",
  "Technology",
  "Insurance",
  "Real Estate",
]

const currentTools = [
  "SAP ECC",
  "SAP S/4HANA",
  "Oracle",
  "Microsoft Dynamics",
  "Salesforce",
  "Workday",
  "ServiceNow",
  "Custom Solutions",
  "Legacy Systems",
  "Other",
]

const challenges = [
  "Digital Transformation",
  "Process Automation",
  "Data Analytics & AI",
  "Cloud Migration",
  "System Integration",
  "Compliance & Governance",
  "Cost Optimization",
  "Customer Experience",
  "Supply Chain Optimization",
  "Cybersecurity",
]

export default function IndustryWorkshopForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    currentChallenges: "",
    currentTools: [] as string[],
    specificChallenges: [] as string[],
    rfpFile: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<{
    actionPoints: string[]
    roadmap: string
    benchmarkReport: string
  } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter((t) => t !== tool)
        : [...prev.currentTools, tool],
    }))
  }

  const handleChallengeToggle = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      specificChallenges: prev.specificChallenges.includes(challenge)
        ? prev.specificChallenges.filter((c) => c !== challenge)
        : [...prev.specificChallenges, challenge],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, rfpFile: file }))
    }
  }

  const generateAISuggestions = () => {
    // Simulate AI-powered suggestions based on form data
    const suggestions = {
      actionPoints: [
        `Implement SAP S/4HANA with AI-powered ${formData.industry} modules`,
        `Deploy RPA for ${formData.specificChallenges.join(" and ")} automation`,
        `Establish real-time analytics dashboard for ${formData.industry} KPIs`,
      ],
      roadmap: `Phase 1: Assessment & Planning (4 weeks)
Phase 2: Core SAP Implementation (12 weeks)  
Phase 3: AI Integration & Testing (8 weeks)
Phase 4: Go-Live & Support (4 weeks)`,
      benchmarkReport: `${formData.industry} Digital Transformation Benchmark Report 2024`,
    }
    setAiSuggestions(suggestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate AI suggestions first
      generateAISuggestions()

      const response = await fetch("/api/industry-workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          industry: "",
          currentChallenges: "",
          currentTools: [],
          specificChallenges: [],
          rfpFile: null,
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300 mb-6"
          >
            AI-Powered Workshop
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent">
              Book Your Industry
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transformation Workshop
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get personalized AI-enhanced roadmap, benchmark reports, and expert consultation for your industry
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-green-400" />
                    Workshop Registration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          required
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    {/* Industry Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry *</label>
                      <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Current Tools */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Tools & Systems</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {currentTools.map((tool) => (
                          <div key={tool} className="flex items-center space-x-2">
                            <Checkbox
                              id={tool}
                              checked={formData.currentTools.includes(tool)}
                              onCheckedChange={() => handleToolToggle(tool)}
                              className="border-gray-600"
                            />
                            <label htmlFor={tool} className="text-sm text-gray-300 cursor-pointer">
                              {tool}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specific Challenges */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Key Challenges to Address</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {challenges.map((challenge) => (
                          <div key={challenge} className="flex items-center space-x-2">
                            <Checkbox
                              id={challenge}
                              checked={formData.specificChallenges.includes(challenge)}
                              onCheckedChange={() => handleChallengeToggle(challenge)}
                              className="border-gray-600"
                            />
                            <label htmlFor={challenge} className="text-sm text-gray-300 cursor-pointer">
                              {challenge}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Challenges Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Describe Your Current Challenges
                      </label>
                      <Textarea
                        value={formData.currentChallenges}
                        onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                        rows={4}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Tell us about your specific challenges, goals, and what you hope to achieve..."
                      />
                    </div>

                    {/* RFP Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload RFP or Requirements Document (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          id="rfp-upload"
                        />
                        <label htmlFor="rfp-upload">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-gray-600 text-gray-300 bg-transparent"
                          >
                            Choose File
                          </Button>
                        </label>
                        {formData.rfpFile && <p className="text-sm text-green-400 mt-2">✓ {formData.rfpFile.name}</p>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating AI Insights...
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Workshop & Get AI Roadmap
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Workshop Booked Successfully!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for your interest. Our AI has generated personalized insights for your industry.
                  </p>

                  {aiSuggestions && (
                    <div className="space-y-6 text-left">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-green-400" />
                          AI-Generated Action Points
                        </h4>
                        <ul className="space-y-2">
                          {aiSuggestions.actionPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Suggested Implementation Roadmap</h4>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <pre className="text-sm text-gray-300 whitespace-pre-line">{aiSuggestions.roadmap}</pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Benchmark Report</h4>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                          📊 {aiSuggestions.benchmarkReport}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <p className="text-gray-400 mb-4">
                      Our industry expert will contact you within 24 hours to schedule your personalized workshop.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      Book Another Workshop
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

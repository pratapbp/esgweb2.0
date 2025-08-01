"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Brain, Target, Rocket } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  industry: string
  painPoints: string
  aiMaturity: string
  requestedDemo: string[]
}

interface AIRecommendation {
  title: string
  description: string
  priority: string
  timeline: string
}

export default function AIAssistantDemo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    painPoints: "",
    aiMaturity: "",
    requestedDemo: [],
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const totalSteps = 4

  const industries = [
    "Manufacturing",
    "Healthcare",
    "BFSI",
    "Retail",
    "Energy & Utilities",
    "Logistics",
    "Pharma",
    "Public Sector",
    "Telecom",
    "Education",
    "Other",
  ]

  const aiMaturityLevels = [
    "Beginner - Just starting with AI",
    "Intermediate - Some AI experience",
    "Advanced - Mature AI strategy",
    "Expert - AI-first organization",
  ]

  const demoOptions = ["Bot", "ML Model", "Dashboard", "RPA Workflow", "Vision AI", "GenAI Assistant"]

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.company.trim()) newErrors.company = "Company is required"
        break
      case 2:
        if (!formData.industry) newErrors.industry = "Industry is required"
        if (!formData.painPoints.trim()) newErrors.painPoints = "Pain points are required"
        break
      case 3:
        if (!formData.aiMaturity) newErrors.aiMaturity = "AI maturity level is required"
        if (formData.requestedDemo.length === 0) newErrors.requestedDemo = "Please select at least one demo"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
        // Clear errors when moving to next step
        setErrors({})
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleDemoChange = (demo: string, checked: boolean) => {
    const updatedDemos = checked ? [...formData.requestedDemo, demo] : formData.requestedDemo.filter((d) => d !== demo)

    handleInputChange("requestedDemo", updatedDemos)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error("Please complete all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/ai-discovery-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setRecommendations(result.recommendations || [])
        setIsSubmitted(true)
        setCurrentStep(4)
        toast.success("AI Discovery Session request submitted successfully!")
      } else {
        toast.error(result.error || "Failed to submit request")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "foundation":
        return "bg-blue-500"
      case "quick win":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
              <p className="text-purple-200">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@company.com"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 ${
                    errors.company ? "border-red-500" : ""
                  }`}
                  placeholder="Your company name"
                />
                {errors.company && <p className="text-red-400 text-sm">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Business Context</h3>
              <p className="text-purple-200">Help us understand your business needs</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-white">
                  Industry *
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger
                    className={`bg-purple-800/50 border-purple-600 text-white ${
                      errors.industry ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-red-400 text-sm">{errors.industry}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="painPoints" className="text-white">
                  Current Pain Points *
                </Label>
                <Textarea
                  id="painPoints"
                  value={formData.painPoints}
                  onChange={(e) => handleInputChange("painPoints", e.target.value)}
                  className={`bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 min-h-[100px] ${
                    errors.painPoints ? "border-red-500" : ""
                  }`}
                  placeholder="Describe your current business challenges, manual processes, or areas where AI could help..."
                />
                {errors.painPoints && <p className="text-red-400 text-sm">{errors.painPoints}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">AI Readiness & Preferences</h3>
              <p className="text-purple-200">Let's assess your AI maturity and demo preferences</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aiMaturity" className="text-white">
                  AI Maturity Level *
                </Label>
                <Select value={formData.aiMaturity} onValueChange={(value) => handleInputChange("aiMaturity", value)}>
                  <SelectTrigger
                    className={`bg-purple-800/50 border-purple-600 text-white ${
                      errors.aiMaturity ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your AI maturity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiMaturityLevels.map((level) => (
                      <SelectItem key={level} value={level.split(" - ")[0].toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.aiMaturity && <p className="text-red-400 text-sm">{errors.aiMaturity}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-white">Request Demo Of: *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {demoOptions.map((demo) => (
                    <div key={demo} className="flex items-center space-x-2">
                      <Checkbox
                        id={demo}
                        checked={formData.requestedDemo.includes(demo)}
                        onCheckedChange={(checked) => handleDemoChange(demo, checked as boolean)}
                        className="border-purple-400 data-[state=checked]:bg-purple-600"
                      />
                      <Label htmlFor={demo} className="text-white text-sm cursor-pointer">
                        {demo}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.requestedDemo && <p className="text-red-400 text-sm">{errors.requestedDemo}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">AI Discovery Session Booked!</h3>
              <p className="text-purple-200">Thank you for your interest. Our AI experts will contact you soon.</p>
            </div>

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Personalized AI Recommendations
                </h4>
                <div className="grid gap-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="bg-purple-800/30 border-purple-600">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-white text-lg">{rec.title}</CardTitle>
                          <Badge className={`${getPriorityColor(rec.priority)} text-white`}>{rec.priority}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-purple-200 mb-3">{rec.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-purple-300 flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Timeline: {rec.timeline}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-600">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-400" />
                What's Next?
              </h4>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Our AI specialist will review your requirements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  You'll receive a calendar invite within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  We'll prepare a customized demo based on your needs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Get a detailed AI transformation roadmap
                </li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted && currentStep === 4) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <CardTitle className="text-2xl text-white">AI Discovery Session</CardTitle>
          </div>
          <CardDescription className="text-purple-200 text-lg">
            Let's explore how AI can transform your business
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-500/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-purple-400" />
          <CardTitle className="text-2xl text-white">AI Discovery Session</CardTitle>
        </div>
        <CardDescription className="text-purple-200 text-lg">
          Let's explore how AI can transform your business
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-purple-300 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-purple-800" />
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {renderStep()}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-purple-600">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-transparent border-purple-500 text-purple-300 hover:bg-purple-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book Session
                    <Rocket className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Save, Eye, Sparkles, MapPin, DollarSign, Clock, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

interface JobFormData {
  title: string
  department: string
  location: string
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship"
  remote: boolean
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string[]
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  tags: string[]
  lcaCompliant: boolean
  h1bSponsorship: boolean
  urgentHiring: boolean
  experienceLevel: "Entry" | "Mid" | "Senior" | "Executive"
}

const initialFormData: JobFormData = {
  title: "",
  department: "",
  location: "",
  type: "Full-Time",
  remote: false,
  salaryMin: 0,
  salaryMax: 0,
  description: "",
  requirements: [],
  responsibilities: [],
  qualifications: [],
  benefits: [],
  tags: [],
  lcaCompliant: false,
  h1bSponsorship: false,
  urgentHiring: false,
  experienceLevel: "Mid",
}

const steps = [
  { id: 1, title: "Basic Info", description: "Job title, department, location" },
  { id: 2, title: "Description", description: "Job description and responsibilities" },
  { id: 3, title: "Requirements", description: "Skills and qualifications" },
  { id: 4, title: "Compensation", description: "Salary and benefits" },
  { id: 5, title: "Settings", description: "LCA compliance and preferences" },
  { id: 6, title: "Preview", description: "Review and publish" },
]

export default function JobPostingCreationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<JobFormData>(initialFormData)
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const generateAIContent = async (type: "description" | "requirements" | "responsibilities") => {
    setIsGeneratingContent(true)

    // Simulate AI content generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const aiContent = {
      description: `Join our dynamic team as a ${formData.title} where you'll play a crucial role in driving innovation and delivering exceptional results. This position offers an exciting opportunity to work with cutting-edge technologies and collaborate with industry experts in a fast-paced, growth-oriented environment.

You'll be responsible for leading strategic initiatives, implementing best practices, and contributing to our mission of delivering world-class solutions to our clients. This role is perfect for a motivated professional who thrives in collaborative environments and is passionate about making a meaningful impact.`,

      requirements: [
        `Bachelor's degree in relevant field or equivalent experience`,
        `3-5 years of professional experience in ${formData.department.toLowerCase()}`,
        `Strong analytical and problem-solving skills`,
        `Excellent communication and collaboration abilities`,
        `Experience with modern tools and technologies`,
        `Ability to work independently and manage multiple priorities`,
      ],

      responsibilities: [
        `Lead and execute strategic projects and initiatives`,
        `Collaborate with cross-functional teams to deliver solutions`,
        `Analyze requirements and develop comprehensive plans`,
        `Mentor junior team members and share knowledge`,
        `Stay current with industry trends and best practices`,
        `Contribute to process improvements and innovation`,
      ],
    }

    if (type === "description") {
      updateFormData({ description: aiContent.description })
    } else if (type === "requirements") {
      updateFormData({ requirements: aiContent.requirements })
    } else if (type === "responsibilities") {
      updateFormData({ responsibilities: aiContent.responsibilities })
    }

    setIsGeneratingContent(false)
    toast({
      title: "AI Content Generated!",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been generated successfully.`,
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting is now live and visible to candidates.",
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  placeholder="e.g., Senior SAP Data Engineer"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => updateFormData({ department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                  placeholder="e.g., New York, NY or Remote"
                />
              </div>
              <div>
                <Label htmlFor="type">Job Type *</Label>
                <Select value={formData.type} onValueChange={(value: any) => updateFormData({ type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value: any) => updateFormData({ experienceLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="Mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="Senior">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="Executive">Executive (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="remote"
                  checked={formData.remote}
                  onCheckedChange={(checked) => updateFormData({ remote: checked as boolean })}
                />
                <Label htmlFor="remote">Remote Work Available</Label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Job Description *</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIContent("description")}
                  disabled={isGeneratingContent}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingContent ? "Generating..." : "Generate with AI"}
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Describe the role, company culture, and what makes this position exciting..."
                rows={8}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Key Responsibilities</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIContent("responsibilities")}
                  disabled={isGeneratingContent}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
              <div className="space-y-2">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={resp}
                      onChange={(e) => {
                        const newResp = [...formData.responsibilities]
                        newResp[index] = e.target.value
                        updateFormData({ responsibilities: newResp })
                      }}
                      placeholder="Enter responsibility"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newResp = formData.responsibilities.filter((_, i) => i !== index)
                        updateFormData({ responsibilities: newResp })
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => updateFormData({ responsibilities: [...formData.responsibilities, ""] })}
                >
                  Add Responsibility
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Required Skills & Qualifications</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIContent("requirements")}
                  disabled={isGeneratingContent}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </div>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={req}
                      onChange={(e) => {
                        const newReq = [...formData.requirements]
                        newReq[index] = e.target.value
                        updateFormData({ requirements: newReq })
                      }}
                      placeholder="Enter requirement"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newReq = formData.requirements.filter((_, i) => i !== index)
                        updateFormData({ requirements: newReq })
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => updateFormData({ requirements: [...formData.requirements, ""] })}
                >
                  Add Requirement
                </Button>
              </div>
            </div>

            <div>
              <Label>Skills Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {tag}
                    <button
                      onClick={() => {
                        const newTags = formData.tags.filter((_, i) => i !== index)
                        updateFormData({ tags: newTags })
                      }}
                      className="ml-2 text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add skill tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value.trim()
                      if (value && !formData.tags.includes(value)) {
                        updateFormData({ tags: [...formData.tags, value] })
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  value={formData.salaryMin || ""}
                  onChange={(e) => updateFormData({ salaryMin: Number.parseInt(e.target.value) || 0 })}
                  placeholder="80000"
                />
              </div>
              <div>
                <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  value={formData.salaryMax || ""}
                  onChange={(e) => updateFormData({ salaryMax: Number.parseInt(e.target.value) || 0 })}
                  placeholder="120000"
                />
              </div>
            </div>

            <div>
              <Label>Benefits & Perks</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {[
                  "Health Insurance",
                  "Dental Insurance",
                  "Vision Insurance",
                  "401(k) Matching",
                  "Flexible PTO",
                  "Remote Work",
                  "Professional Development",
                  "Stock Options",
                  "Gym Membership",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={formData.benefits.includes(benefit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData({ benefits: [...formData.benefits, benefit] })
                        } else {
                          updateFormData({ benefits: formData.benefits.filter((b) => b !== benefit) })
                        }
                      }}
                    />
                    <Label htmlFor={benefit} className="text-sm">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lcaCompliant"
                  checked={formData.lcaCompliant}
                  onCheckedChange={(checked) => updateFormData({ lcaCompliant: checked as boolean })}
                />
                <Label htmlFor="lcaCompliant">LCA Compliant Position</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="h1bSponsorship"
                  checked={formData.h1bSponsorship}
                  onCheckedChange={(checked) => updateFormData({ h1bSponsorship: checked as boolean })}
                />
                <Label htmlFor="h1bSponsorship">H1B Visa Sponsorship Available</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgentHiring"
                  checked={formData.urgentHiring}
                  onCheckedChange={(checked) => updateFormData({ urgentHiring: checked as boolean })}
                />
                <Label htmlFor="urgentHiring">Urgent Hiring</Label>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">LCA Compliance Information</h4>
              <p className="text-sm text-blue-800">
                LCA (Labor Condition Application) compliance ensures that this position meets Department of Labor
                requirements for foreign worker employment. This includes prevailing wage requirements and working
                condition standards.
              </p>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{formData.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{formData.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formData.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold">
                      <DollarSign className="w-5 h-5" />
                      <span>
                        ${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {formData.remote && <Badge variant="outline">Remote</Badge>}
                    {formData.lcaCompliant && (
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        ✓ LCA Compliant
                      </Badge>
                    )}
                    {formData.h1bSponsorship && (
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        H1B Sponsor
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Job Description</h4>
                    <p className="text-gray-600 text-sm">{formData.description}</p>
                  </div>

                  {formData.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Key Responsibilities</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {formData.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formData.requirements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {formData.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formData.benefits.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.benefits.map((benefit) => (
                          <Badge key={benefit} variant="outline">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Create Job Posting</h1>
            <p className="text-gray-600 mt-2">Use our AI-powered tools to create compelling job postings</p>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
              <div className="grid grid-cols-6 gap-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`text-center ${
                      step.id === currentStep
                        ? "text-blue-600"
                        : step.id < currentStep
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                        step.id === currentStep
                          ? "bg-blue-600 text-white"
                          : step.id < currentStep
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="text-xs font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>

              {currentStep === steps.length ? (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Publish Job
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

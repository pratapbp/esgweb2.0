"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Send, FileText, User, CheckCircle, AlertCircle } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_range: string
}

interface JobApplicationFormProps {
  job: Job
  onApplicationSubmitted: () => void
}

export function JobApplicationForm({ job, onApplicationSubmitted }: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    linkedin_url: "",
    portfolio_url: "",
    years_experience: "",
    current_salary: "",
    expected_salary: "",
    availability: "",
    why_interested: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (field: string, file: File | null) => {
    if (field === "resume") {
      setResumeFile(file)
    } else if (field === "cover_letter_file") {
      setCoverLetterFile(file)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.first_name) newErrors.first_name = "First name is required"
        if (!formData.last_name) newErrors.last_name = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        break
      case 2:
        if (!resumeFile) newErrors.resume = "Resume is required"
        break
      case 3:
        if (!formData.years_experience) newErrors.years_experience = "Years of experience is required"
        if (!formData.availability) newErrors.availability = "Availability is required"
        break
      case 4:
        if (!formData.why_interested) newErrors.why_interested = "Please tell us why you're interested"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setLoading(true)

    try {
      const formDataToSend = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Add job info
      formDataToSend.append("job_id", job.id)
      formDataToSend.append("job_title", job.title)

      // Add files
      if (resumeFile) {
        formDataToSend.append("resume", resumeFile)
      }
      if (coverLetterFile) {
        formDataToSend.append("cover_letter_file", coverLetterFile)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onApplicationSubmitted()
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name" className="text-white">
                    First Name *
                  </Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.first_name ? "border-red-500" : ""}`}
                  />
                  {errors.first_name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="last_name" className="text-white">
                    Last Name *
                  </Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.last_name ? "border-red-500" : ""}`}
                  />
                  {errors.last_name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin_url" className="text-white">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio_url" className="text-white">
                    Portfolio/Website
                  </Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    value={formData.portfolio_url}
                    onChange={(e) => handleInputChange("portfolio_url", e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="resume" className="text-white">
                  Resume/CV *
                </Label>
                <div className="mt-2">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange("resume", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      resumeFile
                        ? "border-green-500 bg-green-500/10"
                        : errors.resume
                          ? "border-red-500 bg-red-500/10"
                          : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => document.getElementById("resume")?.click()}
                  >
                    {resumeFile ? (
                      <div className="flex items-center justify-center text-green-400">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        <span>{resumeFile.name}</span>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>Click to upload your resume</p>
                        <p className="text-sm">PDF, DOC, or DOCX (max 10MB)</p>
                      </div>
                    )}
                  </div>
                  {errors.resume && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.resume}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cover_letter_file" className="text-white">
                  Cover Letter (Optional)
                </Label>
                <div className="mt-2">
                  <input
                    id="cover_letter_file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange("cover_letter_file", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      coverLetterFile ? "border-green-500 bg-green-500/10" : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => document.getElementById("cover_letter_file")?.click()}
                  >
                    {coverLetterFile ? (
                      <div className="flex items-center justify-center text-green-400">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        <span>{coverLetterFile.name}</span>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>Click to upload your cover letter</p>
                        <p className="text-sm">PDF, DOC, or DOCX (max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="years_experience" className="text-white">
                    Years of Experience *
                  </Label>
                  <Input
                    id="years_experience"
                    value={formData.years_experience}
                    onChange={(e) => handleInputChange("years_experience", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.years_experience ? "border-red-500" : ""}`}
                    placeholder="e.g., 5"
                  />
                  {errors.years_experience && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.years_experience}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="availability" className="text-white">
                    Availability *
                  </Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    className={`bg-gray-900 border-gray-600 text-white ${errors.availability ? "border-red-500" : ""}`}
                    placeholder="e.g., 2 weeks notice"
                  />
                  {errors.availability && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.availability}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current_salary" className="text-white">
                    Current Salary (Optional)
                  </Label>
                  <Input
                    id="current_salary"
                    value={formData.current_salary}
                    onChange={(e) => handleInputChange("current_salary", e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="e.g., $80,000"
                  />
                </div>
                <div>
                  <Label htmlFor="expected_salary" className="text-white">
                    Expected Salary (Optional)
                  </Label>
                  <Input
                    id="expected_salary"
                    value={formData.expected_salary}
                    onChange={(e) => handleInputChange("expected_salary", e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white"
                    placeholder="e.g., $100,000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="why_interested" className="text-white">
                  Why are you interested in this position? *
                </Label>
                <Textarea
                  id="why_interested"
                  value={formData.why_interested}
                  onChange={(e) => handleInputChange("why_interested", e.target.value)}
                  className={`bg-gray-900 border-gray-600 text-white min-h-[120px] mt-2 ${errors.why_interested ? "border-red-500" : ""}`}
                  placeholder="Tell us what excites you about this role and how you can contribute to our team..."
                />
                {errors.why_interested && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.why_interested}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="cover_letter" className="text-white">
                  Additional Comments
                </Label>
                <Textarea
                  id="cover_letter"
                  value={formData.cover_letter}
                  onChange={(e) => handleInputChange("cover_letter", e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white min-h-[100px] mt-2"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Job Info */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Applying for: {job.title}
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{job.department}</Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{job.type}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300 space-y-1">
            <p>
              <span className="text-gray-400">Location:</span> {job.location}
            </p>
            <p>
              <span className="text-gray-400">Salary:</span> {job.salary_range}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-gray-700" />
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {loading ? "Submitting..." : "Submit Application"}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

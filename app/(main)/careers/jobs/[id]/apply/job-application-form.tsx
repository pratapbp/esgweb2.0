"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, User, Mail, CheckCircle, ArrowLeft, ArrowRight, Send, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface JobApplicationFormProps {
  jobId: string
}

interface ApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string

  // Professional Information
  currentTitle: string
  yearsExperience: string
  currentSalary: string
  expectedSalary: string
  availabilityDate: string

  // Visa Status
  workAuthorization: string
  visaStatus: string
  requiresSponsorship: boolean

  // Application Details
  coverLetter: string
  whyInterested: string
  relevantExperience: string
  additionalInfo: string

  // References
  reference1Name: string
  reference1Title: string
  reference1Company: string
  reference1Email: string
  reference1Phone: string

  // Agreements
  agreeToTerms: boolean
  agreeToBackground: boolean
  agreeToContact: boolean
}

const initialData: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  currentTitle: "",
  yearsExperience: "",
  currentSalary: "",
  expectedSalary: "",
  availabilityDate: "",
  workAuthorization: "",
  visaStatus: "",
  requiresSponsorship: false,
  coverLetter: "",
  whyInterested: "",
  relevantExperience: "",
  additionalInfo: "",
  reference1Name: "",
  reference1Title: "",
  reference1Company: "",
  reference1Email: "",
  reference1Phone: "",
  agreeToTerms: false,
  agreeToBackground: false,
  agreeToContact: false,
}

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

const WORK_AUTHORIZATION_OPTIONS = [
  "US Citizen",
  "Permanent Resident",
  "H-1B Visa Holder",
  "F-1 Student (OPT/CPT)",
  "L-1 Visa Holder",
  "Other Work Authorization",
  "Require Sponsorship",
]

export default function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationData>(initialData)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 5

  const handleInputChange = (field: keyof ApplicationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "resume" | "coverLetter") => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    if (type === "resume") {
      setResumeFile(file)
      toast.success("Resume uploaded successfully")
    } else {
      setCoverLetterFile(file)
      toast.success("Cover letter uploaded successfully")
    }
  }

  const removeFile = (type: "resume" | "coverLetter") => {
    if (type === "resume") {
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } else {
      setCoverLetterFile(null)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
        break

      case 2: // Professional Information
        if (!formData.currentTitle) newErrors.currentTitle = "Current title is required"
        if (!formData.yearsExperience) newErrors.yearsExperience = "Years of experience is required"
        if (!formData.availabilityDate) newErrors.availabilityDate = "Availability date is required"
        if (!formData.workAuthorization) newErrors.workAuthorization = "Work authorization status is required"
        break

      case 3: // Documents
        if (!resumeFile) newErrors.resume = "Resume is required"
        break

      case 4: // Application Details
        if (!formData.whyInterested) newErrors.whyInterested = "Please explain why you're interested in this position"
        if (!formData.relevantExperience) newErrors.relevantExperience = "Please describe your relevant experience"
        break

      case 5: // Review & Submit
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
        if (!formData.agreeToBackground) newErrors.agreeToBackground = "You must consent to background check"
        if (!formData.agreeToContact) newErrors.agreeToContact = "You must agree to be contacted"
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

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    try {
      setLoading(true)

      // Create FormData for file upload
      const submitData = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value.toString())
      })

      // Add files
      if (resumeFile) submitData.append("resume", resumeFile)
      if (coverLetterFile) submitData.append("coverLetter", coverLetterFile)

      // Add job ID
      submitData.append("jobId", jobId)

      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      const result = await response.json()

      toast.success("Application submitted successfully!")

      // Redirect to success page
      router.push(`/careers/jobs/${jobId}/apply/success`)
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">
                  Street Address <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
                {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-300">
                    City <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">
                    State <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state} className="text-white hover:bg-gray-700">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-gray-300">
                    ZIP Code <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  {errors.zipCode && <p className="text-red-400 text-sm">{errors.zipCode}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentTitle" className="text-gray-300">
                    Current Job Title <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="currentTitle"
                    value={formData.currentTitle}
                    onChange={(e) => handleInputChange("currentTitle", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    placeholder="Software Engineer"
                  />
                  {errors.currentTitle && <p className="text-red-400 text-sm">{errors.currentTitle}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsExperience" className="text-gray-300">
                    Years of Experience <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={formData.yearsExperience}
                    onValueChange={(value) => handleInputChange("yearsExperience", value)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="0-1" className="text-white hover:bg-gray-700">
                        0-1 years
                      </SelectItem>
                      <SelectItem value="2-3" className="text-white hover:bg-gray-700">
                        2-3 years
                      </SelectItem>
                      <SelectItem value="4-5" className="text-white hover:bg-gray-700">
                        4-5 years
                      </SelectItem>
                      <SelectItem value="6-10" className="text-white hover:bg-gray-700">
                        6-10 years
                      </SelectItem>
                      <SelectItem value="10+" className="text-white hover:bg-gray-700">
                        10+ years
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.yearsExperience && <p className="text-red-400 text-sm">{errors.yearsExperience}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSalary" className="text-gray-300">
                    Current Salary (Optional)
                  </Label>
                  <Input
                    id="currentSalary"
                    value={formData.currentSalary}
                    onChange={(e) => handleInputChange("currentSalary", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    placeholder="$80,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedSalary" className="text-gray-300">
                    Expected Salary (Optional)
                  </Label>
                  <Input
                    id="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    placeholder="$100,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityDate" className="text-gray-300">
                  Availability Date <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="availabilityDate"
                  type="date"
                  value={formData.availabilityDate}
                  onChange={(e) => handleInputChange("availabilityDate", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
                {errors.availabilityDate && <p className="text-red-400 text-sm">{errors.availabilityDate}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">
                  Work Authorization Status <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.workAuthorization}
                  onValueChange={(value) => handleInputChange("workAuthorization", value)}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select work authorization" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {WORK_AUTHORIZATION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option} className="text-white hover:bg-gray-700">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workAuthorization && <p className="text-red-400 text-sm">{errors.workAuthorization}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresSponsorship"
                  checked={formData.requiresSponsorship}
                  onCheckedChange={(checked) => handleInputChange("requiresSponsorship", checked)}
                />
                <Label htmlFor="requiresSponsorship" className="text-gray-300">
                  I require H-1B visa sponsorship
                </Label>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Documents Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resume Upload */}
              <div className="space-y-2">
                <Label className="text-gray-300">
                  Resume/CV <span className="text-red-400">*</span>
                </Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                  {resumeFile ? (
                    <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-green-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">{resumeFile.name}</p>
                          <p className="text-gray-400 text-sm">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile("resume")}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Upload your resume</p>
                      <p className="text-gray-500 text-sm mb-4">PDF, DOC, or DOCX (max 5MB)</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, "resume")}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
                {errors.resume && <p className="text-red-400 text-sm">{errors.resume}</p>}
              </div>

              {/* Cover Letter Upload (Optional) */}
              <div className="space-y-2">
                <Label className="text-gray-300">Cover Letter (Optional)</Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                  {coverLetterFile ? (
                    <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">{coverLetterFile.name}</p>
                          <p className="text-gray-400 text-sm">{(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile("coverLetter")}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Upload your cover letter</p>
                      <p className="text-gray-500 text-sm mb-4">PDF, DOC, or DOCX (max 5MB)</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, "coverLetter")}
                        className="hidden"
                        id="coverLetterInput"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("coverLetterInput")?.click()}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/30">
                <FileText className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-blue-400">Tip:</strong> Make sure your resume includes relevant experience
                  with the technologies mentioned in the job posting (Java, J2EE, PL/SQL, Oracle, etc.).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-400" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whyInterested" className="text-gray-300">
                  Why are you interested in this position? <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="whyInterested"
                  value={formData.whyInterested}
                  onChange={(e) => handleInputChange("whyInterested", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                  placeholder="Explain what attracts you to this role and our company..."
                />
                {errors.whyInterested && <p className="text-red-400 text-sm">{errors.whyInterested}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="relevantExperience" className="text-gray-300">
                  Describe your relevant experience <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={(e) => handleInputChange("relevantExperience", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                  placeholder="Highlight your experience with Java, J2EE, PL/SQL, Oracle, and other relevant technologies..."
                />
                {errors.relevantExperience && <p className="text-red-400 text-sm">{errors.relevantExperience}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="text-gray-300">
                  Cover Letter (if not uploaded as file)
                </Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white min-h-[150px]"
                  placeholder="Write your cover letter here if you didn't upload one as a file..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-gray-300">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white min-h-[100px]"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              {/* Reference Information */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Professional Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference1Name" className="text-gray-300">
                      Reference Name
                    </Label>
                    <Input
                      id="reference1Name"
                      value={formData.reference1Name}
                      onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference1Title" className="text-gray-300">
                      Reference Title
                    </Label>
                    <Input
                      id="reference1Title"
                      value={formData.reference1Title}
                      onChange={(e) => handleInputChange("reference1Title", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Senior Manager"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference1Company" className="text-gray-300">
                      Company
                    </Label>
                    <Input
                      id="reference1Company"
                      value={formData.reference1Company}
                      onChange={(e) => handleInputChange("reference1Company", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="ABC Corporation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference1Email" className="text-gray-300">
                      Reference Email
                    </Label>
                    <Input
                      id="reference1Email"
                      type="email"
                      value={formData.reference1Email}
                      onChange={(e) => handleInputChange("reference1Email", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="john.smith@company.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Review & Submit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Application Summary */}
              <div className="bg-gray-800/30 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p className="text-white">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p className="text-white">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="text-white">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current Title:</p>
                    <p className="text-white">{formData.currentTitle}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Experience:</p>
                    <p className="text-white">{formData.yearsExperience}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Work Authorization:</p>
                    <p className="text-white">{formData.workAuthorization}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 mb-2">Documents:</p>
                  <div className="space-y-1">
                    {resumeFile && (
                      <p className="text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Resume: {resumeFile.name}
                      </p>
                    )}
                    {coverLetterFile && (
                      <p className="text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Cover Letter: {coverLetterFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Agreements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Terms and Agreements</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreeToTerms" className="text-gray-300">
                        I agree to the Terms and Conditions <span className="text-red-400">*</span>
                      </Label>
                      <p className="text-sm text-gray-400">
                        I acknowledge that I have read and agree to the company's terms and conditions.
                      </p>
                    </div>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToBackground"
                      checked={formData.agreeToBackground}
                      onCheckedChange={(checked) => handleInputChange("agreeToBackground", checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreeToBackground" className="text-gray-300">
                        Background Check Consent <span className="text-red-400">*</span>
                      </Label>
                      <p className="text-sm text-gray-400">
                        I consent to a background check as part of the employment process.
                      </p>
                    </div>
                  </div>
                  {errors.agreeToBackground && <p className="text-red-400 text-sm">{errors.agreeToBackground}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToContact"
                      checked={formData.agreeToContact}
                      onCheckedChange={(checked) => handleInputChange("agreeToContact", checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="agreeToContact" className="text-gray-300">
                        Contact Permission <span className="text-red-400">*</span>
                      </Label>
                      <p className="text-sm text-gray-400">
                        I agree to be contacted regarding this application and future opportunities.
                      </p>
                    </div>
                  </div>
                  {errors.agreeToContact && <p className="text-red-400 text-sm">{errors.agreeToContact}</p>}
                </div>
              </div>

              <Alert className="bg-green-500/10 border-green-500/30">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-green-400">Ready to Submit:</strong> Please review all information carefully
                  before submitting your application. You will receive a confirmation email once submitted.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Job Application</h1>
        <p className="text-gray-400">Complete your application for the Software Engineer position</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-gray-800" />

        {/* Step Labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span className={currentStep >= 1 ? "text-cyan-400" : ""}>Personal Info</span>
          <span className={currentStep >= 2 ? "text-cyan-400" : ""}>Professional</span>
          <span className={currentStep >= 3 ? "text-cyan-400" : ""}>Documents</span>
          <span className={currentStep >= 4 ? "text-cyan-400" : ""}>Details</span>
          <span className={currentStep >= 5 ? "text-cyan-400" : ""}>Review</span>
        </div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

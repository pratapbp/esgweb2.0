"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Briefcase, DollarSign, Save, Send, Plus, X, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JobFormData {
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  salary_min: string
  salary_max: string
  tags: string[]
  benefits: string[]
  remote: boolean
  urgent: boolean
  experience_level: string
}

export default function SimplifiedJobForm() {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    salary_min: "",
    salary_max: "",
    tags: [],
    benefits: [],
    remote: false,
    urgent: false,
    experience_level: "",
  })

  const [newTag, setNewTag] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const departments = [
    "Engineering",
    "AI/ML",
    "Data Science",
    "Security",
    "Cloud",
    "Consulting",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
  ]

  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"]
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"]

  const commonTags = [
    "SAP",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "AWS",
    "Azure",
    "Machine Learning",
    "AI",
    "Data Engineering",
    "DevOps",
    "Kubernetes",
  ]

  const commonBenefits = [
    "Health Insurance",
    "Dental Insurance",
    "401k Matching",
    "Remote Work",
    "Flexible Hours",
    "Unlimited PTO",
    "Learning Stipend",
    "Stock Options",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleArrayChange = (field: "requirements" | "responsibilities", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "requirements" | "responsibilities") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "requirements" | "responsibilities", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
    }
    setNewTag("")
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const addBenefit = (benefit: string) => {
    if (benefit && !formData.benefits.includes(benefit)) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit],
      }))
    }
    setNewBenefit("")
  }

  const removeBenefit = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((b) => b !== benefit),
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.type) newErrors.type = "Job type is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.experience_level) newErrors.experience_level = "Experience level is required"

    // Validate requirements
    const validRequirements = formData.requirements.filter((req) => req.trim())
    if (validRequirements.length === 0) {
      newErrors.requirements = "At least one requirement is needed"
    }

    // Validate salary if provided
    if (formData.salary_min && formData.salary_max) {
      const minSalary = Number.parseInt(formData.salary_min.replace(/[^0-9]/g, ""))
      const maxSalary = Number.parseInt(formData.salary_max.replace(/[^0-9]/g, ""))
      if (minSalary >= maxSalary) {
        newErrors.salary_max = "Maximum salary must be higher than minimum"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (isDraft = false) => {
    if (!isDraft && !validateForm()) return

    setLoading(true)

    try {
      // Clean up data
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter((req) => req.trim()),
        responsibilities: formData.responsibilities.filter((resp) => resp.trim()),
        status: isDraft ? "draft" : "published",
        created_at: new Date().toISOString(),
      }

      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: isDraft ? "Draft Saved!" : "Job Posted Successfully!",
          description: isDraft
            ? "Job has been saved as draft"
            : "The job posting is now live and accepting applications",
        })

        // Reset form
        setFormData({
          title: "",
          department: "",
          location: "",
          type: "",
          description: "",
          requirements: [""],
          responsibilities: [""],
          salary_min: "",
          salary_max: "",
          tags: [],
          benefits: [],
          remote: false,
          urgent: false,
          experience_level: "",
        })
      } else {
        throw new Error(result.error || "Failed to create job")
      }
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
            Create New Job Posting
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Job Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`bg-gray-800 border-gray-700 text-white ${errors.title ? "border-red-500" : ""}`}
                placeholder="e.g., Senior SAP Consultant"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="department" className="text-white">
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger
                  className={`bg-gray-800 border-gray-700 text-white ${errors.department ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept} className="text-white hover:bg-gray-700">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.department}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-white">
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`bg-gray-800 border-gray-700 text-white ${errors.location ? "border-red-500" : ""}`}
                placeholder="e.g., New York, NY or Remote"
              />
              {errors.location && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="type" className="text-white">
                Job Type *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger
                  className={`bg-gray-800 border-gray-700 text-white ${errors.type ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.type}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="experience_level" className="text-white">
              Experience Level *
            </Label>
            <Select
              value={formData.experience_level}
              onValueChange={(value) => handleInputChange("experience_level", value)}
            >
              <SelectTrigger
                className={`bg-gray-800 border-gray-700 text-white ${errors.experience_level ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level} className="text-white hover:bg-gray-700">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experience_level && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.experience_level}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote"
                checked={formData.remote}
                onCheckedChange={(checked) => handleInputChange("remote", checked as boolean)}
              />
              <Label htmlFor="remote" className="text-white">
                Remote Work Available
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={formData.urgent}
                onCheckedChange={(checked) => handleInputChange("urgent", checked as boolean)}
              />
              <Label htmlFor="urgent" className="text-white">
                Urgent Hiring
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`bg-gray-800 border-gray-700 text-white min-h-[120px] mt-2 ${errors.description ? "border-red-500" : ""}`}
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <Label className="text-white">Requirements *</Label>
            <div className="space-y-2 mt-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., 5+ years of SAP experience"
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("requirements", index)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("requirements")}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Requirement
              </Button>
              {errors.requirements && (
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.requirements}
                </p>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <Label className="text-white">Key Responsibilities</Label>
            <div className="space-y-2 mt-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={resp}
                    onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., Lead SAP implementation projects"
                  />
                  {formData.responsibilities.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("responsibilities", index)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("responsibilities")}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Responsibility
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compensation & Benefits */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-400" />
            Compensation & Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_min" className="text-white">
                Minimum Salary
              </Label>
              <Input
                id="salary_min"
                value={formData.salary_min}
                onChange={(e) => handleInputChange("salary_min", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., $80,000"
              />
            </div>
            <div>
              <Label htmlFor="salary_max" className="text-white">
                Maximum Salary
              </Label>
              <Input
                id="salary_max"
                value={formData.salary_max}
                onChange={(e) => handleInputChange("salary_max", e.target.value)}
                className={`bg-gray-800 border-gray-700 text-white ${errors.salary_max ? "border-red-500" : ""}`}
                placeholder="e.g., $120,000"
              />
              {errors.salary_max && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.salary_max}
                </p>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <Label className="text-white">Benefits</Label>
            <div className="space-y-3 mt-2">
              <div className="flex flex-wrap gap-2">
                {commonBenefits.map((benefit) => (
                  <Badge
                    key={benefit}
                    variant={formData.benefits.includes(benefit) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      formData.benefits.includes(benefit)
                        ? "bg-blue-600 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => (formData.benefits.includes(benefit) ? removeBenefit(benefit) : addBenefit(benefit))}
                  >
                    {benefit}
                    {formData.benefits.includes(benefit) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Add custom benefit"
                  onKeyPress={(e) => e.key === "Enter" && addBenefit(newBenefit)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addBenefit(newBenefit)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.benefits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit) => (
                    <Badge key={benefit} className="bg-green-500/20 text-green-400 border-green-500/30">
                      {benefit}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeBenefit(benefit)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Tags */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Skills & Technologies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Required Skills</Label>
            <div className="space-y-3 mt-2">
              <div className="flex flex-wrap gap-2">
                {commonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={formData.tags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      formData.tags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => (formData.tags.includes(tag) ? removeTag(tag) : addTag(tag))}
                  >
                    {tag}
                    {formData.tags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Add custom skill/technology"
                  onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTag(newTag)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {tag}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Actions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Alert className="bg-blue-900/20 border-blue-700 flex-1 mr-6">
              <CheckCircle className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300">
                Review all information before publishing. You can save as draft to continue editing later.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>

              <Button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publish Job
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

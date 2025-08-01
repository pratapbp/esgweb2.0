"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Briefcase, MapPin, DollarSign, CalendarIcon, Save, Send, X, Plus, Building, Clock, Star } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

interface JobFormData {
  title: string
  department: string
  location: string
  job_type: string
  employment_level: string
  description: string
  requirements: string
  salary_min: string
  salary_max: string
  tags: string[]
  benefits: string[]
  remote_type: string
  featured: boolean
  expires_at: Date | null
}

const SUGGESTED_TAGS = [
  "SAP",
  "S/4HANA",
  "BRIM",
  "SuccessFactors",
  "Ariba",
  "Concur",
  "Fieldglass",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C#",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Remote",
  "Hybrid",
  "H1B Sponsor",
  "Security Clearance",
  "Travel Required",
]

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "HR",
  "Legal",
  "Consulting",
  "Data Science",
  "DevOps",
  "QA",
]

const BENEFITS = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401(k) Matching",
  "Flexible PTO",
  "Remote Work",
  "Professional Development",
  "Stock Options",
  "Gym Membership",
  "Catered Meals",
  "Learning Budget",
  "Conference Attendance",
]

export default function UploadJobForm() {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    job_type: "",
    employment_level: "Mid-Level",
    description: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
    tags: [],
    benefits: [],
    remote_type: "hybrid",
    featured: false,
    expires_at: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newTag, setNewTag] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.job_type) newErrors.job_type = "Job type is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.requirements.trim()) newErrors.requirements = "Requirements are required"

    if (formData.salary_min && formData.salary_max) {
      const min = Number.parseInt(formData.salary_min)
      const max = Number.parseInt(formData.salary_max)
      if (min >= max) {
        newErrors.salary_max = "Maximum salary must be greater than minimum"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (isDraft = false) => {
    if (!validateForm() && !isDraft) return

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        salary_min: formData.salary_min ? Number.parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? Number.parseInt(formData.salary_max) : null,
        status: isDraft ? "draft" : "active",
        expires_at: formData.expires_at?.toISOString() || null,
      }

      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(isDraft ? "Job saved as draft!" : "Job posted successfully!")
        // Reset form or redirect
        setFormData({
          title: "",
          department: "",
          location: "",
          job_type: "",
          employment_level: "Mid-Level",
          description: "",
          requirements: "",
          salary_min: "",
          salary_max: "",
          tags: [],
          benefits: [],
          remote_type: "hybrid",
          featured: false,
          expires_at: null,
        })
      } else {
        toast.error(result.error || "Failed to create job posting")
      }
    } catch (error) {
      toast.error("An error occurred while creating the job posting")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const toggleBenefit = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }))
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cyan-400" />
          Create Job Posting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="basic" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Content
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Senior SAP Consultant"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-white">
                  Department *
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept} className="text-white hover:bg-gray-700">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-400 text-sm">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Remote - USA, New York, NY"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_type" className="text-white">
                  Job Type *
                </Label>
                <Select
                  value={formData.job_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, job_type: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Full-Time" className="text-white hover:bg-gray-700">
                      Full-Time
                    </SelectItem>
                    <SelectItem value="Part-Time" className="text-white hover:bg-gray-700">
                      Part-Time
                    </SelectItem>
                    <SelectItem value="Contract" className="text-white hover:bg-gray-700">
                      Contract
                    </SelectItem>
                    <SelectItem value="Internship" className="text-white hover:bg-gray-700">
                      Internship
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.job_type && <p className="text-red-400 text-sm">{errors.job_type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_level" className="text-white">
                  Experience Level
                </Label>
                <Select
                  value={formData.employment_level}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, employment_level: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Entry-Level" className="text-white hover:bg-gray-700">
                      Entry-Level
                    </SelectItem>
                    <SelectItem value="Mid-Level" className="text-white hover:bg-gray-700">
                      Mid-Level
                    </SelectItem>
                    <SelectItem value="Senior-Level" className="text-white hover:bg-gray-700">
                      Senior-Level
                    </SelectItem>
                    <SelectItem value="Executive" className="text-white hover:bg-gray-700">
                      Executive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remote_type" className="text-white">
                  Work Style
                </Label>
                <Select
                  value={formData.remote_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, remote_type: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="remote" className="text-white hover:bg-gray-700">
                      Remote
                    </SelectItem>
                    <SelectItem value="hybrid" className="text-white hover:bg-gray-700">
                      Hybrid
                    </SelectItem>
                    <SelectItem value="onsite" className="text-white hover:bg-gray-700">
                      On-site
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salary_min" className="text-white">
                  Minimum Salary
                </Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={formData.salary_min}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salary_min: e.target.value }))}
                  placeholder="e.g., 120000"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_max" className="text-white">
                  Maximum Salary
                </Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={formData.salary_max}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salary_max: e.target.value }))}
                  placeholder="e.g., 160000"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.salary_max && <p className="text-red-400 text-sm">{errors.salary_max}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expires_at" className="text-white">
                Application Deadline
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expires_at ? format(formData.expires_at, "PPP") : "Select deadline (optional)"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={formData.expires_at || undefined}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, expires_at: date || null }))}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: !!checked }))}
              />
              <Label htmlFor="featured" className="text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Featured Job (appears at top of listings)
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Job Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                rows={8}
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
              {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-white">
                Requirements *
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                placeholder="List the required skills, experience, and qualifications..."
                rows={6}
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
              {errors.requirements && <p className="text-red-400 text-sm">{errors.requirements}</p>}
            </div>

            <div className="space-y-4">
              <Label className="text-white">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag) => (
                  <Badge key={tag} className="bg-cyan-600 text-white">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-300">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag(newTag)
                    }
                  }}
                />
                <Button type="button" onClick={() => addTag(newTag)} className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.filter((tag) => !formData.tags.includes(tag)).map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(tag)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white">Benefits</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={formData.benefits.includes(benefit)}
                      onCheckedChange={() => toggleBenefit(benefit)}
                    />
                    <Label htmlFor={benefit} className="text-gray-300 text-sm">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{formData.title || "Job Title"}</CardTitle>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {formData.department || "Department"}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {formData.location || "Location"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formData.job_type || "Job Type"}
                      </div>
                    </div>
                  </div>
                  {formData.featured && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {(formData.salary_min || formData.salary_max) && (
                  <div className="flex items-center gap-1 text-emerald-400 mb-4">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      {formData.salary_min && formData.salary_max
                        ? `$${Number.parseInt(formData.salary_min).toLocaleString()} - $${Number.parseInt(formData.salary_max).toLocaleString()}`
                        : formData.salary_min
                          ? `From $${Number.parseInt(formData.salary_min).toLocaleString()}`
                          : formData.salary_max
                            ? `Up to $${Number.parseInt(formData.salary_max).toLocaleString()}`
                            : "Salary not specified"}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Description</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {formData.description || "Job description will appear here..."}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Requirements</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {formData.requirements || "Job requirements will appear here..."}
                    </p>
                  </div>

                  {formData.tags.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.benefits.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.benefits.map((benefit) => (
                          <Badge key={benefit} className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>

          <Button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? (
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
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Building, AlertCircle, Plus, X, GraduationCap, Award, Star } from "lucide-react"

interface LCAMetadataFormProps {
  formData: any
  onDataChange: (data: any) => void
  validationErrors: Record<string, string[]>
  accessibilityMode: boolean
}

export function LCAMetadataForm({ formData, onDataChange, validationErrors, accessibilityMode }: LCAMetadataFormProps) {
  const [skillInput, setSkillInput] = useState("")
  const [certificationInput, setCertificationInput] = useState("")

  const handleInputChange = (field: string, value: any) => {
    onDataChange({
      ...formData,
      [field]: value,
    })
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = formData.skills_required || []
      handleInputChange("skills_required", [...currentSkills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (index: number) => {
    const currentSkills = formData.skills_required || []
    handleInputChange(
      "skills_required",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  const addCertification = () => {
    if (certificationInput.trim()) {
      const currentCerts = formData.certifications_required || []
      handleInputChange("certifications_required", [...currentCerts, certificationInput.trim()])
      setCertificationInput("")
    }
  }

  const removeCertification = (index: number) => {
    const currentCerts = formData.certifications_required || []
    handleInputChange(
      "certifications_required",
      currentCerts.filter((_, i) => i !== index),
    )
  }

  const getFieldError = (field: string) => {
    return validationErrors[field]?.[0]
  }

  const hasFieldError = (field: string) => {
    return validationErrors[field] && validationErrors[field].length > 0
  }

  return (
    <div className="space-y-6" role="region" aria-labelledby="metadata-title">
      <div className="text-center mb-6">
        <h2 id="metadata-title" className="text-2xl font-bold text-white mb-2">
          Job Metadata & Requirements
        </h2>
        <p className="text-slate-400">Add comprehensive job details, requirements, and posting information</p>
      </div>

      {/* Posting Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Posting Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="posting_date"
                  className={`text-white ${hasFieldError("posting_date") ? "text-red-400" : ""}`}
                >
                  Posting Date *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="posting_date"
                  type="date"
                  value={formData.posting_date || new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleInputChange("posting_date", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("posting_date") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("posting_date")}
                  aria-describedby={hasFieldError("posting_date") ? "posting_date-error" : "posting_date-help"}
                />
                {hasFieldError("posting_date") && (
                  <p id="posting_date-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("posting_date")}
                  </p>
                )}
                {!hasFieldError("posting_date") && (
                  <p id="posting_date-help" className="text-slate-400 text-sm mt-1">
                    Date when this posting will be published
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="expiration_date" className="text-white">
                  Expiration Date
                </Label>
                <Input
                  id="expiration_date"
                  type="date"
                  value={formData.expiration_date || ""}
                  onChange={(e) => handleInputChange("expiration_date", e.target.value)}
                  className="bg-slate-700/50 border-slate-600/50 text-white"
                  aria-describedby="expiration_date-help"
                />
                <p id="expiration_date-help" className="text-slate-400 text-sm mt-1">
                  Optional: When this posting should expire
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority_level" className="text-white">
                  Priority Level
                </Label>
                <Select
                  value={formData.priority_level || "standard"}
                  onValueChange={(value) => handleInputChange("priority_level", value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="expedited">Expedited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="application_deadline" className="text-white">
                  Application Deadline
                </Label>
                <Input
                  id="application_deadline"
                  type="date"
                  value={formData.application_deadline || ""}
                  onChange={(e) => handleInputChange("application_deadline", e.target.value)}
                  className="bg-slate-700/50 border-slate-600/50 text-white"
                  aria-describedby="application_deadline-help"
                />
                <p id="application_deadline-help" className="text-slate-400 text-sm mt-1">
                  Optional: Last date to accept applications
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="internal_job_id" className="text-white">
                Internal Job ID
              </Label>
              <Input
                id="internal_job_id"
                value={formData.internal_job_id || ""}
                onChange={(e) => handleInputChange("internal_job_id", e.target.value)}
                placeholder="e.g., ESG-2024-001"
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                aria-describedby="internal_job_id-help"
              />
              <p id="internal_job_id-help" className="text-slate-400 text-sm mt-1">
                Optional: Internal reference number for tracking
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" aria-hidden="true" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="department"
                  className={`text-white ${hasFieldError("department") ? "text-red-400" : ""}`}
                >
                  Department *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Select
                  value={formData.department || ""}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger
                    className={`bg-slate-700/50 border-slate-600/50 text-white ${
                      hasFieldError("department") ? "border-red-500" : ""
                    }`}
                    aria-invalid={hasFieldError("department")}
                    aria-describedby={hasFieldError("department") ? "department-error" : undefined}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Product Management">Product Management</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                    <SelectItem value="SAP Consulting">SAP Consulting</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Cloud Solutions">Cloud Solutions</SelectItem>
                  </SelectContent>
                </Select>
                {hasFieldError("department") && (
                  <p id="department-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("department")}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="hiring_manager"
                  className={`text-white ${hasFieldError("hiring_manager") ? "text-red-400" : ""}`}
                >
                  Hiring Manager *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="hiring_manager"
                  value={formData.hiring_manager || ""}
                  onChange={(e) => handleInputChange("hiring_manager", e.target.value)}
                  placeholder="John Smith"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("hiring_manager") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("hiring_manager")}
                  aria-describedby={hasFieldError("hiring_manager") ? "hiring_manager-error" : undefined}
                />
                {hasFieldError("hiring_manager") && (
                  <p id="hiring_manager-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("hiring_manager")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="contact_email"
                  className={`text-white ${hasFieldError("contact_email") ? "text-red-400" : ""}`}
                >
                  Contact Email *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email || ""}
                  onChange={(e) => handleInputChange("contact_email", e.target.value)}
                  placeholder="hiring@executivesoftwareguild.com"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("contact_email") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("contact_email")}
                  aria-describedby={hasFieldError("contact_email") ? "contact_email-error" : "contact_email-help"}
                />
                {hasFieldError("contact_email") && (
                  <p id="contact_email-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("contact_email")}
                  </p>
                )}
                {!hasFieldError("contact_email") && (
                  <p id="contact_email-help" className="text-slate-400 text-sm mt-1">
                    Primary contact for this posting
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="contact_phone" className="text-white">
                  Contact Phone
                </Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={formData.contact_phone || ""}
                  onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                  aria-describedby="contact_phone-help"
                />
                <p id="contact_phone-help" className="text-slate-400 text-sm mt-1">
                  Optional: Phone number for inquiries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Job Requirements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
              Job Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education_level" className="text-white">
                  Education Level
                </Label>
                <Select
                  value={formData.education_level || ""}
                  onValueChange={(value) => handleInputChange("education_level", value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="High School">High School Diploma</SelectItem>
                    <SelectItem value="Associate">Associate Degree</SelectItem>
                    <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master">Master's Degree</SelectItem>
                    <SelectItem value="PhD">PhD/Doctorate</SelectItem>
                    <SelectItem value="Professional">Professional Certification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience_years" className="text-white">
                  Years of Experience
                </Label>
                <Input
                  id="experience_years"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experience_years || 0}
                  onChange={(e) => handleInputChange("experience_years", Number.parseInt(e.target.value) || 0)}
                  className="bg-slate-700/50 border-slate-600/50 text-white"
                  aria-describedby="experience_years-help"
                />
                <p id="experience_years-help" className="text-slate-400 text-sm mt-1">
                  Minimum years of relevant experience required
                </p>
              </div>
            </div>

            {/* Skills Required */}
            <div>
              <Label className="text-white mb-2 block">Required Skills</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Enter a required skill"
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 flex-1"
                    aria-label="Add required skill"
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    disabled={!skillInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                    aria-label="Add skill to list"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>

                {formData.skills_required && formData.skills_required.length > 0 && (
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Required skills">
                    {formData.skills_required.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1"
                        role="listitem"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 hover:bg-blue-500/30 rounded-full p-0.5"
                          aria-label={`Remove ${skill} from required skills`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Certifications Required */}
            <div>
              <Label className="text-white mb-2 block">Required Certifications</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={certificationInput}
                    onChange={(e) => setCertificationInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                    placeholder="Enter a required certification"
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 flex-1"
                    aria-label="Add required certification"
                  />
                  <Button
                    type="button"
                    onClick={addCertification}
                    disabled={!certificationInput.trim()}
                    className="bg-green-600 hover:bg-green-700"
                    aria-label="Add certification to list"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>

                {formData.certifications_required && formData.certifications_required.length > 0 && (
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Required certifications">
                    {formData.certifications_required.map((cert: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1"
                        role="listitem"
                      >
                        <Award className="w-3 h-3" aria-hidden="true" />
                        {cert}
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="ml-1 hover:bg-green-500/30 rounded-full p-0.5"
                          aria-label={`Remove ${cert} from required certifications`}
                        >
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Work Arrangements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5" aria-hidden="true" />
              Work Arrangements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remote_work_eligible"
                    checked={formData.remote_work_eligible || false}
                    onCheckedChange={(checked) => handleInputChange("remote_work_eligible", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="remote_work_eligible" className="text-white cursor-pointer">
                    Remote Work Eligible
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="travel_required"
                    checked={formData.travel_required || false}
                    onCheckedChange={(checked) => handleInputChange("travel_required", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="travel_required" className="text-white cursor-pointer">
                    Travel Required
                  </Label>
                </div>

                {formData.travel_required && (
                  <div className="ml-6">
                    <Label htmlFor="travel_percentage" className="text-white">
                      Travel Percentage
                    </Label>
                    <Input
                      id="travel_percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.travel_percentage || 0}
                      onChange={(e) => handleInputChange("travel_percentage", Number.parseInt(e.target.value) || 0)}
                      className="bg-slate-700/50 border-slate-600/50 text-white"
                      aria-describedby="travel_percentage-help"
                    />
                    <p id="travel_percentage-help" className="text-slate-400 text-sm mt-1">
                      Percentage of time requiring travel (0-100%)
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="security_clearance_required"
                    checked={formData.security_clearance_required || false}
                    onCheckedChange={(checked) => handleInputChange("security_clearance_required", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="security_clearance_required" className="text-white cursor-pointer">
                    Security Clearance Required
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="salary_range_public"
                    checked={formData.salary_range_public !== false}
                    onCheckedChange={(checked) => handleInputChange("salary_range_public", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="salary_range_public" className="text-white cursor-pointer">
                    Make Salary Range Public
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="legal_review_required"
                    checked={formData.legal_review_required || false}
                    onCheckedChange={(checked) => handleInputChange("legal_review_required", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="legal_review_required" className="text-white cursor-pointer">
                    Requires Legal Review
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="compliance_checked"
                    checked={formData.compliance_checked || false}
                    onCheckedChange={(checked) => handleInputChange("compliance_checked", checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor="compliance_checked" className="text-white cursor-pointer">
                    Compliance Verified
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5" aria-hidden="true" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="benefits_summary" className="text-white">
                Benefits Summary
              </Label>
              <Textarea
                id="benefits_summary"
                value={formData.benefits_summary || ""}
                onChange={(e) => handleInputChange("benefits_summary", e.target.value)}
                placeholder="Health insurance, 401k, flexible PTO, professional development..."
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[80px]"
                aria-describedby="benefits_summary-help"
              />
              <p id="benefits_summary-help" className="text-slate-400 text-sm mt-1">
                Optional: Brief overview of benefits and perks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interview_process" className="text-white">
                  Interview Process
                </Label>
                <Textarea
                  id="interview_process"
                  value={formData.interview_process || ""}
                  onChange={(e) => handleInputChange("interview_process", e.target.value)}
                  placeholder="Phone screening, technical interview, final interview..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[80px]"
                  aria-describedby="interview_process-help"
                />
                <p id="interview_process-help" className="text-slate-400 text-sm mt-1">
                  Optional: Overview of the interview process
                </p>
              </div>

              <div>
                <Label htmlFor="onboarding_timeline" className="text-white">
                  Onboarding Timeline
                </Label>
                <Textarea
                  id="onboarding_timeline"
                  value={formData.onboarding_timeline || ""}
                  onChange={(e) => handleInputChange("onboarding_timeline", e.target.value)}
                  placeholder="2-week onboarding program, mentorship assignment..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[80px]"
                  aria-describedby="onboarding_timeline-help"
                />
                <p id="onboarding_timeline-help" className="text-slate-400 text-sm mt-1">
                  Optional: Expected onboarding and start timeline
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Form Validation Summary */}
      {Object.keys(validationErrors).length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
            <AlertDescription className="text-red-300">
              <strong>Please correct the following errors:</strong>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {Object.entries(validationErrors).map(([field, errors]) => (
                  <li key={field}>
                    {field.replace("_", " ")}: {errors[0]}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}

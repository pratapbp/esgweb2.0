"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Calendar, DollarSign, MapPin, Building, Save, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LCAFormData {
  // Job Information
  job_title: string
  job_description: string
  soc_code: string
  soc_title: string

  // Employer Information
  employer_name: string
  employer_address: string
  employer_city: string
  employer_state: string
  employer_zip: string

  // Worksite Information
  worksite_address: string
  worksite_city: string
  worksite_state: string
  worksite_postal_code: string

  // Employment Details
  employment_start_date: string
  employment_end_date: string
  full_time_position: boolean
  total_workers: number

  // Wage Information
  wage_rate_from: string
  wage_rate_to: string
  wage_unit: string
  prevailing_wage: string
  pw_unit_of_pay: string
  pw_source: string

  // Visa Information
  visa_class: string
  case_number: string
  case_status: string

  // Additional Information
  requirements: string
  benefits: string
  contact_info: string

  // Compliance
  public_disclosure: boolean
  wage_determination: boolean
  notice_posted: boolean
}

const initialData: LCAFormData = {
  job_title: "",
  job_description: "",
  soc_code: "",
  soc_title: "",
  employer_name: "Executive Software Guild Inc.",
  employer_address: "8751 Collin McKinney PKWY, Suite 601",
  employer_city: "McKinney",
  employer_state: "TX",
  employer_zip: "75070",
  worksite_address: "",
  worksite_city: "",
  worksite_state: "",
  worksite_postal_code: "",
  employment_start_date: "",
  employment_end_date: "",
  full_time_position: true,
  total_workers: 1,
  wage_rate_from: "",
  wage_rate_to: "",
  wage_unit: "Year",
  prevailing_wage: "",
  pw_unit_of_pay: "Year",
  pw_source: "OES",
  visa_class: "H-1B",
  case_number: "",
  case_status: "PENDING",
  requirements: "",
  benefits: "",
  contact_info: "",
  public_disclosure: false,
  wage_determination: false,
  notice_posted: false,
}

const VISA_CLASSES = ["H-1B", "H-1B1", "E-3"]
const WAGE_UNITS = ["Hour", "Week", "Bi-Weekly", "Month", "Year"]
const PW_SOURCES = ["OES", "CBA", "DBA", "SCA", "Other"]
const CASE_STATUSES = ["PENDING", "CERTIFIED", "DENIED", "WITHDRAWN"]
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

export default function EnhancedLCAForm() {
  const [formData, setFormData] = useState<LCAFormData>(initialData)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const handleInputChange = (field: keyof LCAFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.job_title) newErrors.job_title = "Job title is required"
    if (!formData.job_description) newErrors.job_description = "Job description is required"
    if (!formData.soc_code) newErrors.soc_code = "SOC code is required"
    if (!formData.soc_title) newErrors.soc_title = "SOC title is required"
    if (!formData.worksite_address) newErrors.worksite_address = "Worksite address is required"
    if (!formData.worksite_city) newErrors.worksite_city = "Worksite city is required"
    if (!formData.worksite_state) newErrors.worksite_state = "Worksite state is required"
    if (!formData.worksite_postal_code) newErrors.worksite_postal_code = "Worksite postal code is required"
    if (!formData.employment_start_date) newErrors.employment_start_date = "Employment start date is required"
    if (!formData.employment_end_date) newErrors.employment_end_date = "Employment end date is required"
    if (!formData.wage_rate_from) newErrors.wage_rate_from = "Wage rate is required"
    if (!formData.prevailing_wage) newErrors.prevailing_wage = "Prevailing wage is required"
    if (!formData.case_number) newErrors.case_number = "Case number is required"

    // Date validation
    if (formData.employment_start_date && formData.employment_end_date) {
      const startDate = new Date(formData.employment_start_date)
      const endDate = new Date(formData.employment_end_date)
      if (startDate >= endDate) {
        newErrors.employment_end_date = "End date must be after start date"
      }
    }

    // Wage validation
    if (formData.wage_rate_from && formData.wage_rate_to) {
      const fromWage = Number.parseFloat(formData.wage_rate_from)
      const toWage = Number.parseFloat(formData.wage_rate_to)
      if (fromWage > toWage) {
        newErrors.wage_rate_to = "Maximum wage must be greater than minimum wage"
      }
    }

    // Compliance validation
    if (!formData.public_disclosure) newErrors.public_disclosure = "Public disclosure acknowledgment is required"
    if (!formData.wage_determination) newErrors.wage_determination = "Wage determination acknowledgment is required"
    if (!formData.notice_posted) newErrors.notice_posted = "Notice posting acknowledgment is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (isDraft = false) => {
    if (!isDraft && !validateForm()) return

    try {
      setLoading(true)

      const submitData = {
        ...formData,
        case_status: isDraft ? "DRAFT" : formData.case_status,
        wage_rate_from: Number.parseFloat(formData.wage_rate_from) || 0,
        wage_rate_to: Number.parseFloat(formData.wage_rate_to) || Number.parseFloat(formData.wage_rate_from) || 0,
        prevailing_wage: Number.parseFloat(formData.prevailing_wage) || 0,
      }

      const response = await fetch("/api/lca-postings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit LCA posting")
      }

      toast({
        title: isDraft ? "Draft Saved!" : "LCA Submitted!",
        description: isDraft
          ? "Your LCA draft has been saved successfully."
          : "Your LCA posting has been submitted for DOL compliance review.",
      })

      // Reset form
      setFormData(initialData)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your LCA posting. Please try again.",
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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-2xl">Upload LCA Posting</CardTitle>
              <CardDescription className="text-gray-400">
                Create a new Labor Condition Application for DOL compliance
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Job Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-400" />
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-gray-300">
                Job Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => handleInputChange("job_title", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Software Engineer"
              />
              {errors.job_title && <p className="text-red-400 text-sm">{errors.job_title}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">
                Visa Class <span className="text-red-400">*</span>
              </Label>
              <Select value={formData.visa_class} onValueChange={(value) => handleInputChange("visa_class", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {VISA_CLASSES.map((visa) => (
                    <SelectItem key={visa} value={visa}>
                      {visa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soc_code" className="text-gray-300">
                SOC Code <span className="text-red-400">*</span>
              </Label>
              <Input
                id="soc_code"
                value={formData.soc_code}
                onChange={(e) => handleInputChange("soc_code", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="15-1132"
              />
              {errors.soc_code && <p className="text-red-400 text-sm">{errors.soc_code}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="soc_title" className="text-gray-300">
                SOC Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="soc_title"
                value={formData.soc_title}
                onChange={(e) => handleInputChange("soc_title", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Software Developers, Applications"
              />
              {errors.soc_title && <p className="text-red-400 text-sm">{errors.soc_title}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_description" className="text-gray-300">
              Job Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="job_description"
              value={formData.job_description}
              onChange={(e) => handleInputChange("job_description", e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
              placeholder="Detailed job description including duties and responsibilities..."
            />
            {errors.job_description && <p className="text-red-400 text-sm">{errors.job_description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-gray-300">
              Job Requirements
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white min-h-[100px]"
              placeholder="Education, experience, and skill requirements..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Worksite Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-400" />
            Worksite Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="worksite_address" className="text-gray-300">
              Worksite Address <span className="text-red-400">*</span>
            </Label>
            <Input
              id="worksite_address"
              value={formData.worksite_address}
              onChange={(e) => handleInputChange("worksite_address", e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white"
              placeholder="Street address where work will be performed"
            />
            {errors.worksite_address && <p className="text-red-400 text-sm">{errors.worksite_address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worksite_city" className="text-gray-300">
                City <span className="text-red-400">*</span>
              </Label>
              <Input
                id="worksite_city"
                value={formData.worksite_city}
                onChange={(e) => handleInputChange("worksite_city", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="City"
              />
              {errors.worksite_city && <p className="text-red-400 text-sm">{errors.worksite_city}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">
                State <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.worksite_state}
                onValueChange={(value) => handleInputChange("worksite_state", value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.worksite_state && <p className="text-red-400 text-sm">{errors.worksite_state}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="worksite_postal_code" className="text-gray-300">
                ZIP Code <span className="text-red-400">*</span>
              </Label>
              <Input
                id="worksite_postal_code"
                value={formData.worksite_postal_code}
                onChange={(e) => handleInputChange("worksite_postal_code", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="12345"
              />
              {errors.worksite_postal_code && <p className="text-red-400 text-sm">{errors.worksite_postal_code}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Details */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Employment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employment_start_date" className="text-gray-300">
                Employment Start Date <span className="text-red-400">*</span>
              </Label>
              <Input
                id="employment_start_date"
                type="date"
                value={formData.employment_start_date}
                onChange={(e) => handleInputChange("employment_start_date", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
              {errors.employment_start_date && <p className="text-red-400 text-sm">{errors.employment_start_date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employment_end_date" className="text-gray-300">
                Employment End Date <span className="text-red-400">*</span>
              </Label>
              <Input
                id="employment_end_date"
                type="date"
                value={formData.employment_end_date}
                onChange={(e) => handleInputChange("employment_end_date", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
              {errors.employment_end_date && <p className="text-red-400 text-sm">{errors.employment_end_date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_workers" className="text-gray-300">
                Total Workers
              </Label>
              <Input
                id="total_workers"
                type="number"
                min="1"
                value={formData.total_workers}
                onChange={(e) => handleInputChange("total_workers", Number.parseInt(e.target.value) || 1)}
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">
                Case Status <span className="text-red-400">*</span>
              </Label>
              <Select value={formData.case_status} onValueChange={(value) => handleInputChange("case_status", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {CASE_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="full_time_position"
              checked={formData.full_time_position}
              onCheckedChange={(checked) => handleInputChange("full_time_position", checked)}
            />
            <Label htmlFor="full_time_position" className="text-gray-300">
              This is a full-time position
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="case_number" className="text-gray-300">
              Case Number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="case_number"
              value={formData.case_number}
              onChange={(e) => handleInputChange("case_number", e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white"
              placeholder="I-200-24001-123456"
            />
            {errors.case_number && <p className="text-red-400 text-sm">{errors.case_number}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Wage Information */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-400" />
            Wage Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wage_rate_from" className="text-gray-300">
                Wage Rate From <span className="text-red-400">*</span>
              </Label>
              <Input
                id="wage_rate_from"
                type="number"
                step="0.01"
                value={formData.wage_rate_from}
                onChange={(e) => handleInputChange("wage_rate_from", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="149781"
              />
              {errors.wage_rate_from && <p className="text-red-400 text-sm">{errors.wage_rate_from}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wage_rate_to" className="text-gray-300">
                Wage Rate To
              </Label>
              <Input
                id="wage_rate_to"
                type="number"
                step="0.01"
                value={formData.wage_rate_to}
                onChange={(e) => handleInputChange("wage_rate_to", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="149781"
              />
              {errors.wage_rate_to && <p className="text-red-400 text-sm">{errors.wage_rate_to}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Wage Unit</Label>
              <Select value={formData.wage_unit} onValueChange={(value) => handleInputChange("wage_unit", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {WAGE_UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prevailing_wage" className="text-gray-300">
                Prevailing Wage <span className="text-red-400">*</span>
              </Label>
              <Input
                id="prevailing_wage"
                type="number"
                step="0.01"
                value={formData.prevailing_wage}
                onChange={(e) => handleInputChange("prevailing_wage", e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="149781"
              />
              {errors.prevailing_wage && <p className="text-red-400 text-sm">{errors.prevailing_wage}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">PW Unit of Pay</Label>
              <Select
                value={formData.pw_unit_of_pay}
                onValueChange={(value) => handleInputChange("pw_unit_of_pay", value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {WAGE_UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">PW Source</Label>
              <Select value={formData.pw_source} onValueChange={(value) => handleInputChange("pw_source", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {PW_SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DOL Compliance */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            DOL Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-emerald-500/10 border-emerald-500/30">
            <Shield className="h-4 w-4 text-emerald-400" />
            <AlertDescription className="text-gray-300">
              <strong className="text-emerald-400">Important:</strong> All LCA postings must comply with Department of
              Labor regulations. Please ensure all information is accurate and complete.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="public_disclosure"
                checked={formData.public_disclosure}
                onCheckedChange={(checked) => handleInputChange("public_disclosure", checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="public_disclosure" className="text-gray-300">
                  Public Disclosure <span className="text-red-400">*</span>
                </Label>
                <p className="text-sm text-gray-400">
                  I acknowledge that this LCA will be made available for public examination at the worksite.
                </p>
              </div>
            </div>
            {errors.public_disclosure && <p className="text-red-400 text-sm">{errors.public_disclosure}</p>}

            <div className="flex items-start space-x-2">
              <Checkbox
                id="wage_determination"
                checked={formData.wage_determination}
                onCheckedChange={(checked) => handleInputChange("wage_determination", checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="wage_determination" className="text-gray-300">
                  Wage Determination <span className="text-red-400">*</span>
                </Label>
                <p className="text-sm text-gray-400">
                  I certify that the wage offered meets or exceeds the prevailing wage determination.
                </p>
              </div>
            </div>
            {errors.wage_determination && <p className="text-red-400 text-sm">{errors.wage_determination}</p>}

            <div className="flex items-start space-x-2">
              <Checkbox
                id="notice_posted"
                checked={formData.notice_posted}
                onCheckedChange={(checked) => handleInputChange("notice_posted", checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="notice_posted" className="text-gray-300">
                  Notice Posting <span className="text-red-400">*</span>
                </Label>
                <p className="text-sm text-gray-400">
                  I confirm that the required notice has been or will be posted at the worksite.
                </p>
              </div>
            </div>
            {errors.notice_posted && <p className="text-red-400 text-sm">{errors.notice_posted}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleSubmit(true)}
          disabled={loading}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>

        <Button onClick={() => handleSubmit(false)} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit LCA
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

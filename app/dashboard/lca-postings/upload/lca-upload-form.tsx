"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateLCAButton } from "@/components/ui/create-lca-button"
import { useLCAValidation } from "@/hooks/use-lca-validation"
import { FileText, Calendar, DollarSign, MapPin, Building, User, Users } from "lucide-react"

interface LCAFormData {
  // Job Information
  jobTitle: string
  caseNumber: string
  socCode: string
  socTitle: string

  // Employment Period
  employmentStartDate: string
  employmentEndDate: string

  // Wage Information
  wageRate: number
  wageUnit: string
  prevailingWage: number

  // Work Location
  workLocationAddress: string
  workLocationCity: string
  workLocationState: string
  workLocationZip: string

  // Employer Information
  employerName: string
  employerFEIN: string
  employerAddress: string
  employerCity: string
  employerState: string
  employerZip: string

  // Contact Information
  contactName: string
  contactTitle: string
  contactEmail: string
  contactPhone: string

  // Additional Information
  totalWorkers: number
  fullTimePositions: number
  partTimePositions: number
}

const initialFormData: LCAFormData = {
  jobTitle: "",
  caseNumber: "",
  socCode: "",
  socTitle: "",
  employmentStartDate: "",
  employmentEndDate: "",
  wageRate: 0,
  wageUnit: "year",
  prevailingWage: 0,
  workLocationAddress: "",
  workLocationCity: "",
  workLocationState: "",
  workLocationZip: "",
  employerName: "",
  employerFEIN: "",
  employerAddress: "",
  employerCity: "",
  employerState: "",
  employerZip: "",
  contactName: "",
  contactTitle: "",
  contactEmail: "",
  contactPhone: "",
  totalWorkers: 0,
  fullTimePositions: 0,
  partTimePositions: 0,
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

export default function LCAUploadForm() {
  const [formData, setFormData] = useState<LCAFormData>(initialFormData)
  const { isValid, errors, missingFields, completionPercentage } = useLCAValidation(formData)

  const updateFormData = (field: keyof LCAFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const getFieldError = (field: keyof LCAFormData) => {
    return errors[field] || ""
  }

  const isFieldInvalid = (field: keyof LCAFormData) => {
    return !!errors[field]
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pb-32">
      {/* Progress Header */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Create LCA Posting</h1>
          <div className="text-sm text-gray-600">{completionPercentage}% Complete</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              completionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {missingFields.length > 0 && (
          <p className="text-sm text-red-600 mt-2">{missingFields.length} required fields remaining</p>
        )}
      </div>

      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Job Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => updateFormData("jobTitle", e.target.value)}
                placeholder="e.g., Software Engineer"
                className={isFieldInvalid("jobTitle") ? "border-red-500" : ""}
              />
              {getFieldError("jobTitle") && <p className="text-sm text-red-600 mt-1">{getFieldError("jobTitle")}</p>}
            </div>
            <div>
              <Label htmlFor="caseNumber">Case Number *</Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => updateFormData("caseNumber", e.target.value)}
                placeholder="e.g., H-1B-2024-001"
                className={isFieldInvalid("caseNumber") ? "border-red-500" : ""}
              />
              {getFieldError("caseNumber") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("caseNumber")}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="socCode">SOC Code *</Label>
              <Input
                id="socCode"
                value={formData.socCode}
                onChange={(e) => updateFormData("socCode", e.target.value)}
                placeholder="e.g., 15-1132"
                className={isFieldInvalid("socCode") ? "border-red-500" : ""}
              />
              {getFieldError("socCode") && <p className="text-sm text-red-600 mt-1">{getFieldError("socCode")}</p>}
            </div>
            <div>
              <Label htmlFor="socTitle">SOC Title *</Label>
              <Input
                id="socTitle"
                value={formData.socTitle}
                onChange={(e) => updateFormData("socTitle", e.target.value)}
                placeholder="e.g., Software Developers, Applications"
                className={isFieldInvalid("socTitle") ? "border-red-500" : ""}
              />
              {getFieldError("socTitle") && <p className="text-sm text-red-600 mt-1">{getFieldError("socTitle")}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Period */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Employment Period</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employmentStartDate">Start Date *</Label>
              <Input
                id="employmentStartDate"
                type="date"
                value={formData.employmentStartDate}
                onChange={(e) => updateFormData("employmentStartDate", e.target.value)}
                className={isFieldInvalid("employmentStartDate") ? "border-red-500" : ""}
              />
              {getFieldError("employmentStartDate") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employmentStartDate")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="employmentEndDate">End Date *</Label>
              <Input
                id="employmentEndDate"
                type="date"
                value={formData.employmentEndDate}
                onChange={(e) => updateFormData("employmentEndDate", e.target.value)}
                className={isFieldInvalid("employmentEndDate") ? "border-red-500" : ""}
              />
              {getFieldError("employmentEndDate") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employmentEndDate")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Wage Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="wageRate">Wage Rate *</Label>
              <Input
                id="wageRate"
                type="number"
                value={formData.wageRate || ""}
                onChange={(e) => updateFormData("wageRate", Number.parseFloat(e.target.value) || 0)}
                placeholder="e.g., 85000"
                className={isFieldInvalid("wageRate") ? "border-red-500" : ""}
              />
              {getFieldError("wageRate") && <p className="text-sm text-red-600 mt-1">{getFieldError("wageRate")}</p>}
            </div>
            <div>
              <Label htmlFor="wageUnit">Wage Unit *</Label>
              <Select value={formData.wageUnit} onValueChange={(value) => updateFormData("wageUnit", value)}>
                <SelectTrigger className={isFieldInvalid("wageUnit") ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Per Year</SelectItem>
                  <SelectItem value="hour">Per Hour</SelectItem>
                  <SelectItem value="month">Per Month</SelectItem>
                </SelectContent>
              </Select>
              {getFieldError("wageUnit") && <p className="text-sm text-red-600 mt-1">{getFieldError("wageUnit")}</p>}
            </div>
            <div>
              <Label htmlFor="prevailingWage">Prevailing Wage *</Label>
              <Input
                id="prevailingWage"
                type="number"
                value={formData.prevailingWage || ""}
                onChange={(e) => updateFormData("prevailingWage", Number.parseFloat(e.target.value) || 0)}
                placeholder="e.g., 80000"
                className={isFieldInvalid("prevailingWage") ? "border-red-500" : ""}
              />
              {getFieldError("prevailingWage") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("prevailingWage")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Work Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="workLocationAddress">Address *</Label>
            <Input
              id="workLocationAddress"
              value={formData.workLocationAddress}
              onChange={(e) => updateFormData("workLocationAddress", e.target.value)}
              placeholder="e.g., 123 Main Street"
              className={isFieldInvalid("workLocationAddress") ? "border-red-500" : ""}
            />
            {getFieldError("workLocationAddress") && (
              <p className="text-sm text-red-600 mt-1">{getFieldError("workLocationAddress")}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="workLocationCity">City *</Label>
              <Input
                id="workLocationCity"
                value={formData.workLocationCity}
                onChange={(e) => updateFormData("workLocationCity", e.target.value)}
                placeholder="e.g., San Francisco"
                className={isFieldInvalid("workLocationCity") ? "border-red-500" : ""}
              />
              {getFieldError("workLocationCity") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("workLocationCity")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="workLocationState">State *</Label>
              <Select
                value={formData.workLocationState}
                onValueChange={(value) => updateFormData("workLocationState", value)}
              >
                <SelectTrigger className={isFieldInvalid("workLocationState") ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("workLocationState") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("workLocationState")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="workLocationZip">ZIP Code *</Label>
              <Input
                id="workLocationZip"
                value={formData.workLocationZip}
                onChange={(e) => updateFormData("workLocationZip", e.target.value)}
                placeholder="e.g., 94105"
                className={isFieldInvalid("workLocationZip") ? "border-red-500" : ""}
              />
              {getFieldError("workLocationZip") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("workLocationZip")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Employer Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employerName">Company Name *</Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => updateFormData("employerName", e.target.value)}
                placeholder="e.g., Tech Corp Inc."
                className={isFieldInvalid("employerName") ? "border-red-500" : ""}
              />
              {getFieldError("employerName") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employerName")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="employerFEIN">FEIN *</Label>
              <Input
                id="employerFEIN"
                value={formData.employerFEIN}
                onChange={(e) => updateFormData("employerFEIN", e.target.value)}
                placeholder="e.g., 12-3456789"
                className={isFieldInvalid("employerFEIN") ? "border-red-500" : ""}
              />
              {getFieldError("employerFEIN") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employerFEIN")}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="employerAddress">Address *</Label>
            <Input
              id="employerAddress"
              value={formData.employerAddress}
              onChange={(e) => updateFormData("employerAddress", e.target.value)}
              placeholder="e.g., 456 Business Ave"
              className={isFieldInvalid("employerAddress") ? "border-red-500" : ""}
            />
            {getFieldError("employerAddress") && (
              <p className="text-sm text-red-600 mt-1">{getFieldError("employerAddress")}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="employerCity">City *</Label>
              <Input
                id="employerCity"
                value={formData.employerCity}
                onChange={(e) => updateFormData("employerCity", e.target.value)}
                placeholder="e.g., San Francisco"
                className={isFieldInvalid("employerCity") ? "border-red-500" : ""}
              />
              {getFieldError("employerCity") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employerCity")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="employerState">State *</Label>
              <Select value={formData.employerState} onValueChange={(value) => updateFormData("employerState", value)}>
                <SelectTrigger className={isFieldInvalid("employerState") ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError("employerState") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employerState")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="employerZip">ZIP Code *</Label>
              <Input
                id="employerZip"
                value={formData.employerZip}
                onChange={(e) => updateFormData("employerZip", e.target.value)}
                placeholder="e.g., 94105"
                className={isFieldInvalid("employerZip") ? "border-red-500" : ""}
              />
              {getFieldError("employerZip") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("employerZip")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="e.g., John Smith"
                className={isFieldInvalid("contactName") ? "border-red-500" : ""}
              />
              {getFieldError("contactName") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("contactName")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactTitle">Contact Title *</Label>
              <Input
                id="contactTitle"
                value={formData.contactTitle}
                onChange={(e) => updateFormData("contactTitle", e.target.value)}
                placeholder="e.g., HR Manager"
                className={isFieldInvalid("contactTitle") ? "border-red-500" : ""}
              />
              {getFieldError("contactTitle") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("contactTitle")}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="e.g., john.smith@company.com"
                className={isFieldInvalid("contactEmail") ? "border-red-500" : ""}
              />
              {getFieldError("contactEmail") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("contactEmail")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone *</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                placeholder="e.g., (555) 123-4567"
                className={isFieldInvalid("contactPhone") ? "border-red-500" : ""}
              />
              {getFieldError("contactPhone") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("contactPhone")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Additional Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalWorkers">Total Workers *</Label>
              <Input
                id="totalWorkers"
                type="number"
                value={formData.totalWorkers || ""}
                onChange={(e) => updateFormData("totalWorkers", Number.parseInt(e.target.value) || 0)}
                placeholder="e.g., 100"
                className={isFieldInvalid("totalWorkers") ? "border-red-500" : ""}
              />
              {getFieldError("totalWorkers") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("totalWorkers")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="fullTimePositions">Full-time Positions *</Label>
              <Input
                id="fullTimePositions"
                type="number"
                value={formData.fullTimePositions || ""}
                onChange={(e) => updateFormData("fullTimePositions", Number.parseInt(e.target.value) || 0)}
                placeholder="e.g., 1"
                className={isFieldInvalid("fullTimePositions") ? "border-red-500" : ""}
              />
              {getFieldError("fullTimePositions") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("fullTimePositions")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="partTimePositions">Part-time Positions *</Label>
              <Input
                id="partTimePositions"
                type="number"
                value={formData.partTimePositions || ""}
                onChange={(e) => updateFormData("partTimePositions", Number.parseInt(e.target.value) || 0)}
                placeholder="e.g., 0"
                className={isFieldInvalid("partTimePositions") ? "border-red-500" : ""}
              />
              {getFieldError("partTimePositions") && (
                <p className="text-sm text-red-600 mt-1">{getFieldError("partTimePositions")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create LCA Button */}
      <CreateLCAButton
        formData={formData}
        isValid={isValid}
        missingFields={missingFields}
        completionPercentage={completionPercentage}
      />
    </div>
  )
}

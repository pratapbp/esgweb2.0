"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertCircle, DollarSign, MapPin, Calendar, Briefcase } from "lucide-react"

interface LCAUploadFormProps {
  formData: any
  onDataChange: (data: any) => void
  validationErrors: Record<string, string[]>
  accessibilityMode: boolean
}

export function LCAUploadForm({ formData, onDataChange, validationErrors, accessibilityMode }: LCAUploadFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (field: string, value: any) => {
    onDataChange({
      ...formData,
      [field]: value,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getFieldError = (field: string) => {
    return validationErrors[field]?.[0]
  }

  const hasFieldError = (field: string) => {
    return validationErrors[field] && validationErrors[field].length > 0
  }

  return (
    <div className="space-y-6" role="region" aria-labelledby="lca-info-title">
      <div className="text-center mb-6">
        <h2 id="lca-info-title" className="text-2xl font-bold text-white mb-2">
          LCA Information
        </h2>
        <p className="text-slate-400">
          Enter the basic Labor Condition Application details from your certified DOL document
        </p>
      </div>

      {/* Case Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" aria-hidden="true" />
              Case Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="case_number"
                  className={`text-white ${hasFieldError("case_number") ? "text-red-400" : ""}`}
                >
                  ETA Case Number *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="case_number"
                  value={formData.case_number || ""}
                  onChange={(e) => handleInputChange("case_number", e.target.value)}
                  onFocus={() => setFocusedField("case_number")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="I-200-XXXXX-XXXXXX"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("case_number") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("case_number")}
                  aria-describedby={hasFieldError("case_number") ? "case_number-error" : "case_number-help"}
                />
                {hasFieldError("case_number") && (
                  <p id="case_number-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("case_number")}
                  </p>
                )}
                {focusedField === "case_number" && !hasFieldError("case_number") && (
                  <p id="case_number-help" className="text-slate-400 text-sm mt-1">
                    Enter the ETA case number from your certified LCA document
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="visa_class"
                  className={`text-white ${hasFieldError("visa_class") ? "text-red-400" : ""}`}
                >
                  Visa Class *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Select
                  value={formData.visa_class || ""}
                  onValueChange={(value) => handleInputChange("visa_class", value)}
                >
                  <SelectTrigger
                    className={`bg-slate-700/50 border-slate-600/50 text-white ${
                      hasFieldError("visa_class") ? "border-red-500" : ""
                    }`}
                    aria-invalid={hasFieldError("visa_class")}
                    aria-describedby={hasFieldError("visa_class") ? "visa_class-error" : undefined}
                  >
                    <SelectValue placeholder="Select visa class" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="H-1B">H-1B - Specialty Occupation</SelectItem>
                    <SelectItem value="H-1B1">H-1B1 - Free Trade Agreement</SelectItem>
                    <SelectItem value="E-3">E-3 - Australian Specialty Occupation</SelectItem>
                  </SelectContent>
                </Select>
                {hasFieldError("visa_class") && (
                  <p id="visa_class-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("visa_class")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="case_status" className="text-white">
                Case Status
              </Label>
              <Select
                value={formData.case_status || "Certified"}
                onValueChange={(value) => handleInputChange("case_status", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Certified">Certified</SelectItem>
                  <SelectItem value="Certified-Withdrawn">Certified-Withdrawn</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Job Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5" aria-hidden="true" />
              Job Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="job_title" className={`text-white ${hasFieldError("job_title") ? "text-red-400" : ""}`}>
                Job Title *{accessibilityMode && <span className="sr-only">Required field</span>}
              </Label>
              <Input
                id="job_title"
                value={formData.job_title || ""}
                onChange={(e) => handleInputChange("job_title", e.target.value)}
                onFocus={() => setFocusedField("job_title")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g., Senior Software Engineer"
                className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                  hasFieldError("job_title") ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={hasFieldError("job_title")}
                aria-describedby={hasFieldError("job_title") ? "job_title-error" : undefined}
              />
              {hasFieldError("job_title") && (
                <p id="job_title-error" className="text-red-400 text-sm mt-1" role="alert">
                  <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {getFieldError("job_title")}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soc_code" className={`text-white ${hasFieldError("soc_code") ? "text-red-400" : ""}`}>
                  SOC Code *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="soc_code"
                  value={formData.soc_code || ""}
                  onChange={(e) => handleInputChange("soc_code", e.target.value)}
                  onFocus={() => setFocusedField("soc_code")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="15-1132"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("soc_code") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("soc_code")}
                  aria-describedby={hasFieldError("soc_code") ? "soc_code-error" : "soc_code-help"}
                />
                {hasFieldError("soc_code") && (
                  <p id="soc_code-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("soc_code")}
                  </p>
                )}
                {focusedField === "soc_code" && !hasFieldError("soc_code") && (
                  <p id="soc_code-help" className="text-slate-400 text-sm mt-1">
                    Standard Occupational Classification code (XX-XXXX format)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="soc_title" className={`text-white ${hasFieldError("soc_title") ? "text-red-400" : ""}`}>
                  SOC Title *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="soc_title"
                  value={formData.soc_title || ""}
                  onChange={(e) => handleInputChange("soc_title", e.target.value)}
                  placeholder="Software Developers, Applications"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("soc_title") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("soc_title")}
                  aria-describedby={hasFieldError("soc_title") ? "soc_title-error" : undefined}
                />
                {hasFieldError("soc_title") && (
                  <p id="soc_title-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("soc_title")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="employer_name" className="text-white">
                Employer Name *{accessibilityMode && <span className="sr-only">Required field</span>}
              </Label>
              <Input
                id="employer_name"
                value={formData.employer_name || "Executive Software Guild, Inc."}
                onChange={(e) => handleInputChange("employer_name", e.target.value)}
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                readOnly
                aria-describedby="employer_name-help"
              />
              <p id="employer_name-help" className="text-slate-400 text-sm mt-1">
                This field is pre-filled with your organization name
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job_description" className="text-white">
                  Job Description
                </Label>
                <Textarea
                  id="job_description"
                  value={formData.job_description || ""}
                  onChange={(e) => handleInputChange("job_description", e.target.value)}
                  placeholder="Detailed job description and responsibilities..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[100px]"
                  aria-describedby="job_description-help"
                />
                <p id="job_description-help" className="text-slate-400 text-sm mt-1">
                  Optional: Provide a detailed description of job duties and responsibilities
                </p>
              </div>

              <div>
                <Label htmlFor="requirements" className="text-white">
                  Requirements
                </Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements || ""}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="Education, experience, and skill requirements..."
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[100px]"
                  aria-describedby="requirements-help"
                />
                <p id="requirements-help" className="text-slate-400 text-sm mt-1">
                  Optional: List education, experience, and skill requirements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Employment Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="employment_start_date"
                  className={`text-white ${hasFieldError("employment_start_date") ? "text-red-400" : ""}`}
                >
                  Employment Start Date *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="employment_start_date"
                  type="date"
                  value={formData.employment_start_date || ""}
                  onChange={(e) => handleInputChange("employment_start_date", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("employment_start_date") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("employment_start_date")}
                  aria-describedby={hasFieldError("employment_start_date") ? "employment_start_date-error" : undefined}
                />
                {hasFieldError("employment_start_date") && (
                  <p id="employment_start_date-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("employment_start_date")}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="employment_end_date"
                  className={`text-white ${hasFieldError("employment_end_date") ? "text-red-400" : ""}`}
                >
                  Employment End Date *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="employment_end_date"
                  type="date"
                  value={formData.employment_end_date || ""}
                  onChange={(e) => handleInputChange("employment_end_date", e.target.value)}
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("employment_end_date") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("employment_end_date")}
                  aria-describedby={hasFieldError("employment_end_date") ? "employment_end_date-error" : undefined}
                />
                {hasFieldError("employment_end_date") && (
                  <p id="employment_end_date-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("employment_end_date")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="full_time_position"
                  checked={formData.full_time_position || false}
                  onCheckedChange={(checked) => handleInputChange("full_time_position", checked)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="full_time_position" className="text-white cursor-pointer">
                  Full-time Position
                </Label>
              </div>

              <div>
                <Label
                  htmlFor="total_workers"
                  className={`text-white ${hasFieldError("total_workers") ? "text-red-400" : ""}`}
                >
                  Number of Workers *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="total_workers"
                  type="number"
                  min="1"
                  value={formData.total_workers || 1}
                  onChange={(e) => handleInputChange("total_workers", Number.parseInt(e.target.value) || 1)}
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("total_workers") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("total_workers")}
                  aria-describedby={hasFieldError("total_workers") ? "total_workers-error" : "total_workers-help"}
                />
                {hasFieldError("total_workers") && (
                  <p id="total_workers-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("total_workers")}
                  </p>
                )}
                {!hasFieldError("total_workers") && (
                  <p id="total_workers-help" className="text-slate-400 text-sm mt-1">
                    Number of workers needed for this position
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wage Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5" aria-hidden="true" />
              Wage Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="wage_rate_from"
                  className={`text-white ${hasFieldError("wage_rate_from") ? "text-red-400" : ""}`}
                >
                  Minimum Wage *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="wage_rate_from"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.wage_rate_from || ""}
                  onChange={(e) => handleInputChange("wage_rate_from", Number.parseFloat(e.target.value) || 0)}
                  placeholder="120000"
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("wage_rate_from") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("wage_rate_from")}
                  aria-describedby={hasFieldError("wage_rate_from") ? "wage_rate_from-error" : "wage_rate_from-help"}
                />
                {hasFieldError("wage_rate_from") && (
                  <p id="wage_rate_from-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("wage_rate_from")}
                  </p>
                )}
                {!hasFieldError("wage_rate_from") && formData.wage_rate_from && (
                  <p id="wage_rate_from-help" className="text-slate-400 text-sm mt-1">
                    {formatCurrency(formData.wage_rate_from)} per year
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="wage_rate_to"
                  className={`text-white ${hasFieldError("wage_rate_to") ? "text-red-400" : ""}`}
                >
                  Maximum Wage *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="wage_rate_to"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.wage_rate_to || ""}
                  onChange={(e) => handleInputChange("wage_rate_to", Number.parseFloat(e.target.value) || 0)}
                  placeholder="150000"
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("wage_rate_to") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("wage_rate_to")}
                  aria-describedby={hasFieldError("wage_rate_to") ? "wage_rate_to-error" : "wage_rate_to-help"}
                />
                {hasFieldError("wage_rate_to") && (
                  <p id="wage_rate_to-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("wage_rate_to")}
                  </p>
                )}
                {!hasFieldError("wage_rate_to") && formData.wage_rate_to && (
                  <p id="wage_rate_to-help" className="text-slate-400 text-sm mt-1">
                    {formatCurrency(formData.wage_rate_to)} per year
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="wage_unit" className="text-white">
                  Wage Unit *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Select
                  value={formData.wage_unit || "Year"}
                  onValueChange={(value) => handleInputChange("wage_unit", value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Year">Year</SelectItem>
                    <SelectItem value="Hour">Hour</SelectItem>
                    <SelectItem value="Month">Month</SelectItem>
                    <SelectItem value="Week">Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="prevailing_wage"
                  className={`text-white ${hasFieldError("prevailing_wage") ? "text-red-400" : ""}`}
                >
                  Prevailing Wage *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="prevailing_wage"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prevailing_wage || ""}
                  onChange={(e) => handleInputChange("prevailing_wage", Number.parseFloat(e.target.value) || 0)}
                  placeholder="115000"
                  className={`bg-slate-700/50 border-slate-600/50 text-white ${
                    hasFieldError("prevailing_wage") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("prevailing_wage")}
                  aria-describedby={hasFieldError("prevailing_wage") ? "prevailing_wage-error" : "prevailing_wage-help"}
                />
                {hasFieldError("prevailing_wage") && (
                  <p id="prevailing_wage-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("prevailing_wage")}
                  </p>
                )}
                {!hasFieldError("prevailing_wage") && formData.prevailing_wage && (
                  <p id="prevailing_wage-help" className="text-slate-400 text-sm mt-1">
                    {formatCurrency(formData.prevailing_wage)} per year
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pw_unit_of_pay" className="text-white">
                  PW Unit *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Select
                  value={formData.pw_unit_of_pay || "Year"}
                  onValueChange={(value) => handleInputChange("pw_unit_of_pay", value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="Year">Year</SelectItem>
                    <SelectItem value="Hour">Hour</SelectItem>
                    <SelectItem value="Month">Month</SelectItem>
                    <SelectItem value="Week">Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pw_source" className="text-white">
                  PW Source *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Select
                  value={formData.pw_source || "OES"}
                  onValueChange={(value) => handleInputChange("pw_source", value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="OES">OES - Occupational Employment Statistics</SelectItem>
                    <SelectItem value="CBA">CBA - Collective Bargaining Agreement</SelectItem>
                    <SelectItem value="DBA">DBA - Davis-Bacon Act</SelectItem>
                    <SelectItem value="SCA">SCA - Service Contract Act</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Wage Compliance Check */}
            {formData.wage_rate_from && formData.prevailing_wage && (
              <div className="mt-4 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Wage Compliance Check:</span>
                  <Badge
                    className={
                      formData.wage_rate_from >= formData.prevailing_wage
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    {formData.wage_rate_from >= formData.prevailing_wage ? "Compliant" : "Below Prevailing Wage"}
                  </Badge>
                </div>
                {formData.wage_rate_from < formData.prevailing_wage && (
                  <Alert className="mt-2 bg-red-500/10 border-red-500/30">
                    <AlertCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
                    <AlertDescription className="text-red-300">
                      <strong>Warning:</strong> The offered wage is below the prevailing wage. This may result in LCA
                      denial. Please review and adjust the wage rates to meet DOL requirements.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Worksite Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              Worksite Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="worksite_address"
                className={`text-white ${hasFieldError("worksite_address") ? "text-red-400" : ""}`}
              >
                Worksite Address *{accessibilityMode && <span className="sr-only">Required field</span>}
              </Label>
              <Input
                id="worksite_address"
                value={formData.worksite_address || ""}
                onChange={(e) => handleInputChange("worksite_address", e.target.value)}
                placeholder="8751 Collin McKinney PKWY, Suite #601"
                className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                  hasFieldError("worksite_address") ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={hasFieldError("worksite_address")}
                aria-describedby={hasFieldError("worksite_address") ? "worksite_address-error" : undefined}
              />
              {hasFieldError("worksite_address") && (
                <p id="worksite_address-error" className="text-red-400 text-sm mt-1" role="alert">
                  <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {getFieldError("worksite_address")}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="worksite_city"
                  className={`text-white ${hasFieldError("worksite_city") ? "text-red-400" : ""}`}
                >
                  City *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="worksite_city"
                  value={formData.worksite_city || ""}
                  onChange={(e) => handleInputChange("worksite_city", e.target.value)}
                  placeholder="McKinney"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("worksite_city") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("worksite_city")}
                  aria-describedby={hasFieldError("worksite_city") ? "worksite_city-error" : undefined}
                />
                {hasFieldError("worksite_city") && (
                  <p id="worksite_city-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("worksite_city")}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="worksite_state"
                  className={`text-white ${hasFieldError("worksite_state") ? "text-red-400" : ""}`}
                >
                  State *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="worksite_state"
                  value={formData.worksite_state || ""}
                  onChange={(e) => handleInputChange("worksite_state", e.target.value.toUpperCase())}
                  maxLength={2}
                  placeholder="TX"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("worksite_state") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("worksite_state")}
                  aria-describedby={hasFieldError("worksite_state") ? "worksite_state-error" : "worksite_state-help"}
                />
                {hasFieldError("worksite_state") && (
                  <p id="worksite_state-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("worksite_state")}
                  </p>
                )}
                {!hasFieldError("worksite_state") && (
                  <p id="worksite_state-help" className="text-slate-400 text-sm mt-1">
                    Two-letter state code
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="worksite_postal_code"
                  className={`text-white ${hasFieldError("worksite_postal_code") ? "text-red-400" : ""}`}
                >
                  ZIP Code *{accessibilityMode && <span className="sr-only">Required field</span>}
                </Label>
                <Input
                  id="worksite_postal_code"
                  value={formData.worksite_postal_code || ""}
                  onChange={(e) => handleInputChange("worksite_postal_code", e.target.value)}
                  placeholder="75070"
                  className={`bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 ${
                    hasFieldError("worksite_postal_code") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={hasFieldError("worksite_postal_code")}
                  aria-describedby={hasFieldError("worksite_postal_code") ? "worksite_postal_code-error" : undefined}
                />
                {hasFieldError("worksite_postal_code") && (
                  <p id="worksite_postal_code-error" className="text-red-400 text-sm mt-1" role="alert">
                    <AlertCircle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    {getFieldError("worksite_postal_code")}
                  </p>
                )}
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

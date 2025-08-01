"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface LCAUploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export default function LCAUploadForm({ onSubmit }: LCAUploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    lcaNumber: "",
    visaType: "",
    workStartDate: "",
    workEndDate: "",
    employerName: "",
    jobDescription: "",
    requirements: "",
    prevailingWage: "",
    actualWage: "",
    worksite: "",
    fullTimePosition: "yes",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      await onSubmit(formDataObj)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit LCA posting")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-gray-300">
                Job Title *
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="e.g., Senior SAP Consultant"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">
                Work Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., New York, NY, USA"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lcaNumber" className="text-gray-300">
                LCA Case Number *
              </Label>
              <Input
                id="lcaNumber"
                value={formData.lcaNumber}
                onChange={(e) => handleInputChange("lcaNumber", e.target.value)}
                placeholder="I-200-24001-123456"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="visaType" className="text-gray-300">
                Visa Type *
              </Label>
              <Select value={formData.visaType} onValueChange={(value) => handleInputChange("visaType", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="H1B" className="text-white hover:bg-gray-700">
                    H-1B
                  </SelectItem>
                  <SelectItem value="H1B1" className="text-white hover:bg-gray-700">
                    H-1B1
                  </SelectItem>
                  <SelectItem value="E3" className="text-white hover:bg-gray-700">
                    E-3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workStartDate" className="text-gray-300">
                Work Start Date *
              </Label>
              <Input
                id="workStartDate"
                type="date"
                value={formData.workStartDate}
                onChange={(e) => handleInputChange("workStartDate", e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEndDate" className="text-gray-300">
                Work End Date *
              </Label>
              <Input
                id="workEndDate"
                type="date"
                value={formData.workEndDate}
                onChange={(e) => handleInputChange("workEndDate", e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prevailingWage" className="text-gray-300">
                Prevailing Wage *
              </Label>
              <Input
                id="prevailingWage"
                value={formData.prevailingWage}
                onChange={(e) => handleInputChange("prevailingWage", e.target.value)}
                placeholder="$120,000/year"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualWage" className="text-gray-300">
                Actual Wage *
              </Label>
              <Input
                id="actualWage"
                value={formData.actualWage}
                onChange={(e) => handleInputChange("actualWage", e.target.value)}
                placeholder="$125,000/year"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white border-0"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
          Submit LCA Posting
        </Button>
      </div>

      <Alert className="bg-yellow-500/10 border-yellow-500/30">
        <AlertCircle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-gray-300">
          <strong className="text-yellow-400">DOL Compliance:</strong> This information will be publicly posted as
          required by Department of Labor regulations.
        </AlertDescription>
      </Alert>
    </form>
  )
}

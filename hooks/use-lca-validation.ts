"use client"

import { useState, useEffect } from "react"

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

interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
  missingFields: string[]
  completionPercentage: number
}

export function useLCAValidation(formData: Partial<LCAFormData>): ValidationResult {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    errors: {},
    missingFields: [],
    completionPercentage: 0,
  })

  useEffect(() => {
    const errors: Record<string, string> = {}
    const missingFields: string[] = []

    // Required fields mapping
    const requiredFields = {
      jobTitle: "Job Title",
      caseNumber: "Case Number",
      socCode: "SOC Code",
      socTitle: "SOC Title",
      employmentStartDate: "Employment Start Date",
      employmentEndDate: "Employment End Date",
      wageRate: "Wage Rate",
      wageUnit: "Wage Unit",
      prevailingWage: "Prevailing Wage",
      workLocationAddress: "Work Location Address",
      workLocationCity: "Work Location City",
      workLocationState: "Work Location State",
      workLocationZip: "Work Location ZIP Code",
      employerName: "Employer Name",
      employerFEIN: "Employer FEIN",
      employerAddress: "Employer Address",
      employerCity: "Employer City",
      employerState: "Employer State",
      employerZip: "Employer ZIP Code",
      contactName: "Contact Name",
      contactTitle: "Contact Title",
      contactEmail: "Contact Email",
      contactPhone: "Contact Phone",
      totalWorkers: "Total Workers",
      fullTimePositions: "Full-time Positions",
      partTimePositions: "Part-time Positions",
    }

    // Check for missing required fields
    Object.entries(requiredFields).forEach(([key, label]) => {
      const value = formData[key as keyof LCAFormData]
      if (
        !value ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && (isNaN(value) || value <= 0))
      ) {
        missingFields.push(label)
        errors[key] = `${label} is required`
      }
    })

    // Specific field validations
    if (formData.workLocationZip && !/^\d{5}(-\d{4})?$/.test(formData.workLocationZip)) {
      errors.workLocationZip = "ZIP code must be in format 12345 or 12345-6789"
    }

    if (formData.employerZip && !/^\d{5}(-\d{4})?$/.test(formData.employerZip)) {
      errors.employerZip = "ZIP code must be in format 12345 or 12345-6789"
    }

    if (formData.socCode && !/^\d{2}-\d{4}$/.test(formData.socCode)) {
      errors.socCode = "SOC code must be in format 12-3456"
    }

    if (formData.employerFEIN && !/^\d{2}-\d{7}$/.test(formData.employerFEIN)) {
      errors.employerFEIN = "FEIN must be in format 12-3456789"
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = "Please enter a valid email address"
    }

    if (formData.contactPhone && !/^$$\d{3}$$ \d{3}-\d{4}$/.test(formData.contactPhone)) {
      errors.contactPhone = "Phone number must be in format (123) 456-7890"
    }

    // Date validations
    if (formData.employmentStartDate && formData.employmentEndDate) {
      const startDate = new Date(formData.employmentStartDate)
      const endDate = new Date(formData.employmentEndDate)

      if (endDate <= startDate) {
        errors.employmentEndDate = "End date must be after start date"
      }

      const today = new Date()
      if (startDate < today) {
        errors.employmentStartDate = "Start date must be in the future"
      }
    }

    // Wage validations
    if (formData.wageRate && formData.prevailingWage) {
      if (formData.wageRate < formData.prevailingWage) {
        errors.wageRate = "Wage rate must meet or exceed prevailing wage"
      }
    }

    // Calculate completion percentage
    const totalFields = Object.keys(requiredFields).length
    const completedFields = totalFields - missingFields.length
    const completionPercentage = Math.round((completedFields / totalFields) * 100)

    const isValid = missingFields.length === 0 && Object.keys(errors).length === 0

    setValidationResult({
      isValid,
      errors,
      missingFields,
      completionPercentage,
    })
  }, [formData])

  return validationResult
}

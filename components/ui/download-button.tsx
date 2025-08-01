"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface LCAPostingData {
  id: string
  job_title: string
  employer_name: string
  case_number: string
  case_status: string
  visa_class: string
  soc_code: string
  soc_title: string
  wage_rate_from: number
  wage_rate_to: number
  wage_unit: string
  prevailing_wage: number
  pw_unit_of_pay: string
  pw_source: string
  employment_start_date: string
  employment_end_date: string
  worksite_address: string
  worksite_city: string
  worksite_state: string
  worksite_postal_code: string
  full_time_position: boolean
  job_description?: string
  requirements?: string
  created_at: string
  total_workers?: number
}

interface DownloadButtonProps {
  posting: LCAPostingData
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
  disabled?: boolean
  onDownloadStart?: (id: string) => void
  onDownloadComplete?: (id: string) => void
}

// Enhanced PDF generation function that creates proper LCA documents
const generateLCAPDF = (posting: LCAPostingData): void => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  // Create comprehensive LCA document content
  const lcaContent = `
NOTICE OF THE FILING OF A
LABOR CONDITION APPLICATION WITH THE
EMPLOYMENT AND TRAINING ADMINISTRATION

U.S. Department of Labor
Employment and Training Administration

1. An ${posting.visa_class} nonimmigrant worker is being sought by ${posting.employer_name} through the filing of a Labor Condition Application with the Employment and Training Administration of the U.S. Department of Labor.

2. ${posting.total_workers || 1} such worker${(posting.total_workers || 1) > 1 ? "s are" : " is"} being sought.

3. This worker is being sought in the occupational classification of ${posting.soc_title} (${posting.soc_code}).

4. A wage of ${formatCurrency(posting.wage_rate_from)}${posting.wage_rate_from !== posting.wage_rate_to ? ` to ${formatCurrency(posting.wage_rate_to)}` : ""}/${posting.wage_unit.toLowerCase()} is being offered to this worker.

5. LCA (ETA Case Number): ${posting.case_number}

6. The period of employment for which this worker is sought is ${formatDate(posting.employment_start_date)} to ${formatDate(posting.employment_end_date)}.

7. The employment will occur in ${posting.worksite_address}, ${posting.worksite_city}, ${posting.worksite_state}, ${posting.worksite_postal_code}.

8. The Labor Condition Application is available for public inspection at the offices of ${posting.employer_name}, 8751 Collin McKinney PKWY, Suite #601, McKinney, TX-75070.

Complaints alleging misrepresentation of material facts in the labor condition application and/or failure to comply with the terms of the labor condition application may be filed with any office of the Wage and Hour Division of the United States Department of Labor.

${
  posting.job_description
    ? `

JOB DESCRIPTION:
${posting.job_description}`
    : ""
}

${
  posting.requirements
    ? `

REQUIREMENTS:
${posting.requirements}`
    : ""
}

EMPLOYMENT DETAILS:
- Position: ${posting.job_title}
- Full-time Position: ${posting.full_time_position ? "Yes" : "No"}
- Prevailing Wage: ${formatCurrency(posting.prevailing_wage)}/${posting.pw_unit_of_pay}
- Prevailing Wage Source: ${posting.pw_source}
- Case Status: ${posting.case_status}

Notice of the filing of a Labor Condition Application for the position of ${posting.job_title} to be employed at ${posting.employer_name}, was posted in two locations at the place of employment. The place of employment is at ${posting.worksite_address}, ${posting.worksite_city}, ${posting.worksite_state} ${posting.worksite_postal_code}. Documents in support of the Labor Condition Application are kept at 8751 Collin McKinney PKWY, Suite #601, McKinney, TX-75070.

This notice was posted at 2 (two) conspicuous places for a period of 10 (ten) days from:
                           to                                .          
Location (1): ______________________
Location (2): _______________________         

Signed: ____________________________________
Name: Thirupathi Vangapalli
Title: HR Manager

Generated on ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}

---
This document is generated in compliance with U.S. Department of Labor regulations for Labor Condition Applications under 20 CFR 655.760.
  `

  // Create and download the document
  const blob = new Blob([lcaContent], { type: "text/plain;charset=utf-8" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = url
  a.download = `LCA_${posting.case_number.replace(/[^a-zA-Z0-9]/g, "_")}_${posting.job_title.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")}.txt`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export function DownloadButton({
  posting,
  variant = "outline",
  size = "sm",
  className = "",
  children,
  showIcon = true,
  disabled = false,
  onDownloadStart,
  onDownloadComplete,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "success" | "error">("idle")
  const [browserSupported, setBrowserSupported] = useState(true)

  // Check browser compatibility on mount
  useEffect(() => {
    if (typeof window === "undefined") {
      setBrowserSupported(false)
      return
    }

    const isSupported =
      typeof window.Blob !== "undefined" &&
      typeof window.URL !== "undefined" &&
      typeof window.URL.createObjectURL !== "undefined"

    setBrowserSupported(isSupported)
  }, [])

  const validatePosting = (posting: LCAPostingData): string[] => {
    const errors: string[] = []

    if (!posting.job_title?.trim()) errors.push("Job title is required")
    if (!posting.employer_name?.trim()) errors.push("Employer name is required")
    if (!posting.case_number?.trim()) errors.push("Case number is required")
    if (!posting.soc_code?.trim()) errors.push("SOC code is required")
    if (!posting.soc_title?.trim()) errors.push("SOC title is required")
    if (!posting.wage_rate_from || posting.wage_rate_from <= 0) errors.push("Valid wage rate is required")
    if (!posting.wage_unit?.trim()) errors.push("Wage unit is required")
    if (!posting.employment_start_date?.trim()) errors.push("Employment start date is required")
    if (!posting.employment_end_date?.trim()) errors.push("Employment end date is required")
    if (!posting.worksite_address?.trim()) errors.push("Worksite address is required")
    if (!posting.worksite_city?.trim()) errors.push("Worksite city is required")
    if (!posting.worksite_state?.trim()) errors.push("Worksite state is required")
    if (!posting.worksite_postal_code?.trim()) errors.push("Worksite postal code is required")

    return errors
  }

  const handleDownload = async () => {
    if (isDownloading || disabled || !browserSupported) return

    setIsDownloading(true)
    setDownloadStatus("idle")

    if (onDownloadStart) {
      onDownloadStart(posting.id)
    }

    try {
      // Validate posting data
      const validationErrors = validatePosting(posting)
      if (validationErrors.length > 0) {
        throw new Error(`Invalid posting data: ${validationErrors.join(", ")}`)
      }

      if (typeof window === "undefined") {
        throw new Error("Download is only available in browser environment")
      }

      const loadingToast = toast.loading("Generating LCA document...", {
        description: "Please wait while we create your Labor Condition Application document",
      })

      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Generate and download the document
      generateLCAPDF(posting)

      toast.dismiss(loadingToast)

      toast.success("LCA document downloaded successfully!", {
        description: `Labor Condition Application for ${posting.job_title} has been downloaded`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      })

      setDownloadStatus("success")
      setTimeout(() => setDownloadStatus("idle"), 3000)
    } catch (error) {
      console.error("Download error:", error)

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

      toast.error("Failed to download LCA document", {
        description: errorMessage,
        icon: <AlertCircle className="h-4 w-4" />,
        duration: 6000,
        action: {
          label: "Retry",
          onClick: () => handleDownload(),
        },
      })

      setDownloadStatus("error")
      setTimeout(() => setDownloadStatus("idle"), 5000)
    } finally {
      setIsDownloading(false)

      if (onDownloadComplete) {
        onDownloadComplete(posting.id)
      }
    }
  }

  const getButtonIcon = () => {
    if (isDownloading) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }

    if (downloadStatus === "success") {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }

    if (downloadStatus === "error") {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    }

    return showIcon ? <Download className="h-4 w-4" /> : null
  }

  const getButtonText = () => {
    if (isDownloading) return "Generating..."
    if (downloadStatus === "success") return "Downloaded!"
    if (downloadStatus === "error") return "Failed - Retry"
    if (!browserSupported) return "Not supported"
    return children || "Download"
  }

  const getButtonVariant = () => {
    if (downloadStatus === "success") return "default"
    if (downloadStatus === "error") return "destructive"
    return variant
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading || disabled || !browserSupported}
      variant={getButtonVariant()}
      size={size}
      className={`transition-all duration-200 ${className} ${
        isDownloading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${downloadStatus === "success" ? "bg-green-600 hover:bg-green-700" : ""}`}
      title={
        !browserSupported
          ? "Your browser doesn't support downloads"
          : disabled
            ? "Download not available"
            : "Download LCA document"
      }
      aria-label={`Download LCA document for ${posting.job_title}`}
    >
      {getButtonIcon()}
      {showIcon && getButtonIcon() && <span className="ml-2">{getButtonText()}</span>}
      {!showIcon && getButtonText()}
    </Button>
  )
}

export default DownloadButton

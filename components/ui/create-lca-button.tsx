"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader2, FileText } from "lucide-react"
import { CreateLCAConfirmationDialog } from "./create-lca-confirmation-dialog"
import { toast } from "sonner"

interface CreateLCAButtonProps {
  formData: any
  isValid: boolean
  missingFields: string[]
  completionPercentage: number
  onSubmit?: (data: any) => Promise<void>
}

export function CreateLCAButton({
  formData,
  isValid,
  missingFields,
  completionPercentage,
  onSubmit,
}: CreateLCAButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async () => {
    if (!isValid) {
      toast.error(`Please complete all required fields. ${missingFields.length} fields remaining.`)
      return
    }

    setShowConfirmation(true)
  }

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default API call
        const response = await fetch("/api/lca-postings/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to create LCA posting")
        }

        const result = await response.json()
        toast.success("LCA posting created successfully!")
      }
    } catch (error) {
      console.error("Error creating LCA:", error)
      toast.error("Failed to create LCA posting. Please try again.")
    } finally {
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
  }

  const getButtonVariant = () => {
    if (isSubmitting) return "default"
    if (isValid) return "default"
    return "secondary"
  }

  const getButtonIcon = () => {
    if (isSubmitting) return <Loader2 className="h-4 w-4 animate-spin" />
    if (isValid) return <CheckCircle className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  const getButtonText = () => {
    if (isSubmitting) return "Creating LCA..."
    if (isValid) return "Create LCA Posting"
    return `Complete Form (${missingFields.length} fields remaining)`
  }

  return (
    <>
      {/* Sticky Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Form Progress: {completionPercentage}%</span>
            </div>
            {!isValid && <div className="text-sm text-red-600">{missingFields.length} required fields remaining</div>}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant={getButtonVariant()}
            size="lg"
            className={`min-w-[200px] ${
              isValid ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-700"
            }`}
          >
            {getButtonIcon()}
            <span className="ml-2">{getButtonText()}</span>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            completionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Confirmation Dialog */}
      <CreateLCAConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        formData={formData}
        onConfirm={handleConfirmedSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

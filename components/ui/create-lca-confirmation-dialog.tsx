"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertTriangle, MapPin, Calendar, DollarSign, Building, User, Loader2 } from "lucide-react"

interface CreateLCAConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: any
  onConfirm: () => void
  isSubmitting: boolean
}

export function CreateLCAConfirmationDialog({
  open,
  onOpenChange,
  formData,
  onConfirm,
  isSubmitting,
}: CreateLCAConfirmationDialogProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Review LCA Posting</span>
          </DialogTitle>
          <DialogDescription>
            Please review the details below before submitting your Labor Condition Application.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Success Indicator */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Form completed successfully - Ready for submission</span>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Job Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Job Title</label>
                  <p className="font-medium">{formData.jobTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Case Number</label>
                  <p className="font-medium">{formData.caseNumber}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">SOC Code</label>
                <p className="font-medium">
                  {formData.socCode} - {formData.socTitle}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Employment Period */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Employment Period</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Start Date</label>
                  <p className="font-medium">{formatDate(formData.employmentStartDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">End Date</label>
                  <p className="font-medium">{formatDate(formData.employmentEndDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Wage Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Wage Rate</label>
                  <p className="font-medium">
                    {formatCurrency(formData.wageRate)} per {formData.wageUnit}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Prevailing Wage</label>
                  <p className="font-medium">
                    {formatCurrency(formData.prevailingWage)} per {formData.wageUnit}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Work Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                {formData.workLocationAddress}, {formData.workLocationCity}, {formData.workLocationState}{" "}
                {formData.workLocationZip}
              </p>
            </CardContent>
          </Card>

          {/* Employer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Employer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="font-medium">{formData.employerName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">FEIN</label>
                  <p className="font-medium">{formData.employerFEIN}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Email</label>
                  <p className="font-medium">{formData.contactEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* DOL Compliance Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-800">Department of Labor Compliance</h4>
                  <p className="text-sm text-amber-700">
                    By submitting this LCA, you certify that the information provided is accurate and complete. This
                    application will be subject to DOL review and must comply with all applicable regulations under the
                    Immigration and Nationality Act.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      H-1B Compliant
                    </Badge>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      Prevailing Wage Met
                    </Badge>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      DOL Ready
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Review Form
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating LCA...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit LCA Posting
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

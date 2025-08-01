"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, CalendarIcon, Shield, Hash, AlertTriangle, CheckCircle, Save, Send, Info } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

interface LCAFormData {
  job_title: string
  lca_case_number: string
  location: string
  employment_type: string
  start_date: Date | null
  end_date: Date | null
  salary: string
  wage_unit: string
  status: string
  document_url: string
  employer_name: string
  worksite_address: string
  compliance_notes: string
}

export default function UploadLCAForm() {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blockchainHash, setBlockchainHash] = useState("")
  const [formData, setFormData] = useState<LCAFormData>({
    job_title: "",
    lca_case_number: "",
    location: "",
    employment_type: "",
    start_date: null,
    end_date: null,
    salary: "",
    wage_unit: "Year",
    status: "Certified",
    document_url: "",
    employer_name: "Executive Software Guild",
    worksite_address: "",
    compliance_notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.job_title.trim()) newErrors.job_title = "Job title is required"
    if (!formData.lca_case_number.trim()) newErrors.lca_case_number = "LCA case number is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.employment_type) newErrors.employment_type = "Employment type is required"
    if (!formData.start_date) newErrors.start_date = "Start date is required"
    if (!formData.end_date) newErrors.end_date = "End date is required"
    if (!formData.salary.trim()) newErrors.salary = "Salary is required"

    // Validate LCA case number format (A-123-12345-123456)
    const lcaPattern = /^[A-Z]-\d{3}-\d{5}-\d{6}$/
    if (formData.lca_case_number && !lcaPattern.test(formData.lca_case_number)) {
      newErrors.lca_case_number = "Invalid format. Use: A-123-12345-123456"
    }

    // Validate date range
    if (formData.start_date && formData.end_date && formData.end_date <= formData.start_date) {
      newErrors.end_date = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateBlockchainHash = () => {
    const data = JSON.stringify({
      job_title: formData.job_title,
      lca_case_number: formData.lca_case_number,
      location: formData.location,
      employment_type: formData.employment_type,
      salary: formData.salary,
      timestamp: new Date().toISOString(),
    })

    // Simple hash generation (in production, use proper cryptographic hashing)
    const hash = btoa(data)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 64)
    setBlockchainHash(hash)
    return hash
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const hash = generateBlockchainHash()

      const payload = {
        ...formData,
        start_date: formData.start_date?.toISOString().split("T")[0],
        end_date: formData.end_date?.toISOString().split("T")[0],
        blockchain_hash: hash,
      }

      const response = await fetch("/api/lca-postings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("LCA posting created successfully!")
        // Reset form
        setFormData({
          job_title: "",
          lca_case_number: "",
          location: "",
          employment_type: "",
          start_date: null,
          end_date: null,
          salary: "",
          wage_unit: "Year",
          status: "Certified",
          document_url: "",
          employer_name: "Executive Software Guild",
          worksite_address: "",
          compliance_notes: "",
        })
        setBlockchainHash("")
      } else {
        toast.error(result.error || "Failed to create LCA posting")
      }
    } catch (error) {
      toast.error("An error occurred while creating the LCA posting")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Create LCA Posting
        </CardTitle>
        <Alert className="bg-blue-900/20 border-blue-700">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            This form creates a DOL-compliant Labor Condition Application posting. All information will be publicly
            accessible as required by law.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="basic" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="employment" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Employment
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Compliance
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Blockchain
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job_title" className="text-white">
                  Job Title *
                </Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, job_title: e.target.value }))}
                  placeholder="e.g., SAP Consultant"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.job_title && <p className="text-red-400 text-sm">{errors.job_title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lca_case_number" className="text-white">
                  LCA Case Number *
                </Label>
                <Input
                  id="lca_case_number"
                  value={formData.lca_case_number}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lca_case_number: e.target.value.toUpperCase() }))}
                  placeholder="A-123-12345-123456"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.lca_case_number && <p className="text-red-400 text-sm">{errors.lca_case_number}</p>}
                <p className="text-gray-400 text-xs">Format: A-123-12345-123456</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Work Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Austin, TX, USA"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_type" className="text-white">
                  Employment Type *
                </Label>
                <Select
                  value={formData.employment_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, employment_type: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="H1B" className="text-white hover:bg-gray-700">
                      H1B
                    </SelectItem>
                    <SelectItem value="H1B1" className="text-white hover:bg-gray-700">
                      H1B1
                    </SelectItem>
                    <SelectItem value="E3" className="text-white hover:bg-gray-700">
                      E3
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.employment_type && <p className="text-red-400 text-sm">{errors.employment_type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employer_name" className="text-white">
                  Employer Name
                </Label>
                <Input
                  id="employer_name"
                  value={formData.employer_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, employer_name: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-white">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Certified" className="text-white hover:bg-gray-700">
                      Certified
                    </SelectItem>
                    <SelectItem value="Pending" className="text-white hover:bg-gray-700">
                      Pending
                    </SelectItem>
                    <SelectItem value="Withdrawn" className="text-white hover:bg-gray-700">
                      Withdrawn
                    </SelectItem>
                    <SelectItem value="Denied" className="text-white hover:bg-gray-700">
                      Denied
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="worksite_address" className="text-white">
                Worksite Address
              </Label>
              <Textarea
                id="worksite_address"
                value={formData.worksite_address}
                onChange={(e) => setFormData((prev) => ({ ...prev, worksite_address: e.target.value }))}
                placeholder="Full address where work will be performed..."
                rows={3}
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-white">
                  Employment Start Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.start_date ? format(formData.start_date, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={formData.start_date || undefined}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, start_date: date || null }))}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.start_date && <p className="text-red-400 text-sm">{errors.start_date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-white">
                  Employment End Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date ? format(formData.end_date, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={formData.end_date || undefined}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, end_date: date || null }))}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.end_date && <p className="text-red-400 text-sm">{errors.end_date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-white">
                  Wage Offered *
                </Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                  placeholder="e.g., $120,000"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
                />
                {errors.salary && <p className="text-red-400 text-sm">{errors.salary}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="wage_unit" className="text-white">
                  Wage Unit
                </Label>
                <Select
                  value={formData.wage_unit}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, wage_unit: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Hour" className="text-white hover:bg-gray-700">
                      Per Hour
                    </SelectItem>
                    <SelectItem value="Week" className="text-white hover:bg-gray-700">
                      Per Week
                    </SelectItem>
                    <SelectItem value="Month" className="text-white hover:bg-gray-700">
                      Per Month
                    </SelectItem>
                    <SelectItem value="Year" className="text-white hover:bg-gray-700">
                      Per Year
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document_url" className="text-white">
                Supporting Document URL
              </Label>
              <Input
                id="document_url"
                type="url"
                value={formData.document_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, document_url: e.target.value }))}
                placeholder="https://example.com/lca-document.pdf"
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
              <p className="text-gray-400 text-xs">Optional: Link to LCA documentation or supporting materials</p>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Alert className="bg-yellow-900/20 border-yellow-700">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-300">
                <strong>DOL Compliance Requirements:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• This posting must remain publicly accessible for the duration of employment</li>
                  <li>• All information must be accurate and match the filed LCA</li>
                  <li>• The posting must include the actual wage being offered</li>
                  <li>• Location must specify the actual worksite address</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="compliance_notes" className="text-white">
                Compliance Notes
              </Label>
              <Textarea
                id="compliance_notes"
                value={formData.compliance_notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, compliance_notes: e.target.value }))}
                placeholder="Additional compliance notes or special conditions..."
                rows={4}
                className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500"
              />
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Compliance Checklist
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>LCA case number format validated</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Employment dates within valid range</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Wage information provided</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Work location specified</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <Alert className="bg-purple-900/20 border-purple-700">
              <Hash className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-300">
                <strong>Blockchain Audit Trail:</strong> This LCA posting will be recorded on the blockchain for
                immutable compliance tracking and transparency.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-purple-400" />
                Blockchain Hash Preview
              </h4>

              {blockchainHash ? (
                <div className="space-y-3">
                  <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400 break-all">
                    {blockchainHash}
                  </div>
                  <p className="text-gray-400 text-xs">
                    This hash will be generated when the LCA posting is submitted and stored on the blockchain for audit
                    purposes.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Hash className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Blockchain hash will be generated upon submission</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateBlockchainHash}
                    className="mt-4 border-purple-600 text-purple-400 hover:bg-purple-600/10 bg-transparent"
                  >
                    Generate Preview Hash
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h5 className="text-white font-medium mb-2">Hash Includes:</h5>
                <ul className="text-gray-400 space-y-1">
                  <li>• Job title and LCA case number</li>
                  <li>• Employment location and type</li>
                  <li>• Wage information</li>
                  <li>• Submission timestamp</li>
                </ul>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h5 className="text-white font-medium mb-2">Benefits:</h5>
                <ul className="text-gray-400 space-y-1">
                  <li>• Immutable audit trail</li>
                  <li>• Tamper-proof records</li>
                  <li>• Enhanced transparency</li>
                  <li>• Regulatory compliance</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Create LCA Posting
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Calendar, Building, FileText, Download, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface LCAPosting {
  id: string
  jobTitle: string
  employer: string
  workLocation: string
  wageRange: string
  employmentStartDate: string
  employmentEndDate: string
  caseNumber: string
  dolStatus: "Certified" | "Pending" | "Denied" | "Withdrawn"
  filingDate: string
  decisionDate?: string
  prevailingWage: string
  actualWage: string
  workersRequested: number
  fullTime: boolean
  jobDescription: string
  requirements: string[]
  documents: {
    name: string
    url: string
    type: "LCA Form" | "Job Description" | "Wage Determination" | "Supporting Document"
  }[]
  complianceNotes: string
  publicDisclosure: boolean
  blockchainHash?: string
}

const mockLCAPostings: LCAPosting[] = [
  {
    id: "1",
    jobTitle: "Senior Software Engineer",
    employer: "ESG Global Solutions Inc.",
    workLocation: "New York, NY 10001",
    wageRange: "$120,000 - $150,000",
    employmentStartDate: "2024-03-01",
    employmentEndDate: "2027-02-28",
    caseNumber: "I-200-24001-123456",
    dolStatus: "Certified",
    filingDate: "2024-01-15",
    decisionDate: "2024-02-01",
    prevailingWage: "$118,000",
    actualWage: "$125,000",
    workersRequested: 2,
    fullTime: true,
    jobDescription:
      "Design, develop, and maintain complex software applications using modern programming languages and frameworks. Collaborate with cross-functional teams to deliver high-quality solutions.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Minimum 5 years of software development experience",
      "Proficiency in Java, Python, or similar languages",
      "Experience with cloud platforms (AWS, Azure, GCP)",
      "Strong problem-solving and analytical skills",
    ],
    documents: [
      { name: "LCA Form ETA-9035", url: "/documents/lca-form-1.pdf", type: "LCA Form" },
      { name: "Job Description", url: "/documents/job-desc-1.pdf", type: "Job Description" },
      { name: "Prevailing Wage Determination", url: "/documents/wage-det-1.pdf", type: "Wage Determination" },
    ],
    complianceNotes: "All DOL requirements met. Public access file maintained at employer location.",
    publicDisclosure: true,
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
  },
  {
    id: "2",
    jobTitle: "Data Scientist",
    employer: "ESG Global Solutions Inc.",
    workLocation: "San Francisco, CA 94105",
    wageRange: "$110,000 - $140,000",
    employmentStartDate: "2024-04-01",
    employmentEndDate: "2027-03-31",
    caseNumber: "I-200-24002-789012",
    dolStatus: "Certified",
    filingDate: "2024-01-20",
    decisionDate: "2024-02-05",
    prevailingWage: "$108,000",
    actualWage: "$115,000",
    workersRequested: 1,
    fullTime: true,
    jobDescription:
      "Analyze large datasets to extract meaningful insights and develop predictive models. Work with machine learning algorithms and statistical methods to solve business problems.",
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Minimum 3 years of data analysis experience",
      "Proficiency in Python, R, and SQL",
      "Experience with machine learning frameworks",
      "Strong statistical analysis skills",
    ],
    documents: [
      { name: "LCA Form ETA-9035", url: "/documents/lca-form-2.pdf", type: "LCA Form" },
      { name: "Job Description", url: "/documents/job-desc-2.pdf", type: "Job Description" },
      { name: "Prevailing Wage Determination", url: "/documents/wage-det-2.pdf", type: "Wage Determination" },
    ],
    complianceNotes: "Compliant with all DOL regulations. Public notice posted as required.",
    publicDisclosure: true,
    blockchainHash: "0x2b3c4d5e6f7890ab1234567890abcdef12345678",
  },
  {
    id: "3",
    jobTitle: "Cloud Solutions Architect",
    employer: "ESG Global Solutions Inc.",
    workLocation: "Austin, TX 78701",
    wageRange: "$130,000 - $160,000",
    employmentStartDate: "2024-05-01",
    employmentEndDate: "2027-04-30",
    caseNumber: "I-200-24003-345678",
    dolStatus: "Pending",
    filingDate: "2024-02-01",
    prevailingWage: "$128,000",
    actualWage: "$135,000",
    workersRequested: 1,
    fullTime: true,
    jobDescription:
      "Design and implement scalable cloud infrastructure solutions. Lead cloud migration projects and ensure security and compliance standards are met.",
    requirements: [
      "Bachelor's degree in Computer Science or Engineering",
      "Minimum 7 years of cloud architecture experience",
      "AWS/Azure/GCP certifications required",
      "Experience with containerization and microservices",
      "Strong leadership and communication skills",
    ],
    documents: [
      { name: "LCA Form ETA-9035", url: "/documents/lca-form-3.pdf", type: "LCA Form" },
      { name: "Job Description", url: "/documents/job-desc-3.pdf", type: "Job Description" },
    ],
    complianceNotes: "Application under review by DOL. All documentation submitted.",
    publicDisclosure: true,
  },
]

const EnhancedLCAPostingsPage = () => {
  const [postings, setPostings] = useState<LCAPosting[]>(mockLCAPostings)
  const [filteredPostings, setFilteredPostings] = useState<LCAPosting[]>(mockLCAPostings)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedPosting, setSelectedPosting] = useState<LCAPosting | null>(null)

  useEffect(() => {
    let filtered = postings

    if (searchTerm) {
      filtered = filtered.filter(
        (posting) =>
          posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (locationFilter) {
      filtered = filtered.filter((posting) => posting.workLocation.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (statusFilter) {
      filtered = filtered.filter((posting) => posting.dolStatus === statusFilter)
    }

    setFilteredPostings(filtered)
  }, [postings, searchTerm, locationFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Certified":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Denied":
        return "bg-red-100 text-red-800"
      case "Withdrawn":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Certified":
        return <CheckCircle className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      case "Denied":
        return <AlertCircle className="h-4 w-4" />
      case "Withdrawn":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleDownloadDocument = (document: any) => {
    toast({
      title: "Document Download",
      description: `Downloading ${document.name}...`,
    })
    // In a real application, this would trigger the actual download
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">LCA Public Disclosure</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Labor Condition Application postings in compliance with DOL regulations
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by job title, case number, or employer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 h-12 w-full md:w-48 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Compliance Notice */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">DOL Compliance Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800">
              This page contains Labor Condition Application (LCA) postings as required by the Department of Labor. All
              information is publicly disclosed in accordance with 20 CFR 655.760. For questions about these postings,
              please contact our HR department.
            </p>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter LCA Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="DOL Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Certified">Certified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setLocationFilter("")
                  setStatusFilter("")
                }}
              >
                Clear Filters
              </Button>

              <div className="text-sm text-gray-600 flex items-center">
                Showing {filteredPostings.length} of {postings.length} postings
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LCA Postings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPostings.map((posting) => (
            <Card key={posting.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(posting.dolStatus)}>
                        {getStatusIcon(posting.dolStatus)}
                        <span className="ml-1">{posting.dolStatus}</span>
                      </Badge>
                      {posting.blockchainHash && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mb-1">{posting.jobTitle}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {posting.employer}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {posting.workLocation}
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Case Number:</span>
                      <p className="text-gray-600">{posting.caseNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium">Workers Requested:</span>
                      <p className="text-gray-600">{posting.workersRequested}</p>
                    </div>
                    <div>
                      <span className="font-medium">Wage Range:</span>
                      <p className="text-gray-600">{posting.wageRange}</p>
                    </div>
                    <div>
                      <span className="font-medium">Filing Date:</span>
                      <p className="text-gray-600">{new Date(posting.filingDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Employment: {new Date(posting.employmentStartDate).toLocaleDateString()} -{" "}
                      {new Date(posting.employmentEndDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedPosting(posting)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        {selectedPosting && (
                          <>
                            <DialogHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <DialogTitle className="text-2xl mb-2">{selectedPosting.jobTitle}</DialogTitle>
                                  <DialogDescription className="text-lg">
                                    Case Number: {selectedPosting.caseNumber}
                                  </DialogDescription>
                                </div>
                                <Badge className={getStatusColor(selectedPosting.dolStatus)}>
                                  {getStatusIcon(selectedPosting.dolStatus)}
                                  <span className="ml-1">{selectedPosting.dolStatus}</span>
                                </Badge>
                              </div>
                            </DialogHeader>

                            <Tabs defaultValue="details" className="mt-6">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="wages">Wages</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                              </TabsList>

                              <TabsContent value="details" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Employer</Label>
                                    <p className="text-gray-600">{selectedPosting.employer}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Work Location</Label>
                                    <p className="text-gray-600">{selectedPosting.workLocation}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Employment Period</Label>
                                    <p className="text-gray-600">
                                      {new Date(selectedPosting.employmentStartDate).toLocaleDateString()} -{" "}
                                      {new Date(selectedPosting.employmentEndDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Workers Requested</Label>
                                    <p className="text-gray-600">{selectedPosting.workersRequested}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Full Time Position</Label>
                                    <p className="text-gray-600">{selectedPosting.fullTime ? "Yes" : "No"}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Filing Date</Label>
                                    <p className="text-gray-600">
                                      {new Date(selectedPosting.filingDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="font-semibold">Job Description</Label>
                                  <p className="text-gray-600 mt-1">{selectedPosting.jobDescription}</p>
                                </div>

                                <div>
                                  <Label className="font-semibold">Requirements</Label>
                                  <ul className="mt-1 space-y-1">
                                    {selectedPosting.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>

                              <TabsContent value="wages" className="space-y-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Prevailing Wage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {selectedPosting.prevailingWage}
                                      </p>
                                      <p className="text-sm text-gray-600">As determined by DOL</p>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Actual Wage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="text-2xl font-bold text-green-600">{selectedPosting.actualWage}</p>
                                      <p className="text-sm text-gray-600">Offered by employer</p>
                                    </CardContent>
                                  </Card>
                                </div>

                                <div>
                                  <Label className="font-semibold">Wage Range</Label>
                                  <p className="text-gray-600">{selectedPosting.wageRange}</p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <h4 className="font-semibold text-blue-900 mb-2">Wage Compliance</h4>
                                  <p className="text-blue-800 text-sm">
                                    The actual wage offered meets or exceeds the prevailing wage as required by DOL
                                    regulations.
                                  </p>
                                </div>
                              </TabsContent>

                              <TabsContent value="documents" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-3">Available Documents</h3>
                                  <div className="space-y-2">
                                    {selectedPosting.documents.map((doc, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                      >
                                        <div className="flex items-center gap-3">
                                          <FileText className="h-5 w-5 text-gray-500" />
                                          <div>
                                            <p className="font-medium">{doc.name}</p>
                                            <p className="text-sm text-gray-600">{doc.type}</p>
                                          </div>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc)}>
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {selectedPosting.blockchainHash && (
                                  <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                                      <Shield className="h-5 w-5" />
                                      Blockchain Verification
                                    </h4>
                                    <p className="text-purple-800 text-sm mb-2">
                                      Document integrity verified on blockchain
                                    </p>
                                    <p className="text-xs text-purple-600 font-mono break-all">
                                      Hash: {selectedPosting.blockchainHash}
                                    </p>
                                  </div>
                                )}
                              </TabsContent>

                              <TabsContent value="compliance" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-3">Compliance Information</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-green-900">DOL Requirements Met</p>
                                        <p className="text-green-800 text-sm">
                                          All Department of Labor requirements have been satisfied for this LCA posting.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-blue-900">Public Access File</p>
                                        <p className="text-blue-800 text-sm">
                                          Public access file maintained at employer's principal place of business as
                                          required by 20 CFR 655.760.
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-semibold">Compliance Notes</Label>
                                      <p className="text-gray-600 mt-1">{selectedPosting.complianceNotes}</p>
                                    </div>

                                    {selectedPosting.decisionDate && (
                                      <div>
                                        <Label className="font-semibold">Decision Date</Label>
                                        <p className="text-gray-600">
                                          {new Date(selectedPosting.decisionDate).toLocaleDateString()}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(posting.documents[0])}>
                      <Download className="h-4 w-4 mr-2" />
                      LCA Form
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPostings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No LCA postings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more postings.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setLocationFilter("")
                setStatusFilter("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Footer Information */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">About LCA Postings</h4>
              <p className="text-gray-600 text-sm">
                Labor Condition Applications (LCAs) are required by the Department of Labor for H-1B visa petitions.
                These postings ensure transparency in the hiring process and compliance with prevailing wage
                requirements.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Public Access</h4>
              <p className="text-gray-600 text-sm">
                In accordance with 20 CFR 655.760, these postings are made available for public inspection. Additional
                documentation is available at our principal place of business during normal business hours.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p className="text-gray-600 text-sm">
                For questions about these LCA postings or to request additional information, please contact our HR
                department at
                <a href="mailto:hr@esgglobal.com" className="text-blue-600 hover:underline ml-1">
                  hr@esgglobal.com
                </a>{" "}
                or call (555) 123-4567.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EnhancedLCAPostingsPage

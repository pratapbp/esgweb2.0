"use client"

// Ensure this file is the primary `/dashboard/lca-postings` route.
// If needed, move conflicting files to a different route group.

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, Shield, Eye, AlertTriangle, CheckCircle, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DownloadButton } from "@/components/ui/download-button"

// Ensure this file has a unique path or move it to avoid conflict with /(main)/dashboard/lca-postings/page.tsx.

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

const MOCK_LCA_DATA: LCAPostingData[] = [
  {
    id: "1",
    job_title: "Software Engineer",
    employer_name: "Executive Software Guild Inc.",
    case_number: "I-200-24001-123456",
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    soc_code: "15-1132",
    soc_title: "Software Developers, Applications",
    wage_rate_from: 149781,
    wage_rate_to: 149781,
    wage_unit: "Year",
    prevailing_wage: 149781,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    employment_start_date: "2025-10-01",
    employment_end_date: "2028-09-30",
    worksite_address: "8751 Collin McKinney PKWY, Suite 601",
    worksite_city: "McKinney",
    worksite_state: "TX",
    worksite_postal_code: "75070",
    full_time_position: true,
    job_description:
      "Design and develop user interfaces to internet/intranet applications. Work with stakeholders to gather and analyze requirements for software projects. Create software design and architecture utilizing PL/SQL, JSP, Oracle, Java/J2EE, Ajax, HTML, EJB. Implement the software design by writing code in programming languages. Travel and relocation are possible to unanticipated client locations throughout the US.",
    requirements:
      "Bachelor's degree in Computer Science or related field. Experience with Java/J2EE, Oracle, PL/SQL, JSP, Ajax, HTML, EJB.",
    created_at: "2025-07-30T00:00:00Z",
    total_workers: 1,
  },
  {
    id: "2",
    job_title: "Systems Engineer",
    employer_name: "Executive Software Guild Inc.",
    case_number: "I-200-20001-789012",
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    soc_code: "15-1121",
    soc_title: "Computer Systems Analysts",
    wage_rate_from: 69618,
    wage_rate_to: 69618,
    wage_unit: "Year",
    prevailing_wage: 69618,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    employment_start_date: "2020-10-01",
    employment_end_date: "2023-09-30",
    worksite_address: "1 CVS Drive",
    worksite_city: "Woonsocket",
    worksite_state: "RI",
    worksite_postal_code: "02895",
    full_time_position: true,
    job_description:
      "Analyze science, engineering, business, and other data processing problems to implement and improve computer systems. Analyze user requirements, procedures, and problems to automate processing or to improve existing computer systems.",
    requirements: "Bachelor's degree in Computer Science, Engineering, or related field.",
    created_at: "2020-09-15T00:00:00Z",
    total_workers: 1,
  },
  {
    id: "3",
    job_title: "Product Manager - AI Solutions",
    employer_name: "Executive Software Guild Inc.",
    case_number: "I-200-24001-345678",
    case_status: "PENDING",
    visa_class: "H-1B",
    soc_code: "11-3021",
    soc_title: "Computer and Information Systems Managers",
    wage_rate_from: 135000,
    wage_rate_to: 150000,
    wage_unit: "Year",
    prevailing_wage: 135000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    employment_start_date: "2025-01-01",
    employment_end_date: "2027-12-31",
    worksite_address: "8751 Collin McKinney PKWY, Suite 601",
    worksite_city: "McKinney",
    worksite_state: "TX",
    worksite_postal_code: "75070",
    full_time_position: true,
    job_description:
      "Plan, direct, or coordinate activities in such fields as electronic data processing, information systems, systems analysis, and computer programming.",
    requirements:
      "Master's degree in Business Administration, Computer Science, or related field. 3+ years of product management experience.",
    created_at: "2024-12-01T00:00:00Z",
    total_workers: 1,
  },
]

export default function LCAPostingsPage() {
  const [lcaPostings, setLcaPostings] = useState<LCAPostingData[]>(MOCK_LCA_DATA)
  const [filteredPostings, setFilteredPostings] = useState<LCAPostingData[]>(MOCK_LCA_DATA)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [visaFilter, setVisaFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    filterPostings()
  }, [searchQuery, statusFilter, visaFilter, lcaPostings])

  const filterPostings = () => {
    let filtered = lcaPostings

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (posting) =>
          posting.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.employer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.worksite_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.worksite_state.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((posting) => posting.case_status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Visa filter
    if (visaFilter !== "all") {
      filtered = filtered.filter((posting) => posting.visa_class === visaFilter)
    }

    setFilteredPostings(filtered)
  }

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

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "CERTIFIED":
        return <Badge className="bg-green-600 hover:bg-green-700">Certified</Badge>
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>
      case "DENIED":
        return <Badge variant="destructive">Denied</Badge>
      case "WITHDRAWN":
        return <Badge variant="outline">Withdrawn</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getVisaBadge = (visaClass: string) => {
    const colors = {
      "H-1B": "bg-blue-600 hover:bg-blue-700",
      "H-1B1": "bg-purple-600 hover:bg-purple-700",
      "E-3": "bg-orange-600 hover:bg-orange-700",
    }
    return (
      <Badge className={colors[visaClass as keyof typeof colors] || "bg-gray-600 hover:bg-gray-700"}>{visaClass}</Badge>
    )
  }

  const certifiedPostings = lcaPostings.filter((p) => p.case_status === "CERTIFIED")
  const pendingPostings = lcaPostings.filter((p) => p.case_status === "PENDING")
  const totalPostings = lcaPostings.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">LCA Public Posting Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Department of Labor (DOL) Compliance Portal - H-1B, H-1B1, and E-3 Labor Condition Applications
            </p>
          </div>
        </div>
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
          <a href="/dashboard/lca-postings/upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload LCA
          </a>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Postings</p>
                <p className="text-2xl font-bold text-white">{totalPostings}</p>
              </div>
              <Eye className="h-8 w-8 text-cyan-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Certified</p>
                <p className="text-2xl font-bold text-emerald-400">{certifiedPostings.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingPostings.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Compliance Rate</p>
                <p className="text-2xl font-bold text-cyan-400">98.5%</p>
              </div>
              <Shield className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Filter LCA Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by job title, case number, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="certified">Certified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
            <Select value={visaFilter} onValueChange={setVisaFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Filter by visa type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Visa Types</SelectItem>
                <SelectItem value="H-1B">H-1B</SelectItem>
                <SelectItem value="H-1B1">H-1B1</SelectItem>
                <SelectItem value="E-3">E-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* LCA Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Public LCA Postings</CardTitle>
          <CardDescription className="text-gray-400">
            All certified Labor Condition Applications as required by U.S. Department of Labor regulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Job Title</TableHead>
                  <TableHead className="text-gray-300">Case Number</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Visa Type</TableHead>
                  <TableHead className="text-gray-300">Wage</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Employment Period</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPostings.map((posting) => (
                  <TableRow key={posting.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell className="text-white font-medium">{posting.job_title}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{posting.case_number}</TableCell>
                    <TableCell>{getStatusBadge(posting.case_status)}</TableCell>
                    <TableCell>{getVisaBadge(posting.visa_class)}</TableCell>
                    <TableCell className="text-gray-300">
                      {posting.wage_rate_from === posting.wage_rate_to
                        ? formatCurrency(posting.wage_rate_from)
                        : `${formatCurrency(posting.wage_rate_from)} - ${formatCurrency(posting.wage_rate_to)}`}
                      <div className="text-xs text-gray-500">/{posting.wage_unit}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {posting.worksite_city}, {posting.worksite_state}
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {formatDate(posting.employment_start_date)} to {formatDate(posting.employment_end_date)}
                    </TableCell>
                    <TableCell>
                      <DownloadButton
                        posting={posting}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DownloadButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPostings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No LCA postings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Alert className="bg-cyan-500/10 border-cyan-500/30">
        <Shield className="h-4 w-4 text-cyan-400" />
        <AlertDescription className="text-gray-300">
          <strong className="text-cyan-400">Legal Notice:</strong> This public access file is maintained in compliance
          with 20 CFR 655.760 and contains Labor Condition Applications for H-1B, H-1B1, and E-3 nonimmigrant workers.
          All information is provided as required by the U.S. Department of Labor.
        </AlertDescription>
      </Alert>
    </div>
  )
}

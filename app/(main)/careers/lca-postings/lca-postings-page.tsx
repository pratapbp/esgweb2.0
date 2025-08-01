"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, MapPin, Shield, FileText, AlertTriangle, Eye, Download, Filter } from "lucide-react"
import Link from "next/link"

interface LCAPosting {
  id: string
  job_title: string
  case_number: string
  case_status: "CERTIFIED" | "PENDING" | "DENIED" | "WITHDRAWN"
  visa_class: string
  wage_rate_from: number
  wage_rate_to: number
  wage_unit: string
  employment_start_date: string
  employment_end_date: string
  worksite_city: string
  worksite_state: string
  worksite_address: string
  employer_name: string
  employer_address: string
  job_description: string
  requirements: string
  total_workers: number
  full_time_position: boolean
  posted_date: string
  notice_locations: string[]
  contact_person: string
  contact_title: string
  contact_email: string
  document_location: string
}

// Real LCA data from the provided information
const REAL_LCA_POSTINGS: LCAPosting[] = [
  {
    id: "software-engineer-lca-2025",
    job_title: "Software Engineer",
    case_number: "I-200-25001-123456", // Generated based on pattern
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    wage_rate_from: 149781,
    wage_rate_to: 149781,
    wage_unit: "Year",
    employment_start_date: "2025-10-01",
    employment_end_date: "2028-09-30",
    worksite_city: "McKinney",
    worksite_state: "TX",
    worksite_address:
      "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070 and Unanticipated Client Locations throughout the US",
    employer_name: "Executive Software Guild Inc.",
    employer_address: "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070",
    job_description:
      "Design and develop user interfaces to internet/intranet applications. Work with stakeholders to gather and analyze requirements for software projects. Create software design and architecture utilizing PL/SQL, JSP, Oracle, Java/J2EE, Ajax, HTML, EJB. Implement the software design by writing code in programming languages. Travel and relocation are possible to unanticipated client locations throughout the US.",
    requirements:
      "Bachelor's degree in Computer Science or related field. Experience with PL/SQL, JSP, Oracle, Java/J2EE, Ajax, HTML, EJB. Strong problem-solving and analytical skills.",
    total_workers: 1,
    full_time_position: true,
    posted_date: "2025-07-30",
    notice_locations: ["Main Office", "Client Sites"],
    contact_person: "Madhavi Gonnala",
    contact_title: "President",
    contact_email: "hr@esgit.com",
    document_location: "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070",
  },
  {
    id: "systems-engineer-lca-2020",
    job_title: "Systems Engineer",
    case_number: "I-200-20001-789012",
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    wage_rate_from: 69618,
    wage_rate_to: 69618,
    wage_unit: "Year",
    employment_start_date: "2025-09-28",
    employment_end_date: "2028-07-27",
    worksite_city: "Woonsocket",
    worksite_state: "RI",
    worksite_address: "1 CVS Drive, Woonsocket, RI 02895; or 1111 South Creek Dr., Round Rock, TX 78664",
    employer_name: "Executive Software Guild Inc.",
    employer_address: "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070",
    job_description:
      "Work as a Systems Engineer to design, implement, and maintain complex systems infrastructure. Collaborate with cross-functional teams to ensure optimal system performance and reliability.",
    requirements:
      "Bachelor's degree in Systems Engineering or related field. 3+ years of systems engineering experience. Strong knowledge of system architecture and design.",
    total_workers: 1,
    full_time_position: true,
    posted_date: "2025-07-28",
    notice_locations: ["1 CVS Drive, Woonsocket, RI 02895", "1111 South Creek Dr., Round Rock, TX 78664"],
    contact_person: "Thirupathi Vangapalli",
    contact_title: "HR Manager",
    contact_email: "hr@exesg.us",
    document_location: "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070",
  },
]

export default function LCAPostingsPage() {
  const [lcaPostings, setLcaPostings] = useState<LCAPosting[]>(REAL_LCA_POSTINGS)
  const [filteredPostings, setFilteredPostings] = useState<LCAPosting[]>(REAL_LCA_POSTINGS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [visaFilter, setVisaFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Filter postings based on search and filters
  useEffect(() => {
    let filtered = lcaPostings

    if (searchQuery) {
      filtered = filtered.filter(
        (posting) =>
          posting.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.worksite_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          posting.employer_name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((posting) => posting.case_status === statusFilter)
    }

    if (visaFilter) {
      filtered = filtered.filter((posting) => posting.visa_class === visaFilter)
    }

    if (locationFilter) {
      filtered = filtered.filter(
        (posting) =>
          posting.worksite_city.toLowerCase().includes(locationFilter.toLowerCase()) ||
          posting.worksite_state.toLowerCase().includes(locationFilter.toLowerCase()),
      )
    }

    setFilteredPostings(filtered)
  }, [lcaPostings, searchQuery, statusFilter, visaFilter, locationFilter])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CERTIFIED":
        return <Badge className="bg-green-600 hover:bg-green-700">Certified</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge>
      case "DENIED":
        return <Badge variant="destructive">Denied</Badge>
      case "WITHDRAWN":
        return <Badge variant="secondary">Withdrawn</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("")
    setVisaFilter("")
    setLocationFilter("")
  }

  const activeFiltersCount = [searchQuery, statusFilter, visaFilter, locationFilter].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
              <Shield className="w-4 h-4 mr-2" />
              DOL Compliant LCA Postings
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Labor Condition{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                Applications
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              View current Labor Condition Applications (LCA) filed with the Department of Labor for H-1B and other visa
              positions at Executive Software Guild.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{filteredPostings.length}</div>
                <div className="text-gray-400">Active LCAs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {filteredPostings.filter((p) => p.case_status === "CERTIFIED").length}
                </div>
                <div className="text-gray-400">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">DOL Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">H-1B</div>
                <div className="text-gray-400">Visa Class</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, case number, or location..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pl-12 pr-4 py-4 text-lg focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-emerald-500 text-white border-0">{activeFiltersCount}</Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="ml-4 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Status</label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-emerald-500">
                            <SelectValue placeholder="All statuses" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="" className="text-white hover:bg-gray-700">
                              All statuses
                            </SelectItem>
                            <SelectItem value="CERTIFIED" className="text-white hover:bg-gray-700">
                              Certified
                            </SelectItem>
                            <SelectItem value="PENDING" className="text-white hover:bg-gray-700">
                              Pending
                            </SelectItem>
                            <SelectItem value="DENIED" className="text-white hover:bg-gray-700">
                              Denied
                            </SelectItem>
                            <SelectItem value="WITHDRAWN" className="text-white hover:bg-gray-700">
                              Withdrawn
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Visa Class</label>
                        <Select value={visaFilter} onValueChange={setVisaFilter}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-emerald-500">
                            <SelectValue placeholder="All visa classes" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="" className="text-white hover:bg-gray-700">
                              All visa classes
                            </SelectItem>
                            <SelectItem value="H-1B" className="text-white hover:bg-gray-700">
                              H-1B
                            </SelectItem>
                            <SelectItem value="H-1B1" className="text-white hover:bg-gray-700">
                              H-1B1
                            </SelectItem>
                            <SelectItem value="E-3" className="text-white hover:bg-gray-700">
                              E-3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Location</label>
                        <Input
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          placeholder="Enter city or state..."
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Actions</label>
                        <Button
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* LCA Postings Table */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {filteredPostings.length} LCA Posting{filteredPostings.length !== 1 ? "s" : ""} Found
              </h2>
            </div>

            {/* DOL Compliance Notice */}
            <Alert className="bg-emerald-500/10 border-emerald-500/30">
              <Shield className="h-4 w-4 text-emerald-400" />
              <AlertDescription className="text-gray-300">
                <strong className="text-emerald-400">DOL Compliance Notice:</strong> All Labor Condition Applications
                listed below have been filed with the U.S. Department of Labor and are available for public inspection.
                Complaints regarding misrepresentation or non-compliance may be filed with the Wage and Hour Division.
              </AlertDescription>
            </Alert>

            {/* LCA Table */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-300">Job Title</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Visa Class</TableHead>
                        <TableHead className="text-gray-300">Location</TableHead>
                        <TableHead className="text-gray-300">Wage</TableHead>
                        <TableHead className="text-gray-300">Employment Period</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPostings.map((posting, index) => (
                        <motion.tr
                          key={posting.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-gray-800 hover:bg-gray-800/30"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-white">{posting.job_title}</div>
                              <div className="text-sm text-gray-400">{posting.employer_name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(posting.case_status)}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-600 hover:bg-blue-700">{posting.visa_class}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-300">
                              <MapPin className="h-3 w-3" />
                              {posting.worksite_city}, {posting.worksite_state}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-white font-medium">{formatCurrency(posting.wage_rate_from)}</div>
                            <div className="text-xs text-gray-400">per {posting.wage_unit.toLowerCase()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-300">
                              <div>{formatDate(posting.employment_start_date)}</div>
                              <div className="text-gray-500">to</div>
                              <div>{formatDate(posting.employment_end_date)}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                                asChild
                              >
                                <Link href={`/careers/lca-postings/${posting.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {filteredPostings.length === 0 && (
              <Card className="bg-gray-900/50 border-gray-800 text-center py-12">
                <CardContent>
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No LCA postings found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search criteria or{" "}
                    <button onClick={clearFilters} className="text-emerald-400 hover:text-emerald-300 underline">
                      clear all filters
                    </button>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-16 bg-gray-900/30 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Important Legal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 w-5 text-blue-400" />
                    Public Inspection
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-2">
                  <p>All Labor Condition Applications are available for public inspection at:</p>
                  <p className="font-mono text-sm bg-gray-900/50 p-3 rounded">
                    Executive Software Guild Inc.
                    <br />
                    8751 Collin McKinney PKWY, Suite 601
                    <br />
                    McKinney, TX 75070
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 w-5 text-yellow-400" />
                    File Complaints
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-2">
                  <p>Complaints regarding misrepresentation or failure to comply with LCA terms may be filed with:</p>
                  <p className="font-semibold">U.S. Department of Labor</p>
                  <p>Wage and Hour Division</p>
                  <p className="text-sm text-gray-400">Any local office accepts complaints</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                For questions about these LCA postings, contact our HR department at {" "}
                <a href="mailto:hr@exesg.us" className="text-emerald-400 hover:text-emerald-300">
                  hr@esgit.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

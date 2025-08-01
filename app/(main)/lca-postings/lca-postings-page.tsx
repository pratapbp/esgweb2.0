"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  Download,
  ExternalLink,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface LCAPosting {
  id: string
  job_title: string
  employer_name: string
  worksite_address: string
  wage_rate_from: number
  wage_rate_to: number
  wage_unit: string
  employment_start_date: string
  employment_end_date: string
  case_number: string
  case_status: string
  decision_date: string
  visa_class: string
  soc_code: string
  soc_title: string
  full_time_position: boolean
  prevailing_wage: number
  pw_unit_of_pay: string
  pw_source: string
  other_wage_source: string
  yr_source_pub: string
  worksite_city: string
  worksite_county: string
  worksite_state: string
  worksite_postal_code: string
  created_at: string
  updated_at: string
}

const mockLCAPostings: LCAPosting[] = [
  {
    id: "1",
    job_title: "Senior Software Engineer",
    employer_name: "Executive Software Guild Inc.",
    worksite_address: "123 Tech Plaza, Suite 500",
    wage_rate_from: 120000,
    wage_rate_to: 160000,
    wage_unit: "Year",
    employment_start_date: "2024-03-01",
    employment_end_date: "2027-02-28",
    case_number: "I-200-24001-123456",
    case_status: "Certified",
    decision_date: "2024-01-15",
    visa_class: "H-1B",
    soc_code: "15-1132",
    soc_title: "Software Developers, Applications",
    full_time_position: true,
    prevailing_wage: 115000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    other_wage_source: "",
    yr_source_pub: "2023",
    worksite_city: "New York",
    worksite_county: "New York",
    worksite_state: "NY",
    worksite_postal_code: "10001",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    job_title: "SAP S/4HANA Consultant",
    employer_name: "Executive Software Guild Inc.",
    worksite_address: "456 Business Center Dr",
    wage_rate_from: 110000,
    wage_rate_to: 145000,
    wage_unit: "Year",
    employment_start_date: "2024-04-01",
    employment_end_date: "2027-03-31",
    case_number: "I-200-24002-789012",
    case_status: "Certified",
    decision_date: "2024-01-20",
    visa_class: "H-1B",
    soc_code: "15-1121",
    soc_title: "Computer Systems Analysts",
    full_time_position: true,
    prevailing_wage: 105000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    other_wage_source: "",
    yr_source_pub: "2023",
    worksite_city: "Austin",
    worksite_county: "Travis",
    worksite_state: "TX",
    worksite_postal_code: "78701",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    job_title: "Data Scientist",
    employer_name: "Executive Software Guild Inc.",
    worksite_address: "789 Innovation Way",
    wage_rate_from: 95000,
    wage_rate_to: 130000,
    wage_unit: "Year",
    employment_start_date: "2024-05-01",
    employment_end_date: "2027-04-30",
    case_number: "I-200-24003-345678",
    case_status: "Certified",
    decision_date: "2024-01-25",
    visa_class: "H-1B",
    soc_code: "15-2051",
    soc_title: "Data Scientists",
    full_time_position: true,
    prevailing_wage: 92000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    other_wage_source: "",
    yr_source_pub: "2023",
    worksite_city: "San Francisco",
    worksite_county: "San Francisco",
    worksite_state: "CA",
    worksite_postal_code: "94105",
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
  },
  {
    id: "4",
    job_title: "Cloud Solutions Architect",
    employer_name: "Executive Software Guild Inc.",
    worksite_address: "321 Cloud Street",
    wage_rate_from: 125000,
    wage_rate_to: 165000,
    wage_unit: "Year",
    employment_start_date: "2024-06-01",
    employment_end_date: "2027-05-31",
    case_number: "I-200-24004-901234",
    case_status: "Certified",
    decision_date: "2024-02-01",
    visa_class: "H-1B",
    soc_code: "15-1199",
    soc_title: "Computer Occupations, All Other",
    full_time_position: true,
    prevailing_wage: 120000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    other_wage_source: "",
    yr_source_pub: "2023",
    worksite_city: "Seattle",
    worksite_county: "King",
    worksite_state: "WA",
    worksite_postal_code: "98101",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "5",
    job_title: "Cybersecurity Analyst",
    employer_name: "Executive Software Guild Inc.",
    worksite_address: "654 Security Blvd",
    wage_rate_from: 85000,
    wage_rate_to: 115000,
    wage_unit: "Year",
    employment_start_date: "2024-07-01",
    employment_end_date: "2027-06-30",
    case_number: "I-200-24005-567890",
    case_status: "Certified",
    decision_date: "2024-02-05",
    visa_class: "H-1B",
    soc_code: "15-1122",
    soc_title: "Information Security Analysts",
    full_time_position: true,
    prevailing_wage: 82000,
    pw_unit_of_pay: "Year",
    pw_source: "OES",
    other_wage_source: "",
    yr_source_pub: "2023",
    worksite_city: "Washington",
    worksite_county: "District of Columbia",
    worksite_state: "DC",
    worksite_postal_code: "20001",
    created_at: "2024-02-05T00:00:00Z",
    updated_at: "2024-02-05T00:00:00Z",
  },
]

const states = [
  "All States",
  "CA",
  "NY",
  "TX",
  "WA",
  "DC",
  "FL",
  "IL",
  "MA",
  "VA",
  "GA",
  "NC",
  "PA",
  "OH",
  "MI",
  "NJ",
  "CO",
  "AZ",
  "OR",
  "MN",
]

const visaClasses = ["All Visa Classes", "H-1B", "H-1B1", "E-3", "L-1", "O-1", "TN"]

const caseStatuses = ["All Statuses", "Certified", "Certified-Withdrawn", "Denied", "Withdrawn"]

export default function LCAPostingsPage() {
  const [lcaPostings, setLcaPostings] = useState<LCAPosting[]>(mockLCAPostings)
  const [filteredPostings, setFilteredPostings] = useState<LCAPosting[]>(mockLCAPostings)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedVisaClass, setSelectedVisaClass] = useState("All Visa Classes")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedPosting, setSelectedPosting] = useState<LCAPosting | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filter postings based on search and filters
  useEffect(() => {
    const filtered = lcaPostings.filter((posting) => {
      const matchesSearch =
        posting.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.soc_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.worksite_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        posting.case_number.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesState = selectedState === "All States" || posting.worksite_state === selectedState

      const matchesVisaClass = selectedVisaClass === "All Visa Classes" || posting.visa_class === selectedVisaClass

      const matchesStatus = selectedStatus === "All Statuses" || posting.case_status === selectedStatus

      return matchesSearch && matchesState && matchesVisaClass && matchesStatus
    })

    // Sort by decision date (newest first)
    filtered.sort((a, b) => new Date(b.decision_date).getTime() - new Date(a.decision_date).getTime())

    setFilteredPostings(filtered)
  }, [lcaPostings, searchQuery, selectedState, selectedVisaClass, selectedStatus])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Certified: "bg-green-500/20 text-green-400 border-green-500/30",
      "Certified-Withdrawn": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Denied: "bg-red-500/20 text-red-400 border-red-500/30",
      Withdrawn: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Certified":
        return <CheckCircle className="h-4 w-4" />
      case "Denied":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const downloadLCAData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    const csvContent = [
      "Job Title,Employer,Location,Wage Range,Case Number,Status,Decision Date",
      ...filteredPostings.map(
        (posting) =>
          `"${posting.job_title}","${posting.employer_name}","${posting.worksite_city}, ${posting.worksite_state}","${formatCurrency(posting.wage_rate_from)} - ${formatCurrency(posting.wage_rate_to)}","${posting.case_number}","${posting.case_status}","${formatDate(posting.decision_date)}"`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lca-postings-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success("LCA data downloaded successfully")
  }

  const stats = {
    totalPostings: filteredPostings.length,
    certifiedPostings: filteredPostings.filter((p) => p.case_status === "Certified").length,
    averageWage:
      filteredPostings.length > 0
        ? Math.round(
            filteredPostings.reduce((sum, p) => sum + (p.wage_rate_from + p.wage_rate_to) / 2, 0) /
              filteredPostings.length,
          )
        : 0,
    uniqueStates: new Set(filteredPostings.map((p) => p.worksite_state)).size,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              LCA{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Postings
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Labor Condition Applications (LCA) filed by Executive Software Guild Inc. for H-1B and other visa
              classifications. All postings are in compliance with Department of Labor requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={downloadLCAData}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Download LCA Data
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold bg-transparent"
                asChild
              >
                <a href="https://www.dol.gov/agencies/eta/foreign-labor" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  DOL Information
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                label: "Total Postings",
                value: stats.totalPostings.toString(),
                icon: <FileText className="h-6 w-6" />,
              },
              {
                label: "Certified",
                value: stats.certifiedPostings.toString(),
                icon: <CheckCircle className="h-6 w-6" />,
              },
              {
                label: "Avg. Wage",
                value: formatCurrency(stats.averageWage),
                icon: <DollarSign className="h-6 w-6" />,
              },
              { label: "States", value: stats.uniqueStates.toString(), icon: <MapPin className="h-6 w-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2 text-blue-400">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by job title, location, or case number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {states.map((state) => (
                      <SelectItem key={state} value={state} className="text-white hover:bg-gray-700">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedVisaClass} onValueChange={setSelectedVisaClass}>
                  <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Visa Class" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {visaClasses.map((visaClass) => (
                      <SelectItem key={visaClass} value={visaClass} className="text-white hover:bg-gray-700">
                        {visaClass}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {caseStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="text-white hover:bg-gray-700">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                {filteredPostings.length} posting{filteredPostings.length !== 1 ? "s" : ""} found
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Filter className="h-4 w-4" />
                  <span>Filters applied</span>
                </div>
                <Button
                  onClick={downloadLCAData}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LCA Listings */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-6">
            {filteredPostings.map((posting, index) => (
              <motion.div
                key={posting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white mb-2">{posting.job_title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            {posting.employer_name}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {posting.worksite_city}, {posting.worksite_state}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Decision: {formatDate(posting.decision_date)}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {posting.case_number}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(posting.case_status)}>
                          {getStatusIcon(posting.case_status)}
                          <span className="ml-1">{posting.case_status}</span>
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {posting.visa_class}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Wage Range</div>
                        <div className="text-white font-semibold">
                          {formatCurrency(posting.wage_rate_from)} - {formatCurrency(posting.wage_rate_to)}
                        </div>
                        <div className="text-xs text-gray-500">per {posting.wage_unit.toLowerCase()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Prevailing Wage</div>
                        <div className="text-white font-semibold">{formatCurrency(posting.prevailing_wage)}</div>
                        <div className="text-xs text-gray-500">per {posting.pw_unit_of_pay.toLowerCase()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Employment Period</div>
                        <div className="text-white font-semibold">{formatDate(posting.employment_start_date)}</div>
                        <div className="text-xs text-gray-500">to {formatDate(posting.employment_end_date)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">SOC Code</div>
                        <div className="text-white font-semibold">{posting.soc_code}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{posting.soc_title}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                            onClick={() => setSelectedPosting(posting)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-white">{posting.job_title}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                              Case Number: {posting.case_number} • Status: {posting.case_status}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 mt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Employment Details</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-sm text-gray-400">Job Title</div>
                                    <div className="text-white">{posting.job_title}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Employer</div>
                                    <div className="text-white">{posting.employer_name}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Full-Time Position</div>
                                    <div className="text-white">{posting.full_time_position ? "Yes" : "No"}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Employment Period</div>
                                    <div className="text-white">
                                      {formatDate(posting.employment_start_date)} to{" "}
                                      {formatDate(posting.employment_end_date)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Worksite Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-sm text-gray-400">Address</div>
                                    <div className="text-white">{posting.worksite_address}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">City, State</div>
                                    <div className="text-white">
                                      {posting.worksite_city}, {posting.worksite_state}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">County</div>
                                    <div className="text-white">{posting.worksite_county}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Postal Code</div>
                                    <div className="text-white">{posting.worksite_postal_code}</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Separator className="bg-gray-700" />

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Wage Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-sm text-gray-400">Wage Range</div>
                                    <div className="text-white font-semibold">
                                      {formatCurrency(posting.wage_rate_from)} - {formatCurrency(posting.wage_rate_to)}{" "}
                                      per {posting.wage_unit.toLowerCase()}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Prevailing Wage</div>
                                    <div className="text-white">
                                      {formatCurrency(posting.prevailing_wage)} per{" "}
                                      {posting.pw_unit_of_pay.toLowerCase()}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Prevailing Wage Source</div>
                                    <div className="text-white">{posting.pw_source}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Source Publication Year</div>
                                    <div className="text-white">{posting.yr_source_pub}</div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Case Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-sm text-gray-400">Case Number</div>
                                    <div className="text-white font-mono">{posting.case_number}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Case Status</div>
                                    <div className="flex items-center">
                                      <Badge className={getStatusColor(posting.case_status)}>
                                        {getStatusIcon(posting.case_status)}
                                        <span className="ml-1">{posting.case_status}</span>
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Decision Date</div>
                                    <div className="text-white">{formatDate(posting.decision_date)}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-400">Visa Class</div>
                                    <div className="text-white">{posting.visa_class}</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Separator className="bg-gray-700" />

                            <div>
                              <h3 className="text-lg font-semibold text-white mb-3">Occupation Classification</h3>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <div className="text-sm text-gray-400">SOC Code</div>
                                  <div className="text-white font-mono">{posting.soc_code}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">SOC Title</div>
                                  <div className="text-white">{posting.soc_title}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPostings.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No LCA postings found</h3>
                <p>Try adjusting your search criteria or check back later for new postings.</p>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedState("All States")
                  setSelectedVisaClass("All Visa Classes")
                  setSelectedStatus("All Statuses")
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Legal Notice</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                This page contains Labor Condition Applications (LCA) filed by Executive Software Guild Inc. with the
                U.S. Department of Labor for H-1B and other temporary worker visa classifications. These postings are
                made available in compliance with federal regulations.
              </p>
              <p>
                The information displayed includes job titles, wage ranges, work locations, and other details as
                required by law. All wage rates meet or exceed the prevailing wage for the occupation in the geographic
                area of employment.
              </p>
              <p>
                For questions about these postings or to file a complaint, please contact our HR department or visit the
                Department of Labor's website for more information about worker rights and employer obligations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a
                  href="https://www.dol.gov/agencies/eta/foreign-labor/wages"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  DOL Wage Information
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a
                  href="https://www.dol.gov/agencies/eta/foreign-labor/compliance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  File a Complaint
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

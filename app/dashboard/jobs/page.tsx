"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary_min: number
  salary_max: number
  status: "Active" | "Draft" | "Closed" | "Paused"
  applications_count: number
  posted_date: string
  closing_date: string
  remote_allowed: boolean
  experience_level: "Entry" | "Mid" | "Senior" | "Lead"
  visa_sponsorship: boolean
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    salary_min: 140000,
    salary_max: 180000,
    status: "Active",
    applications_count: 23,
    posted_date: "2024-01-15",
    closing_date: "2024-02-15",
    remote_allowed: true,
    experience_level: "Senior",
    visa_sponsorship: true,
  },
  {
    id: "2",
    title: "SAP BRIM Consultant",
    department: "SAP Consulting",
    location: "Dallas, TX",
    type: "Full-time",
    salary_min: 120000,
    salary_max: 150000,
    status: "Active",
    applications_count: 18,
    posted_date: "2024-01-12",
    closing_date: "2024-02-12",
    remote_allowed: false,
    experience_level: "Mid",
    visa_sponsorship: true,
  },
  {
    id: "3",
    title: "Product Manager - AI Solutions",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary_min: 130000,
    salary_max: 160000,
    status: "Draft",
    applications_count: 0,
    posted_date: "2024-01-10",
    closing_date: "2024-02-10",
    remote_allowed: true,
    experience_level: "Senior",
    visa_sponsorship: false,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "McKinney, TX",
    type: "Full-time",
    salary_min: 110000,
    salary_max: 140000,
    status: "Paused",
    applications_count: 12,
    posted_date: "2024-01-08",
    closing_date: "2024-02-08",
    remote_allowed: true,
    experience_level: "Mid",
    visa_sponsorship: true,
  },
  {
    id: "5",
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Houston, TX",
    type: "Full-time",
    salary_min: 95000,
    salary_max: 125000,
    status: "Closed",
    applications_count: 34,
    posted_date: "2023-12-20",
    closing_date: "2024-01-20",
    remote_allowed: false,
    experience_level: "Mid",
    visa_sponsorship: false,
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    filterJobs()
  }, [searchQuery, statusFilter, departmentFilter, jobs])

  const filterJobs = () => {
    let filtered = jobs

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((job) => job.department.toLowerCase() === departmentFilter.toLowerCase())
    }

    setFilteredJobs(filtered)
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>
      case "Paused":
        return (
          <Badge variant="outline" className="border-yellow-600 text-yellow-400">
            Paused
          </Badge>
        )
      case "Closed":
        return <Badge variant="destructive">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "Draft":
        return <Edit className="h-4 w-4 text-gray-400" />
      case "Paused":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "Closed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeBadge = (type: string, remote: boolean) => {
    if (remote && type !== "Remote") {
      return (
        <Badge variant="outline" className="border-blue-600/30 text-blue-400">
          {type} (Remote OK)
        </Badge>
      )
    }
    return <Badge variant="outline">{type}</Badge>
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      // Mock delete operation
      setJobs((prev) => prev.filter((job) => job.id !== jobId))
      toast({
        title: "Job Deleted",
        description: "The job posting has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job posting.",
        variant: "destructive",
      })
    }
  }

  const activeJobs = jobs.filter((job) => job.status === "Active")
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications_count, 0)
  const draftJobs = jobs.filter((job) => job.status === "Draft")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Jobs Management</h1>
          <p className="text-gray-400">Manage job postings, applications, and recruitment pipeline</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import Jobs
          </Button>
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
            <Link href="/dashboard/jobs/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-white">{activeJobs.length}</p>
                <p className="text-xs text-gray-500">of {jobs.length} total</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Applications</p>
                <p className="text-2xl font-bold text-white">{totalApplications}</p>
                <p className="text-xs text-green-400">+12 this week</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Draft Jobs</p>
                <p className="text-2xl font-bold text-white">{draftJobs.length}</p>
                <p className="text-xs text-yellow-400">Pending review</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg. Applications</p>
                <p className="text-2xl font-bold text-white">{Math.round(totalApplications / jobs.length)}</p>
                <p className="text-xs text-gray-500">per job</p>
              </div>
              <Building className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Filter Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs by title, department, or location..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sap consulting">SAP Consulting</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Job Listings</CardTitle>
          <CardDescription className="text-gray-400">
            Manage all job postings and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Job Title</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Salary Range</TableHead>
                  <TableHead className="text-gray-300">Applications</TableHead>
                  <TableHead className="text-gray-300">Posted</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{job.title}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                          {job.visa_sponsorship && (
                            <Badge variant="outline" className="border-purple-600/30 text-purple-400 text-xs">
                              Visa Sponsor
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{job.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        {getStatusBadge(job.status)}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(job.type, job.remote_allowed)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
                      <div className="text-xs text-gray-500">{job.experience_level} level</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-white font-medium">{job.applications_count}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(job.posted_date)}
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
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          asChild
                        >
                          <Link href={`/dashboard/jobs/${job.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-700 text-red-400 hover:bg-red-900/20 bg-transparent"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No jobs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

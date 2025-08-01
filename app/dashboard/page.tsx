"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Server,
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  Search,
  MapPin,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Ensure this file is the primary `/dashboard` route.
// If needed, move conflicting files to a different route group.

interface DashboardStats {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  newApplications: number
  lcaPostings: number
  certifiedLCAs: number
  pendingLCAs: number
  systemHealth: number
  complianceScore: number
}

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
}

interface LCAPosting {
  id: string
  job_title: string
  case_number: string
  case_status: string
  visa_class: string
  wage_rate_from: number
  wage_rate_to: number
  wage_unit: string
  employment_start_date: string
  employment_end_date: string
  worksite_city: string
  worksite_state: string
  created_at: string
}

interface RecentActivity {
  id: string
  type: "job_posted" | "application_received" | "lca_certified" | "system_alert"
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "info" | "error"
}

const MOCK_STATS: DashboardStats = {
  totalJobs: 24,
  activeJobs: 18,
  totalApplications: 156,
  newApplications: 12,
  lcaPostings: 8,
  certifiedLCAs: 6,
  pendingLCAs: 2,
  systemHealth: 98,
  complianceScore: 100,
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
  },
]

const MOCK_LCAS: LCAPosting[] = [
  {
    id: "1",
    job_title: "Software Engineer",
    case_number: "I-200-24001-123456",
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    wage_rate_from: 149781,
    wage_rate_to: 149781,
    wage_unit: "Year",
    employment_start_date: "2025-10-01",
    employment_end_date: "2028-09-30",
    worksite_city: "McKinney",
    worksite_state: "TX",
    created_at: "2025-07-30T00:00:00Z",
  },
  {
    id: "2",
    job_title: "Systems Engineer",
    case_number: "I-200-24001-654321",
    case_status: "CERTIFIED",
    visa_class: "H-1B",
    wage_rate_from: 69618,
    wage_rate_to: 69618,
    wage_unit: "Year",
    employment_start_date: "2020-10-01",
    employment_end_date: "2023-09-30",
    worksite_city: "Woonsocket",
    worksite_state: "RI",
    created_at: "2020-09-15T00:00:00Z",
  },
]

const MOCK_ACTIVITIES: RecentActivity[] = [
  {
    id: "1",
    type: "lca_certified",
    title: "LCA Certified",
    description: "Software Engineer position (Case: I-200-24001-123456) has been certified by DOL",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    id: "2",
    type: "application_received",
    title: "New Application",
    description: "Application received for Senior SAP Consultant position",
    timestamp: "4 hours ago",
    status: "info",
  },
  {
    id: "3",
    type: "job_posted",
    title: "Job Posted",
    description: "Product Manager - AI Solutions position has been published",
    timestamp: "1 day ago",
    status: "success",
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS)
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [lcas, setLcas] = useState<LCAPosting[]>(MOCK_LCAS)
  const [activities, setActivities] = useState<RecentActivity[]>(MOCK_ACTIVITIES)
  const [jobSearchQuery, setJobSearchQuery] = useState("")
  const [jobStatusFilter, setJobStatusFilter] = useState("all")
  const [lcaSearchQuery, setLcaSearchQuery] = useState("")
  const [lcaStatusFilter, setLcaStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Mock API call - in real app would fetch from /api/dashboard
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStats(MOCK_STATS)
      setJobs(MOCK_JOBS)
      setLcas(MOCK_LCAS)
      setActivities(MOCK_ACTIVITIES)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
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
      case "CERTIFIED":
        return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
      case "Draft":
      case "PENDING":
        return <Badge variant="secondary">Draft</Badge>
      case "Paused":
        return (
          <Badge variant="outline" className="border-yellow-600 text-yellow-400">
            Paused
          </Badge>
        )
      case "Closed":
      case "DENIED":
        return <Badge variant="destructive">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "job_posted":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "application_received":
        return <Users className="h-4 w-4 text-green-400" />
      case "lca_certified":
        return <Shield className="h-4 w-4 text-emerald-400" />
      case "system_alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
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

  const handleDeleteLCA = async (lcaId: string) => {
    try {
      setLcas((prev) => prev.filter((lca) => lca.id !== lcaId))
      toast({
        title: "LCA Deleted",
        description: "The LCA posting has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete LCA posting.",
        variant: "destructive",
      })
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearchQuery.toLowerCase())
    const matchesStatus = jobStatusFilter === "all" || job.status.toLowerCase() === jobStatusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const filteredLCAs = lcas.filter((lca) => {
    const matchesSearch =
      lca.job_title.toLowerCase().includes(lcaSearchQuery.toLowerCase()) ||
      lca.case_number.toLowerCase().includes(lcaSearchQuery.toLowerCase()) ||
      lca.worksite_city.toLowerCase().includes(lcaSearchQuery.toLowerCase())
    const matchesStatus = lcaStatusFilter === "all" || lca.case_status.toLowerCase() === lcaStatusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back! Manage your job postings and LCA applications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-600/30 text-green-400">
            System Healthy
          </Badge>
          <Badge variant="outline" className="border-blue-600/30 text-blue-400">
            All Services Online
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-white">{stats.activeJobs}</p>
                <p className="text-xs text-gray-500">of {stats.totalJobs} total</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-white">{stats.totalApplications}</p>
                <p className="text-xs text-green-400">+{stats.newApplications} new</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">LCA Postings</p>
                <p className="text-2xl font-bold text-white">{stats.lcaPostings}</p>
                <p className="text-xs text-emerald-400">{stats.certifiedLCAs} certified</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Compliance</p>
                <p className="text-2xl font-bold text-white">{stats.complianceScore}%</p>
                <p className="text-xs text-emerald-400">DOL Compliant</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-16 bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/jobs/create">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Create Job</span>
                </div>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Link href="/dashboard/lca-postings/upload">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6" />
                  <span>Upload LCA</span>
                </div>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Link href="/dashboard/applications">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Review Applications</span>
                </div>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Link href="/dashboard/analytics">
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Analytics</span>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Management Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                Job Management
              </CardTitle>
              <CardDescription className="text-gray-400">Manage job postings and track applications</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/dashboard/jobs/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Link href="/dashboard/jobs">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Job Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs by title, department, or location..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Select value={jobStatusFilter} onValueChange={setJobStatusFilter}>
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
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Job Title</TableHead>
                  <TableHead className="text-gray-300">Department</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Applications</TableHead>
                  <TableHead className="text-gray-300">Salary</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.slice(0, 5).map((job) => (
                  <TableRow key={job.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell>
                      <div className="font-medium text-white">{job.title}</div>
                      <div className="text-sm text-gray-400">{job.type}</div>
                    </TableCell>
                    <TableCell className="text-gray-300">{job.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-white font-medium">{job.applications_count}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
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

      {/* LCA Management Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                LCA Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage Labor Condition Applications and DOL compliance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/dashboard/lca-postings/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload LCA
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Link href="/dashboard/lca-postings">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* LCA Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search LCAs by title, case number, or location..."
                  value={lcaSearchQuery}
                  onChange={(e) => setLcaSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Select value={lcaStatusFilter} onValueChange={setLcaStatusFilter}>
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
          </div>

          {/* LCAs Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Job Title</TableHead>
                  <TableHead className="text-gray-300">Case Number</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Visa Class</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Wage</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLCAs.map((lca) => (
                  <TableRow key={lca.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell className="text-white font-medium">{lca.job_title}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{lca.case_number}</TableCell>
                    <TableCell>{getStatusBadge(lca.case_status)}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-600 hover:bg-blue-700">{lca.visa_class}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="h-3 w-3" />
                        {lca.worksite_city}, {lca.worksite_state}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatCurrency(lca.wage_rate_from)}
                      <div className="text-xs text-gray-500">/{lca.wage_unit}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          asChild
                        >
                          <Link href={`/dashboard/lca-postings/${lca.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                          asChild
                        >
                          <Link href={`/dashboard/lca-postings/${lca.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-700 text-red-400 hover:bg-red-900/20 bg-transparent"
                          onClick={() => handleDeleteLCA(lca.id)}
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

          {filteredLCAs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No LCA postings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-cyan-400" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Overall Health</span>
                <span className="text-white">{stats.systemHealth}%</span>
              </div>
              <Progress value={stats.systemHealth} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Database</span>
                <Badge variant="outline" className="border-green-600/30 text-green-400">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Services</span>
                <Badge variant="outline" className="border-green-600/30 text-green-400">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">File Storage</span>
                <Badge variant="outline" className="border-green-600/30 text-green-400">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Email Service</span>
                <Badge variant="outline" className="border-green-600/30 text-green-400">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                    <p className={`text-xs mt-1 ${getStatusColor(activity.status)}`}>{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alert */}
      <Alert className="bg-emerald-500/10 border-emerald-500/30">
        <Shield className="h-4 w-4 text-emerald-400" />
        <AlertDescription className="text-gray-300">
          <strong className="text-emerald-400">Compliance Status:</strong> All LCA postings are DOL compliant. System
          automatically monitors regulatory requirements and maintains audit trails for all submissions.
        </AlertDescription>
      </Alert>
    </div>
  )
}

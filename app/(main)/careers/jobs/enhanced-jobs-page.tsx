"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Users,
  Filter,
  Briefcase,
  Plus,
  Sparkles,
  Star,
  Calendar,
  ArrowRight,
  AlertCircle,
  Eye,
  Bookmark,
  Share2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Job {
  id: string
  title: string
  department: string
  location: string
  remote_type: "remote" | "hybrid" | "onsite"
  employment_type: "full-time" | "part-time" | "contract" | "internship"
  experience_level: "entry" | "mid" | "senior" | "executive"
  salary_min?: number
  salary_max?: number
  description: string
  requirements: string[]
  technologies: string[]
  benefits: string[]
  featured: boolean
  posted_date: string
  expires_at?: string
  applications_count: number
  views_count: number
  status: "active" | "draft" | "closed"
  hiring_manager_name: string
  hiring_manager_title: string
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    remote_type: "hybrid",
    employment_type: "full-time",
    experience_level: "senior",
    salary_min: 140000,
    salary_max: 180000,
    description: "Join our innovative team to build next-generation enterprise software solutions...",
    requirements: ["5+ years of full-stack development", "React and Node.js expertise", "Cloud platform experience"],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    benefits: ["Health Insurance", "401(k) Matching", "Remote Work", "Professional Development"],
    featured: true,
    posted_date: "2024-01-15",
    expires_at: "2024-02-15",
    applications_count: 24,
    views_count: 156,
    status: "active",
    hiring_manager_name: "Sarah Johnson",
    hiring_manager_title: "VP of Engineering",
  },
  {
    id: "2",
    title: "Product Manager - AI Solutions",
    department: "Product",
    location: "New York, NY",
    remote_type: "remote",
    employment_type: "full-time",
    experience_level: "mid",
    salary_min: 120000,
    salary_max: 150000,
    description: "Lead the development of cutting-edge AI-powered products...",
    requirements: ["3+ years product management", "AI/ML product experience", "Strong analytical skills"],
    technologies: ["Python", "TensorFlow", "Product Analytics", "Figma"],
    benefits: ["Health Insurance", "Stock Options", "Flexible PTO", "Learning Budget"],
    featured: false,
    posted_date: "2024-01-12",
    applications_count: 18,
    views_count: 89,
    status: "active",
    hiring_manager_name: "Michael Chen",
    hiring_manager_title: "Head of Product",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    remote_type: "onsite",
    employment_type: "full-time",
    experience_level: "mid",
    salary_min: 110000,
    salary_max: 140000,
    description: "Build and maintain our cloud infrastructure and deployment pipelines...",
    requirements: ["3+ years DevOps experience", "Kubernetes expertise", "CI/CD pipeline management"],
    technologies: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins"],
    benefits: ["Health Insurance", "401(k)", "Gym Membership", "Catered Meals"],
    featured: false,
    posted_date: "2024-01-10",
    applications_count: 12,
    views_count: 67,
    status: "active",
    hiring_manager_name: "David Rodriguez",
    hiring_manager_title: "Engineering Manager",
  },
]

export default function EnhancedJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [remoteFilter, setRemoteFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (departmentFilter) {
      filtered = filtered.filter((job) => job.department === departmentFilter)
    }

    if (remoteFilter) {
      filtered = filtered.filter((job) => job.remote_type === remoteFilter)
    }

    if (experienceFilter) {
      filtered = filtered.filter((job) => job.experience_level === experienceFilter)
    }

    if (locationFilter) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, locationFilter, departmentFilter, remoteFilter, experienceFilter])

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary not specified"
    if (min && max) {
      return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
    }
    if (min) return `From $${(min / 1000).toFixed(0)}k`
    return `Up to $${(max! / 1000).toFixed(0)}k`
  }

  const getRemoteTypeLabel = (type: string) => {
    switch (type) {
      case "remote":
        return "Remote"
      case "hybrid":
        return "Hybrid"
      case "onsite":
        return "On-site"
      default:
        return type
    }
  }

  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case "entry":
        return "Entry Level"
      case "mid":
        return "Mid Level"
      case "senior":
        return "Senior Level"
      case "executive":
        return "Executive"
      default:
        return level
    }
  }

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSaved = new Set(prev)
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId)
        toast.success("Job removed from saved")
      } else {
        newSaved.add(jobId)
        toast.success("Job saved successfully")
      }
      return newSaved
    })
  }

  const handleShareJob = (job: Job) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at Executive Software Guild`,
        url: `${window.location.origin}/careers/jobs/${job.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/careers/jobs/${job.id}`)
      toast.success("Job link copied to clipboard")
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setDepartmentFilter("")
    setRemoteFilter("")
    setExperienceFilter("")
  }

  const activeFiltersCount = [searchQuery, locationFilter, departmentFilter, remoteFilter, experienceFilter].filter(
    Boolean,
  ).length

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section with Post Job CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30">
                <Briefcase className="w-4 h-4 mr-2" />
                {filteredJobs.length} Open Positions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Team</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Discover exciting career opportunities and help us build the future of enterprise software solutions
              </p>
            </div>

            {/* Post Job CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/careers/jobs/post")}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post New Job
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 px-8 py-4 text-lg bg-transparent"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                AI Job Matching
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{jobs.length}</div>
              <div className="text-gray-400">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {jobs.reduce((sum, job) => sum + job.applications_count, 0)}
              </div>
              <div className="text-gray-400">Applications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <div className="text-gray-400">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Remote Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, skills, or keywords..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pl-12 pr-4 py-4 text-lg focus:border-cyan-500 focus:ring-cyan-500/20"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-cyan-500 text-white border-0">{activeFiltersCount}</Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Department</label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                        <SelectValue placeholder="All departments" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all" className="text-white hover:bg-gray-700">
                          All departments
                        </SelectItem>
                        <SelectItem value="Engineering" className="text-white hover:bg-gray-700">
                          Engineering
                        </SelectItem>
                        <SelectItem value="Product" className="text-white hover:bg-gray-700">
                          Product
                        </SelectItem>
                        <SelectItem value="Design" className="text-white hover:bg-gray-700">
                          Design
                        </SelectItem>
                        <SelectItem value="Sales" className="text-white hover:bg-gray-700">
                          Sales
                        </SelectItem>
                        <SelectItem value="Marketing" className="text-white hover:bg-gray-700">
                          Marketing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Work Style</label>
                    <Select value={remoteFilter} onValueChange={setRemoteFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                        <SelectValue placeholder="All work styles" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all" className="text-white hover:bg-gray-700">
                          All work styles
                        </SelectItem>
                        <SelectItem value="remote" className="text-white hover:bg-gray-700">
                          Remote
                        </SelectItem>
                        <SelectItem value="hybrid" className="text-white hover:bg-gray-700">
                          Hybrid
                        </SelectItem>
                        <SelectItem value="onsite" className="text-white hover:bg-gray-700">
                          On-site
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Experience Level</label>
                    <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all" className="text-white hover:bg-gray-700">
                          All levels
                        </SelectItem>
                        <SelectItem value="entry" className="text-white hover:bg-gray-700">
                          Entry Level
                        </SelectItem>
                        <SelectItem value="mid" className="text-white hover:bg-gray-700">
                          Mid Level
                        </SelectItem>
                        <SelectItem value="senior" className="text-white hover:bg-gray-700">
                          Senior Level
                        </SelectItem>
                        <SelectItem value="executive" className="text-white hover:bg-gray-700">
                          Executive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Location</label>
                    <Input
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      placeholder="Enter location..."
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <Card className="bg-gray-900/50 border-gray-800 text-center py-12">
              <CardContent>
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search criteria or{" "}
                  <button onClick={clearFilters} className="text-cyan-400 hover:text-cyan-300 underline">
                    clear all filters
                  </button>
                </p>
                <Button
                  onClick={() => router.push("/careers/jobs/post")}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post a New Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
                </h2>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="newest" className="text-white hover:bg-gray-700">
                      Newest First
                    </SelectItem>
                    <SelectItem value="oldest" className="text-white hover:bg-gray-700">
                      Oldest First
                    </SelectItem>
                    <SelectItem value="salary-high" className="text-white hover:bg-gray-700">
                      Highest Salary
                    </SelectItem>
                    <SelectItem value="salary-low" className="text-white hover:bg-gray-700">
                      Lowest Salary
                    </SelectItem>
                    <SelectItem value="applications" className="text-white hover:bg-gray-700">
                      Most Applications
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Cards */}
              <div className="grid gap-6">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30">
                              {job.department}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-500/10"
                            >
                              {job.employment_type}
                            </Badge>
                            {job.remote_type === "remote" && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30">
                                Remote OK
                              </Badge>
                            )}
                            {job.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveJob(job.id)}
                              className={`${
                                savedJobs.has(job.id) ? "text-yellow-400" : "text-gray-400"
                              } hover:text-yellow-300 hover:bg-gray-800`}
                            >
                              <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShareJob(job)}
                              className="text-gray-400 hover:text-cyan-300 hover:bg-gray-800"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <CardTitle className="text-white text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                          {job.title}
                        </CardTitle>

                        <div className="flex items-center text-gray-400 text-sm">
                          <Building className="h-4 w-4 mr-1" />
                          {getExperienceLevelLabel(job.experience_level)}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center text-gray-300">
                            <MapPin className="h-4 w-4 mr-2 text-cyan-400 flex-shrink-0" />
                            <span>
                              {job.location} • {getRemoteTypeLabel(job.remote_type)}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <DollarSign className="h-4 w-4 mr-2 text-emerald-400 flex-shrink-0" />
                            <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Clock className="h-4 w-4 mr-2 text-purple-400 flex-shrink-0" />
                            <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                          </div>

                          {job.expires_at && (
                            <div className="flex items-center text-gray-300">
                              <Calendar className="h-4 w-4 mr-2 text-orange-400 flex-shrink-0" />
                              <span>Apply by {new Date(job.expires_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-300 mb-6 line-clamp-3">{job.description}</p>

                        {/* Technologies */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.slice(0, 5).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-gray-600 text-gray-300 text-xs hover:bg-gray-800"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {job.technologies.length > 5 && (
                              <Badge
                                variant="outline"
                                className="border-gray-600 text-gray-400 text-xs hover:bg-gray-800"
                              >
                                +{job.technologies.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {job.views_count} views
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.applications_count} applications
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {job.hiring_manager_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="text-right">
                              <div className="text-white text-sm font-medium">{job.hiring_manager_name}</div>
                              <div className="text-gray-400 text-xs">{job.hiring_manager_title}</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <Button
                            onClick={() => router.push(`/careers/jobs/${job.id}`)}
                            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white flex-1 border-0"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent"
                          >
                            Quick Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See the Perfect Role?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
            mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/careers/jobs/post")}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post a Job Opening
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent px-8 py-4"
            >
              Submit General Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

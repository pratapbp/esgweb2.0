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
  Filter,
  Briefcase,
  Star,
  Calendar,
  ArrowRight,
  AlertCircle,
  Bookmark,
  Share2,
  Globe,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  remote_type: "remote" | "hybrid" | "onsite" | "travel"
  employment_type: "full-time" | "part-time" | "contract"
  salary: number
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
  h1b_sponsorship: boolean
  lca_compliant: boolean
  travel_required: boolean
  multiple_openings: boolean
  work_schedule: string
  contact_email: string
  contact_person: string
  contact_title: string
}

// Real job data based on the LCA postings provided
const REAL_JOBS: Job[] = [
  {
    id: "software-engineer-2025",
    title: "Software Engineer",
    company: "Executive Software Guild Inc.",
    location: "McKinney, TX",
    remote_type: "travel",
    employment_type: "full-time",
    salary: 149781,
    description:
      "Design and develop user interfaces to internet/intranet applications. Work with stakeholders to gather and analyze requirements for software projects. Create software design and architecture utilizing PL/SQL, JSP, Oracle, Java/J2EE, Ajax, HTML, EJB. Implement the software design by writing code in programming languages. Travel and relocation are possible to unanticipated client locations throughout the US.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Experience with PL/SQL, JSP, Oracle, Java/J2EE",
      "Knowledge of Ajax, HTML, EJB",
      "Strong problem-solving and analytical skills",
      "Willingness to travel to client locations",
      "Ability to work Monday to Friday, 9:00 AM to 6:00 PM",
    ],
    technologies: ["Java", "J2EE", "PL/SQL", "Oracle", "JSP", "Ajax", "HTML", "EJB"],
    benefits: [
      "H-1B Visa Sponsorship Available",
      "Competitive Salary Package",
      "Travel Opportunities",
      "Professional Development",
      "Health Insurance Coverage",
    ],
    featured: true,
    posted_date: "2025-07-30",
    applications_count: 0,
    views_count: 0,
    status: "active",
    h1b_sponsorship: true,
    lca_compliant: true,
    travel_required: true,
    multiple_openings: true,
    work_schedule: "Monday to Friday; 9:00 AM to 6:00 PM, 40 hours/week",
    contact_email: "hr@esgit.com",
    contact_person: "Madhavi Gonnala",
    contact_title: "President",
  },
  {
    id: "systems-engineer-2020",
    title: "Systems Engineer",
    company: "Executive Software Guild Inc.",
    location: "Woonsocket, RI / Round Rock, TX",
    remote_type: "onsite",
    employment_type: "full-time",
    salary: 69618,
    description:
      "Work as a Systems Engineer to design, implement, and maintain complex systems infrastructure. Collaborate with cross-functional teams to ensure optimal system performance and reliability. This position involves working at client locations and requires strong technical expertise in systems engineering.",
    requirements: [
      "Bachelor's degree in Systems Engineering or related field",
      "3+ years of systems engineering experience",
      "Strong knowledge of system architecture and design",
      "Experience with infrastructure management",
      "Excellent communication and teamwork skills",
    ],
    technologies: [
      "Systems Architecture",
      "Infrastructure",
      "Linux",
      "Windows Server",
      "Networking",
      "Cloud Platforms",
    ],
    benefits: [
      "H-1B Visa Sponsorship Available",
      "Competitive Benefits Package",
      "Professional Growth Opportunities",
      "Health and Dental Insurance",
      "401(k) Plan",
    ],
    featured: false,
    posted_date: "2025-07-27",
    applications_count: 0,
    views_count: 0,
    status: "active",
    h1b_sponsorship: true,
    lca_compliant: true,
    travel_required: false,
    multiple_openings: false,
    work_schedule: "Full-time, 40 hours/week",
    contact_email: "hr@esgit.com",
    contact_person: "Thirupathi Vangapalli",
    contact_title: "HR Manager",
  },
]

export default function CareersLandingPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>(REAL_JOBS)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(REAL_JOBS)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")
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
          job.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (locationFilter) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (typeFilter) {
      filtered = filtered.filter((job) => job.employment_type === typeFilter)
    }

    if (tagFilter) {
      filtered = filtered.filter((job) =>
        job.technologies.some((tech) => tech.toLowerCase().includes(tagFilter.toLowerCase())),
      )
    }

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, locationFilter, typeFilter, tagFilter])

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary)
  }

  const getRemoteTypeLabel = (type: string) => {
    switch (type) {
      case "remote":
        return "Remote"
      case "hybrid":
        return "Hybrid"
      case "onsite":
        return "On-site"
      case "travel":
        return "Travel Required"
      default:
        return type
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
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
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
    setTypeFilter("")
    setTagFilter("")
  }

  const activeFiltersCount = [searchQuery, locationFilter, typeFilter, tagFilter].filter(Boolean).length

  // Get unique values for filter options
  const uniqueLocations = Array.from(new Set(jobs.map((job) => job.location)))
  const uniqueTypes = Array.from(new Set(jobs.map((job) => job.employment_type)))
  const uniqueTechnologies = Array.from(new Set(jobs.flatMap((job) => job.technologies)))

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30">
              <Briefcase className="w-4 h-4 mr-2" />
              {filteredJobs.length} Open Positions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Team</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Build your career with Executive Software Guild. We offer exciting opportunities in software engineering,
              SAP consulting, and cutting-edge technology solutions with H-1B sponsorship available.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{jobs.length}</div>
                <div className="text-gray-400">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">H-1B Sponsorship</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">LCA Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-400">Years Experience</div>
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
                placeholder="Search jobs by title, skills, or keywords..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pl-12 pr-4 py-4 text-lg focus:border-cyan-500 focus:ring-cyan-500/20"
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
                  <Badge className="ml-2 bg-cyan-500 text-white border-0">{activeFiltersCount}</Badge>
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
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Location</label>
                          <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                              <SelectValue placeholder="All locations" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="" className="text-white hover:bg-gray-700">
                                All locations
                              </SelectItem>
                              {uniqueLocations.map((location) => (
                                <SelectItem key={location} value={location} className="text-white hover:bg-gray-700">
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Employment Type</label>
                          <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="" className="text-white hover:bg-gray-700">
                                All types
                              </SelectItem>
                              {uniqueTypes.map((type) => (
                                <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Technology</label>
                          <Select value={tagFilter} onValueChange={setTagFilter}>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500">
                              <SelectValue placeholder="All technologies" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="" className="text-white hover:bg-gray-700">
                                All technologies
                              </SelectItem>
                              {uniqueTechnologies.map((tech) => (
                                <SelectItem key={tech} value={tech} className="text-white hover:bg-gray-700">
                                  {tech}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                              {job.employment_type}
                            </Badge>
                            {job.h1b_sponsorship && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                                <Shield className="w-3 h-3 mr-1" />
                                H-1B Sponsorship
                              </Badge>
                            )}
                            {job.lca_compliant && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30">
                                LCA Compliant
                              </Badge>
                            )}
                            {job.travel_required && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30">
                                <Globe className="w-3 h-3 mr-1" />
                                Travel Required
                              </Badge>
                            )}
                            {job.multiple_openings && (
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">
                                Multiple Openings
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
                          {job.company}
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
                            <span>{formatSalary(job.salary)} per year</span>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Clock className="h-4 w-4 mr-2 text-purple-400 flex-shrink-0" />
                            <span>{job.work_schedule}</span>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Calendar className="h-4 w-4 mr-2 text-orange-400 flex-shrink-0" />
                            <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6 line-clamp-3">{job.description}</p>

                        {/* Technologies */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.slice(0, 6).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-gray-600 text-gray-300 text-xs hover:bg-gray-800"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {job.technologies.length > 6 && (
                              <Badge
                                variant="outline"
                                className="border-gray-600 text-gray-400 text-xs hover:bg-gray-800"
                              >
                                +{job.technologies.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Contact Information</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <p>
                              <strong>Contact:</strong> {job.contact_person}, {job.contact_title}
                            </p>
                            <p>
                              <strong>Email:</strong> {job.contact_email}
                            </p>
                            <p>
                              <strong>Address:</strong> 8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white flex-1 border-0"
                          >
                            <Link href={`/careers/jobs/${job.id}/apply`}>
                              Apply Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent"
                          >
                            <Link href={`/careers/jobs/${job.id}`}>View Details</Link>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Executive Software Guild and work on cutting-edge projects with industry-leading clients. We provide
            H-1B sponsorship and comprehensive benefits for qualified candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 border-0"
            >
              <Link href="/careers/lca-postings">View LCA Postings</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 bg-transparent px-8 py-4"
            >
              <Link href="/contact">Contact HR Department</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

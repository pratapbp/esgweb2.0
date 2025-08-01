"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Filter,
  BookmarkPlus,
  Share2,
  ExternalLink,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  posted: string
  deadline: string
  department: string
  experience: string
  skills: string[]
  remote: boolean
  featured: boolean
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior SAP HANA Developer",
    company: "ESG Global Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We are seeking an experienced SAP HANA Developer to join our growing team. You will be responsible for designing, developing, and implementing SAP HANA solutions for our enterprise clients.",
    requirements: [
      "5+ years of SAP HANA development experience",
      "Strong SQL and database optimization skills",
      "Experience with SAP BW/4HANA",
      "Knowledge of SAP Fiori and UI5",
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development opportunities",
    ],
    posted: "2024-01-15",
    deadline: "2024-02-15",
    department: "Technology",
    experience: "Senior Level",
    skills: ["SAP HANA", "SQL", "SAP BW/4HANA", "SAP Fiori"],
    remote: true,
    featured: true,
  },
  {
    id: "2",
    title: "Cloud Solutions Architect",
    company: "ESG Global Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    description:
      "Join our cloud team as a Solutions Architect to design and implement scalable cloud infrastructure solutions for our clients across various industries.",
    requirements: [
      "AWS/Azure/GCP certification required",
      "7+ years of cloud architecture experience",
      "Experience with containerization (Docker, Kubernetes)",
      "Strong understanding of DevOps practices",
    ],
    benefits: ["Comprehensive health coverage", "Stock options", "Remote work flexibility", "Annual learning budget"],
    posted: "2024-01-12",
    deadline: "2024-02-12",
    department: "Cloud Services",
    experience: "Senior Level",
    skills: ["AWS", "Azure", "Kubernetes", "DevOps"],
    remote: true,
    featured: true,
  },
  {
    id: "3",
    title: "Cybersecurity Analyst",
    company: "ESG Global Solutions",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    description:
      "We are looking for a dedicated Cybersecurity Analyst to monitor, detect, and respond to security threats across our client environments.",
    requirements: [
      "CISSP or Security+ certification preferred",
      "3+ years of cybersecurity experience",
      "Experience with SIEM tools",
      "Knowledge of incident response procedures",
    ],
    benefits: [
      "Health and wellness programs",
      "Professional certification support",
      "Flexible PTO policy",
      "Career advancement opportunities",
    ],
    posted: "2024-01-10",
    deadline: "2024-02-10",
    department: "Security",
    experience: "Mid Level",
    skills: ["SIEM", "Incident Response", "Security Analysis", "Risk Assessment"],
    remote: false,
    featured: false,
  },
  {
    id: "4",
    title: "Data Scientist - AI/ML",
    company: "ESG Global Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description:
      "Join our AI/ML team to develop cutting-edge machine learning models and data science solutions for our enterprise clients.",
    requirements: [
      "PhD or Masters in Data Science, Statistics, or related field",
      "4+ years of machine learning experience",
      "Proficiency in Python, R, and SQL",
      "Experience with TensorFlow or PyTorch",
    ],
    benefits: [
      "Competitive salary and bonuses",
      "Research and development time",
      "Conference attendance support",
      "Collaborative work environment",
    ],
    posted: "2024-01-08",
    deadline: "2024-02-08",
    department: "Data & Analytics",
    experience: "Senior Level",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    remote: true,
    featured: true,
  },
  {
    id: "5",
    title: "SAP Functional Consultant - Finance",
    company: "ESG Global Solutions",
    location: "Dallas, TX",
    type: "Contract",
    salary: "$80 - $120/hour",
    description:
      "We need an experienced SAP Finance Consultant to support our client implementations and optimization projects.",
    requirements: [
      "6+ years of SAP FI/CO experience",
      "S/4HANA Finance certification preferred",
      "Strong business process knowledge",
      "Excellent client communication skills",
    ],
    benefits: ["Competitive hourly rate", "Flexible contract terms", "Remote work options", "Potential for extension"],
    posted: "2024-01-05",
    deadline: "2024-02-05",
    department: "SAP Consulting",
    experience: "Senior Level",
    skills: ["SAP FI/CO", "S/4HANA", "Financial Processes", "Business Analysis"],
    remote: true,
    featured: false,
  },
]

export default function EnhancedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  // Application form state
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
    availableDate: "",
    salaryExpectation: "",
    workAuthorization: "",
    willingToRelocate: false,
    additionalInfo: "",
  })

  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (locationFilter) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (typeFilter) {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    if (departmentFilter) {
      filtered = filtered.filter((job) => job.department === departmentFilter)
    }

    if (experienceFilter) {
      filtered = filtered.filter((job) => job.experience === experienceFilter)
    }

    if (remoteOnly) {
      filtered = filtered.filter((job) => job.remote)
    }

    if (featuredOnly) {
      filtered = filtered.filter((job) => job.featured)
    }

    setFilteredJobs(filtered)
  }, [jobs, searchTerm, locationFilter, typeFilter, departmentFilter, experienceFilter, remoteOnly, featuredOnly])

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
    toast({
      title: savedJobs.includes(jobId) ? "Job Removed" : "Job Saved",
      description: savedJobs.includes(jobId) ? "Job removed from saved list" : "Job added to saved list",
    })
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. We'll be in touch soon!",
    })

    setShowApplicationForm(false)
    setApplicationData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      linkedIn: "",
      portfolio: "",
      availableDate: "",
      salaryExpectation: "",
      workAuthorization: "",
      willingToRelocate: false,
      additionalInfo: "",
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setLocationFilter("")
    setTypeFilter("")
    setDepartmentFilter("")
    setExperienceFilter("")
    setRemoteOnly(false)
    setFeaturedOnly(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Career</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join ESG Global Solutions and shape the future of technology
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search jobs, skills, or companies..."
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
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
                  <SelectItem value="SAP Consulting">SAP Consulting</SelectItem>
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="Mid Level">Mid Level</SelectItem>
                  <SelectItem value="Senior Level">Senior Level</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={remoteOnly}
                    onCheckedChange={(checked) => setRemoteOnly(checked === true)}
                  />
                  <Label htmlFor="remote">Remote Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={featuredOnly}
                    onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Posted
            </Button>
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Salary
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {job.featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">{job.type}</Badge>
                      {job.remote && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Remote
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSaveJob(job.id)}
                    className={savedJobs.includes(job.id) ? "text-blue-600" : ""}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      {new Date(job.posted).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        {selectedJob && (
                          <>
                            <DialogHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <DialogTitle className="text-2xl mb-2">{selectedJob.title}</DialogTitle>
                                  <DialogDescription className="text-lg">
                                    {selectedJob.company} • {selectedJob.location}
                                  </DialogDescription>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSaveJob(selectedJob.id)}
                                    className={savedJobs.includes(selectedJob.id) ? "text-blue-600" : ""}
                                  >
                                    <BookmarkPlus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="mt-6">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                                <TabsTrigger value="company">Company</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <DollarSign className="h-6 w-6 mx-auto mb-1 text-green-600" />
                                    <p className="text-sm font-medium">{selectedJob.salary}</p>
                                    <p className="text-xs text-gray-500">Salary</p>
                                  </div>
                                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <Briefcase className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                                    <p className="text-sm font-medium">{selectedJob.type}</p>
                                    <p className="text-xs text-gray-500">Job Type</p>
                                  </div>
                                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <GraduationCap className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                                    <p className="text-sm font-medium">{selectedJob.experience}</p>
                                    <p className="text-xs text-gray-500">Experience</p>
                                  </div>
                                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <Calendar className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                                    <p className="text-sm font-medium">
                                      {new Date(selectedJob.deadline).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Deadline</p>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Job Description</h3>
                                  <p className="text-gray-600">{selectedJob.description}</p>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Required Skills</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedJob.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="requirements" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-3">Requirements</h3>
                                  <ul className="space-y-2">
                                    {selectedJob.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>

                              <TabsContent value="benefits" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-3">Benefits & Perks</h3>
                                  <ul className="space-y-2">
                                    {selectedJob.benefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600">{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>

                              <TabsContent value="company" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-3">About ESG Global Solutions</h3>
                                  <p className="text-gray-600 mb-4">
                                    ESG Global Solutions is a leading technology consulting firm specializing in SAP
                                    implementations, cloud solutions, cybersecurity, and AI/ML services. We help
                                    enterprises transform their business processes and achieve digital excellence.
                                  </p>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Company Size</h4>
                                      <p className="text-gray-600">500-1000 employees</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Industry</h4>
                                      <p className="text-gray-600">Technology Consulting</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Founded</h4>
                                      <p className="text-gray-600">2010</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Headquarters</h4>
                                      <p className="text-gray-600">New York, NY</p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <div className="flex gap-3 pt-6 border-t">
                              <Button className="flex-1" onClick={() => setShowApplicationForm(true)}>
                                Apply Now
                              </Button>
                              <Button variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Company Page
                              </Button>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedJob(job)
                        setShowApplicationForm(true)
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>Fill out the form below to submit your application</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplicationSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={applicationData.firstName}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={applicationData.lastName}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={applicationData.email}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  required
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="resume">Resume *</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setApplicationData((prev) => ({ ...prev, resume: e.target.files?.[0] || null }))}
              />
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData((prev) => ({ ...prev, coverLetter: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  placeholder="https://linkedin.com/in/..."
                  value={applicationData.linkedIn}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, linkedIn: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input
                  id="portfolio"
                  placeholder="https://..."
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, portfolio: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availableDate">Available Start Date</Label>
                <Input
                  id="availableDate"
                  type="date"
                  value={applicationData.availableDate}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, availableDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                <Input
                  id="salaryExpectation"
                  placeholder="$80,000 - $100,000"
                  value={applicationData.salaryExpectation}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, salaryExpectation: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="workAuthorization">Work Authorization Status *</Label>
              <Select
                value={applicationData.workAuthorization}
                onValueChange={(value) => setApplicationData((prev) => ({ ...prev, workAuthorization: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your work authorization status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-citizen">US Citizen</SelectItem>
                  <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                  <SelectItem value="h1b">H1B Visa</SelectItem>
                  <SelectItem value="opt">OPT</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="require-sponsorship">Require Sponsorship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="relocate"
                checked={applicationData.willingToRelocate}
                onCheckedChange={(checked) =>
                  setApplicationData((prev) => ({ ...prev, willingToRelocate: checked as boolean }))
                }
              />
              <Label htmlFor="relocate">I am willing to relocate for this position</Label>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional information you'd like to share..."
                value={applicationData.additionalInfo}
                onChange={(e) => setApplicationData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

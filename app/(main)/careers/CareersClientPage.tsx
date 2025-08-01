"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Search,
  Upload,
  FileText,
  CheckCircle,
  X,
  Plus,
  Loader2,
  Building,
  Globe,
  Github,
  Linkedin,
} from "lucide-react"
import { toast } from "sonner"

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  isRemote: boolean
  isUrgent: boolean
}

interface JobApplication {
  id: string
  jobId: string
  jobTitle: string
  applicantName: string
  email: string
  phone: string
  location: string
  experience: string
  education: string
  visaStatus: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  skills: string[]
  coverLetter: string
  salaryExpectation?: string
  resumeFile?: File
  status: "pending" | "screening" | "interview" | "offer" | "hired" | "rejected"
  appliedDate: string
}

const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Senior SAP Consultant",
    department: "SAP Solutions",
    location: "New York, NY",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $150,000",
    description:
      "Lead SAP implementation projects and provide expert consultation to enterprise clients. Work with cutting-edge SAP technologies including S/4HANA, SuccessFactors, and SAP Analytics Cloud.",
    requirements: [
      "5+ years of SAP consulting experience",
      "Strong knowledge of SAP S/4HANA",
      "Experience with SAP implementation projects",
      "Excellent communication skills",
      "Bachelor's degree in relevant field",
    ],
    benefits: [
      "Competitive salary and bonuses",
      "Health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Flexible work arrangements",
    ],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    isRemote: false,
    isUrgent: true,
  },
  {
    id: "2",
    title: "AI/ML Engineer",
    department: "Digital AI Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "3+ years",
    salary: "$130,000 - $170,000",
    description:
      "Develop and deploy machine learning models for enterprise clients. Work on cutting-edge AI solutions including predictive analytics, natural language processing, and computer vision.",
    requirements: [
      "3+ years of ML/AI development experience",
      "Proficiency in Python, TensorFlow, PyTorch",
      "Experience with cloud platforms (AWS, Azure, GCP)",
      "Strong mathematical and statistical background",
      "Master's degree preferred",
    ],
    benefits: [
      "Stock options",
      "Unlimited PTO",
      "Learning and development budget",
      "Top-tier health benefits",
      "Remote work flexibility",
    ],
    postedDate: "2024-01-10",
    applicationDeadline: "2024-02-10",
    isRemote: true,
    isUrgent: false,
  },
  {
    id: "3",
    title: "Cloud Solutions Architect",
    department: "Cloud Solutions",
    location: "Austin, TX",
    type: "Full-time",
    experience: "7+ years",
    salary: "$140,000 - $180,000",
    description:
      "Design and implement cloud infrastructure solutions for enterprise clients. Lead cloud migration projects and ensure scalable, secure, and cost-effective cloud architectures.",
    requirements: [
      "7+ years of cloud architecture experience",
      "AWS/Azure/GCP certifications",
      "Experience with containerization (Docker, Kubernetes)",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Strong leadership and communication skills",
    ],
    benefits: [
      "Signing bonus",
      "Comprehensive health coverage",
      "Professional certification reimbursement",
      "Flexible work schedule",
      "Annual performance bonuses",
    ],
    postedDate: "2024-01-12",
    applicationDeadline: "2024-02-12",
    isRemote: false,
    isUrgent: true,
  },
  {
    id: "4",
    title: "Cybersecurity Specialist",
    department: "Cybersecurity Services",
    location: "Washington, DC",
    type: "Full-time",
    experience: "4+ years",
    salary: "$110,000 - $140,000",
    description:
      "Implement and maintain cybersecurity solutions for enterprise clients. Conduct security assessments, develop security policies, and respond to security incidents.",
    requirements: [
      "4+ years of cybersecurity experience",
      "Security certifications (CISSP, CISM, CEH)",
      "Experience with security tools and frameworks",
      "Knowledge of compliance standards (SOX, HIPAA, PCI-DSS)",
      "Strong analytical and problem-solving skills",
    ],
    benefits: [
      "Security clearance bonus",
      "Comprehensive benefits package",
      "Professional development opportunities",
      "Work-life balance",
      "Career advancement paths",
    ],
    postedDate: "2024-01-08",
    applicationDeadline: "2024-02-08",
    isRemote: false,
    isUrgent: false,
  },
]

export default function CareersClientPage() {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [applications, setApplications] = useState<JobApplication[]>([])

  // Application form state
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [applicationStep, setApplicationStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Form data
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    education: "",
    visaStatus: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    skills: [] as string[],
    coverLetter: "",
    salaryExpectation: "",
    resumeFile: null as File | null,
  })

  const [newSkill, setNewSkill] = useState("")

  // Load applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem("jobApplications")
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications))
    }
  }, [])

  // Filter jobs based on search and filters
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
      const matchesType = selectedType === "all" || job.type === selectedType

      return matchesSearch && matchesDepartment && matchesLocation && matchesType
    })

    setFilteredJobs(filtered)
  }, [searchTerm, selectedDepartment, selectedLocation, selectedType, jobs])

  const departments = [...new Set(jobs.map((job) => job.department))]
  const locations = [...new Set(jobs.map((job) => job.location))]
  const types = [...new Set(jobs.map((job) => job.type))]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document")
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }

      setFormData((prev) => ({ ...prev, resumeFile: file }))

      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 100)

      toast.success("Resume uploaded successfully!")
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmitApplication = async () => {
    if (!selectedJob) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newApplication: JobApplication = {
      id: Date.now().toString(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      ...formData,
      status: "pending",
      appliedDate: new Date().toISOString(),
    }

    const updatedApplications = [...applications, newApplication]
    setApplications(updatedApplications)
    localStorage.setItem("jobApplications", JSON.stringify(updatedApplications))

    setIsSubmitting(false)
    setIsApplicationOpen(false)
    setApplicationStep(1)

    // Reset form
    setFormData({
      applicantName: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      education: "",
      visaStatus: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
      skills: [],
      coverLetter: "",
      salaryExpectation: "",
      resumeFile: null,
    })

    toast.success(
      <div className="space-y-2">
        <div className="font-semibold">Application Submitted Successfully!</div>
        <div className="text-sm text-gray-600">Application ID: {newApplication.id}</div>
        <div className="text-sm text-gray-600">Position: {selectedJob.title}</div>
        <div className="text-sm text-gray-600">We'll review your application and get back to you soon.</div>
      </div>,
    )
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.applicantName && formData.email && formData.phone && formData.location
      case 2:
        return formData.experience && formData.education && formData.visaStatus
      case 3:
        return formData.resumeFile && formData.coverLetter
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Innovation
              </span>{" "}
              Team
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Build the future of enterprise technology with cutting-edge SAP solutions, AI innovations, and cloud
              transformations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                {filteredJobs.length} Open Positions
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Remote & Hybrid Options
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Competitive Benefits
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search jobs, departments, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              </div>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {job.title}
                              </h3>
                              {job.isUrgent && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
                              )}
                            </div>
                            <p className="text-slate-300 mb-4">{job.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                            {job.isRemote && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Remote OK
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {job.experience}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.requirements.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
                              onClick={() => setSelectedJob(job)}
                            >
                              Apply Now
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
                            <DialogHeader>
                              <DialogTitle className="text-2xl text-white">Apply for {selectedJob?.title}</DialogTitle>
                              <DialogDescription className="text-slate-300">
                                Complete your application in a few simple steps. All fields marked with * are required.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* Progress Indicator */}
                              <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((step) => (
                                  <div key={step} className="flex items-center">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                        applicationStep >= step
                                          ? "bg-cyan-600 text-white"
                                          : "bg-slate-700 text-slate-400"
                                      }`}
                                    >
                                      {applicationStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                                    </div>
                                    {step < 3 && (
                                      <div
                                        className={`w-16 h-1 mx-2 ${
                                          applicationStep > step ? "bg-cyan-600" : "bg-slate-700"
                                        }`}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Step 1: Personal Information */}
                              {applicationStep === 1 && (
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="name" className="text-slate-200">
                                        Full Name *
                                      </Label>
                                      <Input
                                        id="name"
                                        value={formData.applicantName}
                                        onChange={(e) =>
                                          setFormData((prev) => ({ ...prev, applicantName: e.target.value }))
                                        }
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="Enter your full name"
                                      />
                                    </div>

                                    <div>
                                      <Label htmlFor="email" className="text-slate-200">
                                        Email Address *
                                      </Label>
                                      <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="your.email@example.com"
                                      />
                                    </div>

                                    <div>
                                      <Label htmlFor="phone" className="text-slate-200">
                                        Phone Number *
                                      </Label>
                                      <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="+1 (555) 123-4567"
                                      />
                                    </div>

                                    <div>
                                      <Label htmlFor="location" className="text-slate-200">
                                        Current Location *
                                      </Label>
                                      <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="City, State/Country"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Step 2: Professional Details */}
                              {applicationStep === 2 && (
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-semibold text-white mb-4">Professional Details</h3>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="experience" className="text-slate-200">
                                        Years of Experience *
                                      </Label>
                                      <Select
                                        value={formData.experience}
                                        onValueChange={(value) =>
                                          setFormData((prev) => ({ ...prev, experience: value }))
                                        }
                                      >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                          <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="0-1">0-1 years</SelectItem>
                                          <SelectItem value="2-3">2-3 years</SelectItem>
                                          <SelectItem value="4-5">4-5 years</SelectItem>
                                          <SelectItem value="6-10">6-10 years</SelectItem>
                                          <SelectItem value="10+">10+ years</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label htmlFor="education" className="text-slate-200">
                                        Education Level *
                                      </Label>
                                      <Select
                                        value={formData.education}
                                        onValueChange={(value) =>
                                          setFormData((prev) => ({ ...prev, education: value }))
                                        }
                                      >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                          <SelectValue placeholder="Select education level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="high-school">High School</SelectItem>
                                          <SelectItem value="associate">Associate Degree</SelectItem>
                                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                          <SelectItem value="master">Master's Degree</SelectItem>
                                          <SelectItem value="phd">PhD</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label htmlFor="visa" className="text-slate-200">
                                        Work Authorization *
                                      </Label>
                                      <Select
                                        value={formData.visaStatus}
                                        onValueChange={(value) =>
                                          setFormData((prev) => ({ ...prev, visaStatus: value }))
                                        }
                                      >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                          <SelectValue placeholder="Select work authorization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="citizen">US Citizen</SelectItem>
                                          <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                                          <SelectItem value="h1b">H1B Visa</SelectItem>
                                          <SelectItem value="opt">OPT/CPT</SelectItem>
                                          <SelectItem value="other">Other</SelectItem>
                                          <SelectItem value="require-sponsorship">Require Sponsorship</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label htmlFor="salary" className="text-slate-200">
                                        Salary Expectation
                                      </Label>
                                      <Input
                                        id="salary"
                                        value={formData.salaryExpectation}
                                        onChange={(e) =>
                                          setFormData((prev) => ({ ...prev, salaryExpectation: e.target.value }))
                                        }
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="e.g., $120,000 - $150,000"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="linkedin" className="text-slate-200">
                                        LinkedIn Profile
                                      </Label>
                                      <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <Input
                                          id="linkedin"
                                          value={formData.linkedinUrl}
                                          onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))
                                          }
                                          className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                                          placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <Label htmlFor="github" className="text-slate-200">
                                        GitHub Profile
                                      </Label>
                                      <div className="relative">
                                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <Input
                                          id="github"
                                          value={formData.githubUrl}
                                          onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
                                          }
                                          className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                                          placeholder="https://github.com/yourusername"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <Label htmlFor="portfolio" className="text-slate-200">
                                        Portfolio/Website
                                      </Label>
                                      <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <Input
                                          id="portfolio"
                                          value={formData.portfolioUrl}
                                          onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, portfolioUrl: e.target.value }))
                                          }
                                          className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                                          placeholder="https://yourportfolio.com"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Skills Section */}
                                  <div>
                                    <Label className="text-slate-200">Skills</Label>
                                    <div className="flex gap-2 mb-2">
                                      <Input
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        placeholder="Add a skill"
                                      />
                                      <Button
                                        type="button"
                                        onClick={addSkill}
                                        size="sm"
                                        className="bg-cyan-600 hover:bg-cyan-700"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {formData.skills.map((skill, idx) => (
                                        <Badge key={idx} variant="secondary" className="bg-slate-700 text-slate-200">
                                          {skill}
                                          <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 hover:text-red-400"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Step 3: Documents and Cover Letter */}
                              {applicationStep === 3 && (
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-semibold text-white mb-4">Documents & Cover Letter</h3>

                                  {/* Resume Upload */}
                                  <div>
                                    <Label className="text-slate-200">Resume/CV *</Label>
                                    <div className="mt-2">
                                      <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-slate-400" />
                                            <p className="mb-2 text-sm text-slate-400">
                                              <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-slate-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                                          </div>
                                          <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileUpload}
                                          />
                                        </label>
                                      </div>

                                      {formData.resumeFile && (
                                        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                              <FileText className="w-5 h-5 text-cyan-400" />
                                              <div>
                                                <p className="text-sm font-medium text-white">
                                                  {formData.resumeFile.name}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                  {(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                              </div>
                                            </div>
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                          </div>
                                          {uploadProgress < 100 && <Progress value={uploadProgress} className="mt-2" />}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Cover Letter */}
                                  <div>
                                    <Label htmlFor="coverLetter" className="text-slate-200">
                                      Cover Letter *
                                    </Label>
                                    <Textarea
                                      id="coverLetter"
                                      value={formData.coverLetter}
                                      onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))
                                      }
                                      className="bg-slate-700/50 border-slate-600 text-white min-h-[200px]"
                                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                    />
                                    <p className="text-xs text-slate-400 mt-1">
                                      {formData.coverLetter.length}/2000 characters
                                    </p>
                                  </div>

                                  {/* Application Summary */}
                                  <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                                    <h4 className="text-sm font-semibold text-white mb-3">Application Summary</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-slate-400">Position:</span>
                                        <span className="text-white ml-2">{selectedJob?.title}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Department:</span>
                                        <span className="text-white ml-2">{selectedJob?.department}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Name:</span>
                                        <span className="text-white ml-2">{formData.applicantName}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Email:</span>
                                        <span className="text-white ml-2">{formData.email}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Experience:</span>
                                        <span className="text-white ml-2">{formData.experience}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Resume:</span>
                                        <span className="text-white ml-2">
                                          {formData.resumeFile ? "✓ Uploaded" : "✗ Not uploaded"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Navigation Buttons */}
                              <div className="flex justify-between pt-6 border-t border-slate-700">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setApplicationStep((prev) => Math.max(1, prev - 1))}
                                  disabled={applicationStep === 1}
                                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                  Previous
                                </Button>

                                {applicationStep < 3 ? (
                                  <Button
                                    type="button"
                                    onClick={() => setApplicationStep((prev) => prev + 1)}
                                    disabled={!isStepValid(applicationStep)}
                                    className="bg-cyan-600 hover:bg-cyan-700"
                                  >
                                    Next
                                  </Button>
                                ) : (
                                  <Button
                                    type="button"
                                    onClick={handleSubmitApplication}
                                    disabled={!isStepValid(applicationStep) || isSubmitting}
                                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                  >
                                    {isSubmitting ? (
                                      <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                      </div>
                                    ) : (
                                      "Submit Application"
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <div className="text-xs text-slate-400 text-center">
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                  <p>Try adjusting your search criteria or check back later for new opportunities.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Application Status Section */}
      {applications.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Your Applications</CardTitle>
              <CardDescription className="text-slate-300">Track the status of your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{app.jobTitle}</h4>
                      <p className="text-sm text-slate-400">
                        Applied on {new Date(app.appliedDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">Application ID: {app.id}</p>
                    </div>
                    <Badge
                      className={`${
                        app.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : app.status === "screening"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : app.status === "interview"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : app.status === "offer"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : app.status === "hired"
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

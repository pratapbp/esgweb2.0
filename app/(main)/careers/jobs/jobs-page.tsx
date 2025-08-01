"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  Upload,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Star,
  Zap,
  FileText,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship"
  department: string
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string[]
  tags: string[]
  lcaCompliant: boolean
  h1bSponsorship: boolean
  remote: boolean
  postedDate: string
  aiMatchScore?: number
}

interface ResumeData {
  skills: string[]
  experience: string
  education: string
  matchedJobs: string[]
}

const mockJobs: Job[] = [
  {
    id: "sap-data-engineer",
    title: "Senior SAP Data Engineer",
    company: "ESG Global",
    location: "Remote - USA",
    type: "Full-Time",
    department: "Engineering",
    salaryMin: 120000,
    salaryMax: 160000,
    description:
      "Join our team as a Senior SAP Data Engineer to design and implement cutting-edge data solutions using SAP BTP, HANA, and modern cloud technologies.",
    requirements: ["5+ years SAP experience", "Python/SQL expertise", "Cloud platforms (AWS/Azure)", "Data modeling"],
    tags: ["SAP", "Data Engineering", "Cloud", "Python"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: true,
    postedDate: "2024-01-15",
    aiMatchScore: 87,
  },
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect",
    company: "ESG Global",
    location: "New York, NY",
    type: "Full-Time",
    department: "AI/ML",
    salaryMin: 140000,
    salaryMax: 180000,
    description:
      "Lead the design and implementation of AI-powered solutions for enterprise clients, focusing on GenAI and machine learning applications.",
    requirements: [
      "7+ years AI/ML experience",
      "Python, TensorFlow, PyTorch",
      "Cloud AI services",
      "Solution architecture",
    ],
    tags: ["AI", "Machine Learning", "Architecture", "GenAI"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: false,
    postedDate: "2024-01-12",
    aiMatchScore: 92,
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    company: "ESG Global",
    location: "Austin, TX",
    type: "Full-Time",
    department: "Security",
    salaryMin: 90000,
    salaryMax: 120000,
    description:
      "Protect our clients' digital assets by implementing comprehensive cybersecurity strategies and monitoring systems.",
    requirements: ["3+ years cybersecurity experience", "CISSP/CEH certification", "SIEM tools", "Incident response"],
    tags: ["Cybersecurity", "SIEM", "Compliance", "Risk Management"],
    lcaCompliant: false,
    h1bSponsorship: false,
    remote: true,
    postedDate: "2024-01-10",
    aiMatchScore: 73,
  },
  {
    id: "cloud-solutions-engineer",
    title: "Cloud Solutions Engineer",
    company: "ESG Global",
    location: "Remote - Global",
    type: "Full-Time",
    department: "Cloud",
    salaryMin: 110000,
    salaryMax: 145000,
    description:
      "Design and deploy scalable cloud infrastructure solutions using AWS, Azure, and Google Cloud platforms.",
    requirements: ["4+ years cloud experience", "AWS/Azure certifications", "Kubernetes", "Infrastructure as Code"],
    tags: ["Cloud", "AWS", "Azure", "Kubernetes"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: true,
    postedDate: "2024-01-08",
    aiMatchScore: 81,
  },
  {
    id: "sap-consultant",
    title: "SAP Functional Consultant",
    company: "ESG Global",
    location: "Chicago, IL",
    type: "Contract",
    department: "Consulting",
    salaryMin: 80000,
    salaryMax: 110000,
    description:
      "Provide expert SAP consulting services to clients, focusing on S/4HANA implementations and business process optimization.",
    requirements: [
      "SAP S/4HANA experience",
      "Business process knowledge",
      "Client-facing skills",
      "Project management",
    ],
    tags: ["SAP", "S/4HANA", "Consulting", "Business Process"],
    lcaCompliant: true,
    h1bSponsorship: false,
    remote: false,
    postedDate: "2024-01-05",
    aiMatchScore: 78,
  },
  {
    id: "data-scientist",
    title: "Senior Data Scientist",
    company: "ESG Global",
    location: "San Francisco, CA",
    type: "Full-Time",
    department: "Data Science",
    salaryMin: 130000,
    salaryMax: 170000,
    description:
      "Drive data-driven insights and build predictive models to solve complex business problems using advanced analytics and machine learning.",
    requirements: ["PhD/MS in Data Science", "Python, R, SQL", "Machine Learning", "Statistical modeling"],
    tags: ["Data Science", "Machine Learning", "Python", "Statistics"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: true,
    postedDate: "2024-01-03",
    aiMatchScore: 89,
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [showLCAOnly, setShowLCAOnly] = useState(false)
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [showResumeCopilot, setShowResumeCopilot] = useState(false)

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = selectedLocation === "all" || job.location.includes(selectedLocation)
      const matchesType = selectedType === "all" || job.type === selectedType
      const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
      const matchesLCA = !showLCAOnly || job.lcaCompliant
      const matchesRemote = !showRemoteOnly || job.remote

      return matchesSearch && matchesLocation && matchesType && matchesDepartment && matchesLCA && matchesRemote
    })
  }, [jobs, searchTerm, selectedLocation, selectedType, selectedDepartment, showLCAOnly, showRemoteOnly])

  const handleResumeUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock resume analysis
      const mockResumeData: ResumeData = {
        skills: ["SAP", "Python", "Data Engineering", "Cloud", "SQL"],
        experience: "5+ years in data engineering and SAP development",
        education: "MS Computer Science",
        matchedJobs: ["sap-data-engineer", "ai-solutions-architect", "data-scientist"],
      }

      setResumeData(mockResumeData)
      setResumeUploaded(true)
      setUploadProgress(100)

      // Update jobs with AI match scores
      const updatedJobs = jobs.map((job) => ({
        ...job,
        aiMatchScore: mockResumeData.matchedJobs.includes(job.id)
          ? Math.floor(Math.random() * 30) + 70
          : Math.floor(Math.random() * 20) + 50,
      }))
      setJobs(updatedJobs)

      toast({
        title: "Resume Analyzed Successfully!",
        description: "Your AI match scores have been calculated for all positions.",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      clearInterval(interval)
    }
  }

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
              <Separator orientation="vertical" className="h-4" />
              <Briefcase className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
          </div>
          {job.aiMatchScore && (
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{job.aiMatchScore}% Match</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.remote && (
            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
              Remote
            </Badge>
          )}
          {job.lcaCompliant && (
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              ✓ LCA Compliant
            </Badge>
          )}
          {job.h1bSponsorship && (
            <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
              H1B Sponsor
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>
                ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ResumeCopilotSidebar = () => (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          AI Resume Copilot
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!resumeUploaded ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload your resume to get personalized job match scores and recommendations.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-transparent" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Your Resume</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Analyzing resume...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop your resume here, or click to browse</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleResumeUpload(file)
                        }}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button variant="outline" className="cursor-pointer bg-transparent">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Resume Analyzed</span>
              </div>
              <p className="text-xs text-green-700">Found {resumeData?.skills.length} relevant skills</p>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Your Skills</h4>
              <div className="flex flex-wrap gap-1">
                {resumeData?.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2">Top Matches</h4>
              <div className="space-y-2">
                {filteredJobs
                  .filter((job) => job.aiMatchScore && job.aiMatchScore > 80)
                  .slice(0, 3)
                  .map((job) => (
                    <div key={job.id} className="flex items-center justify-between text-xs">
                      <span className="truncate">{job.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {job.aiMatchScore}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setResumeUploaded(false)}
            >
              Upload New Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Job with AI</h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover opportunities that match your skills with our AI-powered job matching system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setShowResumeCopilot(true)}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Resume for AI Matching
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Browse All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search roles (e.g., SAP, AI, Remote)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Austin">Austin</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Cloud">Cloud</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Filter className="w-4 h-4" />
                      More Filters
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lca-only" checked={showLCAOnly} onCheckedChange={setShowLCAOnly} />
                      <Label htmlFor="lca-only" className="text-sm">
                        LCA Compliant Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote-only" checked={showRemoteOnly} onCheckedChange={setShowRemoteOnly} />
                      <Label htmlFor="remote-only" className="text-sm">
                        Remote Only
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{filteredJobs.length} Open Positions</h2>
                <p className="text-gray-600">
                  {resumeUploaded ? "Sorted by AI match score" : "Upload resume for personalized matching"}
                </p>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="date">Newest First</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                  <SelectItem value="match">Best Match</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Grid */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <ResumeCopilotSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

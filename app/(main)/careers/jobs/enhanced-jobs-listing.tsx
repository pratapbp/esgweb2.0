"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Clock, DollarSign, Briefcase, X, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

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
  remote: boolean
  postedDate: string
  applicants?: number
}

const mockJobs: Job[] = [
  {
    id: "sap-data-engineer",
    title: "Senior SAP Data Engineer",
    company: "ESG Inc",
    location: "Remote - USA",
    type: "Full-Time",
    department: "Engineering",
    salaryMin: 120000,
    salaryMax: 160000,
    description:
      "Join our team as a Senior SAP Data Engineer to design and implement cutting-edge data solutions using SAP BTP, HANA, and modern cloud technologies.",
    requirements: ["5+ years SAP experience", "Python/SQL expertise", "Cloud platforms (AWS/Azure)", "Data modeling"],
    tags: ["SAP", "Data Engineering", "Cloud", "Python"],
    remote: true,
    postedDate: "2025-07-27",
    applicants: 23,
  },
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect",
    company: "ESGit",
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
    remote: false,
    postedDate: "2025-07-26",
    applicants: 45,
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    company: "ESGit",
    location: "Austin, TX",
    type: "Full-Time",
    department: "Security",
    salaryMin: 90000,
    salaryMax: 120000,
    description:
      "Protect our clients' digital assets by implementing comprehensive cybersecurity strategies and monitoring systems.",
    requirements: ["3+ years cybersecurity experience", "CISSP/CEH certification", "SIEM tools", "Incident response"],
    tags: ["Cybersecurity", "SIEM", "Compliance", "Risk Management"],
    remote: true,
    postedDate: "2025-07-22",
    applicants: 18,
  },
  {
    id: "cloud-solutions-engineer",
    title: "Cloud Solutions Engineer",
    company: "ESGit",
    location: "Remote - Global",
    type: "Full-Time",
    department: "Cloud",
    salaryMin: 110000,
    salaryMax: 145000,
    description:
      "Design and deploy scalable cloud infrastructure solutions using AWS, Azure, and Google Cloud platforms.",
    requirements: ["4+ years cloud experience", "AWS/Azure certifications", "Kubernetes", "Infrastructure as Code"],
    tags: ["Cloud", "AWS", "Azure", "Kubernetes"],
    remote: true,
    postedDate: "2025-07-21",
    applicants: 31,
  },
  {
    id: "sap-consultant",
    title: "SAP Functional Consultant",
    company: "ESGit",
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
    remote: false,
    postedDate: "2025-07-20",
    applicants: 12,
  },
  {
    id: "data-scientist",
    title: "Senior Data Scientist",
    company: "ESGit",
    location: "San Francisco, CA",
    type: "Full-Time",
    department: "Data Science",
    salaryMin: 130000,
    salaryMax: 170000,
    description:
      "Drive data-driven insights and build predictive models to solve complex business problems using advanced analytics and machine learning.",
    requirements: ["PhD/MS in Data Science", "Python, R, SQL", "Machine Learning", "Statistical modeling"],
    tags: ["Data Science", "Machine Learning", "Python", "Statistics"],
    remote: true,
    postedDate: "2025-07-18",
    applicants: 67,
  },
]

export default function EnhancedJobsListing() {
  const [jobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")

  // Get unique values for filters
  const locations = Array.from(new Set(jobs.map((job) => job.location)))
  const departments = Array.from(new Set(jobs.map((job) => job.department)))
  const allTags = Array.from(new Set(jobs.flatMap((job) => job.tags)))

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
      const matchesType = selectedType === "all" || job.type === selectedType
      const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
      const matchesRemote = !showRemoteOnly || job.remote
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => job.tags.includes(tag))

      return matchesSearch && matchesLocation && matchesType && matchesDepartment && matchesRemote && matchesTags
    })

    // Sort jobs
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
        break
      case "salary":
        filtered.sort((a, b) => b.salaryMax - a.salaryMax)
        break
      case "applicants":
        filtered.sort((a, b) => (b.applicants || 0) - (a.applicants || 0))
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [jobs, searchTerm, selectedLocation, selectedType, selectedDepartment, selectedTags, showRemoteOnly, sortBy])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLocation("all")
    setSelectedType("all")
    setSelectedDepartment("all")
    setSelectedTags([])
    setShowRemoteOnly(false)
  }

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600 bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
              <Separator orientation="vertical" className="h-4" />
              <Briefcase className="w-4 h-4" />
              <span>{job.department}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {job.type}
            </Badge>
            {job.applicants && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{job.applicants} applicants</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
              {tag}
            </Badge>
          ))}
          {job.remote && (
            <Badge variant="outline" className="text-xs border-green-200 text-green-400 border-green-500/30">
              Remote
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
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
          <Link href={`/careers/jobs/${job.id}/apply`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Apply Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Opportunity
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover exciting career opportunities at ESGit and join our mission to transform businesses through
              innovation.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="sticky top-6 bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label className="text-white">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <Label className="text-white">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Locations
                      </SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="text-white">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div className="space-y-2">
                  <Label className="text-white">Job Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Types
                      </SelectItem>
                      <SelectItem value="Full-Time" className="text-white">
                        Full-Time
                      </SelectItem>
                      <SelectItem value="Part-Time" className="text-white">
                        Part-Time
                      </SelectItem>
                      <SelectItem value="Contract" className="text-white">
                        Contract
                      </SelectItem>
                      <SelectItem value="Internship" className="text-white">
                        Internship
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department Filter */}
                <div className="space-y-2">
                  <Label className="text-white">Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all" className="text-white">
                        All Departments
                      </SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept} className="text-white">
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remote Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote-only"
                    checked={showRemoteOnly}
                    onCheckedChange={(checked) => setShowRemoteOnly(checked === true)}
                  />
                  <Label htmlFor="remote-only" className="text-white">
                    Remote Only
                  </Label>
                </div>

                {/* Tags Filter */}
                <div className="space-y-2">
                  <Label className="text-white">Skills & Technologies</Label>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer text-xs ${
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "border-gray-600 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                        {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{filteredJobs.length} Open Positions</h2>
                <p className="text-gray-400">{selectedTags.length > 0 && `Filtered by: ${selectedTags.join(", ")}`}</p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="relevance" className="text-white">
                    Most Relevant
                  </SelectItem>
                  <SelectItem value="date" className="text-white">
                    Newest First
                  </SelectItem>
                  <SelectItem value="salary" className="text-white">
                    Highest Salary
                  </SelectItem>
                  <SelectItem value="applicants" className="text-white">
                    Most Popular
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(selectedTags.length > 0 ||
              showRemoteOnly ||
              selectedLocation !== "all" ||
              selectedType !== "all" ||
              selectedDepartment !== "all") && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {tag}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                  </Badge>
                ))}
                {showRemoteOnly && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Remote Only
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setShowRemoteOnly(false)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Job Grid */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="p-8 text-center bg-gray-900/50 border-gray-800">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  Clear All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

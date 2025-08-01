"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Users,
  Brain,
  Shield,
  Zap,
  FileText,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  Star,
  MapPin,
  Calendar,
  Bot,
  Sparkles,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Globe,
  BarChart3,
  HelpCircle,
  ExternalLink,
  Copy,
  Mail,
  Phone,
  Linkedin,
  Github,
  AlertTriangle,
  Loader2,
  PlayCircle,
  StopCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

// Types and Interfaces
interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  description: string
  requirements: string[]
  benefits: string[]
  salary_range?: string
  experience_level: string
  skills: string[]
  is_active: boolean
  created_at: string
  updated_at: string
  applications_count: number
  views_count: number
  ai_score: number
  blockchain_verified: boolean
  rpa_automated: boolean
  urgent: boolean
  remote_friendly: boolean
  visa_sponsorship: boolean
}

interface JobApplication {
  id: string
  job_id: string
  applicant_name: string
  applicant_email: string
  phone?: string
  resume_url: string
  cover_letter: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  status: "pending" | "screening" | "interview" | "offer" | "rejected" | "hired"
  ai_match_score: number
  skills_match: string[]
  experience_years: number
  education_level: string
  location: string
  salary_expectation?: string
  availability_date: string
  visa_status?: string
  blockchain_verified: boolean
  created_at: string
  updated_at: string
  notes: string[]
  interview_scheduled?: string
  offer_details?: any
}

interface AIInsight {
  type: "recommendation" | "warning" | "optimization" | "trend"
  title: string
  description: string
  confidence: number
  action_items: string[]
  impact_score: number
}

interface BlockchainRecord {
  hash: string
  timestamp: string
  type: "job_posting" | "application" | "verification" | "update"
  data_hash: string
  verified: boolean
  smart_contract_address?: string
}

interface RPATask {
  id: string
  name: string
  type: "screening" | "communication" | "reporting" | "data_extraction" | "verification"
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  started_at?: string
  completed_at?: string
  results?: Record<string, any>
  error_message?: string
}

// Mock Data
const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior SAP S/4HANA Consultant",
    department: "SAP Solutions",
    location: "New York, NY",
    type: "full-time",
    description:
      "Lead SAP S/4HANA implementations for Fortune 500 clients. Drive digital transformation initiatives and provide strategic guidance on enterprise architecture.",
    requirements: [
      "8+ years SAP S/4HANA experience",
      "Strong ABAP development skills",
      "Experience with SAP Fiori and UI5",
      "Bachelor's degree in Computer Science or related field",
      "SAP certification preferred",
    ],
    benefits: [
      "Competitive salary + bonus",
      "Health, dental, vision insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development budget",
    ],
    salary_range: "$120,000 - $160,000",
    experience_level: "Senior",
    skills: ["SAP S/4HANA", "ABAP", "SAP Fiori", "UI5", "Enterprise Architecture"],
    is_active: true,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    applications_count: 45,
    views_count: 234,
    ai_score: 92,
    blockchain_verified: true,
    rpa_automated: true,
    urgent: true,
    remote_friendly: true,
    visa_sponsorship: true,
  },
  {
    id: "2",
    title: "AI/ML Engineer",
    department: "Digital Innovation",
    location: "San Francisco, CA",
    type: "full-time",
    description:
      "Build cutting-edge AI solutions for enterprise clients. Work with large language models, computer vision, and predictive analytics.",
    requirements: [
      "5+ years machine learning experience",
      "Python, TensorFlow, PyTorch proficiency",
      "Experience with cloud platforms (AWS, Azure, GCP)",
      "PhD or Master's in AI/ML preferred",
      "Strong mathematical background",
    ],
    benefits: [
      "Stock options",
      "Unlimited PTO",
      "Top-tier health benefits",
      "Remote work flexibility",
      "Conference attendance budget",
    ],
    salary_range: "$140,000 - $200,000",
    experience_level: "Mid-Senior",
    skills: ["Machine Learning", "Python", "TensorFlow", "PyTorch", "Cloud Platforms"],
    is_active: true,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    applications_count: 67,
    views_count: 456,
    ai_score: 88,
    blockchain_verified: true,
    rpa_automated: true,
    urgent: false,
    remote_friendly: true,
    visa_sponsorship: true,
  },
  {
    id: "3",
    title: "Cloud Solutions Architect",
    department: "Cloud Services",
    location: "Austin, TX",
    type: "full-time",
    description:
      "Design and implement cloud infrastructure solutions for enterprise clients. Lead cloud migration projects and optimize cloud costs.",
    requirements: [
      "6+ years cloud architecture experience",
      "AWS/Azure/GCP certifications",
      "Kubernetes and containerization expertise",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Strong communication skills",
    ],
    benefits: [
      "Certification reimbursement",
      "Flexible schedule",
      "Home office stipend",
      "Health and wellness programs",
      "Career advancement opportunities",
    ],
    salary_range: "$110,000 - $150,000",
    experience_level: "Senior",
    skills: ["Cloud Architecture", "AWS", "Azure", "Kubernetes", "Terraform"],
    is_active: true,
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
    applications_count: 32,
    views_count: 189,
    ai_score: 85,
    blockchain_verified: true,
    rpa_automated: true,
    urgent: false,
    remote_friendly: true,
    visa_sponsorship: false,
  },
]

const mockApplications: JobApplication[] = [
  {
    id: "1",
    job_id: "1",
    applicant_name: "John Smith",
    applicant_email: "john.smith@email.com",
    phone: "+1-555-0123",
    resume_url: "/resumes/john-smith.pdf",
    cover_letter: "I am excited to apply for the Senior SAP S/4HANA Consultant position...",
    linkedin_url: "https://linkedin.com/in/johnsmith",
    github_url: "https://github.com/johnsmith",
    portfolio_url: "https://johnsmith.dev",
    status: "screening",
    ai_match_score: 94,
    skills_match: ["SAP S/4HANA", "ABAP", "SAP Fiori"],
    experience_years: 10,
    education_level: "Bachelor's",
    location: "New York, NY",
    salary_expectation: "$145,000",
    availability_date: "2024-02-01",
    visa_status: "US Citizen",
    blockchain_verified: true,
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
    notes: ["Strong technical background", "Excellent communication skills"],
    interview_scheduled: "2024-01-25T14:00:00Z",
  },
  {
    id: "2",
    job_id: "2",
    applicant_name: "Sarah Johnson",
    applicant_email: "sarah.johnson@email.com",
    phone: "+1-555-0456",
    resume_url: "/resumes/sarah-johnson.pdf",
    cover_letter: "As an experienced AI/ML engineer, I am thrilled to apply...",
    linkedin_url: "https://linkedin.com/in/sarahjohnson",
    github_url: "https://github.com/sarahjohnson",
    status: "interview",
    ai_match_score: 91,
    skills_match: ["Machine Learning", "Python", "TensorFlow"],
    experience_years: 7,
    education_level: "PhD",
    location: "San Francisco, CA",
    salary_expectation: "$175,000",
    availability_date: "2024-01-15",
    visa_status: "H1B",
    blockchain_verified: true,
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
    notes: ["PhD in Machine Learning", "Published research papers"],
    interview_scheduled: "2024-01-28T10:00:00Z",
  },
]

const mockAIInsights: AIInsight[] = [
  {
    type: "recommendation",
    title: "Optimize Job Descriptions",
    description: "AI analysis suggests adding specific technology keywords to increase qualified applications by 23%",
    confidence: 87,
    action_items: [
      "Add 'Kubernetes' to cloud architect positions",
      "Include 'React' in frontend developer roles",
      "Specify 'AWS certification' requirements",
    ],
    impact_score: 8.5,
  },
  {
    type: "trend",
    title: "Remote Work Preference Increasing",
    description: "85% of recent applications prefer remote or hybrid work arrangements",
    confidence: 92,
    action_items: [
      "Update job postings to highlight remote options",
      "Consider expanding remote-first positions",
      "Review compensation for remote roles",
    ],
    impact_score: 9.2,
  },
  {
    type: "warning",
    title: "Low Application Rate for Senior Roles",
    description: "Senior positions receiving 40% fewer applications than industry average",
    confidence: 78,
    action_items: [
      "Review salary ranges for competitiveness",
      "Enhance benefits package communication",
      "Consider reducing experience requirements",
    ],
    impact_score: 7.8,
  },
]

const mockRPATasks: RPATask[] = [
  {
    id: "1",
    name: "Resume Screening Automation",
    type: "screening",
    status: "running",
    progress: 65,
    started_at: "2024-01-20T09:00:00Z",
    results: {
      processed: 45,
      qualified: 12,
      rejected: 33,
    },
  },
  {
    id: "2",
    name: "Interview Scheduling Bot",
    type: "communication",
    status: "completed",
    progress: 100,
    started_at: "2024-01-19T14:00:00Z",
    completed_at: "2024-01-19T16:30:00Z",
    results: {
      emails_sent: 23,
      interviews_scheduled: 18,
      responses_received: 20,
    },
  },
  {
    id: "3",
    name: "Weekly Recruitment Report",
    type: "reporting",
    status: "pending",
    progress: 0,
  },
]

export default function CareersPage() {
  // State Management
  const [activeTab, setActiveTab] = useState("dashboard")
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings)
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications)
  const [aiInsights, setAIInsights] = useState<AIInsight[]>(mockAIInsights)
  const [rpaTasks, setRPATasks] = useState<RPATask[]>(mockRPATasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false)
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false)
  const [isBlockchainViewerOpen, setIsBlockchainViewerOpen] = useState(false)
  const [isRPAControllerOpen, setIsRPAControllerOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // AI Generation State
  const [aiJobData, setAIJobData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    experience_level: "",
    skills: "",
    description_prompt: "",
  })

  // Blockchain State
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([
    {
      hash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      timestamp: "2024-01-20T10:30:00Z",
      type: "job_posting",
      data_hash: "0xabcdef1234567890fedcba0987654321",
      verified: true,
      smart_contract_address: "0x742d35Cc6634C0532925a3b8D4C0C8b3",
    },
    {
      hash: "0x9876543210fedcba0987654321abcdef",
      timestamp: "2024-01-19T15:45:00Z",
      type: "application",
      data_hash: "0x1234567890abcdef9876543210fedcba",
      verified: true,
      smart_contract_address: "0x742d35Cc6634C0532925a3b8D4C0C8b3",
    },
    {
      hash: "0xfedcba0987654321abcdef1234567890",
      timestamp: "2024-01-18T09:15:00Z",
      type: "verification",
      data_hash: "0x0987654321fedcba1234567890abcdef",
      verified: true,
      smart_contract_address: "0x742d35Cc6634C0532925a3b8D4C0C8b3",
    },
  ])

  // Filter Functions
  const filteredJobPostings = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment
    return matchesSearch && matchesDepartment && job.is_active
  })

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicant_email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  // AI Functions
  const generateJobDescription = async () => {
    setLoading(true)
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const generatedDescription = `We are seeking a talented ${aiJobData.title} to join our ${aiJobData.department} team in ${aiJobData.location}. This ${aiJobData.type} position offers an exciting opportunity to work with cutting-edge technologies and contribute to innovative projects that drive business transformation.

Key Responsibilities:
• Lead technical initiatives and provide strategic guidance
• Collaborate with cross-functional teams to deliver high-quality solutions
• Mentor junior team members and promote best practices
• Stay current with industry trends and emerging technologies
• Contribute to architectural decisions and technical roadmaps

Required Qualifications:
• ${aiJobData.experience_level} level experience in relevant technologies
• Strong expertise in ${aiJobData.skills}
• Excellent problem-solving and analytical skills
• Outstanding communication and leadership abilities
• Bachelor's degree in Computer Science or related field

What We Offer:
• Competitive salary and comprehensive benefits package
• Flexible work arrangements and remote-friendly culture
• Professional development opportunities and learning budget
• Collaborative and inclusive work environment
• Opportunity to work on cutting-edge projects with industry leaders`

      const newJob: JobPosting = {
        id: Date.now().toString(),
        title: aiJobData.title,
        department: aiJobData.department,
        location: aiJobData.location,
        type: aiJobData.type as any,
        description: generatedDescription,
        requirements: [
          `${aiJobData.experience_level} level experience`,
          `Expertise in ${aiJobData.skills}`,
          "Strong problem-solving skills",
          "Excellent communication abilities",
          "Bachelor's degree or equivalent",
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "401(k) matching",
          "Flexible work arrangements",
          "Professional development budget",
        ],
        salary_range: "Competitive",
        experience_level: aiJobData.experience_level,
        skills: aiJobData.skills.split(",").map((s) => s.trim()),
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        applications_count: 0,
        views_count: 0,
        ai_score: 85,
        blockchain_verified: false,
        rpa_automated: true,
        urgent: false,
        remote_friendly: true,
        visa_sponsorship: false,
      }

      setJobPostings((prev) => [newJob, ...prev])
      setIsAIGeneratorOpen(false)
      setAIJobData({
        title: "",
        department: "",
        location: "",
        type: "full-time",
        experience_level: "",
        skills: "",
        description_prompt: "",
      })
      toast.success("Job posting generated successfully!")
    } catch (error) {
      toast.error("Failed to generate job posting")
    } finally {
      setLoading(false)
    }
  }

  const analyzeCandidate = async (applicationId: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const application = applications.find((app) => app.id === applicationId)
      if (application) {
        const updatedApplication = {
          ...application,
          ai_match_score: Math.floor(Math.random() * 30) + 70,
          skills_match: ["Updated skill analysis"],
          notes: [...application.notes, "AI analysis completed"],
        }

        setApplications((prev) => prev.map((app) => (app.id === applicationId ? updatedApplication : app)))
        toast.success("Candidate analysis completed!")
      }
    } catch (error) {
      toast.error("Failed to analyze candidate")
    } finally {
      setLoading(false)
    }
  }

  // Blockchain Functions
  const verifyOnBlockchain = async (itemId: string, type: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newRecord: BlockchainRecord = {
        hash: `0x${Math.random().toString(16).substr(2, 32)}`,
        timestamp: new Date().toISOString(),
        type: type as any,
        data_hash: `0x${Math.random().toString(16).substr(2, 32)}`,
        verified: true,
        smart_contract_address: "0x742d35Cc6634C0532925a3b8D4C0C8b3",
      }

      setBlockchainRecords((prev) => [newRecord, ...prev])

      if (type === "job_posting") {
        setJobPostings((prev) => prev.map((job) => (job.id === itemId ? { ...job, blockchain_verified: true } : job)))
      } else if (type === "application") {
        setApplications((prev) => prev.map((app) => (app.id === itemId ? { ...app, blockchain_verified: true } : app)))
      }

      toast.success("Blockchain verification completed!")
    } catch (error) {
      toast.error("Blockchain verification failed")
    } finally {
      setLoading(false)
    }
  }

  // RPA Functions
  const startRPATask = async (taskId: string) => {
    setLoading(true)
    try {
      setRPATasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: "running", started_at: new Date().toISOString(), progress: 0 } : task,
        ),
      )

      // Simulate task progress
      const progressInterval = setInterval(() => {
        setRPATasks((prev) =>
          prev.map((task) => {
            if (task.id === taskId && task.status === "running") {
              const newProgress = Math.min(task.progress + 10, 100)
              if (newProgress === 100) {
                clearInterval(progressInterval)
                return {
                  ...task,
                  status: "completed",
                  progress: 100,
                  completed_at: new Date().toISOString(),
                  results: { processed: 25, completed: 23, errors: 2 },
                }
              }
              return { ...task, progress: newProgress }
            }
            return task
          }),
        )
      }, 500)

      toast.success("RPA task started successfully!")
    } catch (error) {
      toast.error("Failed to start RPA task")
    } finally {
      setLoading(false)
    }
  }

  const stopRPATask = async (taskId: string) => {
    setRPATasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "pending", progress: 0, started_at: undefined } : task,
      ),
    )
    toast.success("RPA task stopped")
  }

  // Utility Functions
  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      screening: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      interview: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      offer: "bg-green-500/20 text-green-400 border-green-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      hired: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDepartments = () => {
    const departments = new Set(jobPostings.map((job) => job.department))
    return Array.from(departments)
  }

  // Helper function to safely convert values to strings
  const safeStringify = (value: any): string => {
    if (value === null || value === undefined) {
      return "N/A"
    }
    if (typeof value === "string") {
      return value
    }
    if (typeof value === "number") {
      return value.toString()
    }
    if (typeof value === "boolean") {
      return value ? "true" : "false"
    }
    if (typeof value === "object") {
      try {
        return JSON.stringify(value)
      } catch {
        return "[Object]"
      }
    }
    return value.toString()
  }

  // Dashboard Metrics
  const dashboardMetrics = {
    totalJobs: jobPostings.filter((job) => job.is_active).length,
    totalApplications: applications.length,
    pendingReviews: applications.filter((app) => app.status === "pending").length,
    interviewsScheduled: applications.filter((app) => app.status === "interview").length,
    avgAIScore:
      applications.length > 0
        ? Math.round(applications.reduce((sum, app) => sum + app.ai_match_score, 0) / applications.length)
        : 0,
    blockchainVerified: jobPostings.filter((job) => job.blockchain_verified).length,
    rpaTasksActive: rpaTasks.filter((task) => task.status === "running").length,
    conversionRate:
      applications.length > 0
        ? Math.round((applications.filter((app) => app.status === "hired").length / applications.length) * 100)
        : 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Careers Hub
              </h1>
              <p className="text-slate-400 mt-2">
                Intelligent recruitment with blockchain verification and RPA automation
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setIsAIGeneratorOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Job Generator
              </Button>

              <Button
                onClick={() => setIsBlockchainViewerOpen(true)}
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Blockchain
              </Button>

              <Button
                onClick={() => setIsRPAControllerOpen(true)}
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <Bot className="w-4 h-4 mr-2" />
                RPA Control
              </Button>

              <Button
                onClick={() => setIsHelpOpen(true)}
                variant="outline"
                className="border-slate-500/30 text-slate-400 hover:bg-slate-500/10"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8"
        >
          {[
            { label: "Active Jobs", value: dashboardMetrics.totalJobs, icon: Briefcase, color: "blue" },
            { label: "Applications", value: dashboardMetrics.totalApplications, icon: Users, color: "green" },
            { label: "Pending Reviews", value: dashboardMetrics.pendingReviews, icon: Clock, color: "yellow" },
            { label: "Interviews", value: dashboardMetrics.interviewsScheduled, icon: Calendar, color: "purple" },
            { label: "Avg AI Score", value: `${dashboardMetrics.avgAIScore}%`, icon: Brain, color: "cyan" },
            {
              label: "Blockchain Verified",
              value: dashboardMetrics.blockchainVerified,
              icon: Shield,
              color: "emerald",
            },
            { label: "RPA Tasks", value: dashboardMetrics.rpaTasksActive, icon: Bot, color: "orange" },
            { label: "Conversion Rate", value: `${dashboardMetrics.conversionRate}%`, icon: TrendingUp, color: "pink" },
          ].map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
                    <p className="text-lg font-bold text-white">{metric.value}</p>
                  </div>
                  <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800/50 border-slate-700/50">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600">
                <Briefcase className="w-4 h-4 mr-2" />
                Job Postings
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600">
                <Users className="w-4 h-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600">
                <Brain className="w-4 h-4 mr-2" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Recent Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 5).map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-white">{application.applicant_name}</p>
                            <p className="text-sm text-slate-400">{application.applicant_email}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            <p className="text-xs text-slate-400 mt-1">AI Score: {application.ai_match_score}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active RPA Tasks */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      RPA Task Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rpaTasks.map((task) => (
                        <div key={task.id} className="p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-white">{task.name}</p>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </div>
                          {task.status === "running" && (
                            <div>
                              <Progress value={task.progress} className="mb-1" />
                              <p className="text-xs text-slate-400">{task.progress}% complete</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Preview */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Insights Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiInsights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {insight.type === "recommendation" && <Sparkles className="w-4 h-4 text-blue-400" />}
                          {insight.type === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                          {insight.type === "trend" && <TrendingUp className="w-4 h-4 text-green-400" />}
                          <p className="font-medium text-white">{insight.title}</p>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">Confidence: {insight.confidence}%</p>
                          <p className="text-xs text-slate-500">Impact: {insight.impact_score}/10</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Postings Tab */}
            <TabsContent value="jobs" className="space-y-6">
              {/* Search and Filters */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search jobs by title, department, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                      />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-full md:w-48 bg-slate-700/50 border-slate-600/50 text-white">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">All Departments</SelectItem>
                        {getDepartments().map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Job Postings Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredJobPostings.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 cursor-pointer h-full"
                        onClick={() => {
                          setSelectedJob(job)
                          setIsJobDialogOpen(true)
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-white text-lg mb-2">{job.title}</CardTitle>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                  {job.department}
                                </Badge>
                                <Badge variant="outline" className="border-green-500/30 text-green-400">
                                  {job.type}
                                </Badge>
                                {job.urgent && (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {job.blockchain_verified && <Shield className="w-4 h-4 text-green-400" />}
                              {job.rpa_automated && <Bot className="w-4 h-4 text-purple-400" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{job.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400">
                              <GraduationCap className="w-4 h-4" />
                              <span className="text-sm">{job.experience_level}</span>
                            </div>

                            <p className="text-slate-300 text-sm line-clamp-3">{job.description}</p>

                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 3).map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="outline"
                                  className="text-xs border-slate-600/50 text-slate-400"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs border-slate-600/50 text-slate-400">
                                  +{job.skills.length - 3} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {job.applications_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {job.views_count}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Brain className="w-3 h-3 text-blue-400" />
                                <span className="text-xs text-blue-400">{job.ai_score}%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              {/* Search and Filters */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search applications by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-full md:w-48 bg-slate-700/50 border-slate-600/50 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Applications List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredApplications.map((application, index) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-1">
                                    {application.applicant_name}
                                  </h3>
                                  <p className="text-slate-400 text-sm">{application.applicant_email}</p>
                                  {application.phone && <p className="text-slate-400 text-sm">{application.phone}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                  {application.blockchain_verified && <Shield className="w-4 h-4 text-green-400" />}
                                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-slate-500 mb-1">AI Match Score</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={application.ai_match_score} className="flex-1" />
                                    <span className="text-sm text-blue-400">{application.ai_match_score}%</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500 mb-1">Experience</p>
                                  <p className="text-lg font-bold text-white">{application.experience_years} years</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500 mb-1">Education</p>
                                  <p className="text-sm font-medium text-white">{application.education_level}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500 mb-1">Location</p>
                                  <p className="text-sm text-white">{application.location}</p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {application.skills_match.map((skill, skillIndex) => (
                                  <Badge
                                    key={skillIndex}
                                    variant="outline"
                                    className="text-xs border-green-500/30 text-green-400"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <p className="text-slate-300 text-sm line-clamp-2 mb-3">{application.cover_letter}</p>

                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span>Applied: {formatDate(application.created_at)}</span>
                                {application.interview_scheduled && (
                                  <span className="text-purple-400">
                                    Interview: {formatDate(application.interview_scheduled)}
                                  </span>
                                )}
                                {application.salary_expectation && (
                                  <span>Expected: {application.salary_expectation}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button
                                onClick={() => {
                                  setSelectedApplication(application)
                                  setIsApplicationDialogOpen(true)
                                }}
                                variant="outline"
                                size="sm"
                                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>

                              <Button
                                onClick={() => analyzeCandidate(application.id)}
                                variant="outline"
                                size="sm"
                                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                                disabled={loading}
                              >
                                <Brain className="w-4 h-4 mr-2" />
                                AI Analyze
                              </Button>

                              {!application.blockchain_verified && (
                                <Button
                                  onClick={() => verifyOnBlockchain(application.id, "application")}
                                  variant="outline"
                                  size="sm"
                                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                  disabled={loading}
                                >
                                  <Shield className="w-4 h-4 mr-2" />
                                  Verify
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          {insight.type === "recommendation" && (
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <Sparkles className="w-5 h-5 text-blue-400" />
                            </div>
                          )}
                          {insight.type === "warning" && (
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                              <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            </div>
                          )}
                          {insight.type === "trend" && (
                            <div className="p-2 bg-green-500/20 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                          )}
                          {insight.type === "optimization" && (
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                              <Zap className="w-5 h-5 text-purple-400" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-white">{insight.title}</CardTitle>
                            <Badge variant="outline" className="mt-1 capitalize border-slate-600/50 text-slate-400">
                              {insight.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 mb-4">{insight.description}</p>

                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-sm text-slate-400 mb-2">Confidence Level</p>
                            <div className="flex items-center gap-2">
                              <Progress value={insight.confidence} className="flex-1" />
                              <span className="text-sm text-blue-400">{insight.confidence}%</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-slate-400 mb-2">Impact Score</p>
                            <div className="flex items-center gap-2">
                              <Progress value={insight.impact_score * 10} className="flex-1" />
                              <span className="text-sm text-green-400">{insight.impact_score}/10</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-slate-400 mb-2">Action Items</p>
                          <ul className="space-y-1">
                            {insight.action_items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm text-slate-300 flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* AI Job Generator Dialog */}
      <Dialog open={isAIGeneratorOpen} onOpenChange={setIsAIGeneratorOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              AI Job Description Generator
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Let AI create a comprehensive job posting based on your requirements
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={aiJobData.title}
                  onChange={(e) => setAIJobData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Senior React Developer"
                  className="bg-slate-700/50 border-slate-600/50"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={aiJobData.department}
                  onChange={(e) => setAIJobData((prev) => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., Engineering"
                  className="bg-slate-700/50 border-slate-600/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={aiJobData.location}
                  onChange={(e) => setAIJobData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., New York, NY"
                  className="bg-slate-700/50 border-slate-600/50"
                />
              </div>
              <div>
                <Label htmlFor="type">Employment Type</Label>
                <Select
                  value={aiJobData.type}
                  onValueChange={(value) => setAIJobData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Input
                id="experience"
                value={aiJobData.experience_level}
                onChange={(e) => setAIJobData((prev) => ({ ...prev, experience_level: e.target.value }))}
                placeholder="e.g., Senior, Mid-level, Entry-level"
                className="bg-slate-700/50 border-slate-600/50"
              />
            </div>

            <div>
              <Label htmlFor="skills">Required Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={aiJobData.skills}
                onChange={(e) => setAIJobData((prev) => ({ ...prev, skills: e.target.value }))}
                placeholder="e.g., React, Node.js, TypeScript, AWS"
                className="bg-slate-700/50 border-slate-600/50"
              />
            </div>

            <div>
              <Label htmlFor="prompt">Additional Requirements (optional)</Label>
              <Textarea
                id="prompt"
                value={aiJobData.description_prompt}
                onChange={(e) => setAIJobData((prev) => ({ ...prev, description_prompt: e.target.value }))}
                placeholder="Any specific requirements, company culture, or additional details..."
                className="bg-slate-700/50 border-slate-600/50"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAIGeneratorOpen(false)}
              className="border-slate-600/50 text-slate-400"
            >
              Cancel
            </Button>
            <Button
              onClick={generateJobDescription}
              disabled={loading || !aiJobData.title || !aiJobData.department}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Job Posting
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedJob?.title || "N/A"}</span>
              <div className="flex items-center gap-2">
                {selectedJob?.blockchain_verified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {selectedJob?.rpa_automated && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Bot className="w-3 h-3 mr-1" />
                    Automated
                  </Badge>
                )}
                {selectedJob?.urgent && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>}
              </div>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedJob?.department || "N/A"} • {selectedJob?.location || "N/A"} • {selectedJob?.type || "N/A"}
            </DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-6">
              {/* Job Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Applications</p>
                  <p className="text-lg font-bold text-white">{selectedJob.applications_count}</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Views</p>
                  <p className="text-lg font-bold text-white">{selectedJob.views_count}</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">AI Score</p>
                  <p className="text-lg font-bold text-blue-400">{selectedJob.ai_score}%</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Salary Range</p>
                  <p className="text-sm font-medium text-white">{selectedJob.salary_range || "Competitive"}</p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
                <p className="text-slate-300 whitespace-pre-line">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-400">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <Button
                  onClick={() => setIsJobDialogOpen(false)}
                  variant="outline"
                  className="border-slate-600/50 text-slate-400"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Edit functionality would be implemented here")
                  }}
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Job
                </Button>
                {!selectedJob.blockchain_verified && (
                  <Button
                    onClick={() => verifyOnBlockchain(selectedJob.id, "job_posting")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={loading}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify on Blockchain
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedApplication?.applicant_name || "N/A"}</span>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedApplication?.status || "pending")}>
                  {selectedApplication?.status || "pending"}
                </Badge>
                {selectedApplication?.blockchain_verified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedApplication?.applicant_email || "N/A"} • Applied{" "}
              {formatDate(selectedApplication?.created_at || "")}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">AI Match Score</p>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedApplication.ai_match_score} className="flex-1" />
                    <span className="text-sm text-blue-400">{selectedApplication.ai_match_score}%</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Experience</p>
                  <p className="text-lg font-bold text-white">{selectedApplication.experience_years} years</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Education</p>
                  <p className="text-sm font-medium text-white">{selectedApplication.education_level}</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Expected Salary</p>
                  <p className="text-sm font-medium text-white">
                    {selectedApplication.salary_expectation || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>{selectedApplication.applicant_email}</span>
                    </div>
                    {selectedApplication.phone && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{selectedApplication.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{selectedApplication.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedApplication.linkedin_url && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Linkedin className="w-4 h-4 text-slate-400" />
                        <a
                          href={selectedApplication.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    {selectedApplication.github_url && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Github className="w-4 h-4 text-slate-400" />
                        <a
                          href={selectedApplication.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    )}
                    {selectedApplication.portfolio_url && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <a
                          href={selectedApplication.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          Portfolio
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills Match */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Skills Match</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.skills_match.map((skill, index) => (
                    <Badge key={index} className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cover Letter</h3>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-300 whitespace-pre-line">{selectedApplication.cover_letter}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedApplication.notes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
                  <div className="space-y-2">
                    {selectedApplication.notes.map((note, index) => (
                      <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                        <p className="text-slate-300">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interview Information */}
              {selectedApplication.interview_scheduled && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Interview Scheduled</h3>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedApplication.interview_scheduled)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                <Button
                  onClick={() => setIsApplicationDialogOpen(false)}
                  variant="outline"
                  className="border-slate-600/50 text-slate-400"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    window.open(selectedApplication.resume_url, "_blank")
                  }}
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Resume
                </Button>
                <Button
                  onClick={() => analyzeCandidate(selectedApplication.id)}
                  variant="outline"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  disabled={loading}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
                {!selectedApplication.blockchain_verified && (
                  <Button
                    onClick={() => verifyOnBlockchain(selectedApplication.id, "application")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={loading}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify on Blockchain
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Blockchain Viewer Dialog */}
      <Dialog open={isBlockchainViewerOpen} onOpenChange={setIsBlockchainViewerOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Blockchain Verification Records
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              View all blockchain-verified records and smart contract interactions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {blockchainRecords.map((record, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${record.verified ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                    >
                      {record.verified ? "Verified" : "Pending"}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 capitalize">
                      {record.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(record.timestamp)}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-20">Hash:</span>
                    <code className="text-green-400 font-mono text-xs bg-slate-800/50 px-2 py-1 rounded">
                      {record.hash}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(record.hash)
                        toast.success("Hash copied to clipboard")
                      }}
                      className="p-1 h-auto"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 w-20">Data Hash:</span>
                    <code className="text-blue-400 font-mono text-xs bg-slate-800/50 px-2 py-1 rounded">
                      {record.data_hash}
                    </code>
                  </div>

                  {record.smart_contract_address && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 w-20">Contract:</span>
                      <code className="text-purple-400 font-mono text-xs bg-slate-800/50 px-2 py-1 rounded">
                        {record.smart_contract_address}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          window.open(`https://etherscan.io/address/${record.smart_contract_address}`, "_blank")
                        }}
                        className="p-1 h-auto"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Button
              onClick={() => setIsBlockchainViewerOpen(false)}
              variant="outline"
              className="border-slate-600/50 text-slate-400"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                const dataStr = JSON.stringify(blockchainRecords, null, 2)
                const dataBlob = new Blob([dataStr], { type: "application/json" })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement("a")
                link.href = url
                link.download = "blockchain-records.json"
                link.click()
                toast.success("Blockchain records exported")
              }}
              variant="outline"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* RPA Controller Dialog */}
      <Dialog open={isRPAControllerOpen} onOpenChange={setIsRPAControllerOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              RPA Automation Controller
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Monitor and control robotic process automation tasks
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {rpaTasks.map((task) => (
              <div key={task.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{task.name}</h3>
                    <p className="text-sm text-slate-400 capitalize">{task.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    {task.status === "running" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => stopRPATask(task.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <StopCircle className="w-3 h-3 mr-1" />
                        Stop
                      </Button>
                    )}
                    {task.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startRPATask(task.id)}
                        className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                        disabled={loading}
                      >
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>

                {task.status === "running" && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-400">Progress</span>
                      <span className="text-sm text-blue-400">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="mb-2" />
                    {task.started_at && (
                      <p className="text-xs text-slate-500">Started: {formatDate(task.started_at)}</p>
                    )}
                  </div>
                )}

                {task.status === "completed" && task.results && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="text-sm font-medium text-green-400 mb-2">Results</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      {Object.entries(task.results).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-slate-400 capitalize">{key.replace("_", " ")}</p>
                          <p className="text-white font-medium">{safeStringify(value)}</p>
                        </div>
                      ))}
                    </div>
                    {task.completed_at && (
                      <p className="text-xs text-slate-500 mt-2">Completed: {formatDate(task.completed_at)}</p>
                    )}
                  </div>
                )}

                {task.status === "failed" && task.error_message && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h4 className="text-sm font-medium text-red-400 mb-2">Error</h4>
                    <p className="text-sm text-slate-300">{task.error_message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Button
              onClick={() => setIsRPAControllerOpen(false)}
              variant="outline"
              className="border-slate-600/50 text-slate-400"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                const newTask: RPATask = {
                  id: Date.now().toString(),
                  name: "Custom Automation Task",
                  type: "screening",
                  status: "pending",
                  progress: 0,
                }
                setRPATasks((prev) => [...prev, newTask])
                toast.success("New RPA task added")
              }}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              Careers Hub Help
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Learn how to use the AI-powered careers platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                AI Features
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  • <strong>AI Job Generator:</strong> Create comprehensive job postings using AI
                </li>
                <li>
                  • <strong>Candidate Analysis:</strong> Get AI-powered insights on applicant fit
                </li>
                <li>
                  • <strong>Smart Matching:</strong> Automatic skill and experience matching
                </li>
                <li>
                  • <strong>Predictive Scoring:</strong> AI confidence scores for hiring decisions
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Blockchain Verification
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  • <strong>Immutable Records:</strong> All data is cryptographically secured
                </li>
                <li>
                  • <strong>Smart Contracts:</strong> Automated verification processes
                </li>
                <li>
                  • <strong>Transparency:</strong> Full audit trail for compliance
                </li>
                <li>
                  • <strong>Trust:</strong> Verified credentials and work history
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                RPA Automation
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  • <strong>Resume Screening:</strong> Automated initial candidate filtering
                </li>
                <li>
                  • <strong>Interview Scheduling:</strong> Smart calendar coordination
                </li>
                <li>
                  • <strong>Communication:</strong> Automated status updates and notifications
                </li>
                <li>
                  • <strong>Reporting:</strong> Automated analytics and insights generation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Dashboard Features
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  • <strong>Real-time Metrics:</strong> Live updates on hiring pipeline
                </li>
                <li>
                  • <strong>AI Insights:</strong> Actionable recommendations for improvement
                </li>
                <li>
                  • <strong>Advanced Filtering:</strong> Find candidates and jobs quickly
                </li>
                <li>
                  • <strong>Export Data:</strong> Download reports and blockchain records
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/50">
            <Button
              onClick={() => setIsHelpOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

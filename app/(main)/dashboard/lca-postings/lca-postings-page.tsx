"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Download,
  Upload,
  BarChart3,
  Shield,
  Zap,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Brain,
  Lock,
  Activity,
  Globe,
  Leaf,
  Lightbulb,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import ESGCommandLauncher from "@/components/ai/esg-command-launcher"

interface LCAPosting {
  id: string
  title: string
  company: string
  industry: string
  location: string
  status: "draft" | "published" | "under_review" | "approved" | "rejected"
  carbonFootprint: number
  waterUsage: number
  wasteGenerated: number
  energyConsumption: number
  sustainabilityScore: number
  createdAt: Date
  updatedAt: Date
  aiGenerated: boolean
  blockchainVerified: boolean
  rpaAutomated: boolean
  description: string
  impactSummary: string
  complianceStatus: "compliant" | "non_compliant" | "pending"
  stakeholders: string[]
  tags: string[]
}

interface AIInsight {
  type: "optimization" | "prediction" | "anomaly" | "recommendation"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  actionable: boolean
}

interface BlockchainRecord {
  hash: string
  timestamp: Date
  dataHash: string
  verified: boolean
  smartContract: string
}

interface RPATask {
  id: string
  name: string
  status: "running" | "completed" | "failed" | "scheduled"
  progress: number
  description: string
  nextRun?: Date
}

export default function LCAPostingsPage() {
  const [postings, setPostings] = useState<LCAPosting[]>([])
  const [filteredPostings, setFilteredPostings] = useState<LCAPosting[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [industryFilter, setIndustryFilter] = useState<string>("all")
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([])
  const [rpaTasks, setRPATasks] = useState<RPATask[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [selectedPosting, setSelectedPosting] = useState<LCAPosting | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [newPosting, setNewPosting] = useState({
    title: "",
    company: "",
    industry: "",
    location: "",
    description: "",
    aiGenerated: false,
    blockchainVerified: true,
    rpaAutomated: false,
  })

  // Sample data initialization
  useEffect(() => {
    const samplePostings: LCAPosting[] = [
      {
        id: "1",
        title: "Sustainable Manufacturing Process - Q4 2024",
        company: "GreenTech Industries",
        industry: "Manufacturing",
        location: "California, USA",
        status: "approved",
        carbonFootprint: 1250.5,
        waterUsage: 45000,
        wasteGenerated: 125.8,
        energyConsumption: 2800,
        sustainabilityScore: 87,
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000),
        aiGenerated: true,
        blockchainVerified: true,
        rpaAutomated: true,
        description: "Comprehensive LCA analysis of our new sustainable manufacturing process implementation.",
        impactSummary:
          "35% reduction in carbon emissions, 28% decrease in water usage, 42% improvement in waste management efficiency.",
        complianceStatus: "compliant",
        stakeholders: ["Environmental Team", "Operations", "Quality Assurance", "Regulatory Affairs"],
        tags: ["manufacturing", "sustainability", "carbon-reduction", "water-efficiency"],
      },
      {
        id: "2",
        title: "Renewable Energy Transition Impact Assessment",
        company: "EcoEnergy Corp",
        industry: "Energy",
        location: "Texas, USA",
        status: "under_review",
        carbonFootprint: 890.2,
        waterUsage: 12000,
        wasteGenerated: 45.3,
        energyConsumption: 1200,
        sustainabilityScore: 92,
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 7200000),
        aiGenerated: false,
        blockchainVerified: true,
        rpaAutomated: false,
        description: "Life cycle assessment of transitioning from fossil fuels to renewable energy sources.",
        impactSummary:
          "68% reduction in carbon footprint, 15% decrease in operational costs, 89% improvement in sustainability metrics.",
        complianceStatus: "pending",
        stakeholders: ["Sustainability Team", "Engineering", "Finance", "Legal"],
        tags: ["renewable-energy", "transition", "impact-assessment", "sustainability"],
      },
      {
        id: "3",
        title: "Circular Economy Implementation - Packaging Division",
        company: "PackSmart Solutions",
        industry: "Packaging",
        location: "New York, USA",
        status: "published",
        carbonFootprint: 567.8,
        waterUsage: 8500,
        wasteGenerated: 23.1,
        energyConsumption: 950,
        sustainabilityScore: 94,
        createdAt: new Date(Date.now() - 259200000),
        updatedAt: new Date(Date.now() - 10800000),
        aiGenerated: true,
        blockchainVerified: true,
        rpaAutomated: true,
        description: "Assessment of circular economy principles implementation in packaging operations.",
        impactSummary:
          "78% reduction in waste generation, 45% improvement in material efficiency, 52% decrease in environmental impact.",
        complianceStatus: "compliant",
        stakeholders: ["R&D Team", "Operations", "Marketing", "Sustainability"],
        tags: ["circular-economy", "packaging", "waste-reduction", "efficiency"],
      },
    ]

    const sampleAIInsights: AIInsight[] = [
      {
        type: "optimization",
        title: "Energy Efficiency Opportunity Detected",
        description:
          "AI analysis suggests implementing smart grid technology could reduce energy consumption by 23% across manufacturing operations.",
        confidence: 0.89,
        impact: "high",
        actionable: true,
      },
      {
        type: "prediction",
        title: "Carbon Footprint Trend Forecast",
        description:
          "Predictive models indicate a 15% increase in carbon emissions if current growth trajectory continues without intervention.",
        confidence: 0.92,
        impact: "medium",
        actionable: true,
      },
      {
        type: "anomaly",
        title: "Unusual Water Usage Pattern",
        description:
          "Anomaly detection identified irregular water consumption patterns in the Texas facility during Q3 2024.",
        confidence: 0.76,
        impact: "medium",
        actionable: true,
      },
      {
        type: "recommendation",
        title: "Blockchain Verification Enhancement",
        description:
          "Recommend implementing advanced smart contracts for automated compliance verification and stakeholder reporting.",
        confidence: 0.94,
        impact: "high",
        actionable: true,
      },
    ]

    const sampleBlockchain: BlockchainRecord[] = [
      {
        hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        timestamp: new Date(Date.now() - 3600000),
        dataHash: "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        verified: true,
        smartContract: "LCAVerificationContract_v2.1",
      },
      {
        hash: "0x9876543210fedcba0987654321fedcba09876543",
        timestamp: new Date(Date.now() - 7200000),
        dataHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        verified: true,
        smartContract: "ESGComplianceContract_v1.8",
      },
    ]

    const sampleRPA: RPATask[] = [
      {
        id: "rpa-1",
        name: "Automated Data Collection",
        status: "running",
        progress: 73,
        description: "Collecting environmental data from IoT sensors and external databases",
        nextRun: new Date(Date.now() + 3600000),
      },
      {
        id: "rpa-2",
        name: "Compliance Report Generation",
        status: "completed",
        progress: 100,
        description: "Generated quarterly compliance reports for all stakeholders",
      },
      {
        id: "rpa-3",
        name: "Stakeholder Notification System",
        status: "scheduled",
        progress: 0,
        description: "Automated notifications for LCA posting updates and approvals",
        nextRun: new Date(Date.now() + 86400000),
      },
    ]

    setPostings(samplePostings)
    setFilteredPostings(samplePostings)
    setAIInsights(sampleAIInsights)
    setBlockchainRecords(sampleBlockchain)
    setRPATasks(sampleRPA)
  }, [])

  // Filter postings based on search and filters
  useEffect(() => {
    let filtered = postings

    if (searchTerm) {
      filtered = filtered.filter(
        (posting) =>
          posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.industry.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((posting) => posting.status === statusFilter)
    }

    if (industryFilter !== "all") {
      filtered = filtered.filter((posting) => posting.industry === industryFilter)
    }

    setFilteredPostings(filtered)
  }, [postings, searchTerm, statusFilter, industryFilter])

  const handleCreatePosting = async () => {
    setIsCreating(true)

    try {
      // Simulate AI generation if enabled
      if (newPosting.aiGenerated) {
        setIsGeneratingAI(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // AI-enhanced content generation
        newPosting.description = `AI-generated comprehensive LCA analysis for ${newPosting.company} in the ${newPosting.industry} sector. This assessment covers environmental impact, sustainability metrics, and compliance requirements.`
      }

      // Generate blockchain hash if verification enabled
      let blockchainHash = ""
      if (newPosting.blockchainVerified) {
        blockchainHash = `0x${Math.random().toString(16).substr(2, 40)}`

        const newBlockchainRecord: BlockchainRecord = {
          hash: blockchainHash,
          timestamp: new Date(),
          dataHash: `sha256:${Math.random().toString(16).substr(2, 64)}`,
          verified: true,
          smartContract: "LCACreationContract_v2.0",
        }
        setBlockchainRecords((prev) => [newBlockchainRecord, ...prev])
      }

      // Create new posting
      const posting: LCAPosting = {
        id: Date.now().toString(),
        ...newPosting,
        status: "draft",
        carbonFootprint: Math.random() * 2000,
        waterUsage: Math.random() * 50000,
        wasteGenerated: Math.random() * 200,
        energyConsumption: Math.random() * 3000,
        sustainabilityScore: Math.floor(Math.random() * 40) + 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        impactSummary: "Initial assessment pending detailed analysis.",
        complianceStatus: "pending",
        stakeholders: ["Environmental Team", "Operations"],
        tags: [newPosting.industry.toLowerCase(), "lca", "assessment"],
      }

      setPostings((prev) => [posting, ...prev])

      // Reset form
      setNewPosting({
        title: "",
        company: "",
        industry: "",
        location: "",
        description: "",
        aiGenerated: false,
        blockchainVerified: true,
        rpaAutomated: false,
      })

      toast({
        title: "LCA Posting Created",
        description: `Successfully created "${posting.title}" with ${newPosting.blockchainVerified ? "blockchain verification" : "standard verification"}`,
      })
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create LCA posting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
      setIsGeneratingAI(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-600/20 text-green-300"
      case "published":
        return "bg-blue-600/20 text-blue-300"
      case "under_review":
        return "bg-yellow-600/20 text-yellow-300"
      case "rejected":
        return "bg-red-600/20 text-red-300"
      default:
        return "bg-gray-600/20 text-gray-300"
    }
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-400"
      case "non_compliant":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getSustainabilityScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">LCA Posting Management</h1>
            <p className="text-gray-400">
              Comprehensive Life Cycle Assessment management with AI, Blockchain, and RPA integration
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create LCA Posting
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                    Create New LCA Posting
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPosting.title}
                        onChange={(e) => setNewPosting((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter LCA posting title"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newPosting.company}
                        onChange={(e) => setNewPosting((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Company name"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select onValueChange={(value) => setNewPosting((prev) => ({ ...prev, industry: value }))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Energy">Energy</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newPosting.location}
                        onChange={(e) => setNewPosting((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Location"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newPosting.description}
                      onChange={(e) => setNewPosting((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter LCA posting description"
                      className="bg-gray-700 border-gray-600 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-blue-400" />
                        <Label htmlFor="ai-generated">AI-Generated Content</Label>
                      </div>
                      <Switch
                        id="ai-generated"
                        checked={newPosting.aiGenerated}
                        onCheckedChange={(checked) => setNewPosting((prev) => ({ ...prev, aiGenerated: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <Label htmlFor="blockchain-verified">Blockchain Verification</Label>
                      </div>
                      <Switch
                        id="blockchain-verified"
                        checked={newPosting.blockchainVerified}
                        onCheckedChange={(checked) =>
                          setNewPosting((prev) => ({ ...prev, blockchainVerified: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-orange-400" />
                        <Label htmlFor="rpa-automated">RPA Automation</Label>
                      </div>
                      <Switch
                        id="rpa-automated"
                        checked={newPosting.rpaAutomated}
                        onCheckedChange={(checked) => setNewPosting((prev) => ({ ...prev, rpaAutomated: checked }))}
                      />
                    </div>
                  </div>

                  {isGeneratingAI && (
                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-blue-300">AI is generating enhanced content...</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setNewPosting({
                          title: "",
                          company: "",
                          industry: "",
                          location: "",
                          description: "",
                          aiGenerated: false,
                          blockchainVerified: true,
                          rpaAutomated: false,
                        })
                      }
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleCreatePosting}
                      disabled={isCreating || !newPosting.title || !newPosting.company}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      {isCreating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Posting
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>

            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Postings</p>
                  <p className="text-2xl font-bold text-white">{postings.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">+12%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">AI Generated</p>
                  <p className="text-2xl font-bold text-white">{postings.filter((p) => p.aiGenerated).length}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-purple-400">
                  {Math.round((postings.filter((p) => p.aiGenerated).length / postings.length) * 100)}%
                </span>
                <span className="text-gray-400 ml-1">of total postings</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Blockchain Verified</p>
                  <p className="text-2xl font-bold text-white">{postings.filter((p) => p.blockchainVerified).length}</p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">100%</span>
                <span className="text-gray-400 ml-1">verification rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Sustainability Score</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(postings.reduce((acc, p) => acc + p.sustainabilityScore, 0) / postings.length)}
                  </p>
                </div>
                <Leaf className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">+8.5%</span>
                <span className="text-gray-400 ml-1">improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-purple-600/20">
              <Brain className="h-4 w-4 mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-green-600/20">
              <Shield className="h-4 w-4 mr-2" />
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="rpa" className="data-[state=active]:bg-orange-600/20">
              <Zap className="h-4 w-4 mr-2" />
              RPA Tasks
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-indigo-600/20">
              <Activity className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search postings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-48 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Postings Table */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  LCA Postings ({filteredPostings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Title</TableHead>
                      <TableHead className="text-gray-300">Company</TableHead>
                      <TableHead className="text-gray-300">Industry</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Sustainability Score</TableHead>
                      <TableHead className="text-gray-300">Technologies</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPostings.map((posting) => (
                      <TableRow key={posting.id} className="border-gray-700 hover:bg-gray-700/30">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{posting.title}</p>
                            <p className="text-sm text-gray-400">{posting.location}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{posting.company}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {posting.industry}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(posting.status)}>
                            {posting.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getSustainabilityScoreColor(posting.sustainabilityScore)}`}>
                              {posting.sustainabilityScore}
                            </span>
                            <Progress value={posting.sustainabilityScore} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {posting.aiGenerated && (
                              <Badge className="bg-purple-600/20 text-purple-300 text-xs">
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                            {posting.blockchainVerified && (
                              <Badge className="bg-green-600/20 text-green-300 text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                BC
                              </Badge>
                            )}
                            {posting.rpaAutomated && (
                              <Badge className="bg-orange-600/20 text-orange-300 text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                RPA
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-600">
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-red-600/20">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      {insight.type === "optimization" && <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />}
                      {insight.type === "prediction" && <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />}
                      {insight.type === "anomaly" && <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />}
                      {insight.type === "recommendation" && <Sparkles className="h-5 w-5 mr-2 text-purple-400" />}
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{insight.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">Confidence:</span>
                          <Badge className="bg-blue-600/20 text-blue-300">
                            {Math.round(insight.confidence * 100)}%
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">Impact:</span>
                          <Badge
                            className={`${
                              insight.impact === "high"
                                ? "bg-red-600/20 text-red-300"
                                : insight.impact === "medium"
                                  ? "bg-yellow-600/20 text-yellow-300"
                                  : "bg-green-600/20 text-green-300"
                            }`}
                          >
                            {insight.impact.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {insight.actionable && (
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blockchain Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-400" />
                    Blockchain Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Records</span>
                    <Badge className="bg-green-600/20 text-green-300">{blockchainRecords.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Verified</span>
                    <Badge className="bg-green-600/20 text-green-300">
                      {blockchainRecords.filter((r) => r.verified).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Success Rate</span>
                    <Badge className="bg-green-600/20 text-green-300">100%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-purple-400" />
                    Smart Contract Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Active Contracts</span>
                    <Badge className="bg-purple-600/20 text-purple-300">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Gas Efficiency</span>
                    <Badge className="bg-green-600/20 text-green-300">Optimized</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Network</span>
                    <Badge className="bg-blue-600/20 text-blue-300">Ethereum</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Blockchain Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockchainRecords.map((record, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-400" />
                          <span className="text-sm font-medium text-white">Block Hash</span>
                        </div>
                        <Badge className="bg-green-600/20 text-green-300 text-xs">Verified</Badge>
                      </div>

                      <code className="block text-xs text-green-300 bg-gray-900/50 p-2 rounded mb-2">
                        {record.hash}
                      </code>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Timestamp:</span>
                          <p className="text-white">{record.timestamp.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Smart Contract:</span>
                          <p className="text-purple-300">{record.smartContract}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RPA Tasks Tab */}
          <TabsContent value="rpa" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {rpaTasks.map((task) => (
                <Card key={task.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Zap className="h-5 w-5 mr-2 text-orange-400" />
                      {task.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{task.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status:</span>
                      <Badge
                        className={`${
                          task.status === "running"
                            ? "bg-orange-600/20 text-orange-300"
                            : task.status === "completed"
                              ? "bg-green-600/20 text-green-300"
                              : task.status === "failed"
                                ? "bg-red-600/20 text-red-300"
                                : "bg-gray-600/20 text-gray-300"
                        }`}
                      >
                        {task.status.toUpperCase()}
                      </Badge>
                    </div>

                    {task.status === "running" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Progress:</span>
                          <span className="text-sm text-white">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}

                    {task.nextRun && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Next Run:</span>
                        <span className="text-sm text-white">{task.nextRun.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 bg-transparent"
                      >
                        {task.status === "running" ? "Pause" : "Start"}
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                    Environmental Impact Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Carbon Footprint Reduction</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">-23%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Water Usage Optimization</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">-18%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Waste Reduction</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">-31%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Energy Efficiency</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">+27%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-green-400" />
                    Industry Benchmarks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Manufacturing</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={87} className="w-20 h-2" />
                        <span className="text-white font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Energy</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-white font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Technology</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-white font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Healthcare</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-white font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-400" />
                  Technology Integration Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Brain className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">AI Integration</h3>
                    <p className="text-3xl font-bold text-purple-400 mb-2">94%</p>
                    <p className="text-sm text-gray-400">Accuracy Rate</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Blockchain</h3>
                    <p className="text-3xl font-bold text-green-400 mb-2">100%</p>
                    <p className="text-sm text-gray-400">Verification Rate</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-8 w-8 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">RPA Efficiency</h3>
                    <p className="text-3xl font-bold text-orange-400 mb-2">87%</p>
                    <p className="text-sm text-gray-400">Automation Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ESG Command Launcher */}
      <ESGCommandLauncher />
    </div>
  )
}

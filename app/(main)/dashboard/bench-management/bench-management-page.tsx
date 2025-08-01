"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Plus,
  Search,
  Star,
  MapPin,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Briefcase,
} from "lucide-react"

interface Consultant {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  title: string
  skills: string[]
  experience: number
  location: string
  availability: "available" | "busy" | "unavailable"
  rate: number
  rating: number
  completedProjects: number
  certifications: string[]
  lastActive: Date
  status: "active" | "inactive" | "pending"
}

interface Vendor {
  id: string
  name: string
  company: string
  email: string
  phone: string
  services: string[]
  location: string
  rating: number
  completedProjects: number
  contractValue: number
  status: "active" | "inactive" | "pending"
  lastEngagement: Date
  certifications: string[]
}

export default function BenchManagementPage() {
  const [consultants, setConsultants] = useState<Consultant[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder-user.jpg",
      title: "Senior Environmental Analyst",
      skills: ["LCA", "Carbon Footprint", "Sustainability Reporting", "ISO 14001"],
      experience: 8,
      location: "New York, NY",
      availability: "available",
      rate: 150,
      rating: 4.8,
      completedProjects: 24,
      certifications: ["LEED AP", "ISO 14001 Lead Auditor"],
      lastActive: new Date(),
      status: "active",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      title: "Sustainability Consultant",
      skills: ["ESG Reporting", "GHG Accounting", "Supply Chain Analysis"],
      experience: 6,
      location: "San Francisco, CA",
      availability: "busy",
      rate: 125,
      rating: 4.6,
      completedProjects: 18,
      certifications: ["GRI Certified", "CDP Accredited"],
      lastActive: new Date(Date.now() - 86400000),
      status: "active",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      title: "Carbon Specialist",
      skills: ["Carbon Accounting", "Renewable Energy", "Climate Risk"],
      experience: 4,
      location: "Austin, TX",
      availability: "available",
      rate: 100,
      rating: 4.9,
      completedProjects: 12,
      certifications: ["CEM", "CDSM"],
      lastActive: new Date(Date.now() - 3600000),
      status: "active",
    },
  ])

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "David Park",
      company: "GreenTech Solutions",
      email: "david@greentech.com",
      phone: "+1 (555) 456-7890",
      services: ["LCA Software", "Data Analytics", "Consulting"],
      location: "Seattle, WA",
      rating: 4.7,
      completedProjects: 35,
      contractValue: 250000,
      status: "active",
      lastEngagement: new Date(Date.now() - 604800000),
      certifications: ["ISO 9001", "SOC 2 Type II"],
    },
    {
      id: "2",
      name: "Lisa Thompson",
      company: "EcoMetrics Inc",
      email: "lisa@ecometrics.com",
      phone: "+1 (555) 567-8901",
      services: ["Environmental Auditing", "Compliance Monitoring"],
      location: "Chicago, IL",
      rating: 4.5,
      completedProjects: 28,
      contractValue: 180000,
      status: "active",
      lastEngagement: new Date(Date.now() - 1209600000),
      certifications: ["ISO 14001", "OHSAS 18001"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")
  const [isAddConsultantOpen, setIsAddConsultantOpen] = useState(false)
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false)

  const filteredConsultants = consultants.filter((consultant) => {
    const matchesSearch =
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesAvailability = availabilityFilter === "all" || consultant.availability === availabilityFilter
    const matchesSkill = skillFilter === "all" || consultant.skills.includes(skillFilter)

    return matchesSearch && matchesAvailability && matchesSkill
  })

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-green-500"
      case "busy":
        return "text-yellow-500"
      case "unavailable":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "busy":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "unavailable":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const totalConsultants = consultants.length
  const availableConsultants = consultants.filter((c) => c.availability === "available").length
  const totalVendors = vendors.length
  const activeVendors = vendors.filter((v) => v.status === "active").length
  const totalContractValue = vendors.reduce((sum, vendor) => sum + vendor.contractValue, 0)
  const averageRating =
    consultants.length > 0
      ? (consultants.reduce((sum, consultant) => sum + consultant.rating, 0) / consultants.length).toFixed(1)
      : "0.0"

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bench Management</h1>
          <p className="text-muted-foreground">Track and manage consultants and vendors for your projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddConsultantOpen} onOpenChange={setIsAddConsultantOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Consultant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Consultant</DialogTitle>
                <DialogDescription>Add a new consultant to your bench</DialogDescription>
              </DialogHeader>
              {/* Add consultant form would go here */}
            </DialogContent>
          </Dialog>
          <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>Add a new vendor to your network</DialogDescription>
              </DialogHeader>
              {/* Add vendor form would go here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsultants}</div>
            <p className="text-xs text-muted-foreground">{availableConsultants} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVendors}</div>
            <p className="text-xs text-muted-foreground">of {totalVendors} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalContractValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Total active contracts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Current utilization rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consultants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="consultants" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter & Search</CardTitle>
              <CardDescription>Filter consultants by availability, skills, or search terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search consultants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="LCA">LCA</SelectItem>
                    <SelectItem value="Carbon Footprint">Carbon Footprint</SelectItem>
                    <SelectItem value="ESG Reporting">ESG Reporting</SelectItem>
                    <SelectItem value="Sustainability Reporting">Sustainability Reporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Consultants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map((consultant) => (
              <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={consultant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {consultant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{consultant.name}</h3>
                        <p className="text-sm text-muted-foreground">{consultant.title}</p>
                      </div>
                    </div>
                    {getAvailabilityIcon(consultant.availability)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {consultant.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />${consultant.rate}/hr
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {consultant.rating}
                    </span>
                    <span>{consultant.experience} years exp</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {consultant.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {consultant.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{consultant.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{consultant.completedProjects} projects</span>
                    <span>Last active: {consultant.lastActive.toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Network</CardTitle>
              <CardDescription>Manage your vendor relationships and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {vendor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.company}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {vendor.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {vendor.rating}
                          </span>
                          <span>{vendor.completedProjects} projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(vendor.contractValue / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-muted-foreground">Contract value</p>
                      <Badge variant={vendor.status === "active" ? "default" : "secondary"} className="mt-1">
                        {vendor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultant Utilization</CardTitle>
                <CardDescription>Current utilization rates by skill set</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["LCA", "Carbon Footprint", "ESG Reporting", "Sustainability"].map((skill) => {
                    const utilization = Math.floor(Math.random() * 40) + 60 // 60-100%
                    return (
                      <div key={skill} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{skill}</span>
                          <span>{utilization}%</span>
                        </div>
                        <Progress value={utilization} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Project Rating</span>
                    <span className="font-medium">{averageRating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-time Delivery Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Client Satisfaction</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Repeat Engagement Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Current project assignments and capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">Available</p>
                  <p className="text-2xl font-bold">{availableConsultants}</p>
                  <p className="text-sm text-muted-foreground">Ready for assignment</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="font-medium">Busy</p>
                  <p className="text-2xl font-bold">{consultants.filter((c) => c.availability === "busy").length}</p>
                  <p className="text-sm text-muted-foreground">Currently assigned</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-medium">Unavailable</p>
                  <p className="text-2xl font-bold">
                    {consultants.filter((c) => c.availability === "unavailable").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Out of office</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

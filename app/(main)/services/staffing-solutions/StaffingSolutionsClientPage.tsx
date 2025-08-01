"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Brain,
  CheckCircle,
  Clock,
  Award,
  Search,
  MessageSquare,
  Calendar,
  Building,
  Code,
  Database,
  Cloud,
} from "lucide-react"

const staffingServices = [
  {
    id: "it-staffing",
    title: "IT Staffing Solutions",
    description: "Expert IT professionals for your technology initiatives",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Full-stack developers",
      "Cloud architects",
      "DevOps engineers",
      "Data scientists",
      "Cybersecurity experts",
      "AI/ML specialists",
    ],
    metrics: {
      placements: "2,500+",
      satisfaction: "98%",
      timeToHire: "7 days",
    },
  },
  {
    id: "sap-staffing",
    title: "SAP Consulting",
    description: "Certified SAP consultants and functional experts",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    features: [
      "SAP S/4HANA consultants",
      "Functional specialists",
      "Technical developers",
      "Project managers",
      "Solution architects",
      "Change management",
    ],
    metrics: {
      placements: "1,200+",
      satisfaction: "99%",
      timeToHire: "5 days",
    },
  },
  {
    id: "cloud-staffing",
    title: "Cloud Expertise",
    description: "Cloud migration and infrastructure specialists",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    features: [
      "AWS certified professionals",
      "Azure specialists",
      "GCP experts",
      "Kubernetes engineers",
      "Cloud security",
      "Migration specialists",
    ],
    metrics: {
      placements: "800+",
      satisfaction: "97%",
      timeToHire: "6 days",
    },
  },
  {
    id: "enterprise-staffing",
    title: "Enterprise Solutions",
    description: "Enterprise architecture and business transformation",
    icon: Building,
    color: "from-orange-500 to-red-500",
    features: [
      "Enterprise architects",
      "Business analysts",
      "Process consultants",
      "Digital transformation",
      "Integration specialists",
      "Governance experts",
    ],
    metrics: {
      placements: "600+",
      satisfaction: "96%",
      timeToHire: "8 days",
    },
  },
]

const talentCategories = [
  { name: "Software Development", count: 1250, growth: "+15%" },
  { name: "SAP Consulting", count: 890, growth: "+22%" },
  { name: "Cloud Architecture", count: 650, growth: "+35%" },
  { name: "Data & Analytics", count: 420, growth: "+28%" },
  { name: "Cybersecurity", count: 380, growth: "+40%" },
  { name: "AI/ML Engineering", count: 290, growth: "+55%" },
]

export default function StaffingSolutionsClientPage() {
  const [mounted, setMounted] = useState(false)
  const [activeService, setActiveService] = useState("it-staffing")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    requirements: "",
    timeline: "",
    budget: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">Loading Staffing Solutions</h1>
          <p className="text-gray-400">Connecting you with top talent...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Users className="w-4 h-4 mr-2" />
              AI-Powered Talent Acquisition
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Elite Staffing
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Solutions
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Connect with top-tier IT, SAP, and enterprise talent through our AI-powered matching platform. From
              contract to permanent placements, we deliver the right expertise for your projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Talent Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Specialized Staffing Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-driven platform matches you with pre-vetted professionals across key technology domains
            </p>
          </motion.div>

          <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-gray-900/50 backdrop-blur-md mb-8">
              {staffingServices.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <service.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{service.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {staffingServices.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mr-4`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        <p className="text-gray-300">{service.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {Object.entries(service.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gray-900/50 rounded-lg">
                          <div className="text-lg font-bold text-blue-400 mb-1">{value}</div>
                          <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>

                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Request Talent
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-blue-400" />
                          AI Talent Matching
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <span className="text-gray-300">Skill Match Score</span>
                            <div className="flex items-center">
                              <div className="w-20 h-2 bg-gray-700 rounded-full mr-2">
                                <div className="w-4/5 h-2 bg-green-400 rounded-full"></div>
                              </div>
                              <span className="text-green-400 font-semibold">95%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <span className="text-gray-300">Cultural Fit</span>
                            <div className="flex items-center">
                              <div className="w-20 h-2 bg-gray-700 rounded-full mr-2">
                                <div className="w-5/6 h-2 bg-blue-400 rounded-full"></div>
                              </div>
                              <span className="text-blue-400 font-semibold">92%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <span className="text-gray-300">Availability</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Immediate</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Talent Categories */}
      <section className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Available Talent Pool</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access our extensive network of pre-screened professionals across multiple domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talentCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{category.growth}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-400">{category.count}</span>
                      <span className="text-gray-400">Available</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Request Talent</h2>
              <p className="text-xl text-gray-300">
                Tell us about your requirements and we'll match you with the perfect candidates
              </p>
            </motion.div>

            <Card className="bg-gray-900/50 backdrop-blur-md border-gray-800">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Role *</label>
                      <Input
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        placeholder="e.g., Hiring Manager, CTO"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Talent Requirements *</label>
                    <Textarea
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white min-h-[120px]"
                      placeholder="Describe the skills, experience, and qualifications you're looking for..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                          <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                          <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                          <SelectItem value="long">Long-term (6+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-75">$50-75/hour</SelectItem>
                          <SelectItem value="75-100">$75-100/hour</SelectItem>
                          <SelectItem value="100-150">$100-150/hour</SelectItem>
                          <SelectItem value="150+">$150+/hour</SelectItem>
                          <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "5,000+", label: "Active Professionals", color: "text-blue-400" },
              { icon: Building, value: "500+", label: "Client Companies", color: "text-green-400" },
              { icon: Award, value: "98%", label: "Success Rate", color: "text-yellow-400" },
              { icon: Clock, value: "7 Days", label: "Avg. Time to Hire", color: "text-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  <stat.icon className="h-12 w-12" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

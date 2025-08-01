"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, TrendingUp, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CaseStudy {
  id: number
  category: string
  industry: string
  company: string
  module: string
  challenge: string
  solution: string
  results: {
    costSaved?: string
    deliveryImprovement?: string
    cycleReduction?: string
    forecastAccuracy?: string
    complianceImprovement?: string
  }
  metrics: Array<{
    label: string
    value: string
    trend: "up" | "down"
    previous?: string
  }>
  quote: string
  clientName: string
  clientTitle: string
  duration: string
  region: string
  tags: string[]
}

export default function CaseStudyExplorer() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  useEffect(() => {
    filterCaseStudies()
  }, [caseStudies, searchTerm, selectedIndustry, selectedModule, selectedCategory])

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/case-studies")
      const data = await response.json()
      if (data.success) {
        setCaseStudies(data.data)
        setFilteredStudies(data.data)
      }
    } catch (error) {
      console.error("Error fetching case studies:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterCaseStudies = () => {
    let filtered = caseStudies

    if (searchTerm) {
      filtered = filtered.filter(
        (study) =>
          study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedIndustry !== "all") {
      filtered = filtered.filter((study) => study.industry === selectedIndustry)
    }

    if (selectedModule !== "all") {
      filtered = filtered.filter((study) => study.module.includes(selectedModule))
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((study) => study.category === selectedCategory)
    }

    setFilteredStudies(filtered)
  }

  const industries = [...new Set(caseStudies.map((study) => study.industry))]
  const modules = [...new Set(caseStudies.map((study) => study.module))]
  const categories = [...new Set(caseStudies.map((study) => study.category))]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors duration-300 mb-6"
          >
            AI-Powered Case Studies
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
              Success Stories
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Across Industries
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore real-world transformations powered by ESGit's AI-enhanced SAP solutions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search case studies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="SAP Module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    {modules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Case Studies Grid */}
        <AnimatePresence>
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-4" />
                    <div className="h-20 bg-gray-700 rounded mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-gray-700 rounded" />
                      <div className="h-16 bg-gray-700 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group bg-gray-900/50 border-gray-700 hover:border-cyan-500/30 hover:bg-gray-900/70 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {study.industry}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                          {study.module}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {study.company}
                      </CardTitle>
                      <p className="text-gray-400 text-sm">{study.challenge}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-300 text-sm">{study.solution}</p>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          {study.metrics.slice(0, 4).map((metric, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{metric.label}</span>
                                <TrendingUp
                                  className={`h-3 w-3 ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}
                                />
                              </div>
                              <div className="text-lg font-bold text-white">{metric.value}</div>
                              {metric.previous && <div className="text-xs text-gray-500">from {metric.previous}</div>}
                            </div>
                          ))}
                        </div>

                        {/* Client Quote */}
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                          <p className="text-sm text-gray-300 italic mb-2">"{study.quote}"</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">{study.clientName}</p>
                              <p className="text-xs text-gray-400">{study.clientTitle}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">{study.duration}</p>
                              <p className="text-xs text-gray-500">{study.region}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                          >
                            View Full Case Study
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!loading && filteredStudies.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">No case studies found matching your criteria</div>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedIndustry("all")
                setSelectedModule("all")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

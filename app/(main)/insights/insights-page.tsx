"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Globe,
  Users,
  Building2,
  Factory,
  Heart,
  CreditCard,
  ShoppingCart,
  Smartphone,
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  Download,
  Share2,
  Bookmark,
  Eye,
  MessageSquare,
  ThumbsUp,
  Star,
  Lightbulb,
  Cpu,
  Database,
  Cloud,
  Shield,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Insight {
  id: string
  title: string
  category: string
  industry: string
  summary: string
  content: string
  author: string
  authorRole: string
  authorAvatar?: string
  publishedAt: string
  readTime: number
  views: number
  likes: number
  comments: number
  tags: string[]
  trending: boolean
  featured: boolean
  aiGenerated: boolean
}

const mockInsights: Insight[] = [
  {
    id: "1",
    title: "The Future of SAP S/4HANA: AI-Driven Enterprise Transformation",
    category: "Technology Trends",
    industry: "Enterprise Software",
    summary:
      "Exploring how artificial intelligence is revolutionizing SAP S/4HANA implementations and driving unprecedented business value.",
    content:
      "As enterprises continue their digital transformation journey, SAP S/4HANA has emerged as the cornerstone of modern business operations...",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Technology Officer",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    views: 2847,
    likes: 156,
    comments: 23,
    tags: ["SAP", "AI", "Digital Transformation", "Enterprise"],
    trending: true,
    featured: true,
    aiGenerated: false,
  },
  {
    id: "2",
    title: "Manufacturing 4.0: Smart Factory Implementation Strategies",
    category: "Industry Analysis",
    industry: "Manufacturing",
    summary:
      "A comprehensive guide to implementing smart factory technologies and achieving operational excellence in manufacturing.",
    content:
      "The manufacturing industry is undergoing a revolutionary transformation with the advent of Industry 4.0 technologies...",
    author: "Michael Rodriguez",
    authorRole: "Manufacturing Solutions Lead",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-12T14:30:00Z",
    readTime: 12,
    views: 1923,
    likes: 89,
    comments: 17,
    tags: ["Manufacturing", "IoT", "Automation", "Smart Factory"],
    trending: true,
    featured: false,
    aiGenerated: true,
  },
  {
    id: "3",
    title: "Healthcare Digital Transformation: Lessons from Leading Hospitals",
    category: "Case Study",
    industry: "Healthcare",
    summary:
      "Real-world examples of successful digital transformation initiatives in healthcare organizations worldwide.",
    content:
      "Healthcare organizations are rapidly adopting digital technologies to improve patient outcomes and operational efficiency...",
    author: "Dr. Emily Watson",
    authorRole: "Healthcare Innovation Director",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-10T09:15:00Z",
    readTime: 10,
    views: 3156,
    likes: 234,
    comments: 45,
    tags: ["Healthcare", "Digital Health", "Patient Care", "Innovation"],
    trending: false,
    featured: true,
    aiGenerated: false,
  },
  {
    id: "4",
    title: "Financial Services Cybersecurity: Emerging Threats and Solutions",
    category: "Security",
    industry: "Financial Services",
    summary:
      "An in-depth analysis of cybersecurity challenges facing financial institutions and advanced protection strategies.",
    content:
      "The financial services sector continues to be a prime target for cybercriminals, making robust security measures essential...",
    author: "James Thompson",
    authorRole: "Cybersecurity Architect",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-08T16:45:00Z",
    readTime: 15,
    views: 1567,
    likes: 78,
    comments: 12,
    tags: ["Cybersecurity", "Financial Services", "Risk Management", "Compliance"],
    trending: false,
    featured: false,
    aiGenerated: true,
  },
  {
    id: "5",
    title: "Retail Revolution: AI-Powered Customer Experience Strategies",
    category: "Customer Experience",
    industry: "Retail",
    summary: "How artificial intelligence is transforming retail customer experiences and driving business growth.",
    content:
      "The retail landscape is evolving rapidly, with AI technologies enabling personalized customer experiences at scale...",
    author: "Lisa Park",
    authorRole: "Retail Strategy Consultant",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-05T11:20:00Z",
    readTime: 7,
    views: 2234,
    likes: 145,
    comments: 28,
    tags: ["Retail", "AI", "Customer Experience", "Personalization"],
    trending: true,
    featured: false,
    aiGenerated: false,
  },
  {
    id: "6",
    title: "Cloud Migration Best Practices: Enterprise Success Stories",
    category: "Cloud Computing",
    industry: "Technology",
    summary: "Proven strategies and real-world examples of successful enterprise cloud migration initiatives.",
    content:
      "Cloud migration has become a strategic imperative for enterprises seeking agility, scalability, and cost optimization...",
    author: "David Kumar",
    authorRole: "Cloud Solutions Architect",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-03T13:10:00Z",
    readTime: 11,
    views: 1789,
    likes: 92,
    comments: 19,
    tags: ["Cloud Computing", "Migration", "AWS", "Azure", "Enterprise"],
    trending: false,
    featured: false,
    aiGenerated: true,
  },
]

const categories = [
  { name: "All Categories", count: 156, icon: <Globe className="h-4 w-4" /> },
  { name: "Technology Trends", count: 45, icon: <Cpu className="h-4 w-4" /> },
  { name: "Industry Analysis", count: 38, icon: <BarChart3 className="h-4 w-4" /> },
  { name: "Case Study", count: 29, icon: <Target className="h-4 w-4" /> },
  { name: "Security", count: 22, icon: <Shield className="h-4 w-4" /> },
  { name: "Customer Experience", count: 18, icon: <Users className="h-4 w-4" /> },
  { name: "Cloud Computing", count: 15, icon: <Cloud className="h-4 w-4" /> },
]

const industries = [
  { name: "Manufacturing", icon: <Factory className="h-4 w-4" />, color: "bg-blue-500" },
  { name: "Healthcare", icon: <Heart className="h-4 w-4" />, color: "bg-red-500" },
  { name: "Financial Services", icon: <CreditCard className="h-4 w-4" />, color: "bg-green-500" },
  { name: "Retail", icon: <ShoppingCart className="h-4 w-4" />, color: "bg-purple-500" },
  { name: "Technology", icon: <Cpu className="h-4 w-4" />, color: "bg-cyan-500" },
  { name: "Telecommunications", icon: <Smartphone className="h-4 w-4" />, color: "bg-orange-500" },
  { name: "Logistics", icon: <Truck className="h-4 w-4" />, color: "bg-yellow-500" },
  { name: "Enterprise Software", icon: <Database className="h-4 w-4" />, color: "bg-indigo-500" },
]

const trendingTopics = [
  { name: "Generative AI", growth: 245, posts: 89 },
  { name: "SAP S/4HANA", growth: 156, posts: 67 },
  { name: "Digital Transformation", growth: 134, posts: 123 },
  { name: "Cybersecurity", growth: 98, posts: 45 },
  { name: "Cloud Migration", growth: 87, posts: 56 },
  { name: "Industry 4.0", growth: 76, posts: 34 },
]

export default function InsightsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [insights, setInsights] = useState<Insight[]>(mockInsights)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded mb-4"></div>
            <div className="h-6 bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All Categories" || insight.category === selectedCategory
    const matchesIndustry = selectedIndustry === "all" || insight.industry === selectedIndustry

    return matchesSearch && matchesCategory && matchesIndustry
  })

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      case "latest":
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="h-8 w-8 text-cyan-400" />
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                AI-Powered
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  Insights
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover cutting-edge industry insights, trends, and analysis powered by artificial intelligence. Stay
              ahead of the curve with expert perspectives on digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3"
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                Explore Insights
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 bg-transparent"
              >
                <Star className="h-5 w-5 mr-2" />
                Subscribe to Updates
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400">Expert Insights</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">50k+</div>
              <div className="text-gray-400">Monthly Readers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">25</div>
              <div className="text-gray-400">Industry Experts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-400">AI Accuracy</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search by title, topic, or tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{topic.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-400">+{topic.growth}%</span>
                          <Badge variant="secondary" className="text-xs">
                            {topic.posts}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={topic.growth / 3} className="h-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Industries */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Industries
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    onClick={() => setSelectedIndustry("all")}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      selectedIndustry === "all"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">All Industries</span>
                  </button>
                  {industries.map((industry) => (
                    <button
                      key={industry.name}
                      onClick={() => setSelectedIndustry(industry.name)}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        selectedIndustry === industry.name
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      {industry.icon}
                      <span className="text-sm">{industry.name}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{sortedInsights.length} insights found</span>
                  {(searchTerm || selectedCategory !== "All Categories" || selectedIndustry !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("All Categories")
                        setSelectedIndustry("all")
                      }}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Insights */}
              {sortedInsights.some((insight) => insight.featured) && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400" />
                    Featured Insights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedInsights
                      .filter((insight) => insight.featured)
                      .slice(0, 2)
                      .map((insight, index) => (
                        <motion.div
                          key={insight.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Featured
                                  </Badge>
                                  {insight.trending && (
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                  {insight.aiGenerated && (
                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                      <Brain className="h-3 w-3 mr-1" />
                                      AI
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <CardTitle className="text-white text-xl mb-2 line-clamp-2">{insight.title}</CardTitle>
                              <CardDescription className="text-gray-400">
                                <div className="flex items-center gap-4 text-sm mb-2">
                                  <span className="flex items-center gap-1">
                                    <Building2 className="h-3 w-3" />
                                    {insight.industry}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(insight.publishedAt)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {insight.readTime} min read
                                  </span>
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 mb-4 line-clamp-3">{insight.summary}</p>

                              <div className="flex items-center gap-2 mb-4">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={insight.authorAvatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gray-700 text-white text-xs">
                                    {insight.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm text-white">{insight.author}</div>
                                  <div className="text-xs text-gray-400">{insight.authorRole}</div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4">
                                {insight.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                                    {tag}
                                  </Badge>
                                ))}
                                {insight.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                                    +{insight.tags.length - 3}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {formatNumber(insight.views)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    {formatNumber(insight.likes)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {insight.comments}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                >
                                  Read More
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                  <Separator className="bg-gray-700" />
                </div>
              )}

              {/* All Insights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">All Insights</h2>
                <div className="space-y-6">
                  {sortedInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                                  {insight.category}
                                </Badge>
                                {insight.trending && (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                {insight.featured && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    Featured
                                  </Badge>
                                )}
                                {insight.aiGenerated && (
                                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                    <Brain className="h-3 w-3 mr-1" />
                                    AI Generated
                                  </Badge>
                                )}
                              </div>

                              <h3 className="text-xl font-semibold text-white mb-2 hover:text-cyan-400 cursor-pointer transition-colors">
                                {insight.title}
                              </h3>

                              <p className="text-gray-400 mb-4 line-clamp-2">{insight.summary}</p>

                              <div className="flex items-center gap-2 mb-4">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={insight.authorAvatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gray-700 text-white text-xs">
                                    {insight.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm text-white">{insight.author}</div>
                                  <div className="text-xs text-gray-400">{insight.authorRole}</div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4">
                                {insight.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs bg-gray-700/30 text-gray-400 hover:bg-gray-700/50 cursor-pointer"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="md:w-48 flex flex-col justify-between">
                              <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(insight.publishedAt)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {insight.readTime} min read
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {insight.industry}
                                </div>
                              </div>

                              <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {formatNumber(insight.views)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    {formatNumber(insight.likes)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {insight.comments}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                                  >
                                    Read
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                  >
                                    <Bookmark className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                                  >
                                    <Share2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {sortedInsights.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      No insights found matching your criteria.
                    </div>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("All Categories")
                        setSelectedIndustry("all")
                      }}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Stay Ahead with AI-Powered Insights</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get personalized insights delivered to your inbox. Join thousands of industry leaders who trust our
              AI-driven analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Brain className="h-5 w-5 mr-2" />
                Subscribe to AI Insights
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Industry Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

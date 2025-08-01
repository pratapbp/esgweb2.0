"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Brain,
  Zap,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
  Mic,
  MicOff,
  Sparkles,
  Activity,
  Shield,
  Database,
  Cloud,
  Factory,
  Heart,
  ShoppingCart,
  Building2,
  Target,
  FileText,
  Briefcase,
  UserPlus,
  Phone,
  Sun,
  Moon,
  Monitor,
  Palette,
  Eye,
  EyeOff,
  Cpu,
  BarChart3,
  Layers,
  Rocket,
  Search,
  Menu,
  X,
  LogIn,
  CheckCircle,
  Clock,
  Users,
  Server,
  TrendingUp,
  Truck,
  Smartphone,
  MessageSquare,
  Mail,
  MapPin,
  Bot,
  Wifi,
  CloudLightning,
  Lightbulb,
  Copy,
  Blocks,
  Landmark,
  Home,
  Info,
  Compass,
  Globe,
  Headphones,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "sonner"

// AI Context Types
interface AIContext {
  userRole: string
  currentSection: string
  recentActions: string[]
  preferredIndustries: string[]
  sessionHeat: number
  timeOfDay: "morning" | "afternoon" | "evening" | "night"
  aiSuggestions: string[]
  copilotActive: boolean
}

interface NavigationItem {
  name: string
  href: string
  type: "link" | "dropdown" | "mega"
  icon?: React.ReactNode
  badge?: string
  aiPriority?: number
  items?: {
    name: string
    href: string
    description: string
    icon: React.ReactNode
    badge?: string
    category?: string
  }[]
}

// Comprehensive Navigation Data with all pages and sub-pages
const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    type: "link",
    icon: <Home className="h-4 w-4" />,
    aiPriority: 10,
  },
  {
    name: "Who We Are",
    href: "/about-us",
    type: "dropdown",
    icon: <Info className="h-4 w-4" />,
    aiPriority: 9,
    items: [
      {
        name: "About Us",
        href: "/about-us",
        description: "Our story, mission, and values",
        icon: <Building2 className="h-4 w-4" />,
        category: "company",
      },
      {
        name: "Our Mission",
        href: "/mission",
        description: "Vision for digital transformation",
        icon: <Target className="h-4 w-4" />,
        category: "company",
      },
    ],
  },
  {
    name: "What We Do",
    href: "/services",
    type: "mega",
    icon: <Layers className="h-4 w-4" />,
    aiPriority: 8,
    items: [
      {
        name: "SAP Enterprise Solutions",
        href: "/services/sap-enterprise-solutions",
        description: "S/4HANA, RISE, BTP implementation and optimization",
        icon: <Database className="h-4 w-4" />,
        badge: "Popular",
        category: "sap",
      },
      {
        name: "SAP Data & AI Analytics",
        href: "/services/sap-data-ai-analytics",
        description: "Predictive analytics, machine learning, and AI insights",
        icon: <BarChart3 className="h-4 w-4" />,
        badge: "GenAI",
        category: "sap",
      },
      {
        name: "SAP Supply Chain & Procurement",
        href: "/services/sap-supply-chain-procurement",
        description: "End-to-end supply chain optimization and procurement",
        icon: <Truck className="h-4 w-4" />,
        category: "sap",
      },
      {
        name: "SAP BRIM",
        href: "/services/sap-brim",
        description: "Billing and revenue innovation management",
        icon: <TrendingUp className="h-4 w-4" />,
        category: "sap",
      },
      {
        name: "SAP Technology Innovation",
        href: "/services/sap-technology-innovation",
        description: "Next-generation SAP technologies and innovations",
        icon: <Cpu className="h-4 w-4" />,
        badge: "New",
        category: "sap",
      },
      {
        name: "Digital & AI Solutions",
        href: "/services/digital-ai-solutions",
        description: "Custom AI models, automation, and digital transformation",
        icon: <Brain className="h-4 w-4" />,
        badge: "Hot",
        category: "ai",
      },
      {
        name: "Cloud Solutions",
        href: "/services/cloud-solutions",
        description: "Multi-cloud strategy, migration, and infrastructure",
        icon: <Cloud className="h-4 w-4" />,
        category: "cloud",
      },
      {
        name: "Cybersecurity Services",
        href: "/services/cybersecurity-services",
        description: "AI-powered security solutions and compliance",
        icon: <Shield className="h-4 w-4" />,
        category: "security",
      },
      {
        name: "Staffing Solutions",
        href: "/services/staffing-solutions",
        description: "H1B visa support and expert talent placement",
        icon: <UserPlus className="h-4 w-4" />,
        category: "staffing",
      },
    ],
  },
  {
    name: "Our Expertise",
    href: "/industries",
    type: "mega",
    icon: <Compass className="h-4 w-4" />,
    aiPriority: 7,
    items: [
      {
        name: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Smart manufacturing and Industry 4.0 solutions",
        icon: <Factory className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Healthcare & Life Sciences",
        href: "/industries/healthcare",
        description: "Healthcare technology and life sciences solutions",
        icon: <Heart className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Banking & Financial Services",
        href: "/industries/bfsi",
        description: "Fintech, banking, and financial services solutions",
        icon: <Landmark className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Retail & E-commerce",
        href: "/industries/retail",
        description: "Omnichannel retail and e-commerce transformation",
        icon: <ShoppingCart className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Telecommunications",
        href: "/industries/telecom",
        description: "5G networks and telecommunications solutions",
        icon: <Smartphone className="h-4 w-4" />,
        badge: "New",
        category: "industry",
      },
      {
        name: "Public Sector",
        href: "/industries/public-sector",
        description: "Government and public sector digital services",
        icon: <Building2 className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Energy & Utilities",
        href: "/industries/energy-utilities",
        description: "Smart grid, renewable energy, and utility solutions",
        icon: <Zap className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Logistics & Supply Chain",
        href: "/industries/logistics",
        description: "Intelligent logistics and supply chain optimization",
        icon: <Truck className="h-4 w-4" />,
        category: "industry",
      },
      {
        name: "Pharmaceuticals",
        href: "/industries/pharma",
        description: "Pharmaceutical innovation and compliance solutions",
        icon: <Heart className="h-4 w-4" />,
        category: "industry",
      },
    ],
  },
  {
    name: "Tech Stack",
    href: "/technologies",
    type: "mega",
    icon: <Cpu className="h-4 w-4" />,
    aiPriority: 6,
    badge: "Updated",
    items: [
      {
        name: "Technology Overview",
        href: "/technologies",
        description: "Complete overview of our technology portfolio",
        icon: <Layers className="h-4 w-4" />,
        category: "overview",
      },
      {
        name: "Generative AI",
        href: "/technologies/genai",
        description: "LLM integration, AI copilots, generative AI solutions",
        icon: <Brain className="h-4 w-4" />,
        badge: "Featured",
        category: "ai",
      },
      {
        name: "Blockchain",
        href: "/technologies/blockchain",
        description: "Enterprise blockchain, smart contracts, compliance automation",
        icon: <Blocks className="h-4 w-4" />,
        category: "blockchain",
      },
      {
        name: "RPA",
        href: "/technologies/rpa",
        description: "Robotic process automation, intelligent automation, workflow optimization",
        icon: <Bot className="h-4 w-4" />,
        category: "automation",
      },
      {
        name: "Cybersecurity",
        href: "/technologies/cybersecurity",
        description: "AI security, zero trust architecture, threat detection",
        icon: <Shield className="h-4 w-4" />,
        badge: "New",
        category: "security",
      },
      {
        name: "IoT & Edge AI",
        href: "/technologies/iot",
        description: "Industrial IoT, edge computing, connected devices",
        icon: <Wifi className="h-4 w-4" />,
        badge: "New",
        category: "iot",
      },
      {
        name: "Superintelligence",
        href: "/technologies/superintelligence",
        description: "Ethical AI, AGI development, workforce optimization",
        icon: <Lightbulb className="h-4 w-4" />,
        badge: "New",
        category: "ai",
      },
      {
        name: "Cloud Infrastructure",
        href: "/technologies/cloud",
        description: "Multi-cloud, hybrid infrastructure, cloud migration",
        icon: <CloudLightning className="h-4 w-4" />,
        badge: "New",
        category: "cloud",
      },
      {
        name: "Theory of Mind AI",
        href: "/technologies/theory-of-mind",
        description: "Empathetic AI, human-AI interaction, emotional intelligence",
        icon: <Heart className="h-4 w-4" />,
        badge: "New",
        category: "ai",
      },
      {
        name: "Digital Twin",
        href: "/technologies/digital-twin",
        description: "Virtual modeling, predictive simulation, digital transformation",
        icon: <Copy className="h-4 w-4" />,
        badge: "New",
        category: "simulation",
      },
    ],
  },
  {
    name: "Join Our Team",
    href: "/careers",
    type: "dropdown",
    icon: <Briefcase className="h-4 w-4" />,
    badge: "Hiring",
    aiPriority: 5,
    items: [
      {
        name: "Jobs",
        href: "careers/jobs",
        description: "Explore career opportunities and join our growing team",
        icon: <Briefcase className="h-4 w-4" />,
        badge: "New",
        category: "careers",
      },
      {
        name: "LCA Postings",
        href: "careers/lca-postings",
        description: "Labor condition applications and H1B visa information",
        icon: <FileText className="h-4 w-4" />,
        badge: "H1B",
        category: "careers",
      },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
    type: "link",
    icon: <Phone className="h-4 w-4" />,
    aiPriority: 3,
   
  },
]

// AI Context Hook
function useAIContext(): AIContext {
  const [context, setContext] = useState<AIContext>({
    userRole: "visitor",
    currentSection: "home",
    recentActions: [],
    preferredIndustries: [],
    sessionHeat: 0,
    timeOfDay: "morning",
    aiSuggestions: [],
    copilotActive: false,
  })

  const pathname = usePathname()

  useEffect(() => {
    // Determine time of day
    const hour = new Date().getHours()
    let timeOfDay: AIContext["timeOfDay"] = "morning"
    if (hour >= 12 && hour < 17) timeOfDay = "afternoon"
    else if (hour >= 17 && hour < 21) timeOfDay = "evening"
    else if (hour >= 21 || hour < 6) timeOfDay = "night"

    // Determine current section
    let currentSection = "home"
    if (pathname?.includes("/about")) currentSection = "about"
    else if (pathname?.includes("/services")) currentSection = "services"
    else if (pathname?.includes("/industries")) currentSection = "industries"
    else if (pathname?.includes("/careers")) currentSection = "careers"
    else if (pathname?.includes("/contact")) currentSection = "contact"

    // Generate AI suggestions based on context
    const suggestions = generateAISuggestions(timeOfDay, currentSection)

    setContext((prev) => ({
      ...prev,
      timeOfDay,
      currentSection,
      aiSuggestions: suggestions,
      sessionHeat: Math.min(prev.sessionHeat + 1, 100),
    }))
  }, [pathname])

  return context
}

function generateAISuggestions(timeOfDay: string, section: string): string[] {
  const suggestions: Record<string, string[]> = {
    morning: [
      "Start with our AI-powered SAP assessment",
      "Explore manufacturing automation solutions",
      "Check latest industry insights",
    ],
    afternoon: [
      "Schedule a consultation call",
      "Download our digital transformation guide",
      "View customer success stories",
    ],
    evening: ["Review your ESG OS dashboard", "Explore career opportunities", "Read our latest blog posts"],
    night: ["Set up automated reports", "Plan tomorrow's AI initiatives", "Review system performance metrics"],
  }

  return suggestions[timeOfDay] || suggestions.morning
}

// Theme Management
type Theme = "light" | "dark" | "glass" | "neon"

function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [isPrivacyMode, setIsPrivacyMode] = useState(false)

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return { theme, toggleTheme, isPrivacyMode, setIsPrivacyMode }
}

// Voice Search Hook
function useVoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        toast.success(`Voice command: "${result}"`)
      }

      recognition.start()
    } else {
      toast.error("Voice search not supported in this browser")
    }
  }

  return { isListening, transcript, startListening }
}

// System Metrics Hook
function useSystemMetrics() {
  const [metrics, setMetrics] = useState({
    systemStatus: "All Operational",
    activeProjects: 149,
    aiModelsRunning: 14,
    dataProcessedToday: "4.4TB",
    liveSessions: 88,
    currentTime: new Date(),
  })

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics((prev) => ({
        ...prev,
        currentTime: new Date(),
        // Simulate real-time updates
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3) - 1,
        aiModelsRunning: Math.max(10, prev.aiModelsRunning + Math.floor(Math.random() * 3) - 1),
        liveSessions: Math.max(50, prev.liveSessions + Math.floor(Math.random() * 10) - 5),
      }))
    }

    const interval = setInterval(updateMetrics, 5000) // Update every 5 seconds
    const timeInterval = setInterval(() => {
      setMetrics((prev) => ({ ...prev, currentTime: new Date() }))
    }, 1000) // Update time every second

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  return metrics
}

export default function AINaviteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)

  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  let user = null
  let profile = null
  let loading = false
  let signOut = async () => {}

  if (auth) {
    user = auth.user
    profile = auth.profile
    loading = auth.loading
    signOut = auth.signOut
  }

  const aiContext = useAIContext()
  const { theme, toggleTheme, isPrivacyMode, setIsPrivacyMode } = useTheme()
  const { isListening, transcript, startListening } = useVoiceSearch()
  const metrics = useSystemMetrics()

  const commandPaletteRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false)
        setActiveDropdown(null)
        setIsSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target?.closest("[data-dropdown]")) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery?.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname?.startsWith(href)) return true
    return false
  }

  const getUserInitials = (name?: string, email?: string) => {
    if (name && typeof name === "string") {
      return name
        .split(" ")
        .map((n) => n?.[0] || "")
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (email && typeof email === "string") {
      return email.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  const getThemeClasses = () => {
    const base = "fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    const themes = {
      light: "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm",
      dark: `bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-xl border-b border-gray-700/50 ${
        isScrolled ? "shadow-lg shadow-blue-900/20" : ""
      }`,
      glass: "bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-lg",
      neon: "bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-900/20",
    }
    return `${base} ${themes[theme]}`
  }

  const getTextClasses = () => {
    const themes = {
      light: "text-gray-900",
      dark: "text-gray-100",
      glass: "text-white",
      neon: "text-cyan-100",
    }
    return themes[theme]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const isAdmin = profile?.role === "admin"
  const isHRManager = profile?.role === "hr_manager"

  return (
    <TooltipProvider>
      <header className={getThemeClasses()}>
        {/* AI Status Bar */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white text-xs py-1 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span className="font-medium">ESG OS: {metrics.systemStatus}</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3 text-blue-300" />
                <span>{metrics.activeProjects} Active Projects</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="h-3 w-3 text-purple-300" />
                <span>{metrics.aiModelsRunning} AI Models Running</span>
              </div>
              <div className="flex items-center space-x-1">
                <Server className="h-3 w-3 text-green-300" />
                <span>{metrics.dataProcessedToday} Processed Today</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-yellow-300" />
                <span>{formatTime(metrics.currentTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 text-cyan-300" />
                <span>{metrics.liveSessions} Live Sessions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Launch ESG OS */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Image
                    src="/images/logos/logo-1024x1024.webp"
                    alt="ESG Executive Software Guild Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-white">ESG</div>
                  <div className="text-xs text-gray-400">Executive Software Guild</div>
                </div>
              </Link>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30"
                  >
                    <Rocket className="h-4 w-4" />
                    <span>Launch ESG OS</span>
                    <Zap className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open ESG Operating System (SSO)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems
                .sort((a, b) => (b.aiPriority || 0) - (a.aiPriority || 0))
                .map((item) => (
                  <div key={item.name} className="relative" data-dropdown>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30"
                            : `${getTextClasses()} hover:bg-white/10`
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            className={`px-3 py-2 rounded-l-lg text-sm font-medium transition-all duration-200 ${
                              activeDropdown === item.name || isActive(item.href)
                                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300"
                                : `${getTextClasses()} hover:bg-white/10`
                            }`}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                            className={`px-1 py-2 rounded-r-lg text-sm font-medium transition-all duration-200 border-l border-gray-500 ${
                              activeDropdown === item.name
                                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border-blue-500/30"
                                : `${getTextClasses()} hover:bg-white/10`
                            }`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {activeDropdown === item.name && (
                          <div
                            className={`absolute top-full left-0 mt-2 ${item.type === "mega" ? "w-96" : "w-80"} bg-black/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl shadow-purple-900/20 overflow-hidden animate-in slide-in-from-top-2 duration-200`}
                          >
                            <div className="p-2">
                              <div className="p-4 border-b border-gray-600">
                                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-300">
                                  {item.name === "Who We Are" && "Learn more about our company and leadership"}
                                  {item.name === "What We Do" && "Comprehensive enterprise solutions and services"}
                                  {item.name === "Our Expertise" && "Specialized industry expertise and solutions"}
                                  {item.name === "Tech Stack" && "Our cutting-edge technology capabilities"}
                                  {item.name === "Join Our Team" && "Career opportunities and talent acquisition"}
                                  {item.name === "Contact" && "Get in touch with our team worldwide"}
                                </p>
                              </div>
                              <div className="py-2 max-h-96 overflow-y-auto">
                                {item.type === "mega" &&
                                (item.name === "Tech Stack" ||
                                  item.name === "What We Do" ||
                                  item.name === "Our Expertise") ? (
                                  <div className="grid grid-cols-1 gap-1">
                                    {item.items?.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="flex items-start p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 transition-all duration-200 group"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 mr-3 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-200">
                                          {subItem.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200 truncate">
                                              {subItem.name}
                                            </div>
                                            {subItem.badge && (
                                              <Badge
                                                variant="secondary"
                                                className={`ml-2 text-xs flex-shrink-0 ${
                                                  subItem.badge === "Featured"
                                                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                                    : subItem.badge === "New"
                                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                      : subItem.badge === "Hot"
                                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                                        : subItem.badge === "Popular"
                                                          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                                          : subItem.badge === "GenAI"
                                                            ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                                            : subItem.badge === "H1B"
                                                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                              : subItem.badge === "AI-Powered"
                                                                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                                                : subItem.badge === "Hiring"
                                                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                }`}
                                              >
                                                {subItem.badge}
                                              </Badge>
                                            )}
                                          </div>
                                          <div className="text-xs text-gray-400 leading-relaxed">
                                            {subItem.description}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  item.items?.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="flex items-start p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 transition-all duration-200 group"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 mr-3 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-200">
                                        {subItem.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200">
                                            {subItem.name}
                                          </div>
                                          {subItem.badge && (
                                            <Badge
                                              variant="secondary"
                                              className={`ml-2 text-xs ${
                                                subItem.badge === "AI-Powered"
                                                  ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                                  : subItem.badge === "H1B"
                                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                    : subItem.badge === "New"
                                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                              }`}
                                            >
                                              {subItem.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">{subItem.description}</div>
                                      </div>
                                    </Link>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
            </nav>

            {/* Action Bar */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`${getTextClasses()} hover:bg-white/10 border border-gray-500 hover:border-blue-400/50`}
                >
                  <Search className="h-4 w-4" />
                </Button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 animate-in slide-in-from-right-2 duration-200">
                    <form
                      onSubmit={handleSearch}
                      className="bg-black/95 backdrop-blur-xl border border-gray-600 rounded-xl p-4 shadow-2xl"
                    >
                      <Input
                        placeholder="Search services, industries, careers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-800 border-gray-500 text-white placeholder-gray-400 focus:border-blue-400"
                        autoFocus
                      />
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                        <span>Press Enter to search</span>
                        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">ESC</kbd>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* ESG Copilot */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCommandPaletteOpen(true)}
                    className={`hidden md:flex items-center space-x-2 ${
                      aiContext.copilotActive
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50"
                        : "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30"
                    } hover:from-purple-600/40 hover:to-blue-600/40`}
                  >
                    <Brain className={`h-4 w-4 ${aiContext.copilotActive ? "animate-pulse" : ""}`} />
                    <span>Ask ESG Copilot</span>
                    <kbd className="px-1 py-0.5 text-xs bg-gray-700 rounded">⌘K</kbd>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI-powered assistant (⌘K)</p>
                </TooltipContent>
              </Tooltip>

              {/* Voice Search */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startListening}
                    className={`${
                      isListening
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : `${getTextClasses()} hover:bg-white/10 border-gray-500`
                    } border`}
                  >
                    {isListening ? <MicOff className="h-4 w-4 animate-pulse" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? "Listening..." : "Voice search"}</p>
                </TooltipContent>
              </Tooltip>

              {/* Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${getTextClasses()} hover:bg-white/10 border border-gray-500`}
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/95 backdrop-blur-xl border-gray-600">
                  <DropdownMenuLabel className="text-gray-300">Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem onClick={() => toggleTheme("light")} className="text-gray-300 hover:text-white">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleTheme("dark")} className="text-gray-300 hover:text-white">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleTheme("glass")} className="text-gray-300 hover:text-white">
                    <Monitor className="h-4 w-4 mr-2" />
                    Glass
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleTheme("neon")} className="text-gray-300 hover:text-white">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Neon
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-600" />
                  <DropdownMenuItem
                    onClick={() => setIsPrivacyMode(!isPrivacyMode)}
                    className="text-gray-300 hover:text-white"
                  >
                    {isPrivacyMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    Privacy Mode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Let's Discuss CTA */}
              <Link href="/contact">
                <Button className="hidden md:inline-flex bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:from-cyan-400 hover:to-teal-400 font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Phone className="h-4 w-4 mr-2" />
                  Let's Discuss
                </Button>
              </Link>

              {/* User Menu */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse" />
              ) : user ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className={`relative ${getTextClasses()} hover:bg-white/10`}>
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>

                  {/* Messages */}
                  <Button variant="ghost" size="sm" className={`${getTextClasses()} hover:bg-white/10`}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`flex items-center space-x-2 ${getTextClasses()} hover:bg-white/10 px-3 py-2`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                            {getUserInitials(profile?.full_name, user?.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block text-left">
                          <div className="text-sm font-medium truncate max-w-[120px]">
                            {profile?.full_name || user?.email?.split("@")[0] || "User"}
                          </div>
                          <div className="text-xs text-gray-400 capitalize">{profile?.role || "user"}</div>
                        </div>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-black/95 backdrop-blur-xl border-gray-600 shadow-xl"
                      align="end"
                    >
                      <DropdownMenuLabel className="text-gray-300">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-white">{profile?.full_name || "User"}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-600" />

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>

                      {(isAdmin || isHRManager) && (
                        <>
                          <DropdownMenuSeparator className="bg-gray-600" />
                          <DropdownMenuLabel className="text-xs text-gray-400 uppercase tracking-wider">
                            Administration
                          </DropdownMenuLabel>

                          {isHRManager && (
                            <DropdownMenuItem asChild>
                              <Link
                                href="/admin/lca-postings"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                              >
                                <FileText className="h-4 w-4" />
                                <span>Manage LCA</span>
                              </Link>
                            </DropdownMenuItem>
                          )}

                          {isAdmin && (
                            <DropdownMenuItem asChild>
                              <Link
                                href="/admin/users"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                              >
                                <User className="h-4 w-4" />
                                <span>Manage Users</span>
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </>
                      )}

                      <DropdownMenuSeparator className="bg-gray-600" />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${getTextClasses()} hover:bg-white/10 border border-gray-500 hover:border-blue-400/50`}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden ${getTextClasses()} hover:bg-white/10`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-600 bg-black/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
              <div className="py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {/* Mobile System Status */}
                <div className="px-4 pb-4 border-b border-gray-600">
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>System: {metrics.systemStatus}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>{metrics.activeProjects} Projects</span>
                      <span>{metrics.liveSessions} Sessions</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Search */}
                <div className="px-4 pb-4 border-b border-gray-600">
                  <form onSubmit={handleSearch}>
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-800 border-gray-500 text-white placeholder-gray-400 focus:border-blue-400"
                    />
                  </form>
                </div>

                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-2 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 ${
                          isActive(item.href) ? "text-blue-300 bg-blue-500/10" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ) : (
                      <div>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            className={`flex-1 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-l-lg transition-colors duration-200 ${
                              isActive(item.href) ? "text-blue-300 bg-blue-500/10" : ""
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              {item.icon}
                              <span>{item.name}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </Link>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                            className="px-3 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-r-lg transition-colors duration-200 border-l border-gray-500"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {activeDropdown === item.name && (
                          <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-1 duration-150">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setActiveDropdown(null)
                                }}
                              >
                                <div className="flex items-center">
                                  <div className="mr-3 text-blue-400">{subItem.icon}</div>
                                  {subItem.name}
                                </div>
                                {subItem.badge && (
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs flex-shrink-0 ${
                                      subItem.badge === "Featured"
                                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                        : subItem.badge === "New"
                                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                                          : subItem.badge === "Hot"
                                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                                            : subItem.badge === "Popular"
                                              ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                              : subItem.badge === "GenAI"
                                                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                                : subItem.badge === "H1B"
                                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                  : subItem.badge === "AI-Powered"
                                                    ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                                    : subItem.badge === "Hiring"
                                                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    }`}
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="px-4 pt-4 border-t border-gray-600">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:from-cyan-400 hover:to-teal-400 font-semibold">
                      <Phone className="h-4 w-4 mr-2" />
                      Let's Discuss
                    </Button>
                  </Link>
                </div>

                {/* Mobile User Section */}
                {user ? (
                  <div className="border-t border-gray-600 pt-4 mt-4">
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {getUserInitials(profile?.full_name, user?.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {profile?.full_name || user?.email?.split("@")[0] || "User"}
                          </div>
                          <div className="text-xs text-gray-400 capitalize">{profile?.role || "user"}</div>
                        </div>
                        {notifications > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {notifications}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>

                        {(isAdmin || isHRManager) && (
                          <>
                            {isHRManager && (
                              <Link
                                href="/admin/lca-postings"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <FileText className="h-4 w-4" />
                                <span>Manage LCA</span>
                              </Link>
                            )}

                            {isAdmin && (
                              <Link
                                href="/admin/users"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <User className="h-4 w-4" />
                                <span>Manage Users</span>
                              </Link>
                            )}
                          </>
                        )}

                        <button
                          onClick={() => {
                            handleSignOut()
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center space-x-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg text-sm w-full transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-600 pt-4 mt-4 px-4 space-y-3">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-gray-500 text-gray-200 hover:text-white hover:bg-white/10 bg-transparent"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Command Palette */}
        <AnimatePresence>
          {isCommandPaletteOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCommandPaletteOpen(false)}
            >
              <motion.div
                ref={commandPaletteRef}
                initial={{ scale: 0.95, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <Input
                        placeholder="Ask ESG Copilot anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 mb-3">AI Suggestions for {aiContext.timeOfDay}:</div>
                      {aiContext.aiSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <Sparkles className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-300">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </TooltipProvider>
  )
}

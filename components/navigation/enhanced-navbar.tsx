"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Cog,
  Users,
  Lightbulb,
  Shield,
  Cloud,
  Brain,
  Network,
  Cpu,
  Database,
  Zap,
  Heart,
  TrendingUp,
  Star,
  Target,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react"

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    {
      title: "Who We Are",
      href: "/who-we-are",
      items: [
        { title: "About Us", href: "/about-us", icon: Building2, description: "Our story and mission" },
        { title: "Our Mission", href: "/mission", icon: Target, description: "What drives us forward" },
        { title: "Leadership", href: "/leadership", icon: Users, description: "Meet our executive team" },
      ],
    },
    {
      title: "What We Do",
      href: "/services",
      items: [
        {
          title: "SAP Enterprise Solutions",
          href: "/services/sap-enterprise-solutions",
          icon: Database,
          description: "Complete SAP transformation services",
        },
        {
          title: "SAP Data & AI Analytics",
          href: "/services/sap-data-ai-analytics",
          icon: Brain,
          description: "AI-powered analytics and insights",
          badge: "AI",
        },
        {
          title: "Digital & AI Solutions",
          href: "/services/digital-ai-solutions",
          icon: Lightbulb,
          description: "Next-gen digital transformation",
          badge: "Hot",
        },
        {
          title: "Cloud Solutions",
          href: "/services/cloud-solutions",
          icon: Cloud,
          description: "Scalable cloud infrastructure",
        },
        {
          title: "Cybersecurity Services",
          href: "/services/cybersecurity-services",
          icon: Shield,
          description: "Enterprise security solutions",
        },
        {
          title: "Staffing Solutions",
          href: "/services/staffing-solutions",
          icon: Users,
          description: "Expert talent acquisition",
        },
      ],
    },
    {
      title: "Our Expertise",
      href: "/industries",
      items: [
        {
          title: "Manufacturing",
          href: "/industries/manufacturing",
          icon: Cog,
          description: "Smart manufacturing solutions",
        },
        {
          title: "Healthcare",
          href: "/industries/healthcare",
          icon: Heart,
          description: "Digital health transformation",
        },
        {
          title: "Financial Services",
          href: "/industries/bfsi",
          icon: TrendingUp,
          description: "Fintech and banking solutions",
        },
        {
          title: "Retail & E-commerce",
          href: "/industries/retail",
          icon: Star,
          description: "Customer experience optimization",
        },
        {
          title: "Public Sector",
          href: "/industries/public-sector",
          icon: Building2,
          description: "Government digital services",
        },
        {
          title: "Energy & Utilities",
          href: "/industries/energy-utilities",
          icon: Zap,
          description: "Smart grid and energy solutions",
        },
      ],
    },
    {
      title: "Tech Stack",
      href: "/technologies",
      items: [
        {
          title: "Generative AI",
          href: "/technologies/genai",
          icon: Brain,
          description: "Advanced AI and machine learning",
          badge: "Featured",
        },
        {
          title: "Blockchain",
          href: "/technologies/blockchain",
          icon: Network,
          description: "Distributed ledger solutions",
        },
        {
          title: "RPA",
          href: "/technologies/rpa",
          icon: Cpu,
          description: "Robotic process automation",
        },
        {
          title: "Cybersecurity",
          href: "/technologies/cybersecurity",
          icon: Shield,
          description: "Advanced security frameworks",
          badge: "New",
        },
        {
          title: "IoT & Edge AI",
          href: "/technologies/iot",
          icon: Network,
          description: "Connected device solutions",
          badge: "New",
        },
        {
          title: "Cloud Infrastructure",
          href: "/technologies/cloud",
          icon: Cloud,
          description: "Scalable cloud platforms",
          badge: "New",
        },
      ],
    },
  ]

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ESG
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Executive Software Guild</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span>{item.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        {item.items.map((subItem) => {
                          const Icon = subItem.icon
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={closeDropdown}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                            >
                              <div className="p-2 bg-gray-800/50 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                <Icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {subItem.title}
                                  </h3>
                                  {subItem.badge && (
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        subItem.badge === "AI"
                                          ? "border-purple-500 text-purple-400"
                                          : subItem.badge === "Hot"
                                            ? "border-red-500 text-red-400"
                                            : subItem.badge === "New"
                                              ? "border-green-500 text-green-400"
                                              : subItem.badge === "Featured"
                                                ? "border-blue-500 text-blue-400"
                                                : "border-gray-500 text-gray-400"
                                      }`}
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{subItem.description}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/50" asChild>
              <Link href="/contact">
                <Phone className="h-4 w-4 mr-2" />
                Let's Discuss
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              asChild
            >
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden text-gray-300 hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gray-900/95 backdrop-blur-md border-gray-800/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">ESG</h2>
                    <p className="text-xs text-gray-400 -mt-1">Executive Software Guild</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.title ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 space-y-1"
                        >
                          {item.items.map((subItem) => {
                            const Icon = subItem.icon
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                              >
                                <Icon className="h-4 w-4" />
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <Badge variant="outline" className="text-xs ml-auto">
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-800/50 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                  asChild
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Let's Discuss
                  </Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default EnhancedNavbar

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Building2,
  Target,
  BookOpen,
  FileText,
  Database,
  Brain,
  Cloud,
  Shield,
  TrendingUp,
  Factory,
  Heart,
  CreditCard,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    name: "Who We Are",
    type: "dropdown",
    items: [
      { name: "About Us", href: "/about-us", icon: <Building2 className="h-4 w-4" /> },
      { name: "Mission", href: "/mission", icon: <Target className="h-4 w-4" /> },
      { name: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4" /> },
      { name: "Resources", href: "/blog", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    name: "What We Do",
    type: "dropdown",
    items: [
      {
        name: "SAP Enterprise Solutions",
        href: "/services/sap-enterprise-solutions",
        icon: <Database className="h-4 w-4" />,
      },
      { name: "AI & Data Analytics", href: "/services/sap-data-ai-analytics", icon: <Brain className="h-4 w-4" /> },
      { name: "Cloud Services", href: "/services", icon: <Cloud className="h-4 w-4" /> },
      { name: "Cybersecurity", href: "/services", icon: <Shield className="h-4 w-4" /> },
      { name: "Digital Transformation", href: "/services", icon: <TrendingUp className="h-4 w-4" /> },
    ],
  },
  {
    name: "Our Expertise",
    type: "dropdown",
    items: [
      { name: "Manufacturing", href: "/industries/manufacturing", icon: <Factory className="h-4 w-4" /> },
      { name: "Healthcare", href: "/industries", icon: <Heart className="h-4 w-4" /> },
      { name: "Financial Services", href: "/industries", icon: <CreditCard className="h-4 w-4" /> },
      { name: "Retail & E-commerce", href: "/industries", icon: <ShoppingCart className="h-4 w-4" /> },
      { name: "Education", href: "/industries", icon: <GraduationCap className="h-4 w-4" /> },
    ],
  },
  {
    name: "Tech Stack",
    type: "dropdown",
    items: [
      { name: "SAP Technologies", href: "/services", icon: <Database className="h-4 w-4" /> },
      { name: "AI & Machine Learning", href: "/services", icon: <Brain className="h-4 w-4" /> },
      { name: "Cloud Platforms", href: "/services", icon: <Cloud className="h-4 w-4" /> },
      { name: "Security Solutions", href: "/services", icon: <Shield className="h-4 w-4" /> },
    ],
  },
  {
    name: "Join Our Team",
    type: "dropdown",
    items: [
      { name: "Careers", href: "/careers", icon: <Briefcase className="h-4 w-4" /> },
      { name: "LCA Postings", href: "/lca-postings", icon: <UserPlus className="h-4 w-4" /> },
    ],
  },
  {
    name: "Let's Discuss",
    href: "/contact",
    type: "link",
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-dropdown]")) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-blue-500/20 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <span className="text-2xl font-bold text-white">ESG</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ESG Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative" data-dropdown>
                {item.type === "link" ? (
                  <Link
                    href={item.href!}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-400/50 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:border hover:border-blue-500/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-400/50 shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:border hover:border-blue-500/30"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 w-80 bg-black/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-900/30 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                {item.name}
                              </h3>
                              <div className="h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
                            </div>
                            <div className="space-y-2">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 group border border-transparent hover:border-blue-500/30"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 mr-4 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                                    {subItem.icon}
                                  </div>
                                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                    {subItem.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 border border-gray-600 hover:border-blue-500/50 rounded-xl"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-blue-500/20 bg-black/95 backdrop-blur-xl"
            >
              <div className="py-6 space-y-3">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.type === "link" ? (
                      <Link
                        href={item.href!}
                        className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className="flex items-center justify-between w-full px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl transition-all duration-300"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 mt-2 space-y-2"
                            >
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 rounded-lg transition-all duration-300"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setActiveDropdown(null)
                                  }}
                                >
                                  <div className="mr-3 text-blue-400">{subItem.icon}</div>
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

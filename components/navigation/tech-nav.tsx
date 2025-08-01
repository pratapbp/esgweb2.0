"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Database,
  Cloud,
  Shield,
  Users,
  BarChart,
  Cpu,
  Layers,
  Workflow,
  Code,
  Building,
  LineChart,
  Briefcase,
  GitBranch,
  Network,
  Lightbulb,
  Sparkles,
  Brain,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  children?: {
    name: string
    href: string
    description?: string
    icon: React.ReactNode
    badge?: string
  }[]
}

export default function TechNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverIcon, setHoverIcon] = useState<string | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  const navItems: NavItem[] = [
    {
      name: "Who We Are",
      href: "/who-we-are",
      icon: <Building className="h-5 w-5" />,
      children: [
        {
          name: "About ESG",
          href: "/about",
          description: "Learn about our company history and values",
          icon: <Briefcase className="h-4 w-4" />,
        },
        {
          name: "Leadership",
          href: "/leadership",
          description: "Meet our executive team",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "Partners",
          href: "/partners",
          description: "Our strategic technology partners",
          icon: <Workflow className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: <Layers className="h-5 w-5" />,
      children: [
        {
          name: "SAP Enterprise Solutions",
          href: "/services/sap-enterprise-solutions",
          description: "End-to-end SAP implementation and optimization",
          icon: <Database className="h-4 w-4" />,
        },
        {
          name: "SAP Data & AI Analytics",
          href: "/services/sap-data-ai-analytics",
          description: "Transform data into actionable insights",
          icon: <BarChart className="h-4 w-4" />,
        },
        {
          name: "SAP Supply Chain & Procurement",
          href: "/services/sap-supply-chain-procurement",
          description: "Optimize your supply chain and procurement processes",
          icon: <Workflow className="h-4 w-4" />,
        },
        {
          name: "SAP Technology & Innovation",
          href: "/services/sap-technology-innovation",
          description: "Leverage cutting-edge SAP technologies",
          icon: <Cpu className="h-4 w-4" />,
        },
        {
          name: "SAP RevBRIM",
          href: "/services/sap-revbrim",
          description: "Revenue and billing management solutions",
          icon: <LineChart className="h-4 w-4" />,
        },
        {
          name: "Digital & AI Solutions",
          href: "/services/digital-ai-solutions",
          description: "Innovative digital and AI-powered solutions",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "Cloud Solutions",
          href: "/services/cloud-solutions",
          description: "Secure and scalable cloud infrastructure",
          icon: <Cloud className="h-4 w-4" />,
        },
        {
          name: "Cybersecurity Services",
          href: "/services/cybersecurity-services",
          description: "Protect your business with advanced security",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Staffing Solutions",
          href: "/services/staffing-solutions",
          description: "Expert talent acquisition and management",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Industries",
      href: "/industries",
      icon: <Building className="h-5 w-5" />,
      children: [
        {
          name: "Manufacturing",
          href: "/industries/manufacturing",
          icon: <Cpu className="h-4 w-4" />,
        },
        {
          name: "Healthcare",
          href: "/industries/healthcare",
          icon: <Users className="h-4 w-4" />,
        },
        {
          name: "Financial Services",
          href: "/industries/financial-services",
          icon: <BarChart className="h-4 w-4" />,
        },
        {
          name: "Retail",
          href: "/industries/retail",
          icon: <Briefcase className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Technologies",
      href: "/technologies",
      icon: <Cpu className="h-5 w-5" />,
      children: [
        {
          name: "Technology Overview",
          href: "/technologies",
          description: "Our complete technology portfolio",
          icon: <Cpu className="h-4 w-4" />,
        },
        {
          name: "Generative AI",
          href: "/technologies/genai",
          description: "LLMs, AI copilots, and intelligent automation",
          icon: <Brain className="h-4 w-4" />,
          badge: "Featured",
        },
        {
          name: "Blockchain",
          href: "/technologies/blockchain",
          description: "Distributed ledger and smart contracts",
          icon: <GitBranch className="h-4 w-4" />,
        },
        {
          name: "RPA",
          href: "/technologies/rpa",
          description: "Robotic process automation",
          icon: <Workflow className="h-4 w-4" />,
        },
        {
          name: "Cybersecurity",
          href: "/technologies/cybersecurity",
          description: "AI-powered security and zero trust",
          icon: <Shield className="h-4 w-4" />,
          badge: "New",
        },
        {
          name: "IoT & Edge AI",
          href: "/technologies/iot",
          description: "Connected devices and edge computing",
          icon: <Network className="h-4 w-4" />,
          badge: "New",
        },
        {
          name: "Superintelligence",
          href: "/technologies/superintelligence",
          description: "Ethical AGI and advanced reasoning",
          icon: <Sparkles className="h-4 w-4" />,
          badge: "New",
        },
        {
          name: "Cloud Infrastructure",
          href: "/technologies/cloud",
          description: "Multi-cloud and hybrid solutions",
          icon: <Cloud className="h-4 w-4" />,
          badge: "New",
        },
        {
          name: "Theory of Mind AI",
          href: "/technologies/theory-of-mind",
          description: "Empathetic AI and context-aware systems",
          icon: <Lightbulb className="h-4 w-4" />,
          badge: "New",
        },
        {
          name: "Digital Twin",
          href: "/technologies/digital-twin",
          description: "Virtual modeling and predictive simulation",
          icon: <Layers className="h-4 w-4" />,
          badge: "New",
        },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      icon: <Database className="h-5 w-5" />,
      children: [
        {
          name: "Blog",
          href: "/blog",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "Case Studies",
          href: "/case-studies",
          icon: <Briefcase className="h-4 w-4" />,
        },
        {
          name: "Whitepapers",
          href: "/whitepapers",
          icon: <Database className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Careers",
      href: "/careers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Workflow className="h-5 w-5" />,
    },
  ]

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const iconAnimation = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-[#0a0e17]/95 backdrop-blur-md shadow-lg" : "bg-[#0a0e17]/80",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/esg-colored-logo.png" alt="ESG Logo" width={48} height={48} className="mr-2" priority />
            <span className="font-poppins text-xl font-bold text-white hidden sm:inline-block">
              <span className="text-blue-400">ESG</span> Inc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    onMouseEnter={() => setHoverIcon(item.name)}
                    onMouseLeave={() => setHoverIcon(null)}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors",
                      activeDropdown === item.name
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-blue-400 hover:bg-white/5",
                    )}
                    aria-expanded={activeDropdown === item.name}
                  >
                    <motion.div
                      className="mr-2"
                      variants={iconAnimation}
                      initial="initial"
                      animate={hoverIcon === item.name ? "hover" : "initial"}
                    >
                      {item.icon}
                    </motion.div>
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : "",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors flex items-center"
                    onMouseEnter={() => setHoverIcon(item.name)}
                    onMouseLeave={() => setHoverIcon(null)}
                  >
                    <motion.div
                      className="mr-2"
                      variants={iconAnimation}
                      initial="initial"
                      animate={hoverIcon === item.name ? "hover" : "initial"}
                    >
                      {item.icon}
                    </motion.div>
                    {item.name}
                  </Link>
                )}

                {/* Dropdown for desktop */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-[#0f1623] border border-gray-800 overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 text-sm hover:bg-blue-900/20 transition-colors group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-center">
                                <motion.div className="mr-3 text-blue-400" whileHover={{ scale: 1.2, rotate: 5 }}>
                                  {child.icon}
                                </motion.div>
                                <div>
                                  <div className="font-medium text-white group-hover:text-blue-400 transition-colors flex items-center">
                                    {child.name}
                                    {child.badge && (
                                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-md">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>
                                  {child.description && (
                                    <p className="mt-1 text-xs text-gray-400">{child.description}</p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA and Search */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              aria-label="Search"
              className="p-2 rounded-full text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0f1623] border-t border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="py-2">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center">
                            <motion.div className="mr-3 text-blue-400" whileHover={{ scale: 1.2 }}>
                              {item.icon}
                            </motion.div>
                            {item.name}
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              activeDropdown === item.name ? "rotate-180" : "",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 pl-4 border-l border-gray-700"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <motion.div className="mr-3 text-blue-400" whileHover={{ scale: 1.2 }}>
                                    {child.icon}
                                  </motion.div>
                                  <div>
                                    <span>{child.name}</span>
                                    {child.badge && (
                                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-md">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.div className="mr-3 text-blue-400" whileHover={{ scale: 1.2 }}>
                          {item.icon}
                        </motion.div>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
                <div className="mt-4 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    aria-label="Search"
                    className="p-2 rounded-full text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Facebook,
  Instagram,
  ArrowRight,
  Zap,
  Brain,
  Shield,
  Cloud,
  Database,
  Cpu,
  Network,
  Rocket,
  Star,
  Users,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Heart,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const footerSections = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us", icon: <Building2 className="h-4 w-4" /> },
      { name: "Who We Are", href: "/who-we-are", icon: <Users className="h-4 w-4" /> },
      { name: "Our Mission", href: "/mission", icon: <Target className="h-4 w-4" /> },
    ],
  },
  services: {
    title: "Services",
    links: [
      {
        name: "SAP Enterprise Solutions",
        href: "/services/sap-enterprise-solutions",
        icon: <Database className="h-4 w-4" />,
      },
      {
        name: "SAP Data & AI Analytics",
        href: "/services/sap-data-ai-analytics",
        icon: <Brain className="h-4 w-4" />,
        badge: "AI",
      },
      {
        name: "Digital & AI Solutions",
        href: "/services/digital-ai-solutions",
        icon: <Lightbulb className="h-4 w-4" />,
        badge: "Hot",
      },
      { name: "Cloud Solutions", href: "/services/cloud-solutions", icon: <Cloud className="h-4 w-4" /> },
      {
        name: "Cybersecurity Services",
        href: "/services/cybersecurity-services",
        icon: <Shield className="h-4 w-4" />,
      },
      { name: "Staffing Solutions", href: "/services/staffing-solutions", icon: <Users className="h-4 w-4" /> },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing", icon: <Cpu className="h-4 w-4" /> },
      { name: "Healthcare", href: "/industries/healthcare", icon: <Heart className="h-4 w-4" /> },
      { name: "Financial Services", href: "/industries/bfsi", icon: <TrendingUp className="h-4 w-4" /> },
      { name: "Retail & E-commerce", href: "/industries/retail", icon: <Star className="h-4 w-4" /> },
      { name: "Public Sector", href: "/industries/public-sector", icon: <Building2 className="h-4 w-4" /> },
      { name: "Energy & Utilities", href: "/industries/energy-utilities", icon: <Zap className="h-4 w-4" /> },
    ],
  },
  technologies: {
    title: "Technologies",
    links: [
      { name: "Generative AI", href: "/technologies/genai", icon: <Brain className="h-4 w-4" />, badge: "Featured" },
      { name: "Blockchain", href: "/technologies/blockchain", icon: <Network className="h-4 w-4" /> },
      { name: "RPA", href: "/technologies/rpa", icon: <Cpu className="h-4 w-4" /> },
      {
        name: "Cybersecurity",
        href: "/technologies/cybersecurity",
        icon: <Shield className="h-4 w-4" />,
        badge: "New",
      },
      { name: "IoT & Edge AI", href: "/technologies/iot", icon: <Network className="h-4 w-4" />, badge: "New" },
      { name: "Cloud Infrastructure", href: "/technologies/cloud", icon: <Cloud className="h-4 w-4" />, badge: "New" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Insights", href: "/insights", icon: <Lightbulb className="h-4 w-4" />, badge: "AI-Powered" },
      { name: "Blog", href: "/blog", icon: <CheckCircle className="h-4 w-4" /> },
      { name: "Case Studies", href: "/case-studies", icon: <Award className="h-4 w-4" /> },
      { name: "Whitepapers", href: "/whitepapers", icon: <CheckCircle className="h-4 w-4" /> },
      { name: "Help Center", href: "/help", icon: <CheckCircle className="h-4 w-4" /> },
    ],
  },
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/esg-executive-software-guild",
    icon: <Linkedin className="h-5 w-5" />,
  },
  { name: "Twitter", href: "https://twitter.com/esg_guild", icon: <Twitter className="h-5 w-5" /> },
  { name: "GitHub", href: "https://github.com/esg-guild", icon: <Github className="h-5 w-5" /> },
  { name: "YouTube", href: "https://youtube.com/@esg-guild", icon: <Youtube className="h-5 w-5" /> },
  { name: "Facebook", href: "https://facebook.com/esg.guild", icon: <Facebook className="h-5 w-5" /> },
  { name: "Instagram", href: "https://instagram.com/esg_guild", icon: <Instagram className="h-5 w-5" /> },
]

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "contact@esgit.com",
    href: "mailto:contact@esgit.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value: "123 Innovation Drive, Tech City, TC 12345",
    href: "/contact#locations",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Website",
    value: "www.esg-guild.com",
    href: "https://www.esg-guild.com",
  },
]

export default function FuturisticFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-1 space-y-8">
              {/* Logo & Description */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ESG
                    </h3>
                    <p className="text-sm text-gray-400">Executive Software Guild</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  ESG Executive Software Guild is a leading technology consulting firm specializing in SAP solutions,
                  AI-powered analytics, and digital transformation services for enterprises worldwide.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                <p className="text-sm text-gray-400">
                  Get the latest insights on AI, SAP, and digital transformation delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pr-12"
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Successfully subscribed!</span>
                    </motion.p>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Contact Info</h4>
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group"
                    >
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors">{item.icon}</div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm">{item.value}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {Object.entries(footerSections).map(([key, section]) => (
                  <div key={key} className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group text-sm"
                          >
                            <div className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
                              {link.icon}
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {link.name}
                            </span>
                            {link.badge && (
                              <Badge
                                variant="outline"
                                className={`text-xs ml-auto ${
                                  link.badge === "AI" || link.badge === "AI-Powered"
                                    ? "border-purple-500 text-purple-400"
                                    : link.badge === "Hot"
                                      ? "border-red-500 text-red-400"
                                      : link.badge === "New"
                                        ? "border-green-500 text-green-400"
                                        : link.badge === "Featured"
                                          ? "border-blue-500 text-blue-400"
                                          : "border-gray-500 text-gray-400"
                                }`}
                              >
                                {link.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ESG Executive Software Guild. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Empowering enterprises through innovative technology solutions and AI-driven transformation.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Action */}
        <div className="fixed bottom-8 right-8 z-50">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
              <div className="flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span className="hidden sm:inline">Get Started</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
